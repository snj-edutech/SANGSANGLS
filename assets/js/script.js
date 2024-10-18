var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
var agent = navigator.userAgent.toLowerCase();
var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

var _w;
var _breakpoint = 720;
var _breakpointDesktop = 1099;
var _wrap;
var _wid;

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

    // if(isMobile){
    //     $(".popup-btn a").css({width:"100%"});
    //     $(".btn-print").hide();
    // }else{
    //     $(".popup-btn a").css({width:"50%"});
    //     $(".btn-print").css({display:"inline-block"});
    // }
}

function addEvent(){
    // _w.on("resize", resizeEvent);
    // resizeEvent();
    // //menuEvent();
    // formEvent();
    // listToggle();
    // slickSlide();
    // tabEvent('.tab-box');

    // pcMenu();
    // mobileMenu();


	headerEvent();
	pageMove('.page-move');
    pageMove('.page-move2', -100);
	
}

function scrollMenuEvent(){
	var wt = $(window).scrollTop();
	var scrollTop = $('#sectionMenu').offset().top;

	if( wt >= scrollTop ){
		$('#sectionMenu .tab-menu ul').addClass('fixed');
	} else {
		$('#sectionMenu .tab-menu ul').removeClass('fixed');
	}

	$('#sectionMenu .lecture-content').each(function (index, value) {
		if ($(window).scrollTop() > ($('#' + value.id).offset().top) - 200) {
			$('#sectionMenu .tab-menu li').eq(index).addClass('active').siblings('li').removeClass('active');
		}
	});


}

function pageMove($selector, $position){
	if($position == undefined) $position = 0;

	var selector = $selector;
	$(selector).on('click', function (e) {
		e.preventDefault();

		var _top = $($(this).attr('href'));
		if (typeof (_top) != 'undefined' && typeof (_top.offset()) != 'undefined') { // 대상 체크
			var $target = _top.offset().top;

			$('html,body').animate({
				scrollTop: $target+$position
			}, 500);
		}
	});
}

function pageTopMove(){
	$('html,body').animate({
		scrollTop: 0
	}, 500);
}

function headerTopBannerClose(){
	$(".header-top-banner").slideUp();
}

function headerEvent(){
	$('[data-header-layer]').each(function(){
        var _data = $(this).data('headerLayer'),
            $parent = $(this).parent();

        if( _data == 'toggle' ){
            $(this).click(function(){
                $parent.toggleClass('active');
                $parent.siblings().removeClass('active');
            });
        } 
		/*else if( _data == 'hover' ){
            $parent.mouseenter(function(){
                $parent.addClass('active');
                $parent.siblings().removeClass('active');
                // console.log('hover');
            }).mouseleave(function(){
                $parent.removeClass('active');
                if( $('.header-layer').mouseout ){
                    $parent.removeClass('active');
                    //console.log('out');
                }
            });
        }
		*/
    });
}

function searchOpen(){
	$(".section-search").show();
	$(".header-gnb").addClass('border-none');
}

function searchClose(){
	$(".section-search").slideUp();
	$(".header-gnb").removeClass('border-none');
}


function tabMenuEvent($selector){
	$($selector).find('.tab-menu').find('li').on('click', function(){
		var idx = $(this).index();
		var tabList = $($selector).find('.tab-menu').find('li');

		if(tabList.children('img').length > 0){
			tabList.each(function(){
				$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_on','_off'));
			});
			tabList.eq(idx).children('img').attr('src', tabList.eq(idx).children('img').attr('src').replace('_off','_on'));
		}

		tabList.removeClass("active");
		tabList.eq(idx).addClass("active");

    });
}

function tabEvent($selector){
	$($selector).find('.tab-list').children('li').on('click', function(){
		var idx = $(this).index();
		var tabList = $($selector).find('.tab-list').children('li');

		if(tabList.children('img').length > 0){
			tabList.each(function(){
				$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_on','_off'));
			});
			tabList.eq(idx).children('img').attr('src', tabList.eq(idx).children('img').attr('src').replace('_off','_on'));
		}

		tabList.removeClass("active");
		tabList.eq(idx).addClass("active");

		$($selector).find('.tab-view').removeClass('active');
		$($selector).find('.tab-view').eq(idx).addClass('active');
    });
}

