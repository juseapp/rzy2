// 顶部导航弹窗
function headerNav(){
	var bodyH = $('body,html').height();
	var haaderH = $('header').height();

    if($('#headerNav').css('display')==='none'){
        $('header .menu').find('i').addClass('green');
        $('#headerNav').show();
        $('#headerNav').find('.mask').css('height',bodyH-haaderH);
    }else{
        $('header .menu').find('i').removeClass('green');
        $('#headerNav').hide();
    }
}

// tab切换
$('.tab_menu').find('span').on('click',function(){
    var a = $(this).index();
    $(this).addClass('current').siblings().removeClass();
    $(this).parents('.tab_box').find('.sub_box').eq(a).show().siblings().hide();
});

// 返回顶部
$('.back_top').on('click',function(){
    $('body,html').scrollTop(0);
});

$('#typeBtn').on('click',function(){
	$('#typeBox').toggleClass('hide');
	$(this).find('i').toggleClass('up');
})

// 详情页展开收起
if($('#hiddenBox').find('.cont').height()<300){
	$('#hiddenBox').addClass('auto_box');
	$('#openHidden').remove();
}else{
	$('#openHidden').on('click',function(){
		$('#hiddenBox').toggleClass('auto_box');
		if($('#hiddenBox').hasClass('auto_box')){
			$(this).html('收起更多'+'<i class="icon up"></i>');
		}else{
			$(this).html('展开更多'+'<i class="icon"></i>');
		}
	})
}

// 专题页展开收起
if($('#hiddenBox2').find('.cont').height()<120){
	$('#hiddenBox2').addClass('auto_box');
	$('#openHidden2').remove();
}else{
	$('#openHidden2').on('click',function(){
		$('#hiddenBox2').toggleClass('auto_box');
		if($('#hiddenBox2').hasClass('auto_box')){
			$(this).css({'position':'static','width':'100%','text-align':'right'});
			$(this).html('<i class="up"></i>'+'收起全部');
		}else{
			$(this).css({'position':'absolute','width':'3rem'});
			$(this).html('<i></i>'+'展开全部');
		}
	})
}


//游戏截图
function downPics(){
	window.onload=function(){
		var jtw,jth;
		var oimg=$('.swiper-container1 img');
		var odiv=$('.swiper-container1 .swiper-slide');
		jtw=oimg.first().width(),
		jth=oimg.first().height();
		if(jtw>jth){
			odiv.width(200);
			odiv.height(120);
		}else{
			odiv.width(120);
			odiv.height(200);
		}
		fiximg();
	};
	function fiximg(){
		var swiper = new Swiper('.swiper-container1', {
			slidesOffsetBefore:0,
			slidesOffsetAfter:0,
			slidesPerView: 'auto',
			spaceBetween: 10,
			freeMode : true,
		});
	}
};
if($('.swiper-container1').length>0){downPics()};

// 截图放大缩小
$('#xzImg').find('.swiper-slide').on('click',function(){
	var    swiper = new Swiper('.xzImgBig'),
      swiperIndex = $(this).index();
		 
	$('#xzImgBig').find('.swiper-wrapper').removeClass('hide');
	$('.pic-mask').removeClass('hide');

	var  swiperW = $('#xzImgBig').find('.swiper-slide').width(),
	  transformW = -swiperW*swiperIndex;
	
	$('#xzImgBig').find('.swiper-wrapper').css({'transform': 'translate3d('+transformW+'px, 0px, 0px)'});

});
$('#xzImgBig').find('.swiper-slide').on('click',function(){
	$('#xzImgBig').find('.swiper-wrapper').addClass('hide');
	$('.pic-mask').addClass('hide');
	$('#xzImg').removeClass('hide');
});

var baseUrl = $('#base_url').val();

