// 远程服务地址
// var _remoteServiceUrl = "http://10.154.129.107"; //129.107
var _remoteServiceUrl = "http://milive.capitaretail.com.cn";
// var _remoteServiceUrl = "http://miliveuat.capitaretail.com.cn";
// 当前用户名
// var _userName = localStorage.getItem("userName");
// var _userName = "huangcheng1";
var _userName = "liuyifei";
var mallScroll, ModuleScroll, BottomScroll;
var CountryId, AreaId, MallId, CountryName, AreaName, MallName;
var CountryArr, AreaArr, MallArr;
var viewModule = "XSMK", UserModule = [], viewType; //显示模块、显示视图(Mall：商场，Area：区域，Country：国家)
var FirstLoad = true; //首次加载
var First = 0;

// 是否为拖动
var _isTouchMove = false;

function init() {	
	$("#load1").hide();
	$("#load2").hide();
	Head.setCountry();
	Bottom.init();	
	Middle.Scroll();
//	SalesView.init(true);
	$.mobile.hidePageLoadingMsg();
	//底部关闭模块
	$(".resize").click(function () {
			var ModuleObj = $("#Module"), ChartObj = $("article .chart");
			if (ModuleObj.height() > 1) {
				ChartObj.stop().animate({ height: ChartObj.height() + 72 }, "slow");
				ModuleObj.stop().animate({ height: "1px" }, "slow");
				$("article .middle").stop().animate({ height: Global.anmationIfOne }, "slow");
				$("article .middle .alert").stop().animate({ height: Global.anmationIfTwo }, "slow");
			}
			else {
				ChartObj.stop().animate({ height: ChartObj.height() - 72 }, "slow");
				ModuleObj.stop().animate({ height: "75px" }, "slow");
				$("article .middle").stop().animate({ height: Global.anmationElseOne }, "slow");
				$("article .middle .alert").stop().animate({ height: 305 }, "slow");
			}	
	});
	//五分钟自动刷新数据
	window.setInterval("Head.Data.set()", 300000);
}
// $(document).ready(function () {
// 	//PhoneGapAPI.getLoginUserInfo();
// 	setTimeout('PhoneGapAPI.getLoginUserInfo()',7000);
// 	Head.setCountry();
// 	Bottom.init();
// 	Middle.Scroll();
// 	//底部关闭模块
// 	$(".resize").click(function () {
// 		var ModuleObj = $("#Module"), ChartObj = $("article .chart");
// 		if (ModuleObj.height() > 1) {
// 			ChartObj.stop().animate({ height: ChartObj.height() + 74 }, "slow");
// 			ModuleObj.stop().animate({ height: "1px" }, "slow");
// 			$("article .middle").stop().animate({ height: 422 }, "slow");
// 			$("article .middle .alert").stop().animate({ height: 379 }, "slow");
// 		}
// 		else {
// 			ChartObj.stop().animate({ height: ChartObj.height() - 74 }, "slow");
// 			ModuleObj.stop().animate({ height: "75px" }, "slow");
// 			$("article .middle").stop().animate({ height: 348 }, "slow");
// 			$("article .middle .alert").stop().animate({ height: 305 }, "slow");
// 		}
// 	});
// 	//五分钟自动刷新数据
// 	window.setInterval("Head.Data.set()", 300000);
// });

// 全局拖动事件处理
$(document).bind("swipe", function () {
	_isTouchMove = true;
});
// 全局点击事件处理
$(document).bind("click", function () {
	_isTouchMove = false;
});

var Middle = {
	ScrollNum: 0,
	Scroll: function () {
		ScrollX = -$("article .middle dt dl:nth-child(1)").width();
		if (ModuleScroll != null) {
			ModuleScroll.destroy();
		}
		ModuleScroll = new iScroll('Middle', {
			hScrollbar: false,
			vScroll: false,
			x: ScrollX,
			lockDirection: "left/right",
			onScrollStart: function () {
				Head.setMore("none"); //关闭商场选择
			},
			onScrollEnd: function () {
				
//				Middle.ScrollNum += this.dirX;
//				alert("ceshiDir"+this.dirX);
//				if (Middle.ScrollNum < 0) {
//					Middle.ScrollNum += UserModule.length;
//				}
//				alert("Middle_scrollNum"+Middle.ScrollNum);
//				alert("userModule"+UserModule.length);
//				
//				Middle.ScrollNum = Middle.ScrollNum % UserModule.length;
//				viewModule = UserModule[Middle.ScrollNum];
//				alert("viewModule"+viewModule);
//				if(viewModule == "undefined") {
//					viewModule = "XSMK";
//				}
				
				if(this.dirX == "-1") {
					viewModule = "XSMK";
				}else if (this.dirX == "1") {
					viewModule = "KLMK"
				}else{
					viewModule = "XSMK";
				}
				switch (viewModule) {
					case "XSMK":			
						$("article .detail ul .SZ").flipCounter("stopAnimation");
						var cls = $("#Module ul li[modulename='XSMK'] img").attr('class');
						if(cls == "active"&&First>0) {    //非首次运行页面
							TrafficView.init(true);							
							return;
						}
						SalesView.init(true);
						First++;
						break;
					case "KLMK":
						$("article .detail ul .SZ").flipCounter("stopAnimation");
						var cls = $("#Module ul li[modulename='KLMK'] img").attr('class');
						if(cls == "active") {
							SalesView.init(true);
							return;
						}
						TrafficView.init(true);
						break;
//					case "YJMK":
//						$("article .detail ul .SZ").flipCounter("stopAnimation");
//						AlertView.init(true);
//						break;
					default:
						break;
				}
				//update jason --2014/10/30
				// Middle.Scroll();
//				SalesView.init(true);
				// 滚动底部缩略图到指定位置
				var el = "li[ModuleName='XSMK']";
//				var el = "li[ModuleName='" + viewModule + "']";
				console.log(el);
//				BottomScroll.scrollToElement(el, 500);
			}
		});
	}
};

