const badgeEl = document.querySelector('header, badges');
const toTopEl = document.querySelector('#to-top');

//화면이 스크롤 되면 익명의 함수를 실행함
// _.throttle(함수, 시간)
//0.3초 단위로 함수가 우루루 실행되는 것을 방지함
//배지가 시각적으로만 사라짐(문제점)
window.addEventListener('scroll', _.throttle(function () {
  console.log(window.scrollY);
  if (window.scrollY > 500) { //배지 숨기기
    //gsap.to(요소, 지속시간, 옵션);
    gsap.to(badgeEl, .6, {
      opacity: 0,
      display: 'none' //배지가 완전히 사라짐
    });
    //버튼 보이기
    gsap.to(toTopEl, .2, {
      x: 0
    });
  } else { //배지 보이기
    gsap.to(badgeEl, .6, {
      opacity: 1,
      display: 'block' //배지가 다시 블럭요소로 나타남
    });
    //버튼 숨기기
    gsap.to(toTopEl, .2, {
      x: 100
    });
  }
}, 300)); 

toTopEl.addEventListener('click', function () {
  gsap.to(window, .7, {
    scrollTo: 0
  });
});


const fadeEls = document.querySelectorAll('.visual .fade-in');
fadeEls.forEach(function(fadeEl, index) {
  gsap.to(fadeEl, 1, {
    delay: (index + 1) * .7, //0+1부터 0.7씩 곱해서 딜레이시킴(0.7, 1.4, 2.1, 2.7)
    opacity: 1
  });
});

//new는 생성자(클래스)를 말함
// new Swpier(선택자, 옵션)
new Swiper('.notice-line .swiper-container', {
  direction: 'vertical',
  autoplay: true, //자동으로 슬라이드 됨
  loop: true //loop는 반복재생여부
});

new Swiper('.promotion .swiper-container', {
  slidesPerView: 3, //한번에 보여줄 슬라이드 개수
  spaceBetween: 10, //슬라이드 사이 여백
  centeredSlides: true, //1번 슬라이드가 가운데 보이기
  loop: true, //계속해서 반복함
  //autoplay: {
    //delay: 5000 //5초마다 자동으로 슬라이드 됨
  //},
  pagination: {
    el: '.promotion .swiper-pagination', //페이지 번호 요소 선택자
    clickable: true //사용자가 페이지 번호 요소를 제어할 수 있는가
  },
  navigation: {
    prevEl: '.promotion .swiper-prev',
    nextEl: '.promotion .swiper-next'
  }
});
new Swiper('.awards .swiper-container', {
  autoplay: true,
  loop: true,
  spaceBetween: 30,
  slidesPerView: 5,
  navigation: {
    prevEl: '.awards .swiper-prev',
    nextEl: '.awards .swiper-next'
  }
});

const promotionEl = document.querySelector('.promotion');
const promotionToggleBtn = document.querySelector('.toggle-promotion');
let isHidePromotion = false;
promotionToggleBtn.addEventListener('click', function () {
  isHidePromotion = !isHidePromotion //!는 뒤에 붙어있는 값이 반대가 되도록 만든다.
  if (isHidePromotion) { //if 조건값에 true가 들어오면
    //숨김 처리!
    promotionEl.classList.add('hide');
  } else { //false가 되면
    //보임 처리!
    promotionEl.classList.remove('hide');
  }
});

// 범위 랜덤 함수(소수점 2자리까지)
function random(min, max) {
  // `.toFixed()`를 통해 반환된 문자 데이터를,
  // `parseFloat()`을 통해 소수점을 가지는 숫자 데이터로 변환
  return parseFloat((Math.random() * (max - min) + min).toFixed(2))
}

function floatingObject(selector, delay, size) {
  gsap.to(selector, random(1.5, 2.5), 
  { //옵션
    y: size,
    repeat: -1, //무한반복
    yoyo: true, //위,아래로 왔다갔다함
    ease: Power1.easeInOut, //easing 함수로 좀 더 부드럽게 둥둥 뜸
    delay: random(0, delay)
  });
}
floatingObject('.floating1', 1, 15);
floatingObject('.floating2', .5, 15);
floatingObject('.floating3', 1.5, 20);

const spyEls = document.querySelectorAll('section.scroll-spy');
spyEls.forEach(function (spyEl) {
  new ScrollMagic
    .Scene({
      triggerElement: spyEl, //보여짐 여부를 감시할 요소를 지정 
      triggerHook: .8
    })
    .setClassToggle(spyEl, 'show')
    .addTo(new ScrollMagic.Controller());
});