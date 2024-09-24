var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1100;
var _wrap;
var _navHei;
var _wid;

var _gnb;
var _lnb;
var _menu;
var _menuIcon;
var _dim;


var _header;

$(function(){
    init();
});

function init(){
    create();
    addEvent();

}

function create(){
    _w = $(window);
    _wrap = $('#wrap');
    _wid = _w.width();
    
    _gnb = $("#gnb");
	_lnb = $(".lnb");
    _menu = $(".menu");
    _menuIcon = $(".menu-icon");
    _dim = $( ".dim" );

    _header = $("header");
    _navHei = _header.height();

}

function addEvent(){
    _w.on("resize", resizeEvent);
    resizeEvent();

    _w.on("scroll", scrollEvent);
    scrollEvent();


    $(".bottom-banner .radio-button").on("click", function(){
        $(".fixed-banner").addClass("open");
        if(_wid > _breakpoint && $(".fixed-banner").hasClass("open")){
            $('.comparison-banner').show();
        }
    });

    $(".btn-cancel").on("click", function(){
        $(".fixed-banner").removeClass("open");
        if(_wid < _breakpoint && $(".fixed-banner").hasClass("active")){
            $('.top-banner').show();
            $('.comparison-banner').hide();
        }
    });

    if(isMobile){
        $(".top-banner").on("click", function(){
            if (!$(".fixed-banner").hasClass("open")) {
                $(".fixed-banner").toggleClass("active");
            }

            if(_wid < _breakpoint && $(".fixed-banner").hasClass("active")){
                $("html, body").css({overflow:"hidden"});
            }else{
                $("html, body").css({overflow:"auto"});
            }

        });
    }
    
    
    $('.end input[type=radio]').prop('checked', false);

    tabEvent('.fixed-banner-tab');


    //_menuIcon.on("click", menuEvent);

   // tabEvent('.form-field-tab1');
	//tabEvent('.form-field-tab2');
   // fileUploadEvent();
    
    slideEvent();
    faqClickEvent();
   
 
    if(_wid > _breakpoint){
      pageMove('.page-move');
    }else{
      pageMove('.page-move', -(_navHei/2));
    }


	$(".btn-sns").on("click", function(){
		$(".sns-layer").toggleClass('active');
	});

    numberClickEvent();
}

function numberClickEvent(){
    $('.number-box').each(function() {
        var $numberDisplay = $(this).find('.numberDisplay');
        var $decrementBtn = $(this).find('.decrementBtn');
        var $incrementBtn = $(this).find('.incrementBtn');
        
        var number = 0;
        $numberDisplay.text(number);
        
        $decrementBtn.click(function() {
            if (number > 0) {
            number--;
            $numberDisplay.text(number);
            }
        });
        
        $incrementBtn.click(function() {
            number++;
            $numberDisplay.text(number);
        });
    });
}

function faqClickEvent(){
	$(".benefit-list-title").not(".offclick .benefit-list-title").on("click",function(){
		// if(!$(this).parent(".benefit-list-box").hasClass("active")){
		// 	$(".benefit-list-box").removeClass("active");
		// 	$(".benefit-list-box").find(".benefit-list").slideUp();
		// }

		$(this).parent(".benefit-list-box").toggleClass("active");
		$(this).next(".benefit-list").slideToggle();
		
		if($(this).parent(".benefit-list-box").hasClass("active")){
			var str = $(this).parent(".benefit-list-box").find(".form-field-radio input[type=radio]:checked").val();

            if(_wid > _breakpoint){
                if(str == undefined){
                    $(this).parent(".benefit-list-box").find(".icon-text").hide();
                }else{
                    $(this).parent(".benefit-list-box").find(".icon-text").empty();
                    $(this).parent(".benefit-list-box").find(".icon-text").show().text(str);
                }
            }
		}

	});

}

function tabEvent($selector){
    $($selector).find('ul').find('li').on('click', function(){
        var idx = $(this).index(),
            tabList = $($selector).find('ul').find('li');

        tabList.removeClass("active");
        $(this).addClass("active");

        if(idx == 0){
            $('.top-banner').show();
            $('.comparison-banner').hide();
        }else{
            $('.top-banner').hide();
            $('.comparison-banner').show(); 
        }

        //$($selector).find('.tab-view').hide();
        //$($selector).find('.tab-view').eq(idx).show();
    });
}



