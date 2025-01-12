// min-width:1024px 미디어쿼리 변수 선언
let mediaQuery = window.matchMedia('(min-width: 1024px)');
// max-width:1023px 미디어쿼리 변수 선언
let mobileMediaQuery = window.matchMedia('(max-width: 1023px)');
// gsap 미디어쿼리
let mm = gsap.matchMedia();



// header main nav slide
const swiperNav = new Swiper('#nav .swiper', {
  slidesPerView: 'auto',
  spaceBetween: 10,
  enabled: true,
  breakpoints: {
    1024: {
      slidesPerView: 'auto',
      spaceBetween: 40,
      enabled: false
    },
    550: {
      slidesPerView: 5,
      spaceBetween: 20,
      enabled: true,
      grabCursor: true
    }
  }
});



// header / main nav hover 애니메이션 (+ submenu 노출)
function headerEffect() {
  if (mediaQuery.matches) {

    // 1. main nav hover
    $('#nav .swiper-slide').hover(
      
      // mouseenter
      function () {
        $('#nav .submenu-area').removeClass('show');
        // nav class="active" 토글
        $(this).addClass('active').siblings().removeClass('active');

        // nav와 submenu 매칭 노출
        let navData = $(this).data('nav');
        if (navData) {
          $(navData).addClass('show').siblings().removeClass('show');
        } else {
          $('#nav .submenu-area').removeClass('show');
        }

        // header 배경
        if ($('#nav .submenu-area').hasClass('show')) {
          $('#header').css('background-color', '#f8f7f1');
        } else {
          $('#header').css('background-color', '#fff');
        }
      },
      
      // mouseleave
      function () {
        $(this).removeClass('active');
      }
    );

    // 2. submenu hover 시, main nav animation 유지
    $('#nav .submenu-area').hover(
      function(){
        navData = $(this).attr('class').split(' ').find(cls => cls.endsWith('-sub'));
      $(`[data-nav=".${navData}"]`).addClass('active');
    },
    function(){
      navData = $(this).attr('class').split(' ').find(cls => cls.endsWith('-sub'));
      $(`[data-nav=".${navData}"]`).removeClass('active');
      $(this).removeClass('show');
    });
  } else {
    // 1024px 미만
    $('#nav .swiper-slide').off('mouseenter mouseleave');
    $('#nav .submenu-area').off('mouseenter mouseleave');
  }
}
headerEffect();
mediaQuery.addEventListener('change', headerEffect);



// 전체 메뉴 depth01 + depth02 매칭
function navAllHover() {
  if (mediaQuery.matches) { 
    $('#header .depth01-item').mouseenter(function () {
      $(this).addClass('active').siblings().removeClass('active');

      const menuData = $(this).data('tab');
      $(menuData).addClass('view').siblings().removeClass('view');
    });
  } else {
    $('#header .depth01-item').off('mouseenter');
  }
}
navAllHover();
mediaQuery.addEventListener('change', navAllHover);



// 전체메뉴 gsap 애니메이션 정의
const navStart = gsap.timeline({defaults: {duration: 0.1}, paused: true});
const navReverse = gsap.timeline({defaults: {duration: 0.1}, paused: true});

navStart
.to('#headerFixed', 0.01, {autoAlpha: 0}, 'hidden')
.to('#container', 0.01, {marginTop: 254}, 'hidden')
.to('#nav', 0.01, {opacity: 0}, 'hidden')
.to('#header', {backgroundColor: '#f8f7f1'})
.to('#header .nav-all', {height: 520, autoAlpha: 1}, '<')
.to('#header .nav-inner', {autoAlpha: 1}, '<+=0.01')
.to('#header .logo', {y: 460}, '<');

navReverse
.to('#nav', 0.01, {opacity: 1}, 'show')
.to('#container', 0.01, {marginTop: 20}, 'show')
.to('#header .logo', {y: 0}, 'a')
.to('#header .nav-all', {height: 0, autoAlpha: 0}, 'a+=0.05')
.to('#header .nav-inner', {autoAlpha: 0}, 'a-=0.01')
.to('#header', {backgroundColor: '#fff'}, '<')
.to('#headerFixed', {autoAlpha: 1}, '<');


// btn-menu click 이벤트 선언
function handleClick() {
  $('#header').toggleClass('fixed');
  $('#nav .submenu-area').removeClass('show');

  // header open 클래스 추가
  const isOpen = $('#header').toggleClass('open').hasClass('open');
  if (isOpen) {
    navStart.restart(); 
  } else {
    navReverse.restart();
  }
}


// btn-menu click 이벤트 실행
mm.add('(min-width: 1024px)', () => {
  $('.btn-menu').on('click', handleClick);

  return () => {
    $('#header').removeClass('fixed open'); 
    $('#nav .submenu-area').removeClass('show'); 
    $('#nav').css('opacity', '');
    $('#header').css('background-color', ''); 
    $('#headerFixed').css('opacity', ''); 
    $('#container').css('margin-top', ''); 
    $('#header .logo').css('transform', ''); 
    $('#header .nav-all, #header .nav-inner').css({height: '', opacity: '', visibility: ''});
  };
});


// header mouseleave 시, submenu 닫기 + 배경색 컨트롤
function headerBgEffect() {
  if (mediaQuery.matches) {
    $('#header').mouseleave(function () {
      $('#nav .submenu-area').removeClass('show');

      $('#header').css('background-color', '#fff');

      if ($('#header').hasClass('open')) {
        $('#header').css('background-color', '#f8f7f1');
      }
    });
  } else {
    $('#header').off('mouseleave');
  }
}
headerBgEffect();
mediaQuery.addEventListener('change', headerBgEffect);




