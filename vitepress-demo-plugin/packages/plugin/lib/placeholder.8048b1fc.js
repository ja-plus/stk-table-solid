import { openBlock as L, createElementBlock as I, createElementVNode as N, ref as K, defineComponent as gt, computed as Z, createStaticVNode as oi, watch as G, createBlock as J, Transition as Ci, withCtx as nt, normalizeClass as U, unref as P, normalizeStyle as _i, toDisplayString as dt, createCommentVNode as V, createApp as Ri, renderSlot as le, createTextVNode as pe, onMounted as Ai, onUnmounted as Ot, inject as Ce, watchEffect as Li, nextTick as yt, Fragment as Re, renderList as Ae, resolveDynamicComponent as Ni, createVNode as tt } from "vue";
import { codeToHtml as ji } from "shiki";
const W = (e, n) => {
  const t = e.__vccOpts || e;
  for (const [i, r] of n)
    t[i] = r;
  return t;
}, Di = {}, Pi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-code"
};
function Ii(e, n) {
  return L(), I("svg", Pi, [...n[0] || (n[0] = [
    N("polyline", { points: "16 18 22 12 16 6" }, null, -1),
    N("polyline", { points: "8 6 2 12 8 18" }, null, -1)
  ])]);
}
const Bi = /* @__PURE__ */ W(Di, [["render", Ii]]), $i = {}, Mi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-code-xml"
};
function Fi(e, n) {
  return L(), I("svg", Mi, [...n[0] || (n[0] = [
    N("path", { d: "m18 16 4-4-4-4" }, null, -1),
    N("path", { d: "m6 8-4 4 4 4" }, null, -1),
    N("path", { d: "m14.5 4-5 16" }, null, -1)
  ])]);
}
const Ui = /* @__PURE__ */ W($i, [["render", Fi]]), Wi = {}, zi = {
  "data-v-c3ada0ea": "",
  viewBox: "0 0 24 24",
  width: "1.2em",
  height: "1.2em"
};
function Ki(e, n) {
  return L(), I("svg", zi, [...n[0] || (n[0] = [
    N("path", {
      fill: "currentColor",
      d: "M16 2v2h-1v3.243a8 8 0 0 0 .736 3.352l4.281 9.276A1.5 1.5 0 0 1 18.655 22H5.344a1.5 1.5 0 0 1-1.362-2.129l4.281-9.276A8 8 0 0 0 9 7.243V4H8V2zm-2.613 8.001h-2.776q-.156.545-.374 1.071l-.158.362L6.124 20h11.75l-3.954-8.566A10 10 0 0 1 13.387 10M11 7.243q0 .38-.028.758h2.057a10 10 0 0 1-.02-.364L13 7.243V4h-2z"
    }, null, -1)
  ])]);
}
const Vi = /* @__PURE__ */ W(Wi, [["render", Ki]]), qi = {}, Gi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "24",
  height: "24",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-copy"
};
function Hi(e, n) {
  return L(), I("svg", Gi, [...n[0] || (n[0] = [
    N("rect", {
      width: "14",
      height: "14",
      x: "8",
      y: "8",
      rx: "2",
      ry: "2"
    }, null, -1),
    N("path", { d: "M4 16c-1.1 0-2-.9-2-2V4c0-1.1.9-2 2-2h10c1.1 0 2 .9 2 2" }, null, -1)
  ])]);
}
const Xi = /* @__PURE__ */ W(qi, [["render", Hi]]), Qi = {}, Zi = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "16",
  height: "16",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-arrow-up-from-line"
};
function Ji(e, n) {
  return L(), I("svg", Zi, [...n[0] || (n[0] = [
    N("path", { d: "m18 9-6-6-6 6" }, null, -1),
    N("path", { d: "M12 3v14" }, null, -1),
    N("path", { d: "M5 21h14" }, null, -1)
  ])]);
}
const Yi = /* @__PURE__ */ W(Qi, [["render", Ji]]);
var R = /* @__PURE__ */ ((e) => (e.VUE = "vue", e.REACT = "react", e.SVELTE = "svelte", e.SOLID = "solid", e.HTML = "html", e))(R || {}), H = /* @__PURE__ */ ((e) => (e.STACKBLITZ = "stackblitz", e.CODESANDBOX = "codesandbox", e))(H || {});
const ui = "vitepress-demo", li = "This is a demo from vitepress-demo-plugin";
function tn(e) {
  return e === "vue" ? "/src/App.vue" : e === "react" ? "/src/App.tsx" : e === "svelte" ? "/src/App.svelte" : "index.html";
}
function pi(e) {
  const n = e.type === R.HTML ? "" : "src/";
  return Object.fromEntries(
    Object.entries(e.files || {}).filter(([, t]) => !t.entry).map(([t, i]) => [
      en(`${n}${i.path || t}`),
      i.code
    ])
  );
}
function en(e) {
  return e.split("/").reduce((n, t) => (t === ".." ? n.pop() : t && t !== "." && n.push(t), n), []).join("/");
}
var Bt = {}, hi = { exports: {} };
(function(e) {
  var n = function() {
    var t = String.fromCharCode, i = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=", r = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+-$", _ = {};
    function d(o, b) {
      if (!_[o]) {
        _[o] = {};
        for (var m = 0; m < o.length; m++)
          _[o][o.charAt(m)] = m;
      }
      return _[o][b];
    }
    var u = {
      compressToBase64: function(o) {
        if (o == null)
          return "";
        var b = u._compress(o, 6, function(m) {
          return i.charAt(m);
        });
        switch (b.length % 4) {
          default:
          case 0:
            return b;
          case 1:
            return b + "===";
          case 2:
            return b + "==";
          case 3:
            return b + "=";
        }
      },
      decompressFromBase64: function(o) {
        return o == null ? "" : o == "" ? null : u._decompress(o.length, 32, function(b) {
          return d(i, o.charAt(b));
        });
      },
      compressToUTF16: function(o) {
        return o == null ? "" : u._compress(o, 15, function(b) {
          return t(b + 32);
        }) + " ";
      },
      decompressFromUTF16: function(o) {
        return o == null ? "" : o == "" ? null : u._decompress(o.length, 16384, function(b) {
          return o.charCodeAt(b) - 32;
        });
      },
      compressToUint8Array: function(o) {
        for (var b = u.compress(o), m = new Uint8Array(b.length * 2), v = 0, f = b.length; v < f; v++) {
          var S = b.charCodeAt(v);
          m[v * 2] = S >>> 8, m[v * 2 + 1] = S % 256;
        }
        return m;
      },
      decompressFromUint8Array: function(o) {
        if (o == null)
          return u.decompress(o);
        for (var b = new Array(o.length / 2), m = 0, v = b.length; m < v; m++)
          b[m] = o[m * 2] * 256 + o[m * 2 + 1];
        var f = [];
        return b.forEach(function(S) {
          f.push(t(S));
        }), u.decompress(f.join(""));
      },
      compressToEncodedURIComponent: function(o) {
        return o == null ? "" : u._compress(o, 6, function(b) {
          return r.charAt(b);
        });
      },
      decompressFromEncodedURIComponent: function(o) {
        return o == null ? "" : o == "" ? null : (o = o.replace(/ /g, "+"), u._decompress(o.length, 32, function(b) {
          return d(r, o.charAt(b));
        }));
      },
      compress: function(o) {
        return u._compress(o, 16, function(b) {
          return t(b);
        });
      },
      _compress: function(o, b, m) {
        if (o == null)
          return "";
        var v, f, S = {}, j = {}, C = "", h = "", a = "", c = 2, T = 3, w = 2, O = [], l = 0, g = 0, p;
        for (p = 0; p < o.length; p += 1)
          if (C = o.charAt(p), Object.prototype.hasOwnProperty.call(S, C) || (S[C] = T++, j[C] = !0), h = a + C, Object.prototype.hasOwnProperty.call(S, h))
            a = h;
          else {
            if (Object.prototype.hasOwnProperty.call(j, a)) {
              if (a.charCodeAt(0) < 256) {
                for (v = 0; v < w; v++)
                  l = l << 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++;
                for (f = a.charCodeAt(0), v = 0; v < 8; v++)
                  l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
              } else {
                for (f = 1, v = 0; v < w; v++)
                  l = l << 1 | f, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = 0;
                for (f = a.charCodeAt(0), v = 0; v < 16; v++)
                  l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
              }
              c--, c == 0 && (c = Math.pow(2, w), w++), delete j[a];
            } else
              for (f = S[a], v = 0; v < w; v++)
                l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
            c--, c == 0 && (c = Math.pow(2, w), w++), S[h] = T++, a = String(C);
          }
        if (a !== "") {
          if (Object.prototype.hasOwnProperty.call(j, a)) {
            if (a.charCodeAt(0) < 256) {
              for (v = 0; v < w; v++)
                l = l << 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++;
              for (f = a.charCodeAt(0), v = 0; v < 8; v++)
                l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
            } else {
              for (f = 1, v = 0; v < w; v++)
                l = l << 1 | f, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = 0;
              for (f = a.charCodeAt(0), v = 0; v < 16; v++)
                l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
            }
            c--, c == 0 && (c = Math.pow(2, w), w++), delete j[a];
          } else
            for (f = S[a], v = 0; v < w; v++)
              l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
          c--, c == 0 && (c = Math.pow(2, w), w++);
        }
        for (f = 2, v = 0; v < w; v++)
          l = l << 1 | f & 1, g == b - 1 ? (g = 0, O.push(m(l)), l = 0) : g++, f = f >> 1;
        for (; ; )
          if (l = l << 1, g == b - 1) {
            O.push(m(l));
            break;
          } else
            g++;
        return O.join("");
      },
      decompress: function(o) {
        return o == null ? "" : o == "" ? null : u._decompress(o.length, 32768, function(b) {
          return o.charCodeAt(b);
        });
      },
      _decompress: function(o, b, m) {
        var v = [], f = 4, S = 4, j = 3, C = "", h = [], a, c, T, w, O, l, g, p = { val: m(0), position: b, index: 1 };
        for (a = 0; a < 3; a += 1)
          v[a] = a;
        for (T = 0, O = Math.pow(2, 2), l = 1; l != O; )
          w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
        switch (T) {
          case 0:
            for (T = 0, O = Math.pow(2, 8), l = 1; l != O; )
              w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
            g = t(T);
            break;
          case 1:
            for (T = 0, O = Math.pow(2, 16), l = 1; l != O; )
              w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
            g = t(T);
            break;
          case 2:
            return "";
        }
        for (v[3] = g, c = g, h.push(g); ; ) {
          if (p.index > o)
            return "";
          for (T = 0, O = Math.pow(2, j), l = 1; l != O; )
            w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
          switch (g = T) {
            case 0:
              for (T = 0, O = Math.pow(2, 8), l = 1; l != O; )
                w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
              v[S++] = t(T), g = S - 1, f--;
              break;
            case 1:
              for (T = 0, O = Math.pow(2, 16), l = 1; l != O; )
                w = p.val & p.position, p.position >>= 1, p.position == 0 && (p.position = b, p.val = m(p.index++)), T |= (w > 0 ? 1 : 0) * l, l <<= 1;
              v[S++] = t(T), g = S - 1, f--;
              break;
            case 2:
              return h.join("");
          }
          if (f == 0 && (f = Math.pow(2, j), j++), v[g])
            C = v[g];
          else if (g === S)
            C = c + c.charAt(0);
          else
            return null;
          h.push(C), v[S++] = c + C.charAt(0), f--, c = C, f == 0 && (f = Math.pow(2, j), j++);
        }
      }
    };
    return u;
  }();
  e != null ? e.exports = n : typeof angular < "u" && angular != null && angular.module("LZString", []).factory("LZString", function() {
    return n;
  });
})(hi);
Object.defineProperty(Bt, "__esModule", { value: !0 });
Bt.getParameters = void 0;
var nn = hi.exports;
function sn(e) {
  return nn.compressToBase64(e).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function rn(e) {
  return sn(JSON.stringify(e));
}
Bt.getParameters = rn;
var Et = void 0, an = Bt;
Et = an.getParameters;
var ci = { exports: {} }, wt = {}, Tt = { exports: {} }, Gt = {}, Ht = {}, Le;
function he() {
  if (Le)
    return Ht;
  Le = 1;
  function e(i) {
    this.__parent = i, this.__character_count = 0, this.__indent_count = -1, this.__alignment_count = 0, this.__wrap_point_index = 0, this.__wrap_point_character_count = 0, this.__wrap_point_indent_count = -1, this.__wrap_point_alignment_count = 0, this.__items = [];
  }
  e.prototype.clone_empty = function() {
    var i = new e(this.__parent);
    return i.set_indent(this.__indent_count, this.__alignment_count), i;
  }, e.prototype.item = function(i) {
    return i < 0 ? this.__items[this.__items.length + i] : this.__items[i];
  }, e.prototype.has_match = function(i) {
    for (var r = this.__items.length - 1; r >= 0; r--)
      if (this.__items[r].match(i))
        return !0;
    return !1;
  }, e.prototype.set_indent = function(i, r) {
    this.is_empty() && (this.__indent_count = i || 0, this.__alignment_count = r || 0, this.__character_count = this.__parent.get_indent_size(this.__indent_count, this.__alignment_count));
  }, e.prototype._set_wrap_point = function() {
    this.__parent.wrap_line_length && (this.__wrap_point_index = this.__items.length, this.__wrap_point_character_count = this.__character_count, this.__wrap_point_indent_count = this.__parent.next_line.__indent_count, this.__wrap_point_alignment_count = this.__parent.next_line.__alignment_count);
  }, e.prototype._should_wrap = function() {
    return this.__wrap_point_index && this.__character_count > this.__parent.wrap_line_length && this.__wrap_point_character_count > this.__parent.next_line.__character_count;
  }, e.prototype._allow_wrap = function() {
    if (this._should_wrap()) {
      this.__parent.add_new_line();
      var i = this.__parent.current_line;
      return i.set_indent(this.__wrap_point_indent_count, this.__wrap_point_alignment_count), i.__items = this.__items.slice(this.__wrap_point_index), this.__items = this.__items.slice(0, this.__wrap_point_index), i.__character_count += this.__character_count - this.__wrap_point_character_count, this.__character_count = this.__wrap_point_character_count, i.__items[0] === " " && (i.__items.splice(0, 1), i.__character_count -= 1), !0;
    }
    return !1;
  }, e.prototype.is_empty = function() {
    return this.__items.length === 0;
  }, e.prototype.last = function() {
    return this.is_empty() ? null : this.__items[this.__items.length - 1];
  }, e.prototype.push = function(i) {
    this.__items.push(i);
    var r = i.lastIndexOf(`
`);
    r !== -1 ? this.__character_count = i.length - r : this.__character_count += i.length;
  }, e.prototype.pop = function() {
    var i = null;
    return this.is_empty() || (i = this.__items.pop(), this.__character_count -= i.length), i;
  }, e.prototype._remove_indent = function() {
    this.__indent_count > 0 && (this.__indent_count -= 1, this.__character_count -= this.__parent.indent_size);
  }, e.prototype._remove_wrap_indent = function() {
    this.__wrap_point_indent_count > 0 && (this.__wrap_point_indent_count -= 1);
  }, e.prototype.trim = function() {
    for (; this.last() === " "; )
      this.__items.pop(), this.__character_count -= 1;
  }, e.prototype.toString = function() {
    var i = "";
    return this.is_empty() ? this.__parent.indent_empty_lines && (i = this.__parent.get_indent_string(this.__indent_count)) : (i = this.__parent.get_indent_string(this.__indent_count, this.__alignment_count), i += this.__items.join("")), i;
  };
  function n(i, r) {
    this.__cache = [""], this.__indent_size = i.indent_size, this.__indent_string = i.indent_char, i.indent_with_tabs || (this.__indent_string = new Array(i.indent_size + 1).join(i.indent_char)), r = r || "", i.indent_level > 0 && (r = new Array(i.indent_level + 1).join(this.__indent_string)), this.__base_string = r, this.__base_string_length = r.length;
  }
  n.prototype.get_indent_size = function(i, r) {
    var _ = this.__base_string_length;
    return r = r || 0, i < 0 && (_ = 0), _ += i * this.__indent_size, _ += r, _;
  }, n.prototype.get_indent_string = function(i, r) {
    var _ = this.__base_string;
    return r = r || 0, i < 0 && (i = 0, _ = ""), r += i * this.__indent_size, this.__ensure_cache(r), _ += this.__cache[r], _;
  }, n.prototype.__ensure_cache = function(i) {
    for (; i >= this.__cache.length; )
      this.__add_column();
  }, n.prototype.__add_column = function() {
    var i = this.__cache.length, r = 0, _ = "";
    this.__indent_size && i >= this.__indent_size && (r = Math.floor(i / this.__indent_size), i -= r * this.__indent_size, _ = new Array(r + 1).join(this.__indent_string)), i && (_ += new Array(i + 1).join(" ")), this.__cache.push(_);
  };
  function t(i, r) {
    this.__indent_cache = new n(i, r), this.raw = !1, this._end_with_newline = i.end_with_newline, this.indent_size = i.indent_size, this.wrap_line_length = i.wrap_line_length, this.indent_empty_lines = i.indent_empty_lines, this.__lines = [], this.previous_line = null, this.current_line = null, this.next_line = new e(this), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1, this.__add_outputline();
  }
  return t.prototype.__add_outputline = function() {
    this.previous_line = this.current_line, this.current_line = this.next_line.clone_empty(), this.__lines.push(this.current_line);
  }, t.prototype.get_line_number = function() {
    return this.__lines.length;
  }, t.prototype.get_indent_string = function(i, r) {
    return this.__indent_cache.get_indent_string(i, r);
  }, t.prototype.get_indent_size = function(i, r) {
    return this.__indent_cache.get_indent_size(i, r);
  }, t.prototype.is_empty = function() {
    return !this.previous_line && this.current_line.is_empty();
  }, t.prototype.add_new_line = function(i) {
    return this.is_empty() || !i && this.just_added_newline() ? !1 : (this.raw || this.__add_outputline(), !0);
  }, t.prototype.get_code = function(i) {
    this.trim(!0);
    var r = this.current_line.pop();
    r && (r[r.length - 1] === `
` && (r = r.replace(/\n+$/g, "")), this.current_line.push(r)), this._end_with_newline && this.__add_outputline();
    var _ = this.__lines.join(`
`);
    return i !== `
` && (_ = _.replace(/[\n]/g, i)), _;
  }, t.prototype.set_wrap_point = function() {
    this.current_line._set_wrap_point();
  }, t.prototype.set_indent = function(i, r) {
    return i = i || 0, r = r || 0, this.next_line.set_indent(i, r), this.__lines.length > 1 ? (this.current_line.set_indent(i, r), !0) : (this.current_line.set_indent(), !1);
  }, t.prototype.add_raw_token = function(i) {
    for (var r = 0; r < i.newlines; r++)
      this.__add_outputline();
    this.current_line.set_indent(-1), this.current_line.push(i.whitespace_before), this.current_line.push(i.text), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = !1;
  }, t.prototype.add_token = function(i) {
    this.__add_space_before_token(), this.current_line.push(i), this.space_before_token = !1, this.non_breaking_space = !1, this.previous_token_wrapped = this.current_line._allow_wrap();
  }, t.prototype.__add_space_before_token = function() {
    this.space_before_token && !this.just_added_newline() && (this.non_breaking_space || this.set_wrap_point(), this.current_line.push(" "));
  }, t.prototype.remove_indent = function(i) {
    for (var r = this.__lines.length; i < r; )
      this.__lines[i]._remove_indent(), i++;
    this.current_line._remove_wrap_indent();
  }, t.prototype.trim = function(i) {
    for (i = i === void 0 ? !1 : i, this.current_line.trim(); i && this.__lines.length > 1 && this.current_line.is_empty(); )
      this.__lines.pop(), this.current_line = this.__lines[this.__lines.length - 1], this.current_line.trim();
    this.previous_line = this.__lines.length > 1 ? this.__lines[this.__lines.length - 2] : null;
  }, t.prototype.just_added_newline = function() {
    return this.current_line.is_empty();
  }, t.prototype.just_added_blankline = function() {
    return this.is_empty() || this.current_line.is_empty() && this.previous_line.is_empty();
  }, t.prototype.ensure_empty_line_above = function(i, r) {
    for (var _ = this.__lines.length - 2; _ >= 0; ) {
      var d = this.__lines[_];
      if (d.is_empty())
        break;
      if (d.item(0).indexOf(i) !== 0 && d.item(-1) !== r) {
        this.__lines.splice(_ + 1, 0, new e(this)), this.previous_line = this.__lines[this.__lines.length - 2];
        break;
      }
      _--;
    }
  }, Ht.Output = t, Ht;
}
var Xt = {}, Ne;
function fi() {
  if (Ne)
    return Xt;
  Ne = 1;
  function e(n, t, i, r) {
    this.type = n, this.text = t, this.comments_before = null, this.newlines = i || 0, this.whitespace_before = r || "", this.parent = null, this.next = null, this.previous = null, this.opened = null, this.closed = null, this.directives = null;
  }
  return Xt.Token = e, Xt;
}
var Qt = {}, je;
function di() {
  return je || (je = 1, function(e) {
    var n = "\\x23\\x24\\x40\\x41-\\x5a\\x5f\\x61-\\x7a", t = "\\x24\\x30-\\x39\\x41-\\x5a\\x5f\\x61-\\x7a", i = "\\xaa\\xb5\\xba\\xc0-\\xd6\\xd8-\\xf6\\xf8-\\u02c1\\u02c6-\\u02d1\\u02e0-\\u02e4\\u02ec\\u02ee\\u0370-\\u0374\\u0376\\u0377\\u037a-\\u037d\\u0386\\u0388-\\u038a\\u038c\\u038e-\\u03a1\\u03a3-\\u03f5\\u03f7-\\u0481\\u048a-\\u0527\\u0531-\\u0556\\u0559\\u0561-\\u0587\\u05d0-\\u05ea\\u05f0-\\u05f2\\u0620-\\u064a\\u066e\\u066f\\u0671-\\u06d3\\u06d5\\u06e5\\u06e6\\u06ee\\u06ef\\u06fa-\\u06fc\\u06ff\\u0710\\u0712-\\u072f\\u074d-\\u07a5\\u07b1\\u07ca-\\u07ea\\u07f4\\u07f5\\u07fa\\u0800-\\u0815\\u081a\\u0824\\u0828\\u0840-\\u0858\\u08a0\\u08a2-\\u08ac\\u0904-\\u0939\\u093d\\u0950\\u0958-\\u0961\\u0971-\\u0977\\u0979-\\u097f\\u0985-\\u098c\\u098f\\u0990\\u0993-\\u09a8\\u09aa-\\u09b0\\u09b2\\u09b6-\\u09b9\\u09bd\\u09ce\\u09dc\\u09dd\\u09df-\\u09e1\\u09f0\\u09f1\\u0a05-\\u0a0a\\u0a0f\\u0a10\\u0a13-\\u0a28\\u0a2a-\\u0a30\\u0a32\\u0a33\\u0a35\\u0a36\\u0a38\\u0a39\\u0a59-\\u0a5c\\u0a5e\\u0a72-\\u0a74\\u0a85-\\u0a8d\\u0a8f-\\u0a91\\u0a93-\\u0aa8\\u0aaa-\\u0ab0\\u0ab2\\u0ab3\\u0ab5-\\u0ab9\\u0abd\\u0ad0\\u0ae0\\u0ae1\\u0b05-\\u0b0c\\u0b0f\\u0b10\\u0b13-\\u0b28\\u0b2a-\\u0b30\\u0b32\\u0b33\\u0b35-\\u0b39\\u0b3d\\u0b5c\\u0b5d\\u0b5f-\\u0b61\\u0b71\\u0b83\\u0b85-\\u0b8a\\u0b8e-\\u0b90\\u0b92-\\u0b95\\u0b99\\u0b9a\\u0b9c\\u0b9e\\u0b9f\\u0ba3\\u0ba4\\u0ba8-\\u0baa\\u0bae-\\u0bb9\\u0bd0\\u0c05-\\u0c0c\\u0c0e-\\u0c10\\u0c12-\\u0c28\\u0c2a-\\u0c33\\u0c35-\\u0c39\\u0c3d\\u0c58\\u0c59\\u0c60\\u0c61\\u0c85-\\u0c8c\\u0c8e-\\u0c90\\u0c92-\\u0ca8\\u0caa-\\u0cb3\\u0cb5-\\u0cb9\\u0cbd\\u0cde\\u0ce0\\u0ce1\\u0cf1\\u0cf2\\u0d05-\\u0d0c\\u0d0e-\\u0d10\\u0d12-\\u0d3a\\u0d3d\\u0d4e\\u0d60\\u0d61\\u0d7a-\\u0d7f\\u0d85-\\u0d96\\u0d9a-\\u0db1\\u0db3-\\u0dbb\\u0dbd\\u0dc0-\\u0dc6\\u0e01-\\u0e30\\u0e32\\u0e33\\u0e40-\\u0e46\\u0e81\\u0e82\\u0e84\\u0e87\\u0e88\\u0e8a\\u0e8d\\u0e94-\\u0e97\\u0e99-\\u0e9f\\u0ea1-\\u0ea3\\u0ea5\\u0ea7\\u0eaa\\u0eab\\u0ead-\\u0eb0\\u0eb2\\u0eb3\\u0ebd\\u0ec0-\\u0ec4\\u0ec6\\u0edc-\\u0edf\\u0f00\\u0f40-\\u0f47\\u0f49-\\u0f6c\\u0f88-\\u0f8c\\u1000-\\u102a\\u103f\\u1050-\\u1055\\u105a-\\u105d\\u1061\\u1065\\u1066\\u106e-\\u1070\\u1075-\\u1081\\u108e\\u10a0-\\u10c5\\u10c7\\u10cd\\u10d0-\\u10fa\\u10fc-\\u1248\\u124a-\\u124d\\u1250-\\u1256\\u1258\\u125a-\\u125d\\u1260-\\u1288\\u128a-\\u128d\\u1290-\\u12b0\\u12b2-\\u12b5\\u12b8-\\u12be\\u12c0\\u12c2-\\u12c5\\u12c8-\\u12d6\\u12d8-\\u1310\\u1312-\\u1315\\u1318-\\u135a\\u1380-\\u138f\\u13a0-\\u13f4\\u1401-\\u166c\\u166f-\\u167f\\u1681-\\u169a\\u16a0-\\u16ea\\u16ee-\\u16f0\\u1700-\\u170c\\u170e-\\u1711\\u1720-\\u1731\\u1740-\\u1751\\u1760-\\u176c\\u176e-\\u1770\\u1780-\\u17b3\\u17d7\\u17dc\\u1820-\\u1877\\u1880-\\u18a8\\u18aa\\u18b0-\\u18f5\\u1900-\\u191c\\u1950-\\u196d\\u1970-\\u1974\\u1980-\\u19ab\\u19c1-\\u19c7\\u1a00-\\u1a16\\u1a20-\\u1a54\\u1aa7\\u1b05-\\u1b33\\u1b45-\\u1b4b\\u1b83-\\u1ba0\\u1bae\\u1baf\\u1bba-\\u1be5\\u1c00-\\u1c23\\u1c4d-\\u1c4f\\u1c5a-\\u1c7d\\u1ce9-\\u1cec\\u1cee-\\u1cf1\\u1cf5\\u1cf6\\u1d00-\\u1dbf\\u1e00-\\u1f15\\u1f18-\\u1f1d\\u1f20-\\u1f45\\u1f48-\\u1f4d\\u1f50-\\u1f57\\u1f59\\u1f5b\\u1f5d\\u1f5f-\\u1f7d\\u1f80-\\u1fb4\\u1fb6-\\u1fbc\\u1fbe\\u1fc2-\\u1fc4\\u1fc6-\\u1fcc\\u1fd0-\\u1fd3\\u1fd6-\\u1fdb\\u1fe0-\\u1fec\\u1ff2-\\u1ff4\\u1ff6-\\u1ffc\\u2071\\u207f\\u2090-\\u209c\\u2102\\u2107\\u210a-\\u2113\\u2115\\u2119-\\u211d\\u2124\\u2126\\u2128\\u212a-\\u212d\\u212f-\\u2139\\u213c-\\u213f\\u2145-\\u2149\\u214e\\u2160-\\u2188\\u2c00-\\u2c2e\\u2c30-\\u2c5e\\u2c60-\\u2ce4\\u2ceb-\\u2cee\\u2cf2\\u2cf3\\u2d00-\\u2d25\\u2d27\\u2d2d\\u2d30-\\u2d67\\u2d6f\\u2d80-\\u2d96\\u2da0-\\u2da6\\u2da8-\\u2dae\\u2db0-\\u2db6\\u2db8-\\u2dbe\\u2dc0-\\u2dc6\\u2dc8-\\u2dce\\u2dd0-\\u2dd6\\u2dd8-\\u2dde\\u2e2f\\u3005-\\u3007\\u3021-\\u3029\\u3031-\\u3035\\u3038-\\u303c\\u3041-\\u3096\\u309d-\\u309f\\u30a1-\\u30fa\\u30fc-\\u30ff\\u3105-\\u312d\\u3131-\\u318e\\u31a0-\\u31ba\\u31f0-\\u31ff\\u3400-\\u4db5\\u4e00-\\u9fcc\\ua000-\\ua48c\\ua4d0-\\ua4fd\\ua500-\\ua60c\\ua610-\\ua61f\\ua62a\\ua62b\\ua640-\\ua66e\\ua67f-\\ua697\\ua6a0-\\ua6ef\\ua717-\\ua71f\\ua722-\\ua788\\ua78b-\\ua78e\\ua790-\\ua793\\ua7a0-\\ua7aa\\ua7f8-\\ua801\\ua803-\\ua805\\ua807-\\ua80a\\ua80c-\\ua822\\ua840-\\ua873\\ua882-\\ua8b3\\ua8f2-\\ua8f7\\ua8fb\\ua90a-\\ua925\\ua930-\\ua946\\ua960-\\ua97c\\ua984-\\ua9b2\\ua9cf\\uaa00-\\uaa28\\uaa40-\\uaa42\\uaa44-\\uaa4b\\uaa60-\\uaa76\\uaa7a\\uaa80-\\uaaaf\\uaab1\\uaab5\\uaab6\\uaab9-\\uaabd\\uaac0\\uaac2\\uaadb-\\uaadd\\uaae0-\\uaaea\\uaaf2-\\uaaf4\\uab01-\\uab06\\uab09-\\uab0e\\uab11-\\uab16\\uab20-\\uab26\\uab28-\\uab2e\\uabc0-\\uabe2\\uac00-\\ud7a3\\ud7b0-\\ud7c6\\ud7cb-\\ud7fb\\uf900-\\ufa6d\\ufa70-\\ufad9\\ufb00-\\ufb06\\ufb13-\\ufb17\\ufb1d\\ufb1f-\\ufb28\\ufb2a-\\ufb36\\ufb38-\\ufb3c\\ufb3e\\ufb40\\ufb41\\ufb43\\ufb44\\ufb46-\\ufbb1\\ufbd3-\\ufd3d\\ufd50-\\ufd8f\\ufd92-\\ufdc7\\ufdf0-\\ufdfb\\ufe70-\\ufe74\\ufe76-\\ufefc\\uff21-\\uff3a\\uff41-\\uff5a\\uff66-\\uffbe\\uffc2-\\uffc7\\uffca-\\uffcf\\uffd2-\\uffd7\\uffda-\\uffdc", r = "\\u0300-\\u036f\\u0483-\\u0487\\u0591-\\u05bd\\u05bf\\u05c1\\u05c2\\u05c4\\u05c5\\u05c7\\u0610-\\u061a\\u0620-\\u0649\\u0672-\\u06d3\\u06e7-\\u06e8\\u06fb-\\u06fc\\u0730-\\u074a\\u0800-\\u0814\\u081b-\\u0823\\u0825-\\u0827\\u0829-\\u082d\\u0840-\\u0857\\u08e4-\\u08fe\\u0900-\\u0903\\u093a-\\u093c\\u093e-\\u094f\\u0951-\\u0957\\u0962-\\u0963\\u0966-\\u096f\\u0981-\\u0983\\u09bc\\u09be-\\u09c4\\u09c7\\u09c8\\u09d7\\u09df-\\u09e0\\u0a01-\\u0a03\\u0a3c\\u0a3e-\\u0a42\\u0a47\\u0a48\\u0a4b-\\u0a4d\\u0a51\\u0a66-\\u0a71\\u0a75\\u0a81-\\u0a83\\u0abc\\u0abe-\\u0ac5\\u0ac7-\\u0ac9\\u0acb-\\u0acd\\u0ae2-\\u0ae3\\u0ae6-\\u0aef\\u0b01-\\u0b03\\u0b3c\\u0b3e-\\u0b44\\u0b47\\u0b48\\u0b4b-\\u0b4d\\u0b56\\u0b57\\u0b5f-\\u0b60\\u0b66-\\u0b6f\\u0b82\\u0bbe-\\u0bc2\\u0bc6-\\u0bc8\\u0bca-\\u0bcd\\u0bd7\\u0be6-\\u0bef\\u0c01-\\u0c03\\u0c46-\\u0c48\\u0c4a-\\u0c4d\\u0c55\\u0c56\\u0c62-\\u0c63\\u0c66-\\u0c6f\\u0c82\\u0c83\\u0cbc\\u0cbe-\\u0cc4\\u0cc6-\\u0cc8\\u0cca-\\u0ccd\\u0cd5\\u0cd6\\u0ce2-\\u0ce3\\u0ce6-\\u0cef\\u0d02\\u0d03\\u0d46-\\u0d48\\u0d57\\u0d62-\\u0d63\\u0d66-\\u0d6f\\u0d82\\u0d83\\u0dca\\u0dcf-\\u0dd4\\u0dd6\\u0dd8-\\u0ddf\\u0df2\\u0df3\\u0e34-\\u0e3a\\u0e40-\\u0e45\\u0e50-\\u0e59\\u0eb4-\\u0eb9\\u0ec8-\\u0ecd\\u0ed0-\\u0ed9\\u0f18\\u0f19\\u0f20-\\u0f29\\u0f35\\u0f37\\u0f39\\u0f41-\\u0f47\\u0f71-\\u0f84\\u0f86-\\u0f87\\u0f8d-\\u0f97\\u0f99-\\u0fbc\\u0fc6\\u1000-\\u1029\\u1040-\\u1049\\u1067-\\u106d\\u1071-\\u1074\\u1082-\\u108d\\u108f-\\u109d\\u135d-\\u135f\\u170e-\\u1710\\u1720-\\u1730\\u1740-\\u1750\\u1772\\u1773\\u1780-\\u17b2\\u17dd\\u17e0-\\u17e9\\u180b-\\u180d\\u1810-\\u1819\\u1920-\\u192b\\u1930-\\u193b\\u1951-\\u196d\\u19b0-\\u19c0\\u19c8-\\u19c9\\u19d0-\\u19d9\\u1a00-\\u1a15\\u1a20-\\u1a53\\u1a60-\\u1a7c\\u1a7f-\\u1a89\\u1a90-\\u1a99\\u1b46-\\u1b4b\\u1b50-\\u1b59\\u1b6b-\\u1b73\\u1bb0-\\u1bb9\\u1be6-\\u1bf3\\u1c00-\\u1c22\\u1c40-\\u1c49\\u1c5b-\\u1c7d\\u1cd0-\\u1cd2\\u1d00-\\u1dbe\\u1e01-\\u1f15\\u200c\\u200d\\u203f\\u2040\\u2054\\u20d0-\\u20dc\\u20e1\\u20e5-\\u20f0\\u2d81-\\u2d96\\u2de0-\\u2dff\\u3021-\\u3028\\u3099\\u309a\\ua640-\\ua66d\\ua674-\\ua67d\\ua69f\\ua6f0-\\ua6f1\\ua7f8-\\ua800\\ua806\\ua80b\\ua823-\\ua827\\ua880-\\ua881\\ua8b4-\\ua8c4\\ua8d0-\\ua8d9\\ua8f3-\\ua8f7\\ua900-\\ua909\\ua926-\\ua92d\\ua930-\\ua945\\ua980-\\ua983\\ua9b3-\\ua9c0\\uaa00-\\uaa27\\uaa40-\\uaa41\\uaa4c-\\uaa4d\\uaa50-\\uaa59\\uaa7b\\uaae0-\\uaae9\\uaaf2-\\uaaf3\\uabc0-\\uabe1\\uabec\\uabed\\uabf0-\\uabf9\\ufb20-\\ufb28\\ufe00-\\ufe0f\\ufe20-\\ufe26\\ufe33\\ufe34\\ufe4d-\\ufe4f\\uff10-\\uff19\\uff3f", _ = "\\\\u[0-9a-fA-F]{4}|\\\\u\\{[0-9a-fA-F]+\\}", d = "(?:" + _ + "|[" + n + i + "])", u = "(?:" + _ + "|[" + t + i + r + "])*";
    e.identifier = new RegExp(d + u, "g"), e.identifierStart = new RegExp(d), e.identifierMatch = new RegExp("(?:" + _ + "|[" + t + i + r + "])+"), e.newline = /[\n\r\u2028\u2029]/, e.lineBreak = new RegExp(`\r
|` + e.newline.source), e.allLineBreaks = new RegExp(e.lineBreak.source, "g");
  }(Qt)), Qt;
}
var Zt = {}, xt = {}, De;
function ce() {
  if (De)
    return xt;
  De = 1;
  function e(i, r) {
    this.raw_options = n(i, r), this.disabled = this._get_boolean("disabled"), this.eol = this._get_characters("eol", "auto"), this.end_with_newline = this._get_boolean("end_with_newline"), this.indent_size = this._get_number("indent_size", 4), this.indent_char = this._get_characters("indent_char", " "), this.indent_level = this._get_number("indent_level"), this.preserve_newlines = this._get_boolean("preserve_newlines", !0), this.max_preserve_newlines = this._get_number("max_preserve_newlines", 32786), this.preserve_newlines || (this.max_preserve_newlines = 0), this.indent_with_tabs = this._get_boolean("indent_with_tabs", this.indent_char === "	"), this.indent_with_tabs && (this.indent_char = "	", this.indent_size === 1 && (this.indent_size = 4)), this.wrap_line_length = this._get_number("wrap_line_length", this._get_number("max_char")), this.indent_empty_lines = this._get_boolean("indent_empty_lines"), this.templating = this._get_selection_list("templating", ["auto", "none", "angular", "django", "erb", "handlebars", "php", "smarty"], ["auto"]);
  }
  e.prototype._get_array = function(i, r) {
    var _ = this.raw_options[i], d = r || [];
    return typeof _ == "object" ? _ !== null && typeof _.concat == "function" && (d = _.concat()) : typeof _ == "string" && (d = _.split(/[^a-zA-Z0-9_\/\-]+/)), d;
  }, e.prototype._get_boolean = function(i, r) {
    var _ = this.raw_options[i], d = _ === void 0 ? !!r : !!_;
    return d;
  }, e.prototype._get_characters = function(i, r) {
    var _ = this.raw_options[i], d = r || "";
    return typeof _ == "string" && (d = _.replace(/\\r/, "\r").replace(/\\n/, `
`).replace(/\\t/, "	")), d;
  }, e.prototype._get_number = function(i, r) {
    var _ = this.raw_options[i];
    r = parseInt(r, 10), isNaN(r) && (r = 0);
    var d = parseInt(_, 10);
    return isNaN(d) && (d = r), d;
  }, e.prototype._get_selection = function(i, r, _) {
    var d = this._get_selection_list(i, r, _);
    if (d.length !== 1)
      throw new Error(
        "Invalid Option Value: The option '" + i + `' can only be one of the following values:
` + r + `
You passed in: '` + this.raw_options[i] + "'"
      );
    return d[0];
  }, e.prototype._get_selection_list = function(i, r, _) {
    if (!r || r.length === 0)
      throw new Error("Selection list cannot be empty.");
    if (_ = _ || [r[0]], !this._is_valid_selection(_, r))
      throw new Error("Invalid Default Value!");
    var d = this._get_array(i, _);
    if (!this._is_valid_selection(d, r))
      throw new Error(
        "Invalid Option Value: The option '" + i + `' can contain only the following values:
` + r + `
You passed in: '` + this.raw_options[i] + "'"
      );
    return d;
  }, e.prototype._is_valid_selection = function(i, r) {
    return i.length && r.length && !i.some(function(_) {
      return r.indexOf(_) === -1;
    });
  };
  function n(i, r) {
    var _ = {};
    i = t(i);
    var d;
    for (d in i)
      d !== r && (_[d] = i[d]);
    if (r && i[r])
      for (d in i[r])
        _[d] = i[r][d];
    return _;
  }
  function t(i) {
    var r = {}, _;
    for (_ in i) {
      var d = _.replace(/-/g, "_");
      r[d] = i[_];
    }
    return r;
  }
  return xt.Options = e, xt.normalizeOpts = t, xt.mergeOpts = n, xt;
}
var Pe;
function gi() {
  if (Pe)
    return Zt;
  Pe = 1;
  var e = ce().Options, n = ["before-newline", "after-newline", "preserve-newline"];
  function t(i) {
    e.call(this, i, "js");
    var r = this.raw_options.brace_style || null;
    r === "expand-strict" ? this.raw_options.brace_style = "expand" : r === "collapse-preserve-inline" ? this.raw_options.brace_style = "collapse,preserve-inline" : this.raw_options.braces_on_own_line !== void 0 && (this.raw_options.brace_style = this.raw_options.braces_on_own_line ? "expand" : "collapse");
    var _ = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
    this.brace_preserve_inline = !1, this.brace_style = "collapse";
    for (var d = 0; d < _.length; d++)
      _[d] === "preserve-inline" ? this.brace_preserve_inline = !0 : this.brace_style = _[d];
    this.unindent_chained_methods = this._get_boolean("unindent_chained_methods"), this.break_chained_methods = this._get_boolean("break_chained_methods"), this.space_in_paren = this._get_boolean("space_in_paren"), this.space_in_empty_paren = this._get_boolean("space_in_empty_paren"), this.jslint_happy = this._get_boolean("jslint_happy"), this.space_after_anon_function = this._get_boolean("space_after_anon_function"), this.space_after_named_function = this._get_boolean("space_after_named_function"), this.keep_array_indentation = this._get_boolean("keep_array_indentation"), this.space_before_conditional = this._get_boolean("space_before_conditional", !0), this.unescape_strings = this._get_boolean("unescape_strings"), this.e4x = this._get_boolean("e4x"), this.comma_first = this._get_boolean("comma_first"), this.operator_position = this._get_selection("operator_position", n), this.test_output_raw = this._get_boolean("test_output_raw"), this.jslint_happy && (this.space_after_anon_function = !0);
  }
  return t.prototype = new e(), Zt.Options = t, Zt;
}
var ct = {}, Jt = {}, Ie;
function fe() {
  if (Ie)
    return Jt;
  Ie = 1;
  var e = RegExp.prototype.hasOwnProperty("sticky");
  function n(t) {
    this.__input = t || "", this.__input_length = this.__input.length, this.__position = 0;
  }
  return n.prototype.restart = function() {
    this.__position = 0;
  }, n.prototype.back = function() {
    this.__position > 0 && (this.__position -= 1);
  }, n.prototype.hasNext = function() {
    return this.__position < this.__input_length;
  }, n.prototype.next = function() {
    var t = null;
    return this.hasNext() && (t = this.__input.charAt(this.__position), this.__position += 1), t;
  }, n.prototype.peek = function(t) {
    var i = null;
    return t = t || 0, t += this.__position, t >= 0 && t < this.__input_length && (i = this.__input.charAt(t)), i;
  }, n.prototype.__match = function(t, i) {
    t.lastIndex = i;
    var r = t.exec(this.__input);
    return r && !(e && t.sticky) && r.index !== i && (r = null), r;
  }, n.prototype.test = function(t, i) {
    return i = i || 0, i += this.__position, i >= 0 && i < this.__input_length ? !!this.__match(t, i) : !1;
  }, n.prototype.testChar = function(t, i) {
    var r = this.peek(i);
    return t.lastIndex = 0, r !== null && t.test(r);
  }, n.prototype.match = function(t) {
    var i = this.__match(t, this.__position);
    return i ? this.__position += i[0].length : i = null, i;
  }, n.prototype.read = function(t, i, r) {
    var _ = "", d;
    return t && (d = this.match(t), d && (_ += d[0])), i && (d || !t) && (_ += this.readUntil(i, r)), _;
  }, n.prototype.readUntil = function(t, i) {
    var r = "", _ = this.__position;
    t.lastIndex = this.__position;
    var d = t.exec(this.__input);
    return d ? (_ = d.index, i && (_ += d[0].length)) : _ = this.__input_length, r = this.__input.substring(this.__position, _), this.__position = _, r;
  }, n.prototype.readUntilAfter = function(t) {
    return this.readUntil(t, !0);
  }, n.prototype.get_regexp = function(t, i) {
    var r = null, _ = "g";
    return i && e && (_ = "y"), typeof t == "string" && t !== "" ? r = new RegExp(t, _) : t && (r = new RegExp(t.source, _)), r;
  }, n.prototype.get_literal_regexp = function(t) {
    return RegExp(t.replace(/[-\/\\^$*+?.()|[\]{}]/g, "\\$&"));
  }, n.prototype.peekUntilAfter = function(t) {
    var i = this.__position, r = this.readUntilAfter(t);
    return this.__position = i, r;
  }, n.prototype.lookBack = function(t) {
    var i = this.__position - 1;
    return i >= t.length && this.__input.substring(i - t.length, i).toLowerCase() === t;
  }, Jt.InputScanner = n, Jt;
}
var kt = {}, Yt = {}, Be;
function on() {
  if (Be)
    return Yt;
  Be = 1;
  function e(n) {
    this.__tokens = [], this.__tokens_length = this.__tokens.length, this.__position = 0, this.__parent_token = n;
  }
  return e.prototype.restart = function() {
    this.__position = 0;
  }, e.prototype.isEmpty = function() {
    return this.__tokens_length === 0;
  }, e.prototype.hasNext = function() {
    return this.__position < this.__tokens_length;
  }, e.prototype.next = function() {
    var n = null;
    return this.hasNext() && (n = this.__tokens[this.__position], this.__position += 1), n;
  }, e.prototype.peek = function(n) {
    var t = null;
    return n = n || 0, n += this.__position, n >= 0 && n < this.__tokens_length && (t = this.__tokens[n]), t;
  }, e.prototype.add = function(n) {
    this.__parent_token && (n.parent = this.__parent_token), this.__tokens.push(n), this.__tokens_length += 1;
  }, Yt.TokenStream = e, Yt;
}
var te = {}, ee = {}, $e;
function $t() {
  if ($e)
    return ee;
  $e = 1;
  function e(n, t) {
    this._input = n, this._starting_pattern = null, this._match_pattern = null, this._until_pattern = null, this._until_after = !1, t && (this._starting_pattern = this._input.get_regexp(t._starting_pattern, !0), this._match_pattern = this._input.get_regexp(t._match_pattern, !0), this._until_pattern = this._input.get_regexp(t._until_pattern), this._until_after = t._until_after);
  }
  return e.prototype.read = function() {
    var n = this._input.read(this._starting_pattern);
    return (!this._starting_pattern || n) && (n += this._input.read(this._match_pattern, this._until_pattern, this._until_after)), n;
  }, e.prototype.read_match = function() {
    return this._input.match(this._match_pattern);
  }, e.prototype.until_after = function(n) {
    var t = this._create();
    return t._until_after = !0, t._until_pattern = this._input.get_regexp(n), t._update(), t;
  }, e.prototype.until = function(n) {
    var t = this._create();
    return t._until_after = !1, t._until_pattern = this._input.get_regexp(n), t._update(), t;
  }, e.prototype.starting_with = function(n) {
    var t = this._create();
    return t._starting_pattern = this._input.get_regexp(n, !0), t._update(), t;
  }, e.prototype.matching = function(n) {
    var t = this._create();
    return t._match_pattern = this._input.get_regexp(n, !0), t._update(), t;
  }, e.prototype._create = function() {
    return new e(this._input, this);
  }, e.prototype._update = function() {
  }, ee.Pattern = e, ee;
}
var Me;
function _n() {
  if (Me)
    return te;
  Me = 1;
  var e = $t().Pattern;
  function n(t, i) {
    e.call(this, t, i), i ? this._line_regexp = this._input.get_regexp(i._line_regexp) : this.__set_whitespace_patterns("", ""), this.newline_count = 0, this.whitespace_before_token = "";
  }
  return n.prototype = new e(), n.prototype.__set_whitespace_patterns = function(t, i) {
    t += "\\t ", i += "\\n\\r", this._match_pattern = this._input.get_regexp(
      "[" + t + i + "]+",
      !0
    ), this._newline_regexp = this._input.get_regexp(
      "\\r\\n|[" + i + "]"
    );
  }, n.prototype.read = function() {
    this.newline_count = 0, this.whitespace_before_token = "";
    var t = this._input.read(this._match_pattern);
    if (t === " ")
      this.whitespace_before_token = " ";
    else if (t) {
      var i = this.__split(this._newline_regexp, t);
      this.newline_count = i.length - 1, this.whitespace_before_token = i[this.newline_count];
    }
    return t;
  }, n.prototype.matching = function(t, i) {
    var r = this._create();
    return r.__set_whitespace_patterns(t, i), r._update(), r;
  }, n.prototype._create = function() {
    return new n(this._input, this);
  }, n.prototype.__split = function(t, i) {
    t.lastIndex = 0;
    for (var r = 0, _ = [], d = t.exec(i); d; )
      _.push(i.substring(r, d.index)), r = d.index + d[0].length, d = t.exec(i);
    return r < i.length ? _.push(i.substring(r, i.length)) : _.push(""), _;
  }, te.WhitespacePattern = n, te;
}
var Fe;
function Pt() {
  if (Fe)
    return kt;
  Fe = 1;
  var e = fe().InputScanner, n = fi().Token, t = on().TokenStream, i = _n().WhitespacePattern, r = {
    START: "TK_START",
    RAW: "TK_RAW",
    EOF: "TK_EOF"
  }, _ = function(d, u) {
    this._input = new e(d), this._options = u || {}, this.__tokens = null, this._patterns = {}, this._patterns.whitespace = new i(this._input);
  };
  return _.prototype.tokenize = function() {
    this._input.restart(), this.__tokens = new t(), this._reset();
    for (var d, u = new n(r.START, ""), o = null, b = [], m = new t(); u.type !== r.EOF; ) {
      for (d = this._get_next_token(u, o); this._is_comment(d); )
        m.add(d), d = this._get_next_token(u, o);
      m.isEmpty() || (d.comments_before = m, m = new t()), d.parent = o, this._is_opening(d) ? (b.push(o), o = d) : o && this._is_closing(d, o) && (d.opened = o, o.closed = d, o = b.pop(), d.parent = o), d.previous = u, u.next = d, this.__tokens.add(d), u = d;
    }
    return this.__tokens;
  }, _.prototype._is_first_token = function() {
    return this.__tokens.isEmpty();
  }, _.prototype._reset = function() {
  }, _.prototype._get_next_token = function(d, u) {
    this._readWhitespace();
    var o = this._input.read(/.+/g);
    return o ? this._create_token(r.RAW, o) : this._create_token(r.EOF, "");
  }, _.prototype._is_comment = function(d) {
    return !1;
  }, _.prototype._is_opening = function(d) {
    return !1;
  }, _.prototype._is_closing = function(d, u) {
    return !1;
  }, _.prototype._create_token = function(d, u) {
    var o = new n(
      d,
      u,
      this._patterns.whitespace.newline_count,
      this._patterns.whitespace.whitespace_before_token
    );
    return o;
  }, _.prototype._readWhitespace = function() {
    return this._patterns.whitespace.read();
  }, kt.Tokenizer = _, kt.TOKEN = r, kt;
}
var ie = {}, Ue;
function de() {
  if (Ue)
    return ie;
  Ue = 1;
  function e(n, t) {
    n = typeof n == "string" ? n : n.source, t = typeof t == "string" ? t : t.source, this.__directives_block_pattern = new RegExp(n + / beautify( \w+[:]\w+)+ /.source + t, "g"), this.__directive_pattern = / (\w+)[:](\w+)/g, this.__directives_end_ignore_pattern = new RegExp(n + /\sbeautify\signore:end\s/.source + t, "g");
  }
  return e.prototype.get_directives = function(n) {
    if (!n.match(this.__directives_block_pattern))
      return null;
    var t = {};
    this.__directive_pattern.lastIndex = 0;
    for (var i = this.__directive_pattern.exec(n); i; )
      t[i[1]] = i[2], i = this.__directive_pattern.exec(n);
    return t;
  }, e.prototype.readIgnored = function(n) {
    return n.readUntilAfter(this.__directives_end_ignore_pattern);
  }, ie.Directives = e, ie;
}
var ne = {}, We;
function mi() {
  if (We)
    return ne;
  We = 1;
  var e = $t().Pattern, n = {
    django: !1,
    erb: !1,
    handlebars: !1,
    php: !1,
    smarty: !1,
    angular: !1
  };
  function t(i, r) {
    e.call(this, i, r), this.__template_pattern = null, this._disabled = Object.assign({}, n), this._excluded = Object.assign({}, n), r && (this.__template_pattern = this._input.get_regexp(r.__template_pattern), this._excluded = Object.assign(this._excluded, r._excluded), this._disabled = Object.assign(this._disabled, r._disabled));
    var _ = new e(i);
    this.__patterns = {
      handlebars_comment: _.starting_with(/{{!--/).until_after(/--}}/),
      handlebars_unescaped: _.starting_with(/{{{/).until_after(/}}}/),
      handlebars: _.starting_with(/{{/).until_after(/}}/),
      php: _.starting_with(/<\?(?:[= ]|php)/).until_after(/\?>/),
      erb: _.starting_with(/<%[^%]/).until_after(/[^%]%>/),
      django: _.starting_with(/{%/).until_after(/%}/),
      django_value: _.starting_with(/{{/).until_after(/}}/),
      django_comment: _.starting_with(/{#/).until_after(/#}/),
      smarty: _.starting_with(/{(?=[^}{\s\n])/).until_after(/[^\s\n]}/),
      smarty_comment: _.starting_with(/{\*/).until_after(/\*}/),
      smarty_literal: _.starting_with(/{literal}/).until_after(/{\/literal}/)
    };
  }
  return t.prototype = new e(), t.prototype._create = function() {
    return new t(this._input, this);
  }, t.prototype._update = function() {
    this.__set_templated_pattern();
  }, t.prototype.disable = function(i) {
    var r = this._create();
    return r._disabled[i] = !0, r._update(), r;
  }, t.prototype.read_options = function(i) {
    var r = this._create();
    for (var _ in n)
      r._disabled[_] = i.templating.indexOf(_) === -1;
    return r._update(), r;
  }, t.prototype.exclude = function(i) {
    var r = this._create();
    return r._excluded[i] = !0, r._update(), r;
  }, t.prototype.read = function() {
    var i = "";
    this._match_pattern ? i = this._input.read(this._starting_pattern) : i = this._input.read(this._starting_pattern, this.__template_pattern);
    for (var r = this._read_template(); r; )
      this._match_pattern ? r += this._input.read(this._match_pattern) : r += this._input.readUntil(this.__template_pattern), i += r, r = this._read_template();
    return this._until_after && (i += this._input.readUntilAfter(this._until_pattern)), i;
  }, t.prototype.__set_templated_pattern = function() {
    var i = [];
    this._disabled.php || i.push(this.__patterns.php._starting_pattern.source), this._disabled.handlebars || i.push(this.__patterns.handlebars._starting_pattern.source), this._disabled.angular || i.push(this.__patterns.handlebars._starting_pattern.source), this._disabled.erb || i.push(this.__patterns.erb._starting_pattern.source), this._disabled.django || (i.push(this.__patterns.django._starting_pattern.source), i.push(this.__patterns.django_value._starting_pattern.source), i.push(this.__patterns.django_comment._starting_pattern.source)), this._disabled.smarty || i.push(this.__patterns.smarty._starting_pattern.source), this._until_pattern && i.push(this._until_pattern.source), this.__template_pattern = this._input.get_regexp("(?:" + i.join("|") + ")");
  }, t.prototype._read_template = function() {
    var i = "", r = this._input.peek();
    if (r === "<") {
      var _ = this._input.peek(1);
      !this._disabled.php && !this._excluded.php && _ === "?" && (i = i || this.__patterns.php.read()), !this._disabled.erb && !this._excluded.erb && _ === "%" && (i = i || this.__patterns.erb.read());
    } else
      r === "{" && (!this._disabled.handlebars && !this._excluded.handlebars && (i = i || this.__patterns.handlebars_comment.read(), i = i || this.__patterns.handlebars_unescaped.read(), i = i || this.__patterns.handlebars.read()), this._disabled.django || (!this._excluded.django && !this._excluded.handlebars && (i = i || this.__patterns.django_value.read()), this._excluded.django || (i = i || this.__patterns.django_comment.read(), i = i || this.__patterns.django.read())), this._disabled.smarty || this._disabled.django && this._disabled.handlebars && (i = i || this.__patterns.smarty_comment.read(), i = i || this.__patterns.smarty_literal.read(), i = i || this.__patterns.smarty.read()));
    return i;
  }, ne.TemplatablePattern = t, ne;
}
var ze;
function St() {
  if (ze)
    return ct;
  ze = 1;
  var e = fe().InputScanner, n = Pt().Tokenizer, t = Pt().TOKEN, i = de().Directives, r = di(), _ = $t().Pattern, d = mi().TemplatablePattern;
  function u(l, g) {
    return g.indexOf(l) !== -1;
  }
  var o = {
    START_EXPR: "TK_START_EXPR",
    END_EXPR: "TK_END_EXPR",
    START_BLOCK: "TK_START_BLOCK",
    END_BLOCK: "TK_END_BLOCK",
    WORD: "TK_WORD",
    RESERVED: "TK_RESERVED",
    SEMICOLON: "TK_SEMICOLON",
    STRING: "TK_STRING",
    EQUALS: "TK_EQUALS",
    OPERATOR: "TK_OPERATOR",
    COMMA: "TK_COMMA",
    BLOCK_COMMENT: "TK_BLOCK_COMMENT",
    COMMENT: "TK_COMMENT",
    DOT: "TK_DOT",
    UNKNOWN: "TK_UNKNOWN",
    START: t.START,
    RAW: t.RAW,
    EOF: t.EOF
  }, b = new i(/\/\*/, /\*\//), m = /0[xX][0123456789abcdefABCDEF_]*n?|0[oO][01234567_]*n?|0[bB][01_]*n?|\d[\d_]*n|(?:\.\d[\d_]*|\d[\d_]*\.?[\d_]*)(?:[eE][+-]?[\d_]+)?/, v = /[0-9]/, f = /[^\d\.]/, S = ">>> === !== &&= ??= ||= << && >= ** != == <= >> || ?? |> < / - + > : & % ? ^ | *".split(" "), j = ">>>= ... >>= <<= === >>> !== **= &&= ??= ||= => ^= :: /= << <= == && -= >= >> != -- += ** || ?? ++ %= &= *= |= |> = ! ? > < : / ^ - + * & % ~ |";
  j = j.replace(/[-[\]{}()*+?.,\\^$|#]/g, "\\$&"), j = "\\?\\.(?!\\d) " + j, j = j.replace(/ /g, "|");
  var C = new RegExp(j), h = "continue,try,throw,return,var,let,const,if,switch,case,default,for,while,break,function,import,export".split(","), a = h.concat(["do", "in", "of", "else", "get", "set", "new", "catch", "finally", "typeof", "yield", "async", "await", "from", "as", "class", "extends"]), c = new RegExp("^(?:" + a.join("|") + ")$"), T, w = function(l, g) {
    n.call(this, l, g), this._patterns.whitespace = this._patterns.whitespace.matching(
      /\u00A0\u1680\u180e\u2000-\u200a\u202f\u205f\u3000\ufeff/.source,
      /\u2028\u2029/.source
    );
    var p = new _(this._input), E = new d(this._input).read_options(this._options);
    this.__patterns = {
      template: E,
      identifier: E.starting_with(r.identifier).matching(r.identifierMatch),
      number: p.matching(m),
      punct: p.matching(C),
      comment: p.starting_with(/\/\//).until(/[\n\r\u2028\u2029]/),
      block_comment: p.starting_with(/\/\*/).until_after(/\*\//),
      html_comment_start: p.matching(/<!--/),
      html_comment_end: p.matching(/-->/),
      include: p.starting_with(/#include/).until_after(r.lineBreak),
      shebang: p.starting_with(/#!/).until_after(r.lineBreak),
      xml: p.matching(/[\s\S]*?<(\/?)([-a-zA-Z:0-9_.]+|{[^}]+?}|!\[CDATA\[[^\]]*?\]\]|)(\s*{[^}]+?}|\s+[-a-zA-Z:0-9_.]+|\s+[-a-zA-Z:0-9_.]+\s*=\s*('[^']*'|"[^"]*"|{([^{}]|{[^}]+?})+?}))*\s*(\/?)\s*>/),
      single_quote: E.until(/['\\\n\r\u2028\u2029]/),
      double_quote: E.until(/["\\\n\r\u2028\u2029]/),
      template_text: E.until(/[`\\$]/),
      template_expression: E.until(/[`}\\]/)
    };
  };
  w.prototype = new n(), w.prototype._is_comment = function(l) {
    return l.type === o.COMMENT || l.type === o.BLOCK_COMMENT || l.type === o.UNKNOWN;
  }, w.prototype._is_opening = function(l) {
    return l.type === o.START_BLOCK || l.type === o.START_EXPR;
  }, w.prototype._is_closing = function(l, g) {
    return (l.type === o.END_BLOCK || l.type === o.END_EXPR) && g && (l.text === "]" && g.text === "[" || l.text === ")" && g.text === "(" || l.text === "}" && g.text === "{");
  }, w.prototype._reset = function() {
    T = !1;
  }, w.prototype._get_next_token = function(l, g) {
    var p = null;
    this._readWhitespace();
    var E = this._input.peek();
    return E === null ? this._create_token(o.EOF, "") : (p = p || this._read_non_javascript(E), p = p || this._read_string(E), p = p || this._read_pair(E, this._input.peek(1)), p = p || this._read_word(l), p = p || this._read_singles(E), p = p || this._read_comment(E), p = p || this._read_regexp(E, l), p = p || this._read_xml(E, l), p = p || this._read_punctuation(), p = p || this._create_token(o.UNKNOWN, this._input.next()), p);
  }, w.prototype._read_word = function(l) {
    var g;
    if (g = this.__patterns.identifier.read(), g !== "")
      return g = g.replace(r.allLineBreaks, `
`), !(l.type === o.DOT || l.type === o.RESERVED && (l.text === "set" || l.text === "get")) && c.test(g) ? (g === "in" || g === "of") && (l.type === o.WORD || l.type === o.STRING) ? this._create_token(o.OPERATOR, g) : this._create_token(o.RESERVED, g) : this._create_token(o.WORD, g);
    if (g = this.__patterns.number.read(), g !== "")
      return this._create_token(o.WORD, g);
  }, w.prototype._read_singles = function(l) {
    var g = null;
    return l === "(" || l === "[" ? g = this._create_token(o.START_EXPR, l) : l === ")" || l === "]" ? g = this._create_token(o.END_EXPR, l) : l === "{" ? g = this._create_token(o.START_BLOCK, l) : l === "}" ? g = this._create_token(o.END_BLOCK, l) : l === ";" ? g = this._create_token(o.SEMICOLON, l) : l === "." && f.test(this._input.peek(1)) ? g = this._create_token(o.DOT, l) : l === "," && (g = this._create_token(o.COMMA, l)), g && this._input.next(), g;
  }, w.prototype._read_pair = function(l, g) {
    var p = null;
    return l === "#" && g === "{" && (p = this._create_token(o.START_BLOCK, l + g)), p && (this._input.next(), this._input.next()), p;
  }, w.prototype._read_punctuation = function() {
    var l = this.__patterns.punct.read();
    if (l !== "")
      return l === "=" ? this._create_token(o.EQUALS, l) : l === "?." ? this._create_token(o.DOT, l) : this._create_token(o.OPERATOR, l);
  }, w.prototype._read_non_javascript = function(l) {
    var g = "";
    if (l === "#") {
      if (this._is_first_token() && (g = this.__patterns.shebang.read(), g))
        return this._create_token(o.UNKNOWN, g.trim() + `
`);
      if (g = this.__patterns.include.read(), g)
        return this._create_token(o.UNKNOWN, g.trim() + `
`);
      l = this._input.next();
      var p = "#";
      if (this._input.hasNext() && this._input.testChar(v)) {
        do
          l = this._input.next(), p += l;
        while (this._input.hasNext() && l !== "#" && l !== "=");
        return l === "#" || (this._input.peek() === "[" && this._input.peek(1) === "]" ? (p += "[]", this._input.next(), this._input.next()) : this._input.peek() === "{" && this._input.peek(1) === "}" && (p += "{}", this._input.next(), this._input.next())), this._create_token(o.WORD, p);
      }
      this._input.back();
    } else if (l === "<" && this._is_first_token()) {
      if (g = this.__patterns.html_comment_start.read(), g) {
        for (; this._input.hasNext() && !this._input.testChar(r.newline); )
          g += this._input.next();
        return T = !0, this._create_token(o.COMMENT, g);
      }
    } else if (T && l === "-" && (g = this.__patterns.html_comment_end.read(), g))
      return T = !1, this._create_token(o.COMMENT, g);
    return null;
  }, w.prototype._read_comment = function(l) {
    var g = null;
    if (l === "/") {
      var p = "";
      if (this._input.peek(1) === "*") {
        p = this.__patterns.block_comment.read();
        var E = b.get_directives(p);
        E && E.ignore === "start" && (p += b.readIgnored(this._input)), p = p.replace(r.allLineBreaks, `
`), g = this._create_token(o.BLOCK_COMMENT, p), g.directives = E;
      } else
        this._input.peek(1) === "/" && (p = this.__patterns.comment.read(), g = this._create_token(o.COMMENT, p));
    }
    return g;
  }, w.prototype._read_string = function(l) {
    if (l === "`" || l === "'" || l === '"') {
      var g = this._input.next();
      return this.has_char_escapes = !1, l === "`" ? g += this._read_string_recursive("`", !0, "${") : g += this._read_string_recursive(l), this.has_char_escapes && this._options.unescape_strings && (g = O(g)), this._input.peek() === l && (g += this._input.next()), g = g.replace(r.allLineBreaks, `
`), this._create_token(o.STRING, g);
    }
    return null;
  }, w.prototype._allow_regexp_or_xml = function(l) {
    return l.type === o.RESERVED && u(l.text, ["return", "case", "throw", "else", "do", "typeof", "yield"]) || l.type === o.END_EXPR && l.text === ")" && l.opened.previous.type === o.RESERVED && u(l.opened.previous.text, ["if", "while", "for"]) || u(l.type, [
      o.COMMENT,
      o.START_EXPR,
      o.START_BLOCK,
      o.START,
      o.END_BLOCK,
      o.OPERATOR,
      o.EQUALS,
      o.EOF,
      o.SEMICOLON,
      o.COMMA
    ]);
  }, w.prototype._read_regexp = function(l, g) {
    if (l === "/" && this._allow_regexp_or_xml(g)) {
      for (var p = this._input.next(), E = !1, s = !1; this._input.hasNext() && (E || s || this._input.peek() !== l) && !this._input.testChar(r.newline); )
        p += this._input.peek(), E ? E = !1 : (E = this._input.peek() === "\\", this._input.peek() === "[" ? s = !0 : this._input.peek() === "]" && (s = !1)), this._input.next();
      return this._input.peek() === l && (p += this._input.next(), p += this._input.read(r.identifier)), this._create_token(o.STRING, p);
    }
    return null;
  }, w.prototype._read_xml = function(l, g) {
    if (this._options.e4x && l === "<" && this._allow_regexp_or_xml(g)) {
      var p = "", E = this.__patterns.xml.read_match();
      if (E) {
        for (var s = E[2].replace(/^{\s+/, "{").replace(/\s+}$/, "}"), y = s.indexOf("{") === 0, x = 0; E; ) {
          var A = !!E[1], D = E[2], B = !!E[E.length - 1] || D.slice(0, 8) === "![CDATA[";
          if (!B && (D === s || y && D.replace(/^{\s+/, "{").replace(/\s+}$/, "}")) && (A ? --x : ++x), p += E[0], x <= 0)
            break;
          E = this.__patterns.xml.read_match();
        }
        return E || (p += this._input.match(/[\s\S]*/g)[0]), p = p.replace(r.allLineBreaks, `
`), this._create_token(o.STRING, p);
      }
    }
    return null;
  };
  function O(l) {
    for (var g = "", p = 0, E = new e(l), s = null; E.hasNext(); )
      if (s = E.match(/([\s]|[^\\]|\\\\)+/g), s && (g += s[0]), E.peek() === "\\") {
        if (E.next(), E.peek() === "x")
          s = E.match(/x([0-9A-Fa-f]{2})/g);
        else if (E.peek() === "u")
          s = E.match(/u([0-9A-Fa-f]{4})/g), s || (s = E.match(/u\{([0-9A-Fa-f]+)\}/g));
        else {
          g += "\\", E.hasNext() && (g += E.next());
          continue;
        }
        if (!s || (p = parseInt(s[1], 16), p > 126 && p <= 255 && s[0].indexOf("x") === 0))
          return l;
        p >= 0 && p < 32 || p > 1114111 ? g += "\\" + s[0] : p === 34 || p === 39 || p === 92 ? g += "\\" + String.fromCharCode(p) : g += String.fromCharCode(p);
      }
    return g;
  }
  return w.prototype._read_string_recursive = function(l, g, p) {
    var E, s;
    l === "'" ? s = this.__patterns.single_quote : l === '"' ? s = this.__patterns.double_quote : l === "`" ? s = this.__patterns.template_text : l === "}" && (s = this.__patterns.template_expression);
    for (var y = s.read(), x = ""; this._input.hasNext(); ) {
      if (x = this._input.next(), x === l || !g && r.newline.test(x)) {
        this._input.back();
        break;
      } else
        x === "\\" && this._input.hasNext() ? (E = this._input.peek(), E === "x" || E === "u" ? this.has_char_escapes = !0 : E === "\r" && this._input.peek(1) === `
` && this._input.next(), x += this._input.next()) : p && (p === "${" && x === "$" && this._input.peek() === "{" && (x += this._input.next()), p === x && (l === "`" ? x += this._read_string_recursive("}", g, "`") : x += this._read_string_recursive("`", g, "${"), this._input.hasNext() && (x += this._input.next())));
      x += s.read(), y += x;
    }
    return y;
  }, ct.Tokenizer = w, ct.TOKEN = o, ct.positionable_operators = S.slice(), ct.line_starters = h.slice(), ct;
}
var Ke;
function un() {
  if (Ke)
    return Gt;
  Ke = 1;
  var e = he().Output, n = fi().Token, t = di(), i = gi().Options, r = St().Tokenizer, _ = St().line_starters, d = St().positionable_operators, u = St().TOKEN;
  function o(s, y) {
    return y.indexOf(s) !== -1;
  }
  function b(s) {
    return s.replace(/^\s+/g, "");
  }
  function m(s) {
    for (var y = {}, x = 0; x < s.length; x++)
      y[s[x].replace(/-/g, "_")] = s[x];
    return y;
  }
  function v(s, y) {
    return s && s.type === u.RESERVED && s.text === y;
  }
  function f(s, y) {
    return s && s.type === u.RESERVED && o(s.text, y);
  }
  var S = ["case", "return", "do", "if", "throw", "else", "await", "break", "continue", "async"], j = ["before-newline", "after-newline", "preserve-newline"], C = m(j), h = [C.before_newline, C.preserve_newline], a = {
    BlockStatement: "BlockStatement",
    Statement: "Statement",
    ObjectLiteral: "ObjectLiteral",
    ArrayLiteral: "ArrayLiteral",
    ForInitializer: "ForInitializer",
    Conditional: "Conditional",
    Expression: "Expression"
  };
  function c(s, y) {
    y.multiline_frame || y.mode === a.ForInitializer || y.mode === a.Conditional || s.remove_indent(y.start_line_index);
  }
  function T(s) {
    s = s.replace(t.allLineBreaks, `
`);
    for (var y = [], x = s.indexOf(`
`); x !== -1; )
      y.push(s.substring(0, x)), s = s.substring(x + 1), x = s.indexOf(`
`);
    return s.length && y.push(s), y;
  }
  function w(s) {
    return s === a.ArrayLiteral;
  }
  function O(s) {
    return o(s, [a.Expression, a.ForInitializer, a.Conditional]);
  }
  function l(s, y) {
    for (var x = 0; x < s.length; x++) {
      var A = s[x].trim();
      if (A.charAt(0) !== y)
        return !1;
    }
    return !0;
  }
  function g(s, y) {
    for (var x = 0, A = s.length, D; x < A; x++)
      if (D = s[x], D && D.indexOf(y) !== 0)
        return !1;
    return !0;
  }
  function p(s, y) {
    y = y || {}, this._source_text = s || "", this._output = null, this._tokens = null, this._last_last_text = null, this._flags = null, this._previous_flags = null, this._flag_store = null, this._options = new i(y);
  }
  p.prototype.create_flags = function(s, y) {
    var x = 0;
    s && (x = s.indentation_level, !this._output.just_added_newline() && s.line_indent_level > x && (x = s.line_indent_level));
    var A = {
      mode: y,
      parent: s,
      last_token: s ? s.last_token : new n(u.START_BLOCK, ""),
      last_word: s ? s.last_word : "",
      declaration_statement: !1,
      declaration_assignment: !1,
      multiline_frame: !1,
      inline_frame: !1,
      if_block: !1,
      else_block: !1,
      class_start_block: !1,
      do_block: !1,
      do_while: !1,
      import_block: !1,
      in_case_statement: !1,
      in_case: !1,
      case_body: !1,
      case_block: !1,
      indentation_level: x,
      alignment: 0,
      line_indent_level: s ? s.line_indent_level : x,
      start_line_index: this._output.get_line_number(),
      ternary_depth: 0
    };
    return A;
  }, p.prototype._reset = function(s) {
    var y = s.match(/^[\t ]*/)[0];
    this._last_last_text = "", this._output = new e(this._options, y), this._output.raw = this._options.test_output_raw, this._flag_store = [], this.set_mode(a.BlockStatement);
    var x = new r(s, this._options);
    return this._tokens = x.tokenize(), s;
  }, p.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var s, y = this._reset(this._source_text), x = this._options.eol;
    this._options.eol === "auto" && (x = `
`, y && t.lineBreak.test(y || "") && (x = y.match(t.lineBreak)[0]));
    for (var A = this._tokens.next(); A; )
      this.handle_token(A), this._last_last_text = this._flags.last_token.text, this._flags.last_token = A, A = this._tokens.next();
    return s = this._output.get_code(x), s;
  }, p.prototype.handle_token = function(s, y) {
    s.type === u.START_EXPR ? this.handle_start_expr(s) : s.type === u.END_EXPR ? this.handle_end_expr(s) : s.type === u.START_BLOCK ? this.handle_start_block(s) : s.type === u.END_BLOCK ? this.handle_end_block(s) : s.type === u.WORD ? this.handle_word(s) : s.type === u.RESERVED ? this.handle_word(s) : s.type === u.SEMICOLON ? this.handle_semicolon(s) : s.type === u.STRING ? this.handle_string(s) : s.type === u.EQUALS ? this.handle_equals(s) : s.type === u.OPERATOR ? this.handle_operator(s) : s.type === u.COMMA ? this.handle_comma(s) : s.type === u.BLOCK_COMMENT ? this.handle_block_comment(s, y) : s.type === u.COMMENT ? this.handle_comment(s, y) : s.type === u.DOT ? this.handle_dot(s) : s.type === u.EOF ? this.handle_eof(s) : s.type === u.UNKNOWN ? this.handle_unknown(s, y) : this.handle_unknown(s, y);
  }, p.prototype.handle_whitespace_and_comments = function(s, y) {
    var x = s.newlines, A = this._options.keep_array_indentation && w(this._flags.mode);
    if (s.comments_before)
      for (var D = s.comments_before.next(); D; )
        this.handle_whitespace_and_comments(D, y), this.handle_token(D, y), D = s.comments_before.next();
    if (A)
      for (var B = 0; B < x; B += 1)
        this.print_newline(B > 0, y);
    else if (this._options.max_preserve_newlines && x > this._options.max_preserve_newlines && (x = this._options.max_preserve_newlines), this._options.preserve_newlines && x > 1) {
      this.print_newline(!1, y);
      for (var $ = 1; $ < x; $ += 1)
        this.print_newline(!0, y);
    }
  };
  var E = ["async", "break", "continue", "return", "throw", "yield"];
  return p.prototype.allow_wrap_or_preserved_newline = function(s, y) {
    if (y = y === void 0 ? !1 : y, !this._output.just_added_newline()) {
      var x = this._options.preserve_newlines && s.newlines || y, A = o(this._flags.last_token.text, d) || o(s.text, d);
      if (A) {
        var D = o(this._flags.last_token.text, d) && o(this._options.operator_position, h) || o(s.text, d);
        x = x && D;
      }
      if (x)
        this.print_newline(!1, !0);
      else if (this._options.wrap_line_length) {
        if (f(this._flags.last_token, E))
          return;
        this._output.set_wrap_point();
      }
    }
  }, p.prototype.print_newline = function(s, y) {
    if (!y && this._flags.last_token.text !== ";" && this._flags.last_token.text !== "," && this._flags.last_token.text !== "=" && (this._flags.last_token.type !== u.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++"))
      for (var x = this._tokens.peek(); this._flags.mode === a.Statement && !(this._flags.if_block && v(x, "else")) && !this._flags.do_block; )
        this.restore_mode();
    this._output.add_new_line(s) && (this._flags.multiline_frame = !0);
  }, p.prototype.print_token_line_indentation = function(s) {
    this._output.just_added_newline() && (this._options.keep_array_indentation && s.newlines && (s.text === "[" || w(this._flags.mode)) ? (this._output.current_line.set_indent(-1), this._output.current_line.push(s.whitespace_before), this._output.space_before_token = !1) : this._output.set_indent(this._flags.indentation_level, this._flags.alignment) && (this._flags.line_indent_level = this._flags.indentation_level));
  }, p.prototype.print_token = function(s) {
    if (this._output.raw) {
      this._output.add_raw_token(s);
      return;
    }
    if (this._options.comma_first && s.previous && s.previous.type === u.COMMA && this._output.just_added_newline() && this._output.previous_line.last() === ",") {
      var y = this._output.previous_line.pop();
      this._output.previous_line.is_empty() && (this._output.previous_line.push(y), this._output.trim(!0), this._output.current_line.pop(), this._output.trim()), this.print_token_line_indentation(s), this._output.add_token(","), this._output.space_before_token = !0;
    }
    this.print_token_line_indentation(s), this._output.non_breaking_space = !0, this._output.add_token(s.text), this._output.previous_token_wrapped && (this._flags.multiline_frame = !0);
  }, p.prototype.indent = function() {
    this._flags.indentation_level += 1, this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }, p.prototype.deindent = function() {
    this._flags.indentation_level > 0 && (!this._flags.parent || this._flags.indentation_level > this._flags.parent.indentation_level) && (this._flags.indentation_level -= 1, this._output.set_indent(this._flags.indentation_level, this._flags.alignment));
  }, p.prototype.set_mode = function(s) {
    this._flags ? (this._flag_store.push(this._flags), this._previous_flags = this._flags) : this._previous_flags = this.create_flags(null, s), this._flags = this.create_flags(this._previous_flags, s), this._output.set_indent(this._flags.indentation_level, this._flags.alignment);
  }, p.prototype.restore_mode = function() {
    this._flag_store.length > 0 && (this._previous_flags = this._flags, this._flags = this._flag_store.pop(), this._previous_flags.mode === a.Statement && c(this._output, this._previous_flags), this._output.set_indent(this._flags.indentation_level, this._flags.alignment));
  }, p.prototype.start_of_object_property = function() {
    return this._flags.parent.mode === a.ObjectLiteral && this._flags.mode === a.Statement && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || f(this._flags.last_token, ["get", "set"]));
  }, p.prototype.start_of_statement = function(s) {
    var y = !1;
    return y = y || f(this._flags.last_token, ["var", "let", "const"]) && s.type === u.WORD, y = y || v(this._flags.last_token, "do"), y = y || !(this._flags.parent.mode === a.ObjectLiteral && this._flags.mode === a.Statement) && f(this._flags.last_token, E) && !s.newlines, y = y || v(this._flags.last_token, "else") && !(v(s, "if") && !s.comments_before), y = y || this._flags.last_token.type === u.END_EXPR && (this._previous_flags.mode === a.ForInitializer || this._previous_flags.mode === a.Conditional), y = y || this._flags.last_token.type === u.WORD && this._flags.mode === a.BlockStatement && !this._flags.in_case && !(s.text === "--" || s.text === "++") && this._last_last_text !== "function" && s.type !== u.WORD && s.type !== u.RESERVED, y = y || this._flags.mode === a.ObjectLiteral && (this._flags.last_token.text === ":" && this._flags.ternary_depth === 0 || f(this._flags.last_token, ["get", "set"])), y ? (this.set_mode(a.Statement), this.indent(), this.handle_whitespace_and_comments(s, !0), this.start_of_object_property() || this.allow_wrap_or_preserved_newline(
      s,
      f(s, ["do", "for", "if", "while"])
    ), !0) : !1;
  }, p.prototype.handle_start_expr = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s);
    var y = a.Expression;
    if (s.text === "[") {
      if (this._flags.last_token.type === u.WORD || this._flags.last_token.text === ")") {
        f(this._flags.last_token, _) && (this._output.space_before_token = !0), this.print_token(s), this.set_mode(y), this.indent(), this._options.space_in_paren && (this._output.space_before_token = !0);
        return;
      }
      y = a.ArrayLiteral, w(this._flags.mode) && (this._flags.last_token.text === "[" || this._flags.last_token.text === "," && (this._last_last_text === "]" || this._last_last_text === "}")) && (this._options.keep_array_indentation || this.print_newline()), o(this._flags.last_token.type, [u.START_EXPR, u.END_EXPR, u.WORD, u.OPERATOR, u.DOT]) || (this._output.space_before_token = !0);
    } else {
      if (this._flags.last_token.type === u.RESERVED)
        this._flags.last_token.text === "for" ? (this._output.space_before_token = this._options.space_before_conditional, y = a.ForInitializer) : o(this._flags.last_token.text, ["if", "while", "switch"]) ? (this._output.space_before_token = this._options.space_before_conditional, y = a.Conditional) : o(this._flags.last_word, ["await", "async"]) ? this._output.space_before_token = !0 : this._flags.last_token.text === "import" && s.whitespace_before === "" ? this._output.space_before_token = !1 : (o(this._flags.last_token.text, _) || this._flags.last_token.text === "catch") && (this._output.space_before_token = !0);
      else if (this._flags.last_token.type === u.EQUALS || this._flags.last_token.type === u.OPERATOR)
        this.start_of_object_property() || this.allow_wrap_or_preserved_newline(s);
      else if (this._flags.last_token.type === u.WORD) {
        this._output.space_before_token = !1;
        var x = this._tokens.peek(-3);
        if (this._options.space_after_named_function && x) {
          var A = this._tokens.peek(-4);
          f(x, ["async", "function"]) || x.text === "*" && f(A, ["async", "function"]) ? this._output.space_before_token = !0 : this._flags.mode === a.ObjectLiteral ? (x.text === "{" || x.text === "," || x.text === "*" && (A.text === "{" || A.text === ",")) && (this._output.space_before_token = !0) : this._flags.parent && this._flags.parent.class_start_block && (this._output.space_before_token = !0);
        }
      } else
        this.allow_wrap_or_preserved_newline(s);
      (this._flags.last_token.type === u.RESERVED && (this._flags.last_word === "function" || this._flags.last_word === "typeof") || this._flags.last_token.text === "*" && (o(this._last_last_text, ["function", "yield"]) || this._flags.mode === a.ObjectLiteral && o(this._last_last_text, ["{", ","]))) && (this._output.space_before_token = this._options.space_after_anon_function);
    }
    this._flags.last_token.text === ";" || this._flags.last_token.type === u.START_BLOCK ? this.print_newline() : (this._flags.last_token.type === u.END_EXPR || this._flags.last_token.type === u.START_EXPR || this._flags.last_token.type === u.END_BLOCK || this._flags.last_token.text === "." || this._flags.last_token.type === u.COMMA) && this.allow_wrap_or_preserved_newline(s, s.newlines), this.print_token(s), this.set_mode(y), this._options.space_in_paren && (this._output.space_before_token = !0), this.indent();
  }, p.prototype.handle_end_expr = function(s) {
    for (; this._flags.mode === a.Statement; )
      this.restore_mode();
    this.handle_whitespace_and_comments(s), this._flags.multiline_frame && this.allow_wrap_or_preserved_newline(
      s,
      s.text === "]" && w(this._flags.mode) && !this._options.keep_array_indentation
    ), this._options.space_in_paren && (this._flags.last_token.type === u.START_EXPR && !this._options.space_in_empty_paren ? (this._output.trim(), this._output.space_before_token = !1) : this._output.space_before_token = !0), this.deindent(), this.print_token(s), this.restore_mode(), c(this._output, this._previous_flags), this._flags.do_while && this._previous_flags.mode === a.Conditional && (this._previous_flags.mode = a.Expression, this._flags.do_block = !1, this._flags.do_while = !1);
  }, p.prototype.handle_start_block = function(s) {
    this.handle_whitespace_and_comments(s);
    var y = this._tokens.peek(), x = this._tokens.peek(1);
    this._flags.last_word === "switch" && this._flags.last_token.type === u.END_EXPR ? (this.set_mode(a.BlockStatement), this._flags.in_case_statement = !0) : this._flags.case_body ? this.set_mode(a.BlockStatement) : x && (o(x.text, [":", ","]) && o(y.type, [u.STRING, u.WORD, u.RESERVED]) || o(y.text, ["get", "set", "..."]) && o(x.type, [u.WORD, u.RESERVED])) ? o(this._last_last_text, ["class", "interface"]) && !o(x.text, [":", ","]) ? this.set_mode(a.BlockStatement) : this.set_mode(a.ObjectLiteral) : this._flags.last_token.type === u.OPERATOR && this._flags.last_token.text === "=>" ? this.set_mode(a.BlockStatement) : o(this._flags.last_token.type, [u.EQUALS, u.START_EXPR, u.COMMA, u.OPERATOR]) || f(this._flags.last_token, ["return", "throw", "import", "default"]) ? this.set_mode(a.ObjectLiteral) : this.set_mode(a.BlockStatement), this._flags.last_token && f(this._flags.last_token.previous, ["class", "extends"]) && (this._flags.class_start_block = !0);
    var A = !y.comments_before && y.text === "}", D = A && this._flags.last_word === "function" && this._flags.last_token.type === u.END_EXPR;
    if (this._options.brace_preserve_inline) {
      var B = 0, $ = null;
      this._flags.inline_frame = !0;
      do
        if (B += 1, $ = this._tokens.peek(B - 1), $.newlines) {
          this._flags.inline_frame = !1;
          break;
        }
      while ($.type !== u.EOF && !($.type === u.END_BLOCK && $.opened === s));
    }
    (this._options.brace_style === "expand" || this._options.brace_style === "none" && s.newlines) && !this._flags.inline_frame ? this._flags.last_token.type !== u.OPERATOR && (D || this._flags.last_token.type === u.EQUALS || f(this._flags.last_token, S) && this._flags.last_token.text !== "else") ? this._output.space_before_token = !0 : this.print_newline(!1, !0) : (w(this._previous_flags.mode) && (this._flags.last_token.type === u.START_EXPR || this._flags.last_token.type === u.COMMA) && ((this._flags.last_token.type === u.COMMA || this._options.space_in_paren) && (this._output.space_before_token = !0), (this._flags.last_token.type === u.COMMA || this._flags.last_token.type === u.START_EXPR && this._flags.inline_frame) && (this.allow_wrap_or_preserved_newline(s), this._previous_flags.multiline_frame = this._previous_flags.multiline_frame || this._flags.multiline_frame, this._flags.multiline_frame = !1)), this._flags.last_token.type !== u.OPERATOR && this._flags.last_token.type !== u.START_EXPR && (o(this._flags.last_token.type, [u.START_BLOCK, u.SEMICOLON]) && !this._flags.inline_frame ? this.print_newline() : this._output.space_before_token = !0)), this.print_token(s), this.indent(), !A && !(this._options.brace_preserve_inline && this._flags.inline_frame) && this.print_newline();
  }, p.prototype.handle_end_block = function(s) {
    for (this.handle_whitespace_and_comments(s); this._flags.mode === a.Statement; )
      this.restore_mode();
    var y = this._flags.last_token.type === u.START_BLOCK;
    this._flags.inline_frame && !y ? this._output.space_before_token = !0 : this._options.brace_style === "expand" ? y || this.print_newline() : y || (w(this._flags.mode) && this._options.keep_array_indentation ? (this._options.keep_array_indentation = !1, this.print_newline(), this._options.keep_array_indentation = !0) : this.print_newline()), this.restore_mode(), this.print_token(s);
  }, p.prototype.handle_word = function(s) {
    if (s.type === u.RESERVED) {
      if (o(s.text, ["set", "get"]) && this._flags.mode !== a.ObjectLiteral)
        s.type = u.WORD;
      else if (s.text === "import" && o(this._tokens.peek().text, ["(", "."]))
        s.type = u.WORD;
      else if (o(s.text, ["as", "from"]) && !this._flags.import_block)
        s.type = u.WORD;
      else if (this._flags.mode === a.ObjectLiteral) {
        var y = this._tokens.peek();
        y.text === ":" && (s.type = u.WORD);
      }
    }
    if (this.start_of_statement(s) ? f(this._flags.last_token, ["var", "let", "const"]) && s.type === u.WORD && (this._flags.declaration_statement = !0) : s.newlines && !O(this._flags.mode) && (this._flags.last_token.type !== u.OPERATOR || this._flags.last_token.text === "--" || this._flags.last_token.text === "++") && this._flags.last_token.type !== u.EQUALS && (this._options.preserve_newlines || !f(this._flags.last_token, ["var", "let", "const", "set", "get"])) ? (this.handle_whitespace_and_comments(s), this.print_newline()) : this.handle_whitespace_and_comments(s), this._flags.do_block && !this._flags.do_while)
      if (v(s, "while")) {
        this._output.space_before_token = !0, this.print_token(s), this._output.space_before_token = !0, this._flags.do_while = !0;
        return;
      } else
        this.print_newline(), this._flags.do_block = !1;
    if (this._flags.if_block)
      if (!this._flags.else_block && v(s, "else"))
        this._flags.else_block = !0;
      else {
        for (; this._flags.mode === a.Statement; )
          this.restore_mode();
        this._flags.if_block = !1, this._flags.else_block = !1;
      }
    if (this._flags.in_case_statement && f(s, ["case", "default"])) {
      this.print_newline(), !this._flags.case_block && (this._flags.case_body || this._options.jslint_happy) && this.deindent(), this._flags.case_body = !1, this.print_token(s), this._flags.in_case = !0;
      return;
    }
    if ((this._flags.last_token.type === u.COMMA || this._flags.last_token.type === u.START_EXPR || this._flags.last_token.type === u.EQUALS || this._flags.last_token.type === u.OPERATOR) && !this.start_of_object_property() && !(o(this._flags.last_token.text, ["+", "-"]) && this._last_last_text === ":" && this._flags.parent.mode === a.ObjectLiteral) && this.allow_wrap_or_preserved_newline(s), v(s, "function")) {
      (o(this._flags.last_token.text, ["}", ";"]) || this._output.just_added_newline() && !(o(this._flags.last_token.text, ["(", "[", "{", ":", "=", ","]) || this._flags.last_token.type === u.OPERATOR)) && !this._output.just_added_blankline() && !s.comments_before && (this.print_newline(), this.print_newline(!0)), this._flags.last_token.type === u.RESERVED || this._flags.last_token.type === u.WORD ? f(this._flags.last_token, ["get", "set", "new", "export"]) || f(this._flags.last_token, E) ? this._output.space_before_token = !0 : v(this._flags.last_token, "default") && this._last_last_text === "export" ? this._output.space_before_token = !0 : this._flags.last_token.text === "declare" ? this._output.space_before_token = !0 : this.print_newline() : this._flags.last_token.type === u.OPERATOR || this._flags.last_token.text === "=" ? this._output.space_before_token = !0 : !this._flags.multiline_frame && (O(this._flags.mode) || w(this._flags.mode)) || this.print_newline(), this.print_token(s), this._flags.last_word = s.text;
      return;
    }
    var x = "NONE";
    if (this._flags.last_token.type === u.END_BLOCK ? this._previous_flags.inline_frame ? x = "SPACE" : f(s, ["else", "catch", "finally", "from"]) ? this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && s.newlines ? x = "NEWLINE" : (x = "SPACE", this._output.space_before_token = !0) : x = "NEWLINE" : this._flags.last_token.type === u.SEMICOLON && this._flags.mode === a.BlockStatement ? x = "NEWLINE" : this._flags.last_token.type === u.SEMICOLON && O(this._flags.mode) ? x = "SPACE" : this._flags.last_token.type === u.STRING ? x = "NEWLINE" : this._flags.last_token.type === u.RESERVED || this._flags.last_token.type === u.WORD || this._flags.last_token.text === "*" && (o(this._last_last_text, ["function", "yield"]) || this._flags.mode === a.ObjectLiteral && o(this._last_last_text, ["{", ","])) ? x = "SPACE" : this._flags.last_token.type === u.START_BLOCK ? this._flags.inline_frame ? x = "SPACE" : x = "NEWLINE" : this._flags.last_token.type === u.END_EXPR && (this._output.space_before_token = !0, x = "NEWLINE"), f(s, _) && this._flags.last_token.text !== ")" && (this._flags.inline_frame || this._flags.last_token.text === "else" || this._flags.last_token.text === "export" ? x = "SPACE" : x = "NEWLINE"), f(s, ["else", "catch", "finally"]))
      if ((!(this._flags.last_token.type === u.END_BLOCK && this._previous_flags.mode === a.BlockStatement) || this._options.brace_style === "expand" || this._options.brace_style === "end-expand" || this._options.brace_style === "none" && s.newlines) && !this._flags.inline_frame)
        this.print_newline();
      else {
        this._output.trim(!0);
        var A = this._output.current_line;
        A.last() !== "}" && this.print_newline(), this._output.space_before_token = !0;
      }
    else
      x === "NEWLINE" ? f(this._flags.last_token, S) ? this._output.space_before_token = !0 : this._flags.last_token.text === "declare" && f(s, ["var", "let", "const"]) ? this._output.space_before_token = !0 : this._flags.last_token.type !== u.END_EXPR ? (this._flags.last_token.type !== u.START_EXPR || !f(s, ["var", "let", "const"])) && this._flags.last_token.text !== ":" && (v(s, "if") && v(s.previous, "else") ? this._output.space_before_token = !0 : this.print_newline()) : f(s, _) && this._flags.last_token.text !== ")" && this.print_newline() : this._flags.multiline_frame && w(this._flags.mode) && this._flags.last_token.text === "," && this._last_last_text === "}" ? this.print_newline() : x === "SPACE" && (this._output.space_before_token = !0);
    s.previous && (s.previous.type === u.WORD || s.previous.type === u.RESERVED) && (this._output.space_before_token = !0), this.print_token(s), this._flags.last_word = s.text, s.type === u.RESERVED && (s.text === "do" ? this._flags.do_block = !0 : s.text === "if" ? this._flags.if_block = !0 : s.text === "import" ? this._flags.import_block = !0 : this._flags.import_block && v(s, "from") && (this._flags.import_block = !1));
  }, p.prototype.handle_semicolon = function(s) {
    this.start_of_statement(s) ? this._output.space_before_token = !1 : this.handle_whitespace_and_comments(s);
    for (var y = this._tokens.peek(); this._flags.mode === a.Statement && !(this._flags.if_block && v(y, "else")) && !this._flags.do_block; )
      this.restore_mode();
    this._flags.import_block && (this._flags.import_block = !1), this.print_token(s);
  }, p.prototype.handle_string = function(s) {
    s.text.startsWith("`") && s.newlines === 0 && s.whitespace_before === "" && (s.previous.text === ")" || this._flags.last_token.type === u.WORD) || (this.start_of_statement(s) ? this._output.space_before_token = !0 : (this.handle_whitespace_and_comments(s), this._flags.last_token.type === u.RESERVED || this._flags.last_token.type === u.WORD || this._flags.inline_frame ? this._output.space_before_token = !0 : this._flags.last_token.type === u.COMMA || this._flags.last_token.type === u.START_EXPR || this._flags.last_token.type === u.EQUALS || this._flags.last_token.type === u.OPERATOR ? this.start_of_object_property() || this.allow_wrap_or_preserved_newline(s) : s.text.startsWith("`") && this._flags.last_token.type === u.END_EXPR && (s.previous.text === "]" || s.previous.text === ")") && s.newlines === 0 ? this._output.space_before_token = !0 : this.print_newline())), this.print_token(s);
  }, p.prototype.handle_equals = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s), this._flags.declaration_statement && (this._flags.declaration_assignment = !0), this._output.space_before_token = !0, this.print_token(s), this._output.space_before_token = !0;
  }, p.prototype.handle_comma = function(s) {
    this.handle_whitespace_and_comments(s, !0), this.print_token(s), this._output.space_before_token = !0, this._flags.declaration_statement ? (O(this._flags.parent.mode) && (this._flags.declaration_assignment = !1), this._flags.declaration_assignment ? (this._flags.declaration_assignment = !1, this.print_newline(!1, !0)) : this._options.comma_first && this.allow_wrap_or_preserved_newline(s)) : this._flags.mode === a.ObjectLiteral || this._flags.mode === a.Statement && this._flags.parent.mode === a.ObjectLiteral ? (this._flags.mode === a.Statement && this.restore_mode(), this._flags.inline_frame || this.print_newline()) : this._options.comma_first && this.allow_wrap_or_preserved_newline(s);
  }, p.prototype.handle_operator = function(s) {
    var y = s.text === "*" && (f(this._flags.last_token, ["function", "yield"]) || o(this._flags.last_token.type, [u.START_BLOCK, u.COMMA, u.END_BLOCK, u.SEMICOLON])), x = o(s.text, ["-", "+"]) && (o(this._flags.last_token.type, [u.START_BLOCK, u.START_EXPR, u.EQUALS, u.OPERATOR]) || o(this._flags.last_token.text, _) || this._flags.last_token.text === ",");
    if (!this.start_of_statement(s)) {
      var A = !y;
      this.handle_whitespace_and_comments(s, A);
    }
    if (s.text === "*" && this._flags.last_token.type === u.DOT) {
      this.print_token(s);
      return;
    }
    if (s.text === "::") {
      this.print_token(s);
      return;
    }
    if (o(s.text, ["-", "+"]) && this.start_of_object_property()) {
      this.print_token(s);
      return;
    }
    if (this._flags.last_token.type === u.OPERATOR && o(this._options.operator_position, h) && this.allow_wrap_or_preserved_newline(s), s.text === ":" && this._flags.in_case) {
      this.print_token(s), this._flags.in_case = !1, this._flags.case_body = !0, this._tokens.peek().type !== u.START_BLOCK ? (this.indent(), this.print_newline(), this._flags.case_block = !1) : (this._flags.case_block = !0, this._output.space_before_token = !0);
      return;
    }
    var D = !0, B = !0, $ = !1;
    if (s.text === ":" ? this._flags.ternary_depth === 0 ? D = !1 : (this._flags.ternary_depth -= 1, $ = !0) : s.text === "?" && (this._flags.ternary_depth += 1), !x && !y && this._options.preserve_newlines && o(s.text, d)) {
      var Y = s.text === ":", et = Y && $, z = Y && !$;
      switch (this._options.operator_position) {
        case C.before_newline:
          this._output.space_before_token = !z, this.print_token(s), (!Y || et) && this.allow_wrap_or_preserved_newline(s), this._output.space_before_token = !0;
          return;
        case C.after_newline:
          this._output.space_before_token = !0, !Y || et ? this._tokens.peek().newlines ? this.print_newline(!1, !0) : this.allow_wrap_or_preserved_newline(s) : this._output.space_before_token = !1, this.print_token(s), this._output.space_before_token = !0;
          return;
        case C.preserve_newline:
          z || this.allow_wrap_or_preserved_newline(s), D = !(this._output.just_added_newline() || z), this._output.space_before_token = D, this.print_token(s), this._output.space_before_token = !0;
          return;
      }
    }
    if (y) {
      this.allow_wrap_or_preserved_newline(s), D = !1;
      var bt = this._tokens.peek();
      B = bt && o(bt.type, [u.WORD, u.RESERVED]);
    } else if (s.text === "...")
      this.allow_wrap_or_preserved_newline(s), D = this._flags.last_token.type === u.START_BLOCK, B = !1;
    else if (o(s.text, ["--", "++", "!", "~"]) || x) {
      if ((this._flags.last_token.type === u.COMMA || this._flags.last_token.type === u.START_EXPR) && this.allow_wrap_or_preserved_newline(s), D = !1, B = !1, s.newlines && (s.text === "--" || s.text === "++" || s.text === "~")) {
        var it = f(this._flags.last_token, S) && s.newlines;
        it && (this._previous_flags.if_block || this._previous_flags.else_block) && this.restore_mode(), this.print_newline(it, !0);
      }
      this._flags.last_token.text === ";" && O(this._flags.mode) && (D = !0), this._flags.last_token.type === u.RESERVED ? D = !0 : this._flags.last_token.type === u.END_EXPR ? D = !(this._flags.last_token.text === "]" && (s.text === "--" || s.text === "++")) : this._flags.last_token.type === u.OPERATOR && (D = o(s.text, ["--", "-", "++", "+"]) && o(this._flags.last_token.text, ["--", "-", "++", "+"]), o(s.text, ["+", "-"]) && o(this._flags.last_token.text, ["--", "++"]) && (B = !0)), (this._flags.mode === a.BlockStatement && !this._flags.inline_frame || this._flags.mode === a.Statement) && (this._flags.last_token.text === "{" || this._flags.last_token.text === ";") && this.print_newline();
    }
    this._output.space_before_token = this._output.space_before_token || D, this.print_token(s), this._output.space_before_token = B;
  }, p.prototype.handle_block_comment = function(s, y) {
    if (this._output.raw) {
      this._output.add_raw_token(s), s.directives && s.directives.preserve === "end" && (this._output.raw = this._options.test_output_raw);
      return;
    }
    if (s.directives) {
      this.print_newline(!1, y), this.print_token(s), s.directives.preserve === "start" && (this._output.raw = !0), this.print_newline(!1, !0);
      return;
    }
    if (!t.newline.test(s.text) && !s.newlines) {
      this._output.space_before_token = !0, this.print_token(s), this._output.space_before_token = !0;
      return;
    } else
      this.print_block_commment(s, y);
  }, p.prototype.print_block_commment = function(s, y) {
    var x = T(s.text), A, D = !1, B = !1, $ = s.whitespace_before, Y = $.length;
    if (this.print_newline(!1, y), this.print_token_line_indentation(s), this._output.add_token(x[0]), this.print_newline(!1, y), x.length > 1) {
      for (x = x.slice(1), D = l(x, "*"), B = g(x, $), D && (this._flags.alignment = 1), A = 0; A < x.length; A++)
        D ? (this.print_token_line_indentation(s), this._output.add_token(b(x[A]))) : B && x[A] ? (this.print_token_line_indentation(s), this._output.add_token(x[A].substring(Y))) : (this._output.current_line.set_indent(-1), this._output.add_token(x[A])), this.print_newline(!1, y);
      this._flags.alignment = 0;
    }
  }, p.prototype.handle_comment = function(s, y) {
    s.newlines ? this.print_newline(!1, y) : this._output.trim(!0), this._output.space_before_token = !0, this.print_token(s), this.print_newline(!1, y);
  }, p.prototype.handle_dot = function(s) {
    this.start_of_statement(s) || this.handle_whitespace_and_comments(s, !0), this._flags.last_token.text.match("^[0-9]+$") && (this._output.space_before_token = !0), f(this._flags.last_token, S) ? this._output.space_before_token = !1 : this.allow_wrap_or_preserved_newline(
      s,
      this._flags.last_token.text === ")" && this._options.break_chained_methods
    ), this._options.unindent_chained_methods && this._output.just_added_newline() && this.deindent(), this.print_token(s);
  }, p.prototype.handle_unknown = function(s, y) {
    this.print_token(s), s.text[s.text.length - 1] === `
` && this.print_newline(!1, y);
  }, p.prototype.handle_eof = function(s) {
    for (; this._flags.mode === a.Statement; )
      this.restore_mode();
    this.handle_whitespace_and_comments(s);
  }, Gt.Beautifier = p, Gt;
}
var Ve;
function ln() {
  if (Ve)
    return Tt.exports;
  Ve = 1;
  var e = un().Beautifier, n = gi().Options;
  function t(i, r) {
    var _ = new e(i, r);
    return _.beautify();
  }
  return Tt.exports = t, Tt.exports.defaultOptions = function() {
    return new n();
  }, Tt.exports;
}
var Ct = { exports: {} }, se = {}, re = {}, qe;
function vi() {
  if (qe)
    return re;
  qe = 1;
  var e = ce().Options;
  function n(t) {
    e.call(this, t, "css"), this.selector_separator_newline = this._get_boolean("selector_separator_newline", !0), this.newline_between_rules = this._get_boolean("newline_between_rules", !0);
    var i = this._get_boolean("space_around_selector_separator");
    this.space_around_combinator = this._get_boolean("space_around_combinator") || i;
    var r = this._get_selection_list("brace_style", ["collapse", "expand", "end-expand", "none", "preserve-inline"]);
    this.brace_style = "collapse";
    for (var _ = 0; _ < r.length; _++)
      r[_] !== "expand" ? this.brace_style = "collapse" : this.brace_style = r[_];
  }
  return n.prototype = new e(), re.Options = n, re;
}
var Ge;
function pn() {
  if (Ge)
    return se;
  Ge = 1;
  var e = vi().Options, n = he().Output, t = fe().InputScanner, i = de().Directives, r = new i(/\/\*/, /\*\//), _ = /\r\n|[\r\n]/, d = /\r\n|[\r\n]/g, u = /\s/, o = /(?:\s|\n)+/g, b = /\/\*(?:[\s\S]*?)((?:\*\/)|$)/g, m = /\/\/(?:[^\n\r\u2028\u2029]*)/g;
  function v(f, S) {
    this._source_text = f || "", this._options = new e(S), this._ch = null, this._input = null, this.NESTED_AT_RULE = {
      page: !0,
      "font-face": !0,
      keyframes: !0,
      media: !0,
      supports: !0,
      document: !0
    }, this.CONDITIONAL_GROUP_RULE = {
      media: !0,
      supports: !0,
      document: !0
    }, this.NON_SEMICOLON_NEWLINE_PROPERTY = [
      "grid-template-areas",
      "grid-template"
    ];
  }
  return v.prototype.eatString = function(f) {
    var S = "";
    for (this._ch = this._input.next(); this._ch; ) {
      if (S += this._ch, this._ch === "\\")
        S += this._input.next();
      else if (f.indexOf(this._ch) !== -1 || this._ch === `
`)
        break;
      this._ch = this._input.next();
    }
    return S;
  }, v.prototype.eatWhitespace = function(f) {
    for (var S = u.test(this._input.peek()), j = 0; u.test(this._input.peek()); )
      this._ch = this._input.next(), f && this._ch === `
` && (j === 0 || j < this._options.max_preserve_newlines) && (j++, this._output.add_new_line(!0));
    return S;
  }, v.prototype.foundNestedPseudoClass = function() {
    for (var f = 0, S = 1, j = this._input.peek(S); j; ) {
      if (j === "{")
        return !0;
      if (j === "(")
        f += 1;
      else if (j === ")") {
        if (f === 0)
          return !1;
        f -= 1;
      } else if (j === ";" || j === "}")
        return !1;
      S++, j = this._input.peek(S);
    }
    return !1;
  }, v.prototype.print_string = function(f) {
    this._output.set_indent(this._indentLevel), this._output.non_breaking_space = !0, this._output.add_token(f);
  }, v.prototype.preserveSingleSpace = function(f) {
    f && (this._output.space_before_token = !0);
  }, v.prototype.indent = function() {
    this._indentLevel++;
  }, v.prototype.outdent = function() {
    this._indentLevel > 0 && this._indentLevel--;
  }, v.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var f = this._source_text, S = this._options.eol;
    S === "auto" && (S = `
`, f && _.test(f || "") && (S = f.match(_)[0])), f = f.replace(d, `
`);
    var j = f.match(/^[\t ]*/)[0];
    this._output = new n(this._options, j), this._input = new t(f), this._indentLevel = 0, this._nestedLevel = 0, this._ch = null;
    for (var C = 0, h = !1, a = !1, c = !1, T = !1, w = !1, O = this._ch, l = !1, g, p, E; g = this._input.read(o), p = g !== "", E = O, this._ch = this._input.next(), this._ch === "\\" && this._input.hasNext() && (this._ch += this._input.next()), O = this._ch, this._ch; )
      if (this._ch === "/" && this._input.peek() === "*") {
        this._output.add_new_line(), this._input.back();
        var s = this._input.read(b), y = r.get_directives(s);
        y && y.ignore === "start" && (s += r.readIgnored(this._input)), this.print_string(s), this.eatWhitespace(!0), this._output.add_new_line();
      } else if (this._ch === "/" && this._input.peek() === "/")
        this._output.space_before_token = !0, this._input.back(), this.print_string(this._input.read(m)), this.eatWhitespace(!0);
      else if (this._ch === "$") {
        this.preserveSingleSpace(p), this.print_string(this._ch);
        var x = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
        x.match(/[ :]$/) && (x = this.eatString(": ").replace(/\s+$/, ""), this.print_string(x), this._output.space_before_token = !0), C === 0 && x.indexOf(":") !== -1 && (a = !0, this.indent());
      } else if (this._ch === "@")
        if (this.preserveSingleSpace(p), this._input.peek() === "{")
          this.print_string(this._ch + this.eatString("}"));
        else {
          this.print_string(this._ch);
          var A = this._input.peekUntilAfter(/[: ,;{}()[\]\/='"]/g);
          A.match(/[ :]$/) && (A = this.eatString(": ").replace(/\s+$/, ""), this.print_string(A), this._output.space_before_token = !0), C === 0 && A.indexOf(":") !== -1 ? (a = !0, this.indent()) : A in this.NESTED_AT_RULE ? (this._nestedLevel += 1, A in this.CONDITIONAL_GROUP_RULE && (c = !0)) : C === 0 && !a && (T = !0);
        }
      else if (this._ch === "#" && this._input.peek() === "{")
        this.preserveSingleSpace(p), this.print_string(this._ch + this.eatString("}"));
      else if (this._ch === "{")
        a && (a = !1, this.outdent()), T = !1, c ? (c = !1, h = this._indentLevel >= this._nestedLevel) : h = this._indentLevel >= this._nestedLevel - 1, this._options.newline_between_rules && h && this._output.previous_line && this._output.previous_line.item(-1) !== "{" && this._output.ensure_empty_line_above("/", ","), this._output.space_before_token = !0, this._options.brace_style === "expand" ? (this._output.add_new_line(), this.print_string(this._ch), this.indent(), this._output.set_indent(this._indentLevel)) : (E === "(" ? this._output.space_before_token = !1 : E !== "," && this.indent(), this.print_string(this._ch)), this.eatWhitespace(!0), this._output.add_new_line();
      else if (this._ch === "}")
        this.outdent(), this._output.add_new_line(), E === "{" && this._output.trim(!0), a && (this.outdent(), a = !1), this.print_string(this._ch), h = !1, this._nestedLevel && this._nestedLevel--, this.eatWhitespace(!0), this._output.add_new_line(), this._options.newline_between_rules && !this._output.just_added_blankline() && this._input.peek() !== "}" && this._output.add_new_line(!0), this._input.peek() === ")" && (this._output.trim(!0), this._options.brace_style === "expand" && this._output.add_new_line(!0));
      else if (this._ch === ":") {
        for (var D = 0; D < this.NON_SEMICOLON_NEWLINE_PROPERTY.length; D++)
          if (this._input.lookBack(this.NON_SEMICOLON_NEWLINE_PROPERTY[D])) {
            l = !0;
            break;
          }
        (h || c) && !(this._input.lookBack("&") || this.foundNestedPseudoClass()) && !this._input.lookBack("(") && !T && C === 0 ? (this.print_string(":"), a || (a = !0, this._output.space_before_token = !0, this.eatWhitespace(!0), this.indent())) : (this._input.lookBack(" ") && (this._output.space_before_token = !0), this._input.peek() === ":" ? (this._ch = this._input.next(), this.print_string("::")) : this.print_string(":"));
      } else if (this._ch === '"' || this._ch === "'") {
        var B = E === '"' || E === "'";
        this.preserveSingleSpace(B || p), this.print_string(this._ch + this.eatString(this._ch)), this.eatWhitespace(!0);
      } else if (this._ch === ";")
        l = !1, C === 0 ? (a && (this.outdent(), a = !1), T = !1, this.print_string(this._ch), this.eatWhitespace(!0), this._input.peek() !== "/" && this._output.add_new_line()) : (this.print_string(this._ch), this.eatWhitespace(!0), this._output.space_before_token = !0);
      else if (this._ch === "(")
        if (this._input.lookBack("url"))
          this.print_string(this._ch), this.eatWhitespace(), C++, this.indent(), this._ch = this._input.next(), this._ch === ")" || this._ch === '"' || this._ch === "'" ? this._input.back() : this._ch && (this.print_string(this._ch + this.eatString(")")), C && (C--, this.outdent()));
        else {
          var $ = !1;
          this._input.lookBack("with") && ($ = !0), this.preserveSingleSpace(p || $), this.print_string(this._ch), a && E === "$" && this._options.selector_separator_newline ? (this._output.add_new_line(), w = !0) : (this.eatWhitespace(), C++, this.indent());
        }
      else if (this._ch === ")")
        C && (C--, this.outdent()), w && this._input.peek() === ";" && this._options.selector_separator_newline && (w = !1, this.outdent(), this._output.add_new_line()), this.print_string(this._ch);
      else if (this._ch === ",")
        this.print_string(this._ch), this.eatWhitespace(!0), this._options.selector_separator_newline && (!a || w) && C === 0 && !T ? this._output.add_new_line() : this._output.space_before_token = !0;
      else if ((this._ch === ">" || this._ch === "+" || this._ch === "~") && !a && C === 0)
        this._options.space_around_combinator ? (this._output.space_before_token = !0, this.print_string(this._ch), this._output.space_before_token = !0) : (this.print_string(this._ch), this.eatWhitespace(), this._ch && u.test(this._ch) && (this._ch = ""));
      else if (this._ch === "]")
        this.print_string(this._ch);
      else if (this._ch === "[")
        this.preserveSingleSpace(p), this.print_string(this._ch);
      else if (this._ch === "=")
        this.eatWhitespace(), this.print_string("="), u.test(this._ch) && (this._ch = "");
      else if (this._ch === "!" && !this._input.lookBack("\\"))
        this._output.space_before_token = !0, this.print_string(this._ch);
      else {
        var Y = E === '"' || E === "'";
        this.preserveSingleSpace(Y || p), this.print_string(this._ch), !this._output.just_added_newline() && this._input.peek() === `
` && l && this._output.add_new_line();
      }
    var et = this._output.get_code(S);
    return et;
  }, se.Beautifier = v, se;
}
var He;
function hn() {
  if (He)
    return Ct.exports;
  He = 1;
  var e = pn().Beautifier, n = vi().Options;
  function t(i, r) {
    var _ = new e(i, r);
    return _.beautify();
  }
  return Ct.exports = t, Ct.exports.defaultOptions = function() {
    return new n();
  }, Ct.exports;
}
var Rt = { exports: {} }, ae = {}, oe = {}, Xe;
function bi() {
  if (Xe)
    return oe;
  Xe = 1;
  var e = ce().Options;
  function n(t) {
    e.call(this, t, "html"), this.templating.length === 1 && this.templating[0] === "auto" && (this.templating = ["django", "erb", "handlebars", "php"]), this.indent_inner_html = this._get_boolean("indent_inner_html"), this.indent_body_inner_html = this._get_boolean("indent_body_inner_html", !0), this.indent_head_inner_html = this._get_boolean("indent_head_inner_html", !0), this.indent_handlebars = this._get_boolean("indent_handlebars", !0), this.wrap_attributes = this._get_selection(
      "wrap_attributes",
      ["auto", "force", "force-aligned", "force-expand-multiline", "aligned-multiple", "preserve", "preserve-aligned"]
    ), this.wrap_attributes_min_attrs = this._get_number("wrap_attributes_min_attrs", 2), this.wrap_attributes_indent_size = this._get_number("wrap_attributes_indent_size", this.indent_size), this.extra_liners = this._get_array("extra_liners", ["head", "body", "/html"]), this.inline = this._get_array("inline", [
      "a",
      "abbr",
      "area",
      "audio",
      "b",
      "bdi",
      "bdo",
      "br",
      "button",
      "canvas",
      "cite",
      "code",
      "data",
      "datalist",
      "del",
      "dfn",
      "em",
      "embed",
      "i",
      "iframe",
      "img",
      "input",
      "ins",
      "kbd",
      "keygen",
      "label",
      "map",
      "mark",
      "math",
      "meter",
      "noscript",
      "object",
      "output",
      "progress",
      "q",
      "ruby",
      "s",
      "samp",
      "select",
      "small",
      "span",
      "strong",
      "sub",
      "sup",
      "svg",
      "template",
      "textarea",
      "time",
      "u",
      "var",
      "video",
      "wbr",
      "text",
      "acronym",
      "big",
      "strike",
      "tt"
    ]), this.inline_custom_elements = this._get_boolean("inline_custom_elements", !0), this.void_elements = this._get_array("void_elements", [
      "area",
      "base",
      "br",
      "col",
      "embed",
      "hr",
      "img",
      "input",
      "keygen",
      "link",
      "menuitem",
      "meta",
      "param",
      "source",
      "track",
      "wbr",
      "!doctype",
      "?xml",
      "basefont",
      "isindex"
    ]), this.unformatted = this._get_array("unformatted", []), this.content_unformatted = this._get_array("content_unformatted", [
      "pre",
      "textarea"
    ]), this.unformatted_content_delimiter = this._get_characters("unformatted_content_delimiter"), this.indent_scripts = this._get_selection("indent_scripts", ["normal", "keep", "separate"]);
  }
  return n.prototype = new e(), oe.Options = n, oe;
}
var At = {}, Qe;
function Ze() {
  if (Qe)
    return At;
  Qe = 1;
  var e = Pt().Tokenizer, n = Pt().TOKEN, t = de().Directives, i = mi().TemplatablePattern, r = $t().Pattern, _ = {
    TAG_OPEN: "TK_TAG_OPEN",
    TAG_CLOSE: "TK_TAG_CLOSE",
    CONTROL_FLOW_OPEN: "TK_CONTROL_FLOW_OPEN",
    CONTROL_FLOW_CLOSE: "TK_CONTROL_FLOW_CLOSE",
    ATTRIBUTE: "TK_ATTRIBUTE",
    EQUALS: "TK_EQUALS",
    VALUE: "TK_VALUE",
    COMMENT: "TK_COMMENT",
    TEXT: "TK_TEXT",
    UNKNOWN: "TK_UNKNOWN",
    START: n.START,
    RAW: n.RAW,
    EOF: n.EOF
  }, d = new t(/<\!--/, /-->/), u = function(o, b) {
    e.call(this, o, b), this._current_tag_name = "";
    var m = new i(this._input).read_options(this._options), v = new r(this._input);
    if (this.__patterns = {
      word: m.until(/[\n\r\t <]/),
      word_control_flow_close_excluded: m.until(/[\n\r\t <}]/),
      single_quote: m.until_after(/'/),
      double_quote: m.until_after(/"/),
      attribute: m.until(/[\n\r\t =>]|\/>/),
      element_name: m.until(/[\n\r\t >\/]/),
      angular_control_flow_start: v.matching(/\@[a-zA-Z]+[^({]*[({]/),
      handlebars_comment: v.starting_with(/{{!--/).until_after(/--}}/),
      handlebars: v.starting_with(/{{/).until_after(/}}/),
      handlebars_open: v.until(/[\n\r\t }]/),
      handlebars_raw_close: v.until(/}}/),
      comment: v.starting_with(/<!--/).until_after(/-->/),
      cdata: v.starting_with(/<!\[CDATA\[/).until_after(/]]>/),
      conditional_comment: v.starting_with(/<!\[/).until_after(/]>/),
      processing: v.starting_with(/<\?/).until_after(/\?>/)
    }, this._options.indent_handlebars && (this.__patterns.word = this.__patterns.word.exclude("handlebars"), this.__patterns.word_control_flow_close_excluded = this.__patterns.word_control_flow_close_excluded.exclude("handlebars")), this._unformatted_content_delimiter = null, this._options.unformatted_content_delimiter) {
      var f = this._input.get_literal_regexp(this._options.unformatted_content_delimiter);
      this.__patterns.unformatted_content_delimiter = v.matching(f).until_after(f);
    }
  };
  return u.prototype = new e(), u.prototype._is_comment = function(o) {
    return !1;
  }, u.prototype._is_opening = function(o) {
    return o.type === _.TAG_OPEN || o.type === _.CONTROL_FLOW_OPEN;
  }, u.prototype._is_closing = function(o, b) {
    return o.type === _.TAG_CLOSE && b && ((o.text === ">" || o.text === "/>") && b.text[0] === "<" || o.text === "}}" && b.text[0] === "{" && b.text[1] === "{") || o.type === _.CONTROL_FLOW_CLOSE && o.text === "}" && b.text.endsWith("{");
  }, u.prototype._reset = function() {
    this._current_tag_name = "";
  }, u.prototype._get_next_token = function(o, b) {
    var m = null;
    this._readWhitespace();
    var v = this._input.peek();
    return v === null ? this._create_token(_.EOF, "") : (m = m || this._read_open_handlebars(v, b), m = m || this._read_attribute(v, o, b), m = m || this._read_close(v, b), m = m || this._read_script_and_style(v, o), m = m || this._read_control_flows(v, b), m = m || this._read_raw_content(v, o, b), m = m || this._read_content_word(v, b), m = m || this._read_comment_or_cdata(v), m = m || this._read_processing(v), m = m || this._read_open(v, b), m = m || this._create_token(_.UNKNOWN, this._input.next()), m);
  }, u.prototype._read_comment_or_cdata = function(o) {
    var b = null, m = null, v = null;
    if (o === "<") {
      var f = this._input.peek(1);
      f === "!" && (m = this.__patterns.comment.read(), m ? (v = d.get_directives(m), v && v.ignore === "start" && (m += d.readIgnored(this._input))) : m = this.__patterns.cdata.read()), m && (b = this._create_token(_.COMMENT, m), b.directives = v);
    }
    return b;
  }, u.prototype._read_processing = function(o) {
    var b = null, m = null, v = null;
    if (o === "<") {
      var f = this._input.peek(1);
      (f === "!" || f === "?") && (m = this.__patterns.conditional_comment.read(), m = m || this.__patterns.processing.read()), m && (b = this._create_token(_.COMMENT, m), b.directives = v);
    }
    return b;
  }, u.prototype._read_open = function(o, b) {
    var m = null, v = null;
    return (!b || b.type === _.CONTROL_FLOW_OPEN) && o === "<" && (m = this._input.next(), this._input.peek() === "/" && (m += this._input.next()), m += this.__patterns.element_name.read(), v = this._create_token(_.TAG_OPEN, m)), v;
  }, u.prototype._read_open_handlebars = function(o, b) {
    var m = null, v = null;
    return (!b || b.type === _.CONTROL_FLOW_OPEN) && (this._options.templating.includes("angular") || this._options.indent_handlebars) && o === "{" && this._input.peek(1) === "{" && (this._options.indent_handlebars && this._input.peek(2) === "!" ? (m = this.__patterns.handlebars_comment.read(), m = m || this.__patterns.handlebars.read(), v = this._create_token(_.COMMENT, m)) : (m = this.__patterns.handlebars_open.read(), v = this._create_token(_.TAG_OPEN, m))), v;
  }, u.prototype._read_control_flows = function(o, b) {
    var m = "", v = null;
    if (!this._options.templating.includes("angular"))
      return v;
    if (o === "@") {
      if (m = this.__patterns.angular_control_flow_start.read(), m === "")
        return v;
      for (var f = m.endsWith("(") ? 1 : 0, S = 0; !(m.endsWith("{") && f === S); ) {
        var j = this._input.next();
        if (j === null)
          break;
        j === "(" ? f++ : j === ")" && S++, m += j;
      }
      v = this._create_token(_.CONTROL_FLOW_OPEN, m);
    } else
      o === "}" && b && b.type === _.CONTROL_FLOW_OPEN && (m = this._input.next(), v = this._create_token(_.CONTROL_FLOW_CLOSE, m));
    return v;
  }, u.prototype._read_close = function(o, b) {
    var m = null, v = null;
    return b && b.type === _.TAG_OPEN && (b.text[0] === "<" && (o === ">" || o === "/" && this._input.peek(1) === ">") ? (m = this._input.next(), o === "/" && (m += this._input.next()), v = this._create_token(_.TAG_CLOSE, m)) : b.text[0] === "{" && o === "}" && this._input.peek(1) === "}" && (this._input.next(), this._input.next(), v = this._create_token(_.TAG_CLOSE, "}}"))), v;
  }, u.prototype._read_attribute = function(o, b, m) {
    var v = null, f = "";
    if (m && m.text[0] === "<")
      if (o === "=")
        v = this._create_token(_.EQUALS, this._input.next());
      else if (o === '"' || o === "'") {
        var S = this._input.next();
        o === '"' ? S += this.__patterns.double_quote.read() : S += this.__patterns.single_quote.read(), v = this._create_token(_.VALUE, S);
      } else
        f = this.__patterns.attribute.read(), f && (b.type === _.EQUALS ? v = this._create_token(_.VALUE, f) : v = this._create_token(_.ATTRIBUTE, f));
    return v;
  }, u.prototype._is_content_unformatted = function(o) {
    return this._options.void_elements.indexOf(o) === -1 && (this._options.content_unformatted.indexOf(o) !== -1 || this._options.unformatted.indexOf(o) !== -1);
  }, u.prototype._read_raw_content = function(o, b, m) {
    var v = "";
    if (m && m.text[0] === "{")
      v = this.__patterns.handlebars_raw_close.read();
    else if (b.type === _.TAG_CLOSE && b.opened.text[0] === "<" && b.text[0] !== "/") {
      var f = b.opened.text.substr(1).toLowerCase();
      this._is_content_unformatted(f) && (v = this._input.readUntil(new RegExp("</" + f + "[\\n\\r\\t ]*?>", "ig")));
    }
    return v ? this._create_token(_.TEXT, v) : null;
  }, u.prototype._read_script_and_style = function(o, b) {
    if (b.type === _.TAG_CLOSE && b.opened.text[0] === "<" && b.text[0] !== "/") {
      var m = b.opened.text.substr(1).toLowerCase();
      if (m === "script" || m === "style") {
        var v = this._read_comment_or_cdata(o);
        if (v)
          return v.type = _.TEXT, v;
        var f = this._input.readUntil(new RegExp("</" + m + "[\\n\\r\\t ]*?>", "ig"));
        if (f)
          return this._create_token(_.TEXT, f);
      }
    }
    return null;
  }, u.prototype._read_content_word = function(o, b) {
    var m = "";
    return this._options.unformatted_content_delimiter && o === this._options.unformatted_content_delimiter[0] && (m = this.__patterns.unformatted_content_delimiter.read()), m || (m = b && b.type === _.CONTROL_FLOW_OPEN ? this.__patterns.word_control_flow_close_excluded.read() : this.__patterns.word.read()), m ? this._create_token(_.TEXT, m) : null;
  }, At.Tokenizer = u, At.TOKEN = _, At;
}
var Je;
function cn() {
  if (Je)
    return ae;
  Je = 1;
  var e = bi().Options, n = he().Output, t = Ze().Tokenizer, i = Ze().TOKEN, r = /\r\n|[\r\n]/, _ = /\r\n|[\r\n]/g, d = function(h, a) {
    this.indent_level = 0, this.alignment_size = 0, this.max_preserve_newlines = h.max_preserve_newlines, this.preserve_newlines = h.preserve_newlines, this._output = new n(h, a);
  };
  d.prototype.current_line_has_match = function(h) {
    return this._output.current_line.has_match(h);
  }, d.prototype.set_space_before_token = function(h, a) {
    this._output.space_before_token = h, this._output.non_breaking_space = a;
  }, d.prototype.set_wrap_point = function() {
    this._output.set_indent(this.indent_level, this.alignment_size), this._output.set_wrap_point();
  }, d.prototype.add_raw_token = function(h) {
    this._output.add_raw_token(h);
  }, d.prototype.print_preserved_newlines = function(h) {
    var a = 0;
    h.type !== i.TEXT && h.previous.type !== i.TEXT && (a = h.newlines ? 1 : 0), this.preserve_newlines && (a = h.newlines < this.max_preserve_newlines + 1 ? h.newlines : this.max_preserve_newlines + 1);
    for (var c = 0; c < a; c++)
      this.print_newline(c > 0);
    return a !== 0;
  }, d.prototype.traverse_whitespace = function(h) {
    return h.whitespace_before || h.newlines ? (this.print_preserved_newlines(h) || (this._output.space_before_token = !0), !0) : !1;
  }, d.prototype.previous_token_wrapped = function() {
    return this._output.previous_token_wrapped;
  }, d.prototype.print_newline = function(h) {
    this._output.add_new_line(h);
  }, d.prototype.print_token = function(h) {
    h.text && (this._output.set_indent(this.indent_level, this.alignment_size), this._output.add_token(h.text));
  }, d.prototype.indent = function() {
    this.indent_level++;
  }, d.prototype.deindent = function() {
    this.indent_level > 0 && (this.indent_level--, this._output.set_indent(this.indent_level, this.alignment_size));
  }, d.prototype.get_full_indent = function(h) {
    return h = this.indent_level + (h || 0), h < 1 ? "" : this._output.get_indent_string(h);
  };
  var u = function(h) {
    for (var a = null, c = h.next; c.type !== i.EOF && h.closed !== c; ) {
      if (c.type === i.ATTRIBUTE && c.text === "type") {
        c.next && c.next.type === i.EQUALS && c.next.next && c.next.next.type === i.VALUE && (a = c.next.next.text);
        break;
      }
      c = c.next;
    }
    return a;
  }, o = function(h, a) {
    var c = null, T = null;
    return a.closed ? (h === "script" ? c = "text/javascript" : h === "style" && (c = "text/css"), c = u(a) || c, c.search("text/css") > -1 ? T = "css" : c.search(/module|((text|application|dojo)\/(x-)?(javascript|ecmascript|jscript|livescript|(ld\+)?json|method|aspect))/) > -1 ? T = "javascript" : c.search(/(text|application|dojo)\/(x-)?(html)/) > -1 ? T = "html" : c.search(/test\/null/) > -1 && (T = "null"), T) : null;
  };
  function b(h, a) {
    return a.indexOf(h) !== -1;
  }
  function m(h, a, c) {
    this.parent = h || null, this.tag = a ? a.tag_name : "", this.indent_level = c || 0, this.parser_token = a || null;
  }
  function v(h) {
    this._printer = h, this._current_frame = null;
  }
  v.prototype.get_parser_token = function() {
    return this._current_frame ? this._current_frame.parser_token : null;
  }, v.prototype.record_tag = function(h) {
    var a = new m(this._current_frame, h, this._printer.indent_level);
    this._current_frame = a;
  }, v.prototype._try_pop_frame = function(h) {
    var a = null;
    return h && (a = h.parser_token, this._printer.indent_level = h.indent_level, this._current_frame = h.parent), a;
  }, v.prototype._get_frame = function(h, a) {
    for (var c = this._current_frame; c && h.indexOf(c.tag) === -1; ) {
      if (a && a.indexOf(c.tag) !== -1) {
        c = null;
        break;
      }
      c = c.parent;
    }
    return c;
  }, v.prototype.try_pop = function(h, a) {
    var c = this._get_frame([h], a);
    return this._try_pop_frame(c);
  }, v.prototype.indent_to_tag = function(h) {
    var a = this._get_frame(h);
    a && (this._printer.indent_level = a.indent_level);
  };
  function f(h, a, c, T) {
    this._source_text = h || "", a = a || {}, this._js_beautify = c, this._css_beautify = T, this._tag_stack = null;
    var w = new e(a, "html");
    this._options = w, this._is_wrap_attributes_force = this._options.wrap_attributes.substr(0, 5) === "force", this._is_wrap_attributes_force_expand_multiline = this._options.wrap_attributes === "force-expand-multiline", this._is_wrap_attributes_force_aligned = this._options.wrap_attributes === "force-aligned", this._is_wrap_attributes_aligned_multiple = this._options.wrap_attributes === "aligned-multiple", this._is_wrap_attributes_preserve = this._options.wrap_attributes.substr(0, 8) === "preserve", this._is_wrap_attributes_preserve_aligned = this._options.wrap_attributes === "preserve-aligned";
  }
  f.prototype.beautify = function() {
    if (this._options.disabled)
      return this._source_text;
    var h = this._source_text, a = this._options.eol;
    this._options.eol === "auto" && (a = `
`, h && r.test(h) && (a = h.match(r)[0])), h = h.replace(_, `
`);
    var c = h.match(/^[\t ]*/)[0], T = {
      text: "",
      type: ""
    }, w = new S(this._options), O = new d(this._options, c), l = new t(h, this._options).tokenize();
    this._tag_stack = new v(O);
    for (var g = null, p = l.next(); p.type !== i.EOF; )
      p.type === i.TAG_OPEN || p.type === i.COMMENT ? (g = this._handle_tag_open(O, p, w, T, l), w = g) : p.type === i.ATTRIBUTE || p.type === i.EQUALS || p.type === i.VALUE || p.type === i.TEXT && !w.tag_complete ? g = this._handle_inside_tag(O, p, w, T) : p.type === i.TAG_CLOSE ? g = this._handle_tag_close(O, p, w) : p.type === i.TEXT ? g = this._handle_text(O, p, w) : p.type === i.CONTROL_FLOW_OPEN ? g = this._handle_control_flow_open(O, p) : p.type === i.CONTROL_FLOW_CLOSE ? g = this._handle_control_flow_close(O, p) : O.add_raw_token(p), T = g, p = l.next();
    var E = O._output.get_code(a);
    return E;
  }, f.prototype._handle_control_flow_open = function(h, a) {
    var c = {
      text: a.text,
      type: a.type
    };
    return h.set_space_before_token(a.newlines || a.whitespace_before !== "", !0), a.newlines ? h.print_preserved_newlines(a) : h.set_space_before_token(a.newlines || a.whitespace_before !== "", !0), h.print_token(a), h.indent(), c;
  }, f.prototype._handle_control_flow_close = function(h, a) {
    var c = {
      text: a.text,
      type: a.type
    };
    return h.deindent(), a.newlines ? h.print_preserved_newlines(a) : h.set_space_before_token(a.newlines || a.whitespace_before !== "", !0), h.print_token(a), c;
  }, f.prototype._handle_tag_close = function(h, a, c) {
    var T = {
      text: a.text,
      type: a.type
    };
    return h.alignment_size = 0, c.tag_complete = !0, h.set_space_before_token(a.newlines || a.whitespace_before !== "", !0), c.is_unformatted ? h.add_raw_token(a) : (c.tag_start_char === "<" && (h.set_space_before_token(a.text[0] === "/", !0), this._is_wrap_attributes_force_expand_multiline && c.has_wrapped_attrs && h.print_newline(!1)), h.print_token(a)), c.indent_content && !(c.is_unformatted || c.is_content_unformatted) && (h.indent(), c.indent_content = !1), !c.is_inline_element && !(c.is_unformatted || c.is_content_unformatted) && h.set_wrap_point(), T;
  }, f.prototype._handle_inside_tag = function(h, a, c, T) {
    var w = c.has_wrapped_attrs, O = {
      text: a.text,
      type: a.type
    };
    return h.set_space_before_token(a.newlines || a.whitespace_before !== "", !0), c.is_unformatted ? h.add_raw_token(a) : c.tag_start_char === "{" && a.type === i.TEXT ? h.print_preserved_newlines(a) ? (a.newlines = 0, h.add_raw_token(a)) : h.print_token(a) : (a.type === i.ATTRIBUTE ? h.set_space_before_token(!0) : (a.type === i.EQUALS || a.type === i.VALUE && a.previous.type === i.EQUALS) && h.set_space_before_token(!1), a.type === i.ATTRIBUTE && c.tag_start_char === "<" && ((this._is_wrap_attributes_preserve || this._is_wrap_attributes_preserve_aligned) && (h.traverse_whitespace(a), w = w || a.newlines !== 0), this._is_wrap_attributes_force && c.attr_count >= this._options.wrap_attributes_min_attrs && (T.type !== i.TAG_OPEN || this._is_wrap_attributes_force_expand_multiline) && (h.print_newline(!1), w = !0)), h.print_token(a), w = w || h.previous_token_wrapped(), c.has_wrapped_attrs = w), O;
  }, f.prototype._handle_text = function(h, a, c) {
    var T = {
      text: a.text,
      type: "TK_CONTENT"
    };
    return c.custom_beautifier_name ? this._print_custom_beatifier_text(h, a, c) : c.is_unformatted || c.is_content_unformatted ? h.add_raw_token(a) : (h.traverse_whitespace(a), h.print_token(a)), T;
  }, f.prototype._print_custom_beatifier_text = function(h, a, c) {
    var T = this;
    if (a.text !== "") {
      var w = a.text, O, l = 1, g = "", p = "";
      c.custom_beautifier_name === "javascript" && typeof this._js_beautify == "function" ? O = this._js_beautify : c.custom_beautifier_name === "css" && typeof this._css_beautify == "function" ? O = this._css_beautify : c.custom_beautifier_name === "html" && (O = function(D, B) {
        var $ = new f(D, B, T._js_beautify, T._css_beautify);
        return $.beautify();
      }), this._options.indent_scripts === "keep" ? l = 0 : this._options.indent_scripts === "separate" && (l = -h.indent_level);
      var E = h.get_full_indent(l);
      if (w = w.replace(/\n[ \t]*$/, ""), c.custom_beautifier_name !== "html" && w[0] === "<" && w.match(/^(<!--|<!\[CDATA\[)/)) {
        var s = /^(<!--[^\n]*|<!\[CDATA\[)(\n?)([ \t\n]*)([\s\S]*)(-->|]]>)$/.exec(w);
        if (!s) {
          h.add_raw_token(a);
          return;
        }
        g = E + s[1] + `
`, w = s[4], s[5] && (p = E + s[5]), w = w.replace(/\n[ \t]*$/, ""), (s[2] || s[3].indexOf(`
`) !== -1) && (s = s[3].match(/[ \t]+$/), s && (a.whitespace_before = s[0]));
      }
      if (w)
        if (O) {
          var y = function() {
            this.eol = `
`;
          };
          y.prototype = this._options.raw_options;
          var x = new y();
          w = O(E + w, x);
        } else {
          var A = a.whitespace_before;
          A && (w = w.replace(new RegExp(`
(` + A + ")?", "g"), `
`)), w = E + w.replace(/\n/g, `
` + E);
        }
      g && (w ? w = g + w + `
` + p : w = g + p), h.print_newline(!1), w && (a.text = w, a.whitespace_before = "", a.newlines = 0, h.add_raw_token(a), h.print_newline(!0));
    }
  }, f.prototype._handle_tag_open = function(h, a, c, T, w) {
    var O = this._get_tag_open_token(a);
    if ((c.is_unformatted || c.is_content_unformatted) && !c.is_empty_element && a.type === i.TAG_OPEN && !O.is_start_tag ? (h.add_raw_token(a), O.start_tag_token = this._tag_stack.try_pop(O.tag_name)) : (h.traverse_whitespace(a), this._set_tag_position(h, a, O, c, T), O.is_inline_element || h.set_wrap_point(), h.print_token(a)), O.is_start_tag && this._is_wrap_attributes_force) {
      var l = 0, g;
      do
        g = w.peek(l), g.type === i.ATTRIBUTE && (O.attr_count += 1), l += 1;
      while (g.type !== i.EOF && g.type !== i.TAG_CLOSE);
    }
    return (this._is_wrap_attributes_force_aligned || this._is_wrap_attributes_aligned_multiple || this._is_wrap_attributes_preserve_aligned) && (O.alignment_size = a.text.length + 1), !O.tag_complete && !O.is_unformatted && (h.alignment_size = O.alignment_size), O;
  };
  var S = function(h, a, c) {
    if (this.parent = a || null, this.text = "", this.type = "TK_TAG_OPEN", this.tag_name = "", this.is_inline_element = !1, this.is_unformatted = !1, this.is_content_unformatted = !1, this.is_empty_element = !1, this.is_start_tag = !1, this.is_end_tag = !1, this.indent_content = !1, this.multiline_content = !1, this.custom_beautifier_name = null, this.start_tag_token = null, this.attr_count = 0, this.has_wrapped_attrs = !1, this.alignment_size = 0, this.tag_complete = !1, this.tag_start_char = "", this.tag_check = "", !c)
      this.tag_complete = !0;
    else {
      var T;
      this.tag_start_char = c.text[0], this.text = c.text, this.tag_start_char === "<" ? (T = c.text.match(/^<([^\s>]*)/), this.tag_check = T ? T[1] : "") : (T = c.text.match(/^{{~?(?:[\^]|#\*?)?([^\s}]+)/), this.tag_check = T ? T[1] : "", (c.text.startsWith("{{#>") || c.text.startsWith("{{~#>")) && this.tag_check[0] === ">" && (this.tag_check === ">" && c.next !== null ? this.tag_check = c.next.text.split(" ")[0] : this.tag_check = c.text.split(">")[1])), this.tag_check = this.tag_check.toLowerCase(), c.type === i.COMMENT && (this.tag_complete = !0), this.is_start_tag = this.tag_check.charAt(0) !== "/", this.tag_name = this.is_start_tag ? this.tag_check : this.tag_check.substr(1), this.is_end_tag = !this.is_start_tag || c.closed && c.closed.text === "/>";
      var w = 2;
      this.tag_start_char === "{" && this.text.length >= 3 && this.text.charAt(2) === "~" && (w = 3), this.is_end_tag = this.is_end_tag || this.tag_start_char === "{" && (!h.indent_handlebars || this.text.length < 3 || /[^#\^]/.test(this.text.charAt(w)));
    }
  };
  f.prototype._get_tag_open_token = function(h) {
    var a = new S(this._options, this._tag_stack.get_parser_token(), h);
    return a.alignment_size = this._options.wrap_attributes_indent_size, a.is_end_tag = a.is_end_tag || b(a.tag_check, this._options.void_elements), a.is_empty_element = a.tag_complete || a.is_start_tag && a.is_end_tag, a.is_unformatted = !a.tag_complete && b(a.tag_check, this._options.unformatted), a.is_content_unformatted = !a.is_empty_element && b(a.tag_check, this._options.content_unformatted), a.is_inline_element = b(a.tag_name, this._options.inline) || this._options.inline_custom_elements && a.tag_name.includes("-") || a.tag_start_char === "{", a;
  }, f.prototype._set_tag_position = function(h, a, c, T, w) {
    if (c.is_empty_element || (c.is_end_tag ? c.start_tag_token = this._tag_stack.try_pop(c.tag_name) : (this._do_optional_end_element(c) && (c.is_inline_element || h.print_newline(!1)), this._tag_stack.record_tag(c), (c.tag_name === "script" || c.tag_name === "style") && !(c.is_unformatted || c.is_content_unformatted) && (c.custom_beautifier_name = o(c.tag_check, a)))), b(c.tag_check, this._options.extra_liners) && (h.print_newline(!1), h._output.just_added_blankline() || h.print_newline(!0)), c.is_empty_element) {
      if (c.tag_start_char === "{" && c.tag_check === "else") {
        this._tag_stack.indent_to_tag(["if", "unless", "each"]), c.indent_content = !0;
        var O = h.current_line_has_match(/{{#if/);
        O || h.print_newline(!1);
      }
      c.tag_name === "!--" && w.type === i.TAG_CLOSE && T.is_end_tag && c.text.indexOf(`
`) === -1 || (c.is_inline_element || c.is_unformatted || h.print_newline(!1), this._calcluate_parent_multiline(h, c));
    } else if (c.is_end_tag) {
      var l = !1;
      l = c.start_tag_token && c.start_tag_token.multiline_content, l = l || !c.is_inline_element && !(T.is_inline_element || T.is_unformatted) && !(w.type === i.TAG_CLOSE && c.start_tag_token === T) && w.type !== "TK_CONTENT", (c.is_content_unformatted || c.is_unformatted) && (l = !1), l && h.print_newline(!1);
    } else
      c.indent_content = !c.custom_beautifier_name, c.tag_start_char === "<" && (c.tag_name === "html" ? c.indent_content = this._options.indent_inner_html : c.tag_name === "head" ? c.indent_content = this._options.indent_head_inner_html : c.tag_name === "body" && (c.indent_content = this._options.indent_body_inner_html)), !(c.is_inline_element || c.is_unformatted) && (w.type !== "TK_CONTENT" || c.is_content_unformatted) && h.print_newline(!1), this._calcluate_parent_multiline(h, c);
  }, f.prototype._calcluate_parent_multiline = function(h, a) {
    a.parent && h._output.just_added_newline() && !((a.is_inline_element || a.is_unformatted) && a.parent.is_inline_element) && (a.parent.multiline_content = !0);
  };
  var j = ["address", "article", "aside", "blockquote", "details", "div", "dl", "fieldset", "figcaption", "figure", "footer", "form", "h1", "h2", "h3", "h4", "h5", "h6", "header", "hr", "main", "menu", "nav", "ol", "p", "pre", "section", "table", "ul"], C = ["a", "audio", "del", "ins", "map", "noscript", "video"];
  return f.prototype._do_optional_end_element = function(h) {
    var a = null;
    if (!(h.is_empty_element || !h.is_start_tag || !h.parent)) {
      if (h.tag_name === "body")
        a = a || this._tag_stack.try_pop("head");
      else if (h.tag_name === "li")
        a = a || this._tag_stack.try_pop("li", ["ol", "ul", "menu"]);
      else if (h.tag_name === "dd" || h.tag_name === "dt")
        a = a || this._tag_stack.try_pop("dt", ["dl"]), a = a || this._tag_stack.try_pop("dd", ["dl"]);
      else if (h.parent.tag_name === "p" && j.indexOf(h.tag_name) !== -1) {
        var c = h.parent.parent;
        (!c || C.indexOf(c.tag_name) === -1) && (a = a || this._tag_stack.try_pop("p"));
      } else
        h.tag_name === "rp" || h.tag_name === "rt" ? (a = a || this._tag_stack.try_pop("rt", ["ruby", "rtc"]), a = a || this._tag_stack.try_pop("rp", ["ruby", "rtc"])) : h.tag_name === "optgroup" ? a = a || this._tag_stack.try_pop("optgroup", ["select"]) : h.tag_name === "option" ? a = a || this._tag_stack.try_pop("option", ["select", "datalist", "optgroup"]) : h.tag_name === "colgroup" ? a = a || this._tag_stack.try_pop("caption", ["table"]) : h.tag_name === "thead" ? (a = a || this._tag_stack.try_pop("caption", ["table"]), a = a || this._tag_stack.try_pop("colgroup", ["table"])) : h.tag_name === "tbody" || h.tag_name === "tfoot" ? (a = a || this._tag_stack.try_pop("caption", ["table"]), a = a || this._tag_stack.try_pop("colgroup", ["table"]), a = a || this._tag_stack.try_pop("thead", ["table"]), a = a || this._tag_stack.try_pop("tbody", ["table"])) : h.tag_name === "tr" ? (a = a || this._tag_stack.try_pop("caption", ["table"]), a = a || this._tag_stack.try_pop("colgroup", ["table"]), a = a || this._tag_stack.try_pop("tr", ["table", "thead", "tbody", "tfoot"])) : (h.tag_name === "th" || h.tag_name === "td") && (a = a || this._tag_stack.try_pop("td", ["table", "thead", "tbody", "tfoot", "tr"]), a = a || this._tag_stack.try_pop("th", ["table", "thead", "tbody", "tfoot", "tr"]));
      return h.parent = this._tag_stack.get_parser_token(), a;
    }
  }, ae.Beautifier = f, ae;
}
var Ye;
function fn() {
  if (Ye)
    return Rt.exports;
  Ye = 1;
  var e = cn().Beautifier, n = bi().Options;
  function t(i, r, _, d) {
    var u = new e(i, r, _, d);
    return u.beautify();
  }
  return Rt.exports = t, Rt.exports.defaultOptions = function() {
    return new n();
  }, Rt.exports;
}
var ti;
function dn() {
  if (ti)
    return wt;
  ti = 1;
  var e = ln(), n = hn(), t = fn();
  function i(r, _, d, u) {
    return d = d || e, u = u || n, t(r, _, d, u);
  }
  return i.defaultOptions = t.defaultOptions, wt.js = e, wt.css = n, wt.html = i, wt;
}
(function(e) {
  function n(t, i, r) {
    var _ = function(d, u) {
      return t.js_beautify(d, u);
    };
    return _.js = t.js_beautify, _.css = i.css_beautify, _.html = r.html_beautify, _.js_beautify = t.js_beautify, _.css_beautify = i.css_beautify, _.html_beautify = r.html_beautify, _;
  }
  (function(t) {
    var i = dn();
    i.js_beautify = i.js, i.css_beautify = i.css, i.html_beautify = i.html, t.exports = n(i, i, i);
  })(e);
})(ci);
/*!
 * is-whitespace <https://github.com/jonschlinkert/is-whitespace>
 *
 * Copyright (c) 2014-2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var ei, gn = function(n) {
  return typeof n == "string" && mn().test(n);
};
function mn() {
  return ei || (ei = new RegExp(`^[\\s	
\v\f\r \xA0\u1680\u180E\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF"]+$`));
}
/*!
 * is-extendable <https://github.com/jonschlinkert/is-extendable>
 *
 * Copyright (c) 2015, Jon Schlinkert.
 * Licensed under the MIT License.
 */
var vn = function(n) {
  return typeof n < "u" && n !== null && (typeof n == "object" || typeof n == "function");
}, ii = vn, yi = function(n) {
  ii(n) || (n = {});
  for (var t = arguments.length, i = 1; i < t; i++) {
    var r = arguments[i];
    ii(r) && bn(n, r);
  }
  return n;
};
function bn(e, n) {
  for (var t in n)
    yn(n, t) && (e[t] = n[t]);
}
function yn(e, n) {
  return Object.prototype.hasOwnProperty.call(e, n);
}
/*!
 * Determine if an object is a Buffer
 *
 * @author   Feross Aboukhadijeh <https://feross.org>
 * @license  MIT
 */
var wn = function(e) {
  return e != null && (wi(e) || xn(e) || !!e._isBuffer);
};
function wi(e) {
  return !!e.constructor && typeof e.constructor.isBuffer == "function" && e.constructor.isBuffer(e);
}
function xn(e) {
  return typeof e.readFloatLE == "function" && typeof e.slice == "function" && wi(e.slice(0, 0));
}
var En = wn, On = Object.prototype.toString, Tn = function(n) {
  if (typeof n > "u")
    return "undefined";
  if (n === null)
    return "null";
  if (n === !0 || n === !1 || n instanceof Boolean)
    return "boolean";
  if (typeof n == "string" || n instanceof String)
    return "string";
  if (typeof n == "number" || n instanceof Number)
    return "number";
  if (typeof n == "function" || n instanceof Function)
    return "function";
  if (typeof Array.isArray < "u" && Array.isArray(n))
    return "array";
  if (n instanceof RegExp)
    return "regexp";
  if (n instanceof Date)
    return "date";
  var t = On.call(n);
  return t === "[object RegExp]" ? "regexp" : t === "[object Date]" ? "date" : t === "[object Arguments]" ? "arguments" : t === "[object Error]" ? "error" : En(n) ? "buffer" : t === "[object Set]" ? "set" : t === "[object WeakSet]" ? "weakset" : t === "[object Map]" ? "map" : t === "[object WeakMap]" ? "weakmap" : t === "[object Symbol]" ? "symbol" : t === "[object Int8Array]" ? "int8array" : t === "[object Uint8Array]" ? "uint8array" : t === "[object Uint8ClampedArray]" ? "uint8clampedarray" : t === "[object Int16Array]" ? "int16array" : t === "[object Uint16Array]" ? "uint16array" : t === "[object Int32Array]" ? "int32array" : t === "[object Uint32Array]" ? "uint32array" : t === "[object Float32Array]" ? "float32array" : t === "[object Float64Array]" ? "float64array" : "object";
};
/*!
 * condense-newlines <https://github.com/jonschlinkert/condense-newlines>
 *
 * Copyright (c) 2014 Jon Schlinkert, contributors.
 * Licensed under the MIT License
 */
var kn = gn, Sn = yi, Cn = Tn, Rn = function(e, n) {
  var t = Sn({}, n), i = t.sep || `

`, r = t.min, _;
  return typeof r == "number" && r !== 2 && (_ = new RegExp("(\\r\\n|\\n|\\u2424) {" + r + ",}")), typeof _ > "u" && (_ = t.regex || /(\r\n|\n|\u2424){2,}/g), t.keepWhitespace !== !0 && (e = e.split(`
`).map(function(d) {
    return kn(d) ? d.trim() : d;
  }).join(`
`)), e = An(e, t), e.replace(_, i);
};
function An(e, n) {
  var t = n.trailingNewline;
  if (t === !1)
    return e;
  switch (Cn(t)) {
    case "string":
      e = e.replace(/\s+$/, n.trailingNewline);
      break;
    case "function":
      e = n.trailingNewline(e);
      break;
    case "undefined":
    case "boolean":
    default: {
      e = e.replace(/\s+$/, `
`);
      break;
    }
  }
  return e;
}
/*!
 * pretty <https://github.com/jonschlinkert/pretty>
 *
 * Copyright (c) 2013-2015, 2017, Jon Schlinkert.
 * Released under the MIT License.
 */
var Ln = ci.exports, Nn = Rn, jn = yi, Dn = {
  unformatted: ["code", "pre", "em", "strong", "span"],
  indent_inner_html: !0,
  indent_char: " ",
  indent_size: 2,
  sep: `
`
}, Pn = function(n, t) {
  var i = jn({}, Dn, t);
  return n = Ln.html(n, i), i.ocd === !0 ? (i.newlines && (i.sep = i.newlines), In(n, i)) : n;
};
function In(e, n) {
  return Nn(e, n).replace(/^\s+/g, "").replace(/\s+$/g, `
`).replace(/(\s*<!--)/g, `
$1`).replace(/>(\s*)(?=<!--\s*\/)/g, "> ");
}
function _t(e) {
  let { code: n, src: t } = e || {};
  if (n || (n = '<div id="app"></div>'), t && (n += `
<script type="module" src="${t}"><\/script>`), typeof DOMParser < "u") {
    const r = new DOMParser().parseFromString(n, "text/html");
    return Pn(`<!DOCTYPE html>
${r.documentElement.outerHTML}`, {
      ocd: !0
    });
  }
  return "";
}
function Mt(e) {
  const n = {};
  return e === R.REACT && (n.jsx = "react"), JSON.stringify(
    {
      compilerOptions: {
        target: "es5",
        lib: ["dom", "dom.iterable", "esnext"],
        allowJs: !0,
        skipLibCheck: !0,
        esModuleInterop: !0,
        allowImportingTsExtensions: !0,
        allowSyntheticDefaultImports: !0,
        strict: !0,
        forceConsistentCasingInFileNames: !0,
        module: "esnext",
        moduleResolution: "node",
        resolveJsonModule: !0,
        isolatedModules: !0,
        noEmit: !0,
        ...n
      },
      include: ["src"]
    },
    null,
    2
  );
}
const ge = () => JSON.stringify(
  {
    installDependencies: !1,
    startCommand: "npm install && npm run dev"
  },
  null,
  2
), Bn = `import { createApp } from "vue";
import App from "./App.vue";

const app = createApp(App);
app.mount("#app");
`, $n = `import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";

const root = createRoot(document.querySelector("#app"));
root.render(<App />);
`, Mn = `import { mount } from "svelte";
import App from "./App.svelte";

const app = mount(App, { target: document.querySelector("#app") });

export default app;
`;
function mt(e) {
  return e === R.VUE ? Bn : e === R.REACT ? $n : e === R.SVELTE ? Mn : "";
}
const Fn = `import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import vueJsx from '@vitejs/plugin-vue-jsx';
export default defineConfig({
  plugins: [vue(), vueJsx()],
});
`, Un = `import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
export default defineConfig({
  plugins: [react()],
});
`, Wn = `import { defineConfig } from 'vite';
import { svelte } from '@sveltejs/vite-plugin-svelte';
export default defineConfig({
  plugins: [svelte()],
});
`;
function me(e) {
  return e === R.VUE ? Fn : e === R.REACT ? Un : e === R.SVELTE ? Wn : "";
}
const zn = () => ({
  copyContent: K(""),
  clickCopy: async (t) => {
    let i = !0;
    try {
      navigator.clipboard && navigator.clipboard.writeText && await navigator.clipboard.writeText(t);
    } catch {
      const _ = document.createElement("textarea");
      _.value = t, _.style.position = "fixed", _.style.left = "-999999px", _.style.top = "-999999px", document.body.appendChild(_), _.focus(), _.select(), i = document.execCommand("copy"), document.body.removeChild(_);
    }
    return i;
  }
}), Kn = () => {
  const e = K(!0);
  return {
    isCodeFold: e,
    setCodeFold: (t) => {
      e.value = t;
    }
  };
};
function Vn(e) {
  return [
    ...e.match(/from '([^']+)'(;)?(\r)?\n/g) || [],
    ...e.match(/from "([^"]+)"(;)?(\r)?\n/g) || []
  ].map((n) => {
    let t = "";
    return n.includes("'") ? t = n.split("'")[1] : n.includes('"') && (t = n.split('"')[1]), t.includes("/") && (t.startsWith("@") ? t = t.split("/")[0] + "/" + t.split("/")[1] : t = t.split("/")[0]), t;
  }).filter(
    (n) => n !== "" && !n.startsWith(".") && !n.startsWith("/")
  ).reduce((n, t) => (n[t] = "latest", n), {});
}
const Lt = "vitepress-demo-plugin", Nt = (e, n, t, i) => {
  let r = n === "" ? `${e}` : `${e}-${n}`;
  return t && (r += `__${t}`), i && (r += `--${i}`), r;
}, Ft = (e = "") => ({
  b: () => Nt(Lt, e),
  e: (_ = "") => Nt(Lt, e, _),
  m: (_ = "") => Nt(Lt, e, "", _),
  bem: (_, d, u) => Nt(Lt, _, d, u)
}), ni = ({
  code: e,
  styles: n,
  links: t
}) => `
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Document</title>
    ${n}
    ${t}
    <style>
      body {
        min-height: 0;
      }
    </style>
  </head>
  <body>
    <div class="vp-raw">
      ${e}
    </div>
  </body>
</html>
  `, qn = (e, n) => {
  const t = {
    dependencies: {},
    devDependencies: {
      typescript: "latest"
    }
  };
  return e === R.VUE ? (t.dependencies.vue = "latest", n === H.STACKBLITZ ? (t.devDependencies.vite = "latest", t.devDependencies["@vitejs/plugin-vue"] = "latest", t.devDependencies["@vitejs/plugin-vue-jsx"] = "latest") : n === H.CODESANDBOX && (t.devDependencies["@vue/cli-plugin-babel"] = "latest")) : e === R.REACT ? (t.dependencies.react = "latest", t.dependencies["react-dom"] = "latest", t.dependencies["@emotion/react"] = "latest", t.dependencies["@emotion/styled"] = "latest", t.devDependencies["@types/react"] = "latest", t.devDependencies["@types/react-dom"] = "latest", n === H.STACKBLITZ && (t.devDependencies.vite = "latest", t.devDependencies["@vitejs/plugin-react"] = "latest")) : e === R.SVELTE && (t.dependencies.svelte = "latest", n === H.STACKBLITZ && (t.devDependencies.vite = "latest", t.devDependencies["@sveltejs/vite-plugin-svelte"] = "latest")), t;
};
function vt(e) {
  const { type: n, platform: t, codes: i, title: r, description: _ } = e, d = t === H.STACKBLITZ ? {
    scripts: {
      dev: "vite",
      build: "vite build",
      serve: "vite preview"
    }
  } : {}, { dependencies: u, devDependencies: o } = qn(n, t), b = {
    name: r,
    description: _,
    version: "0.0.0",
    private: !0,
    ...d,
    dependencies: {
      ...Vn(`${i.join(`
`)}
`),
      ...u
    },
    devDependencies: {
      ...o
    }
  };
  return JSON.stringify(b, null, 2);
}
function ot(e) {
  return Object.fromEntries(
    Object.entries(e || {}).map(([n, t]) => [
      n,
      typeof t == "string" ? { content: t || "" } : t
    ])
  );
}
function Gn(e) {
  const { code: n } = e, t = Object.values(e.sourceFiles || {});
  return Et({
    files: {
      ...ot(e.sourceFiles),
      "package.json": {
        content: vt({
          type: R.VUE,
          platform: H.CODESANDBOX,
          codes: [n, ...t]
        })
      },
      "tsconfig.json": {
        content: Mt(R.VUE)
      },
      "index.html": {
        content: _t()
      },
      "src/main.ts": {
        content: mt(R.VUE)
      },
      "src/App.vue": {
        content: n
      },
      ...ot(e.customFiles)
    }
  });
}
function Hn(e) {
  const { code: n } = e, t = Object.values(e.sourceFiles || {});
  return Et({
    files: {
      ...ot(e.sourceFiles),
      "package.json": {
        content: vt({
          type: R.REACT,
          platform: H.CODESANDBOX,
          codes: [n, ...t]
        })
      },
      "tsconfig.json": {
        content: Mt(R.REACT)
      },
      "index.html": {
        content: _t()
      },
      "src/main.tsx": {
        content: mt(R.REACT)
      },
      "src/App.tsx": {
        content: n
      },
      ...ot(e.customFiles)
    }
  });
}
function Xn(e) {
  const { code: n } = e, t = Object.values(e.sourceFiles || {});
  return Et({
    files: {
      ...ot(e.sourceFiles),
      "package.json": {
        content: vt({
          type: R.SVELTE,
          platform: H.CODESANDBOX,
          codes: [n, ...t]
        })
      },
      "index.html": {
        content: _t()
      },
      "src/main.js": {
        content: mt(R.SVELTE)
      },
      "src/App.svelte": {
        content: n
      },
      ...ot(e.customFiles)
    }
  });
}
function Qn(e) {
  const { code: n } = e;
  return Et({
    files: {
      ...ot(e.sourceFiles),
      "index.html": {
        content: _t({ code: n })
      },
      ...ot(e.customFiles)
    },
    template: "static"
  });
}
function Zn(e) {
  var _, d, u;
  const n = (_ = (e.templates || []).find(
    (o) => o.scope === "global"
  )) == null ? void 0 : _.files, t = (d = (e.templates || []).find(
    (o) => o.scope === e.type
  )) == null ? void 0 : d.files, i = (u = (e.templates || []).find(
    (o) => o.scope === e.scope
  )) == null ? void 0 : u.files, r = {
    ...e,
    sourceFiles: pi(e),
    customFiles: {
      ...n,
      ...t,
      ...i
    }
  };
  if (e.type === R.VUE)
    return Gn(r);
  if (e.type === R.REACT)
    return Hn(r);
  if (e.type === R.SVELTE)
    return Xn(r);
  if (e.type === R.HTML)
    return Qn(r);
}
const Jn = {
  action: "https://codesandbox.io/api/v1/sandboxes/define",
  method: "post",
  target: "_blank",
  style: { display: "flex" }
}, Yn = ["value"], ts = ["value"], es = /* @__PURE__ */ gt({
  __name: "codesandbox",
  props: {
    code: {},
    type: {},
    title: {},
    description: {},
    scope: {},
    templates: {},
    files: {}
  },
  setup(e) {
    const n = e, t = Z(
      () => Zn({
        code: n.code,
        type: n.type,
        title: n.title || ui,
        description: n.description || li,
        scope: n.scope,
        templates: n.templates,
        files: n.files
      })
    ), i = Z(() => tn(n.type));
    return (r, _) => (L(), I("form", Jn, [
      N("input", {
        style: { display: "none" },
        name: "parameters",
        value: t.value
      }, null, 8, Yn),
      _[0] || (_[0] = N("input", {
        style: { display: "none" },
        name: "embed",
        value: 1
      }, null, -1)),
      N("input", {
        style: { display: "none" },
        name: "query",
        value: `module=${i.value}`
      }, null, 8, ts),
      _[1] || (_[1] = oi('<button type="submit"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-codesandbox"><path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path><polyline points="7.5 4.21 12 6.81 16.5 4.21"></polyline><polyline points="7.5 19.79 7.5 14.6 3 12"></polyline><polyline points="21 12 16.5 14.6 16.5 19.79"></polyline><polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline><line x1="12" x2="12" y1="22.08" y2="12"></line></svg></button>', 1))
    ]));
  }
}), is = 500, ns = 20, ss = 300, rs = "https://stackblitz.com", si = [
  "angular-cli",
  "create-react-app",
  "html",
  "javascript",
  "node",
  "polymer",
  "typescript",
  "vue"
], as = ["project", "search", "ports", "settings"], os = ["light", "dark"], _s = ["editor", "preview"], us = [
  "accelerometer",
  "ambient-light-sensor",
  "autoplay",
  "battery",
  "bluetooth",
  "camera",
  "clipboard-read",
  "clipboard-write",
  "display-capture",
  "encrypted-media",
  "fullscreen",
  "gamepad",
  "geolocation",
  "gyroscope",
  "hid",
  "idle-detection",
  "local-network",
  "local-network-access",
  "loopback-network",
  "magnetometer",
  "microphone",
  "midi",
  "payment",
  "picture-in-picture",
  "publickey-credentials-get",
  "screen-wake-lock",
  "serial",
  "usb",
  "web-share",
  "xr-spatial-tracking"
], ri = {
  clickToLoad: (e) => pt("ctl", e),
  devToolsHeight: (e) => ai("devtoolsheight", e),
  forceEmbedLayout: (e) => pt("embed", e),
  hideDevTools: (e) => pt("hidedevtools", e),
  hideExplorer: (e) => pt("hideExplorer", e),
  hideNavigation: (e) => pt("hideNavigation", e),
  openFile: (e) => jt("file", e),
  showSidebar: (e) => ls("showSidebar", e),
  sidebarView: (e) => _e("sidebarView", e, as),
  startScript: (e) => jt("startScript", e),
  terminalHeight: (e) => ai("terminalHeight", e),
  theme: (e) => _e("theme", e, os),
  view: (e) => _e("view", e, _s),
  zenMode: (e) => pt("zenMode", e),
  organization: (e) => `${jt("orgName", e == null ? void 0 : e.name)}&${jt("orgProvider", e == null ? void 0 : e.provider)}`,
  crossOriginIsolated: (e) => pt("corp", e)
};
function xi(e = {}) {
  const n = Object.entries(e).map(([t, i]) => i != null && ri.hasOwnProperty(t) ? ri[t](i) : "").filter(Boolean);
  return n.length ? `?${n.join("&")}` : "";
}
function pt(e, n) {
  return n === !0 ? `${e}=1` : "";
}
function ls(e, n) {
  return typeof n == "boolean" ? `${e}=${n ? "1" : "0"}` : "";
}
function ai(e, n) {
  if (typeof n == "number" && !Number.isNaN(n)) {
    const t = Math.min(100, Math.max(0, n));
    return `${e}=${encodeURIComponent(Math.round(t))}`;
  }
  return "";
}
function _e(e, n = "", t = []) {
  return t.includes(n) ? `${e}=${encodeURIComponent(n)}` : "";
}
function jt(e, n) {
  return (Array.isArray(n) ? n : [n]).filter((i) => typeof i == "string" && i.trim() !== "").map((i) => `${e}=${encodeURIComponent(i)}`).join("&");
}
function Ei() {
  return Math.random().toString(36).slice(2, 6) + Math.random().toString(36).slice(2, 6);
}
function ve(e, n) {
  return `${ye(n)}${e}${xi(n)}`;
}
function be(e, n) {
  const t = {
    forceEmbedLayout: !0
  };
  return n && typeof n == "object" && Object.assign(t, n), `${ye(t)}${e}${xi(t)}`;
}
function ye(e = {}) {
  return (typeof e.origin == "string" ? e.origin : rs).replace(/\/$/, "");
}
function we(e, n, t) {
  if (!n || !e || !e.parentNode)
    throw new Error("Invalid Element");
  e.id && (n.id = e.id), e.className && (n.className = e.className), ps(n, t), hs(e, n, t), e.replaceWith(n);
}
function xe(e) {
  if (typeof e == "string") {
    const n = document.getElementById(e);
    if (!n)
      throw new Error(`Could not find element with id '${e}'`);
    return n;
  } else if (e instanceof HTMLElement)
    return e;
  throw new Error(`Invalid element: ${e}`);
}
function Ee(e) {
  return e && e.newWindow === !1 ? "_self" : "_blank";
}
function ps(e, n = {}) {
  const t = Object.hasOwnProperty.call(n, "height") ? `${n.height}` : `${ss}`, i = Object.hasOwnProperty.call(n, "width") ? `${n.width}` : void 0;
  e.setAttribute("height", t), i ? e.setAttribute("width", i) : e.setAttribute("style", "width:100%;");
}
function hs(e, n, t = {}) {
  var _, d, u;
  const i = (u = (d = (_ = e.allow) == null ? void 0 : _.split(";")) == null ? void 0 : d.map((o) => o.trim()).filter(Boolean)) != null ? u : [], r = new Set(i.map((o) => o.split(/\s+/)[0]));
  for (const o of cs())
    r.has(o) || (i.push(`${o} *`), r.add(o));
  t.crossOriginIsolated && !r.has("cross-origin-isolated") && (i.push(`cross-origin-isolated ${ye(t)}`), r.add("cross-origin-isolated")), i.length > 0 && (n.allow = i.join("; "));
}
function cs() {
  const e = new Set(us);
  try {
    const n = document == null ? void 0 : document.featurePolicy;
    if (n && typeof n.allowedFeatures == "function")
      for (const t of n.allowedFeatures())
        e.add(t);
  } catch {
  }
  return e.delete("cross-origin-isolated"), [...e];
}
class fs {
  constructor(n) {
    this.pending = {}, this.port = n, this.port.onmessage = this.messageListener.bind(this);
  }
  request({ type: n, payload: t }) {
    return new Promise((i, r) => {
      const _ = Ei();
      this.pending[_] = { resolve: i, reject: r }, this.port.postMessage({
        type: n,
        payload: {
          ...t,
          __reqid: _
        }
      });
    });
  }
  messageListener(n) {
    var u;
    if (typeof ((u = n.data.payload) == null ? void 0 : u.__reqid) != "string")
      return;
    const { type: t, payload: i } = n.data, { __reqid: r, __success: _, __error: d } = i;
    this.pending[r] && (_ ? this.pending[r].resolve(this.cleanResult(i)) : this.pending[r].reject(d ? `${t}: ${d}` : t), delete this.pending[r]);
  }
  cleanResult(n) {
    const t = { ...n };
    return delete t.__reqid, delete t.__success, delete t.__error, Object.keys(t).length ? t : null;
  }
}
class ds {
  constructor(n, t) {
    this.editor = {
      openFile: (i) => this._rdc.request({
        type: "SDK_OPEN_FILE",
        payload: { path: i }
      }),
      setCurrentFile: (i) => this._rdc.request({
        type: "SDK_SET_CURRENT_FILE",
        payload: { path: i }
      }),
      setTheme: (i) => this._rdc.request({
        type: "SDK_SET_UI_THEME",
        payload: { theme: i }
      }),
      setView: (i) => this._rdc.request({
        type: "SDK_SET_UI_VIEW",
        payload: { view: i }
      }),
      showSidebar: (i = !0) => this._rdc.request({
        type: "SDK_TOGGLE_SIDEBAR",
        payload: { visible: i }
      })
    }, this.preview = {
      origin: "",
      getUrl: () => this._rdc.request({
        type: "SDK_GET_PREVIEW_URL",
        payload: {}
      }).then((i) => {
        var r;
        return (r = i == null ? void 0 : i.url) != null ? r : null;
      }),
      setUrl: (i = "/") => {
        if (typeof i != "string" || !i.startsWith("/"))
          throw new Error(`Invalid argument: expected a path starting with '/', got '${i}'`);
        return this._rdc.request({
          type: "SDK_SET_PREVIEW_URL",
          payload: { path: i }
        });
      }
    }, this._rdc = new fs(n), Object.defineProperty(this.preview, "origin", {
      value: typeof t.previewOrigin == "string" ? t.previewOrigin : null,
      writable: !1
    });
  }
  applyFsDiff(n) {
    const t = (i) => i !== null && typeof i == "object";
    if (!t(n) || !t(n.create))
      throw new Error("Invalid diff object: expected diff.create to be an object.");
    if (!Array.isArray(n.destroy))
      throw new Error("Invalid diff object: expected diff.destroy to be an array.");
    return this._rdc.request({
      type: "SDK_APPLY_FS_DIFF",
      payload: n
    });
  }
  getDependencies() {
    return this._rdc.request({
      type: "SDK_GET_DEPS_SNAPSHOT",
      payload: {}
    });
  }
  getFsSnapshot() {
    return this._rdc.request({
      type: "SDK_GET_FS_SNAPSHOT",
      payload: {}
    });
  }
}
const Dt = [];
class gs {
  constructor(n) {
    this.id = Ei(), this.element = n, this.pending = new Promise((t, i) => {
      const r = ({ data: b, ports: m }) => {
        (b == null ? void 0 : b.action) === "SDK_INIT_SUCCESS" && b.id === this.id && (this.vm = new ds(m[0], b.payload), t(this.vm), d());
      }, _ = () => {
        var b;
        (b = this.element.contentWindow) == null || b.postMessage(
          {
            action: "SDK_INIT",
            id: this.id
          },
          "*"
        );
      };
      function d() {
        window.clearInterval(o), window.removeEventListener("message", r);
      }
      window.addEventListener("message", r), _();
      let u = 0;
      const o = window.setInterval(() => {
        if (this.vm) {
          d();
          return;
        }
        if (u >= ns) {
          d(), i("Timeout: Unable to establish a connection with the StackBlitz VM"), Dt.forEach((b, m) => {
            b.id === this.id && Dt.splice(m, 1);
          });
          return;
        }
        u++, _();
      }, is);
    }), Dt.push(this);
  }
}
const ms = (e) => {
  var t;
  const n = e instanceof Element ? "element" : "id";
  return (t = Dt.find((i) => i[n] === e)) != null ? t : null;
};
function vs(e, n) {
  const t = document.createElement("input");
  return t.type = "hidden", t.name = e, t.value = n, t;
}
function bs(e) {
  return e.replace(/\[/g, "%5B").replace(/\]/g, "%5D");
}
function Oi({
  template: e,
  title: n,
  description: t,
  dependencies: i,
  files: r,
  settings: _
}) {
  if (!si.includes(e)) {
    const b = si.map((m) => `'${m}'`).join(", ");
    console.warn(`Unsupported project.template: must be one of ${b}`);
  }
  const d = [], u = (b, m, v = "") => {
    d.push(vs(b, typeof m == "string" ? m : v));
  };
  u("project[title]", n), typeof t == "string" && t.length > 0 && u("project[description]", t), u("project[template]", e, "javascript"), i && (e === "node" ? console.warn(
    "Invalid project.dependencies: dependencies must be provided as a 'package.json' file when using the 'node' template."
  ) : u("project[dependencies]", JSON.stringify(i))), _ && u("project[settings]", JSON.stringify(_)), Object.entries(r).forEach(([b, m]) => {
    u(`project[files][${bs(b)}]`, m);
  });
  const o = document.createElement("form");
  return o.method = "POST", o.setAttribute("style", "display:none!important;"), o.append(...d), o;
}
function ys(e, n) {
  const t = Oi(e);
  return t.action = be("/run", n), t.id = "sb_run", `<!doctype html>
<html>
<head><title></title></head>
<body>
  ${t.outerHTML}
  <script>document.getElementById('${t.id}').submit();<\/script>
</body>
</html>`;
}
function ws(e, n) {
  const t = Oi(e);
  t.action = ve("/run", n), t.target = Ee(n), document.body.appendChild(t), t.submit(), document.body.removeChild(t);
}
function Ut(e) {
  var t;
  return e != null && e.contentWindow ? ((t = ms(e)) != null ? t : new gs(e)).pending : Promise.reject("Provided element is not an iframe.");
}
function xs(e, n) {
  ws(e, n);
}
function Es(e, n) {
  const t = ve(`/edit/${e}`, n), i = Ee(n);
  window.open(t, i);
}
function Os(e, n) {
  const t = ve(`/github/${e}`, n), i = Ee(n);
  window.open(t, i);
}
function Ts(e, n, t) {
  var d;
  const i = xe(e), r = ys(n, t), _ = document.createElement("iframe");
  return we(i, _, t), (d = _.contentDocument) == null || d.write(r), Ut(_);
}
function ks(e, n, t) {
  const i = xe(e), r = document.createElement("iframe");
  return r.src = be(`/edit/${n}`, t), we(i, r, t), Ut(r);
}
function Ss(e, n, t) {
  const i = xe(e), r = document.createElement("iframe");
  return r.src = be(`/github/${n}`, t), we(i, r, t), Ut(r);
}
const Wt = {
  connect: Ut,
  embedGithubProject: Ss,
  embedProject: Ts,
  embedProjectId: ks,
  openGithubProject: Os,
  openProject: xs,
  openProjectId: Es
}, Cs = (e) => {
  const { code: n, title: t, description: i } = e;
  Wt.openProject(
    {
      title: t,
      description: i,
      template: "html",
      files: {
        ...e.sourceFiles,
        "index.html": _t({ code: n }),
        ...e.customFiles
      }
    },
    {
      openFile: "index.html"
    }
  );
}, Rs = (e) => {
  const { code: n, title: t, description: i } = e, r = Object.values(e.sourceFiles || {});
  Wt.openProject(
    {
      title: t,
      description: i,
      template: "node",
      files: {
        ...e.sourceFiles,
        "src/App.tsx": n,
        "src/main.tsx": mt(R.REACT),
        "index.html": _t({ src: "/src/main.tsx" }),
        "package.json": vt({
          type: R.REACT,
          platform: H.STACKBLITZ,
          codes: [n, ...r]
        }),
        "vite.config.js": me(R.REACT),
        ".stackblitzrc": ge(),
        "tsconfig.json": Mt(R.REACT),
        ...e.customFiles
      }
    },
    {
      openFile: "src/App.tsx"
    }
  );
}, As = (e) => {
  const { code: n, title: t, description: i } = e, r = Object.values(e.sourceFiles || {});
  Wt.openProject(
    {
      title: t,
      description: i,
      template: "node",
      files: {
        ...e.sourceFiles,
        "src/App.svelte": n,
        "src/main.js": mt(R.SVELTE),
        "index.html": _t({ src: "/src/main.js" }),
        "package.json": vt({
          type: R.SVELTE,
          platform: H.STACKBLITZ,
          codes: [n, ...r]
        }),
        "vite.config.js": me(R.SVELTE),
        ".stackblitzrc": ge(),
        ...e.customFiles
      }
    },
    {
      openFile: "src/App.svelte"
    }
  );
}, Ls = (e) => {
  const { code: n, title: t, description: i } = e, r = Object.values(e.sourceFiles || {});
  Wt.openProject(
    {
      title: t,
      description: i,
      template: "node",
      files: {
        ...e.sourceFiles,
        "src/App.vue": n,
        "src/main.ts": mt(R.VUE),
        "index.html": _t({ src: "/src/main.ts" }),
        "package.json": vt({
          type: R.VUE,
          platform: H.STACKBLITZ,
          codes: [n, ...r]
        }),
        "vite.config.js": me(R.VUE),
        ".stackblitzrc": ge(),
        "tsconfig.json": Mt(R.VUE),
        ...e.customFiles
      }
    },
    {
      openFile: "src/App.vue"
    }
  );
};
function Ns(e) {
  var _, d, u;
  const n = (_ = (e.templates || []).find(
    (o) => o.scope === "global"
  )) == null ? void 0 : _.files, t = (d = (e.templates || []).find(
    (o) => o.scope === e.type
  )) == null ? void 0 : d.files, i = (u = (e.templates || []).find(
    (o) => o.scope === e.scope
  )) == null ? void 0 : u.files, r = {
    ...e,
    sourceFiles: pi(e),
    customFiles: {
      ...n,
      ...t,
      ...i
    }
  };
  if (e.type === R.VUE)
    return Ls(r);
  if (e.type === R.REACT)
    return Rs(r);
  if (e.type === R.SVELTE)
    return As(r);
  if (e.type === R.HTML)
    return Cs(r);
}
const js = /* @__PURE__ */ gt({
  __name: "stackblitz",
  props: {
    code: {},
    type: {},
    title: {},
    description: {},
    templates: {},
    scope: {},
    files: {}
  },
  setup(e) {
    const n = e;
    function t() {
      Ns({
        code: n.code,
        type: n.type,
        title: n.title || ui,
        description: n.description || li,
        templates: n.templates || [],
        scope: n.scope,
        files: n.files
      });
    }
    return (i, r) => (L(), I("svg", {
      onClick: t,
      viewBox: "64 64 896 896",
      focusable: "false",
      "data-icon": "thunderbolt",
      width: "20px",
      height: "20px",
      fill: "currentColor",
      "aria-hidden": "true"
    }, [...r[0] || (r[0] = [
      N("path", { d: "M848 359.3H627.7L825.8 109c4.1-5.3.4-13-6.3-13H436c-2.8 0-5.5 1.5-6.9 4L170 547.5c-3.1 5.3.7 12 6.9 12h174.4l-89.4 357.6c-1.9 7.8 7.5 13.3 13.3 7.7L853.5 373c5.2-4.9 1.7-13.7-5.5-13.7zM378.2 732.5l60.3-241H281.1l189.6-327.4h224.6L487 427.4h211L378.2 732.5z" }, null, -1)
    ])]));
  }
}), Ds = {}, Ps = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-github"
};
function Is(e, n) {
  return L(), I("svg", Ps, [...n[0] || (n[0] = [
    N("path", { d: "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" }, null, -1),
    N("path", { d: "M9 18c-4.51 2-5-2-7-2" }, null, -1)
  ])]);
}
const Bs = /* @__PURE__ */ W(Ds, [["render", Is]]), $s = {}, Ms = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "20",
  height: "20",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-gitlab"
};
function Fs(e, n) {
  return L(), I("svg", Ms, [...n[0] || (n[0] = [
    N("path", { d: "m22 13.29-3.33-10a.42.42 0 0 0-.14-.18.38.38 0 0 0-.22-.11.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18l-2.26 6.67H8.32L6.1 3.26a.42.42 0 0 0-.1-.18.38.38 0 0 0-.26-.08.39.39 0 0 0-.23.07.42.42 0 0 0-.14.18L2 13.29a.74.74 0 0 0 .27.83L12 21l9.69-6.88a.71.71 0 0 0 .31-.83Z" }, null, -1)
  ])]);
}
const Us = /* @__PURE__ */ W($s, [["render", Fs]]), Ws = {}, zs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 256 221",
  width: "1em",
  height: "1em",
  "aria-hidden": "true"
};
function Ks(e, n) {
  return L(), I("svg", zs, [...n[0] || (n[0] = [
    N("path", {
      fill: "#41B883",
      d: "M204.8 0H256L128 220.8 0 0h97.92L128 51.2 157.44 0h47.36Z"
    }, null, -1),
    N("path", {
      fill: "#41B883",
      d: "m0 0 128 220.8L256 0h-51.2L128 132.48 50.56 0H0Z"
    }, null, -1),
    N("path", {
      fill: "#35495E",
      d: "M50.56 0 128 133.12 204.8 0h-47.36L128 51.2 97.92 0H50.56Z"
    }, null, -1)
  ])]);
}
const Vs = /* @__PURE__ */ W(Ws, [["render", Ks]]), qs = {}, Gs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "-11.5 -10.23 23 20.46",
  width: "1em",
  height: "1em",
  "aria-hidden": "true"
};
function Hs(e, n) {
  return L(), I("svg", Gs, [...n[0] || (n[0] = [
    oi('<circle cx="0" cy="0" r="2.05" fill="#61DAFB"></circle><g stroke="#61DAFB" stroke-width="1" fill="none"><ellipse rx="11" ry="4.2"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(60)"></ellipse><ellipse rx="11" ry="4.2" transform="rotate(120)"></ellipse></g>', 2)
  ])]);
}
const Xs = /* @__PURE__ */ W(qs, [["render", Hs]]), Qs = {}, Zs = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "#FF3E00",
  "aria-hidden": "true"
};
function Js(e, n) {
  return L(), I("svg", Zs, [...n[0] || (n[0] = [
    N("path", { d: "M10.354 21.125a4.44 4.44 0 0 1-4.765-1.767 4.109 4.109 0 0 1-.703-3.107 3.898 3.898 0 0 1 .134-.522l.105-.321.287.21a7.21 7.21 0 0 0 2.186 1.092l.208.063-.02.208a1.253 1.253 0 0 0 .226.83 1.337 1.337 0 0 0 1.435.533 1.231 1.231 0 0 0 .343-.15l5.59-3.562a1.164 1.164 0 0 0 .524-.778 1.242 1.242 0 0 0-.211-.937 1.338 1.338 0 0 0-1.435-.533 1.23 1.23 0 0 0-.343.15l-2.133 1.36a4.078 4.078 0 0 1-1.135.499 4.44 4.44 0 0 1-4.765-1.766 4.108 4.108 0 0 1-.702-3.108 3.855 3.855 0 0 1 1.742-2.582l5.589-3.563a4.072 4.072 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.767 4.109 4.109 0 0 1 .703 3.107 3.943 3.943 0 0 1-.134.522l-.105.321-.286-.21a7.204 7.204 0 0 0-2.187-1.093l-.208-.063.02-.207a1.255 1.255 0 0 0-.226-.831 1.337 1.337 0 0 0-1.435-.532 1.231 1.231 0 0 0-.343.15l-5.59 3.561a1.164 1.164 0 0 0-.523.778 1.242 1.242 0 0 0 .211.937 1.338 1.338 0 0 0 1.435.533 1.232 1.232 0 0 0 .344-.151l2.132-1.36a4.067 4.067 0 0 1 1.135-.498 4.44 4.44 0 0 1 4.765 1.766 4.108 4.108 0 0 1 .702 3.108 3.857 3.857 0 0 1-1.742 2.583l-5.589 3.562a4.072 4.072 0 0 1-1.135.498m10.358-17.95C18.484-.015 14.082-.96 10.9 1.068L5.31 4.63a6.412 6.412 0 0 0-2.896 4.295 6.753 6.753 0 0 0 .666 4.336 6.43 6.43 0 0 0-.96 2.396 6.833 6.833 0 0 0 1.168 5.167c2.229 3.19 6.63 4.135 9.812 2.108l5.59-3.562a6.41 6.41 0 0 0 2.896-4.295 6.756 6.756 0 0 0-.665-4.336 6.431 6.431 0 0 0 .958-2.396 6.831 6.831 0 0 0-1.167-5.168Z" }, null, -1)
  ])]);
}
const Ys = /* @__PURE__ */ W(Qs, [["render", Js]]), tr = {}, er = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "#2c4f7c",
  "aria-hidden": "true"
};
function ir(e, n) {
  return L(), I("svg", er, [...n[0] || (n[0] = [
    N("path", { d: "M11.558.788A9.082 9.082 0 0 0 9.776.99l-.453.15c-.906.303-1.656.755-2.1 1.348l-.301.452-2.035 3.528c.426-.387.974-.698 1.643-.894h.001l.613-.154h.001a8.82 8.82 0 0 1 1.777-.206c2.916-.053 6.033 1.148 8.423 2.36 2.317 1.175 3.888 2.32 3.987 2.39L24 5.518c-.082-.06-1.66-1.21-3.991-2.386-2.393-1.206-5.521-2.396-8.45-2.343zM8.924 5.366a8.634 8.634 0 0 0-1.745.203l-.606.151c-1.278.376-2.095 1.16-2.43 2.108-.334.948-.188 2.065.487 3.116.33.43.747.813 1.216 1.147L12.328 10h.001a6.943 6.943 0 0 1 6.013 1.013l2.844-.963c-.17-.124-1.663-1.2-3.91-2.34-2.379-1.206-5.479-2.396-8.352-2.344zm5.435 4.497a6.791 6.791 0 0 0-1.984.283L2.94 13.189 0 18.334l9.276-2.992a6.945 6.945 0 0 1 7.408 2.314v.001c.695.903.89 1.906.66 2.808l2.572-4.63c.595-1.041.45-2.225-.302-3.429a6.792 6.792 0 0 0-5.255-2.543zm-3.031 5.341a6.787 6.787 0 0 0-2.006.283L.008 18.492c.175.131 2.02 1.498 4.687 2.768 2.797 1.332 6.37 2.467 9.468 1.712l.454-.152h.002c1.278-.376 2.134-1.162 2.487-2.09.353-.93.207-2.004-.541-2.978a6.791 6.791 0 0 0-5.237-2.548z" }, null, -1)
  ])]);
}
const nr = /* @__PURE__ */ W(tr, [["render", ir]]), sr = {}, rr = {
  xmlns: "http://www.w3.org/2000/svg",
  viewBox: "0 0 24 24",
  width: "1em",
  height: "1em",
  fill: "#E34F26",
  "aria-hidden": "true"
};
function ar(e, n) {
  return L(), I("svg", rr, [...n[0] || (n[0] = [
    N("path", { d: "M1.5 0h21l-1.91 21.563L11.977 24l-8.564-2.438L1.5 0zm7.031 9.75l-.232-2.718 10.059.003.23-2.622L5.412 4.41l.698 8.01h9.126l-.326 3.426-2.91.804-2.955-.81-.188-2.11H6.248l.33 4.171L12 19.351l5.379-1.443.744-8.157H8.531z" }, null, -1)
  ])]);
}
const or = /* @__PURE__ */ W(sr, [["render", ar]]), _r = {}, ur = {
  xmlns: "http://www.w3.org/2000/svg",
  "xmlns:xlink": "http://www.w3.org/1999/xlink",
  fill: "none",
  version: "1.1",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24"
};
function lr(e, n) {
  return L(), I("svg", ur, [...n[0] || (n[0] = [
    N("defs", null, [
      N("clipPath", { id: "master_svg0_27_0291" }, [
        N("rect", {
          x: "0",
          y: "0",
          width: "24",
          height: "24",
          rx: "0"
        })
      ])
    ], -1),
    N("g", { "clip-path": "url(#master_svg0_27_0291)" }, [
      N("g", null, [
        N("path", {
          d: "M4.707482,11.29327L4.707107,11.29289Q4.566455,11.152239999999999,4.382683,11.07612Q4.198912,11,4,11Q3.801088,11,3.617317,11.07612Q3.433545,11.152239999999999,3.292893,11.29289Q3.152241,11.43355,3.07612,11.61732Q3,11.80109,3,12Q3,12.02403,3.001154,12.04804Q3.010111,12.23427,3.085581,12.40477Q3.161051,12.57527,3.292893,12.70711L3.293268,12.70748L8.29289,17.7071Q8.36254,17.776699999999998,8.44443,17.8315Q8.52632,17.886200000000002,8.61732,17.9239Q8.70831,17.9616,8.80491,17.980800000000002Q8.90151,18,9,18Q9.09849,18,9.19509,17.980800000000002Q9.29169,17.9616,9.38268,17.9239Q9.47368,17.886200000000002,9.55557,17.8315Q9.63746,17.776699999999998,9.70711,17.7071L20.7071,6.707107Q20.8478,6.566454,20.9239,6.382683Q21,6.198912,21,6Q21,5.801088,20.9239,5.617317Q20.8478,5.433546,20.7071,5.292894Q20.5665,5.152241,20.3827,5.076121Q20.1989,5,20,5Q19.9741,5,19.9483,5.001339Q19.762999999999998,5.010937,19.5935,5.086334Q19.4241,5.16173,19.2929,5.292893L19.2925,5.293268L9,15.58579L4.707482,11.29327Z",
          "fill-rule": "evenodd",
          fill: "currentColor",
          "fill-opacity": "0.8500000238418579"
        })
      ])
    ], -1)
  ])]);
}
const pr = /* @__PURE__ */ W(_r, [["render", lr]]), hr = {}, cr = {
  xmlns: "http://www.w3.org/2000/svg",
  width: "18",
  height: "18",
  viewBox: "0 0 24 24",
  fill: "none",
  stroke: "currentColor",
  "stroke-width": "2",
  "stroke-linecap": "round",
  "stroke-linejoin": "round",
  class: "lucide lucide-x-icon lucide-x"
};
function fr(e, n) {
  return L(), I("svg", cr, [...n[0] || (n[0] = [
    N("path", { d: "M18 6 6 18" }, null, -1),
    N("path", { d: "m6 6 12 12" }, null, -1)
  ])]);
}
const dr = /* @__PURE__ */ W(hr, [["render", fr]]), gr = { style: { color: "var(--vp-c-text-1)" } }, mr = 3e3, vr = /* @__PURE__ */ gt({
  __name: "message",
  props: {
    content: { default: "\u590D\u5236\u6210\u529F\uFF01" },
    close: {},
    success: { type: Boolean, default: !0 }
  },
  setup(e, { expose: n }) {
    const t = Ft(), i = e, r = K(!1), _ = (b) => {
      r.value = b;
    }, d = K(-9999), u = (b) => {
      d.value = b;
    };
    G(r, (b) => {
      b === !0 && setTimeout(() => {
        r.value = !1;
      }, mr);
    });
    const o = () => {
      i.close();
    };
    return n({
      setVisible: _,
      setTopHeight: u
    }), (b, m) => (L(), J(Ci, {
      name: "slide-fade",
      onAfterLeave: o
    }, {
      default: nt(() => [
        r.value ? (L(), I("div", {
          key: 0,
          class: U([P(t).bem("message-notice", "container")]),
          style: _i({ top: d.value + "px" })
        }, [
          e.success ? (L(), J(pr, { key: 0 })) : (L(), J(dr, {
            key: 1,
            style: { color: "var(--vp-c-danger-2)" }
          })),
          N("span", gr, dt(e.content), 1)
        ], 6)) : V("", !0)
      ]),
      _: 1
    }));
  }
});
const ue = [], br = {
  open: (e, n) => {
    const t = document.createElement("div"), i = Ri(vr, {
      content: e,
      success: n,
      close: () => {
        document.body.removeChild(t), ue.pop(), i.unmount();
      }
    }), r = i.mount(t);
    document.body.appendChild(t);
    const _ = ue.length, d = _ === 0 ? 10 : (_ + 1) * 10 + _ * 42;
    r.setTopHeight(d), r.setVisible(!0), ue.push(r);
  }
}, yr = /* @__PURE__ */ gt({
  __name: "index",
  props: {
    content: {}
  },
  setup(e) {
    const n = Ft(), t = e;
    return (i, r) => (L(), I("div", {
      class: U([P(n).bem("tooltip", "wrapper")])
    }, [
      N("div", {
        class: U([P(n).bem("tooltip", "content")])
      }, [
        le(i.$slots, "content", {}, () => [
          pe(dt(t.content), 1)
        ], !0)
      ], 2),
      le(i.$slots, "default", {}, void 0, !0)
    ], 2));
  }
});
const at = /* @__PURE__ */ W(yr, [["__scopeId", "data-v-4306ac1f"]]), zt = {
  openInStackblitz: "\u5728 Stackblitz \u4E2D\u6253\u5F00",
  openInCodeSandbox: "\u5728 Codesandbox \u4E2D\u6253\u5F00",
  openInGithub: "\u5728 GitHub \u4E2D\u6253\u5F00",
  openInGitlab: "\u5728 GitLub \u4E2D\u6253\u5F00",
  collapseCode: "\u6536\u8D77\u4EE3\u7801",
  expandCode: "\u5C55\u5F00\u4EE3\u7801",
  copyCode: "\u590D\u5236\u4EE3\u7801",
  copySuccess: "\u5DF2\u5C06\u4EE3\u7801\u590D\u5236\u81F3\u526A\u5207\u677F\uFF01",
  copyFail: "\u590D\u5236\u5931\u8D25\uFF01",
  openInPlayground: "\u5728 Playground \u4E2D\u6253\u5F00"
}, Ti = {
  openInStackblitz: "Open In Stackblitz",
  openInCodeSandbox: "Open In Codesandbox",
  openInGithub: "Open in GitHub",
  openInGitlab: "Open in GitLab",
  collapseCode: "Collapse Code",
  expandCode: "Expand Code",
  copyCode: "Copy Code",
  copySuccess: "The code has been copied to the clipboard!",
  copyFail: "Failed to copy the code!",
  openInPlayground: "Open in Playground"
}, ft = K({
  "zh-CN": zt,
  "en-US": Ti
}), q = K(zt), wr = (e) => {
  ft.value = {};
  for (const n in e)
    e[n] === "zh-CN" ? ft.value[n] = zt : e[n] === "en-US" ? ft.value[n] = Ti : ft.value[n] = e[n];
  typeof document < "u" && (q.value = ft.value[document.documentElement.getAttribute("lang") || "zh-CN"]);
};
let It;
function xr() {
  typeof MutationObserver < "u" && typeof document < "u" && (It = new MutationObserver((e) => {
    e.forEach((n) => {
      if (n.type === "attributes" && n.attributeName === "lang") {
        const t = document.documentElement.getAttribute("lang");
        t && (q.value = ft.value[t] || zt);
      }
    });
  })), It.observe(document.documentElement, {
    attributes: !0,
    attributeFilter: ["lang"]
  });
}
function Er() {
  It && It.disconnect();
}
const Or = { style: { "flex-shrink": "0" } }, Tr = ["innerHTML"], kr = ["onClick"], Sr = ["onClick"], Cr = { class: "language-html" }, Rr = ["innerHTML"], jr = /* @__PURE__ */ gt({
  __name: "index",
  props: {
    title: { default: "\u6807\u9898" },
    description: { default: "\u63CF\u8FF0\u5185\u5BB9" },
    reactComponent: {},
    svelteComponent: {},
    solidComponent: {},
    vueCode: {},
    reactCode: {},
    svelteCode: {},
    solidCode: {},
    htmlCode: {},
    order: { default: "vue,react,svelte,solid,html" },
    visible: { type: Boolean, default: !0 },
    select: { default: R.VUE },
    github: { default: "" },
    gitlab: { default: "" },
    reactCreateElement: {},
    reactCreateRoot: {},
    svelteMount: {},
    svelteUnmount: {},
    solidRender: {},
    solidCreateComponent: {},
    stackblitz: {},
    codesandbox: {},
    scope: {},
    files: {},
    lightTheme: {},
    darkTheme: {},
    theme: {},
    locale: {},
    htmlWriteWay: { default: "write" },
    background: {},
    htmlPlayground: {},
    vuePlayground: {},
    reactPlayground: {},
    sveltePlayground: {},
    solidPlayground: {}
  },
  emits: ["mount"],
  setup(e, { emit: n }) {
    const t = e, i = n;
    Ai(() => {
      i("mount"), r(), xr();
    }), Ot(() => {
      Er();
    });
    function r() {
      if (t.locale)
        try {
          wr(JSON.parse(decodeURIComponent(t.locale)));
        } catch (k) {
          console.error(k);
        }
    }
    const _ = Z(() => JSON.parse(decodeURIComponent(t.stackblitz || "{}"))), d = Z(() => JSON.parse(decodeURIComponent(t.codesandbox || "{}"))), u = K(""), o = Z(() => {
      var F;
      const M = JSON.parse(decodeURIComponent(t.files || "{}"))[f.value];
      return M && !M[u.value] && (u.value = ((F = Object.keys(M)) == null ? void 0 : F[0]) || ""), M;
    }), b = Z(() => t.order.split(",").map((k) => k.trim())), m = Ce("coot-code-type", {}), v = Ce(
      "set-coot-code-type",
      (k) => {
      }
    ), f = K(R.VUE);
    function S(k) {
      f.value = k, typeof v == "function" && v(k);
    }
    const j = Z(() => f.value === "react" || f.value === "solid" ? "tsx" : f.value), C = Ft(), { isCodeFold: h, setCodeFold: a } = Kn(), { clickCopy: c } = zn(), T = Z(() => o.value && o.value[u.value] ? o.value[u.value].code : t[`${f.value}Code`]), w = Z(() => t[`${f.value}Code`]), O = K("");
    Li(async () => {
      await l(), g();
    });
    async function l() {
      var k;
      O.value = await ji(T.value || "", {
        lang: ((k = o.value[u.value]) == null ? void 0 : k.filename.split(".").pop()) || j.value,
        themes: {
          dark: t.darkTheme || "github-dark",
          light: t.lightTheme || "github-light"
        }
      });
    }
    function g() {
      setTimeout(() => {
        lt.value && !h.value && (lt.value.style.height = Oe.value.scrollHeight + "px");
      });
    }
    const p = Z(() => [
      R.VUE,
      R.REACT,
      R.SVELTE,
      R.SOLID,
      R.HTML
    ].filter((k) => t[`${k}Code`]).sort((k, M) => b.value.indexOf(k) - b.value.indexOf(M))), E = {
      [R.VUE]: Vs,
      [R.REACT]: Xs,
      [R.SVELTE]: Ys,
      [R.SOLID]: nr,
      [R.HTML]: or
    };
    G(
      () => m == null ? void 0 : m.value,
      (k) => {
        k && t[`${k}Code`] && (f.value = k);
      },
      { immediate: !0 }
    );
    const s = () => {
      window.open(t.github, "_blank");
    }, y = () => {
      window.open(t.gitlab, "_blank");
    };
    G(
      () => f.value,
      (k) => {
        !k || (k === "html" ? Y() : k === "react" ? bt() : k === "svelte" ? Kt() : k === "solid" && Vt());
      },
      {
        immediate: !0
      }
    );
    const x = async () => {
      const k = await c(T.value || "");
      br.open(
        k ? q.value.copySuccess : q.value.copyFail,
        k
      );
    }, A = Z(() => t[`${f.value}Playground`]), D = () => {
      window.open(A.value, "_blank");
    }, B = K();
    let $;
    function Y() {
      yt(() => {
        if (!B.value || !t.htmlCode)
          return;
        const k = B.value.querySelector("iframe"), M = document.head.querySelectorAll("style"), F = document.head.querySelectorAll('link[as="style"]'), qt = document.head.querySelectorAll('link[as="font"]'), Te = Array.from(M).map((rt) => `<style replace="true">${rt.innerText}</style>`).join(`
`), ke = Array.from(F).map((rt) => rt.outerHTML).join(`
`), Se = Array.from(qt).map((rt) => rt.outerHTML).join(`
`);
        let st = k.contentDocument || k.contentWindow.document;
        typeof st.write == "function" && t.htmlWriteWay === "write" ? (st.open(), st.write(
          ni({
            code: t.htmlCode || "",
            styles: Te,
            links: ke + `
` + Se
          })
        ), st.close()) : (k.srcdoc = ni({
          code: t.htmlCode || "",
          styles: Te,
          links: ke + `
` + Se
        }), k.onload = () => {
          st = k.contentDocument || k.contentWindow.document;
        });
        const Si = $ = function() {
          requestAnimationFrame(() => {
            const rt = st.documentElement.offsetHeight + "px";
            k.style.height = rt, B.value && (B.value.style.height = rt), st.documentElement && (st.documentElement.className = document.documentElement.className), Si === $ && $();
          });
        };
        $();
      });
    }
    const et = K();
    let z = null;
    function bt() {
      yt(() => {
        t.reactComponent && f.value === "react" && t.reactCode && (z || (z = t.reactCreateRoot(et.value)), z.render(t.reactCreateElement(t.reactComponent, {}, null)));
      });
    }
    Ot(() => {
      z && (z.unmount(), z = null);
    });
    const it = K();
    let X = null, ut = null;
    async function Kt() {
      if (await yt(), t.svelteComponent && f.value === "svelte" && t.svelteCode && it.value)
        try {
          if (!t.svelteMount || !t.svelteUnmount)
            return;
          X && ut && (ut(X), X = null), ut = t.svelteUnmount, X = t.svelteMount(t.svelteComponent, {
            target: it.value
          });
        } catch (k) {
          console.error(
            "[vitepress-demo-plugin] Failed to mount Svelte component. Please make sure svelte(v5+) is installed.",
            k
          );
        }
    }
    Ot(() => {
      X && ut && (ut(X), X = null);
    }), G(
      () => [it.value, t.svelteComponent],
      () => {
        it.value && f.value === "svelte" ? Kt() : !it.value && X && ut && (ut(X), X = null);
      },
      { immediate: !0, deep: !0 }
    ), G(
      () => t.svelteCode,
      (k, M) => {
        k && k !== M && X && Kt();
      },
      { immediate: !0, deep: !0 }
    );
    const ht = K();
    let Q = null;
    async function Vt() {
      if (await yt(), t.solidComponent && f.value === "solid" && t.solidCode && ht.value)
        try {
          if (!t.solidRender || !t.solidCreateComponent)
            return;
          Q && (Q(), Q = null), Q = t.solidRender(
            () => t.solidCreateComponent(t.solidComponent, {}),
            ht.value
          );
        } catch (k) {
          console.error(
            "[vitepress-demo-plugin] Failed to mount Solid component. Please make sure solid-js is installed.",
            k
          );
        }
    }
    Ot(() => {
      Q && (Q(), Q = null);
    }), G(
      () => [ht.value, t.solidComponent],
      () => {
        ht.value && f.value === "solid" ? Vt() : !ht.value && Q && (Q(), Q = null);
      },
      { immediate: !0, deep: !0 }
    ), G(
      () => t.solidCode,
      (k, M) => {
        k && k !== M && Q && Vt();
      },
      { immediate: !0, deep: !0 }
    ), G(
      () => [et.value, t.reactComponent],
      (k) => {
        et.value ? bt() : z && (z.unmount(), z = null);
      },
      { immediate: !0, deep: !0 }
    ), G(
      () => t.reactCode,
      (k, M) => {
        k && k !== M && z && z.render(t.reactCreateElement(t.reactComponent, {}, null));
      },
      { immediate: !0, deep: !0 }
    ), G(
      () => t.select,
      (k) => {
        k && t[`${k}Code`] && (f.value = k);
      },
      {
        immediate: !0
      }
    ), G(
      () => p.value,
      () => {
        t[`${f.value}Code`] || (f.value = p.value[0]);
      },
      { immediate: !0, deep: !0 }
    );
    function ki(k) {
      u.value = k, lt.value && (lt.value.style.height = "auto");
    }
    const lt = K(), Oe = K();
    return G(
      () => h.value,
      (k) => {
        yt(async () => {
          lt.value && (k ? lt.value.style.height = 0 : (await l(), g()));
        });
      }
    ), (k, M) => (L(), I("div", {
      class: U([P(C).e("container")])
    }, [
      N("section", {
        class: U([P(C).bem("preview"), "vp-raw"]),
        style: _i({ background: t.background })
      }, [
        f.value === "vue" ? le(k.$slots, "vue", {}, void 0, void 0, 0) : f.value === "html" ? (L(), I("div", {
          key: 1,
          ref_key: "htmlContainerRef",
          ref: B
        }, [...M[3] || (M[3] = [
          N("iframe", { style: { width: "100%", height: "auto", border: "none" } }, null, -1)
        ])], 512)) : f.value === "react" ? (L(), I("div", {
          key: 2,
          ref_key: "reactContainerRef",
          ref: et
        }, null, 512)) : f.value === "svelte" ? (L(), I("div", {
          key: 3,
          ref_key: "svelteContainerRef",
          ref: it
        }, null, 512)) : f.value === "solid" ? (L(), I("div", {
          key: 4,
          ref_key: "solidContainerRef",
          ref: ht
        }, null, 512)) : V("", !0)
      ], 6),
      N("section", {
        class: U([P(C).bem("description")])
      }, [
        e.title ? (L(), I("div", {
          key: 0,
          class: U([P(C).bem("description", "title")])
        }, [
          N("div", Or, dt(e.title), 1)
        ], 2)) : V("", !0),
        e.description ? (L(), I("div", {
          key: 1,
          class: U([P(C).bem("description", "content")]),
          innerHTML: e.description
        }, null, 10, Tr)) : V("", !0),
        t.description || !t.title && !t.description ? (L(), I("div", {
          key: 2,
          class: U([P(C).bem("description", "split-line")])
        }, null, 2)) : V("", !0),
        p.value.length > 1 && e.visible ? (L(), I("div", {
          key: 3,
          class: U([P(C).bem("lang-tabs")])
        }, [
          (L(!0), I(Re, null, Ae(p.value, (F) => (L(), I("div", {
            key: F,
            class: U([P(C).bem("tab"), f.value === F && P(C).bem("active-tab")]),
            onClick: (qt) => S == null ? void 0 : S(F)
          }, [
            (L(), J(Ni(E[F]), {
              class: U(P(C).bem("tab-icon"))
            }, null, 8, ["class"])),
            pe(" " + dt(F), 1)
          ], 10, kr))), 128))
        ], 2)) : V("", !0),
        N("div", {
          class: U([P(C).bem("description", "handle-btn")])
        }, [
          _.value.show ? (L(), J(at, {
            key: 0,
            content: P(q).openInStackblitz
          }, {
            default: nt(() => [
              tt(js, {
                code: w.value,
                type: f.value,
                scope: e.scope || "",
                templates: _.value.templates || [],
                files: o.value
              }, null, 8, ["code", "type", "scope", "templates", "files"])
            ]),
            _: 1
          }, 8, ["content"])) : V("", !0),
          d.value.show ? (L(), J(at, {
            key: 1,
            content: P(q).openInCodeSandbox
          }, {
            default: nt(() => [
              tt(es, {
                code: w.value,
                type: f.value,
                scope: e.scope || "",
                templates: d.value.templates || [],
                files: o.value
              }, null, 8, ["code", "type", "scope", "templates", "files"])
            ]),
            _: 1
          }, 8, ["content"])) : V("", !0),
          A.value ? (L(), J(at, {
            key: 2,
            content: P(q).openInPlayground
          }, {
            default: nt(() => [
              tt(Vi, { onClick: D })
            ]),
            _: 1
          }, 8, ["content"])) : V("", !0),
          e.github ? (L(), J(at, {
            key: 3,
            content: P(q).openInGithub
          }, {
            default: nt(() => [
              tt(Bs, { onClick: s })
            ]),
            _: 1
          }, 8, ["content"])) : V("", !0),
          e.gitlab ? (L(), J(at, {
            key: 4,
            content: P(q).openInGitlab
          }, {
            default: nt(() => [
              tt(Us, { onClick: y })
            ]),
            _: 1
          }, 8, ["content"])) : V("", !0),
          P(h) ? (L(), J(at, {
            key: 6,
            content: P(q).expandCode
          }, {
            default: nt(() => [
              tt(Bi, {
                onClick: M[1] || (M[1] = (F) => P(a)(!1))
              })
            ]),
            _: 1
          }, 8, ["content"])) : (L(), J(at, {
            key: 5,
            content: P(q).collapseCode
          }, {
            default: nt(() => [
              tt(Ui, {
                onClick: M[0] || (M[0] = (F) => P(a)(!0))
              })
            ]),
            _: 1
          }, 8, ["content"])),
          tt(at, {
            content: P(q).copyCode
          }, {
            default: nt(() => [
              tt(Xi, { onClick: x })
            ]),
            _: 1
          }, 8, ["content"])
        ], 2)
      ], 2),
      N("section", {
        class: U([P(C).bem("source")]),
        ref_key: "sourceRef",
        ref: lt
      }, [
        N("div", {
          ref_key: "sourceContentRef",
          ref: Oe
        }, [
          Object.keys(o.value).length ? (L(), I("div", {
            key: 0,
            class: U([P(C).bem("file-tabs")])
          }, [
            (L(!0), I(Re, null, Ae(Object.keys(o.value), (F) => (L(), I("div", {
              key: F,
              class: U([
                P(C).bem("tab"),
                u.value === F && P(C).bem("active-tab")
              ]),
              onClick: (qt) => ki(F)
            }, dt(F), 11, Sr))), 128))
          ], 2)) : V("", !0),
          N("pre", Cr, [
            N("div", { innerHTML: O.value }, null, 8, Rr)
          ])
        ], 512)
      ], 2),
      P(h) ? V("", !0) : (L(), I("div", {
        key: 0,
        class: U(P(C).bem("fold")),
        onClick: M[2] || (M[2] = (F) => P(a)(!0))
      }, [
        tt(Yi),
        pe(dt(P(q).collapseCode), 1)
      ], 2))
    ], 2));
  }
});
const Ar = /* @__PURE__ */ gt({
  __name: "placeholder",
  setup(e) {
    const n = Ft("placeholder");
    return (t, i) => (L(), I("div", {
      class: U([P(n).e("container")])
    }, [...i[0] || (i[0] = [
      N("div", { class: "loader" }, null, -1),
      N("div", { class: "loading-text" }, "loading", -1)
    ])], 2));
  }
});
const Dr = /* @__PURE__ */ W(Ar, [["__scopeId", "data-v-aa366e4c"]]);
export {
  jr as _,
  Dr as p
};
