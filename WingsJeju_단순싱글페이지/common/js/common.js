$(function(){
	AgentFlag = set_ui();
	IE7lag = (navigator.appVersion.indexOf("MSIE 7") > -1)?true:false;
	mResizeCheck = $(window).width();
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();	
	commonTop.init();
	cellSize();

	if($(".main").length > 0)mHeaderFix();

	if(AgentFlag == true){
		$(".btn_pay_wrap").find(".mobile").hide();
		$(".btn_pay_wrap").find(".pc").show();
	}else{		
		$(".btn_pay_wrap").find(".pc").hide();
		$(".btn_pay_wrap").find(".mobile").show();
	}

	slideArr = [];
	$('.main_slide').each(function () {
		var _mode, controlFlag, minFlag, pagerFlag;
		controlFlag = false;
		pagerFlag = true;
		minFlag = true;
		var _autoDelay = Math.floor(Math.random() * (500 - 2500) + 2500)
		var _pause = Math.floor(Math.random() * (3500 - 4500) + 4500)
		var setting = {
			mode: _mode,
			auto: minFlag,
			autoHover: minFlag,
			autoDelay: _autoDelay,
			controls: controlFlag,
			pager: pagerFlag,
			pause: _pause,
			useCSS:false
		}
		var slide = $(this).bxSlider(setting);
		slideArr.push(slide)
	});

	$('.clock').each(function(){
		var _clock = new Clock($(this));
	});

	$(".btn_scroll a").on("click", function(){						
		if($(this).parent("p").hasClass("up")){
			$("html,body").animate({scrollTop:0},500)
		}else{
			$("html,body").animate({scrollTop:$("html").height()},500)
		}
	});

});//end ready

$(document).ready(function(){

});

$(window).scroll(function() {			
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();

	if($(".main").length > 0)mHeaderFix();

	if(npos > 0){
		$(".btn_scroll").show(); 
	}else{
		$(".btn_scroll").hide(); 
	}

	commonTop.scrollCheck();

});//end scroll

$(window).resize(function(){
	if (mResizeCheck != $(window).width()) {
		npos = $(window).scrollTop();
		SW	=	$(window).width();
		SH	=	$(window).height();
		commonTop.scrollCheck();
		if($(".main").length > 0)mHeaderFix();
		mResizeCheck = $(window).width();
	}
	cellSize();

});//end resize


/**********************************
@ header function
**********************************/
var commonTop = {
	init:function(){
		notice_slide = $('.notice_slide').bxSlider({			
			mode:'vertical',
			auto:true,
			autoHover:true,
			autoDelay:0,
			controls:false,
			pager:false,
			pause:4000
		});
		commonTop.scrollCheck();
	},
	McheckLnb:function(){
		if(!$(".gnb_list").hasClass("open")){
			$('.m_gnb_wrap').stop(true).fadeIn(300,function(){
				$(".gnb_list").addClass("open");
				$(window).scrollTop(0);
			});			
		}else{
			$(".gnb_list").removeClass("open");
			setTimeout(function(){
				$('.m_gnb_wrap').hide();
			},300);		
		}	
	},
	scrollCheck:function(){
		if($('#header').hasClass('s_main')){
			//서브일때
			if(SW >= 1024){
				if(npos >= 100){
					$('.sub_visual').addClass('sfix');
				}else{
					$('.sub_visual').removeClass('sfix');
				}

			}else{
				$('.sub_visual').removeClass('sfix');		
			}


		}else{
			//메인일때
		}
	}
}


/**********************************
@ content view 
**********************************/
var conPop = {
    popOpen: function (_url) {
        $('#content_pop').html('')
        $.get(_url, function (data, status) {
            if (status == "success") {
                var $newItems = $(data);
                $('#content_pop').html($newItems)
                $('html').addClass('fix')
				$('#content_pop').scrollTop(0)
				$('#content_pop').stop(true).fadeIn(300);				
                $('#content_pop').addClass('open');
                
            }
        });
    },
    popClose: function () {		
		$('#content_pop').stop(true).fadeOut(300,function(){
			$('#content_pop').hide();
            $('#content_pop').removeClass('open');            
            $('#content_pop').html('')
		});
        $('html').removeClass('fix')		
    },
    popConModify: function (_url) {
        conPop.popClose();
    }
}

