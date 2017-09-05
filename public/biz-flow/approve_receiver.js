
// 报销单 test request
// curl -XPOST 'localhost:3000/tpl-data' -H 'Content-Type: application/json' -d '{"uid":"rywefew43t5384ewhviu","type":"EXPENSE","title": "收款人信息","validate_plugins": true,"approve_admin":true,"data": {"type_options": {"SNJTF": {"title": "市内交通费"}, "YCF": {"title": "应酬费", "subtype": {"YWZDF": {"title": "业务招待费"}, "LP": {"title": "礼品"}, "OTH": {"title": "其他"} } }, "BGF": {"title": "办公费", "subtype": {"BGWJ": {"title": "办公文具"}, "BGJS": {"title": "办公家私"}, "KDF": {"title": "快递费"}, "ZPF": {"title": "招聘费"}, "BZF": {"title": "办证费"}, "WY": {"title": "文印"}, "WX": {"title": "维修"}, "BKTS": {"title": "报刊图书"}, "WSBJ": {"title": "卫生保洁"}, "ZZNJZC": {"title": "证照年检注册"} } }, "TXF": {"title": "通讯费", "subtype": {"GDHF": {"title": "固定话费"}, "YDHF": {"title": "移动话费"}, "KDFY": {"title": "宽带费用"} } }, "CLF": {"title": "差旅费", "subtype": {"JP": {"title": "机票"}, "HCP": {"title": "火车票"}, "CTCF": {"title": "长途车费"}, "SNJTF": {"title": "市内交通费"}, "ZSF": {"title": "住宿费"}, "CCCF": {"title": "出差餐费"}, "OTH": {"title": "其他费用"} } }, "QCFY": {"title": "汽车费用", "subtype": {"JYF": {"title": "加油费"}, "LQF": {"title": "路桥费"}, "TCF": {"title": "停车费"}, "WXF": {"title": "维修费"}, "BXF": {"title": "保险费"}, "OTH": {"title": "其他费用"} } }, "ZLF": {"title": "租赁费", "subtype": {"ZJ": {"title": "租金"}, "WYGLF": {"title": "物业管理费"}, "SDF": {"title": "水电费"} } }, "GLZXF": {"title": "管理咨询费", "subtype": {"SJF": {"title": "审计费"}, "PGF": {"title": "评估费"}, "LSF": {"title": "律师费"}, "PJF": {"title": "评级费"}, "FWF": {"title": "服务费"}, "OTH": {"title": "其他"} } }, "HYF": {"title": "会议费", "subtype": {"CDF": {"title": "场地费"}, "CF": {"title": "餐费"}, "ZSF": {"title": "住宿费"}, "OTH": {"title": "其他"} } }, "BXF": {"title": "保险费", "subtype": {"CCBXF": {"title": "财产保险费"}, "RSBXF": {"title": "人身保险费"} } }, "GGXCF": {"title": "广告宣传费"}, "DZYHP": {"title": "低值易耗品"}, "WXF": {"title": "维修费"}, "SBZCF": {"title": "商标注册费"}, "ZFGF": {"title": "政府规费"}, "LBF": {"title": "劳保费"}, "OTH": {"title": "其他"} },"approvers":[{"userId":"@alice:finogeeks.club","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg","displayName":"张国荣"},{"userId":"@alice:finogeeks.club","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg","displayName":"刘德华"}],"copysenders":[{"userId":"@alice:finogeeks.club","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg","displayName":"张国荣"},{"userId":"@alice:finogeeks.club","avatar":"https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg","displayName":"刘德华"}]}}'

// 审批 test request
// curl -XPOST 'localhost:3000/tpl-data' -H 'Content-Type: application/json' -d '{"uid": "test_id_01","data": {"title": "收款人信息","toolbar":"approve_sponsor_toolbar","expId": "5690034C-F361-475D-AB45-057DB13CAF02", "sponsor": {"userId": "@peter:finogeeks.club", "displayName": "彼得", "avatar": "http:\/\/xxx.com/p1.png"}, "state": "审批中", "exptype": "差旅费", "reason": "出差", "amount": 500.00, "items": [{"costtype": "住宿费", "beginDate": "2017-07-10", "endDate": "2017-07-10", "amount": 500.00, "description": "北京出差", "attachments": ["http://xxx.com/p1.png", "http://xxx.com/p2.pdf"] },{"costtype": "住宿费", "beginDate": "2017-07-10", "endDate": "2017-07-10", "amount": 500.00, "description": "北京出差", "attachments": ["http://xxx.com/p1.png", "http://xxx.com/p2.pdf"] }], "payee": {"receiver": "XX公司", "bankName": "招商银行", "bankAccount": "6212 xxxx xxxx xxxx xx", "isVAT": true, "taxpayerId": "F1230321"}, "approvers": [{"userId": "@alice:finogeeks.club", "displayName": "爱丽丝", "avatar": "http://xxx.com/p1.png", "state": "审批中", "opinion": "同意", "attachments": ["http://xxx.com/p1.png", "http://xxx.com/p2.pdf"], "createTime": "2017-07-17 04:20:14.916Z", "updateTime": "2017-07-17 04:20:14.916Z"}, {"userId": "@alice:finogeeks.club", "displayName": "爱丽丝", "avatar": "http://xxx.com/p1.png", "state": "审批中", "opinion": "同意", "attachments": ["http://xxx.com/p1.png", "http://xxx.com/p2.pdf"], "createTime": "2017-07-17 04:20:14.916Z", "updateTime": "2017-07-17 04:20:14.916Z"} ], "createTime": "2017-07-17 04:20:14.916Z", "updateTime": "2017-07-17 04:20:14.916Z"}}'

var a = {	
	"ticketId": "59acec05a239a10da489a2ae",
	"state": "ACCEPT",
	"userId": "@linhaitao:finogeeks.club",
    "displayName": "林海涛",
    "avatar": "https://api.finogeeks.club/api/v1/rcs/profile/@linhaitao:finogeeks.club/avatar",
    "type": "EXPENSE",
    "approvers": [
        {
            "userId": "@liyuntao:finogeeks.club",
            "parentId": "",
            "avatar": "https://api.finogeeks.club/api/v1/rcs/profile/@liyuntao:finogeeks.club/avatar",
            "state": "ACCEPT",
            "attachments": [],
            "displayName": "李云涛"
        },
        {
            "userId": "@tanchengxin:finogeeks.club",
            "parentId": "@liyuntao:finogeeks.club",
            "avatar": "https://api.finogeeks.club/api/v1/rcs/profile/@tanchengxin:finogeeks.club/avatar",
            "state": "ACCEPT",
            "attachments": [],
            "displayName": "谭成鑫"
        }
    ],
    "content": {
        "taxpayerId": "F1230321",
        "isVAT": true,
        "bankAccount": "6212 xxxx xxxx xxxx xx",
        "bankName": "招商银行",
        "receiver": "XX公司"
    }
}

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