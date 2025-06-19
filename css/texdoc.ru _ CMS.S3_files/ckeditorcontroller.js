// Отступы и пробелы между названий шрифтов не менять!!!
// Не должно быть пробела после запятой
var configEditorFont = {
  // Стандартные шрифты браузера
  'Arial,Helvetica,sans-serif': 'Arial',
  'Arial Black,Avant Garde': 'Arial Black',
  'Times New Roman,Times,serif': 'Times New Roman',
  'Georgia,Times New Roman,Times,serif': 'Georgia',
  'Verdana,Arial,Helvetica,sans-serif': 'Verdana',
  'Helvetica,Arial,sans-serif': 'Helvetica',
  'Tahoma,Geneva,sans-serif': 'Tahoma',
  'Menlo,Monaco,Andale Mono,Lucida Console,Courier New,monospace': 'Andale Mono',
  'Book Antiqua,Palatino': 'Book Antiqua',
  'Comic Sans MS,sans-serif': 'Comic Sans MS',
  'Courier New,Courier monospace': 'Courier New',
  'Terminal,Monaco': 'Terminal',
  'Webdings': 'Webdings',
  'Wingdings,Zapf Dingbats': 'Wingdings',
  'Symbol': 'Symbol',
  'Trebuchet Ms,Geneva': 'Trebuchet Ms',
  'Impact,Chicago': 'Impact',

  // Google шрифты
  'Alice,sans-serif': 'Alice',
  'Andika,sans-serif': 'Andika',
  'Anonymous Pro,monospace': 'Anonymous Pro',
  'Arimo,sans-serif': 'Arimo',
  'Arsenal,sans-serif': 'Arsenal',
  'Amatic SC,sans-serif': 'Amatic SC',
  'Bad Script,cursive': 'Bad Script',
  'Caveat,sans-serif': 'Caveat',
  'Comfortaa,sans-serif': 'Comfortaa',
  'Cormorant,serif': 'Cormorant',
  'Cormorant Garamond,serif': 'Cormorant Garamond',
  'Cormorant Infant,serif': 'Cormorant Infant',
  'Cormorant SC,serif': 'Cormorant SC',
  'Cormorant Unicase,serif': 'Cormorant Unicase',
  'Cousine,monospace': 'Cousine',
  'Cuprum,sans-serif': 'Cuprum',
  'Didact Gothic,sans-serif': 'Didact Gothic',
  'EB Garamond,serif': 'EB Garamond',
  'El Messiri,sans-serif': 'El Messiri',
  'Exo2,sans-serif': 'Exo2',
  'Fira Mono,monospace': 'Fira Mono',
  'Fira Sans,sans-serif': 'Fira Sans',
  'Fira Sans Condensed,sans-serif': 'Fira Sans Condensed',
  'Fira Sans Extra Condensed,sans-serif': 'Fira Sans Extra Condensed',
  'Forum,serif': 'Forum',
  'Gabriela,serif': 'Gabriela',
  'IBM Plex Serif,sans-serif': 'IBM Plex Serif',
  'Istok Web,sans-serif': 'Istok Web',
  'Jura,sans-serif': 'Jura',
  'Kelly Slab,serif': 'Kelly Slab',
  'Kurale,serif': 'Kurale',
  'Ledger,serif': 'Ledger',
  'Lobster,cursive': 'Lobster',
  'Lora,serif': 'Lora',
  'Marck Script,cursive': 'Marck Script',
  'Marmelad,sans-serif': 'Marmelad',
  'Montserrat,sans-serif': 'Montserrat',
  'Merriweather,serif': 'Merriweather',
  'Neucha,sans-serif': 'Neucha',
  'Noto Sans,sans-serif': 'Noto Sans',
  'Noto Serif,serif': 'Noto Serif',
  'Old Standard,serif': 'Old Standard',
  'Open Sans,sans-serif': 'Open Sans',
  'Open Sans Condensed,sans-serif': 'Open Sans Condensed',
  'Oranienbaum,sans-serif': 'Oranienbaum',
  'Pangolin,sans-serif': 'Pangolin',
  'Pacifico,sans-serif': 'Pacifico',
  'Pattaya,sans-serif': 'Pattaya',
  'Podkova,sans-serif': 'Podkova',
  'Philosopher,serif': 'Philosopher',
  'Play,sans-serif': 'Play',
  'Playfair Display,serif': 'Playfair Display',
  'Playfair Display SC,serif': 'Playfair Display SC',
  'Poiret One,sans-serif': 'Poiret One',
  'Prata,sans-serif': 'Prata',
  'Press Start 2P,sans-serif': 'Press Start 2P',
  'Prosto One,cursive': 'Prosto One',
  'PT Mono,monospace': 'PT Mono',
  'PT Sans,sans-serif': 'PT Sans',
  'PT Sans Caption,sans-serif': 'PT Sans Caption',
  'PT Sans Narrow,sans-serif': 'PT Sans Narrow',
  'PT Serif,serif': 'PT Serif',
  'PT Serif Caption,serif': 'PT Serif Caption',
  'Roboto,sans-serif': 'Roboto',
  'Roboto Condensed,sans-serif': 'Roboto Condensed',
  'Roboto Mono,monospace': 'Roboto Mono',
  'Roboto Slab,serif': 'Roboto Slab',
  'Rubik,sans-serif': 'Rubik',
  'Rubik Mono One,monospace': 'Rubik Mono One',
  'Rubik One,sans-serif': 'Rubik One',
  'Ruslan Display,sans-serif': 'Ruslan Display',
  'Russo One,sans-serif': 'Russo One',
  'Scada,sans-serif': 'Scada',
  'Seymour One,sans-serif': 'Seymour One',
  'Source Sans Pro,sans-serif': 'Source Sans Pro',
  'Stalinist One,serif': 'Stalinist One',
  'Tenor Sans,sans-serif': 'Tenor Sans',
  'Tinos,serif': 'Tinos',
  'Ubuntu,sans-serif': 'Ubuntu',
  'Ubuntu Condensed,sans-serif': 'Ubuntu Condensed',
  'Ubuntu Mono,monospace': 'Ubuntu Mono',
  'Underdog,serif': 'Underdog',
  'Yanone Kaffeesatz,sans-serif': 'Yanone Kaffeesatz',
  'Yeseva One,serif': 'Yeseva One',
};

