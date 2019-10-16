$('.notice a').click(function(e){
   e.preventDefault();
   $(this).parent().hide();
});

var currentCookie = document.cookie;
var cookieCheck = currentCookie.indexOf('portfolio3');

if(cookieCheck>-1){
   $('.notice').hide();
}else{
   $('.notice').show();
}

var date = new Date();

date.setDate(date.getDate()+7);

var setCookie = '';
setCookie += 'CookieName = portfolio3;';
setCookie += 'expires =' +date.toUTCString();

document.cookie = setCookie;
//알림 ////////////////


if($('.main_slide').find('ul').length){
   slider = $('.main_slide').find('ul').bxSlider({
      controls:false,
      pager:true,
      onSliderLoad: function (currentIndex){
         $('.main_slide_pager .slide_index').text(currentIndex + 1);
       },
       onSlideBefore: function ($slideElement, oldIndex, newIndex){
          $('.main_slide_pager .slide_index').text(newIndex + 1);
       }
   });
   $('.main_slide_pager .slide_count').append(slider.getSlideCount());
   }
//메인슬라이드 ////////////////////////

var touchDevice = false;
if(navigator.userAgent.match(/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/)){
   touchDevice = true;
}

$('nav ul').bxSlider({
   pager:false,
   nextText:'<i class="fas fa-chevron-right"></i>',
   prevText:'<i class="fas fa-chevron-left"></i>',
   minSlides:4,
   maxSlides:5,
   slideWidth:120,
   slideMargin:15,
   touchEnabled : touchDevice,
   infiniteLoop:false
});
//카테고리 슬라이드 ////////////////////////


var $header = $('header');
   $(window).scroll(function(){
      if($(this).scrollTop()>0 && !$header.parent().hasClass('login-page')){
         $header.addClass('active');
      }else{
         $header.removeClass('active');
      }
   });
//헤더 고정 //////////////////////


var $sideMenuToggle = $('.header_top_leftmenu'),
   $sideBg = $('.aside-bg');

   $sideMenuToggle.click(function(e){
      e.preventDefault();
      $('body').addClass('open_side');
   });
   $sideBg.click(function(){
      $('body').removeClass('open_side');
   });
//사이드메뉴  ////////////////////////


var $asideCategory = $('.list_title');

   $asideCategory.click(function(){
      $asideCategory.siblings('ul').slideUp(400);
      $(this).siblings('ul').slideDown(400);
      $(this).addClass('active').parent().siblings().find('> div').removeClass('active');
   });
   
//사이드메뉴 카테고리 리스트  ////////////////////////


var searchBtn = $('.header_top_rightmenu button'),
   searchForm = $('.header_top_search');

searchBtn.click(function(){
   if(searchForm.hasClass('active')){
      searchForm.removeClass('active');
   }else{
      searchForm.addClass('active');
   }
});
//검색버튼 클릭 이벤트 ///////////


