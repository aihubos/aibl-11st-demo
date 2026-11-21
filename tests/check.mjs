// tests/check.mjs — 의존성 없는 정적 점검 스크립트 (Node 20+)
// 실행: node tests/check.mjs
import { readFileSync, existsSync } from 'node:fs';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const results = [];
const check = (name, ok, detail = '') => results.push({ name, ok: !!ok, detail });

const indexPath = join(root, 'index.html');
check('index.html 존재', existsSync(indexPath));
if (!existsSync(indexPath)) finish();

const html = readFileSync(indexPath, 'utf8');
const read = (f) => (existsSync(join(root, f)) ? readFileSync(join(root, f), 'utf8') : '');
const js = ['app.js', 'data.js'].map(read).join('\n');
const css = read('styles.css');

// 1) 필수 메타/문구
check('<html lang="ko">', /<html[^>]*\blang="ko"/.test(html));
check('robots noindex', /<meta[^>]+name="robots"[^>]+content="[^"]*noindex/.test(html));
check('viewport meta', /<meta[^>]+name="viewport"[^>]+width=device-width/.test(html));
check('<title> 존재', /<title>[^<]+<\/title>/.test(html));
check('description meta', /<meta[^>]+name="description"/.test(html));
check('SVG 파비콘(data URI)', /<link[^>]+rel="icon"[^>]+href="data:image\/svg\+xml/.test(html));
check('더미 안내 문구', html.includes('수업 예제용 더미 데이터입니다'));
check('푸터 더미 안내 반복', html.includes('본 페이지는 수업 예제용 더미 데이터로 구성되었습니다'));

// 2) id 중복 없음
const ids = [...html.matchAll(/\sid="([^"]+)"/g)].map((m) => m[1]);
const dupes = ids.filter((id, i) => ids.indexOf(id) !== i);
check('id 중복 없음', dupes.length === 0, dupes.join(', '));
const idSet = new Set(ids);

// 3) 모든 href="#id"가 실제 id를 가리킴 (HTML + JS 템플릿 문자열)
const anchors = [...(html + js).matchAll(/href="#([^"]*)"/g)].map((m) => m[1]);
const badAnchors = anchors.filter((a) => !a || !idSet.has(a));
check(`앵커 링크 ${anchors.length}개 모두 유효`, badAnchors.length === 0, badAnchors.map((a) => '#' + a).join(', '));

// 4) 로컬 src/href 파일 존재
const refs = [...html.matchAll(/\s(?:src|href)="([^"]+)"/g)].map((m) => m[1])
  .filter((u) => !/^(#|https?:|data:|mailto:|tel:|\/\/)/.test(u));
const missing = refs.filter((u) => !existsSync(join(root, u.split(/[?#]/)[0])));
check(`로컬 파일 참조 ${refs.length}개 존재`, missing.length === 0, missing.join(', '));

// 5) 외부 리소스는 Pretendard CDN만 허용
const external = [...html.matchAll(/\s(?:src|href)="(https?:\/\/[^"]+)"/g)].map((m) => m[1])
  .filter((u) => !u.startsWith('https://cdn.jsdelivr.net/gh/orioncactus/pretendard') && u !== 'https://cdn.jsdelivr.net');
check('허용되지 않은 외부 리소스 없음', external.length === 0, external.join(', '));

// 6) .ref 참조 금지 + 금지 상표 문구 없음
const shipped = html + js + css;
check('.ref 폴더 참조 없음', !/\.ref\//.test(shipped));
const banned = ['11번가', '십일절', '슈팅배송', '11LIVE', 'amazon', '아마존', '11st'];
const foundBanned = banned.filter((w) => shipped.toLowerCase().includes(w.toLowerCase()));
check('금지 상표 문구 없음', foundBanned.length === 0, foundBanned.join(', '));

// 7) 기본 태그 짝 맞춤 (대략 점검)
const stripped = html.replace(/<!--[\s\S]*?-->/g, '').replace(/<script[\s\S]*?<\/script>/g, '<script></script>');
const tags = ['html', 'head', 'body', 'header', 'main', 'footer', 'nav', 'section', 'article', 'div', 'span', 'ul', 'ol', 'li', 'a', 'button', 'form', 'details', 'summary', 'dialog', 'p', 'h1', 'h2', 'h3', 'svg', 'strong', 'label', 'noscript'];
const count = (re) => (stripped.match(re) || []).length;
const unbalanced = tags
  .map((t) => ({ t, open: count(new RegExp(`<${t}(\\s[^>]*)?>`, 'g')), close: count(new RegExp(`</${t}>`, 'g')) }))
  .filter(({ open, close }) => open !== close)
  .map(({ t, open, close }) => `${t}(열림 ${open}/닫힘 ${close})`);
check('기본 태그 짝 맞춤', unbalanced.length === 0, unbalanced.join(', '));

// 8) 필수 섹션 id
const required = ['top', 'main', 'hero', 'timedeal', 'ranking', 'courses', 'showcase', 'reviews', 'study', 'community', 'faq', 'footer'];
const missingSections = required.filter((id) => !idSet.has(id));
check('필수 섹션 id 존재', missingSections.length === 0, missingSections.join(', '));

// 9) 부가 파일
check('.nojekyll 존재', existsSync(join(root, '.nojekyll')));
check('README.md 존재', existsSync(join(root, 'README.md')));

finish();

function finish() {
  let fail = 0;
  for (const r of results) {
    if (!r.ok) fail++;
    console.log(`${r.ok ? '✅ PASS' : '❌ FAIL'}  ${r.name}${r.detail ? '  → ' + r.detail : ''}`);
  }
  console.log(`\n${results.length - fail}/${results.length} 통과`);
  process.exit(fail ? 1 : 0);
}
