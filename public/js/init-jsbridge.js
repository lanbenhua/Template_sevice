$(document).on("pageInit", function(e, pageId, $page) {
    var gJsBridge;
    if($.device.ios) {
        /*这段代码是固定的，必须要放到js中*/
        var setupWebViewJavascriptBridge = function setupWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                return callback(WebViewJavascriptBridge);
            }
            if (window.WVJBCallbacks) {
                return window.WVJBCallbacks.push(callback);
            }
            window.WVJBCallbacks = [callback];
            var WVJBIframe = document.createElement('iframe');
            WVJBIframe.style.display = 'none';
            WVJBIframe.src = 'wvjbscheme://__BRIDGE_LOADED__';
            document.documentElement.appendChild(WVJBIframe);
            setTimeout(function () {
                document.documentElement.removeChild(WVJBIframe);
            }, 0);
        };
        /*与OC交互的所有JS方法都要放在此处注册，才能调用通过JS调用OC或者让OC调用这里的JS*/
        setupWebViewJavascriptBridge(function (bridge) {
            /* Initialize your app here */
            /*我们在这注册一个js调用OC的方法，不带参数，且不用ObjC端反馈结果给JS：打开本demo对应的博文*/
            // bridge.registerHandler('openWebviewBridgeArticle', function() {
            //      log("openWebviewBridgeArticle was called with by ObjC")
            // })
            /*JS给ObjC提供公开的API，在ObjC端可以手动调用JS的这个API。接收ObjC传过来的参数，且可以回调ObjC*/
            // bridge.registerHandler('getUserInfos', function(data, responseCallback) {
            //      log("Get user information from ObjC: ", data)
            //      responseCallback({'userId': '123456', 'blog': '标哥的技术博客'})
            // })
            /*JS给ObjC提供公开的API，ObjC端通过注册，就可以在JS端调用此API时，得到回调。ObjC端可以在处理完成后，反馈给JS，这样写就是在载入页面完成时就先调用*/
            gJsBridge = bridge;
        });
    } 
    else if($.device.android) {
        function connectWebViewJavascriptBridge(callback) {
            if (window.WebViewJavascriptBridge) {
                callback(WebViewJavascriptBridge)
            } else {
                document.addEventListener(
                    'WebViewJavascriptBridgeReady'
                    , function () {
                        callback(WebViewJavascriptBridge)
                    },
                    false
                );
            }
        }
        connectWebViewJavascriptBridge(function (bridge) {
            bridge.init(function (message, responseCallback) {
                var data = {};
                responseCallback(data);
            });
            gJsBridge = bridge;
        })
    }

    window.appPageBack = function(){
        if(gJsBridge)
            gJsBridge.callHandler('appPageBack', {}, function(response){
                // console.log(response);
            }.bind(this));
        else $.alert('返回原生代码');
    };

    window.appFormSubmit = function(data){
        if(gJsBridge)
            gJsBridge.callHandler('appFormSubmit', { 'value': JSON.stringify(data) }, function(response){
        
            }.bind(this));
        else 
            alert(JSON.stringify(data,null,4));
    };

    window.openCamera = function(){
        if(gJsBridge){
            gJsBridge.callHandler('openCamera', {}, function(response) {
                //toast(response);
            });
        }
    };
    !(function(){
        if(gJsBridge){
            gJsBridge.registerHandler('cameraBack', function(data, responseCallback) {
                cameraCallback(data);
            })
        }
    })()

});