var galleryContainer = $('.gallery-container'),
   loadBtn = $('.load_more'),
   addItem = 4,
   addedItem = 0,
   itemContainer = [];

   $.getJSON('../content.json', initGallery);

   function initGallery(data){
      itemContainer = data;
      //addItems(galleryContainer);
      //loadBtn.click(addItems);
      galleryContainer.each(function(){
         var $this = $(this);
         addItems($this);
      });      
   }
  
   loadBtn.click(function(){
      $thisParent = $(this).parent().find('.gallery-container');
      addItems($thisParent);
   })
   function addItems(target){
      var elements = [],
         slicedData = itemContainer.slice(addedItem, addedItem + addItem);

      $.each(slicedData, function(i,item){
         var itemHtml =
            '<li class="list_item">'+
            '<div class="thumb_img">'+
               '<a href="product.html"><img src="'+item.images+'" alt="'+item.title+'"></a>'+
               '<form action="#" class="wish_item">'+
                  '<input type="checkbox" id="'+item.label+'">'+
                  '<label for="'+item.label+'">'+
                     '<span><i class="far fa-heart"></i></span>'+
                     '<span><i class="fas fa-heart"></i></span>'+
                  '</label>'+
               '</form>'+
            '</div>'+
            '<!--//thumb_img-->'+
            '<div class="item_info">'+
               '<div class="list_item_color_option">'+
                  '<span class="'+item.colorClass1+'"></span>'+
                  '<span class="'+item.colorClass2+'"></span>'+
                  '<span class="'+item.colorClass3+'"></span>'+
               '</div>'+
               '<!--//list_item_color_option-->'+
               '<p><a href="product.html">'+item.title+'</a></p>'+
               '<p class="list_item_icon">'+
                  '<span class="'+item.icon+'" lang="en">'+item.icon+'</span>'+
               '</p>'+
               '<p class="sale_price">'+item.sale_price+'</p>'+
               '<p class="price">'+item.price+'</p>'+
            '</div>'+
         '</li>';

      elements.push($(itemHtml).get(0));
      target.append(elements);
      
      });
      addedItem += addItem;

      if(addedItem<itemContainer.length){
         loadBtn.show();
      }else{
         loadBtn.hide();
      }
   }
//더보기 버튼 클릭 ///////////////////


var scrollBtn = $('.scrollBtn'),
   scrollBtnTop = scrollBtn.find('a:first-child'),
   scrollBtnBottom = scrollBtn.find('a:last-child');

 $(window).scroll(function(){
    if($(window).scrollTop()>400){
      scrollBtn.addClass('active');
    }else{
      scrollBtn.removeClass('active');
    }
 });

 scrollBtnTop.click(function(e){
   e.preventDefault();
   $('body,html').animate({scrollTop:0},500)
 });
 scrollBtnBottom.click(function(e){
   e.preventDefault();
   $('body,html').animate({scrollTop:$(document).height()},500)
 });
//위아래 이동 버튼 ////////////////


var selectBtn = $('.select_wrapper select');

selectBtn.on({
   'focus' : function(){
      $(this).parent().addClass('focus');
   },
   'blur' : function(){
      $(this).parent().removeClass('focus');
   }
});

selectBtn.change(function(){
   var selectName= $(this).children('option:selected').text();
   $(this).siblings('label').text(selectName);
})
//셀렉트버튼 모양 클릭 /////////////


var listBtn = $('.align_icon a'),
   $lists = $('.section_newarrival ul li');

   listBtn.click(function(e){
      e.preventDefault();
      listBtn.removeClass('active');
      $(this).add($lists).toggleClass('active');
   });

   $('.row2').addClass('active');
//상품리스트페이지 리스트 모양  /////////////


$('.product_slide').bxSlider({
   controls:false
});
//상품상세 슬라이드  /////////////

var colorOption = $('.color_opt div'),
   sizeOption = $('.size_opt div');

   colorOption.click(function(){
   $(this).addClass('active').siblings().removeClass('active');
   var selected = $(this).text();
   $('.color_result').text(selected);
   });

   sizeOption.click(function(){
      $(this).addClass('active').siblings().removeClass('active');
      var selected = $(this).text();
      $('.size_result').text(selected);
   });

//상품상세 옵션 선택 ///////////

var quntity = $('.choose_product'),
   quntityBtn = quntity.find('> span'),
   quntityInput = quntity.find('input'),
   unitPrice = $('.unit_price').attr('data-unit-price'),
   totalCnt = $('.total_cnt'),
   totalPrice = $('.total_price');

   quntityBtn.click(function(){
      var currentCnt = quntityInput.val();
      if($(this).hasClass('plus')){
         quntityInput.val(++currentCnt);
      }else{
         if(currentCnt>1){
            quntityInput.val(--currentCnt); 
         }
      }

      totalCnt=quntityInput.val();

      var total = (currentCnt * unitPrice).toLocaleString('en');
      totalPrice.text('￦ '+ total +' 원 ('+ totalCnt + '개)');
   });
   

