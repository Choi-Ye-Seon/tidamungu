// min-width:1024px 미디어쿼리 변수 선언
let mediaQuery = window.matchMedia('(min-width: 1024px)');
// gsap 미디어쿼리
let mm = gsap.matchMedia();
// max-width:1023px 미디어쿼리 변수 선언
let mobileMediaQuery = window.matchMedia('(max-width: 1023px)');



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
    // 1024px 미만일 때 hover 이벤트를 제거
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
    navStart.restart(); // 애니메이션 처음부터 실행
  } else {
    navReverse.restart(); // 애니메이션 처음부터 실행
  }
}
// 메모) restart()는 **GSAP 속성(메서드)**입니다. 정확히는 GSAP의 Timeline 또는 Tween 객체에 포함된 메서드로, 해당 애니메이션을 처음부터 다시 시작하도록 설계된 기능
// play()는 애니메이션을 현재 상태에서 이어서 재생
// #header의 상태에 따라 열리거나 닫히는 애니메이션을 항상 초기 상태부터 다시 실행하고 싶기 때문에 restart()를 사용
// navStart가 이미 실행되었거나 완료된 상태에서도 동일한 애니메이션을 반복적으로 실행하려면 restart()가 필요
// 애니메이션이 완료된 상태에서는 play()를 호출해도 효과가 없습니다.
// 반면, restart()는 애니메이션의 상태와 관계없이 항상 처음부터 실행되므로 안정적입니다.

// **off와 on**은 jQuery 이벤트 핸들러 메서드로, 이벤트 중복을 방지하고 새로운 핸들러를 등록하는 데 사용됩니다.
// gsap.timeline()을 두 개 사용하는 이유는 메뉴를 열 때와 닫을 때의 애니메이션 흐름을 분리하여 독립적으로 제어하기 위해서입니다.
// 두 개의 timeline을 사용한다고 해서 반드시 off와 on을 써야 하는 것은 아니지만, 이벤트 핸들러가 중복되는 문제를 피하려면 off와 on을 잘 활용해야 합니다!


// btn-menu click 이벤트 실행
mm.add('(min-width: 1024px)', () => {
  $('.btn-menu').on('click', handleClick);

  // 미디어 쿼리 벗어날 때 초기화
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
