/**
 * phoneGap js with native api
 *
 * @author yangkun
 * @date 2013-9-30
 */

// Call onDeviceReady when Cordova is loaded.
//
// At this point, the document has loaded but cordova-2.5.0.js has not.
// When Cordova is loaded and talking with the native device,
// it will call the event `deviceready`.
//
function onLoad() {
		document.addEventListener("deviceready", onDeviceReady, false);
		init();
	}
	/**
	 * phoneGap js with native api
	 *
	 * @author duwei
	 * @date 2013-10-09
	 */
function onDeviceReady() {
	// 注册回退按钮事件监听器
	document.addEventListener("backbutton", onBackKeyDown, false);
	PhoneGapAPI.getLoginUserInfo();
}

/**
 * android返回键处理
 *
 * @author duwei
 * @date 2013-10-09
 */
function onBackKeyDown() {
	PhoneGapAPI.exit();
}
var Global = {
	/*
	 * _globleParam_countryCode :全局变量 ，记录检查项编码 _globleParam_checkItemCode :全局变量
	 * ，记录检查项编码 _globleParam_floorName :全局变量 ，记录检查点编码 _globleParam_pointCode
	 * :全局变量 ，记录检查点编码 _globleParam_pointName :全局变量 ，记录检查点名称
	 * _globleParam_marketCode :全局变量 ，记录商场ID _globleParam_userName :
	 * 全局变量，记录用户账户名 _globleParam_userToken : 全局变量，记录Token值
	 * _globleParam_checkPointType :
	 * 用于在用户在checkpointview上点击不同的按钮时，取哪一个localstorage的值 _globleParam_telephone :
	 * 商场经理的电话 _globleParam_numberCode : _globleParam_floorCode : 楼层编码
	 *
	 */
	userAccount: "dc\\huangcheng1",
	userToken: "R3TWGNeql8k3bamyXzhURhwbbIxi6z56",
	// liuyifei pwd:simon_401a
	// AppTestUser15 pwd:p@ssword123
	userPwd: "hc@12345",
	appID: '',
	deviceType: '',
	longitude: '',
	latitude: '',
	pushFlag: '',
	inboxUnreadCnt: -1,
	height: '',
	SalesViewChartHeight: 192,
	TrafficViewChartHeight: 182,
	screenWidth: '',
	screenHeight: '',
	anmationIfOne: 414,
	anmationIfTwo: 378,
	anmationElseOne: 342,
	salesViewChartH2: 264,
	trafficChartH2: 254

}

var PhoneGapAPI = {
	/**
	 * 退出程序
	 */
	exit: function() {
		Cordova.exec(null, null, "Application", "exit", [Global.inboxUnreadCnt, -1, "no", Global.appID]);
		// 此处加上退出App的逻辑 ， 待API提供中
		// window.localStorage.clear();
	},
	/**
	 * 获取登录用户信息
	 * @param callback
	 */
	getLoginUserInfo: function() {
		Cordova.exec(function(result) {
			var userName = result.userName;
			if (userName.indexOf("dc\\") < 0) {
				userName = "dc\\" + result.userName;
			}
			Global.userAccount = userName;
			Global.userToken = result.userToken;
			Global.userPwd = result.userPassword;
			Global.appID = result.appID;
			Global.deviceType = result.device;
			Global.longitude = result.longitude;
			Global.latitude = result.latitude;
			Global.pushFlag = result.pushFlag;
			init();
		}, function(fail) {
			alert("原生返回错误");
		}, "UserInfo", "GetUserInfo", []);
	}
};

function ScreenAdapt() {
	Global.screenHeight = window.innerHeight + 19;
	Global.screenWidth = window.innerWidth;
	$("body").width(Global.screenWidth);
	$("article .middle dt").width(Global.screenWidth);
	$("article .middle dt dl").width(Global.screenWidth - 20);
	var articleHeight = Global.screenHeight - 139;
	$("article .middle").height(articleHeight);
	Global.SalesViewChartHeight = Global.screenHeight - 288;
	Global.TrafficViewChartHeight = Global.screenHeight - 298;
	Global.anmationIfOne = Global.screenHeight - 64;
	Global.anmationIfTwo = Global.screenHeight - 100;
	Global.anmationElseOne = Global.screenHeight - 138;
	Global.salesViewChartH2 = Global.screenHeight - 216;
	Global.trafficChartH2 = Global.screenHeight - 226;
}