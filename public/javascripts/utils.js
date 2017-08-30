/**
 * 获取数据
 * 基于 $.callbacks  $.Deferred
 * @param  {Object} json 
 * @return {Promise}  Promise
 */
var getData = function(json) {
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