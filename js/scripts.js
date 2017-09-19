﻿function setImgCover(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'cover'
		});
	});
}
function setImgContain(e) {
	e.each(function() {
		$(this).parent().css({
			'background-image': 'url("'+$(this).attr('src')+'")',
			'background-repeat': 'no-repeat',
			'background-position': 'center center',
			'background-size': 'contain'
		});
	});
}
$(function() {
	setImgCover($('.img-cover'));
	setImgContain($('.img-contain'));
	var device = 'desktop';
	var justSwitched = false;
	function detectDevice() {
		var temp = device;
		if ( Modernizr.mq('(min-width:1591px)') ) {
			device = 'desktop';
		} else if ( Modernizr.mq('(max-width:1590px)') && Modernizr.mq('(min-width:1001px)') ) {
			device = 'tablet'
		} else if ( Modernizr.mq('(max-width:1000px)') ) {
			device = 'mobile'
		}
		if ( temp == device ) {
			justSwitched = false;
		} else {
			justSwitched = true;
		}
	}
	function setRatio() {
		$('[data-ratio]').each(function() {
			var t = $(this);
			t.find('.scale').outerHeight(t.find('.scale').outerWidth()*t.attr('data-'+device+'-ratio'));
		});
	}
	function adaptiveImage() {
		$('.adaptive-image').each(function() {
			$(this).attr('src',$(this).attr('data-'+device+'-image'));
		});
	}
	function setScheduleSlider() {
		if ( $('.schedule__row.slick-initialized').length ) {
			$('.schedule__row').slick('unslick');
		}
		if ( device !== 'desktop' ) {
			$('.schedule__row').slick({
				slidesToShow: 4,
				slidesToScroll: 1,
				arrows: false,
				dots: false,
				infinite: false,
				cssEase: 'ease',
				speed: 300,
				edgeFriction: 0,
				initialSlide: $('.schedule__row').attr('data-today')-1,
				responsive: [
					{
						breakpoint: 1000,
						settings: {
							slidesToShow: 1,
							slidesToScroll: 1
						}
					}
				]
			});
			$('.schedule__nav .prev').on('click', function() {
				$('.schedule__row').slick('slickPrev');
			});
			$('.schedule__nav .next').on('click', function() {
				$('.schedule__row').slick('slickNext');
			});
			$('.schedule__nav a').on('click', function(e) {
				e.preventDefault();
				$('.schedule__row').slick('slickGoTo',$(this).attr('href')-1);
			});
		}
	}
	function changeViewport() {
		if ( $(window).width() >= 720 ) {
			$('meta[name="viewport"]').attr('content','width=1001, user-scalable=yes');
		} else {
			$('meta[name="viewport"]').attr('content','width=320, user-scalable=yes');
		}
	}
	function startApp() {
		changeViewport();
		detectDevice();
		if ( justSwitched ) {
			if ( device == 'mobile' ) {
				$('.header, .footer__row').prepend('<span class="menu-open"><i></i>Меню</span>');
			} else {
				$('.menu-open').remove();
			}
			if ( device !== 'desktop') {
				if ( $('.gallery').length && $('.text-page__lc') ) {
					$('.gallery').detach().insertAfter($('.text-page__lc'));
				}
				if ( $('.navigation').length && $('.introduction').length ) {
					$('.navigation').detach().insertAfter($('.introduction'));
				}
			} else {
				if ( $('.gallery').length && $('.text-page__lc') ) {
					$('.gallery').detach().insertAfter($('.text-page'));
				}
				if ( $('.navigation').length && $('.introduction').length ) {
					$('.navigation').detach().insertBefore($('.introduction'));
				}
			}
			
		}
		setRatio();
		closePersonal();
		adaptiveImage();
		if ( $('.schedule').length ) {
			setScheduleSlider();
		}
	}
	startApp();
	var lastWidth = $(window).width();
	$(window).on('resize', _.debounce(function() {
		if ( $(window).width() != lastWidth ) {
			startApp();
			lastWidth = $(window).width();
		}
		$(window).trigger('scroll');
	}, 100));
	$('.introduction').slick({
		slidesToScroll: 1,
		slidesToShow: 1,
		arrows: false,
		dots: true,
		infinite: true,
		fade: true,
		cssEase: 'ease',
		speed: 300,
		autoplay: true,
		autoplaySpeed: 5000
	});
	function openPersonal() {
		$('.header--button_personal').addClass('is-active');
		$('.personal__drop').addClass('is-dropped');
	}
	function closePersonal() {
		$('.header--button_personal').removeClass('is-active');
		$('.personal__drop').removeClass('is-dropped');
	}
	$('.header--group').on('mouseover', function() {
		if ( device !== 'mobile' ) {
			openPersonal();
		}
	});
	$('.header--group').on('mouseleave', function() {
		if ( device !== 'mobile' ) {
			closePersonal();
		}
	});
	$('.header--button_personal').on('click', function() {
		if ( device == 'mobile' ) {
			if ( !$(this).hasClass('is-active') ) {
				openPersonal();
			} else {
				closePersonal();
			}
		}
	});
	$(document).on('click', function(e) {
		if ( !$(e.target).closest('.header--button_personal').length && !$(e.target).closest('.personal__drop').length ) {
			closePersonal();
		}
	});
	$(document).on('click', '.menu-open', function(e) {
		var t = $(this).parent();
		if ( !$(this).hasClass('is-active') ) {
			$(this).addClass('is-active');
			t.addClass('is-dropped');
		} else {
			$(this).removeClass('is-active');
			t.removeClass('is-dropped');
		}
	});
	$('select').selectric({
		nativeOnMobile: false
	});
	$('.gallery').slick({
		slidesToShow: 5,
		slidesToScroll: 5,
		arrows: true,
		dots: false,
		infinite: true,
		cssEase: 'ease',
		speed: 300,
		responsive: [
			{
				breakpoint: 1590,
				settings: {
					slidesToShow: 3,
					slidesToScroll: 3
				}
			}, {
				breakpoint: 1000,
				settings: {
					slidesToShow: 1,
					slidesToScroll: 1
				}
			}
		]
	});
	$('[data-open]').on('click', function(e) {
		e.preventDefault();
		$(this).addClass('is-active');
		var t = $('[data-target="'+$(this).attr('data-open')+'"]');
		t.siblings('[data-target]').removeClass('is-opened is-active');
		$('.fade-bg').addClass('is-opened');
		t.addClass('is-opened');
		var h = $(window).scrollTop()+($(window).height()-t.outerHeight())/2;
		var diff = 30;
		if ( h < $(window).scrollTop()+(diff*2) ) {
			h = $(window).scrollTop()+diff;
		}
		t.css({
			'top': h+'px'
		}).addClass('is-active').siblings('[data-target]').removeClass('is-active');
	});
	$('[data-target] .modal--close, .fade-bg, [data-modal-close]').on('click', function(e) {
		e.preventDefault();
		$('[data-target], .fade-bg').removeClass('is-opened');
		$('[data-open]').removeClass('is-active');
	});
	$('input, textarea').each(function() {
		$(this).data('holder', $(this).attr('placeholder'));
		$(this).focusin(function() {
			$(this).attr('placeholder', '');
		});
		$(this).focusout(function() {
			$(this).attr('placeholder', $(this).data('holder'));
		});
	});
	$('.zoom').fancybox({
		padding: 0,
		helpers: {
			overlay: {
				locked: false
			}
		}
	});
	$(window).on('scroll', _.debounce(function() {
		if ( $('.schedule').length ) {
		var diff = $(document).scrollTop()-$('.schedule').offset().top;
			if ( diff > 0 ) {
				$('.schedule--head').addClass('is-moved').css({
					'transform': 'translateY('+diff+'px)'
				});
				if ( device == 'mobile' ) {
					$('.schedule__nav .prev, .schedule__nav .next').css({
						'transform': 'translateY('+diff+'px)'
					});
				}
			} else {
				$('.schedule--head').removeClass('is-moved').css({
					'transform': 'translateY(0)'
				});
				if ( device == 'mobile' ) {
					$('.schedule__nav .prev, .schedule__nav .next').css({
						'transform': 'translateY(0)'
					});
				}
			}
		}
	}, 100));
	$('.offer').slick({
		slidesToShow: 1,
		slidesToScroll: 1,
		arrows: false,
		dots: true,
		cssEase: 'ease',
		speed: 300
	});
	$('input[type="checkbox"]').uniform();
	setTimeout(function() {
		if ( !$('[data-target].is-active').length ) {
			$('.offer-gift').trigger('click');
		}
	}, 5000);
});