import { createSignal as Ce, createMemo as G, createEffect as tt, onMount as Tt, onCleanup as pt, createContext as Uo, useContext as jo, createRoot as Zo, on as ht, mergeProps as Jo, Show as _e, For as vt } from "solid-js";
import { template as fe, delegateEvents as Mt, insert as ee, memo as Ge, createComponent as K, effect as Te, setAttribute as ft, style as Ke, use as Et, addEventListener as St, spread as Vt, mergeProps as mn, className as Sn, setStyleProperty as $t, Dynamic as qn, render as Qo } from "solid-js/web";
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
  let { sortType: T } = t;
  const _ = f || l;
  T || (T = typeof e[_]);
  const u = T === "number", g = i.slice();
  if (!c || !g.length)
    return g.unshift(e), g;
  const { emptyToBottom: s, customCompare: b, stringLocaleCompare: x } = { emptyToBottom: !1, ...r }, $ = e[_];
  if (s && Gt($, u))
    g.push(e);
  else {
    const p = c === "asc", L = b || ((E, y) => {
      const v = E[_], I = wn(v, $, u, x);
      return p ? I : -I;
    }), C = Zn(g, (E) => L(g[E], e));
    g.splice(C, 0, e);
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
  for (let c = 0, T = e.length; c < T; c++) {
    const _ = e[c];
    Gt(_ == null ? void 0 : _[f], i) ? r.push(_) : l.push(_);
  }
  return [l, r];
}
function vn(t, e, i, r = {}) {
  if (!(i != null && i.length) || !t) return i || [];
  r = { ...qt, ...r };
  let l = i.slice(), f = t.sortField || t.dataIndex;
  const { defaultSort: c, stringLocaleCompare: T, emptyToBottom: _, sortChildren: u } = r;
  if (!e && c && (e = c.order, f = c.dataIndex), typeof t.sorter == "function") {
    const g = t.sorter(l, { order: e, column: t });
    g && (l = g), u && l.forEach((s) => {
      var b;
      (b = s.children) != null && b.length && (s.children = vn(t, e, s.children, r));
    });
  } else if (e) {
    let { sortType: g } = t;
    g || (g = typeof i[0][f]);
    const s = g === "number", [b, x] = cr(t, l, s);
    e === "asc" ? b.sort(($, p) => wn($[f], p[f], s, T)) : b.sort(($, p) => wn(p[f], $[f], s, T)), l = e === "desc" || _ ? b.concat(x) : x.concat(b), u && l.forEach(($) => {
      var p;
      (p = $.children) != null && p.length && ($.children = vn(t, e, $.children, r));
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
function dr(t, e, i, r, l, f, c, T, _, u, g, s) {
  const p = "ArrowUp", L = "ArrowDown", C = "ArrowLeft", E = "ArrowRight", v = "Escape", R = "data-cs-s", D = "data-cs-t", A = "data-cs-b", O = "data-cs-l", S = "data-cs-r", w = "data-rs-s", [H, se] = Ce([]), [W, ce] = Ce(!1);
  let Y = null, oe = 0, Ee = 0, De = 0;
  const he = G(() => {
    if (typeof t.areaSelection == "boolean") {
      const F = t.areaSelection;
      return { enabled: F, keyboard: F, ctrl: F, shift: F, highlight: { cell: F, row: !1 } };
    }
    const { highlight: a, ...M } = t.areaSelection || {};
    return {
      enabled: !0,
      ctrl: !0,
      shift: !0,
      highlight: {
        cell: !0,
        row: !1,
        ...a
      },
      ...M
    };
  }), Xe = G(() => he().keyboard), it = G(() => he().ctrl), B = G(() => he().shift), z = G(() => {
    var a;
    return (a = he().highlight) == null ? void 0 : a.cell;
  }), ie = G(() => {
    var a;
    return (a = he().highlight) == null ? void 0 : a.row;
  }), de = G(() => {
    const a = l(), M = /* @__PURE__ */ new Map();
    for (let F = 0; F < a.length; F++)
      M.set(f()(a[F]), F);
    return M;
  }), ge = G(() => {
    var te, J;
    const a = l(), M = new Array(a.length + 1).fill(0), F = new Array(a.length + 1).fill(0);
    let X = 0;
    for (let N = 0; N < a.length; N++)
      M[N] = X, ((te = a[N]) == null ? void 0 : te.fixed) === "left" && (X += lt(a[N]));
    M[a.length] = X;
    let re = 0;
    for (let N = a.length - 1; N >= 0; N--)
      F[N] = re, ((J = a[N]) == null ? void 0 : J.fixed) === "right" && (re += lt(a[N]));
    return (N) => [M[N] ?? 0, F[N + 1] ?? 0];
  });
  let me = /* @__PURE__ */ new Set();
  function $e() {
    const a = H();
    if (!a.length) {
      me = /* @__PURE__ */ new Set();
      return;
    }
    const M = /* @__PURE__ */ new Set(), F = l(), X = r();
    for (const re of a) {
      const {
        begin: { row: te, col: J },
        end: { row: N, col: Q }
      } = re.index, [U, q] = te < N ? [te, N] : [N, te], [le, j] = J < Q ? [J, Q] : [Q, J];
      for (let Z = U; Z <= q; Z++) {
        const ae = X[Z];
        if (ae)
          for (let be = le; be <= j; be++) {
            const We = F[be];
            We && M.add(c(ae, We));
          }
      }
    }
    me = M;
  }
  function Pe() {
    const a = i();
    if (!a) return;
    const M = z(), F = ie(), X = a.querySelectorAll(`[${R}]`);
    for (let N = 0; N < X.length; N++) {
      const Q = X[N];
      Q.removeAttribute(R), Q.removeAttribute(D), Q.removeAttribute(A), Q.removeAttribute(O), Q.removeAttribute(S);
    }
    const re = a.querySelectorAll(`[${w}]`);
    for (let N = 0; N < re.length; N++)
      re[N].removeAttribute(w);
    $e();
    const te = H();
    if (!te.length) return;
    const J = a.querySelector(".stk-tbody-main");
    if (J) {
      if (F)
        for (const N of te) {
          const { minRow: Q, maxRow: U } = ve(N);
          for (let q = Q; q <= U; q++) {
            const le = J.querySelector(`tr[data-row-i="${q}"]`);
            le && le.setAttribute(w, "");
          }
        }
      if (M) {
        const N = te[te.length - 1], { minRow: Q, maxRow: U, minCol: q, maxCol: le } = ve(N), j = J.querySelectorAll("tr[data-row-i]");
        for (let Z = 0; Z < j.length; Z++) {
          const ae = j[Z], be = parseInt(ae.getAttribute("data-row-i"), 10);
          let We = !1;
          for (const Je of te) {
            const { minRow: je, maxRow: ct } = ve(Je);
            if (be >= je && be <= ct) {
              We = !0;
              break;
            }
          }
          if (!We) continue;
          const ze = ae.querySelectorAll("td[data-col-key]");
          for (let Je = 0; Je < ze.length; Je++) {
            const je = ze[Je], ct = je.getAttribute("data-col-key"), Qe = de().get(ct);
            if (Qe === void 0 || Qe < 0) continue;
            const Re = r()[be], we = l();
            if (!Re || !we[Qe]) continue;
            const ot = c(Re, we[Qe]);
            if (!me.has(ot)) continue;
            if (je.setAttribute(R, ""), be >= Q && be <= U && Qe >= q && Qe <= le) {
              const Jt = be + (parseInt(je.getAttribute("rowspan") || "1", 10) || 1) - 1, Qt = Qe + (parseInt(je.getAttribute("colspan") || "1", 10) || 1) - 1;
              be === Q && je.setAttribute(D, ""), Jt === U && je.setAttribute(A, ""), Qe === q && je.setAttribute(O, ""), Qt === le && je.setAttribute(S, "");
            }
          }
        }
      }
    }
  }
  tt(() => {
    const a = H(), M = _(), F = u();
    a.length, a.length > 0 && JSON.stringify(a.map((X) => X.index)), F.scrollLeft, M.startIndex, M.endIndex, F.startIndex, F.endIndex, r().length, l().length, queueMicrotask(Pe);
  }), Tt(() => {
    Se();
  }), pt(() => {
    ye();
  }), tt(() => {
    const a = r().length, M = l().length;
    if (!he().enabled || (Y && (a === 0 || M === 0 ? Y = null : (Y.rowIndex = ke(Y.rowIndex, 0, a - 1), Y.colIndex = ke(Y.colIndex, 0, M - 1))), !H().length)) return;
    if (a === 0 || M === 0) {
      Ht(), Ze();
      return;
    }
    const F = a - 1, X = M - 1;
    let re = !1;
    const te = [];
    for (const J of H()) {
      const { begin: N, end: Q } = J.index, U = ke(N.row, 0, F), q = ke(N.col, 0, X), le = ke(Q.row, 0, F), j = ke(Q.col, 0, X);
      U !== N.row || q !== N.col || le !== Q.row || j !== Q.col ? (re = !0, te.push(Ae(U, q, le, j))) : te.push(J);
    }
    re && (se(te), Ze());
  });
  function Se() {
    var a;
    ye(), (a = i()) == null || a.addEventListener("keydown", Dt);
  }
  function ye() {
    var a;
    (a = i()) == null || a.removeEventListener("keydown", Dt), document.removeEventListener("mousemove", pe), document.removeEventListener("mouseup", Ue), yt();
  }
  function ve(a) {
    const { begin: M, end: F } = a.index;
    return {
      minRow: Math.min(M.row, F.row),
      maxRow: Math.max(M.row, F.row),
      minCol: Math.min(M.col, F.col),
      maxCol: Math.max(M.col, F.col)
    };
  }
  function Ae(a, M, F, X) {
    return {
      index: {
        x: [M, X],
        y: [a, F],
        begin: { row: a, col: M },
        end: { row: F, col: X }
      }
    };
  }
  function He(a) {
    return a ? de().get(a) ?? -1 : -1;
  }
  function Ye(a, M) {
    const F = r(), X = l(), re = F[a], te = X[M];
    if (!re || !te || !te.mergeCells) return [1, 1];
    const { rowspan: J = 1, colspan: N = 1 } = te.mergeCells({ row: re, col: te, rowIndex: a, colIndex: M }) || {};
    return [J || 1, N || 1];
  }
  function Ie(a) {
    var wt;
    const { minRow: M, maxRow: F, minCol: X, maxCol: re } = ve(a), te = r(), J = l(), N = te.length, Q = J.length, U = [];
    for (let Re = 0; Re < Q; Re++)
      (wt = J[Re]) != null && wt.mergeCells && U.push(Re);
    if (!U.length) return a;
    let [q, le, j, Z] = [M, F, X, re], ae = !0, be = 0;
    for (; ae && be++ < 100; ) {
      ae = !1;
      for (const Re of U) {
        if (Re < j || Re > Z) continue;
        const [we] = Ye(le, Re);
        we > 1 && le + we - 1 < N && le + we - 1 > le && (le = le + we - 1, ae = !0);
      }
      for (let Re = q; Re <= le; Re++) {
        const [, we] = Ye(Re, Z);
        we > 1 && Z + we - 1 < Q && Z + we - 1 > Z && (Z = Z + we - 1, ae = !0);
      }
      for (const Re of U)
        if (!(Re < j || Re > Z))
          for (let we = q - 1; we >= 0 && we > q - 500; we--) {
            const [ot] = Ye(we, Re);
            if (ot <= 1) continue;
            if (we + ot - 1 >= q)
              we < q && (q = we, ae = !0);
            else
              break;
          }
      for (let Re = q; Re <= le; Re++)
        for (let we = j - 1; we >= 0 && we > j - 500; we--) {
          const [, ot] = Ye(Re, we);
          if (ot <= 1) continue;
          if (we + ot - 1 >= j)
            we < j && (j = we, ae = !0);
          else
            break;
        }
    }
    if (q === M && le === F && j === X && Z === re)
      return a;
    const { begin: We, end: ze } = a.index, Je = We.row < ze.row || We.row === ze.row ? q : le, je = We.row < ze.row || We.row === ze.row ? le : q, ct = We.col <= ze.col ? j : Z, Qe = We.col <= ze.col ? Z : j;
    return Ae(Je, ct, je, Qe);
  }
  function xe(a) {
    let M = 0;
    const F = l();
    for (let X = 0; X < F.length; X++) {
      const re = lt(F[X]);
      if (X === a) return [M, re];
      M += re;
    }
    return [M, 0];
  }
  function Fe(a, M) {
    let F = 0, X = 0;
    switch (a) {
      case p:
        F = -1;
        break;
      case L:
        F = 1;
        break;
      case C:
        X = -1;
        break;
      case E:
        X = 1;
        break;
      case "Tab":
        X = M ? -1 : 1;
        break;
    }
    return [F, X];
  }
  function ke(a, M, F) {
    return Math.max(M, Math.min(a, F));
  }
  function mt(a, M, F, X, re) {
    return F >= re ? [Math.min(a + 1, X - 1), 0] : F < 0 ? [Math.max(a - 1, 0), re - 1] : [a, M];
  }
  function Le(a, M, F) {
    const { top: X, bottom: re, left: te, right: J } = F;
    let N = 0, Q = 0;
    if (M < X + 40) {
      const U = Math.max(0, X + 40 - M);
      Q = -Math.ceil(U / 40 * 15);
    } else if (M > re - 40) {
      const U = Math.max(0, M - (re - 40));
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
    if (!he().enabled || a.button !== 0) return;
    const M = gt(a.target), F = Pt(a.target), X = He(F);
    if (M < 0 || X < 0) return;
    const re = a.ctrlKey || a.metaKey, te = Ie(Ae(M, X, M, X));
    if (a.shiftKey && Y && B()) {
      const J = H().slice(), N = Ie(
        Ae(Y.rowIndex, Y.colIndex, M, X)
      );
      J.length ? J[J.length - 1] = N : J.push(N), se(J);
    } else
      Y = { rowIndex: M, colIndex: X }, re && it() ? se(H().concat([te])) : se([te]);
    ce(!0), Ee = a.clientX, De = a.clientY, document.addEventListener("mousemove", pe), document.addEventListener("mouseup", Ue);
  }
  function pe(a) {
    W() && (Ee = a.clientX, De = a.clientY, Be(a), nt());
  }
  function Be(a) {
    const M = a.target;
    if (!M) return;
    const F = gt(M);
    if (Number.isNaN(F) || F < 0) return;
    const X = Pt(M), re = He(X);
    re < 0 || Me(F, re);
  }
  function Me(a, M) {
    if (!Y) return;
    const F = Ie(
      Ae(Y.rowIndex, Y.colIndex, a, M)
    ), X = [...H()];
    X.length > 0 ? X[X.length - 1] = F : X.push(F), se(X);
  }
  function nt() {
    const a = i();
    if (!a) return;
    const M = a.getBoundingClientRect(), { top: F, bottom: X, left: re, right: te } = M, J = De < F + 40 || De > X - 40 || Ee < re + 40 || Ee > te - 40;
    J && !oe ? _t() : !J && oe && yt();
  }
  function _t() {
    const a = i();
    if (!a || !W()) {
      yt();
      return;
    }
    const M = a.getBoundingClientRect(), { deltaX: F, deltaY: X } = Le(Ee, De, M);
    (F !== 0 || X !== 0) && (a.scrollTop += X, a.scrollLeft += F, Wt(a, M)), W() && (F !== 0 || X !== 0) ? oe = requestAnimationFrame(_t) : oe = 0;
  }
  function Wt(a, M) {
    const F = a.querySelector("thead"), { top: X, bottom: re, left: te, right: J } = M, N = F ? X + F.offsetHeight : X, Q = Math.max(te + 2, Math.min(Ee, J - 2)), U = Math.max(N + 2, Math.min(De, re - 2)), q = document.elementFromPoint(Q, U);
    if (!q) return;
    const le = Ut(q), j = bt(q);
    if (!le || !j) return;
    const Z = gt(j), ae = Pt(le), be = He(ae);
    Number.isNaN(Z) || Z < 0 || be < 0 || Me(Z, be);
  }
  function yt() {
    oe && (cancelAnimationFrame(oe), oe = 0);
  }
  function Ue() {
    if (!W()) return;
    ce(!1), yt(), document.removeEventListener("mousemove", pe), document.removeEventListener("mouseup", Ue);
    const a = H();
    if (a.length) {
      const M = Ie(a[a.length - 1]);
      if (M !== a[a.length - 1]) {
        const F = [...a];
        F[F.length - 1] = M, se(F);
      }
    }
    Ze();
  }
  function Ze() {
    var a;
    (a = e.onAreaSelectionChange) == null || a.call(e, H());
  }
  function At() {
    const a = he();
    return typeof a.formatCellForClipboard == "function" ? a.formatCellForClipboard : null;
  }
  function Rt() {
    const a = H();
    if (!a.length) return "";
    const M = a[a.length - 1], { minRow: F, maxRow: X, minCol: re, maxCol: te } = ve(M), J = r(), N = l(), Q = At(), U = [];
    for (let le = F; le <= X; le++) {
      const j = J[le];
      if (!j) continue;
      const Z = [];
      for (let ae = re; ae <= te; ae++) {
        const be = N[ae];
        if (!be) {
          Z.push("");
          continue;
        }
        const We = j[be.dataIndex];
        Z.push(Q ? Q(j, be, We) : We ? String(We) : "");
      }
      U.push(Z.join("	"));
    }
    const q = U.join(`
`);
    return navigator.clipboard.writeText(q).catch(() => {
      console.warn("Failed to copy to clipboard");
    }), q;
  }
  function at() {
    const a = i(), M = document.activeElement;
    a && M && a.contains(M) && M !== a && a.focus({ preventScroll: !0 });
  }
  function Dt(a) {
    if (!he().enabled) return;
    const M = a.key;
    if (M === v || M === "Esc") {
      at(), H().length && a.preventDefault();
      return;
    }
    if ((a.ctrlKey || a.metaKey) && M === "c" && H().length) {
      Rt(), a.preventDefault();
      return;
    }
    if (!Xe()) return;
    const F = [p, L, C, E].includes(M), X = M === "Tab";
    if (!(F || X)) return;
    a.preventDefault();
    const te = r().length, J = l().length;
    if (te === 0 || J === 0) return;
    if (!H().length) {
      Y = { rowIndex: 0, colIndex: 0 }, se([Ae(0, 0, 0, 0)]), Ze(), ut(0, 0);
      return;
    }
    const [N, Q] = Fe(M, a.shiftKey);
    if (a.shiftKey && F && B()) {
      at();
      const U = [...H()], q = U.length > 0 ? U[U.length - 1] : null;
      if (!q) return;
      const { begin: le, end: j } = q.index;
      let Z = j.row + N, ae = j.col + Q;
      Z = ke(Z, 0, te - 1), ae = ke(ae, 0, J - 1), U[U.length - 1] = Ae(le.row, le.col, Z, ae), se(U), ut(Z, ae);
    } else {
      at();
      const U = H(), q = U.length > 0 ? U[U.length - 1] : null, le = q ? ve(q).minRow : 0, j = q ? ve(q).minCol : 0;
      let Z = le + N, ae = j + Q;
      if (Z = ke(Z, 0, te - 1), ae = ke(ae, 0, J - 1), X) {
        const be = j + Q, [We, ze] = mt(le, ae, be, te, J);
        Z = We, ae = ze;
      }
      Y = { rowIndex: Z, colIndex: ae }, se([Ae(Z, ae, Z, ae)]), ut(Z, ae);
    }
    Ze();
  }
  function ut(a, M) {
    const F = i();
    if (!F) return;
    const X = r()[a], re = l()[M];
    if (!X || !re) return;
    const te = F.querySelector("thead"), J = te ? te.offsetHeight : 0, N = F.querySelector("tfoot"), Q = N ? N.offsetHeight : 0, U = _(), q = u(), le = t.scrollRowByRow, j = U.rowHeight, Z = a * j, ae = Z + j, be = le ? U.scrollTop : F.scrollTop, We = be + U.containerHeight - J - Q;
    let ze = null;
    Z < be ? ze = Z : ae > We && (ze = ae - (U.containerHeight - J - Q));
    const [Je, je] = xe(M), ct = Je + je, Qe = F.scrollLeft, wt = Qe + q.containerWidth, [Re, we] = ge()(M);
    let ot = null;
    Je < Qe + Re ? ot = Je - Re : ct > wt - we && (ot = ct - q.containerWidth + we), (ze !== null || ot !== null) && T(ze, ot);
  }
  function jt() {
    const a = H();
    if (!a.length) return { rows: [], cols: [], ranges: [] };
    const M = r(), F = l(), X = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set();
    for (const N of a) {
      const { minRow: Q, maxRow: U, minCol: q, maxCol: le } = ve(N);
      for (let j = Q; j <= U; j++) X.add(j);
      for (let j = q; j <= le; j++) re.add(j);
    }
    const te = [...X].sort((N, Q) => N - Q), J = [...re].sort((N, Q) => N - Q);
    return {
      rows: te.map((N) => M[N]).filter(Boolean),
      cols: J.map((N) => F[N]).filter(Boolean),
      ranges: a.map((N) => ({ ...N }))
    };
  }
  function Ht() {
    se([]), ce(!1);
  }
  function Zt(a, M = {}) {
    if (!he().enabled) return H();
    const { silent: F = !1, scrollToView: X = !1 } = M, re = r().length, te = l().length;
    if (re <= 0 || te <= 0)
      return Ht(), F || Ze(), H();
    const J = re - 1, N = te - 1;
    let Q = 0, U = J, q = 0, le = N;
    if (a) {
      const j = a.begin, Z = a.end ?? j;
      Q = typeof j.row == "number" ? j.row : g(j.row), U = typeof Z.row == "number" ? Z.row : g(Z.row);
      const ae = typeof j.col == "number" ? j.col : j.col ? s(j.col) : void 0, be = typeof Z.col == "number" ? Z.col : Z.col ? s(Z.col) : void 0;
      ae !== void 0 ? (q = ae, le = be !== void 0 ? be : ae) : be !== void 0 && (q = 0, le = be);
    }
    return Q = ke(Q, 0, J), U = ke(U, 0, J), q = ke(q, 0, N), le = ke(le, 0, N), se([Ae(Q, q, U, le)]), Y = { rowIndex: Q, colIndex: q }, ce(!1), X && ut(U, le), F || Ze(), H();
  }
  return {
    config: he,
    isSelecting: W,
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
    config: G(() => ({ enabled: !1 })),
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
var hr = /* @__PURE__ */ fe('<span class=drag-row-handle draggable=true><svg viewBox="0 0 1024 1024"width=20 height=20 fill=currentColor><path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z">');
function On(t) {
  return (() => {
    var e = hr();
    return e.addEventListener("dragstart", (i) => {
      var r;
      return (r = t.onDragStart) == null ? void 0 : r.call(t, i);
    }), e;
  })();
}
var gr = /* @__PURE__ */ fe('<svg xmlns=http://www.w3.org/2000/svg width=16px height=16px viewBox="0 0 16 16"><polygon class=arrow-up fill=#757699 points="8 2 4.8 6 11.2 6"></polygon><polygon class=arrow-down transform="translate(8, 12) rotate(-180) translate(-8, -12) "points="8 10 4.8 14 11.2 14">');
function mr() {
  return gr();
}
var _r = /* @__PURE__ */ fe("<div class=stk-fold-icon>");
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
var wr = /* @__PURE__ */ fe("<div><span>");
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
    })(), i), ee(i, () => t.row[t.col.dataIndex] ?? ""), Te((r) => {
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
    i.virtual ? c() : T();
  }), tt(() => {
    i.virtualX ? c() : T();
  }), Tt(() => {
    (i.virtual || i.virtualX) && c();
  }), pt(() => {
    T();
  });
  function c() {
    if (f && T(), window.ResizeObserver) {
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
  function T() {
    f && (l ? (l.disconnect(), l = null) : window.removeEventListener("resize", u), f = !1);
  }
  let _ = 0;
  function u() {
    _ && window.clearTimeout(_), _ = window.setTimeout(() => {
      i.autoResize && (e(), typeof i.autoResize == "function" && i.autoResize()), _ = 0;
    }, r);
  }
}
function Cr(t, e, i, r, l, f, c, T) {
  const [_, u] = Ce(!1);
  let g = {
    currentCol: null,
    lastCol: null,
    startX: 0,
    startOffsetTableX: 0,
    revertMoveX: !1
  };
  const s = G(() => Object.prototype.toString.call(t.colResizable) === "[object Object]" ? (E) => !t.colResizable.disabled(E) : (E) => !!t.colResizable);
  Tt(() => {
    b();
  }), pt(() => {
    x();
  });
  function b() {
    window.addEventListener("mousemove", p), window.addEventListener("mouseup", L);
  }
  function x() {
    window.removeEventListener("mousemove", p), window.removeEventListener("mouseup", L);
  }
  function $(E, y, v = !1) {
    if (!i()) return;
    E.stopPropagation(), E.preventDefault();
    const { clientX: I } = E, { scrollLeft: m, scrollTop: R } = i(), { left: D } = i().getBoundingClientRect(), A = r();
    let O = !1;
    const S = f(), w = S(y), H = A.findIndex((Y) => S(Y) === w), se = c().indexOf(y), W = se !== -1;
    v ? W && y.fixed === "right" ? O = !0 : H - 1 >= 0 && (y = A[H - 1]) : W && y.fixed === "right" && (y = c()[se + 1] || y);
    const ce = I - D + m;
    if (u(!0), Object.assign(g, {
      currentCol: y,
      lastCol: C(y),
      startX: I,
      startOffsetTableX: ce,
      revertMoveX: O
    }), l()) {
      const Y = l().style;
      Y.display = "block", Y.left = ce + "px", Y.top = R + "px";
    }
  }
  function p(E) {
    if (!_()) return;
    E.stopPropagation(), E.preventDefault();
    const { lastCol: y, startX: v, startOffsetTableX: I } = g, { clientX: m } = E;
    let R = m - v;
    const D = lt(y), A = (y == null ? void 0 : y.minWidth) ?? t.colMinWidth;
    D + R < A && (R = -D);
    const O = I + R;
    l() && (l().style.left = O + "px");
  }
  function L(E) {
    var S, w;
    if (!_()) return;
    const { startX: y, lastCol: v, revertMoveX: I } = g, { clientX: m } = E, R = I ? y - m : m - y;
    let D = lt(v) + R;
    D < t.colMinWidth && (D = t.colMinWidth);
    const A = f(), O = r().find((H) => A(H) === A(v));
    if (O && (O.width = D + "px", T == null || T(), (S = e["onUpdate:columns"]) == null || S.call(e, t.columns.slice()), (w = e.onColResize) == null || w.call(e, { ...O })), l()) {
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
  function C(E) {
    var y;
    if ((y = E == null ? void 0 : E.children) != null && y.length) {
      const v = E.children.slice(-1)[0];
      return C(v);
    }
    return E;
  }
  return [s, _, $];
}
function Sr(t, e, i, r, l, f) {
  const [c, T] = Ce([]), [_, u] = Ce([]), [g, s] = Ce([]), b = G(() => {
    const $ = /* @__PURE__ */ new Map(), p = c(), L = _(), C = g(), E = e(), y = t.fixedColShadow, v = r();
    for (let I = 0, m = v.length; I < m; I++) {
      const R = v[I];
      for (let D = 0, A = R.length; D < A; D++) {
        const O = R[D], S = O.fixed, w = S && y && p.includes(O), H = [];
        L.includes(O) && H.push("fixed-cell--active"), S && (H.push("fixed-cell"), H.push("fixed-cell--" + S)), w && H.push("fixed-cell--shadow"), S === "right" && C.includes(O) && H.push("fixed-cell--border-left"), $.set(E(O), H.join(" "));
      }
    }
    return $;
  });
  function x($) {
    const p = [], L = i();
    let C, E;
    if ($ != null && $()) {
      const { containerWidth: m, scrollLeft: R } = $();
      C = m, E = R;
    } else {
      const { clientWidth: m, scrollLeft: R } = f();
      C = m, E = R;
    }
    const y = [], v = [], I = l().length;
    for (let m = 0; m < I; m++) {
      const R = l()[m];
      let D = R.length;
      for (; D > 0 && R[D - 1].fixed === "right"; )
        D--;
      let A = 0;
      for (let O = 0, S = R.length; O < S; O++) {
        const w = R[O], H = L(w), se = w.fixed === "left", W = w.fixed === "right";
        if (se && H + E > A && (p.push(w), y[m] = w), A += lt(w), W) {
          const ce = E + C - A < H;
          (O >= D || ce) && p.push(w), ce && !v[m] && (v[m] = w);
        }
      }
    }
    t.fixedColShadow && T(y.concat(v).filter(Boolean)), s(v.filter(Boolean)), u(p);
  }
  return [_, b, x];
}
function br(t, e, i, r, l, f, c) {
  function T(_, u, g = 0) {
    const { fixed: s } = u;
    if ((_ === et.TD || _ === et.TF) && !s) return "";
    const { headerRowHeight: b, rowHeight: x } = t, $ = s === "left", { scrollLeft: p, scrollWidth: L, offsetLeft: C, containerWidth: E } = l(), y = L - E - p;
    let v = "";
    if (_ === et.TH ? e() ? v += `top:${r().scrollTop}px;` : g && (v += `top:${g * (b ?? x)}px;`) : _ === et.TF && (v += "bottom:0;"), s)
      if (e())
        $ ? v += `left:${p - (f() ? C : 0)}px;` : v += `right:${Math.max(y - (f() ? c() : 0), 0)}px;`;
      else {
        const I = i()(u) + "px";
        $ ? v += `left:${I};` : v += `right:${I};`;
      }
    return v;
  }
  return T;
}
function Er(t, e) {
  return G(() => {
    const r = {}, l = /* @__PURE__ */ new WeakMap(), f = e();
    return t().forEach((c) => {
      let T = 0, _ = 0;
      for (let g = 0; g < c.length; g++) {
        const s = c[g];
        if (s.fixed === "left") {
          const b = f(s);
          b ? r[b] = T : l.set(s, T), T += lt(s);
        }
        !_ && s.fixed === "right" && (_ = g);
      }
      let u = 0;
      for (let g = c.length - 1; g >= _; g--) {
        const s = c[g], b = f(s);
        s.fixed === "right" && (b ? r[b] = u : l.set(s, u), u += lt(s));
      }
    }), (c) => {
      const T = f(c);
      return T ? r[T] : l.get(c) || 0;
    };
  });
}
function Tr(t, e, i) {
  const r = t.highlightConfig, l = {
    light: An.light,
    dark: An.dark
  }, f = G(() => r.duration ? r.duration * 1e3 : tr), c = G(() => r.fps && r.fps > 0 ? 1e3 / r.fps : null), T = G(() => c() ? Math.round(f() / c()) : null), _ = G(() => l[t.theme].from), u = /* @__PURE__ */ new Map();
  let g = !1;
  const s = /* @__PURE__ */ new Map(), b = /* @__PURE__ */ new Map(), x = G(() => {
    const v = { backgroundColor: [_(), ""] };
    return T() && (v.easing = `steps(${T()})`), { duration: f(), keyframe: v };
  });
  function $() {
    if (g) return;
    g = !0;
    const v = () => {
      window.requestAnimationFrame(
        () => {
          const I = performance.now(), m = [];
          u.forEach((R, D) => {
            const { ts: A, duration: O } = R, S = I - A;
            S < O ? y(D, R, S) && m.push(D) : m.push(D);
          }), m.forEach((R) => u.delete(R)), u.size ? v() : (g = !1, u.clear());
        }
      );
    };
    v();
  }
  function p(v, I, m = {}) {
    var w;
    const R = (w = i()) == null ? void 0 : w.querySelector(`[data-row-key="${v}"] [data-col-key="${I}"]`);
    if (!R) return;
    const { className: D, method: A, duration: O, keyframe: S } = {
      className: or,
      method: "animation",
      ...x(),
      ...m
    };
    A === "animation" ? R.animate(S, O) : E(R, v, I, D, O);
  }
  function L(v, I = {}) {
    if (Array.isArray(v) || (v = [v]), !v.length) return;
    const { className: m, method: R, keyframe: D, duration: A } = {
      className: nr,
      method: "animation",
      ...x(),
      ...I
    }, O = !!I.ignoreInvisible;
    if (R === "animation")
      if (t.virtual) {
        const S = performance.now();
        for (let w = 0; w < v.length; w++) {
          const H = v[w], se = { ts: S, visible: !1, keyframe: D, duration: A, ignoreInvisible: O }, W = y(H, se, 0);
          O && W ? u.delete(H) : u.set(H, se);
        }
        $();
      } else
        for (let S = 0; S < v.length; S++) {
          const w = document.getElementById(e + "-" + String(v[S]));
          w && w.animate(D, A);
        }
    else
      C(v, m, A);
  }
  function C(v, I, m) {
    var A;
    let R = !1;
    const D = [];
    for (let O = 0; O < v.length; O++) {
      const S = v[O], w = document.getElementById(e + "-" + String(S));
      w && (w.classList.contains(I) && (w.classList.remove(I), R = !0), D.push(w), window.clearTimeout(s.get(S)), s.set(
        S,
        window.setTimeout(() => {
          w.classList.remove(I), s.delete(S);
        }, m)
      ));
    }
    R && ((A = i()) == null || A.offsetWidth), D.forEach((O) => O.classList.add(I));
  }
  function E(v, I, m, R, D) {
    v.classList.contains(R) && (v.classList.remove(R), v.offsetHeight), v.classList.add(R);
    const A = `${I}-${m}`;
    window.clearTimeout(b.get(A)), D && b.set(
      A,
      window.setTimeout(() => {
        v.classList.remove(R), b.delete(A);
      }, D)
    );
  }
  function y(v, I, m) {
    const R = document.getElementById(e + "-" + String(v)), { visible: D, ignoreInvisible: A } = I;
    if (!R)
      return A ? !0 : (D && (I.visible = !1), !1);
    const { keyframe: O, duration: S } = I;
    if (!D) {
      I.visible = !0;
      const w = m / S;
      R.animate(O, {
        duration: S - m,
        /** 从什么时候开始，0-1 */
        iterationStart: w,
        /** 持续多久 0-1 */
        iterations: 1 - w
      });
    }
    return !1;
  }
  return [T, L, p];
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
}, pr = Object.values(dt);
function yr(t, e, i, r, l, f, c, T) {
  let _ = !1;
  tt(
    ht(c, (p) => {
      g(), p && u();
    })
  ), Tt(u), pt(g);
  function u() {
    var p, L, C;
    window.addEventListener("keydown", s), (p = t()) == null || p.addEventListener("mouseenter", b), (L = t()) == null || L.addEventListener("mouseleave", x), (C = t()) == null || C.addEventListener("mousedown", $);
  }
  function g() {
    var p, L, C;
    window.removeEventListener("keydown", s), (p = t()) == null || p.removeEventListener("mouseenter", b), (L = t()) == null || L.removeEventListener("mouseleave", x), (C = t()) == null || C.removeEventListener("mousedown", $);
  }
  function s(p) {
    if (!c() || T().keyboard) return;
    const L = p.code;
    if (!pr.includes(L) || !_) return;
    p.preventDefault();
    const { scrollTop: C, rowHeight: E, containerHeight: y, scrollHeight: v } = r(), { scrollLeft: I } = l(), { headless: m, headerRowHeight: R } = e, D = m ? 0 : f().length * (R || E), A = Math.floor((y - D) / E);
    L === dt.ArrowUp ? i(C - E, null) : L === dt.ArrowRight ? i(null, I + 50) : L === dt.ArrowDown ? i(C + E, null) : L === dt.ArrowLeft ? i(null, I - 50) : L === dt.PageUp ? i(C - E * A + D, null) : L === dt.PageDown ? i(C + E * A - D, null) : L === dt.Home ? i(0, null) : L === dt.End && i(v, null);
  }
  function b() {
    _ = !0;
  }
  function x() {
    _ = !1;
  }
  function $() {
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
      const b = c[s], x = i(b);
      let $ = l.get(x) || 0;
      for (let p = 0; p < g; p++) {
        const L = _[p], { rowspan: C = 1 } = L.mergeCells({ row: b, col: L, rowIndex: s, colIndex: p }) || {};
        C > 1 && C > $ && ($ = C, l.set(x, $));
      }
    }
  }
  return [l, f];
}
function Dr(t, e, i, r, l) {
  const [f, c] = Ce(/* @__PURE__ */ new Set()), [T, _] = Ce(/* @__PURE__ */ new Set()), u = G(() => {
    const p = l(), L = e(), C = r();
    let E = null;
    const y = {}, v = /* @__PURE__ */ new Map();
    for (let I = 0; I < L.length; I++) {
      const m = L[I];
      if (!m.mergeCells) continue;
      const R = C(m);
      for (let D = 0; D < p.length; D++) {
        const A = p[D];
        if (!A) continue;
        let { colspan: O, rowspan: S } = m.mergeCells({ row: A, col: m, rowIndex: D, colIndex: m.__LF_S__ ?? 0 }) || {};
        if (O = O || 1, S = S || 1, O === 1 && S === 1) continue;
        const w = Fn(i(A), R);
        v.set(w, { rowspan: S, colspan: O }), E || (E = {});
        const H = Math.min(I + O, L.length), se = Math.min(D + S, p.length);
        for (let W = D; W < se; W++) {
          const ce = p[W];
          if (!ce) continue;
          const Y = i(ce), oe = y[Y] || (y[Y] = /* @__PURE__ */ new Set()), Ee = E[Y] || (E[Y] = /* @__PURE__ */ new Set());
          for (let De = I; De < H; De++)
            oe.add(w), !(W === D && De === I) && Ee.add(C(L[De]));
        }
      }
    }
    return { hiddenCellMap: E, hoverRowMap: y, spanMap: v };
  }), g = () => u().hiddenCellMap;
  function s(p, L) {
    if (L.mergeCells)
      return u().spanMap.get(Fn(i(p), r()(L)));
  }
  const b = /* @__PURE__ */ new Set();
  function x(p) {
    c(p === void 0 ? b : u().hoverRowMap[p] || b);
  }
  function $(p, L) {
    if (t().enabled) {
      if (p) {
        _(/* @__PURE__ */ new Set());
        return;
      }
      _(L !== void 0 && u().hoverRowMap[L] || new Set(f()));
    }
  }
  return [g, s, f, x, T, $];
}
function kr(t, e, i, r, l) {
  const f = "__EXP__";
  function c(u, g) {
    return (u == null ? void 0 : u[f]) === g ? !(u != null && u[f]) : !0;
  }
  function T(u, g) {
    const s = c(u, g);
    _(u, s, { col: g });
  }
  function _(u, g, s) {
    var C;
    let b;
    typeof u == "string" || typeof u == "number" ? b = u : b = r(u);
    const x = e().slice(), $ = x.findIndex((E) => r(E) === b);
    if ($ === -1) {
      console.warn("expandRow failed.rowKey:", b);
      return;
    }
    for (let E = $ + 1; E < x.length; E++) {
      const v = x[E].__R_K__;
      if (v != null && v.startsWith(Hn))
        x.splice(E, 1), E--;
      else
        break;
    }
    const p = x[$], L = s == null ? void 0 : s.col;
    if (g == null && (g = c(p, L)), g) {
      const E = {
        __R_K__: Hn + b,
        __EXP_R__: p,
        __EXP_C__: L
      };
      x.splice($ + 1, 0, E);
    }
    p && (p[f] = g ? L : void 0), i(x), l(), s != null && s.silent || (C = t.onToggleRowExpand) == null || C.call(t, { expanded: !!g, row: p, col: L });
  }
  return [T, _];
}
function Ir() {
  return typeof window > "u" ? !1 : window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
function Lr(t, e, i, r, l, f, c) {
  const [T, _] = Ce({ x: !1, y: !1 }), [u, g] = Ce({ h: 0, w: 0, t: 0, l: 0 });
  let s = !1, b = !1, x = 0, $ = 0, p = 0, L = 0, C = null, E, y = !1;
  const v = ar(() => m(), 200), I = eo((W) => l(W));
  Tt(() => {
    y = Ir(), f().enabled && !y && (C = new ResizeObserver(v), C.observe(e())), se();
  }), pt(() => {
    w(), C == null || C.disconnect(), C = null;
  });
  function m() {
    if (!f().enabled || y) return;
    const { scrollHeight: W, scrollTop: ce, containerHeight: Y } = i(), { scrollWidth: oe, scrollLeft: Ee, containerWidth: De } = r(), he = W > Y, Xe = oe > De;
    if (_({ x: Xe, y: he }), he) {
      const it = Y / W;
      g((B) => {
        const z = Math.max(f().minHeight, it * Y), ie = Math.round(ce / (W - Y) * (Y - z));
        return { ...B, h: z, t: ie };
      });
    }
    if (Xe) {
      const it = De / oe;
      g((B) => {
        const z = Math.max(f().minWidth, it * De), ie = Math.round(Ee / (oe - De) * (De - z));
        return { ...B, w: z, l: ie };
      });
    }
  }
  function R(W) {
    W instanceof MouseEvent && W.preventDefault(), s = !0;
    const { scrollTop: ce } = i();
    p = ce, x = W instanceof MouseEvent ? W.clientY : W.touches[0].clientY, A(O);
  }
  function D(W) {
    W instanceof MouseEvent && W.preventDefault(), b = !0;
    const { scrollLeft: ce } = r();
    L = ce, $ = W instanceof MouseEvent ? W.clientX : W.touches[0].clientX, A(S);
  }
  function A(W) {
    H(), E = W, document.addEventListener("mousemove", W), document.addEventListener("mouseup", w), document.addEventListener("touchmove", W, { passive: !1 }), document.addEventListener("touchend", w);
  }
  function O(W) {
    if (!s) return;
    W.preventDefault();
    const Y = (W instanceof MouseEvent ? W.clientY : W.touches[0].clientY) - x, { scrollHeight: oe, containerHeight: Ee } = i(), De = oe - Ee, he = Ee - u().h, Xe = Y / he * De;
    if (c()) {
      const it = Ee / oe, B = Math.round((p + Xe) * it), z = Ee - u().h;
      g((ie) => ({ ...ie, t: B < 0 ? 0 : B > z ? z : B })), I(p + Xe);
    } else
      e().scrollTop = p + Xe;
  }
  function S(W) {
    if (!b) return;
    W.preventDefault();
    const Y = (W instanceof MouseEvent ? W.clientX : W.touches[0].clientX) - $, { scrollWidth: oe, containerWidth: Ee } = r(), De = oe - Ee, he = Ee - u().w, Xe = Y / he * De;
    e().scrollLeft = L + Xe;
  }
  function w() {
    s = !1, b = !1, H(), document.removeEventListener("mouseup", w), document.removeEventListener("touchend", w);
  }
  function H() {
    E && (document.removeEventListener("mousemove", E), document.removeEventListener("touchmove", E), E = void 0);
  }
  function se() {
    queueMicrotask(m);
  }
  return [u, T, R, D, m];
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
  const [r, l] = $r(!1), f = G(() => t.scrollRowByRow === "scrollbar"), c = G(() => f() ? r() : t.scrollRowByRow);
  tt(
    ht(f, (s) => {
      s ? T() : _();
    })
  ), Tt(() => {
    T();
  }), pt(() => {
    _();
  });
  function T() {
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
  const [c, T] = Ce([]), _ = G(() => t.sortConfig.multiSort ?? !1), u = G(() => t.sortConfig.multiSortLimit ?? 3), g = G(() => {
    var m;
    return (m = c()[0]) == null ? void 0 : m.dataIndex;
  });
  function s(m) {
    return c()[b(m)];
  }
  function b(m) {
    return c().findIndex((R) => R.key === m || R.dataIndex === m);
  }
  function x(m) {
    return r().find((R) => m.key && i()(R) === m.key || R.dataIndex === m.dataIndex);
  }
  function $() {
    return c().map((m) => ({ key: m.key || m.dataIndex, order: m.order }));
  }
  function p(m, R) {
    const D = c().slice(), A = D.findIndex((O) => O.key === (m.key || m.dataIndex) || O.dataIndex === (m.key || m.dataIndex));
    A >= 0 && D.splice(A, 1), R && _() ? (D.length >= u() && D.pop(), D.unshift(m), T(D)) : T([m]);
  }
  function L(m, R) {
    const D = i()(m), A = b(D);
    let O;
    const S = R.defaultSort;
    if (A >= 0) {
      const w = c()[A].order;
      if (w && S && (S.key === D || S.dataIndex === m.dataIndex)) {
        const H = Kt.filter((W) => W !== null), se = H.indexOf(w);
        O = H[(se + 1) % H.length];
      } else {
        const H = Kt.indexOf(w);
        O = Kt[(H + 1) % 3];
      }
      if (O) {
        const H = { ...c()[A], order: O };
        p(H, 1);
      } else {
        const H = c().slice();
        if (H.splice(A, 1), T(H), S != null && S.order) {
          const se = x(S), { key: W, sortField: ce, sortType: Y } = se || {};
          p({ key: W, sortField: ce, sortType: Y, ...S }, 1);
        }
      }
    } else {
      O = Kt[1];
      const w = {
        key: D,
        dataIndex: m.dataIndex,
        sortField: m.sortField,
        sortType: m.sortType,
        order: O
      };
      p(w, 1);
    }
    return O;
  }
  function C(m) {
    if (!c().length) return m;
    const R = { ...qt, ...t.sortConfig };
    let D = m.slice();
    const A = c();
    for (let O = A.length - 1; O >= 0; O--) {
      const S = A[O], w = x(S);
      if (w && S.order) {
        const H = { ...R, ...w.sortConfig };
        D = vn(w, S.order, D, H);
      }
    }
    return D;
  }
  function E(m) {
    var A;
    if (!m) {
      console.warn("onColumnSort: not found col:", m);
      return;
    }
    if (!m.sorter)
      return;
    const R = { ...qt, ...t.sortConfig, ...m.sortConfig }, D = L(m, R);
    t.sortRemote || f(), (A = e.onSortChange) == null || A.call(e, m, D, l(), R);
  }
  function y(m, R, D = {}) {
    var w, H;
    const A = { silent: !0, sortOption: null, sort: !0, append: !1, ...D }, O = i();
    let S;
    if (R) {
      if (S = A.sortOption || r().find((se) => O(se) === m), S) {
        const se = {
          key: m,
          dataIndex: S.dataIndex,
          sortField: S.sortField,
          sortType: S.sortType,
          order: R
        }, W = A.append && _() ? 1 : 0;
        p(se, W);
      }
    } else
      T([]);
    return A.sort && ((w = l()) != null && w.length) && (!t.sortRemote || A.force) && f(t.dataSource, { forceSort: A.force }), A.silent || (S || (S = A.sortOption || r().find((se) => O(se) === m)), S ? (H = e.onSortChange) == null || H.call(e, S, R, l(), t.sortConfig) : console.warn("Can not find column by key:", m)), l();
  }
  function v() {
    T([]), f();
  }
  function I() {
    if (!t.sortConfig.defaultSort) return;
    const { key: m, dataIndex: R, order: D, silent: A } = { silent: !0, ...t.sortConfig.defaultSort };
    y(m || R, D, { force: !1, silent: A });
  }
  return [c, g, E, y, v, $, I, s, C];
}
function Hr(t, e) {
  const [i, r] = Ce([]), [l, f] = Ce([]);
  function c(T) {
    const _ = [], u = [];
    let g = T;
    if (e()) {
      const $ = [], p = [], L = [];
      for (let C = 0, E = g.length; C < E; C++) {
        const y = g[C];
        y.fixed === "left" ? $.push(y) : y.fixed === "right" ? L.push(y) : p.push(y);
      }
      g = $.concat(p).concat(L);
    }
    const s = Jn(g);
    for (let $ = 0; $ <= s; $++)
      _[$] = [], u[$] = [];
    let b = 0;
    function x($, p, L = 0) {
      let C = 0, E = 0;
      for (let y = 0, v = $.length; y < v; y++) {
        const I = $[y];
        if (I.hidden) continue;
        I.__P__ = p, I.__LF_S__ = b;
        let m = 1, R = 0;
        if (I.children) {
          const [O, S] = x(I.children, I, L + 1);
          m = O, R = S, u[L].push(I);
        } else {
          R = ur(I), b++;
          for (let O = L; O <= s; O++)
            u[O].push(I);
        }
        I.__LF_E__ = b, I.__W__ = R, _[L].push(I);
        const D = I.children ? 1 : s - L + 1, A = m;
        D > 1 && (I.__R_SP__ = D), A > 1 && (I.__C_SP__ = A), C += m, E += R;
      }
      return [C, E];
    }
    x(g, null), r(_), f(u);
  }
  return [i, l, c];
}
function Fr(t, e, i) {
  const r = G(() => {
    const u = t.headerDrag;
    return {
      draggable: u !== !1,
      mode: "insert",
      disabled: () => !1,
      ...u
    };
  });
  function l(u) {
    var x;
    const g = cn(u.target);
    if (!g) return;
    const s = g.dataset.colKey || "", b = u.dataTransfer;
    b && (b.effectAllowed = "move", b.setData("text/plain", s)), (x = e.onThDragStart) == null || x.call(e, s);
  }
  function f(u) {
    const g = cn(u.target);
    if (!g || !(g.getAttribute("draggable") === "true")) return;
    const b = u.dataTransfer;
    b && (b.dropEffect = "move"), u.preventDefault();
  }
  function c(u) {
    var b, x;
    const g = cn(u.target);
    if (!g) return;
    const s = (b = u.dataTransfer) == null ? void 0 : b.getData("text");
    s !== g.dataset.colKey && T(s, g.dataset.colKey), (x = e.onThDrop) == null || x.call(e, g.dataset.colKey);
  }
  function T(u, g) {
    var s, b;
    if (!(Gt(u) || Gt(g))) {
      if (r().mode !== "none") {
        const x = t.columns.slice(), $ = x.findIndex((C) => i()(C) === u), p = x.findIndex((C) => i()(C) === g);
        if ($ === -1 || p === -1) return;
        const L = x[$];
        r().mode === "swap" ? (x[$] = x[p], x[p] = L) : (x.splice($, 1), x.splice(p, 0, L)), (s = e["onUpdate:columns"]) == null || s.call(e, x);
      }
      (b = e.onColOrderChange) == null || b.call(e, u, g);
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
  const f = G(() => ({ mode: "insert", ...t.dragRowConfig }));
  function c(b, x) {
    var L;
    const $ = bt(b.target);
    if ($) {
      const C = $.getBoundingClientRect(), E = b.clientX - (C.left ?? 0);
      (L = b.dataTransfer) == null || L.setDragImage($, E, C.height / 2), $.classList.add(Pn);
    }
    const p = b.dataTransfer;
    p && (p.effectAllowed = "move", p.setData(Wn, String(x))), l = !0;
  }
  function T(b) {
    if (!l) return;
    b.preventDefault();
    const x = b.dataTransfer;
    x && (x.dropEffect = "move");
  }
  let _ = null;
  function u(b) {
    if (!l) return;
    b.preventDefault();
    const x = bt(b.target);
    _ && _ !== x && _.classList.remove(an), x && (_ = x, x.classList.add(an));
  }
  function g(b) {
    if (!l) return;
    const x = bt(b.target);
    x && x.classList.remove(Pn), _ && (_.classList.remove(an), _ = null), l = !1;
  }
  function s(b, x) {
    var E;
    if (!l) return;
    const $ = b.dataTransfer;
    if (!$) return;
    const p = f().mode, L = Number($.getData(Wn)), C = x;
    if (L !== C) {
      if (p !== "none") {
        const y = i().slice(), v = y[L];
        p === "swap" ? (y[L] = y[C], y[C] = v) : (y.splice(L, 1), y.splice(C, 0, v)), r(y);
      }
      (E = e.onRowOrderChange) == null || E.call(e, L, C);
    }
  }
  return [c, u, T, s, g];
}
function Pr(t, e, i, r, l, f) {
  const { defaultExpandAll: c, defaultExpandKeys: T, defaultExpandLevel: _ } = t.treeConfig;
  let u = !0;
  function g(y, v) {
    const I = y ? !y.__T_EXP__ : !1;
    s(y, { expand: I, col: v, isClick: !0 });
  }
  function s(y, v) {
    var R;
    const I = Array.isArray(y) ? y : [y], m = e().slice();
    for (let D = 0; D < I.length; D++) {
      const A = I[D];
      let O;
      typeof A == "string" || typeof A == "number" ? O = A : O = r(A);
      const S = m.findIndex((ce) => r(ce) === O);
      if (S === -1) {
        console.warn("treeExpandRow failed.rowKey:", O);
        return;
      }
      const w = m[S], H = w.__T_LV__ || 0, se = !!w.__T_EXP__;
      let W = v == null ? void 0 : v.expand;
      if (W === void 0 && (W = !w.__T_EXP__), v.all || v.level !== void 0) {
        const ce = v.all ? 1 / 0 : v.level || 0;
        L(w, H + 1, ce, W);
      }
      if (W)
        if (se) {
          const ce = E(S, m, H), Y = C(w, H);
          m.splice(S + 1, ce, ...Y);
        } else {
          const ce = C(w, H);
          m.splice(S + 1, 0, ...ce);
        }
      else {
        const ce = E(S, m, H);
        m.splice(S + 1, ce);
      }
      x(w, W, H), v.isClick && ((R = l.onToggleTreeExpand) == null || R.call(l, { expanded: !!W, row: w, col: v.col }));
    }
    i(m), f();
  }
  function b(y, v) {
    s(y, { ...v, isClick: !1 });
  }
  function x(y, v, I, m) {
    y.__T_EXP__ = v, I !== void 0 && (y.__T_LV__ = I);
  }
  function $(y, v, I) {
    if (!y) return [];
    let m = [];
    for (let R = 0; R < y.length; R++) {
      const D = y[R];
      m.push(D);
      const A = !!D.__T_EXP__;
      if (x(D, A, v), u && !A && (c ? x(D, !0) : (_ && v < _ && x(D, !0), T != null && T.includes(r(D)) && x(D, !0))), D.__T_EXP__) {
        const O = $(D.children, v + 1);
        m = m.concat(O);
      }
    }
    return m;
  }
  function p(y) {
    const v = $(y, 0);
    return u = !1, v;
  }
  function L(y, v, I, m) {
    if (!(!y.children || v > I))
      for (const R of y.children)
        x(R, m, v), L(R, v + 1, I, m);
  }
  function C(y, v) {
    let I = [];
    return y.children && y.children.forEach((m) => {
      I.push(m);
      const R = v + 1;
      if (m.__T_EXP__ && m.children) {
        const D = C(m, R);
        I = I.concat(D);
      } else
        x(m, !1, R);
    }), I;
  }
  function E(y, v, I) {
    let m = 0;
    for (let R = y + 1; R < v.length; R++) {
      const D = v[R];
      if (D.__T_LV__ && D.__T_LV__ > I)
        m++;
      else
        break;
    }
    return m;
  }
  return [g, b, p];
}
function Wr(t) {
  let e = { cols: null, nonFixedCols: [], leftFixedCols: [] };
  function i(f) {
    const c = [], T = [];
    let _ = 0;
    for (let u = 0; u < f.length; u++) {
      const g = f[u], s = t(g);
      if (g.fixed === "left") {
        T.push({ index: u, width: s });
        continue;
      }
      _ += s, c.push({ index: u, cumWidth: _ });
    }
    return e = { cols: f, nonFixedCols: c, leftFixedCols: T }, e;
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
function Xr(t, e, i, r, l, f, c, T, _, u) {
  const g = G(() => t.headerRowHeight * f().length), [s, b] = Ce({
    containerHeight: 0,
    rowHeight: t.rowHeight,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    offsetTop: 0,
    scrollTop: 0,
    scrollHeight: 0,
    translateY: 0
  }), [x, $] = Ce({
    containerWidth: 0,
    scrollWidth: 0,
    startIndex: 0,
    endIndex: 0,
    offsetLeft: 0,
    scrollLeft: 0
  }), [p, L] = Wr(lt), C = G(() => l().some((B) => B.type === "expand")), E = G(() => t.virtual && r().length > s().pageSize), y = G(() => {
    if (!E()) return r();
    const { startIndex: B, endIndex: z } = s();
    return r().slice(B, z + 1);
  }), v = G(() => {
    if (!E()) return 0;
    const { startIndex: B, endIndex: z } = s(), ie = r(), de = w()();
    if (t.autoRowHeight) {
      let ge = 0;
      for (let me = z + 1; me < ie.length; me++) {
        const $e = w()(ie[me]);
        ge += $e;
      }
      return ge;
    }
    return (ie.length - B - y().length) * de;
  }), I = G(() => t.virtualX && l().reduce((B, z) => B += lt(z), 0) > x().containerWidth + 100), m = G(() => f().length > 1), R = G(() => {
    if (!I() || !m())
      return {
        startIndex: x().startIndex,
        endIndex: x().endIndex,
        offsetLeft: x().offsetLeft
      };
    const { scrollLeft: B, containerWidth: z } = x(), ie = f()[0], de = l().length;
    let ge = 0, me = de, $e = 0, Pe = 0, Se = !1;
    for (let ye = 0, ve = ie.length; ye < ve; ye++) {
      const Ae = ie[ye];
      if (Ae.fixed === "left" || Ae.fixed === "right") continue;
      const He = Ae.__W__ || lt(Ae), Ye = Pe + He;
      if (!Se && Ye > B && (Se = !0, ge = Ae.__LF_S__ ?? 0, $e = Pe), Pe = Ye, me = Ae.__LF_E__ ?? de, Se && Ye >= B + z)
        break;
    }
    return Se || (ge = de, $e = Pe), { startIndex: ge, endIndex: me, offsetLeft: $e };
  }), D = G(() => {
    const B = l();
    if (I()) {
      const { startIndex: z, endIndex: ie } = x(), de = B.length, ge = Math.min(ie, de), me = Math.min(z, de);
      if (m()) {
        const ye = [], ve = [], Ae = [];
        for (let Fe = 0; Fe < B.length; Fe++) {
          const ke = B[Fe];
          ke.fixed === "right" ? ve.push(ke) : ke.fixed === "left" ? ye.push(ke) : Fe >= me && Fe < ge && Ae.push(ke);
        }
        const He = [];
        He.push(...ye);
        const Ye = R().startIndex, Ie = Math.max(0, z - Ye);
        Ie && He.push({ __VT_C_SP__: Ie }), He.push(...Ae);
        const xe = Math.max(0, R().endIndex - ie);
        return xe && He.push({ __VT_C_SP__: xe }), He.push(...ve), He;
      }
      const $e = [], Pe = [];
      for (let ye = 0; ye < me; ye++) {
        const ve = B[ye];
        (ve == null ? void 0 : ve.fixed) === "left" && $e.push(ve);
      }
      for (let ye = ge; ye < B.length; ye++) {
        const ve = B[ye];
        (ve == null ? void 0 : ve.fixed) === "right" && Pe.push(ve);
      }
      const Se = B.slice(me, ge);
      return $e.concat(Se).concat(Pe);
    }
    return B;
  }), A = G(() => {
    if (!I()) return f();
    if (m()) {
      const { startIndex: z, endIndex: ie } = R();
      return f().map((de) => de.filter((ge) => {
        if (ge.fixed === "left" || ge.fixed === "right") return !0;
        const me = ge.__LF_S__ ?? 0;
        return (ge.__LF_E__ ?? me + 1) > z && me < ie;
      }));
    }
    const B = f();
    return B.map((z, ie) => ie === B.length - 1 ? D() : z);
  }), O = G(() => {
    if (!I()) return l().length;
    const B = D().filter((z) => z.__VT_C_SP__);
    return 2 + D().length + B.reduce((z, ie) => z + Math.max(0, (ie.__VT_C_SP__ ?? 0) - 1), 0);
  }), S = G(() => {
    if (!I()) return 0;
    const B = m() ? R().endIndex : x().endIndex;
    let z = 0;
    const ie = l();
    for (let de = B; de < ie.length; de++) {
      const ge = ie[de];
      ge.fixed !== "right" && (z += lt(ge));
    }
    return z;
  }), w = G(() => {
    var ie;
    const B = t.rowHeight || Yt;
    let z = () => B;
    if (t.autoRowHeight) {
      const de = z;
      z = (ge) => De(ge) || de(ge);
    }
    if (C()) {
      const de = (ie = t.expandConfig) == null ? void 0 : ie.height, ge = z;
      z = (me) => me && me.__EXP_R__ && de || ge(me);
    }
    return z;
  });
  function H(B) {
    se(B), W();
  }
  function se(B) {
    var ye;
    B !== void 0 && typeof B != "number" && (console.warn("initVirtualScrollY: height must be a number"), B = 0);
    const { clientHeight: z, scrollHeight: ie } = e() || {};
    let de = u() ? s().scrollTop : ((ye = e()) == null ? void 0 : ye.scrollTop) || 0;
    const ge = w()(), me = B || z || er, { headless: $e } = t;
    let Pe = Math.ceil(me / ge);
    if (!$e) {
      const ve = Math.floor(g() / ge);
      Pe -= ve;
    }
    const Se = Math.max(0, r().length * ge + g() - me);
    de > Se && (de = Se), b((ve) => ({ ...ve, containerHeight: me, pageSize: Pe, scrollHeight: ie })), he(de);
  }
  function W() {
    const { clientWidth: B, scrollLeft: z, scrollWidth: ie } = e() || {};
    $((de) => ({
      ...de,
      containerWidth: B || Mn,
      scrollWidth: ie || Mn
    })), it(z);
  }
  let ce = null;
  const Y = /* @__PURE__ */ new Map();
  function oe(B, z) {
    const ie = String(B);
    z ? Y.set(ie, z) : Y.delete(ie);
  }
  function Ee() {
    Y.clear();
  }
  function De(B) {
    var ge;
    if (!B) return;
    const z = c(B), ie = Y.get(String(z));
    if (ie)
      return ie;
    const de = (ge = t.autoRowHeight) == null ? void 0 : ge.expectedHeight;
    if (de)
      return typeof de == "function" ? de(B) : de;
  }
  function he(B = 0) {
    const { pageSize: z, scrollTop: ie, startIndex: de, endIndex: ge, containerHeight: me } = s(), $e = r(), Pe = $e.length, Se = w()(), ye = {}, ve = Pe * Se + g(), { enabled: Ae } = _();
    if (Ae && (ye.scrollHeight = ve, u())) {
      let Le;
      B = B < 0 ? 0 : B < (Le = ve - me) ? B : Le, ye.translateY = t.scrollRowByRow ? 0 : -(B % Se);
    }
    if (ye.scrollTop = B, b((Le) => ({ ...Le, ...ye })), !E()) {
      b((Le) => ({ ...Le, startIndex: 0, endIndex: 0, offsetTop: 0 }));
      return;
    }
    const { autoRowHeight: He, stripe: Ye, optimizeVue2Scroll: Ie } = t;
    let xe = 0, Fe = Pe, ke = 0;
    if (He || C()) {
      if (He && i()) {
        const Ne = i();
        for (let pe = 0, Be = Ne.length; pe < Be; pe++) {
          const Me = Ne[pe], nt = Me.dataset.rowKey;
          !nt || Y.has(nt) || Y.set(nt, Me.offsetHeight);
        }
      }
      for (let Ne = 0; Ne < Pe; Ne++) {
        const pe = w()($e[Ne]);
        if (ke += pe, ke >= B) {
          xe = Ne, ke -= pe;
          break;
        }
      }
      let Le = 0;
      for (let Ne = xe + 1; Ne < Pe; Ne++)
        if (Le += w()($e[Ne]), Le >= me) {
          Fe = Ne;
          break;
        }
    } else if (xe = Math.floor(B / Se), Fe = xe + z, xe === de && Fe === ge)
      return;
    if (T.size) {
      let Le = xe, Ne = Fe;
      for (let pe = 0; pe < xe; pe++) {
        const Be = $e[pe];
        if (!Be) continue;
        const Me = pe + (T.get(c(Be)) || 1);
        if (Me > xe) {
          Le = pe, Me > Fe && (Ne = Me);
          break;
        }
      }
      for (let pe = Le; pe < Fe; pe++) {
        const Be = $e[pe];
        if (!Be) continue;
        const Me = pe + (T.get(c(Be)) || 1);
        Me > Ne && (Ne = Math.max(Me, Ne));
      }
      xe = Le, Fe = Ne;
    }
    if (Ye && !u() && xe > 0 && xe % 2 && (xe -= 1, He || C())) {
      const Le = w()($e[xe]);
      ke -= Le;
    }
    xe = Math.max(0, xe), Fe = Math.min(Fe, Pe), xe >= Fe && (xe = Fe - z), ce && window.clearTimeout(ce);
    let mt = 0;
    He || C() ? mt = ke : mt = xe * Se, !Ie || B <= ie || Math.abs(de - xe) >= z ? b((Le) => ({ ...Le, startIndex: xe, endIndex: Fe, offsetTop: mt })) : (b((Le) => ({ ...Le, endIndex: Fe })), ce = window.setTimeout(() => {
      b((Le) => ({ ...Le, startIndex: xe, offsetTop: mt }));
    }, Xn));
  }
  let Xe = null;
  function it(B = 0) {
    if (!t.virtualX) return;
    const z = l(), ie = z == null ? void 0 : z.length;
    if (!ie) return;
    const { scrollLeft: de, containerWidth: ge } = x();
    let me = 0, $e = 0, Pe = 0;
    const { nonFixedCols: Se, leftFixedCols: ye } = p(z);
    if (Se.length > 0 && B > 0) {
      const Ie = Zn(Se, (Fe) => Se[Fe].cumWidth <= B ? -1 : 1), xe = Math.min(Ie, Se.length - 1);
      me = Se[xe].index, $e = xe > 0 ? Se[xe - 1].cumWidth : 0, Pe = Se[xe].cumWidth - B;
    } else Se.length > 0 && (me = Se[0].index);
    let ve = 0;
    for (const Ie of ye) {
      if (Ie.index >= me) break;
      ve += Ie.width;
    }
    const Ae = ge - ve;
    let He = ie, Ye = Pe;
    for (let Ie = Pe ? me + 1 : me; Ie < ie; Ie++) {
      const xe = z[Ie];
      if (Ye += lt(xe), Ye >= Ae) {
        He = Ie + 1;
        break;
      }
    }
    He = Math.min(He, ie), Xe && window.clearTimeout(Xe), !t.optimizeVue2Scroll || B <= de ? $((Ie) => ({ ...Ie, startIndex: me, endIndex: He, offsetLeft: $e, scrollLeft: B })) : ($((Ie) => ({ ...Ie, endIndex: He, scrollLeft: B })), Xe = window.setTimeout(() => {
      $((Ie) => ({ ...Ie, startIndex: me, offsetLeft: $e }));
    }, Xn));
  }
  return [
    s,
    x,
    E,
    y,
    v,
    I,
    S,
    g,
    H,
    se,
    W,
    he,
    it,
    oe,
    Ee,
    L,
    A,
    O,
    R,
    D
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
var Vr = /* @__PURE__ */ fe("<div class=row-by-row-table-height>"), Br = /* @__PURE__ */ fe("<div class=column-resize-indicator>"), Kr = /* @__PURE__ */ fe("<colgroup>"), zr = /* @__PURE__ */ fe("<thead>"), un = /* @__PURE__ */ fe("<td class=vt-x-left>"), fn = /* @__PURE__ */ fe("<td class=vt-x-right>"), Yr = /* @__PURE__ */ fe("<tr class=padding-top-tr>"), Ot = /* @__PURE__ */ fe("<tr>"), qr = /* @__PURE__ */ fe('<div class="stk-sb-thumb vertical">'), Gr = /* @__PURE__ */ fe("<div class=stk-table-no-data>"), Ur = /* @__PURE__ */ fe('<div class="stk-sb-thumb horizontal">'), jr = /* @__PURE__ */ fe("<div><div class=stk-table-scroll-container><table class=stk-table-main><tbody class=stk-tbody-main>"), Zr = /* @__PURE__ */ fe("<col>"), Jr = /* @__PURE__ */ fe("<th class=vt-x-left>"), Qr = /* @__PURE__ */ fe("<th class=vt-x-right>"), el = /* @__PURE__ */ fe('<div class="table-header-resizer left">'), tl = /* @__PURE__ */ fe("<span class=table-header-sorter>"), nl = /* @__PURE__ */ fe('<div class="table-header-resizer right">'), ol = /* @__PURE__ */ fe("<th><div class=table-header-cell-wrapper>"), rl = /* @__PURE__ */ fe("<span class=table-header-title>"), Nn = /* @__PURE__ */ fe("<td>"), dn = /* @__PURE__ */ fe("<td class=vt-x-spacer>"), Vn = /* @__PURE__ */ fe("<span>"), Bn = /* @__PURE__ */ fe("<td><div class=table-cell-wrapper tabindex=-1>"), zt = /* @__PURE__ */ fe("<div class=table-cell-wrapper tabindex=-1>");
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
  const e = Jo(ll, t), i = fr(), [r, l] = Ce(), [f, c] = Ce(), T = () => {
    var o;
    const n = (o = r()) == null ? void 0 : o.querySelector("tbody.stk-tbody-main");
    if (n)
      return Array.from(n.querySelectorAll("tr[data-row-key]"));
  }, [_] = Ce(lr ? !0 : e.cellFixedMode === "relative"), u = G(() => {
    var n;
    return ((n = e.footerConfig) == null ? void 0 : n.position) === "top";
  }), g = G(() => u() ? "tbody" : "tfoot"), [s, b] = Ce(), [x, $] = Ce(), [p, L] = Ce();
  let C = null;
  const [E, y] = Ce(null), [v, I, m] = Hr(() => e.virtualX, _), [R, D] = Ce({}), A = G(() => I().slice(-1)[0] || []), O = G(() => e.columns.some((n) => n.type === "tree-node")), S = G(() => {
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
  }), [w, H] = Ce([]), [se, W] = Ce(0);
  function ce() {
    W((n) => n + 1);
  }
  const Y = G(() => {
    const {
      rowKey: n
    } = e;
    return typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), oe = G(() => {
    const {
      colKey: n
    } = e;
    return n === void 0 ? (o) => o.key || o.dataIndex : typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), Ee = G(() => {
    const {
      emptyCellText: n
    } = e;
    return typeof n == "string" ? () => n : (o, h) => n({
      row: h,
      col: o
    });
  }), De = /* @__PURE__ */ new WeakMap();
  function he(n) {
    if (!n) return n;
    let o = De.get(n);
    if (o !== void 0) return o;
    const h = n.__R_K__;
    return h !== void 0 ? (De.set(n, h), h) : (o = Y()(n), o === void 0 && (o = Math.random().toString(36).slice(2)), De.set(n, o), o);
  }
  function Xe(n, o) {
    return he(n) + jn + oe()(o);
  }
  const [it, B, z, ie, de, ge, me, $e, Pe] = Ar(e, e, oe, A, w, Nt), [Se] = Mr(e, r), [ye, ve, Ae, He] = Fr(e, e, oe), [Ye, Ie, xe, Fe, ke] = Or(e, e, w, H), [mt, Le] = Rr(e, A, he, w);
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
  const pe = G(Ne), Be = G(() => {
    var n, o;
    return (n = pe()) != null && n.enabled && e.scrollRowByRow ? !0 : (o = e.experimental) == null ? void 0 : o.scrollY;
  }), [Me, nt, _t, Wt, yt, Ue, Ze, At, Rt, at, Dt, ut, jt, Ht, Zt, a, M, F, X, re] = Xr(e, r, T, w, A, v, he, mt, pe, Be), te = eo(ut), [J, N, Q, U, q] = Lr(e, r, Me, nt, ut, pe, Be), [le, j, Z, ae, be, We] = Dr(S, A, he, oe, Wt), ze = Er(I, oe), Je = br(e, _, ze, Me, nt, Ue, Ze), [je, ct, Qe] = Tr(e, i, r);
  function wt(n) {
    const o = he(n);
    return w().findIndex((h) => he(h) === o);
  }
  function Re(n) {
    const o = oe()(n);
    return A().findIndex((h) => oe()(h) === o);
  }
  const {
    config: we,
    isSelecting: ot,
    onMD: Xt,
    get: Jt,
    set: Qt,
    clear: En,
    copy: lo
  } = no[bn](e, e, r, w, A, oe, Xe, ln, Me, nt, wt, Re);
  yr(r, e, ln, Me, nt, v, _t, we);
  const [io, en, kt] = Sr(e, oe, ze, v, I, r);
  e.autoResize && xr(r, () => {
    Rt(), kt();
  }, e, 200);
  const [Tn, pn, yn] = Cr(e, e, r, A, f, oe, io, a), [so, co] = kr(e, w, H, he, kn), [ao, uo, fo] = Pr(e, w, H, he, e, kn), ho = G(() => `height:${Me().offsetTop}px`), go = G(() => `height:${yt()}px`), Rn = G(() => !Se() || !e.virtual ? 0 : w().length * Me().rowHeight + At()), Dn = G(() => {
    if (!Se() || !e.virtual) return 0;
    const {
      containerHeight: n,
      rowHeight: o
    } = Me();
    return (n - At()) % o;
  }), mo = G(() => `height:${Dn()}px`);
  tt(ht(() => e.columns, () => {
    tn(), Le(), queueMicrotask(() => {
      Dt(), kt(), q();
    });
  })), tt(ht(() => e.virtual, () => {
    queueMicrotask(at);
  })), tt(ht(() => e.rowHeight, () => at())), tt(ht(() => e.virtualX, () => {
    tn(), queueMicrotask(() => {
      Dt(), kt();
    });
  })), tt(ht(() => e.dataSource, (n) => {
    wo(n);
  })), tt(ht(() => e.fixedColShadow, () => kt())), tn(), Nt(), Le(), Tt(() => {
    Rt(), kt(), me();
  });
  async function kn() {
    await Promise.resolve(), at(), q();
  }
  function Nt(n = e.dataSource, o) {
    let h = n.slice();
    (!e.sortRemote || o != null && o.forceSort) && (h = Pe(h)), O() && (h = fo(h)), h = _o(h), H(h);
  }
  function In(n, o) {
    var h;
    n = n || {}, D(n), o != null && o.remote || Nt(), o != null && o.silent || (h = e.onFilterChange) == null || h.call(e, n);
  }
  function _o(n) {
    const o = Object.keys(R());
    if (!(o != null && o.length)) return n;
    let h = n;
    for (const k of o) {
      const {
        value: d,
        filter: P
      } = R()[k];
      d != null && d.length && (h = h.filter((V) => {
        const ue = V[k];
        return P ? P({
          row: V,
          cellValue: ue,
          filterValues: d
        }) : d.some((ne) => ue == ne);
      }));
    }
    return h;
  }
  function tn() {
    m(e.columns);
  }
  function wo(n) {
    if (!Array.isArray(n)) {
      console.warn("invalid dataSource");
      return;
    }
    let o = !1;
    w().length !== n.length && (o = !0), Nt(n), Le(), n.length || En(), o && queueMicrotask(() => at()), queueMicrotask(q);
  }
  const Ft = G(() => {
    const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), {
      virtualX: k
    } = e, d = v(), P = oe();
    for (let V = 0, ue = d.length; V < ue; V++) {
      const ne = d[V];
      for (let Oe = 0, rt = ne.length; Oe < rt; Oe++) {
        const Ve = ne[Oe], st = k ? lt(Ve) + "px" : Bt(Ve.width), qe = Bt(Ve.minWidth), It = Bt(Ve.maxWidth);
        let Lt = "";
        st && (Lt += `--cw:${st}`), qe && (Lt += `;min-width:${qe}`), It && (Lt += `;max-width:${It}`);
        const sn = P(Ve);
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
    if (!(!le() || !n))
      return (h = le()[he(n)]) == null ? void 0 : h.has(oe()(o));
  }
  function Co(n) {
    const o = oe()(n);
    return e.hideHeaderTitle === !0 || Array.isArray(e.hideHeaderTitle) && e.hideHeaderTitle.includes(o) ? "" : n.title || "";
  }
  function So(n, o) {
    var d;
    const h = he(n), k = (n == null ? void 0 : n.__EXP_R__) && e.virtual && ((d = e.expandConfig) == null ? void 0 : d.height);
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
        const P = Ct(o()), V = [e.rowClassName(n, P), n != null && n.__EXP__ ? "expanded" : "", n != null && n.__EXP_R__ ? "expanded-row" : ""];
        return (x() === h || n === s()) && V.push("active"), e.showTrHoverClass && (h === E() || n === C) && V.push("hover"), V.filter(Boolean).join(" ");
      },
      get style() {
        var P;
        return k ? `--row-height: ${(P = e.expandConfig) == null ? void 0 : P.height}px` : null;
      }
    };
  }
  function bo(n) {
    const o = oe()(n);
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
    const o = oe()(n);
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
  function To(n, o, h, k) {
    const d = oe()(o);
    if (!n)
      return {
        get style() {
          return Ft()[et.TD].get(d);
        }
      };
    const P = Xe(n, o);
    return {
      "data-col-key": d,
      // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
      get style() {
        return Ft()[et.TD].get(d);
      },
      get class() {
        const V = [o.className, en().get(d)];
        return o.align === "center" ? V.push("text-c") : o.align === "right" && V.push("text-r"), o.mergeCells && (Z().has(P) && V.push("cell-hover"), be().has(P) && V.push("cell-active")), e.cellActive && p() === P && V.push("active"), o.type === "seq" ? V.push("seq-column") : o.type === "expand" && (n.__EXP__ && oe()(n.__EXP__) === d) ? V.push("expanded") : n.__T_EXP__ && o.type === "tree-node" ? V.push("tree-expanded") : o.type === "dragRow" && V.push("drag-row-cell"), V.filter(Boolean).join(" ");
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
  function po(n) {
    var d, P, V, ue;
    const o = gt(n.target), h = w()[o];
    if (!h || ((d = e.onRowClick) == null || d.call(e, n, h, {
      rowIndex: o
    }), (V = (P = S()).disabled) != null && V.call(P, h))) return;
    const k = e.rowKey ? x() === he(h) : s() === h;
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
    (ue = e.onCurrentChange) == null || ue.call(e, n, h, {
      select: !k
    });
  }
  function yo(n) {
    var k;
    const o = gt(n.target), h = w()[o];
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
    const o = gt(n.target), h = w()[o];
    h && ((k = e.onRowMenu) == null || k.call(e, n, h, {
      rowIndex: o
    }));
  }
  function ko(n, o, h) {
    h.type === "expand" ? so(o, h) : h.type === "tree-node" && ao(o, h);
  }
  function Io(n) {
    var P, V, ue;
    const o = gt(n.target), h = w()[o];
    if (!h) return;
    const k = Pt(n.target), d = A().find((ne) => oe()(ne) === k);
    if (d) {
      if ((P = n.target) != null && P.closest(".stk-fold-icon")) {
        ko(n, h, d);
        return;
      }
      if (e.cellActive) {
        const ne = Xe(h, d), Oe = {
          row: h,
          col: d,
          select: !1,
          rowIndex: o
        };
        e.selectedCellRevokable && p() === ne ? L(void 0) : (L(ne), Oe.select = !0), (V = e.onCellSelected) == null || V.call(e, n, Oe);
      }
      (ue = e.onCellClick) == null || ue.call(e, n, h, d, {
        rowIndex: o
      });
    }
  }
  function nn(n) {
    const o = gt(n.target) || 0, h = w()[o], k = Pt(n.target), d = A().find((P) => oe()(P) === k);
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
    var P, V;
    const o = Ut(n.target);
    if (!o) return;
    const {
      row: h,
      col: k
    } = nn(n);
    (P = e.onCellMouseover) == null || P.call(e, n, h, k);
    const d = n.relatedTarget;
    (!d || !o.contains(d)) && ((V = e.onCellMouseenter) == null || V.call(e, n, h, k));
  }
  function Mo(n) {
    var P;
    const o = n.target, h = n.relatedTarget, k = Ut(o);
    if (k && (!h || !k.contains(h))) {
      const {
        row: V,
        col: ue
      } = nn(n);
      (P = e.onCellMouseleave) == null || P.call(e, n, V, ue);
    }
    const d = bt(o);
    d && (!h || !d.contains(h)) && (C = null, e.showTrHoverClass && y(null), e.rowHover && ae(void 0));
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
    }), we().enabled && Xt(n);
  }
  const [Ln, $n] = Nr();
  function Fo(n) {
    if (e.smoothScroll) return;
    if (pn()) {
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
        containerHeight: P,
        scrollTop: V,
        scrollHeight: ue
      } = Me(), ne = V < ue - P - 1, Oe = V > 1;
      h > 0 && ne || h < 0 && Oe ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), Be() ? (te(V + h), q()) : o.scrollTop += h;
    }
    if (Ue()) {
      const {
        containerWidth: P,
        scrollLeft: V,
        scrollWidth: ue
      } = nt();
      let ne = k;
      d && h && (ne = h);
      const Oe = V < ue - P - 1, rt = V > 1;
      ne > 0 && Oe || ne < 0 && rt ? ($n(!0), n.preventDefault()) : Ln() && n.preventDefault(), o.scrollLeft += ne;
    }
  }
  let on = !1;
  function Oo(n) {
    !(n != null && n.target) || on || (on = !0, requestAnimationFrame(() => {
      var ue, ne;
      on = !1;
      const {
        scrollTop: o,
        scrollLeft: h
      } = n.target, {
        scrollTop: k
      } = Me(), {
        scrollLeft: d
      } = nt(), P = Be() ? !1 : o !== k, V = h !== d;
      if (P && ut(o), V && (Ue() ? jt(h) : nt().scrollLeft = h, kt(nt)), P) {
        const {
          startIndex: Oe,
          endIndex: rt
        } = Me();
        (ue = e.onScroll) == null || ue.call(e, n, {
          startIndex: Oe,
          endIndex: rt
        });
      }
      V && ((ne = e.onScrollX) == null || ne.call(e, n)), q();
    }));
  }
  function Po(n) {
    const o = bt(n.target);
    if (!o) return;
    const h = Number(o.dataset.rowI), k = w()[h];
    if (C === k) return;
    C = k;
    const d = o.dataset.rowKey;
    e.showTrHoverClass && y(d || null), e.rowHover && ae(d);
  }
  function rn(n, o = {
    silent: !1,
    deep: !1
  }) {
    var d;
    const h = n !== void 0, k = s();
    if (!h)
      b(void 0), $(void 0), We(!0);
    else if (typeof n == "string") {
      const P = (ue, ne) => {
        var Oe;
        for (let rt = 0; rt < ue.length; rt++) {
          const Ve = ue[rt];
          if (he(Ve) === ne)
            return Ve;
          if (o.deep && ((Oe = Ve.children) != null && Oe.length)) {
            const st = P(Ve.children, ne);
            if (st)
              return st;
          }
        }
        return null;
      };
      $(n), We(!1, x());
      const V = P(w() || [], n);
      if (!V) {
        console.warn("setCurrentRow failed.rowKey:", n);
        return;
      }
      b(V);
    } else
      b(n), $(he(n)), We(!1, x());
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
    if (!w().length) return;
    const k = n !== void 0 && o !== void 0;
    L(k ? Xe(n, o) : void 0), h.silent || (d = e.onCellSelected) == null || d.call(
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
    r() && (n !== null && (Be() ? (ut(n), q()) : r().scrollTop = n), o !== null && (r().scrollLeft = o));
  }
  function Xo() {
    return w();
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
    getSortColumns: ge,
    setSorter: ie,
    resetSorter: de,
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
  const Vo = G(() => {
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
      "scrollbar-on": pe().enabled,
      "area-selection": we().enabled,
      "is-area-selecting": ot(),
      "exp-scroll-y": !!Be()
    };
    typeof e.bordered == "string" && (n[`bordered-${e.bordered}`] = !0);
    const o = Object.keys(n).filter((h) => n[h]).join(" ");
    return e.class ? o + " " + e.class : o;
  }), Bo = G(() => {
    const n = {
      "--row-height": e.autoRowHeight ? void 0 : Me().rowHeight + "px",
      "--header-row-height": e.headerRowHeight + "px",
      "--footer-row-height": e.footerRowHeight + "px",
      "--highlight-duration": e.highlightConfig.duration && e.highlightConfig.duration + "s",
      "--highlight-timing-function": je() ? `steps(${je()})` : void 0,
      "--sb-width": `${pe().width}px`,
      "--sb-height": `${pe().height}px`
    };
    let o = Object.entries(n).filter(([, k]) => k != null && k !== "").map(([k, d]) => `${k}:${d}`).join(";");
    const h = e.style;
    if (h) {
      const k = typeof h == "string" ? h : Object.entries(h).filter(([, d]) => d != null && d !== "").map(([d, P]) => `${d.replace(/[A-Z]/g, (V) => "-" + V.toLowerCase())}:${P}`).join(";");
      k && (o = o ? o + ";" + k : k);
    }
    return o;
  }), Ko = {
    dataSource: w,
    rawDataSource: () => e.dataSource,
    theme: () => e.theme,
    setFilter: In,
    rowVersion: se,
    bumpRowVersion: ce
  };
  return K(oo.Provider, {
    value: Ko,
    get children() {
      var n = jr(), o = n.firstChild, h = o.firstChild, k = h.firstChild;
      return n.addEventListener("wheel", Fo), n.addEventListener("scroll", Oo), Et((d) => {
        l(d);
      }, n), ee(n, K(_e, {
        get when() {
          return Ge(() => !Be())() && Rn();
        },
        get children() {
          var d = Vr();
          return Te((P) => Ke(d, `height: ${Rn()}px`, P)), d;
        }
      }), o), ee(n, K(_e, {
        get when() {
          return e.colResizable;
        },
        get children() {
          var d = Br();
          return Et((P) => c(P), d), d;
        }
      }), o), h.$$mouseover = Po, h.$$contextmenu = Do, h.$$dblclick = yo, h.$$click = po, St(h, "dragend", ke), St(h, "dragenter", Ie), St(h, "dragover", xe), ee(h, K(_e, {
        get when() {
          return Ge(() => !!e.fixedMode)() && !Ue();
        },
        get children() {
          var d = Kr();
          return ee(d, K(vt, {
            get each() {
              return A();
            },
            children: (P) => (() => {
              var V = Zr();
              return Te((ue) => Ke(V, vo(P), ue)), V;
            })()
          })), d;
        }
      }), k), ee(h, K(_e, {
        get when() {
          return !e.headless;
        },
        get children() {
          var d = zr();
          return ee(d, K(vt, {
            get each() {
              return Ge(() => !!Ue())() ? M() : v();
            },
            children: (P, V) => (() => {
              var ue = Ot();
              return ue.$$contextmenu = (ne) => Ro(ne), ee(ue, K(_e, {
                get when() {
                  return Ue();
                },
                get children() {
                  var ne = Jr();
                  return Te((Oe) => Ke(ne, `min-width:${X().offsetLeft}px;width:${X().offsetLeft}px`, Oe)), ne;
                }
              }), null), ee(ue, K(vt, {
                each: P,
                children: (ne, Oe) => {
                  const rt = bo(ne);
                  return (() => {
                    var Ve = ol(), st = Ve.firstChild;
                    return Vt(Ve, mn(rt, {
                      onClick: (qe) => Lo(qe, ne),
                      onDragStart: ye,
                      onDrop: Ae,
                      onDragOver: ve
                    }), !1, !0), ee(Ve, K(_e, {
                      get when() {
                        return Ge(() => !!Tn()(ne))() && Oe() > 0;
                      },
                      get children() {
                        var qe = el();
                        return qe.$$mousedown = (It) => yn(It, ne, !0), qe;
                      }
                    }), st), ee(st, K(_e, {
                      get when() {
                        return ne.customHeaderCell;
                      },
                      get fallback() {
                        return Ge(() => !!e.tableHeaderSlot)() ? e.tableHeaderSlot(ne) : (() => {
                          var qe = rl();
                          return ee(qe, () => ne.title), qe;
                        })();
                      },
                      get children() {
                        return hn(ne.customHeaderCell, {
                          col: ne,
                          colIndex: Oe(),
                          rowIndex: V()
                        });
                      }
                    }), null), ee(st, K(_e, {
                      get when() {
                        return ne.sorter;
                      },
                      get children() {
                        var qe = tl();
                        return ee(qe, K(mr, {})), qe;
                      }
                    }), null), ee(Ve, K(_e, {
                      get when() {
                        return Tn()(ne);
                      },
                      get children() {
                        var qe = nl();
                        return qe.$$mousedown = (It) => yn(It, ne), qe;
                      }
                    }), null), Te((qe) => Ke(st, ne.__R_SP__ ? `--row-span:${ne.__R_SP__}` : void 0, qe)), Ve;
                  })();
                }
              }), null), ee(ue, K(_e, {
                get when() {
                  return Ue();
                },
                get children() {
                  var ne = Qr();
                  return Te((Oe) => Ke(ne, `min-width:${Ze()}px;width:${Ze()}px`, Oe)), ne;
                }
              }), null), ue;
            })()
          })), d;
        }
      }), k), ee(h, K(_e, {
        get when() {
          return Ge(() => !!e.footerData)() && e.footerData.length > 0;
        },
        get children() {
          return zo();
        }
      }), k), k.addEventListener("drop", Ao), k.$$mouseout = Mo, k.$$mouseover = $o, k.$$mousedown = Ho, k.$$click = Io, ee(k, K(_e, {
        get when() {
          return Ge(() => !!(!Be() && _t()))() && !Se();
        },
        get children() {
          var d = Yr();
          return ee(d, K(_e, {
            get when() {
              return Ge(() => !!e.fixedMode)() && e.headless;
            },
            get children() {
              return [K(_e, {
                get when() {
                  return Ue();
                },
                get children() {
                  var P = un();
                  return Te((V) => Ke(P, `min-width:${X().offsetLeft}px;width:${X().offsetLeft}px`, V)), P;
                }
              }), K(vt, {
                get each() {
                  return re();
                },
                children: (P, V) => K(_e, {
                  get when() {
                    return !P.__VT_C_SP__;
                  },
                  get fallback() {
                    return (() => {
                      var ue = dn();
                      return Te(() => ft(ue, "colspan", P.__VT_C_SP__)), ue;
                    })();
                  },
                  get children() {
                    var ue = Nn();
                    return Te((ne) => Ke(ue, Ft()[et.TD].get(oe()(P)), ne)), ue;
                  }
                })
              }), K(_e, {
                get when() {
                  return Ue();
                },
                get children() {
                  var P = fn();
                  return Te((V) => Ke(P, `min-width:${Ze()}px;width:${Ze()}px`, V)), P;
                }
              })];
            }
          })), Te((P) => Ke(d, ho(), P)), d;
        }
      }), null), ee(k, K(vt, {
        get each() {
          return Wt();
        },
        children: (d, P) => Yo(d, P)
      }), null), ee(k, K(_e, {
        get when() {
          return !Be();
        },
        get children() {
          return [K(_e, {
            get when() {
              return Ge(() => !!_t())() && !Se();
            },
            get children() {
              var d = Ot();
              return Te((P) => Ke(d, go(), P)), d;
            }
          }), K(_e, {
            get when() {
              return Dn();
            },
            get children() {
              var d = Ot();
              return Te((P) => Ke(d, mo(), P)), d;
            }
          })];
        }
      }), null), ee(o, K(_e, {
        get when() {
          return Ge(() => !!pe().enabled)() && N().y;
        },
        get children() {
          var d = qr();
          return St(d, "touchstart", Q, !0), St(d, "mousedown", Q, !0), Te((P) => Ke(d, `height:${J().h}px;transform:translateY(${J().t}px)`, P)), d;
        }
      }), null), ee(n, K(_e, {
        get when() {
          return Ge(() => !w() || !w().length)() && e.showNoData;
        },
        get children() {
          var d = Gr();
          return ee(d, () => e.emptySlot ?? "暂无数据"), Te(() => d.classList.toggle("no-data-full", !!e.noDataFull)), d;
        }
      }), null), ee(n, () => e.customBottomSlot, null), ee(n, K(_e, {
        get when() {
          return Ge(() => !!pe().enabled)() && N().x;
        },
        get children() {
          var d = Ur();
          return St(d, "touchstart", U, !0), St(d, "mousedown", U, !0), Te((P) => Ke(d, `width:${J().w}px;transform:translateX(${J().l}px)`, P)), d;
        }
      }), null), Te((d) => {
        var P = Vo(), V = we().enabled ? 0 : void 0, ue = Bo(), ne = !!e.fixedMode, Oe = e.width, rt = e.minWidth, Ve = e.maxWidth, st = Be() ? `transform:translateY(${Me().translateY}px)` : "";
        return P !== d.e && Sn(n, d.e = P), V !== d.t && ft(n, "tabindex", d.t = V), d.a = Ke(n, ue, d.a), ne !== d.o && h.classList.toggle("fixed-mode", d.o = ne), Oe !== d.i && $t(h, "width", d.i = Oe), rt !== d.n && $t(h, "min-width", d.n = rt), Ve !== d.s && $t(h, "max-width", d.s = Ve), d.h = Ke(k, st, d.h), d;
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
            return ee(h, K(_e, {
              get when() {
                return Ue();
              },
              get children() {
                var k = un();
                return Te((d) => Ke(k, `min-width:${X().offsetLeft}px;width:${X().offsetLeft}px`, d)), k;
              }
            }), null), ee(h, K(vt, {
              get each() {
                return re();
              },
              children: (k, d) => K(_e, {
                get when() {
                  return !k.__VT_C_SP__;
                },
                get fallback() {
                  return (() => {
                    var P = dn();
                    return Te(() => ft(P, "colspan", k.__VT_C_SP__)), P;
                  })();
                },
                get children() {
                  var P = Bn(), V = P.firstChild;
                  return Vt(P, mn(() => Eo(k)), !1, !0), ee(P, K(_e, {
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
                  }), V), ee(V, K(_e, {
                    get when() {
                      return n[k.dataIndex] != null;
                    },
                    get children() {
                      var ue = Vn();
                      return ee(ue, () => n[k.dataIndex]), ue;
                    }
                  })), Te(() => ft(V, "title", n[k.dataIndex] || "")), P;
                }
              })
            }), null), ee(h, K(_e, {
              get when() {
                return Ue();
              },
              get children() {
                var k = fn();
                return Te((d) => Ke(k, `min-width:${Ze()}px;width:${Ze()}px`, d)), k;
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
      return Vt(k, h, !1, !0), ee(k, K(_e, {
        get when() {
          return !(n && n.__EXP_R__);
        },
        get fallback() {
          return (() => {
            var d = Bn(), P = d.firstChild;
            return ee(P, (() => {
              var V = Ge(() => !!e.expandSlot);
              return () => V() ? e.expandSlot(n.__EXP_R__, n.__EXP_C__) : Ge(() => !!(n.__EXP_R__ && n.__EXP_C__))() && n.__EXP_R__[n.__EXP_C__.dataIndex] || "";
            })()), Te(() => ft(d, "colspan", F())), d;
          })();
        },
        get children() {
          return [K(_e, {
            get when() {
              return Ue();
            },
            get children() {
              return un();
            }
          }), K(vt, {
            get each() {
              return re();
            },
            children: (d, P) => qo(n, d, o)
          }), K(_e, {
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
        return Te(() => ft(d, "colspan", o.__VT_C_SP__)), d;
      })();
    const k = To(n, o, h(), o.__LF_S__ ?? 0);
    return K(_e, {
      get when() {
        return !xo(n, o);
      },
      get children() {
        var d = Nn();
        return Vt(d, k, !1, !0), ee(d, K(_e, {
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
                onDragStart: (P) => Ye(P, Ct(h()))
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
      return ee(k, K(_e, {
        get when() {
          return o.type === "dragRow";
        },
        get children() {
          return K(On, {
            onDragStart: (d) => Ye(d, Ct(h()))
          });
        }
      }), null), ee(k, K(_e, {
        get when() {
          return o.type === "expand";
        },
        get children() {
          return K(xn, {});
        }
      }), null), ee(k, K(_e, {
        get when() {
          return n[o.dataIndex] != null;
        },
        get children() {
          var d = Vn();
          return ee(d, () => n[o.dataIndex]), d;
        }
      }), null), Te(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })() : (() => {
      var k = zt();
      return ee(k, (() => {
        var d = Ge(() => (n && n[o.dataIndex]) != null);
        return () => d() ? n && n[o.dataIndex] : Ee()(o, n);
      })()), Te(() => ft(k, "title", n[o.dataIndex] || "")), k;
    })();
  }
}
function hn(t, e) {
  return typeof t == "string" ? t : typeof t == "function" ? t(e) : null;
}
Mt(["click", "dblclick", "contextmenu", "mouseover", "mousedown", "mouseout", "touchstart"]);
var sl = /* @__PURE__ */ fe("<input type=checkbox>"), cl = /* @__PURE__ */ fe("<div><footer><button>↺</button><button>✓");
const Kn = 300, zn = 400, xt = 6;
function al() {
  const [t, e] = Ce(!1), [i, r] = Ce("light"), [l, f] = Ce([]), [c, T] = Ce({
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
      var w = sl();
      return Te(() => w.checked = _().has(S.value)), w;
    })()
  }, {
    title: "",
    dataIndex: "label"
  }];
  let s, b = null, x = null, $ = null;
  function p() {
    if (!s)
      return [Kn, zn];
    const S = s.getBoundingClientRect();
    return [S.width || Kn, S.height || zn];
  }
  function L(S) {
    const w = window.pageYOffset || document.documentElement.scrollTop, H = window.pageXOffset || document.documentElement.scrollLeft, se = document.documentElement.clientWidth, W = document.documentElement.clientHeight, [ce, Y] = p();
    let oe = S.x, Ee = S.y;
    S.x - H + ce > se - xt && (oe = se - ce - xt + H);
    const he = S.y - w;
    if (he + Y > W - xt) {
      const Xe = S.height || 30;
      he - Xe >= Y + xt ? Ee = S.y - Xe - Y - xt : Ee = xt + w;
    }
    return oe = Math.max(xt + H, oe), Ee = Math.max(xt + w, Ee), {
      x: oe,
      y: Ee
    };
  }
  function C() {
    const S = /* @__PURE__ */ new Set();
    l().forEach((w) => {
      w.selected && S.add(w.value);
    }), u(S);
  }
  function E(S, w) {
    const H = new Set(_());
    S ? H.add(w.value) : H.delete(w.value), u(H);
  }
  function y() {
    const S = _();
    l().forEach((w) => w.selected = S.has(w.value)), x == null || x(Array.from(S)), v();
  }
  function v() {
    e(!1), f([]), u(/* @__PURE__ */ new Set()), b = null;
  }
  function I() {
    u(/* @__PURE__ */ new Set()), l().forEach((S) => S.selected = !1), x == null || x([]), v();
  }
  function m(S) {
    !t() || s != null && s.contains(S.target) || b != null && b.contains(S.target) || v();
  }
  function R(S, w) {
    const H = _().has(w.value);
    E(!H, w);
  }
  function D(S, w, H, se) {
    s && (s.style.visibility = "hidden"), f(w || []), b = se ?? null, x = H, C(), e(!0), queueMicrotask(() => {
      T(L(S)), s && (s.style.visibility = "visible");
    });
  }
  function A(S) {
    r(S);
  }
  const O = document.createElement("div");
  return O.classList.add("stk-filter-dropdown-wrapper"), document.body.appendChild(O), $ = Qo(() => (() => {
    var S = cl(), w = S.firstChild, H = w.firstChild, se = H.nextSibling;
    return S.$$click = (W) => W.stopPropagation(), Et((W) => s = W, S), ee(S, K(il, {
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
    }), w), H.$$click = I, se.$$click = y, Te((W) => {
      var ce = `stk-filter-dropdown stk-filter-dropdown--${i()}`, Y = c().y + "px", oe = c().x + "px", Ee = t() ? void 0 : "none";
      return ce !== W.e && Sn(S, W.e = ce), Y !== W.t && $t(S, "top", W.t = Y), oe !== W.a && $t(S, "left", W.a = oe), Ee !== W.o && $t(S, "display", W.o = Ee), W;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), S;
  })(), O), document.addEventListener("click", m), pt(() => {
    document.removeEventListener("click", m), $ == null || $();
  }), {
    get visible() {
      return t();
    },
    get trigger() {
      return b;
    },
    show: D,
    hide: v,
    setTheme: A
  };
}
let gn = null;
async function ul() {
  return gn || (gn = al()), gn;
}
Mt(["click"]);
var fl = /* @__PURE__ */ fe('<div class=stk-filter><svg class=stk-filter-icon xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"><path fill=currentColor d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z">'), dl = /* @__PURE__ */ fe("<span>");
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
    var T;
    (T = t.onChange) == null || T.call(t, c);
  }
  return (() => {
    var c = fl(), T = c.firstChild;
    ee(c, () => t.children ?? (() => {
      var u = dl();
      return ee(u, () => t.col.title), u;
    })(), T), T.$$click = l;
    var _ = r;
    return typeof _ == "function" ? Et(_, T) : r = T, Te((u) => {
      var g = !!i(), s = e() === "light", b = e() === "dark";
      return g !== u.e && c.classList.toggle("stk-filter--active", u.e = g), s !== u.t && c.classList.toggle("stk-filter--light", u.t = s), b !== u.a && c.classList.toggle("stk-filter--dark", u.a = b), u;
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
      const T = c.col.dataIndex, _ = Cn(), u = () => {
        var p;
        return ((p = e()[T]) == null ? void 0 : p.value.length) || 0;
      };
      let g = null, s = null;
      function b() {
        var L;
        if (!(l != null && l.autoOptions)) return [];
        const p = ((L = _ == null ? void 0 : _.rawDataSource) == null ? void 0 : L.call(_)) || (_ == null ? void 0 : _.dataSource()) || [];
        return g && s === p || (s = p, g = gl(p, T)), g;
      }
      function x() {
        return (l == null ? void 0 : l.options) ?? b();
      }
      function $(p) {
        var E, y;
        const L = {
          value: p,
          filter: (l == null ? void 0 : l.filter) ?? ((E = e()[T]) == null ? void 0 : E.filter)
        }, C = {
          ...e(),
          [T]: L
        };
        i(C), (y = t == null ? void 0 : t.onChange) == null || y.call(t, {
          colKey: T,
          status: L
        }), _ == null || _.setFilter(C, t);
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
        getOptions: x,
        onChange: $,
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
var ml = /* @__PURE__ */ fe("<input class=stk-editable-cell-input>"), _l = /* @__PURE__ */ fe("<div class=stk-editable-cell>");
function wl(t) {
  const e = () => t.trigger || "dblclick", [i, r] = Ce(t.cellValue), [l, f] = Ce(!1);
  let c, T;
  tt(ht(() => t.cellValue, (C) => {
    l() || r(C);
  }));
  function _(C) {
    C.type === e() && u();
  }
  function u() {
    r(t.cellValue), f(!0), queueMicrotask(() => {
      c == null || c.focus();
    });
  }
  function g() {
    var E;
    f(!1);
    const C = i();
    p(C), (E = t.onChange) == null || E.call(t, C), L();
  }
  function s() {
    f(!1), r(t.cellValue), L();
  }
  function b() {
    l() && g();
  }
  function x(C) {
    r(C.target.value);
  }
  function $(C) {
    C.key === "Enter" ? (C.preventDefault(), C.stopPropagation(), g()) : C.key === "Escape" || C.key === "Esc" ? (C.preventDefault(), C.stopPropagation(), s()) : C.key === "ArrowLeft" || C.key === "ArrowRight" || C.key === "ArrowUp" || C.key === "ArrowDown" ? C.stopPropagation() : C.key === "Tab" ? g() : C.stopPropagation();
  }
  function p(C) {
    const {
      row: E,
      col: y
    } = t;
    E[y.dataIndex] = C;
  }
  function L() {
    var E;
    const C = (E = T == null ? void 0 : T.closest) == null ? void 0 : E.call(T, ".stk-table");
    C == null || C.focus();
  }
  return (() => {
    var C = _l();
    return C.$$click = _, C.$$dblclick = _, Et((E) => T = E, C), ee(C, K(_e, {
      get when() {
        return l();
      },
      get fallback() {
        return Ge(() => i() ?? "");
      },
      get children() {
        var E = ml();
        return E.$$keydown = $, E.$$input = x, E.addEventListener("blur", b), Et((y) => c = y, E), Te(() => E.value = i()), E;
      }
    })), C;
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
var vl = /* @__PURE__ */ fe("<div class=stk-checkbox-cell>"), xl = /* @__PURE__ */ fe("<input type=checkbox class=stk-checkbox-native>");
function Yn(t) {
  let e, i;
  tt(() => {
    i && (i.indeterminate = !!t.indeterminate);
  });
  function r(l) {
    var c, T;
    let f;
    typeof l == "boolean" ? f = l : ((c = l == null ? void 0 : l.target) == null ? void 0 : c.checked) !== void 0 ? f = l.target.checked : f = !!l, f !== e && (e = f, (T = t.onChange) == null || T.call(t, f));
  }
  return (() => {
    var l = vl();
    return ee(l, K(_e, {
      get when() {
        return t.customComponent;
      },
      get fallback() {
        return (() => {
          var f = xl();
          f.$$click = (T) => T.stopPropagation(), f.addEventListener("change", r);
          var c = i;
          return typeof c == "function" ? Et(c, f) : i = f, Te(() => f.checked = !!t.checked), f;
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
      const c = Cn(), T = () => (c == null || c.rowVersion(), !!f.row[e]);
      function _(u) {
        var g;
        f.row[e] = u, c == null || c.bumpRowVersion(), (g = t == null ? void 0 : t.onChange) == null || g.call(t, u, f.row);
      }
      return K(Yn, {
        get checked() {
          return T();
        },
        customComponent: i,
        onChange: _
      });
    };
  }
  function l() {
    return (f) => {
      const c = Cn(), T = () => (c == null ? void 0 : c.dataSource()) || [], _ = () => {
        c == null || c.rowVersion();
        const s = T();
        return s.length > 0 && s.every((b) => !!b[e]);
      }, u = () => {
        c == null || c.rowVersion();
        const s = T(), b = s.filter((x) => !!x[e]).length;
        return b > 0 && b < s.length;
      };
      function g(s) {
        var b;
        T().forEach((x) => {
          x[e] = s;
        }), c == null || c.bumpRowVersion(), (b = t == null ? void 0 : t.onSelectAll) == null || b.call(t, s);
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
    percent: T = !1,
    abbr: _,
    abbrDecimals: u,
    placeholder: g = "--"
  } = e;
  if (t == null || t === "")
    return g;
  const s = typeof t == "number" ? t : Number(t);
  if (Number.isNaN(s))
    return g;
  const b = s < 0 ? "-" : c && s > 0 ? "+" : "";
  let x = Math.abs(s);
  T && (x = x * 100);
  let $ = "";
  if (_ && !T) {
    const E = Cl[_];
    for (let y = 0; y < E.length; y++) {
      const v = E[y][0];
      if (x >= v) {
        x = x / v, $ = E[y][1];
        break;
      }
    }
  }
  let p;
  $ ? p = u ?? i ?? 2 : p = i ?? null;
  let L = p == null ? String(x) : x.toFixed(p);
  return r && (L = Sl(L)), `${l}${b}${L}${$}${T ? "%" : ""}${f}`;
}
var bl = /* @__PURE__ */ fe("<span class=stk-number-cell>");
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
var El = /* @__PURE__ */ fe("<span>"), Tl = /* @__PURE__ */ fe("<span class=stk-change-cell__arrow>");
function pl(t) {
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
    return (T) => {
      const _ = T.cellValue, u = pl(_);
      let g = "stk-change-cell--flat";
      u === "rise" ? g = e ? "stk-change-cell--green" : "stk-change-cell--red" : u === "fall" && (g = e ? "stk-change-cell--red" : "stk-change-cell--green");
      const s = u === "rise" ? r : u === "fall" ? l : f, b = i && u !== "flat" ? u === "rise" ? "▲" : "▼" : "";
      return (() => {
        var x = El();
        return Sn(x, `stk-change-cell ${g}`), ee(x, b ? (() => {
          var $ = Tl();
          return ee($, b), $;
        })() : null, null), ee(x, () => ro(_, t), null), Te(($) => Ke(x, s ? {
          color: s
        } : void 0, $)), x;
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