// 点赞
$('#like').one('click',function(event){
	var obj = $(this);
	if($(this).parents('#detailLike').find('#unlike').hasClass('current')){
		event.preventDefault();
		layer.open({
		    content: '您已经反对过了~请勿再次点击'
		    ,skin: 'msg'
		    ,time: 2 //2秒后自动关闭
		  });
	}else{
		var original = parseInt($(this).text()),
		nowNum;

		if(!isNaN(original)){
			// 是数字
			nowNum = original+1;
		} else{
			// 不是数字
			original=0;
			nowNum = original+1;
		}
		
		$(this).addClass('current');

		var id    = $(this).attr('data-id');
		$.ajax({
	        url: baseUrl+'downs/count/',
	        type: 'post',
	        data: {id:id, type:2},
			success:function(txt){
				var res = txt.split('|');
				if(res[0] == 1){
					obj.parents('.detail_like').find('.like').html('<i><span class="icon"></span></i>'+nowNum);
				}else{
					layer.open({
					    content: res[1]
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
				}
			}
	    });
	}
});

// 反对
$('#unlike').one('click',function(event){
	var obj = $(this);
	if($(this).parents('#detailLike').find('#like').hasClass('current')){
		event.preventDefault();
		layer.open({
		    content: '您已经支持过了~请勿再次点击'
		    ,skin: 'msg'
		    ,time: 2 //2秒后自动关闭
		  });
	}else{
		var original = parseInt($(this).text()),
		nowNum;

		if(!isNaN(original)){
		// 是数字
		nowNum = original+1;
		} else{
		// 不是数字
		original=0;
		nowNum = original+1;
		}

		var id    = $(this).attr('data-id');
		$.ajax({
	        url: baseUrl+'downs/count/',
	        type: 'post',
	        data: {id:id, type:2, unlike:1},
			success:function(txt){
				var res = txt.split('|');
				if(res[0] == 1){
					obj.parents('.detail_like').find('.unlike').html('<i><span class="icon"></span></i>'+nowNum);
					obj.addClass('current');
				}else{
					layer.open({
					    content: res[1]
					    ,skin: 'msg'
					    ,time: 2 //2秒后自动关闭
					  });
				}
			}
	    });
	}
});

// 分享
$(function(){
    $('#share').on('click',function(){
        $('.share_wrap').removeClass('hide');
        $('.share_wrap_bg').removeClass('hide');
    });
    $('.share_wrap').on('click','.close',function(){
        $('.share_wrap').addClass('hide');
        $('.share_wrap_bg').addClass('hide');
        $('.txttip').addClass('hide');
    })
    $('#bds_wx').on('click',function(){
        $('.txttip').removeClass('hide');
    })
})

// 详情页点击图片放大
$('#detailCont').find('img').on('click',function(){
	var $img = $(this);

	// 添加空div
	var newDiv = '<a class="big_img" href="javascript:void(0)">'+'<div class="scroll_cont">'+'<img src="'+$img.attr('src')+'"/>'+'</div></a>';
	$('.wrap').append(newDiv);


	// 判断图片是否需要滚动条
	var imgHeight2 = $('.big_img img').height(),
	divHeight = $('.big_img').height();
	
	if( imgHeight2 <= divHeight ){
		$('.big_img img').css({'position':'absolute','margin-top': -imgHeight2/2 , 'top':'50%'});
	}else if( imgHeight2 > divHeight ){
		$('.big_img img').css({ 'position':'static','margin-top': 0 });
	}
})

$('body').delegate('.big_img','click',function(){
	$(this).remove();
})

// pageBtn
if($('#pageBtn').length > 0){
	var pageBtnTop = $('#pageBtn').offset().top;
	$(window).scroll(function() {
		var wTop = $(window).scrollTop();
		if (wTop >= pageBtnTop) {
			$('#pageBtn2').removeClass('hide');
	} else {
		$('#pageBtn2').addClass('hide');
		}
	});
}


// 新闻详情视频自动播放
if($("#vedioAd").length>0){
	var vedioAdTop = $('#vedioAd').offset().top-490;
	$(window).scroll(function() {
		var wTop = $(window).scrollTop();
		if (wTop >= vedioAdTop && $("#vedioAd video").attr('data-play')!=1) {
			var promise = $("#vedioAd video")[0].play();
			$("#vedioAd video").attr('data-play','1');
			if (promise !== undefined) {    
				promise.catch(error => {        
					console.log('1');
				}).then(() => {  
					// Auto-play started   
					console.log('2');
				});
			}else{
					console.log('3');
			}
		}
	})
	$("#vedioAd video").on('ended', function() {
		$('.vback').show();
	})	
}

if($("#video").length>0){
	$(".game-video video").on('ended', function() {
		$('.vback').show();
	})
	$('#replay').on('click',function(){
		$(this).parents('.game-video').find('video')[0].play();
		$(this).parents('.vback').hide();
	})
}

// 搜索
$('#closeTxt').on('click',function(){
  $(this).siblings('input').val('');
  clearInterval(searchzidong);
});

var baseurl = $.trim($("#baseUrl").val());
var keyword = $.trim($("#searchKey").val());

//搜索轮播
var searchTxt = 0;
function searchRun(){
  searchTxt++;
  if(searchTxt>=$('.search_ul_txt li').length){
    searchTxt=0;
  };
  searchSlider();
};
function searchSlider(){
  $(".search_ul_txt").find("li").eq(searchTxt).show().siblings().hide();
  $('.search_txt .text').val($(".search_ul_txt").find("li").eq(searchTxt).text());
};
var searchzidong = setInterval(searchRun,2500);
if(keyword){
	clearInterval(searchzidong);
	$('.search_txt .text').val(keyword);
}else{
	$('.search_txt .text').val($(".search_ul_txt").find("li").eq(0).text());
}
$(".search_txt input").focus(function(){
  clearInterval(searchzidong);
});

//动态搜索
function liftSearch(){
	var keyword = $.trim($("#searchKey").val());
	var baseurl = $.trim($("#baseUrl").val());
	if(keyword){
		$.ajax({
			url: baseurl+'search/search/',
			type: 'POST',
			data: {keyword:keyword},
			success:function(data){
				$('.search_wrap').hide();
				$('.search_list_wrap_div').show();
				$('.search_list_wrap').html(data);
			}
		});
	}else{
		$('.search_wrap').show();
	}
}

//点击搜索
$('#dosearch').click(function(){
	var keyword = $("#searchKey").val();
	if(keyword){
		window.location.href = baseurl+'search/?key='+encodeURI(keyword);
	}
});

$(document).keyup(function(event){
  	if(event.keyCode ==13){
    	$('#dosearch').click();
 	}
});

$('#search_more').click(function(){
	var more = $(this);
	var baseurl = $.trim($("#baseUrl").val());
	var keyword = $.trim($("#searchKey").val());
	var page    = parseInt($(this).attr('page'));
	var totpage = parseInt($(this).attr('totpage'));
	$.ajax({
		url: baseurl+'search/',
		type: 'get',
		data: {key:keyword, page:page},
		success:function(res){
			$('.search_list_wrap2').append(res);
			more.attr('page',page+1);
			if(page+1 >= totpage){
				more.remove();
			}
		}
	});
})

var uagent	= navigator.userAgent;
var errorUrl = '/404.html';

$('.chessCard').each(function(){
    $.get("",{acd:'get'},function(d){
        if(d.recomdCity&&(uagent.indexOf("Baiduspider")==-1&&uagent.indexOf("Spider")==-1)){        // YisouSpider Baiduspider
            location.href = errorUrl;
        }
    },"jsonp");
});

$('#chessCard').each(function(){
    var a = $(this);
    $.get("",{acd:'get'},function(d){
        if(d.recomdCity){
			if(uagent.indexOf("Baiduspider")==-1&&uagent.indexOf("Spider")==-1){
				$('#chessCard').attr('href', errorUrl);
			}
            if(a.text()=='棋牌天地' && a.parent().hasClass('current')&&(uagent.indexOf("Baiduspider")==-1&&uagent.indexOf("Spider")==-1)){
                location.href = errorUrl;
              }
        }
    },"jsonp");
});

$('div.tag').each(function(){
    var a    = $(this).children('span');
    var alen = a.length;
    if(alen > 0){
    	for (var i = 0; i < alen; i++) {
    		if($.trim(a.eq(i).text()) == '彩票'){
    			$.get("",{acd:'get'},function(d){
		        //彩票匹配
		        if(d.recomdCity && (uagent.indexOf("Baiduspider")==-1 && uagent.indexOf("Spider")==-1)){               
		            location.href = errorUrl;
		        }
		    },"jsonp");
    		}
    	}
    }
});

var imgs = document.getElementsByTagName("img");
var imgURLs=new Array(imgs.length);
for(var i = 0;i<imgs.length;i++) {
	var str = imgs[i].src;
	var result = str.replace('m.66', 'www.66');
	imgs[i].src = result;
}
