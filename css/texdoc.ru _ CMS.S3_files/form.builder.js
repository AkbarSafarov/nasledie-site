;(function($) {
	var hover_timeout;
	var keyup_timeout;
	var formBuilder = window.formBuilder = {
		init: function (options) {
			var self = this,
				controls_pos,
				form_pos
				win_scroll = $(window).scrollTop();

            self.main_box = '#form-builder-wrap';
            self.form = '#form';
            self.controls_box = $(self.main_box).find('.controls-wrap');
            self.group_box = '#groups';
            self.group = '.form-group';
            self.row_box = '.form-row-wrap';
            self.row = '.form-row';
            self.multiColRow = '.form-row-wrap.col.origin';
            self.groups_data = options.anketa_groups;

            self.field_box = '.form-field-wrap';
            self.field = '.form-field';
            self.field_controls = '.field-controls';

            self.anketa_id = parseInt(options.anketa_id);
            self.ver_id = parseInt(options.ver_id);
            self.is_locked = parseInt(options.locked);
            self.captcha_enable = parseInt(options.captcha_enable);

            $(document).on('click', function (e) {
                if ($(e.target).parents(self.row_box).length && $(e.target).parents(self.form).length) {
                    $(self.row_box).removeClass('active');
                    $(e.target).parents(self.row_box).addClass('active');
                } else {
                    if ($(e.target).parents(self.row_box).length == 0) {
                        $(self.row_box).removeClass('active');
                    };
                };

                $(self.field_controls).hide().find('.groups-select').remove();
            });

            if (!$(self.form).find('.field-submit-button').length) {
                this.initSubmitButton();
            }

            if (!$(self.form).find('.field-captcha').length && self.captcha_enable == 1) {
                this.initCaptcha();
            }

            var dragObjects = $(self.main_box).find(self.field_box);

            $(self.main_box).find('.controls-wrap').find(self.row_box).each(function () {
                dragObjects.push($(this).get(0));
            });

            for (var i = 0; i < dragObjects.length; i++) {
                new DragObject(dragObjects[i]);
            };

            $(self.form).find(self.row).each(function () {
                new DropTarget($(this).get(0));
            });

            new DropTarget($(self.form).get(0));
            new DropTarget($(self.main_box).find('.dropTargetForm').get(0));

            self.formAdjust();

            self.rowCleaner();

            $(self.main_box).find('.controls-box.active').find('.control-body').show();

            $(self.main_box).find('.controls-box .control-title').on('click', function () {
                self.toggleControlsBox($(this));
            });

            var controls_box_shadow = $('<div class="controls-wrap-shadow"></div>');

            controls_box_shadow.width(self.controls_box.width()).height(self.controls_box.height());
            $(self.main_box).find('.controls-wrap-shadow').remove();

            $(window).scroll(function () {
                if ($(self.form).get(0)) {
                    var controls_pos = self.controls_box.offset().top + self.controls_box.height(),
                        form_pos = $(self.form).offset().top + $(self.form).height();

                    if ($(this).scrollTop() > $(self.form).offset().top - 15 && $(self.form).height() > self.controls_box.height()) {
                        if (!self.controls_box.addClass('fixed').prev('.controls-wrap-shadow').length) {
                            self.controls_box.before(controls_box_shadow);
                        };

                        if ($(this).scrollTop() + $(this).height() >= form_pos && controls_pos >= form_pos) {
                            self.controls_box.removeClass('fixed').addClass('absolute').css('top', $(self.form).height() - self.controls_box.height());
                        } else {
                            self.controls_box.removeClass('absolute').addClass('fixed').removeAttr('style');
                        };
                    } else {
                        self.controls_box.removeClass('fixed').removeClass('absolute').removeAttr('style');
                        controls_box_shadow.remove();
                    };
                };
            });

            $(window).scrollTop(win_scroll - 1);
        },

        reInit: function () {
            var self = this;

            $(self.multiColRow).off('click');

            $(document).on('click', function (e) {
                if ($(e.target).parents(self.row_box).length && $(e.target).parents(self.form).length) {
                    $(self.row_box).removeClass('active');
                    $(e.target).parents(self.row_box).addClass('active');
                } else {
                    if ($(e.target).parents(self.row_box).length == 0) {
                        $(self.row_box).removeClass('active');
                    };
                };

                $(self.field_controls).hide().find('.groups-select').remove();
            });
            $(formBuilder.form).removeClass('no-hover');
        },

        dropItem: function (elem, event, new_field, callback) {
            var self = this,
                sub_row = $('<div class="sub-row"></div>'),
                field_added,
                field_type,
                fields_count,
                new_field_id,
                target,
                target_row,
                part,
                new_elem,
                cleaner,
                new_field_form,
                post_data,
                rnd = new Date().getTime();

            if ($(elem).is(self.row_box)) {

                if (self.is_locked) {
                    s3.alert(s3.loc('ANKETA_LOCKED'));
                    return;
                }

                if ($(event.target).is(self.form) || $(event.target).parents(self.form).length) {
                    new_elem = elem.removeClass('temp').removeAttr('style').show();

                    self.addMultiColRow(new_elem);

                    new_elem.find(self.row).each(function () {
                        new DropTarget($(this).get(0));
                    });
                };
            } else {
                if (!elem.hasClass('hidden') && ($(event.target).is(self.field) || $(event.target).is('.sub-row') || $(event.target).is(self.row) || $(event.target).is('.field-handle') || $(event.target).is('.dropTargetForm'))) {
                    if (self.is_locked) {
                        var data_id = elem.data('fieldId');
                        var $ghost = $(self.form).find('.ghost[data-field-id="' + data_id + '"]');

                        if ($ghost.length) {
                            $ghost.before(elem);
                            elem.css({
                                'position': 'relative',
                                'top': 'auto',
                                'left': 'auto'
                            }).show();
                            self.rowCleaner();

                        }
                        s3.alert(s3.loc('ANKETA_LOCKED'));
                        return;
                    }
                    new_elem = elem.removeClass('temp').attr('onclick', 'formBuilder.showFieldControls($(this), event);').css({
                        'position': 'relative',
                        'top': 'auto',
                        'left': 'auto'
                    }).show();

                    field_type = new_elem.attr('data-field-type');

                    if (new_field) {
                        fields_count = $(self.form).find(self.field_box).size();
                        new_elem.attr('id', 'new_field');
                    };

                    new_elem.find(self.field).height('auto');

                    if ($(event.target).is('.sub-row')) {

                        $(event.target).append(new_elem);

                        target_row = $(event.target).parents(self.row_box);

                        self.autoRowResize(target_row);

                        new DragObject(elem.get(0));

                    } else if ($(event.target).is(self.row)) {

                        $(sub_row).append(new_elem);
                        $(event.target).find('.sub-row:last').after(sub_row);

                        target_row = $(event.target).parent(self.row_box);

                        self.autoRowResize(target_row);

                        new DragObject(elem.get(0));

                    } else if ($(event.target).is('.field-handle')) {
                        part = self.getHoverPart(event);
                        target = $(event.target).parent(self.field_box);
                        target_row = target.parents(self.row_box);
                        cleaner = '<div class="cleaner"></div>';

                        if (part == "left") {
                            target.before(new_elem);
                        } else if (part == "right") {
                            target.after(new_elem);
                        } else if (part == "top") {
                            $(sub_row).append(new_elem);
                            target.parents('.sub-row').before(sub_row);
                        } else if (part == "bottom") {
                            $(sub_row).append(new_elem);
                            target.parents('.sub-row').after(sub_row);
                        };

                        self.autoRowResize(target_row);

                        new DragObject(new_elem.get(0));
                    } else if ($(event.target).is('.dropTargetForm')) {
                        target = $(self.form).find('.sub-row:last');
                        target_row = target.parents(self.row_box);

                        $(sub_row).append(new_elem);
                        target.after(sub_row);
                        self.autoRowResize(target_row);

                        new DragObject(new_elem.get(0));
                    };

                    if (new_field) {
                        target_row = $(self.form).find('#new_field').parents(self.row_box);

                        $.ajax({
                            type: "GET",
                            url: '/-/cms/v1/anketa2/?act=edit_control&anketa_id=' + self.anketa_id + '&' + S3_ACCESS + '&type_id=' + field_type + '&blind_create=1',
                            dataType: 'html',
                            async: false,
                            success: function (data) {
                                if (data) {
                                    var result_data = $('<div>').html(data);
                                    new_field_form = $(result_data).find('#control_edit_form').serializeArray();

                                    $.ajax({
                                        type: "POST",
                                        url: '/-/cms/v1/anketa2/?act=editing_control&' + S3_ACCESS,
                                        data: new_field_form,
                                        dataType: 'html',
                                        async: false,
                                        success: function (field_data) {
                                            if (field_data) {
                                                $(self.form).find('#new_field').removeAttr('style').attr('data-field-id', new_field_id).removeClass('copy').html(field_data);
                                                new_field_id = $(self.form).find('#new_field').find(self.field).attr('data-field-id');
                                                $(self.form).find('#new_field').S3ChangeControls();
                                                $(self.form).find('#new_field').removeAttr('id').attr('data-field-id', new_field_id);


                                                self.autoRowResize(target_row);
                                                self.saveForm();
                                            } else {
                                                $(self.form).find('#new_field').remove();
                                            }
                                            ;
                                        },
                                        error: function () {
                                            $(self.form).find('#new_field').remove();
                                        }
                                    });
                                };
                            },
                            error: function () {
                                s3.alert(JS_ERROR);
                            }
                        });
                    } else {
                        if (field_type == 8) {
                            $(new_elem).find('input[type="radio"][checked]').prop('checked', true);
                        };
                        self.saveForm();
                    };
                } else {
                    new_elem = $('.ghost');
                    $(self.form).find('.helper').remove();
                    $('.ghost').removeClass('ghost').removeClass('clone');
                    $(elem).remove();
                    new DragObject(new_elem.get(0));
                };

                self.reInit();

                if ($(event.target).is('.sub-row') || $(event.target).is(self.row) || $(event.target).is('.field-handle')) {
                    self.rowCleaner();
                };
            };
            if (callback && typeof callback === 'function') {
                callback();
            }
        },

        rowCleaner: function () {
            var self = this;

            $(self.form).find('.helper, .ghost, .temp').remove();

            $(self.form).find(self.field_box).removeClass('flying');

            $(self.form).find(self.row).each(function () {
                var sub_rows_count = $(this).find('.sub-row').size();

                $(this).find('.sub-row').each(function () {
                    if (!$(this).find(self.field_box).length && sub_rows_count > 1) {
                        $(this).remove();
                    };
                });
            });

            $(self.form).find(self.row_box).find(self.row).height('auto');

            setTimeout(function(){
               $(self.form).find(self.row_box).each(function () {
                  var field_height = 0,
                  row_height = 0;

                $(this).find(self.row).each(function () {

                  $(this).find('.sub-row').each(function () {
                    field_height = 0;

                    $(this).find(self.field).height('auto');

                    $(this).find(self.field).each(function () {
                      if (field_height < $(this).height()) {
                        field_height = $(this).height();
                      };
                    });

                    $(this).find(self.field).height(field_height);
                  });

                  this.style.setProperty('height', 'auto', 'important');

                  if (row_height < $(this).outerHeight()) {
                    row_height = $(this).outerHeight();
                  };
                });

                $(this).find('.form-row').each(function () {
                  this.style.setProperty('height', row_height + 'px', 'important');
                });
                $(this).find('.ui-slider-handle').each(function () {
                  this.style.setProperty('height', row_height + 4 + 'px', 'important');
                });
              });
            }, 500)
        },

        initSubmitButton: function () {
            var self = this;
            var obj = {};
            var button = $('<div class="form-field-wrap" data-field-type="16" onclick="formBuilder.showFieldControls($(this), event);">' +
                '<div class="field-handle"></div>' +
                '<div class="form-field title-position-1">' +
                '<div class="title"><span class="field-name">Отправить</span></div>' +
                '<div class="body">' +
                '<div class="field-submit-button">' +
                '<button>Отправить</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');

            if ($(self.form).find('.sub-row').length == 1 && !$(self.form).find('.sub-row > *').length) {
                obj.target = $(self.form).find('.sub-row')[$(self.form).find('.sub-row').length - 1];

                formBuilder.dropItem(button, obj, true);
                formBuilder.reInit();
            } else {
                var form_row_wrap = $('<div class="form-row-wrap" data-cols="1">' +
                    '<div class="form-row"><div class="sub-row"></div></div>' +
                    '<div class="row-controls">' +
                    '<span onclick="formBuilder.moveRowUp($(this));" class="s3-ico i-asc-small"></span>' +
                    '<span onclick="formBuilder.moveRowDown($(this));" class="s3-ico i-desc-small"></span>' +
                    '<span onclick="formBuilder.deleteRow($(this));" class="s3-ico i-trash-white"></span>' +
                    '</div>' +
                    '</div>');
                var o = {};
                o.target = $('#form')[0];
                formBuilder.dropItem(form_row_wrap, o, true, function () {
                    obj.target = $(self.form).find('.sub-row')[$(self.form).find('.sub-row').length - 1];
                    formBuilder.dropItem(button, obj, true);
                    formBuilder.reInit();
                });
            }
        },

        initCaptcha: function () {
            var self = this;
            var obj = {};
            var button = $('<div class="form-field-wrap" data-field-type="18" onclick="formBuilder.showFieldControls($(this), event);">' +
                '<div class="field-handle"></div>' +
                '<div class="form-field title-position-1">' +
                '<div class="title"><span class="field-name">Капча</span></div>' +
                '<div class="body">' +
                '<div class="field-captcha">' +
                '<button>Капча</button>' +
                '</div>' +
                '</div>' +
                '</div>' +
                '</div>');

            if ($(self.form).find('.sub-row').length == 1 && !$(self.form).find('.sub-row > *').length) {
                obj.target = $(self.form).find('.sub-row')[$(self.form).find('.sub-row').length - 1];

                formBuilder.dropItem(button, obj, true);
                formBuilder.reInit();
            } else {
                var form_row_wrap = $('<div class="form-row-wrap" data-cols="1">' +
                    '<div class="form-row"><div class="sub-row"></div></div>' +
                    '<div class="row-controls">' +
                    '<span onclick="formBuilder.moveRowUp($(this));" class="s3-ico i-asc-small"></span>' +
                    '<span onclick="formBuilder.moveRowDown($(this));" class="s3-ico i-desc-small"></span>' +
                    '<span onclick="formBuilder.deleteRow($(this));" class="s3-ico i-trash-white"></span>' +
                    '</div>' +
                    '</div>');
                var o = {};
                o.target = $('#form')[0];
                formBuilder.dropItem(form_row_wrap, o, true, function () {
                    obj.target = $(self.form).find('.sub-row')[$(self.form).find('.sub-row').length - 1];
                    formBuilder.dropItem(button, obj, true);
                    formBuilder.reInit();
                });
            }
        },

        showHelper: function (event, element) {
            var self = this;
            $(self.form).find('.helper').remove();
            if ($(element).is(self.row_box)) {
                if (($(event.target).is(self.form) || $(event.target).parents(self.form).length) && !$(event.target).is('.helper')) {
                    target = $(self.form);

                    if (target.find('.new-after-row').size() == 0) {
                        target.append('<div class="cleaner helper"></div><div class="new-after-row helper"></div>');
                    };
                } else {
                    $(self.form).find('.helper').remove();
                };
            } else {
                if ($(event.target).is('.field-handle')) {
                    var part = self.getHoverPart(event),
                        target = $(event.target).parent(self.field_box);

                    if (target.parents(self.form).length) {
                        $(self.form).find('.helper').remove();

                        if (part == 'left') {
                            if (target.prev('.before-field').size() == 0) {
                                $(target).before('<div class="before-field helper" style="height:' + $(target).outerHeight() + 'px;"></div>');
                            };
                        } else if (part == 'right') {
                            if (target.next('.after-field').size() == 0) {
                                $(target).after('<div class="after-field helper" style="height:' + $(target).outerHeight() + 'px;"></div>');
                            };
                        } else if (part == 'top') {
                            if (target.prev('.before-row').size() == 0) {
                                $(target).before('<div class="before-row helper"></div>');
                            };
                        } else if (part == 'bottom') {
                            if (target.parents('.sub-row').find('.after-row').size() == 0) {
                                $(target).parents('.sub-row').append('<div class="cleaner helper"></div><div class="after-row helper"></div>');
                            };
                        };
                    };
                } else if ($(event.target).is('.sub-row')) {
                    var part = self.getHoverPart(event),
                        target = $(event.target);

                    if (target.parents(self.form).length) {
                        $(self.form).find('.helper').remove();

                        var field_height = target.find(self.field_box).outerHeight(),
                            helper_height = field_height;

                        if (!field_height) {
                            helper_height = $(target).height();
                        };

                        if (target.find('.after-field').size() == 0) {
                            $(target).append('<div class="after-field helper" style="height:' + helper_height + 'px;"></div>');
                        };
                    };
                } else if ($(event.target).is(self.row)) {
                    var part = self.getHoverPart(event),
                        target = $(event.target),
                        helper_height = $(target).find('.sub-row:last').find(self.field_box).outerHeight();

                    if (!helper_height) {
                        helper_height = $(target).find('.sub-row:last').height();
                    };

                    $(self.form).find('.helper').remove();

                    if (target.find('.after-row').size() == 0) {
                        $(target).find('.sub-row:last').append('<div class="cleaner helper"></div><div class="after-row helper"></div>');
                    };
                } else if ($(event.target).is('.dropTargetForm') || $(event.target).is(self.form)) {
                    var target = $(self.row);
                    $(self.form).find('.helper').remove();
                    //if (target.find('.after-row').size() == 0) {
                    $(self.form).find('.form-row-wrap:last').find('.sub-row:last').append('<div class="cleaner helper"></div><div class="after-row helper"></div>');
                    //};
                } else {
                    $(self.form).find('.helper').remove();
                };
            };

        },

        addMultiColRow: function (elem) {
            var self = this,
                new_row = $(elem),
                cols_count = $(new_row).attr('data-cols'),
                row_width = Math.floor($(self.form).width() / cols_count);

            $(new_row).find(self.row).width(row_width);

            $(self.form).append(new_row);

            var rows_count = $(self.form).find(self.row_box).size(),
                rszr = new_row.find('.row-resizer');

            self.reInit();
            self.addSlider(rszr);
            self.saveForm();
        },

        moveRowUp: function (elem) {
            var self = this,
                row = $(elem).parents(self.row_box);

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            if (row.prev(self.row_box).length) {
                row.insertBefore(row.prev(self.row_box));
            };

            self.saveForm();
        },

        moveRowDown: function (elem) {
            var self = this,
                row = $(elem).parents(self.row_box);

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            if (row.next(self.row_box).length) {
                row.insertAfter(row.next(self.row_box));
            };

            self.saveForm();
        },

        getHoverPart: function (event) {
            var self = this,
                elem = $(event.target),
                elem_size = {
                    'height': elem.height(),
                    'width': elem.width(),
                },
                elem_pos = {
                    'left': elem.offset().left,
                    'top': elem.offset().top,
                },
                curr_pos = {
                    'left': event.clientX,
                    'top': event.clientY,
                },
                part = false;

            curr_pos.top += $(document).scrollTop();

            if (
                curr_pos.left >= elem_pos.left && curr_pos.left <= elem_pos.left + elem_size.width / 2 &&
                curr_pos.top >= elem_pos.top + elem_size.height / 4 && curr_pos.top <= elem_pos.top + elem_size.height / 4 * 3
            ) {
                // Лево
                part = 'left';
            } else if (
                curr_pos.left >= elem_pos.left && curr_pos.left > elem_pos.left + elem_size.width / 2 &&
                curr_pos.top >= elem_pos.top + elem_size.height / 4 && curr_pos.top <= elem_pos.top + elem_size.height / 4 * 3) {
                // Право
                part = 'right';
            } else if (
                curr_pos.top >= elem_pos.top && curr_pos.top <= elem_pos.top + elem_size.height / 4
            ) {
                // Верх
                part = 'top';
            } else if (
                curr_pos.top >= elem_pos.top + elem_size.height / 4 * 3 && curr_pos.top <= elem_pos.top + elem_size.height
            ) {
                // Низ
                part = 'bottom';
            };

            return part;
        },

        deleteRow: function (elem) {
            var self = this,
                row = $(elem).parents(self.row_box);

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            s3.confirm(JS_FORM_DELETE_ROW + '?', function () {
                popupController.closeLastPopup();
                if (row.find(self.field_box).size() == 0) {
                    row.remove();
                    self.saveForm();
                } else {
                    s3.alert(JS_FORM_ROW_CONTAINS_FIELDS);
                };
            });
        },

        addSlider: function (element) {
            var self = this,
                form_width = $(self.form).width(),
                parent_row = $(element).parent(self.row_box),
                sizes = [];

            parent_row.find(self.row).each(function () {
                sizes.push(parseInt($(this).width()));
            });

            $(element).each(function () {
                var cols_count = $(this).attr('data-cols');

                if (cols_count) {

                    if (sizes.length == 0) {
                        if (cols_count == "2") {
                            sizes = [495];
                        } else {
                            sizes = [330, 660];
                        };
                    } else {
                        if (cols_count == "2") {
                            sizes.splice(1, 1);
                        } else {
                            sizes[1] = sizes[0] + sizes[1];
                            sizes.splice(2, 1);
                        };
                    };

                    if (cols_count == "2") {
                        $(this).slider({
                            value: sizes[0],
                            min: 0,
                            max: form_width,
                            step: 5,
                            start: function (event) {
                                var row_wrap = $(event.target).parents(self.row_box);
                                $(row_wrap).addClass('resizing');
                            },
                            slide: function (event, ui) {
                                var row_wrap = $(event.target).parents(self.row_box);
                                if (
                                    ui.value < 20 ||
                                    ui.value < parseInt(row_wrap.find(self.row).eq(0).css('min-width').replace('px', '')) ||
                                    form_width - ui.value < parseInt(row_wrap.find(self.row).eq(1).css('min-width').replace('px', ''))
                                ) {
                                    return false;
                                };
                                resizeRow(event, ui);
                            },
                            stop: function (event) {
                                var row_wrap = $(event.target).parents(self.row_box);
                                row_wrap.removeClass('resizing');

                                element.parent(self.row_box).find(self.row).css('min-width', 0);

                                self.saveForm();
                            }
                        });
                    } else {
                        $(this).slider({
                            range: true,
                            min: 0,
                            max: form_width,
                            step: 5,
                            values: [sizes[0], sizes[1]],
                            start: function (event) {
                                var row_wrap = $(event.target).parents(self.row_box);
                                $(row_wrap).addClass('resizing');
                            },
                            slide: function (event, ui) {
                                var row_wrap = $(event.target).parents(self.row_box);

                                if ($(ui.handle).next('.ui-slider-handle').size()) {
                                    if (
                                        ui.values[0] < 20 || form_width - ui.values[0] - (form_width - ui.values[1]) < 20 || form_width - ui.values[1] < 20 ||
                                        ui.values[0] < parseInt(row_wrap.find(self.row).eq(0).css('min-width').replace('px', '')) ||
                                        form_width - ui.values[0] - (form_width - ui.values[1]) < parseInt(row_wrap.find(self.row).eq(1).css('min-width').replace('px', ''))
                                    ) {
                                        return false;
                                    };
                                } else {
                                    if (
                                        form_width - ui.values[0] - (form_width - ui.values[1]) < parseInt(row_wrap.find(self.row).eq(1).css('min-width').replace('px', '')) ||
                                        form_width - ui.values[1] < parseInt(row_wrap.find(self.row).eq(2).css('min-width').replace('px', ''))
                                    ) {
                                        return false;
                                    };
                                };
                                resizeRow(event, ui);
                            },
                            stop: function (event) {
                                var row_wrap = $(event.target).parents(self.row_box);
                                row_wrap.removeClass('resizing');

                                element.parent(self.row_box).find(self.row).css('min-width', 0);

                                self.saveForm();
                            }
                        });
                    };

                    function resizeRow(event, ui) {
                        var row_wrap = $(event.target).parent(self.row_box),
                            min_width = 0;

                        row_wrap.find(self.row).each(function () {
                            min_width = 0;

                            $(this).find(self.field_box).each(function () {
                                if (min_width < $(this).outerWidth()) {
                                    min_width = $(this).outerWidth();
                                };
                            });

                            if ($(this).outerWidth() < min_width) {
                                min_width = $(this).outerWidth() - 15;
                            };

                            $(this).css('min-width', min_width + 10);
                        });

                        if (ui.values) {
                            if ($(ui.handle).next('.ui-slider-handle').size()) {
                                if (
                                    ui.values[0] < parseInt(row_wrap.find(self.row).eq(0).css('min-width').replace('px', '')) ||
                                    form_width - ui.values[0] - (form_width - ui.values[1]) < parseInt(row_wrap.find(self.row).eq(1).css('min-width').replace('px', ''))
                                ) {
                                    return false;
                                };
                            } else {
                                if (
                                    form_width - ui.values[1] < parseInt(row_wrap.find(self.row).eq(2).css('min-width').replace('px', ''))
                                ) {
                                    return false;
                                };
                            };
                            row_wrap.find(self.row).eq(0).width(ui.values[0]);
                            row_wrap.find(self.row).eq(1).width(form_width - ui.values[0] - (form_width - ui.values[1]));
                            row_wrap.find(self.row).eq(2).width(form_width - ui.values[1]);
                        } else {
                            if (
                                ui.value < parseInt(row_wrap.find(self.row).eq(0).css('min-width').replace('px', '')) ||
                                form_width - ui.value < parseInt(row_wrap.find(self.row).eq(1).css('min-width').replace('px', ''))
                            ) {
                                return false;
                            };
                            row_wrap.find(self.row).eq(0).width(ui.value);
                            row_wrap.find(self.row).eq(1).width(form_width - ui.value);
                        };

                        row_wrap.find(self.row).height('auto');

                        var new_height = 0;
                        row_wrap.find(self.row).each(function () {
                            if (new_height < $(this).height()) {
                                new_height = $(this).height();
                            };
                        });

                        row_wrap.find('.form-row').each(function () {
                            this.style.setProperty('height', new_height + 'px', 'important');
                        });

                        row_wrap.find('.ui-slider-handle').each(function () {
                            this.style.setProperty('height', new_height + 4 + 'px', 'important');
                        });
                    };
                };
            });

            self.autoRowResize(parent_row);
        },

        autoRowResize: function (target_row) {
            var self = this,
                form_width = $(self.form).width();

            if (!target_row) {
                return false;
            };

            self.rowCleaner();

            $(target_row).find(self.row).each(function () {
                var row_width = 0,
                    index = $(this).index();

                $(this).find(self.field_box).each(function () {
                    if (row_width < $(this).outerWidth()) {
                        row_width = $(this).outerWidth();
                    };
                });

                row_width += 10;

                if ($(this).width() < row_width) {
                    if ($(target_row).attr('data-cols') == 2) {
                        if (index == 0) {
                            $(target_row).find('.row-resizer').slider('value', row_width);

                            var next_width = $(this).next(self.row).width() - (row_width - $(this).width());
                            $(this).width(row_width);
                            $(this).next(self.row).width(next_width);
                        } else {
                            var prev_width = $(this).prev(self.row).width() - (row_width - $(this).width());

                            $(target_row).find('.row-resizer').slider('value', form_width - row_width);

                            $(this).width(row_width);
                            $(this).prev(self.row).width(prev_width);
                        };
                    } else {
                        if (index == 0) {
                            var next_width = $(this).next(self.row).width() - (row_width - $(this).width());

                            $(target_row).find('.row-resizer').slider('values', 0, row_width);

                            $(this).width(row_width);
                            $(this).next(self.row).width(next_width);
                        } else if (index == 1) {
                            var next_width = $(this).next(self.row).width() - (row_width - $(this).width()),
                                prev_width = $(this).prev(self.row).width();

                            $(target_row).find('.row-resizer').slider('values', 1, row_width + prev_width);

                            $(this).width(row_width);
                            $(this).next(self.row).width(next_width);
                        } else {
                            var prev_width = $(this).prev(self.row).width() - (row_width - $(this).width());

                            $(target_row).find('.row-resizer').slider('values', 1, form_width - row_width);

                            $(this).width(row_width);
                            $(this).prev(self.row).width(prev_width);
                        };

                    };
                };
            });
        },

        formAdjust: function () {
            var self = this,
                rnd = new Date().getTime();

            if ($(self.form).find(self.row_box + '.col').length) {
                $(self.form).find(self.row_box + '.col').each(function () {
                    self.multiColRowAdjust($(this));
                });
            };
        },

        multiColRowAdjust: function (adjust_row) {
            var self = this,
                form_width = $(self.form).width(),
                adjust_row_width = 0,
                adjust_col_ratio,
                new_col_width;

            adjust_row.find(self.row).each(function () {
                adjust_row_width += parseInt($(this).width());
            });

            adjust_row.find(self.row).each(function () {
                adjust_col_ratio = adjust_row_width / $(this).width();
                new_col_width = Math.floor(form_width / adjust_col_ratio);

                $(this).width(new_col_width);
            });

            self.addSlider(adjust_row.find('.row-resizer'));
            self.saveForm();
        },

        editGroupCall: function (group_id) {
            var self = this,
                group_id = parseInt(group_id),
                group_index = $(self.group_box).find(self.group).size() + 1,
                url = '/-/cms/v1/anketa2/?act=edit_group&group_id=' + group_id + '&anketa_id=' + self.anketa_id + '&group_index=' + group_index + '&' + S3_ACCESS,
                checked_fields = [],
                groups_count = $(self.group_box).find(self.group).size(),
                new_group_index = groups_count + 1,
                new_group_name;

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            if ($(self.group_box).find(self.group + '[data-name="' + JS_FORM_GROUP + ' ' + new_group_index + '"]').length) {
                new_group_name = JS_FORM_GROUP + ' ' + new_group_index + '.1';
            } else {
                new_group_name = JS_FORM_GROUP + ' ' + new_group_index;
            };

            if (group_id == 0) {
                url += '&new_group_name=' + new_group_name;

                $(self.form).find(self.field_box).each(function () {
                    if ($(this).attr('data-checked') == "true") {
                        checked_fields.push($(this).attr('data-field-id'));
                    };
                });

                if (checked_fields.length) {
                    openAjaxForm(url + '&except_dictionaries=' + checked_fields.join(','), /* onSubmit */false, /* onClose */function () {
                        $(self.form).find(self.field_box).each(function () {
                            if ($(this).attr('data-checked') == "true") {
                                $(this).removeAttr('data-checked');
                            };
                        });
                    }, /* onUpdate */false);
                } else {
                    s3.alert(JS_FORM_GROUP_ADDING_NO_FIELDS);
                };

            } else {
                openAjaxForm(url, /* onSubmit */false, /* onClose */false, /* onUpdate */false);
            };
        },

        editGroup: function (form, only_save) {
            var self = this,
                checked_fields = [],
                rnd = new Date().getTime(),
                groups_count = $(self.group_box).find(self.group).size(),
                error = false,
                group_index,
                group_data = {
                    'anketa_id': self.anketa_id,
                    'group_id': parseInt($(form).find('input[name="group_id"]').val()),
                    'color_id': parseInt($(form).find('input[name="color_id"]').val()),
                    'group_name': $(form).find('input[name="group_name"]').val().trim(),
                    'merge_result': $(form).find('input[name="merge_result"]').prop('checked'),
                    'merge_separator': $(form).find('input[name="merge_separator"]').val(),
                },
                dublicate_data = {
                    'enabled': $(form).find('input[name="dublicate_enabled"]').prop('checked'),
                    'text': $(form).find('input[name="dublicate_text"]').val(),
                    'remove_text': $(form).find('input[name="remove_text"]').val(),
                    'limit': $(form).find('input[name="dublicate_limit"]').val(),
                    'dublicator_padding_remove': $(form).find('input[name="dublicator_padding"]').prop('checked'),
                },
                attach_data = {},
                attached_fields = {},
                attached_field = {},
                attached_option = {},
                attach_dependence = $(form).find('input[name="show_dependence"]:checked').val(),
                option_field,
                attach_error;

            $(form).find('.attachable-field').each(function () {
                if ($(this).find('input[name="attached_field"]').prop('checked') == true) {
                    attached_field = {
                        'field_id': $(this).attr('data-field-id'),
                        'field_options': {},
                        'name': $(this).find('.name').text(),
                    };

                    if ($(this).find('.field-options').size()) {
                        $(this).find('.field-options .option').each(function () {
                            option_field = $(this).find('input[name="attached_field_option"]');

                            if (option_field.prop('checked') == true) {
                                attached_field.field_options[$(this).index()] = option_field.val();
                            };
                        });

                        if ($.isEmptyObject(attached_field.field_options)) {
                            attach_error = 'Выберите значение для поля "' + attached_field.name + '"';
                            return false;
                        };
                    } else {
                        attached_field.field_options = '';
                    };

                    attached_fields[attached_field.field_id] = attached_field;
                };
            });

            attach_data = {
                "fields": attached_fields,
                "dependence": attach_dependence,
            };

            if (attach_error) {
                s3.alert(attach_error);
                return false;
            };

            if (!$.isEmptyObject(attached_fields) && !attach_dependence) {
                s3.alert(JS_FORM_GROUP_ATTACH_CONDITION_ERROR);
                return false;
            };

            if ($.isEmptyObject(attach_data.fields) || attach_dependence == 0) {
                attach_data.dependence = '';
                attach_data.fields = {};
            };

            if (group_data.group_name == "") {
                $(form).find('input[name="group_name"]').val('');
                s3.alert(JS_FORM_GROUP_NAME_ERROR);
                return false;
            };

            // Проверка на заполненность полей при включенном дублировании
            if (dublicate_data.enabled) {
                if (!dublicate_data.text) {
                    s3.alert(JS_FORM_GROUP_DUBLICATE_TEXT_ERROR);
                    return false;
                };

                if (!dublicate_data.remove_text) {
                    s3.alert(JS_FORM_GROUP_DUBLICATE_DELETE_TEXT_ERROR);
                    return false;
                };

                if (!dublicate_data.limit) {
                    s3.alert(JS_FORM_GROUP_DUBLICATE_LIMIT_ERROR);
                    return false;
                };

            } else {
                $(self.form).find('.dublicator[data-group-id="' + group_data.group_id + '"]').remove();
            };

            group_data.dublicate_data = JSON.stringify(dublicate_data);
            group_data.attach_data = JSON.stringify(attach_data);

            var group_attached_fields = '';

            if (attach_data.dependence) {
                for (var af_key in attached_fields) {
                    if (group_attached_fields == '') {
                        group_attached_fields = af_key;
                    } else {
                        group_attached_fields += ',' + af_key;
                    };
                };
            };

            if (group_data.group_id == 0) {
                $(self.form).find(self.field_box).each(function () {
                    if ($(this).attr('data-checked') == "true") {
                        checked_fields.push($(this).attr('data-field-id'));
                    };
                });

                if (checked_fields.length) {
                    group_index = groups_count % 10;

                    $(self.group_box).find(self.group).each(function () {
                        if ($(this).attr('data-name') == group_data.group_name) {
                            s3.alert(JS_FORM_GROUP_SAME_NAME_ERROR);
                            error = true;
                            return false;
                        };
                    });

                    if (!error) {
                        $.ajax({
                            type: "POST",
                            url: "/-/cms/v1/anketa2/?act=editing_group&" + S3_ACCESS + '&color_id=' + group_index + '&rnd=' + rnd,
                            data: group_data,
                            async: false,
                            success: function (data) {
                                var result = $.parseJSON(data),
                                    dublicate_params = $.parseJSON(result.dublicate_params),
                                    button_data = {
                                        'group_id': result.group_id,
                                        'color_id': group_index,
                                        'dublicate_text': dublicate_params.text,
                                        'group_name': result.name,
                                    };

                                $(form)
                                    .find('input[name="group_id"]').val(result.group_id).end()
                                    .find('input[name="color_id"]').val(group_index);

                                $(self.group_box).append('<div data-name="' + self.escapeHtml(group_data.group_name) + '" data-attached-fields="' + group_attached_fields + '" data-group-id="' + result.group_id + '" data-color-id="' + group_index + '" class="form-group" id="group_' + result.group_id + '">' +
                                    '<span class="s3-ico i-pencil-white" onclick="formBuilder.editGroupCall(' + result.group_id + ', event);"></span>' +
                                    '<span title="' + JS_EDIT + '" class="group-name button" onclick="formBuilder.editGroupCall(' + result.group_id + ');">' + group_data.group_name + '</span>' +
                                    '<div class="controls">' +
                                    '<span title="' + JS_DELETE + '" onclick="formBuilder.deleteGroup(' + result.group_id + ');" class="s3-ico i-trash-white"></span>' +
                                    '</div></div>');

                                for (var i = 0; i < checked_fields.length; i++) {
                                    $(self.field_box + '[data-field-id="' + checked_fields[i] + '"]')
                                        .attr('data-group-id', result.group_id).removeAttr('data-checked')
                                        .attr('data-color-id', group_index)
                                        .find('.field-controls')
                                        .find('.remove-from-group, .group-params').removeClass('hidden').end()
                                        .find('.group-params').attr('onclick', 'formBuilder.editGroupCall(' + result.group_id + ', event)').end()
                                        .find('.change-group').attr('onclick', 'formBuilder.groupsCall($(this), event, ' + result.group_id + ');');
                                };

                                if (dublicate_data.enabled) {
                                    var dublicate_button = self.createDuplicateButton(button_data, true);

                                    if ($(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').size()) {
                                        $(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').remove();
                                    };

                                    $(self.form).find(self.field_box + '[data-group-id="' + result.group_id + '"]').last().after(dublicate_button);
                                    new DragObject(dublicate_button.get(0));

                                    $(self.group_box).find(self.group + '#group_' + result.group_id).find('.controls .dublicate-button').addClass('active');
                                } else {
                                    $(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').remove();
                                    $(self.group_box).find(self.group + '#group_' + result.group_id).find('.controls .dublicate-button').removeClass('active');
                                };

                                if (only_save) {
                                    util.msg(JS_SAVED, '#009900');
                                } else {
                                    popupController.closeLastPopup();
                                };

                                self.rowCleaner();
                                self.saveForm();
                            },
                            error: function (XMLHttpRequest, textStatus, errorThrown) {
                                s3.alert('Error');
                            }
                        });
                    };
                } else {
                    s3.alert(JS_FORM_GROUP_ADDING_NO_FIELDS, function () {
                        popupController.closeLastPopup();
                    });
                };
            } else {
                $.ajax({
                    type: "POST",
                    url: "/-/cms/v1/anketa2/?act=editing_group&" + S3_ACCESS + '&color_id=' + group_data.color_id + '&rnd=' + rnd,
                    data: group_data,
                    async: false,
                    success: function (data) {
                        var result = $.parseJSON(data),
                            dublicate_params = $.parseJSON(result.dublicate_params),
                            button_data = {
                                'group_id': result.group_id,
                                'color_id': result.color_id,
                                'dublicate_text': dublicate_params.text,
                                'group_name': result.name,
                            };

                        $(self.group_box).find(self.group + '#group_' + result.group_id).attr('data-name', group_data.group_name).find('.group-name').html(group_data.group_name);

                        if (dublicate_data.enabled) {
                            var dublicate_button = self.createDuplicateButton(button_data, true);

                            dublicate_button.addClass('new-dublicator');

                            if ($(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').size()) {
                                $(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').after(dublicate_button);
                                $(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').not('.new-dublicator').remove();
                            } else {
                                $(self.form).find(self.field_box + '[data-group-id="' + result.group_id + '"]').last().after(dublicate_button);
                            };

                            dublicate_button.removeClass('new-dublicator');

                            new DragObject(dublicate_button.get(0));

                            $(self.group_box).find(self.group + '#group_' + result.group_id).find('.controls .dublicate-button').addClass('active');
                        } else {
                            $(self.form).find('.dublicator[data-group-id="' + result.group_id + '"]').remove();
                            $(self.group_box).find(self.group + '#group_' + result.group_id).find('.controls .dublicate-button').removeClass('active');
                        };

                        $(self.group_box).find(self.group + '#group_' + result.group_id).attr('data-attached-fields', group_attached_fields);

                        self.rowCleaner();
                        self.saveForm();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        s3.alert('Error');
                    }
                });

                if (only_save) {
                    util.msg(JS_SAVED, '#009900');
                } else {
                    popupController.closeLastPopup();
                };
            };
        },

        deleteGroup: function (group_id) {
            var self = this;

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            s3.confirm(s3.loc('JS_FORM_REMOVE_GROUP'), function () {
                $.ajax({
                    url: "/-/cms/v1/anketa2/?act=delete_group&" + S3_ACCESS + '&anketa_id=' + self.anketa_id + '&group_id=' + group_id,
                    async: false,
                    success: function (data) {

                        $(self.group_box).find(self.group + '#group_' + group_id).remove();

                        $(self.form).find(self.field_box + '.dublicator[data-group-id="' + group_id + '"]').remove();

                        $(self.field_box + '[data-group-id="' + group_id + '"]').removeAttr('data-group_id').each(function () {
                            $(this).removeAttr('data-color-id');
                            $(this).find(self.field_controls).find('.remove-from-group, .group-params').addClass('hidden');
                        });

                        self.saveForm();
                    },
                    error: function (XMLHttpRequest, textStatus, errorThrown) {
                        s3.alert('Error');
                    }
                });
                popupController.closeLastPopup();
            });
        },

        groupsCall: function (elem, event, group_id) {
            var self = this,
                groups = [],
                field = $(elem).parents(self.field_box),
                target_group_id;

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            event.stopPropagation();

            $(self.group_box).find(self.group).each(function () {
                var group = {
                    'name': $(this).attr('data-name'),
                    'group_id': $(this).attr('id'),
                    'group_color_id': $(this).attr('data-color-id'),
                };
                groups.push(group);
            });

            if (groups.length == 0) {
                $(field).attr('data-checked', true);
                $(field).find(self.field_controls).hide();
                $(field).find('.groups-select').remove();
                self.editGroupCall(0, event);
            } else {
                var groups_select = '<div class="groups-select">';
                var add_to_new_group = '<div class="new_group group" onclick="formBuilder.addToNewGroup(this);">' + s3.loc(ANKETA_ADD_TO_NEW_GROUP) + '</div>';

                groups_select += add_to_new_group;

                for (var i = 0; i < groups.length; i++) {
                    var group = groups[i],
                        target_group_id = parseInt(group.group_id.replace('group_', ''));

                    if (target_group_id != group_id) {
                        groups_select += '<div onclick="formBuilder.changeGroup($(this), event, ' + target_group_id + ');"' +
                            ' data-color-id="' + group.group_color_id + '" class="group" data-group-id="' + group.group_id + '" data-group-name="' + group.name + '">' + group.name + '</div>';
                    };
                };

                groups_select += '</div>';

                if ($(elem).find('.groups-select').length == 0) {
                    $(elem).append(groups_select);
                };
            };
        },

        addToNewGroup: function (e) {
            var self = this,
                field = e.closest('.form-field-wrap');

            $(field).attr('data-checked', true);
            $(field).find(self.field_controls).hide();
            $(field).find('.groups-select').remove();
            self.editGroupCall(0);
        },

        changeGroup: function (elem, event, group_id) {
            event.stopPropagation();

            var self = this,
                field = $(elem).parents(self.field_box),
                group = $(groups).find('#group_' + group_id);

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            var group_color_id = group.attr('data-color-id'),
                group_name = group.attr('data-name');

            field.attr('data-group-id', group_id).attr('data-color-id', group_color_id);

            $(elem).parents(self.field_controls).hide();
            $(elem).parents('.field-controls').find('.remove-from-group, .group-params').removeClass('hidden');
            $(elem).parents('.field-controls').find('.change-group').attr('onclick', 'formBuilder.groupsCall($(this), event, ' + group_id + ');');
            $(elem).parents('.field-controls').find('.group-params').attr('onclick', 'formBuilder.editGroupCall(' + group_id + ');');

            $(elem).parent('.groups-select').remove();

            self.saveForm();
        },

        dropGroup: function (elem, event) {
            event.stopPropagation();

            var self = this,
                field = $(elem).parents(self.field_box);

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            field.removeAttr('data-group-id').removeAttr('data-color-id');

            field.find(self.field_controls).hide();
            field.find('.groups-select').remove();

            $(elem).prev('.change-group').attr('onclick', 'formBuilder.groupsCall($(this), event, 0);').removeClass('hidden');
            $(elem).addClass('hidden').next('.group-params').addClass('hidden');

            self.saveForm();
        },

        showFieldOptions: function (elem) {
            var self = this;

            if (elem.find('.field-id-val').prop('checked') == true) {
                elem.parents('.attachable-field').addClass('active');
            } else {
                elem.parents('.attachable-field').removeClass('active');
            };

            $('.attachable-field, .submit-attaching').click(function (event) {
                event.stopPropagation();
            });

            return true;
        },

        hideFieldOptions: function (event, elem) {
            var self = this;

            if (event) {
                event.stopPropagation();
            };

            elem.parent(self.field_controls).hide().find('.groups-select').remove();
        },

        dropGroupAttach: function (elem) {
            var self = this;
            parent = $(elem).parents('#anketa2-attach');

            parent.find('input[type="radio"], input[type="checkbox"]').prop('checked', false);
            parent.find('.s3-rb, .s3-cb, .attachable-field').removeClass('active');
        },

        createDuplicateButton: function (dublicate_data, need_note) {
            var self = this,
                dublicate_obj = dublicate_data,
                dublicate_button;

            dublicate_button = $('.controls-wrap').find(self.field_box + '.dublicator').clone().removeClass('origin').removeAttr('onclick').attr('data-field-id', 'dublicator_' +
                dublicate_obj.group_id).attr('data-group-id', dublicate_obj.group_id);

            dublicate_button.attr('onclick', 'formBuilder.showFieldControls($(this), event)')
                .attr('data-color-id', dublicate_obj.color_id)
                .find('.body input[type="button"]').val(dublicate_obj.dublicate_text);

            dublicate_button.find('.icon-wrap .title').html(JS_FORM_GROUP_DUPLICATE_BUTTON + '<br>' + JS_FORM_GROUP_DUPLICATE_BUTTON_FOR + ' "' + dublicate_obj.group_name);

            if (need_note) {
                dublicate_button.find('.body input[type="button"]').after('<small class="dublicate-note">' + JS_FORM_GROUP_DUPLICATE_BUTTON + ' <br>' + JS_FORM_GROUP_DUPLICATE_BUTTON_FOR + ' "' + dublicate_obj.group_name + '"</small>')
            };

            return dublicate_button;
        },

        showFieldControls: function (elem, event) {
            var self = this,
                group_id,
                controls,
                current_date = new Date(),
                data_time = current_date.getTime();

            if (!elem || !event) {
                return false;
            };

            event.stopPropagation();

            if (elem.attr('data-field-type') == 0) {
                group_id = parseInt(elem.attr('data-group-id'));
                $(self.field_controls).hide().find('.groups-select').remove();
                self.editGroupCall(group_id);
            } else {
                if (event.ctrlKey || event.metaKey) {
                    self.fieldCheckSwitcher(elem);
                } else {
                    controls = $(elem).find(self.field_controls);

                    if (elem.attr('data-group-id')) {
                        group_id = parseInt(elem.attr('data-group-id'));
                        groups_exist = false;

                        $(self.group_box).find(self.group).each(function () {
                            if ($(this).attr('data-group-id') != group_id) {
                                groups_exist = true;
                                return false;
                            };
                        });

                        if (groups_exist == false) {
                            controls.find('.change-group').addClass('hidden');
                        } else {
                            controls.find('.change-group').removeClass('hidden');
                        };
                    };

                    $(self.form).find(self.field_controls).not(controls).hide().find('.groups-select').remove();
                    $(self.row_box).removeClass('active');

                    if (controls.is(':visible')) {
                        controls.hide().find('.groups-select').remove();
                    } else {
                        controls.show();
                    };
                };
            };
            var targetOffset = $(event.target).offset();
            $(controls).css({
                'left': event.pageX - targetOffset.left + 5,
                'top': event.pageY - targetOffset.top + 17,
            })

        },

        dublicateField: function (elem, event) {
            var self = this,
                field = $(elem).parents(self.field_box),
                fields_count = $(self.form).find(self.field_box).size(),
                new_field = field.clone().attr('data-field-id', fields_count + 1).attr('id', 'new_field'),
                field_id = field.attr('data-field-id'),
                field_type = new_field.attr('data-field-type');

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            new_field.attr('data-field-id', 0).find(self.field + '[id="field_' + field_id + '"]').remove();

            event.stopPropagation();

            if (!$(self.form).find('#new_field').size()) {
                field.after(new_field);
            };

            s3.editObject($(new_field).find(elem).get(0), 'DIV', 'new_field', '/-/cms/v1/anketa2/?act=edit_control&anketa_id=' + self.anketa_id + '&' + S3_ACCESS + '&type_id=' + field_type + '&origin_id=' + field_id, false, false, false, function () {
                var field_added = Boolean($(self.form).find('#new_field').find(self.field).size());

                if (field_added) {
                    var new_field_id = $(self.form).find('#new_field').find(self.field).attr('data-field-id');
                    $(self.form).find('#new_field').removeAttr('id').attr('data-field-id', new_field_id)
                        .find('.field-controls .field-button').removeClass('hidden');
                    self.saveForm();
                } else {
                    $(self.form).find('#new_field').remove();
                };
            });

            $(self.field_controls).hide().find('.groups-select').remove();
        },

        editField: function (event, elem, field_id) {
            var self = this;

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            if (!field_id || !self.anketa_id || !elem) {
                return false;
            };

            event.stopPropagation();

            $(self.field + '#field_' + field_id).find(self.field_controls).hide();

            s3.editObject($(elem).get(0), 'DIV', 'field_' + field_id, '/-/cms/v1/anketa2/?act=edit_control&anketa_id=' + self.anketa_id + '&' + S3_ACCESS + '&dictionary_id=' + field_id, function () {
                self.rowCleaner();
            });
        },

        deleteField: function (event, elem, field_id) {
            var self = this;

            if (self.is_locked) {
                s3.alert(s3.loc('ANKETA_LOCKED'));
                return;
            }

            if (!field_id || !self.anketa_id || !elem) {
                return false;
            };

            var field = $(self.field + '#field_' + field_id),
                field_parent = field.parent(self.field_box),
                attached_fields,
                prevent_delete = false,
                delete_attach_error = '';

            event.stopPropagation();

            field.find(self.field_controls).hide();

            $(self.group_box).find(self.group).each(function () {
                attached_fields = $(this).attr('data-attached-fields');

                if (attached_fields) {
                    if (attached_fields.match(new RegExp(field_id, "i"))) {
                        if (delete_attach_error == '') {
                            delete_attach_error = JS_FORM_CANT_DELETE_ATTACHED_FIELD + ' "' + $(this).attr('data-name') + '"';
                            prevent_delete = true;
                        } else {
                            delete_attach_error += ', "' + $(this).attr('data-name') + '"';
                        };
                    };
                };
            });

            if (prevent_delete) {
                s3.alert(delete_attach_error);
            } else {
                s3.deleteObject($(elem).get(0), 'DIV', '/-/cms/v1/anketa2/?act=delete_control&' + S3_ACCESS + '&anketa_id=' + self.anketa_id + '&dictionary_id=' + field_id, function () {
                    field_parent.remove();
                    self.rowCleaner();
                    self.saveForm();
                });
            };
        },

        fieldCheckSwitcher: function (field) {
            var self = this,
                condition  = field.attr('data-checked'),
                no_checked = field.attr('data-no_change');

            if (no_checked == "true") {
                return false;
            }

            if (!condition || condition == "false") {
                $(field).attr('data-checked', true);
            } else {
                $(field).attr('data-checked', false);
            };
        },

        changeDefaultVariantList: function (event, elem, type) {
            var self = this,
                def_val,
                def_cancel,
                area_val,
                new_def_val,
                current_defaults = $('#default_value[name="value"]').val().split(','),
                checked = '',
                keyCode = event.keyCode || event.which;

            if (!keyup_timeout && $.inArray(keyCode, [13, 27, 33, 34, 35, 36, 37, 38, 39, 40]) === -1) {
                keyup_timeout = true;
                setTimeout(function () {
                    if (keyup_timeout) {
                        keyup_timeout = null;

                        area_val = elem.val().replace('\n\n', '\n').split('\n');

                        $('.default-values .default-value, .default-values  .default-value-drop').remove();

                        for (var i = 0; i < area_val.length; i++) {
                            if (area_val[i]) {
                                if ($.inArray(area_val[i], current_defaults) >= 0) {
                                    checked = 'checked';
                                } else {
                                    checked = '';
                                };
                                new_def_val = '<div class="default-value"><label>' +
                                    '<input data-index="' + i + '" onchange="formBuilder.changeDefaultVariant();" ' + checked + ' value="' + area_val[i] + '" type="' + type + '" name="default_value">' +
                                    '<span class="value-name"> ' + area_val[i] + '</span>' +
                                    '</label></div>';

                                if (new_def_val) {
                                    $('.default-values').append(new_def_val);
                                };
                            };
                        };

                        if (type == "radio") {
                            def_cancel = '<div class="default-value-drop">' +
                                '<br /><input value="Сброс значения по умолчанию" type="button" onclick="formBuilder.dropDefaultVariant(".default-values", "default_value");">' +
                                '</div>';

                            $('.default-values').append(def_cancel);
                        };
                    };
                }, 200);
            };

        },

        changeDefaultVariant: function () {
            var self = this,
                field,
                default_values = [],
                res_field,
                result;

            field = $('.default-values').find('name*="default_value');
            res_field = $('#default_value[name="value"]');

            field.each(function () {
                if ($(this).prop('checked') == true) {
                    default_values.push($(this).val());
                };
            });

            result = default_values.join(',');

            if (result) {
                res_field.val(result);
            } else {
                res_field.val('');
            };
        },

        dropDefaultVariant: function (box_selector, elem_selector) {
            var self = this;

            $(box_selector).find('input[type="radio"][name="' + elem_selector + '"]').prop('checked', false);
            $('#' + elem_selector).val('');
        },

        toggleRegexInput: function (val, f_selector) {
            var self = this;

            if (val == "__regex__" && val) {
                $(f_selector).removeClass('hidden');
            } else {
                $(f_selector).addClass('hidden');
            };
        },

        toggleControlsBox: function (elem) {
            var self = this,
                parent_box = elem.parent('.controls-box');

            // При открытии какой-либо вкладки убрал скрытие остальных
            // $('#form-builder-wrap').find('.controls-box').not(parent_box).removeClass('active').find('.control-body').hide(300);

            if (!parent_box.find('.control-body').is(':animated')) {
                if (parent_box.hasClass('active')) {
                    parent_box.removeClass('active').find('.control-body').hide(300);
                } else {
                    parent_box.addClass('active').find('.control-body').show(300);
                };
            };
        },

        changeColorScheme: function (elem, event, control_name) {
            if (!elem || !event || !control_name) {
                return false;
            };

            var select_val = $(event.target).attr('data-scheme'),
                replacer = $(event.target).clone();

            if ($(event.target).hasClass('color-scheme-item')) {
                $('select#' + control_name + '[name="' + control_name + '"]').val(select_val);
                $(elem).prev('.color-scheme-selected').find('.color-scheme-item').replaceWith(replacer);
            };
        },

        saveDictionary: function (form, popup) {
            var self = this,
                regex_box = form.find('#regex_validate_box'),
                regex = form.find('#regex_validate'),
                regex_error = form.find('#regex_validate_error'),
                field_id = form.find('#dictionary_id').val(),
                field_name = form.find('#name').val(),
                field_alias = form.find('#alias').val().replace(/\s+/g, '');

            if (form.find('#double_create').size()) {
                field_id = form.find('#double_create').val();
            };

            if (field_name) {
                field_name = field_name.replace(/\s+/g, '');
            };

            if (field_name == "") {
                form.find('#name').next('.form_error').removeClass('hidden');
                return false;
            } else {
                form.find('#name').next('.form_error').addClass('hidden');
            };

            self.checkAliasExisting(form, self.anketa_id, field_id, field_alias, function (is_double) {
                if (is_double) {
                    form.find('#alias').next('.form_error').removeClass('hidden');

                    return false;
                } else {
                    form.find('#alias').next('.form_error').addClass('hidden');

                    if (!regex_box.hasClass('hidden')) {
                        if (regex.val() == '') {
                            s3.alert(JS_FORM_REGEXP_ERROR);
                            return false;
                        } else if (regex_error.val() == '') {
                            s3.alert(JS_FORM_REGEXP_ERROR_TEXT);
                            return false;
                        };
                    };

                    if (form.find('textarea[name="variants"]').length) {
                        var variants_field = form.find('textarea[name="variants"]'),
                            variants = variants_field.val().split('\n'),
                            cleared_variants = [];

                        for (var i = 0; i < variants.length; i++) {
                            if (variants[i] != '' && cleared_variants.length < 250) {
                                cleared_variants.push(variants[i]);
                            };
                        };

                        variants_field.val(cleared_variants.join('\n'));
                    };

                    postAjaxForm('/-/cms/v1/anketa2/?act=editing_control&' + S3_ACCESS, form.get(0), popup);
                };
            });

            return false;
        },

        checkAliasExisting: function (form, anketa_id, field_id, alias, callback) {
            if (!form || !anketa_id || !field_id) {
                return false;
            };

            var self = this,
                url = '/-/cms/v1/anketa2/?act=check_alias_control&' + S3_ACCESS,
                anketa_id = parseInt(anketa_id),
                data = {
                    'anketa_id': anketa_id,
                    'dictionary_id': field_id,
                    'alias': alias
                },
                is_double;

            $.ajax({
                url: url,
                data: data,
                type: "POST",
                dataType: 'html',
                success: function (data) {
                    if (data == 1) {
                        is_double = true;
                    } else {
                        is_double = false;
                    };


                    callback(is_double);
                }
            });
        },

        editForm: function (url, popup, noSetContent, reloadLastPopup, outfunc) {
            var self = this,
                func;

            if (!outfunc) {
                if (popup) {
                    func = function (r) {
                        if (r.text && !noSetContent) {
                            popupController.setPreviousPopupContent(r.text, r.url);
                        };
                        popupController.closeLastPopup();
                        if (reloadLastPopup) {
                            popupController.reloadLastPopup();
                        };
                        self.formAdjust();
                    };

                } else {
                    func = function (r) {
                        s3.setContent(r.text, r.url);
                        popupController.closeLastPopup();
                        self.formAdjust();
                    };
                }
            } else {
                func = outfunc;
            }

            openAjaxForm(url, func, function () {
                if (popup) {
                    popupController.reloadLastPopup();
                } else {
                    s3.reloadContent();
                };
            }, false);
        },

        saveForm: function () {
            var self = this,
                structure_data = {},
                dictionary_position = {},
                field_pos = {},
                field_index = 0;

            if (!self.anketa_id) {
                s3.alert('No anketa_id');
                return false;
            };

            structure_data.rows = {};
            structure_data.fields = {};
            structure_data.dublicators = {};

            $(self.form).find(self.row_box).each(function () {
                var index = $(this).index();
                structure_data.rows[index] = {};

                if ($(this).attr('data-cols')) {
                    var cols_count = parseInt($(this).attr('data-cols'));
                } else {
                    var cols_count = 1;
                };

                structure_data.rows[index].cols = {};

                $(this).find(self.row).each(function () {
                    var row_index = $(this).index();

                    structure_data.rows[index].cols[row_index] = {};
                    structure_data.rows[index].cols[row_index].width = $(this).width();
                    structure_data.rows[index].cols[row_index].sub_rows = {};

                    $(this).find('.sub-row').each(function () {
                        var sub_row_index = $(this).index();

                        structure_data.rows[index].cols[row_index].sub_rows[sub_row_index] = {};
                        structure_data.rows[index].cols[row_index].sub_rows[sub_row_index].fields = {};

                        $(this).find(self.field_box).each(function () {
                            var field_id = $(this).attr('data-field-id'),
                                field_type = parseInt($(this).attr('data-field-type')),
                                field_index = $(this).index(),
                                group_id = $(this).attr('data-group-id'),
                                structure_params;

                            structure_params = {
                                'index': field_index,
                                'row': index,
                                'col': row_index,
                                'sub_row': sub_row_index,
                                'group_id': group_id,
                            };

                            if (field_type == 0) {
                                structure_data.dublicators[field_id] = structure_params;
                                structure_data.dublicators[field_id].type_code = "DUBLICATOR";
                                structure_data.dublicators[field_id].type_id = "0";
                                structure_data.dublicators[field_id].dictionary_id = field_id;
                            } else {
                                structure_data.fields[field_id] = structure_params;
                            };

                            if ($(this).attr('data-group-id')) {
                                if (field_type == 0) {
                                    structure_data.dublicators[field_id].group_id = $(this).attr('data-group-id');
                                } else {
                                    structure_data.fields[field_id].group_id = $(this).attr('data-group-id');
                                };
                            };
                        });
                    });
                });
            });

            $(self.form).find(self.field_box).each(function () {
                if ($(this).attr('data-field-type') != 0) {
                    dictionary_position[field_index] = parseInt($(this).attr('data-field-id'));
                    field_index++;
                };
            });

			$.ajax({
				url      : '/-/cms/v1/anketa2/?act=save_structure&' + S3_ACCESS + '&anketa_id='+self.anketa_id,
				data     : {
					'structure_data'     : JSON.stringify(structure_data),
					'dictionary_position': JSON.stringify(dictionary_position)
				},
				type     : 'post',
				dataType : 'json',
				async    : false,
				success  : function(data) {
					if (data.done) {
						popupController.childsPopupsHasChanged();
					};
				},
				error    : function() {
					s3.alert('Error');
				}
			});
		},

        escapeHtml: function (text) {
            return text
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
        },

	};

	var dragMaster = (function() {

		var dragObject,
			mouseDownAt,
			currentDropTarget;

		function mouseDown(e) {
			e = fixEvent(e);
			if (e.which!=1) return;

			mouseDownAt = { x: e.pageX, y: e.pageY, element: this };

			addDocumentEventHandlers();

			return false;
		};

		function mouseMove(e){
			e = fixEvent(e);

			if (mouseDownAt) {
				if (Math.abs(mouseDownAt.x-e.pageX)<10 && Math.abs(mouseDownAt.y-e.pageY)<10) {
					return false;
				};
				var elem  = mouseDownAt.element;
				// текущий объект для переноса
				dragObject = elem.dragObject;
				// запомнить, с каких относительных координат начался перенос
				var mouseOffset = {x: -10, y: $(window).scrollTop()-10};

				mouseDownAt = null;
				dragObject.onDragStart(mouseOffset);
			};

			dragObject.onDragMove(e.pageX, e.pageY, e);

			var newTarget = getCurrentTarget(e);

			if (currentDropTarget != newTarget) {
				if (currentDropTarget) {
					currentDropTarget.onLeave();
				};
				if (newTarget) {
					newTarget.onEnter();
				};
				currentDropTarget = newTarget;
			};

			return false;
		};

    function mouseUp(event) {
        if (!dragObject) {
            mouseDownAt = null;
        } else {
            if (!event.target.closest('#form-builder-wrap') || !currentDropTarget) {
                dragObject.onDragFail();
            } else {
                currentDropTarget.accept(dragObject);
                dragObject.onDragSuccess(currentDropTarget, event);
            }
            dragObject = null;
        };

        $(formBuilder.form).removeClass('dragging');
        $('.controls-wrap').find(formBuilder.field_box).removeClass('temp').removeAttr('style');
        $('.controls-wrap').find(formBuilder.row_box).removeClass('temp').removeAttr('style');
        formBuilder.rowCleaner();
        $('.clone').remove();
        $(formBuilder.form).removeClass('no-hover');

        removeDocumentEventHandlers();
    }

		function getCurrentTarget(e) {
			if (navigator.userAgent.match('MSIE') || navigator.userAgent.match('Gecko')) {
				var x=e.clientX, y=e.clientY;
			} else {
				var x=e.pageX, y=e.pageY;
			};
			dragObject.hide();
			var elem = document.elementFromPoint(x,y);
			dragObject.show();

			// найти самую вложенную dropTarget
			while (elem) {
				// которая может принять dragObject
				if (elem.dropTarget && elem.dropTarget.canAccept(dragObject)) {
					return elem.dropTarget;
				};
				elem = elem.parentNode;
			};

			return null;
		};

    function addDocumentEventHandlers() {
        document.getElementById('form-builder-wrap').onmousemove = mouseMove;
        document.addEventListener('mouseup', mouseUp);
        document.getElementById('form-builder-wrap').ondragstart = document.getElementById('form-builder-wrap').onselectstart = function () {
            return false
        };
    };

    function removeDocumentEventHandlers() {
        document.removeEventListener('mouseup', mouseUp);
        document.getElementById('form-builder-wrap').onmousemove = document.getElementById('form-builder-wrap').ondragstart = document.getElementById('form-builder-wrap').onselectstart = null;
    };

		return {
			makeDraggable: function(element){
				element.onmousedown = mouseDown;
			}
		};
	}());

	function DragObject(element) {
		element.dragObject = this;

		dragMaster.makeDraggable(element);

		var rememberPosition,
			mouseOffset;

		this.onDragStart = function(offset) {
			var s = element.style;
			rememberPosition = {top: s.top, left: s.left, position: s.position};
			s.position = 'fixed';

			mouseOffset = offset;
			var clone = $(element).clone().addClass('clone');

			$(formBuilder.form).addClass('no-hover');

			if ($(element).hasClass('origin')) {
				$(element).before(clone.removeAttr('style')).addClass('temp copy');
			} else {
				$(element).addClass('flying').before(clone.removeAttr('style').addClass('ghost'));
			};
		};

		this.hide = function() {
			element.style.display = 'none'
		}

		this.show = function() {
			element.style.display = '';
		};

		this.onDragMove = function(x, y, event) {
			element.style.top =  y - mouseOffset.y +'px';
			element.style.left = x - mouseOffset.x +'px';

			clearTimeout(hover_timeout);
			hover_timeout = setTimeout(function(){
				formBuilder.showHelper(event, element);
			}, 10);
		};

		this.onDragSuccess = function(dropTarget, event) {
			var new_field = $(element).clone().removeClass('origin');



			if ($(element).hasClass('origin') == false) {
				element.remove();
				formBuilder.dropItem(new_field, event, false);
			} else {
				formBuilder.dropItem(new_field, event, true);
			};
			formBuilder.reInit();
		};

		this.onDragFail = function() {
			var s = element.style;
			s.top = rememberPosition.top;
			s.left = rememberPosition.left;
			s.position = rememberPosition.position;
		};

		this.toString = function() {
			return element.id;
		};
	};

	function DropTarget(element) {

		element.dropTarget = this;

		this.canAccept = function(dragObject) {
			return true;
		};

		this.accept = function(dragObject) {
			this.onLeave();

			dragObject.hide();
		};

		this.onLeave = function() {
			// element.className =  '';
		};

		this.onEnter = function() {
			// element.className = 'uponMe';
		};

		this.toString = function() {
			return element.id;
		};
	};

	function fixEvent(e) {
		// получить объект событие для IE
		e = e || window.event;

		// добавить pageX/pageY для IE
		if ( e.pageX == null && e.clientX != null ) {
			var html = document.documentElement,
				body = document.body;
			e.pageX = e.clientX + (html && html.scrollLeft || body && body.scrollLeft || 0) - (html.clientLeft || 0);
			e.pageY = e.clientY + (html && html.scrollTop || body && body.scrollTop || 0) - (html.clientTop || 0);
		};

		// добавить which для IE
		if (!e.which && e.button) {
			e.which = e.button & 1 ? 1 : ( e.button & 2 ? 3 : ( e.button & 4 ? 2 : 0 ) );
		};

		return e;
	};
})(jQuery);