// 모바일) btn-menu 클릭 함수 선언+실행
function moblieNavActive() {
  // 초기화
  $('.btn-menu').off('click'); 
  $('#header').removeClass('mobile-nav'); 

  if (mobileMediaQuery.matches) {
    $('.btn-menu').on('click', function () {
      $('#header').toggleClass('mobile-nav');
    });
  } else {
    // pc) click 이벤트 실행
    $('.btn-menu').on('click', handleClick);
  }
}
moblieNavActive();
mobileMediaQuery.addEventListener('change', moblieNavActive);



// 모바일) 전체 메뉴 depth01 + depth02 매칭
function navAllTab() {
  if (mobileMediaQuery.matches) {
    $('.nav-all-m .main-item').on('click', function () {
      $(this).addClass('active').siblings().removeClass('active');

      const menuData = $(this).data('tab');
      $(menuData).addClass('view').siblings().removeClass('view');
    });
  } else {
    $('.nav-all-m .depth01-item').off('click');
  }
}
navAllTab();
mobileMediaQuery.addEventListener('change', navAllTab);



// 모바일) 전체메뉴 클릭 시, html fixed
function htmlFixed() {
  if (mobileMediaQuery.matches) {
    $('.btn-menu').on('click', function () {
      $('html').toggleClass('fixed');

      if ($('html').hasClass('fixed')) {
        $('html').css('overflow-y', 'hidden');
      } else {
        $('html').css('overflow-y', 'visible');
      }
    });
  }
}
htmlFixed();
mobileMediaQuery.addEventListener('change', htmlFixed);



// headerFixed nav swiper
const swiperNavFixed = new Swiper('#headerFixed .swiper', {
  slidesPerView: 'auto',
  spaceBetween: 16,
  enabled: true,
  breakpoints: {
    1024: {
      slidesPerView: 'auto', 
      spaceBetween: 0,
      enabled: false
    },
    550: {
      slidesPerView: 5,
      spaceBetween: 0,
      enabled: true,
      grabCursor: true
    }
  }
});



// headerFixed 노출 영역
$(window).scroll(function () {
  curr = $(this).scrollTop();
  // console.log(curr);

  if (curr > 200) {
    $('#headerFixed').css('display', 'block');
  } else {
    $('#headerFixed').css('display', 'none');
  }
});


// headerFixed submenu 노출
function fixedNavHover() {
  if (mediaQuery.matches) {
    // submenu 노출
    $('#headerFixed .nav-item').hover(

      function () {
        $('#headerFixed .submenu-area').removeClass('show');

        $(this).addClass('active').siblings().removeClass('active');

        let fixedNavData = $(this).data('fixednav');
        if (fixedNavData) {
          $(fixedNavData).addClass('show').siblings().removeClass('show');
        } else {
          $('#headerFixed .submenu-area').removeClass('show');
        }

        // header 배경
        if ($('#headerFixed .submenu-area').hasClass('show')) {
          $('#headerFixed').css('background-color', '#f8f7f1');
        } else {
          $('#headerFixed').css('background-color', 'rgba(255,255,255,0.64)');
        }
      },
      function () {
        $(this).removeClass('active')
      }
    );

    // submenu hover 시, nav acting
    $('#headerFixed .submenu-area').hover(
      function(){
        fixedNavData = $(this).attr('class').split(' ').find(cls => cls.endsWith('-fix'));
        $(`[data-fixednav=".${fixedNavData}"]`).addClass('active');
    },
      function(){
        fixedNavData = $(this).attr('class').split(' ').find(cls => cls.endsWith('-fix'));
        $(`[data-fixednav=".${fixedNavData}"]`).removeClass('active');
        $(this).removeClass('show');
    });  
  } else {
    $('#headerFixed .nav-item').off('mouseenter mouseleave');
    $('#headerFixed .submenu-area').off('mouseenter mouseleave');
  }
}
fixedNavHover();
mediaQuery.addEventListener('change', fixedNavHover);



// headerFixed submenu mouseleave시 닫기 추가
function submenuEffect() {
  if (mediaQuery.matches) {
    $('#headerFixed .submenu-area').mouseleave(function () {
      $(this).removeClass('show');
      $('#headerFixed').css('background-color', 'rgba(255,255,255,0.64)');
    });
  } else {
    $('#header').off('mouseleave'); 
  }
}
submenuEffect();
mediaQuery.addEventListener('change', submenuEffect);



// lottie nav slogan
var animation2 = bodymovin.loadAnimation({
  container: $('#header .nav-slogan')[0], 
  path: './assets/data/nav.json', 
  renderer: 'svg',
  loop: true, 
  autoplay: true 
});



// 모바일) footer 회사정보 toggle
function footerToggle(){
  if(mobileMediaQuery.matches){
    $("#footer .btn-toggle").on("click",function(){
      $("#footer .footer-menu").toggleClass('active');
    });
  }else{
    $("#footer .btn-toggle").off("click");
  }
};
footerToggle();
mobileMediaQuery.addEventListener('change', footerToggle);





//   Top 버튼
$('#topBtn').click(function (e) {
  e.preventDefault();

  window.scrollTo({top: 0, behavior: 'smooth'});
});
