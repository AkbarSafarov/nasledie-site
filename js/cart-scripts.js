$(function(){

    $(".file-upload input[type=file]").change(function(){
            var filename = $(this).val().replace(/.*\\/, "");
            $("#filename").val(filename);
    });

    const SWIPER = new Swiper('.swiper.slider-wrap', {
        slidesPerView: 4,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 10,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        navigation: {
            nextEl: '.recently-block__slider-controls .swiper-button-next',
            prevEl: '.recently-block__slider-controls .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.24
            },
            551: {
                slidesPerView: 2.2
            },
            981: {
                slidesPerView: 2.5
            },
            1100: {
                slidesPerView: 3.3
            },
            1200: {
                slidesPerView: 4
            }
        },
        autoplay: {
            delay: 3000,
        }
    });
    

    const SWIPER22 = new Swiper('.swiper.slider-wrap2', {
        slidesPerView: 3,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 10,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        navigation: {
            nextEl: '.main-slider__inner__body__controls .swiper-button-next',
            prevEl: '.main-slider__inner__body__controls .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.24
            },
            551: {
                slidesPerView: 2.2
            },
            768: {
                slidesPerView: 3
            },
            981: {
                slidesPerView: 2.5
            },
            1100: {
                slidesPerView: 3
            }
        },
        autoplay: {
            delay: 3000,
        }
    });

    const swiperElements = document.querySelectorAll('.swiper.slider-wrap3');

    swiperElements.forEach(swiperElement => {
        new Swiper(swiperElement, {
            slidesPerView: 4,
            loop: true,
            effect: 'slide',
            speed: 1000,
            spaceBetween: 10,
            lazy: {
                loadPrevNext: true,
                loadPrevNextAmount: 2
            },
            navigation: {
                nextEl: '.main_tabs-block__slider-controls .swiper-button-next',
                prevEl: '.main_tabs-block__slider-controls .swiper-button-prev',
            },
            breakpoints: {
                0: {
                    slidesPerView: 1.24
                },
                551: {
                    slidesPerView: 2.2
                },
                768: {
                    slidesPerView: 3
                },
                981: {
                    slidesPerView: 2.5
                },
                1100: {
                    slidesPerView: 3.3
                },
                1200: {
                    slidesPerView: 4
                }
            },
            autoplay: {
                delay: 3000,
            }
        });
    });

    const SWIPER44 = new Swiper('.swiper.slider-wrap4', {
        slidesPerView: 3,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 40,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        navigation: {
            nextEl: '.main_news__slider-controls .swiper-button-next',
            prevEl: '.main_news__slider-controls .swiper-button-prev',
        },
        breakpoints: {
            0: {
                spaceBetween: 20,
                slidesPerView: 1.24
            },
            551: {
                spaceBetween: 20,
                slidesPerView: 2.2
            },
            981: {
                spaceBetween: 20,
                slidesPerView: 2.5
            },
            1100: {
                spaceBetween: 40,
                slidesPerView: 3
            }
        }
    });

    const SWIPER55 = new Swiper('.swiper.slider-wrap5', {
        slidesPerView: 2,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 18,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        navigation: {
            nextEl: '.main_reviews__body .swiper-button-next',
            prevEl: '.main_reviews__body .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.24
            },
            551: {
                slidesPerView: 1.6
            },
            981: {
                slidesPerView: 1.9
            },
            1100: {
                slidesPerView: 2
            }
        }
    });

    const ABOUT_US_SLIDER = new Swiper('.about-us-block__slider .swiper', {
        slidesPerView: 1,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 0,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        pagination: {
            el: '.about-us-block__slider-inner .swiper-pagination',
            clickable: true,
        }
    });

    const HISTORY_SLIDER = new Swiper('.about-us-block__history-slider .swiper', {
        slidesPerView: 3,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 30,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        navigation: {
            nextEl: '.about-us-block__history .swiper-button-next',
            prevEl: '.about-us-block__history .swiper-button-prev',
        },
        breakpoints: {
            0: {
                slidesPerView: 1.24
            },
            551: {
                spaceBetween: 10,
                slidesPerView: 2.2
            },
            981: {
                slidesPerView: 2.5
            },
            1100: {
                slidesPerView: 3
            }
        },
        autoplay: {
            delay: 3000,
        }
    });

    lightGallery(document.querySelector('.about-us-block__history-slider'), {
        download: false,
        selector: 'a'
    });

    const HISTORY_SLIDER22 = new Swiper('.news_gallery .swiper', {
        slidesPerView: 3,
        loop: true,
        effect: 'slide',
        speed: 1000,
        spaceBetween: 30,
        lazy: {
            loadPrevNext: true, // pre-loads the next image to avoid showing a loading placeholder if possible
            loadPrevNextAmount: 2 //or, if you wish, preload the next 2 images
        },
        pagination: {
            el: '.news_gallery .swiper-pagination',
            clickable: true,
        },
        breakpoints: {
            0: {
                slidesPerView: 1.24
            },
            551: {
                spaceBetween: 10,
                slidesPerView: 2.2
            },
            981: {
                slidesPerView: 2.5
            },
            1100: {
                slidesPerView: 3
            }
        },
        autoplay: {
            delay: 3000,
        }
    });

    lightGallery(document.querySelector('.news_gallery'), {
        download: false,
        selector: 'a'
    });

    let inputValue;
    $('.cart-block__product-amount .product-amount-wrapper button.minus').on('click', function() {
        inputValue = $(this).next().val();
        if(inputValue != 0) {
            $(this).next().val(inputValue-1)
        }
    })
    $('.cart-block__product-amount .product-amount-wrapper button.plus').on('click', function() {
        inputValue = +$(this).prev().val();
        $(this).prev().val(inputValue+1)
    })

    resizeController(980, function(){
		$('.delivery-block__right').insertAfter('.delivery-block__products')
	    $('.cart-block__checkout-btn').appendTo('.order-form__list')
	}, function(){
	
		$('.delivery-block__right').appendTo('.delivery-block__inner')
	    $('.cart-block__checkout-btn').insertBefore('.cart-block__buy-oneclick')
	});

    $('.main_tabs .shop-product-tabs .active-tab a').on('click', function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var thAttr = $(this).attr('href');
    	
    	$(this).closest('.main_tabs').find('.shop-product-tabs > li').removeClass('r-tabs-state-active')
    	$(this).closest('li').addClass('r-tabs-state-active');
    	
    	$(this).closest('.main_tabs').find('.shop2-product-desc > .desc-area').removeClass('active-area').slideUp();
    	$(this).closest('.main_tabs').find(`.shop2-product-desc > .desc-area${thAttr}`).addClass('active-area').slideDown();

    });

    $('.product_tabs .shop-product-tabs .active-tab a').on('click', function(e){
    	e.preventDefault();
    	e.stopPropagation();
    	var thAttr = $(this).attr('href');
    	
    	$(this).closest('.product_tabs').find('.shop-product-tabs > li').removeClass('r-tabs-state-active')
    	$(this).closest('li').addClass('r-tabs-state-active');
    	
    	$(this).closest('.product_tabs').find('.shop2-product-desc > .desc-area').removeClass('active-area').slideUp();
    	$(this).closest('.product_tabs').find(`.shop2-product-desc > .desc-area${thAttr}`).addClass('active-area').slideDown();
    });


    let mySwiper = document.querySelector('.mySwiper_thumb');

    if (mySwiper) {
        const swiperThumb = new Swiper(".mySwiper_thumb", {
            spaceBetween: 12,
            slidesPerView: 3,
            watchSlidesProgress: true,
            breakpoints: {
                0: {
                    spaceBetween: 10,
                },
                768: {
                    spaceBetween: 12,
                    direction: "vertical",
                }
            },
        });

        const swiperMain = new Swiper(".mySwiper_main", {
            spaceBetween: 10,
            effect: "fade",
            thumbs: {
                swiper: swiperThumb,
            },
        });

        let lightGalleryOptions = {
            selector: 'a',
            thumbnail: false,
            fullScreen: false,
            download: false,
            autoplay: false,
            autoplayControls: false,
            actualSize: false
        };

        lightGallery(document.querySelector('.mySwiper_main'), lightGalleryOptions);
    };
    
})

function resizeController(){var i=$(window),o=i.width(),n=[],e=[],t=[void 0,void 0];if(arguments.length)for(var d=0;d<=arguments.length-1;d++)$.isArray(arguments[d])?n=arguments[d]:$.isNumeric(arguments[d])?n.push(arguments[d]):$.isFunction(arguments[d])&&e.push(arguments[d]);i.resize(function(d){o=i.width(),n.length>1?o>=n[0]&&o<=n[n.length-1]&&void 0===t[0]?(e[0](),t[0]=!0,t[1]=void 0):(o<n[0]||o>n[n.length-1])&&void 0===t[1]&&(t[0]=void 0,t[1]=!0,$.isFunction(e[1])&&e[1]()):1==n.length&&(o<=n[0]&&void 0===t[0]?(e[0](),t[0]=!0,t[1]=void 0):o>n[0]&&void 0===t[1]&&(t[0]=void 0,t[1]=!0,$.isFunction(e[1])&&e[1]()))}).trigger("resize")};
