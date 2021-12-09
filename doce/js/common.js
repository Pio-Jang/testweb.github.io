var currentModule = ''
var playState = true;
var winScroll = $(window).scrollTop();
var winPosition = $(window).scrollTop();

// 스크롤시 텍스트 이동 효과
/*function textUp(){
  $('.text_ef').each(function(i){
      var bottom_of_element = $(this).offset().top + $(this).outerHeight(); //text box의 bottom
      var bottom_of_window = $(window).scrollTop() + $(window).height(); //화면의 bottom
      if( bottom_of_window > bottom_of_element && $(window).scrollTop() <= bottom_of_element){
        $(this).addClass('up');
      }else{
        $(this).removeClass('up');
      }
  });
}*/

// 스크롤 이벤트
$(window).scroll(function () {
  //textUp();

  // 메뉴
  $('#header').toggleClass('fixed', $(window).scrollTop() > 0)

  // 메인인 경우에만 실행
  if (currentModule === 'main') {
    var winHeight = $(window).height();
    winScroll = $(window).scrollTop();

    //스크롤 범위에 메인영상이 있는경우, 영상 play
    if(winScroll < winPosition) {
      if(winScroll <= winHeight/2 && playState == false){
        $(".mainVideo")[0].play();
        $('html,body').stop().animate({scrollTop:0}, 400, 'linear');
        playState = true;
      }
    }
    winPosition = winScroll;

    //sub video play
    $('.video').each(function(i) {
      if($('.video').eq(i).hasClass('stop')) return;
      var videoHeight = $('.video').eq(i).outerHeight();
      var padding = winHeight - videoHeight;
      var videoTop = Math.ceil($('.video').eq(i).offset().top); //video Top 
      var videoBottom = videoTop + videoHeight;

      if(winScroll >= (videoTop - videoHeight) && winScroll < (videoBottom - padding)){
        $('.video').eq(i)[0].play();
        $('.video').eq(i).addClass('stop');
      }
    });
  }
});

// Vue 에 의해서 매 페이지에서 호출되는 onLoad 이벤트
function onLoad (module = '') {
  currentModule = module

  // 공통 실행 부분
  // 스크롤시 텍스트 이동 효과
  AOS.init({
    duration: 2000,
  });

  //toggle slide 실행
  onLoadToggle();

  // 모듈별로 실행이 필요한 경우 추가
  switch (module) {
    case 'main':
      onLoadMain()
      break;

    // request-pg
    // customer
    // recruit

    case 'kcp':
      onLoadKcp()
      break;

    case 'payment':
     //onLoadToggle()
      break;

    case 'recruit':
      onLoadRecruit()
      break;

    case 'marketing':
      //onLoadToggle ()
      break;
  }
}

// 메인
function onLoadMain () {
  var vid =  $(".mainVideo");
  var vidHeight = Math.ceil(vid.height());

  //main video autoplay
  $(".mainVideo")[0].play();

  //main video play
  //스크롤 범위에 메인영상이 있는경우, 영상 종료 후 다음 블럭으로 위치 이동
  $('.mainVideo').on('ended',function(){
    vidHeight = Math.ceil(vid.height());
    if(winScroll <= vidHeight/3 && playState == true){
      $('html,body').stop().animate({scrollTop:vidHeight}, 400, 'linear');
      $(".mainVideo")[0].pause();
    }
    playState = false;
  });
  
  var serviceSlide = new Swiper('.service_list_slide', {
    spaceBetween: 15,
    slidesPerView: 'auto',
    loop: true,
    centeredSlides:true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    }
  });

  //corp_list_slide
  var corpSlideLeft = new Swiper('.corp_slide_left', {
    slidesPerView: 'auto',
    loop: true,
    autoplay: { delay: 0 },
    speed: 5000,
    allowTouchMove: false
  });

  var corpSlideRight = new Swiper('.corp_slide_right', {
    slidesPerView: 'auto',
    loop: true,
    autoplay: { delay: 0 },
    speed: 5000,
    allowTouchMove: false
  });
}

// 토글 QnA형식 슬라이드
function onLoadToggle () {
  var toggleList = "";
  $('.toggle_slide').on('click', '.tit a', function(){
    toggleList = $(this).closest('li');
    if(!toggleList.is(":animated")){
      if(toggleList.hasClass('open')){
        toggleList.removeClass('open').find('.cont').slideUp('fast');
      }else{
        toggleList.siblings('li').removeClass('open').find('.cont').slideUp('fast');
        toggleList.addClass('open').find('.cont').slideDown('fast');
      }
    }
  });
}

// KCP 에서만 사용되는 로딩 함수
function onLoadKcp () {
  var historyListYear = new Swiper('.history_list_year', {
    spaceBetween: 10,
    slidesPerView: 2,
    freeMode: true,
    watchSlidesVisibility: true,
    watchSlidesProgress: true,
  });
  var historyListCont = new Swiper('.history_list_cont', {
    spaceBetween: 18,
    thumbs: {
      swiper: historyListYear[0] || historyListYear
    }
  });
}

// Recruit 에서만 사용되는 로딩 함수
function onLoadRecruit() {
  var interviewSlider = new Swiper('.interview_slider', {
    spaceBetween: 10,
    slidesPerView: 1,
    loop: true,
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true,
    }
  });
}
