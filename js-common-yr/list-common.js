
$(function () {
    if ($('.sorter').length > 0) {
        var $SeqItem = $("#SeqItem");
        var $SeqValue = $("#SeqValue");
        if ($SeqValue.val().toLowerCase() == "true") {
            $("a[name='" + $SeqItem.val() + "']").find("i").removeClass().addClass("icon-caret-down");
        } else {
            $("a[name='" + $SeqItem.val() + "']").find("i").removeClass().addClass("icon-caret-up");
        }
        $("#container").delegate(".sorter", "click", function () {
            var $SeqItem = $("#SeqItem");
            var $SeqValue = $("#SeqValue");
            var name = $(this).attr("name");
            if ($SeqItem.val() == name) {
                if ($SeqValue.val().toLowerCase() == "true") {
                    $SeqValue.val(false);
                } else {
                    $SeqValue.val(true);
                }
            } else {
                $SeqItem.val(name);
                $SeqValue.val(true);
            }
            Search();
        });
    }

});


function Search() {
    var postUrl = $("#form").attr("action");
    var postData = $("#form").serialize();

    $.ajaxSubmit({
        url: postUrl,
        data: postData,
        showMask: false,
        callback: {
            success: function (msg) {
                $("div.tooltip").remove();
                $("#container").html(msg);
                /*tooltip调用*/
                $('[data-toggle=tooltip]').tooltip();
                if ($('.sorter').length > 0) {
                    var $SeqItem = $("#SeqItem");
                    var $SeqValue = $("#SeqValue");
                    if ($SeqValue.val().toLowerCase() == "true") {
                        $("a[name='" + $SeqItem.val() + "']").find("i").removeClass().addClass("icon-caret-down");
                    } else {
                        $("a[name='" + $SeqItem.val() + "']").find("i").removeClass().addClass("icon-caret-up");
                    }
                }
                if ($("#container").attr('reBinder')) {
                    tableBinder();
                }
            },
            error: function () {
                showStatusTip("failed", "网络错误，请稍候重试。", 1500);
            }
        }
    });
}


function RedirectTo(url) {
    var returnUrl = window.location.href;
    if (returnUrl.indexOf("returnUrl=") != -1) {
        returnUrl = returnUrl.split('returnUrl=')[1];
    }
    if (returnUrl.indexOf('?') == -1) {
        returnUrl += "?rnd=" + Math.random();
    } else {
        if (returnUrl.indexOf('&rnd=') == -1) {
            returnUrl += '&rnd=' + Math.random();
        } else {
            returnUrl =returnUrl.split('&rnd=')[0]+ '&rnd=' + Math.random();
        }
    }
    if (url.indexOf('?') == -1) {
        url += "?returnUrl=" + returnUrl;
    } else {
        url += "&returnUrl=" + returnUrl;
    }

    window.location = url
}

function RedirectToList(url) {
    var returnUrl = window.location.href;
    if ($('#returnUrl') != undefined && $('#returnUrl') != '' && $('#returnUrl').val() != '' && $('#returnUrl').val() != undefined) {
        returnUrl = $('#returnUrl').val();
        window.location = returnUrl;
    } else {
        if (returnUrl.indexOf("returnUrl=") != -1) {
            window.location = returnUrl.split('returnUrl=')[1];
        } else {
            window.location = url;
        }
    }

}

//改变状态、删除操作ajax提交
//statusId：状态值；text：状态描述；urlAction：处理url；tips：处理的目标名称；ids:要处理的对象的id
function CommonUpdateStatus(statusId, text, urlAction, tips, ids) {
    if (ids == '' || ids == undefined) {
        ids = '';
        $(".checkItem").each(function () {
            if ($(this).attr("checked")) {

                if (ids == '') {
                    ids = $(this).val();
                } else {
                    ids += "," + $(this).val();
                }
            }
        });
    }
    if (ids == '') {
        showStatusTip("failed", '请选择要操作的项', 1500);
    } else {

        $.confirm("确认【" + text + "】选中的" + tips + "？", {
            ok: function () {
                $.ajaxSubmit({
                    showMask: false,
                    url: urlAction,
                    data: 'status=' + escape(statusId) + '&ids=' + escape(ids),
                    callback: {
                        success: function (returnStatus) {
                            showStatusTip("success", '【' + text + '】成功！', 1500);
                            Search();
                        }
                    }
                })
            }
        });
    }
}
