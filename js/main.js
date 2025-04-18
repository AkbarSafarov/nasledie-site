$(function(){

    $('.catalog_btn').on('click', function(){
        $(this).parents('.catalog_block_header').toggleClass('opened');
    })

    $('.btn_call').on('click', function(e){
        e.preventDefault();
        $('.select_btns').toggleClass('opened');
        $('.panel_fixed').removeClass('opened');
    })

    $('.btn_more_tag').on('click', function(e){
        
        if($('.tags_block').hasClass('opened')) {
            $(this).text('Показать все');
            $('.tags_block').removeClass('opened');
        } else {
            $(this).text('Свернуть');
            $('.tags_block').addClass('opened');
        }
    })

    $('.btn_search').on('click', function(){
        $('html, body').animate({
            scrollTop: 0
        },500);
        $('.search_block form input').focus();
        $('.panel_fixed').removeClass('opened');
    })
    
    $('.btn_catalog').on('click', function(){
        $('.panel_fixed').toggleClass('opened');
    })

    $('.slider_block_wr').each(function(){
        const slider = $(this).find('.swiper');
        const sliderId = slider.data('id');
        const sliderClass = '.' + sliderId;
        const arrow = slider.data('arrow');    

        const newProductsSwiper = new Swiper(sliderClass, {
            loop: true,
            slidesPerView: 1,
            loopedSlides: 1,
            navigation: {
                nextEl: '.swiper-' + arrow + '-next',
                prevEl: '.swiper-' + arrow + '-prev',
            },
            pagination: {
                el: ".swiper-pagination",
            },
            effect: "fade",
            lazy: true
        });
    })
    
    var $body = $(document.body),
        $html = $(document.documentElement);

    function formPopup($btn,$wrap){

    var closeForm = $('.formExtraWrapper .close-form'),
            formWrap = $($wrap),
            formBtn = $($btn),
            formOpened = 'opened',
            overflowHidden = 'oveflowHidden';

        closeForm.on('click', function() {
            formWrap.removeClass(formOpened);
            $html.removeClass(overflowHidden);
        });
        formBtn.on('click', function(event) {
            formWrap.addClass(formOpened);
            $html.toggleClass(overflowHidden);
            event.preventDefault();
        });

        $html.on('keyup', function(event) {
            if (formWrap.hasClass(formOpened) && event.keyCode == 27) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
        $body.on('click touchstart', function(a) {
            if ($(a.target).closest('.formExtraWrapper').length || $(a.target).closest(formBtn).length) return;
            if (formWrap.hasClass(formOpened)) {
                formWrap.removeClass(formOpened);
                $html.removeClass(overflowHidden);
            }
        });
    }

    formPopup('.form_btn','.form_popup');

    function thpopup() {
        const wrap = $('.form-popup-wrapper.th_block');

        $('.form-popup-wrapper.opened').removeClass('opened');
        wrap.addClass('opened');
        $html.removeClass('oveflowHidden');

        $('.form-popup-wrapper.th_block').find('.close-form').on('click', function() {
            wrap.removeClass('opened');
        });

        $html.on('keyup', function(event) {
            if (wrap.hasClass('opened') && event.keyCode == 27) {
                wrap.removeClass('opened');
            }
        });
    }

    var menuBtn = $('.burger_btn'),
        menuWrapper = $('.menu_burger'),
        menuClose = $('.menuClose'),        
        openedMenu = 'opened',
        overflowHidden = 'oveflowHidden';

    menuBtn.on("click", function(event) {
        menuWrapper.toggleClass(openedMenu);
        menuBtn.toggleClass(openedMenu);
        $html.toggleClass(overflowHidden);
        $html.toggleClass('open_menu');
        $('.panel_fixed').removeClass('opened');
    });
    menuClose.on("click", function(event) {
        menuWrapper.removeClass(openedMenu);
        menuBtn.removeClass(openedMenu);
        $html.removeClass(overflowHidden);
        $html.removeClass('open_menu');
    });

    $(document).on('click touchstart', function(e){
        if( $(e.target).closest(menuBtn).length || $(e.target).closest(menuWrapper).length || $(e.target).closest('.catalog_block_header').length || $(e.target).closest('.panel_fixed').length) 
          return;
        if (menuBtn.hasClass(openedMenu)){
            menuWrapper.removeClass(openedMenu);
            menuBtn.removeClass(openedMenu);
            $html.removeClass(overflowHidden);
            $html.removeClass('open_menu');
        }

        if($('.catalog_block_header').hasClass('opened')){
            $('.catalog_block_header').removeClass('opened');
        }

        if($('.panel_fixed').hasClass('opened')){
            $('.panel_fixed').removeClass('opened');
        }
    });

    


    $('.type-phone input').on('blur', function(){
        let phoneWrapper = $(this).parents('.tpl-field'),
            thisNumber = $(this).val().split(''),
            lastIndex = thisNumber.length-1,
            lastItem = thisNumber[lastIndex];
        if (isNaN(lastItem)){
            phoneWrapper.addClass('incorrect-phone');
            if (!phoneWrapper.find('.empty_number').length) {
                phoneWrapper.append('<div class="error_text empty_number">Введите номер телефона полностью </div>');
            }
            //$(this).val('');
        } else {
            phoneWrapper.removeClass('incorrect-phone');
            phoneWrapper.removeClass('error');
            phoneWrapper.find('.empty_number').remove();
        }
    });

    $('.tpl-field input').on('input', function(){
        let phoneWrapper = $(this).parents('.tpl-field'),
            thisNumber = $(this).val();
        if (thisNumber && phoneWrapper.hasClass('error')) {
            phoneWrapper.find('.error_text_r').remove();
        }
    });

    $('input,textarea').on('blur', function(){
        if ($(this).parents('.tpl-field').hasClass('error')){
            $(this).parents('.tpl-field').removeClass('error');
            $(this).parents('.tpl-field').find('.error_text').remove();
        }
    })

    $('.type-phone input').inputmask("+7 (999) 999-99-99");


    $('input[type="checkbox"]').on('change', function (event) {

        if (!$(this).closest('.tpl-field.required').hasClass('no_checked') && !$(this).is(":checked")) {
            $(this).closest('.tpl-field.required').addClass('no_checked');
        } else {
            $(this).closest('.tpl-field.required').removeClass('no_checked');
        }
    })

    $('.type-email input').inputmask({
        alias: "email"
    });

    $('.type-email input').on('blur', function () {
        let emailWrapper = $(this).parents('.tpl-field');
        let email = $(this).val();

        // Строгая проверка e-mail
        let emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

        if (email.length > 0 && !emailRegex.test(email)) {
            emailWrapper.addClass('incorrect-phone');

            if (!emailWrapper.find('.empty_number').length) {
                emailWrapper.append('<div class="error_text empty_number">Вы ввели некорректный e-mail</div>');
            } 
        } else {
            emailWrapper.removeClass('incorrect-phone error');
            emailWrapper.find('.empty_number').remove();
        }
    });


    $('.tpl-form-button').on('click', function(e){
        $(this).parents('form').find('.tpl-field').each(function(){

            var valueInput = $(this).find('input').val();
            if ($(this).hasClass('required') && valueInput == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text error_text_r">это поле обязательно для заполнения</div>');
                }
            } 

            var valueTextarea = $(this).find('textarea').val();
            if ($(this).hasClass('required') && valueTextarea == ''){
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text error_text_r">это поле обязательно для заполнения</div>');
                }
            }

            if ($(this).hasClass('no_checked')) {
                $(this).addClass('error');
                if (!$(this).find('.error_text').length) {
                    $(this).append('<div class="error_text error_text_r">это поле обязательно для заполнения</div>');
                }
            }

            var value = $(this).find('select').val();
            var selectedOptionText = $(this).find('select option:selected').text();
            var check = value  != selectedOptionText;

            $(this).find('select option').each(function() {

                if (check == false) {
                    $(this).parents('.tpl-field').addClass('error');
                    if (!$(this).parents('.tpl-field').find('.error_text').length) {
                        $(this).parents('.tpl-field').append('<div class="error_text error_text_r">это поле обязательно для заполнения</div>');
                    }
                } else {
                    if ($(this).parents('.tpl-field').find('.error_text').length) {
                        $(this).parents('.tpl-field').removeClass('error');
                        $(this).parents('.tpl-field').find('.error_text').remove();
                    }
                }
            });
        })

        if ($(this).closest('form').find('.tpl-field').hasClass('incorrect-phone') || $(this).closest('form').find('.tpl-field').hasClass('error')){
            e.preventDefault();
        } else {
             e.preventDefault();
            //thpopup();
            $(this).closest('.remodal.remodal-reviews').addClass('remodal-send');
            $(this).closest('.popup-form').hide();
            if($(this).closest('.remodal')) {
                $(this).closest('.remodal').find('.popup-form-thanks').show();
            }

            if($(this).closest('.contacts-block__form')) {
                $(this).closest('.contacts-block__form').find('.popup-form-thanks').show();
            }
        }
    });


    $('.menu_burger li a').each(function(){
        if ($(this).parent().find('ul').length) {
            $(this).parent().addClass('submenu-parent')
            $(this).append('<i></i>');
        }
    });

    $('.menu_burger li').find('a i').on('click', function(event){
        //$(this).parents('li:first').siblings().removeClass('hasSubmenu');
        $(this).parents('li:first').toggleClass('hasSubmenu');
        return false;
    });

    $('.menu_left_wrap li a').each(function(){
        if ($(this).parent().find('ul').length) {
            $(this).parent().addClass('submenu-parent');
            $(this).append('<i></i>');
        }
    });

    $('.menu_left_wrap li').find('a i').on('click', function(event){
        $(this).parents('li:first').siblings().removeClass('hasSubmenu');
        $(this).parents('li:first').toggleClass('hasSubmenu');
        return false;
    });

    $('.catalog_list_popup li a').each(function(){
        if ($(this).parent().find('ul').length) {
            $(this).parent().addClass('submenu-parent');
            $(this).append('<i></i>');
        }
    });

    $('.catalog_list_popup li').find('a i').on('click', function(event){
        $(this).parents('li:first').siblings().removeClass('hasSubmenu');
        $(this).parents('li:first').toggleClass('hasSubmenu');
        return false;
    });

    $('.list_link li a').on('click', function(e){
        e.preventDefault();
        $(this).parent().siblings('li').removeClass('active');
        $(this).parent().addClass('active');
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 170
        },500);
    });

    $('.btn_list_menu').on('click', function(){
        $('.main_list_menu').toggleClass('active');
    });

    $('.favorite_btn').on('click', function(){
        $(this).toggleClass('active');
    });

    $('.main_list_menu li a').on('click', function(){
        if($('.main_list_menu').hasClass('active')) $('.main_list_menu').removeClass('active');
    });

    var tmenu = $('.header__panel'),
        tmenuOffset = tmenu.offset();

    if (($(window).scrollTop() > tmenuOffset.top)) {
        tmenu.addClass('fixed'); 
    }

    $(window).scroll(function(){
        if (($(window).scrollTop() > tmenuOffset.top)) {
            tmenu.addClass('fixed'); 
        } else {
            tmenu.removeClass('fixed');
        };
    }); 

    $('.menu_btn_service').on('click', function(){
        $(this).toggleClass('active');
        $('.menu_top_main').toggleClass('active');
    })
});

document.addEventListener("DOMContentLoaded", function () {
    checkTagsOverflow(); 
});

function checkTagsOverflow() {
    var tagList = document.getElementById('tagList');
    var expandBtn = document.getElementById('expandBtn');
    
    if (expandBtn){
        if (tagList.scrollWidth > tagList.clientWidth) {
            expandBtn.style.display = 'block';
        } else {
            expandBtn.style.display = 'none';
        }
    }
}

function expandTags() {
    const tagList = document.getElementById('tagList');
    const btn = document.getElementById('expandBtn');

    tagList.classList.toggle('expanded');

    if (btn.classList.contains('active')) {
        btn.classList.remove('active');
        btn.innerText = 'Развернуть все';
    } else {
        btn.classList.add('active');
        btn.innerText = 'Свернуть';
    }
    
}



