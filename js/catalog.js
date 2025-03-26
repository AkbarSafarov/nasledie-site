$(function(){

    $('.sorting-block__body').on('click', function(){
        $(this).next().stop().slideToggle(250);
        $(this).parent().toggleClass('active');
    });

    $(document).on('click', function(e){
        if (!$(e.target).closest('.sorting-block__body').length) {
            $('.sorting-block__inner').removeClass('active');
            $('.sorting-block__popup').slideUp(250);
        }
    });

    $('.shop2-filter__title').on('click', function () {
        let $parentItem = $(this).parents('.shop2-filter__item');

        $parentItem.siblings().removeClass('active').find('.shop2-filter__title').removeClass('active').next().slideUp(250);

        
        $(this).toggleClass('active');
        $(this).next().slideToggle(250);
        $parentItem.toggleClass('active');
    });


    $(document).on('click touchstart', function(e){
        if( $(e.target).closest('.shop2-filter__item').length) 
          return;

        if($('.shop2-filter__title').hasClass('active')){
            $('.active').removeClass('active');
            $('.shop2-filter__title').next().slideUp(250);
        }
    });

    $('.shop2-filter').find('.param-val').on('click', function(e) {
        e.preventDefault();
        $(this).toggleClass('active-val');
    });

    $('.show_more_fields span').on('click', function(){
        var $this        = $(this);
        var $body        = $this.parent().prev();
        var $hiddenItems = $body.find('.shop2-filter__checkbox').length>1 ? $body.find('.shop2-filter__checkbox:nth-child(n+7)') : $body.find('.shop2-filter__tag:nth-child(n+7)');
        var currentText  = $this.data('text');
        var hideText     = $('html').attr('lang') == 'ru' ? 'Скрыть' : 'Hide';

        if ($hiddenItems.hasClass('active')) {
            $this.find('.show_more_text').text(currentText);
            $hiddenItems.removeClass('active');

            $this.removeClass('active');
        } else {
            $this.find('.show_more_text').text(hideText);
            $hiddenItems.addClass('active');

            $this.addClass('active');
        };
    });

    // $(window).on('resize', function() {
	// 	if ( matchMedia('(min-width: 981px)').matches ) {
    //         $('.filter-pop-in .filter-container').prependTo('.filter-container_wrap');
	// 	}else {
    //         $('.filter-container_wrap .filter-container').appendTo('.filter-pop-in');
    //     }
	// }).trigger('resize');
})