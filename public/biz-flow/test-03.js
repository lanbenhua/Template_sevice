"use strict";

function pageSubmit(){
    return {
        costType: $('input[name=costType]').val(),
        beginDate: $('input[name=beginDate]').val(),
        payAmount: $('input[name=payAmount]').val(),
        payDescription: $('textarea[name=payDescription]').val(),
        attachments: [],
    }
}

$(document).on("pageInit", function(e, pageId, $page) {
    console.log('pageInit handler running!');
    $(".data-picker").picker({
      toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-left close-picker">取消</button>\
      <button class="button button-link pull-right close-picker">确定</button>\
      <h1 class="title">报销类型</h1>\
      </header>',
      // container: '[data-action="data-picker"]',
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
  
});