const FONTS_EDITOR_ALL = Object.keys(configEditorFont).sort().reduce(function(result, value) {
    const name = configEditorFont[value];

    return result + name + '/' + value + ';';
}, '');

var ckeditorController = {
    cmsSettings: null,
    lang_code: "ru",
    className: 'mceEditor',
    working: null,
    config: null,
    links: 'body [href], body [src]',
    /**
     * Массив названий аттрибутов которые можно удалить у ссылок
     * @type string[]
     */
    attributesToRemoveFromLinks: ['data-cke-saved-href'],

    /**
     * Удаляет атрибуты у ссылок
     * @param {HTMLAnchorElement[]} links
     * @return void
     */
    removeAttributeFromLinks: function (links) {
        if (!links.length) {
            return;
        }

        links.forEach(this.removeAttributeFromLink);
    },

    /**
     * Удаляет атрибуты у ссылки
     * @param {HTMLAnchorElement} link
     * @return void
     */
    removeAttributeFromLink: function (link) {
        ckeditorController.attributesToRemoveFromLinks.forEach((attributeName) => {
            link.removeAttribute(attributeName);
        });
    },

    addControls: function(element) {
        var self = this;

        if (self.working && element.querySelectorAll && CKEDITOR) {
            /** @type {NodeListOf<HTMLElement>} */
            var areas = element.querySelectorAll("textarea.mceEditor, div.mceEditor");

            if (areas.length) {
                window.setTimeout(function () {
                    for (var i = 0; i < areas.length; i++) {
                        if (areas[i].className.split(' ').indexOf(self.className) > -1 && areas[i].id) {
                            const config = Object.assign({}, self.config, self._getConfigFromDataAttributes(areas[i]));
                            self.setConfig(areas[i], config);
                        }
                    }
                }, 2);
            }
        }
    },

    removeControls: function(element){
        var self = this;

        if (self.working && element.getElementsByTagName && CKEDITOR) {
            var areas = element.querySelectorAll("textarea.mceEditor, div.mceEditor");

            for (var i = 0; i < areas.length; i++) {
                if (areas[i].className.split(' ').indexOf(self.className) > -1 && areas[i].id) {
                    var id = areas[i].id;

                    if (CKEDITOR.instances[id]){
                        CKEDITOR.instances[id].destroy();
                    }
                }
            }
        }
    },

	setConfig: function(elem, config) {
        var self = this;
		var toolbarOpt = elem.getAttribute("data-toolbar");
		var heightOpt = parseInt(elem.getAttribute("data-height"));
		var toolbar = [];
		var params = toolbarOpt || heightOpt ? CKEDITOR.tools.extend({}, config) : config;
        var height = {
            min: 60,
            max: 900
        };

		if (toolbarOpt) {
			toolbarOpt = toolbarOpt.replace(new RegExp(" ", "g"), "");
			toolbarOpt = toolbarOpt.split(",");

			for (var i = 0; i < toolbarOpt.length; i++) {
				for (var j = 0; j < params.toolbar.length; j++) {
					if (toolbarOpt[i] == (params.toolbar[j].name || params.toolbar[j])) {
						toolbar.push(params.toolbar[j]);
						break;
					}
				}
			}

			if (toolbar.length > 0) {
			    params.toolbar = toolbar;
            }
		} else {
			for (var i = 0; i < params.toolbar.length; i++) {
				if (params.toolbar[i]['hidden']) {
					params.toolbar.splice(i, 1);
				}
			}
		}

		if (heightOpt) {
		    heightOpt = heightOpt > height.max ? height.max :
                heightOpt < height.min ? height.min : heightOpt;

			params.height = heightOpt;
		}

		if (elem.nodeName.toLowerCase() === 'textarea') {
            CKEDITOR.replace(elem.id, params);
        } else {
            elem.style.overflow = 'auto';
            elem.setAttribute('contenteditable', 'true');
            CKEDITOR.inline(elem.id, params);
            CKEDITOR.instances[elem.id].on('change', function() {
                elem.previousElementSibling.value = self.getContent(elem);
            });

            CKEDITOR.instances[elem.id].on('key', function(e){
                if(e.data.keyCode === 27){
                    e.cancel();
                    window.setTimeout(function(){
                        e.editor.execCommand('blur');
                    }, 50);
                }
            });
            CKEDITOR.instances[elem.id].on('selectionChange', function(){
                elem.previousElementSibling.value = self.getContent(elem);
            });
        }
	},

    getContent: function(element) {
        if (element) {
            return CKEDITOR.instances[element.id].getData();
        }

        return '';
    },

    getStyleFormats: function(extraFormats) {
        var langCode = CKEDITOR.lang.languages[this.lang_code] ? this.lang_code : 'en';
        var lang = CKEDITOR.lang[langCode];
        var formats = [];

        if (lang) {
            formats = [
                {name: lang.format.tag_h2, element: 'h2'},
                {name: lang.format.tag_h3, element: 'h3'},
                {name: lang.format.tag_h4, element: 'h4'},
                {name: lang.format.tag_h5, element: 'h5'},
                {name: lang.format.tag_h6, element: 'h6'},
                {name: lang.toolbar.toolbarGroups.paragraph, element: 'p'},
                {name: lang.blockquote.toolbar, element: 'blockquote'},
                {name: lang.format.tag_div, element: 'div'},
                {name: lang.format.tag_pre, element: 'pre'},

                {name: lang.basicstyles.bold, element: 'strong'},
                {name: lang.basicstyles.italic, element: 'em'},
                {name: lang.basicstyles.underline, element: 'span', styles: {'text-decoration' : 'underline'}},
                {name: lang.basicstyles.strike, element: 'span', styles: {'text-decoration' : 'line-through'}},
                {name: lang.basicstyles.superscript, element: 'sup'},
                {name: lang.basicstyles.subscript, element: 'sub'},
                {name: langCode === 'ru' ? 'Код' : 'Code', element: 'code'}
            ];
        }

        if (extraFormats) {
            formats = formats.concat(extraFormats);
        }

        return formats;
    },

    getValidElements: function(extra) {
        if (extra != 'extra') {
            if (this.cmsSettings && !this.cmsSettings.verify_html) {
                return true;
            } else {
                return false;
            }
        }

        if (this.cmsSettings && !this.cmsSettings.verify_html) {
            return true;
        }

        var els = "a[style,rel,rev,charset,hreflang,id,lang,tabindex,accesskey,type,dir"
            + ",name,href,target,title,class,onfocus,onblur,onclick,onmouseout,onmouseover,onmouseup];"
            +"abbr;"
            +"embed param[*];"
            +"acronym;"
            +"address[class,align,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"applet;"
            +"area[shape,coords,href,alt,title,onclick,target];"
            +"base[href,target];"
            +"basefont[color,face,id,size];"
            +"bdo[class,dir,id,lang,style,title];"
            +"big;"
            +"blockquote[dir,style,cite,class,dir,id,lang,onclick,ondblclick"
            +",onkeydown,onkeypress,onkeyup,onmousedown,onmousemove,onmouseout"
            +",onmouseover,onmouseup,style,title];"
            +"body[alink,background,bgcolor,class,dir,id,lang,link,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onload,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,onunload,style,title,text,vlink];"
            +"br;"
            +"button[onclick,onfocus];"
            +"caption;"
            +"center[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"cite;"
            +"code[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"col[align,char,charoff,class,dir,id"
            +",lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown"
            +",onmousemove,onmouseout,onmouseover,onmouseup,span,style,title"
            +",valign,width];"
            +"colgroup[align,char,charoff,class,dir"
            +",id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown"
            +",onmousemove,onmouseout,onmouseover,onmouseup,span,style,title"
            +",valign,width];"
            +"dd[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title];"
            +"del[cite,class,datetime,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"dfn[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"dir[class,compact,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"div[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"dl[class,compact,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"dt[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title];"
            +"fieldset[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"font[class,color,dir,face,id,lang,size,style,title];"
            +"form[accept,accept-charset,action,class,dir,enctype,id,lang"
            +",method,name,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onreset,onsubmit"
            +",style,title,target];"
            +"frame[class,frameborder,id,longdesc,marginheight,marginwidth,name"
            +",noresize,scrolling,src,style,title];"
            +"frameset[class,cols,id,onload,onunload,rows,style,title];"
            +"h1[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"h2[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"h3[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"h4[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"h5[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"h6[align,class,dir,id,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"head[dir,lang,profile];"
            +"hr[align,class,dir,id,lang,noshade,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,size,style,title,width];"
            +"html[dir,lang,version];"
            +"i[class,style,itemprop,itemscope];"
            +"iframe[align,class,frameborder,height,id"
            +",longdesc,marginheight,marginwidth,name,scrolling,src,style"
            +",title,width];"
            +"img[align,alt,border,class,dir,height"
            +",hspace,id,ismap,lang,longdesc,name,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,src,style,title,usemap,vspace,width,itemprop,itemscope];"
            +"input[accept,accesskey,align,alt"
            +",checked,class,dir,disabled,id,ismap,lang"
            +",maxlength,name,onblur,onclick,ondblclick,onfocus,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onselect"
            +",readonly,size,src,style,tabindex,title"
            +",type"
            +",usemap,value];"
            +"ins[cite,class,datetime,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"isindex[class,dir,id,lang,prompt,style,title];"
            +"kbd[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"label[accesskey,class,dir,for,id,lang,onblur,onclick,ondblclick"
            +",onfocus,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove,onmouseout"
            +",onmouseover,onmouseup,style,title];"
            +"legend[align,accesskey,class,dir,id,lang"
            +",onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"li[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title,type"
            +",value];"
            +"link[charset,class,dir,href,hreflang,id,lang,media,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,rel,rev,style,title,target,type];"
            +"map[class,dir,id,lang,name,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"menu[class,compact,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"meta[content,dir,http-equiv,lang,name,scheme];"
            +"marquee[width,height,hspace,vspace,bgcolor,direction,loop,scrolldelay,truespeed,scrollamount];"
            +"noframes[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"noscript[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"object[align,archive,border,class,classid"
            +",codebase,codetype,data,declare,dir,height,hspace,id,lang,name"
            +",onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,standby,style,tabindex,title,type,usemap"
            +",vspace,width];"
            +"ol[class,compact,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,start,style,title,type];"
            +"optgroup[class,dir,disabled,id,label,lang,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,style,title];"
            +"option[class,dir,disabled,id,label,lang,onclick,ondblclick"
            +",onkeydown,onkeypress,onkeyup,onmousedown,onmousemove,onmouseout"
            +",onmouseover,onmouseup,selected,style,title,value];"
            +"pre/listing/plaintext/xmp[align,class,dir,id,lang,onclick,ondblclick"
            +",onkeydown,onkeypress,onkeyup,onmousedown,onmousemove,onmouseout"
            +",onmouseover,onmouseup,style,title,width];"
            +"q[cite,class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"s[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title];"
            +"samp[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"script[charset,defer,language,src,type];"
            +"select[class,dir,disabled,id,lang,multiple,name"
            +",onblur,onclick,ondblclick,onfocus,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,size,style"
            +",tabindex,title];"
            +"small[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"span[align,class,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"strike[class,class,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title];"
            +"strong,b;"
            +"style[dir,lang,media,title,type];"
            +"sub[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"sup[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"table[align,bgcolor,border,cellpadding,cellspacing,class"
            +",dir,frame,height,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,rules"
            +",style,summary,title,width];"
            +"tbody[align,char,class,charoff,dir,id"
            +",lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown"
            +",onmousemove,onmouseout,onmouseover,onmouseup,style,title"
            +",valign];"
            +"#td[abbr,align,axis,bgcolor,char,charoff,class"
            +",colspan,dir,headers,height,id,lang,nowrap,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,rowspan,scope"
            +",style,title,valign,width];"
            +"textarea[accesskey,class,cols,dir,disabled,id,lang,name"
            +",onblur,onclick,ondblclick,onfocus,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,onselect"
            +",readonly,rows,style,tabindex,title];"
            +"tfoot[align,char,charoff,class,dir,id"
            +",lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown"
            +",onmousemove,onmouseout,onmouseover,onmouseup,style,title"
            +",valign];"
            +"th[abbr,align,axis,bgcolor,char,charoff,class"
            +",colspan,dir,headers,height,id,lang,nowrap,onclick"
            +",ondblclick,onkeydown,onkeypress,onkeyup,onmousedown,onmousemove"
            +",onmouseout,onmouseover,onmouseup,rowspan,scope"
            +",style,title,valign,width];"
            +"thead[align,char,charoff,class,dir,id"
            +",lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup,onmousedown"
            +",onmousemove,onmouseout,onmouseover,onmouseup,style,title"
            +",valign];"
            +"title[dir,lang];"
            +"tr[abbr,align,bgcolor,char,charoff,class"
            +",rowspan,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title,valign];"
            +"tt[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title];"
            +"u[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress,onkeyup"
            +",onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style,title];"
            +"ul[class,compact,dir,id,lang,onclick,ondblclick,onkeydown"
            +",onkeypress,onkeyup,onmousedown,onmousemove,onmouseout,onmouseover"
            +",onmouseup,style,title,type];"
            +"var[class,dir,id,lang,onclick,ondblclick,onkeydown,onkeypress"
            +",onkeyup,onmousedown,onmousemove,onmouseout,onmouseover,onmouseup,style"
            +",title];"
            +"video[autoplay,preload,controls,loop,poster,height,width,muted,mediagroup,src]";
        return els;
    },

    myCustomCleanup: function(type, value) {
        const params = [
            {
                regexp: /https?:\/\/removeme/gi,
                replace: '',
            },
            {
                regexp: /https?:\/\/(?:www\.)?oml.ru(\/d\/\d+\/[dt]\/)/gi,
                replace: '$1',
            },
            {
                regexp: /\<noindex\>/gi,
                replace: '<!--noindex-->',
            },
            {
                regexp: /\<\/noindex\>/gi,
                replace: '<!--/noindex-->',
            },
            {
                regexp: new RegExp("https?:\/\/" + ckeditorController.site_domain + "(\/d\/\d+\/[dt]\/)", "gi"),
                replace: '$1',
            },
            {
                regexp: new RegExp("https?:\/\/" + ckeditorController.site_domain + "([^.])", "gi"),
                replace: '$1',
            },
        ];

        switch (type) {
            case "get_from_editor":
                for (var i = 0; i < params.length; i++) {
                    if (value.match(params[i].regexp)) {
                        return "set_data";
                    }
                }
                if (value.match(/https?\:\/\/cp\d{1,2}\.megagroup\.ru\/d\/[\d]+\/[dt]\//gi)) {
                    return "set_data";
                }

                break;

            case "insert_to_editor":
                for (var i = 0; i < params.length; i++) {
                    value = value.replace(params[i].regexp, params[i].replace);
                }

                if (value.search(/https?\:\/\/cp\d{1,2}\.megagroup\.ru\/d\/[\d]+\/[dt]\//gi) === 0) {
                    var checkLink = value.match(/\/d\/[\d]+\/[dt]\//gi);

                    if(checkLink) {
                        checkLink = Number(checkLink[0].replace(/\/[dt]\//gi, ""));

                        if (checkLink === VER_ID) {
                            value = url.replace(/https?\:\/\/cp\d{1,2}\.megagroup\.ru/gi, "");
                        }
                    }
                }
                break;

            case "get_from_editor_dom":

                break;

            case "insert_to_editor_dom":

                break;
        }

        return value ? value : "/";
    },

    getAttr: function(element) {
        return typeof element.src !== 'undefined' ? 'src' : 'href';
    },

    // Функция ищет среди всех ссылок в редакторе "абсолютные", которые мы можем исправить на относительные
    checkUrl: function(editor) {
        const self = this;
        const elements = editor.document.find(self.links).$;

        const text = [].reduce.call(elements, function(store, element) {
            const attr = self.getAttr(element);
            const value = element.getAttribute(attr) || ' ';

            return store + value + ' ';
        }, ' ');

        return self.myCustomCleanup("get_from_editor", text) === 'set_data';
    },

    fixUrl: function(editor) {
        const self = this;
        var attr, savedAttr, value, saved;
        var elems = editor.document.find(self.links).$;

        [].forEach.call(elems, function(elem) {
            attr = self.getAttr(elem);
            value = elem.getAttribute(attr);
            savedAttr = 'ckeSaved' + attr.charAt(0).toLocaleUpperCase() + attr.slice(1);
            saved = !!elem.dataset[savedAttr];

            if (value) {
                value = self.myCustomCleanup("insert_to_editor", value);

                elem[attr] = value;
                elem.setAttribute(attr, value);

                if (saved) {
                    elem.dataset[savedAttr] = value;
                }
            }
        });
    },

    fixImageResize: function(editor) {
        [].forEach.call(editor.document.find('img[data-cke-resizable="true"][data-cke-realelement]').$, function (img) {
            const nameAttr = 'data-cke-add-handler-resize';
            const attr = img.getAttribute(nameAttr);

            if (!attr) {
                img.setAttribute(nameAttr, true);
                img.addEventListener('DOMAttrModified', function (e) {
                    var realelement, regex;

                    if (/width|height/i.test(e.attrName)) {
                        regex = new RegExp('('+ e.attrName +'="?)(\\d+)', 'g');
                        realelement = decodeURIComponent(img.getAttribute('data-cke-realelement'));
                        realelement = realelement.replace(regex, '$1' + e.newValue);
                        img.setAttribute('data-cke-realelement', encodeURIComponent(realelement));
                    }
                }, false);
            }
        });
    },

    handlerCheckLink: function(event) {
        const self = ckeditorController;

        if (event.editor.document.$ !== window.document && self.checkUrl(event.editor)) {
            self.fixUrl(event.editor);
        }

        self.fixImageResize(event.editor);

        if (event.editor.element.$.classList.contains('cke_editable_inline')){
            event.editor.fire("focus");
        }
    },

    init: function(lang_code, cmsSettings, google_key) {
        var self = this;

        self.cmsSettings = cmsSettings;
        self.lang_code = lang_code ? lang_code : self.lang_code;

        if (CKEDITOR && !self.working) {
            if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
                CKEDITOR.tools.enableHtml5Elements( document );

            CKEDITOR.lang.load(CKEDITOR.lang.languages[this.lang_code] ? this.lang_code : 'en', 'ru', function() {
                CKEDITOR.stylesSet.add( 'my_styles', self.getStyleFormats() );
            });

            self.config = {
                contentsCss: '/my/s3/css/redesign/fonts.css',
                baseHref: self.site_domain_prot,
                language: self.lang_code,
                autoParagraph: false,
                indentOffset: 10,
                resize_dir: 'both',
                width: '100%',
                height: 350,
                resize_minWidth: 250,
                allowedContent: true,
                stylesSet: 'my_styles',
                disableNativeSpellChecker: false,
				leaflet_maps_google_api_key: google_key !== "" ? 'AIzaSyA9ySM6msnGm0qQB1L1cLTMBdKEUKPySmQ' : google_key,
                fontSize_sizes : '8pt/8pt;9pt/9pt;10pt/10pt;11pt/11pt;12pt/12pt;13pt/13pt;14pt/14pt;15pt/15pt;18pt/18pt;24pt/24pt;36pt/36pt;48pt/48pt;',
                font_names: FONTS_EDITOR_ALL,
                toolbar: [
                    { name: 'clipboard', items: [ 'Undo', 'Redo' ] },
                    { name: 'fontstyles', items: [ 'Font', 'FontSize' ], hidden: true },
                    { name: 'styles', items: [ 'Styles', 'Font', 'FontSize' ] },
                    { name: 'basicstyles', items: [ 'Bold', 'Italic', '-', 'RemoveFormat' ] },
                    { name: 'insert', items: [ 's3image', 'Image', 'Table', 'HorizontalRule', 'VideoDetector', 's3media','Html5audio', 's3style' ] },
                    { name: 'find', items: [ 'Find' ] },
                    { name: 'mode', items: [ 'Sourcedialog' ] },
                    '/',
                    { name: 'paragraph', items: [ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'JustifyBlock', '-', 'NumberedList', 'BulletedList', '-', 'Outdent', 'Indent', 'Blockquote' ] },
                    { name: 'button', items: [ 's3button' ] },
                    { name: 'links', items: [ 's3file', 's3link', 'Link', 'Unlink', 'Anchor', 'noindex' ] },
                    { name: 'shop', items: [ 's3cart', 's3folder' ] },
                    { name: 'map', items: [ 'leaflet' ] },
                    { name: 'colors', items: [ 'TextColor', 'BGColor' ] },
                    { name: 'tools', items: [ 'ShowBlocks', '-', 'Maximize', 'SpecialChar' ] }
                ],
                // Старый список подключенных библиотек. Пока оставим, если какой-то библиотеки не будет хватать клиентам
                // extraPlugins: "backgrounds,s3image,s3button,s3cart,s3file,s3folder,s3link,s3media,s3style,noindex,videodetector,sourcedialog,codemirror,lineutils,widget,leaflet,showprotected,specialchar,dragresize,image,video,cellselection",

                // Новый список
                extraPlugins: "backgrounds,html5audio,s3image,s3button,s3cart,s3file,s3folder,s3link,s3media,s3style,noindex,videodetector,lineutils,dragresize,image,codemirror,video,leaflet,tableresize,cellselection",
                on: {
                    blur: function(e) {
                        if (e.editor.document.$ !== window.document && self.checkUrl(e.editor)) {
                            self.fixUrl(e.editor);
                        }
                    },
                    instanceReady: function(e) {
	                      var dataCkeRealelement = e.editor.document.$.querySelectorAll(".cke_iframe[data-cke-realelement]");

                        e.editor.dataProcessor.htmlFilter.addRules({
                            elements: {
                                span: function(el) {
                                    const style = el.attributes.style;

                                    if (style && /font\-family/.test(style)) {
                                        const styles = {};
                                        const arrayStyles = style.split(';');

                                        for (let i = 0; i < arrayStyles.length; i++) {
                                            const item = arrayStyles[i].split(':');
                                            styles[item[0]] = item[1];
                                        }

                                        let fontName = styles['font-family'];

                                        if (fontName) {
                                            fontName = fontName.trim().replace(/(\"|\')/g,'');
                                            const fontNameAlias = configEditorFont[fontName];

                                            if (fontNameAlias) {
                                              el.attributes['data-mega-font-name'] = fontNameAlias.toLocaleLowerCase().replace(/\s/g, '_');
                                            }
                                        }
                                    }
                                }
                            }
                        });

                        if (e.editor.document.$ !== window.document && self.checkUrl(e.editor)) {
                            self.fixUrl(e.editor);
                        }

                        if (dataCkeRealelement.length) {
	                        [].forEach.call(dataCkeRealelement, function(el) {
		                        el.insertAdjacentHTML('afterEnd', decodeURIComponent(el.getAttribute('data-cke-realelement')));
		                        el.parentNode.removeChild(el);
                            });
                        }

                        //e.editor.container.setAttribute('tabindex', 0);
                        e.editor.container.setStyle('outline', 'none');
                        e.editor.container.on('click', function() {
                            e.editor.container.focus();
                        });

                        function getSelectedCells( ranges ) {
                            var cells = [],
                                node,
                                i,
                                ranges = ranges.getRanges();

                            function getCellsFromElement( element ) {
                                var cells = element.find( 'td, th' ),
                                    cellsArray = [],
                                    i;

                                for ( i = 0; i < cells.count(); i++ ) {
                                    cellsArray.push( cells.getItem( i ) );
                                }

                                return cellsArray;
                            }

                            for ( i = 0; i < ranges.length; i++ ) {
                                node = ranges[ i ]._getTableElement();

                                if ( node.is && node.is( { td: 1, th: 1 } ) ) {
                                    cells.push( node );
                                } else {
                                    cells = cells.concat( getCellsFromElement( node ) );
                                }
                            }

                            return cells;
                        }

                        function cellInRow( tableMap, rowIndex, cell ) {
                            var oRow = tableMap[ rowIndex ];

                            if ( typeof cell == 'undefined' ) {
                                return oRow;
                            }

                            for ( var c = 0; oRow && c < oRow.length; c++ ) {
                                if ( cell.is && oRow[ c ] == cell.$ ) {
                                    return c;
                                } else if ( c == cell ) {
                                    return new CKEDITOR.dom.element( oRow[ c ] );
                                }
                            }
                            return cell.is ? -1 : null;
                        }

                        function trimCell( cell ) {
                            var bogus = cell.getBogus();

                            bogus && bogus.remove();
                            cell.trim();
                        }

                        function mergeCells( selection, mergeDirection, isDetect ) {
                            var cells = getSelectedCells( selection ),
                                commonAncestor;

                            if ( ( mergeDirection ? cells.length != 1 : cells.length < 2 ) ||
                                ( commonAncestor = selection.getCommonAncestor() ) &&
                                commonAncestor.type == CKEDITOR.NODE_ELEMENT && commonAncestor.is( 'table' ) ) {
                                return false;
                            }

                            var firstCell = cells[ 0 ],
                                table = firstCell.getAscendant( 'table' ),
                                map = CKEDITOR.tools.buildTableMap( table ),
                                mapHeight = map.length,
                                mapWidth = map[ 0 ].length,
                                startRow = firstCell.getParent().$.rowIndex,
                                startColumn = cellInRow( map, startRow, firstCell ),
                                cell;



                            if (!mergeDirection) {
                                var selectedCellsInRow = 0,
                                    rowSpanCount = 0;
                                for (var i = 0; i < map.length; i++) {
                                    var countCellsMergeRows = 0;

                                    for (var j = 0; j < map[i].length; j++) {
                                        if (map[i][j].rowSpan > 1) {
                                            countCellsMergeRows++;
                                        }

                                        if (map[i][j].className === "cke_table-faked-selection") {
                                            selectedCellsInRow++;
                                        }
                                    }

                                    if (countCellsMergeRows + selectedCellsInRow === map[i].length) {
                                        for (var j = 0; j < map[i].length; j++) {
                                            map[i][j].rowSpan = map[i][j].rowSpan - rowSpanCount;
                                        }

                                        rowSpanCount = 1;
                                    }

                                    selectedCellsInRow = 0;
                                }
                            }

                            if ( mergeDirection ) {
                                var targetCell;
                                try {
                                    var rowspan = parseInt( firstCell.getAttribute( 'rowspan' ), 10 ) || 1,
                                        colspan = parseInt( firstCell.getAttribute( 'colspan' ), 10 ) || 1;

                                    targetCell = map[ mergeDirection == 'up' ? ( startRow - rowspan ) : mergeDirection == 'down' ? ( startRow + rowspan ) : startRow ][
                                        mergeDirection == 'left' ?
                                            ( startColumn - colspan ) :
                                            mergeDirection == 'right' ? ( startColumn + colspan ) : startColumn ];

                                } catch ( er ) {
                                    return false;
                                }

                                if ( !targetCell || firstCell.$ == targetCell ) {
                                    return false;
                                }

                                cells[ ( mergeDirection == 'up' || mergeDirection == 'left' ) ? 'unshift' : 'push' ]( new CKEDITOR.dom.element( targetCell ) );
                            }

                            var doc = firstCell.getDocument(),
                                lastRowIndex = startRow,
                                totalRowSpan = 0,
                                totalColSpan = 0,

                                frag = !isDetect && new CKEDITOR.dom.documentFragment( doc ),
                                dimension = 0;

                            for ( var i = 0; i < cells.length; i++ ) {
                                cell = cells[ i ];

                                var tr = cell.getParent(),
                                    cellFirstChild = cell.getFirst(),
                                    colSpan = cell.$.colSpan,
                                    rowSpan = cell.$.rowSpan,
                                    rowIndex = tr.$.rowIndex,
                                    colIndex = cellInRow( map, rowIndex, cell );

                                dimension += colSpan * rowSpan;

                                totalColSpan = Math.max( totalColSpan, colIndex - startColumn + colSpan );
                                totalRowSpan = Math.max( totalRowSpan, rowIndex - startRow + rowSpan );

                                if ( !isDetect ) {
                                    if ( trimCell( cell ), cell.getChildren().count() ) {

                                        if ( rowIndex != lastRowIndex && cellFirstChild && !( cellFirstChild.isBlockBoundary && cellFirstChild.isBlockBoundary( { br: 1 } ) ) ) {
                                            var last = frag.getLast( CKEDITOR.dom.walker.whitespaces( true ) );
                                            if ( last && !( last.is && last.is( 'br' ) ) ) {
                                                frag.append( 'br' );
                                            }
                                        }

                                        cell.moveChildren( frag );
                                    }
                                    i ? cell.remove() : cell.setHtml( '' );
                                }
                                lastRowIndex = rowIndex;
                            }

                            if ( !isDetect ) {
                                if (mergeDirection || totalColSpan == 1) {
                                    frag.moveChildren( firstCell );

                                    firstCell.appendBogus();

                                    if ( totalColSpan >= mapWidth ) {
                                        firstCell.removeAttribute( 'rowSpan' );
                                    } else {
                                        firstCell.$.rowSpan = totalRowSpan;
                                    }

                                    if ( totalRowSpan >= mapHeight ) {
                                        firstCell.removeAttribute( 'colSpan' );
                                    } else {
                                        firstCell.$.colSpan = totalColSpan;
                                    }
                                }

                                if (totalColSpan > 1) {
                                    if ( totalRowSpan >= mapHeight ) {
                                        firstCell.removeAttribute( 'colSpan' );
                                    } else {
                                        firstCell.$.colSpan = totalColSpan;
                                    }
                                }


                                var trs = new CKEDITOR.dom.nodeList( table.$.rows ),
                                    count = trs.count();

                                for ( i = count - 1; i >= 0; i-- ) {
                                    var tailTr = trs.getItem( i );
                                    if ( !tailTr.$.cells.length ) {
                                        tailTr.remove();
                                        count++;
                                        continue;
                                    }
                                }

                                return firstCell;
                            }

                            else {
                                return ( totalRowSpan * totalColSpan ) == dimension;
                            }
                        }

                        function placeCursorInCell( cell, placeAtEnd ) {
                            var docInner = cell.getDocument(),
                                docOuter = CKEDITOR.document;

                            if ( CKEDITOR.env.ie && CKEDITOR.env.version == 10 ) {
                                docOuter.focus();
                                docInner.focus();
                            }

                            var range = new CKEDITOR.dom.range( docInner );
                            if ( !range[ 'moveToElementEdit' + ( placeAtEnd ? 'End' : 'Start' ) ]( cell ) ) {
                                range.selectNodeContents( cell );
                                range.collapse( placeAtEnd ? false : true );
                            }
                            range.select( true );
                        }

                        function createDef( def ) {
                            return CKEDITOR.tools.extend( def || {}, {
                                contextSensitive: 1,
                                refresh: function( editor, path ) {
                                    this.setState( path.contains( { td: 1, th: 1 }, 1 ) ? CKEDITOR.TRISTATE_OFF : CKEDITOR.TRISTATE_DISABLED );
                                }
                            } );
                        }

                        function addCmd( name, def ) {
                            var cmd = e.editor.addCommand( name, def );
                            e.editor.addFeature( cmd );
                        }

                        addCmd( 'cellMerge', createDef( {
                            allowedContent: 'td[colspan,rowspan]',
                            requiredContent: 'td[colspan,rowspan]',
                            exec: function( editor, data ) {
                                data.cell = mergeCells( editor.getSelection() );

                                placeCursorInCell( data.cell, true );
                            }
                        } ) );

                        e.editor.container.$.addEventListener('keydown', function(event) {
                            event.stopPropagation();
                        });

                        // # Bug #26739
                        if (!self.cmsSettings.verify_html) {
                            CKEDITOR.dtd.$removeEmpty = {};
                        }

                        self.fixImageResize(e.editor);

                        (function() {
                            var embed, combopanel, iframe, width, height;
	                        [].forEach.call(e.editor.document.$.querySelectorAll('*'), function(el) {
		                        if (el.nodeName.toLowerCase() === 'cke:object') {
			                        embed = el.querySelector('[type="application/x-shockwave-flash"]') || el;
			                        width = embed.getAttribute('width');
			                        height = embed.getAttribute('height');

			                        el.insertAdjacentHTML('afterEnd', '<img class="cke_flash" style="' +
				                        'width:' + width + ';' +
				                        'height:' + height + ';" ' +
				                        'data-cke-realelement="' + encodeURIComponent(el.outerHTML) + '" ' +
				                        'src="data:image/gif;base64,R0lGODlhAQABAPABAP///wAAACH5BAEKAAAALAAAAAABAAEAAAICRAEAOw==" ' +
				                        'data-cke-real-node-type="1" alt="Flash" title="Flash" ' +
				                        'data-cke-real-element-type="flash" data-cke-resizable="true">');
			                        el.parentNode.removeChild(el);
		                        }
	                        });

	                        // shit code for google chrome 55 Bug #25906
	                        if (/Chrome/.test(navigator.userAgent) && /Google Inc/.test(navigator.vendor)) {
                                $(document).on('click', '#' + e.editor.id + '_top .cke_combo_button', function() {
                                    combopanel = document.querySelector('.cke_combopanel');
                                    iframe = combopanel.querySelector('iframe');

                                    if (combopanel.offsetWidth && combopanel.offsetHeight) {
                                        setTimeout(function () {
                                            if (iframe.style.height) {
                                                iframe.style.height = '';
                                            } else {
                                                iframe.style.height = combopanel.offsetHeight + 'px';
                                            }
                                        }, 1);
                                    }
                                });
	                        }
                        }());
                    },
                    maximize: function(e) {
                        var lastPopup, zIndex;

                        if (e.data === 2 && popupController.popups.length) {
                            lastPopup = popupController.getLastPopup();
                            zIndex = lastPopup.obj.style.zIndex - popupController.zIndexStep;

                            popupController.showModalDiv(zIndex);
                        }
                    },
                    key: function(e) {
                        var event = e.data.domEvent.$,
                            keyCode = event.keyCode || event.which,
                            ctrlKey = event.ctrlKey || event.metaKey,
                            editor = e.editor;

                        if (ctrlKey && keyCode === 83) {
                            event.preventDefault();
                            setTimeout(function() {
                                parent.util.submitFormFromIframe($(e.editor.element.$.form));
                            }, 50)
                        } else if (keyCode === 27) {
                            if (editor.commands.maximize.state === 1) {
                                editor.execCommand('maximize');
                            } else {
                                parent.popupController.closeLastPopup();
                            }
                        }
                    },
                    afterInsertHtml: self.handlerCheckLink,
                    insertElement: self.handlerCheckLink,
                    dialogHide: self.handlerCheckLink,
                    change: function(e) {}
                }
            };

            CKEDITOR.on('dialogDefinition', function (ev) {
                var dialogName = ev.data.name,
                    dialogDefinition = ev.data.definition,
                    editor = ev.editor,
                    tabName = '';

                if (dialogName == 'table' || dialogName == 'tableProperties') {
                    tabName = 'advanced';

                    var tab = dialogDefinition.getContents(tabName);

                    if (!tab)
                        return;

                    var classSelect = {
                        type: "vbox",
	                    widths: [45, 'auto'],
	                    children: [
                            {
	                            type: 'select',
	                            label: 'Класс',
	                            id: 'cssClass',
	                            items: [
		                            [''],
		                            ['Таблица без рамки', 'table0'],
		                            ['Таблица с рамкой', 'table1'],
		                            ['Таблица с заголовком', 'table2'],
		                            [ editor.lang.s3style["New value"], "-" ]
	                            ],
	                            setup: function(selectedElement) {
	                                var className = selectedElement.getAttribute('class');
		                            this.getElement().getParent().setStyle('padding-top', 0);

		                            if (className) {
		                                if (this.items.toString().indexOf(className) === -1) {
			                                this.setValue('-');
		                                } else {
			                                this.setValue(className);
                                        }
		                            }

		                            if (this.getValue() == '') {
			                            this.setValue('-');
                                    }
	                            },
	                            commit: function(data, selectedElement) {
		                            var element = selectedElement || data,
                                        dialog = this.getDialog(),
			                            value = this.getValue(),
                                        text = dialog.getContentElement(tabName, 'cssClassText'),
                                        textValue = text.getValue().split(' ');

		                            if (!value) return;

		                            for (var i = 0; i < this.items.length; i++) {
			                            element.removeClass(this.items[i][1]);
		                            }

		                            if (value != '-') {
			                            textValue.forEach(function(className) {
				                            if (className) {
					                            element.removeClass(className);
				                            }
			                            });

			                            element.addClass(value);
                                    } else {
		                                if (element.getAttribute('class') != text) {
                                            element.setAttribute('class', '');
                                            textValue.forEach(function(className) {
                                                if (className) {
                                                    element.addClass(className);
                                                }
                                            });
		                                }
                                    }
	                            },
	                            onChange: function() {
		                            var dialog = this.getDialog();
		                            var text = dialog.getContentElement(tabName, 'cssClassText').getElement();
		                            var value = this.getValue();

		                            if (value == "-") {
			                            text.show();
                                    } else {
			                            text.hide();
                                    }
	                            }
                            },
                            {
	                            type: 'text',
	                            id: 'cssClassText',
	                            setup: function(selectedElement) {
		                            var className = selectedElement.getAttribute('class');
		                            var dialog = this.getDialog();
		                            var select = dialog.getContentElement(tabName, 'cssClass');

		                            if (className && select.items.toString().indexOf(className) === -1) {
		                                this.setValue(className);
                                    }
                                }
                            }
                        ]
                    };

                    if (tabName == 'advanced') {
                        tab.add(classSelect, 'advCSSClasses');
                        tab.remove('advCSSClasses');
                    }
                } else if (dialogName == 'image') {
                    tabName = 'advanced';

                    var tab = dialogDefinition.getContents(tabName);

                    if (!tab)
                        return;

                    var layout = {
                        type: 'vbox',
                        children: [
                            {
                                type: 'html',
                                html: 'Альтернативное изображение',
                                style: 'font-size: 1.3em'
                            },
                            {
                                type: 'text',
                                id: 'hover',
                                label: 'При наведении',
                                setup: function(data, selectedElement) {
                                    if (selectedElement.data('cke-pa-onmouseover') && selectedElement.data('cke-pa-onmouseover').match(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/)) {
                                        var value = selectedElement.data('cke-pa-onmouseover').replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/, '$1');

                                        this.setValue(value);
                                    }
                                },
                                commit: function(data, selectedElement) {
                                    if (selectedElement && data == 1) {
                                        selectedElement.data('cke-pa-onmouseover', (this.getValue() ? ('this.src=\'' + this.getValue() + '\'') : false));
                                    }
                                }
                            },
                            {
                                type: 'text',
                                id: 'normal',
                                label: 'В нормальном состоянии',
                                setup: function(data, selectedElement) {
                                    if (selectedElement.data('cke-pa-onmouseout') && selectedElement.data('cke-pa-onmouseout').match(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/)) {
                                        var value = selectedElement.data('cke-pa-onmouseout').replace(/^\s*this.src\s*=\s*\'([^\']+)\';?\s*$/, '$1');

                                        this.setValue(value);
                                    }
                                },
                                commit: function(data, selectedElement) {
                                    if (selectedElement && data == 1) {
                                        selectedElement.data('cke-pa-onmouseout', (this.getValue() ? ('this.src=\'' + this.getValue() + '\'') : (selectedElement.data('cke-pa-onmouseover') ? ('this.src=\'' + selectedElement.data('cke-saved-src') + '\'') : false)));
                                    }
                                }
                            }
                        ]
                    };

                    if (tabName == 'advanced') {
                        tab.add(layout);
                    }
                }
            });

            self.working = true;
        }
    },

    /**
     * Получить индивидуальные конфиги для инициализации ckeditor из data атрибутов.
     *
     * @description У data атрибутов должен быть префикс 'ckeditor_'.
     * @description Пример: <textarea class="mceEditor" data-ckeditor_height="130"></textarea>
     *
     * @param {HTMLElement} element
     * @return {Record<string, string>}
     * @private
     */
    _getConfigFromDataAttributes: function (element) {
        const prefix = 'ckeditor_';
        /** @type {Record<string, string>} */
        const config = {};

        for (let datasetKey in element.dataset) {
            if (!datasetKey.includes(prefix)) {
              continue;
            }

            const configKey = datasetKey.replace(prefix, '');
            config[configKey] = element.dataset[datasetKey];
        }

        return config;
    },
};
