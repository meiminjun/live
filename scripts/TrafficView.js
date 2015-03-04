var TrafficView = {
	init: function (force) {
		if (!force && _isTouchMove === true) {
			return;
		}

		viewModule = "KLMK";
		$("article .detail ul .SZ").stop().flipCounter("stopAnimation");
		$("article .middle dt dl:nth-child(2)").children().remove();

		$("<div>", { "class": "detail", html: "<div style='text-align:center'><img src='Common/images/loading.gif' /></div>", style: "height:115px" }).appendTo("article .middle dt dl:nth-child(2)");
		this.setDetail();
		//modified by minjun on 2014/10.13.
		// var chartHeight;
		// if (window.innerHeight>=500&&window.innerHeight<600) { 
		// 	chartHeight = 342;
		// }else if (window.innerHeight>600) {
		// 	chartHeight = 441;
		// }else{
		// 	chartHeight = 254;
		// }
		$("<div>", { "class": "chart", id: "TrafficChart", style: "height:" + ($("#Module").height() > 1 ? Global.TrafficViewChartHeight : Global.trafficChartH2) + "px" }).appendTo("article .middle dt dl:nth-child(2)");
		this.setChart();
		
		// 设置选择模块样式
		$(".bottom ul li img").removeClass("active");
		$(".bottom ul li[ModuleName=" + viewModule + "] img").addClass("active");
	},

	setDetail: function () {
		$.jsonp({
			url: TrafficView.getParameter("Detail"),
			callbackParameter: "callback",
			success: function (DataList) {
				$("article .detail").text("");
				$("article .detail div").remove(); //删除加载进度
				$("<ul>").appendTo("article .detail");
				$("<li>", { text: "当日客流", "class": "DR" }).appendTo("article .detail ul");
				
				var TrafficData = {
					CountLast5Min: parseInt(DataList.TrafficCountLast5Min == null || DataList.TrafficCountLast5Min == undefined ? DataList.xf_Traffic_Count_last5min : DataList.TrafficCountLast5Min),
					Count: parseInt(DataList.TrafficCount == null || DataList.TrafficCount == undefined ? DataList.xf_Traffic_Count : DataList.TrafficCount) + 0.002,
					Avg: $.formatNumber(DataList.TrafficAvg == null || DataList.TrafficAvg == undefined ? DataList.xf_Traffic_AVG : DataList.TrafficAvg, { format: "#,##0", locale: "cn" }),
					Percent: $.formatNumber(DataList.TrafficPercent == null || DataList.TrafficPercent == undefined ? DataList.xf_Traffic_Percent : DataList.TrafficPercent, { format: "0.00", locale: "cn" }),
					Max: $.formatNumber(DataList.TrafficMax == null || DataList.TrafficMax == undefined ? DataList.xf_Traffic_MAX : DataList.TrafficMax, { format: "#,##0", locale: "cn" }),
					Stay: $.formatNumber(DataList.TrafficStay == null || DataList.TrafficStay == undefined ? DataList.xf_Traffic_Stay : DataList.TrafficStay, { format: "#,##0", locale: "cn" })
				};
				$("<li>", { "class": "SZ" }).appendTo("article .detail ul").flipCounter(
					"startAnimation", {
						digitHeight: 36,
						digitWidth: 27,
						easing: jQuery.easing.easeOutCubic,
						formatNumberOptions: { format: "#,##0", locale: "cn" },
						number: TrafficData.CountLast5Min,
						end_number: TrafficData.Count,
						duration: 600000
					}
				);
				$("<li>", {
					"class": "TB",
					html: function () {
						var Html = "<strong>同比增长:</strong><font>" + TrafficData.Avg + "(" + TrafficData.Percent + "%)";
						if (parseFloat(TrafficData.Percent) >= 0) {
							Html += "&nbsp;";
						}
						Html += "</font>";
						return Html;
					}
				}).appendTo("article .detail ul");
				$("<li>", {
					"class": "JY",
					html: "<strong>峰值流量:</strong><font>" + TrafficData.Max + "</font>"
				}).appendTo("article .detail ul");
				$("<li>", {
					"class": "PJ",
					html: "<strong>滞 留 量:</strong><font>" + TrafficData.Stay + "</font>"
				}).appendTo("article .detail ul");
			},
			fail:function(e) {
				alert("网络或者后台出现问题！");
			}
		});
	},

	setChart: function () {
		$.jsonp({
			url: TrafficView.getParameter("Chart"),
			callbackParameter: "callback",
			success: function (dataXml) {
				var chartId = "DY2D" + new Date().getTime();
				var chart = new FusionCharts("MSCombi2D", chartId, "100%", "100%", 0, 1);
				chart.setDataXML(dataXml);
				chart.render("TrafficChart");
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
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetTrafficYtyByCountry&countryId=" + CountryId;
				case "Area":
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetTrafficYtyByArea&areaId=" + AreaId;
				case "Mall":
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetTrafficYtyByMall&mallId=" + MallId;
			}
		}
		else if (sType == "Chart") {
			switch (viewType) {
				case "Country":
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeTraffice&countryId=" + CountryId;
				case "Area":
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeTraffice&areaId=" + AreaId;
				case "Mall":
					return _remoteServiceUrl + "/TrafficJsonP.axd?userName=" + Global.userAccount + "&action=GetIPhoneTimeTraffice&mallId=" + MallId;
			}
		}

		return null;
	}
};