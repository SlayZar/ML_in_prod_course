$(document).ready(function () {
    hljs.configure({tabReplace: '    ', useBR: false});


    /* При скроле блока блокирует скрол страницы, пока указатель мыши находится на блоке */
    $.fn.disableScrollPageWhileScrollBlock = function () {
        $(this).on('mouseover', function () {
            var elem = $(this);
            $('body').on('mousewheel', function (event) {
                var currentScroll = elem.scrollTop(),
                    deltaY = event.originalEvent.wheelDeltaY;

                var scrollToPosition = currentScroll - deltaY;
                if (scrollToPosition < 0) {
                    scrollToPosition = 0;
                }
                elem.scrollTo(scrollToPosition);
                return false;
            });
        });
        $(this).on('mouseout', function () {
            $('body').off('mousewheel');
        });
    };

    $.fn.serializeObject = function () {
        var o = {};
        var a = this.serializeArray();
        $.each(a, function () {
            if (o[this.name] !== undefined) {
                if (!o[this.name].push) {
                    o[this.name] = [o[this.name]];
                }
                o[this.name].push(this.value || '');
            } else {
                o[this.name] = this.value || '';
            }
        });
        return o;
    };

    $.fn.numberRangeFilter = function (minAttr, maxAttr) {
        $(this).keypress(function (e) {
            if ((e.which < 48 || e.which > 57) && e.which != 13 && e.which != 8 && e.which != 0) {
                return false;
            }
        });

        $(this).keyup(function () {
            var maxMark = parseInt($(this).attr(maxAttr));
            if (!isNaN(maxMark)) {
                var value = $(this).val();
                var intValue = parseInt(value);
                if (isNaN(intValue)) {
                    return false;
                }
                if (intValue > maxMark) {
                    intValue = maxMark;
                }
                if (intValue != value) {
                    $(this).val(intValue);
                }
            }
        });
    };

    /* При скроле блока блокирует скрол страницы, пока указатель мыши находится на блоке */
    $.fn.disableScrollPageWhileScrollBlock = function () {
        $(this).on('mouseover', function () {
            var elem = $(this);
            $('body').on('mousewheel', function (event) {
                var xCurrentScroll = elem.scrollLeft(),
                    yCurrentScroll = elem.scrollTop(),
                    deltaY = event.originalEvent.wheelDeltaY,
                    deltaX = event.originalEvent.wheelDeltaX;

                var yScrollToPosition = yCurrentScroll - deltaY;
                var xScrollToPosition = xCurrentScroll - deltaX;

                if (yScrollToPosition < 0) yScrollToPosition = 0;
                if (xScrollToPosition < 0) xScrollToPosition = 0;

                elem.scrollTop(yScrollToPosition);
                elem.scrollLeft(xScrollToPosition);
                return false;
            });
        });
        $(this).on('mouseout', function () {
            $('body').off('mousewheel');
        });
    };


    $.fn.disableBlockScrolling = function () {

        $(this).on('mousewheel', function (event) {
            var currentScroll = $(this).scrollTop();

            var scrollToPosition = currentScroll;

            $(this).scrollTo(scrollToPosition);
            return false;
        });

    };


    $.fn.enableBlockScrolling = function () {
        $(this).off('mousewheel');
        $(this).onkeydown = null;
    }
});


