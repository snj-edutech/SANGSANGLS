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
    _w.on("resize", resizeEvent);
    resizeEvent();
    //menuEvent();
    formEvent();
    listToggle();
    slickSlide();
    tabEvent('.tab-box');

    pcMenu();
    mobileMenu();

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

// popupClose('.dimmed','popup_open');
function popupClose($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).hide();
    $popupLayer.hide();
}

// popupOpen('.dimmed', 'popup_open');
function popupOpen($dimName, $idName){
    var dimName = $dimName;
    var $popupLayer = $("#"+$idName);
    $(dimName).show();
    $popupLayer.show();
    popupPosition($popupLayer);
    //openScalePopup($popupLayer);
}


function popupPosition($popupLayer) {
    var st = $(window).scrollTop();
    var winHeight = $(window).height();
    var popupHeight = $popupLayer.outerHeight();

    var topValue = (st + ( winHeight / 2 - popupHeight / 2 ));
    if($(window).height() < popupHeight){
        topValue = st;
    }

    $popupLayer.css({top:topValue});
}


// function openScalePopup($popupLayer){
// 	TweenMax.killTweensOf( $popupLayer );
// 	TweenMax.set( $popupLayer, { scale : 0.5, opacity:0});
// 	TweenMax.to( $popupLayer, 0.4, { scale: 1, opacity:1, ease:Expo.easeInOut });
// }

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