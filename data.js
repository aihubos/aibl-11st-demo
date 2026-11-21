/* =========================================================
 * data.js — 수업 예제용 "더미 데이터" 모음
 * 실제 강의·인물·회사와 무관한 가짜 데이터입니다.
 * 값만 바꾸면 화면이 자동으로 바뀌어요. (app.js가 이 데이터를 그립니다)
 * ========================================================= */
window.AIBL_DATA = {
  /* 썸네일 아이콘(SVG path, 24x24 기준) */
  icons: {
    bolt: 'M13 2 4 14h7l-1 8 9-12h-7l1-8Z',
    robot: 'M5 8h14v11H5zM12 4v4M9 13h.01M15 13h.01M9 16h6',
    doc: 'M5 3h10l4 4v14H5zM14 3v5h5M8 13h8M8 17h5',
    chart: 'M4 20V10M10 20V4M16 20v-7M2 20h20',
    chat: 'M4 5h16v11H9l-5 4z',
    shop: 'M3 4h2l2 10h11l2-7H6M9 20h.01M17 20h.01',
    play: 'M4 6h16v12H4zM10 9l5 3-5 3z',
    image: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15 9h.01',
    code: 'm8 8-4 4 4 4M16 8l4 4-4 4M14 5l-4 14',
    mail: 'M3 6h18v12H3zM3 7l9 6 9-6',
    sheet: 'M4 4h16v16H4zM4 10h16M4 15h16M10 4v16',
    spark: 'M12 3v4M12 17v4M3 12h4M17 12h4M6 6l2.5 2.5M15.5 15.5 18 18M6 18l2.5-2.5M15.5 8.5 18 6'
  },

  /* 썸네일 색 조합 [배경1, 배경2, 아이콘색] */
  palettes: {
    red: ['#FFEFEF', '#FFD0D2', '#D62232'],
    orange: ['#FFF3E8', '#FFD9BC', '#C2541A'],
    purple: ['#F3EEFF', '#DCCFFF', '#5B37C4'],
    blue: ['#EEF6FF', '#CFE2FF', '#2459BF'],
    green: ['#E8F8EE', '#C3EDD3', '#17844A'],
    gray: ['#F5F6F8', '#DDDFE2', '#4A4A52']
  },

  /* 강의 상품 12개 (cat: 입문 / 업무자동화 / 콘텐츠) */
  courses: [
    { id: 'c1', title: 'ChatGPT로 시작하는 AI 업무 입문 — 오늘 바로 쓰는 프롬프트 30선', cat: '입문', tags: ['바로수강', 'BEST'], price: 59000, was: 83000, rating: 4.9, reviews: 1284, students: 8420, icon: 'chat', color: 'red' },
    { id: 'c2', title: '노코드 업무 자동화: 스프레드시트 + AI 봇 연결하기', cat: '업무자동화', tags: ['쿠폰', 'BEST'], price: 79000, was: 121000, rating: 4.8, reviews: 932, students: 6210, icon: 'sheet', color: 'green' },
    { id: 'c3', title: 'AI로 블로그 글 기획부터 자동 발행까지', cat: '콘텐츠', tags: ['NEW'], price: 49000, was: 69000, rating: 4.7, reviews: 214, students: 1830, icon: 'doc', color: 'orange' },
    { id: 'c4', title: '비개발자를 위한 바이브 코딩 첫걸음 (웹페이지 1개 완성)', cat: '입문', tags: ['바로수강', 'NEW'], price: 39000, was: 59000, rating: 4.9, reviews: 576, students: 5120, icon: 'code', color: 'purple' },
    { id: 'c5', title: '쇼핑몰 랜딩페이지 하루 만에 만들기 — AI 카피 + 템플릿', cat: '입문', tags: ['쿠폰'], price: 45000, was: 75000, rating: 4.6, reviews: 388, students: 2940, icon: 'shop', color: 'red' },
    { id: 'c6', title: '이메일·주간보고서 자동화 실전 (매일 30분 아끼기)', cat: '업무자동화', tags: ['쿠폰'], price: 55000, was: 79000, rating: 4.7, reviews: 301, students: 2410, icon: 'mail', color: 'blue' },
    { id: 'c7', title: 'AI 이미지로 상세페이지 디자인하기', cat: '콘텐츠', tags: ['BEST'], price: 62000, was: 89000, rating: 4.8, reviews: 702, students: 4380, icon: 'image', color: 'purple' },
    { id: 'c8', title: '숏폼 영상 대본 AI 기획 클래스', cat: '콘텐츠', tags: ['쿠폰', 'NEW'], price: 35000, was: 49000, rating: 4.5, reviews: 129, students: 1120, icon: 'play', color: 'orange' },
    { id: 'c9', title: '엑셀 데이터 정리 & 차트, AI에게 맡기기', cat: '업무자동화', tags: ['바로수강'], price: 42000, was: 60000, rating: 4.6, reviews: 445, students: 3350, icon: 'chart', color: 'green' },
    { id: 'c10', title: '나만의 AI 상담 챗봇 만들기 (노코드)', cat: '업무자동화', tags: ['NEW'], price: 69000, was: 99000, rating: 4.8, reviews: 168, students: 1480, icon: 'robot', color: 'blue' },
    { id: 'c11', title: '프롬프트 엔지니어링 기초: 좋은 질문 만드는 법', cat: '입문', tags: ['바로수강', 'BEST'], price: 29000, was: 39000, rating: 4.9, reviews: 1650, students: 9870, icon: 'spark', color: 'red' },
    { id: 'c12', title: '반복 업무를 AI 에이전트로 바꾸는 실전 워크숍', cat: '업무자동화', tags: ['BEST', '쿠폰'], price: 89000, was: 149000, rating: 4.7, reviews: 540, students: 3920, icon: 'bolt', color: 'gray' }
  ],

  /* 타임딜 (courseId로 강의를 가리킴) */
  deals: [
    { courseId: 'c2', price: 49000, seatsLeft: 7, seatsTotal: 50 },
    { courseId: 'c7', price: 39000, seatsLeft: 12, seatsTotal: 40 },
    { courseId: 'c10', price: 45000, seatsLeft: 3, seatsTotal: 30 },
    { courseId: 'c4', price: 19000, seatsLeft: 21, seatsTotal: 60 }
  ],

  /* 빌더 결과물 쇼케이스 (가짜 프로젝트) */
  projects: [
    { id: 'p1', title: '쇼핑몰 랜딩페이지', maker: '빌더A', days: 3, tools: 'AI 카피 · HTML 템플릿', icon: 'shop', color: 'red', desc: '수제 쿠키 가게(가상)의 한 장짜리 판매 페이지. 상품 소개, 가격표, 문의 버튼까지 하루 만에 완성했어요.', steps: ['AI로 상품 소개 문구 5가지 뽑기', '템플릿에 문구·색상 넣기', '모바일 화면에서 점검 후 공개'] },
    { id: 'p2', title: '업무 자동화 봇', maker: '빌더B', days: 5, tools: '스프레드시트 · 노코드 자동화', icon: 'robot', color: 'blue', desc: '매일 아침 주문 시트를 읽어서 팀 메신저(가상)에 요약을 보내 주는 봇이에요.', steps: ['시트 구조 정리', '요약 프롬프트 작성', '매일 9시 자동 실행 연결'] },
    { id: 'p3', title: '블로그 자동화', maker: '빌더C', days: 4, tools: 'AI 글쓰기 · 예약 발행', icon: 'doc', color: 'orange', desc: '키워드만 넣으면 초안 → 맞춤법 검사 → 예약 발행 대기열까지 만들어 주는 흐름이에요.', steps: ['키워드 목록 만들기', '글 초안 프롬프트 만들기', '사람이 검수 후 예약 발행'] },
    { id: 'p4', title: '회의록 요약 도우미', maker: '빌더D', days: 2, tools: 'AI 요약 · 문서 템플릿', icon: 'chat', color: 'purple', desc: '회의 메모를 붙여 넣으면 결정 사항·할 일·담당자를 표로 정리해 줘요.', steps: ['회의 메모 붙여넣기', '요약 형식 지정', '표로 복사해서 공유'] },
    { id: 'p5', title: '주간 매출 대시보드', maker: '빌더E', days: 6, tools: '스프레드시트 · 차트', icon: 'chart', color: 'green', desc: '가상의 매출 데이터를 주간 단위 차트로 보여 주는 대시보드예요.', steps: ['데이터 정리 규칙 만들기', 'AI로 수식 만들기', '차트 대시보드 꾸미기'] },
    { id: 'p6', title: '상세페이지 이미지 세트', maker: '빌더F', days: 3, tools: 'AI 이미지 · 디자인 툴', icon: 'image', color: 'gray', desc: '가상의 텀블러 상품을 위한 상세페이지 이미지 6장을 AI로 만들고 다듬었어요.', steps: ['콘셉트 문장 정하기', '이미지 생성 후 고르기', '글자 얹어서 완성'] }
  ],

  /* 수강 후기 (이름은 마스킹된 가짜) */
  ratingDist: { 5: 78, 4: 15, 3: 4, 2: 2, 1: 1 },
  reviews: [
    { name: '김○○', course: 'ChatGPT로 시작하는 AI 업무 입문', stars: 5, date: '2026.11.02', text: '코딩을 하나도 몰랐는데 첫 주에 보고서 초안 쓰는 시간이 절반으로 줄었어요.' },
    { name: '이○○', course: '노코드 업무 자동화', stars: 5, date: '2026.10.28', text: '매일 하던 복사·붙여넣기를 봇이 대신 해 줘요. 실습 위주라 따라가기 쉬웠어요.' },
    { name: '박○○', course: '비개발자를 위한 바이브 코딩 첫걸음', stars: 4, date: '2026.10.21', text: '내 첫 웹페이지가 생겼어요! 중간에 막혔는데 질문 게시판 답변이 빨랐습니다.' },
    { name: '최○○', course: 'AI 이미지로 상세페이지 디자인하기', stars: 5, date: '2026.10.15', text: '디자이너 없이 상세페이지를 만들 수 있다는 게 신기했어요. 예제가 많아 좋아요.' },
    { name: '정○○', course: '엑셀 데이터 정리 & 차트', stars: 4, date: '2026.10.09', text: '수식을 외우지 않아도 된다는 게 핵심. 다만 분량이 조금 더 많았으면 해요.' },
    { name: '한○○', course: '프롬프트 엔지니어링 기초', stars: 5, date: '2026.10.01', text: '질문을 바꾸니 답이 달라지는 걸 직접 체감했어요. 입문자에게 강력 추천!' }
  ],

  /* 스터디 · 커뮤니티 */
  studies: [
    { type: '스터디', title: '주 1회 프롬프트 스터디', meta: '매주 화 20:00 · 온라인', people: '12/15명', icon: 'spark', color: 'red' },
    { type: '스터디', title: '자동화 봇 함께 만들기', meta: '4주 과정 · 온라인', people: '8/10명', icon: 'robot', color: 'blue' },
    { type: '스터디', title: '블로그 30일 챌린지', meta: '매일 인증 · 자율', people: '27/30명', icon: 'doc', color: 'orange' }
  ],
  community: [
    { type: '커뮤니티', title: '질문 게시판 — 막히면 물어보세요', meta: '오늘 새 글 34개', people: '답변률 96%', icon: 'chat', color: 'purple' },
    { type: '커뮤니티', title: '결과물 자랑방', meta: '이번 주 18개 공유', people: '좋아요 1.2천', icon: 'image', color: 'green' },
    { type: '빌더 LIVE', title: '목요일 밤 라이브 Q&A', meta: '매주 목 21:00', people: '알림 신청 320명', icon: 'play', color: 'gray' }
  ]
};