//상품 수량
var tabBtn = $('.product_details li'),
   tabPanel = $('.tab-body');

   tabBtn.click(function(e){
      e.preventDefault();
      tabBtn.removeClass('active');
      $(this).addClass('active');
      tabPanel.hide();
      var idx = $(this).index();
      tabPanel.eq(idx).show();
   });
   tabBtn.eq(0).trigger('click');
//상품상세페이지 탭  /////////////

var alignTopLable = $('.inputGroup input');

alignTopLable.click(function(){
   $(this).attr('placeholder','');
   $(this).prev().addClass('active');
});
//label 위로 올리기  /////////////

var signupForm = $('#termAgree-form'),
   agreeAllBtn = signupForm.find('#allAgree'),
   agreebtnCount = signupForm.find('.chk');


signupForm.find('button').click(function(){
   if(signupForm.find('input:checked').length == signupForm.find('input').length){
      location.href='signup.html';
   }else{
      alert('전체 동의 바랍니다');
   }
});

   agreeAllBtn.click(function(){
      if(agreeAllBtn.is(':checked')){
         signupForm.find('.chk').prop('checked',true);
      }else{
         signupForm.find('.chk').prop('checked',false);
      }
   });

   agreebtnCount.click(function(){
      if($('.chk:checked').length == agreebtnCount.length){
         agreeAllBtn.prop('checked',true);
      }else{
         agreeAllBtn.prop('checked',false);
      }
      console.log(agreebtnCount.length);
   });
//약관동의


$('.header_top_search_recentlist a span').click(function(e){
   e.preventDefault();
   $(this).parent('a').hide();
});

$('.search_result form p:first-child').find('.keyword_remove').click(function(){
   $('.search_result form p:first-child').find('input').val('');
   $(this).hide();
});
//검색페이지 키워드 삭제

$('.back').click(function(e){
   e.preventDefault();
   window.history.back();
});


if($('#login-form').length){
   $('#login-form').validate({
      rules:{
         user_id:{
            required:true
         },
         user_pw:{
            required:true
         }
      },
      messages:{
         user_id:{
            required:"아이디를 확인해주세요"
         },
         user_pw:{
            required:"비밀번호를 확인해주세요"
         }
      }
   });
}

if($('#signup-form').length){
   $("#signup-form").validate({
      rules:{
         userId:{
            required:true,
            minlength:2,
            maxlength:16
         },
         userPw:{
            required:true,
            minlength:2,
            maxlength:16
         },
         userPwCheck:{
            required:true,
            minlength:2,
            maxlength:16
         },
         userName:{
            required:true,
            minlength:2
         },
         userAddress1:{
            required:true
         },
         userAddress2:{
            required:true
         },
         userAddress3:{
            required:true
         },
         userPhone:{
            required:true
         },
         userEmail:{
            required:true
         }
      },
      messages:{
         userId:{
            required:"아이디는 필수 입력입니다",
            minlength:"2글자 이상 영문+숫자 포함하여 입력해주세요",
            maxlength:"16글자 이하로 입력해주세요"
         },
         userPw:{
            required:"비밀번호는 필수 입력입니다",
            minlength:"2글자 이상의 영문+숫자+특수기호 포함하여 입력해주세요",
            maxlength:"16글자 이하로 입력해주세요"
         },
         userPwCheck:{
            required:"비밀번호를 확인하여 주세요",
            minlength:"2글자 이상의 영문+숫자+특수기호 포함하여 입력해주세요",
            maxlength:"16글자 이하로 입력해주세요"
         },
         userName:{
            required:"이름은 필수 입력입니다",
            minlength:"2글자 이상 입력해주세요"
         },
         userAddress1:{
            required:"우편번호를 입력해주세요"
         },
         userAddress2:{
            required:"주소는 필수 입력입니다"
         },
         userAddress3:{
            required:"주소는 필수 입력입니다"
         },
         userPhone:{
            required:"전화번호는 필수 입력입니다"
         },
         userEmail:{
            required:"이메일은 필수 입력입니다"
         }
      }
   });
}

