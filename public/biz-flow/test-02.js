"use strict";

function pageSubmit(){
    return {
        payType: $('input[name=payType]').val(),
        payReason: $('textarea[name=payReason]').val(),
    }
}

$(document).on("pageInit", function(e, pageId, $page) {
    console.log('pageInit handler running!');
    $("#picker").picker({
      toolbarTemplate: '<header class="bar bar-nav">\
      <button class="button button-link pull-left close-picker">取消</button>\
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
});