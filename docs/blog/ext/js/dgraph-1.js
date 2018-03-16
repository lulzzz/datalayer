// ------

var DGraph1 = function() {
	function t() {
		DGraph1.Util.runIfClassNamePresent("page-home", e)
	}
	function e() {
		DGraph1.Util.isMobile ? DGraph1.Home.mobileHero() : DGraph1.Nodes.init()
	}
	return {
		initialize : t
	}
}(), DGraph1 = DGraph1 || {};

// ------

!function() {
	function t(t, e) {
		var n = document.getElementsByClassName(t);
		n.length > 0 && e()
	}
	var e = function() {
		return navigator.userAgent.match(/Android/i)
				|| navigator.userAgent.match(/webOS/i)
				|| navigator.userAgent.match(/iPhone/i)
				|| navigator.userAgent.match(/iPod/i)
				|| navigator.userAgent.match(/BlackBerry/i)
				|| navigator.userAgent.match(/Windows Phone/i) ? !0 : !1
	}();
	DGraph1.Util = {}, DGraph1.Util.isMobile = e, DGraph1.Util.runIfClassNamePresent = t
}();

//------

var DGraph1 = DGraph1 || {};

//------

!function() {
	function t() {
		var t = document.getElementById("jumbotron");
		t.className = t.className + " mobile-hero"
	}
	DGraph1.Home = {}, DGraph1.Home.mobileHero = t
}();

//------

var DGraph1 = DGraph1 || {};

//------

!function() {
	function t(t) {
		for (var e = f[t], i = g.select("#id_" + e.index).classed(
				"active linkgroup_" + d, !0), r = {}, o = [], s = 0; s < f.length; s++)
			if (s != t) {
				var a = f[s];
				var l = g.select("#id_" + s);
				var h = l.attr("cx") - i.attr("cx");
                var u = l.attr("cy") - i.attr("cy");
                var c = Math.sqrt(h * h + u * u);
				c in r ? r[c].push(a) : r[c] = [ a ], o.push(c)
			}
		for (o.sort(d3.ascending), s = 0; 3 > s; s++) {
			var c = o[s], a = r[c].pop(), p = {
				source : e,
				target : a
			};
			m.push(p)
		}
		n()
	}
	function e() {
		y.attr("x1", function(t) {
			return t.source.x
		}).attr("y1", function(t) {
			return t.source.y
		}).attr("x2", function(t) {
			return t.target.x
		}).attr("y2", function(t) {
			return t.target.y
		}), v.attr("cx", function(t) {
			return t.x
		}).attr("cy", function(t) {
			return t.y
		})
	}
	function n() {
		v = v.data(f), v.enter().insert("circle", ".cursor").attr("class",
				"node").attr("r", 12).attr("id", function(t, e) {
			return "id_" + e
		}).call(p.drag), y = y.data(m), y.enter().insert("line", ".node").attr(
				"class", "link active linkgroup_" + d), p.start(), r(d), d++
	}
	function r(t) {
		setTimeout(o, 700, t)
	}
	function o(t) {
		g.selectAll(".linkgroup_" + t).classed("active", !1)
	}
	function s() {
		var t = document.getElementById("node-canvas-1");
		wW = window.innerWidth, t.style.left = (wW - l) / 2 + "px"
	}
	function a() {
		for (n(), i = 0; c > i; i++)
			setTimeout(t, 700 * i + 1e3, i)
	}
	var l = 1400, h = 400, u = 50, c = 128, d = 0, f = [];
	for (i = 0; c > i; i++)
		f.push({
			x : Math.random() * (l - u) + u / 2,
			y : Math.random() * (h - u) + u / 2
		});
	d3.scale.category20();
	var p = d3.layout.force().size([ l, h ]).nodes(f).linkDistance(60).charge(
			-1).gravity(4e-4).on("tick", e), g = d3.select("#dgraph-1")
			.append("svg").attr("id", "node-canvas-1").attr("width", l).attr(
					"height", h);
	s(), g.append("rect").attr("width", l).attr("height", h);
	var f = p.nodes(), m = p.links(), v = g.selectAll(".node"), y = g
			.selectAll(".link");
	g.append("circle").attr("r", 30).attr("transform", "translate(-100,-100)")
			.attr("class", "cursor"), window.onresize = function() {
		s()
	}, DGraph1.Nodes = {}, DGraph1.Nodes.init = a
}();

//------
