(function($){

	"use strict";


	// 审批单的状态
	var STATE = {
		PENDING:  'PENDING', // 审批中
		ACCEPT:   'ACCEPT',	// 同意
		REJECT:   'REJECT', // 驳回
		REASSIGN: 'REASSIGN', // 转审
		CANCEL: 'CANCEL', // 撤销
		REMIND: 'REMIND', // 催办
		RECOMMIT: 'RECOMMIT', // 重新提交
	};

	var access_state = {
		PENDING:  {
			state: 'PENDING',
		},
		ACCEPT: {
			state: 'ACCEPT', 
		},
		REJECT:  {
			state: 'REJECT', 
		},
		REASSIGN: {
			state: 'REASSIGN', 
		},
		CANCEL: {
			state: 'CANCEL', 
			confirm: '确定要撤销该审批单？',
		},
		REMIND: {
			state: 'REMIND', 
		},
		RECOMMIT: {
			state: 'RECOMMIT', 
			confirm: '重新提交后，当前审批单将自动撤销，确定继续？'
		},
	}
	var submit_json = {};
	// 图片预览
    var image_viewer = {
    	parent: '.list-image',
    	ele: '.list-image .item-image img',
    	index: 0,  // 用户点击的图片 index
    	photos: [],  // 所有图片元素
    	viewer: function(){
    		var t = this,
    			defaults = {
    				type: 'popup',
	                // backLinkText: '返回',
	                theme: 'dark',
	                toolbar: false,
	                navbar: false,
    			}, options = {
    				photos : t.photos,
                	initialSlide: t.index,
    			};
    		options = $.extend(defaults, options) 
    		var myPhotoBrowserPopup = $.photoBrowser(options);
            myPhotoBrowserPopup.open();
    	},
    	init: function(){
    		var t = this;
    		$(document).on('click', t.ele, function(){
				t.index = $(this).parents(t.parent).index();  
                t.photos = $(this).parents(t.parent).find(t.ele); 
                t.viewer();
    		})
    	}
    }
    image_viewer.init();

    var tab_access = {
    	ele: '.bar-tab .tab-item',
    	init: function(){
    		var t= this;
    		$(document).on('click', t.ele, function(){
    			var access = $(this).attr('data-access');
    			submit_json.access = access;
		    	switch(access){
		    		case 'REASSIGN':
		    			window.location.href="#";
		    		break;
		    		case 'CANCEL':
		    			$.confirm(access_state.CANCEL.confirm, function(){
		    				appFormSubmit(submit_json); // 提交json
		    			});
		    		break;
		    		case 'RECOMMIT':
		    			$.confirm(access_state.RECOMMIT.confirm, function(){
		    				appFormSubmit(submit_json); // 提交json
		    			})
		    		break;
		    		default: 
		    			appFormSubmit(submit_json); // 提交json
		    		break;
		    	}
    		})
    	}
    }
	tab_access.init();

})($)