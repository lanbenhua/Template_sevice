(function($){

	"use strict";

	// 表单提交组装值 json
    window.pageSubmit = function(){
        return {
            content: {
                opinion: $('textarea[name=opinion]').val(),
            },
            approvers: getApproversItems(),
        }
    };

    var getApproversItems = function(){
        var $items = $('#reassign').find('.approve-item'), items = [];
        $items.each(function(index,item){   
            var userId = $(item).find('.approve-avatar').attr('data-uid'),
                avatar = $(item).find('.approve-img').attr('src'),
                displayName = $(item).find('.approve-text').text();
            items.push({
                userId: userId,
                avatar: avatar,
                displayName: displayName
            })
        })
        return items;
    };

    $(document).on("pageInit", function(e, pageId, $page) {
        //  add approver
        var data = [{"userId":"@alice:finogeeks.club","avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg", "displayName": "而感慨"},{"userId":"@alice:finogeeks.club","avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg", "displayName": "ERGE"}] 
        
        $(document).on('click', '.approve-add-button', function(){
            var _this = $(this);
            $.each(data, function(index, approver){
                var tplItems = $('#templates_approver_item').find('.approve-item').clone();
                tplItems.find('.approve-avatar').attr('data-uid',approver.userId);
                tplItems.find('.approve-img').attr('src',approver.avatar);
                tplItems.find('.approve-text').text(approver.displayName);
                _this.parents('.approve-add').before(tplItems);
            })
        });

        // delete approver
        $(document).on('click', '.approve-delete', function(){
            var item1 = $(this).parents('.approve-item'),
                item2 = $(this).parents('.approve-item').next('.approve-process');
            item1.remove();
            item2.remove();
        });

        initLastArron();
        function initLastArron(){
            if(!approve_admin){
                $('.approve-content').find('.approve-item').last().find('.approve-process').hide();
            }
        }
    })

})($)