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
    var $payItem = $('.ud-list-block-item'),
        payItem = [];
    $payItem.each(function(index,item){
        payItem.push({
            costType: $(item).find('input[name=costType]').val(),
            beginDate: $(item).find('input[name=beginDate]').val(),
            payAmount: $(item).find('input[name=payAmount]').val(),
            payDescription: $(item).find('textarea[name=payDescription]').val(),
        });
    })
    return {
        payType: $('input[name=payType]').val(),
        payReason: $('textarea[name=payReason]').val(),
        payItems:payItem,
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

    init();
    function init(){
        $.cxValidation.attach($('#expense_form')); // 绑定
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

        if($('.delete-button').length > 0){
            $('.delete-button').on('click',function(){
                var index = $(this).parents('.ud-list-block-item').index();
                $(this).parents('.ud-list-block-item').remove();
            });
        }
    }
    /**
     * 获取数据
     *
     * @param  {Object} json 
     *  
     * @return {Promise}  Promise
     */
    var getData = function (json) {
        var defer = $.Deferred(),
        // 这里可以合并一些默认的公用参数，可以使用data来进行覆盖
            data = $.extend({
                // 默认参数
            }, json.data || {}),
            successStatus = json.successStatus || '200';
        $.ajax({
            url: json.url,
            type: json.type || 'GET',
            data: data,
            dataType: json.dataType || 'json',
            headers: json.headers || {},
            timeout: json.timeout || 4000,
            success: function (res) {
                if (res.status === successStatus) {
                    defer.resolve(res);
                }
                else {
                    defer.reject();  // 报错给promise
                }
            },
            error: defer.reject
        });
        return defer.promise();
    };

});

$(document).on("pageInit", function(e, pageId, $page) {
    var gItemsIdx = 0; // 初始化表单明细的index
    $('#add-button').on('click',function(){
        gItemsIdx ++;
        var tplItems = $('#tpl_deatil').html();
        $('#add-button').before(tplItems);
        JSONDATA.payItems.push(PAYITEM); // update json data
        // bind form event
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

        $(".date-picker").datetimePicker({
            // value: ['1985', '12', '04', '9', '34'],
            maxDate: new Date()
        });
        // $(".date-picker").calendar({
        //     maxDate: new Date()
        // });
        // bind delete event
        $('.delete-button').on('click',function(){
            var index = $(this).parents('.ud-list-block-item').index();
            $(this).parents('.ud-list-block-item').remove();
        });
     })
});