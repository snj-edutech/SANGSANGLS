// var isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ? true : false;
// var agent = navigator.userAgent.toLowerCase();
// var trident = navigator.userAgent.match(/Trident\/(\d.\d)/i);

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
}

function addEvent(){
	headerEvent();
	pageMove('.page-move');
    pageMove('.page-move2', -50);
	fileUploadEvent();
	toggleEvent();

	selectEvent();

	searchValueEvent('.header-search');
	categoryListEvent();

	calenderEvent();
	starEvent();
}

function starEvent(){
	
	$(".btn-star").on("click", function(){
		$(this).toggleClass('active');
	});
}

function calenderEvent(){
	/* 달력 제어 */
	// $(".btn-calendar").not(".disabled").on("click", function(){
	// 	$(this).next(".layer-open").show();
	// });

	// $(".calender-box .calender-table .table-row tr td").on("click", function(){
	// 	$(".layer-open").hide();
	// });

	$(".date-box label").click(function () {
        const input = $(this).find("input.date");

        // input이 disabled가 아닌 경우에만 실행
        if (!input.prop("disabled")) {
            $(this).find(".layer-open").show()
        } else {
            $(this).find(".layer-open").hide();
        }
    });

	// $(document).click(function (event) {
    //     if (!$(event.target).closest(".date-box").length) {
    //         $(".layer-open").hide();
    //     }
    // });

	$(document).on("click", ".calender-box .calender-table .table-row tr td", function () {
        const layerOpen = $(this).closest(".layer-open");

        if (layerOpen.is(":visible")) {
			layerOpen.hide();
        }
    });
}

function searchValueEvent($selector){
	const $input = $($selector).find('input');
    const $cancelBtn = $($selector).find(".search-cancel");

    $input.on('input', toggleCancelBtn);
	toggleCancelBtn();

	function toggleCancelBtn(){
		if ($input.val() === '') {
            $cancelBtn.hide();
        } else {
            $cancelBtn.show();
        }
	}

    $cancelBtn.on('click', function() {
        $input.val('').focus();
        $(this).hide();
    });
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

function headerSearchOpen(){
	$(".header-search").show();
    $("body").append('<div class="popup-dim"></div>');
    $("body .popup-dim").css({top: $(".header-search").offset().top});
}

function headerSearchClose(){
	$(".header-search").hide();
    if($(".popup-dim").is(':visible')){
		$(".popup-dim").remove();
        $("body .popup-dim").css({top: 0});
	}
}

function searchClose(){
	$(".section-search").hide();
   
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

        //console.log($($selector).find('.tab-view').length);

        if($($selector).find('.tab-view').length > 1){
            $($selector).find('.tab-view').removeClass('active');
            $($selector).find('.tab-view').eq(idx).addClass('active');
        }

    });
}

function tabMenuClickEvent($selector){
	$($selector).find('.tab-menu-small').find('li').on('click', function(){
		var idx = $(this).index();
		var tabList = $($selector).find('.tab-menu-small').find('li');

		// 클릭된 li가 속한 ul의 이전에 있는 ul의 li 개수를 모두 더해서 인덱스를 보정
		var prevLis = $(this).closest('ul').prevAll('ul').find('li').length;
		var adjustedIdx = idx + prevLis;  // 이전 ul의 li 개수를 더한 인덱스

		// 모든 li에서 active 클래스 제거 후 클릭된 li에 추가
		tabList.removeClass("active");
		$(this).addClass('active');

		// 모든 tab-view에서 active 클래스 제거 후 해당 인덱스에 active 추가
		if($($selector).find('.tab-view').length > 1){
			$($selector).find('.tab-view').removeClass('active');
			$($selector).find('.tab-view').eq(adjustedIdx).addClass("active");
		}

	});
}

function tabEvent($selector){
	$($selector).find('.tab-list').find('li').on('click', function(){
		var idx = $(this).index();
		var tabList = $($selector).find('.tab-list').find('li');

		if(tabList.children('img').length > 0){
			tabList.each(function(){
				$(this).children('img').attr('src', $(this).children('img').attr('src').replace('_on','_off'));
			});
			tabList.eq(idx).children('img').attr('src', tabList.eq(idx).children('img').attr('src').replace('_off','_on'));
		}

		tabList.removeClass("active");
		tabList.eq(idx).addClass("active");

		if($($selector).find('.tab-view').length > 1){
			$($selector).find('.tab-view').removeClass('active');
			$($selector).find('.tab-view').eq(idx).addClass('active');
		}
    });
}

function tabSlideEvent($selector) {
    $($selector).find('.tab-menu-slide li').on('click', function () {
        const idx = $(this).index();
        const $tabs = $($selector).find('.tab-menu-slide li');
        const $views = $($selector).find('.tab-view');

        // 탭 활성화
        $tabs.removeClass('active');
        $tabs.eq(idx).addClass('active');

        // 뷰 활성화
        $views.removeClass('active');
        $views.eq(idx).addClass('active');

        // 슬라이드 위치 재조정
        $views.eq(idx).find('.slider').slick('setPosition');
    });
}

