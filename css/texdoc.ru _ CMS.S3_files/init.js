jQuery(document).ready(function () {
    S3Ajax.init('#divContent');

    $(document).on('keydown', 'textarea.tabable', function (e) {
        if (e.keyCode === 9) { // tab was pressed // get caret position/selection
            var start = this.selectionStart;
            var end = this.selectionEnd;
            var $this = $(this);
            var value = $this.val(); // set textarea value to: text before caret + tab + text after caret
            $this.val(value.substring(0, start)
                + "\t"
                + value.substring(end)); // put caret at right position again (add one for the tab)
            this.selectionStart = this.selectionEnd = start + 1; // prevent the focus lose
            e.preventDefault();
        }
    });

    $(document).on('keydown', function (event) {
        var keyCode = event.keyCode || event.which,
            ctrlKey = event.ctrlKey || event.metaKey;

        if (popupController.getLastPopup()) {

            // Catch Enter key
            if (keyCode == 13 && !ctrlKey && !event.altKey) {
                var popupWin = popupController.getLastPopup().obj,
                    deleteButton = $(popupWin).find('.s3-btn-delete');

                if ($(popupWin).find(deleteButton).size()) {
                    deleteButton.click();
                }
            }

            if (ctrlKey && keyCode == 83) { // Ctrl + S

                event.preventDefault();

                setTimeout(function () {

                    var popupWin = popupController.getLastPopup().obj,
                        saveButton = $(popupWin).find('.s3-btn-save:last');

                    if ($(popupWin).find(saveButton).size() && !saveButton.hasClass('clicked') && !window.popups.includes('s3-react')) {
                        saveButton.click().addClass('clicked');

                        setTimeout(function () {
                            saveButton.removeClass('clicked');
                        }, 1000);
                    }

                }, 50);

                return false;

            }
        } else if ($('.s3-form').size()) {
            if (ctrlKey && keyCode == 83) { // Ctrl + S
                event.preventDefault();

                setTimeout(function () {
                    $('.s3-form').find('.s3-btn-save:last').click();
                }, 50);

                return false;
            }
        }

        if (event.altKey) { // Alt

            if (isStaffUser && !popupController.getLastPopup()) {
                if (keyCode == 65) { // + A. Jump to Templates
                    event.preventDefault();
                    if ($('#editorWrapper').size()) {
                        templateController.showLoader();
                        templateController.loadTemplatesList();
                    } else {
                        window.location = '#/-/cms/v1/template/?' + S3_ACCESS;
                    }
                } else if (keyCode == 70) { // + F. Jump to Files
                    event.preventDefault();
                    var files_location = '#/-/cms/v1/template/?' + S3_ACCESS + '&tab=files';

                    if (files_location == location.hash) {
                        templateController.showLoader();
                        templateController.loadFilesList();
                    } else {
                        window.location = files_location;
                    }
                }
            }

        }
    });

    $(document).on('click', '.editor-switcher', function (e) {
        var target = $(e.target);
        if (target.is(':checked')) {
            cm.turnOnEditor();
        } else {
            cm.turnOffEditor();
        }
    });

    $(document).on('click', '.editor2-switcher', function (e) {
        var target = $(e.target);
        if (target.is(':checked')) {
            templateController.turnOnEditor();
        } else {
            templateController.turnOffEditor();
        }
    });

    /* Toogle fullscreen */
    $(document).on('click', '.f-switcher', function (e) {
        cm.fullscreen = !cm.fullscreen;
        if (cm.fullscreen) {
            cm.turnOnFullscreen();
        } else {
            cm.turnOffFullscreen();
        }
    });

    $(document).on('click', function (e) {
        var $clicked = $(e.target); // get the element clicked
        if (!($clicked.is('#files-submenu-div') || $clicked.is('#show-files-submenu'))) {
            $('#files-submenu-div').hide();
        }
        if (!$clicked.is('#show-files-submenu') && $clicked.children().is("#show-files-submenu")) {
        }
    });

    $(document).on('click', '#cmTabs li', function (event) {
        var tab_id = $(this).attr('tabid');
        if (tab_id && tab_id != '-2') {
            $('#cmContent div[id^="cmDiv-"]').hide();
            cm.focus(tab_id);
        }
    });

    $(document).on('dblclick', '#cmTabs li', function (event) {
        var tab_id = $(this).attr('tabId');
        if (tab_id > 0) {
            cm.close($(this).attr('tabId'));
        }
    });

    /*
    $(document).on('submit', '#cmContent form', function(event) {
        event.preventDefault();
        cm.removeModified(cm.currentTab);
    });
    */

    $(document).on('click', '#apply_theme_to_tmpls', function (e) {
        theme_id = $('#templates_current_theme').val();
        if (theme_id != undefined) {
            try {
                cm.addToSandbox(theme_id);
            } catch (e) {
                S3PopUp.open('alert', 'Ошибка');
            }
        }
        e.preventDefault();
    });

    $(document).on('click', '#apply_theme_to_tpls2', function (e) {
        theme_id = $('#templates_current_theme').val();
        if (theme_id != undefined) {
            try {
                templateController.addToSandbox(theme_id);
            } catch (e) {
                S3PopUp.open('alert', 'Ошибка');
            }
        }
        e.preventDefault();
    });

    $(document).on('click', '#apply_theme_to_files', function (e) {
        theme_id = $('#files_current_theme').val();
        if (theme_id != undefined) {
            try {
                cm.addFilesToSandbox(theme_id);
            } catch (e) {
                S3PopUp.open('alert', 'Ошибка');
            }
        }
        e.preventDefault();
    });

    $(document).on('click', '#apply_theme_to_files2', function (e) {
        theme_id = $('#files_current_theme').val();
        if (theme_id != undefined) {
            try {
                templateController.addFilesToSandbox(theme_id);
            } catch (e) {
                S3PopUp.open('alert', 'Ошибка');
            }
        }
        e.preventDefault();
    });

    $(document).on('click', '#show-files-submenu', function () {
        $('#files-submenu-div').toggle();
        return;
    });

    $(document).on('click', 'div.CodeMirror-code', function (event) {

        if (event.ctrlKey) {

            if (event.target.className == 'cm-string') {

                // public/d/VER_ID/t/ -
                // для поиска CSS варианты
                //	- искать на сервере перебором
                //	- сфинксом индексировать
                //	- сделать кнопку - Загрузить в TAB все CSS и искать только на компе клиента (грузим только 5 последних)

                // кликнули по названию класса в сочетании - class="название класса"
                var prev = $(event.target).prev('SPAN').get(0);
                if (prev.className == "cm-attribute" && prev.innerHTML == "class") {
                    alert('css property');
                    return;
                }

                // срезаем кавычки
                var text = event.target.innerHTML.replace(/['"]/g, ''),
                    pattern = new RegExp("^((\/d\/" + ver_id + "\/t\/)?(images|theme[0-9]+)([a-zA-Z0-9\_\.\/]+)?)?([a-zA-Z0-9\_\.]+\.(css|js|jpeg|gif|png|jpg))", "ig"),
                    pattern_full_path,
                    pattern_relative_path,
                    matches,
                    mode,
                    ext,
                    file;

                // ловим DB:HEADER.TPL
                // если CTRL-кликнули по <span class="cm-string">"db:header.tpl"</span>
                // то ловим по регэкспу - только заранее срезаем кавычки
                matches = text.match(/^db:([a-z0-9\.-]+\.tpl)$/i);
                if (matches) {
                    cm.load(text, 'smartymixed', 0);
                    return;
                }
                matches = text.match(/^global:([a-z0-9\.-]+\.tpl)$/i);
                if (matches) {
                    cm.load(text, 'smartymixed', 0);
                    return;
                }

                // ловим все что похоже на *.css,js,jpeg
                matches = text.match(/^(.*?\.(css|js|jpeg|gif|png|jpg))/i);
                if (matches) {

                    matches = text.match(pattern);
                    if (!matches) {
                        S3PopUp.open('alert', 'Открывать можно только локальные файлы');
                        return;
                    }
                    pattern_full_path = new RegExp("^((\/d\/" + ver_id + "\/t\/)(images|theme[0-9]+)([a-zA-Z0-9\_\.\/]+))([a-zA-Z0-9\_\.]+\.(css|js|jpeg|gif|png|jpg))", "ig");
                    pattern_relative_path = new RegExp("^([a-zA-Z0-9\_\.]+)([a-zA-Z0-9\_\.\/]+\.(css|js|jpeg|gif|png|jpg))", "ig");
                    if (pattern_full_path.test(text)) {
                        filename = text.match(pattern_full_path)[0].replace('/d/' + ver_id + '/t/', '');
                    } else if (pattern_relative_path.test(text)) {
                        filename = $(event.target).parents('form:first').find('input[name="dir"]').val() + '/' + text.match(pattern_relative_path)[0];
                        filename = filename.replace('/d/' + ver_id + '/t/', '');
                    } else {
                        S3PopUp.open('alert', 'Данный файл открыть нельзя');
                        return;
                    }

                    ext = filename.split('.');
                    ext = ext[ext.length - 1].toLowerCase();
                    mode = 'pic';
                    if (ext == 'css' || ext == 'less' || ext == 'scss') {
                        mode = 'css';
                    } else if (ext == 'js') {
                        mode = 'javascript'
                    } else if (ext == 'png' || ext == 'jpg' || ext == 'jpeg' || ext == 'gif') {
                        mode = 'pic';
                    }
                    cm.load(filename, mode, 0);
                    return;
                }

            }

        }
    });

    $(document).on('click', function (event) {
        if ($(event.target).parents('form').hasClass('context__search') || $(event.target).not('.fast-result__full').parents('div').hasClass('fast-result')) {
            return;
        }
        $('.fast-result').removeClass('opened');
        $('form.context__search input').val('');
    });

    $('body').S3ChangeControls();
    $('.page-type').S3CreatePageTypeSwitcher($('.s3-edit-page'));
});
