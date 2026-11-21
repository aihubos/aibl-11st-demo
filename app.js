/* =========================================================
 * app.js — 화면 그리기 + 동작 (외부 라이브러리 없음)
 * 모든 상태(장바구니 수, 좋아요)는 이 페이지 안에서만 유지돼요.
 * ========================================================= */
(function () {
  'use strict';

  var D = window.AIBL_DATA;
  if (!D) return;

  var $ = function (sel, root) { return (root || document).querySelector(sel); };
  var $$ = function (sel, root) { return Array.prototype.slice.call((root || document).querySelectorAll(sel)); };
  var won = function (n) { return n.toLocaleString('ko-KR'); };
  var offOf = function (price, was) { return Math.round((1 - price / was) * 100); };
  var esc = function (s) {
    return String(s).replace(/[&<>"']/g, function (c) {
      return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c];
    });
  };
  var reduceMotion = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  var byId = {};
  D.courses.forEach(function (c) { byId[c.id] = c; });

  /* ---------- 썸네일 SVG (그라디언트 + 아이콘) ---------- */
  var thumbSeq = 0;
  function thumbSVG(icon, color, label) {
    var p = D.palettes[color] || D.palettes.gray;
    var gid = 'tg' + (++thumbSeq);
    return '<svg viewBox="0 0 120 120" role="img" aria-label="' + esc(label) + ' 썸네일">' +
      '<defs><linearGradient id="' + gid + '" x1="0" y1="0" x2="1" y2="1">' +
      '<stop offset="0" stop-color="' + p[0] + '"/><stop offset="1" stop-color="' + p[1] + '"/></linearGradient></defs>' +
      '<rect width="120" height="120" fill="url(#' + gid + ')"/>' +
      '<circle cx="98" cy="22" r="30" fill="#fff" opacity=".35"/>' +
      '<rect x="34" y="34" width="52" height="52" rx="14" fill="#fff" opacity=".92"/>' +
      '<g transform="translate(46 46)" fill="none" stroke="' + p[2] + '" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">' +
      '<path d="' + (D.icons[icon] || D.icons.spark) + '"/></g>' +
      '<text x="10" y="110" font-size="10" font-weight="800" fill="' + p[2] + '" opacity=".75">AI BUILDERS</text>' +
      '</svg>';
  }

  var TAG_CLASS = { '바로수강': 'tag-fast', '쿠폰': 'tag-coupon', 'BEST': 'tag-best', 'NEW': 'tag-new' };
  function tagsHTML(tags) {
    return '<div class="tags">' + tags.map(function (t) {
      return '<span class="tag ' + (TAG_CLASS[t] || '') + '">' + esc(t) + '</span>';
    }).join('') + '</div>';
  }
  function priceHTML(price, was) {
    return '<div class="price">' +
      '<span class="off"><span class="sr-only">할인율 </span>' + offOf(price, was) + '%</span>' +
      '<span class="now"><span class="sr-only">판매가 </span>' + won(price) + '<small>원</small></span>' +
      '<span class="was"><span class="sr-only">정가 </span>' + won(was) + '원</span>' +
      '</div>';
  }
  function cartBtn(title) {
    return '<button type="button" class="cart-btn" data-cart="' + esc(title) + '">장바구니 담기</button>';
  }

  /* ---------- 토스트 ---------- */
  var toastEl = $('#toast');
  var toastTimer;
  function toast(msg) {
    toastEl.textContent = msg || '수업 예제라 실제 기능은 연결되지 않았어요';
    toastEl.classList.add('show');
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () { toastEl.classList.remove('show'); }, 2200);
  }

  /* ---------- 장바구니 (로컬 상태) ---------- */
  var cartCount = 0;
  var badge = $('#cartBadge');
  var cartBtnEl = $('#cartBtn');
  function addToCart(title) {
    cartCount += 1;
    badge.textContent = cartCount > 99 ? '99+' : String(cartCount);
    cartBtnEl.setAttribute('aria-label', '장바구니 (담긴 강의 ' + cartCount + '개)');
    badge.classList.remove('bump');
    void badge.offsetWidth; // 애니메이션 다시 시작
    badge.classList.add('bump');
    toast('‘' + title + '’ 담았어요 · 수업 예제라 실제 기능은 연결되지 않았어요');
  }

  /* ---------- 6. 타임딜 ---------- */
  function renderDeals() {
    $('#dealList').innerHTML = D.deals.map(function (d) {
      var c = byId[d.courseId];
      var sold = Math.round((1 - d.seatsLeft / d.seatsTotal) * 100);
      return '<li><article class="deal-card">' +
        '<div class="thumb">' + thumbSVG(c.icon, c.color, c.title) + '</div>' +
        '<div>' +
          '<h3 class="name">' + esc(c.title) + '</h3>' +
          priceHTML(d.price, c.was) +
          '<div class="seats">' +
            '<div class="seats-bar" role="progressbar" aria-label="판매 진행률" aria-valuemin="0" aria-valuemax="100" aria-valuenow="' + sold + '"><i style="width:' + sold + '%"></i></div>' +
            '<div class="seats-text"><span>' + sold + '% 마감</span><strong>잔여 ' + d.seatsLeft + '석</strong></div>' +
          '</div>' +
          cartBtn(c.title) +
        '</div>' +
      '</article></li>';
    }).join('');
  }

  function startCountdown() {
    var h = $('#cdH'), m = $('#cdM'), s = $('#cdS');
    var pad = function (n) { return n < 10 ? '0' + n : String(n); };
    function tick() {
      var now = new Date();
      var end = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1, 0, 0, 0);
      var left = Math.max(0, Math.floor((end - now) / 1000));
      h.textContent = pad(Math.floor(left / 3600));
      m.textContent = pad(Math.floor((left % 3600) / 60));
      s.textContent = pad(left % 60);
    }
    tick();
    setInterval(tick, 1000);
  }

  /* ---------- 7. 랭킹 ---------- */
  function renderRanking(cat) {
    var list = D.courses
      .filter(function (c) { return cat === '전체' || c.cat === cat; })
      .sort(function (a, b) { return b.students - a.students; })
      .slice(0, 10);
    $('#rankList').innerHTML = list.map(function (c, i) {
      return '<li><article class="rank-card">' +
        '<div class="thumb"><span class="rank"><span class="sr-only">순위 </span>' + (i + 1) + '</span>' + thumbSVG(c.icon, c.color, c.title) + '</div>' +
        '<h3 class="name">' + esc(c.title) + '</h3>' +
        priceHTML(c.price, c.was) +
        '<div class="meta"><span class="star">' + c.rating.toFixed(1) + '</span><span>수강생 ' + won(c.students) + '명</span></div>' +
      '</article></li>';
    }).join('');
  }
  $('#rankTabs').addEventListener('click', function (e) {
    var btn = e.target.closest('[data-cat]');
    if (!btn) return;
    $$('#rankTabs .chip').forEach(function (b) {
      var on = b === btn;
      b.classList.toggle('is-active', on);
      b.setAttribute('aria-selected', on ? 'true' : 'false');
    });
    renderRanking(btn.getAttribute('data-cat'));
    $('#rankList').scrollLeft = 0;
  });

  /* ---------- 8. 강의 그리드 + 검색 ---------- */
  var liked = {};
  var heart = '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M12 20s-7-4.4-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.6-7 10-7 10Z"/></svg>';
  function renderCourses(list) {
    $('#courseGrid').innerHTML = list.map(function (c) {
      var on = !!liked[c.id];
      return '<li><article class="card">' +
        '<div class="thumb">' + thumbSVG(c.icon, c.color, c.title) +
          '<button type="button" class="like" data-like="' + c.id + '" aria-pressed="' + on + '" aria-label="' + esc(c.title) + ' 찜하기">' + heart + '</button>' +
        '</div>' +
        '<div class="card-body">' +
          tagsHTML(c.tags) +
          '<h3 class="name">' + esc(c.title) + '</h3>' +
          priceHTML(c.price, c.was) +
          '<div class="meta"><span class="star">' + c.rating.toFixed(1) + ' <span class="sr-only">점</span>(' + won(c.reviews) + ')</span><span>수강생 ' + won(c.students) + '명</span></div>' +
        '</div>' +
        cartBtn(c.title) +
      '</article></li>';
    }).join('');
  }

  var input = $('#searchInput');
  var clearBtn = $('#searchClear');
  function applySearch() {
    var q = input.value.trim().toLowerCase().replace(/\s+/g, ' ');
    clearBtn.hidden = !q;
    var list = !q ? D.courses : D.courses.filter(function (c) {
      var hay = (c.title + ' ' + c.tags.join(' ') + ' ' + c.cat).toLowerCase();
      return q.split(' ').every(function (w) { return hay.indexOf(w) > -1; });
    });
    renderCourses(list);
    $('#emptyState').hidden = list.length > 0;
    $('#courses-title').textContent = q ? '‘' + input.value.trim() + '’ 검색 결과' : '전체 강의';
    $('#resultCount').textContent = list.length + '개 강의';
  }
  function setQuery(q) { input.value = q; applySearch(); }

  input.addEventListener('input', applySearch);
  $('#searchForm').addEventListener('submit', function (e) {
    e.preventDefault();
    applySearch();
    input.blur();
    $('#courses').scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth' });
  });
  clearBtn.addEventListener('click', function () { setQuery(''); input.focus(); });
  $('#resetSearch').addEventListener('click', function () { setQuery(''); });

  /* 좋아요 토글 (이벤트 위임) */
  $('#courseGrid').addEventListener('click', function (e) {
    var b = e.target.closest('[data-like]');
    if (!b) return;
    var id = b.getAttribute('data-like');
    liked[id] = !liked[id];
    b.setAttribute('aria-pressed', String(liked[id]));
    toast(liked[id] ? '찜 목록에 담았어요 (이 페이지에서만 유지)' : '찜을 해제했어요');
  });

  /* ---------- 9. 쇼케이스 + 모달 ---------- */
  function renderShowcase() {
    $('#showcaseGrid').innerHTML = D.projects.map(function (p) {
      return '<li><article class="sc-card">' +
        '<div class="sc-body">' +
          '<div class="thumb">' + thumbSVG(p.icon, p.color, p.title) + '</div>' +
          '<h3 class="sc-title">' + esc(p.title) + '</h3>' +
          '<p class="sc-meta">' + esc(p.maker) + ' · ' + p.days + '일 완성</p>' +
        '</div>' +
        '<button type="button" class="btn btn-secondary" data-project="' + p.id + '">결과물 보기</button>' +
      '</article></li>';
    }).join('');
  }
  var dialog = $('#projectDialog');
  var lastFocus = null;
  function openProject(id) {
    var p = D.projects.filter(function (x) { return x.id === id; })[0];
    if (!p) return;
    $('#modalBody').innerHTML =
      '<div class="thumb">' + thumbSVG(p.icon, p.color, p.title) + '</div>' +
      '<h2 id="modalTitle">' + esc(p.title) + '</h2>' +
      '<p class="modal-meta">만든 사람 ' + esc(p.maker) + ' · 제작 ' + p.days + '일 · ' + esc(p.tools) + '</p>' +
      '<p>' + esc(p.desc) + '</p>' +
      '<ol>' + p.steps.map(function (s) { return '<li>' + esc(s) + '</li>'; }).join('') + '</ol>' +
      '<p class="modal-note">수업 예제용 가상 결과물이에요. Esc 키로 닫을 수 있어요.</p>';
    lastFocus = document.activeElement;
    if (typeof dialog.showModal === 'function') dialog.showModal();
    else dialog.setAttribute('open', '');
  }
  $('#showcaseGrid').addEventListener('click', function (e) {
    var b = e.target.closest('[data-project]');
    if (b) openProject(b.getAttribute('data-project'));
  });
  dialog.addEventListener('click', function (e) { if (e.target === dialog) dialog.close(); }); // 바깥(배경) 클릭 시 닫기
  dialog.addEventListener('close', function () { if (lastFocus) lastFocus.focus(); });

  /* ---------- 10. 후기 ---------- */
  function stars(n) { return '★★★★★'.slice(0, n) + '☆☆☆☆☆'.slice(0, 5 - n); }
  function renderReviews() {
    $('#ratingBars').innerHTML = [5, 4, 3, 2, 1].map(function (k) {
      var v = D.ratingDist[k];
      return '<li><span>' + k + '점</span><span class="bar" aria-hidden="true"><i style="width:' + v + '%"></i></span><span>' + v + '%</span></li>';
    }).join('');
    $('#reviewList').innerHTML = D.reviews.map(function (r) {
      return '<li><article class="review">' +
        '<div class="review-top"><span class="review-stars" role="img" aria-label="별점 5점 중 ' + r.stars + '점">' + stars(r.stars) + '</span><span class="review-date">' + r.date + '</span></div>' +
        '<p class="review-who">수강생 ' + esc(r.name) + ' · <span class="review-course">' + esc(r.course) + '</span></p>' +
        '<p>' + esc(r.text) + '</p>' +
      '</article></li>';
    }).join('');
  }

  /* ---------- 11. 스터디 / 커뮤니티 ---------- */
  var QI = { red: 'qi-red', orange: 'qi-orange', purple: 'qi-purple', blue: 'qi-blue', green: 'qi-green', gray: 'qi-blue' };
  function miniHTML(list) {
    return list.map(function (m) {
      return '<li class="mini">' +
        '<span class="qi ' + (QI[m.color] || 'qi-red') + '"><svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="' + D.icons[m.icon] + '"/></svg></span>' +
        '<div style="min-width:0"><p class="mini-type">' + esc(m.type) + '</p><p class="mini-title">' + esc(m.title) + '</p><p class="mini-meta">' + esc(m.meta) + '</p></div>' +
        '<span class="mini-people">' + esc(m.people) + '</span>' +
      '</li>';
    }).join('');
  }

  /* ---------- 4. 히어로 캐러셀 ---------- */
  function initHero() {
    var slides = $$('#heroTrack .hero-slide');
    var dots = $$('#heroDots .hero-dot');
    var pauseBtn = $('#heroPause');
    var idx = 0, timer = null, userPaused = reduceMotion, hovering = false;

    function show(i) {
      idx = (i + slides.length) % slides.length;
      slides.forEach(function (s, k) {
        s.hidden = k !== idx;
        s.classList.toggle('is-active', k === idx);
      });
      dots.forEach(function (d, k) {
        d.classList.toggle('is-active', k === idx);
        if (k === idx) d.setAttribute('aria-current', 'true'); else d.removeAttribute('aria-current');
      });
    }
    function stop() { clearInterval(timer); timer = null; }
    function start() {
      stop();
      if (userPaused || hovering) return;
      timer = setInterval(function () { show(idx + 1); }, 5000);
    }
    function syncPauseBtn() {
      pauseBtn.textContent = userPaused ? '▶' : '❚❚';
      pauseBtn.setAttribute('aria-label', userPaused ? '배너 자동 넘김 시작' : '배너 자동 넘김 멈추기');
    }
    dots.forEach(function (d, k) { d.addEventListener('click', function () { show(k); start(); }); });
    pauseBtn.addEventListener('click', function () { userPaused = !userPaused; syncPauseBtn(); start(); });
    var hero = $('#hero');
    hero.addEventListener('mouseenter', function () { hovering = true; stop(); });
    hero.addEventListener('mouseleave', function () { hovering = false; start(); });
    hero.addEventListener('focusin', function () { hovering = true; stop(); });
    hero.addEventListener('focusout', function () { hovering = false; start(); });
    syncPauseBtn();
    start();
  }

  /* ---------- 3. 카테고리 탭 ---------- */
  function setActiveTab(el) {
    $$('#catTabs .cat-tab').forEach(function (a) {
      var on = a === el;
      a.classList.toggle('is-active', on);
      if (on) a.setAttribute('aria-current', 'page'); else a.removeAttribute('aria-current');
    });
    // 탭 줄만 가로로 이동 (페이지 세로 스크롤은 건드리지 않음)
    var box = $('#catTabs');
    var offset = el.getBoundingClientRect().left - box.getBoundingClientRect().left;
    box.scrollLeft += offset - (box.clientWidth - el.offsetWidth) / 2;
  }
  $('#catTabs').addEventListener('click', function (e) {
    var a = e.target.closest('.cat-tab');
    if (!a) return;
    setActiveTab(a);
    if (a.getAttribute('data-tab') === 'courses' && input.value) setQuery(''); // '강의' 탭 = 전체 강의 보기
  });

  /* ---------- 5. 퀵메뉴: 검색어 자동 입력 ---------- */
  $$('.quick-list a[data-query]').forEach(function (a) {
    a.addEventListener('click', function () { setQuery(a.getAttribute('data-query')); });
  });

  /* ---------- 공통: data-toast 버튼 ---------- */
  document.addEventListener('click', function (e) {
    var cart = e.target.closest('[data-cart]');
    if (cart) { addToCart(cart.getAttribute('data-cart')); return; }
    if (e.target.closest('[data-toast]')) toast();
  });

  /* 하단 탭바 '검색' → 검색창으로 */
  $('#tabSearch').addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: reduceMotion ? 'auto' : 'smooth' });
    input.focus({ preventScroll: true });
  });

  /* ---------- 실행 ---------- */
  renderDeals();
  startCountdown();
  renderRanking('전체');
  applySearch();
  renderShowcase();
  renderReviews();
  $('#studyList').innerHTML = miniHTML(D.studies);
  $('#communityList').innerHTML = miniHTML(D.community);
  initHero();
})();