var initMarkitupUploadFile = function () {
    $('.modal-image-upload').jqm({
        onHide: function(e) { // e stands for hash
            e.w.hide(); // Hide window
            e.o.remove(); // Remove overlay
            $('.modal-image-upload form').find('.img_file__type_error').html(''); // Remove Error Msg  on close of Modal Window
        },
    });

    $('.modal-image-upload .nav-pills a').click(function (e) {
        e.preventDefault();
        $('.modal-image-upload form').hide();
        $('.modal-image-upload .nav-pills li').removeClass('active');

        $(this).parent('li').addClass('active');

        var type = $(this).parent('li').data('type');
        $('.modal-image-upload form[data-type="' + type + '"]').show();
        $('.modal-image-upload form').find('.img_file__type_error').html('');// Remove Link Error Msg  on close of Modal Window
    });

    $('#submit-image-upload').click(function (e) {
        e.preventDefault();
        var maxSize = $(this).data('max-size');
        $(e.currentTarget).attr("disabled", "disabled"); // Block button to prevent multiple click
        $(e.currentTarget).addClass("button-disabled"); // CSS for Blocked button

        $('#block_upload_img_content_pc').ajaxSubmit({
            success: function (result) {
                var imageUrl = result.image;
                var imageTag = '<img src="' + imageUrl +
                    '" title="' + $('#block_upload_img_content_pc #form-image-title').val() + '" />'

                $(e.currentTarget).removeAttr("disabled"); // UnBlock button
                $(e.currentTarget).removeClass("button-disabled"); // CSS for UnBlocked button
                $('.modal-image-upload form').find('.img_file__type_error').html(''); // Remove Error Msg  on close of Modal Window

                $.markItUp({replaceWith: imageTag});
                $('.modal-image-upload').jqmHide();
                // $('.modal-image-upload #img_file').replaceWith($('.modal-image-upload #img_file').clone(true)); // Keep value of File Field instead of clearing

                // Clearing of All the Fields in All the Tabs:
                // * "From Internet":
                $('.modal-image-upload #img_url').val('http://'); // Clear Link Field
                $('.modal-image-upload #form-image-url-title').val(''); // Clear Description Field
                $('.modal-image-upload #form-image-url-align').val(''); // Clear Alignment Field
                // * [Current tab] Tab "From Computer":
                $('.modal-image-upload #img_file').val(''); // Clear File Field
                $('.modal-image-upload #form-image-title').val(''); // Clear Description Field
                $('.modal-image-upload #form-image-align').val(''); // Clear Alignment Field

            },
            error: function (result) { // Checking on errors: 400 - no link provided; 415 - no image found through link
                var errors = $('.modal-image-upload form').find('.img_file__type_error');
                errors.html('');

                var errorMessages = {
                    '415': 'Пожалуйста, выберите изображение (jpg/gif/png).<br>',
                    '413': 'Размер изображения не должен превышать ' + maxSize + ' Мб.<br>',
                    '400': 'Пожалуйста, выберите изображение (jpg/gif/png).<br>',
                    '504': 'Превышено допустимое время загрузки картинки<br>'
                };

                var status = result.status.toString();

                if (status in errorMessages)
                    errors.append(errorMessages[status]);
                else
                    errors.append('Неизвестная ошибка сервера.<br>');

                $(e.currentTarget).removeAttr("disabled"); // UnBlock button
                $(e.currentTarget).removeClass("button-disabled"); // CSS for UnBlocked button
            },
        });
    });

    $('#code-language-list').submit(function (e) {
        e.preventDefault();
        var lang = $('#code-language').val();
        $('.code-language-list').jqmHide();
        if(lang==""){
            $.markItUp({openWith: '<code>',
            closeWith: '</code>'});
        }else{
            $.markItUp({openWith: '<code class="' + lang + '">',
            closeWith: '</code>'});
        }
    });

    $('#block_upload_link').submit(function (e) {
        e.preventDefault();

        var url = $('#form-link').val();
        $('.modal-link-upload').jqmHide();
        $('#form-link').val('http://');
        
        $.markItUp({openWith: '<a target="_blank" href="' + url + '">',
        closeWith: '</a>', placeHolder: 'Описание ссылки...' });

    });

    $('#submit-image-upload-link').click(function (e) {
        e.preventDefault();
        var imageUrl = $('.modal-image-upload #img_url').val();
        var imageTag = '<img src="' + imageUrl + '" align="' + $('#block_upload_img_content_link #form-image-url-align').val() +
            '" title="' + $('#block_upload_img_content_link #form-image-url-title').val() + '" />'

        $.markItUp({replaceWith: imageTag});
        $('.modal-image-upload').jqmHide();

        // Clearing of All the Fields in All the Tabs:
        // * [Current tab] "From Internet":
        $('.modal-image-upload #img_url').val('http://'); // Clear Link Field
        $('.modal-image-upload #form-image-url-title').val(''); // Clear Description Field
        $('.modal-image-upload #form-image-url-align').val(''); // Clear Alignment Field
        // * Tab "From Computer":
        $('.modal-image-upload #img_file').val(''); // Clear File Field
        $('.modal-image-upload #form-image-title').val(''); // Clear Description Field
        $('.modal-image-upload #form-image-align').val(''); // Clear Alignment Field
    });

    $('#submit-image-upload-link-upload').click(function (e) {
        e.preventDefault();
        var url = $(this).data('url');
        var maxSize = $(this).data('max-size');
        $(e.currentTarget).attr("disabled", "disabled"); // Block button to prevent multiple click
        $(e.currentTarget).addClass("button-disabled"); // CSS for Blocked button

        // During File-Uploading "Insert as Link"-Button should be Disabled as well:
        $('.modal-image-upload #submit-image-upload-link').attr("disabled", "disabled"); // Block button to prevent multiple click
        $('.modal-image-upload #submit-image-upload-link').addClass("button-disabled"); // CSS for Blocked button

        $.ajax({
            url: url,
            method: "POST",
            data: {
                url: $('.modal-image-upload #img_url').val(),
                csrfmiddlewaretoken: getCookie('csrftoken')
            },
            success: function (result) {
                var imageUrl = result.image;
                var imageTag = '<img src="' + imageUrl + '" align="' + $('#block_upload_img_content_link #form-image-url-align').val() +
                    '" title="' + $('#block_upload_img_content_link #form-image-url-title').val() + '" />'

                $(e.currentTarget).removeAttr("disabled"); // UnBlock button
                $(e.currentTarget).removeClass("button-disabled"); // CSS for UnBlocked button
                $('.modal-image-upload form').find('.img_file__type_error').html(''); // Remove Error Msg  on close of Modal Window

                // "Insert as Link"-Button, Disabled During File-Uploading, should be Re-Enabled as well:
                $('.modal-image-upload #submit-image-upload-link').removeAttr("disabled"); // UnBlock button
                $('.modal-image-upload #submit-image-upload-link').removeClass("button-disabled"); // CSS for UnBlocked button

                $.markItUp({replaceWith: imageTag});
                $('.modal-image-upload').jqmHide();

                // Clearing of All the Fields in All the Tabs:
                // * [Current tab] "From Internet":
                $('.modal-image-upload #img_url').val('http://'); // Clear Link Field
                $('.modal-image-upload #form-image-url-title').val(''); // Clear Description Field
                $('.modal-image-upload #form-image-url-align').val(''); // Clear Alignment Field
                // * Tab "From Computer":
                $('.modal-image-upload #img_file').val(''); // Clear File Field
                $('.modal-image-upload #form-image-title').val(''); // Clear Description Field
                $('.modal-image-upload #form-image-align').val(''); // Clear Alignment Field
            },
            error: function (result) { // Checking on errors: 500 - no link provided; 400 - no image found through link
                var errors = $('.modal-image-upload form').find('.img_file__type_error');
                errors.html('');

                var errorMessages = {
                    '415': 'Изображение по указанной ссылке не найдено.<br>',
                    '413': 'Размер изображения не должен превышать ' + maxSize + ' Мб.<br>',
                    '400': 'Изображение (jpg/gif/png) по ссылке не найдено.<br>',
                    '423': 'Ссылка должна начинаться с http:// или https://.<br>',
                    '504': 'Превышено допустимое время загрузки картинки.<br>',
                    '403': 'Некорректная ссылка.<br>'
                };

                var status = result.status.toString();

                if (status in errorMessages)
                    errors.append(errorMessages[status]);
                else
                    errors.append('Неизвестная ошибка сервера.<br>');

                $(e.currentTarget).removeAttr("disabled"); // UnBlock button
                $(e.currentTarget).removeClass("button-disabled"); // CSS for UnBlocked button

                // "Insert as Link"-Button, Disabled During File-Uploading, should be Re-Enabled as well:
                $('.modal-image-upload #submit-image-upload-link').removeAttr("disabled"); // UnBlock button
                $('.modal-image-upload #submit-image-upload-link').removeClass("button-disabled"); // CSS for UnBlocked button
            },
        })
    });
};

