import { createSignal as Ce, createMemo as q, createEffect as tt, onMount as Tt, onCleanup as pt, createContext as Go, useContext as Uo, createRoot as jo, on as ht, mergeProps as Zo, Show as _e, For as Ct } from "solid-js";
import { template as ge, delegateEvents as Mt, insert as oe, memo as Ue, createComponent as z, effect as pe, setAttribute as ft, style as ze, use as Et, addEventListener as St, spread as Vt, mergeProps as mn, className as Sn, setStyleProperty as $t, Dynamic as qn, render as Jo } from "solid-js/web";
const Gn = 100, Qo = 100, Mn = 200, zt = 28, An = {
  light: { from: "#71a2fd", to: "#fff" },
  dark: { from: "#1e4c99", to: "#181c21" }
}, er = 2e3, tr = "highlight-row", nr = "highlight-cell", Un = Qn("chrome"), or = Qn("firefox"), rr = Un < 56 || or < 59, lr = Un < 85, ir = "stk", Hn = "expanded-", jn = "--", Yt = {
  emptyToBottom: !1,
  stringLocaleCompare: !1,
  sortChildren: !1
}, _n = {
  enabled: !0,
  disabled: () => !1,
  revokable: !0
};
function qt(t, e) {
  let i = t == null;
  return e && (i = i || typeof t == "boolean" || Number.isNaN(+t)), i;
}
function pl(t, e, i, r = {}) {
  const { dataIndex: l, sortField: f, order: c } = t;
  let { sortType: E } = t;
  const _ = f || l;
  E || (E = typeof e[_]);
  const u = E === "number", g = i.slice();
  if (!c || !g.length)
    return g.unshift(e), g;
  const { emptyToBottom: s, customCompare: v, stringLocaleCompare: w } = { emptyToBottom: !1, ...r }, L = e[_];
  if (s && qt(L, u))
    g.push(e);
  else {
    const T = c === "asc", I = v || ((m, y) => {
      const p = m[_], D = wn(p, L, u, w);
      return T ? D : -D;
    }), x = Zn(g, (m) => I(g[m], e));
    g.splice(x, 0, e);
  }
  return g;
}
function Zn(t, e) {
  let i = 0, r = t.length - 1;
  for (; i <= r; ) {
    const l = Math.floor((i + r) / 2), f = e(l);
    if (f === 0) {
      i = l;
      break;
    } else f < 0 ? i = l + 1 : r = l - 1;
  }
  return i;
}
function wn(t, e, i, r = !1) {
  let l = t, f = e;
  if (i)
    l = +t, f = +e;
  else if (r)
    return String(t).localeCompare(e);
  return l > f ? 1 : l === f ? 0 : -1;
}
function sr(t, e, i) {
  const r = [], l = [], f = t.sortField || t.dataIndex;
  for (let c = 0, E = e.length; c < E; c++) {
    const _ = e[c];
    qt(_ == null ? void 0 : _[f], i) ? r.push(_) : l.push(_);
  }
  return [l, r];
}
function vn(t, e, i, r = {}) {
  if (!(i != null && i.length) || !t) return i || [];
  r = { ...Yt, ...r };
  let l = i.slice(), f = t.sortField || t.dataIndex;
  const { defaultSort: c, stringLocaleCompare: E, emptyToBottom: _, sortChildren: u } = r;
  if (!e && c && (e = c.order, f = c.dataIndex), typeof t.sorter == "function") {
    const g = t.sorter(l, { order: e, column: t });
    g && (l = g), u && l.forEach((s) => {
      var v;
      (v = s.children) != null && v.length && (s.children = vn(t, e, s.children, r));
    });
  } else if (e) {
    let { sortType: g } = t;
    g || (g = typeof i[0][f]);
    const s = g === "number", [v, w] = sr(t, l, s);
    e === "asc" ? v.sort((L, T) => wn(L[f], T[f], s, E)) : v.sort((L, T) => wn(T[f], L[f], s, E)), l = e === "desc" || _ ? v.concat(w) : w.concat(v), u && l.forEach((L) => {
      var T;
      (T = L.children) != null && T.length && (L.children = vn(t, e, L.children, r));
    });
  }
  return l;
}
function Jn(t, e = 0) {
  const i = [e];
  return t.forEach((r) => {
    var l;
    (l = r.children) != null && l.length && i.push(Jn(r.children, e + 1));
  }), Math.max(...i);
}
function sn(t) {
  if (t === void 0) return;
  const e = Number(t);
  return t + (Number.isNaN(e) ? "" : "px");
}
function Qn(t) {
  try {
    const e = new RegExp(`${t}/\\d+`, "i"), i = navigator.userAgent.match(e);
    if (i)
      return +i[0].split("/")[1];
  } catch (e) {
    console.error("Cannot get version", e);
  }
  return 100;
}
function Fn(t, e) {
  return t + jn + e;
}
function bt(t) {
  return t == null ? void 0 : t.closest("tr");
}
function cn(t) {
  return t == null ? void 0 : t.closest("th");
}
function Gt(t) {
  return t == null ? void 0 : t.closest("td");
}
function gt(t) {
  const e = bt(t);
  return e ? Number(e.dataset.rowI) : -1;
}
function Pt(t) {
  var e;
  return (e = Gt(t)) == null ? void 0 : e.dataset.colKey;
}
function cr(t, e) {
  let i, r = null;
  const l = () => {
    r && (t(...r), r = null);
  };
  return function(...f) {
    r = f, i || (l(), i = self.setTimeout(() => {
      l(), i = 0;
    }, e));
  };
}
function eo(t) {
  let e = null, i = null;
  const r = () => {
    i && (t(...i), i = null);
  };
  return function(...l) {
    i = l, e === null && (e = requestAnimationFrame(() => {
      r(), e = null;
    }));
  };
}
function ar(t) {
  const e = t.minWidth ?? t.width ?? Gn;
  return typeof e == "number" ? Math.floor(e) : parseInt(e);
}
function lt(t) {
  return (t == null ? void 0 : t.__W__) || Gn;
}
function ur() {
  let t = window.__STK_TB_ID_COUNT__;
  return t || (t = 0), t += 1, window.__STK_TB_ID_COUNT__ = t, ir + t.toString(36);
}
const to = "stkName";
function fr(t, e, i, r, l, f, c, E, _, u, g, s) {
  const T = "ArrowUp", I = "ArrowDown", x = "ArrowLeft", m = "ArrowRight", p = "Escape", R = "data-cs-s", M = "data-cs-t", H = "data-cs-b", O = "data-cs-l", S = "data-cs-r", b = "data-rs-s", [A, ee] = Ce([]), [X, we] = Ce(!1);
  let G = null, re = 0, Ee = 0, De = 0;
  const fe = q(() => {
    if (typeof t.areaSelection == "boolean") {
      const F = t.areaSelection;
      return { enabled: F, keyboard: F, ctrl: F, shift: F, highlight: { cell: F, row: !1 } };
    }
    const { highlight: a, ...$ } = t.areaSelection || {};
    return {
      enabled: !0,
      ctrl: !0,
      shift: !0,
      highlight: {
        cell: !0,
        row: !1,
        ...a
      },
      ...$
    };
  }), Xe = q(() => fe().keyboard), it = q(() => fe().ctrl), V = q(() => fe().shift), K = q(() => {
    var a;
    return (a = fe().highlight) == null ? void 0 : a.cell;
  }), se = q(() => {
    var a;
    return (a = fe().highlight) == null ? void 0 : a.row;
  }), ae = q(() => {
    const a = l(), $ = /* @__PURE__ */ new Map();
    for (let F = 0; F < a.length; F++)
      $.set(f()(a[F]), F);
    return $;
  }), de = q(() => {
    var te, J;
    const a = l(), $ = new Array(a.length + 1).fill(0), F = new Array(a.length + 1).fill(0);
    let W = 0;
    for (let N = 0; N < a.length; N++)
      $[N] = W, ((te = a[N]) == null ? void 0 : te.fixed) === "left" && (W += lt(a[N]));
    $[a.length] = W;
    let le = 0;
    for (let N = a.length - 1; N >= 0; N--)
      F[N] = le, ((J = a[N]) == null ? void 0 : J.fixed) === "right" && (le += lt(a[N]));
    return (N) => [$[N] ?? 0, F[N + 1] ?? 0];
  });
  let he = /* @__PURE__ */ new Set();
  function $e() {
    const a = A();
    if (!a.length) {
      he = /* @__PURE__ */ new Set();
      return;
    }
    const $ = /* @__PURE__ */ new Set(), F = l(), W = r();
    for (const le of a) {
      const {
        begin: { row: te, col: J },
        end: { row: N, col: Q }
      } = le.index, [U, Y] = te < N ? [te, N] : [N, te], [ie, j] = J < Q ? [J, Q] : [Q, J];
      for (let Z = U; Z <= Y; Z++) {
        const ce = W[Z];
        if (ce)
          for (let be = ie; be <= j; be++) {
            const We = F[be];
            We && $.add(c(ce, We));
          }
      }
    }
    he = $;
  }
  function Pe() {
    const a = i();
    if (!a) return;
    const $ = K(), F = se(), W = a.querySelectorAll(`[${R}]`);
    for (let N = 0; N < W.length; N++) {
      const Q = W[N];
      Q.removeAttribute(R), Q.removeAttribute(M), Q.removeAttribute(H), Q.removeAttribute(O), Q.removeAttribute(S);
    }
    const le = a.querySelectorAll(`[${b}]`);
    for (let N = 0; N < le.length; N++)
      le[N].removeAttribute(b);
    $e();
    const te = A();
    if (!te.length) return;
    const J = a.querySelector(".stk-tbody-main");
    if (J) {
      if (F)
        for (const N of te) {
          const { minRow: Q, maxRow: U } = ve(N);
          for (let Y = Q; Y <= U; Y++) {
            const ie = J.querySelector(`tr[data-row-i="${Y}"]`);
            ie && ie.setAttribute(b, "");
          }
        }
      if ($) {
        const N = te[te.length - 1], { minRow: Q, maxRow: U, minCol: Y, maxCol: ie } = ve(N), j = J.querySelectorAll("tr[data-row-i]");
        for (let Z = 0; Z < j.length; Z++) {
          const ce = j[Z], be = parseInt(ce.getAttribute("data-row-i"), 10);
          let We = !1;
          for (const Je of te) {
            const { minRow: Ge, maxRow: ct } = ve(Je);
            if (be >= Ge && be <= ct) {
              We = !0;
              break;
            }
          }
          if (!We) continue;
          const Ke = ce.querySelectorAll("td[data-col-key]");
          for (let Je = 0; Je < Ke.length; Je++) {
            const Ge = Ke[Je], ct = Ge.getAttribute("data-col-key"), Qe = ae().get(ct);
            if (Qe === void 0 || Qe < 0) continue;
            const Re = r()[be], me = l();
            if (!Re || !me[Qe]) continue;
            const ot = c(Re, me[Qe]);
            if (!he.has(ot)) continue;
            if (Ge.setAttribute(R, ""), be >= Q && be <= U && Qe >= Y && Qe <= ie) {
              const Zt = be + (parseInt(Ge.getAttribute("rowspan") || "1", 10) || 1) - 1, Jt = Qe + (parseInt(Ge.getAttribute("colspan") || "1", 10) || 1) - 1;
              be === Q && Ge.setAttribute(M, ""), Zt === U && Ge.setAttribute(H, ""), Qe === Y && Ge.setAttribute(O, ""), Jt === ie && Ge.setAttribute(S, "");
            }
          }
        }
      }
    }
  }
  tt(() => {
    const a = A(), $ = _(), F = u();
    a.length, a.length > 0 && JSON.stringify(a.map((W) => W.index)), F.scrollLeft, $.startIndex, $.endIndex, F.startIndex, F.endIndex, r().length, l().length, queueMicrotask(Pe);
  }), Tt(() => {
    Se();
  }), pt(() => {
    ye();
  }), tt(() => {
    const a = r().length, $ = l().length;
    if (!fe().enabled || (G && (a === 0 || $ === 0 ? G = null : (G.rowIndex = ke(G.rowIndex, 0, a - 1), G.colIndex = ke(G.colIndex, 0, $ - 1))), !A().length)) return;
    if (a === 0 || $ === 0) {
      Ht(), Ze();
      return;
    }
    const F = a - 1, W = $ - 1;
    let le = !1;
    const te = [];
    for (const J of A()) {
      const { begin: N, end: Q } = J.index, U = ke(N.row, 0, F), Y = ke(N.col, 0, W), ie = ke(Q.row, 0, F), j = ke(Q.col, 0, W);
      U !== N.row || Y !== N.col || ie !== Q.row || j !== Q.col ? (le = !0, te.push(Ae(U, Y, ie, j))) : te.push(J);
    }
    le && (ee(te), Ze());
  });
  function Se() {
    var a;
    ye(), (a = i()) == null || a.addEventListener("keydown", Dt);
  }
  function ye() {
    var a;
    (a = i()) == null || a.removeEventListener("keydown", Dt), document.removeEventListener("mousemove", Te), document.removeEventListener("mouseup", je), yt();
  }
  function ve(a) {
    const { begin: $, end: F } = a.index;
    return {
      minRow: Math.min($.row, F.row),
      maxRow: Math.max($.row, F.row),
      minCol: Math.min($.col, F.col),
      maxCol: Math.max($.col, F.col)
    };
  }
  function Ae(a, $, F, W) {
    return {
      index: {
        x: [$, W],
        y: [a, F],
        begin: { row: a, col: $ },
        end: { row: F, col: W }
      }
    };
  }
  function He(a) {
    return a ? ae().get(a) ?? -1 : -1;
  }
  function Ye(a, $) {
    const F = r(), W = l(), le = F[a], te = W[$];
    if (!le || !te || !te.mergeCells) return [1, 1];
    const { rowspan: J = 1, colspan: N = 1 } = te.mergeCells({ row: le, col: te, rowIndex: a, colIndex: $ }) || {};
    return [J || 1, N || 1];
  }
  function Ie(a) {
    var wt;
    const { minRow: $, maxRow: F, minCol: W, maxCol: le } = ve(a), te = r(), J = l(), N = te.length, Q = J.length, U = [];
    for (let Re = 0; Re < Q; Re++)
      (wt = J[Re]) != null && wt.mergeCells && U.push(Re);
    if (!U.length) return a;
    let [Y, ie, j, Z] = [$, F, W, le], ce = !0, be = 0;
    for (; ce && be++ < 100; ) {
      ce = !1;
      for (const Re of U) {
        if (Re < j || Re > Z) continue;
        const [me] = Ye(ie, Re);
        me > 1 && ie + me - 1 < N && ie + me - 1 > ie && (ie = ie + me - 1, ce = !0);
      }
      for (let Re = Y; Re <= ie; Re++) {
        const [, me] = Ye(Re, Z);
        me > 1 && Z + me - 1 < Q && Z + me - 1 > Z && (Z = Z + me - 1, ce = !0);
      }
      for (const Re of U)
        if (!(Re < j || Re > Z))
          for (let me = Y - 1; me >= 0 && me > Y - 500; me--) {
            const [ot] = Ye(me, Re);
            if (ot <= 1) continue;
            if (me + ot - 1 >= Y)
              me < Y && (Y = me, ce = !0);
            else
              break;
          }
      for (let Re = Y; Re <= ie; Re++)
        for (let me = j - 1; me >= 0 && me > j - 500; me--) {
          const [, ot] = Ye(Re, me);
          if (ot <= 1) continue;
          if (me + ot - 1 >= j)
            me < j && (j = me, ce = !0);
          else
            break;
        }
    }
    if (Y === $ && ie === F && j === W && Z === le)
      return a;
    const { begin: We, end: Ke } = a.index, Je = We.row < Ke.row || We.row === Ke.row ? Y : ie, Ge = We.row < Ke.row || We.row === Ke.row ? ie : Y, ct = We.col <= Ke.col ? j : Z, Qe = We.col <= Ke.col ? Z : j;
    return Ae(Je, ct, Ge, Qe);
  }
  function xe(a) {
    let $ = 0;
    const F = l();
    for (let W = 0; W < F.length; W++) {
      const le = lt(F[W]);
      if (W === a) return [$, le];
      $ += le;
    }
    return [$, 0];
  }
  function Fe(a, $) {
    let F = 0, W = 0;
    switch (a) {
      case T:
        F = -1;
        break;
      case I:
        F = 1;
        break;
      case x:
        W = -1;
        break;
      case m:
        W = 1;
        break;
      case "Tab":
        W = $ ? -1 : 1;
        break;
    }
    return [F, W];
  }
  function ke(a, $, F) {
    return Math.max($, Math.min(a, F));
  }
  function mt(a, $, F, W, le) {
    return F >= le ? [Math.min(a + 1, W - 1), 0] : F < 0 ? [Math.max(a - 1, 0), le - 1] : [a, $];
  }
  function Le(a, $, F) {
    const { top: W, bottom: le, left: te, right: J } = F;
    let N = 0, Q = 0;
    if ($ < W + 40) {
      const U = Math.max(0, W + 40 - $);
      Q = -Math.ceil(U / 40 * 15);
    } else if ($ > le - 40) {
      const U = Math.max(0, $ - (le - 40));
      Q = Math.ceil(U / 40 * 15);
    }
    if (a < te + 40) {
      const U = Math.max(0, te + 40 - a);
      N = -Math.ceil(U / 40 * 15);
    } else if (a > J - 40) {
      const U = Math.max(0, a - (J - 40));
      N = Math.ceil(U / 40 * 15);
    }
    return { deltaX: N, deltaY: Q };
  }
  function Ne(a) {
    if (!fe().enabled || a.button !== 0) return;
    const $ = gt(a.target), F = Pt(a.target), W = He(F);
    if ($ < 0 || W < 0) return;
    const le = a.ctrlKey || a.metaKey, te = Ie(Ae($, W, $, W));
    if (a.shiftKey && G && V()) {
      const J = A().slice(), N = Ie(
        Ae(G.rowIndex, G.colIndex, $, W)
      );
      J.length ? J[J.length - 1] = N : J.push(N), ee(J);
    } else
      G = { rowIndex: $, colIndex: W }, le && it() ? ee(A().concat([te])) : ee([te]);
    we(!0), Ee = a.clientX, De = a.clientY, document.addEventListener("mousemove", Te), document.addEventListener("mouseup", je);
  }
  function Te(a) {
    X() && (Ee = a.clientX, De = a.clientY, Be(a), nt());
  }
  function Be(a) {
    const $ = a.target;
    if (!$) return;
    const F = gt($);
    if (Number.isNaN(F) || F < 0) return;
    const W = Pt($), le = He(W);
    le < 0 || Me(F, le);
  }
  function Me(a, $) {
    if (!G) return;
    const F = Ie(
      Ae(G.rowIndex, G.colIndex, a, $)
    ), W = [...A()];
    W.length > 0 ? W[W.length - 1] = F : W.push(F), ee(W);
  }
  function nt() {
    const a = i();
    if (!a) return;
    const $ = a.getBoundingClientRect(), { top: F, bottom: W, left: le, right: te } = $, J = De < F + 40 || De > W - 40 || Ee < le + 40 || Ee > te - 40;
    J && !re ? _t() : !J && re && yt();
  }
  function _t() {
    const a = i();
    if (!a || !X()) {
      yt();
      return;
    }
    const $ = a.getBoundingClientRect(), { deltaX: F, deltaY: W } = Le(Ee, De, $);
    (F !== 0 || W !== 0) && (a.scrollTop += W, a.scrollLeft += F, Wt(a, $)), X() && (F !== 0 || W !== 0) ? re = requestAnimationFrame(_t) : re = 0;
  }
  function Wt(a, $) {
    const F = a.querySelector("thead"), { top: W, bottom: le, left: te, right: J } = $, N = F ? W + F.offsetHeight : W, Q = Math.max(te + 2, Math.min(Ee, J - 2)), U = Math.max(N + 2, Math.min(De, le - 2)), Y = document.elementFromPoint(Q, U);
    if (!Y) return;
    const ie = Gt(Y), j = bt(Y);
    if (!ie || !j) return;
    const Z = gt(j), ce = Pt(ie), be = He(ce);
    Number.isNaN(Z) || Z < 0 || be < 0 || Me(Z, be);
  }
  function yt() {
    re && (cancelAnimationFrame(re), re = 0);
  }
  function je() {
    if (!X()) return;
    we(!1), yt(), document.removeEventListener("mousemove", Te), document.removeEventListener("mouseup", je);
    const a = A();
    if (a.length) {
      const $ = Ie(a[a.length - 1]);
      if ($ !== a[a.length - 1]) {
        const F = [...a];
        F[F.length - 1] = $, ee(F);
      }
    }
    Ze();
  }
  function Ze() {
    var a;
    (a = e.onAreaSelectionChange) == null || a.call(e, A());
  }
  function At() {
    const a = fe();
    return typeof a.formatCellForClipboard == "function" ? a.formatCellForClipboard : null;
  }
  function Rt() {
    const a = A();
    if (!a.length) return "";
    const $ = a[a.length - 1], { minRow: F, maxRow: W, minCol: le, maxCol: te } = ve($), J = r(), N = l(), Q = At(), U = [];
    for (let ie = F; ie <= W; ie++) {
      const j = J[ie];
      if (!j) continue;
      const Z = [];
      for (let ce = le; ce <= te; ce++) {
        const be = N[ce];
        if (!be) {
          Z.push("");
          continue;
        }
        const We = j[be.dataIndex];
        Z.push(Q ? Q(j, be, We) : We ? String(We) : "");
      }
      U.push(Z.join("	"));
    }
    const Y = U.join(`
`);
    return navigator.clipboard.writeText(Y).catch(() => {
      console.warn("Failed to copy to clipboard");
    }), Y;
  }
  function at() {
    const a = i(), $ = document.activeElement;
    a && $ && a.contains($) && $ !== a && a.focus({ preventScroll: !0 });
  }
  function Dt(a) {
    if (!fe().enabled) return;
    const $ = a.key;
    if ($ === p || $ === "Esc") {
      at(), A().length && a.preventDefault();
      return;
    }
    if ((a.ctrlKey || a.metaKey) && $ === "c" && A().length) {
      Rt(), a.preventDefault();
      return;
    }
    if (!Xe()) return;
    const F = [T, I, x, m].includes($), W = $ === "Tab";
    if (!(F || W)) return;
    a.preventDefault();
    const te = r().length, J = l().length;
    if (te === 0 || J === 0) return;
    if (!A().length) {
      G = { rowIndex: 0, colIndex: 0 }, ee([Ae(0, 0, 0, 0)]), Ze(), ut(0, 0);
      return;
    }
    const [N, Q] = Fe($, a.shiftKey);
    if (a.shiftKey && F && V()) {
      at();
      const U = [...A()], Y = U.length > 0 ? U[U.length - 1] : null;
      if (!Y) return;
      const { begin: ie, end: j } = Y.index;
      let Z = j.row + N, ce = j.col + Q;
      Z = ke(Z, 0, te - 1), ce = ke(ce, 0, J - 1), U[U.length - 1] = Ae(ie.row, ie.col, Z, ce), ee(U), ut(Z, ce);
    } else {
      at();
      const U = A(), Y = U.length > 0 ? U[U.length - 1] : null, ie = Y ? ve(Y).minRow : 0, j = Y ? ve(Y).minCol : 0;
      let Z = ie + N, ce = j + Q;
      if (Z = ke(Z, 0, te - 1), ce = ke(ce, 0, J - 1), W) {
        const be = j + Q, [We, Ke] = mt(ie, ce, be, te, J);
        Z = We, ce = Ke;
      }
      G = { rowIndex: Z, colIndex: ce }, ee([Ae(Z, ce, Z, ce)]), ut(Z, ce);
    }
    Ze();
  }
  function ut(a, $) {
    const F = i();
    if (!F) return;
    const W = r()[a], le = l()[$];
    if (!W || !le) return;
    const te = F.querySelector("thead"), J = te ? te.offsetHeight : 0, N = F.querySelector("tfoot"), Q = N ? N.offsetHeight : 0, U = _(), Y = u(), ie = t.scrollRowByRow, j = U.rowHeight, Z = a * j, ce = Z + j, be = ie ? U.scrollTop : F.scrollTop, We = be + U.containerHeight - J - Q;
    let Ke = null;
    Z < be ? Ke = Z : ce > We && (Ke = ce - (U.containerHeight - J - Q));
    const [Je, Ge] = xe($), ct = Je + Ge, Qe = F.scrollLeft, wt = Qe + Y.containerWidth, [Re, me] = de()($);
    let ot = null;
    Je < Qe + Re ? ot = Je - Re : ct > wt - me && (ot = ct - Y.containerWidth + me), (Ke !== null || ot !== null) && E(Ke, ot);
  }
  function Ut() {
    const a = A();
    if (!a.length) return { rows: [], cols: [], ranges: [] };
    const $ = r(), F = l(), W = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Set();
    for (const N of a) {
      const { minRow: Q, maxRow: U, minCol: Y, maxCol: ie } = ve(N);
      for (let j = Q; j <= U; j++) W.add(j);
      for (let j = Y; j <= ie; j++) le.add(j);
    }
    const te = [...W].sort((N, Q) => N - Q), J = [...le].sort((N, Q) => N - Q);
    return {
      rows: te.map((N) => $[N]).filter(Boolean),
      cols: J.map((N) => F[N]).filter(Boolean),
      ranges: a.map((N) => ({ ...N }))
    };
  }
  function Ht() {
    ee([]), we(!1);
  }
  function jt(a, $ = {}) {
    if (!fe().enabled) return A();
    const { silent: F = !1, scrollToView: W = !1 } = $, le = r().length, te = l().length;
    if (le <= 0 || te <= 0)
      return Ht(), F || Ze(), A();
    const J = le - 1, N = te - 1;
    let Q = 0, U = J, Y = 0, ie = N;
    if (a) {
      const j = a.begin, Z = a.end ?? j;
      Q = typeof j.row == "number" ? j.row : g(j.row), U = typeof Z.row == "number" ? Z.row : g(Z.row);
      const ce = typeof j.col == "number" ? j.col : j.col ? s(j.col) : void 0, be = typeof Z.col == "number" ? Z.col : Z.col ? s(Z.col) : void 0;
      ce !== void 0 ? (Y = ce, ie = be !== void 0 ? be : ce) : be !== void 0 && (Y = 0, ie = be);
    }
    return Q = ke(Q, 0, J), U = ke(U, 0, J), Y = ke(Y, 0, N), ie = ke(ie, 0, N), ee([Ae(Q, Y, U, ie)]), G = { rowIndex: Q, colIndex: Y }, we(!1), W && ut(U, ie), F || Ze(), A();
  }
  return {
    config: fe,
    isSelecting: X,
    get: Ut,
    set: jt,
    clear: Ht,
    copy: Rt,
    onMD: Ne
  };
}
const bn = "useAreaSelection";
fr[to] = bn;
const no = {
  [bn]: ((t) => ("areaSelection" in t && console.warn("useAreaSelection is not registered"), {
    config: q(() => ({ enabled: !1 })),
    isSelecting: Ce(!1)[0],
    onMD: () => {
    },
    // getClass: () => [],
    // getRowClass: () => [],
    get: () => ({ rows: [], cols: [], ranges: [] }),
    set: () => [],
    clear: () => {
    },
    copy: () => ""
  }))
};
function yl(t) {
  (Array.isArray(t) ? t : [t]).forEach((i) => {
    const r = i[to];
    if (!r) {
      console.warn("invalid feature");
      return;
    }
    no[r] = i;
  });
}
var dr = /* @__PURE__ */ ge('<span class=drag-row-handle draggable=true><svg viewBox="0 0 1024 1024"width=20 height=20 fill=currentColor><path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z">');
function On(t) {
  return (() => {
    var e = dr();
    return e.addEventListener("dragstart", (i) => {
      var r;
      return (r = t.onDragStart) == null ? void 0 : r.call(t, i);
    }), e;
  })();
}
var hr = /* @__PURE__ */ ge('<svg xmlns=http://www.w3.org/2000/svg width=16px height=16px viewBox="0 0 16 16"><polygon class=arrow-up fill=#757699 points="8 2 4.8 6 11.2 6"></polygon><polygon class=arrow-down transform="translate(8, 12) rotate(-180) translate(-8, -12) "points="8 10 4.8 14 11.2 14">');
function gr() {
  return hr();
}
var mr = /* @__PURE__ */ ge("<div class=stk-fold-icon>");
function xn(t) {
  return (() => {
    var e = mr();
    return e.$$click = (i) => {
      var r;
      return (r = t.onClick) == null ? void 0 : r.call(t, i);
    }, e;
  })();
}
Mt(["click"]);
var _r = /* @__PURE__ */ ge("<div><span>");
function wr(t) {
  return (() => {
    var e = _r(), i = e.firstChild;
    return oe(e, (() => {
      var r = Ue(() => t.row.children !== void 0);
      return () => r() && z(xn, {
        onClick: (l) => {
          var f;
          return (f = t.onClick) == null ? void 0 : f.call(t, l);
        }
      });
    })(), i), oe(i, () => t.row[t.col.dataIndex] ?? ""), pe((r) => {
      var l = t.row[t.col.dataIndex] || "", f = t.row.__T_LV__ ? `padding-left:${t.row.__T_LV__ * 16}px` : "", c = t.row.children ? void 0 : "padding-left: 16px;";
      return l !== r.e && ft(e, "title", r.e = l), r.t = ze(e, f, r.t), r.a = ze(i, c, r.a), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), e;
  })();
}
const oo = Go(void 0);
function Cn() {
  return Uo(oo);
}
const et = {
  TH: 0,
  TD: 1,
  /** tfoot */
  TF: 2
};
function vr(t, e, i, r) {
  let l = null, f = !1;
  tt(() => {
    i.virtual ? c() : E();
  }), tt(() => {
    i.virtualX ? c() : E();
  }), Tt(() => {
    (i.virtual || i.virtualX) && c();
  }), pt(() => {
    E();
  });
  function c() {
    if (f && E(), window.ResizeObserver) {
      if (!t()) {
        jo((g) => {
          tt(() => {
            t() && (g(), c());
          });
        });
        return;
      }
      l = new ResizeObserver(u), l.observe(t());
    } else
      window.addEventListener("resize", u);
    f = !0;
  }
  function E() {
    f && (l ? (l.disconnect(), l = null) : window.removeEventListener("resize", u), f = !1);
  }
  let _ = 0;
  function u() {
    _ && window.clearTimeout(_), _ = window.setTimeout(() => {
      i.autoResize && (e(), typeof i.autoResize == "function" && i.autoResize()), _ = 0;
    }, r);
  }
}
function xr(t, e, i, r, l, f, c, E) {
  const [_, u] = Ce(!1);
  let g = {
    currentCol: null,
    lastCol: null,
    startX: 0,
    startOffsetTableX: 0,
    revertMoveX: !1
  };
  const s = q(() => Object.prototype.toString.call(t.colResizable) === "[object Object]" ? (m) => !t.colResizable.disabled(m) : (m) => !!t.colResizable);
  Tt(() => {
    v();
  }), pt(() => {
    w();
  });
  function v() {
    window.addEventListener("mousemove", T), window.addEventListener("mouseup", I);
  }
  function w() {
    window.removeEventListener("mousemove", T), window.removeEventListener("mouseup", I);
  }
  function L(m, y, p = !1) {
    if (!i()) return;
    m.stopPropagation(), m.preventDefault();
    const { clientX: D } = m, { scrollLeft: C, scrollTop: R } = i(), { left: M } = i().getBoundingClientRect(), H = r();
    let O = !1;
    const S = f(), b = S(y), A = H.findIndex((G) => S(G) === b), ee = c().indexOf(y), X = ee !== -1;
    p ? X && y.fixed === "right" ? O = !0 : A - 1 >= 0 && (y = H[A - 1]) : X && y.fixed === "right" && (y = c()[ee + 1] || y);
    const we = D - M + C;
    if (u(!0), Object.assign(g, {
      currentCol: y,
      lastCol: x(y),
      startX: D,
      startOffsetTableX: we,
      revertMoveX: O
    }), l()) {
      const G = l().style;
      G.display = "block", G.left = we + "px", G.top = R + "px";
    }
  }
  function T(m) {
    if (!_()) return;
    m.stopPropagation(), m.preventDefault();
    const { lastCol: y, startX: p, startOffsetTableX: D } = g, { clientX: C } = m;
    let R = C - p;
    const M = lt(y), H = (y == null ? void 0 : y.minWidth) ?? t.colMinWidth;
    M + R < H && (R = -M);
    const O = D + R;
    l() && (l().style.left = O + "px");
  }
  function I(m) {
    var S, b;
    if (!_()) return;
    const { startX: y, lastCol: p, revertMoveX: D } = g, { clientX: C } = m, R = D ? y - C : C - y;
    let M = lt(p) + R;
    M < t.colMinWidth && (M = t.colMinWidth);
    const H = f(), O = r().find((A) => H(A) === H(p));
    if (O && (O.width = M + "px", E == null || E(), (S = e["onUpdate:columns"]) == null || S.call(e, t.columns.slice()), (b = e.onColResize) == null || b.call(e, { ...O })), l()) {
      const A = l().style;
      A.display = "none", A.left = "0", A.top = "0";
    }
    u(!1), g = {
      currentCol: null,
      lastCol: null,
      startX: 0,
      startOffsetTableX: 0,
      revertMoveX: !1
    };
  }
  function x(m) {
    var y;
    if ((y = m == null ? void 0 : m.children) != null && y.length) {
      const p = m.children.slice(-1)[0];
      return x(p);
    }
    return m;
  }
  return [s, _, L];
}
function Cr(t, e, i, r, l, f) {
  const [c, E] = Ce([]), [_, u] = Ce([]), [g, s] = Ce([]), v = q(() => {
    const L = /* @__PURE__ */ new Map(), T = c(), I = _(), x = g(), m = e(), y = t.fixedColShadow, p = r();
    for (let D = 0, C = p.length; D < C; D++) {
      const R = p[D];
      for (let M = 0, H = R.length; M < H; M++) {
        const O = R[M], S = O.fixed, b = S && y && T.includes(O), A = [];
        I.includes(O) && A.push("fixed-cell--active"), S && (A.push("fixed-cell"), A.push("fixed-cell--" + S)), b && A.push("fixed-cell--shadow"), S === "right" && x.includes(O) && A.push("fixed-cell--border-left"), L.set(m(O), A.join(" "));
      }
    }
    return L;
  });
  function w(L) {
    const T = [], I = i();
    let x, m;
    if (L != null && L()) {
      const { containerWidth: C, scrollLeft: R } = L();
      x = C, m = R;
    } else {
      const { clientWidth: C, scrollLeft: R } = f();
      x = C, m = R;
    }
    const y = [], p = [], D = l().length;
    for (let C = 0; C < D; C++) {
      const R = l()[C];
      let M = R.length;
      for (; M > 0 && R[M - 1].fixed === "right"; )
        M--;
      let H = 0;
      for (let O = 0, S = R.length; O < S; O++) {
        const b = R[O], A = I(b), ee = b.fixed === "left", X = b.fixed === "right";
        if (ee && A + m > H && (T.push(b), y[C] = b), H += lt(b), X) {
          const we = m + x - H < A;
          (O >= M || we) && T.push(b), we && !p[C] && (p[C] = b);
        }
      }
    }
    t.fixedColShadow && E(y.concat(p).filter(Boolean)), s(p.filter(Boolean)), u(T);
  }
  return [_, v, w];
}
function Sr(t, e, i, r, l, f, c) {
  function E(_, u, g = 0) {
    const { fixed: s } = u;
    if ((_ === et.TD || _ === et.TF) && !s) return "";
    const { headerRowHeight: v, rowHeight: w } = t, L = s === "left", { scrollLeft: T, scrollWidth: I, offsetLeft: x, containerWidth: m } = l(), y = I - m - T;
    let p = "";
    if (_ === et.TH ? e() ? p += `top:${r().scrollTop}px;` : g && (p += `top:${g * (v ?? w)}px;`) : _ === et.TF && (p += "bottom:0;"), s)
      if (e())
        L ? p += `left:${T - (f() ? x : 0)}px;` : p += `right:${Math.max(y - (f() ? c() : 0), 0)}px;`;
      else {
        const D = i()(u) + "px";
        L ? p += `left:${D};` : p += `right:${D};`;
      }
    return p;
  }
  return E;
}
function br(t, e) {
  return q(() => {
    const r = {}, l = /* @__PURE__ */ new WeakMap(), f = e();
    return t().forEach((c) => {
      let E = 0, _ = 0;
      for (let g = 0; g < c.length; g++) {
        const s = c[g];
        if (s.fixed === "left") {
          const v = f(s);
          v ? r[v] = E : l.set(s, E), E += lt(s);
        }
        !_ && s.fixed === "right" && (_ = g);
      }
      let u = 0;
      for (let g = c.length - 1; g >= _; g--) {
        const s = c[g], v = f(s);
        s.fixed === "right" && (v ? r[v] = u : l.set(s, u), u += lt(s));
      }
    }), (c) => {
      const E = f(c);
      return E ? r[E] : l.get(c) || 0;
    };
  });
}
function Er(t, e, i) {
  const r = t.highlightConfig, l = {
    light: An.light,
    dark: An.dark
  }, f = q(() => r.duration ? r.duration * 1e3 : er), c = q(() => r.fps && r.fps > 0 ? 1e3 / r.fps : null), E = q(() => c() ? Math.round(f() / c()) : null), _ = q(() => l[t.theme].from), u = /* @__PURE__ */ new Map();
  let g = !1;
  const s = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), w = q(() => {
    const p = { backgroundColor: [_(), ""] };
    return E() && (p.easing = `steps(${E()})`), { duration: f(), keyframe: p };
  });
  function L() {
    if (g) return;
    g = !0;
    const p = () => {
      window.requestAnimationFrame(
        () => {
          const D = performance.now(), C = [];
          u.forEach((R, M) => {
            const { ts: H, duration: O } = R, S = D - H;
            S < O ? y(M, R, S) && C.push(M) : C.push(M);
          }), C.forEach((R) => u.delete(R)), u.size ? p() : (g = !1, u.clear());
        }
      );
    };
    p();
  }
  function T(p, D, C = {}) {
    var b;
    const R = (b = i()) == null ? void 0 : b.querySelector(`[data-row-key="${p}"] [data-col-key="${D}"]`);
    if (!R) return;
    const { className: M, method: H, duration: O, keyframe: S } = {
      className: nr,
      method: "animation",
      ...w(),
      ...C
    };
    H === "animation" ? R.animate(S, O) : m(R, p, D, M, O);
  }
  function I(p, D = {}) {
    if (Array.isArray(p) || (p = [p]), !p.length) return;
    const { className: C, method: R, keyframe: M, duration: H } = {
      className: tr,
      method: "animation",
      ...w(),
      ...D
    }, O = !!D.ignoreInvisible;
    if (R === "animation")
      if (t.virtual) {
        const S = performance.now();
        for (let b = 0; b < p.length; b++) {
          const A = p[b], ee = { ts: S, visible: !1, keyframe: M, duration: H, ignoreInvisible: O }, X = y(A, ee, 0);
          O && X ? u.delete(A) : u.set(A, ee);
        }
        L();
      } else
        for (let S = 0; S < p.length; S++) {
          const b = document.getElementById(e + "-" + String(p[S]));
          b && b.animate(M, H);
        }
    else
      x(p, C, H);
  }
  function x(p, D, C) {
    var H;
    let R = !1;
    const M = [];
    for (let O = 0; O < p.length; O++) {
      const S = p[O], b = document.getElementById(e + "-" + String(S));
      b && (b.classList.contains(D) && (b.classList.remove(D), R = !0), M.push(b), window.clearTimeout(s.get(S)), s.set(
        S,
        window.setTimeout(() => {
          b.classList.remove(D), s.delete(S);
        }, C)
      ));
    }
    R && ((H = i()) == null || H.offsetWidth), M.forEach((O) => O.classList.add(D));
  }
  function m(p, D, C, R, M) {
    p.classList.contains(R) && (p.classList.remove(R), p.offsetHeight), p.classList.add(R);
    const H = `${D}-${C}`;
    window.clearTimeout(v.get(H)), M && v.set(
      H,
      window.setTimeout(() => {
        p.classList.remove(R), v.delete(H);
      }, M)
    );
  }
  function y(p, D, C) {
    const R = document.getElementById(e + "-" + String(p)), { visible: M, ignoreInvisible: H } = D;
    if (!R)
      return H ? !0 : (M && (D.visible = !1), !1);
    const { keyframe: O, duration: S } = D;
    if (!M) {
      D.visible = !0;
      const b = C / S;
      R.animate(O, {
        duration: S - C,
        /** 从什么时候开始，0-1 */
        iterationStart: b,
        /** 持续多久 0-1 */
        iterations: 1 - b
      });
    }
    return !1;
  }
  return [E, I, T];
}
const dt = {
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Home: "Home",
  End: "End"
}, Tr = Object.values(dt);
function pr(t, e, i, r, l, f, c, E) {
  let _ = !1;
  tt(
    ht(c, (T) => {
      g(), T && u();
    })
  ), Tt(u), pt(g);
  function u() {
    var T, I, x;
    window.addEventListener("keydown", s), (T = t()) == null || T.addEventListener("mouseenter", v), (I = t()) == null || I.addEventListener("mouseleave", w), (x = t()) == null || x.addEventListener("mousedown", L);
  }
  function g() {
    var T, I, x;
    window.removeEventListener("keydown", s), (T = t()) == null || T.removeEventListener("mouseenter", v), (I = t()) == null || I.removeEventListener("mouseleave", w), (x = t()) == null || x.removeEventListener("mousedown", L);
  }
  function s(T) {
    if (!c() || E().keyboard) return;
    const I = T.code;
    if (!Tr.includes(I) || !_) return;
    T.preventDefault();
    const { scrollTop: x, rowHeight: m, containerHeight: y, scrollHeight: p } = r(), { scrollLeft: D } = l(), { headless: C, headerRowHeight: R } = e, M = C ? 0 : f().length * (R || m), H = Math.floor((y - M) / m);
    I === dt.ArrowUp ? i(x - m, null) : I === dt.ArrowRight ? i(null, D + 50) : I === dt.ArrowDown ? i(x + m, null) : I === dt.ArrowLeft ? i(null, D - 50) : I === dt.PageUp ? i(x - m * H + M, null) : I === dt.PageDown ? i(x + m * H - M, null) : I === dt.Home ? i(0, null) : I === dt.End && i(p, null);
  }
  function v() {
    _ = !0;
  }
  function w() {
    _ = !1;
  }
  function L() {
    _ || (_ = !0);
  }
}
function yr(t, e, i, r) {
  const l = /* @__PURE__ */ new Map();
  function f() {
    if (!t.virtual) {
      l.size && l.clear();
      return;
    }
    l.clear();
    const c = r(), _ = e().filter((s) => s.mergeCells);
    if (!_.length) return;
    const u = c.length, g = _.length;
    for (let s = 0; s < u; s++) {
      const v = c[s], w = i(v);
      let L = l.get(w) || 0;
      for (let T = 0; T < g; T++) {
        const I = _[T], { rowspan: x = 1 } = I.mergeCells({ row: v, col: I, rowIndex: s, colIndex: T }) || {};
        x > 1 && x > L && (L = x, l.set(w, L));
      }
    }
  }
  return [l, f];
}
function Rr(t, e, i, r, l) {
  const [f, c] = Ce(/* @__PURE__ */ new Set()), [E, _] = Ce(/* @__PURE__ */ new Set()), u = q(() => {
    const T = l(), I = e(), x = r();
    let m = null;
    const y = {}, p = /* @__PURE__ */ new Map();
    for (let D = 0; D < I.length; D++) {
      const C = I[D];
      if (!C.mergeCells) continue;
      const R = x(C);
      for (let M = 0; M < T.length; M++) {
        const H = T[M];
        if (!H) continue;
        let { colspan: O, rowspan: S } = C.mergeCells({ row: H, col: C, rowIndex: M, colIndex: C.__LF_S__ ?? 0 }) || {};
        if (O = O || 1, S = S || 1, O === 1 && S === 1) continue;
        const b = Fn(i(H), R);
        p.set(b, { rowspan: S, colspan: O }), m || (m = {});
        const A = Math.min(D + O, I.length), ee = Math.min(M + S, T.length);
        for (let X = M; X < ee; X++) {
          const we = T[X];
          if (!we) continue;
          const G = i(we), re = y[G] || (y[G] = /* @__PURE__ */ new Set()), Ee = m[G] || (m[G] = /* @__PURE__ */ new Set());
          for (let De = D; De < A; De++)
            re.add(b), !(X === M && De === D) && Ee.add(x(I[De]));
        }
      }
    }
    return { hiddenCellMap: m, hoverRowMap: y, spanMap: p };
  }), g = () => u().hiddenCellMap;
  function s(T, I) {
    if (I.mergeCells)
      return u().spanMap.get(Fn(i(T), r()(I)));
  }
  const v = /* @__PURE__ */ new Set();
  function w(T) {
    c(T === void 0 ? v : u().hoverRowMap[T] || v);
  }
  function L(T, I) {
    if (t().enabled) {
      if (T) {
        _(/* @__PURE__ */ new Set());
        return;
      }
      _(I !== void 0 && u().hoverRowMap[I] || new Set(f()));
    }
  }
  return [g, s, f, w, E, L];
}
function Dr(t, e, i, r, l) {
  const f = "__EXP__";
  function c(u, g) {
    return (u == null ? void 0 : u[f]) === g ? !(u != null && u[f]) : !0;
  }
  function E(u, g) {
    const s = c(u, g);
    _(u, s, { col: g });
  }
  function _(u, g, s) {
    var x;
    let v;
    typeof u == "string" ? v = u : v = r(u);
    const w = e().slice(), L = w.findIndex((m) => r(m) === v);
    if (L === -1) {
      console.warn("expandRow failed.rowKey:", v);
      return;
    }
    for (let m = L + 1; m < w.length; m++) {
      const p = w[m].__R_K__;
      if (p != null && p.startsWith(Hn))
        w.splice(m, 1), m--;
      else
        break;
    }
    const T = w[L], I = s == null ? void 0 : s.col;
    if (g == null && (g = c(T, I)), g) {
      const m = {
        __R_K__: Hn + v,
        __EXP_R__: T,
        __EXP_C__: I
      };
      w.splice(L + 1, 0, m);
    }
    T && (T[f] = g ? I : void 0), i(w), l(), s != null && s.silent || (x = t.onToggleRowExpand) == null || x.call(t, { expanded: !!g, row: T, col: I });
  }
  return [E, _];
}
function kr() {
  return typeof window > "u" ? !1 : window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
function Ir(t, e, i, r, l, f, c) {
  const [E, _] = Ce({ x: !1, y: !1 }), [u, g] = Ce({ h: 0, w: 0, t: 0, l: 0 });
  let s = !1, v = !1, w = 0, L = 0, T = 0, I = 0, x = null, m, y = !1;
  const p = cr(() => C(), 200), D = eo((X) => l(X));
  Tt(() => {
    y = kr(), f().enabled && !y && (x = new ResizeObserver(p), x.observe(e())), ee();
  }), pt(() => {
    b(), x == null || x.disconnect(), x = null;
  });
  function C() {
    if (!f().enabled || y) return;
    const { scrollHeight: X, scrollTop: we, containerHeight: G } = i(), { scrollWidth: re, scrollLeft: Ee, containerWidth: De } = r(), fe = X > G, Xe = re > De;
    if (_({ x: Xe, y: fe }), fe) {
      const it = G / X;
      g((V) => {
        const K = Math.max(f().minHeight, it * G), se = Math.round(we / (X - G) * (G - K));
        return { ...V, h: K, t: se };
      });
    }
    if (Xe) {
      const it = De / re;
      g((V) => {
        const K = Math.max(f().minWidth, it * De), se = Math.round(Ee / (re - De) * (De - K));
        return { ...V, w: K, l: se };
      });
    }
  }
  function R(X) {
    X instanceof MouseEvent && X.preventDefault(), s = !0;
    const { scrollTop: we } = i();
    T = we, w = X instanceof MouseEvent ? X.clientY : X.touches[0].clientY, H(O);
  }
  function M(X) {
    X instanceof MouseEvent && X.preventDefault(), v = !0;
    const { scrollLeft: we } = r();
    I = we, L = X instanceof MouseEvent ? X.clientX : X.touches[0].clientX, H(S);
  }
  function H(X) {
    A(), m = X, document.addEventListener("mousemove", X), document.addEventListener("mouseup", b), document.addEventListener("touchmove", X, { passive: !1 }), document.addEventListener("touchend", b);
  }
  function O(X) {
    if (!s) return;
    X.preventDefault();
    const G = (X instanceof MouseEvent ? X.clientY : X.touches[0].clientY) - w, { scrollHeight: re, containerHeight: Ee } = i(), De = re - Ee, fe = Ee - u().h, Xe = G / fe * De;
    if (c()) {
      const it = Ee / re, V = Math.round((T + Xe) * it), K = Ee - u().h;
      g((se) => ({ ...se, t: V < 0 ? 0 : V > K ? K : V })), D(T + Xe);
    } else
      e().scrollTop = T + Xe;
  }
  function S(X) {
    if (!v) return;
    X.preventDefault();
    const G = (X instanceof MouseEvent ? X.clientX : X.touches[0].clientX) - L, { scrollWidth: re, containerWidth: Ee } = r(), De = re - Ee, fe = Ee - u().w, Xe = G / fe * De;
    e().scrollLeft = I + Xe;
  }
  function b() {
    s = !1, v = !1, A(), document.removeEventListener("mouseup", b), document.removeEventListener("touchend", b);
  }
  function A() {
    m && (document.removeEventListener("mousemove", m), document.removeEventListener("touchmove", m), m = void 0);
  }
  function ee() {
    queueMicrotask(C);
  }
  return [u, E, R, M, C];
}
function Lr(t) {
  const [e, i] = Ce(t);
  let r = 0;
  function l(f) {
    e() && !f ? (r && window.clearTimeout(r), r = window.setTimeout(() => {
      i(f), r = 0;
    }, 300)) : (r && (window.clearTimeout(r), r = 0), i(f));
  }
  return [e, l];
}
function $r(t, e) {
  let i = !1;
  const [r, l] = Lr(!1), f = q(() => t.scrollRowByRow === "scrollbar"), c = q(() => f() ? r() : t.scrollRowByRow);
  tt(
    ht(f, (s) => {
      s ? E() : _();
    })
  ), Tt(() => {
    E();
  }), pt(() => {
    _();
  });
  function E() {
    if (i || !f()) return;
    const s = e();
    s && (s.addEventListener("mousedown", u), s.addEventListener("mouseup", g), i = !0);
  }
  function _() {
    const s = e();
    s && (s.removeEventListener("mousedown", u), s.removeEventListener("mouseup", g), i = !1);
  }
  function u(s) {
    s.target.classList.contains("stk-table") && l(!0);
  }
  function g() {
    l(!1);
  }
  return [c];
}
const Bt = [null, "desc", "asc"];
function Mr(t, e, i, r, l, f) {
  const [c, E] = Ce([]), _ = q(() => t.sortConfig.multiSort ?? !1), u = q(() => t.sortConfig.multiSortLimit ?? 3), g = q(() => {
    var C;
    return (C = c()[0]) == null ? void 0 : C.dataIndex;
  });
  function s(C) {
    return c()[v(C)];
  }
  function v(C) {
    return c().findIndex((R) => R.key === C || R.dataIndex === C);
  }
  function w(C) {
    return r().find((R) => C.key && i()(R) === C.key || R.dataIndex === C.dataIndex);
  }
  function L() {
    return c().map((C) => ({ key: C.key || C.dataIndex, order: C.order }));
  }
  function T(C, R) {
    const M = c().slice(), H = M.findIndex((O) => O.key === (C.key || C.dataIndex) || O.dataIndex === (C.key || C.dataIndex));
    H >= 0 && M.splice(H, 1), R && _() ? (M.length >= u() && M.pop(), M.unshift(C), E(M)) : E([C]);
  }
  function I(C, R) {
    const M = i()(C), H = v(M);
    let O;
    const S = R.defaultSort;
    if (H >= 0) {
      const b = c()[H].order;
      if (b && S && (S.key === M || S.dataIndex === C.dataIndex)) {
        const A = Bt.filter((X) => X !== null), ee = A.indexOf(b);
        O = A[(ee + 1) % A.length];
      } else {
        const A = Bt.indexOf(b);
        O = Bt[(A + 1) % 3];
      }
      if (O) {
        const A = { ...c()[H], order: O };
        T(A, 1);
      } else {
        const A = c().slice();
        if (A.splice(H, 1), E(A), S != null && S.order) {
          const ee = w(S), { key: X, sortField: we, sortType: G } = ee || {};
          T({ key: X, sortField: we, sortType: G, ...S }, 1);
        }
      }
    } else {
      O = Bt[1];
      const b = {
        key: M,
        dataIndex: C.dataIndex,
        sortField: C.sortField,
        sortType: C.sortType,
        order: O
      };
      T(b, 1);
    }
    return O;
  }
  function x(C) {
    if (!c().length) return C;
    const R = { ...Yt, ...t.sortConfig };
    let M = C.slice();
    const H = c();
    for (let O = H.length - 1; O >= 0; O--) {
      const S = H[O], b = w(S);
      if (b && S.order) {
        const A = { ...R, ...b.sortConfig };
        M = vn(b, S.order, M, A);
      }
    }
    return M;
  }
  function m(C) {
    var H;
    if (!C) {
      console.warn("onColumnSort: not found col:", C);
      return;
    }
    if (!C.sorter)
      return;
    const R = { ...Yt, ...t.sortConfig, ...C.sortConfig }, M = I(C, R);
    t.sortRemote || f(), (H = e.onSortChange) == null || H.call(e, C, M, l(), R);
  }
  function y(C, R, M = {}) {
    var b, A;
    const H = { silent: !0, sortOption: null, sort: !0, append: !1, ...M }, O = i();
    let S;
    if (R) {
      if (S = H.sortOption || r().find((ee) => O(ee) === C), S) {
        const ee = {
          key: C,
          dataIndex: S.dataIndex,
          sortField: S.sortField,
          sortType: S.sortType,
          order: R
        }, X = H.append && _() ? 1 : 0;
        T(ee, X);
      }
    } else
      E([]);
    return H.sort && ((b = l()) != null && b.length) && (!t.sortRemote || H.force) && f(t.dataSource, { forceSort: H.force }), H.silent || (S || (S = H.sortOption || r().find((ee) => O(ee) === C)), S ? (A = e.onSortChange) == null || A.call(e, S, R, l(), t.sortConfig) : console.warn("Can not find column by key:", C)), l();
  }
  function p() {
    E([]), f();
  }
  function D() {
    if (!t.sortConfig.defaultSort) return;
    const { key: C, dataIndex: R, order: M, silent: H } = { silent: !0, ...t.sortConfig.defaultSort };
    y(C || R, M, { force: !1, silent: H });
  }
  return [c, g, m, y, p, L, D, s, x];
}
function Ar(t, e) {
  const [i, r] = Ce([]), [l, f] = Ce([]);
  function c(E) {
    const _ = [], u = [];
    let g = E;
    if (e()) {
      const L = [], T = [], I = [];
      for (let x = 0, m = g.length; x < m; x++) {
        const y = g[x];
        y.fixed === "left" ? L.push(y) : y.fixed === "right" ? I.push(y) : T.push(y);
      }
      g = L.concat(T).concat(I);
    }
    const s = Jn(g);
    for (let L = 0; L <= s; L++)
      _[L] = [], u[L] = [];
    let v = 0;
    function w(L, T, I = 0) {
      let x = 0, m = 0;
      for (let y = 0, p = L.length; y < p; y++) {
        const D = L[y];
        if (D.hidden) continue;
        D.__P__ = T, D.__LF_S__ = v;
        let C = 1, R = 0;
        if (D.children) {
          const [O, S] = w(D.children, D, I + 1);
          C = O, R = S, u[I].push(D);
        } else {
          R = ar(D), v++;
          for (let O = I; O <= s; O++)
            u[O].push(D);
        }
        D.__LF_E__ = v, D.__W__ = R, _[I].push(D);
        const M = D.children ? 1 : s - I + 1, H = C;
        M > 1 && (D.__R_SP__ = M), H > 1 && (D.__C_SP__ = H), x += C, m += R;
      }
      return [x, m];
    }
    w(g, null), r(_), f(u);
  }
  return [i, l, c];
}
function Hr(t, e, i) {
  const r = q(() => {
    const u = t.headerDrag;
    return {
      draggable: u !== !1,
      mode: "insert",
      disabled: () => !1,
      ...u
    };
  });
  function l(u) {
    var w;
    const g = cn(u.target);
    if (!g) return;
    const s = g.dataset.colKey || "", v = u.dataTransfer;
    v && (v.effectAllowed = "move", v.setData("text/plain", s)), (w = e.onThDragStart) == null || w.call(e, s);
  }
  function f(u) {
    const g = cn(u.target);
    if (!g || !(g.getAttribute("draggable") === "true")) return;
    const v = u.dataTransfer;
    v && (v.dropEffect = "move"), u.preventDefault();
  }
  function c(u) {
    var v, w;
    const g = cn(u.target);
    if (!g) return;
    const s = (v = u.dataTransfer) == null ? void 0 : v.getData("text");
    s !== g.dataset.colKey && E(s, g.dataset.colKey), (w = e.onThDrop) == null || w.call(e, g.dataset.colKey);
  }
  function E(u, g) {
    var s, v;
    if (!(qt(u) || qt(g))) {
      if (r().mode !== "none") {
        const w = t.columns.slice(), L = w.findIndex((x) => i()(x) === u), T = w.findIndex((x) => i()(x) === g);
        if (L === -1 || T === -1) return;
        const I = w[L];
        r().mode === "swap" ? (w[L] = w[T], w[T] = I) : (w.splice(L, 1), w.splice(T, 0, I)), (s = e["onUpdate:columns"]) == null || s.call(e, w);
      }
      (v = e.onColOrderChange) == null || v.call(e, u, g);
    }
  }
  function _(u) {
    return r().draggable && !r().disabled(u);
  }
  return [l, f, c, _];
}
const Pn = "tr-dragging", an = "tr-dragging-over", Wn = "text/plain";
function Fr(t, e, i, r) {
  let l = !1;
  const f = q(() => ({ mode: "insert", ...t.dragRowConfig }));
  function c(v, w) {
    var I;
    const L = bt(v.target);
    if (L) {
      const x = L.getBoundingClientRect(), m = v.clientX - (x.left ?? 0);
      (I = v.dataTransfer) == null || I.setDragImage(L, m, x.height / 2), L.classList.add(Pn);
    }
    const T = v.dataTransfer;
    T && (T.effectAllowed = "move", T.setData(Wn, String(w))), l = !0;
  }
  function E(v) {
    if (!l) return;
    v.preventDefault();
    const w = v.dataTransfer;
    w && (w.dropEffect = "move");
  }
  let _ = null;
  function u(v) {
    if (!l) return;
    v.preventDefault();
    const w = bt(v.target);
    _ && _ !== w && _.classList.remove(an), w && (_ = w, w.classList.add(an));
  }
  function g(v) {
    if (!l) return;
    const w = bt(v.target);
    w && w.classList.remove(Pn), _ && (_.classList.remove(an), _ = null), l = !1;
  }
  function s(v, w) {
    var m;
    if (!l) return;
    const L = v.dataTransfer;
    if (!L) return;
    const T = f().mode, I = Number(L.getData(Wn)), x = w;
    if (I !== x) {
      if (T !== "none") {
        const y = i().slice(), p = y[I];
        T === "swap" ? (y[I] = y[x], y[x] = p) : (y.splice(I, 1), y.splice(x, 0, p)), r(y);
      }
      (m = e.onRowOrderChange) == null || m.call(e, I, x);
    }
  }
  return [c, u, E, s, g];
}
function Or(t, e, i, r, l, f) {
  const { defaultExpandAll: c, defaultExpandKeys: E, defaultExpandLevel: _ } = t.treeConfig;
  let u = !0;
  function g(m, y) {
    const p = m ? !m.__T_EXP__ : !1;
    s(m, { expand: p, col: y, isClick: !0 });
  }
  function s(m, y) {
    var C;
    const p = Array.isArray(m) ? m : [m], D = e().slice();
    for (let R = 0; R < p.length; R++) {
      const M = p[R];
      let H;
      typeof M == "string" ? H = M : H = r(M);
      const O = D.findIndex((ee) => r(ee) === H);
      if (O === -1) {
        console.warn("treeExpandRow failed.rowKey:", H);
        return;
      }
      const S = D[O], b = S.__T_LV__ || 0;
      let A = y == null ? void 0 : y.expand;
      if (A === void 0 && (A = !S.__T_EXP__), A) {
        const ee = I(S, b);
        D.splice(O + 1, 0, ...ee);
      } else {
        const ee = x(O, D, b);
        D.splice(O + 1, ee);
      }
      w(S, A, b), y.isClick && ((C = l.onToggleTreeExpand) == null || C.call(l, { expanded: !!A, row: S, col: y.col }));
    }
    i(D), f();
  }
  function v(m, y) {
    s(m, { ...y, isClick: !1 });
  }
  function w(m, y, p, D) {
    m.__T_EXP__ = y, p !== void 0 && (m.__T_LV__ = p);
  }
  function L(m, y, p) {
    if (!m) return [];
    let D = [];
    for (let C = 0; C < m.length; C++) {
      const R = m[C];
      D.push(R);
      const M = !!R.__T_EXP__;
      if (w(R, M, y), u && !M && (c ? w(R, !0) : (_ && y < _ && w(R, !0), E != null && E.includes(r(R)) && w(R, !0))), R.__T_EXP__) {
        const H = L(R.children, y + 1);
        D = D.concat(H);
      }
    }
    return D;
  }
  function T(m) {
    const y = L(m, 0);
    return u = !1, y;
  }
  function I(m, y) {
    let p = [];
    return m.children && m.children.forEach((D) => {
      p.push(D);
      const C = y + 1;
      if (D.__T_EXP__ && D.children) {
        const R = I(D, C);
        p = p.concat(R);
      } else
        w(D, !1, C);
    }), p;
  }
  function x(m, y, p) {
    let D = 0;
    for (let C = m + 1; C < y.length; C++) {
      const R = y[C];
      if (R.__T_LV__ && R.__T_LV__ > p)
        D++;
      else
        break;
    }
    return D;
  }
  return [g, v, T];
}
function Pr(t) {
  let e = { cols: null, nonFixedCols: [], leftFixedCols: [] };
  function i(f) {
    const c = [], E = [];
    let _ = 0;
    for (let u = 0; u < f.length; u++) {
      const g = f[u], s = t(g);
      if (g.fixed === "left") {
        E.push({ index: u, width: s });
        continue;
      }
      _ += s, c.push({ index: u, cumWidth: _ });
    }
    return e = { cols: f, nonFixedCols: c, leftFixedCols: E }, e;
  }
  function r(f) {
    return e.cols === f ? e : i(f);
  }
  function l() {
    e.cols = null;
  }
  return [r, l];
}
const Xn = 200;
function Wr(t, e, i, r, l, f, c, E, _, u) {
  const g = q(() => t.headerRowHeight * f().length), [s, v] = Ce({
    containerHeight: 0,
    rowHeight: t.rowHeight,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    offsetTop: 0,
    scrollTop: 0,
    scrollHeight: 0,
    translateY: 0
  }), [w, L] = Ce({
    containerWidth: 0,
    scrollWidth: 0,
    startIndex: 0,
    endIndex: 0,
    offsetLeft: 0,
    scrollLeft: 0
  }), [T, I] = Pr(lt), x = q(() => l().some((V) => V.type === "expand")), m = q(() => t.virtual && r().length > s().pageSize), y = q(() => {
    if (!m()) return r();
    const { startIndex: V, endIndex: K } = s();
    return r().slice(V, K + 1);
  }), p = q(() => {
    if (!m()) return 0;
    const { startIndex: V, endIndex: K } = s(), se = r(), ae = b()();
    if (t.autoRowHeight) {
      let de = 0;
      for (let he = K + 1; he < se.length; he++) {
        const $e = b()(se[he]);
        de += $e;
      }
      return de;
    }
    return (se.length - V - y().length) * ae;
  }), D = q(() => t.virtualX && l().reduce((V, K) => V += lt(K), 0) > w().containerWidth + 100), C = q(() => f().length > 1), R = q(() => {
    if (!D() || !C())
      return {
        startIndex: w().startIndex,
        endIndex: w().endIndex,
        offsetLeft: w().offsetLeft
      };
    const { scrollLeft: V, containerWidth: K } = w(), se = f()[0], ae = l().length;
    let de = 0, he = ae, $e = 0, Pe = 0, Se = !1;
    for (let ye = 0, ve = se.length; ye < ve; ye++) {
      const Ae = se[ye];
      if (Ae.fixed === "left" || Ae.fixed === "right") continue;
      const He = Ae.__W__ || lt(Ae), Ye = Pe + He;
      if (!Se && Ye > V && (Se = !0, de = Ae.__LF_S__ ?? 0, $e = Pe), Pe = Ye, he = Ae.__LF_E__ ?? ae, Se && Ye >= V + K)
        break;
    }
    return Se || (de = ae, $e = Pe), { startIndex: de, endIndex: he, offsetLeft: $e };
  }), M = q(() => {
    const V = l();
    if (D()) {
      const { startIndex: K, endIndex: se } = w(), ae = V.length, de = Math.min(se, ae), he = Math.min(K, ae);
      if (C()) {
        const ye = [], ve = [], Ae = [];
        for (let Fe = 0; Fe < V.length; Fe++) {
          const ke = V[Fe];
          ke.fixed === "right" ? ve.push(ke) : ke.fixed === "left" ? ye.push(ke) : Fe >= he && Fe < de && Ae.push(ke);
        }
        const He = [];
        He.push(...ye);
        const Ye = R().startIndex, Ie = Math.max(0, K - Ye);
        Ie && He.push({ __VT_C_SP__: Ie }), He.push(...Ae);
        const xe = Math.max(0, R().endIndex - se);
        return xe && He.push({ __VT_C_SP__: xe }), He.push(...ve), He;
      }
      const $e = [], Pe = [];
      for (let ye = 0; ye < he; ye++) {
        const ve = V[ye];
        (ve == null ? void 0 : ve.fixed) === "left" && $e.push(ve);
      }
      for (let ye = de; ye < V.length; ye++) {
        const ve = V[ye];
        (ve == null ? void 0 : ve.fixed) === "right" && Pe.push(ve);
      }
      const Se = V.slice(he, de);
      return $e.concat(Se).concat(Pe);
    }
    return V;
  }), H = q(() => {
    if (!D()) return f();
    if (C()) {
      const { startIndex: K, endIndex: se } = R();
      return f().map((ae) => ae.filter((de) => {
        if (de.fixed === "left" || de.fixed === "right") return !0;
        const he = de.__LF_S__ ?? 0;
        return (de.__LF_E__ ?? he + 1) > K && he < se;
      }));
    }
    const V = f();
    return V.map((K, se) => se === V.length - 1 ? M() : K);
  }), O = q(() => {
    if (!D()) return l().length;
    const V = M().filter((K) => K.__VT_C_SP__);
    return 2 + M().length + V.reduce((K, se) => K + Math.max(0, (se.__VT_C_SP__ ?? 0) - 1), 0);
  }), S = q(() => {
    if (!D()) return 0;
    const V = C() ? R().endIndex : w().endIndex;
    let K = 0;
    const se = l();
    for (let ae = V; ae < se.length; ae++) {
      const de = se[ae];
      de.fixed !== "right" && (K += lt(de));
    }
    return K;
  }), b = q(() => {
    var se;
    const V = t.rowHeight || zt;
    let K = () => V;
    if (t.autoRowHeight) {
      const ae = K;
      K = (de) => De(de) || ae(de);
    }
    if (x()) {
      const ae = (se = t.expandConfig) == null ? void 0 : se.height, de = K;
      K = (he) => he && he.__EXP_R__ && ae || de(he);
    }
    return K;
  });
  function A(V) {
    ee(V), X();
  }
  function ee(V) {
    var ye;
    V !== void 0 && typeof V != "number" && (console.warn("initVirtualScrollY: height must be a number"), V = 0);
    const { clientHeight: K, scrollHeight: se } = e() || {};
    let ae = u() ? s().scrollTop : ((ye = e()) == null ? void 0 : ye.scrollTop) || 0;
    const de = b()(), he = V || K || Qo, { headless: $e } = t;
    let Pe = Math.ceil(he / de);
    if (!$e) {
      const ve = Math.floor(g() / de);
      Pe -= ve;
    }
    const Se = Math.max(0, r().length * de + g() - he);
    ae > Se && (ae = Se), v((ve) => ({ ...ve, containerHeight: he, pageSize: Pe, scrollHeight: se })), fe(ae);
  }
  function X() {
    const { clientWidth: V, scrollLeft: K, scrollWidth: se } = e() || {};
    L((ae) => ({
      ...ae,
      containerWidth: V || Mn,
      scrollWidth: se || Mn
    })), it(K);
  }
  let we = null;
  const G = /* @__PURE__ */ new Map();
  function re(V, K) {
    const se = String(V);
    K ? G.set(se, K) : G.delete(se);
  }
  function Ee() {
    G.clear();
  }
  function De(V) {
    var de;
    if (!V) return;
    const K = c(V), se = G.get(String(K));
    if (se)
      return se;
    const ae = (de = t.autoRowHeight) == null ? void 0 : de.expectedHeight;
    if (ae)
      return typeof ae == "function" ? ae(V) : ae;
  }
  function fe(V = 0) {
    const { pageSize: K, scrollTop: se, startIndex: ae, endIndex: de, containerHeight: he } = s(), $e = r(), Pe = $e.length, Se = b()(), ye = {}, ve = Pe * Se + g(), { enabled: Ae } = _();
    if (Ae && (ye.scrollHeight = ve, u())) {
      let Le;
      V = V < 0 ? 0 : V < (Le = ve - he) ? V : Le, ye.translateY = t.scrollRowByRow ? 0 : -(V % Se);
    }
    if (ye.scrollTop = V, v((Le) => ({ ...Le, ...ye })), !m()) {
      v((Le) => ({ ...Le, startIndex: 0, endIndex: 0, offsetTop: 0 }));
      return;
    }
    const { autoRowHeight: He, stripe: Ye, optimizeVue2Scroll: Ie } = t;
    let xe = 0, Fe = Pe, ke = 0;
    if (He || x()) {
      if (He && i()) {
        const Ne = i();
        for (let Te = 0, Be = Ne.length; Te < Be; Te++) {
          const Me = Ne[Te], nt = Me.dataset.rowKey;
          !nt || G.has(nt) || G.set(nt, Me.offsetHeight);
        }
      }
      for (let Ne = 0; Ne < Pe; Ne++) {
        const Te = b()($e[Ne]);
        if (ke += Te, ke >= V) {
          xe = Ne, ke -= Te;
          break;
        }
      }
      let Le = 0;
      for (let Ne = xe + 1; Ne < Pe; Ne++)
        if (Le += b()($e[Ne]), Le >= he) {
          Fe = Ne;
          break;
        }
    } else if (xe = Math.floor(V / Se), Fe = xe + K, xe === ae && Fe === de)
      return;
    if (E.size) {
      let Le = xe, Ne = Fe;
      for (let Te = 0; Te < xe; Te++) {
        const Be = $e[Te];
        if (!Be) continue;
        const Me = Te + (E.get(c(Be)) || 1);
        if (Me > xe) {
          Le = Te, Me > Fe && (Ne = Me);
          break;
        }
      }
      for (let Te = Le; Te < Fe; Te++) {
        const Be = $e[Te];
        if (!Be) continue;
        const Me = Te + (E.get(c(Be)) || 1);
        Me > Ne && (Ne = Math.max(Me, Ne));
      }
      xe = Le, Fe = Ne;
    }
    if (Ye && !u() && xe > 0 && xe % 2 && (xe -= 1, He || x())) {
      const Le = b()($e[xe]);
      ke -= Le;
    }
    xe = Math.max(0, xe), Fe = Math.min(Fe, Pe), xe >= Fe && (xe = Fe - K), we && window.clearTimeout(we);
    let mt = 0;
    He || x() ? mt = ke : mt = xe * Se, !Ie || V <= se || Math.abs(ae - xe) >= K ? v((Le) => ({ ...Le, startIndex: xe, endIndex: Fe, offsetTop: mt })) : (v((Le) => ({ ...Le, endIndex: Fe })), we = window.setTimeout(() => {
      v((Le) => ({ ...Le, startIndex: xe, offsetTop: mt }));
    }, Xn));
  }
  let Xe = null;
  function it(V = 0) {
    if (!t.virtualX) return;
    const K = l(), se = K == null ? void 0 : K.length;
    if (!se) return;
    const { scrollLeft: ae, containerWidth: de } = w();
    let he = 0, $e = 0, Pe = 0;
    const { nonFixedCols: Se, leftFixedCols: ye } = T(K);
    if (Se.length > 0 && V > 0) {
      const Ie = Zn(Se, (Fe) => Se[Fe].cumWidth <= V ? -1 : 1), xe = Math.min(Ie, Se.length - 1);
      he = Se[xe].index, $e = xe > 0 ? Se[xe - 1].cumWidth : 0, Pe = Se[xe].cumWidth - V;
    } else Se.length > 0 && (he = Se[0].index);
    let ve = 0;
    for (const Ie of ye) {
      if (Ie.index >= he) break;
      ve += Ie.width;
    }
    const Ae = de - ve;
    let He = se, Ye = Pe;
    for (let Ie = Pe ? he + 1 : he; Ie < se; Ie++) {
      const xe = K[Ie];
      if (Ye += lt(xe), Ye >= Ae) {
        He = Ie + 1;
        break;
      }
    }
    He = Math.min(He, se), Xe && window.clearTimeout(Xe), !t.optimizeVue2Scroll || V <= ae ? L((Ie) => ({ ...Ie, startIndex: he, endIndex: He, offsetLeft: $e, scrollLeft: V })) : (L((Ie) => ({ ...Ie, endIndex: He, scrollLeft: V })), Xe = window.setTimeout(() => {
      L((Ie) => ({ ...Ie, startIndex: he, offsetLeft: $e }));
    }, Xn));
  }
  return [
    s,
    w,
    m,
    y,
    p,
    D,
    S,
    g,
    A,
    ee,
    X,
    fe,
    it,
    re,
    Ee,
    I,
    H,
    O,
    R,
    M
  ];
}
function Xr(t = 500) {
  let e = !1, i = 0;
  return [() => e, (f) => {
    e = f, f && (i && self.clearTimeout(i), i = self.setTimeout(() => {
      e = !1, i = 0;
    }, t));
  }];
}
var Nr = /* @__PURE__ */ ge("<div class=row-by-row-table-height>"), Vr = /* @__PURE__ */ ge("<div class=column-resize-indicator>"), Br = /* @__PURE__ */ ge("<thead>"), un = /* @__PURE__ */ ge("<td class=vt-x-left>"), fn = /* @__PURE__ */ ge("<td class=vt-x-right>"), Kr = /* @__PURE__ */ ge("<tr class=padding-top-tr>"), Ot = /* @__PURE__ */ ge("<tr>"), zr = /* @__PURE__ */ ge('<div class="stk-sb-thumb vertical">'), Yr = /* @__PURE__ */ ge("<div class=stk-table-no-data>"), qr = /* @__PURE__ */ ge('<div class="stk-sb-thumb horizontal">'), Gr = /* @__PURE__ */ ge("<div><div class=stk-table-scroll-container><table class=stk-table-main><tbody class=stk-tbody-main>"), Ur = /* @__PURE__ */ ge("<th class=vt-x-left>"), jr = /* @__PURE__ */ ge("<th class=vt-x-right>"), Zr = /* @__PURE__ */ ge('<div class="table-header-resizer left">'), Jr = /* @__PURE__ */ ge("<span class=table-header-sorter>"), Qr = /* @__PURE__ */ ge('<div class="table-header-resizer right">'), el = /* @__PURE__ */ ge("<th><div class=table-header-cell-wrapper>"), tl = /* @__PURE__ */ ge("<span class=table-header-title>"), Nn = /* @__PURE__ */ ge("<td>"), dn = /* @__PURE__ */ ge("<td class=vt-x-spacer>"), Vn = /* @__PURE__ */ ge("<span>"), Bn = /* @__PURE__ */ ge("<td><div class=table-cell-wrapper tabindex=-1>"), Kt = /* @__PURE__ */ ge("<div class=table-cell-wrapper tabindex=-1>");
const nl = {
  width: "",
  fixedMode: !1,
  stripe: !1,
  minWidth: "",
  maxWidth: "",
  headless: !1,
  theme: "light",
  rowHeight: zt,
  autoRowHeight: !1,
  footerData: [],
  rowHover: !0,
  rowActive: _n,
  rowCurrentRevokable: !0,
  headerRowHeight: zt,
  footerRowHeight: zt,
  virtual: !1,
  virtualX: !1,
  columns: [],
  dataSource: [],
  rowKey: "",
  colKey: void 0,
  emptyCellText: "--",
  noDataFull: !1,
  showNoData: !0,
  sortRemote: !1,
  showHeaderOverflow: !1,
  showOverflow: !1,
  showTrHoverClass: !1,
  cellHover: !1,
  cellActive: !1,
  selectedCellRevokable: !0,
  areaSelection: !1,
  headerDrag: !1,
  rowClassName: () => "",
  colResizable: !1,
  colMinWidth: 10,
  bordered: !0,
  autoResize: !0,
  fixedColShadow: !1,
  optimizeVue2Scroll: !1,
  sortConfig: Yt,
  hideHeaderTitle: !1,
  highlightConfig: {},
  seqConfig: {},
  expandConfig: {},
  dragRowConfig: {},
  treeConfig: {},
  cellFixedMode: "sticky",
  smoothScroll: lr,
  scrollRowByRow: !1,
  scrollbar: !1,
  experimental: {},
  footerConfig: {
    position: "bottom"
  }
};
function ol(t) {
  const e = Zo(nl, t), i = ur(), [r, l] = Ce(), [f, c] = Ce(), E = () => {
    var o;
    const n = (o = r()) == null ? void 0 : o.querySelector("tbody.stk-tbody-main");
    if (n)
      return Array.from(n.querySelectorAll("tr[data-row-key]"));
  }, [_] = Ce(rr ? !0 : e.cellFixedMode === "relative"), u = q(() => {
    var n;
    return ((n = e.footerConfig) == null ? void 0 : n.position) === "top";
  }), g = q(() => u() ? "tbody" : "tfoot"), [s, v] = Ce(), [w, L] = Ce(), [T, I] = Ce();
  let x = null;
  const [m, y] = Ce(null), [p, D, C] = Ar(() => e.virtualX, _), [R, M] = Ce({}), H = q(() => D().slice(-1)[0] || []), O = q(() => e.columns.some((n) => n.type === "tree-node")), S = q(() => {
    const {
      rowActive: n
    } = e;
    return typeof n == "boolean" ? {
      ..._n,
      enabled: n ?? !0,
      revokable: !!e.rowCurrentRevokable
    } : {
      ..._n,
      ...n
    };
  }), [b, A] = Ce([]), [ee, X] = Ce(0);
  function we() {
    X((n) => n + 1);
  }
  const G = q(() => {
    const {
      rowKey: n
    } = e;
    return typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), re = q(() => {
    const {
      colKey: n
    } = e;
    return n === void 0 ? (o) => o.key || o.dataIndex : typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), Ee = q(() => {
    const {
      emptyCellText: n
    } = e;
    return typeof n == "string" ? () => n : (o, d) => n({
      row: d,
      col: o
    });
  }), De = /* @__PURE__ */ new WeakMap();
  function fe(n) {
    if (!n) return n;
    let o = De.get(n);
    if (o !== void 0) return o;
    const d = n.__R_K__;
    return d !== void 0 ? (De.set(n, d), d) : (o = G()(n), o === void 0 && (o = Math.random().toString(36).slice(2)), De.set(n, o), o);
  }
  function Xe(n, o) {
    return fe(n) + jn + re()(o);
  }
  const [it, V, K, se, ae, de, he, $e, Pe] = Mr(e, e, re, H, b, Nt), [Se] = $r(e, r), [ye, ve, Ae, He] = Hr(e, e, re), [Ye, Ie, xe, Fe, ke] = Fr(e, e, b, A), [mt, Le] = yr(e, H, fe, b);
  function Ne() {
    return {
      enabled: !0,
      minHeight: 20,
      minWidth: 20,
      width: 8,
      height: 8,
      ...typeof e.scrollbar == "boolean" ? {
        enabled: e.scrollbar
      } : e.scrollbar
    };
  }
  const Te = q(Ne), Be = q(() => {
    var n, o;
    return (n = Te()) != null && n.enabled && e.scrollRowByRow ? !0 : (o = e.experimental) == null ? void 0 : o.scrollY;
  }), [Me, nt, _t, Wt, yt, je, Ze, At, Rt, at, Dt, ut, Ut, Ht, jt, a, $, F, W, le] = Wr(e, r, E, b, H, p, fe, mt, Te, Be), te = eo(ut), [J, N, Q, U, Y] = Ir(e, r, Me, nt, ut, Te, Be), [ie, j, Z, ce, be, We] = Rr(S, H, fe, re, Wt), Ke = br(D, re), Je = Sr(e, _, Ke, Me, nt, je, Ze), [Ge, ct, Qe] = Er(e, i, r);
  function wt(n) {
    const o = fe(n);
    return b().findIndex((d) => fe(d) === o);
  }
  function Re(n) {
    const o = re()(n);
    return H().findIndex((d) => re()(d) === o);
  }
  const {
    config: me,
    isSelecting: ot,
    onMD: Xt,
    get: Zt,
    set: Jt,
    clear: En,
    copy: lo
  } = no[bn](e, e, r, b, H, re, Xe, rn, Me, nt, wt, Re);
  pr(r, e, rn, Me, nt, p, _t, me);
  const [io, Qt, kt] = Cr(e, re, Ke, p, D, r);
  e.autoResize && vr(r, () => {
    Rt(), kt();
  }, e, 200);
  const [Tn, pn, yn] = xr(e, e, r, H, f, re, io, a), [so, co] = Dr(e, b, A, fe, kn), [ao, uo, fo] = Or(e, b, A, fe, e, kn), ho = q(() => `height:${Me().offsetTop}px`), go = q(() => `height:${yt()}px`), Rn = q(() => !Se() || !e.virtual ? 0 : b().length * Me().rowHeight + At()), Dn = q(() => {
    if (!Se() || !e.virtual) return 0;
    const {
      containerHeight: n,
      rowHeight: o
    } = Me();
    return (n - At()) % o;
  }), mo = q(() => `height:${Dn()}px`);
  tt(ht(() => e.columns, () => {
    en(), Le(), queueMicrotask(() => {
      Dt(), kt(), Y();
    });
  })), tt(ht(() => e.virtual, () => {
    queueMicrotask(at);
  })), tt(ht(() => e.rowHeight, () => at())), tt(ht(() => e.virtualX, () => {
    en(), queueMicrotask(() => {
      Dt(), kt();
    });
  })), tt(ht(() => e.dataSource, (n) => {
    wo(n);
  })), tt(ht(() => e.fixedColShadow, () => kt())), en(), Nt(), Le(), Tt(() => {
    Rt(), kt(), he();
  });
  async function kn() {
    await Promise.resolve(), at(), Y();
  }
  function Nt(n = e.dataSource, o) {
    let d = n.slice();
    (!e.sortRemote || o != null && o.forceSort) && (d = Pe(d)), O() && (d = fo(d)), d = _o(d), A(d);
  }
  function In(n, o) {
    var d;
    n = n || {}, M(n), o != null && o.remote || Nt(), o != null && o.silent || (d = e.onFilterChange) == null || d.call(e, n);
  }
  function _o(n) {
    const o = Object.keys(R());
    if (!(o != null && o.length)) return n;
    let d = n;
    for (const k of o) {
      const {
        value: h,
        filter: P
      } = R()[k];
      h != null && h.length && (d = d.filter((B) => {
        const ue = B[k];
        return P ? P({
          row: B,
          cellValue: ue,
          filterValues: h
        }) : h.some((ne) => ue == ne);
      }));
    }
    return d;
  }
  function en() {
    C(e.columns);
  }
  function wo(n) {
    if (!Array.isArray(n)) {
      console.warn("invalid dataSource");
      return;
    }
    let o = !1;
    b().length !== n.length && (o = !0), Nt(n), Le(), n.length || En(), o && queueMicrotask(() => at()), queueMicrotask(Y);
  }
  const Ft = q(() => {
    const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), d = /* @__PURE__ */ new Map(), {
      virtualX: k
    } = e, h = p(), P = re();
    for (let B = 0, ue = h.length; B < ue; B++) {
      const ne = h[B];
      for (let Oe = 0, rt = ne.length; Oe < rt; Oe++) {
        const Ve = ne[Oe], st = k ? lt(Ve) + "px" : sn(Ve.width), qe = sn(Ve.minWidth), It = sn(Ve.maxWidth);
        let Lt = "";
        st && (Lt += `--cw:${st}`), qe && (Lt += `;min-width:${qe}`), It && (Lt += `;max-width:${It}`);
        const ln = P(Ve);
        n.set(ln, Lt + ";" + Je(et.TH, Ve, B)), o.set(ln, Lt + ";" + Je(et.TD, Ve, B)), d.set(ln, "position:sticky;" + Lt + ";" + Je(et.TF, Ve, B));
      }
    }
    return {
      [et.TH]: n,
      [et.TD]: o,
      [et.TF]: d
    };
  });
  function xt(n) {
    return n + Me().startIndex;
  }
  function vo(n, o) {
    var d;
    if (!(!ie() || !n))
      return (d = ie()[fe(n)]) == null ? void 0 : d.has(re()(o));
  }
  function xo(n) {
    const o = re()(n);
    return e.hideHeaderTitle === !0 || Array.isArray(e.hideHeaderTitle) && e.hideHeaderTitle.includes(o) ? "" : n.title || "";
  }
  function Co(n, o) {
    var h;
    const d = fe(n), k = (n == null ? void 0 : n.__EXP_R__) && e.virtual && ((h = e.expandConfig) == null ? void 0 : h.height);
    return {
      id: i + "-" + d,
      "data-row-key": d,
      // 使用 getter 保持响应式：<For> 复用行 DOM 后 index 会变化（树展开/折叠、虚拟滚动），data-row-i 必须跟随更新，
      // 否则事件委托（onCellClick 等）会按过期索引取行导致取不到行
      get "data-row-i"() {
        return xt(o());
      },
      // 使用 getter 保持响应式：SolidJS spread 包裹在 createRenderEffect 中，getter 读取的信号变化时会重新赋值 class/style
      get class() {
        const P = xt(o()), B = [e.rowClassName(n, P), n != null && n.__EXP__ ? "expanded" : "", n != null && n.__EXP_R__ ? "expanded-row" : ""];
        return (w() === d || n === s()) && B.push("active"), e.showTrHoverClass && (d === m() || n === x) && B.push("hover"), B.filter(Boolean).join(" ");
      },
      get style() {
        var P;
        return k ? `--row-height: ${(P = e.expandConfig) == null ? void 0 : P.height}px` : null;
      }
    };
  }
  function So(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      draggable: !!He(n),
      rowspan: n.__R_SP__,
      colspan: n.__C_SP__,
      title: xo(n),
      // 使用 getter 保持响应式（排序状态/固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[et.TH].get(o);
      },
      get class() {
        const d = $e(o), k = !!d && d.order !== null;
        return [n.sorter ? "sortable" : "", k && "sorter-" + (d == null ? void 0 : d.order), n.headerClassName, Qt().get(o), n.headerAlign && (n.headerAlign === "left" ? "text-l" : n.headerAlign === "right" ? "text-r" : n.headerAlign === "center" ? "text-c" : null)].filter(Boolean).join(" ");
      }
    };
  }
  function bo(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      // 使用 getter 保持响应式（固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[et.TF].get(o);
      },
      get class() {
        return [n.className, Qt().get(o), n.type === "seq" ? "seq-column" : "", n.align === "center" ? "text-c" : n.align === "right" ? "text-r" : ""].filter(Boolean).join(" ");
      }
    };
  }
  function Eo(n, o, d, k) {
    const h = re()(o);
    if (!n)
      return {
        get style() {
          return Ft()[et.TD].get(h);
        }
      };
    const P = Xe(n, o);
    return {
      "data-col-key": h,
      // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
      get style() {
        return Ft()[et.TD].get(h);
      },
      get class() {
        const B = [o.className, Qt().get(h)];
        return o.align === "center" ? B.push("text-c") : o.align === "right" && B.push("text-r"), o.mergeCells && (Z().has(P) && B.push("cell-hover"), be().has(P) && B.push("cell-active")), e.cellActive && T() === P && B.push("active"), o.type === "seq" ? B.push("seq-column") : o.type === "expand" && (n.__EXP__ && re()(n.__EXP__) === h) ? B.push("expanded") : n.__T_EXP__ && o.type === "tree-node" ? B.push("tree-expanded") : o.type === "dragRow" && B.push("drag-row-cell"), B.filter(Boolean).join(" ");
      },
      // 合并单元格 rowspan/colspan：getter 保持响应式（虚拟滚动窗口变化时合并布局会重新计算）
      get rowspan() {
        var B;
        return (B = j(n, o)) == null ? void 0 : B.rowspan;
      },
      get colspan() {
        var B;
        return (B = j(n, o)) == null ? void 0 : B.colspan;
      }
    };
  }
  function To(n) {
    var h, P, B, ue;
    const o = gt(n.target), d = b()[o];
    if (!d || ((h = e.onRowClick) == null || h.call(e, n, d, {
      rowIndex: o
    }), (B = (P = S()).disabled) != null && B.call(P, d))) return;
    const k = e.rowKey ? w() === fe(d) : s() === d;
    if (k) {
      if (!S().revokable)
        return;
      on(void 0, {
        silent: !0
      });
    } else
      on(d, {
        silent: !0
      });
    (ue = e.onCurrentChange) == null || ue.call(e, n, d, {
      select: !k
    });
  }
  function po(n) {
    var k;
    const o = gt(n.target), d = b()[o];
    d && ((k = e.onRowDblclick) == null || k.call(e, n, d, {
      rowIndex: o
    }));
  }
  function yo(n) {
    var o;
    (o = e.onHeaderRowMenu) == null || o.call(e, n);
  }
  function Ro(n) {
    var k;
    const o = gt(n.target), d = b()[o];
    d && ((k = e.onRowMenu) == null || k.call(e, n, d, {
      rowIndex: o
    }));
  }
  function Do(n, o, d) {
    d.type === "expand" ? so(o, d) : d.type === "tree-node" && ao(o, d);
  }
  function ko(n) {
    var P, B, ue;
    const o = gt(n.target), d = b()[o];
    if (!d) return;
    const k = Pt(n.target), h = H().find((ne) => re()(ne) === k);
    if (h) {
      if ((P = n.target) != null && P.closest(".stk-fold-icon")) {
        Do(n, d, h);
        return;
      }
      if (e.cellActive) {
        const ne = Xe(d, h), Oe = {
          row: d,
          col: h,
          select: !1,
          rowIndex: o
        };
        e.selectedCellRevokable && T() === ne ? I(void 0) : (I(ne), Oe.select = !0), (B = e.onCellSelected) == null || B.call(e, n, Oe);
      }
      (ue = e.onCellClick) == null || ue.call(e, n, d, h, {
        rowIndex: o
      });
    }
  }
  function tn(n) {
    const o = gt(n.target) || 0, d = b()[o], k = Pt(n.target), h = H().find((P) => re()(P) === k);
    return {
      row: d,
      col: h,
      rowIndex: o
    };
  }
  function Io(n, o) {
    var d;
    K(o), (d = e.onHeaderCellClick) == null || d.call(e, n, o);
  }
  function Lo(n) {
    var P, B;
    const o = Gt(n.target);
    if (!o) return;
    const {
      row: d,
      col: k
    } = tn(n);
    (P = e.onCellMouseover) == null || P.call(e, n, d, k);
    const h = n.relatedTarget;
    (!h || !o.contains(h)) && ((B = e.onCellMouseenter) == null || B.call(e, n, d, k));
  }
  function $o(n) {
    var P;
    const o = n.target, d = n.relatedTarget, k = Gt(o);
    if (k && (!d || !k.contains(d))) {
      const {
        row: B,
        col: ue
      } = tn(n);
      (P = e.onCellMouseleave) == null || P.call(e, n, B, ue);
    }
    const h = bt(o);
    h && (!d || !h.contains(d)) && (x = null, e.showTrHoverClass && y(null), e.rowHover && ce(void 0));
  }
  function Mo(n) {
    const o = gt(n.target);
    o < 0 || Fe(n, xt(o));
  }
  function Ao(n) {
    var h;
    const {
      row: o,
      col: d,
      rowIndex: k
    } = tn(n);
    (h = e.onCellMousedown) == null || h.call(e, n, o, d, {
      rowIndex: k
    }), me().enabled && Xt(n);
  }
  const [Ln, $n] = Xr();
  function Ho(n) {
    if (e.smoothScroll) return;
    if (pn()) {
      n.stopPropagation();
      return;
    }
    const o = r(), {
      deltaY: d,
      deltaX: k,
      shiftKey: h
    } = n;
    if (_t() && d && !h) {
      const {
        containerHeight: P,
        scrollTop: B,
        scrollHeight: ue
      } = Me(), ne = B < ue - P - 1, Oe = B > 1;
      d > 0 && ne || d < 0 && Oe ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), Be() ? (te(B + d), Y()) : o.scrollTop += d;
    }
    if (je()) {
      const {
        containerWidth: P,
        scrollLeft: B,
        scrollWidth: ue
      } = nt();
      let ne = k;
      h && d && (ne = d);
      const Oe = B < ue - P - 1, rt = B > 1;
      ne > 0 && Oe || ne < 0 && rt ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), o.scrollLeft += ne;
    }
  }
  let nn = !1;
  function Fo(n) {
    !(n != null && n.target) || nn || (nn = !0, requestAnimationFrame(() => {
      var ue, ne;
      nn = !1;
      const {
        scrollTop: o,
        scrollLeft: d
      } = n.target, {
        scrollTop: k
      } = Me(), {
        scrollLeft: h
      } = nt(), P = Be() ? !1 : o !== k, B = d !== h;
      if (P && ut(o), B && (je() ? Ut(d) : nt().scrollLeft = d, kt(nt)), P) {
        const {
          startIndex: Oe,
          endIndex: rt
        } = Me();
        (ue = e.onScroll) == null || ue.call(e, n, {
          startIndex: Oe,
          endIndex: rt
        });
      }
      B && ((ne = e.onScrollX) == null || ne.call(e, n)), Y();
    }));
  }
  function Oo(n) {
    const o = bt(n.target);
    if (!o) return;
    const d = Number(o.dataset.rowI), k = b()[d];
    if (x === k) return;
    x = k;
    const h = o.dataset.rowKey;
    e.showTrHoverClass && y(h || null), e.rowHover && ce(h);
  }
  function on(n, o = {
    silent: !1,
    deep: !1
  }) {
    var h;
    const d = n !== void 0, k = s();
    if (!d)
      v(void 0), L(void 0), We(!0);
    else if (typeof n == "string") {
      const P = (ue, ne) => {
        var Oe;
        for (let rt = 0; rt < ue.length; rt++) {
          const Ve = ue[rt];
          if (fe(Ve) === ne)
            return Ve;
          if (o.deep && ((Oe = Ve.children) != null && Oe.length)) {
            const st = P(Ve.children, ne);
            if (st)
              return st;
          }
        }
        return null;
      };
      L(n), We(!1, w());
      const B = P(b() || [], n);
      if (!B) {
        console.warn("setCurrentRow failed.rowKey:", n);
        return;
      }
      v(B);
    } else
      v(n), L(fe(n)), We(!1, w());
    o.silent || (h = e.onCurrentChange) == null || h.call(
      e,
      /** no Event */
      null,
      d ? s() : k,
      {
        select: d
      }
    );
  }
  function Po(n, o, d = {
    silent: !1
  }) {
    var h;
    if (!b().length) return;
    const k = n !== void 0 && o !== void 0;
    I(k ? Xe(n, o) : void 0), d.silent || (h = e.onCellSelected) == null || h.call(
      e,
      /** no Event */
      null,
      {
        row: n,
        col: o,
        select: k
      }
    );
  }
  function rn(n = 0, o = 0) {
    r() && (n !== null && (Be() ? (ut(n), Y()) : r().scrollTop = n), o !== null && (r().scrollLeft = o));
  }
  function Wo() {
    return b();
  }
  const Xo = {
    initVirtualScroll: Rt,
    initVirtualScrollX: Dt,
    initVirtualScrollY: at,
    setCurrentRow: on,
    setSelectedCell: Po,
    setHighlightDimCell: Qe,
    setHighlightDimRow: ct,
    sortCol: V,
    sortStates: it,
    getSortColumns: de,
    setSorter: se,
    resetSorter: ae,
    scrollTo: rn,
    getTableData: Wo,
    getRowIndex: wt,
    getColumnIndex: Re,
    setRowExpand: co,
    setAutoHeight: Ht,
    clearAllAutoHeight: jt,
    setTreeExpand: uo,
    getSelectedArea: Zt,
    setAreaSelection: Jt,
    clearSelectedArea: En,
    copySelectedArea: lo,
    setFilter: In
  };
  typeof e.ref == "function" && e.ref(Xo);
  const No = q(() => {
    const n = {
      "stk-table": !0,
      virtual: e.virtual,
      "virtual-x": e.virtualX,
      "vt-on": _t(),
      light: e.theme === "light",
      dark: e.theme === "dark",
      headless: e.headless,
      "is-col-resizing": pn(),
      "col-resizable": !!e.colResizable,
      bordered: !!e.bordered,
      stripe: e.stripe,
      "cell-hover": e.cellHover,
      "cell-active": e.cellActive,
      "row-hover": e.rowHover,
      "row-active": S().enabled,
      "text-overflow": e.showOverflow,
      "header-text-overflow": e.showHeaderOverflow,
      "fixed-relative-mode": _(),
      "auto-row-height": !!e.autoRowHeight,
      "scroll-row-by-row": !!Se(),
      "scrollbar-on": Te().enabled,
      "area-selection": me().enabled,
      "is-area-selecting": ot(),
      "exp-scroll-y": !!Be()
    };
    typeof e.bordered == "string" && (n[`bordered-${e.bordered}`] = !0);
    const o = Object.keys(n).filter((d) => n[d]).join(" ");
    return e.class ? o + " " + e.class : o;
  }), Vo = q(() => {
    const n = {
      "--row-height": e.autoRowHeight ? void 0 : Me().rowHeight + "px",
      "--header-row-height": e.headerRowHeight + "px",
      "--footer-row-height": e.footerRowHeight + "px",
      "--highlight-duration": e.highlightConfig.duration && e.highlightConfig.duration + "s",
      "--highlight-timing-function": Ge() ? `steps(${Ge()})` : void 0,
      "--sb-width": `${Te().width}px`,
      "--sb-height": `${Te().height}px`
    };
    let o = Object.entries(n).filter(([, k]) => k != null && k !== "").map(([k, h]) => `${k}:${h}`).join(";");
    const d = e.style;
    if (d) {
      const k = typeof d == "string" ? d : Object.entries(d).filter(([, h]) => h != null && h !== "").map(([h, P]) => `${h.replace(/[A-Z]/g, (B) => "-" + B.toLowerCase())}:${P}`).join(";");
      k && (o = o ? o + ";" + k : k);
    }
    return o;
  }), Bo = {
    dataSource: b,
    rawDataSource: () => e.dataSource,
    theme: () => e.theme,
    setFilter: In,
    rowVersion: ee,
    bumpRowVersion: we
  };
  return z(oo.Provider, {
    value: Bo,
    get children() {
      var n = Gr(), o = n.firstChild, d = o.firstChild, k = d.firstChild;
      return n.addEventListener("wheel", Ho), n.addEventListener("scroll", Fo), Et((h) => {
        l(h);
      }, n), oe(n, z(_e, {
        get when() {
          return Ue(() => !Be())() && Rn();
        },
        get children() {
          var h = Nr();
          return pe((P) => ze(h, `height: ${Rn()}px`, P)), h;
        }
      }), o), oe(n, z(_e, {
        get when() {
          return e.colResizable;
        },
        get children() {
          var h = Vr();
          return Et((P) => c(P), h), h;
        }
      }), o), d.$$mouseover = Oo, d.$$contextmenu = Ro, d.$$dblclick = po, d.$$click = To, St(d, "dragend", ke), St(d, "dragenter", Ie), St(d, "dragover", xe), oe(d, z(_e, {
        get when() {
          return !e.headless;
        },
        get children() {
          var h = Br();
          return oe(h, z(Ct, {
            get each() {
              return Ue(() => !!je())() ? $() : p();
            },
            children: (P, B) => (() => {
              var ue = Ot();
              return ue.$$contextmenu = (ne) => yo(ne), oe(ue, z(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var ne = Ur();
                  return pe((Oe) => ze(ne, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, Oe)), ne;
                }
              }), null), oe(ue, z(Ct, {
                each: P,
                children: (ne, Oe) => {
                  const rt = So(ne);
                  return (() => {
                    var Ve = el(), st = Ve.firstChild;
                    return Vt(Ve, mn(rt, {
                      onClick: (qe) => Io(qe, ne),
                      onDragStart: ye,
                      onDrop: Ae,
                      onDragOver: ve
                    }), !1, !0), oe(Ve, z(_e, {
                      get when() {
                        return Ue(() => !!Tn()(ne))() && Oe() > 0;
                      },
                      get children() {
                        var qe = Zr();
                        return qe.$$mousedown = (It) => yn(It, ne, !0), qe;
                      }
                    }), st), oe(st, z(_e, {
                      get when() {
                        return ne.customHeaderCell;
                      },
                      get fallback() {
                        return Ue(() => !!e.tableHeaderSlot)() ? e.tableHeaderSlot(ne) : (() => {
                          var qe = tl();
                          return oe(qe, () => ne.title), qe;
                        })();
                      },
                      get children() {
                        return hn(ne.customHeaderCell, {
                          col: ne,
                          colIndex: Oe(),
                          rowIndex: B()
                        });
                      }
                    }), null), oe(st, z(_e, {
                      get when() {
                        return ne.sorter;
                      },
                      get children() {
                        var qe = Jr();
                        return oe(qe, z(gr, {})), qe;
                      }
                    }), null), oe(Ve, z(_e, {
                      get when() {
                        return Tn()(ne);
                      },
                      get children() {
                        var qe = Qr();
                        return qe.$$mousedown = (It) => yn(It, ne), qe;
                      }
                    }), null), pe((qe) => ze(st, ne.__R_SP__ ? `--row-span:${ne.__R_SP__}` : void 0, qe)), Ve;
                  })();
                }
              }), null), oe(ue, z(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var ne = jr();
                  return pe((Oe) => ze(ne, `min-width:${Ze()}px;width:${Ze()}px`, Oe)), ne;
                }
              }), null), ue;
            })()
          })), h;
        }
      }), k), oe(d, z(_e, {
        get when() {
          return Ue(() => !!e.footerData)() && e.footerData.length > 0;
        },
        get children() {
          return Ko();
        }
      }), k), k.addEventListener("drop", Mo), k.$$mouseout = $o, k.$$mouseover = Lo, k.$$mousedown = Ao, k.$$click = ko, oe(k, z(_e, {
        get when() {
          return Ue(() => !!(!Be() && _t()))() && !Se();
        },
        get children() {
          var h = Kr();
          return oe(h, z(_e, {
            get when() {
              return Ue(() => !!e.fixedMode)() && e.headless;
            },
            get children() {
              return [z(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var P = un();
                  return pe((B) => ze(P, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, B)), P;
                }
              }), z(Ct, {
                get each() {
                  return le();
                },
                children: (P, B) => z(_e, {
                  get when() {
                    return !P.__VT_C_SP__;
                  },
                  get fallback() {
                    return (() => {
                      var ue = dn();
                      return pe(() => ft(ue, "colspan", P.__VT_C_SP__)), ue;
                    })();
                  },
                  get children() {
                    var ue = Nn();
                    return pe((ne) => ze(ue, Ft()[et.TD].get(re()(P)), ne)), ue;
                  }
                })
              }), z(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var P = fn();
                  return pe((B) => ze(P, `min-width:${Ze()}px;width:${Ze()}px`, B)), P;
                }
              })];
            }
          })), pe((P) => ze(h, ho(), P)), h;
        }
      }), null), oe(k, z(Ct, {
        get each() {
          return Wt();
        },
        children: (h, P) => zo(h, P)
      }), null), oe(k, z(_e, {
        get when() {
          return !Be();
        },
        get children() {
          return [z(_e, {
            get when() {
              return Ue(() => !!_t())() && !Se();
            },
            get children() {
              var h = Ot();
              return pe((P) => ze(h, go(), P)), h;
            }
          }), z(_e, {
            get when() {
              return Dn();
            },
            get children() {
              var h = Ot();
              return pe((P) => ze(h, mo(), P)), h;
            }
          })];
        }
      }), null), oe(o, z(_e, {
        get when() {
          return Ue(() => !!Te().enabled)() && N().y;
        },
        get children() {
          var h = zr();
          return St(h, "touchstart", Q, !0), St(h, "mousedown", Q, !0), pe((P) => ze(h, `height:${J().h}px;transform:translateY(${J().t}px)`, P)), h;
        }
      }), null), oe(n, z(_e, {
        get when() {
          return Ue(() => !b() || !b().length)() && e.showNoData;
        },
        get children() {
          var h = Yr();
          return oe(h, () => e.emptySlot ?? "暂无数据"), pe(() => h.classList.toggle("no-data-full", !!e.noDataFull)), h;
        }
      }), null), oe(n, () => e.customBottomSlot, null), oe(n, z(_e, {
        get when() {
          return Ue(() => !!Te().enabled)() && N().x;
        },
        get children() {
          var h = qr();
          return St(h, "touchstart", U, !0), St(h, "mousedown", U, !0), pe((P) => ze(h, `width:${J().w}px;transform:translateX(${J().l}px)`, P)), h;
        }
      }), null), pe((h) => {
        var P = No(), B = me().enabled ? 0 : void 0, ue = Vo(), ne = !!e.fixedMode, Oe = e.width, rt = e.minWidth, Ve = e.maxWidth, st = Be() ? `transform:translateY(${Me().translateY}px)` : "";
        return P !== h.e && Sn(n, h.e = P), B !== h.t && ft(n, "tabindex", h.t = B), h.a = ze(n, ue, h.a), ne !== h.o && d.classList.toggle("fixed-mode", h.o = ne), Oe !== h.i && $t(d, "width", h.i = Oe), rt !== h.n && $t(d, "min-width", h.n = rt), Ve !== h.s && $t(d, "max-width", h.s = Ve), h.h = ze(k, st, h.h), h;
      }, {
        e: void 0,
        t: void 0,
        a: void 0,
        o: void 0,
        i: void 0,
        n: void 0,
        s: void 0,
        h: void 0
      }), n;
    }
  });
  function Ko() {
    return z(qn, {
      get component() {
        return g();
      },
      class: "stk-footer",
      get style() {
        return Ue(() => !!u())() ? `top:${At()}px` : "";
      },
      get children() {
        return z(Ct, {
          get each() {
            return e.footerData;
          },
          children: (n, o) => (() => {
            var d = Ot();
            return oe(d, z(_e, {
              get when() {
                return je();
              },
              get children() {
                var k = un();
                return pe((h) => ze(k, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, h)), k;
              }
            }), null), oe(d, z(Ct, {
              get each() {
                return le();
              },
              children: (k, h) => z(_e, {
                get when() {
                  return !k.__VT_C_SP__;
                },
                get fallback() {
                  return (() => {
                    var P = dn();
                    return pe(() => ft(P, "colspan", k.__VT_C_SP__)), P;
                  })();
                },
                get children() {
                  var P = Bn(), B = P.firstChild;
                  return Vt(P, mn(() => bo(k)), !1, !0), oe(P, z(_e, {
                    get when() {
                      return k.customFooterCell;
                    },
                    get children() {
                      return hn(k.customFooterCell, {
                        class: "table-cell-wrapper",
                        tabindex: "-1",
                        col: k,
                        row: n,
                        rowIndex: o(),
                        cellValue: n[k.dataIndex]
                      });
                    }
                  }), B), oe(B, z(_e, {
                    get when() {
                      return n[k.dataIndex] != null;
                    },
                    get children() {
                      var ue = Vn();
                      return oe(ue, () => n[k.dataIndex]), ue;
                    }
                  })), pe(() => ft(B, "title", n[k.dataIndex] || "")), P;
                }
              })
            }), null), oe(d, z(_e, {
              get when() {
                return je();
              },
              get children() {
                var k = fn();
                return pe((h) => ze(k, `min-width:${Ze()}px;width:${Ze()}px`, h)), k;
              }
            }), null), d;
          })()
        });
      }
    });
  }
  function zo(n, o) {
    const d = Co(n, o);
    return (() => {
      var k = Ot();
      return Vt(k, d, !1, !0), oe(k, z(_e, {
        get when() {
          return !(n && n.__EXP_R__);
        },
        get fallback() {
          return (() => {
            var h = Bn(), P = h.firstChild;
            return oe(P, (() => {
              var B = Ue(() => !!e.expandSlot);
              return () => B() ? e.expandSlot(n.__EXP_R__, n.__EXP_C__) : Ue(() => !!(n.__EXP_R__ && n.__EXP_C__))() && n.__EXP_R__[n.__EXP_C__.dataIndex] || "";
            })()), pe(() => ft(h, "colspan", F())), h;
          })();
        },
        get children() {
          return [z(_e, {
            get when() {
              return je();
            },
            get children() {
              return un();
            }
          }), z(Ct, {
            get each() {
              return le();
            },
            children: (h, P) => Yo(n, h, o)
          }), z(_e, {
            get when() {
              return je();
            },
            get children() {
              return fn();
            }
          })];
        }
      })), k;
    })();
  }
  function Yo(n, o, d) {
    if (o.__VT_C_SP__)
      return (() => {
        var h = dn();
        return pe(() => ft(h, "colspan", o.__VT_C_SP__)), h;
      })();
    const k = Eo(n, o, d(), o.__LF_S__ ?? 0);
    return z(_e, {
      get when() {
        return !vo(n, o);
      },
      get children() {
        var h = Nn();
        return Vt(h, k, !1, !0), oe(h, z(_e, {
          get when() {
            return o.customCell;
          },
          get fallback() {
            return qo(n, o, d);
          },
          get children() {
            return hn(o.customCell, {
              class: "table-cell-wrapper",
              tabindex: "-1",
              col: o,
              row: n,
              // 使用 getter 保持响应式：<For> 复用行后 index 会变化
              get rowIndex() {
                return xt(d());
              },
              colIndex: o.__LF_S__ ?? 0,
              // 使用 getter 保持响应式（对齐 Vue render 函数重新求值行为）
              get cellValue() {
                return n && n[o.dataIndex];
              },
              get expanded() {
                return n && n.__EXP__;
              },
              get "tree-expanded"() {
                return n && n.__T_EXP__;
              },
              // 对齐 Vue：stkFoldIcon 点击由 tbody 委托的 onCellClick 统一处理（避免与直接处理器双重 toggle）
              stkFoldIcon: z(xn, {}),
              stkDragIcon: z(On, {
                onDragStart: (P) => Ye(P, xt(d()))
              })
            });
          }
        })), h;
      }
    });
  }
  function qo(n, o, d) {
    return o.type ? o.type === "seq" ? (() => {
      var k = Kt();
      return oe(k, () => (e.seqConfig.startIndex || 0) + xt(d()) + 1), k;
    })() : o.type === "tree-node" ? (() => {
      var k = Kt();
      return oe(k, z(wr, {
        col: o,
        row: n
      })), k;
    })() : (() => {
      var k = Kt();
      return oe(k, z(_e, {
        get when() {
          return o.type === "dragRow";
        },
        get children() {
          return z(On, {
            onDragStart: (h) => Ye(h, xt(d()))
          });
        }
      }), null), oe(k, z(_e, {
        get when() {
          return o.type === "expand";
        },
        get children() {
          return z(xn, {});
        }
      }), null), oe(k, z(_e, {
        get when() {
          return n[o.dataIndex] != null;
        },
        get children() {
          var h = Vn();
          return oe(h, () => n[o.dataIndex]), h;
        }
      }), null), pe(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })() : (() => {
      var k = Kt();
      return oe(k, (() => {
        var h = Ue(() => (n && n[o.dataIndex]) != null);
        return () => h() ? n && n[o.dataIndex] : Ee()(o, n);
      })()), pe(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })();
  }
}
function hn(t, e) {
  return typeof t == "string" ? t : typeof t == "function" ? t(e) : null;
}
Mt(["click", "dblclick", "contextmenu", "mouseover", "mousedown", "mouseout", "touchstart"]);
var rl = /* @__PURE__ */ ge("<input type=checkbox>"), ll = /* @__PURE__ */ ge("<div><footer><button>↺</button><button>✓");
const Kn = 300, zn = 400, vt = 6;
function il() {
  const [t, e] = Ce(!1), [i, r] = Ce("light"), [l, f] = Ce([]), [c, E] = Ce({
    x: 0,
    y: 0
  }), [_, u] = Ce(/* @__PURE__ */ new Set()), g = [{
    title: "",
    dataIndex: "value",
    width: 30,
    className: "stk-filter-dropdown-checkbox",
    customCell: ({
      row: S
    }) => (() => {
      var b = rl();
      return pe(() => b.checked = _().has(S.value)), b;
    })()
  }, {
    title: "",
    dataIndex: "label"
  }];
  let s, v = null, w = null, L = null;
  function T() {
    if (!s)
      return [Kn, zn];
    const S = s.getBoundingClientRect();
    return [S.width || Kn, S.height || zn];
  }
  function I(S) {
    const b = window.pageYOffset || document.documentElement.scrollTop, A = window.pageXOffset || document.documentElement.scrollLeft, ee = document.documentElement.clientWidth, X = document.documentElement.clientHeight, [we, G] = T();
    let re = S.x, Ee = S.y;
    S.x - A + we > ee - vt && (re = ee - we - vt + A);
    const fe = S.y - b;
    if (fe + G > X - vt) {
      const Xe = S.height || 30;
      fe - Xe >= G + vt ? Ee = S.y - Xe - G - vt : Ee = vt + b;
    }
    return re = Math.max(vt + A, re), Ee = Math.max(vt + b, Ee), {
      x: re,
      y: Ee
    };
  }
  function x() {
    const S = /* @__PURE__ */ new Set();
    l().forEach((b) => {
      b.selected && S.add(b.value);
    }), u(S);
  }
  function m(S, b) {
    const A = new Set(_());
    S ? A.add(b.value) : A.delete(b.value), u(A);
  }
  function y() {
    const S = _();
    l().forEach((b) => b.selected = S.has(b.value)), w == null || w(Array.from(S)), p();
  }
  function p() {
    e(!1), f([]), u(/* @__PURE__ */ new Set()), v = null;
  }
  function D() {
    u(/* @__PURE__ */ new Set()), l().forEach((S) => S.selected = !1), w == null || w([]), p();
  }
  function C(S) {
    !t() || s != null && s.contains(S.target) || v != null && v.contains(S.target) || p();
  }
  function R(S, b) {
    const A = _().has(b.value);
    m(!A, b);
  }
  function M(S, b, A, ee) {
    s && (s.style.visibility = "hidden"), f(b || []), v = ee ?? null, w = A, x(), e(!0), queueMicrotask(() => {
      E(I(S)), s && (s.style.visibility = "visible");
    });
  }
  function H(S) {
    r(S);
  }
  const O = document.createElement("div");
  return O.classList.add("stk-filter-dropdown-wrapper"), document.body.appendChild(O), L = Jo(() => (() => {
    var S = ll(), b = S.firstChild, A = b.firstChild, ee = A.nextSibling;
    return S.$$click = (X) => X.stopPropagation(), Et((X) => s = X, S), oe(S, z(ol, {
      rowKey: "value",
      headless: !0,
      virtual: !0,
      noDataFull: !0,
      get theme() {
        return i();
      },
      rowActive: !1,
      rowHeight: 20,
      bordered: !1,
      columns: g,
      get dataSource() {
        return l();
      },
      onRowClick: R
    }), b), A.$$click = D, ee.$$click = y, pe((X) => {
      var we = `stk-filter-dropdown stk-filter-dropdown--${i()}`, G = c().y + "px", re = c().x + "px", Ee = t() ? void 0 : "none";
      return we !== X.e && Sn(S, X.e = we), G !== X.t && $t(S, "top", X.t = G), re !== X.a && $t(S, "left", X.a = re), Ee !== X.o && $t(S, "display", X.o = Ee), X;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), S;
  })(), O), document.addEventListener("click", C), pt(() => {
    document.removeEventListener("click", C), L == null || L();
  }), {
    get visible() {
      return t();
    },
    get trigger() {
      return v;
    },
    show: M,
    hide: p,
    setTheme: H
  };
}
let gn = null;
async function sl() {
  return gn || (gn = il()), gn;
}
Mt(["click"]);
var cl = /* @__PURE__ */ ge('<div class=stk-filter><svg class=stk-filter-icon xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"><path fill=currentColor d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z">'), al = /* @__PURE__ */ ge("<span>");
function ul(t) {
  const e = () => {
    var c;
    return ((c = t.theme) == null ? void 0 : c.call(t)) || "light";
  }, i = () => {
    var c;
    return !!((c = t.active) != null && c.call(t));
  };
  let r;
  function l(c) {
    c.stopPropagation();
    const _ = c.target.getBoundingClientRect(), u = window.pageYOffset || document.documentElement.scrollTop, g = window.pageXOffset || document.documentElement.scrollLeft;
    sl().then((s) => {
      if (s.visible && s.trigger === r) {
        s.hide();
        return;
      }
      s.setTheme(e()), s.show({
        x: _.left + g,
        y: _.bottom + u,
        height: _.height
      }, t.getOptions(), f, r);
    });
  }
  function f(c) {
    var E;
    (E = t.onChange) == null || E.call(t, c);
  }
  return (() => {
    var c = cl(), E = c.firstChild;
    oe(c, () => t.children ?? (() => {
      var u = al();
      return oe(u, () => t.col.title), u;
    })(), E), E.$$click = l;
    var _ = r;
    return typeof _ == "function" ? Et(_, E) : r = E, pe((u) => {
      var g = !!i(), s = e() === "light", v = e() === "dark";
      return g !== u.e && c.classList.toggle("stk-filter--active", u.e = g), s !== u.t && c.classList.toggle("stk-filter--light", u.t = s), v !== u.a && c.classList.toggle("stk-filter--dark", u.a = v), u;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), c;
  })();
}
Mt(["click"]);
function fl(t, e) {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((r) => {
    const l = r[e];
    l != null && i.add(l);
  }), Array.from(i).map((r) => ({
    label: String(r),
    value: r
  }));
}
function Rl(t) {
  const [e, i] = Ce({});
  function r(l, f) {
    return (c) => {
      const E = c.col.dataIndex, _ = Cn(), u = () => {
        var T;
        return ((T = e()[E]) == null ? void 0 : T.value.length) || 0;
      };
      let g = null, s = null;
      function v() {
        var I;
        if (!(l != null && l.autoOptions)) return [];
        const T = ((I = _ == null ? void 0 : _.rawDataSource) == null ? void 0 : I.call(_)) || (_ == null ? void 0 : _.dataSource()) || [];
        return g && s === T || (s = T, g = fl(T, E)), g;
      }
      function w() {
        return (l == null ? void 0 : l.options) ?? v();
      }
      function L(T) {
        var m, y;
        const I = {
          value: T,
          filter: (l == null ? void 0 : l.filter) ?? ((m = e()[E]) == null ? void 0 : m.filter)
        }, x = {
          ...e(),
          [E]: I
        };
        i(x), (y = t == null ? void 0 : t.onChange) == null || y.call(t, {
          colKey: E,
          status: I
        }), _ == null || _.setFilter(x, t);
      }
      return z(ul, {
        get col() {
          return c.col;
        },
        get colIndex() {
          return c.colIndex;
        },
        get rowIndex() {
          return c.rowIndex;
        },
        theme: () => (_ == null ? void 0 : _.theme()) || "light",
        active: () => u() > 0,
        getOptions: w,
        onChange: L,
        get children() {
          return f ? f(c) : void 0;
        }
      });
    };
  }
  return {
    Filter: r,
    filterStatus: e
  };
}
var dl = /* @__PURE__ */ ge("<input class=stk-editable-cell-input>"), hl = /* @__PURE__ */ ge("<div class=stk-editable-cell>");
function gl(t) {
  const e = () => t.trigger || "dblclick", [i, r] = Ce(t.cellValue), [l, f] = Ce(!1);
  let c, E;
  tt(ht(() => t.cellValue, (x) => {
    l() || r(x);
  }));
  function _(x) {
    x.type === e() && u();
  }
  function u() {
    r(t.cellValue), f(!0), queueMicrotask(() => {
      c == null || c.focus();
    });
  }
  function g() {
    var m;
    f(!1);
    const x = i();
    T(x), (m = t.onChange) == null || m.call(t, x), I();
  }
  function s() {
    f(!1), r(t.cellValue), I();
  }
  function v() {
    l() && g();
  }
  function w(x) {
    r(x.target.value);
  }
  function L(x) {
    x.key === "Enter" ? (x.preventDefault(), x.stopPropagation(), g()) : x.key === "Escape" || x.key === "Esc" ? (x.preventDefault(), x.stopPropagation(), s()) : x.key === "ArrowLeft" || x.key === "ArrowRight" || x.key === "ArrowUp" || x.key === "ArrowDown" ? x.stopPropagation() : x.key === "Tab" ? g() : x.stopPropagation();
  }
  function T(x) {
    const {
      row: m,
      col: y
    } = t;
    m[y.dataIndex] = x;
  }
  function I() {
    var m;
    const x = (m = E == null ? void 0 : E.closest) == null ? void 0 : m.call(E, ".stk-table");
    x == null || x.focus();
  }
  return (() => {
    var x = hl();
    return x.$$click = _, x.$$dblclick = _, Et((m) => E = m, x), oe(x, z(_e, {
      get when() {
        return l();
      },
      get fallback() {
        return Ue(() => i() ?? "");
      },
      get children() {
        var m = dl();
        return m.$$keydown = L, m.$$input = w, m.addEventListener("blur", v), Et((y) => c = y, m), pe(() => m.value = i()), m;
      }
    })), x;
  })();
}
Mt(["dblclick", "click", "input", "keydown"]);
function Dl(t) {
  function e() {
    return (i) => z(gl, mn(i, {
      get trigger() {
        return (t == null ? void 0 : t.trigger) || "dblclick";
      },
      onChange: (r) => {
        var l;
        (l = t == null ? void 0 : t.onChange) == null || l.call(t, r, i.row, i.col.dataIndex);
      }
    }));
  }
  return {
    EditableCell: e
  };
}
var ml = /* @__PURE__ */ ge("<div class=stk-checkbox-cell>"), _l = /* @__PURE__ */ ge("<input type=checkbox class=stk-checkbox-native>");
function Yn(t) {
  let e, i;
  tt(() => {
    i && (i.indeterminate = !!t.indeterminate);
  });
  function r(l) {
    var c, E;
    let f;
    typeof l == "boolean" ? f = l : ((c = l == null ? void 0 : l.target) == null ? void 0 : c.checked) !== void 0 ? f = l.target.checked : f = !!l, f !== e && (e = f, (E = t.onChange) == null || E.call(t, f));
  }
  return (() => {
    var l = ml();
    return oe(l, z(_e, {
      get when() {
        return t.customComponent;
      },
      get fallback() {
        return (() => {
          var f = _l();
          f.$$click = (E) => E.stopPropagation(), f.addEventListener("change", r);
          var c = i;
          return typeof c == "function" ? Et(c, f) : i = f, pe(() => f.checked = !!t.checked), f;
        })();
      },
      get children() {
        return z(qn, {
          get component() {
            return t.customComponent;
          },
          get checked() {
            return t.checked;
          },
          get indeterminate() {
            return t.indeterminate;
          },
          onChange: r,
          onClick: (f) => f.stopPropagation()
        });
      }
    })), l;
  })();
}
Mt(["click"]);
function kl(t) {
  const e = (t == null ? void 0 : t.field) ?? "_isChecked", i = t == null ? void 0 : t.checkboxComponent;
  function r() {
    return (f) => {
      const c = Cn(), E = () => (c == null || c.rowVersion(), !!f.row[e]);
      function _(u) {
        var g;
        f.row[e] = u, c == null || c.bumpRowVersion(), (g = t == null ? void 0 : t.onChange) == null || g.call(t, u, f.row);
      }
      return z(Yn, {
        get checked() {
          return E();
        },
        customComponent: i,
        onChange: _
      });
    };
  }
  function l() {
    return (f) => {
      const c = Cn(), E = () => (c == null ? void 0 : c.dataSource()) || [], _ = () => {
        c == null || c.rowVersion();
        const s = E();
        return s.length > 0 && s.every((v) => !!v[e]);
      }, u = () => {
        c == null || c.rowVersion();
        const s = E(), v = s.filter((w) => !!w[e]).length;
        return v > 0 && v < s.length;
      };
      function g(s) {
        var v;
        E().forEach((w) => {
          w[e] = s;
        }), c == null || c.bumpRowVersion(), (v = t == null ? void 0 : t.onSelectAll) == null || v.call(t, s);
      }
      return z(Yn, {
        get checked() {
          return _();
        },
        get indeterminate() {
          return u();
        },
        customComponent: i,
        onChange: g
      });
    };
  }
  return {
    CheckboxCell: r,
    CheckboxAllCell: l
  };
}
const wl = {
  cn: [
    [1e8, "亿"],
    [1e4, "万"]
  ],
  en: [
    [1e9, "B"],
    [1e6, "M"],
    [1e3, "K"]
  ]
};
function vl(t) {
  const e = t.indexOf("."), i = e === -1 ? t : t.slice(0, e), r = i.length;
  if (r <= 3) return t;
  const l = r % 3 || 3;
  let f = i.slice(0, l);
  for (let c = l; c < r; c += 3)
    f += "," + i.slice(c, c + 3);
  return e === -1 ? f : f + t.slice(e);
}
function ro(t, e = {}) {
  const {
    decimals: i,
    thousands: r = !0,
    prefix: l = "",
    suffix: f = "",
    showSign: c = !1,
    percent: E = !1,
    abbr: _,
    abbrDecimals: u,
    placeholder: g = "--"
  } = e;
  if (t == null || t === "")
    return g;
  const s = typeof t == "number" ? t : Number(t);
  if (Number.isNaN(s))
    return g;
  const v = s < 0 ? "-" : c && s > 0 ? "+" : "";
  let w = Math.abs(s);
  E && (w = w * 100);
  let L = "";
  if (_ && !E) {
    const m = wl[_];
    for (let y = 0; y < m.length; y++) {
      const p = m[y][0];
      if (w >= p) {
        w = w / p, L = m[y][1];
        break;
      }
    }
  }
  let T;
  L ? T = u ?? i ?? 2 : T = i ?? null;
  let I = T == null ? String(w) : w.toFixed(T);
  return r && (I = vl(I)), `${l}${v}${I}${L}${E ? "%" : ""}${f}`;
}
var xl = /* @__PURE__ */ ge("<span class=stk-number-cell>");
function Il(t) {
  function e() {
    return (i) => (() => {
      var r = xl();
      return oe(r, () => ro(i.cellValue, t)), r;
    })();
  }
  return {
    NumberCell: e
  };
}
var Cl = /* @__PURE__ */ ge("<span>"), Sl = /* @__PURE__ */ ge("<span class=stk-change-cell__arrow>");
function bl(t) {
  const e = t === "" || t == null ? NaN : Number(t);
  return Number.isNaN(e) || e === 0 ? "flat" : e > 0 ? "rise" : "fall";
}
function Ll(t = {}) {
  const {
    colorReverse: e = !1,
    arrow: i = !1,
    riseColor: r,
    fallColor: l,
    flatColor: f
  } = t;
  function c() {
    return (E) => {
      const _ = E.cellValue, u = bl(_);
      let g = "stk-change-cell--flat";
      u === "rise" ? g = e ? "stk-change-cell--green" : "stk-change-cell--red" : u === "fall" && (g = e ? "stk-change-cell--red" : "stk-change-cell--green");
      const s = u === "rise" ? r : u === "fall" ? l : f, v = i && u !== "flat" ? u === "rise" ? "▲" : "▼" : "";
      return (() => {
        var w = Cl();
        return Sn(w, `stk-change-cell ${g}`), oe(w, v ? (() => {
          var L = Sl();
          return oe(L, v), L;
        })() : null, null), oe(w, () => ro(_, t), null), pe((L) => ze(w, s ? {
          color: s
        } : void 0, L)), w;
      })();
    };
  }
  return {
    ChangeCell: c
  };
}
export {
  ol as StkTable,
  oo as StkTableContext,
  Zn as binarySearch,
  Ll as createChangeCell,
  kl as createCheckboxCell,
  Dl as createEditableCell,
  Rl as createFilterCell,
  Il as createNumberCell,
  ro as formatNumber,
  pl as insertToOrderedArray,
  yl as registerFeature,
  wn as strCompare,
  vn as tableSort,
  fr as useAreaSelection,
  Cn as useStkTableContext
};
