(function(f, y, R) {
	function fa() {
		p = [];
		d = null;
		z = !1;
		w = A[~~ (A.length * Math.random())];
		u && (w = A[ga(u) % A.length]);
		console.log("Connecting to " + w);
		v = new WebSocket(w, document.domain);
		v.binaryType = "arraybuffer";
		(v.onopen = function(a) {
			k = [];
			S = 0;
			null != d && (T = d.x);
			z = !0;
			console.log("Socket connected");
			D()
		},
		v.onmessage = function(a) {
			a = a.data;
			switch ((new DataView(a)).getUint8(0)) {
			case 0:
				E = (new DataView(a)).getUint32(1, !0);
				d = U(E, [], "");
				p.push(d);
				u && ha(u);
				D();
				break;
			case 2:
				a = new DataView(a);
				ia = a.getUint32(1, !0);
				for (var g = a.getUint32(5, !0), c = 9, b = 0; b < g; b++) {
					for (var l = a.getUint32(c, !0), c = c + 4, x = "";;) {
						var q = a.getUint8(c++);
						if (0 == q) break;
						x += String.fromCharCode(q)
					}
					for (var q = [], f = a.getUint16(c, !0), c = c + 2, h = 0; h < f; h++) q.push(a.getUint16(c, !0)),
					c += 2;
					f = -1 != r.indexOf(l);
					(W()) && !f && 10 > q.length && 100 < p.length + F.length || l == E || X() && f || (l = U(l, q, x), l.isParty = f, F.push(l))
				}
				break;
			case 3:
				a = new DataView(a);
				g = 1;
				c = a.getUint32(g, !0);
				g += 4;
				for (b = 0; b < c; b++) k.push(new ja(k.length, a.getInt32(g + 0, !0), a.getInt32(g + 4, !0))),
				g += 8;
				break;
			case 4:
				if (X()) for (a = new DataView(a), g = a.getUint16(1, !0), c = 3, b = 0; b < g; b++) {
					l = a.getUint32(c, !0);
					c += 4;
					for (x = "";;) {
						q = a.getUint8(c++);
						if (0 == q) break;
						x += String.fromCharCode(q)
					}
					for (var h = a.getUint16(c, !0), c = c + 2, q = a.getUint16(c, !0), c = c + 2, f = [], m = 0; m < h; m++) f.push(a.getUint16(c, !0)),
					c += 2;
					l != E && (L[l] = x, h = J[l], null == h || h.maxPlayback > q || -1 == h.maxPlayback ? (null != h && (h.maxPlayback = -1), h = U(l, f, x), h.maxPlayback = q, h.isParty = !0, J[l] = h, p.push(h)) : (h.jumps = h.jumps.concat(f), h.maxPlayback = q))
				}
				break;
			case 5:
				a = new DataView(a);
				g = a.getUint16(1, !0);
				c = [];
				for (b = 0; b < g; b++) l = a.getUint32(3 + 4 * b, !0),
				c.push(l);
				console.log("got party " + c);
				ka(c);
				break;
			case 6:
				a = new DataView(a),
				M = a.getUint32(1, !0),
				G = a.getInt32(5, !0),
				M == E && (N = "祝贺你，获得最好分! 你获得一个皇冠!")
			}
		},
		v.onclose = function() {
			console.log("Server " + w + " closed the connection");
			z = !1;
			setTimeout(fa, 1E3)
		})
	}
	function la() {
		Y = !0;
		Z = +new Date;
		var a = 1 + Math.ceil(F.length / 4);
		a > F.length && (a = F.length);
		for (; a--;) p.push(F.shift());
		for (a = 0; a < p.length; a++) p[a].think()
	}
	function ma() {
		0 == H && (H = +new Date);
		for (var a = 0; H <= +new Date;) {
			++a;
			if (30 <= a) break;
			la();
			H += 1E3 / 60
		}
		30 <= a && (H = +new Date + 1E3 / 60)
	}
	function na() {
		ma();
		if (Y && 0 != h.width) {
			++$;
			b.font = "10px sans-serif";
			Z = +new Date;
			b.clearRect(0, 0, m.width, m.height);
			oa.width && b.drawImage(oa, 0, 0, 1, 1, 0, 0, 1, 1);
			var a = null != d ? d.x - 100 : 0;
			n = 0 == n ? a : Math.round((n + a) / 2);
			for (a = -(Math.floor(n / 2) % 288); a < m.width;) b.drawImage(h, 0, 0, 288, 512, a, 0, 288, 512),
			a += 288;
			b.save();
			b.translate(-n, 0);
			for (a = 0; a < k.length; a++) k[a].draw();
			b.restore();
			0 != G && (b.save(), b.translate(-n, 0), b.globalAlpha *= 0.75, b.drawImage(h, 0, 564, 34, 72, G - 34, 330, 34, 72), b.globalAlpha /= 0.75, b.textAlign = "right", O("最高分", G, 325), b.restore());
			for (a = -(Math.floor(n) % 336); a < m.width;) b.drawImage(h, 584, 0, 336, 111, a, 401, 336, 111),
			a += 336;
			var g = 0;
			b.save();
			b.translate(-n, 0);
			28 <= aa ? (t += 10, 1E3 < t && (t = 1E3)) : (t -= 10, 20 > t && (t = 20));
			W() && 20 < t && (t = 20);
			var c = t;
			c = 20;
			for (a = 0; a < p.length && (p[a] == d || g > c && !p[a].isParty || !(p[a].draw() && ++g > c) || !(2 > r.length)); ++a);
			null != d && d.draw();
			b.restore();
			b.save();
			b.translate(-n, 0);
			for (a = 0; a < k.length; a++) k[a].drawOverlay();
			b.restore();
			N && z && (b.save(), K || (K = new I), K.setString(N), a = K.width, b.fillStyle = "rgba(0,0,0,0.5)", b.fillRect(m.width / 2 - a / 2 - 4, 200, a + 8, 18), b.textAlign = "center", b.fillStyle = "#FFF", K.render(m.width / 2, 212, !0), b.restore());
			xa();
			Y = !1
		}
		f.requestAnimationFrame(na)
	}
	function xa() {
		function a(a, g) {
			if (! (c > m.width)) {
				b.save();
				b.translate(c, e);
				b.fillStyle = "rgba(0,0,0,0.5)";
				a.setString(g);
				var d = a.width + 10;
				b.fillRect(0, 0, d, 14);
				a.render(5, 11, !1);
				b.restore();
				c += d + 5
			}
		}
		if (0 == s.length) for (var g = 0; 7 > g; g++) s.push(new I);
		b.save();
		var c = 5,
		e = m.height - 18 - 27;
		b.font = "14px sans-serif";
		(function() {
			if (z) {
				if (null != d) {
					b.save();
					b.translate(c, e);
					b.fillStyle = "rgba(0,0,0,0.5)";
					s[6].font = "14px sans-serif";
					s[6].setString(d.nick || "你");
					var a = s[6].width + 50;
					b.fillRect(0, 0, a, 18);
					b.drawImage(h, 230, 762, 34, 24, 0, -4, 34, 24);
					s[6].render(40, 14, !1);
					b.restore();
					c += a + 5
				}
				for (var g = 0, f = 0; f < r.length; f++) if (r[f] != E) if (a = r[f], L[a]) {
					b.save();
					b.translate(c, e);
					b.fillStyle = "rgba(0,0,0,0.5)";
					b.font = "14px sans-serif";
					var k = L[a] || "",
					a = k ? b.measureText(k).width + 50 : 34;
					b.fillRect(0, 0, a, 18);
					b.drawImage(h, 174, 982, 34, 24, 0, -4, 34, 24);
					b.textAlign = "left";
					O(k, 40, 14);
					b.restore();
					c += a + 5;
					if (c > m.width) return
				} else++g;
				if (0 < g && (b.save(), b.translate(c, e), b.fillStyle = "rgba(0,0,0,0.5)", b.font = "14px sans-serif", a = (k = "x" + g) ? b.measureText(k).width + 50 : 34, b.fillRect(0, 0, a, 18), b.drawImage(h, 174, 982, 34, 24, 0, -4, 34, 24), b.textAlign = "left", O(k, 40, 14), b.restore(), c += a + 5, c > m.width)) return;
				g = ia;
				g = 0 == r.length ? g - 1 : g - r.length;
				0 < g && (b.save(), b.translate(c, e), b.fillStyle = "rgba(0,0,0,0.5)", b.font = "14px sans-serif", a = (k = "x" + g) ? b.measureText(k).width + 50 : 34, b.fillRect(0, 0, a, 18), b.drawImage(h, 6, 982, 34, 24, 0, -4, 34, 24), b.textAlign = "left", O(k, 40, 14), b.restore(), c += a + 5)
			}
		})();
		c = 5;
		e = m.height - 18 - 5;
		b.font = "10px sans-serif";
		z ? (a(s[0], "分数: " + (null == d ? 0 : ~~ (d.x / 100))), a(s[1], "个人最高分: " + ~~ (P / 100)), 0 != G && a(s[2], "服务器最高分: " + ~~ (G / 100)), u && a(s[3], "区: " + u), a(s[4], "区 #" + (A.indexOf(w) + 1)), a(s[5], "FPS: " + aa)) : a(s[0], "连接服务中 " + w.slice(5) + "...");
		b.restore()
	}
	function pa() {
		null != d && (qa(), d.vx = ra, B = d.vy = 0, ba = !1, d.reset(), T = d.x)
	}
	function O(a, g, c) {
		b.strokeStyle = "#000000";
		b.lineWidth = 1;
		b.strokeText(a, g, c);
		b.fillStyle = "#FFFFFF";
		b.fillText(a, g, c)
	}
	function sa(a, g, b) {
		this.init(a, g, b)
	}
	function ja(a, b, c) {
		this.id = a;
		this.x = b;
		this.y = c;
		this.deathCache = new I;
		this.percCache = new I
	}
	function ka(a) {
		var b = r;
		r = [];
		for (var c = 0; c < a.length; c++) {
			var e = a[c];
			r.push(e);
			e = b.indexOf(e); - 1 != e && b.splice(e, 1)
		}
		for (c = 0; c < b.length; c++) delete L[b[c]],
		a = J[b[c]],
		null != a && (a.maxPlayback = -1)
	}
	function U(a, b, c) {
		if (0 == ca.length) return new sa(a, b, c);
		var e = ca.pop();
		e.init(a, b, c);
		return e
	}
	function ta(a) {
		var b = p.indexOf(a); - 1 != b && (J[a.id] == a && delete J[a.id], a.destroy(), p.splice(b, 1), ca.push(a))
	}
	function qa() {
		if (null != d && 0 != d.jumps.length) {
			var a = new ArrayBuffer(2 * d.jumps.length + 7),
			b = new DataView(a);
			b.setUint8(0, 2);
			b.setUint16(1, d.jumps.length, !0);
			for (var c = 3, e = 0; e < d.jumps.length; e++) b.setUint16(c, d.jumps[e], !0),
			c += 2;
			b.setInt32(c, d.x, !0);
			v.send(a);
			ua();
			B = d.jumps.length = 0
		}
	}
	function ua() {
		if (X() && null != d && !(2 > r.length)) {
			var a = d.jumps.length - B;
			if (0 == a && d.gameOver) {
				if (ba) return;
				ba = !0
			}
			var b = new ArrayBuffer(5 + 2 * a),
			c = new DataView(b);
			c.setUint8(0, 4);
			c.setUint16(1, d.playbackTime, !0);
			c.setUint16(3, a, !0);
			for (a = 5; B < d.jumps.length; ++B) c.setUint16(a, d.jumps[B], !0),
			a += 2;
			B = d.jumps.length;
			v.send(b)
		}
	}
	function D() {
		var a = C.value;
		ya && localStorage.setItem("nick", a);
		var b = new ArrayBuffer(17),
		c = new DataView(b);
		c.setUint8(0, 5);
		for (var e = 0; e < a.length && 16 > e; e++) {
			var l = a.charCodeAt(e);
			128 <= l || c.setUint8(e + 1, l)
		}
		null != d && d.setNick(a);
		v.send(b)
	}
	function va(a, b, c, e, l, d, f) {
		if (a + c < e || b + c < l || a - c > e + d || b - c > l + f) return !1;
		d = e + d;
		f = l + f;
		a -= a < e ? e : a > d ? d : a;
		b -= b < l ? l : b > f ? f : b;
		return a * a + b * b < c * c
	}
	function ha(a) {
		a = a.toLowerCase();
		u = a = R.trim(a);
		ka([]);
		if (u && w != A[ga(a) % A.length]) v.close();
		else {
			if (a) {
				var b = new ArrayBuffer(17),
				c = new DataView(b);
				c.setUint8(0, 3);
				for (var e = 0; e < a.length && 16 > e; e++) {
					var d = a.charCodeAt(e);
					128 <= d || c.setUint8(e + 1, d)
				}
			} else {
				var b = new ArrayBuffer(1);
				(new DataView(b)).setUint8(0, 3)
			}
			v.send(b)
		}
	}
	function I() {}
	function ga(a) {
		var b, c, e, d, f;
		b = a.length & 3;
		c = a.length - b;
		e = 28;
		for (f = 0; f < c;) d = a.charCodeAt(f) & 255 | (a.charCodeAt(++f) & 255) << 8 | (a.charCodeAt(++f) & 255) << 16 | (a.charCodeAt(++f) & 255) << 24,
		++f,
		d = 3432918353 * (d & 65535) + ((3432918353 * (d >>> 16) & 65535) << 16) & 4294967295,
		d = d << 15 | d >>> 17,
		d = 461845907 * (d & 65535) + ((461845907 * (d >>> 16) & 65535) << 16) & 4294967295,
		e ^= d,
		e = e << 13 | e >>> 19,
		e = 5 * (e & 65535) + ((5 * (e >>> 16) & 65535) << 16) & 4294967295,
		e = (e & 65535) + 27492 + (((e >>> 16) + 58964 & 65535) << 16);
		d = 0;
		switch (b) {
		case 3:
			d ^= (a.charCodeAt(f + 2) & 255) << 16;
		case 2:
			d ^= (a.charCodeAt(f + 1) & 255) << 8;
		case 1:
			d ^= a.charCodeAt(f) & 255,
			d = 3432918353 * (d & 65535) + ((3432918353 * (d >>> 16) & 65535) << 16) & 4294967295,
			d = d << 15 | d >>> 17,
			e ^= 461845907 * (d & 65535) + ((461845907 * (d >>> 16) & 65535) << 16) & 4294967295
		}
		e ^= a.length;
		e ^= e >>> 16;
		e = 2246822507 * (e & 65535) + ((2246822507 * (e >>> 16) & 65535) << 16) & 4294967295;
		e ^= e >>> 13;
		e = 3266489909 * (e & 65535) + ((3266489909 * (e >>> 16) & 65535) << 16) & 4294967295;
		return (e ^ e >>> 16) >>> 0
	}
	function X() {
		return u && 1 < r.length && 15 > r.length
	}
	function Q() {
		z && (N = null, null != d && d.gameOver && 389 <= d.y ? pa() : null != d && 0 < d.y && (da = !0))
	}
	function W() {
		return "ontouchstart" in f || "onmsgesturechange" in f
	}
	f.onload = function() {
		C = y.getElementById("nickname");
		C.onchange = D;
		C.onkeydown = D;
		C.onkeyup = D;
		C.onkeypress = D;
		C.value = localStorage.getItem("nick");
		//V = y.getElementById("perfomance");
		m = y.getElementById("canvas");
		b = m.getContext("2d");
		wa = m.width;
		W() ? (y.body.onkeydown = Q, y.body.addEventListener(f.navigator.msPointerEnabled ? "MSPointerDown" : "touchstart", Q, !1)) : (y.body.onkeydown = Q, m.onmousedown = Q);
		pa();
		fa();
		la();
		na();
		setInterval(ma, 1E3 / 60);
		setInterval(ua, 350)
	};
	var m, b, V, ea = 0,
	h = new Image;
	h.src = "atlas" + ea + ".png";
	f.setPackId = function(a) {
		ea = a;
		h.src = "atlas" + ea + ".png";
		R("#themeModal").modal("hide")
	};
	f.openModalDialog = function() {
		R("#themeModal").modal("show")
	};
	var n = 0,
	p = [],
	k = [],
	Z = 0,
	d = null,
	da = !1,
	E = null,
	ia = 0,
	T = 100,
	C,
	ra = 2,
	v,
	F = [],
	$ = 0,
	aa = 60,
	t = 200,
	S = 0,
	B = 0,
	ba = !1,
	J = {},
	r = [],
	u = null;
	/^[a-z0-9]+$/.test(f.location.pathname.slice(1)) && (u = f.location.pathname.slice(1));
	var L = {},
	N = "按任意键开始",
	K = null,
	H = 0,
	G = 0,
	M = null,
	P = +localStorage.getItem("myHighscore") || 0,
	Y = !0,
	wa = 800,
	oa = new Image,
	s = [];
	console.log(f.location.origin);
	var A = ["ws://"+document.domain+":8283"],
	w = null,
	z = !1;
	setInterval(function() {
		aa = $;
		$ = 0
	},
	1E3);
	sa.prototype = {
		id: 0,
		x: 0,
		y: 0,
		vx: 0,
		vy: 0,
		seed: 0,
		nick: null,
		jumps: null,
		playbackTime: 0,
		gameOver: !1,
		maxPlayback: -1,
		isParty: !1,
		rotation: 0,
		targetRotation: 0,
		passed: 0,
		nickCacher: null,
		removeTimer: -1,
		init: function(a, b, c) {
			this.vy = this.vx = this.y = this.x = 0;
			this.gameOver = !1;
			this.maxPlayback = -1;
			this.isParty = !1;
			this.targetRotation = this.rotation = 0;
			this.removeTimer = -1;
			this.id = a;
			this.setNick(null);
			this.reset();
			this.seed = 9999 * Math.random();
			this.setNick(c);
			this.jumps = b || [];
			this.playbackTime = 0
		},
		setNick: function(a) {
			(this.nick = a) && null != this.nickCacher && this.nickCacher.setString(a)
		},
		reset: function() {
			this.x = 100;
			this.y = 50;
			this.vx = ra;
			this.vy = 0;
			this.jumps = [];
			this.playbackTime = 0;
			this.gameOver = !1;
			this.removeTimer = -1;
			this.passed = 0
		},
		draw: function() {
			if (-100 > this.x - n || this.x - n > wa + 200) return !1;
			b.save();
			b.translate(2 * Math.floor(this.x / 2), 2 * Math.floor(this.y / 2));
			var a = Math.floor((Z + this.seed) / 150) % 3;
			1 == a ? a = 2 : 2 == a && (a = 1);
			b.rotate(this.rotation);
			var g = M == this.id;
			if (this == d) b.beginPath(),
			b.fillStyle = "rgba(255, 255, 255, 0.5)",
			b.arc(0, 0, 30, 0, 2 * Math.PI, !1),
			b.fill(),
			b.drawImage(h, 230, 762 + 52 * a, 34, 24, -17, -12, 34, 24),
			g && (b.rotate(-0.2), b.drawImage(h, 0, 542, 18, 12, -9, -20, 18, 12));
			else {
				g || (b.globalAlpha *= 0.5);
				if (this.isParty) switch (a) {
				case 0:
					b.drawImage(h, 174, 982, 34, 24, -17, -12, 34, 24);
					break;
				case 1:
					b.drawImage(h, 230, 658, 34, 24, -17, -12, 34, 24);
					break;
				case 2:
					b.drawImage(h, 230, 710, 34, 24, -17, -12, 34, 24)
				} else b.drawImage(h, 6 + 56 * a, 982, 34, 24, -17, -12, 34, 24);
				g && (b.rotate(-0.2), b.drawImage(h, 0, 542, 18, 12, -9, -20, 18, 12));
				g || (b.globalAlpha /= 0.5)
			}
			b.restore();
			b.save();
			b.translate(2 * ~~ (this.x / 2), 2 * ~~ (this.y / 2));
			this.nick && (k.length && this.x - 60 > k[0].x || this == d || this.id == M) && (this.nickCacher || (this.nickCacher = new I, this.nickCacher.setString(this.nick)), this.nickCacher.render(0, -20, !0));
			b.restore();
			return !0
		},
		think: function() {
			if (! (-1 != this.maxPlayback && this.playbackTime >= this.maxPlayback)) {
				++this.playbackTime;
				for (var a = this.gameOver, b = 0; b < k.length; b++) {
					var c = k[b];
					if (! (c.x + 100 < this.x || c.x - 100 > this.x) && c.collidesWith(this)) {
						this.gameOver = !0;
						break
					}
				}
				this.vy += 0.4;
				389 <= this.y && (this.vy = this.vx = 0, this.gameOver = !0, this == d ? qa() : null == this.id && ta(this));
				if (this.gameOver) this.maxPlayback = -1,
				this.vx = 0,
				389 < this.y && (this.y = 389),
				this != d && (0 > this.removeTimer && (this.removeTimer = Math.floor(this.x / 10)), this.removeTimer -= 1, 0 == this.removeTimer && ta(this));
				else {
					for (; this.passed < k.length && !(this.x - 126 <= k[this.passed].x); this.passed++)++k[this.passed].passed;
					this == d ? da && (this.jumps.push(this.playbackTime), da = !1, this.vy = -8) : -1 != this.jumps.indexOf(this.playbackTime) && (this.vy = -8)
				}
				this.x += this.vx;
				this.y += this.vy;
				for (this.targetRotation = Math.atan2(this.vy, this.vx); 180 < this.targetRotation;) this.targetRotation -= 360;
				for (; - 180 > this.targetRotation;) this.targetRotation += 360;
				this.rotation = (this.rotation + this.targetRotation) / 2;
				b = !a && this.gameOver;
				this == d && this.x > P && (P = this.x);
				if (b) {
					this == d && localStorage.setItem("myHighscore", P);
					++S;
					for (var a = null, e = 0, b = 0; b < k.length; b++) {
						var c = k[b],
						f = Math.abs(c.x - this.x + 26);
						100 < f || !(null == a || f < e) || (e = f, a = c)
					}
					a && ++a.deaths
				}
			}
		},
		setPlayback: function(a, b) {
			this != d && this.reset();
			this.jumps = a;
			b && this.setNick(b)
		},
		destroy: function() {}
	};
	ja.prototype = {
		id: 0,
		x: 0,
		y: 0,
		deathCache: null,
		percCache: null,
		deaths: 0,
		passed: 0,
		getHeight: function() {
			return 124
		},
		draw: function() { - 300 > this.x - n || 1200 < this.x - n || (this.isValid() || (b.globalAlpha *= 0.5), b.drawImage(h, 112, 646, 52, 320, this.x, this.y - 320, 52, 320), b.drawImage(h, 168, 646, 52, 320, this.x, this.y + this.getHeight(), 52, 320), this.isValid() || (b.globalAlpha /= 0.5))
		},
		drawOverlay: function() {
			if (! (-300 > this.x - n || 1200 < this.x - n) && (this.deathCache.setString(this.deaths.toString() + " " + (this == k[0] ? "阵亡" : "阵亡")), this.deathCache.render(this.x + 26, 415, !0), 0 < this.deaths + this.passed)) {
				for (var a = this.passed, b = 1, c = 0; a && 0 == c;) c = ~~ (100 * b * a / (S + a)) / b,
				b *= 10;
				this.percCache.setString(c + "%");
				this.percCache.render(this.x + 26, 432, !0)
			}
		},
		collidesWith: function(a) {
			return this.isValid() ? va(a.x, a.y, 12, this.x, this.y - 320, 52, 320) || va(a.x, a.y, 12, this.x, this.y + this.getHeight(), 52, 320) : !1
		},
		isValid: function() {
			return this.x > T + 200
		}
	};
	f.joinParty = ha;
	var ca = [];
	I.prototype = {
		font: "10px sans-serif",
		str: null,
		width: 0,
		_canvas: null,
		_ctx: null,
		setString: function(a) {
			a != this.str && (this.str = a, this.invalidate())
		},
		invalidate: function() {
			this._canvas || (this._canvas = y.createElement("canvas"), this._ctx = this._canvas.getContext("2d"));
			var a = this._canvas,
			b = this._ctx;
			b.save();
			b.font = this.font;
			var c = b.measureText(this.str).width;
			this.width = c;
			a.width = c + 20;
			a.height = 20;
			b.clearRect(0, 0, a.width, a.height);
			b.font = this.font;
			b.textAlign = "left";
			b.fillStyle = "#000000";
			b.fillText(this.str, 9, 10);
			b.fillText(this.str, 11, 10);
			b.fillText(this.str, 10, 9);
			b.fillText(this.str, 10, 11);
			b.fillStyle = "#FFFFFF";
			b.fillText(this.str, 10, 10);
			b.restore()
		},
		render: function(a, d, c) {
			b.drawImage(this._canvas, 0, 0, this._canvas.width, this._canvas.height, a + (c ? -~~ (this._canvas.width / 2) : -10), d - 10, this._canvas.width, this._canvas.height)
		}
	};
	var ya = "localStorage" in f && null !== f.localStorage;
	f.requestAnimationFrame = f.requestAnimationFrame || f.mozRequestAnimationFrame || f.webkitRequestAnimationFrame ||
	function(a) {
		setTimeout(a, 1E3 / 60)
	}
})(window, document, "undefined" != typeof jQuery ? jQuery : null);