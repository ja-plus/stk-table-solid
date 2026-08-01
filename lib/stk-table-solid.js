import { createSignal as Ce, createMemo as q, createEffect as tt, onMount as pt, onCleanup as Tt, createContext as Uo, useContext as jo, createRoot as Zo, on as ht, mergeProps as Jo, Show as me, For as vt } from "solid-js";
import { template as ue, delegateEvents as Mt, insert as ee, memo as Ge, createComponent as K, effect as pe, setAttribute as ft, style as Ke, use as Et, addEventListener as St, spread as Vt, mergeProps as mn, className as Sn, setStyleProperty as $t, Dynamic as qn, render as Qo } from "solid-js/web";
const Gn = 100, er = 100, Mn = 200, Yt = 28, An = {
  light: { from: "#71a2fd", to: "#fff" },
  dark: { from: "#1e4c99", to: "#181c21" }
}, tr = 2e3, nr = "highlight-row", or = "highlight-cell", Un = Qn("chrome"), rr = Qn("firefox"), lr = Un < 56 || rr < 59, ir = Un < 85, sr = "stk", Hn = "expanded-", jn = "--", qt = {
  emptyToBottom: !1,
  stringLocaleCompare: !1,
  sortChildren: !1
}, _n = {
  enabled: !0,
  disabled: () => !1,
  revokable: !0
};
function Gt(t, e) {
  let i = t == null;
  return e && (i = i || typeof t == "boolean" || Number.isNaN(+t)), i;
}
function Dl(t, e, i, r = {}) {
  const { dataIndex: l, sortField: f, order: c } = t;
  let { sortType: E } = t;
  const _ = f || l;
  E || (E = typeof e[_]);
  const u = E === "number", g = i.slice();
  if (!c || !g.length)
    return g.unshift(e), g;
  const { emptyToBottom: s, customCompare: v, stringLocaleCompare: w } = { emptyToBottom: !1, ...r }, L = e[_];
  if (s && Gt(L, u))
    g.push(e);
  else {
    const p = c === "asc", I = v || ((m, y) => {
      const T = m[_], D = wn(T, L, u, w);
      return p ? D : -D;
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
function cr(t, e, i) {
  const r = [], l = [], f = t.sortField || t.dataIndex;
  for (let c = 0, E = e.length; c < E; c++) {
    const _ = e[c];
    Gt(_ == null ? void 0 : _[f], i) ? r.push(_) : l.push(_);
  }
  return [l, r];
}
function vn(t, e, i, r = {}) {
  if (!(i != null && i.length) || !t) return i || [];
  r = { ...qt, ...r };
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
    const s = g === "number", [v, w] = cr(t, l, s);
    e === "asc" ? v.sort((L, p) => wn(L[f], p[f], s, E)) : v.sort((L, p) => wn(p[f], L[f], s, E)), l = e === "desc" || _ ? v.concat(w) : w.concat(v), u && l.forEach((L) => {
      var p;
      (p = L.children) != null && p.length && (L.children = vn(t, e, L.children, r));
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
function Bt(t) {
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
function Ut(t) {
  return t == null ? void 0 : t.closest("td");
}
function gt(t) {
  const e = bt(t);
  return e ? Number(e.dataset.rowI) : -1;
}
function Pt(t) {
  var e;
  return (e = Ut(t)) == null ? void 0 : e.dataset.colKey;
}
function ar(t, e) {
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
function ur(t) {
  const e = t.minWidth ?? t.width ?? Gn;
  return typeof e == "number" ? Math.floor(e) : parseInt(e);
}
function lt(t) {
  return (t == null ? void 0 : t.__W__) || Gn;
}
function fr() {
  let t = window.__STK_TB_ID_COUNT__;
  return t || (t = 0), t += 1, window.__STK_TB_ID_COUNT__ = t, sr + t.toString(36);
}
const to = "stkName";
function dr(t, e, i, r, l, f, c, E, _, u, g, s) {
  const p = "ArrowUp", I = "ArrowDown", x = "ArrowLeft", m = "ArrowRight", T = "Escape", R = "data-cs-s", M = "data-cs-t", A = "data-cs-b", P = "data-cs-l", S = "data-cs-r", b = "data-rs-s", [H, te] = Ce([]), [X, we] = Ce(!1);
  let G = null, re = 0, Ee = 0, De = 0;
  const de = q(() => {
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
  }), Xe = q(() => de().keyboard), it = q(() => de().ctrl), B = q(() => de().shift), z = q(() => {
    var a;
    return (a = de().highlight) == null ? void 0 : a.cell;
  }), se = q(() => {
    var a;
    return (a = de().highlight) == null ? void 0 : a.row;
  }), fe = q(() => {
    const a = l(), $ = /* @__PURE__ */ new Map();
    for (let F = 0; F < a.length; F++)
      $.set(f()(a[F]), F);
    return $;
  }), he = q(() => {
    var ne, J;
    const a = l(), $ = new Array(a.length + 1).fill(0), F = new Array(a.length + 1).fill(0);
    let W = 0;
    for (let N = 0; N < a.length; N++)
      $[N] = W, ((ne = a[N]) == null ? void 0 : ne.fixed) === "left" && (W += lt(a[N]));
    $[a.length] = W;
    let le = 0;
    for (let N = a.length - 1; N >= 0; N--)
      F[N] = le, ((J = a[N]) == null ? void 0 : J.fixed) === "right" && (le += lt(a[N]));
    return (N) => [$[N] ?? 0, F[N + 1] ?? 0];
  });
  let ge = /* @__PURE__ */ new Set();
  function $e() {
    const a = H();
    if (!a.length) {
      ge = /* @__PURE__ */ new Set();
      return;
    }
    const $ = /* @__PURE__ */ new Set(), F = l(), W = r();
    for (const le of a) {
      const {
        begin: { row: ne, col: J },
        end: { row: N, col: Q }
      } = le.index, [U, Y] = ne < N ? [ne, N] : [N, ne], [ie, j] = J < Q ? [J, Q] : [Q, J];
      for (let Z = U; Z <= Y; Z++) {
        const ce = W[Z];
        if (ce)
          for (let be = ie; be <= j; be++) {
            const We = F[be];
            We && $.add(c(ce, We));
          }
      }
    }
    ge = $;
  }
  function Pe() {
    const a = i();
    if (!a) return;
    const $ = z(), F = se(), W = a.querySelectorAll(`[${R}]`);
    for (let N = 0; N < W.length; N++) {
      const Q = W[N];
      Q.removeAttribute(R), Q.removeAttribute(M), Q.removeAttribute(A), Q.removeAttribute(P), Q.removeAttribute(S);
    }
    const le = a.querySelectorAll(`[${b}]`);
    for (let N = 0; N < le.length; N++)
      le[N].removeAttribute(b);
    $e();
    const ne = H();
    if (!ne.length) return;
    const J = a.querySelector(".stk-tbody-main");
    if (J) {
      if (F)
        for (const N of ne) {
          const { minRow: Q, maxRow: U } = ve(N);
          for (let Y = Q; Y <= U; Y++) {
            const ie = J.querySelector(`tr[data-row-i="${Y}"]`);
            ie && ie.setAttribute(b, "");
          }
        }
      if ($) {
        const N = ne[ne.length - 1], { minRow: Q, maxRow: U, minCol: Y, maxCol: ie } = ve(N), j = J.querySelectorAll("tr[data-row-i]");
        for (let Z = 0; Z < j.length; Z++) {
          const ce = j[Z], be = parseInt(ce.getAttribute("data-row-i"), 10);
          let We = !1;
          for (const Je of ne) {
            const { minRow: je, maxRow: ct } = ve(Je);
            if (be >= je && be <= ct) {
              We = !0;
              break;
            }
          }
          if (!We) continue;
          const ze = ce.querySelectorAll("td[data-col-key]");
          for (let Je = 0; Je < ze.length; Je++) {
            const je = ze[Je], ct = je.getAttribute("data-col-key"), Qe = fe().get(ct);
            if (Qe === void 0 || Qe < 0) continue;
            const Re = r()[be], _e = l();
            if (!Re || !_e[Qe]) continue;
            const ot = c(Re, _e[Qe]);
            if (!ge.has(ot)) continue;
            if (je.setAttribute(R, ""), be >= Q && be <= U && Qe >= Y && Qe <= ie) {
              const Jt = be + (parseInt(je.getAttribute("rowspan") || "1", 10) || 1) - 1, Qt = Qe + (parseInt(je.getAttribute("colspan") || "1", 10) || 1) - 1;
              be === Q && je.setAttribute(M, ""), Jt === U && je.setAttribute(A, ""), Qe === Y && je.setAttribute(P, ""), Qt === ie && je.setAttribute(S, "");
            }
          }
        }
      }
    }
  }
  tt(() => {
    const a = H(), $ = _(), F = u();
    a.length, a.length > 0 && JSON.stringify(a.map((W) => W.index)), F.scrollLeft, $.startIndex, $.endIndex, F.startIndex, F.endIndex, r().length, l().length, queueMicrotask(Pe);
  }), pt(() => {
    Se();
  }), Tt(() => {
    ye();
  }), tt(() => {
    const a = r().length, $ = l().length;
    if (!de().enabled || (G && (a === 0 || $ === 0 ? G = null : (G.rowIndex = ke(G.rowIndex, 0, a - 1), G.colIndex = ke(G.colIndex, 0, $ - 1))), !H().length)) return;
    if (a === 0 || $ === 0) {
      Ht(), Ze();
      return;
    }
    const F = a - 1, W = $ - 1;
    let le = !1;
    const ne = [];
    for (const J of H()) {
      const { begin: N, end: Q } = J.index, U = ke(N.row, 0, F), Y = ke(N.col, 0, W), ie = ke(Q.row, 0, F), j = ke(Q.col, 0, W);
      U !== N.row || Y !== N.col || ie !== Q.row || j !== Q.col ? (le = !0, ne.push(Ae(U, Y, ie, j))) : ne.push(J);
    }
    le && (te(ne), Ze());
  });
  function Se() {
    var a;
    ye(), (a = i()) == null || a.addEventListener("keydown", Dt);
  }
  function ye() {
    var a;
    (a = i()) == null || a.removeEventListener("keydown", Dt), document.removeEventListener("mousemove", Te), document.removeEventListener("mouseup", Ue), yt();
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
    return a ? fe().get(a) ?? -1 : -1;
  }
  function Ye(a, $) {
    const F = r(), W = l(), le = F[a], ne = W[$];
    if (!le || !ne || !ne.mergeCells) return [1, 1];
    const { rowspan: J = 1, colspan: N = 1 } = ne.mergeCells({ row: le, col: ne, rowIndex: a, colIndex: $ }) || {};
    return [J || 1, N || 1];
  }
  function Ie(a) {
    var wt;
    const { minRow: $, maxRow: F, minCol: W, maxCol: le } = ve(a), ne = r(), J = l(), N = ne.length, Q = J.length, U = [];
    for (let Re = 0; Re < Q; Re++)
      (wt = J[Re]) != null && wt.mergeCells && U.push(Re);
    if (!U.length) return a;
    let [Y, ie, j, Z] = [$, F, W, le], ce = !0, be = 0;
    for (; ce && be++ < 100; ) {
      ce = !1;
      for (const Re of U) {
        if (Re < j || Re > Z) continue;
        const [_e] = Ye(ie, Re);
        _e > 1 && ie + _e - 1 < N && ie + _e - 1 > ie && (ie = ie + _e - 1, ce = !0);
      }
      for (let Re = Y; Re <= ie; Re++) {
        const [, _e] = Ye(Re, Z);
        _e > 1 && Z + _e - 1 < Q && Z + _e - 1 > Z && (Z = Z + _e - 1, ce = !0);
      }
      for (const Re of U)
        if (!(Re < j || Re > Z))
          for (let _e = Y - 1; _e >= 0 && _e > Y - 500; _e--) {
            const [ot] = Ye(_e, Re);
            if (ot <= 1) continue;
            if (_e + ot - 1 >= Y)
              _e < Y && (Y = _e, ce = !0);
            else
              break;
          }
      for (let Re = Y; Re <= ie; Re++)
        for (let _e = j - 1; _e >= 0 && _e > j - 500; _e--) {
          const [, ot] = Ye(Re, _e);
          if (ot <= 1) continue;
          if (_e + ot - 1 >= j)
            _e < j && (j = _e, ce = !0);
          else
            break;
        }
    }
    if (Y === $ && ie === F && j === W && Z === le)
      return a;
    const { begin: We, end: ze } = a.index, Je = We.row < ze.row || We.row === ze.row ? Y : ie, je = We.row < ze.row || We.row === ze.row ? ie : Y, ct = We.col <= ze.col ? j : Z, Qe = We.col <= ze.col ? Z : j;
    return Ae(Je, ct, je, Qe);
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
      case p:
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
    const { top: W, bottom: le, left: ne, right: J } = F;
    let N = 0, Q = 0;
    if ($ < W + 40) {
      const U = Math.max(0, W + 40 - $);
      Q = -Math.ceil(U / 40 * 15);
    } else if ($ > le - 40) {
      const U = Math.max(0, $ - (le - 40));
      Q = Math.ceil(U / 40 * 15);
    }
    if (a < ne + 40) {
      const U = Math.max(0, ne + 40 - a);
      N = -Math.ceil(U / 40 * 15);
    } else if (a > J - 40) {
      const U = Math.max(0, a - (J - 40));
      N = Math.ceil(U / 40 * 15);
    }
    return { deltaX: N, deltaY: Q };
  }
  function Ne(a) {
    if (!de().enabled || a.button !== 0) return;
    const $ = gt(a.target), F = Pt(a.target), W = He(F);
    if ($ < 0 || W < 0) return;
    const le = a.ctrlKey || a.metaKey, ne = Ie(Ae($, W, $, W));
    if (a.shiftKey && G && B()) {
      const J = H().slice(), N = Ie(
        Ae(G.rowIndex, G.colIndex, $, W)
      );
      J.length ? J[J.length - 1] = N : J.push(N), te(J);
    } else
      G = { rowIndex: $, colIndex: W }, le && it() ? te(H().concat([ne])) : te([ne]);
    we(!0), Ee = a.clientX, De = a.clientY, document.addEventListener("mousemove", Te), document.addEventListener("mouseup", Ue);
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
    ), W = [...H()];
    W.length > 0 ? W[W.length - 1] = F : W.push(F), te(W);
  }
  function nt() {
    const a = i();
    if (!a) return;
    const $ = a.getBoundingClientRect(), { top: F, bottom: W, left: le, right: ne } = $, J = De < F + 40 || De > W - 40 || Ee < le + 40 || Ee > ne - 40;
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
    const F = a.querySelector("thead"), { top: W, bottom: le, left: ne, right: J } = $, N = F ? W + F.offsetHeight : W, Q = Math.max(ne + 2, Math.min(Ee, J - 2)), U = Math.max(N + 2, Math.min(De, le - 2)), Y = document.elementFromPoint(Q, U);
    if (!Y) return;
    const ie = Ut(Y), j = bt(Y);
    if (!ie || !j) return;
    const Z = gt(j), ce = Pt(ie), be = He(ce);
    Number.isNaN(Z) || Z < 0 || be < 0 || Me(Z, be);
  }
  function yt() {
    re && (cancelAnimationFrame(re), re = 0);
  }
  function Ue() {
    if (!X()) return;
    we(!1), yt(), document.removeEventListener("mousemove", Te), document.removeEventListener("mouseup", Ue);
    const a = H();
    if (a.length) {
      const $ = Ie(a[a.length - 1]);
      if ($ !== a[a.length - 1]) {
        const F = [...a];
        F[F.length - 1] = $, te(F);
      }
    }
    Ze();
  }
  function Ze() {
    var a;
    (a = e.onAreaSelectionChange) == null || a.call(e, H());
  }
  function At() {
    const a = de();
    return typeof a.formatCellForClipboard == "function" ? a.formatCellForClipboard : null;
  }
  function Rt() {
    const a = H();
    if (!a.length) return "";
    const $ = a[a.length - 1], { minRow: F, maxRow: W, minCol: le, maxCol: ne } = ve($), J = r(), N = l(), Q = At(), U = [];
    for (let ie = F; ie <= W; ie++) {
      const j = J[ie];
      if (!j) continue;
      const Z = [];
      for (let ce = le; ce <= ne; ce++) {
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
    if (!de().enabled) return;
    const $ = a.key;
    if ($ === T || $ === "Esc") {
      at(), H().length && a.preventDefault();
      return;
    }
    if ((a.ctrlKey || a.metaKey) && $ === "c" && H().length) {
      Rt(), a.preventDefault();
      return;
    }
    if (!Xe()) return;
    const F = [p, I, x, m].includes($), W = $ === "Tab";
    if (!(F || W)) return;
    a.preventDefault();
    const ne = r().length, J = l().length;
    if (ne === 0 || J === 0) return;
    if (!H().length) {
      G = { rowIndex: 0, colIndex: 0 }, te([Ae(0, 0, 0, 0)]), Ze(), ut(0, 0);
      return;
    }
    const [N, Q] = Fe($, a.shiftKey);
    if (a.shiftKey && F && B()) {
      at();
      const U = [...H()], Y = U.length > 0 ? U[U.length - 1] : null;
      if (!Y) return;
      const { begin: ie, end: j } = Y.index;
      let Z = j.row + N, ce = j.col + Q;
      Z = ke(Z, 0, ne - 1), ce = ke(ce, 0, J - 1), U[U.length - 1] = Ae(ie.row, ie.col, Z, ce), te(U), ut(Z, ce);
    } else {
      at();
      const U = H(), Y = U.length > 0 ? U[U.length - 1] : null, ie = Y ? ve(Y).minRow : 0, j = Y ? ve(Y).minCol : 0;
      let Z = ie + N, ce = j + Q;
      if (Z = ke(Z, 0, ne - 1), ce = ke(ce, 0, J - 1), W) {
        const be = j + Q, [We, ze] = mt(ie, ce, be, ne, J);
        Z = We, ce = ze;
      }
      G = { rowIndex: Z, colIndex: ce }, te([Ae(Z, ce, Z, ce)]), ut(Z, ce);
    }
    Ze();
  }
  function ut(a, $) {
    const F = i();
    if (!F) return;
    const W = r()[a], le = l()[$];
    if (!W || !le) return;
    const ne = F.querySelector("thead"), J = ne ? ne.offsetHeight : 0, N = F.querySelector("tfoot"), Q = N ? N.offsetHeight : 0, U = _(), Y = u(), ie = t.scrollRowByRow, j = U.rowHeight, Z = a * j, ce = Z + j, be = ie ? U.scrollTop : F.scrollTop, We = be + U.containerHeight - J - Q;
    let ze = null;
    Z < be ? ze = Z : ce > We && (ze = ce - (U.containerHeight - J - Q));
    const [Je, je] = xe($), ct = Je + je, Qe = F.scrollLeft, wt = Qe + Y.containerWidth, [Re, _e] = he()($);
    let ot = null;
    Je < Qe + Re ? ot = Je - Re : ct > wt - _e && (ot = ct - Y.containerWidth + _e), (ze !== null || ot !== null) && E(ze, ot);
  }
  function jt() {
    const a = H();
    if (!a.length) return { rows: [], cols: [], ranges: [] };
    const $ = r(), F = l(), W = /* @__PURE__ */ new Set(), le = /* @__PURE__ */ new Set();
    for (const N of a) {
      const { minRow: Q, maxRow: U, minCol: Y, maxCol: ie } = ve(N);
      for (let j = Q; j <= U; j++) W.add(j);
      for (let j = Y; j <= ie; j++) le.add(j);
    }
    const ne = [...W].sort((N, Q) => N - Q), J = [...le].sort((N, Q) => N - Q);
    return {
      rows: ne.map((N) => $[N]).filter(Boolean),
      cols: J.map((N) => F[N]).filter(Boolean),
      ranges: a.map((N) => ({ ...N }))
    };
  }
  function Ht() {
    te([]), we(!1);
  }
  function Zt(a, $ = {}) {
    if (!de().enabled) return H();
    const { silent: F = !1, scrollToView: W = !1 } = $, le = r().length, ne = l().length;
    if (le <= 0 || ne <= 0)
      return Ht(), F || Ze(), H();
    const J = le - 1, N = ne - 1;
    let Q = 0, U = J, Y = 0, ie = N;
    if (a) {
      const j = a.begin, Z = a.end ?? j;
      Q = typeof j.row == "number" ? j.row : g(j.row), U = typeof Z.row == "number" ? Z.row : g(Z.row);
      const ce = typeof j.col == "number" ? j.col : j.col ? s(j.col) : void 0, be = typeof Z.col == "number" ? Z.col : Z.col ? s(Z.col) : void 0;
      ce !== void 0 ? (Y = ce, ie = be !== void 0 ? be : ce) : be !== void 0 && (Y = 0, ie = be);
    }
    return Q = ke(Q, 0, J), U = ke(U, 0, J), Y = ke(Y, 0, N), ie = ke(ie, 0, N), te([Ae(Q, Y, U, ie)]), G = { rowIndex: Q, colIndex: Y }, we(!1), W && ut(U, ie), F || Ze(), H();
  }
  return {
    config: de,
    isSelecting: X,
    get: jt,
    set: Zt,
    clear: Ht,
    copy: Rt,
    onMD: Ne
  };
}
const bn = "useAreaSelection";
dr[to] = bn;
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
function kl(t) {
  (Array.isArray(t) ? t : [t]).forEach((i) => {
    const r = i[to];
    if (!r) {
      console.warn("invalid feature");
      return;
    }
    no[r] = i;
  });
}
var hr = /* @__PURE__ */ ue('<span class=drag-row-handle draggable=true><svg viewBox="0 0 1024 1024"width=20 height=20 fill=currentColor><path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z">');
function On(t) {
  return (() => {
    var e = hr();
    return e.addEventListener("dragstart", (i) => {
      var r;
      return (r = t.onDragStart) == null ? void 0 : r.call(t, i);
    }), e;
  })();
}
var gr = /* @__PURE__ */ ue('<svg xmlns=http://www.w3.org/2000/svg width=16px height=16px viewBox="0 0 16 16"><polygon class=arrow-up fill=#757699 points="8 2 4.8 6 11.2 6"></polygon><polygon class=arrow-down transform="translate(8, 12) rotate(-180) translate(-8, -12) "points="8 10 4.8 14 11.2 14">');
function mr() {
  return gr();
}
var _r = /* @__PURE__ */ ue("<div class=stk-fold-icon>");
function xn(t) {
  return (() => {
    var e = _r();
    return e.$$click = (i) => {
      var r;
      return (r = t.onClick) == null ? void 0 : r.call(t, i);
    }, e;
  })();
}
Mt(["click"]);
var wr = /* @__PURE__ */ ue("<div><span>");
function vr(t) {
  return (() => {
    var e = wr(), i = e.firstChild;
    return ee(e, (() => {
      var r = Ge(() => t.row.children !== void 0);
      return () => r() && K(xn, {
        onClick: (l) => {
          var f;
          return (f = t.onClick) == null ? void 0 : f.call(t, l);
        }
      });
    })(), i), ee(i, () => t.row[t.col.dataIndex] ?? ""), pe((r) => {
      var l = t.row[t.col.dataIndex] || "", f = t.row.__T_LV__ ? `padding-left:${t.row.__T_LV__ * 16}px` : "", c = t.row.children ? void 0 : "padding-left: 16px;";
      return l !== r.e && ft(e, "title", r.e = l), r.t = Ke(e, f, r.t), r.a = Ke(i, c, r.a), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), e;
  })();
}
const oo = Uo(void 0);
function Cn() {
  return jo(oo);
}
const et = {
  TH: 0,
  TD: 1,
  /** tfoot */
  TF: 2
};
function xr(t, e, i, r) {
  let l = null, f = !1;
  tt(() => {
    i.virtual ? c() : E();
  }), tt(() => {
    i.virtualX ? c() : E();
  }), pt(() => {
    (i.virtual || i.virtualX) && c();
  }), Tt(() => {
    E();
  });
  function c() {
    if (f && E(), window.ResizeObserver) {
      if (!t()) {
        Zo((g) => {
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
function Cr(t, e, i, r, l, f, c, E) {
  const [_, u] = Ce(!1);
  let g = {
    currentCol: null,
    lastCol: null,
    startX: 0,
    startOffsetTableX: 0,
    revertMoveX: !1
  };
  const s = q(() => Object.prototype.toString.call(t.colResizable) === "[object Object]" ? (m) => !t.colResizable.disabled(m) : (m) => !!t.colResizable);
  pt(() => {
    v();
  }), Tt(() => {
    w();
  });
  function v() {
    window.addEventListener("mousemove", p), window.addEventListener("mouseup", I);
  }
  function w() {
    window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", I);
  }
  function L(m, y, T = !1) {
    if (!i()) return;
    m.stopPropagation(), m.preventDefault();
    const { clientX: D } = m, { scrollLeft: C, scrollTop: R } = i(), { left: M } = i().getBoundingClientRect(), A = r();
    let P = !1;
    const S = f(), b = S(y), H = A.findIndex((G) => S(G) === b), te = c().indexOf(y), X = te !== -1;
    T ? X && y.fixed === "right" ? P = !0 : H - 1 >= 0 && (y = A[H - 1]) : X && y.fixed === "right" && (y = c()[te + 1] || y);
    const we = D - M + C;
    if (u(!0), Object.assign(g, {
      currentCol: y,
      lastCol: x(y),
      startX: D,
      startOffsetTableX: we,
      revertMoveX: P
    }), l()) {
      const G = l().style;
      G.display = "block", G.left = we + "px", G.top = R + "px";
    }
  }
  function p(m) {
    if (!_()) return;
    m.stopPropagation(), m.preventDefault();
    const { lastCol: y, startX: T, startOffsetTableX: D } = g, { clientX: C } = m;
    let R = C - T;
    const M = lt(y), A = (y == null ? void 0 : y.minWidth) ?? t.colMinWidth;
    M + R < A && (R = -M);
    const P = D + R;
    l() && (l().style.left = P + "px");
  }
  function I(m) {
    var S, b;
    if (!_()) return;
    const { startX: y, lastCol: T, revertMoveX: D } = g, { clientX: C } = m, R = D ? y - C : C - y;
    let M = lt(T) + R;
    M < t.colMinWidth && (M = t.colMinWidth);
    const A = f(), P = r().find((H) => A(H) === A(T));
    if (P && (P.width = M + "px", E == null || E(), (S = e["onUpdate:columns"]) == null || S.call(e, t.columns.slice()), (b = e.onColResize) == null || b.call(e, { ...P })), l()) {
      const H = l().style;
      H.display = "none", H.left = "0", H.top = "0";
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
      const T = m.children.slice(-1)[0];
      return x(T);
    }
    return m;
  }
  return [s, _, L];
}
function Sr(t, e, i, r, l, f) {
  const [c, E] = Ce([]), [_, u] = Ce([]), [g, s] = Ce([]), v = q(() => {
    const L = /* @__PURE__ */ new Map(), p = c(), I = _(), x = g(), m = e(), y = t.fixedColShadow, T = r();
    for (let D = 0, C = T.length; D < C; D++) {
      const R = T[D];
      for (let M = 0, A = R.length; M < A; M++) {
        const P = R[M], S = P.fixed, b = S && y && p.includes(P), H = [];
        I.includes(P) && H.push("fixed-cell--active"), S && (H.push("fixed-cell"), H.push("fixed-cell--" + S)), b && H.push("fixed-cell--shadow"), S === "right" && x.includes(P) && H.push("fixed-cell--border-left"), L.set(m(P), H.join(" "));
      }
    }
    return L;
  });
  function w(L) {
    const p = [], I = i();
    let x, m;
    if (L != null && L()) {
      const { containerWidth: C, scrollLeft: R } = L();
      x = C, m = R;
    } else {
      const { clientWidth: C, scrollLeft: R } = f();
      x = C, m = R;
    }
    const y = [], T = [], D = l().length;
    for (let C = 0; C < D; C++) {
      const R = l()[C];
      let M = R.length;
      for (; M > 0 && R[M - 1].fixed === "right"; )
        M--;
      let A = 0;
      for (let P = 0, S = R.length; P < S; P++) {
        const b = R[P], H = I(b), te = b.fixed === "left", X = b.fixed === "right";
        if (te && H + m > A && (p.push(b), y[C] = b), A += lt(b), X) {
          const we = m + x - A < H;
          (P >= M || we) && p.push(b), we && !T[C] && (T[C] = b);
        }
      }
    }
    t.fixedColShadow && E(y.concat(T).filter(Boolean)), s(T.filter(Boolean)), u(p);
  }
  return [_, v, w];
}
function br(t, e, i, r, l, f, c) {
  function E(_, u, g = 0) {
    const { fixed: s } = u;
    if ((_ === et.TD || _ === et.TF) && !s) return "";
    const { headerRowHeight: v, rowHeight: w } = t, L = s === "left", { scrollLeft: p, scrollWidth: I, offsetLeft: x, containerWidth: m } = l(), y = I - m - p;
    let T = "";
    if (_ === et.TH ? e() ? T += `top:${r().scrollTop}px;` : g && (T += `top:${g * (v ?? w)}px;`) : _ === et.TF && (T += "bottom:0;"), s)
      if (e())
        L ? T += `left:${p - (f() ? x : 0)}px;` : T += `right:${Math.max(y - (f() ? c() : 0), 0)}px;`;
      else {
        const D = i()(u) + "px";
        L ? T += `left:${D};` : T += `right:${D};`;
      }
    return T;
  }
  return E;
}
function Er(t, e) {
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
function pr(t, e, i) {
  const r = t.highlightConfig, l = {
    light: An.light,
    dark: An.dark
  }, f = q(() => r.duration ? r.duration * 1e3 : tr), c = q(() => r.fps && r.fps > 0 ? 1e3 / r.fps : null), E = q(() => c() ? Math.round(f() / c()) : null), _ = q(() => l[t.theme].from), u = /* @__PURE__ */ new Map();
  let g = !1;
  const s = /* @__PURE__ */ new Map(), v = /* @__PURE__ */ new Map(), w = q(() => {
    const T = { backgroundColor: [_(), ""] };
    return E() && (T.easing = `steps(${E()})`), { duration: f(), keyframe: T };
  });
  function L() {
    if (g) return;
    g = !0;
    const T = () => {
      window.requestAnimationFrame(
        () => {
          const D = performance.now(), C = [];
          u.forEach((R, M) => {
            const { ts: A, duration: P } = R, S = D - A;
            S < P ? y(M, R, S) && C.push(M) : C.push(M);
          }), C.forEach((R) => u.delete(R)), u.size ? T() : (g = !1, u.clear());
        }
      );
    };
    T();
  }
  function p(T, D, C = {}) {
    var b;
    const R = (b = i()) == null ? void 0 : b.querySelector(`[data-row-key="${T}"] [data-col-key="${D}"]`);
    if (!R) return;
    const { className: M, method: A, duration: P, keyframe: S } = {
      className: or,
      method: "animation",
      ...w(),
      ...C
    };
    A === "animation" ? R.animate(S, P) : m(R, T, D, M, P);
  }
  function I(T, D = {}) {
    if (Array.isArray(T) || (T = [T]), !T.length) return;
    const { className: C, method: R, keyframe: M, duration: A } = {
      className: nr,
      method: "animation",
      ...w(),
      ...D
    }, P = !!D.ignoreInvisible;
    if (R === "animation")
      if (t.virtual) {
        const S = performance.now();
        for (let b = 0; b < T.length; b++) {
          const H = T[b], te = { ts: S, visible: !1, keyframe: M, duration: A, ignoreInvisible: P }, X = y(H, te, 0);
          P && X ? u.delete(H) : u.set(H, te);
        }
        L();
      } else
        for (let S = 0; S < T.length; S++) {
          const b = document.getElementById(e + "-" + String(T[S]));
          b && b.animate(M, A);
        }
    else
      x(T, C, A);
  }
  function x(T, D, C) {
    var A;
    let R = !1;
    const M = [];
    for (let P = 0; P < T.length; P++) {
      const S = T[P], b = document.getElementById(e + "-" + String(S));
      b && (b.classList.contains(D) && (b.classList.remove(D), R = !0), M.push(b), window.clearTimeout(s.get(S)), s.set(
        S,
        window.setTimeout(() => {
          b.classList.remove(D), s.delete(S);
        }, C)
      ));
    }
    R && ((A = i()) == null || A.offsetWidth), M.forEach((P) => P.classList.add(D));
  }
  function m(T, D, C, R, M) {
    T.classList.contains(R) && (T.classList.remove(R), T.offsetHeight), T.classList.add(R);
    const A = `${D}-${C}`;
    window.clearTimeout(v.get(A)), M && v.set(
      A,
      window.setTimeout(() => {
        T.classList.remove(R), v.delete(A);
      }, M)
    );
  }
  function y(T, D, C) {
    const R = document.getElementById(e + "-" + String(T)), { visible: M, ignoreInvisible: A } = D;
    if (!R)
      return A ? !0 : (M && (D.visible = !1), !1);
    const { keyframe: P, duration: S } = D;
    if (!M) {
      D.visible = !0;
      const b = C / S;
      R.animate(P, {
        duration: S - C,
        /** 从什么时候开始，0-1 */
        iterationStart: b,
        /** 持续多久 0-1 */
        iterations: 1 - b
      });
    }
    return !1;
  }
  return [E, I, p];
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
function yr(t, e, i, r, l, f, c, E) {
  let _ = !1;
  tt(
    ht(c, (p) => {
      g(), p && u();
    })
  ), pt(u), Tt(g);
  function u() {
    var p, I, x;
    window.addEventListener("keydown", s), (p = t()) == null || p.addEventListener("mouseenter", v), (I = t()) == null || I.addEventListener("mouseleave", w), (x = t()) == null || x.addEventListener("mousedown", L);
  }
  function g() {
    var p, I, x;
    window.removeEventListener("keydown", s), (p = t()) == null || p.removeEventListener("mouseenter", v), (I = t()) == null || I.removeEventListener("mouseleave", w), (x = t()) == null || x.removeEventListener("mousedown", L);
  }
  function s(p) {
    if (!c() || E().keyboard) return;
    const I = p.code;
    if (!Tr.includes(I) || !_) return;
    p.preventDefault();
    const { scrollTop: x, rowHeight: m, containerHeight: y, scrollHeight: T } = r(), { scrollLeft: D } = l(), { headless: C, headerRowHeight: R } = e, M = C ? 0 : f().length * (R || m), A = Math.floor((y - M) / m);
    I === dt.ArrowUp ? i(x - m, null) : I === dt.ArrowRight ? i(null, D + 50) : I === dt.ArrowDown ? i(x + m, null) : I === dt.ArrowLeft ? i(null, D - 50) : I === dt.PageUp ? i(x - m * A + M, null) : I === dt.PageDown ? i(x + m * A - M, null) : I === dt.Home ? i(0, null) : I === dt.End && i(T, null);
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
function Rr(t, e, i, r) {
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
      for (let p = 0; p < g; p++) {
        const I = _[p], { rowspan: x = 1 } = I.mergeCells({ row: v, col: I, rowIndex: s, colIndex: p }) || {};
        x > 1 && x > L && (L = x, l.set(w, L));
      }
    }
  }
  return [l, f];
}
function Dr(t, e, i, r, l) {
  const [f, c] = Ce(/* @__PURE__ */ new Set()), [E, _] = Ce(/* @__PURE__ */ new Set()), u = q(() => {
    const p = l(), I = e(), x = r();
    let m = null;
    const y = {}, T = /* @__PURE__ */ new Map();
    for (let D = 0; D < I.length; D++) {
      const C = I[D];
      if (!C.mergeCells) continue;
      const R = x(C);
      for (let M = 0; M < p.length; M++) {
        const A = p[M];
        if (!A) continue;
        let { colspan: P, rowspan: S } = C.mergeCells({ row: A, col: C, rowIndex: M, colIndex: C.__LF_S__ ?? 0 }) || {};
        if (P = P || 1, S = S || 1, P === 1 && S === 1) continue;
        const b = Fn(i(A), R);
        T.set(b, { rowspan: S, colspan: P }), m || (m = {});
        const H = Math.min(D + P, I.length), te = Math.min(M + S, p.length);
        for (let X = M; X < te; X++) {
          const we = p[X];
          if (!we) continue;
          const G = i(we), re = y[G] || (y[G] = /* @__PURE__ */ new Set()), Ee = m[G] || (m[G] = /* @__PURE__ */ new Set());
          for (let De = D; De < H; De++)
            re.add(b), !(X === M && De === D) && Ee.add(x(I[De]));
        }
      }
    }
    return { hiddenCellMap: m, hoverRowMap: y, spanMap: T };
  }), g = () => u().hiddenCellMap;
  function s(p, I) {
    if (I.mergeCells)
      return u().spanMap.get(Fn(i(p), r()(I)));
  }
  const v = /* @__PURE__ */ new Set();
  function w(p) {
    c(p === void 0 ? v : u().hoverRowMap[p] || v);
  }
  function L(p, I) {
    if (t().enabled) {
      if (p) {
        _(/* @__PURE__ */ new Set());
        return;
      }
      _(I !== void 0 && u().hoverRowMap[I] || new Set(f()));
    }
  }
  return [g, s, f, w, E, L];
}
function kr(t, e, i, r, l) {
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
      const T = w[m].__R_K__;
      if (T != null && T.startsWith(Hn))
        w.splice(m, 1), m--;
      else
        break;
    }
    const p = w[L], I = s == null ? void 0 : s.col;
    if (g == null && (g = c(p, I)), g) {
      const m = {
        __R_K__: Hn + v,
        __EXP_R__: p,
        __EXP_C__: I
      };
      w.splice(L + 1, 0, m);
    }
    p && (p[f] = g ? I : void 0), i(w), l(), s != null && s.silent || (x = t.onToggleRowExpand) == null || x.call(t, { expanded: !!g, row: p, col: I });
  }
  return [E, _];
}
function Ir() {
  return typeof window > "u" ? !1 : window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
function Lr(t, e, i, r, l, f, c) {
  const [E, _] = Ce({ x: !1, y: !1 }), [u, g] = Ce({ h: 0, w: 0, t: 0, l: 0 });
  let s = !1, v = !1, w = 0, L = 0, p = 0, I = 0, x = null, m, y = !1;
  const T = ar(() => C(), 200), D = eo((X) => l(X));
  pt(() => {
    y = Ir(), f().enabled && !y && (x = new ResizeObserver(T), x.observe(e())), te();
  }), Tt(() => {
    b(), x == null || x.disconnect(), x = null;
  });
  function C() {
    if (!f().enabled || y) return;
    const { scrollHeight: X, scrollTop: we, containerHeight: G } = i(), { scrollWidth: re, scrollLeft: Ee, containerWidth: De } = r(), de = X > G, Xe = re > De;
    if (_({ x: Xe, y: de }), de) {
      const it = G / X;
      g((B) => {
        const z = Math.max(f().minHeight, it * G), se = Math.round(we / (X - G) * (G - z));
        return { ...B, h: z, t: se };
      });
    }
    if (Xe) {
      const it = De / re;
      g((B) => {
        const z = Math.max(f().minWidth, it * De), se = Math.round(Ee / (re - De) * (De - z));
        return { ...B, w: z, l: se };
      });
    }
  }
  function R(X) {
    X instanceof MouseEvent && X.preventDefault(), s = !0;
    const { scrollTop: we } = i();
    p = we, w = X instanceof MouseEvent ? X.clientY : X.touches[0].clientY, A(P);
  }
  function M(X) {
    X instanceof MouseEvent && X.preventDefault(), v = !0;
    const { scrollLeft: we } = r();
    I = we, L = X instanceof MouseEvent ? X.clientX : X.touches[0].clientX, A(S);
  }
  function A(X) {
    H(), m = X, document.addEventListener("mousemove", X), document.addEventListener("mouseup", b), document.addEventListener("touchmove", X, { passive: !1 }), document.addEventListener("touchend", b);
  }
  function P(X) {
    if (!s) return;
    X.preventDefault();
    const G = (X instanceof MouseEvent ? X.clientY : X.touches[0].clientY) - w, { scrollHeight: re, containerHeight: Ee } = i(), De = re - Ee, de = Ee - u().h, Xe = G / de * De;
    if (c()) {
      const it = Ee / re, B = Math.round((p + Xe) * it), z = Ee - u().h;
      g((se) => ({ ...se, t: B < 0 ? 0 : B > z ? z : B })), D(p + Xe);
    } else
      e().scrollTop = p + Xe;
  }
  function S(X) {
    if (!v) return;
    X.preventDefault();
    const G = (X instanceof MouseEvent ? X.clientX : X.touches[0].clientX) - L, { scrollWidth: re, containerWidth: Ee } = r(), De = re - Ee, de = Ee - u().w, Xe = G / de * De;
    e().scrollLeft = I + Xe;
  }
  function b() {
    s = !1, v = !1, H(), document.removeEventListener("mouseup", b), document.removeEventListener("touchend", b);
  }
  function H() {
    m && (document.removeEventListener("mousemove", m), document.removeEventListener("touchmove", m), m = void 0);
  }
  function te() {
    queueMicrotask(C);
  }
  return [u, E, R, M, C];
}
function $r(t) {
  const [e, i] = Ce(t);
  let r = 0;
  function l(f) {
    e() && !f ? (r && window.clearTimeout(r), r = window.setTimeout(() => {
      i(f), r = 0;
    }, 300)) : (r && (window.clearTimeout(r), r = 0), i(f));
  }
  return [e, l];
}
function Mr(t, e) {
  let i = !1;
  const [r, l] = $r(!1), f = q(() => t.scrollRowByRow === "scrollbar"), c = q(() => f() ? r() : t.scrollRowByRow);
  tt(
    ht(f, (s) => {
      s ? E() : _();
    })
  ), pt(() => {
    E();
  }), Tt(() => {
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
const Kt = [null, "desc", "asc"];
function Ar(t, e, i, r, l, f) {
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
  function p(C, R) {
    const M = c().slice(), A = M.findIndex((P) => P.key === (C.key || C.dataIndex) || P.dataIndex === (C.key || C.dataIndex));
    A >= 0 && M.splice(A, 1), R && _() ? (M.length >= u() && M.pop(), M.unshift(C), E(M)) : E([C]);
  }
  function I(C, R) {
    const M = i()(C), A = v(M);
    let P;
    const S = R.defaultSort;
    if (A >= 0) {
      const b = c()[A].order;
      if (b && S && (S.key === M || S.dataIndex === C.dataIndex)) {
        const H = Kt.filter((X) => X !== null), te = H.indexOf(b);
        P = H[(te + 1) % H.length];
      } else {
        const H = Kt.indexOf(b);
        P = Kt[(H + 1) % 3];
      }
      if (P) {
        const H = { ...c()[A], order: P };
        p(H, 1);
      } else {
        const H = c().slice();
        if (H.splice(A, 1), E(H), S != null && S.order) {
          const te = w(S), { key: X, sortField: we, sortType: G } = te || {};
          p({ key: X, sortField: we, sortType: G, ...S }, 1);
        }
      }
    } else {
      P = Kt[1];
      const b = {
        key: M,
        dataIndex: C.dataIndex,
        sortField: C.sortField,
        sortType: C.sortType,
        order: P
      };
      p(b, 1);
    }
    return P;
  }
  function x(C) {
    if (!c().length) return C;
    const R = { ...qt, ...t.sortConfig };
    let M = C.slice();
    const A = c();
    for (let P = A.length - 1; P >= 0; P--) {
      const S = A[P], b = w(S);
      if (b && S.order) {
        const H = { ...R, ...b.sortConfig };
        M = vn(b, S.order, M, H);
      }
    }
    return M;
  }
  function m(C) {
    var A;
    if (!C) {
      console.warn("onColumnSort: not found col:", C);
      return;
    }
    if (!C.sorter)
      return;
    const R = { ...qt, ...t.sortConfig, ...C.sortConfig }, M = I(C, R);
    t.sortRemote || f(), (A = e.onSortChange) == null || A.call(e, C, M, l(), R);
  }
  function y(C, R, M = {}) {
    var b, H;
    const A = { silent: !0, sortOption: null, sort: !0, append: !1, ...M }, P = i();
    let S;
    if (R) {
      if (S = A.sortOption || r().find((te) => P(te) === C), S) {
        const te = {
          key: C,
          dataIndex: S.dataIndex,
          sortField: S.sortField,
          sortType: S.sortType,
          order: R
        }, X = A.append && _() ? 1 : 0;
        p(te, X);
      }
    } else
      E([]);
    return A.sort && ((b = l()) != null && b.length) && (!t.sortRemote || A.force) && f(t.dataSource, { forceSort: A.force }), A.silent || (S || (S = A.sortOption || r().find((te) => P(te) === C)), S ? (H = e.onSortChange) == null || H.call(e, S, R, l(), t.sortConfig) : console.warn("Can not find column by key:", C)), l();
  }
  function T() {
    E([]), f();
  }
  function D() {
    if (!t.sortConfig.defaultSort) return;
    const { key: C, dataIndex: R, order: M, silent: A } = { silent: !0, ...t.sortConfig.defaultSort };
    y(C || R, M, { force: !1, silent: A });
  }
  return [c, g, m, y, T, L, D, s, x];
}
function Hr(t, e) {
  const [i, r] = Ce([]), [l, f] = Ce([]);
  function c(E) {
    const _ = [], u = [];
    let g = E;
    if (e()) {
      const L = [], p = [], I = [];
      for (let x = 0, m = g.length; x < m; x++) {
        const y = g[x];
        y.fixed === "left" ? L.push(y) : y.fixed === "right" ? I.push(y) : p.push(y);
      }
      g = L.concat(p).concat(I);
    }
    const s = Jn(g);
    for (let L = 0; L <= s; L++)
      _[L] = [], u[L] = [];
    let v = 0;
    function w(L, p, I = 0) {
      let x = 0, m = 0;
      for (let y = 0, T = L.length; y < T; y++) {
        const D = L[y];
        if (D.hidden) continue;
        D.__P__ = p, D.__LF_S__ = v;
        let C = 1, R = 0;
        if (D.children) {
          const [P, S] = w(D.children, D, I + 1);
          C = P, R = S, u[I].push(D);
        } else {
          R = ur(D), v++;
          for (let P = I; P <= s; P++)
            u[P].push(D);
        }
        D.__LF_E__ = v, D.__W__ = R, _[I].push(D);
        const M = D.children ? 1 : s - I + 1, A = C;
        M > 1 && (D.__R_SP__ = M), A > 1 && (D.__C_SP__ = A), x += C, m += R;
      }
      return [x, m];
    }
    w(g, null), r(_), f(u);
  }
  return [i, l, c];
}
function Fr(t, e, i) {
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
    if (!(Gt(u) || Gt(g))) {
      if (r().mode !== "none") {
        const w = t.columns.slice(), L = w.findIndex((x) => i()(x) === u), p = w.findIndex((x) => i()(x) === g);
        if (L === -1 || p === -1) return;
        const I = w[L];
        r().mode === "swap" ? (w[L] = w[p], w[p] = I) : (w.splice(L, 1), w.splice(p, 0, I)), (s = e["onUpdate:columns"]) == null || s.call(e, w);
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
function Or(t, e, i, r) {
  let l = !1;
  const f = q(() => ({ mode: "insert", ...t.dragRowConfig }));
  function c(v, w) {
    var I;
    const L = bt(v.target);
    if (L) {
      const x = L.getBoundingClientRect(), m = v.clientX - (x.left ?? 0);
      (I = v.dataTransfer) == null || I.setDragImage(L, m, x.height / 2), L.classList.add(Pn);
    }
    const p = v.dataTransfer;
    p && (p.effectAllowed = "move", p.setData(Wn, String(w))), l = !0;
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
    const p = f().mode, I = Number(L.getData(Wn)), x = w;
    if (I !== x) {
      if (p !== "none") {
        const y = i().slice(), T = y[I];
        p === "swap" ? (y[I] = y[x], y[x] = T) : (y.splice(I, 1), y.splice(x, 0, T)), r(y);
      }
      (m = e.onRowOrderChange) == null || m.call(e, I, x);
    }
  }
  return [c, u, E, s, g];
}
function Pr(t, e, i, r, l, f) {
  const { defaultExpandAll: c, defaultExpandKeys: E, defaultExpandLevel: _ } = t.treeConfig;
  let u = !0;
  function g(m, y) {
    const T = m ? !m.__T_EXP__ : !1;
    s(m, { expand: T, col: y, isClick: !0 });
  }
  function s(m, y) {
    var C;
    const T = Array.isArray(m) ? m : [m], D = e().slice();
    for (let R = 0; R < T.length; R++) {
      const M = T[R];
      let A;
      typeof M == "string" ? A = M : A = r(M);
      const P = D.findIndex((te) => r(te) === A);
      if (P === -1) {
        console.warn("treeExpandRow failed.rowKey:", A);
        return;
      }
      const S = D[P], b = S.__T_LV__ || 0;
      let H = y == null ? void 0 : y.expand;
      if (H === void 0 && (H = !S.__T_EXP__), H) {
        const te = I(S, b);
        D.splice(P + 1, 0, ...te);
      } else {
        const te = x(P, D, b);
        D.splice(P + 1, te);
      }
      w(S, H, b), y.isClick && ((C = l.onToggleTreeExpand) == null || C.call(l, { expanded: !!H, row: S, col: y.col }));
    }
    i(D), f();
  }
  function v(m, y) {
    s(m, { ...y, isClick: !1 });
  }
  function w(m, y, T, D) {
    m.__T_EXP__ = y, T !== void 0 && (m.__T_LV__ = T);
  }
  function L(m, y, T) {
    if (!m) return [];
    let D = [];
    for (let C = 0; C < m.length; C++) {
      const R = m[C];
      D.push(R);
      const M = !!R.__T_EXP__;
      if (w(R, M, y), u && !M && (c ? w(R, !0) : (_ && y < _ && w(R, !0), E != null && E.includes(r(R)) && w(R, !0))), R.__T_EXP__) {
        const A = L(R.children, y + 1);
        D = D.concat(A);
      }
    }
    return D;
  }
  function p(m) {
    const y = L(m, 0);
    return u = !1, y;
  }
  function I(m, y) {
    let T = [];
    return m.children && m.children.forEach((D) => {
      T.push(D);
      const C = y + 1;
      if (D.__T_EXP__ && D.children) {
        const R = I(D, C);
        T = T.concat(R);
      } else
        w(D, !1, C);
    }), T;
  }
  function x(m, y, T) {
    let D = 0;
    for (let C = m + 1; C < y.length; C++) {
      const R = y[C];
      if (R.__T_LV__ && R.__T_LV__ > T)
        D++;
      else
        break;
    }
    return D;
  }
  return [g, v, p];
}
function Wr(t) {
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
function Xr(t, e, i, r, l, f, c, E, _, u) {
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
  }), [p, I] = Wr(lt), x = q(() => l().some((B) => B.type === "expand")), m = q(() => t.virtual && r().length > s().pageSize), y = q(() => {
    if (!m()) return r();
    const { startIndex: B, endIndex: z } = s();
    return r().slice(B, z + 1);
  }), T = q(() => {
    if (!m()) return 0;
    const { startIndex: B, endIndex: z } = s(), se = r(), fe = b()();
    if (t.autoRowHeight) {
      let he = 0;
      for (let ge = z + 1; ge < se.length; ge++) {
        const $e = b()(se[ge]);
        he += $e;
      }
      return he;
    }
    return (se.length - B - y().length) * fe;
  }), D = q(() => t.virtualX && l().reduce((B, z) => B += lt(z), 0) > w().containerWidth + 100), C = q(() => f().length > 1), R = q(() => {
    if (!D() || !C())
      return {
        startIndex: w().startIndex,
        endIndex: w().endIndex,
        offsetLeft: w().offsetLeft
      };
    const { scrollLeft: B, containerWidth: z } = w(), se = f()[0], fe = l().length;
    let he = 0, ge = fe, $e = 0, Pe = 0, Se = !1;
    for (let ye = 0, ve = se.length; ye < ve; ye++) {
      const Ae = se[ye];
      if (Ae.fixed === "left" || Ae.fixed === "right") continue;
      const He = Ae.__W__ || lt(Ae), Ye = Pe + He;
      if (!Se && Ye > B && (Se = !0, he = Ae.__LF_S__ ?? 0, $e = Pe), Pe = Ye, ge = Ae.__LF_E__ ?? fe, Se && Ye >= B + z)
        break;
    }
    return Se || (he = fe, $e = Pe), { startIndex: he, endIndex: ge, offsetLeft: $e };
  }), M = q(() => {
    const B = l();
    if (D()) {
      const { startIndex: z, endIndex: se } = w(), fe = B.length, he = Math.min(se, fe), ge = Math.min(z, fe);
      if (C()) {
        const ye = [], ve = [], Ae = [];
        for (let Fe = 0; Fe < B.length; Fe++) {
          const ke = B[Fe];
          ke.fixed === "right" ? ve.push(ke) : ke.fixed === "left" ? ye.push(ke) : Fe >= ge && Fe < he && Ae.push(ke);
        }
        const He = [];
        He.push(...ye);
        const Ye = R().startIndex, Ie = Math.max(0, z - Ye);
        Ie && He.push({ __VT_C_SP__: Ie }), He.push(...Ae);
        const xe = Math.max(0, R().endIndex - se);
        return xe && He.push({ __VT_C_SP__: xe }), He.push(...ve), He;
      }
      const $e = [], Pe = [];
      for (let ye = 0; ye < ge; ye++) {
        const ve = B[ye];
        (ve == null ? void 0 : ve.fixed) === "left" && $e.push(ve);
      }
      for (let ye = he; ye < B.length; ye++) {
        const ve = B[ye];
        (ve == null ? void 0 : ve.fixed) === "right" && Pe.push(ve);
      }
      const Se = B.slice(ge, he);
      return $e.concat(Se).concat(Pe);
    }
    return B;
  }), A = q(() => {
    if (!D()) return f();
    if (C()) {
      const { startIndex: z, endIndex: se } = R();
      return f().map((fe) => fe.filter((he) => {
        if (he.fixed === "left" || he.fixed === "right") return !0;
        const ge = he.__LF_S__ ?? 0;
        return (he.__LF_E__ ?? ge + 1) > z && ge < se;
      }));
    }
    const B = f();
    return B.map((z, se) => se === B.length - 1 ? M() : z);
  }), P = q(() => {
    if (!D()) return l().length;
    const B = M().filter((z) => z.__VT_C_SP__);
    return 2 + M().length + B.reduce((z, se) => z + Math.max(0, (se.__VT_C_SP__ ?? 0) - 1), 0);
  }), S = q(() => {
    if (!D()) return 0;
    const B = C() ? R().endIndex : w().endIndex;
    let z = 0;
    const se = l();
    for (let fe = B; fe < se.length; fe++) {
      const he = se[fe];
      he.fixed !== "right" && (z += lt(he));
    }
    return z;
  }), b = q(() => {
    var se;
    const B = t.rowHeight || Yt;
    let z = () => B;
    if (t.autoRowHeight) {
      const fe = z;
      z = (he) => De(he) || fe(he);
    }
    if (x()) {
      const fe = (se = t.expandConfig) == null ? void 0 : se.height, he = z;
      z = (ge) => ge && ge.__EXP_R__ && fe || he(ge);
    }
    return z;
  });
  function H(B) {
    te(B), X();
  }
  function te(B) {
    var ye;
    B !== void 0 && typeof B != "number" && (console.warn("initVirtualScrollY: height must be a number"), B = 0);
    const { clientHeight: z, scrollHeight: se } = e() || {};
    let fe = u() ? s().scrollTop : ((ye = e()) == null ? void 0 : ye.scrollTop) || 0;
    const he = b()(), ge = B || z || er, { headless: $e } = t;
    let Pe = Math.ceil(ge / he);
    if (!$e) {
      const ve = Math.floor(g() / he);
      Pe -= ve;
    }
    const Se = Math.max(0, r().length * he + g() - ge);
    fe > Se && (fe = Se), v((ve) => ({ ...ve, containerHeight: ge, pageSize: Pe, scrollHeight: se })), de(fe);
  }
  function X() {
    const { clientWidth: B, scrollLeft: z, scrollWidth: se } = e() || {};
    L((fe) => ({
      ...fe,
      containerWidth: B || Mn,
      scrollWidth: se || Mn
    })), it(z);
  }
  let we = null;
  const G = /* @__PURE__ */ new Map();
  function re(B, z) {
    const se = String(B);
    z ? G.set(se, z) : G.delete(se);
  }
  function Ee() {
    G.clear();
  }
  function De(B) {
    var he;
    if (!B) return;
    const z = c(B), se = G.get(String(z));
    if (se)
      return se;
    const fe = (he = t.autoRowHeight) == null ? void 0 : he.expectedHeight;
    if (fe)
      return typeof fe == "function" ? fe(B) : fe;
  }
  function de(B = 0) {
    const { pageSize: z, scrollTop: se, startIndex: fe, endIndex: he, containerHeight: ge } = s(), $e = r(), Pe = $e.length, Se = b()(), ye = {}, ve = Pe * Se + g(), { enabled: Ae } = _();
    if (Ae && (ye.scrollHeight = ve, u())) {
      let Le;
      B = B < 0 ? 0 : B < (Le = ve - ge) ? B : Le, ye.translateY = t.scrollRowByRow ? 0 : -(B % Se);
    }
    if (ye.scrollTop = B, v((Le) => ({ ...Le, ...ye })), !m()) {
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
        if (ke += Te, ke >= B) {
          xe = Ne, ke -= Te;
          break;
        }
      }
      let Le = 0;
      for (let Ne = xe + 1; Ne < Pe; Ne++)
        if (Le += b()($e[Ne]), Le >= ge) {
          Fe = Ne;
          break;
        }
    } else if (xe = Math.floor(B / Se), Fe = xe + z, xe === fe && Fe === he)
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
    xe = Math.max(0, xe), Fe = Math.min(Fe, Pe), xe >= Fe && (xe = Fe - z), we && window.clearTimeout(we);
    let mt = 0;
    He || x() ? mt = ke : mt = xe * Se, !Ie || B <= se || Math.abs(fe - xe) >= z ? v((Le) => ({ ...Le, startIndex: xe, endIndex: Fe, offsetTop: mt })) : (v((Le) => ({ ...Le, endIndex: Fe })), we = window.setTimeout(() => {
      v((Le) => ({ ...Le, startIndex: xe, offsetTop: mt }));
    }, Xn));
  }
  let Xe = null;
  function it(B = 0) {
    if (!t.virtualX) return;
    const z = l(), se = z == null ? void 0 : z.length;
    if (!se) return;
    const { scrollLeft: fe, containerWidth: he } = w();
    let ge = 0, $e = 0, Pe = 0;
    const { nonFixedCols: Se, leftFixedCols: ye } = p(z);
    if (Se.length > 0 && B > 0) {
      const Ie = Zn(Se, (Fe) => Se[Fe].cumWidth <= B ? -1 : 1), xe = Math.min(Ie, Se.length - 1);
      ge = Se[xe].index, $e = xe > 0 ? Se[xe - 1].cumWidth : 0, Pe = Se[xe].cumWidth - B;
    } else Se.length > 0 && (ge = Se[0].index);
    let ve = 0;
    for (const Ie of ye) {
      if (Ie.index >= ge) break;
      ve += Ie.width;
    }
    const Ae = he - ve;
    let He = se, Ye = Pe;
    for (let Ie = Pe ? ge + 1 : ge; Ie < se; Ie++) {
      const xe = z[Ie];
      if (Ye += lt(xe), Ye >= Ae) {
        He = Ie + 1;
        break;
      }
    }
    He = Math.min(He, se), Xe && window.clearTimeout(Xe), !t.optimizeVue2Scroll || B <= fe ? L((Ie) => ({ ...Ie, startIndex: ge, endIndex: He, offsetLeft: $e, scrollLeft: B })) : (L((Ie) => ({ ...Ie, endIndex: He, scrollLeft: B })), Xe = window.setTimeout(() => {
      L((Ie) => ({ ...Ie, startIndex: ge, offsetLeft: $e }));
    }, Xn));
  }
  return [
    s,
    w,
    m,
    y,
    T,
    D,
    S,
    g,
    H,
    te,
    X,
    de,
    it,
    re,
    Ee,
    I,
    A,
    P,
    R,
    M
  ];
}
function Nr(t = 500) {
  let e = !1, i = 0;
  return [() => e, (f) => {
    e = f, f && (i && self.clearTimeout(i), i = self.setTimeout(() => {
      e = !1, i = 0;
    }, t));
  }];
}
var Vr = /* @__PURE__ */ ue("<div class=row-by-row-table-height>"), Br = /* @__PURE__ */ ue("<div class=column-resize-indicator>"), Kr = /* @__PURE__ */ ue("<colgroup>"), zr = /* @__PURE__ */ ue("<thead>"), un = /* @__PURE__ */ ue("<td class=vt-x-left>"), fn = /* @__PURE__ */ ue("<td class=vt-x-right>"), Yr = /* @__PURE__ */ ue("<tr class=padding-top-tr>"), Ot = /* @__PURE__ */ ue("<tr>"), qr = /* @__PURE__ */ ue('<div class="stk-sb-thumb vertical">'), Gr = /* @__PURE__ */ ue("<div class=stk-table-no-data>"), Ur = /* @__PURE__ */ ue('<div class="stk-sb-thumb horizontal">'), jr = /* @__PURE__ */ ue("<div><div class=stk-table-scroll-container><table class=stk-table-main><tbody class=stk-tbody-main>"), Zr = /* @__PURE__ */ ue("<col>"), Jr = /* @__PURE__ */ ue("<th class=vt-x-left>"), Qr = /* @__PURE__ */ ue("<th class=vt-x-right>"), el = /* @__PURE__ */ ue('<div class="table-header-resizer left">'), tl = /* @__PURE__ */ ue("<span class=table-header-sorter>"), nl = /* @__PURE__ */ ue('<div class="table-header-resizer right">'), ol = /* @__PURE__ */ ue("<th><div class=table-header-cell-wrapper>"), rl = /* @__PURE__ */ ue("<span class=table-header-title>"), Nn = /* @__PURE__ */ ue("<td>"), dn = /* @__PURE__ */ ue("<td class=vt-x-spacer>"), Vn = /* @__PURE__ */ ue("<span>"), Bn = /* @__PURE__ */ ue("<td><div class=table-cell-wrapper tabindex=-1>"), zt = /* @__PURE__ */ ue("<div class=table-cell-wrapper tabindex=-1>");
const ll = {
  width: "",
  fixedMode: !1,
  stripe: !1,
  minWidth: "",
  maxWidth: "",
  headless: !1,
  theme: "light",
  rowHeight: Yt,
  autoRowHeight: !1,
  footerData: [],
  rowHover: !0,
  rowActive: _n,
  rowCurrentRevokable: !0,
  headerRowHeight: Yt,
  footerRowHeight: Yt,
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
  sortConfig: qt,
  hideHeaderTitle: !1,
  highlightConfig: {},
  seqConfig: {},
  expandConfig: {},
  dragRowConfig: {},
  treeConfig: {},
  cellFixedMode: "sticky",
  smoothScroll: ir,
  scrollRowByRow: !1,
  scrollbar: !1,
  experimental: {},
  footerConfig: {
    position: "bottom"
  }
};
function il(t) {
  const e = Jo(ll, t), i = fr(), [r, l] = Ce(), [f, c] = Ce(), E = () => {
    var o;
    const n = (o = r()) == null ? void 0 : o.querySelector("tbody.stk-tbody-main");
    if (n)
      return Array.from(n.querySelectorAll("tr[data-row-key]"));
  }, [_] = Ce(lr ? !0 : e.cellFixedMode === "relative"), u = q(() => {
    var n;
    return ((n = e.footerConfig) == null ? void 0 : n.position) === "top";
  }), g = q(() => u() ? "tbody" : "tfoot"), [s, v] = Ce(), [w, L] = Ce(), [p, I] = Ce();
  let x = null;
  const [m, y] = Ce(null), [T, D, C] = Hr(() => e.virtualX, _), [R, M] = Ce({}), A = q(() => D().slice(-1)[0] || []), P = q(() => e.columns.some((n) => n.type === "tree-node")), S = q(() => {
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
  }), [b, H] = Ce([]), [te, X] = Ce(0);
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
    return typeof n == "string" ? () => n : (o, h) => n({
      row: h,
      col: o
    });
  }), De = /* @__PURE__ */ new WeakMap();
  function de(n) {
    if (!n) return n;
    let o = De.get(n);
    if (o !== void 0) return o;
    const h = n.__R_K__;
    return h !== void 0 ? (De.set(n, h), h) : (o = G()(n), o === void 0 && (o = Math.random().toString(36).slice(2)), De.set(n, o), o);
  }
  function Xe(n, o) {
    return de(n) + jn + re()(o);
  }
  const [it, B, z, se, fe, he, ge, $e, Pe] = Ar(e, e, re, A, b, Nt), [Se] = Mr(e, r), [ye, ve, Ae, He] = Fr(e, e, re), [Ye, Ie, xe, Fe, ke] = Or(e, e, b, H), [mt, Le] = Rr(e, A, de, b);
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
  }), [Me, nt, _t, Wt, yt, Ue, Ze, At, Rt, at, Dt, ut, jt, Ht, Zt, a, $, F, W, le] = Xr(e, r, E, b, A, T, de, mt, Te, Be), ne = eo(ut), [J, N, Q, U, Y] = Lr(e, r, Me, nt, ut, Te, Be), [ie, j, Z, ce, be, We] = Dr(S, A, de, re, Wt), ze = Er(D, re), Je = br(e, _, ze, Me, nt, Ue, Ze), [je, ct, Qe] = pr(e, i, r);
  function wt(n) {
    const o = de(n);
    return b().findIndex((h) => de(h) === o);
  }
  function Re(n) {
    const o = re()(n);
    return A().findIndex((h) => re()(h) === o);
  }
  const {
    config: _e,
    isSelecting: ot,
    onMD: Xt,
    get: Jt,
    set: Qt,
    clear: En,
    copy: lo
  } = no[bn](e, e, r, b, A, re, Xe, ln, Me, nt, wt, Re);
  yr(r, e, ln, Me, nt, T, _t, _e);
  const [io, en, kt] = Sr(e, re, ze, T, D, r);
  e.autoResize && xr(r, () => {
    Rt(), kt();
  }, e, 200);
  const [pn, Tn, yn] = Cr(e, e, r, A, f, re, io, a), [so, co] = kr(e, b, H, de, kn), [ao, uo, fo] = Pr(e, b, H, de, e, kn), ho = q(() => `height:${Me().offsetTop}px`), go = q(() => `height:${yt()}px`), Rn = q(() => !Se() || !e.virtual ? 0 : b().length * Me().rowHeight + At()), Dn = q(() => {
    if (!Se() || !e.virtual) return 0;
    const {
      containerHeight: n,
      rowHeight: o
    } = Me();
    return (n - At()) % o;
  }), mo = q(() => `height:${Dn()}px`);
  tt(ht(() => e.columns, () => {
    tn(), Le(), queueMicrotask(() => {
      Dt(), kt(), Y();
    });
  })), tt(ht(() => e.virtual, () => {
    queueMicrotask(at);
  })), tt(ht(() => e.rowHeight, () => at())), tt(ht(() => e.virtualX, () => {
    tn(), queueMicrotask(() => {
      Dt(), kt();
    });
  })), tt(ht(() => e.dataSource, (n) => {
    wo(n);
  })), tt(ht(() => e.fixedColShadow, () => kt())), tn(), Nt(), Le(), pt(() => {
    Rt(), kt(), ge();
  });
  async function kn() {
    await Promise.resolve(), at(), Y();
  }
  function Nt(n = e.dataSource, o) {
    let h = n.slice();
    (!e.sortRemote || o != null && o.forceSort) && (h = Pe(h)), P() && (h = fo(h)), h = _o(h), H(h);
  }
  function In(n, o) {
    var h;
    n = n || {}, M(n), o != null && o.remote || Nt(), o != null && o.silent || (h = e.onFilterChange) == null || h.call(e, n);
  }
  function _o(n) {
    const o = Object.keys(R());
    if (!(o != null && o.length)) return n;
    let h = n;
    for (const k of o) {
      const {
        value: d,
        filter: O
      } = R()[k];
      d != null && d.length && (h = h.filter((V) => {
        const ae = V[k];
        return O ? O({
          row: V,
          cellValue: ae,
          filterValues: d
        }) : d.some((oe) => ae == oe);
      }));
    }
    return h;
  }
  function tn() {
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
    const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), {
      virtualX: k
    } = e, d = T(), O = re();
    for (let V = 0, ae = d.length; V < ae; V++) {
      const oe = d[V];
      for (let Oe = 0, rt = oe.length; Oe < rt; Oe++) {
        const Ve = oe[Oe], st = k ? lt(Ve) + "px" : Bt(Ve.width), qe = Bt(Ve.minWidth), It = Bt(Ve.maxWidth);
        let Lt = "";
        st && (Lt += `--cw:${st}`), qe && (Lt += `;min-width:${qe}`), It && (Lt += `;max-width:${It}`);
        const sn = O(Ve);
        n.set(sn, Lt + ";" + Je(et.TH, Ve, V)), o.set(sn, Lt + ";" + Je(et.TD, Ve, V)), h.set(sn, "position:sticky;" + Lt + ";" + Je(et.TF, Ve, V));
      }
    }
    return {
      [et.TH]: n,
      [et.TD]: o,
      [et.TF]: h
    };
  });
  function vo(n) {
    const o = Bt(n.width);
    return o ? `width:${o}` : void 0;
  }
  function Ct(n) {
    return n + Me().startIndex;
  }
  function xo(n, o) {
    var h;
    if (!(!ie() || !n))
      return (h = ie()[de(n)]) == null ? void 0 : h.has(re()(o));
  }
  function Co(n) {
    const o = re()(n);
    return e.hideHeaderTitle === !0 || Array.isArray(e.hideHeaderTitle) && e.hideHeaderTitle.includes(o) ? "" : n.title || "";
  }
  function So(n, o) {
    var d;
    const h = de(n), k = (n == null ? void 0 : n.__EXP_R__) && e.virtual && ((d = e.expandConfig) == null ? void 0 : d.height);
    return {
      id: i + "-" + h,
      "data-row-key": h,
      // 使用 getter 保持响应式：<For> 复用行 DOM 后 index 会变化（树展开/折叠、虚拟滚动），data-row-i 必须跟随更新，
      // 否则事件委托（onCellClick 等）会按过期索引取行导致取不到行
      get "data-row-i"() {
        return Ct(o());
      },
      // 使用 getter 保持响应式：SolidJS spread 包裹在 createRenderEffect 中，getter 读取的信号变化时会重新赋值 class/style
      get class() {
        const O = Ct(o()), V = [e.rowClassName(n, O), n != null && n.__EXP__ ? "expanded" : "", n != null && n.__EXP_R__ ? "expanded-row" : ""];
        return (w() === h || n === s()) && V.push("active"), e.showTrHoverClass && (h === m() || n === x) && V.push("hover"), V.filter(Boolean).join(" ");
      },
      get style() {
        var O;
        return k ? `--row-height: ${(O = e.expandConfig) == null ? void 0 : O.height}px` : null;
      }
    };
  }
  function bo(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      draggable: !!He(n),
      rowspan: n.__R_SP__,
      colspan: n.__C_SP__,
      title: Co(n),
      // 使用 getter 保持响应式（排序状态/固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[et.TH].get(o);
      },
      get class() {
        const h = $e(o), k = !!h && h.order !== null;
        return [n.sorter ? "sortable" : "", k && "sorter-" + (h == null ? void 0 : h.order), n.headerClassName, en().get(o), n.headerAlign && (n.headerAlign === "left" ? "text-l" : n.headerAlign === "right" ? "text-r" : n.headerAlign === "center" ? "text-c" : null)].filter(Boolean).join(" ");
      }
    };
  }
  function Eo(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      // 使用 getter 保持响应式（固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[et.TF].get(o);
      },
      get class() {
        return [n.className, en().get(o), n.type === "seq" ? "seq-column" : "", n.align === "center" ? "text-c" : n.align === "right" ? "text-r" : ""].filter(Boolean).join(" ");
      }
    };
  }
  function po(n, o, h, k) {
    const d = re()(o);
    if (!n)
      return {
        get style() {
          return Ft()[et.TD].get(d);
        }
      };
    const O = Xe(n, o);
    return {
      "data-col-key": d,
      // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
      get style() {
        return Ft()[et.TD].get(d);
      },
      get class() {
        const V = [o.className, en().get(d)];
        return o.align === "center" ? V.push("text-c") : o.align === "right" && V.push("text-r"), o.mergeCells && (Z().has(O) && V.push("cell-hover"), be().has(O) && V.push("cell-active")), e.cellActive && p() === O && V.push("active"), o.type === "seq" ? V.push("seq-column") : o.type === "expand" && (n.__EXP__ && re()(n.__EXP__) === d) ? V.push("expanded") : n.__T_EXP__ && o.type === "tree-node" ? V.push("tree-expanded") : o.type === "dragRow" && V.push("drag-row-cell"), V.filter(Boolean).join(" ");
      },
      // 合并单元格 rowspan/colspan：getter 保持响应式（虚拟滚动窗口变化时合并布局会重新计算）
      get rowspan() {
        var V;
        return (V = j(n, o)) == null ? void 0 : V.rowspan;
      },
      get colspan() {
        var V;
        return (V = j(n, o)) == null ? void 0 : V.colspan;
      }
    };
  }
  function To(n) {
    var d, O, V, ae;
    const o = gt(n.target), h = b()[o];
    if (!h || ((d = e.onRowClick) == null || d.call(e, n, h, {
      rowIndex: o
    }), (V = (O = S()).disabled) != null && V.call(O, h))) return;
    const k = e.rowKey ? w() === de(h) : s() === h;
    if (k) {
      if (!S().revokable)
        return;
      rn(void 0, {
        silent: !0
      });
    } else
      rn(h, {
        silent: !0
      });
    (ae = e.onCurrentChange) == null || ae.call(e, n, h, {
      select: !k
    });
  }
  function yo(n) {
    var k;
    const o = gt(n.target), h = b()[o];
    h && ((k = e.onRowDblclick) == null || k.call(e, n, h, {
      rowIndex: o
    }));
  }
  function Ro(n) {
    var o;
    (o = e.onHeaderRowMenu) == null || o.call(e, n);
  }
  function Do(n) {
    var k;
    const o = gt(n.target), h = b()[o];
    h && ((k = e.onRowMenu) == null || k.call(e, n, h, {
      rowIndex: o
    }));
  }
  function ko(n, o, h) {
    h.type === "expand" ? so(o, h) : h.type === "tree-node" && ao(o, h);
  }
  function Io(n) {
    var O, V, ae;
    const o = gt(n.target), h = b()[o];
    if (!h) return;
    const k = Pt(n.target), d = A().find((oe) => re()(oe) === k);
    if (d) {
      if ((O = n.target) != null && O.closest(".stk-fold-icon")) {
        ko(n, h, d);
        return;
      }
      if (e.cellActive) {
        const oe = Xe(h, d), Oe = {
          row: h,
          col: d,
          select: !1,
          rowIndex: o
        };
        e.selectedCellRevokable && p() === oe ? I(void 0) : (I(oe), Oe.select = !0), (V = e.onCellSelected) == null || V.call(e, n, Oe);
      }
      (ae = e.onCellClick) == null || ae.call(e, n, h, d, {
        rowIndex: o
      });
    }
  }
  function nn(n) {
    const o = gt(n.target) || 0, h = b()[o], k = Pt(n.target), d = A().find((O) => re()(O) === k);
    return {
      row: h,
      col: d,
      rowIndex: o
    };
  }
  function Lo(n, o) {
    var h;
    z(o), (h = e.onHeaderCellClick) == null || h.call(e, n, o);
  }
  function $o(n) {
    var O, V;
    const o = Ut(n.target);
    if (!o) return;
    const {
      row: h,
      col: k
    } = nn(n);
    (O = e.onCellMouseover) == null || O.call(e, n, h, k);
    const d = n.relatedTarget;
    (!d || !o.contains(d)) && ((V = e.onCellMouseenter) == null || V.call(e, n, h, k));
  }
  function Mo(n) {
    var O;
    const o = n.target, h = n.relatedTarget, k = Ut(o);
    if (k && (!h || !k.contains(h))) {
      const {
        row: V,
        col: ae
      } = nn(n);
      (O = e.onCellMouseleave) == null || O.call(e, n, V, ae);
    }
    const d = bt(o);
    d && (!h || !d.contains(h)) && (x = null, e.showTrHoverClass && y(null), e.rowHover && ce(void 0));
  }
  function Ao(n) {
    const o = gt(n.target);
    o < 0 || Fe(n, Ct(o));
  }
  function Ho(n) {
    var d;
    const {
      row: o,
      col: h,
      rowIndex: k
    } = nn(n);
    (d = e.onCellMousedown) == null || d.call(e, n, o, h, {
      rowIndex: k
    }), _e().enabled && Xt(n);
  }
  const [Ln, $n] = Nr();
  function Fo(n) {
    if (e.smoothScroll) return;
    if (Tn()) {
      n.stopPropagation();
      return;
    }
    const o = r(), {
      deltaY: h,
      deltaX: k,
      shiftKey: d
    } = n;
    if (_t() && h && !d) {
      const {
        containerHeight: O,
        scrollTop: V,
        scrollHeight: ae
      } = Me(), oe = V < ae - O - 1, Oe = V > 1;
      h > 0 && oe || h < 0 && Oe ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), Be() ? (ne(V + h), Y()) : o.scrollTop += h;
    }
    if (Ue()) {
      const {
        containerWidth: O,
        scrollLeft: V,
        scrollWidth: ae
      } = nt();
      let oe = k;
      d && h && (oe = h);
      const Oe = V < ae - O - 1, rt = V > 1;
      oe > 0 && Oe || oe < 0 && rt ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), o.scrollLeft += oe;
    }
  }
  let on = !1;
  function Oo(n) {
    !(n != null && n.target) || on || (on = !0, requestAnimationFrame(() => {
      var ae, oe;
      on = !1;
      const {
        scrollTop: o,
        scrollLeft: h
      } = n.target, {
        scrollTop: k
      } = Me(), {
        scrollLeft: d
      } = nt(), O = Be() ? !1 : o !== k, V = h !== d;
      if (O && ut(o), V && (Ue() ? jt(h) : nt().scrollLeft = h, kt(nt)), O) {
        const {
          startIndex: Oe,
          endIndex: rt
        } = Me();
        (ae = e.onScroll) == null || ae.call(e, n, {
          startIndex: Oe,
          endIndex: rt
        });
      }
      V && ((oe = e.onScrollX) == null || oe.call(e, n)), Y();
    }));
  }
  function Po(n) {
    const o = bt(n.target);
    if (!o) return;
    const h = Number(o.dataset.rowI), k = b()[h];
    if (x === k) return;
    x = k;
    const d = o.dataset.rowKey;
    e.showTrHoverClass && y(d || null), e.rowHover && ce(d);
  }
  function rn(n, o = {
    silent: !1,
    deep: !1
  }) {
    var d;
    const h = n !== void 0, k = s();
    if (!h)
      v(void 0), L(void 0), We(!0);
    else if (typeof n == "string") {
      const O = (ae, oe) => {
        var Oe;
        for (let rt = 0; rt < ae.length; rt++) {
          const Ve = ae[rt];
          if (de(Ve) === oe)
            return Ve;
          if (o.deep && ((Oe = Ve.children) != null && Oe.length)) {
            const st = O(Ve.children, oe);
            if (st)
              return st;
          }
        }
        return null;
      };
      L(n), We(!1, w());
      const V = O(b() || [], n);
      if (!V) {
        console.warn("setCurrentRow failed.rowKey:", n);
        return;
      }
      v(V);
    } else
      v(n), L(de(n)), We(!1, w());
    o.silent || (d = e.onCurrentChange) == null || d.call(
      e,
      /** no Event */
      null,
      h ? s() : k,
      {
        select: h
      }
    );
  }
  function Wo(n, o, h = {
    silent: !1
  }) {
    var d;
    if (!b().length) return;
    const k = n !== void 0 && o !== void 0;
    I(k ? Xe(n, o) : void 0), h.silent || (d = e.onCellSelected) == null || d.call(
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
  function ln(n = 0, o = 0) {
    r() && (n !== null && (Be() ? (ut(n), Y()) : r().scrollTop = n), o !== null && (r().scrollLeft = o));
  }
  function Xo() {
    return b();
  }
  const No = {
    initVirtualScroll: Rt,
    initVirtualScrollX: Dt,
    initVirtualScrollY: at,
    setCurrentRow: rn,
    setSelectedCell: Wo,
    setHighlightDimCell: Qe,
    setHighlightDimRow: ct,
    sortCol: B,
    sortStates: it,
    getSortColumns: he,
    setSorter: se,
    resetSorter: fe,
    scrollTo: ln,
    getTableData: Xo,
    getRowIndex: wt,
    getColumnIndex: Re,
    setRowExpand: co,
    setAutoHeight: Ht,
    clearAllAutoHeight: Zt,
    setTreeExpand: uo,
    getSelectedArea: Jt,
    setAreaSelection: Qt,
    clearSelectedArea: En,
    copySelectedArea: lo,
    setFilter: In
  };
  typeof e.ref == "function" && e.ref(No);
  const Vo = q(() => {
    const n = {
      "stk-table": !0,
      virtual: e.virtual,
      "virtual-x": e.virtualX,
      "vt-on": _t(),
      light: e.theme === "light",
      dark: e.theme === "dark",
      headless: e.headless,
      "is-col-resizing": Tn(),
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
      "area-selection": _e().enabled,
      "is-area-selecting": ot(),
      "exp-scroll-y": !!Be()
    };
    typeof e.bordered == "string" && (n[`bordered-${e.bordered}`] = !0);
    const o = Object.keys(n).filter((h) => n[h]).join(" ");
    return e.class ? o + " " + e.class : o;
  }), Bo = q(() => {
    const n = {
      "--row-height": e.autoRowHeight ? void 0 : Me().rowHeight + "px",
      "--header-row-height": e.headerRowHeight + "px",
      "--footer-row-height": e.footerRowHeight + "px",
      "--highlight-duration": e.highlightConfig.duration && e.highlightConfig.duration + "s",
      "--highlight-timing-function": je() ? `steps(${je()})` : void 0,
      "--sb-width": `${Te().width}px`,
      "--sb-height": `${Te().height}px`
    };
    let o = Object.entries(n).filter(([, k]) => k != null && k !== "").map(([k, d]) => `${k}:${d}`).join(";");
    const h = e.style;
    if (h) {
      const k = typeof h == "string" ? h : Object.entries(h).filter(([, d]) => d != null && d !== "").map(([d, O]) => `${d.replace(/[A-Z]/g, (V) => "-" + V.toLowerCase())}:${O}`).join(";");
      k && (o = o ? o + ";" + k : k);
    }
    return o;
  }), Ko = {
    dataSource: b,
    rawDataSource: () => e.dataSource,
    theme: () => e.theme,
    setFilter: In,
    rowVersion: te,
    bumpRowVersion: we
  };
  return K(oo.Provider, {
    value: Ko,
    get children() {
      var n = jr(), o = n.firstChild, h = o.firstChild, k = h.firstChild;
      return n.addEventListener("wheel", Fo), n.addEventListener("scroll", Oo), Et((d) => {
        l(d);
      }, n), ee(n, K(me, {
        get when() {
          return Ge(() => !Be())() && Rn();
        },
        get children() {
          var d = Vr();
          return pe((O) => Ke(d, `height: ${Rn()}px`, O)), d;
        }
      }), o), ee(n, K(me, {
        get when() {
          return e.colResizable;
        },
        get children() {
          var d = Br();
          return Et((O) => c(O), d), d;
        }
      }), o), h.$$mouseover = Po, h.$$contextmenu = Do, h.$$dblclick = yo, h.$$click = To, St(h, "dragend", ke), St(h, "dragenter", Ie), St(h, "dragover", xe), ee(h, K(me, {
        get when() {
          return Ge(() => !!e.fixedMode)() && !Ue();
        },
        get children() {
          var d = Kr();
          return ee(d, K(vt, {
            get each() {
              return A();
            },
            children: (O) => (() => {
              var V = Zr();
              return pe((ae) => Ke(V, vo(O), ae)), V;
            })()
          })), d;
        }
      }), k), ee(h, K(me, {
        get when() {
          return !e.headless;
        },
        get children() {
          var d = zr();
          return ee(d, K(vt, {
            get each() {
              return Ge(() => !!Ue())() ? $() : T();
            },
            children: (O, V) => (() => {
              var ae = Ot();
              return ae.$$contextmenu = (oe) => Ro(oe), ee(ae, K(me, {
                get when() {
                  return Ue();
                },
                get children() {
                  var oe = Jr();
                  return pe((Oe) => Ke(oe, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, Oe)), oe;
                }
              }), null), ee(ae, K(vt, {
                each: O,
                children: (oe, Oe) => {
                  const rt = bo(oe);
                  return (() => {
                    var Ve = ol(), st = Ve.firstChild;
                    return Vt(Ve, mn(rt, {
                      onClick: (qe) => Lo(qe, oe),
                      onDragStart: ye,
                      onDrop: Ae,
                      onDragOver: ve
                    }), !1, !0), ee(Ve, K(me, {
                      get when() {
                        return Ge(() => !!pn()(oe))() && Oe() > 0;
                      },
                      get children() {
                        var qe = el();
                        return qe.$$mousedown = (It) => yn(It, oe, !0), qe;
                      }
                    }), st), ee(st, K(me, {
                      get when() {
                        return oe.customHeaderCell;
                      },
                      get fallback() {
                        return Ge(() => !!e.tableHeaderSlot)() ? e.tableHeaderSlot(oe) : (() => {
                          var qe = rl();
                          return ee(qe, () => oe.title), qe;
                        })();
                      },
                      get children() {
                        return hn(oe.customHeaderCell, {
                          col: oe,
                          colIndex: Oe(),
                          rowIndex: V()
                        });
                      }
                    }), null), ee(st, K(me, {
                      get when() {
                        return oe.sorter;
                      },
                      get children() {
                        var qe = tl();
                        return ee(qe, K(mr, {})), qe;
                      }
                    }), null), ee(Ve, K(me, {
                      get when() {
                        return pn()(oe);
                      },
                      get children() {
                        var qe = nl();
                        return qe.$$mousedown = (It) => yn(It, oe), qe;
                      }
                    }), null), pe((qe) => Ke(st, oe.__R_SP__ ? `--row-span:${oe.__R_SP__}` : void 0, qe)), Ve;
                  })();
                }
              }), null), ee(ae, K(me, {
                get when() {
                  return Ue();
                },
                get children() {
                  var oe = Qr();
                  return pe((Oe) => Ke(oe, `min-width:${Ze()}px;width:${Ze()}px`, Oe)), oe;
                }
              }), null), ae;
            })()
          })), d;
        }
      }), k), ee(h, K(me, {
        get when() {
          return Ge(() => !!e.footerData)() && e.footerData.length > 0;
        },
        get children() {
          return zo();
        }
      }), k), k.addEventListener("drop", Ao), k.$$mouseout = Mo, k.$$mouseover = $o, k.$$mousedown = Ho, k.$$click = Io, ee(k, K(me, {
        get when() {
          return Ge(() => !!(!Be() && _t()))() && !Se();
        },
        get children() {
          var d = Yr();
          return ee(d, K(me, {
            get when() {
              return Ge(() => !!e.fixedMode)() && e.headless;
            },
            get children() {
              return [K(me, {
                get when() {
                  return Ue();
                },
                get children() {
                  var O = un();
                  return pe((V) => Ke(O, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, V)), O;
                }
              }), K(vt, {
                get each() {
                  return le();
                },
                children: (O, V) => K(me, {
                  get when() {
                    return !O.__VT_C_SP__;
                  },
                  get fallback() {
                    return (() => {
                      var ae = dn();
                      return pe(() => ft(ae, "colspan", O.__VT_C_SP__)), ae;
                    })();
                  },
                  get children() {
                    var ae = Nn();
                    return pe((oe) => Ke(ae, Ft()[et.TD].get(re()(O)), oe)), ae;
                  }
                })
              }), K(me, {
                get when() {
                  return Ue();
                },
                get children() {
                  var O = fn();
                  return pe((V) => Ke(O, `min-width:${Ze()}px;width:${Ze()}px`, V)), O;
                }
              })];
            }
          })), pe((O) => Ke(d, ho(), O)), d;
        }
      }), null), ee(k, K(vt, {
        get each() {
          return Wt();
        },
        children: (d, O) => Yo(d, O)
      }), null), ee(k, K(me, {
        get when() {
          return !Be();
        },
        get children() {
          return [K(me, {
            get when() {
              return Ge(() => !!_t())() && !Se();
            },
            get children() {
              var d = Ot();
              return pe((O) => Ke(d, go(), O)), d;
            }
          }), K(me, {
            get when() {
              return Dn();
            },
            get children() {
              var d = Ot();
              return pe((O) => Ke(d, mo(), O)), d;
            }
          })];
        }
      }), null), ee(o, K(me, {
        get when() {
          return Ge(() => !!Te().enabled)() && N().y;
        },
        get children() {
          var d = qr();
          return St(d, "touchstart", Q, !0), St(d, "mousedown", Q, !0), pe((O) => Ke(d, `height:${J().h}px;transform:translateY(${J().t}px)`, O)), d;
        }
      }), null), ee(n, K(me, {
        get when() {
          return Ge(() => !b() || !b().length)() && e.showNoData;
        },
        get children() {
          var d = Gr();
          return ee(d, () => e.emptySlot ?? "暂无数据"), pe(() => d.classList.toggle("no-data-full", !!e.noDataFull)), d;
        }
      }), null), ee(n, () => e.customBottomSlot, null), ee(n, K(me, {
        get when() {
          return Ge(() => !!Te().enabled)() && N().x;
        },
        get children() {
          var d = Ur();
          return St(d, "touchstart", U, !0), St(d, "mousedown", U, !0), pe((O) => Ke(d, `width:${J().w}px;transform:translateX(${J().l}px)`, O)), d;
        }
      }), null), pe((d) => {
        var O = Vo(), V = _e().enabled ? 0 : void 0, ae = Bo(), oe = !!e.fixedMode, Oe = e.width, rt = e.minWidth, Ve = e.maxWidth, st = Be() ? `transform:translateY(${Me().translateY}px)` : "";
        return O !== d.e && Sn(n, d.e = O), V !== d.t && ft(n, "tabindex", d.t = V), d.a = Ke(n, ae, d.a), oe !== d.o && h.classList.toggle("fixed-mode", d.o = oe), Oe !== d.i && $t(h, "width", d.i = Oe), rt !== d.n && $t(h, "min-width", d.n = rt), Ve !== d.s && $t(h, "max-width", d.s = Ve), d.h = Ke(k, st, d.h), d;
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
  function zo() {
    return K(qn, {
      get component() {
        return g();
      },
      class: "stk-footer",
      get style() {
        return Ge(() => !!u())() ? `top:${At()}px` : "";
      },
      get children() {
        return K(vt, {
          get each() {
            return e.footerData;
          },
          children: (n, o) => (() => {
            var h = Ot();
            return ee(h, K(me, {
              get when() {
                return Ue();
              },
              get children() {
                var k = un();
                return pe((d) => Ke(k, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, d)), k;
              }
            }), null), ee(h, K(vt, {
              get each() {
                return le();
              },
              children: (k, d) => K(me, {
                get when() {
                  return !k.__VT_C_SP__;
                },
                get fallback() {
                  return (() => {
                    var O = dn();
                    return pe(() => ft(O, "colspan", k.__VT_C_SP__)), O;
                  })();
                },
                get children() {
                  var O = Bn(), V = O.firstChild;
                  return Vt(O, mn(() => Eo(k)), !1, !0), ee(O, K(me, {
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
                  }), V), ee(V, K(me, {
                    get when() {
                      return n[k.dataIndex] != null;
                    },
                    get children() {
                      var ae = Vn();
                      return ee(ae, () => n[k.dataIndex]), ae;
                    }
                  })), pe(() => ft(V, "title", n[k.dataIndex] || "")), O;
                }
              })
            }), null), ee(h, K(me, {
              get when() {
                return Ue();
              },
              get children() {
                var k = fn();
                return pe((d) => Ke(k, `min-width:${Ze()}px;width:${Ze()}px`, d)), k;
              }
            }), null), h;
          })()
        });
      }
    });
  }
  function Yo(n, o) {
    const h = So(n, o);
    return (() => {
      var k = Ot();
      return Vt(k, h, !1, !0), ee(k, K(me, {
        get when() {
          return !(n && n.__EXP_R__);
        },
        get fallback() {
          return (() => {
            var d = Bn(), O = d.firstChild;
            return ee(O, (() => {
              var V = Ge(() => !!e.expandSlot);
              return () => V() ? e.expandSlot(n.__EXP_R__, n.__EXP_C__) : Ge(() => !!(n.__EXP_R__ && n.__EXP_C__))() && n.__EXP_R__[n.__EXP_C__.dataIndex] || "";
            })()), pe(() => ft(d, "colspan", F())), d;
          })();
        },
        get children() {
          return [K(me, {
            get when() {
              return Ue();
            },
            get children() {
              return un();
            }
          }), K(vt, {
            get each() {
              return le();
            },
            children: (d, O) => qo(n, d, o)
          }), K(me, {
            get when() {
              return Ue();
            },
            get children() {
              return fn();
            }
          })];
        }
      })), k;
    })();
  }
  function qo(n, o, h) {
    if (o.__VT_C_SP__)
      return (() => {
        var d = dn();
        return pe(() => ft(d, "colspan", o.__VT_C_SP__)), d;
      })();
    const k = po(n, o, h(), o.__LF_S__ ?? 0);
    return K(me, {
      get when() {
        return !xo(n, o);
      },
      get children() {
        var d = Nn();
        return Vt(d, k, !1, !0), ee(d, K(me, {
          get when() {
            return o.customCell;
          },
          get fallback() {
            return Go(n, o, h);
          },
          get children() {
            return hn(o.customCell, {
              class: "table-cell-wrapper",
              tabindex: "-1",
              col: o,
              row: n,
              // 使用 getter 保持响应式：<For> 复用行后 index 会变化
              get rowIndex() {
                return Ct(h());
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
              stkFoldIcon: K(xn, {}),
              stkDragIcon: K(On, {
                onDragStart: (O) => Ye(O, Ct(h()))
              })
            });
          }
        })), d;
      }
    });
  }
  function Go(n, o, h) {
    return o.type ? o.type === "seq" ? (() => {
      var k = zt();
      return ee(k, () => (e.seqConfig.startIndex || 0) + Ct(h()) + 1), k;
    })() : o.type === "tree-node" ? (() => {
      var k = zt();
      return ee(k, K(vr, {
        col: o,
        row: n
      })), k;
    })() : (() => {
      var k = zt();
      return ee(k, K(me, {
        get when() {
          return o.type === "dragRow";
        },
        get children() {
          return K(On, {
            onDragStart: (d) => Ye(d, Ct(h()))
          });
        }
      }), null), ee(k, K(me, {
        get when() {
          return o.type === "expand";
        },
        get children() {
          return K(xn, {});
        }
      }), null), ee(k, K(me, {
        get when() {
          return n[o.dataIndex] != null;
        },
        get children() {
          var d = Vn();
          return ee(d, () => n[o.dataIndex]), d;
        }
      }), null), pe(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })() : (() => {
      var k = zt();
      return ee(k, (() => {
        var d = Ge(() => (n && n[o.dataIndex]) != null);
        return () => d() ? n && n[o.dataIndex] : Ee()(o, n);
      })()), pe(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })();
  }
}
function hn(t, e) {
  return typeof t == "string" ? t : typeof t == "function" ? t(e) : null;
}
Mt(["click", "dblclick", "contextmenu", "mouseover", "mousedown", "mouseout", "touchstart"]);
var sl = /* @__PURE__ */ ue("<input type=checkbox>"), cl = /* @__PURE__ */ ue("<div><footer><button>↺</button><button>✓");
const Kn = 300, zn = 400, xt = 6;
function al() {
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
      var b = sl();
      return pe(() => b.checked = _().has(S.value)), b;
    })()
  }, {
    title: "",
    dataIndex: "label"
  }];
  let s, v = null, w = null, L = null;
  function p() {
    if (!s)
      return [Kn, zn];
    const S = s.getBoundingClientRect();
    return [S.width || Kn, S.height || zn];
  }
  function I(S) {
    const b = window.pageYOffset || document.documentElement.scrollTop, H = window.pageXOffset || document.documentElement.scrollLeft, te = document.documentElement.clientWidth, X = document.documentElement.clientHeight, [we, G] = p();
    let re = S.x, Ee = S.y;
    S.x - H + we > te - xt && (re = te - we - xt + H);
    const de = S.y - b;
    if (de + G > X - xt) {
      const Xe = S.height || 30;
      de - Xe >= G + xt ? Ee = S.y - Xe - G - xt : Ee = xt + b;
    }
    return re = Math.max(xt + H, re), Ee = Math.max(xt + b, Ee), {
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
    const H = new Set(_());
    S ? H.add(b.value) : H.delete(b.value), u(H);
  }
  function y() {
    const S = _();
    l().forEach((b) => b.selected = S.has(b.value)), w == null || w(Array.from(S)), T();
  }
  function T() {
    e(!1), f([]), u(/* @__PURE__ */ new Set()), v = null;
  }
  function D() {
    u(/* @__PURE__ */ new Set()), l().forEach((S) => S.selected = !1), w == null || w([]), T();
  }
  function C(S) {
    !t() || s != null && s.contains(S.target) || v != null && v.contains(S.target) || T();
  }
  function R(S, b) {
    const H = _().has(b.value);
    m(!H, b);
  }
  function M(S, b, H, te) {
    s && (s.style.visibility = "hidden"), f(b || []), v = te ?? null, w = H, x(), e(!0), queueMicrotask(() => {
      E(I(S)), s && (s.style.visibility = "visible");
    });
  }
  function A(S) {
    r(S);
  }
  const P = document.createElement("div");
  return P.classList.add("stk-filter-dropdown-wrapper"), document.body.appendChild(P), L = Qo(() => (() => {
    var S = cl(), b = S.firstChild, H = b.firstChild, te = H.nextSibling;
    return S.$$click = (X) => X.stopPropagation(), Et((X) => s = X, S), ee(S, K(il, {
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
    }), b), H.$$click = D, te.$$click = y, pe((X) => {
      var we = `stk-filter-dropdown stk-filter-dropdown--${i()}`, G = c().y + "px", re = c().x + "px", Ee = t() ? void 0 : "none";
      return we !== X.e && Sn(S, X.e = we), G !== X.t && $t(S, "top", X.t = G), re !== X.a && $t(S, "left", X.a = re), Ee !== X.o && $t(S, "display", X.o = Ee), X;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), S;
  })(), P), document.addEventListener("click", C), Tt(() => {
    document.removeEventListener("click", C), L == null || L();
  }), {
    get visible() {
      return t();
    },
    get trigger() {
      return v;
    },
    show: M,
    hide: T,
    setTheme: A
  };
}
let gn = null;
async function ul() {
  return gn || (gn = al()), gn;
}
Mt(["click"]);
var fl = /* @__PURE__ */ ue('<div class=stk-filter><svg class=stk-filter-icon xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"><path fill=currentColor d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z">'), dl = /* @__PURE__ */ ue("<span>");
function hl(t) {
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
    ul().then((s) => {
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
    var c = fl(), E = c.firstChild;
    ee(c, () => t.children ?? (() => {
      var u = dl();
      return ee(u, () => t.col.title), u;
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
function gl(t, e) {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((r) => {
    const l = r[e];
    l != null && i.add(l);
  }), Array.from(i).map((r) => ({
    label: String(r),
    value: r
  }));
}
function Il(t) {
  const [e, i] = Ce({});
  function r(l, f) {
    return (c) => {
      const E = c.col.dataIndex, _ = Cn(), u = () => {
        var p;
        return ((p = e()[E]) == null ? void 0 : p.value.length) || 0;
      };
      let g = null, s = null;
      function v() {
        var I;
        if (!(l != null && l.autoOptions)) return [];
        const p = ((I = _ == null ? void 0 : _.rawDataSource) == null ? void 0 : I.call(_)) || (_ == null ? void 0 : _.dataSource()) || [];
        return g && s === p || (s = p, g = gl(p, E)), g;
      }
      function w() {
        return (l == null ? void 0 : l.options) ?? v();
      }
      function L(p) {
        var m, y;
        const I = {
          value: p,
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
      return K(hl, {
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
var ml = /* @__PURE__ */ ue("<input class=stk-editable-cell-input>"), _l = /* @__PURE__ */ ue("<div class=stk-editable-cell>");
function wl(t) {
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
    p(x), (m = t.onChange) == null || m.call(t, x), I();
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
  function p(x) {
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
    var x = _l();
    return x.$$click = _, x.$$dblclick = _, Et((m) => E = m, x), ee(x, K(me, {
      get when() {
        return l();
      },
      get fallback() {
        return Ge(() => i() ?? "");
      },
      get children() {
        var m = ml();
        return m.$$keydown = L, m.$$input = w, m.addEventListener("blur", v), Et((y) => c = y, m), pe(() => m.value = i()), m;
      }
    })), x;
  })();
}
Mt(["dblclick", "click", "input", "keydown"]);
function Ll(t) {
  function e() {
    return (i) => K(wl, mn(i, {
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
var vl = /* @__PURE__ */ ue("<div class=stk-checkbox-cell>"), xl = /* @__PURE__ */ ue("<input type=checkbox class=stk-checkbox-native>");
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
    var l = vl();
    return ee(l, K(me, {
      get when() {
        return t.customComponent;
      },
      get fallback() {
        return (() => {
          var f = xl();
          f.$$click = (E) => E.stopPropagation(), f.addEventListener("change", r);
          var c = i;
          return typeof c == "function" ? Et(c, f) : i = f, pe(() => f.checked = !!t.checked), f;
        })();
      },
      get children() {
        return K(qn, {
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
function $l(t) {
  const e = (t == null ? void 0 : t.field) ?? "_isChecked", i = t == null ? void 0 : t.checkboxComponent;
  function r() {
    return (f) => {
      const c = Cn(), E = () => (c == null || c.rowVersion(), !!f.row[e]);
      function _(u) {
        var g;
        f.row[e] = u, c == null || c.bumpRowVersion(), (g = t == null ? void 0 : t.onChange) == null || g.call(t, u, f.row);
      }
      return K(Yn, {
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
      return K(Yn, {
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
const Cl = {
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
function Sl(t) {
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
    const m = Cl[_];
    for (let y = 0; y < m.length; y++) {
      const T = m[y][0];
      if (w >= T) {
        w = w / T, L = m[y][1];
        break;
      }
    }
  }
  let p;
  L ? p = u ?? i ?? 2 : p = i ?? null;
  let I = p == null ? String(w) : w.toFixed(p);
  return r && (I = Sl(I)), `${l}${v}${I}${L}${E ? "%" : ""}${f}`;
}
var bl = /* @__PURE__ */ ue("<span class=stk-number-cell>");
function Ml(t) {
  function e() {
    return (i) => (() => {
      var r = bl();
      return ee(r, () => ro(i.cellValue, t)), r;
    })();
  }
  return {
    NumberCell: e
  };
}
var El = /* @__PURE__ */ ue("<span>"), pl = /* @__PURE__ */ ue("<span class=stk-change-cell__arrow>");
function Tl(t) {
  const e = t === "" || t == null ? NaN : Number(t);
  return Number.isNaN(e) || e === 0 ? "flat" : e > 0 ? "rise" : "fall";
}
function Al(t = {}) {
  const {
    colorReverse: e = !1,
    arrow: i = !1,
    riseColor: r,
    fallColor: l,
    flatColor: f
  } = t;
  function c() {
    return (E) => {
      const _ = E.cellValue, u = Tl(_);
      let g = "stk-change-cell--flat";
      u === "rise" ? g = e ? "stk-change-cell--green" : "stk-change-cell--red" : u === "fall" && (g = e ? "stk-change-cell--red" : "stk-change-cell--green");
      const s = u === "rise" ? r : u === "fall" ? l : f, v = i && u !== "flat" ? u === "rise" ? "▲" : "▼" : "";
      return (() => {
        var w = El();
        return Sn(w, `stk-change-cell ${g}`), ee(w, v ? (() => {
          var L = pl();
          return ee(L, v), L;
        })() : null, null), ee(w, () => ro(_, t), null), pe((L) => Ke(w, s ? {
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
  il as StkTable,
  oo as StkTableContext,
  Zn as binarySearch,
  Al as createChangeCell,
  $l as createCheckboxCell,
  Ll as createEditableCell,
  Il as createFilterCell,
  Ml as createNumberCell,
  ro as formatNumber,
  Dl as insertToOrderedArray,
  kl as registerFeature,
  wn as strCompare,
  vn as tableSort,
  dr as useAreaSelection,
  Cn as useStkTableContext
};
