$(function(){
	AgentFlag02 = set_ui();
	mResizeMainCheck = $(window).width();		
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();
	
});

$(document).ready(function(){			
	npos = $(window).scrollTop();
	SW	=	$(window).width();
	SH	=	$(window).height();
	mainEffect.init();
	mainEffect.start();
});//end ready

$(window).resize(function(){
	if (mResizeMainCheck != $(window).width()) {
		//main_visual.resize();		
		npos = $(window).scrollTop();
		SW	=	$(window).width();
		SH	=	$(window).height();
		mainEffect.resize();
		mResizeMainCheck = $(window).width();
	}
});


var main_visual = {
	cur:0,
	prev:-1,
	len:0,
	dir:0,
	DW:0,
	target:null,
	first:true,
	timer:null,
	speed:6000,
	init:function(){
		main_visual.target = $('.main_visual');
		main_visual.DW = main_visual.target.innerWidth();
		main_visual.len = main_visual.target.find('.big_wrap > div').length;
		//main_visual.timer = setInterval(main_visual.autoTimer,main_visual.speed);
		main_visual.start();
	},
	start:function(){		
		var _dx = (main_visual.dir == 0)?main_visual.DW*-1:main_visual.DW;
		main_visual.target.find('.big_wrap > div').each(function(){
			if($(this).index() == main_visual.cur){

			}else if($(this).index() == main_visual.prev){

			}else{

			}
		});		

		main_visual.target.find('.page > a').eq(main_visual.cur).addClass('actived').siblings().removeClass('actived');
		main_visual.first = false;
	},
	resize:function(){
		main_visual.DW = main_visual.target.innerWidth();
		main_visual.target.find('.big_wrap > div').each(function(){
			if($(this).index() == main_visual.cur){		

			}else{

			}
		});

		//clearInterval(main_visual.timer);
		//main_visual.timer = setInterval(main_visual.autoTimer,main_visual.speed);
	},
	autoTimer:function(){
		main_visual.prev = main_visual.cur;
		main_visual.cur = (main_visual.cur >= main_visual.len-1)?0:main_visual.cur = main_visual.cur+1;
		main_visual.dir = 1;
		main_visual.start();
	}
	
}

var mainEffect = {
	cloud:null,
	target:null,
	init:function(){
		mainEffect.target = $('#mainVisual');
		mainEffect.target.addClass('open');
		mainEffect.cloudReset();

		if(AgentFlag02){
			mainEffect.cloud = new cloudMove02();
			TweenMax.set(mainEffect.target.find('.data_wrap'),{alpha:0,y:mainEffect.target.innerHeight()});		
			TweenMax.to($('.bird > div'),0.9,{delay:2.3,top:0,ease:Quad.easeOut});
			TweenMax.to($('.mount > div'),0.9,{delay:2.3,top:0,ease:Quad.easeOut});
			airport();
			balloon();
		}else{
			TweenMax.set($('.bird > div'),{top:0});
			TweenMax.set($('.mount > div'),{top:0});
			TweenMax.set($('.car'),{rotation:30,x:SW-70,y:140});
			TweenMax.set($('.balloon'),{x:10,y:50});
		}
	},
	start:function(){
		if(AgentFlag02){
			var cloud_y = (mainEffect.target.innerHeight())*-1
			TweenMax.to(mainEffect.target.find('.data_wrap'),1,{alpha:1});
			TweenMax.to(mainEffect.target.find('.data_wrap'),3.2,{y:cloud_y,ease:Quad.easeInOut});
			mainEffect.target.find('.btn_data a span').each(function(){
				var _flag;
				if($(this).index() % 2){
					_flag = 0
				}else{
					_flag = 1
				}
				var _sx = (_flag == 1)?-50:50;
				var _delay = ($(this).index() * 0.15)+0.3;
				TweenMax.set($(this),{x:_sx});
				TweenMax.to($(this),0.9,{alpha:1,x:0,delay:_delay,ease:Expo.easeOut});
			});
		}else{
			var cloud_y = (mainEffect.target.innerHeight())*-1
			TweenMax.set(mainEffect.target.find('.data_wrap'),{alpha:1,y:cloud_y});

			mainEffect.target.find('.btn_data a span').each(function(){
				TweenMax.set($(this),{x:0,alpha:1});
			});
		}
	},
	cloudReset:function(){
		mainEffect.target.find('.c_obj').each(function(){
			var _move = new cloudMove($(this));
		});
	},
	resize:function(){
		mainEffect.cloud.resize();
	}
}

function cloudMove(t){
	var _self = this;
	var _t = t;
	var _p = $('#mainVisual');

	this.reset = function(){
		var _sx = Math.floor(Math.random()*(0-SW-_t.innerWidth())+SW-_t.innerWidth());;
		var _sy = Math.floor(Math.random()*(0-_p.innerHeight()-_t.innerHeight())+_p.innerHeight()-_t.innerHeight());
		var _sa = Math.random()*(0.3-0.6)+0.6;
		TweenMax.set(_t,{x:_sx,y:_sy,alpha:_sa});
		flag = true;
	}

	this.resize = function(){
		//TweenMax.killTweensOf(_t);
	}

	this.reset();
}

function cloudMove02(){
	var _self = this;
	var _p = $('#mainVisual');
	var _t = _p.find('.cloud_wrap');
	var flag = false;
	this.play = function(str){
		var _x = SW*2;
		var _sx = (flag)?SW*-1:0;
		if(str != 'resize'){
			TweenMax.set(_t,{x:_sx});
		}		
		TweenMax.to(_t,50,{x:_x,ease:Linear.easeNone,onComplete:function(){
			_self.play();
		}});
		flag = true;
	}

	this.resize = function(){
		TweenMax.killTweensOf(_t);
		_self.play('resize');
	}
	this.play();	
}

var AIRsy,AIRdx,AIRdy,AIRspeed,AIRro;

function airport(){
	var _delay =Math.floor(Math.random()*(3-6)+6);
	AIRspeed = Math.floor(Math.random()*(15-20)+20);
	
	AIRsy = 0;
	AIRdy = Math.floor(Math.random()*(50-$('#mainVisual').innerHeight()/2)+$('#mainVisual').innerHeight()/2);
	AIRro = 15;
	TweenMax.set($('.car'),{rotation:AIRro,x:SW+250,y:AIRdy});
	TweenMax.to($('.car'),AIRspeed,{x:-250,y:AIRdy,delay:_delay,ease:Linear.easeNone,onComplete:function(){
		airport();
	}});
	
	
}

var BALLsy,BALLdx,BALLdy,BALLspeed;

function balloon(){
	var _flag = Math.floor(Math.random()*(-1-1)+1);
	
	BALLdx = -300;
	BALLspeed = Math.floor(Math.random()*(60-80)+80);
	
	BALLsy = Math.floor(Math.random()*(100-200)+200);
	BALLdy = 0;
	TweenMax.set($('.balloon'),{x:0-97,y:BALLsy});
	TweenMax.to($('.balloon'),BALLspeed,{x:SW+97,y:BALLsy,ease:Linear.easeNone,onComplete:function(){
		balloon();
	}});		
	
}



