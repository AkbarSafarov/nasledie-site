var form_editor = {
    editorControllerLink: function (editorName, instanceName) {
        var maxInterval = 3000;
        var interval, editor, config, elem, stop, setup;

        if (typeof window.editorName === 'undefined') {
            window.editorName = editorName;
        }

        interval = setInterval(function () {
            maxInterval--;

            if (maxInterval == 0) {
                stop = true;
            }

            switch (window.editorName) {
                case 'ckeditor':
                    editor = CKEDITOR.instances[instanceName];

                    if (!!editor && editor.instanceReady) {
                        config = $.extend({}, editor.config);
                        elem = document.querySelector("#" + instanceName);

                        editor.destroy();

                        config.toolbar[0].items = ["Link", "Unlink"];
                        config.allowedContent = 'a[*]';
                        config.removePlugins = 'tableselection';

                        CKEDITOR.inline(instanceName, config);

                        editor = CKEDITOR.instances[instanceName];

                        /**
                         * Обработчик события 'key'
                         * @param event
                         */
                        function keyHandler(event) {
                            switch (event.data.keyCode) {
                                case 13:
                                case CKEDITOR.SHIFT + 13:
                                    event.cancel();
                                    break;
                                case 27:
                                    window.setTimeout(function () {
                                        event.editor.execCommand('blur');
                                        event.cancel();
                                    }, 50);
                                    break;
                            }
                        }

                        /**
                         * Обработчик события 'contentDom'
                         * @param event
                         * @return void
                         */
                        function contentDomHandler(event) {
                            /** @type {HTMLAnchorElement[]} */
                            const links = editor.container.find('a').$;

                            ckeditorController.removeAttributeFromLinks(links);
                        }

                        /**
                         * Обработчик события 'change'
                         * @param event
                         * @return void
                         */
                        function changeHandler(event) {
                            const editor = event.editor;

                            /** @type {HTMLAnchorElement[]} */
                            const links = editor.container.find('a').$;

                            ckeditorController.removeAttributeFromLinks(links);
                            elem.previousElementSibling.value = editor.getData();
                        }

                        /**
                         * Запускается при нажатии любой клавиши клавиатуры (или их комбинации) в области редактирования.
                         */
                        editor.on('key', keyHandler);

                        /**
                         * Событие срабатывает, когда содержимое редактора (его структура DOM) готова.
                         */
                        editor.on('contentDom', contentDomHandler);

                        /**
                         * Запускается при изменении содержимого редактора.
                         */
                        editor.on('change', changeHandler);

                        stop = true;
                    }

                    break;
                case 'tinymce v3':

                    if (!!(editor = tinymce.get(instanceName))) {
                        config = $.extend({}, editor.settings);
                        config.theme_advanced_buttons1 = "link,unlink";
                        config.theme_advanced_path = false;
                        config.force_p_newlines = false;
                        config.remove_linebreaks = false;
                        config.remove_trailing_nbsp = false;
                        config.verify_html = false;
                        config.mode = "textareas";
                        config.theme = "advanced";
                        config.force_br_newlines = false;
                        config.forced_root_block = '';
                        config.invalid_elements = "p";
                        config.valid_elements = "a";

                        elem = document.querySelector("#" + instanceName);

                        setup = config.setup;

                        config.setup = function (ed) {
                            setup(ed);

                            ed.onKeyDown.add(function (edi, e) {
                                if (e.ctrlKey && e.keyCode == 13 || e.keyCode == 13) {
                                    e.preventDefault();
                                }
                            });

                            ed.onChange.add(function (edi, e) {
                                var value = edi.getContent();
                                value = value.replace(/((?!<((\/)?a))<[^>]*>)/g, "");
                                elem.previousElementSibling.value = value;
                            });
                        };

                        config.inline = true;
                        tinymce.execCommand('mceRemoveEditor', false, instanceName);

                        setTimeout(function () {
                            new tinymce.Editor(instanceName, config).render();

                            document.getElementById(instanceName + "_ifr").style.height = "30px";
                        }, 1);

                        stop = true;
                    }

                    break;
            }

            if (stop) {
                clearInterval(interval);
            }
        }, 1);
    }
};
