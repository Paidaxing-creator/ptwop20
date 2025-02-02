var as = Object.defineProperty;
var hs = (r, t, e) => t in r ? as(r, t, { enumerable: !0, configurable: !0, writable: !0, value: e }) : r[t] = e;
var _ = (r, t, e) => hs(r, typeof t != "symbol" ? t + "" : t, e);
class U extends Error {
  constructor(e, n) {
    super(n);
    _(this, "timestamp");
    this.type = e, this.timestamp = performance.now();
  }
}
class Oe extends Error {
  constructor(t) {
    super(), this.type = t;
  }
}
class cs {
  constructor(t, e, n) {
    _(this, "requestControls");
    _(this, "abortController", new AbortController());
    _(this, "expectedBytesLength");
    _(this, "requestByteRange");
    _(this, "onChunkDownloaded");
    this.request = t, this.httpConfig = e, this.onChunkDownloaded = n.getEventDispatcher("onChunkDownloaded");
    const { byteRange: s } = this.request.segment;
    s && (this.requestByteRange = { ...s }), t.loadedBytes !== 0 && (this.requestByteRange = this.requestByteRange ?? { start: 0 }, this.requestByteRange.start = this.requestByteRange.start + t.loadedBytes), this.request.totalBytes && (this.expectedBytesLength = this.request.totalBytes - this.request.loadedBytes), this.requestControls = this.request.start({ downloadSource: "http" }, { abort: () => this.abortController.abort("abort"), notReceivingBytesTimeoutMs: this.httpConfig.httpNotReceivingBytesTimeoutMs }), this.fetch();
  }
  async fetch() {
    var e, n;
    const { segment: t } = this.request;
    try {
      let s = await ((n = (e = this.httpConfig).httpRequestSetup) == null ? void 0 : n.call(e, t.url, t.byteRange, this.abortController.signal, this.requestByteRange));
      if (!s) {
        const g = new Headers(this.requestByteRange ? { Range: `bytes=${this.requestByteRange.start}-${this.requestByteRange.end ?? ""}` } : void 0);
        s = new Request(t.url, { headers: g, signal: this.abortController.signal });
      }
      if (this.abortController.signal.aborted) throw new DOMException("Request aborted before request fetch", "AbortError");
      const o = await window.fetch(s);
      if (this.handleResponseHeaders(o), !o.body) return;
      const { requestControls: a } = this;
      a.firstBytesReceived();
      const h = o.body.getReader();
      for await (const g of async function* (S) {
        for (; ; ) {
          const { done: l, value: f } = await S.read();
          if (l) break;
          yield f;
        }
      }(h)) this.requestControls.addLoadedChunk(g), this.onChunkDownloaded(g.byteLength, "http");
      a.completeOnSuccess();
    } catch (s) {
      this.handleError(s);
    }
  }
  handleResponseHeaders(t) {
    if (!t.ok) throw t.status === 406 ? (this.request.clearLoadedBytes(), new U("http-bytes-mismatch", t.statusText)) : new U("http-error", t.statusText);
    const { requestByteRange: e } = this;
    if (e) if (t.status === 200) {
      if (this.request.segment.byteRange) throw new U("http-unexpected-status-code");
      this.request.clearLoadedBytes();
    } else {
      if (t.status !== 206) throw new U("http-unexpected-status-code", t.statusText);
      const n = t.headers.get("Content-Length");
      if (n && this.expectedBytesLength !== void 0 && this.expectedBytesLength !== +n) throw this.request.clearLoadedBytes(), new U("http-bytes-mismatch", t.statusText);
      const s = t.headers.get("Content-Range"), o = s ? function(a) {
        const h = ds.exec(a.trim());
        if (!h) return;
        const [, g, S, l] = h;
        return { from: g ? parseInt(g) : void 0, to: S ? parseInt(S) : void 0, total: l ? parseInt(l) : void 0 };
      }(s) : void 0;
      if (o) {
        const { from: a, to: h, total: g } = o;
        if (g !== void 0 && this.request.totalBytes !== g || a !== void 0 && e.start !== a || h !== void 0 && e.end !== void 0 && e.end !== h) throw this.request.clearLoadedBytes(), new U("http-bytes-mismatch", t.statusText);
      }
    }
    if (t.status === 200 && this.request.totalBytes === void 0) {
      const n = t.headers.get("Content-Length");
      n && this.request.setTotalBytes(+n);
    }
  }
  handleError(t) {
    if (t instanceof Error) {
      if (t.name !== "abort") return;
      const e = t instanceof U ? t : new U("http-error", t.message);
      this.requestControls.abortOnError(e);
    }
  }
}
const ds = /^bytes (?:(?:(\d+)|)-(?:(\d+)|)|\*)\/(?:(\d+)|\*)$/;
function us(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Q, z, kn = { exports: {} }, q = kn.exports = {};
function ie() {
  throw new Error("setTimeout has not been defined");
}
function oe() {
  throw new Error("clearTimeout has not been defined");
}
function Tn(r) {
  if (Q === setTimeout) return setTimeout(r, 0);
  if ((Q === ie || !Q) && setTimeout) return Q = setTimeout, setTimeout(r, 0);
  try {
    return Q(r, 0);
  } catch {
    try {
      return Q.call(null, r, 0);
    } catch {
      return Q.call(this, r, 0);
    }
  }
}
(function() {
  try {
    Q = typeof setTimeout == "function" ? setTimeout : ie;
  } catch {
    Q = ie;
  }
  try {
    z = typeof clearTimeout == "function" ? clearTimeout : oe;
  } catch {
    z = oe;
  }
})();
var it, G = [], ct = !1, Dt = -1;
function ls() {
  ct && it && (ct = !1, it.length ? G = it.concat(G) : Dt = -1, G.length && xn());
}
function xn() {
  if (!ct) {
    var r = Tn(ls);
    ct = !0;
    for (var t = G.length; t; ) {
      for (it = G, G = []; ++Dt < t; ) it && it[Dt].run();
      Dt = -1, t = G.length;
    }
    it = null, ct = !1, function(e) {
      if (z === clearTimeout) return clearTimeout(e);
      if ((z === oe || !z) && clearTimeout) return z = clearTimeout, clearTimeout(e);
      try {
        return z(e);
      } catch {
        try {
          return z.call(null, e);
        } catch {
          return z.call(this, e);
        }
      }
    }(r);
  }
}
function De(r, t) {
  this.fun = r, this.array = t;
}
function j() {
}
q.nextTick = function(r) {
  var t = new Array(arguments.length - 1);
  if (arguments.length > 1) for (var e = 1; e < arguments.length; e++) t[e - 1] = arguments[e];
  G.push(new De(r, t)), G.length !== 1 || ct || Tn(xn);
}, De.prototype.run = function() {
  this.fun.apply(null, this.array);
}, q.title = "browser", q.browser = !0, q.env = {}, q.argv = [], q.version = "", q.versions = {}, q.on = j, q.addListener = j, q.once = j, q.off = j, q.removeListener = j, q.removeAllListeners = j, q.emit = j, q.prependListener = j, q.prependOnceListener = j, q.listeners = function(r) {
  return [];
}, q.binding = function(r) {
  throw new Error("process.binding is not supported");
}, q.cwd = function() {
  return "/";
}, q.chdir = function(r) {
  throw new Error("process.chdir is not supported");
}, q.umask = function() {
  return 0;
};
const Mt = us(kn.exports);
var gs = typeof globalThis < "u" ? globalThis : typeof window < "u" ? window : typeof global < "u" ? global : typeof self < "u" ? self : {};
function ot(r) {
  return r && r.__esModule && Object.prototype.hasOwnProperty.call(r, "default") ? r.default : r;
}
var Me, Ne, Ue, Fe, He, Kt = { exports: {} };
function ms() {
  if (Ne) return Me;
  Ne = 1;
  var r = 1e3, t = 60 * r, e = 60 * t, n = 24 * e, s = 7 * n, o = 365.25 * n;
  function a(h, g, S, l) {
    var f = g >= 1.5 * S;
    return Math.round(h / S) + " " + l + (f ? "s" : "");
  }
  return Me = function(h, g) {
    g = g || {};
    var S = typeof h;
    if (S === "string" && h.length > 0) return function(l) {
      if (!((l = String(l)).length > 100)) {
        var f = /^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(l);
        if (f) {
          var b = parseFloat(f[1]);
          switch ((f[2] || "ms").toLowerCase()) {
            case "years":
            case "year":
            case "yrs":
            case "yr":
            case "y":
              return b * o;
            case "weeks":
            case "week":
            case "w":
              return b * s;
            case "days":
            case "day":
            case "d":
              return b * n;
            case "hours":
            case "hour":
            case "hrs":
            case "hr":
            case "h":
              return b * e;
            case "minutes":
            case "minute":
            case "mins":
            case "min":
            case "m":
              return b * t;
            case "seconds":
            case "second":
            case "secs":
            case "sec":
            case "s":
              return b * r;
            case "milliseconds":
            case "millisecond":
            case "msecs":
            case "msec":
            case "ms":
              return b;
            default:
              return;
          }
        }
      }
    }(h);
    if (S === "number" && isFinite(h)) return g.long ? function(l) {
      var f = Math.abs(l);
      return f >= n ? a(l, f, n, "day") : f >= e ? a(l, f, e, "hour") : f >= t ? a(l, f, t, "minute") : f >= r ? a(l, f, r, "second") : l + " ms";
    }(h) : function(l) {
      var f = Math.abs(l);
      return f >= n ? Math.round(l / n) + "d" : f >= e ? Math.round(l / e) + "h" : f >= t ? Math.round(l / t) + "m" : f >= r ? Math.round(l / r) + "s" : l + "ms";
    }(h);
    throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(h));
  };
}
var An = (He || (He = 1, function(r, t) {
  t.formatArgs = function(n) {
    if (n[0] = (this.useColors ? "%c" : "") + this.namespace + (this.useColors ? " %c" : " ") + n[0] + (this.useColors ? "%c " : " ") + "+" + r.exports.humanize(this.diff), !this.useColors) return;
    const s = "color: " + this.color;
    n.splice(1, 0, s, "color: inherit");
    let o = 0, a = 0;
    n[0].replace(/%[a-zA-Z%]/g, (h) => {
      h !== "%%" && (o++, h === "%c" && (a = o));
    }), n.splice(a, 0, s);
  }, t.save = function(n) {
    try {
      n ? t.storage.setItem("debug", n) : t.storage.removeItem("debug");
    } catch {
    }
  }, t.load = function() {
    let n;
    try {
      n = t.storage.getItem("debug");
    } catch {
    }
    return !n && Mt !== void 0 && "env" in Mt && (n = Mt.env.DEBUG), n;
  }, t.useColors = function() {
    if (typeof window < "u" && window.process && (window.process.type === "renderer" || window.process.__nwjs)) return !0;
    if (typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/)) return !1;
    let n;
    return typeof document < "u" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window < "u" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator < "u" && navigator.userAgent && (n = navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)) && parseInt(n[1], 10) >= 31 || typeof navigator < "u" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
  }, t.storage = function() {
    try {
      return localStorage;
    } catch {
    }
  }(), t.destroy = /* @__PURE__ */ (() => {
    let n = !1;
    return () => {
      n || (n = !0, console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."));
    };
  })(), t.colors = ["#0000CC", "#0000FF", "#0033CC", "#0033FF", "#0066CC", "#0066FF", "#0099CC", "#0099FF", "#00CC00", "#00CC33", "#00CC66", "#00CC99", "#00CCCC", "#00CCFF", "#3300CC", "#3300FF", "#3333CC", "#3333FF", "#3366CC", "#3366FF", "#3399CC", "#3399FF", "#33CC00", "#33CC33", "#33CC66", "#33CC99", "#33CCCC", "#33CCFF", "#6600CC", "#6600FF", "#6633CC", "#6633FF", "#66CC00", "#66CC33", "#9900CC", "#9900FF", "#9933CC", "#9933FF", "#99CC00", "#99CC33", "#CC0000", "#CC0033", "#CC0066", "#CC0099", "#CC00CC", "#CC00FF", "#CC3300", "#CC3333", "#CC3366", "#CC3399", "#CC33CC", "#CC33FF", "#CC6600", "#CC6633", "#CC9900", "#CC9933", "#CCCC00", "#CCCC33", "#FF0000", "#FF0033", "#FF0066", "#FF0099", "#FF00CC", "#FF00FF", "#FF3300", "#FF3333", "#FF3366", "#FF3399", "#FF33CC", "#FF33FF", "#FF6600", "#FF6633", "#FF9900", "#FF9933", "#FFCC00", "#FFCC33"], t.log = console.debug || console.log || (() => {
  }), r.exports = (Fe || (Fe = 1, Ue = function(n) {
    function s(h) {
      let g, S, l, f = null;
      function b(...x) {
        if (!b.enabled) return;
        const C = b, c = Number(/* @__PURE__ */ new Date()), u = c - (g || c);
        C.diff = u, C.prev = g, C.curr = c, g = c, x[0] = s.coerce(x[0]), typeof x[0] != "string" && x.unshift("%O");
        let d = 0;
        x[0] = x[0].replace(/%([a-zA-Z%])/g, (m, p) => {
          if (m === "%%") return "%";
          d++;
          const y = s.formatters[p];
          if (typeof y == "function") {
            const T = x[d];
            m = y.call(C, T), x.splice(d, 1), d--;
          }
          return m;
        }), s.formatArgs.call(C, x), (C.log || s.log).apply(C, x);
      }
      return b.namespace = h, b.useColors = s.useColors(), b.color = s.selectColor(h), b.extend = o, b.destroy = s.destroy, Object.defineProperty(b, "enabled", { enumerable: !0, configurable: !1, get: () => f !== null ? f : (S !== s.namespaces && (S = s.namespaces, l = s.enabled(h)), l), set: (x) => {
        f = x;
      } }), typeof s.init == "function" && s.init(b), b;
    }
    function o(h, g) {
      const S = s(this.namespace + (g === void 0 ? ":" : g) + h);
      return S.log = this.log, S;
    }
    function a(h, g) {
      let S = 0, l = 0, f = -1, b = 0;
      for (; S < h.length; ) if (l < g.length && (g[l] === h[S] || g[l] === "*")) g[l] === "*" ? (f = l, b = S, l++) : (S++, l++);
      else {
        if (f === -1) return !1;
        l = f + 1, b++, S = b;
      }
      for (; l < g.length && g[l] === "*"; ) l++;
      return l === g.length;
    }
    return s.debug = s, s.default = s, s.coerce = function(h) {
      return h instanceof Error ? h.stack || h.message : h;
    }, s.disable = function() {
      const h = [...s.names, ...s.skips.map((g) => "-" + g)].join(",");
      return s.enable(""), h;
    }, s.enable = function(h) {
      s.save(h), s.namespaces = h, s.names = [], s.skips = [];
      const g = (typeof h == "string" ? h : "").trim().replace(" ", ",").split(",").filter(Boolean);
      for (const S of g) S[0] === "-" ? s.skips.push(S.slice(1)) : s.names.push(S);
    }, s.enabled = function(h) {
      for (const g of s.skips) if (a(h, g)) return !1;
      for (const g of s.names) if (a(h, g)) return !0;
      return !1;
    }, s.humanize = ms(), s.destroy = function() {
      console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.");
    }, Object.keys(n).forEach((h) => {
      s[h] = n[h];
    }), s.names = [], s.skips = [], s.formatters = {}, s.selectColor = function(h) {
      let g = 0;
      for (let S = 0; S < h.length; S++) g = (g << 5) - g + h.charCodeAt(S), g |= 0;
      return s.colors[Math.abs(g) % s.colors.length];
    }, s.enable(s.load()), s;
  }), Ue)(t);
  const { formatters: e } = r.exports;
  e.j = function(n) {
    try {
      return JSON.stringify(n);
    } catch (s) {
      return "[UnexpectedJSONParseError]: " + s.message;
    }
  };
}(Kt, Kt.exports)), Kt.exports);
const $ = ot(An);
var $e, Lt = { exports: {} };
function Ln() {
  if ($e) return Lt.exports;
  $e = 1;
  var r, t = typeof Reflect == "object" ? Reflect : null, e = t && typeof t.apply == "function" ? t.apply : function(c, u, d) {
    return Function.prototype.apply.call(c, u, d);
  };
  r = t && typeof t.ownKeys == "function" ? t.ownKeys : Object.getOwnPropertySymbols ? function(c) {
    return Object.getOwnPropertyNames(c).concat(Object.getOwnPropertySymbols(c));
  } : function(c) {
    return Object.getOwnPropertyNames(c);
  };
  var n = Number.isNaN || function(c) {
    return c != c;
  };
  function s() {
    s.init.call(this);
  }
  Lt.exports = s, Lt.exports.once = function(c, u) {
    return new Promise(function(d, m) {
      function p(T) {
        c.removeListener(u, y), m(T);
      }
      function y() {
        typeof c.removeListener == "function" && c.removeListener("error", p), d([].slice.call(arguments));
      }
      C(c, u, y, { once: !0 }), u !== "error" && function(T, I, B) {
        typeof T.on == "function" && C(T, "error", I, B);
      }(c, p, { once: !0 });
    });
  }, s.EventEmitter = s, s.prototype._events = void 0, s.prototype._eventsCount = 0, s.prototype._maxListeners = void 0;
  var o = 10;
  function a(c) {
    if (typeof c != "function") throw new TypeError('The "listener" argument must be of type Function. Received type ' + typeof c);
  }
  function h(c) {
    return c._maxListeners === void 0 ? s.defaultMaxListeners : c._maxListeners;
  }
  function g(c, u, d, m) {
    var p, y, T, I;
    if (a(d), (y = c._events) === void 0 ? (y = c._events = /* @__PURE__ */ Object.create(null), c._eventsCount = 0) : (y.newListener !== void 0 && (c.emit("newListener", u, d.listener ? d.listener : d), y = c._events), T = y[u]), T === void 0) T = y[u] = d, ++c._eventsCount;
    else if (typeof T == "function" ? T = y[u] = m ? [d, T] : [T, d] : m ? T.unshift(d) : T.push(d), (p = h(c)) > 0 && T.length > p && !T.warned) {
      T.warned = !0;
      var B = new Error("Possible EventEmitter memory leak detected. " + T.length + " " + String(u) + " listeners added. Use emitter.setMaxListeners() to increase limit");
      B.name = "MaxListenersExceededWarning", B.emitter = c, B.type = u, B.count = T.length, I = B, console && console.warn && console.warn(I);
    }
    return c;
  }
  function S() {
    if (!this.fired) return this.target.removeListener(this.type, this.wrapFn), this.fired = !0, arguments.length === 0 ? this.listener.call(this.target) : this.listener.apply(this.target, arguments);
  }
  function l(c, u, d) {
    var m = { fired: !1, wrapFn: void 0, target: c, type: u, listener: d }, p = S.bind(m);
    return p.listener = d, m.wrapFn = p, p;
  }
  function f(c, u, d) {
    var m = c._events;
    if (m === void 0) return [];
    var p = m[u];
    return p === void 0 ? [] : typeof p == "function" ? d ? [p.listener || p] : [p] : d ? function(y) {
      for (var T = new Array(y.length), I = 0; I < T.length; ++I) T[I] = y[I].listener || y[I];
      return T;
    }(p) : x(p, p.length);
  }
  function b(c) {
    var u = this._events;
    if (u !== void 0) {
      var d = u[c];
      if (typeof d == "function") return 1;
      if (d !== void 0) return d.length;
    }
    return 0;
  }
  function x(c, u) {
    for (var d = new Array(u), m = 0; m < u; ++m) d[m] = c[m];
    return d;
  }
  function C(c, u, d, m) {
    if (typeof c.on == "function") m.once ? c.once(u, d) : c.on(u, d);
    else {
      if (typeof c.addEventListener != "function") throw new TypeError('The "emitter" argument must be of type EventEmitter. Received type ' + typeof c);
      c.addEventListener(u, function p(y) {
        m.once && c.removeEventListener(u, p), d(y);
      });
    }
  }
  return Object.defineProperty(s, "defaultMaxListeners", { enumerable: !0, get: function() {
    return o;
  }, set: function(c) {
    if (typeof c != "number" || c < 0 || n(c)) throw new RangeError('The value of "defaultMaxListeners" is out of range. It must be a non-negative number. Received ' + c + ".");
    o = c;
  } }), s.init = function() {
    this._events !== void 0 && this._events !== Object.getPrototypeOf(this)._events || (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0), this._maxListeners = this._maxListeners || void 0;
  }, s.prototype.setMaxListeners = function(c) {
    if (typeof c != "number" || c < 0 || n(c)) throw new RangeError('The value of "n" is out of range. It must be a non-negative number. Received ' + c + ".");
    return this._maxListeners = c, this;
  }, s.prototype.getMaxListeners = function() {
    return h(this);
  }, s.prototype.emit = function(c) {
    for (var u = [], d = 1; d < arguments.length; d++) u.push(arguments[d]);
    var m = c === "error", p = this._events;
    if (p !== void 0) m = m && p.error === void 0;
    else if (!m) return !1;
    if (m) {
      var y;
      if (u.length > 0 && (y = u[0]), y instanceof Error) throw y;
      var T = new Error("Unhandled error." + (y ? " (" + y.message + ")" : ""));
      throw T.context = y, T;
    }
    var I = p[c];
    if (I === void 0) return !1;
    if (typeof I == "function") e(I, this, u);
    else {
      var B = I.length, gt = x(I, B);
      for (d = 0; d < B; ++d) e(gt[d], this, u);
    }
    return !0;
  }, s.prototype.addListener = function(c, u) {
    return g(this, c, u, !1);
  }, s.prototype.on = s.prototype.addListener, s.prototype.prependListener = function(c, u) {
    return g(this, c, u, !0);
  }, s.prototype.once = function(c, u) {
    return a(u), this.on(c, l(this, c, u)), this;
  }, s.prototype.prependOnceListener = function(c, u) {
    return a(u), this.prependListener(c, l(this, c, u)), this;
  }, s.prototype.removeListener = function(c, u) {
    var d, m, p, y, T;
    if (a(u), (m = this._events) === void 0) return this;
    if ((d = m[c]) === void 0) return this;
    if (d === u || d.listener === u) --this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : (delete m[c], m.removeListener && this.emit("removeListener", c, d.listener || u));
    else if (typeof d != "function") {
      for (p = -1, y = d.length - 1; y >= 0; y--) if (d[y] === u || d[y].listener === u) {
        T = d[y].listener, p = y;
        break;
      }
      if (p < 0) return this;
      p === 0 ? d.shift() : function(I, B) {
        for (; B + 1 < I.length; B++) I[B] = I[B + 1];
        I.pop();
      }(d, p), d.length === 1 && (m[c] = d[0]), m.removeListener !== void 0 && this.emit("removeListener", c, T || u);
    }
    return this;
  }, s.prototype.off = s.prototype.removeListener, s.prototype.removeAllListeners = function(c) {
    var u, d, m;
    if ((d = this._events) === void 0) return this;
    if (d.removeListener === void 0) return arguments.length === 0 ? (this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0) : d[c] !== void 0 && (--this._eventsCount == 0 ? this._events = /* @__PURE__ */ Object.create(null) : delete d[c]), this;
    if (arguments.length === 0) {
      var p, y = Object.keys(d);
      for (m = 0; m < y.length; ++m) (p = y[m]) !== "removeListener" && this.removeAllListeners(p);
      return this.removeAllListeners("removeListener"), this._events = /* @__PURE__ */ Object.create(null), this._eventsCount = 0, this;
    }
    if (typeof (u = d[c]) == "function") this.removeListener(c, u);
    else if (u !== void 0) for (m = u.length - 1; m >= 0; m--) this.removeListener(c, u[m]);
    return this;
  }, s.prototype.listeners = function(c) {
    return f(this, c, !0);
  }, s.prototype.rawListeners = function(c) {
    return f(this, c, !1);
  }, s.listenerCount = function(c, u) {
    return typeof c.listenerCount == "function" ? c.listenerCount(u) : b.call(c, u);
  }, s.prototype.listenerCount = b, s.prototype.eventNames = function() {
    return this._eventsCount > 0 ? r(this._events) : [];
  }, Lt.exports;
}
const In = ot(Ln());
var je, We, Qe, It = { exports: {} }, ps = function() {
  if (Qe) return It.exports;
  Qe = 1;
  var r = (We || (We = 1, je = function n(s, o) {
    if (s && o) return n(s)(o);
    if (typeof s != "function") throw new TypeError("need wrapper function");
    return Object.keys(s).forEach(function(h) {
      a[h] = s[h];
    }), a;
    function a() {
      for (var h = new Array(arguments.length), g = 0; g < h.length; g++) h[g] = arguments[g];
      var S = s.apply(this, h), l = h[h.length - 1];
      return typeof S == "function" && S !== l && Object.keys(l).forEach(function(f) {
        S[f] = l[f];
      }), S;
    }
  }), je);
  function t(n) {
    var s = function() {
      return s.called ? s.value : (s.called = !0, s.value = n.apply(this, arguments));
    };
    return s.called = !1, s;
  }
  function e(n) {
    var s = function() {
      if (s.called) throw new Error(s.onceError);
      return s.called = !0, s.value = n.apply(this, arguments);
    }, o = n.name || "Function wrapped with `once`";
    return s.onceError = o + " shouldn't be called more than once", s.called = !1, s;
  }
  return It.exports = r(t), It.exports.strict = r(e), t.proto = t(function() {
    Object.defineProperty(Function.prototype, "once", { value: function() {
      return t(this);
    }, configurable: !0 }), Object.defineProperty(Function.prototype, "onceStrict", { value: function() {
      return e(this);
    }, configurable: !0 });
  }), It.exports;
}();
const fs = ot(ps);
var ze, Ge, Zt, Je;
function Rn() {
  if (Ge) return ze;
  let r;
  return Ge = 1, ze = typeof queueMicrotask == "function" ? queueMicrotask.bind(typeof window < "u" ? window : gs) : (t) => (r || (r = Promise.resolve())).then(t).catch((e) => setTimeout(() => {
    throw e;
  }, 0));
}
var ys = function() {
  if (Je) return Zt;
  Je = 1, Zt = function(t, e) {
    let n, s, o, a = !0;
    Array.isArray(t) ? (n = [], s = t.length) : (o = Object.keys(t), n = {}, s = o.length);
    function h(S) {
      function l() {
        e && e(S, n), e = null;
      }
      a ? r(l) : l();
    }
    function g(S, l, f) {
      n[S] = f, (--s == 0 || l) && h(l);
    }
    s ? o ? o.forEach(function(S) {
      t[S](function(l, f) {
        g(S, l, f);
      });
    }) : t.forEach(function(S, l) {
      S(function(f, b) {
        g(l, f, b);
      });
    }) : h(null), a = !1;
  };
  const r = Rn();
  return Zt;
}();
const _s = ot(ys), V = typeof window < "u" ? window : self, ae = V.RTCPeerConnection || V.mozRTCPeerConnection || V.webkitRTCPeerConnection, Ss = V.RTCSessionDescription || V.mozRTCSessionDescription || V.webkitRTCSessionDescription, ws = V.RTCIceCandidate || V.mozRTCIceCandidate || V.webkitRTCIceCandidate;
var Ve, Ye, Ke, Ze, Xe, tn, en, nn, sn, rn, on, an;
function bs() {
  if (tn) return Xe;
  tn = 1;
  const r = Ze ? Ke : (Ze = 1, Ke = class {
    constructor(t) {
      if (!(t > 0) || t - 1 & t) throw new Error("Max size for a FixedFIFO should be a power of two");
      this.buffer = new Array(t), this.mask = t - 1, this.top = 0, this.btm = 0, this.next = null;
    }
    clear() {
      this.top = this.btm = 0, this.next = null, this.buffer.fill(void 0);
    }
    push(t) {
      return this.buffer[this.top] === void 0 && (this.buffer[this.top] = t, this.top = this.top + 1 & this.mask, !0);
    }
    shift() {
      const t = this.buffer[this.btm];
      if (t !== void 0) return this.buffer[this.btm] = void 0, this.btm = this.btm + 1 & this.mask, t;
    }
    peek() {
      return this.buffer[this.btm];
    }
    isEmpty() {
      return this.buffer[this.btm] === void 0;
    }
  });
  return Xe = class {
    constructor(t) {
      this.hwm = t || 16, this.head = new r(this.hwm), this.tail = this.head, this.length = 0;
    }
    clear() {
      this.head = this.tail, this.head.clear(), this.length = 0;
    }
    push(t) {
      if (this.length++, !this.head.push(t)) {
        const e = this.head;
        this.head = e.next = new r(2 * this.head.buffer.length), this.head.push(t);
      }
    }
    shift() {
      this.length !== 0 && this.length--;
      const t = this.tail.shift();
      if (t === void 0 && this.tail.next) {
        const e = this.tail.next;
        return this.tail.next = null, this.tail = e, this.tail.shift();
      }
      return t;
    }
    peek() {
      const t = this.tail.peek();
      return t === void 0 && this.tail.next ? this.tail.next.peek() : t;
    }
    isEmpty() {
      return this.length === 0;
    }
  };
}
function hn() {
  return nn ? en : (nn = 1, en = class {
    constructor(r) {
      this.decoder = new TextDecoder(r === "utf16le" ? "utf16-le" : r);
    }
    get remaining() {
      return -1;
    }
    decode(r) {
      return this.decoder.decode(r, { stream: !0 });
    }
    flush() {
      return this.decoder.decode(new Uint8Array(0));
    }
  });
}
function Cs() {
  if (rn) return sn;
  rn = 1;
  const r = hn(), t = hn();
  return sn = class {
    constructor(e = "utf8") {
      switch (this.encoding = function(n) {
        switch (n = n.toLowerCase()) {
          case "utf8":
          case "utf-8":
            return "utf8";
          case "ucs2":
          case "ucs-2":
          case "utf16le":
          case "utf-16le":
            return "utf16le";
          case "latin1":
          case "binary":
            return "latin1";
          case "base64":
          case "ascii":
          case "hex":
            return n;
          default:
            throw new Error("Unknown encoding: " + n);
        }
      }(e), this.encoding) {
        case "utf8":
          this.decoder = new t();
          break;
        case "utf16le":
        case "base64":
          throw new Error("Unsupported encoding: " + this.encoding);
        default:
          this.decoder = new r(this.encoding);
      }
    }
    get remaining() {
      return this.decoder.remaining;
    }
    push(e) {
      return typeof e == "string" ? e : this.decoder.decode(e);
    }
    write(e) {
      return this.push(e);
    }
    end(e) {
      let n = "";
      return e && (n = this.push(e)), n += this.decoder.flush(), n;
    }
  };
}
var cn, dn, En = function() {
  if (an) return on;
  an = 1;
  const { EventEmitter: r } = Ln(), t = new Error("Stream was destroyed"), e = new Error("Premature close"), n = Ye ? Ve : (Ye = 1, Ve = typeof queueMicrotask == "function" ? queueMicrotask : (v) => Promise.resolve().then(v)), s = bs(), o = Cs(), a = 536870911, h = 1 ^ a, g = 2 ^ a, S = 64, l = 128, f = 256, b = 1024, x = 2048, C = 4096, c = 8192, u = 16384, d = 32768, m = 131072, p = 131328, y = 16 ^ a, T = 536805375, I = 768 ^ a, B = 536838143, gt = 32 ^ a, Tt = 536739839, at = 1 << 18, M = 2 << 18, F = 4 << 18, et = 8 << 18, nt = 16 << 18, Y = 32 << 18, mt = 64 << 18, Qt = 128 << 18, $n = 256 << 18, _e = 512 << 18, Se = 1024 << 18, jn = 535822335, we = 503316479, be = 268435455, xt = 262160, Wn = 536608751, Ce = 8404992, pt = 14, Qn = 15, ve = 8405006, ke = 33587200, Te = 33587215, zn = 2359296, xe = 270794767, At = Symbol.asyncIterator || Symbol("asyncIterator");
  class Ae {
    constructor(i, { highWaterMark: w = 16384, map: k = null, mapWritable: A, byteLength: L, byteLengthWritable: R } = {}) {
      this.stream = i, this.queue = new s(), this.highWaterMark = w, this.buffered = 0, this.error = null, this.pipeline = null, this.drains = null, this.byteLength = R || L || qe, this.map = A || k, this.afterWrite = Zn.bind(this), this.afterUpdateNextTick = es.bind(this);
    }
    get ended() {
      return !!(this.stream._duplexState & Y);
    }
    push(i) {
      return !(142606350 & this.stream._duplexState) && (this.map !== null && (i = this.map(i)), this.buffered += this.byteLength(i), this.queue.push(i), this.buffered < this.highWaterMark ? (this.stream._duplexState |= et, !0) : (this.stream._duplexState |= 6291456, !1));
    }
    shift() {
      const i = this.queue.shift();
      return this.buffered -= this.byteLength(i), this.buffered === 0 && (this.stream._duplexState &= 534773759), i;
    }
    end(i) {
      typeof i == "function" ? this.stream.once("finish", i) : i != null && this.push(i), this.stream._duplexState = (this.stream._duplexState | _e) & jn;
    }
    autoBatch(i, w) {
      const k = [], A = this.stream;
      for (k.push(i); (A._duplexState & xe) === zn; ) k.push(A._writableState.shift());
      if (A._duplexState & Qn) return w(null);
      A._writev(k, w);
    }
    update() {
      const i = this.stream;
      i._duplexState |= M;
      do {
        for (; (i._duplexState & xe) === et; ) {
          const w = this.shift();
          i._duplexState |= 67371008, i._write(w, this.afterWrite);
        }
        1310720 & i._duplexState || this.updateNonPrimary();
      } while (this.continueUpdate() === !0);
      i._duplexState &= 536346623;
    }
    updateNonPrimary() {
      const i = this.stream;
      if ((144965647 & i._duplexState) === _e) return i._duplexState = i._duplexState | at, void i._final(Kn.bind(this));
      (i._duplexState & pt) != 4 ? (i._duplexState & Te) == 1 && (i._duplexState = (i._duplexState | xt) & h, i._open(Ie.bind(this))) : i._duplexState & ke || (i._duplexState |= xt, i._destroy(Le.bind(this)));
    }
    continueUpdate() {
      return !!(this.stream._duplexState & Qt) && (this.stream._duplexState &= we, !0);
    }
    updateCallback() {
      (35127311 & this.stream._duplexState) === F ? this.update() : this.updateNextTick();
    }
    updateNextTick() {
      this.stream._duplexState & Qt || (this.stream._duplexState |= Qt, this.stream._duplexState & M || n(this.afterUpdateNextTick));
    }
  }
  class Gn {
    constructor(i, { highWaterMark: w = 16384, map: k = null, mapReadable: A, byteLength: L, byteLengthReadable: R } = {}) {
      this.stream = i, this.queue = new s(), this.highWaterMark = w === 0 ? 1 : w, this.buffered = 0, this.readAhead = w > 0, this.error = null, this.pipeline = null, this.byteLength = R || L || qe, this.map = A || k, this.pipeTo = null, this.afterRead = Xn.bind(this), this.afterUpdateNextTick = ts.bind(this);
    }
    get ended() {
      return !!(this.stream._duplexState & u);
    }
    pipe(i, w) {
      if (this.pipeTo !== null) throw new Error("Can only pipe to one destination");
      if (typeof w != "function" && (w = null), this.stream._duplexState |= 512, this.pipeTo = i, this.pipeline = new Vn(this.stream, i, w), w && this.stream.on("error", Be), yt(i)) i._writableState.pipeline = this.pipeline, w && i.on("error", Be), i.on("finish", this.pipeline.finished.bind(this.pipeline));
      else {
        const k = this.pipeline.done.bind(this.pipeline, i), A = this.pipeline.done.bind(this.pipeline, i, null);
        i.on("error", k), i.on("close", A), i.on("finish", this.pipeline.finished.bind(this.pipeline));
      }
      i.on("drain", Yn.bind(this)), this.stream.emit("piping", i), i.emit("pipe", this.stream);
    }
    push(i) {
      const w = this.stream;
      return i === null ? (this.highWaterMark = 0, w._duplexState = 536805311 & w._duplexState | 1024, !1) : this.map !== null && (i = this.map(i)) === null ? (w._duplexState &= T, this.buffered < this.highWaterMark) : (this.buffered += this.byteLength(i), this.queue.push(i), w._duplexState = (w._duplexState | l) & T, this.buffered < this.highWaterMark);
    }
    shift() {
      const i = this.queue.shift();
      return this.buffered -= this.byteLength(i), this.buffered === 0 && (this.stream._duplexState &= 536862591), i;
    }
    unshift(i) {
      const w = [this.map !== null ? this.map(i) : i];
      for (; this.buffered > 0; ) w.push(this.shift());
      for (let k = 0; k < w.length - 1; k++) {
        const A = w[k];
        this.buffered += this.byteLength(A), this.queue.push(A);
      }
      this.push(w[w.length - 1]);
    }
    read() {
      const i = this.stream;
      if ((16527 & i._duplexState) === l) {
        const w = this.shift();
        return this.pipeTo !== null && this.pipeTo.write(w) === !1 && (i._duplexState &= I), i._duplexState & x && i.emit("data", w), w;
      }
      return this.readAhead === !1 && (i._duplexState |= m, this.updateNextTick()), null;
    }
    drain() {
      const i = this.stream;
      for (; (16527 & i._duplexState) === l && 768 & i._duplexState; ) {
        const w = this.shift();
        this.pipeTo !== null && this.pipeTo.write(w) === !1 && (i._duplexState &= I), i._duplexState & x && i.emit("data", w);
      }
    }
    update() {
      const i = this.stream;
      i._duplexState |= 32;
      do {
        for (this.drain(); this.buffered < this.highWaterMark && (214047 & i._duplexState) === m; ) i._duplexState |= 65552, i._read(this.afterRead), this.drain();
        (12431 & i._duplexState) == 4224 && (i._duplexState |= c, i.emit("readable")), 80 & i._duplexState || this.updateNonPrimary();
      } while (this.continueUpdate() === !0);
      i._duplexState &= gt;
    }
    updateNonPrimary() {
      const i = this.stream;
      (1167 & i._duplexState) === b && (i._duplexState = 536869887 & i._duplexState | 16384, i.emit("end"), (i._duplexState & ve) === Ce && (i._duplexState |= 4), this.pipeTo !== null && this.pipeTo.end()), (i._duplexState & pt) != 4 ? (i._duplexState & Te) == 1 && (i._duplexState = (i._duplexState | xt) & h, i._open(Ie.bind(this))) : i._duplexState & ke || (i._duplexState |= xt, i._destroy(Le.bind(this)));
    }
    continueUpdate() {
      return !!(this.stream._duplexState & d) && (this.stream._duplexState &= B, !0);
    }
    updateCallback() {
      (32879 & this.stream._duplexState) === S ? this.update() : this.updateNextTick();
    }
    updateNextTick() {
      this.stream._duplexState & d || (this.stream._duplexState |= d, 32 & this.stream._duplexState || n(this.afterUpdateNextTick));
    }
  }
  class Jn {
    constructor(i) {
      this.data = null, this.afterTransform = ns.bind(i), this.afterFinal = null;
    }
  }
  class Vn {
    constructor(i, w, k) {
      this.from = i, this.to = w, this.afterPipe = k, this.error = null, this.pipeToFinished = !1;
    }
    finished() {
      this.pipeToFinished = !0;
    }
    done(i, w) {
      w && (this.error = w), i !== this.to || (this.to = null, this.from === null) ? i !== this.from || (this.from = null, this.to === null) ? (this.afterPipe !== null && this.afterPipe(this.error), this.to = this.from = this.afterPipe = null) : i._duplexState & u || this.to.destroy(this.error || new Error("Readable stream closed before ending")) : this.from._duplexState & u && this.pipeToFinished || this.from.destroy(this.error || new Error("Writable stream closed prematurely"));
    }
  }
  function Yn() {
    this.stream._duplexState |= 512, this.updateCallback();
  }
  function Kn(v) {
    const i = this.stream;
    v && i.destroy(v), i._duplexState & pt || (i._duplexState |= Y, i.emit("finish")), (i._duplexState & ve) === Ce && (i._duplexState |= 4), i._duplexState &= 402391039, i._duplexState & M ? this.updateNextTick() : this.update();
  }
  function Le(v) {
    const i = this.stream;
    v || this.error === t || (v = this.error), v && i.emit("error", v), i._duplexState |= 8, i.emit("close");
    const w = i._readableState, k = i._writableState;
    if (w !== null && w.pipeline !== null && w.pipeline.done(i, v), k !== null) {
      for (; k.drains !== null && k.drains.length > 0; ) k.drains.shift().resolve(!1);
      k.pipeline !== null && k.pipeline.done(i, v);
    }
  }
  function Zn(v) {
    const i = this.stream;
    v && i.destroy(v), i._duplexState &= 469499903, this.drains !== null && function(w) {
      for (let k = 0; k < w.length; k++) --w[k].writes == 0 && (w.shift().resolve(!0), k--);
    }(this.drains), (6553615 & i._duplexState) === nt && (i._duplexState &= 532676607, (i._duplexState & mt) === mt && i.emit("drain")), this.updateCallback();
  }
  function Xn(v) {
    v && this.stream.destroy(v), this.stream._duplexState &= y, this.readAhead !== !1 || this.stream._duplexState & f || (this.stream._duplexState &= Tt), this.updateCallback();
  }
  function ts() {
    32 & this.stream._duplexState || (this.stream._duplexState &= B, this.update());
  }
  function es() {
    this.stream._duplexState & M || (this.stream._duplexState &= we, this.update());
  }
  function Ie(v) {
    const i = this.stream;
    v && i.destroy(v), 4 & i._duplexState || (17423 & i._duplexState || (i._duplexState |= S), 142606351 & i._duplexState || (i._duplexState |= F), i.emit("open")), i._duplexState &= Wn, i._writableState !== null && i._writableState.updateCallback(), i._readableState !== null && i._readableState.updateCallback();
  }
  function ns(v, i) {
    i != null && this.push(i), this._writableState.afterWrite(v);
  }
  function ss(v) {
    this._readableState !== null && (v === "data" && (this._duplexState |= 133376, this._readableState.updateNextTick()), v === "readable" && (this._duplexState |= C, this._readableState.updateNextTick())), this._writableState !== null && v === "drain" && (this._duplexState |= mt, this._writableState.updateNextTick());
  }
  class zt extends r {
    constructor(i) {
      super(), this._duplexState = 0, this._readableState = null, this._writableState = null, i && (i.open && (this._open = i.open), i.destroy && (this._destroy = i.destroy), i.predestroy && (this._predestroy = i.predestroy), i.signal && i.signal.addEventListener("abort", os.bind(this))), this.on("newListener", ss);
    }
    _open(i) {
      i(null);
    }
    _destroy(i) {
      i(null);
    }
    _predestroy() {
    }
    get readable() {
      return this._readableState !== null || void 0;
    }
    get writable() {
      return this._writableState !== null || void 0;
    }
    get destroyed() {
      return !!(8 & this._duplexState);
    }
    get destroying() {
      return !!(this._duplexState & pt);
    }
    destroy(i) {
      this._duplexState & pt || (i || (i = t), this._duplexState = 535822271 & this._duplexState | 4, this._readableState !== null && (this._readableState.highWaterMark = 0, this._readableState.error = i), this._writableState !== null && (this._writableState.highWaterMark = 0, this._writableState.error = i), this._duplexState |= 2, this._predestroy(), this._duplexState &= g, this._readableState !== null && this._readableState.updateNextTick(), this._writableState !== null && this._writableState.updateNextTick());
    }
  }
  class ft extends zt {
    constructor(i) {
      super(i), this._duplexState |= 8519681, this._readableState = new Gn(this, i), i && (this._readableState.readAhead === !1 && (this._duplexState &= Tt), i.read && (this._read = i.read), i.eagerOpen && this._readableState.updateNextTick(), i.encoding && this.setEncoding(i.encoding));
    }
    setEncoding(i) {
      const w = new o(i), k = this._readableState.map || is;
      return this._readableState.map = function(A) {
        const L = w.push(A);
        return L === "" && (A.byteLength !== 0 || w.remaining > 0) ? null : k(L);
      }, this;
    }
    _read(i) {
      i(null);
    }
    pipe(i, w) {
      return this._readableState.updateNextTick(), this._readableState.pipe(i, w), i;
    }
    read() {
      return this._readableState.updateNextTick(), this._readableState.read();
    }
    push(i) {
      return this._readableState.updateNextTick(), this._readableState.push(i);
    }
    unshift(i) {
      return this._readableState.updateNextTick(), this._readableState.unshift(i);
    }
    resume() {
      return this._duplexState |= p, this._readableState.updateNextTick(), this;
    }
    pause() {
      return this._duplexState &= this._readableState.readAhead === !1 ? 536739583 : 536870655, this;
    }
    static _fromAsyncIterator(i, w) {
      let k;
      const A = new ft({ ...w, read(R) {
        i.next().then(L).then(R.bind(null, null)).catch(R);
      }, predestroy() {
        k = i.return();
      }, destroy(R) {
        if (!k) return R(null);
        k.then(R.bind(null, null)).catch(R);
      } });
      return A;
      function L(R) {
        R.done ? A.push(null) : A.push(R.value);
      }
    }
    static from(i, w) {
      if (yt(k = i) && k.readable) return i;
      var k;
      if (i[At]) return this._fromAsyncIterator(i[At](), w);
      Array.isArray(i) || (i = i === void 0 ? [] : [i]);
      let A = 0;
      return new ft({ ...w, read(L) {
        this.push(A === i.length ? null : i[A++]), L(null);
      } });
    }
    static isBackpressured(i) {
      return !!(17422 & i._duplexState) || i._readableState.buffered >= i._readableState.highWaterMark;
    }
    static isPaused(i) {
      return !(i._duplexState & f);
    }
    [At]() {
      const i = this;
      let w = null, k = null, A = null;
      return this.on("error", (O) => {
        w = O;
      }), this.on("readable", function() {
        k !== null && L(i.read());
      }), this.on("close", function() {
        k !== null && L(null);
      }), { [At]() {
        return this;
      }, next: () => new Promise(function(O, st) {
        k = O, A = st;
        const E = i.read();
        E !== null ? L(E) : 8 & i._duplexState && L(null);
      }), return: () => R(null), throw: (O) => R(O) };
      function L(O) {
        A !== null && (w ? A(w) : O !== null || i._duplexState & u ? k({ value: O, done: O === null }) : A(t), A = k = null);
      }
      function R(O) {
        return i.destroy(O), new Promise((st, E) => {
          if (8 & i._duplexState) return st({ value: void 0, done: !0 });
          i.once("close", function() {
            O ? E(O) : st({ value: void 0, done: !0 });
          });
        });
      }
    }
  }
  class Gt extends zt {
    constructor(i) {
      super(i), this._duplexState |= 16385, this._writableState = new Ae(this, i), i && (i.writev && (this._writev = i.writev), i.write && (this._write = i.write), i.final && (this._final = i.final), i.eagerOpen && this._writableState.updateNextTick());
    }
    cork() {
      this._duplexState |= Se;
    }
    uncork() {
      this._duplexState &= be, this._writableState.updateNextTick();
    }
    _writev(i, w) {
      w(null);
    }
    _write(i, w) {
      this._writableState.autoBatch(i, w);
    }
    _final(i) {
      i(null);
    }
    static isBackpressured(i) {
      return !!(146800654 & i._duplexState);
    }
    static drained(i) {
      if (i.destroyed) return Promise.resolve(!1);
      const w = i._writableState;
      var k;
      const A = ((k = i)._writev !== Gt.prototype._writev && k._writev !== Jt.prototype._writev ? Math.min(1, w.queue.length) : w.queue.length) + (i._duplexState & $n ? 1 : 0);
      return A === 0 ? Promise.resolve(!0) : (w.drains === null && (w.drains = []), new Promise((L) => {
        w.drains.push({ writes: A, resolve: L });
      }));
    }
    write(i) {
      return this._writableState.updateNextTick(), this._writableState.push(i);
    }
    end(i) {
      return this._writableState.updateNextTick(), this._writableState.end(i), this;
    }
  }
  class Jt extends ft {
    constructor(i) {
      super(i), this._duplexState = 1 | this._duplexState & m, this._writableState = new Ae(this, i), i && (i.writev && (this._writev = i.writev), i.write && (this._write = i.write), i.final && (this._final = i.final));
    }
    cork() {
      this._duplexState |= Se;
    }
    uncork() {
      this._duplexState &= be, this._writableState.updateNextTick();
    }
    _writev(i, w) {
      w(null);
    }
    _write(i, w) {
      this._writableState.autoBatch(i, w);
    }
    _final(i) {
      i(null);
    }
    write(i) {
      return this._writableState.updateNextTick(), this._writableState.push(i);
    }
    end(i) {
      return this._writableState.updateNextTick(), this._writableState.end(i), this;
    }
  }
  class Re extends Jt {
    constructor(i) {
      super(i), this._transformState = new Jn(this), i && (i.transform && (this._transform = i.transform), i.flush && (this._flush = i.flush));
    }
    _write(i, w) {
      this._readableState.buffered >= this._readableState.highWaterMark ? this._transformState.data = i : this._transform(i, this._transformState.afterTransform);
    }
    _read(i) {
      if (this._transformState.data !== null) {
        const w = this._transformState.data;
        this._transformState.data = null, i(null), this._transform(w, this._transformState.afterTransform);
      } else i(null);
    }
    destroy(i) {
      super.destroy(i), this._transformState.data !== null && (this._transformState.data = null, this._transformState.afterTransform());
    }
    _transform(i, w) {
      w(null, i);
    }
    _flush(i) {
      i(null);
    }
    _final(i) {
      this._transformState.afterFinal = i, this._flush(rs.bind(this));
    }
  }
  function rs(v, i) {
    const w = this._transformState.afterFinal;
    if (v) return w(v);
    i != null && this.push(i), this.push(null), w(null);
  }
  function Ee(v, ...i) {
    const w = Array.isArray(v) ? [...v, ...i] : [v, ...i], k = w.length && typeof w[w.length - 1] == "function" ? w.pop() : null;
    if (w.length < 2) throw new Error("Pipeline requires at least 2 streams");
    let A = w[0], L = null, R = null;
    for (let E = 1; E < w.length; E++) L = w[E], yt(A) ? A.pipe(L, st) : (O(A, !0, E > 1, st), A.pipe(L)), A = L;
    if (k) {
      let E = !1;
      const _t = yt(L) || !(!L._writableState || !L._writableState.autoDestroy);
      L.on("error", (Vt) => {
        R === null && (R = Vt);
      }), L.on("finish", () => {
        E = !0, _t || k(R);
      }), _t && L.on("close", () => k(R || (E ? null : e)));
    }
    return L;
    function O(E, _t, Vt, Yt) {
      E.on("error", Yt), E.on("close", function() {
        if (E._readableState && !E._readableState.ended || Vt && E._writableState && !E._writableState.ended) return Yt(e);
      });
    }
    function st(E) {
      if (E && !R) {
        R = E;
        for (const _t of w) _t.destroy(E);
      }
    }
  }
  function is(v) {
    return v;
  }
  function Pe(v) {
    return !!v._readableState || !!v._writableState;
  }
  function yt(v) {
    return typeof v._duplexState == "number" && Pe(v);
  }
  function qe(v) {
    return function(i) {
      return typeof i == "object" && i !== null && typeof i.byteLength == "number";
    }(v) ? v.byteLength : 1024;
  }
  function Be() {
  }
  function os() {
    this.destroy(new Error("Stream aborted."));
  }
  return on = { pipeline: Ee, pipelinePromise: function(...v) {
    return new Promise((i, w) => Ee(...v, (k) => {
      if (k) return w(k);
      i();
    }));
  }, isStream: Pe, isStreamx: yt, isEnded: function(v) {
    return !!v._readableState && v._readableState.ended;
  }, isFinished: function(v) {
    return !!v._writableState && v._writableState.ended;
  }, getStreamError: function(v, i = {}) {
    const w = v._readableState && v._readableState.error || v._writableState && v._writableState.error;
    return i.all || w !== t ? w : null;
  }, Stream: zt, Writable: Gt, Readable: ft, Duplex: Jt, Transform: Re, PassThrough: class extends Re {
  } };
}();
const P = ot(function() {
  if (dn) return cn;
  function r(t, e) {
    for (const n in e) Object.defineProperty(t, n, { value: e[n], enumerable: !0, configurable: !0 });
    return t;
  }
  return dn = 1, cn = function(t, e, n) {
    if (!t || typeof t == "string") throw new TypeError("Please pass an Error to err-code");
    n || (n = {}), typeof e == "object" && (n = e, e = ""), e && (n.code = e);
    try {
      return r(t, n);
    } catch {
      n.message = t.message, n.stack = t.stack;
      const o = function() {
      };
      return o.prototype = Object.create(Object.getPrototypeOf(t)), r(new o(), n);
    }
  };
}()), Nt = "0123456789abcdef", Pn = [], Ut = [];
for (let r = 0; r < 256; r++) Pn[r] = Nt[r >> 4 & 15] + Nt[15 & r], r < 16 && (r < 10 ? Ut[48 + r] = r : Ut[87 + r] = r);
const ut = (r) => {
  const t = r.length;
  let e = "", n = 0;
  for (; n < t; ) e += Pn[r[n++]];
  return e;
}, he = (r) => {
  const t = r.length >> 1, e = t << 1, n = new Uint8Array(t);
  let s = 0, o = 0;
  for (; o < e; ) n[s++] = Ut[r.charCodeAt(o++)] << 4 | Ut[r.charCodeAt(o++)];
  return n;
};
for (var vs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/", ks = typeof Uint8Array > "u" ? [] : new Uint8Array(256), Rt = 0; Rt < 64; Rt++) ks[vs.charCodeAt(Rt)] = Rt;
const Ts = new TextDecoder(), qn = (r, t) => Ts.decode(r), xs = new TextEncoder(), ye = (r) => xs.encode(r), ht = (r) => {
  let t, e = "", n = 0;
  const s = r.length;
  for (; n < s; ) t = r.charCodeAt(n++), e += Nt[t >> 4] + Nt[15 & t];
  return e;
}, Ct = (r) => {
  const t = he(r);
  if (t.length <= 65536) return String.fromCharCode(...t);
  let e = "", n = 0;
  for (; n < t.length; ) e += String.fromCharCode(...t.subarray(n, n += 65536));
  return e;
}, un = typeof window < "u" ? window : self, ce = un.crypto || un.msCrypto || {};
ce.subtle || ce.webkitSubtle;
const Ft = (r) => {
  const t = new Uint8Array(r);
  return ce.getRandomValues(t);
}, As = $("simple-peer"), Xt = 65536;
function ln(r) {
  return r.replace(/a=ice-options:trickle\s\n/g, "");
}
let vt = class de extends En.Duplex {
  constructor(e) {
    super(e = Object.assign({ allowHalfOpen: !1 }, e));
    _(this, "_pc");
    if (this.__objectMode = !!e.objectMode, this._id = ut(Ft(4)).slice(0, 7), this._debug("new peer %o", e), this.channelName = e.initiator ? e.channelName || ut(Ft(20)) : null, this.initiator = e.initiator || !1, this.channelConfig = e.channelConfig || de.channelConfig, this.channelNegotiated = this.channelConfig.negotiated, this.config = Object.assign({}, de.config, e.config), this.offerOptions = e.offerOptions || {}, this.answerOptions = e.answerOptions || {}, this.sdpTransform = e.sdpTransform || ((n) => n), this.trickle = e.trickle === void 0 || e.trickle, this.allowHalfTrickle = e.allowHalfTrickle !== void 0 && e.allowHalfTrickle, this.iceCompleteTimeout = e.iceCompleteTimeout || 5e3, this._destroying = !1, this._connected = !1, this.remoteAddress = void 0, this.remoteFamily = void 0, this.remotePort = void 0, this.localAddress = void 0, this.localFamily = void 0, this.localPort = void 0, !ae) throw P(typeof window > "u" ? new Error("No WebRTC support: Specify `opts.wrtc` option in this environment") : new Error("No WebRTC support: Not a supported browser"), "ERR_WEBRTC_SUPPORT");
    this._pcReady = !1, this._channelReady = !1, this._iceComplete = !1, this._iceCompleteTimer = null, this._channel = null, this._pendingCandidates = [], this._isNegotiating = !1, this._firstNegotiation = !0, this._batchedNegotiation = !1, this._queuedNegotiation = !1, this._sendersAwaitingStable = [], this._closingInterval = null, this._remoteTracks = [], this._remoteStreams = [], this._chunk = null, this._cb = null, this._interval = null;
    try {
      this._pc = new ae(this.config);
    } catch (n) {
      return void this.__destroy(P(n, "ERR_PC_CONSTRUCTOR"));
    }
    this._isReactNativeWebrtc = typeof this._pc._peerConnectionId == "number", this._pc.oniceconnectionstatechange = () => {
      this._onIceStateChange();
    }, this._pc.onicegatheringstatechange = () => {
      this._onIceStateChange();
    }, this._pc.onconnectionstatechange = () => {
      this._onConnectionStateChange();
    }, this._pc.onsignalingstatechange = () => {
      this._onSignalingStateChange();
    }, this._pc.onicecandidate = (n) => {
      this._onIceCandidate(n);
    }, typeof this._pc.peerIdentity == "object" && this._pc.peerIdentity.catch((n) => {
      this.__destroy(P(n, "ERR_PC_PEER_IDENTITY"));
    }), this.initiator || this.channelNegotiated ? this._setupData({ channel: this._pc.createDataChannel(this.channelName, this.channelConfig) }) : this._pc.ondatachannel = (n) => {
      this._setupData(n);
    }, this._debug("initial negotiation"), this._needsNegotiation(), this._onFinishBound = () => {
      this._onFinish();
    }, this.once("finish", this._onFinishBound);
  }
  get bufferSize() {
    return this._channel && this._channel.bufferedAmount || 0;
  }
  get connected() {
    return this._connected && this._channel.readyState === "open";
  }
  address() {
    return { port: this.localPort, family: this.localFamily, address: this.localAddress };
  }
  signal(e) {
    if (!this._destroying) {
      if (this.destroyed) throw P(new Error("cannot signal after peer is destroyed"), "ERR_DESTROYED");
      if (typeof e == "string") try {
        e = JSON.parse(e);
      } catch {
        e = {};
      }
      this._debug("signal()"), e.renegotiate && this.initiator && (this._debug("got request to renegotiate"), this._needsNegotiation()), e.transceiverRequest && this.initiator && (this._debug("got request for transceiver"), this.addTransceiver(e.transceiverRequest.kind, e.transceiverRequest.init)), e.candidate && (this._pc.remoteDescription && this._pc.remoteDescription.type ? this._addIceCandidate(e.candidate) : this._pendingCandidates.push(e.candidate)), e.sdp && this._pc.setRemoteDescription(new Ss(e)).then(() => {
        this.destroyed || (this._pendingCandidates.forEach((n) => {
          this._addIceCandidate(n);
        }), this._pendingCandidates = [], this._pc.remoteDescription.type === "offer" && this._createAnswer());
      }).catch((n) => {
        this.__destroy(P(n, "ERR_SET_REMOTE_DESCRIPTION"));
      }), e.sdp || e.candidate || e.renegotiate || e.transceiverRequest || this.__destroy(P(new Error("signal() called with invalid signal data"), "ERR_SIGNALING"));
    }
  }
  _addIceCandidate(e) {
    const n = new ws(e);
    this._pc.addIceCandidate(n).catch((s) => {
      var o;
      !n.address || n.address.endsWith(".local") ? (o = "Ignoring unsupported ICE candidate.", console.warn(o)) : this.__destroy(P(s, "ERR_ADD_ICE_CANDIDATE"));
    });
  }
  send(e) {
    if (!this._destroying) {
      if (this.destroyed) throw P(new Error("cannot send after peer is destroyed"), "ERR_DESTROYED");
      this._channel.send(e);
    }
  }
  _needsNegotiation() {
    this._debug("_needsNegotiation"), this._batchedNegotiation || (this._batchedNegotiation = !0, queueMicrotask(() => {
      this._batchedNegotiation = !1, this.initiator || !this._firstNegotiation ? (this._debug("starting batched negotiation"), this.negotiate()) : this._debug("non-initiator initial negotiation request discarded"), this._firstNegotiation = !1;
    }));
  }
  negotiate() {
    if (!this._destroying) {
      if (this.destroyed) throw P(new Error("cannot negotiate after peer is destroyed"), "ERR_DESTROYED");
      this.initiator ? this._isNegotiating ? (this._queuedNegotiation = !0, this._debug("already negotiating, queueing")) : (this._debug("start negotiation"), setTimeout(() => {
        this._createOffer();
      }, 0)) : this._isNegotiating ? (this._queuedNegotiation = !0, this._debug("already negotiating, queueing")) : (this._debug("requesting negotiation from initiator"), this.emit("signal", { type: "renegotiate", renegotiate: !0 })), this._isNegotiating = !0;
    }
  }
  _final(e) {
    this._readableState.ended || this.push(null), e(null);
  }
  __destroy(e) {
    this.end(), this._destroy(() => {
    }, e);
  }
  _destroy(e, n) {
    this.destroyed || this._destroying || (this._destroying = !0, this._debug("destroying (error: %s)", n && (n.message || n)), setTimeout(() => {
      if (this._connected = !1, this._pcReady = !1, this._channelReady = !1, this._remoteTracks = null, this._remoteStreams = null, this._senderMap = null, clearInterval(this._closingInterval), this._closingInterval = null, clearInterval(this._interval), this._interval = null, this._chunk = null, this._cb = null, this._onFinishBound && this.removeListener("finish", this._onFinishBound), this._onFinishBound = null, this._channel) {
        try {
          this._channel.close();
        } catch {
        }
        this._channel.onmessage = null, this._channel.onopen = null, this._channel.onclose = null, this._channel.onerror = null;
      }
      if (this._pc) {
        try {
          this._pc.close();
        } catch {
        }
        this._pc.oniceconnectionstatechange = null, this._pc.onicegatheringstatechange = null, this._pc.onsignalingstatechange = null, this._pc.onicecandidate = null, this._pc.ontrack = null, this._pc.ondatachannel = null;
      }
      this._pc = null, this._channel = null, n && this.emit("error", n), e();
    }, 0));
  }
  _setupData(e) {
    if (!e.channel) return this.__destroy(P(new Error("Data channel event is missing `channel` property"), "ERR_DATA_CHANNEL"));
    this._channel = e.channel, this._channel.binaryType = "arraybuffer", typeof this._channel.bufferedAmountLowThreshold == "number" && (this._channel.bufferedAmountLowThreshold = Xt), this.channelName = this._channel.label, this._channel.onmessage = (s) => {
      this._onChannelMessage(s);
    }, this._channel.onbufferedamountlow = () => {
      this._onChannelBufferedAmountLow();
    }, this._channel.onopen = () => {
      this._onChannelOpen();
    }, this._channel.onclose = () => {
      this._onChannelClose();
    }, this._channel.onerror = (s) => {
      const o = s.error instanceof Error ? s.error : new Error(`Datachannel error: ${s.message} ${s.filename}:${s.lineno}:${s.colno}`);
      this.__destroy(P(o, "ERR_DATA_CHANNEL"));
    };
    let n = !1;
    this._closingInterval = setInterval(() => {
      this._channel && this._channel.readyState === "closing" ? (n && this._onChannelClose(), n = !0) : n = !1;
    }, 5e3);
  }
  _write(e, n) {
    if (this.destroyed) return n(P(new Error("cannot write after peer is destroyed"), "ERR_DATA_CHANNEL"));
    if (this._connected) {
      try {
        this.send(e);
      } catch (s) {
        return this.__destroy(P(s, "ERR_DATA_CHANNEL"));
      }
      this._channel.bufferedAmount > Xt ? (this._debug("start backpressure: bufferedAmount %d", this._channel.bufferedAmount), this._cb = n) : n(null);
    } else this._debug("write before connect"), this._chunk = e, this._cb = n;
  }
  _onFinish() {
    if (this.destroyed) return;
    const e = () => {
      setTimeout(() => this.__destroy(), 1e3);
    };
    this._connected ? e() : this.once("connect", e);
  }
  _startIceCompleteTimeout() {
    this.destroyed || this._iceCompleteTimer || (this._debug("started iceComplete timeout"), this._iceCompleteTimer = setTimeout(() => {
      this._iceComplete || (this._iceComplete = !0, this._debug("iceComplete timeout completed"), this.emit("iceTimeout"), this.emit("_iceComplete"));
    }, this.iceCompleteTimeout));
  }
  _createOffer() {
    this.destroyed || this._pc.createOffer(this.offerOptions).then((e) => {
      if (this.destroyed) return;
      this.trickle || this.allowHalfTrickle || (e.sdp = ln(e.sdp)), e.sdp = this.sdpTransform(e.sdp);
      const n = () => {
        if (this.destroyed) return;
        const s = this._pc.localDescription || e;
        this._debug("signal"), this.emit("signal", { type: s.type, sdp: s.sdp });
      };
      this._pc.setLocalDescription(e).then(() => {
        this._debug("createOffer success"), this.destroyed || (this.trickle || this._iceComplete ? n() : this.once("_iceComplete", n));
      }).catch((s) => {
        this.__destroy(P(s, "ERR_SET_LOCAL_DESCRIPTION"));
      });
    }).catch((e) => {
      this.__destroy(P(e, "ERR_CREATE_OFFER"));
    });
  }
  _createAnswer() {
    this.destroyed || this._pc.createAnswer(this.answerOptions).then((e) => {
      if (this.destroyed) return;
      this.trickle || this.allowHalfTrickle || (e.sdp = ln(e.sdp)), e.sdp = this.sdpTransform(e.sdp);
      const n = () => {
        var o;
        if (this.destroyed) return;
        const s = this._pc.localDescription || e;
        this._debug("signal"), this.emit("signal", { type: s.type, sdp: s.sdp }), this.initiator || ((o = this._requestMissingTransceivers) == null || o.call(this));
      };
      this._pc.setLocalDescription(e).then(() => {
        this.destroyed || (this.trickle || this._iceComplete ? n() : this.once("_iceComplete", n));
      }).catch((s) => {
        this.__destroy(P(s, "ERR_SET_LOCAL_DESCRIPTION"));
      });
    }).catch((e) => {
      this.__destroy(P(e, "ERR_CREATE_ANSWER"));
    });
  }
  _onConnectionStateChange() {
    this.destroyed || this._destroying || this._pc.connectionState === "failed" && this.__destroy(P(new Error("Connection failed."), "ERR_CONNECTION_FAILURE"));
  }
  _onIceStateChange() {
    if (this.destroyed) return;
    const e = this._pc.iceConnectionState, n = this._pc.iceGatheringState;
    this._debug("iceStateChange (connection: %s) (gathering: %s)", e, n), this.emit("iceStateChange", e, n), e !== "connected" && e !== "completed" || (this._pcReady = !0, this._maybeReady()), e === "failed" && this.__destroy(P(new Error("Ice connection failed."), "ERR_ICE_CONNECTION_FAILURE")), e === "closed" && this.__destroy(P(new Error("Ice connection closed."), "ERR_ICE_CONNECTION_CLOSED"));
  }
  getStats(e) {
    const n = (s) => (Object.prototype.toString.call(s.values) === "[object Array]" && s.values.forEach((o) => {
      Object.assign(s, o);
    }), s);
    this._pc.getStats.length === 0 || this._isReactNativeWebrtc ? this._pc.getStats().then((s) => {
      const o = [];
      s.forEach((a) => {
        o.push(n(a));
      }), e(null, o);
    }, (s) => e(s)) : this._pc.getStats.length > 0 ? this._pc.getStats((s) => {
      if (this.destroyed) return;
      const o = [];
      s.result().forEach((a) => {
        const h = {};
        a.names().forEach((g) => {
          h[g] = a.stat(g);
        }), h.id = a.id, h.type = a.type, h.timestamp = a.timestamp, o.push(n(h));
      }), e(null, o);
    }, (s) => e(s)) : e(null, []);
  }
  _maybeReady() {
    if (this._debug("maybeReady pc %s channel %s", this._pcReady, this._channelReady), this._connected || this._connecting || !this._pcReady || !this._channelReady) return;
    this._connecting = !0;
    const e = () => {
      this.destroyed || this._destroying || this.getStats((n, s) => {
        if (this.destroyed || this._destroying) return;
        n && (s = []);
        const o = {}, a = {}, h = {};
        let g = !1;
        s.forEach((l) => {
          l.type !== "remotecandidate" && l.type !== "remote-candidate" || (o[l.id] = l), l.type !== "localcandidate" && l.type !== "local-candidate" || (a[l.id] = l), l.type !== "candidatepair" && l.type !== "candidate-pair" || (h[l.id] = l);
        });
        const S = (l) => {
          g = !0;
          let f = a[l.localCandidateId];
          f && (f.ip || f.address) ? (this.localAddress = f.ip || f.address, this.localPort = Number(f.port)) : f && f.ipAddress ? (this.localAddress = f.ipAddress, this.localPort = Number(f.portNumber)) : typeof l.googLocalAddress == "string" && (f = l.googLocalAddress.split(":"), this.localAddress = f[0], this.localPort = Number(f[1])), this.localAddress && (this.localFamily = this.localAddress.includes(":") ? "IPv6" : "IPv4");
          let b = o[l.remoteCandidateId];
          b && (b.ip || b.address) ? (this.remoteAddress = b.ip || b.address, this.remotePort = Number(b.port)) : b && b.ipAddress ? (this.remoteAddress = b.ipAddress, this.remotePort = Number(b.portNumber)) : typeof l.googRemoteAddress == "string" && (b = l.googRemoteAddress.split(":"), this.remoteAddress = b[0], this.remotePort = Number(b[1])), this.remoteAddress && (this.remoteFamily = this.remoteAddress.includes(":") ? "IPv6" : "IPv4"), this._debug("connect local: %s:%s remote: %s:%s", this.localAddress, this.localPort, this.remoteAddress, this.remotePort);
        };
        if (s.forEach((l) => {
          l.type === "transport" && l.selectedCandidatePairId && S(h[l.selectedCandidatePairId]), (l.type === "googCandidatePair" && l.googActiveConnection === "true" || (l.type === "candidatepair" || l.type === "candidate-pair") && l.selected) && S(l);
        }), g || Object.keys(h).length && !Object.keys(a).length) {
          if (this._connecting = !1, this._connected = !0, this._chunk) {
            try {
              this.send(this._chunk);
            } catch (f) {
              return this.__destroy(P(f, "ERR_DATA_CHANNEL"));
            }
            this._chunk = null, this._debug('sent chunk from "write before connect"');
            const l = this._cb;
            this._cb = null, l(null);
          }
          typeof this._channel.bufferedAmountLowThreshold != "number" && (this._interval = setInterval(() => this._onInterval(), 150), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect");
        } else setTimeout(e, 100);
      });
    };
    e();
  }
  _onInterval() {
    !this._cb || !this._channel || this._channel.bufferedAmount > Xt || this._onChannelBufferedAmountLow();
  }
  _onSignalingStateChange() {
    this.destroyed || (this._pc.signalingState === "stable" && (this._isNegotiating = !1, this._debug("flushing sender queue", this._sendersAwaitingStable), this._sendersAwaitingStable.forEach((e) => {
      this._pc.removeTrack(e), this._queuedNegotiation = !0;
    }), this._sendersAwaitingStable = [], this._queuedNegotiation ? (this._debug("flushing negotiation queue"), this._queuedNegotiation = !1, this._needsNegotiation()) : (this._debug("negotiated"), this.emit("negotiated"))), this._debug("signalingStateChange %s", this._pc.signalingState), this.emit("signalingStateChange", this._pc.signalingState));
  }
  _onIceCandidate(e) {
    this.destroyed || (e.candidate && this.trickle ? this.emit("signal", { type: "candidate", candidate: { candidate: e.candidate.candidate, sdpMLineIndex: e.candidate.sdpMLineIndex, sdpMid: e.candidate.sdpMid } }) : e.candidate || this._iceComplete || (this._iceComplete = !0, this.emit("_iceComplete")), e.candidate && this._startIceCompleteTimeout());
  }
  _onChannelMessage(e) {
    if (this.destroyed) return;
    let n = e.data;
    n instanceof ArrayBuffer ? n = new Uint8Array(n) : this.__objectMode === !1 && (n = ye(n)), this.push(n);
  }
  _onChannelBufferedAmountLow() {
    if (this.destroyed || !this._cb) return;
    this._debug("ending backpressure: bufferedAmount %d", this._channel.bufferedAmount);
    const e = this._cb;
    this._cb = null, e(null);
  }
  _onChannelOpen() {
    this._connected || this.destroyed || (this._debug("on channel open"), this._channelReady = !0, this._maybeReady());
  }
  _onChannelClose() {
    this.destroyed || (this._debug("on channel close"), this.__destroy());
  }
  _debug() {
    const e = [].slice.call(arguments);
    e[0] = "[" + this._id + "] " + e[0], As.apply(null, e);
  }
};
vt.WEBRTC_SUPPORT = !!ae, vt.config = { iceServers: [{ urls: ["stun:stun.l.google.com:19302", "stun:global.stun.twilio.com:3478"] }], sdpSemantics: "unified-plan" }, vt.channelConfig = {};
const ue = ot(Rn()), H = {}, le = { DEFAULT_ANNOUNCE_PEERS: 50, MAX_ANNOUNCE_PEERS: 82, parseUrl: (r) => {
  const t = new URL(r.replace(/^udp:/, "http:"));
  return r.match(/^udp:/) && Object.defineProperties(t, { href: { value: t.href.replace(/^http/, "udp") }, protocol: { value: t.protocol.replace(/^http/, "udp") }, origin: { value: t.origin.replace(/^http/, "udp") } }), t;
}, ...Object.freeze(Object.defineProperty({ __proto__: null, default: H }, Symbol.toStringTag, { value: "Module" })) }, Ls = $("simple-websocket"), wt = typeof H != "function" ? WebSocket : H;
class Bn extends En.Duplex {
  constructor(t = {}) {
    if (typeof t == "string" && (t = { url: t }), super(t = Object.assign({ allowHalfOpen: !1 }, t)), this.__objectMode = !!t.objectMode, t.objectMode != null && delete t.objectMode, t.url == null && t.socket == null) throw new Error("Missing required `url` or `socket` option");
    if (t.url != null && t.socket != null) throw new Error("Must specify either `url` or `socket` option, not both");
    if (this._id = ut(Ft(4)).slice(0, 7), this._debug("new websocket: %o", t), this.connected = !1, this._chunk = null, this._cb = null, this._interval = null, t.socket) this.url = t.socket.url, this._ws = t.socket, this.connected = t.socket.readyState === wt.OPEN;
    else {
      this.url = t.url;
      try {
        this._ws = typeof H == "function" ? new wt(t.url, { ...t, encoding: void 0 }) : new wt(t.url);
      } catch (e) {
        return void ue(() => this.destroy(e));
      }
    }
    this._ws.binaryType = "arraybuffer", t.socket && this.connected ? ue(() => this._handleOpen()) : this._ws.onopen = () => this._handleOpen(), this._ws.onmessage = (e) => this._handleMessage(e), this._ws.onclose = () => this._handleClose(), this._ws.onerror = (e) => this._handleError(e), this._handleFinishBound = () => this._handleFinish(), this.once("finish", this._handleFinishBound);
  }
  send(t) {
    this._ws.send(t);
  }
  _final(t) {
    this._readableState.ended || this.push(null), t(null);
  }
  _destroy(t) {
    if (!this.destroyed) {
      if (this._writableState.ended || this.end(), this.connected = !1, clearInterval(this._interval), this._interval = null, this._chunk = null, this._cb = null, this._handleFinishBound && this.removeListener("finish", this._handleFinishBound), this._handleFinishBound = null, this._ws) {
        const e = this._ws, n = () => {
          e.onclose = null;
        };
        if (e.readyState === wt.CLOSED) n();
        else try {
          e.onclose = n, e.close();
        } catch {
          n();
        }
        e.onopen = null, e.onmessage = null, e.onerror = () => {
        };
      }
      this._ws = null, t();
    }
  }
  _write(t, e) {
    if (this.destroyed) return e(new Error("cannot write after socket is destroyed"));
    if (this.connected) {
      try {
        this.send(t);
      } catch (n) {
        return this.destroy(n);
      }
      typeof H != "function" && this._ws.bufferedAmount > 65536 ? (this._debug("start backpressure: bufferedAmount %d", this._ws.bufferedAmount), this._cb = e) : e(null);
    } else this._debug("write before connect"), this._chunk = t, this._cb = e;
  }
  _handleOpen() {
    if (!this.connected && !this.destroyed) {
      if (this.connected = !0, this._chunk) {
        try {
          this.send(this._chunk);
        } catch (e) {
          return this.destroy(e);
        }
        this._chunk = null, this._debug('sent chunk from "write before connect"');
        const t = this._cb;
        this._cb = null, t(null);
      }
      typeof H != "function" && (this._interval = setInterval(() => this._onInterval(), 150), this._interval.unref && this._interval.unref()), this._debug("connect"), this.emit("connect");
    }
  }
  _handleMessage(t) {
    if (this.destroyed) return;
    let e = t.data;
    e instanceof ArrayBuffer && (e = new Uint8Array(e)), this.__objectMode === !1 && (e = ye(e)), this.push(e);
  }
  _handleClose() {
    this.destroyed || (this._debug("on close"), this.destroy());
  }
  _handleError(t) {
    this.destroy(new Error(`Error connecting to ${this.url}`));
  }
  _handleFinish() {
    if (this.destroyed) return;
    const t = () => {
      setTimeout(() => this.destroy(), 1e3);
    };
    this.connected ? t() : this.once("connect", t);
  }
  _onInterval() {
    if (!this._cb || !this._ws || this._ws.bufferedAmount > 65536) return;
    this._debug("ending backpressure: bufferedAmount %d", this._ws.bufferedAmount);
    const t = this._cb;
    this._cb = null, t(null);
  }
  _debug() {
    const t = [].slice.call(arguments);
    t[0] = "[" + this._id + "] " + t[0], Ls.apply(null, t);
  }
}
Bn.WEBSOCKET_SUPPORT = !!wt;
class Is extends In {
  constructor(t, e) {
    super(), this.client = t, this.announceUrl = e, this.interval = null, this.destroyed = !1;
  }
  setInterval(t) {
    t == null && (t = this.DEFAULT_ANNOUNCE_INTERVAL), clearInterval(this.interval), t && (this.interval = setInterval(() => {
      this.announce(this.client._defaultAnnounceOpts());
    }, t), this.interval.unref && this.interval.unref());
  }
}
const N = $("bittorrent-tracker:websocket-tracker"), W = {};
class ge extends Is {
  constructor(t, e) {
    super(t, e), N("new websocket tracker %s", e), this.peers = {}, this.socket = null, this.reconnecting = !1, this.retries = 0, this.reconnectTimer = null, this.expectingResponse = !1, this._openSocket();
  }
  announce(t) {
    if (this.destroyed || this.reconnecting) return;
    if (!this.socket.connected) return void this.socket.once("connect", () => {
      this.announce(t);
    });
    const e = Object.assign({}, t, { action: "announce", info_hash: this.client._infoHashBinary, peer_id: this.client._peerIdBinary });
    if (this._trackerId && (e.trackerid = this._trackerId), t.event === "stopped" || t.event === "completed") this._send(e);
    else {
      const n = Math.min(t.numwant, 5);
      this._generateOffers(n, (s) => {
        e.numwant = n, e.offers = s, this._send(e);
      });
    }
  }
  scrape(t) {
    if (this.destroyed || this.reconnecting) return;
    if (!this.socket.connected) return void this.socket.once("connect", () => {
      this.scrape(t);
    });
    const e = { action: "scrape", info_hash: Array.isArray(t.infoHash) && t.infoHash.length > 0 ? t.infoHash.map((n) => Ct(n)) : t.infoHash && Ct(t.infoHash) || this.client._infoHashBinary };
    this._send(e);
  }
  destroy(t = gn) {
    if (this.destroyed) return t(null);
    this.destroyed = !0, clearInterval(this.interval), clearTimeout(this.reconnectTimer);
    for (const o in this.peers) {
      const a = this.peers[o];
      clearTimeout(a.trackerTimeout), a.destroy();
    }
    if (this.peers = null, this.socket && (this.socket.removeListener("connect", this._onSocketConnectBound), this.socket.removeListener("data", this._onSocketDataBound), this.socket.removeListener("close", this._onSocketCloseBound), this.socket.removeListener("error", this._onSocketErrorBound), this.socket = null), this._onSocketConnectBound = null, this._onSocketErrorBound = null, this._onSocketDataBound = null, this._onSocketCloseBound = null, W[this.announceUrl] && (W[this.announceUrl].consumers -= 1), W[this.announceUrl].consumers > 0) return t();
    let e, n = W[this.announceUrl];
    if (delete W[this.announceUrl], n.on("error", gn), n.once("close", t), !this.expectingResponse) return s();
    function s() {
      e && (clearTimeout(e), e = null), n.removeListener("data", s), n.destroy(), n = null;
    }
    e = setTimeout(s, le.DESTROY_TIMEOUT), n.once("data", s);
  }
  _openSocket() {
    if (this.destroyed = !1, this.peers || (this.peers = {}), this._onSocketConnectBound = () => {
      this._onSocketConnect();
    }, this._onSocketErrorBound = (t) => {
      this._onSocketError(t);
    }, this._onSocketDataBound = (t) => {
      this._onSocketData(t);
    }, this._onSocketCloseBound = () => {
      this._onSocketClose();
    }, this.socket = W[this.announceUrl], this.socket) W[this.announceUrl].consumers += 1, this.socket.connected && this._onSocketConnectBound();
    else {
      const t = new URL(this.announceUrl);
      let e;
      this.client._proxyOpts && (e = t.protocol === "wss:" ? this.client._proxyOpts.httpsAgent : this.client._proxyOpts.httpAgent, !e && this.client._proxyOpts.socksProxy && (e = this.client._proxyOpts.socksProxy)), this.socket = W[this.announceUrl] = new Bn({ url: this.announceUrl, agent: e }), this.socket.consumers = 1, this.socket.once("connect", this._onSocketConnectBound);
    }
    this.socket.on("data", this._onSocketDataBound), this.socket.once("close", this._onSocketCloseBound), this.socket.once("error", this._onSocketErrorBound);
  }
  _onSocketConnect() {
    this.destroyed || this.reconnecting && (this.reconnecting = !1, this.retries = 0, this.announce(this.client._defaultAnnounceOpts()));
  }
  _onSocketData(t) {
    if (!this.destroyed) {
      this.expectingResponse = !1;
      try {
        t = JSON.parse(qn(t));
      } catch {
        return void this.client.emit("warning", new Error("Invalid tracker response"));
      }
      t.action === "announce" ? this._onAnnounceResponse(t) : t.action === "scrape" ? this._onScrapeResponse(t) : this._onSocketError(new Error(`invalid action in WS response: ${t.action}`));
    }
  }
  _onAnnounceResponse(t) {
    if (t.info_hash !== this.client._infoHashBinary) return void N("ignoring websocket data from %s for %s (looking for %s: reused socket)", this.announceUrl, ht(t.info_hash), this.client.infoHash);
    if (t.peer_id && t.peer_id === this.client._peerIdBinary) return;
    N("received %s from %s for %s", JSON.stringify(t), this.announceUrl, this.client.infoHash);
    const e = t["failure reason"];
    if (e) return this.client.emit("warning", new Error(e));
    const n = t["warning message"];
    n && this.client.emit("warning", new Error(n));
    const s = t.interval || t["min interval"];
    s && this.setInterval(1e3 * s);
    const o = t["tracker id"];
    if (o && (this._trackerId = o), t.complete != null) {
      const h = Object.assign({}, t, { announce: this.announceUrl, infoHash: ht(t.info_hash) });
      this.client.emit("update", h);
    }
    let a;
    if (t.offer && t.peer_id && (N("creating peer (from remote offer)"), a = this._createPeer(), a.id = ht(t.peer_id), a.once("signal", (h) => {
      const g = { action: "announce", info_hash: this.client._infoHashBinary, peer_id: this.client._peerIdBinary, to_peer_id: t.peer_id, answer: h, offer_id: t.offer_id };
      this._trackerId && (g.trackerid = this._trackerId), this._send(g);
    }), this.client.emit("peer", a), a.signal(t.offer)), t.answer && t.peer_id) {
      const h = ht(t.offer_id);
      a = this.peers[h], a ? (a.id = ht(t.peer_id), this.client.emit("peer", a), a.signal(t.answer), clearTimeout(a.trackerTimeout), a.trackerTimeout = null, delete this.peers[h]) : N(`got unexpected answer: ${JSON.stringify(t.answer)}`);
    }
  }
  _onScrapeResponse(t) {
    t = t.files || {};
    const e = Object.keys(t);
    e.length !== 0 ? e.forEach((n) => {
      const s = Object.assign(t[n], { announce: this.announceUrl, infoHash: ht(n) });
      this.client.emit("scrape", s);
    }) : this.client.emit("warning", new Error("invalid scrape response"));
  }
  _onSocketClose() {
    this.destroyed || (this.destroy(), this._startReconnectTimer());
  }
  _onSocketError(t) {
    this.destroyed || (this.destroy(), this.client.emit("warning", t), this._startReconnectTimer());
  }
  _startReconnectTimer() {
    const t = Math.floor(3e5 * Math.random()) + Math.min(1e4 * Math.pow(2, this.retries), 36e5);
    this.reconnecting = !0, clearTimeout(this.reconnectTimer), this.reconnectTimer = setTimeout(() => {
      this.retries++, this._openSocket();
    }, t), this.reconnectTimer.unref && this.reconnectTimer.unref(), N("reconnecting socket in %s ms", t);
  }
  _send(t) {
    if (this.destroyed) return;
    this.expectingResponse = !0;
    const e = JSON.stringify(t);
    N("send %s", e), this.socket.send(e);
  }
  _generateOffers(t, e) {
    const n = this, s = [];
    N("generating %s offers", t);
    for (let h = 0; h < t; ++h) o();
    function o() {
      const h = ut(Ft(20));
      N("creating peer (from _generateOffers)");
      const g = n.peers[h] = n._createPeer({ initiator: !0 });
      g.once("signal", (S) => {
        s.push({ offer: S, offer_id: Ct(h) }), a();
      }), g.trackerTimeout = setTimeout(() => {
        N("tracker timeout: destroying peer"), g.trackerTimeout = null, delete n.peers[h], g.destroy();
      }, 5e4), g.trackerTimeout.unref && g.trackerTimeout.unref();
    }
    function a() {
      s.length === t && (N("generated %s offers", t), e(s));
    }
    a();
  }
  _createPeer(t) {
    const e = this;
    t = Object.assign({ trickle: !1, config: e.client._rtcConfig, wrtc: e.client._wrtc }, t);
    const n = new vt(t);
    return n.once("error", s), n.once("connect", function o() {
      n.removeListener("error", s), n.removeListener("connect", o);
    }), n;
    function s(o) {
      e.client.emit("warning", new Error(`Connection error: ${o.message}`)), n.destroy();
    }
  }
}
function gn() {
}
ge.prototype.DEFAULT_ANNOUNCE_INTERVAL = 3e4, ge._socketPool = W;
const K = $("bittorrent-tracker:client");
class me extends In {
  constructor(t = {}) {
    if (super(), !t.peerId) throw new Error("Option `peerId` is required");
    if (!t.infoHash) throw new Error("Option `infoHash` is required");
    if (!t.announce) throw new Error("Option `announce` is required");
    if (!Mt.browser && !t.port) throw new Error("Option `port` is required");
    this.peerId = typeof t.peerId == "string" ? t.peerId : ut(t.peerId), this._peerIdBuffer = he(this.peerId), this._peerIdBinary = Ct(this.peerId), this.infoHash = typeof t.infoHash == "string" ? t.infoHash.toLowerCase() : ut(t.infoHash), this._infoHashBuffer = he(this.infoHash), this._infoHashBinary = Ct(this.infoHash), K("new client %s", this.infoHash), this.destroyed = !1, this._port = t.port, this._getAnnounceOpts = t.getAnnounceOpts, this._rtcConfig = t.rtcConfig, this._userAgent = t.userAgent, this._proxyOpts = t.proxyOpts, this._wrtc = typeof t.wrtc == "function" ? t.wrtc() : t.wrtc;
    let e = typeof t.announce == "string" ? [t.announce] : t.announce == null ? [] : t.announce;
    e = e.map((o) => (ArrayBuffer.isView(o) && (o = qn(o)), o[o.length - 1] === "/" && (o = o.substring(0, o.length - 1)), o)), e = Array.from(new Set(e));
    const n = this._wrtc !== !1 && (!!this._wrtc || vt.WEBRTC_SUPPORT), s = (o) => {
      ue(() => {
        this.emit("warning", o);
      });
    };
    this._trackers = e.map((o) => {
      let a;
      try {
        a = le.parseUrl(o);
      } catch {
        return s(new Error(`Invalid tracker URL: ${o}`)), null;
      }
      const h = a.port;
      if (h < 0 || h > 65535) return s(new Error(`Invalid tracker port: ${o}`)), null;
      const g = a.protocol;
      return g !== "http:" && g !== "https:" || typeof H != "function" ? g === "udp:" && typeof H == "function" ? new H(this, o) : g !== "ws:" && g !== "wss:" || !n || g === "ws:" && typeof window < "u" && window.location.protocol === "https:" ? (s(new Error(`Unsupported tracker protocol: ${o}`)), null) : new ge(this, o) : new H(this, o);
    }).filter(Boolean);
  }
  start(t) {
    (t = this._defaultAnnounceOpts(t)).event = "started", K("send `start` %o", t), this._announce(t), this._trackers.forEach((e) => {
      e.setInterval();
    });
  }
  stop(t) {
    (t = this._defaultAnnounceOpts(t)).event = "stopped", K("send `stop` %o", t), this._announce(t);
  }
  complete(t) {
    t || (t = {}), (t = this._defaultAnnounceOpts(t)).event = "completed", K("send `complete` %o", t), this._announce(t);
  }
  update(t) {
    (t = this._defaultAnnounceOpts(t)).event && delete t.event, K("send `update` %o", t), this._announce(t);
  }
  _announce(t) {
    this._trackers.forEach((e) => {
      e.announce(t);
    });
  }
  scrape(t) {
    K("send `scrape`"), t || (t = {}), this._trackers.forEach((e) => {
      e.scrape(t);
    });
  }
  setInterval(t) {
    K("setInterval %d", t), this._trackers.forEach((e) => {
      e.setInterval(t);
    });
  }
  destroy(t) {
    if (this.destroyed) return;
    this.destroyed = !0, K("destroy");
    const e = this._trackers.map((n) => (s) => {
      n.destroy(s);
    });
    _s(e, t), this._trackers = [], this._getAnnounceOpts = null;
  }
  _defaultAnnounceOpts(t = {}) {
    return t.numwant == null && (t.numwant = le.DEFAULT_ANNOUNCE_PEERS), t.uploaded == null && (t.uploaded = 0), t.downloaded == null && (t.downloaded = 0), this._getAnnounceOpts && (t = Object.assign({}, t, this._getAnnounceOpts())), t;
  }
}
me.scrape = (r, t) => {
  if (t = fs(t), !r.infoHash) throw new Error("Option `infoHash` is required");
  if (!r.announce) throw new Error("Option `announce` is required");
  const e = Object.assign({}, r, { infoHash: Array.isArray(r.infoHash) ? r.infoHash[0] : r.infoHash, peerId: ye("01234567890123456789"), port: 6881 }), n = new me(e);
  n.once("error", t), n.once("warning", t);
  let s = Array.isArray(r.infoHash) ? r.infoHash.length : 1;
  const o = {};
  return n.on("scrape", (a) => {
    if (s -= 1, o[a.infoHash] = a, s === 0) {
      n.destroy();
      const h = Object.keys(o);
      h.length === 1 ? t(null, o[h[0]]) : t(null, o);
    }
  }), n.scrape({ infoHash: r.infoHash }), n;
};
var mn, te = { exports: {} }, Rs = function() {
  if (mn) return te.exports;
  function r(C, c, u, d, m, p, y) {
    var T = C + (c & u | ~c & d) + (m >>> 0) + y;
    return (T << p | T >>> 32 - p) + c;
  }
  function t(C, c, u, d, m, p, y) {
    var T = C + (c & d | u & ~d) + (m >>> 0) + y;
    return (T << p | T >>> 32 - p) + c;
  }
  function e(C, c, u, d, m, p, y) {
    var T = C + (c ^ u ^ d) + (m >>> 0) + y;
    return (T << p | T >>> 32 - p) + c;
  }
  function n(C, c, u, d, m, p, y) {
    var T = C + (u ^ (c | ~d)) + (m >>> 0) + y;
    return (T << p | T >>> 32 - p) + c;
  }
  function s(C) {
    return String.fromCharCode(255 & C);
  }
  function o(C) {
    return s(C) + s(C >>> 8) + s(C >>> 16) + s(C >>> 24);
  }
  mn = 1;
  var a = function(C) {
    return unescape(encodeURIComponent(C));
  }, h = te.exports = function(C) {
    return S(C).toHex();
  }, g = h.fromBytes = function(C) {
    for (var c = function(M) {
      for (var F = M.length, et = F << 3, nt = new Uint32Array(F + 72 >>> 6 << 4), Y = 0, mt = M.length; Y < mt; ++Y) nt[Y >>> 2] |= M.charCodeAt(Y) << ((3 & Y) << 3);
      return nt[F >> 2] |= 128 << (31 & et), nt[nt.length - 2] = et, nt;
    }(C), u = 1732584193, d = 4023233417, m = 2562383102, p = 271733878, y = 0, T = c.length; y < T; y += 16) {
      var I = u, B = d, gt = m, Tt = p;
      u = r(u, d, m, p, c[y + 0], 7, 3614090360), p = r(p, u, d, m, c[y + 1], 12, 3905402710), m = r(m, p, u, d, c[y + 2], 17, 606105819), d = r(d, m, p, u, c[y + 3], 22, 3250441966), u = r(u, d, m, p, c[y + 4], 7, 4118548399), p = r(p, u, d, m, c[y + 5], 12, 1200080426), m = r(m, p, u, d, c[y + 6], 17, 2821735955), d = r(d, m, p, u, c[y + 7], 22, 4249261313), u = r(u, d, m, p, c[y + 8], 7, 1770035416), p = r(p, u, d, m, c[y + 9], 12, 2336552879), m = r(m, p, u, d, c[y + 10], 17, 4294925233), d = r(d, m, p, u, c[y + 11], 22, 2304563134), u = r(u, d, m, p, c[y + 12], 7, 1804603682), p = r(p, u, d, m, c[y + 13], 12, 4254626195), m = r(m, p, u, d, c[y + 14], 17, 2792965006), u = t(u, d = r(d, m, p, u, c[y + 15], 22, 1236535329), m, p, c[y + 1], 5, 4129170786), p = t(p, u, d, m, c[y + 6], 9, 3225465664), m = t(m, p, u, d, c[y + 11], 14, 643717713), d = t(d, m, p, u, c[y + 0], 20, 3921069994), u = t(u, d, m, p, c[y + 5], 5, 3593408605), p = t(p, u, d, m, c[y + 10], 9, 38016083), m = t(m, p, u, d, c[y + 15], 14, 3634488961), d = t(d, m, p, u, c[y + 4], 20, 3889429448), u = t(u, d, m, p, c[y + 9], 5, 568446438), p = t(p, u, d, m, c[y + 14], 9, 3275163606), m = t(m, p, u, d, c[y + 3], 14, 4107603335), d = t(d, m, p, u, c[y + 8], 20, 1163531501), u = t(u, d, m, p, c[y + 13], 5, 2850285829), p = t(p, u, d, m, c[y + 2], 9, 4243563512), m = t(m, p, u, d, c[y + 7], 14, 1735328473), u = e(u, d = t(d, m, p, u, c[y + 12], 20, 2368359562), m, p, c[y + 5], 4, 4294588738), p = e(p, u, d, m, c[y + 8], 11, 2272392833), m = e(m, p, u, d, c[y + 11], 16, 1839030562), d = e(d, m, p, u, c[y + 14], 23, 4259657740), u = e(u, d, m, p, c[y + 1], 4, 2763975236), p = e(p, u, d, m, c[y + 4], 11, 1272893353), m = e(m, p, u, d, c[y + 7], 16, 4139469664), d = e(d, m, p, u, c[y + 10], 23, 3200236656), u = e(u, d, m, p, c[y + 13], 4, 681279174), p = e(p, u, d, m, c[y + 0], 11, 3936430074), m = e(m, p, u, d, c[y + 3], 16, 3572445317), d = e(d, m, p, u, c[y + 6], 23, 76029189), u = e(u, d, m, p, c[y + 9], 4, 3654602809), p = e(p, u, d, m, c[y + 12], 11, 3873151461), m = e(m, p, u, d, c[y + 15], 16, 530742520), u = n(u, d = e(d, m, p, u, c[y + 2], 23, 3299628645), m, p, c[y + 0], 6, 4096336452), p = n(p, u, d, m, c[y + 7], 10, 1126891415), m = n(m, p, u, d, c[y + 14], 15, 2878612391), d = n(d, m, p, u, c[y + 5], 21, 4237533241), u = n(u, d, m, p, c[y + 12], 6, 1700485571), p = n(p, u, d, m, c[y + 3], 10, 2399980690), m = n(m, p, u, d, c[y + 10], 15, 4293915773), d = n(d, m, p, u, c[y + 1], 21, 2240044497), u = n(u, d, m, p, c[y + 8], 6, 1873313359), p = n(p, u, d, m, c[y + 15], 10, 4264355552), m = n(m, p, u, d, c[y + 6], 15, 2734768916), d = n(d, m, p, u, c[y + 13], 21, 1309151649), u = n(u, d, m, p, c[y + 4], 6, 4149444226), p = n(p, u, d, m, c[y + 11], 10, 3174756917), m = n(m, p, u, d, c[y + 2], 15, 718787259), d = n(d, m, p, u, c[y + 9], 21, 3951481745), u = u + I >>> 0, d = d + B >>> 0, m = m + gt >>> 0, p = p + Tt >>> 0;
    }
    var at = new String(o(u) + o(d) + o(m) + o(p));
    return at.toHex = function() {
      for (var M = "", F = 0, et = at.length; F < et; ++F) M += (256 + (255 & at.charCodeAt(F))).toString(16).substr(-2);
      return M;
    }, at;
  }, S = h.fromUtf8 = function(C) {
    return g(a(C));
  }, l = "./0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  function f(C, c) {
    for (var u = ""; --c >= 0; C >>>= 6) u += l.charAt(63 & C);
    return u;
  }
  var b = [0, 6, 12, 1, 7, 13, 2, 8, 14, 3, 9, 15, 4, 10, 5, 11], x = h.salt = function(C) {
    var c = "";
    C || (C = 8);
    do
      c += l.charAt(64 * Math.random() >>> 0);
    while (--C);
    return c;
  };
  return h.crypt = function(C, c) {
    if (C.length > 64) throw Error("too long key");
    c || (c = "$1$" + x()), C = a(C);
    for (var u = a(c.replace(/^\$1\$([^$]+)(?:\$.*)?$/, "$1")), d = g(C + u + C), m = C + "$1$" + u, p = C.length; p > 16; p -= 16) m += d;
    for (m += d.slice(0, p), p = C.length; p; p >>= 1) m += 1 & p ? "\0" : C.charAt(0);
    d = g(m);
    for (var y = 0; y < 1e3; ++y) d = g((1 & y ? C : d) + (y % 3 ? u : "") + (y % 7 ? C : "") + (1 & y ? d : C));
    var T = "$1$" + u + "$";
    for (y = 0; y < 15; y += 3) T += f(d.charCodeAt(b[y + 0]) << 16 | d.charCodeAt(b[y + 1]) << 8 | d.charCodeAt(b[y + 2]), 4);
    return T + f(d.charCodeAt(b[15]), 2);
  }, te.exports;
}();
const Es = ot(Rs), Ps = `-PM${function(r) {
  const t = r.split(".");
  return `${t[0].padStart(2, "0")}${t[1].padStart(2, "0")}`;
}("2.1.1")}-`, qs = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";
function tt(r) {
  return `${r.type}-${r.index}`;
}
function pn(r) {
  const { externalId: t } = r;
  return `(${tt(r.stream)} | ${t})`;
}
function On(r, t) {
  t === void 0 && (t = r.reduce((s, o) => s + o.byteLength, 0));
  const e = new Uint8Array(t);
  let n = 0;
  for (const s of r) e.set(s, n), n += s.byteLength;
  return e;
}
function fn(r) {
  const t = new TextEncoder(), e = new Uint8Array(r.length);
  return t.encodeInto(r, e), e;
}
function* yn(r) {
  for (let t = r.length - 1; t >= 0; t--) yield r[t];
}
function Dn(r) {
  return !!r && typeof r == "object" && !Array.isArray(r);
}
function X(r) {
  if (function(t) {
    return Array.isArray(t);
  }(r)) return r.map((t) => X(t));
  if (Dn(r)) {
    const t = {};
    for (const e of Object.keys(r)) t[e] = X(r[e]);
    return t;
  }
  return r;
}
function St(r, t, e = {}) {
  return typeof r != "object" || r === null || typeof t != "object" || t === null || Object.keys(t).forEach((n) => {
    if (n === "__proto__" || n === "constructor" || n === "prototype") throw new Error(`Attempt to modify restricted property '${String(n)}'`);
    const s = t[n], o = e[n];
    n in r && (r[n] = s === void 0 ? o === void 0 ? void 0 : o : s);
  }), r;
}
function ee(r) {
  const { defaultConfig: t, baseConfig: e = {}, specificStreamConfig: n = {} } = r, s = X({ ...t, ...e, ...n }), o = Object.keys(t), a = {};
  return o.forEach((h) => {
    h in s && (a[h] = s[h]);
  }), a;
}
var Z = ((r) => (r[r.SegmentsAnnouncement = 0] = "SegmentsAnnouncement", r[r.SegmentRequest = 1] = "SegmentRequest", r[r.SegmentData = 2] = "SegmentData", r[r.SegmentDataSendingCompleted = 3] = "SegmentDataSendingCompleted", r[r.SegmentAbsent = 4] = "SegmentAbsent", r[r.CancelSegmentRequest = 5] = "CancelSegmentRequest", r))(Z || {}), dt = ((r) => (r[r.Min = -1] = "Min", r[r.Int = 0] = "Int", r[r.SimilarIntArray = 1] = "SimilarIntArray", r[r.String = 2] = "String", r[r.Max = 3] = "Max", r))(dt || {});
function Bs(r) {
  const t = r < 0, e = function(o) {
    const a = o.toString(2), h = o < 0 ? a.length : a.length + 1;
    return Math.ceil(h / 8);
  }(r), n = new Uint8Array(e), s = BigInt(e);
  r = function(o) {
    return o < 0 ? -o : o;
  }(r);
  for (let o = 0; o < e; o++) {
    const a = r >> 8n * (s - 1n - BigInt(o)) & 0xffn;
    n[o] = Number(a);
  }
  return t && (n[0] = 128 | n[0]), n;
}
function Os(r) {
  const t = BigInt(r.length), e = (s, o) => {
    const a = 8n * (t - 1n - BigInt(o));
    return BigInt(s) << a;
  };
  let n = e(127 & r[0], 0);
  for (let s = 1; s < t; s++) n = e(r[s], s) | n;
  return (128 & r[0]) >> 7 && (n = -n), n;
}
function _n(r) {
  const t = Bs(r), e = 0 | t.length;
  return new Uint8Array([e, ...t]);
}
function Mn(r) {
  const t = r[0];
  if (t >> 4) throw new Error("Trying to deserialize integer with invalid serialized item code");
  const e = 15 & t, n = 1 + e;
  return { number: Os(r.slice(1, n)), byteLength: e + 1 };
}
function Ds(r) {
  const [t, e] = r;
  if (t >> 4 !== 1) throw new Error("Trying to deserialize similar int array with invalid serialized item code");
  let n = 2;
  const s = [];
  for (let o = 0; o < e; o++) {
    const { number: a, byteLength: h } = Mn(r.slice(n));
    n += h;
    const g = 0xffn & a, S = -256n & a;
    for (let l = 0; l < g; l++) {
      const f = BigInt(r[n]);
      s.push(S | f), n++;
    }
  }
  return { numbers: s, byteLength: n };
}
function Ms(r) {
  const [t, e] = r;
  if (t >> 4 !== 2) throw new Error("Trying to deserialize bytes (sting) with invalid serialized item code.");
  const n = (15 & t) << 8 | e, s = r.slice(2, n + 2);
  return { string: new TextDecoder("utf8").decode(s), byteLength: n + 2 };
}
class bt {
  constructor() {
    _(this, "bytes", []);
    _(this, "_length", 0);
  }
  push(t) {
    this.addBytes(t, "end");
  }
  unshift(t) {
    this.addBytes(t, "start");
  }
  addBytes(t, e) {
    let n;
    n = t instanceof Uint8Array ? t : Array.isArray(t) ? new Uint8Array(t) : new Uint8Array([t]), this._length += n.length, this.bytes[e === "start" ? "unshift" : "push"](n);
  }
  getBytesChunks() {
    return this.bytes;
  }
  getBuffer() {
    return On(this.bytes, this._length);
  }
  get length() {
    return this._length;
  }
}
const lt = Wt("cstr", 4), kt = Wt("cend", 4), pe = Wt("dstr", 4), fe = Wt("dend", 4), Ns = [lt, pe], Us = [kt, fe], Sn = lt.length + kt.length;
function Nn(r) {
  const { length: t } = lt, e = r.slice(-t);
  return Ns.some((n) => $t(r, n, 4)) && Us.some((n) => $t(e, n, 4));
}
class Ht extends Error {
  constructor(t) {
    super(), this.type = t;
  }
}
class Un {
  constructor(t) {
    _(this, "chunks", new bt());
    _(this, "status", "joining");
    this.onComplete = t;
  }
  addCommandChunk(t) {
    if (this.status === "completed") return;
    const e = $t(t, lt, 4);
    if (!this.chunks.length && !e) throw new Ht("no-first-chunk");
    if (this.chunks.length && e) throw new Ht("incomplete-joining");
    this.chunks.push(this.unframeCommandChunk(t)), function(n) {
      return $t(n.slice(-4), kt, 4);
    }(t) && (this.status = "completed", this.onComplete(this.chunks.getBuffer()));
  }
  unframeCommandChunk(t) {
    return t.slice(4, t.length - 4);
  }
}
class Et {
  constructor(t, e) {
    _(this, "bytes", new bt());
    _(this, "resultBuffers", []);
    _(this, "status", "creating");
    this.maxChunkLength = e, this.bytes.push(t);
  }
  addInteger(t, e) {
    this.bytes.push(t.charCodeAt(0));
    const n = _n(BigInt(e));
    this.bytes.push(n);
  }
  addSimilarIntArr(t, e) {
    this.bytes.push(t.charCodeAt(0));
    const n = function(s) {
      const o = /* @__PURE__ */ new Map();
      for (const h of s) {
        const g = -256n & h, S = 0xffn & h, l = o.get(g) ?? new bt();
        l.length || o.set(g, l), l.push(Number(S));
      }
      const a = new bt();
      a.push([16, o.size]);
      for (const [h, g] of o) {
        const { length: S } = g.getBytesChunks(), l = h | 0xffn & BigInt(S);
        g.unshift(_n(l)), a.push(g.getBuffer());
      }
      return a.getBuffer();
    }(e.map((s) => BigInt(s)));
    this.bytes.push(n);
  }
  addString(t, e) {
    this.bytes.push(t.charCodeAt(0));
    const n = function(s) {
      const { length: o } = s, a = new bt();
      return a.push([32 | o >> 8 & 15, 255 & o]), a.push(new TextEncoder().encode(s)), a.getBuffer();
    }(e);
    this.bytes.push(n);
  }
  complete() {
    if (!this.bytes.length) throw new Error("Buffer is empty");
    if (this.status === "completed") return;
    this.status = "completed";
    const t = this.bytes.getBuffer();
    if (t.length + Sn <= this.maxChunkLength) return void this.resultBuffers.push(Pt(t, lt, kt));
    let e = Math.ceil(t.length / this.maxChunkLength);
    Math.ceil(t.length / e) + Sn > this.maxChunkLength && e++;
    for (const [n, s] of function* (o, a) {
      const h = Math.ceil(o.length / a);
      for (let g = 0; g < a; g++) yield [g, o.slice(g * h, (g + 1) * h)];
    }(t, e)) n === 0 ? this.resultBuffers.push(Pt(s, lt, fe)) : n === e - 1 ? this.resultBuffers.push(Pt(s, pe, kt)) : this.resultBuffers.push(Pt(s, pe, fe));
  }
  getResultBuffers() {
    if (this.status === "creating" || !this.resultBuffers.length) throw new Error("Command is not complete.");
    return this.resultBuffers;
  }
}
function Fn(r) {
  const [t] = r, e = { c: t };
  let n = 1;
  for (; n < r.length; ) {
    const s = String.fromCharCode(r[n]);
    switch (n++, Fs(r[n])) {
      case dt.Int:
        {
          const { number: o, byteLength: a } = Mn(r.slice(n));
          e[s] = Number(o), n += a;
        }
        break;
      case dt.SimilarIntArray:
        {
          const { numbers: o, byteLength: a } = Ds(r.slice(n));
          e[s] = o.map((h) => Number(h)), n += a;
        }
        break;
      case dt.String: {
        const { string: o, byteLength: a } = Ms(r.slice(n));
        e[s] = o, n += a;
      }
    }
  }
  return e;
}
function Fs(r) {
  const t = r >> 4;
  if (t <= dt.Min || t >= dt.Max) throw new Error("Not existing type");
  return t;
}
function Wt(r, t) {
  if (r.length !== t) throw new Error("Wrong string length");
  const e = new Uint8Array(t);
  for (let n = 0; n < r.length; n++) e[n] = r.charCodeAt(n);
  return e;
}
function Pt(r, t, e) {
  const n = new Uint8Array(r.length + t.length + e.length);
  return n.set(t), n.set(r, t.length), n.set(e, t.length + r.length), n;
}
function $t(r, t, e) {
  for (let n = 0; n < e; n++) if (r[n] !== t[n]) return !1;
  return !0;
}
function Hn(r, t) {
  switch (r.c) {
    case Z.CancelSegmentRequest:
    case Z.SegmentAbsent:
    case Z.SegmentDataSendingCompleted:
      return function(e, n) {
        const s = new Et(e.c, n);
        return s.addInteger("i", e.i), s.addInteger("r", e.r), s.complete(), s.getResultBuffers();
      }(r, t);
    case Z.SegmentRequest:
      return function(e, n) {
        const s = new Et(e.c, n);
        return s.addInteger("i", e.i), s.addInteger("r", e.r), e.b && s.addInteger("b", e.b), s.complete(), s.getResultBuffers();
      }(r, t);
    case Z.SegmentsAnnouncement:
      return function(e, n) {
        const { c: s, p: o, l: a } = e, h = new Et(s, n);
        return a != null && a.length && h.addSimilarIntArr("l", a), o != null && o.length && h.addSimilarIntArr("p", o), h.complete(), h.getResultBuffers();
      }(r, t);
    case Z.SegmentData:
      return function(e, n) {
        const s = new Et(e.c, n);
        return s.addInteger("i", e.i), s.addInteger("s", e.s), s.addInteger("r", e.r), s.complete(), s.getResultBuffers();
      }(r, t);
  }
}
const Hs = Object.freeze(Object.defineProperty({ __proto__: null, BinaryCommandChunksJoiner: Un, BinaryCommandJoiningError: Ht, PeerCommandType: Z, deserializeCommand: Fn, isCommandChunk: Nn, serializePeerCommand: Hn }, Symbol.toStringTag, { value: "Module" }));
class $s {
  constructor(t, e, n, s) {
    _(this, "commandChunks");
    _(this, "uploadingContext");
    _(this, "onChunkDownloaded");
    _(this, "onChunkUploaded");
    _(this, "onDataReceived", (t) => {
      Nn(t) ? this.receivingCommandBytes(t) : (this.eventHandlers.onSegmentChunkReceived(t), this.onChunkDownloaded(t.byteLength, "p2p", this.connection.idUtf8));
    });
    this.connection = t, this.peerConfig = e, this.eventHandlers = n, this.onChunkDownloaded = s.getEventDispatcher("onChunkDownloaded"), this.onChunkUploaded = s.getEventDispatcher("onChunkUploaded"), t.on("data", this.onDataReceived);
  }
  sendCommand(t) {
    const e = Hn(t, this.peerConfig.webRtcMaxMessageSize);
    for (const n of e) this.connection.write(n);
  }
  stopUploadingSegmentData() {
    var t;
    (t = this.uploadingContext) == null || t.stopUploading(), this.uploadingContext = void 0;
  }
  getUploadingRequestId() {
    var t;
    return (t = this.uploadingContext) == null ? void 0 : t.requestId;
  }
  async splitSegmentDataToChunksAndUploadAsync(t, e) {
    if (this.uploadingContext) throw new Error("Some segment data is already uploading.");
    const n = function* (l, f) {
      let b = l.byteLength;
      for (; b > 0; ) {
        const x = b >= f ? f : b, C = l.byteLength - b, c = l.slice(C, C + x);
        b -= x, yield c;
      }
    }(t, this.peerConfig.webRtcMaxMessageSize), { promise: s, resolve: o, reject: a } = function() {
      let l, f;
      return { promise: new Promise((b, x) => {
        l = b, f = x;
      }), resolve: l, reject: f };
    }();
    let h = !1;
    const g = { stopUploading: () => {
      h = !1;
    }, requestId: e };
    this.uploadingContext = g;
    const S = () => {
      if (h) for (; ; ) {
        const l = n.next().value;
        if (!l) {
          o();
          break;
        }
        const f = this.connection.write(l);
        if (this.onChunkUploaded(l.byteLength, this.connection.idUtf8), !f) break;
      }
      else a();
    };
    try {
      this.connection.on("drain", S), h = !0, S(), await s;
    } finally {
      this.connection.off("drain", S), this.uploadingContext === g && (this.uploadingContext = void 0);
    }
  }
  receivingCommandBytes(t) {
    this.commandChunks || (this.commandChunks = new Un((e) => {
      this.commandChunks = void 0;
      const n = Fn(e);
      this.eventHandlers.onCommandReceived(n);
    }));
    try {
      this.commandChunks.addCommandChunk(t);
    } catch (e) {
      if (!(e instanceof Ht)) return;
      this.commandChunks = void 0;
    }
  }
}
const { PeerCommandType: D } = Hs;
class jt {
  constructor(t, e, n, s, o) {
    _(this, "id");
    _(this, "peerProtocol");
    _(this, "downloadingContext");
    _(this, "loadedSegments", /* @__PURE__ */ new Set());
    _(this, "httpLoadingSegments", /* @__PURE__ */ new Set());
    _(this, "downloadingErrors", []);
    _(this, "logger", $("p2pml-core:peer"));
    _(this, "onPeerClosed");
    _(this, "onCommandReceived", async (t) => {
      var e, n, s;
      switch (t.c) {
        case D.SegmentsAnnouncement:
          this.loadedSegments = new Set(t.l), this.httpLoadingSegments = new Set(t.p), this.eventHandlers.onSegmentsAnnouncement();
          break;
        case D.SegmentRequest:
          this.peerProtocol.stopUploadingSegmentData(), this.eventHandlers.onSegmentRequested(this, t.i, t.r, t.b);
          break;
        case D.SegmentData:
          {
            if (!this.downloadingContext || this.downloadingContext.isSegmentDataCommandReceived) break;
            const { request: o, controls: a, requestId: h } = this.downloadingContext;
            if (o.segment.externalId !== t.i || h !== t.r) break;
            this.downloadingContext.isSegmentDataCommandReceived = !0, a.firstBytesReceived(), o.totalBytes === void 0 ? o.setTotalBytes(t.s) : o.totalBytes - o.loadedBytes !== t.s && (o.clearLoadedBytes(), this.sendCancelSegmentRequestCommand(o.segment, h), this.cancelSegmentDownloading("peer-response-bytes-length-mismatch"), this.destroy());
          }
          break;
        case D.SegmentDataSendingCompleted: {
          const { downloadingContext: o } = this;
          if (!(o != null && o.isSegmentDataCommandReceived)) return;
          const { request: a, controls: h } = o;
          if (o.request.segment.externalId !== t.i || o.requestId !== t.r) return a.clearLoadedBytes(), this.cancelSegmentDownloading("peer-protocol-violation"), void this.destroy();
          if (a.loadedBytes !== a.totalBytes) return a.clearLoadedBytes(), this.cancelSegmentDownloading("peer-response-bytes-length-mismatch"), void this.destroy();
          const g = await ((n = (e = this.peerConfig).validateP2PSegment) == null ? void 0 : n.call(e, a.segment.url, a.segment.byteRange, a.data)) ?? !0;
          if (this.downloadingContext !== o) return;
          if (!g) return a.clearLoadedBytes(), this.cancelSegmentDownloading("p2p-segment-validation-failed"), void this.destroy();
          this.downloadingErrors = [], h.completeOnSuccess(), this.downloadingContext = void 0;
          break;
        }
        case D.SegmentAbsent:
          ((s = this.downloadingContext) == null ? void 0 : s.request.segment.externalId) === t.i && this.downloadingContext.requestId === t.r && (this.cancelSegmentDownloading("peer-segment-absent"), this.loadedSegments.delete(t.i));
          break;
        case D.CancelSegmentRequest:
          if (this.peerProtocol.getUploadingRequestId() !== t.r) break;
          this.peerProtocol.stopUploadingSegmentData();
          break;
      }
    });
    _(this, "onSegmentChunkReceived", (t) => {
      var s;
      if (!((s = this.downloadingContext) != null && s.isSegmentDataCommandReceived)) return;
      const { request: e, controls: n } = this.downloadingContext;
      if (e.totalBytes !== void 0 && e.loadedBytes + t.byteLength > e.totalBytes) return e.clearLoadedBytes(), this.cancelSegmentDownloading("peer-response-bytes-length-mismatch"), void this.destroy();
      n.addLoadedChunk(t);
    });
    _(this, "onPeerConnectionClosed", () => {
      this.destroy();
    });
    _(this, "onConnectionError", (t) => {
      this.logger(`peer connection error ${this.id} %O`, t), this.eventTarget.getEventDispatcher("onPeerError")({ peerId: this.id, streamType: this.streamType, error: t });
      const { code: e } = t;
      (e === "ERR_DATA_CHANNEL" || e === "ERR_CONNECTION_FAILURE") && this.destroy();
    });
    _(this, "destroy", () => {
      this.cancelSegmentDownloading("peer-closed"), this.connection.destroy(), this.eventHandlers.onPeerClosed(this), this.onPeerClosed({ peerId: this.id, streamType: this.streamType }), this.logger(`peer closed ${this.id}`);
    });
    this.connection = t, this.eventHandlers = e, this.peerConfig = n, this.streamType = s, this.eventTarget = o, this.onPeerClosed = o.getEventDispatcher("onPeerClose"), this.id = jt.getPeerIdFromConnection(t), this.peerProtocol = new $s(t, n, { onSegmentChunkReceived: this.onSegmentChunkReceived, onCommandReceived: this.onCommandReceived }, o), o.getEventDispatcher("onPeerConnect")({ peerId: this.id, streamType: s }), t.on("error", this.onConnectionError), t.on("close", this.onPeerConnectionClosed), t.on("end", this.onPeerConnectionClosed), t.on("finish", this.onPeerConnectionClosed);
  }
  get downloadingSegment() {
    var t;
    return (t = this.downloadingContext) == null ? void 0 : t.request.segment;
  }
  getSegmentStatus(t) {
    const { externalId: e } = t;
    return this.loadedSegments.has(e) ? "loaded" : this.httpLoadingSegments.has(e) ? "http-loading" : void 0;
  }
  downloadSegment(t) {
    if (this.downloadingContext) throw new Error("Some segment already is downloading");
    this.downloadingContext = { request: t, requestId: Math.floor(1e3 * Math.random()), isSegmentDataCommandReceived: !1, controls: t.start({ downloadSource: "p2p", peerId: this.id }, { notReceivingBytesTimeoutMs: this.peerConfig.p2pNotReceivingBytesTimeoutMs, abort: (n) => {
      if (!this.downloadingContext) return;
      const { request: s, requestId: o } = this.downloadingContext;
      this.sendCancelSegmentRequestCommand(s.segment, o), this.downloadingErrors.push(n), this.downloadingContext = void 0, this.downloadingErrors.filter((a) => a.type === "bytes-receiving-timeout").length >= this.peerConfig.p2pErrorRetries && this.destroy();
    } }) };
    const e = { c: D.SegmentRequest, r: this.downloadingContext.requestId, i: t.segment.externalId };
    t.loadedBytes && (e.b = t.loadedBytes), this.peerProtocol.sendCommand(e);
  }
  async uploadSegmentData(t, e, n) {
    const { externalId: s } = t;
    this.logger(`send segment ${t.externalId} to ${this.id}`);
    const o = { c: D.SegmentData, i: s, r: e, s: n.byteLength };
    this.peerProtocol.sendCommand(o);
    try {
      await this.peerProtocol.splitSegmentDataToChunksAndUploadAsync(n, e), this.sendSegmentDataSendingCompletedCommand(t, e), this.logger(`segment ${s} has been sent to ${this.id}`);
    } catch {
      this.logger(`cancel segment uploading ${s}`);
    }
  }
  cancelSegmentDownloading(t) {
    if (!this.downloadingContext) return;
    const { request: e, controls: n } = this.downloadingContext, { segment: s } = e;
    this.logger(`cancel segment request ${s.externalId} (${t})`);
    const o = new U(t);
    n.abortOnError(o), this.downloadingContext = void 0, this.downloadingErrors.push(o);
  }
  sendSegmentsAnnouncementCommand(t, e) {
    const n = { c: D.SegmentsAnnouncement, p: e, l: t };
    this.peerProtocol.sendCommand(n);
  }
  sendSegmentAbsentCommand(t, e) {
    this.peerProtocol.sendCommand({ c: D.SegmentAbsent, i: t, r: e });
  }
  sendCancelSegmentRequestCommand(t, e) {
    this.peerProtocol.sendCommand({ c: D.CancelSegmentRequest, i: t.externalId, r: e });
  }
  sendSegmentDataSendingCompletedCommand(t, e) {
    this.peerProtocol.sendCommand({ c: D.SegmentDataSendingCompleted, r: e, i: t.externalId });
  }
  static getPeerIdFromConnection(t) {
    return function(e) {
      const n = new Uint8Array(e.length / 2);
      for (let s = 0; s < e.length; s += 2) n[s / 2] = parseInt(e.slice(s, s + 2), 16);
      return new TextDecoder().decode(n);
    }(t.id);
  }
}
function js() {
  const r = /^((?!chrome|android).)*safari/i.test(navigator.userAgent), t = /\b(iPad|iPhone|Macintosh).*AppleWebKit(?!.*Safari)/i.test(navigator.userAgent);
  return r || t;
}
class Ws {
  constructor(t, e, n, s, o) {
    _(this, "streamShortId");
    _(this, "client");
    _(this, "_peers", /* @__PURE__ */ new Map());
    _(this, "logger", $("p2pml-core:p2p-tracker-client"));
    _(this, "onReceivePeerConnection", (t) => {
      const e = jt.getPeerIdFromConnection(t);
      let n = this._peers.get(e);
      n != null && n.peer ? t.destroy() : (n || (n = { potentialConnections: /* @__PURE__ */ new Set() }, t.idUtf8 = e, n.potentialConnections.add(t), this._peers.set(e, n)), t.on("connect", () => {
        if (!n.peer) {
          for (const s of n.potentialConnections) s !== t && s.destroy();
          n.potentialConnections.clear(), n.peer = new jt(t, { onPeerClosed: this.onPeerClosed, onSegmentRequested: this.eventHandlers.onSegmentRequested, onSegmentsAnnouncement: this.eventHandlers.onSegmentsAnnouncement }, this.config, this.stream.type, this.eventTarget), this.logger(`connected with peer: ${n.peer.id} ${this.streamShortId}`), this.eventHandlers.onPeerConnected(n.peer);
        }
      }));
    });
    _(this, "onTrackerClientWarning", (t) => {
      this.logger(`tracker warning (${this.streamShortId}: ${t})`), this.eventTarget.getEventDispatcher("onTrackerWarning")({ streamType: this.stream.type, warning: t });
    });
    _(this, "onTrackerClientError", (t) => {
      this.logger(`tracker error (${this.streamShortId}: ${t})`), this.eventTarget.getEventDispatcher("onTrackerError")({ streamType: this.stream.type, error: t });
    });
    _(this, "onPeerClosed", (t) => {
      this.logger(`peer closed: ${t.id}`), this._peers.delete(t.id);
    });
    this.stream = e, this.eventHandlers = n, this.config = s, this.eventTarget = o;
    const a = function(g) {
      const S = Es.fromUtf8(g).slice(1);
      return btoa(S);
    }(t);
    this.streamShortId = tt(e);
    const h = function(g) {
      const S = [g], l = 20 - g.length;
      for (let f = 0; f < l; f++) S.push(qs[Math.floor(62 * Math.random())]);
      return S.join("");
    }(s.trackerClientVersionPrefix);
    this.client = new me({ infoHash: fn(a), peerId: fn(h), announce: js() ? s.announceTrackers.slice(0, 1) : s.announceTrackers, rtcConfig: this.config.rtcConfig }), this.client.on("peer", this.onReceivePeerConnection), this.client.on("warning", this.onTrackerClientWarning), this.client.on("error", this.onTrackerClientError), this.logger(`create new client; 
stream: ${this.streamShortId}; hash: ${a}
peerId: ${h}`);
  }
  start() {
    this.client.start();
  }
  destroy() {
    this.client.destroy();
    for (const { peer: t, potentialConnections: e } of this._peers.values()) {
      t == null || t.destroy();
      for (const n of e) n.destroy();
    }
    this._peers.clear(), this.logger(`destroy client; stream: ${this.streamShortId}`);
  }
  *peers() {
    for (const t of this._peers.values()) t.peer && (yield t.peer);
  }
}
function J(r, t) {
  return `v2-${r}-${function(e) {
    return `${e.type}-${e.index}`;
  }(t)}`;
}
function wn(r, t) {
  for (const e of r.values()) {
    const n = e.segments.get(t);
    if (n) return n;
  }
}
function ne(r, t, e, n, s) {
  const { highDemandTimeWindow: o, httpDownloadTimeWindow: a, p2pDownloadTimeWindow: h } = function(g, S) {
    const { highDemandTimeWindow: l, httpDownloadTimeWindow: f, p2pDownloadTimeWindow: b } = g, x = { highDemandTimeWindow: l, httpDownloadTimeWindow: f, p2pDownloadTimeWindow: b };
    return S <= 5 ? (x.httpDownloadTimeWindow = 0, x.p2pDownloadTimeWindow = 0) : S <= 10 && (x.p2pDownloadTimeWindow = x.httpDownloadTimeWindow), x;
  }(e, s);
  return { isHighDemand: se(r, t, o), isHttpDownloadable: se(r, t, a), isP2PDownloadable: se(r, t, h) && n.isSegmentLoadingOrLoadedBySomeone(r) };
}
function se(r, t, e) {
  const { startTime: n, endTime: s } = r, { position: o, rate: a } = t;
  return !(o + e * a < n || o > s);
}
class Qs {
  constructor(t, e, n, s, o, a, h) {
    _(this, "trackerClient");
    _(this, "isAnnounceMicrotaskCreated", !1);
    _(this, "onPeerConnected", (t) => {
      if (this.config.isP2PUploadDisabled) return;
      const { httpLoading: e, loaded: n } = this.getSegmentsAnnouncement();
      t.sendSegmentsAnnouncementCommand(n, e);
    });
    _(this, "broadcastAnnouncement", (t = !1) => {
      if (t) return void this.sendSegmentsAnnouncement([], []);
      if (this.isAnnounceMicrotaskCreated || this.config.isP2PUploadDisabled) return;
      const { loaded: e, httpLoading: n } = this.getSegmentsAnnouncement();
      this.sendSegmentsAnnouncement(e, n);
    });
    _(this, "sendSegmentsAnnouncement", (t, e) => {
      this.isAnnounceMicrotaskCreated = !0, queueMicrotask(() => {
        for (const n of this.trackerClient.peers()) n.sendSegmentsAnnouncementCommand(t, e);
        this.isAnnounceMicrotaskCreated = !1;
      });
    });
    _(this, "onSegmentRequested", async (t, e, n, s) => {
      const o = function(S, l) {
        for (const f of S.segments.values()) if (f.externalId === l) return f;
      }(this.stream, e);
      if (!o) return;
      if (this.config.isP2PUploadDisabled) return void t.sendSegmentAbsentCommand(e, n);
      const a = this.config.swarmId ?? this.streamManifestUrl, h = J(a, this.stream), g = await this.segmentStorage.getSegmentData(a, h, o.externalId);
      g ? await t.uploadSegmentData(o, n, s !== void 0 ? g.slice(s) : g) : t.sendSegmentAbsentCommand(e, n);
    });
    this.streamManifestUrl = t, this.stream = e, this.requests = n, this.segmentStorage = s, this.config = o, this.eventTarget = a, this.onSegmentAnnouncement = h;
    const g = J(this.config.swarmId ?? this.streamManifestUrl, this.stream);
    this.trackerClient = new Ws(g, this.stream, { onPeerConnected: this.onPeerConnected, onSegmentRequested: this.onSegmentRequested, onSegmentsAnnouncement: this.onSegmentAnnouncement }, this.config, this.eventTarget), this.eventTarget.addEventListener(`onStorageUpdated-${g}`, this.broadcastAnnouncement), this.segmentStorage.setSegmentChangeCallback((S) => {
      this.eventTarget.dispatchEvent(`onStorageUpdated-${S}`);
    }), this.trackerClient.start();
  }
  downloadSegment(t) {
    const e = [];
    for (const a of this.trackerClient.peers()) a.downloadingSegment || a.getSegmentStatus(t) !== "loaded" || e.push(a);
    if (e.length === 0) return;
    const n = (s = e)[Math.floor(Math.random() * s.length)];
    var s;
    const o = this.requests.getOrCreateRequest(t);
    n.downloadSegment(o);
  }
  isSegmentLoadingOrLoadedBySomeone(t) {
    for (const e of this.trackerClient.peers()) if (e.getSegmentStatus(t)) return !0;
    return !1;
  }
  isSegmentLoadedBySomeone(t) {
    for (const e of this.trackerClient.peers()) if (e.getSegmentStatus(t) === "loaded") return !0;
    return !1;
  }
  get connectedPeerCount() {
    let t = 0;
    for (const e of this.trackerClient.peers()) t++;
    return t;
  }
  getSegmentsAnnouncement() {
    const t = this.config.swarmId ?? this.streamManifestUrl, e = J(t, this.stream), n = this.segmentStorage.getStoredSegmentIds(t, e), s = [];
    for (const o of this.requests.httpRequests()) {
      const a = this.stream.segments.get(o.segment.runtimeId);
      a && s.push(a.externalId);
    }
    return { loaded: n, httpLoading: s };
  }
  destroy() {
    const t = J(this.config.swarmId ?? this.streamManifestUrl, this.stream);
    this.eventTarget.removeEventListener(`onStorageUpdated-${t}`, this.broadcastAnnouncement), this.trackerClient.destroy();
  }
}
class zs {
  constructor(t, e, n, s, o, a, h) {
    _(this, "loaders", /* @__PURE__ */ new Map());
    _(this, "_currentLoaderItem");
    _(this, "logger", $("p2pml-core:p2p-loaders-container"));
    this.streamManifestUrl = t, this.requests = n, this.segmentStorage = s, this.config = o, this.eventTarget = a, this.onSegmentAnnouncement = h, this._currentLoaderItem = this.findOrCreateLoaderForStream(e), this.logger(`set current p2p loader: ${tt(e)}`);
  }
  createLoader(t) {
    if (this.loaders.has(t.runtimeId)) throw new Error("Loader for this stream already exists");
    const e = new Qs(this.streamManifestUrl, t, this.requests, this.segmentStorage, this.config, this.eventTarget, () => {
      this._currentLoaderItem.loader === e && this.onSegmentAnnouncement();
    }), n = tt(t);
    return this.logger(`created new loader: ${n}`), { loader: e, stream: t, loggerInfo: tt(t) };
  }
  findOrCreateLoaderForStream(t) {
    const e = this.loaders.get(t.runtimeId);
    if (e) return clearTimeout(e.destroyTimeoutId), e.destroyTimeoutId = void 0, e;
    {
      const n = this.createLoader(t);
      return this.loaders.set(t.runtimeId, n), n;
    }
  }
  changeCurrentLoader(t) {
    const e = this.config.swarmId ?? this.streamManifestUrl, n = J(e, this._currentLoaderItem.stream);
    this.segmentStorage.getStoredSegmentIds(e, n).length ? this.setLoaderDestroyTimeout(this._currentLoaderItem) : this.destroyAndRemoveLoader(this._currentLoaderItem), this._currentLoaderItem = this.findOrCreateLoaderForStream(t), this.logger(`change current p2p loader: ${tt(t)}`);
  }
  setLoaderDestroyTimeout(t) {
    t.destroyTimeoutId = window.setTimeout(() => this.destroyAndRemoveLoader(t), this.config.p2pInactiveLoaderDestroyTimeoutMs);
  }
  destroyAndRemoveLoader(t) {
    t.loader.destroy(), this.loaders.delete(t.stream.runtimeId), this.logger("destroy p2p loader: ", t.loggerInfo);
  }
  get currentLoader() {
    return this._currentLoaderItem.loader;
  }
  destroy() {
    for (const { loader: t, destroyTimeoutId: e } of this.loaders.values()) t.destroy(), clearTimeout(e);
    this.loaders.clear();
  }
}
function qt(r) {
  return { runtimeId: r.runtimeId, externalId: r.externalId, url: r.url, byteRange: r.byteRange, startTime: r.startTime, endTime: r.endTime };
}
let Gs = class {
  constructor(r, t, e, n, s, o) {
    _(this, "currentAttempt");
    _(this, "_failedAttempts", new Js());
    _(this, "finalData");
    _(this, "bytes", []);
    _(this, "_loadedBytes", 0);
    _(this, "_totalBytes");
    _(this, "_status", "not-started");
    _(this, "progress");
    _(this, "notReceivingBytesTimeout");
    _(this, "_abortRequestCallback");
    _(this, "_logger");
    _(this, "_isHandledByProcessQueue", !1);
    _(this, "onSegmentError");
    _(this, "onSegmentAbort");
    _(this, "onSegmentStart");
    _(this, "onSegmentLoaded");
    _(this, "abortOnTimeout", () => {
      var t;
      if (this.throwErrorIfNotLoadingStatus(), !this.currentAttempt) return;
      this.setStatus("failed");
      const r = new U("bytes-receiving-timeout");
      (t = this._abortRequestCallback) == null || t.call(this, r), this.logger(`${this.downloadSource} ${this.segment.externalId} failed ${r.type}`), this._failedAttempts.add({ ...this.currentAttempt, error: r }), this.onSegmentError({ segment: qt(this.segment), error: r, downloadSource: this.currentAttempt.downloadSource, peerId: this.currentAttempt.downloadSource === "p2p" ? this.currentAttempt.peerId : void 0, streamType: this.segment.stream.type }), this.notReceivingBytesTimeout.clear(), this.manageBandwidthCalculatorsState("stop"), this.requestProcessQueueCallback();
    });
    _(this, "abortOnError", (r) => {
      this.throwErrorIfNotLoadingStatus(), this.currentAttempt && (this.setStatus("failed"), this.logger(`${this.downloadSource} ${this.segment.externalId} failed ${r.type}`), this._failedAttempts.add({ ...this.currentAttempt, error: r }), this.onSegmentError({ segment: qt(this.segment), error: r, downloadSource: this.currentAttempt.downloadSource, peerId: this.currentAttempt.downloadSource === "p2p" ? this.currentAttempt.peerId : void 0, streamType: this.segment.stream.type }), this.notReceivingBytesTimeout.clear(), this.manageBandwidthCalculatorsState("stop"), this.requestProcessQueueCallback());
    });
    _(this, "completeOnSuccess", () => {
      this.throwErrorIfNotLoadingStatus(), this.currentAttempt && (this.manageBandwidthCalculatorsState("stop"), this.notReceivingBytesTimeout.clear(), this.setStatus("succeed"), this._totalBytes = this._loadedBytes, this.onSegmentLoaded({ segmentUrl: this.segment.url, bytesLength: this.data.byteLength, downloadSource: this.currentAttempt.downloadSource, peerId: this.currentAttempt.downloadSource === "p2p" ? this.currentAttempt.peerId : void 0, streamType: this.segment.stream.type }), this.logger(`${this.currentAttempt.downloadSource} ${this.segment.externalId} succeed`), this.requestProcessQueueCallback());
    });
    _(this, "addLoadedChunk", (r) => {
      if (this.throwErrorIfNotLoadingStatus(), !this.currentAttempt || !this.progress) return;
      this.notReceivingBytesTimeout.restart();
      const { byteLength: t } = r, { all: e, http: n } = this.bandwidthCalculators;
      e.addBytes(t), this.currentAttempt.downloadSource === "http" && n.addBytes(t), this.bytes.push(r), this.progress.lastLoadedChunkTimestamp = performance.now(), this.progress.loadedBytes += t, this._loadedBytes += t;
    });
    _(this, "firstBytesReceived", () => {
      this.throwErrorIfNotLoadingStatus(), this.notReceivingBytesTimeout.restart();
    });
    this.segment = r, this.requestProcessQueueCallback = t, this.bandwidthCalculators = e, this.playback = n, this.playbackConfig = s, this.onSegmentError = o.getEventDispatcher("onSegmentError"), this.onSegmentAbort = o.getEventDispatcher("onSegmentAbort"), this.onSegmentStart = o.getEventDispatcher("onSegmentStart"), this.onSegmentLoaded = o.getEventDispatcher("onSegmentLoaded");
    const { byteRange: a } = this.segment;
    if (a) {
      const { end: g, start: S } = a;
      this._totalBytes = g - S + 1;
    }
    this.notReceivingBytesTimeout = new Vs(this.abortOnTimeout);
    const { type: h } = this.segment.stream;
    this._logger = $(`p2pml-core:request-${h}`);
  }
  clearLoadedBytes() {
    this._loadedBytes = 0, this.bytes = [], this._totalBytes = void 0, this.finalData = void 0;
  }
  get status() {
    return this._status;
  }
  setStatus(r) {
    this._status = r, this._isHandledByProcessQueue = !1;
  }
  get downloadSource() {
    var r;
    return (r = this.currentAttempt) == null ? void 0 : r.downloadSource;
  }
  get loadedBytes() {
    return this._loadedBytes;
  }
  get totalBytes() {
    return this._totalBytes;
  }
  get data() {
    return this.finalData || (this.finalData = On(this.bytes)), this.finalData;
  }
  get failedAttempts() {
    return this._failedAttempts;
  }
  get isHandledByProcessQueue() {
    return this._isHandledByProcessQueue;
  }
  markHandledByProcessQueue() {
    this._isHandledByProcessQueue = !0;
  }
  setTotalBytes(r) {
    if (this._totalBytes !== void 0) throw new Error("Request total bytes value is already set");
    this._totalBytes = r;
  }
  start(r, t) {
    if (this._status === "succeed") throw new Error(`Request ${this.segment.externalId} has been already succeed.`);
    if (this._status === "loading") throw new Error(`Request ${this.segment.externalId} has been already started.`);
    this.setStatus("loading"), this.currentAttempt = { ...r }, this.progress = { startFromByte: this._loadedBytes, loadedBytes: 0, startTimestamp: performance.now() }, this.manageBandwidthCalculatorsState("start");
    const { notReceivingBytesTimeoutMs: e, abort: n } = t;
    return this._abortRequestCallback = n, e !== void 0 && this.notReceivingBytesTimeout.start(e), this.logger(`${r.downloadSource} ${this.segment.externalId} started`), this.onSegmentStart({ segment: qt(this.segment), downloadSource: r.downloadSource, peerId: r.downloadSource === "p2p" ? r.peerId : void 0 }), { firstBytesReceived: this.firstBytesReceived, addLoadedChunk: this.addLoadedChunk, completeOnSuccess: this.completeOnSuccess, abortOnError: this.abortOnError };
  }
  abortFromProcessQueue() {
    var r, t, e, n;
    this.throwErrorIfNotLoadingStatus(), this.setStatus("aborted"), this.logger(`${(r = this.currentAttempt) == null ? void 0 : r.downloadSource} ${this.segment.externalId} aborted`), (t = this._abortRequestCallback) == null || t.call(this, new U("abort")), this.onSegmentAbort({ segment: qt(this.segment), downloadSource: (e = this.currentAttempt) == null ? void 0 : e.downloadSource, peerId: ((n = this.currentAttempt) == null ? void 0 : n.downloadSource) === "p2p" ? this.currentAttempt.peerId : void 0, streamType: this.segment.stream.type }), this._abortRequestCallback = void 0, this.manageBandwidthCalculatorsState("stop"), this.notReceivingBytesTimeout.clear();
  }
  throwErrorIfNotLoadingStatus() {
    if (this._status !== "loading") throw new Error(`Request has been already ${this.status}.`);
  }
  logger(r) {
    var t;
    this._logger.color = ((t = this.currentAttempt) == null ? void 0 : t.downloadSource) === "http" ? "green" : "red", this._logger(r), this._logger.color = "";
  }
  manageBandwidthCalculatorsState(r) {
    var s;
    const { all: t, http: e } = this.bandwidthCalculators, n = r === "start" ? "startLoading" : "stopLoading";
    ((s = this.currentAttempt) == null ? void 0 : s.downloadSource) === "http" && e[n](), t[n]();
  }
};
class Js {
  constructor() {
    _(this, "attempts", []);
  }
  add(t) {
    this.attempts.push(t);
  }
  get httpAttemptsCount() {
    return this.attempts.reduce((t, e) => e.downloadSource === "http" ? t + 1 : t, 0);
  }
  get lastAttempt() {
    return this.attempts[this.attempts.length - 1];
  }
  clear() {
    this.attempts = [];
  }
}
class Vs {
  constructor(t) {
    _(this, "timeoutId");
    _(this, "ms");
    this.action = t;
  }
  start(t) {
    if (this.timeoutId) throw new Error("Timeout is already started.");
    this.ms = t, this.timeoutId = window.setTimeout(this.action, this.ms);
  }
  restart(t) {
    this.timeoutId && clearTimeout(this.timeoutId), t && (this.ms = t), this.ms && (this.timeoutId = window.setTimeout(this.action, this.ms));
  }
  clear() {
    clearTimeout(this.timeoutId), this.timeoutId = void 0;
  }
}
class Ys {
  constructor(t, e, n, s, o) {
    _(this, "requests", /* @__PURE__ */ new Map());
    this.requestProcessQueueCallback = t, this.bandwidthCalculators = e, this.playback = n, this.config = s, this.eventTarget = o;
  }
  get executingHttpCount() {
    let t = 0;
    for (const e of this.httpRequests()) e.status === "loading" && t++;
    return t;
  }
  get executingP2PCount() {
    let t = 0;
    for (const e of this.p2pRequests()) e.status === "loading" && t++;
    return t;
  }
  get(t) {
    return this.requests.get(t);
  }
  getOrCreateRequest(t) {
    let e = this.requests.get(t);
    return e || (e = new Gs(t, this.requestProcessQueueCallback, this.bandwidthCalculators, this.playback, this.config, this.eventTarget), this.requests.set(t, e)), e;
  }
  remove(t) {
    this.requests.delete(t.segment);
  }
  items() {
    return this.requests.values();
  }
  *httpRequests() {
    for (const t of this.requests.values()) t.downloadSource === "http" && (yield t);
  }
  *p2pRequests() {
    for (const t of this.requests.values()) t.downloadSource === "p2p" && (yield t);
  }
  destroy() {
    for (const t of this.requests.values()) t.status === "loading" && t.abortFromProcessQueue();
    this.requests.clear();
  }
}
class Ks {
  constructor(t, e) {
    _(this, "_status", "pending");
    _(this, "_shouldBeStartedImmediately", !1);
    this.segment = t, this.engineCallbacks = e;
  }
  get status() {
    return this._status;
  }
  get shouldBeStartedImmediately() {
    return this._shouldBeStartedImmediately;
  }
  resolve(t, e) {
    this._status === "pending" && (this._status = "succeed", this.engineCallbacks.onSuccess({ data: t, bandwidth: e }));
  }
  reject() {
    this._status === "pending" && (this._status = "failed", this.engineCallbacks.onError(new Oe("failed")));
  }
  abort() {
    this._status === "pending" && (this._status = "aborted", this.engineCallbacks.onError(new Oe("aborted")));
  }
  markAsShouldBeStartedImmediately() {
    this._shouldBeStartedImmediately = !0;
  }
}
function* bn(r, t, e, n, s) {
  const { runtimeId: o, stream: a } = r, h = a.segments.get(o);
  if (!h) return;
  const g = a.segments.values();
  let S;
  do {
    const f = g.next();
    if (f.done) return;
    S = f.value;
  } while (S !== h);
  const l = ne(S, t, e, n, s);
  if (re(l)) {
    const f = g.next();
    if (f.done) return;
    const b = f.value, x = ne(b, t, e, n, s);
    if (re(x)) return;
    l.isHighDemand = !0, yield { segment: S, statuses: l }, yield { segment: b, statuses: x };
  } else yield { segment: S, statuses: l };
  for (const f of g) {
    const b = ne(f, t, e, n, s);
    if (re(b)) break;
    yield { segment: f, statuses: b };
  }
}
function re(r) {
  const { isHighDemand: t = !1, isHttpDownloadable: e = !1, isP2PDownloadable: n = !1 } = r;
  return !t && !e && !n;
}
class Zs {
  constructor(t, e, n, s, o, a, h) {
    _(this, "requests");
    _(this, "engineRequest");
    _(this, "p2pLoaders");
    _(this, "playback");
    _(this, "segmentAvgDuration");
    _(this, "logger");
    _(this, "storageCleanUpIntervalId");
    _(this, "levelChangedTimestamp");
    _(this, "lastQueueProcessingTimeStamp");
    _(this, "randomHttpDownloadInterval");
    _(this, "isProcessQueueMicrotaskCreated", !1);
    _(this, "requestProcessQueueMicrotask", (t = !0) => {
      const e = performance.now();
      !t && this.lastQueueProcessingTimeStamp !== void 0 && e - this.lastQueueProcessingTimeStamp <= 1e3 || this.isProcessQueueMicrotaskCreated || (this.isProcessQueueMicrotaskCreated = !0, queueMicrotask(() => {
        try {
          this.processQueue(), this.lastQueueProcessingTimeStamp = e;
        } finally {
          this.isProcessQueueMicrotaskCreated = !1;
        }
      }));
    });
    this.streamManifestUrl = t, this.lastRequestedSegment = e, this.streamDetails = n, this.config = s, this.bandwidthCalculators = o, this.segmentStorage = a, this.eventTarget = h;
    const g = this.lastRequestedSegment.stream;
    this.playback = { position: this.lastRequestedSegment.startTime, rate: 1 }, this.segmentAvgDuration = function(S) {
      const { segments: l } = S;
      let f = 0;
      const { size: b } = l;
      for (const x of l.values()) f += x.endTime - x.startTime;
      return f / b;
    }(g), this.requests = new Ys(this.requestProcessQueueMicrotask, this.bandwidthCalculators, this.playback, this.config, this.eventTarget), this.p2pLoaders = new zs(this.streamManifestUrl, this.lastRequestedSegment.stream, this.requests, this.segmentStorage, this.config, this.eventTarget, this.requestProcessQueueMicrotask), this.logger = $(`p2pml-core:hybrid-loader-${g.type}`), this.logger.color = "coral", this.setIntervalLoading();
  }
  setIntervalLoading() {
    const t = this.p2pLoaders.currentLoader.connectedPeerCount, e = 1e3 * Math.random() * t + 1e3;
    this.randomHttpDownloadInterval = window.setTimeout(() => {
      this.loadRandomThroughHttp(), this.setIntervalLoading();
    }, e);
  }
  async loadSegment(t, e) {
    var h;
    this.logger(`requests: ${pn(t)}`);
    const { stream: n } = t;
    n !== this.lastRequestedSegment.stream && (this.logger(`stream changed to ${tt(n)}`), this.p2pLoaders.changeCurrentLoader(n)), this.lastRequestedSegment = t;
    const s = this.config.swarmId ?? this.streamManifestUrl, o = J(s, n);
    this.segmentStorage.onSegmentRequested(s, o, t.externalId, t.startTime, t.endTime, n.type, this.streamDetails.isLive);
    const a = new Ks(t, e);
    try {
      if (this.segmentStorage.hasSegment(s, o, t.externalId)) {
        const g = await this.segmentStorage.getSegmentData(s, o, t.externalId);
        if (g) {
          const { queueDownloadRatio: S } = this.generateQueue();
          return void a.resolve(g, this.getBandwidth(S));
        }
      }
      (h = this.engineRequest) == null || h.abort(), this.engineRequest = a;
    } catch {
      a.reject();
    } finally {
      this.requestProcessQueueMicrotask();
    }
  }
  processRequests(t, e) {
    var a;
    const { stream: n } = this.lastRequestedSegment, { httpErrorRetries: s } = this.config, o = performance.now();
    for (const h of this.requests.items()) {
      const { downloadSource: g, status: S, segment: l, isHandledByProcessQueue: f } = h, b = ((a = this.engineRequest) == null ? void 0 : a.segment) === l ? this.engineRequest : void 0;
      switch (S) {
        case "loading":
          t.has(l.runtimeId) || b || (h.abortFromProcessQueue(), this.requests.remove(h));
          break;
        case "succeed": {
          if (!g) break;
          g === "http" && this.p2pLoaders.currentLoader.broadcastAnnouncement(), b && (b.resolve(h.data, this.getBandwidth(e)), this.engineRequest = void 0), this.requests.remove(h);
          const C = this.config.swarmId ?? this.streamManifestUrl, c = J(C, n);
          this.segmentStorage.storeSegment(C, c, l.externalId, h.data, l.startTime, l.endTime, l.stream.type, this.streamDetails.isLive);
          break;
        }
        case "failed":
          g !== "http" || f || this.p2pLoaders.currentLoader.broadcastAnnouncement(), b || n.segments.has(h.segment.runtimeId) || this.requests.remove(h), h.failedAttempts.httpAttemptsCount >= s && b && (this.engineRequest = void 0, b.reject());
          break;
        case "not-started":
        case "aborted":
          this.requests.remove(h);
      }
      h.markHandledByProcessQueue();
      const { lastAttempt: x } = h.failedAttempts;
      x && o - x.error.timestamp > 6e4 && h.failedAttempts.clear();
    }
  }
  processQueue() {
    var h;
    const { queue: t, queueSegmentIds: e, queueDownloadRatio: n } = this.generateQueue();
    this.processRequests(e, n);
    const { simultaneousHttpDownloads: s, simultaneousP2PDownloads: o, httpErrorRetries: a } = this.config;
    if ((h = this.engineRequest) != null && h.shouldBeStartedImmediately && this.engineRequest.status === "pending" && this.requests.executingHttpCount < s) {
      const { segment: g } = this.engineRequest, S = this.requests.get(g);
      (!S || S.status === "not-started" || S.status === "failed" && S.failedAttempts.httpAttemptsCount < this.config.httpErrorRetries) && this.loadThroughHttp(g);
    }
    for (const g of t) {
      const { statuses: S, segment: l } = g, f = this.requests.get(l);
      if (S.isHighDemand) {
        if ((f == null ? void 0 : f.downloadSource) === "http" && f.status === "loading" || (f == null ? void 0 : f.downloadSource) === "http" && f.status === "failed" && f.failedAttempts.httpAttemptsCount >= a) continue;
        const b = (f == null ? void 0 : f.status) === "loading" && f.downloadSource === "p2p";
        if (this.requests.executingHttpCount < s) {
          b && f.abortFromProcessQueue(), this.loadThroughHttp(l);
          continue;
        }
        if (this.abortLastHttpLoadingInQueueAfterItem(t, l) && this.requests.executingHttpCount < s) {
          b && f.abortFromProcessQueue(), this.loadThroughHttp(l);
          continue;
        }
        if (b) continue;
        if (this.requests.executingP2PCount < o) {
          this.loadThroughP2P(l);
          continue;
        }
        if (this.abortLastP2PLoadingInQueueAfterItem(t, l) && this.requests.executingP2PCount < o) {
          this.loadThroughP2P(l);
          continue;
        }
      } else if (S.isP2PDownloadable) {
        if ((f == null ? void 0 : f.status) === "loading") continue;
        (this.requests.executingP2PCount < o || this.p2pLoaders.currentLoader.isSegmentLoadedBySomeone(l) && this.abortLastP2PLoadingInQueueAfterItem(t, l) && this.requests.executingP2PCount < o) && this.loadThroughP2P(l);
      }
    }
  }
  abortSegmentRequest(t) {
    var e;
    ((e = this.engineRequest) == null ? void 0 : e.segment.runtimeId) === t && (this.engineRequest.abort(), this.logger("abort: ", pn(this.engineRequest.segment)), this.engineRequest = void 0, this.requestProcessQueueMicrotask());
  }
  loadThroughHttp(t) {
    const e = this.requests.getOrCreateRequest(t);
    new cs(e, this.config, this.eventTarget), this.p2pLoaders.currentLoader.broadcastAnnouncement();
  }
  loadThroughP2P(t) {
    this.p2pLoaders.currentLoader.downloadSegment(t);
  }
  loadRandomThroughHttp() {
    const t = this.getAvailableStorageCapacityPercent();
    if (t <= 10) return;
    const { simultaneousHttpDownloads: e, httpErrorRetries: n } = this.config, s = this.p2pLoaders.currentLoader;
    if (this.requests.executingHttpCount >= e || !s.connectedPeerCount) return;
    const o = [];
    for (const { segment: l, statuses: f } of bn(this.lastRequestedSegment, this.playback, this.config, this.p2pLoaders.currentLoader, t)) {
      const b = this.config.swarmId ?? this.streamManifestUrl, x = J(b, l.stream);
      if (!f.isHttpDownloadable || f.isP2PDownloadable || this.segmentStorage.hasSegment(b, x, l.externalId)) continue;
      const C = this.requests.get(l);
      C && (C.status === "loading" || C.status === "succeed" || C.failedAttempts.httpAttemptsCount >= n) || o.push(l);
    }
    if (!o.length || e - this.requests.executingHttpCount === 0) return;
    const a = s.connectedPeerCount + 1, h = Math.min(o.length, e * a), g = function(l) {
      for (let f = l.length - 1; f > 0; f--) {
        const b = Math.floor(Math.random() * (f + 1));
        [l[f], l[b]] = [l[b], l[f]];
      }
      return l;
    }(Array.from({ length: h }, (l, f) => f));
    let S = h / a;
    for (const l of g) {
      if (this.requests.executingHttpCount >= e) break;
      if (S >= 1 || Math.random() <= S) {
        const f = o[l];
        this.loadThroughHttp(f);
      }
      if (S--, S <= 0) break;
    }
  }
  abortLastHttpLoadingInQueueAfterItem(t, e) {
    for (const { segment: n } of yn(t)) {
      if (n === e) break;
      const s = this.requests.get(n);
      if ((s == null ? void 0 : s.downloadSource) === "http" && s.status === "loading") return s.abortFromProcessQueue(), !0;
    }
    return !1;
  }
  abortLastP2PLoadingInQueueAfterItem(t, e) {
    for (const { segment: n } of yn(t)) {
      if (n === e) break;
      const s = this.requests.get(n);
      if ((s == null ? void 0 : s.downloadSource) === "p2p" && s.status === "loading") return s.abortFromProcessQueue(), !0;
    }
    return !1;
  }
  getAvailableStorageCapacityPercent() {
    const { totalCapacity: t, usedCapacity: e } = this.segmentStorage.getUsage();
    return 100 - e / t * 100;
  }
  generateQueue() {
    var a;
    const t = [], e = /* @__PURE__ */ new Set();
    let n = 0, s = 0;
    const o = this.getAvailableStorageCapacityPercent();
    for (const h of bn(this.lastRequestedSegment, this.playback, this.config, this.p2pLoaders.currentLoader, o)) {
      n++;
      const { segment: g } = h, S = this.config.swarmId ?? this.streamManifestUrl, l = J(S, g.stream);
      this.segmentStorage.hasSegment(S, l, g.externalId) || ((a = this.requests.get(g)) == null ? void 0 : a.status) === "succeed" ? s++ : (t.push(h), e.add(g.runtimeId));
    }
    return { queue: t, queueSegmentIds: e, maxPossibleLength: n, alreadyLoadedCount: s, queueDownloadRatio: n !== 0 ? s / n : 0 };
  }
  getBandwidth(t) {
    const { http: e, all: n } = this.bandwidthCalculators, { activeLevelBitrate: s } = this.streamDetails;
    if (this.streamDetails.activeLevelBitrate === 0) return n.getBandwidthLoadingOnly(3);
    const o = Math.max(n.getBandwidth(30, this.levelChangedTimestamp), n.getBandwidth(60, this.levelChangedTimestamp), n.getBandwidth(90, this.levelChangedTimestamp));
    if (t >= 0.8 || o >= 0.9 * s) return Math.max(n.getBandwidthLoadingOnly(1), n.getBandwidthLoadingOnly(3), n.getBandwidthLoadingOnly(5));
    const a = Math.max(e.getBandwidthLoadingOnly(1), e.getBandwidthLoadingOnly(3), e.getBandwidthLoadingOnly(5));
    return Math.max(o, a);
  }
  notifyLevelChanged() {
    this.levelChangedTimestamp = performance.now();
  }
  sendBroadcastAnnouncement(t = !1) {
    this.p2pLoaders.currentLoader.broadcastAnnouncement(t);
  }
  updatePlayback(t, e) {
    var a;
    const n = this.playback.rate !== e, s = this.playback.position !== t;
    if (!n && !s) return;
    const o = Math.abs(t - this.playback.position) / this.segmentAvgDuration > 0.5;
    s && (this.playback.position = t), n && e !== 0 && (this.playback.rate = e), o && (this.logger("position significantly changed"), (a = this.engineRequest) == null || a.markAsShouldBeStartedImmediately()), this.segmentStorage.onPlaybackUpdated(t, e), this.requestProcessQueueMicrotask(o);
  }
  updateStream(t) {
    t === this.lastRequestedSegment.stream && (this.logger(`update stream: ${tt(t)}`), this.requestProcessQueueMicrotask());
  }
  destroy() {
    var t;
    clearInterval(this.storageCleanUpIntervalId), clearInterval(this.randomHttpDownloadInterval), this.storageCleanUpIntervalId = void 0, (t = this.engineRequest) == null || t.abort(), this.requests.destroy(), this.p2pLoaders.destroy();
  }
}
class Cn {
  constructor(t = 2e4) {
    _(this, "loadingsCount", 0);
    _(this, "bytes", []);
    _(this, "loadingOnlyTimestamps", []);
    _(this, "timestamps", []);
    _(this, "noLoadingsTime", 0);
    _(this, "loadingsStoppedAt", 0);
    this.clearThresholdMs = t;
  }
  addBytes(t, e = performance.now()) {
    this.bytes.push(t), this.loadingOnlyTimestamps.push(e - this.noLoadingsTime), this.timestamps.push(e);
  }
  startLoading(t = performance.now()) {
    this.clearStale(), this.loadingsCount === 0 && this.loadingsStoppedAt !== 0 && (this.noLoadingsTime += t - this.loadingsStoppedAt), this.loadingsCount++;
  }
  stopLoading(t = performance.now()) {
    this.loadingsCount > 0 && (this.loadingsCount--, this.loadingsCount === 0 && (this.loadingsStoppedAt = t));
  }
  getBandwidthLoadingOnly(t, e = Number.NEGATIVE_INFINITY) {
    if (!this.loadingOnlyTimestamps.length) return 0;
    const n = 1e3 * t, s = this.loadingOnlyTimestamps[this.loadingOnlyTimestamps.length - 1];
    let o = s;
    const a = s - n;
    let h = 0;
    for (let g = this.bytes.length - 1; g >= 0; g--) {
      const S = this.loadingOnlyTimestamps[g];
      if (S < a || this.timestamps[g] < e) break;
      o = S, h += this.bytes[g];
    }
    return 8e3 * h / (s - o);
  }
  getBandwidth(t, e = Number.NEGATIVE_INFINITY, n = performance.now()) {
    if (!this.timestamps.length) return 0;
    const s = n - 1e3 * t;
    let o = n, a = 0;
    for (let h = this.bytes.length - 1; h >= 0; h--) {
      const g = this.timestamps[h];
      if (g < s || g < e) break;
      o = g, a += this.bytes[h];
    }
    return 8e3 * a / (n - o);
  }
  clearStale() {
    if (!this.loadingOnlyTimestamps.length) return;
    const t = this.loadingOnlyTimestamps[this.loadingOnlyTimestamps.length - 1] - this.clearThresholdMs;
    let e = 0;
    for (const n of this.loadingOnlyTimestamps) {
      if (n > t) break;
      e++;
    }
    this.bytes.splice(0, e), this.loadingOnlyTimestamps.splice(0, e), this.timestamps.splice(0, e);
  }
}
const Bt = (r, t) => `${r}|${t}`, Ot = 1048576;
class Xs {
  constructor() {
    _(this, "userAgent", navigator.userAgent);
    _(this, "segmentMemoryStorageLimit", 4096);
    _(this, "currentStorageUsage", 0);
    _(this, "cache", /* @__PURE__ */ new Map());
    _(this, "logger");
    _(this, "coreConfig");
    _(this, "mainStreamConfig");
    _(this, "secondaryStreamConfig");
    _(this, "currentPlayback");
    _(this, "lastRequestedSegment");
    _(this, "segmentChangeCallback");
    this.logger = $("p2pml-core:segment-memory-storage"), this.logger.color = "RebeccaPurple";
  }
  async initialize(t, e, n) {
    this.coreConfig = t, this.mainStreamConfig = e, this.secondaryStreamConfig = n, this.setMemoryStorageLimit(), this.logger("initialized");
  }
  onPlaybackUpdated(t, e) {
    this.currentPlayback = { position: t, rate: e };
  }
  onSegmentRequested(t, e, n, s, o, a, h) {
    this.lastRequestedSegment = { streamId: e, segmentId: n, startTime: s, endTime: o, swarmId: t, streamType: a, isLiveStream: h };
  }
  async storeSegment(t, e, n, s, o, a, h, g) {
    this.clear(g, s.byteLength);
    const S = Bt(e, n);
    if (this.cache.set(S, { data: s, segmentId: n, streamId: e, startTime: o, endTime: a, streamType: h }), this.increaseStorageUsage(s.byteLength), this.logger(`add segment: ${n} to ${e}`), !this.segmentChangeCallback) throw new Error("dispatchStorageUpdatedEvent is not set");
    this.segmentChangeCallback(e);
  }
  async getSegmentData(t, e, n) {
    const s = Bt(e, n), o = this.cache.get(s);
    if (o !== void 0) return o.data;
  }
  getUsage() {
    if (!this.lastRequestedSegment || !this.currentPlayback) return { totalCapacity: this.segmentMemoryStorageLimit, usedCapacity: this.currentStorageUsage };
    const t = this.currentPlayback.position;
    let e = 0;
    for (const { endTime: n, data: s } of this.cache.values()) t > n || (e += s.byteLength);
    return { totalCapacity: this.segmentMemoryStorageLimit, usedCapacity: e / Ot };
  }
  hasSegment(t, e, n) {
    const s = Bt(e, n);
    return this.cache.get(s) !== void 0;
  }
  getStoredSegmentIds(t, e) {
    const n = [];
    for (const { segmentId: s, streamId: o } of this.cache.values()) o === e && n.push(s);
    return n;
  }
  clear(t, e) {
    if (!(this.currentPlayback && this.mainStreamConfig && this.secondaryStreamConfig && this.coreConfig) || !this.isMemoryLimitReached(e) && !t) return;
    const n = /* @__PURE__ */ new Set(), s = Array.from(this.cache.values()).sort((o, a) => o.startTime - a.startTime);
    for (const o of s) {
      const { streamId: a, segmentId: h, data: g } = o, S = Bt(a, h);
      if (this.shouldRemoveSegment(o, t, this.currentPlayback.position) && (this.cache.delete(S), n.add(a), this.decreaseStorageUsage(g.byteLength), this.logger(`Removed segment ${h} from stream ${a}`), !this.isMemoryLimitReached(e) && !t)) break;
    }
    this.sendUpdatesToAffectedStreams(n);
  }
  isMemoryLimitReached(t) {
    return this.currentStorageUsage + t / Ot > this.segmentMemoryStorageLimit;
  }
  setSegmentChangeCallback(t) {
    this.segmentChangeCallback = t;
  }
  sendUpdatesToAffectedStreams(t) {
    t.size !== 0 && t.forEach((e) => {
      if (!this.segmentChangeCallback) throw new Error("dispatchStorageUpdatedEvent is not set");
      this.segmentChangeCallback(e);
    });
  }
  shouldRemoveSegment(t, e, n) {
    const { endTime: s, streamType: o } = t, a = this.getStreamTimeWindow(o, "highDemandTimeWindow");
    return !(n <= s) && (!e || n > a + s);
  }
  increaseStorageUsage(t) {
    this.currentStorageUsage += t / Ot;
  }
  decreaseStorageUsage(t) {
    this.currentStorageUsage -= t / Ot;
  }
  setMemoryStorageLimit() {
    var e;
    var t;
    (e = this.coreConfig) != null && e.segmentMemoryStorageLimit ? this.segmentMemoryStorageLimit = this.coreConfig.segmentMemoryStorageLimit : (t = this.userAgent, /Android/i.test(t) && !/Chrome|Firefox/i.test(t) || ((n) => /iPad|iPhone/i.test(n))(this.userAgent) ? this.segmentMemoryStorageLimit = 1024 : ((n) => /Android/i.test(n))(this.userAgent) && (this.segmentMemoryStorageLimit = 2048));
  }
  getStreamTimeWindow(t, e) {
    const n = t === "main" ? this.mainStreamConfig : this.secondaryStreamConfig;
    return (n == null ? void 0 : n[e]) ?? 0;
  }
  destroy() {
    this.cache.clear();
  }
}
class tr {
  constructor() {
    _(this, "events", /* @__PURE__ */ new Map());
  }
  dispatchEvent(t, ...e) {
    const n = this.events.get(t);
    if (n) for (const s of n) s(...e);
  }
  getEventDispatcher(t) {
    let e = this.events.get(t);
    e || (e = [], this.events.set(t, e));
    const n = e;
    return (...s) => {
      for (const o of n) o(...s);
    };
  }
  addEventListener(t, e) {
    const n = this.events.get(t);
    n ? n.push(e) : this.events.set(t, [e]);
  }
  removeEventListener(t, e) {
    const n = this.events.get(t);
    if (n) {
      const s = n.indexOf(e);
      s !== -1 && n.splice(s, 1);
    }
  }
}
const rt = class rt {
  constructor(t) {
    _(this, "eventTarget", new tr());
    _(this, "manifestResponseUrl");
    _(this, "streams", /* @__PURE__ */ new Map());
    _(this, "mainStreamConfig");
    _(this, "secondaryStreamConfig");
    _(this, "commonCoreConfig");
    _(this, "bandwidthCalculators", { all: new Cn(), http: new Cn() });
    _(this, "segmentStorage");
    _(this, "mainStreamLoader");
    _(this, "secondaryStreamLoader");
    _(this, "streamDetails", { isLive: !1, activeLevelBitrate: 0 });
    const e = function n(s) {
      if (Dn(s)) {
        const o = {};
        return Object.keys(s).forEach((a) => {
          if (s[a] !== void 0) {
            const h = n(s[a]);
            h !== void 0 && (o[a] = h);
          }
        }), o;
      }
      return s;
    }(t ?? {});
    this.commonCoreConfig = ee({ defaultConfig: rt.DEFAULT_COMMON_CORE_CONFIG, baseConfig: e }), this.mainStreamConfig = ee({ defaultConfig: rt.DEFAULT_STREAM_CONFIG, baseConfig: e, specificStreamConfig: e.mainStream }), this.secondaryStreamConfig = ee({ defaultConfig: rt.DEFAULT_STREAM_CONFIG, baseConfig: e, specificStreamConfig: e.secondaryStream });
  }
  getConfig() {
    return { ...X(this.commonCoreConfig), mainStream: X(this.mainStreamConfig), secondaryStream: X(this.secondaryStreamConfig) };
  }
  applyDynamicConfig(t) {
    const { mainStream: e, secondaryStream: n } = t, s = X(this.mainStreamConfig), o = X(this.secondaryStreamConfig);
    this.overrideAllConfigs(t, e, n), this.processSpecificDynamicConfigParams(s, t, "main"), this.processSpecificDynamicConfigParams(o, t, "secondary");
  }
  processSpecificDynamicConfigParams(t, e, n) {
    const s = this.getUpdatedStreamProperty("isP2PDisabled", e, n);
    s && t.isP2PDisabled !== s && this.destroyStreamLoader(n);
    const o = this.getUpdatedStreamProperty("isP2PUploadDisabled", e, n);
    if (o !== void 0 && t.isP2PUploadDisabled !== o) {
      const a = n === "main" ? this.mainStreamLoader : this.secondaryStreamLoader;
      a == null || a.sendBroadcastAnnouncement(o);
    }
  }
  getUpdatedStreamProperty(t, e, n) {
    const s = n === "main" ? e.mainStream : e.secondaryStream;
    return (s == null ? void 0 : s[t]) ?? e[t];
  }
  addEventListener(t, e) {
    this.eventTarget.addEventListener(t, e);
  }
  removeEventListener(t, e) {
    this.eventTarget.removeEventListener(t, e);
  }
  setManifestResponseUrl(t) {
    this.manifestResponseUrl = t.split("?")[0];
  }
  hasSegment(t) {
    return !!wn(this.streams, t);
  }
  getStream(t) {
    return this.streams.get(t);
  }
  addStreamIfNoneExists(t) {
    this.streams.has(t.runtimeId) || this.streams.set(t.runtimeId, { ...t, segments: /* @__PURE__ */ new Map() });
  }
  updateStream(t, e, n) {
    var o, a;
    const s = this.streams.get(t);
    if (s) {
      if (e) for (const h of e) s.segments.has(h.runtimeId) || s.segments.set(h.runtimeId, { ...h, stream: s });
      if (n) for (const h of n) s.segments.delete(h);
      (o = this.mainStreamLoader) == null || o.updateStream(s), (a = this.secondaryStreamLoader) == null || a.updateStream(s);
    }
  }
  async loadSegment(t, e) {
    if (!this.manifestResponseUrl) throw new Error("Manifest response url is not defined");
    await this.initializeSegmentStorage();
    const n = this.identifySegment(t);
    this.getStreamHybridLoader(n).loadSegment(n, e);
  }
  abortSegmentLoading(t) {
    var e, n;
    (e = this.mainStreamLoader) == null || e.abortSegmentRequest(t), (n = this.secondaryStreamLoader) == null || n.abortSegmentRequest(t);
  }
  updatePlayback(t, e) {
    var n, s;
    (n = this.mainStreamLoader) == null || n.updatePlayback(t, e), (s = this.secondaryStreamLoader) == null || s.updatePlayback(t, e);
  }
  setActiveLevelBitrate(t) {
    var e, n;
    t !== this.streamDetails.activeLevelBitrate && (this.streamDetails.activeLevelBitrate = t, (e = this.mainStreamLoader) == null || e.notifyLevelChanged(), (n = this.secondaryStreamLoader) == null || n.notifyLevelChanged());
  }
  setIsLive(t) {
    this.streamDetails.isLive = t;
  }
  isSegmentLoadable(t) {
    try {
      const e = this.identifySegment(t);
      return (e.stream.type !== "main" || !this.mainStreamConfig.isP2PDisabled) && (e.stream.type !== "secondary" || !this.secondaryStreamConfig.isP2PDisabled);
    } catch {
      return !1;
    }
  }
  destroy() {
    var t, e, n;
    this.streams.clear(), (t = this.mainStreamLoader) == null || t.destroy(), (e = this.secondaryStreamLoader) == null || e.destroy(), (n = this.segmentStorage) == null || n.destroy(), this.mainStreamLoader = void 0, this.secondaryStreamLoader = void 0, this.segmentStorage = void 0, this.manifestResponseUrl = void 0, this.streamDetails = { isLive: !1, activeLevelBitrate: 0 };
  }
  async initializeSegmentStorage() {
    if (this.segmentStorage) return;
    const { isLive: t } = this.streamDetails, e = this.commonCoreConfig.customSegmentStorageFactory;
    if (e && typeof e != "function") throw new Error("Storage configuration is invalid");
    const n = e ? e(t) : new Xs();
    await n.initialize(this.commonCoreConfig, this.mainStreamConfig, this.secondaryStreamConfig), this.segmentStorage = n;
  }
  identifySegment(t) {
    if (!this.manifestResponseUrl) throw new Error("Manifest response url is undefined");
    const e = wn(this.streams, t);
    if (!e) throw new Error(`Not found segment with id: ${t}`);
    return e;
  }
  overrideAllConfigs(t, e, n) {
    St(this.commonCoreConfig, t), St(this.mainStreamConfig, t), St(this.secondaryStreamConfig, t), e && St(this.mainStreamConfig, e), n && St(this.secondaryStreamConfig, n);
  }
  destroyStreamLoader(t) {
    var e, n;
    t === "main" ? ((e = this.mainStreamLoader) == null || e.destroy(), this.mainStreamLoader = void 0) : ((n = this.secondaryStreamLoader) == null || n.destroy(), this.secondaryStreamLoader = void 0);
  }
  getStreamHybridLoader(t) {
    return t.stream.type === "main" ? (this.mainStreamLoader ?? (this.mainStreamLoader = this.createNewHybridLoader(t)), this.mainStreamLoader) : (this.secondaryStreamLoader ?? (this.secondaryStreamLoader = this.createNewHybridLoader(t)), this.secondaryStreamLoader);
  }
  createNewHybridLoader(t) {
    if (!this.manifestResponseUrl) throw new Error("Manifest response url is not defined");
    if (!this.segmentStorage) throw new Error("Segment storage is not initialized");
    const e = t.stream.type === "main" ? this.mainStreamConfig : this.secondaryStreamConfig;
    return new Zs(this.manifestResponseUrl, t, this.streamDetails, e, this.bandwidthCalculators, this.segmentStorage, this.eventTarget);
  }
};
_(rt, "DEFAULT_COMMON_CORE_CONFIG", { segmentMemoryStorageLimit: void 0, customSegmentStorageFactory: void 0 }), _(rt, "DEFAULT_STREAM_CONFIG", { isP2PUploadDisabled: !1, isP2PDisabled: !1, simultaneousHttpDownloads: 2, simultaneousP2PDownloads: 3, highDemandTimeWindow: 15, httpDownloadTimeWindow: 3e3, p2pDownloadTimeWindow: 6e3, webRtcMaxMessageSize: 65535, p2pNotReceivingBytesTimeoutMs: 2e3, p2pInactiveLoaderDestroyTimeoutMs: 3e4, httpNotReceivingBytesTimeoutMs: 3e3, httpErrorRetries: 3, p2pErrorRetries: 3, trackerClientVersionPrefix: Ps, announceTrackers: ["wss://tracker.novage.com.ua", "wss://tracker.webtorrent.dev", "wss://tracker.openwebtorrent.com"], rtcConfig: { iceServers: [{ urls: "stun:stun.l.google.com:19302" }, { urls: "stun:global.stun.twilio.com:3478" }] }, validateP2PSegment: void 0, httpRequestSetup: void 0, swarmId: void 0 });
let vn = rt;
const nr = An.debug;
export {
  vn as Core,
  Oe as CoreRequestError,
  U as RequestError,
  nr as debug
};
//# sourceMappingURL=p2p-media-loader-core.es.min.js.map