function slideEvent() {
    // 모든 슬라이더에 대해 처리
    $('.slider').each(function (index, slider) {
        const $slider = $(slider);
        const sliderIdName = 'slider' + index;
        slider.id = sliderIdName; // 각 슬라이더에 고유 ID 부여

        const dataSlide = $slider.data('slide');
		const autoplay = $slider.data('autoplay') || false; // `data-autoplay`로 동작 여부 지정
        const autoplaySpeed = $slider.data('autoplay-speed') || 3000; // `data-autoplay-speed`로 속도 지정
        let options;

        // 슬라이더 별 옵션 설정
        switch (dataSlide) {
            case 'onlineSlider':
                options = {
                    autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: false,
                    arrows: true,
                    slidesToShow: 4,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                    variableWidth: true,
                };
                break;

			case 'threeBannerSlider':
				options = {
					autoplay: autoplay,
					autoplaySpeed: autoplaySpeed,
					dots: false,
					arrows: true,
					slidesToShow: 3,
					slidesToScroll: 1,
					infinite: true,
					centerMode: false,
					variableWidth: true,
				};
				break;
				
            case 'seasonSlider':
                options = {
					autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: false,
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                    variableWidth: true,
                };
                break;

            case 'calenderSlider':
                options = {
					autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: false,
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: false,
                    centerMode: false,
                    variableWidth: false,
                };
                break;

            case 'bannerSlider':
                options = {
					autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: false,
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                    variableWidth: false,
                };
                break;

            case 'twoBannerSlider':
                options = {
					autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: false,
                    arrows: true,
                    slidesToShow: 2,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                    variableWidth: true,

                };
                break;

            default:
                options = {
					autoplay: autoplay,
                    autoplaySpeed: autoplaySpeed,
                    dots: true,
                    arrows: true,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    centerMode: false,
                    variableWidth: false,
                };
        }

        // 슬라이더 초기화
        $slider.slick(options);

        // 페이징 처리
		if ($slider.closest('.page-slide').length) {
			const slidesCount = $slider.children().length; // 슬라이드 개수 확인
			if (slidesCount > 1) { // 슬라이드가 2개 이상일 경우에만 페이징 표시
				let sliderCounter = $slider.siblings('.slick-counter');
				if (!sliderCounter.length) {
					sliderCounter = $('<div class="slick-counter"></div>');
					$slider.parent().append(sliderCounter);
				}
		
				const updateSliderCounter = (slick, currentIndex) => {
					const currentSlide = slick.slickCurrentSlide() + 1;
					const totalSlides = slick.slideCount;
					sliderCounter.html(`<span><strong>${currentSlide}</strong>/${totalSlides}</span>`);
				};
		
				// 강제로 초기 상태 업데이트
				setTimeout(() => {
					const slickInstance = $slider.slick('getSlick');
					updateSliderCounter(slickInstance);
				}, 0);
		
				$slider.on('init', function (event, slick) {
					updateSliderCounter(slick);
				});
		
				$slider.on('afterChange', function (event, slick) {
					updateSliderCounter(slick);
				});
			}
		}
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
	popupReset();

	$($selector).show();

	// if($selector == "#popupSchedule"){
	// 	$('.slider').slick('setPosition');
	// }

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

function popupReset(){
	$('.popup').hide();
	if($(".popup-dim").is(':visible')){
		$(".popup-dim").remove();
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
// popupLayerVideoOpen($url, "autoplay loop controls muted");
// popupLayerVideoOpen($url, "shorts");
function layerVideoOpen($url, $options){
	if(typeof $options == "undefined"){
		$options = "autoplay loop controls";
	}

	var _body = $("#wrap");
	_body.append('<div class="popup" id="popupLayerVideo"><div class="popup-wrap"><a href="javascript:layerVideoClose();" class="popup-close"></a><div class="popup-content"></div></div></div>');

	var _popupLayerContent = $("#popupLayerVideo .popup-content");
    if ($url.indexOf('.mp4') != -1) {
        _popupLayerContent.html('<video playsinline="" controlslist="nodownload" '+$options+'><source src="'+$url+'" type="video/mp4"></video>');
    }else{
        _popupLayerContent.html('<iframe src="'+$url+'" frameborder="no" scrolling="no" marginwidth="0" marginheight="0" width="100%" height="100%" allowfullscreen></iframe>');
    }
  

	if($options == "shorts"){
		$("#popupLayerVideo").addClass(' show shorts');
		$options = "";
	}else{
		$("#popupLayerVideo").addClass('show');
	}
}

function layerVideoClose(){
	$("#popupLayerVideo").remove();
}

function fileUploadEvent(){
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


function toggleEvent(){
    $('[data-toggle]').on('click', function(){
        var $this = $(this);

        $this.parents('dl').toggleClass('unfold').siblings().removeClass('unfold');
    });
}


function selectEvent(){
	const selectBoxElements = document.querySelectorAll(".custom-select");

	function toggleSelectBox(selectBox) {
		selectBox.classList.toggle("active");
	}

	function selectOption(optionElement) {
		const selectBox = optionElement.closest(".custom-select");
		const selectedElement = selectBox.querySelector(".selected-value");
		selectedElement.textContent = optionElement.textContent;
		//selectedElement.style.color = "#2C2923";
	}

	selectBoxElements.forEach(selectBoxElement => {
		selectBoxElement.addEventListener("click", function (e) {
			if (selectBoxElement.querySelector(".selected").classList.contains("disabled")) {
				return;
			}
			
			const targetElement = e.target;
			const isOptionElement = targetElement.classList.contains("option");

			if (isOptionElement) {
				selectOption(targetElement);
			}

			toggleSelectBox(selectBoxElement);
		});
	});

	document.addEventListener("click", function (e) {
		const targetElement = e.target;
		const isSelect = targetElement.classList.contains("select") || targetElement.closest(".custom-select");

		if (isSelect) {
			return;
		}

		const allSelectBoxElements = document.querySelectorAll(".custom-select");

		allSelectBoxElements.forEach(boxElement => {
			boxElement.classList.remove("active");
		});
	});
}


function categoryListEvent(){
	$(".category-list").find("li").on("click", function(){
		$(this).toggleClass('active');
	});
	
}