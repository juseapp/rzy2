/*!
 * m1938.com
 * Email 2434709661@qq.com
 */

var playerhigh = "1"; 
//是否开启播放器高度自适应�?0关闭1开启（开启后将播放器设置100%关闭填写固定高度�?

var lazyswitch = "1";
//是否开启图片懒加载�?0关闭1开启（关闭后会通过js直接加载图片，速度较慢�?

var playcolumn = "0"; 
//是否开启有序播放列表，0关闭�?3�?6�?8�?10�?12开启并指定列数，数字代表每行列数，手机强制4�?

var qrcode1 = "1";
//右侧悬浮二维码，1自动生成（当前页面二维码），填写路径将加载指定图片（建议尺寸150*150px）例�?/statics/img/wxcode.png

var qrcode2 = "1";
//内容页二维码�?1自动生成（当前页面二维码），填写路径将加载指定图片（建议尺寸160*160px）例�?/statics/img/wxcode.png

var copyshort = "0"
//是否开启自动生成短链接�?0关闭1开启（开启后点击分享按钮将会复制短链否则复制默认链接�?

var baidushare = "/statics/api/js/share.js";
//是否开启百度分享，0关闭，启用本地分享填�?/statics/api/js/share.js，启用官网分享填写http://bdimg.share.baidu.com/static/api/js/share.js（不支持https�?

