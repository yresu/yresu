/*密码输入*/
(function ($) {
    $.fn.extend({
        initPassword: function () {
                var $pwd = $(this);
                var id = $pwd.attr('id');
                $pwd.after('<input id="' + id + 'Text" type="text" style="display:none;" value="' + $pwd.val() + '" class="' + $pwd.attr('class') + '" data_rules="' + $pwd.attr('data_rules') + '" placeholder="' + $pwd.attr('placeholder') + '" />');
                $pwdText = $('#' + id + 'Text');
                $pwd.focus(function () {
                    $pwd.blur().hide();
                    $pwdText.show().focus();
                });
                $pwdText.blur(function () {
                    $pwdText.hide();
                    $pwd.blur().show();
                });
                $pwdText.change(function () {
                    $pwd.val($pwdText.val());
                });
         
        }
    });
})(jQuery);



