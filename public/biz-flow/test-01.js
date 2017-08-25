"use strict";

function pageSubmit(){
    return {
        payee: $('input[name=payee]').val(),
        payeeBank: $('input[name=payeeBank]').val(),
        payeeAccount: $('input[name=payeeAccount]').val(),
        saveAsDefault: $('input[name=saveAsDefault]:checked').length > 0,
        isVAT: $('input[name=isVAT]:checked').length > 0,
        hasTaxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0,
        taxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0 ? $('input[name=taxpayerNo]').val() : null
    }
}

$(document).on("pageInit", function(e, pageId, $page) {
    console.log('pageInit handler running!');
    $('#hasTaxpayerNo-checkbox').on('click',function(){
        if($('input[name=hasTaxpayerNo]:checked').length == 0){
            //显示纳税人识别号输入区
            $('#taxpayerNo-input').show();
        }
        else {
            //隐藏纳税人识别号输入区
            $('#taxpayerNo-input').hide();
        }
    });
});