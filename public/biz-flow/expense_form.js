(function($){

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
    var PAYITEM = {
        costType: "",
        beginDate: "",
        payAmount: null,
        payDescription: ""
    };
    // 表单提交组装值 json
    window.pageSubmit = function(){
        var $payItem = $('.ud-list-block-item'),
            payItem = [],
            attachments = [];
        $payItem.each(function(index,item){
            payItem.push({
                costType: $(item).find('input[name=costType]').val(),
                beginDate: $(item).find('input[name=beginDate]').val(),
                payAmount: $(item).find('input[name=payAmount]').val(),
                payDescription: $(item).find('textarea[name=payDescription]').val(),
            });
        })
        var $imgs = $('#upload-content .upload-item').find('.upload-img');
        $.each($imgs, function(index, item){
            attachments.push($(item).attr('src'));
        })

        window.gimgs = attachments;

        return {
            payType: $('input[name=payType]').val(),
            payReason: $('textarea[name=payReason]').val(),
            payItems:payItem,
            attachments: attachments,
            payee: $('input[name=payee]').val(),
            payeeBank: $('input[name=payeeBank]').val(),
            payeeAccount: $('input[name=payeeAccount]').val(),
            saveAsDefault: $('input[name=saveAsDefault]:checked').length > 0,
            isVAT: $('input[name=isVAT]:checked').length > 0,
            hasTaxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0,
            taxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0 ? $('input[name=taxpayerNo]').val() : null
        }
    };

    var suptypeData = [],  // 保存报销类型 包含id title
        suptypeData_options = [], // 保存报销类型picker的数据
        subtypeData = [],  // // 保存费用类型 包含id title
        subtypeData_options = []; // 保存费用类型picker的数据
    /**
        @variable typeData 基于tpl-data服务从bot端传来的数据
    */
    // 获取报销类型数据
    var getSuptypeData = function(){   
        if(typeData){
            $.each(typeData, function(key, value){
                var data = {
                    id: key,
                    title: value.title || '无'
                }
                suptypeData.push(data);
                suptypeData_options.push(value.title || '无');
            })
            console.log(JSON.stringify(suptypeData_options))
        }
    };
    // @param id  // 获取费用类型数据
    var getSubtypeData = function(suptype){ 
        if(typeof suptype === 'undefined') return subtypeData_options.push('无');
        if(typeData){
            var cur_subtype = typeData[suptype].subtype;
            subtypeData = []; 
            subtypeData_options = [];
            if(cur_subtype){
                $.each(cur_subtype, function(key, value){
                    var data = {
                        id: key,
                        title: value.title || '无'
                    }
                    subtypeData.push(data);
                    subtypeData_options.push(value.title || '无');
                })
            }
            else{
                subtypeData.push({});
                subtypeData_options.push('无');
            }
            console.log(JSON.stringify(subtypeData_options))
        }
    };

    
    //  图片预览
    var photoBrowser = function(){
        $(document).on('click','.upload-img',function(){
            var imgs = [],  // 保存图片
                index = $(this).parents('.upload-item').index() || 0,  // 用户点击的图拍index
                $imgs = $('#upload-content .upload-item').find('.upload-img'); // 所有图片元素
            $.each($imgs, function(index, item){
                imgs.push($(item).attr('src'));
            })
            console.log(index);
            console.log(JSON.stringify(imgs));
            /*=== Popup ===*/
            var myPhotoBrowserPopup = $.photoBrowser({
                photos : imgs,
                initialSlide: index,
                type: 'popup',
                // backLinkText: 'Back',
                theme: 'dark',
                toolbar: false,
                navbar: false,
            });
            myPhotoBrowserPopup.open();
        });
    };

    var gimgs = [],  // 保存原图
        gthumbnails = [];  // 保存缩略图

    // 上传图片H5端回调
    window.cameraCallback = function(data){
        console.log(data, typeof data);
        // 假设data为string类型的url
        if(data === "" || data === null){ // no data
            alert('cameraback no data');
        }else{
            var tpl = $('#upload_item').html().replace(/{:src}/ig,data);
            gimgs.push(data);
            $('#upload-content').append(tpl);
            //photoBrowser();  // 图片预览
            $(document).on('click','#upload-content .upload-delete',function(){
                // bind delete img
                $(this).parents('.upload-item').remove();

            });
        }
    };

    $(document).on("pageInit", function(e, pageId, $page){
            console.log('pageInit handler running!');

        
            getSuptypeData();  // 初始化报销类型数据
            getSubtypeData(); // 初始化费用类型类型数据 默认无
            $.cxValidation.attach($('#expense_form')); // 绑定表单验证

            var sup_picker = $("#sup_picker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">报销类型</h1>\
                    </header>',
                cols: [{
                    textAlign: 'center',
                    values:  suptypeData_options, 
                    onChange: function(p, value, displayValue){
                        $.each(suptypeData,function(index,item){  //  update subtype data
                            if(item.title === value) getSubtypeData(item.id); 
                        })

                        //$('#data-picker-new').picker('replaceValues',subtypeData_options);  // update subtype picker data
                    }
                }]
            });

            $(".data-picker").picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">费用类型</h1>\
                    </header>',
                cols: [{
                    textAlign: 'center',
                    values: ['']
                }],
                onOpen: function (picker) {
                    picker.cols[0].replaceValues(subtypeData_options);
                }
            });

            // picker
            $(document).on('click','.picker',function(e){
                $(this).find('.data-picker').picker("open");
            })        

            // datetime picker
            $(".date-picker").datetimePicker({
                // value: ['1985', '12', '04', '9', '34'],
                maxDate: new Date()
            });
            // $(".date-picker").calendar({
            //     maxDate: new Date()
            // });

            // 纳税人识别号切换
            $(document).on('click','#hasTaxpayerNo-checkbox',function(){
                if($('input[name=hasTaxpayerNo]:checked').length == 0){
                    //显示纳税人识别号输入区
                    $('#taxpayerNo-input').show();
                }
                else {
                    //隐藏纳税人识别号输入区
                    $('#taxpayerNo-input').hide();
                }
            });

            // 初始化删除明细表单组 from tplserver缓存
            // if($('#detailList .delete-button').length > 0){
                $(document).on('click','#detailList .delete-button',function(){
                    var index = $(this).parents('.ud-list-block-item').index();
                    $(this).parents('.ud-list-block-item').remove();
                });
            // }
        
    });

    $(document).on("pageInit", function(e, pageId, $page) {
        // 调起相机
        $(document).on('click','#upload-img',function (){
            openCamera();
            cameraCallback('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg')
        });
        // 删除图片
        // if($('#upload-content .upload-delete').length > 0) {
            $(document).on('click','.upload-delete',function(){
                // bind delete img
                $(this).parents('.upload-item').remove();
            });     
        // }
        // 图片预览
        // if($('#upload-content .upload-img').length > 0) {
            photoBrowser();  // 图片预览   
        // }
        
    });
    // 增加表单明细
    $(document).on("pageInit", function(e, pageId, $page) {
        //var gItemsIdx = 0; // 初始化表单明细的index
        $(document).on('click','#add-button',function (){
           // gItemsIdx ++;
            var tplItems = $('#tpl_deatil').html();
            $('#add-button').before(tplItems);
            //JSONDATA.payItems.push(PAYITEM); // update json data
            // bind form event
            // picker.init();
            $(document).on('click','.picker',function(e){
                $(this).find('.data-picker').picker("open");
            }) 

            $(".date-picker").datetimePicker({
                // value: ['1985', '12', '04', '9', '34'],
                maxDate: new Date()
            });
            // $(".date-picker").calendar({
            //     maxDate: new Date()
            // });

            // bind delete event
            $(document).on('click','.delete-button',function(){
                var index = $(this).parents('.ud-list-block-item').index();
                $(this).parents('.ud-list-block-item').remove();
            });
         })
    });

})($)