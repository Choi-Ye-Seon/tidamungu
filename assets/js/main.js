// lottie slide banner
var animation1 = bodymovin.loadAnimation({
  container: $('.sc-slide-banner .lottie-area')[0], 
  path: './assets/data/flow.json',
  renderer: 'svg', 
  loop: true, 
  autoplay: true 
});


// sc-banner 배너 Swiper
const swiperBanner = new Swiper('.sc-banner .swiper', {
  loop: true,
  autoplay: {
    delay: 3000
  },
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev'
  },
  pagination: {
    el: ' .sc-banner .swiper-pagination'
  },
  speed: 1000,
  on: {
    init: function () {
      $('.sc-banner .slide-fraction .curr').text(`${this.realIndex + 1}`);
      $('.sc-banner .slide-fraction .total').text(`${this.slides.length}`);
    },
    slideChange: function () {
      $('.sc-banner .slide-fraction .curr').text(`${this.realIndex + 1}`);
      $('.sc-banner .slide-fraction .total').text(`${this.slides.length}`);
    }
  }
});


// sc-banner 배너 play/pause 버튼
$('.sc-banner .swiper-play').click(function () {
  swiperBanner.autoplay.start();
  $(this).addClass('play');
  $('.sc-banner .swiper-play').css('display', 'none');
  $('.sc-banner .swiper-pause').css('display', 'block');
});

$('.sc-banner .swiper-pause').click(function () {
  swiperBanner.autoplay.stop();
  $('.sc-banner .swiper-play').css('display', 'block');
  $('.sc-banner .swiper-pause').css('display', 'none');
});



// 지금 뜨는 베스트 탭 메뉴
$('.sc-best .tab-menu').click(function () {
  $(this).addClass('active').siblings().removeClass('active');
  const bestData = $(this).data('tab');
  $(bestData).addClass('on').siblings().removeClass('on');
});



// 놓치면 안될 특가 상품 Hot Sale 탭 메뉴
$('.sc-hot-sale .tab-menu').click(function () {
  $(this).addClass('active').siblings().removeClass('active');

  // tab-view 클래스 토글
  const saleConData = $(this).data('tab');
  $(saleConData).addClass('on').siblings().removeClass('on');

  // swiper-btn 클래스 토글
  const saleBtnData = $(this).data('btn');
  $(saleBtnData).addClass('on').siblings().removeClass('on');
});