function scrollEvent(){
    var st = $(window).scrollTop();
    var sh = $(window).height() / 1.2;
    var section = $('.section');

    section.each(function(i){
        if( st > section.eq(i).offset().top - sh){
            $(this).addClass('active');
        }
        //  else {
        //     $(this).removeClass('active');
        // }
    });

    /*
	if(!isMobile){
	 	if($(window).scrollTop() >= _header.height()){
			$(".fixed-banner").css({top:40});
		}else{
			$(".fixed-banner").css({top:70});
	    }
	}
        */


}


function resizeEvent(){
    _wid = _w.width();
    _navHei = _header.height();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpoint) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });

    if(_wid < _breakpoint){
        $(".comparison-banner").hide();
        $(".top-banner").show();
        $(".fixed-banner").removeClass("open active");
    }else{
        $(".comparison-banner").show();
        $(".top-banner").show();
        $(".fixed-banner").removeClass("open active");
    }



	

    
}


function menuEvent(){
    $(this).toggleClass("active");

    if(_menuIcon.hasClass("active")){
      //  _dim.show();
		_lnb.addClass("on");
        // _gnb.slideDown();
        // _gnb.css("display","block");
        // _header.addClass("change");

    }else{
       // _dim.hide();
		_lnb.removeClass("on");
        // _gnb.slideUp();
        // _header.removeClass("change");
    }
}


function slideEvent() {

    
    $('.slide-container').each(function(key, item) {
		var sliderIdName = 'slider' + key;
			this.id = sliderIdName;
		var sliderId = '#' + sliderIdName;

        $(sliderId).not('.slick-initialized').slick({
            autoplay: true,
            autoplaySpeed: 3000,
            infinite: true,
            arrows: false,
            dots: true,
            slidesToScroll: 1,
            speed: 700,
            slidesToShow: 1,
            pauseOnHover: false,
            pauseOnFocus: false,
            centerMode: true,
            variableWidth: true,
            initialSlide:0
        });


	});


	$('.slide-connect').slick({
		autoplay: false,
		autoplaySpeed: 4000,
		arrows: false,
		fade: true,
		asNavFor: '.slide-connect-pager',
		adaptiveHeight: true
	});

	var _slidesToShow = 7;
	if(_wid > _breakpoint){
		_slidesToShow=7;
	}else{
		_slidesToShow= 4;
	}
	$('.slide-connect-pager').slick({
		loop:true,
		autoplay: false,
		slidesToShow: _slidesToShow,
		autoplaySpeed: 4000,
		asNavFor: '.slide-connect',
		centerMode: false,
		centerPadding: '0px',
		//variableWidth: true,
		focusOnSelect: true,
		arrows: true,
	});
	
}


function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		var $target = _top.offset().top;

    // 모바일에서 gnb 클릭시 gnb 닫기 
    if(_wid < _breakpoint){
      _menuIcon.removeClass("active");
      _dim.hide();
      _gnb.slideUp();
      _header.removeClass("change");
    }

		$('html,body').animate({
			scrollTop: $target+$position
		}, 500);


	});
}


// 210105 수정
function popupOpen($selector){
	$($selector).show();

    if($selector == "#popupCard"){
        btnNextClick(1);
        slideEvent();
    }
    
	if($(window).height() <= $($selector).find(".popup-wrap").outerHeight() || $selector == "#popupRequest"){
		// 팝업이클때는 
		var st = $(window).scrollTop()+50;
		$($selector).addClass("wide").css({top:st});
		$("body").append('<div class="popup-dim"></div>');
	}else{
		// 팝업이 작을때는
		$($selector).removeClass("wide");
		$($selector).css({display:"flex"});
	}
}


// popupClose('#brandLayerEvent');
function popupClose($selector){
    //$('.slide-container').slick("unslick");
	$($selector).hide();

	if($(".popup-dim").is(':visible')){
		$(".popup-dim").remove();
	}

}

function fileUploadEvent() {
    //file upload
    var fileTarget = $('.file-box .upload-hidden');
    fileTarget.on('change', function () {
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).siblings('.upload-name').val(filename);
    });
}