var stui = {
	'browser': {//浏览�?
		url: document.URL,
		domain: document.domain,
		title: document.title,
		language: (navigator.browserLanguage || navigator.language).toLowerCase(),
		canvas: function() {
			return !!document.createElement("canvas").getContext
		}(),
		useragent: function() {
			var a = navigator.userAgent;
			return {
				mobile: !! a.match(/AppleWebKit.*Mobile.*/),
				ios: !! a.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/),
				android: -1 < a.indexOf("Android") || -1 < a.indexOf("Linux"),
				iPhone: -1 < a.indexOf("iPhone") || -1 < a.indexOf("Mac"),
				iPad: -1 < a.indexOf("iPad"),
				trident: -1 < a.indexOf("Trident"),
				presto: -1 < a.indexOf("Presto"),
				webKit: -1 < a.indexOf("AppleWebKit"),
				gecko: -1 < a.indexOf("Gecko") && -1 == a.indexOf("KHTML"),
				weixin: -1 < a.indexOf("MicroMessenger")
			}
		}()
	},
	'mobile': {//移动�?
		'popup': function() {
			$popblock = $(".popup");
			$(".open-popup").click(function() {
				$popblock.addClass("popup-visible");
				$("body").append('<div class="mask"></div>');
				$(".close-popup").click(function() {
					$popblock.removeClass("popup-visible");
					$(".mask").remove();
					$("body").removeClass("modal-open")
				});
				$(".mask").click(function() {
					$popblock.removeClass("popup-visible");
					$(this).remove();
					$("body").removeClass("modal-open")
				})
			})
		},
		'slide': function() {
			$(".type-slide").each(function(a) {
				$index = $(this).find('.active').index()*1;
				if($index > 3){
					$index = $index-3;
				}else{
					$index = 0;
				}
				$(this).flickity({
					cellAlign: 'left',
					freeScroll: true,
					contain: true,
					prevNextButtons: false,				
					pageDots: false,
					initialIndex: $index
				});
			})
		},
		'mshare': function() {
			$(".open-share").click(function() {
				stui.browser.useragent.weixin ? $("body").append('<div class="mobile-share share-weixin"></div>') : $("body").append('<div class="mobile-share share-other"></div>');
				$(".mobile-share").click(function() {
					$(".mobile-share").remove();
					$("body").removeClass("modal-open")
				})
			})
		}
	},
	'images': {//图片处理
		'lazyload': function() {
			if(lazyswitch==1){
				$(".lazyload").lazyload({
					effect: "fadeIn",
					threshold: 200,
					failurelimit: 15,
					skip_invisible: false
				})
			}else{				
				$(".lazyload").each(function(){
					var original = $(this).attr("data-original");
			        $(this).css("background-image","url("+original+")");
			        $(this).attr("data-original","");
			        if($(this).attr("src")!= undefined){
			        	$(this).attr("src",original)
			        }	        
			    });
			}			
		},
		'carousel': function() {
			$('.carousel_default').flickity({
			  	cellAlign: 'left',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});					
			$('.carousel_wide').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true
			});
			$('.carousel_center').flickity({
			  	cellAlign: 'center',
			  	contain: true,
			  	wrapAround: true,
			  	autoPlay: true,
			  	prevNextButtons: false
			});			
			$('.carousel_right').flickity({
			  	cellAlign: 'left',
			  	wrapAround: true,
			  	contain: true,
			  	pageDots: false
			});
		},
		'qrcode': function() {
			if(qrcode1==1){
				if($("#qrcode").length){
					var qrcode = new QRCode('qrcode', {
					  	text: stui.browser.url,
					  	width: 150,
					  	height: 150,
					  	colorDark : '#000000',
					  	colorLight : '#ffffff',
					  	correctLevel : QRCode.CorrectLevel.H
					});
					$("#qrcode img").attr("class","img-responsive")
				}
			} else {
				if($("#qrcode").length){
					$("#qrcode").append("<img class='img-responsive' src='"+qrcode1+"' width='150' height='150' />")
				}
			}
			if(qrcode2==1){
				if($("#qrcode2").length){
					var qrcode = new QRCode('qrcode2', {
					  	text: stui.browser.url,
					  	width: 160,
					  	height: 160,
					  	colorDark : '#000000',
					  	colorLight : '#ffffff',
					  	correctLevel : QRCode.CorrectLevel.H
					});
					$("#qrcode2 img").attr("class","img-responsive").css("display","inline-block");
				}
			} else {
				if($("#qrcode2").length){
					$("#qrcode2").append("<img class='img-responsive' src='"+qrcode2+"' width='160' height='160' />")
				}
			}
		}
	},
	'common': {//公共基础
		'bootstrap': function() {
			$('a[data-toggle="tab"]').on("shown.bs.tab", function(a) {
				var b = $(a.target).text();
				$(a.relatedTarget).text();
				$("span.active-tab").html(b)
			})
		},
		'headroom': function() {
			if($("#header-top").length){
				var header = document.querySelector("#header-top");
	            var headroom = new Headroom(header, {
					tolerance: 5,
					offset: 205,
					classes: {
						initial: "top-fixed",
						pinned: "top-fixed-up",
						unpinned: "top-fixed-down"
					}
				});
				headroom.init();
			}
		},
		'history': function() {
			if($("#stui_history").length){
				if($.cookie("recente")){
				    var json=eval("("+$.cookie("recente")+")");
				    var list="";
				    for(i=0;i<json.length;i++){
				        list = list + "<li class='top-line'><a href='"+json[i].vod_url+"' title='"+json[i].vod_name+"'><span class='pull-right text-red'>"+json[i].vod_part+"</span>"+json[i].vod_name+"</a></li>";
				    }
				    $("#stui_history").append(list);
				}
				else
		            $("#stui_history").append("<p style='padding: 80px 0; text-align: center'>您还没有看过影片�?</p>");
			   
			    $(".historyclean").on("click",function(){
			    	$.cookie("recente",null,{expires:-1,path: '/'});
			    })
			}
		},
		'collapse': function() {
			if($(".detail").length){
				$(".detail").find("a.detail-more").on("click",function(){
					$(this).parent().find(".detail-sketch").addClass("hide");
					$(this).parent().find(".detail-content").css("display","");
					$(this).remove();
				})
			}
		},
		'scrolltop': function() {
			var a = $(window);
			$scrollTopLink = $("a.backtop");
			a.scroll(function() {
				500 < $(this).scrollTop() ? $scrollTopLink.css("display", "") : $scrollTopLink.css("display", "none")
			});
			$scrollTopLink.on("click", function() {
				$("html, body").animate({
					scrollTop: 0
				}, 400);
				return !1
			})
		},
		'copylink': function(){
			if(copyshort==1){
				if($(".copylink").length){
					$.ajax({ 
						type : 'GET',  
				        url : 'https://api.weibo.com/2/short_url/shorten.json?source=2849184197&url_long='+encodeURIComponent(stui.browser.url),
				        dataType : 'JSONP',   
				        success : function(r) {
				        	url_short = r.data.urls[0].url_short;	
				        	var clipboard = new Clipboard('.copylink', {
								text: function() {									
									return url_short;
								}
							});
							clipboard.on('success', function(e) {
								alert("地址复制成功，赶快分享给小伙伴吧�?");
							});
			        	} 		        	
				    });
				}
			} else {
				if($(".copylink").length){
					var url_short = stui.browser.url;	
					var clipboard = new Clipboard('.copylink', {
						text: function() {									
							return url_short;
						}
					});
					clipboard.on('success', function(e) {
						alert("地址复制成功，赶快分享给小伙伴吧�?");
					});
				}
			}
			
		},
		'share': function(){
			if(baidushare!=0){
				$(".share").html('<span class="bds_shere"></span><a class="bds_qzone" data-cmd="qzone" title="分享到QQ空间"></a><a class="bds_tsina" data-cmd="tsina" title="分享到新浪微�?"></a><a class="bds_weixin" data-cmd="weixin" title="分享到微�?"></a><a class="bds_tqq" data-cmd="tqq" title="分享到腾讯微�?"></a><a class="bds_sqq" data-cmd="sqq" title="分享到QQ好友"></a><a class="bds_bdhome" data-cmd="bdhome" title="分享到百度新首页"></a><a class="bds_tqf" data-cmd="tqf" title="分享到腾讯朋�?"></a><a class="bds_youdao" data-cmd="youdao" title="分享到有道云笔记"></a><a class="bds_more" data-cmd="more" title="更多"></a>');
				window._bd_share_config={"common":{"bdSnsKey":{},"bdText":"","bdMini":"2","bdMiniList":false,"bdPic":"","bdStyle":"0","bdSize":"24"},"share":{}};with(document)0[(getElementsByTagName("head")[0]||body).appendChild(createElement('script')).src=''+baidushare+'?cdnversion='+~(-new Date()/36e5)];
			}			
		}	
	}	
};

$(document).ready(function() {	
	if(stui.browser.useragent.mobile){	
		stui.mobile.slide();
		stui.mobile.popup();
		stui.mobile.mshare();
	}
	stui.images.lazyload();
	stui.images.carousel();
	stui.images.qrcode();
	stui.common.bootstrap();
	stui.common.headroom();
	stui.common.history();
	stui.common.collapse();
	stui.common.scrolltop();
	stui.common.copylink();
	stui.common.share();
});
