var SalesView = {
	init: function (force) {
		if (!force && _isTouchMove === true) {
			return;
		}
		viewModule = "XSMK";
		$("article .detail ul .SZ").stop().flipCounter("stopAnimation");
		$("article .middle dt dl:nth-child(2)").children().remove();

		$("<div>", { "class": "detail", html: "<div style='text-align:center'><img src='Common/images/loading.gif' /></div>" }).appendTo("article .middle dt dl:nth-child(2)");
		this.setDetail();
		$("<div>", { "class": "chart", id: "SalesChart", style: "height:" + ($("#Module").height() > 1 ? Global.SalesViewChartHeight : Global.salesViewChartH2) + "px" }).appendTo("article .middle dt dl:nth-child(2)");
//		alert(2);
		this.setChart();
		// 设置选择模块样式
		$(".bottom ul li img").removeClass("active");
		$(".bottom ul li[ModuleName=" + viewModule + "] img").addClass("active");
	},

	setDetail: function () {
		$.jsonp({
			url: this.getParameter("Detail"),
			callbackParameter: "callback",
			success: function (DataList) {
				$("article .detail").text("");
				$("article .detail div").remove(); //删除加载进度
				$("<ul>").appendTo("article .detail");
				$("<li>", { text: "当日销售（RMB）", "class": "DR" }).appendTo("article .detail ul");
				$("<li>", { "class": "SZ" }).appendTo("article .detail ul").flipCounter(
					"startAnimation", {
						digitHeight: 36,
						digitWidth: 27,
						easing: jQuery.easing.easeOutCubic,
						formatNumberOptions: { format: "#,##0", locale: "cn" },
						number: parseInt(DataList.SumNetAmtLast5Min),
						end_number: parseInt(DataList.SumNetAmt) + 0.002,
						duration: 300000
					}
				);
				$("<li>", {
					"class": "JY",
					html: "<strong>交易笔数:</strong><font>" + $.formatNumber(DataList.NetQty, { format: "#,##0", locale: "cn" }) + "</font>"
				}).appendTo("article .detail ul");
				$("<li>", {
					"class": "PJ",
					html: "<strong>平均单价:</strong><font>" + $.formatNumber(DataList.DocPrice, { format: "#,##0.00", locale: "cn" }) + "</font>"
				}).appendTo("article .detail ul");
			},
			fail:function(e) {
				alert("网络或者后台出现问题！");
			}
		});
	},

	setChart: function () {
		$.jsonp({
			url: this.getParameter("Chart"),
			callbackParameter: "callback",
			success: function (dataXml) {
//				alert(4);
				var chartId = "DY2D" + new Date().getTime();
				var chart = new FusionCharts("MSCombi2D", chartId, "100%", "100%", 0, 1);
				chart.setDataXML(dataXml);
				chart.render("SalesChart");
			},
			fail:function(e) {
				alert("网络或者后台出现问题！");
			}
		});
	},

	getParameter: function (sType) {
		if (sType == "Detail") {
			switch (viewType) {
				case "Country":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetSalesYtyByCountry&countryId=" + CountryId;
				case "Area":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetSalesYtyByArea&areaId=" + AreaId;
				case "Mall":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetSalesYtyByMall&mallId=" + MallId;
			}
		}
		else if (sType == "Chart") {
			switch (viewType) {
				case "Country":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeSalesChart&countryId=" + CountryId;
				case "Area":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeSalesChart&areaId=" + AreaId;
				case "Mall":
					return _remoteServiceUrl + "/SalesJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeSalesChart&mallId=" + MallId;
			}
		}

		return null;
	}
};