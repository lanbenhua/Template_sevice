"use strict";

var JSONDATA = {
    payType: "",
    payReason: "",
    payItems: [{
        costType: "",
        beginDate: "",
        payAmount: null,
        payDescription: ""
    }],
    attachments: [],
    payee: "",
    payeeBank: "",
    payeeAccount: "",
    saveAsDefault: false,
    isVAT: false,
    hasTaxpayerNo: false,
    taxpayerNo: null
};
var _JSONDATA = {
    payType: $('input[name=payType]').val(),
    payReason: $('textarea[name=payReason]').val(),
    payItems:[{
        costType: $('input[name=costType]').val(),
        beginDate: $('input[name=beginDate]').val(),
        payAmount: $('input[name=payAmount]').val(),
        payDescription: $('textarea[name=payDescription]').val(),
    }],
    attachments: [],
    payee: $('input[name=payee]').val(),
    payeeBank: $('input[name=payeeBank]').val(),
    payeeAccount: $('input[name=payeeAccount]').val(),
    saveAsDefault: $('input[name=saveAsDefault]:checked').length > 0,

    isVAT: $('input[name=isVAT]:checked').length > 0,
    hasTaxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0,
    taxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0 ? $('input[name=taxpayerNo]').val() : null
};
var PAYITEM = {
    costType: "",
    beginDate: "",
    payAmount: null,
    payDescription: ""
}

function pageSubmit(){
    return {
        payType: $('input[name=payType]').val(),
        payReason: $('textarea[name=payReason]').val(),

        payItems:[{
            costType: $('input[name=costType]').val(),
            beginDate: $('input[name=beginDate]').val(),
            payAmount: $('input[name=payAmount]').val(),
            payDescription: $('textarea[name=payDescription]').val(),
        }],

        attachments: [],

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
    $(".data-picker").picker({
      toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-right close-picker">确定</button>\
      <h1 class="title">报销类型</h1>\
      </header>',
      cols: [
        {
          textAlign: 'center',
          values: ['iPhone 4', 'iPhone 4S', 'iPhone 5', 'iPhone 5S', 'iPhone 6', 'iPhone 6 Plus', 'iPad 2', 'iPad Retina', 'iPad Air', 'iPad mini', 'iPad mini 2', 'iPad mini 3']
        }
      ]
    });
    console.log($.picker);
    $(".date-picker").datetimePicker({
        // value: ['1985', '12', '04', '9', '34'],
        maxDate: new Date()
    });
    // $(".date-picker").calendar({
    //     maxDate: new Date()
    // });
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
    var gItemsIdx = 0; // 初始化表单明细的index
    $('#add-button').on('click',function(){
        gItemsIdx ++;
        var tplItems = $('#tpl_deatil').html();
        $('#detailList').append(tplItems);
        JSONDATA.payItems.push(PAYITEM); // update json data
        // bind delete event
        $('delete-button').on('click',function(){
            var index = $(this).parents('.ud-list-block-item').index();
        })
     })
});