var Head = {
	setCountry: function () {
		$.jsonp({
			url: _remoteServiceUrl + "/ProjectJsonP.axd",
			callbackParameter: "callback",
			data: {
				userName: Global.userAccount,
				action: "GetCountryList"
			},
			success: function (countryList) {
				CountryArr = countryList;
				$.each(countryList,function (index, domEle) {
                    	$("<li>", {
                    		html: '<img src="' + domEle.ImageUrl + '" />',
                    		click: function () {
                    			CountryId = domEle.Id;
                    			CountryName = domEle.Name;
                    			$("#CountryTitle").text(CountryName);
                    			$("#CountryImage").attr("src", domEle.ImageUrl);

                    			$("#Area .Country ul").hide();
                    			$("#Area .AreaList ul li").remove(); //重新选择国家时，区域重新绑定
                    			Head.setArea();
                    		}
                    	}).appendTo("#Area .Country ul");
                    	
						// 当首次加载时
                    	if (CountryId == null && index == 0) {
                    		CountryId = domEle.Id;
                    		CountryName = domEle.Name;
                    		$("#CountryImage").attr("src", domEle.ImageUrl);
//                  		SalesView.init(true);
                    		Head.setArea();
                    	}
                    	else if (CountryId == domEle.Id) {
                    		Head.setArea();
                    	}
                    });
			},
			fail: function (e) {
				alert("网络问题或者后台问题，请重试！");
			}
		});

		$("#CountryImage").click(function () {
			var HideObj = $("#Area .Country ul");
			if (HideObj.css("display") == "none") {
				HideObj.show();
			}
			else {
				HideObj.hide();
			}
		});
	},

	setArea: function () {
        /*
		$("<li>", {
			text: CountryName,
			click: function () {
				viewType = "Country";
				$("#CountryTitle").text(CountryName);
				$(this).parent().children().removeClass("on");
				$(this).addClass("on");
				Head.Data.set();
			}
		}).appendTo("#Area .AreaList ul");
         */
		$.jsonp({
			url: _remoteServiceUrl + "/ProjectJsonP.axd",
			callbackParameter: "callback",
			data: {
				userName: Global.userAccount,
				action: "GetAreaListByCountry",
				countryId: CountryId
			},
			success: function (AreaList) {
				AreaArr = AreaList;
				$.each(AreaList,
                    function (index, domEle) {
                    	$("<li>", {
                    		text: domEle.Name,
                    		click: function () {
                    			AreaId = domEle.Id;
                    			AreaName = domEle.Name;
                    			//$("#CountryTitle").text(domEle.Name);

                    			$(this).parent().children().removeClass("on");
                    			$(this).addClass("on");
                    			$("#mall ul li").remove(); //重新选择区域时，商场重新绑定

                    			Head.setMall();
                    		}
                    	}).appendTo("#Area .AreaList ul");
                    	if (AreaId == null && index == 0) {
                    		AreaId = domEle.Id;
                    		AreaName = domEle.Name;
                    		$("#Area .AreaList ul li").first().addClass("on");
                    		Head.setMall();
                    	}
                    	else if (AreaId == domEle.Id) {
                    		Head.setMall();
                    	}
                    }
				);
			}
		});
	},

	setMall: function () {
		$("<li>", {
			html: "<img src='Common/images/Area/" + AreaId + ".png' title='区域选择' height='65'/>",
			click: function () {
				viewType = "Area";
				$("#CountryTitle").text(AreaName);

				$(this).parent().children().removeClass("on");
				$(this).addClass("on");
				Head.Data.set();
			}
		}).appendTo("#mall ul");

		$.jsonp({
				url: _remoteServiceUrl + "/ProjectJsonP.axd",
				callbackParameter: "callback",
				data: {
					userName: Global.userAccount,
					action: "GetProjectListByArea",
					areaId: AreaId
				},
				success: function (MallList) {
					MallArr = MallList;
					$.each(
						MallList,
						function (index, domEle) {
                    		$("<li>", {
                    			html: "<img src='"+_remoteServiceUrl+"/layouts/" + domEle.ImageUrl + "' height='65' title='" + domEle.Name + "' />",
                    			click: function () {
                    				if (_isTouchMove === true) {
                    					return;
                    				}
                    				viewType = "Mall";
                    				MallId = domEle.ProjectId;
                    				MallName = domEle.Name;
                    				$("#CountryTitle").text(MallName);

                    				$(this).parent().children().removeClass("on");
                    				$(this).addClass("on");
                    				Head.Data.set();
                    			}
                    		}).appendTo("#mall ul");
                    	}
					);
					
					/*****重新计算商场滚动开始******/
					$("#mall ul").width(MallArr.length * 100 + 100);
					if (mallScroll != null) {
						mallScroll.destroy();
					}
					mallScroll = new iScroll('mall', { hScrollbar: false, vScroll: false, lockDirection: "left/right" });
					/*****重新计算商场滚动结束*******/
					//首次数据加载
					if (FirstLoad) {
						FirstLoad = false;
//						viewType = "Country";
						Head.Data.init();
//						alert("首次开始295");
					}
				}
			}
		);
	},

	setMore: function (Display) {
		var MallObj = $("header .mall");
		if (MallObj.height() > 1 || Display == "none") {
			$("#Area .Country ul").hide(); //关闭国家选择
			$("#MallMore").attr("src", "images/mall_close.png");
			//MallObj.slideDown("slow");
			MallObj.animate({ height: "1px" }, "slow");
		}
		else {
			$("#MallMore").attr("src", "images/mall_open.png");
			//MallObj.slideUp("slow");
			MallObj.animate({ height: "115px" }, "slow");
		}
	},
	
	Data: {
		init: function () {
			console.log("datainit");
			if (AreaArr.length == 1 && MallArr.length == 1) {
//				alert(1);
				viewType = "Mall";
				MallId = MallArr[0].ProjectId;
				MallName = MallArr[0].Name;
				$("#CountryTitle").text(MallName);
				this.set();
			}
			else if (CountryArr.length == 1 && AreaArr.length == 1) {
//				alert(2);
				viewType = "Area";
				AreaId = AreaArr[0].Id;
				AreaName = AreaArr[0].Name;
				$("#CountryTitle").text(AreaName);
				this.set();
			}
			else {
//				alert(3);
				viewType = "Country";
				CountryId = CountryArr[0].Id;
				CountryName = CountryArr[0].Name;
				$("#CountryTitle").text(CountryName);
				this.set();
			}
		},
		
		set: function () {
			console.log("dataSet");
			Head.setMore("none");
			if (viewModule == "XSMK") {
				console.log("运行图表界面");
				SalesView.init();
			}
			else if (viewModule == "KLMK") {
				TrafficView.init();
			}
			else if (viewModule == "YJMK") {
				AlertView.init();
			}else {
				console.log("否则运行图表界面");
				SalesView.init();
			}
		}
	}
};