var getMarkitup = function () {
    return {
        onShiftEnter: {keepDefault: false, replaceWith: '\n'},
        onCtrlEnter: {keepDefault: false, replaceWith: function (){
            var button_ls = $('.messages__msg-send');
            var button_comment = $('#comment-form').children('button');
            button_comment.trigger('submit');
            button_ls.trigger('submit');
        }},
        onTab: {keepDefault: false, replaceWith: '    '},
        markupSet: [
            {name: 'H4', className: 'editor-h4', openWith: '<h4>', closeWith: '</h4>'},
            {name: 'H5', className: 'editor-h5', openWith: '<h5>', closeWith: '</h5>'},
            {name: 'H6', className: 'editor-h6', openWith: '<h6>', closeWith: '</h6>'},
            {separator: '---------------' },
            {name: 'Жирный', className: 'editor-bold', openWith: '(!(<strong>|!|<b>)!)', closeWith: '(!(</strong>|!|</b>)!)' },
            {name: 'Курсив', className: 'editor-italic', openWith: '(!(<em>|!|<i>)!)', closeWith: '(!(</em>|!|</i>)!)'  },
            {name: 'Зачеркнутый', className: 'editor-stroke', openWith: '<s>', closeWith: '</s>' },
            {name: 'Подчеркнутый', className: 'editor-underline', openWith: '<u>', closeWith: '</u>' },
            {name: 'Цитировать', className: 'editor-quote', openWith: '<blockquote>', closeWith: '</blockquote>'},
            {name: 'Код', className: 'editor-code', beforeInsert: function (h) {
                $('.code-language-list').jqm({
                    onShow: function(hash){
                        hash.w.fadeIn('fast', function() {
                            $('#form-link').focus().select();
                        });
                    }
                }).jqmShow();
            } },
            {separator: '---------------' },
            {name: 'Список', className: 'editor-ul', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ul>\n', closeBlockWith: '\n</ul>' },
            {name: 'Список', className: 'editor-ol', openWith: '    <li>', closeWith: '</li>', multiline: true, openBlockWith: '<ol>\n', closeBlockWith: '\n</ol>' },
            {separator: '---------------' },
            {name: 'Изображение', className: 'editor-picture', beforeInsert: function (h) {
                $('.modal-image-upload').jqm().jqmShow();
            } },
            {name: 'Ссылка', className: 'editor-link',  beforeInsert: function (h) {
                $('.modal-link-upload').jqm({
                    onShow: function(hash){
                        hash.o.prependTo('body'); 
                        hash.w.fadeIn('fast', function() {
                            $('#form-link').focus().select();
                        });

                    }
                }).jqmShow();
            } },
            {name: 'Пользователь', className: 'editor-user', replaceWith: editorAddUser },
            {separator: '---------------' },
            {name: 'Очистить от тегов', className: 'editor-clean', replaceWith: function (markitup) {
                return markitup.selection.replace(/<(.*?)>/g, "")
            } },
            // {name: 'кат', className: 'editor-cut', replaceWith: function (markitup) {
            //     if (markitup.selection) return '<cut name="' + markitup.selection + '">'; else return '<cut>'
            // }}
        ]
    }
};


var editorAddUser = function () {
    findUserModal(function (user_data) {
        var link = '<a href="' + user_data.link + '">' + user_data.full_name + '</a>';
        $.markItUp({replaceWith: link});
    });
};


var getMarkitupBugreports = function () {
    return {
        onShiftEnter: {keepDefault: false, replaceWith: '\n'},
        onCtrlEnter: {keepDefault: false, replaceWith: '\n'},
        onTab: {keepDefault: false, replaceWith: '    '},
        markupSet: [
            {name: 'Жирный', className: 'editor-bold', openWith: '(!(<strong>|!|<b>)!)', closeWith: '(!(</strong>|!|</b>)!)' },
            {name: 'Курсив', className: 'editor-italic', openWith: '(!(<em>|!|<i>)!)', closeWith: '(!(</em>|!|</i>)!)'  },
            {name: 'Зачеркнутый', className: 'editor-stroke', openWith: '<s>', closeWith: '</s>' },
            {name: 'Подчеркнутый', className: 'editor-underline', openWith: '<u>', closeWith: '</u>' },
            {separator: '---------------' },
            {name: 'Цитировать', className: 'editor-quote', openWith: '<blockquote>', closeWith: '</blockquote>'},
            {name: 'Код', className: 'editor-code', beforeInsert: function (h) {
                $('.code-language-list').jqm({
                    onShow: function(hash){
                        hash.w.fadeIn('fast', function() {
                            $('#form-link').focus().select();
                        });
                    }
                }).jqmShow();
            } },
            {name: 'Изображение', className: 'editor-picture', beforeInsert: function (h) {
                $('.modal-image-upload').jqm().jqmShow();
                var action_val = '/attachments/image/upload/bugreports/';
                $('#block_upload_img_content_pc').attr('action', action_val);

            } },
            {name: 'Ссылка', className: 'editor-link', beforeInsert: function (h) {
                $('.modal-link-upload').jqm({
                    onShow: function(hash){
                        hash.o.prependTo('body');
                        hash.w.fadeIn('fast', function() {
                            $('#form-link').focus().select();
                        });

                    }
                }).jqmShow();
            } },
            {separator: '---------------' },
            {name: 'Очистить от тегов', className: 'editor-clean', replaceWith: function (markitup) {
                return markitup.selection.replace(/<(.*?)>/g, "")
            } }

        ]
    }
};


function setCenter(item) {
    windowHeight = $(window).height();
    currentOffset = $(document).scrollTop();
    currentOffset = currentOffset + parseInt((windowHeight - item.outerHeight()) / 2);
    currentOffset = (currentOffset < $(document).scrollTop() + 40) ? $(document).scrollTop() + 40 : currentOffset;
    pLeft = parseInt(($(window).width() - item.outerWidth()) / 2);
    item.css({top: currentOffset - (item.height() - windowHeight / 3) / 5, left: pLeft});
}

function createBlind(popup, isFast) {
    var blind = $('<div class="blind"></div>');
    if (!isFast) {
        blind.css({opacity: 0}).height($(document).height()).appendTo('body').animate({opacity: 0.96}, 200);
    } else {
        blind.height($(document).height()).appendTo('body');
    }

    blind.click(function () {
        popup.find('.close').trigger('click');
        //return false;
    });
}

function showPopup(popup, isFast) {
    popup = $('#' + popup);
    setCenter(popup);
    createBlind(popup, isFast);
    if (!isFast) {
        popup.css({opacity: 0}).show().animate({opacity: 1}, 300);
    } else {
        popup.show();
    }
    popup.find('.close').unbind('click').click(function () {
        closePopup(popup);
        //return false;
    });
    $(document).bind('keydown.popup', function (e) {
        if (e.which == 27) {
            popup.find('.close').trigger('click');
        }
    });
    $('.blind').height($(document).height());
    $(window).bind('resize.popup', function () {
        setCenter(popup);
    })
}

function closePopup(popup) {
    $('.blind').remove();
    popup.hide();
    $(document).unbind('keydown.popup');
    $(window).unbind('resize.popup');
    return false;
}

function findUserModal(callback, specialUrl) {
    var $warningPopup = $(
            '<div id="popup-search-user" class="popup popup-warning"><span class="close" title="Закрыть"></span>' +
            '	<p class="heading">Введите пользователя</p>' +
            '   <form action="" id="form-users-search" onsubmit="return false;" class="search-item search-item-abc">' +
            '       <div class="search-input-wrapper">' +
            '           <input id="search-user-login-popup" type="text" placeholder="Поиск по имени и фамилии" autocomplete="off" name="user_login" value="" class="input-text">' +
            '           <input type="submit" value="" class="input-submit">' +
            '       </div>' +
            '   </form>' +
            '   <tbody>' +
            '   </tbody>' +
            '   <div class="short-people-list people-list">' +
            '       <table class="table table-users">' +
            '           <tbody id="list-body">' +
            '           </tbody>' +
            '       </table>' +
            '   </div>' +
            '</div>');

    $warningPopup.appendTo('body');
    showPopup('popup-search-user');

    $('#search-user-login-popup').on('keyup', function () {
        var input = $(this);
        var url = specialUrl;
        if (typeof url !== 'string' || url.length === 0) {
            url = '/people/search/short/';
        }

        if (input.val().length > 2) {
            var name = input.val();

            $.ajax({
                url: url,
                dataType: "html",
                data: {
                    name: name
                }
            }).success(function (response) {
                $('#list-body').html(response);
                var userProfilePathSelector = $('.user_profile_path');
                userProfilePathSelector.unbind('click');
                userProfilePathSelector.on('click', function (e) {
                    e.preventDefault();
                    var user = {
                        full_name: $(this).data('user-full-name'),
                        id: $(this).data('user-id'),
                        link: $(this).data('user-link'),
                        photo: $(this).data('photo-url')
                    };

                    if (typeof callback == "function") {
                        callback(user);
                    }

                    closePopup($('#popup-search-user'));
                    return false;
                });
            });
        }

    });
};



function ShowNotifications(aNotifications) {
    var bError = false;

    $.each(aNotifications, function (iIndexObject, oMessage) {
        if (oMessage.bStateError) {
            $.msg.error(oMessage.sMsgTitle, oMessage.sMsg);
            bError = true;
        } else {
            $.msg.notice(oMessage.sMsgTitle, oMessage.sMsg);
        }
    });

    return bError;
}

function getCookie(name) {
    var cookieValue = null;
    if (document.cookie && document.cookie != '') {
        var cookies = document.cookie.split(';');
        for (var i = 0; i < cookies.length; i++) {
            var cookie = jQuery.trim(cookies[i]);
            // Does this cookie string begin with the name we want?
            if (cookie.substring(0, name.length + 1) == (name + '=')) {
                cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                break;
            }
        }
    }
    return cookieValue;
}

function toFixed(value, precision, dontround) {
    var result = value.toFixed(precision);

    if (dontround === undefined) {
        while (result[result.length - 1] == '0') {
            result = result.substring(0, result.length - 1);
        }

        if (result[result.length - 1] == '.') {
            result = result.substring(0, result.length - 1);
        }
    }

    return result;
}

$(document).ready(function () {
    $('.attendance-panel_extendable__after').click(function () {
        $('.attendance-panel_extendable').toggleClass('attendance-panel_extendable_extend');
        if ($('.attendance-panel_extendable').hasClass('attendance-panel_extendable_extend')) {
            $('.attendance-panel_extendable .attendance-panel').last().css('margin-bottom', '20px');
        } else {
            $('.attendance-panel_extendable .attendance-panel').last().css('margin-bottom', '0px');
        }
    });

    if (typeof $.fn.markItUp === 'function') {
        initMarkitupUploadFile();

        $('.markitup-editor').each(function () {
            var classList = $(this).attr('class').split(/\s+/);

            if ($.inArray("markitup-editor-topic", classList) != -1) {}
            else {
                $(this).markItUp(getMarkitup());
            }
        });

        $('.bugreport-markitup-editor').markItUp(getMarkitupBugreports());
    }

    var initDatePicker = function () {
        $.datepicker.regional['ru'] = {
            closeText: 'Закрыть',
            prevText: '<Пред',
            nextText: 'След>',
            currentText: 'Сегодня',
            monthNames: ['Январь', 'Февраль', 'Март', 'Апрель', 'Май', 'Июнь',
                'Июль', 'Август', 'Сентябрь', 'Октябрь', 'Ноябрь', 'Декабрь'],
            monthNamesShort: ['Янв', 'Фев', 'Мар', 'Апр', 'Май', 'Июн',
                'Июл', 'Авг', 'Сен', 'Окт', 'Ноя', 'Дек'],
            dayNames: ['воскресенье', 'понедельник', 'вторник', 'среда', 'четверг', 'пятница', 'суббота'],
            dayNamesShort: ['вск', 'пнд', 'втр', 'срд', 'чтв', 'птн', 'сбт'],
            dayNamesMin: ['Вс', 'Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб'],
            weekHeader: 'Не',
            dateFormat: 'yy-mm-dd',
            firstDay: 1,
            isRTL: false,
            showMonthAfterYear: false,
            yearSuffix: ''
        };
        $.datepicker.setDefaults($.datepicker.regional['ru']);
    };

    var initTimePicker = function () {
        $.timepicker.regional['ru'] = {
            timeOnlyTitle: 'Выберите время',
            timeText: 'Время',
            hourText: 'Часы',
            minuteText: 'Минуты',
            secondText: 'Секунды',
            millisecText: 'Миллисекунды',
            timezoneText: 'Часовой пояс',
            currentText: 'Сейчас',
            closeText: 'Закрыть',
            timeFormat: 'HH:mm',
            amNames: ['AM', 'A'],
            pmNames: ['PM', 'P'],
            isRTL: false
        };
        $.timepicker.setDefaults($.timepicker.regional['ru']);
    };

    var initDateTimePicker = function () {
        $('.add-date-time-picker').datetimepicker({
            dateFormat: "yy-mm-dd",
            timeFormat: "HH:mm",
            controlType: 'select',
            stepMinute: 5
        });

        $('.add-date-picker').datepicker({});
    };

    var initChosen = function () {
        $(".chosen-select").chosen({no_results_text: "Не выбрано"});
    };

    $('code').each(function(i, block) {
        hljs.highlightBlock(block);
    });

    $('code.hljs').each(function(i, block) {
        hljs.lineNumbersBlock(block);
    });

    initDatePicker();
    initTimePicker();
    initDateTimePicker();
    initChosen();
});
