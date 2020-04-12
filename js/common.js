var imgUrl,title,desc,signature,nonceStr,timestamp,wurl;
function getUrl(){
    var host = window.location.host;
    if(host === "www.91jtg.com"){
        wurl = 'http://47.96.42.182:8092';
    }else{
        wurl = 'http://47.97.45.6:8092';
    }
}
var link = location.href.split('#')[0];//动态获取当前地址，防止微信在原地址后加入参数
imgUrl = 'http://j.91jtg.com/wdShare/img/icon.jpg';
$(function(){
    getData();
})
function getData(){
    getUrl();
    $.ajax({
        type:"post",
        url:wurl+"/api/token/weiXinTokenSignature",
        data:{
            url:link,
        },
        success:function(result){
            timestamp= result.data.timestamp;
            nonceStr= result.data.nonceStr;
            signature= result.data.signature;
            shareCallback(timestamp,nonceStr,signature);
        },
    });
}

function shareCallback(timestamp,nonceStr,signature){
    wx.config({
        debug:false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
        appId: 'wxb208fa2c5771a9bb', // 必填，公众号的唯一标识
        timestamp: timestamp, // 必填，生成签名的时间戳
        nonceStr: nonceStr, // 必填，生成签名的随机串
        signature: signature,// 必填，签名
        jsApiList: ['updateAppMessageShareData','updateTimelineShareData','onMenuShareTimeline','onMenuShareAppMessage'] // 必填，需要使用的JS接口列表
    });

    wx.ready(function () {
        // config信息验证后会执行ready方法，所有接口调用都必须在config接口获得结果之后，config是一个客户端的异步操作，所以如果需要在页面加载时就调用相关接口，则须把相关接口放在ready函数中调用来确保正确执行。对于用户触发时才调用的接口，则可以直接调用，不需要放在ready函数中。
        //自定义“分享给朋友”及“分享到QQ”按钮的分享内容（1.4.0）
        wx.updateAppMessageShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述   
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        });

        //自定义“分享到朋友圈”及“分享到QQ空间”按钮的分享内容
        wx.updateTimelineShareData({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        });

        wx.onMenuShareTimeline({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接
            imgUrl: imgUrl, // 分享图标
            success: function () {
                // 设置成功
            }
        });

        wx.onMenuShareAppMessage({
            title: title, // 分享标题
            desc: desc, // 分享描述
            link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
            imgUrl: imgUrl, // 分享图标
            success: function () {
// 用户点击了分享后执行的回调函数
            }
        });

    });
    wx.error(function (res) {
        console.log(res);
        // config信息验证失败会执行error函数，如签名过期导致验证失败，具体错误信息可以打开config的debug模式查看，也可以在返回的res参数中查看，对于SPA可以在这里更新签名。
    });
}