var Bottom = {
	init: function () {
		$.jsonp({
			url: _remoteServiceUrl + "/MiscJsonP.axd",
			callbackParameter: "callback",
			data: {
				userName: Global.userAccount,
				action: "GetUserModule"
			},
			success: function (UserModuleArr) {
				$.each(UserModuleArr.split(","), function (index, Module) {
					switch (Module) {
						case "XSMK":
							$("<li>", { ModuleName: "XSMK", html: '<img src="Common/images/chart-thumb-sales.png" height="60" align="middle" onclick="SalesView.init()" />' }).appendTo("footer .bottom ul");
							UserModule.push(Module);
							console.log("module1"+Module);
							break;
						case "KLMK":
							$("<li>", { ModuleName: "KLMK", html: '<img src="Common/images/chart-thumb-traffic.png" height="60" align="middle" onclick="TrafficView.init()"/>' }).appendTo("footer .bottom ul");
							UserModule.push(Module);
							console.log("module2"+Module);
							break;
						default:
							break;
							/*
						case "YJMK":
							$("<li>", { ModuleName: "YJMK", html: '<img src="Common/images/chart-thumb-alert.png" height="60" align="middle" onclick="AlertView.init()" />' }).appendTo("footer .bottom ul");
							UserModule.push(Module);
							break;
							*/
					}
				});
				// $("#Module ul").width(UserModule.length * 165);
				$("#Module ul li img").removeClass("active");
				$("#Module ul li[ModuleName=" + viewModule + "] img").addClass("active");
				if (BottomScroll != null) {
					BottomScroll.destroy();
				}
				BottomScroll = new iScroll(
						'Module',
						{
							snap: true,
							hScrollbar: false,
							vScroll: false,
							lockDirection: "left/right"
						});
			},
			fail: function(e) {
				alert("网络或者后台出现问题！");
			}
		}
		);
	}
};