// 놓치면 안될 특가 상품 Hot Sale Swiper
const saleSwipers = [
  new Swiper('.sc-hot-sale .sale-mobile .swiper',{
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
      prevEl: '.sc-hot-sale .mobile-btn-prev',
      nextEl: '.sc-hot-sale .mobile-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  }
),
  new Swiper('.sc-hot-sale .sale-life .swiper',{
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
      prevEl: '.sc-hot-sale .life-btn-prev',
      nextEl: '.sc-hot-sale .life-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  }),
  new Swiper('.sc-hot-sale .sale-digital .swiper',{
    slidesPerView: 2,
    spaceBetween: 4,
    navigation: {
      prevEl: '.sc-hot-sale .digital-btn-prev',
      nextEl: '.sc-hot-sale .digital-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  })
];



// 방금 나온 신제품 New Arrival Swiper
const swiperNew = new Swiper (".sc-new-arrival .swiper",{
  spaceBetween:1,
  pagination:{
    el:".sc-new-arrival .swiper-pagination",
    type: "progressbar"
  },
  loop:true,
  breakpoints:{
    1024:{
      slidesPerView: 1.75,
      centeredSlides: true,
      speed: 1000,
      loop:false,
     }
  }
});


// new arrival 마우스 이벤트
mm = gsap.matchMedia();

mm.add("(min-width: 1024px)", () => {
  const cursor = document.querySelector(".cursor");
  const pos = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  const mouse = { x: pos.x, y: pos.y };
  const speed = 1;

  const xSet = gsap.quickSetter(cursor, "x", "px");
  const ySet = gsap.quickSetter(cursor, "y", "px");

  const pointerMoveHandler = (e) => {
    mouse.x = e.x;
    mouse.y = e.y;
  };

  window.addEventListener("pointermove", pointerMoveHandler);

  gsap.set(".cursor", { xPercent: -50, yPercent: -50 });

  const tickerHandler = () => {
    const dt = 1.0 - Math.pow(1.0 - speed, gsap.ticker.deltaRatio());
    pos.x += (mouse.x - pos.x) * dt;
    pos.y += (mouse.y - pos.y) * dt;
    xSet(pos.x);
    ySet(pos.y);
  };

  gsap.ticker.add(tickerHandler);


  // new arrival .link-product hover 이벤트
  $(".new-arrival-wrap .link-product").hover(
    function () {
      $(".new-arrival-wrap .cursor").css("opacity", 0);
    },
    function () {
      $(".new-arrival-wrap .cursor").css("opacity", 1);
    }
  );

  // 초기화 로직
  return () => {
    // 이벤트 제거
    window.removeEventListener("pointermove", pointerMoveHandler);
    gsap.ticker.remove(tickerHandler);

    $(".new-arrival-wrap .cursor").css("opacity", 1); // opacity 초기화
  };
});



// 놓치면 안될 특가 상품 Hot Sale 탭 메뉴
$('.sc-md-pick .tab-menu').click(function () {
  $(this).addClass('active').siblings().removeClass('active');

  const mdConData = $(this).data('tab');
  $(mdConData).addClass('on').siblings().removeClass('on');

  const mdBtnData = $(this).data('btn');
  $(mdBtnData).addClass('on').siblings().removeClass('on');
});



// 티다문구점 MD 추천 MD PICK Swiper
const mdSwipers = [
  new Swiper('.sc-md-pick .md-mobile .swiper',{
    slidesPerView:2,
    spaceBetween:4,
    navigation: {
      prevEl: '.sc-md-pick .mobile-btn-prev',
      nextEl: '.sc-md-pick .mobile-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  }),
  new Swiper('.sc-md-pick  .md-life .swiper',{
    slidesPerView:2,
    spaceBetween:4,
    navigation: {
      prevEl: '.sc-md-pick .life-btn-prev',
      nextEl: '.sc-md-pick .life-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  }),
  new Swiper('.sc-md-pick  .md-digital .swiper',{
    slidesPerView:2,
    spaceBetween:4,
    navigation: {
      prevEl: '.sc-md-pick .digital-btn-prev',
      nextEl: '.sc-md-pick .digital-btn-next',
    },
    breakpoints:{
      1024:{
        slidesPerView: 4,
        spaceBetween: 4,
      },
      550:{
        slidesPerView: 3,
    spaceBetween: 4,
      }
    }
  })
];




// slogan pc
mm.add('(min-width: 1024px)', () => {
  const slogan = gsap.timeline({
    scrollTrigger:{
      trigger:".sc-slogan",
      start:"0% 65%",
      end:"100% 75%",
      // markers:true,
      scrub:1
    }
  });
  gsap.set('.sc-slogan .slogan-wrap',{y:-200});

  slogan
  .to('.sc-slogan .slogan-wrap',{y:100},"a")
  .to(".sc-slogan .slogan-text",{y:'-27.5vh', rotate:'342deg'},"a")
  .to(".sc-slogan .slogan-shape",{y:'-23vh'},"<+=0.2");

  return () => {
    // 모든 요소 초기 상태로 되돌리기
    // ScrollTrigger 제거 
    // kill() : kill()은 GSAP의 ScrollTrigger에서 제공하는 메서드로, 특정 ScrollTrigger 인스턴스를 제거하는 데 사용됩니다. 이 메서드는 ScrollTrigger가 동작하지 않도록 완전히 해제하며, 애니메이션과 이벤트 리스너도 함께 제거합니다.
    if (slogan.scrollTrigger) {
      slogan.scrollTrigger.kill();
    }
    gsap.set('.sc-slogan .slogan-wrap', { y: 0 });
    gsap.set('.sc-slogan .slogan-text', { y: 0, rotate: 0 });
    gsap.set('.sc-slogan .slogan-shape', { y: 0 });
  }
});



// slogan m
mm.add('(max-width: 1023px)', () => {
  const sloganMobile = gsap.timeline({
    scrollTrigger:{
      trigger:".sc-slogan",
      start:"0% 100%",
      end:"100% 60%",
      // markers:true,
      scrub:1
    }
  });

  sloganMobile
  .to('.sc-slogan .slogan-text', { rotate: '342deg' },"<");

  gsap.to(".sc-slogan .slogan-shape",{rotate:'1080deg',
    scrollTrigger:{
      trigger:".sc-slogan",
      start:"10% 100%",
      end:"100% 70%",
      markers:true,
      scrub:1
    }
  },"<")

});