//parameter
function getParameter(key) 
{ 
    var url = location.href; 
    var spoint = url.indexOf("?"); 
    var query = url.substring(spoint,url.length); 
    var keys = new Array; 
    var values = new Array; 
    var nextStartPoint = 0; 
    while(query.indexOf("&",(nextStartPoint+1) ) >-1 ){ 
        var item = query.substring(nextStartPoint, query.indexOf("&",(nextStartPoint+1) ) ); 
        var p = item.indexOf("="); 
        keys[keys.length] = item.substring(1,p); 
        values[values.length] = item.substring(p+1,item.length); 
        nextStartPoint = query.indexOf("&", (nextStartPoint+1) ); 
    } 
    item = query.substring(nextStartPoint, query.length); 
    p = item.indexOf("="); 
    keys[keys.length] = item.substring(1,p); 
    values[values.length] = item.substring(p+1,item.length); 
    var value = ""; 
    for(var i=0; i<keys.length; i++){ 
        if(keys[i]==key){ 
            value = values[i]; 
        } 
    } 
    return value; 
};//end getParameter

function set_ui(){
	var UserAgent = navigator.userAgent;
	var UserFlag	=	true;
	if (UserAgent.match(/iPhone|iPad|iPod|Android|Windows CE|BlackBerry|Symbian|Windows Phone|webOS|Opera Mini|Opera Mobi|POLARIS|IEMobile|lgtelecom|nokia|SonyEricsson/i) != null || UserAgent.match(/LG|SAMSUNG|Samsung/) != null)
	{
		//mobile!!
		UserFlag = false;
	}
	return UserFlag
};//end set_ui

function cellSize(){
	var _cell = $(".cell_len");
	var total_cell = _cell.parents("table").find("thead th:visible").length;
	var line_cell = _cell.siblings("td").length;
	var _len = total_cell - line_cell
	_cell.attr("colspan" , _len)
}

 function mHeaderFix(){
	 var mCon = $(".main");
	 var mCon_Y = mCon.offset().top;
	 var hCon_H = $("#header").height();
	 var resCon = $(".main .real_time_res");
	 if($(window).width() > 1024){
		if($(window).scrollTop() > (mCon_Y - hCon_H) - resCon.height()){
			 $('#header').addClass('mfix').css('top',(mCon_Y - hCon_H) - resCon.height());

		 }else{
			 $('#header').removeClass('mfix').attr('style','');
		 }

		 if($(window).scrollTop() > (mCon_Y - hCon_H) - resCon.height()+100){
			 resCon.addClass("fix");
		 }else{
			 resCon.removeClass("fix");		
		 }
	 }else{
		 $('#header').removeClass('mfix');			 
		if($(window).scrollTop() > (mCon_Y - hCon_H) - (resCon.height()/2)){
			 resCon.addClass("fix");
		 }else{
			 resCon.removeClass("fix");		 
		 }
	 }	 
 }


 function Clock(_t){
	var _self = this;
	var _target = _t;
	var _loop;
	this.timerEffect = function(){	
		var d = new Date();
		var h = d.getHours(); 
		var m = d.getMinutes();
		var s = d.getSeconds();	

		if( h > 12 ) h = h - 12; 		
		var dh = ( h * 30 ) + ( m / 2 ); 
		dh = parseInt( dh ); 
		var dm = m * 6; 
		var ds = s * 6; 

		_target.find('.hour').css({'-webkit-transform':'rotate('+dh+'deg)','transform':'rotate('+dh+'deg)'});
		_target.find('.min').css({'-webkit-transform':'rotate('+dm+'deg)','transform':'rotate('+dm+'deg)'});
		_target.find('.sec').css({'-webkit-transform':'rotate('+ds+'deg)','transform':'rotate('+ds+'deg)'});

	}
	_loop = setInterval(_self.timerEffect,1000);
 }