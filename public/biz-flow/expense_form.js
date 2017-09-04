(function($){

    "use strict";

    var cameraIndex = 0,  // 保存当前调起相机的index
        gimgs = [],  // 保存原图
        gthumbnails = [],  // 保存缩略图
        suptypeData = [],  // 保存报销类型 包含id title
        suptypeData_options = [], // 保存报销类型picker的数据
        subtypeData = [],  // // 保存费用类型 包含id title
        subtypeData_options = [], // 保存费用类型picker的数据
        max_upload_count = 8,  // 每个明细最多上传个数
        isFirstClick = true;  // 上传初次点击弹出alert提示

    window.gAttachments = [];  // 保存上传照片的数组 (二维数组) 
    // 表单提交组装值 json
    window.pageSubmit = function(){
        var $items = $('.ud-list-block-item'),
            items = [];

        $items.each(function(index,item){
            var $imgs = $(item).find('.upload-content .upload-item .upload-img'),
                attachments = [];
            $.each($imgs, function(i, img){
                attachments.push($(img).attr('src'));
            });
            window.gAttachments.push(attachments);
            items.push({
                costtype: $(item).find('input[name=costType]').val(),
                beginDate: $(item).find('input[name=beginDate]').val(),
                amount: $(item).find('input[name=payAmount]').val(),
                description: $(item).find('textarea[name=payDescription]').val(),
                attachments: attachments
            });
        })

        return {
            content: {
                exptype: $('input[name=payType]').val(),
                reason: $('textarea[name=payReason]').val(),
                items:items,
                payee: {
                    receiver: $('input[name=payee]').val(),
                    bankName: $('input[name=payeeBank]').val(),
                    bankAccount: $('input[name=payeeAccount]').val(),
                    saveAsDefault: $('input[name=saveAsDefault]:checked').length > 0,
                    isVAT: $('input[name=isVAT]:checked').length > 0,
                    hasTaxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0,
                    taxpayerNo: $('input[name=hasTaxpayerNo]:checked').length > 0 ? $('input[name=taxpayerNo]').val() : null
                }
            },
            approvers: [
                {}
            ]
        }
    };

    /**
        @variable typeData 基于tpl-data服务从bot端传来的数据
    */
    // 获取报销类型数据
    var getSuptypeData = function(){   
        if(typeData){
            $.each(typeData, function(key, value){
                var data = {
                    id: key,
                    title: value.title
                }
                suptypeData.push(data);
                suptypeData_options.push(value.title);
            })
            console.log(JSON.stringify(suptypeData_options))
        }else{
            $('.sup_picker').hide();
            $('.picker').hide();
        }
    };
    // 根据报销数据的title获取报销类型的ID
    var getSuptypeId = function(title){
        var i=0, l=suptypeData.length, suptype;
        for( ; i<l; i++){
            if(suptypeData[i].title === title){
                suptype = suptypeData[i].id;
                break;
            }
        }
        return suptype;
    }
    // @param id  // 获取费用类型数据
    var getSubtypeData = function(suptype){ 
        if(typeData){
            var cur_subtype = typeData[suptype].subtype;
            subtypeData = []; 
            subtypeData_options = [];
            if(cur_subtype){
                $.each(cur_subtype, function(key, value){
                    var data = {
                        id: key,
                        title: value.title
                    }
                    subtypeData.push(data);
                    subtypeData_options.push(value.title);
                })
            }
            else{ // no subtype data
                $('.picker').hide(); // 
                $('.picker').find('.data-picker').attr('data-validation','');// not required
                $('.picker').find('.data-picker').val(''); // 清空值
                // subtypeData.push({});
                // subtypeData_options.push('无');
            }
            console.log(JSON.stringify(subtypeData_options))
        }
    };

    //  图片预览
    var photoBrowser = function(){
        $(document).on('click','.upload-content .upload-img',function(){
            var imgs = [],  // 保存图片
                index = $(this).parents('.upload-item').index() || 0,  // 用户点击的图拍index
                $imgs = $(this).parents('.upload-content').find('.upload-item .upload-img'); // 所有图片元素
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
                // backLinkText: '返回',
                theme: 'dark',
                toolbar: false,
                navbar: false,
            });
            myPhotoBrowserPopup.open();
        });
    };

    // 上传图片H5端回调
    window.cameraCallback = function(data){
        console.log(data, typeof data);
        // 假设data为string类型的url
        if(data === "" || data === null){ // no data
            $.alert('cameraback no data');
        }else{
            console.log('cameraIndex',cameraIndex);
            var tpl = $('#templates_expense_upload_item .upload-item').clone();
            tpl.find('.upload-img').attr('src',data);
            $('#detailList .upload-content').eq(cameraIndex).append(tpl);
        }
    };

    $(document).on("pageInit", function(e, pageId, $page){
        console.log('pageInit handler running!');

        getSuptypeData();  // 初始化报销类型数据
        getSubtypeData(getSuptypeId(lastSubmit_exptype) || suptypeData[0].id); // 初始化费用类型类型数据 默认无
        $.cxValidation.attach($('#expense_form')); // 绑定表单验证

        var sup_picker = $("#sup_picker").picker({
            toolbarTemplate: '<header class="bar bar-nav">\
                <button class="button button-link pull-right close-picker">确定</button>\
                <h1 class="title">报销类型</h1>\
                </header>',
            cols: [{
                textAlign: 'center',
                values:  suptypeData_options, 
                onChange: function(picker, value, displayValue){
                    var i=0, l=suptypeData.length, suptype = getSuptypeId(value);
                    getSubtypeData(suptype); 
                    if(subtypeData_options.length === 0){
                        $('.picker').hide();
                    }else{
                        $('.picker').show();
                    }
                    $("#sup_picker").trigger('change_subtype');
                },
                onOpen: function(picker){
                 
                }
            }],
            scrollToInput: false,
        });

        // init picker
        $(".data-picker").each(function(index, item){
            $(item).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">费用类型</h1>\
                    </header>',
                cols: [{
                    textAlign: 'center',
                    values: ['']
                }],
                scrollToInput: false,
                onChange: function(p,values,displayValues){

                },
                onOpen: function (picker) {
                    if(! picker.initOpened) {
                        picker.cols[0].replaceValues(subtypeData_options);
                        picker.setValue(subtypeData_options[0]);
                        picker.initOpened = true;
                        picker.mySelector = picker.container;
                        $("#sup_picker").on('change_subtype',function(){
                            picker.cols[0].replaceValues(subtypeData_options);
                            picker.setValue(subtypeData_options[0]);
                        });
                    }
                },
                onClose: function(picker){
                    console.log(picker.value);
                    console.log(picker.displayValue);
                    picker.setValue(picker.value[0] || 'swqfrqwf', 150)
                }
            });
        })

        var proxyPicker = {
            ele:null,
            targetEle:null,
            init:function(){
                this.ele = $("#proxyPickerBox");
            },
            open:function(item){
                if(item ===this.targetEle){
                    this.input.picker("open");
                    return;
                }
                this.destory();
                this.ele.append("<input type='text' value=''/>")
                this.input = this.ele.find("input");

                this.targetEle = item;
                var dataData = item.dataData;
                var values = [];
                dataData.forEach(function(v){
                    values.push(v);
                })
                this.input.val(item.showValue||values[0]);
                this.input.picker({
                            cols: [
                                {
                                    textAlign: 'center',
                                    values: values,
                                }
                            ],
                            onClose: function () {
                                item.dataValue=item.textMap[proxyPicker.input.val()];
                                debugger;
                                item.showValue=proxyPicker.input.val();
                                console.log(proxyPicker.input.val());
                            },

                        }
                );
                this.input.picker("open");
            },
            destory:function(){
                this.targetEle=null;
                this.ele.html("");
                this.picker = null;
            }
        };

        // picker
        // $(document).on('click','.picker',function(e){
        //     //$(this).find('.data-picker').picker("open");
        //     proxyPicker.init();
        //     proxyPicker.open({
        //         dataData: subtypeData_options,
        //     })
        // })        

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

    });

    $(document).on("pageInit", function(e, pageId, $page) {
        // 调起相机
        $(document).on('click','.upload-img-icon',function(){
            var count = $(this).parents('.item-content').siblings('.upload-content').find('.upload-item').length;
            cameraIndex = $(this).parents('.ud-list-block-item').index();
            if(count >= max_upload_count){
                $.toast('最多上传8张图片');
                return;
            }
            if(isFirstClick){
                $.alert('请知悉如下信息：<br>1）上传发票信息时，请确认票面与印章是否清晰<br>2）数量是否为批，如果有请提供增值税发票清单；', function(){
                    //openCamera();
                    cameraCallback('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg');
                });
            }else{
                //openCamera();
                cameraCallback('https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg');
            }
            isFirstClick = false;
        });
        // 删除图片 // bind delete img
        $(document).on('click','.upload-delete',function(){
            $(this).parents('.upload-item').remove();

        });     
        // 图片预览 
        photoBrowser(); 
    });


    $(document).on("pageInit", function(e, pageId, $page) {
        //  add approver
        var data = [{"avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg", "displayName": "而感慨"},{"avatar": "https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1504090478566&di=bde55eaf08b6aed9823e9d7a946fefe1&imgtype=0&src=http%3A%2F%2Fk2.jsqq.net%2Fuploads%2Fallimg%2F1702%2F10_170208140118_3.jpg", "displayName": "ERGE"}] 
        
        $(document).on('click', '.approve-add-button', function(){
            var _this = $(this);
            $.each(data, function(index, approver){
                var tplItems = $('#templates_approver_item').find('.approve-item').clone();
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
    })
    
    
    $(document).on("pageInit", function(e, pageId, $page) {
        var gItemsIdx = initFormGroupIndex(); // 明细表单的初始化个数
        updateFormGroupIndex();  // 初始化表单明细组index
        hasDeleteButton(); // 初始化是否有删除开关
        // 增加表单明细
        $(document).on('click','#add-button',function (){
            var tplItems = $('.ud-list-block-item').first().clone();
            gItemsIdx ++;
            tplItems.find('input[id^="data-picker-"]').attr('id','data-picker-'+gItemsIdx);
            tplItems.find('.upload-content').html('');
            tplItems.find('input').val('');
            tplItems.find('textarea').val('');
            $('#add-button').before(tplItems);

            // 更新表单明细的index
            updateFormGroupIndex();
            // bind form event
            $("#data-picker-"+gItemsIdx).picker({
                toolbarTemplate: '<header class="bar bar-nav">\
                    <button class="button button-link pull-right close-picker">确定</button>\
                    <h1 class="title">费用类型</h1>\
                    </header>',
                cols: [{
                    textAlign: 'center',
                    values: subtypeData_options
                }],
                scrollToInput: false,
                onChange: function(p,values,displayValues){

                },
                onOpen: function (picker) {
                    if(! picker.initOpened) {
                        picker.initOpened = true;
                        picker.mySelector = "#data-picker-"+gItemsIdx;
                        $("#sup_picker").on('change_subtype',function(){
                            picker.cols[0].replaceValues(subtypeData_options);
                            $(picker.mySelector).val('');
                        });
                    }
                },
                onClose: function(picker){
                    console.log(picker.value);
                    console.log(picker.displayValue);
                    picker.setValue(picker.value[0] || 'swqfrqwf', 150)
                }
            });
           
            
            $(".date-picker").datetimePicker({
                // value: ['1985', '12', '04', '9', '34'],
                maxDate: new Date()
            });
        })

        // 初始化删除明细表单组 
        $(document).on('click','#detailList .delete-button',function(){
            var text = $(this).parents('.content-block-title').find('.expense-detail-index').text().replace(/\(|\)/g,''),
                _this = $(this);
            $.confirm('你确定要删除'+text+'吗？',function(){
                var index = _this.parents('.ud-list-block-item').index();
                _this.parents('.ud-list-block-item').remove();
                // 更新表单明细的index
                updateFormGroupIndex();
            }, function(){
                // nothing to do
            })
        });

        // 是否删除按钮存在 --- 只有一个明细时隐藏
        function hasDeleteButton(){
            var $items = $('#detailList .ud-list-block-item'),
                count = $items.length;
            count === 1 ? $items.find('.delete-button').hide() : $items.find('.delete-button').show();
        }

        // get 明细表单的初始化个数
        function initFormGroupIndex(){
            var $items = $('#detailList .ud-list-block-item'),
                count = $items.length;
            return count-1;
        }   
        // 更新明细组的index
        function updateFormGroupIndex(){
            var $items = $('#detailList .ud-list-block-item');
            $items.each(function(index, item){
                var $title = $(item).find('.content-block-title .expense-detail-index'),
                    text = $title.text(), newText = '';
                    text.match(/\d/g) ? newText = text.replace(/\d/g,(index+1))
                                      : newText = text + '(' + (index+1) + ')';
                $title.text(newText);
            });
            hasDeleteButton();
        }
    });

})($)