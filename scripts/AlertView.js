var AlertView = {
	init: function (force) {
		if (!force && _isTouchMove === true) {
			return;
		}
		viewModule = "YJMK";
		$("article .detail ul .SZ").stop().flipCounter("stopAnimation");
		$("article .middle dt dl:nth-child(2)").children().remove();

		$("<div>", { "class": "detail alert", html: "<div style='text-align:center'><img src='Common/images/loading.gif' /></div>" }).appendTo("article .middle dt dl:nth-child(2)");
		this.setDetail();

		// 设置选择模块样式
		$(".bottom ul li").removeClass("active");
		$(".bottom ul li[ModuleName=" + viewModule + "]").addClass("active");
	},

	setDetail: function () {
		var projectId = null;
		switch (viewType) {
			case "Country":
				projectId = CountryId;
				break;
			case "Area":
				projectId = AreaId;
				break;
			case "Mall":
				projectId = MallId;
				break;
		}

		$.jsonp({
			url: _remoteServiceUrl + "/AlertJsonP.axd",
			callbackParameter: "callback",
			data: {
				userName: Global.userAccount,
				action: "GetAlertNotice",
				viewType: viewType,
				projectId: projectId
			},
			success: function (jsonData) {
				// 删除加载进度
				$("article .detail div").remove();

				$("<ul>").appendTo("article .detail");

				$.each(jsonData, function (i, item) {
					$("<div>", {
						"class": "max",
						html: function () {
							var html = '<div class="img"><img src="Common/images/AlertSystem/' + item.SystemImage + '" align="middle" width="70"  height="55" /></div>';
							html += '<div class="cont">' + item.NoticeContent + '<font>' + item.NoticeTime + '</font></div>';

							return html;
						}
					}).appendTo("article .detail ul");
				});

				if (AlertView._alertMsgInterval != null) {
					clearInterval(AlertView._alertMsgInterval);
				}
				AlertView._alertMsgInterval = setInterval("AlertView.msgMove()", 2000);
			}
		});
	},

	_alertMsgInterval: null,

	// 滚动信息
	msgMove: function () {
		$(".max:last").css("display", "none");
		$(".max:first").before($(".max:last"));
		$(".max:first").slideDown(1000);
	}
};