//button event 함수를 만들고
function countEvent(button, type) {
	const countBox = button.closest(".count-box");
	const resultSpan = countBox.querySelector(".result");
	let number = parseInt(resultSpan.innerText);

	if (type === "plus") {
		number++;
	} else if (type === "minus") {
		number = number > 0 ? number - 1 : 0;
	}

	resultSpan.innerText = number;
}


function popupOpen($selector){
	$($selector).show();
 
	if($(window).height() <= $($selector).find(".popup-wrap").outerHeight()){
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

// layer video
// <link rel="stylesheet" href="//img.eduwill.net/eduwill/dev/css/common/eduf.css">
// edufLayerVideoOpen($url, "autoplay loop controls muted");
// edufLayerVideoOpen($url, "shorts");
function edufLayerVideoOpen($url, $options){
	if(typeof $options == "undefined"){
		$options = "autoplay loop controls";
	}

	var _body = $("body");
	_body.append('<div class="eduf-layer" id="edufLayerVideo"><div class="eduf-layer-wrap"><a href="javascript:edufLayerVideoClose();" class="eduf-layer-close"></a><div class="eduf-layer-content"></div></div></div>');

	var _edufLayerContent = $("#edufLayerVideo .eduf-layer-content");
    if ($url.indexOf('.mp4') != -1) {
        _edufLayerContent.html('<video playsinline="" controlslist="nodownload" '+$options+'><source src="'+$url+'" type="video/mp4"></video>');
    }else{
        _edufLayerContent.html('<iframe src="'+$url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" width="100%" height="100%" allowfullscreen></iframe>');
    }
  

	if($options == "shorts"){
		$("#edufLayerVideo").addClass(' show shorts');
		$options = "";
	}else{
		$("#edufLayerVideo").addClass('show');
	}
}

function edufLayerVideoClose(){
	$("#edufLayerVideo").remove();
}

















function slickSlide(){
    if( $('#slickSlider').length > 0 ){
        $('#slickSlider').slick({
            autoplay: true,
            autoplaySpeed: 2000,
            speed: 800,
            infinite: true,
            arrows: false,
            dots: true,
            cssEase: 'linear',
            pauseOnHover: false,
            pauseOnFocus: false,
        });
    }
}

function resizeEvent(){
    _wid = _w.width();

    resetMenu();

    $('.responsive').each(function() {
        var $src = $(this).attr("src");
        var val = (_wid > _breakpoint) ? $src.replace('mobile', 'pc') : $src.replace('pc', 'mobile');

        $(this).attr("src", val);
    });
}

function resetMenu(){
    _wrap.removeClass('open');
}

function menuEvent($wid){
    var deskStart = $wid > _breakpointDesktop;

    if ( !isMobile && deskStart ) {
        // console.log('pc');
        pcMenu();
    } else {
        // console.log('mobile');
        mobileMenu();
    }
}

function mobileMenu(){
    $('[data-mobile-menu]').on('click', function(e){
        e.preventDefault();
        _wrap.toggleClass('open');
    });

    $('[data-sub-menu] > a').on('click', function(e){
        var _target =  $(this).parent();

        e.preventDefault();
        _target.toggleClass('unfold').siblings().removeClass('unfold');
    });
}

function pcMenu(){
    $('[data-sub-menu]').on('mouseenter', function(){
        $(this).addClass('unfold').siblings().removeClass('unfold');
    }).on('mouseleave', function(){
        $(this).removeClass('unfold');
    });
}



function formEvent(){
    var fileTarget = $('.form-control #fileUpload');
    fileTarget.on('change', function(){
        if(window.FileReader){
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }
        $(this).parent().siblings('.fake-file-name').val(filename);
    });
}

function listToggle(){
    $('[data-toggle]').on('click', function(){
        var _idx = $(this).index(),
             controls = $('.util-control').children('a'),
             _data = $(this).data('toggle');

        // console.log(_idx, _data);

        if( _data == 'thumb' ){
            $('.board-list').addClass('board-list-thumb');
        } else {
            $('.board-list').removeClass('board-list-thumb');
        }

        controls.each(function(){
            $(this).children('img').attr('src', $(this).children('img').attr('src').replace('_on', '_off'));
        });
        controls.eq(_idx).children('img').attr('src', controls.eq(_idx).children('img').attr('src').replace('_off', '_on'));
    });
}


