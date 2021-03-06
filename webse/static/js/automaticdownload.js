
     $(function () {
    var u = navigator.userAgent, app = navigator.appVersion;
    var Android = u.indexOf('Android') > -1 || u.indexOf('Linux') > -1; //g
    var IOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
    if (Android) {
     window.location.href =
      //"https://android.semadver.com/hxapp/SQ.V4.1.1-2021-02-25.apk"; //阿里云（369）OSS 主要下载链接//
      //"https://android.nfengdp.com/android/SQ.V4.1.1-2021-02-25.apk";//华为云5678--Android下载地址(主要)
      //"http://android.nfengdp.com/android/SQ.V4.1.0-2021-02-09.apk"; // 华为云（687）obs 主要下载链接//
     //"https://androidbei.semadver.com/hxapp/SQ.V4.0.4-2021-01-16.apk"; //阿里云OSS（hx_007008）备用
     //"https://android.yibaoshicai.com/Android/SQ.V4.0.4-2021-01-16.apk"; //腾讯云 beijiaoou649ag@126.com 主要下载链接
     //"https://yisu.qinhasc.top/APP/SQ.V4.0.3-2021-01-10.apk";//亿速云CDN本地服务器备用下载-1
     //"https://android.qinhasc.top/APP/SQ.v4.0.4-2021-01-16.apk";//这个下载链接被360加入收录黑名单
    }
    
    //if (IOS) {
    // window.location.href =
    // "itms-services://?action=download-manifest&url=https://android.qinhasc.top/plist/huaxinshequ.plist";
    // }
   
     }); 
    
    
    
    