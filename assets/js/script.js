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

function tabEvent($selector){
    $($selector).find('.tab-list').children('li').on('click', function(){
        var _idx = $(this).index(),
            tabList = $($selector).find('.tab-list').children('li');

        tabList.each(function(){
            $(this).children().find('img').attr('src', $(this).children().find('img').attr('src').replace('_on', '_off'));
        });
        tabList.eq(_idx).children().find('img').attr('src', tabList.eq(_idx).children().find('img').attr('src').replace('_off', '_on'));

        $($selector).find('.tab-view').removeClass('active');
        $($selector).find('.tab-view').eq(_idx).addClass('active');
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


