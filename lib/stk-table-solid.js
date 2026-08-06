import { createSignal as pe, createMemo as q, createEffect as et, onMount as Tt, onCleanup as yt, createContext as Uo, useContext as jo, createRoot as Zo, on as mt, mergeProps as Jo, Show as Ee, For as xt } from "solid-js";
import { template as Ce, delegateEvents as At, insert as ne, memo as Ge, createComponent as Y, effect as Me, setAttribute as ht, style as Ke, use as pt, addEventListener as Et, spread as Vt, mergeProps as mn, className as En, setStyleProperty as Lt, Dynamic as Gn, render as Qo } from "solid-js/web";
const Un = 100, er = 100, An = 200, Yt = 28, Hn = {
  light: { from: "#71a2fd", to: "#fff" },
  dark: { from: "#1e4c99", to: "#181c21" }
}, tr = 2e3, nr = "highlight-row", or = "highlight-cell", jn = Qn("chrome"), rr = Qn("firefox"), lr = jn < 56 || rr < 59, ir = jn < 85, sr = "stk", Fn = "expanded-", Zn = "--", qt = {
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
function kl(t, e, i, r = {}) {
  const { dataIndex: l, sortField: f, order: c } = t;
  let { sortType: I } = t;
  const _ = f || l;
  I || (I = typeof e[_]);
  const u = I === "number", g = i.slice();
  if (!c || !g.length)
    return g.unshift(e), g;
  const { emptyToBottom: s, customCompare: E, stringLocaleCompare: y } = { emptyToBottom: !1, ...r }, D = e[_];
  if (s && Gt(D, u))
    g.push(e);
  else {
    const R = c === "asc", L = E || ((p, O) => {
      const x = p[_], C = vn(x, D, u, y);
      return R ? C : -C;
    }), S = wn(g, (p) => L(g[p], e));
    g.splice(S, 0, e);
  }
  return g;
}
function wn(t, e) {
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
function vn(t, e, i, r = !1) {
  let l = t, f = e;
  if (i)
    l = +t, f = +e;
  else if (r)
    return String(t).localeCompare(e);
  return l > f ? 1 : l === f ? 0 : -1;
}
function cr(t, e, i) {
  const r = [], l = [], f = t.sortField || t.dataIndex;
  for (let c = 0, I = e.length; c < I; c++) {
    const _ = e[c];
    Gt(_ == null ? void 0 : _[f], i) ? r.push(_) : l.push(_);
  }
  return [l, r];
}
function xn(t, e, i, r = {}) {
  if (!(i != null && i.length) || !t) return i || [];
  r = { ...qt, ...r };
  let l = i.slice(), f = t.sortField || t.dataIndex;
  const { defaultSort: c, stringLocaleCompare: I, emptyToBottom: _, sortChildren: u } = r;
  if (!e && c && (e = c.order, f = c.dataIndex), typeof t.sorter == "function") {
    const g = t.sorter(l, { order: e, column: t });
    g && (l = g), u && l.forEach((s) => {
      var E;
      (E = s.children) != null && E.length && (s.children = xn(t, e, s.children, r));
    });
  } else if (e) {
    let { sortType: g } = t;
    g || (g = typeof i[0][f]);
    const s = g === "number", [E, y] = cr(t, l, s);
    e === "asc" ? E.sort((D, R) => vn(D[f], R[f], s, I)) : E.sort((D, R) => vn(R[f], D[f], s, I)), l = e === "desc" || _ ? E.concat(y) : y.concat(E), u && l.forEach((D) => {
      var R;
      (R = D.children) != null && R.length && (D.children = xn(t, e, D.children, r));
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
function On(t, e) {
  return t + Zn + e;
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
function _t(t) {
  const e = bt(t);
  return e ? Number(e.dataset.rowI) : -1;
}
function Xt(t) {
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
  const e = t.minWidth ?? t.width ?? Un;
  return typeof e == "number" ? Math.floor(e) : parseInt(e);
}
function it(t) {
  return (t == null ? void 0 : t.__W__) || Un;
}
function fr() {
  let t = window.__STK_TB_ID_COUNT__;
  return t || (t = 0), t += 1, window.__STK_TB_ID_COUNT__ = t, sr + t.toString(36);
}
const to = "stkName";
function dr(t, e, i, r, l, f, c, I, _, u, g, s) {
  const R = "ArrowUp", L = "ArrowDown", S = "ArrowLeft", p = "ArrowRight", x = "Escape", b = "data-cs-s", k = "data-cs-t", T = "data-cs-b", F = "data-cs-l", v = "data-cs-r", w = "data-rs-s", [$, oe] = pe([]), [N, xe] = pe(!1);
  let K = null, re = 0, Re = 0, $e = 0;
  const Se = q(() => {
    if (typeof t.areaSelection == "boolean") {
      const H = t.areaSelection;
      return { enabled: H, keyboard: H, ctrl: H, shift: H, highlight: { cell: H, row: !1 } };
    }
    const { highlight: a, ...A } = t.areaSelection || {};
    return {
      enabled: !0,
      ctrl: !0,
      shift: !0,
      highlight: {
        cell: !0,
        row: !1,
        ...a
      },
      ...A
    };
  }), Oe = q(() => Se().keyboard), at = q(() => Se().ctrl), tt = q(() => Se().shift), nt = q(() => {
    var a;
    return (a = Se().highlight) == null ? void 0 : a.cell;
  }), st = q(() => {
    var a;
    return (a = Se().highlight) == null ? void 0 : a.row;
  }), wt = q(() => {
    const a = l(), A = /* @__PURE__ */ new Map();
    for (let H = 0; H < a.length; H++)
      A.set(f()(a[H]), H);
    return A;
  }), Rt = q(() => {
    var se, ee;
    const a = l(), A = new Array(a.length + 1).fill(0), H = new Array(a.length + 1).fill(0);
    let W = 0;
    for (let V = 0; V < a.length; V++)
      A[V] = W, ((se = a[V]) == null ? void 0 : se.fixed) === "left" && (W += it(a[V]));
    A[a.length] = W;
    let ae = 0;
    for (let V = a.length - 1; V >= 0; V--)
      H[V] = ae, ((ee = a[V]) == null ? void 0 : ee.fixed) === "right" && (ae += it(a[V]));
    return (V) => [A[V] ?? 0, H[V + 1] ?? 0];
  });
  let X = /* @__PURE__ */ new Set();
  function z() {
    const a = $();
    if (!a.length) {
      X = /* @__PURE__ */ new Set();
      return;
    }
    const A = /* @__PURE__ */ new Set(), H = l(), W = r();
    for (const ae of a) {
      const {
        begin: { row: se, col: ee },
        end: { row: V, col: te }
      } = ae.index, [U, G] = se < V ? [se, V] : [V, se], [ue, j] = ee < te ? [ee, te] : [te, ee];
      for (let Z = U; Z <= G; Z++) {
        const _e = W[Z];
        if (_e)
          for (let De = ue; De <= j; De++) {
            const We = H[De];
            We && A.add(c(_e, We));
          }
      }
    }
    X = A;
  }
  function J() {
    const a = i();
    if (!a) return;
    const A = nt(), H = st(), W = a.querySelectorAll(`[${b}]`);
    for (let V = 0; V < W.length; V++) {
      const te = W[V];
      te.removeAttribute(b), te.removeAttribute(k), te.removeAttribute(T), te.removeAttribute(F), te.removeAttribute(v);
    }
    const ae = a.querySelectorAll(`[${w}]`);
    for (let V = 0; V < ae.length; V++)
      ae[V].removeAttribute(w);
    z();
    const se = $();
    if (!se.length) return;
    const ee = a.querySelector(".stk-tbody-main");
    if (ee) {
      if (H)
        for (const V of se) {
          const { minRow: te, maxRow: U } = Q(V);
          for (let G = te; G <= U; G++) {
            const ue = ee.querySelector(`tr[data-row-i="${G}"]`);
            ue && ue.setAttribute(w, "");
          }
        }
      if (A) {
        const V = se[se.length - 1], { minRow: te, maxRow: U, minCol: G, maxCol: ue } = Q(V), j = ee.querySelectorAll("tr[data-row-i]");
        for (let Z = 0; Z < j.length; Z++) {
          const _e = j[Z], De = parseInt(_e.getAttribute("data-row-i"), 10);
          let We = !1;
          for (const Ze of se) {
            const { minRow: Ue, maxRow: ut } = Q(Ze);
            if (De >= Ue && De <= ut) {
              We = !0;
              break;
            }
          }
          if (!We) continue;
          const Ye = _e.querySelectorAll("td[data-col-key]");
          for (let Ze = 0; Ze < Ye.length; Ze++) {
            const Ue = Ye[Ze], ut = Ue.getAttribute("data-col-key"), Je = wt().get(ut);
            if (Je === void 0 || Je < 0) continue;
            const Le = r()[De], be = l();
            if (!Le || !be[Je]) continue;
            const rt = c(Le, be[Je]);
            if (!X.has(rt)) continue;
            if (Ue.setAttribute(b, ""), De >= te && De <= U && Je >= G && Je <= ue) {
              const Jt = De + (parseInt(Ue.getAttribute("rowspan") || "1", 10) || 1) - 1, Qt = Je + (parseInt(Ue.getAttribute("colspan") || "1", 10) || 1) - 1;
              De === te && Ue.setAttribute(k, ""), Jt === U && Ue.setAttribute(T, ""), Je === G && Ue.setAttribute(F, ""), Qt === ue && Ue.setAttribute(v, "");
            }
          }
        }
      }
    }
  }
  et(() => {
    const a = $(), A = _(), H = u();
    a.length, a.length > 0 && JSON.stringify(a.map((W) => W.index)), H.scrollLeft, A.startIndex, A.endIndex, H.startIndex, H.endIndex, r().length, l().length, queueMicrotask(J);
  }), Tt(() => {
    le();
  }), yt(() => {
    ie();
  }), et(() => {
    const a = r().length, A = l().length;
    if (!Se().enabled || (K && (a === 0 || A === 0 ? K = null : (K.rowIndex = fe(K.rowIndex, 0, a - 1), K.colIndex = fe(K.colIndex, 0, A - 1))), !$().length)) return;
    if (a === 0 || A === 0) {
      Ft(), ze();
      return;
    }
    const H = a - 1, W = A - 1;
    let ae = !1;
    const se = [];
    for (const ee of $()) {
      const { begin: V, end: te } = ee.index, U = fe(V.row, 0, H), G = fe(V.col, 0, W), ue = fe(te.row, 0, H), j = fe(te.col, 0, W);
      U !== V.row || G !== V.col || ue !== te.row || j !== te.col ? (ae = !0, se.push(ge(U, G, ue, j))) : se.push(ee);
    }
    ae && (oe(se), ze());
  });
  function le() {
    var a;
    ie(), (a = i()) == null || a.addEventListener("keydown", kt);
  }
  function ie() {
    var a;
    (a = i()) == null || a.removeEventListener("keydown", kt), document.removeEventListener("mousemove", ye), document.removeEventListener("mouseup", Fe), ot();
  }
  function Q(a) {
    const { begin: A, end: H } = a.index;
    return {
      minRow: Math.min(A.row, H.row),
      maxRow: Math.max(A.row, H.row),
      minCol: Math.min(A.col, H.col),
      maxCol: Math.max(A.col, H.col)
    };
  }
  function ge(a, A, H, W) {
    return {
      index: {
        x: [A, W],
        y: [a, H],
        begin: { row: a, col: A },
        end: { row: H, col: W }
      }
    };
  }
  function Te(a) {
    return a ? wt().get(a) ?? -1 : -1;
  }
  function me(a, A) {
    const H = r(), W = l(), ae = H[a], se = W[A];
    if (!ae || !se || !se.mergeCells) return [1, 1];
    const { rowspan: ee = 1, colspan: V = 1 } = se.mergeCells({ row: ae, col: se, rowIndex: a, colIndex: A }) || {};
    return [ee || 1, V || 1];
  }
  function we(a) {
    var vt;
    const { minRow: A, maxRow: H, minCol: W, maxCol: ae } = Q(a), se = r(), ee = l(), V = se.length, te = ee.length, U = [];
    for (let Le = 0; Le < te; Le++)
      (vt = ee[Le]) != null && vt.mergeCells && U.push(Le);
    if (!U.length) return a;
    let [G, ue, j, Z] = [A, H, W, ae], _e = !0, De = 0;
    for (; _e && De++ < 100; ) {
      _e = !1;
      for (const Le of U) {
        if (Le < j || Le > Z) continue;
        const [be] = me(ue, Le);
        be > 1 && ue + be - 1 < V && ue + be - 1 > ue && (ue = ue + be - 1, _e = !0);
      }
      for (let Le = G; Le <= ue; Le++) {
        const [, be] = me(Le, Z);
        be > 1 && Z + be - 1 < te && Z + be - 1 > Z && (Z = Z + be - 1, _e = !0);
      }
      for (const Le of U)
        if (!(Le < j || Le > Z))
          for (let be = G - 1; be >= 0 && be > G - 500; be--) {
            const [rt] = me(be, Le);
            if (rt <= 1) continue;
            if (be + rt - 1 >= G)
              be < G && (G = be, _e = !0);
            else
              break;
          }
      for (let Le = G; Le <= ue; Le++)
        for (let be = j - 1; be >= 0 && be > j - 500; be--) {
          const [, rt] = me(Le, be);
          if (rt <= 1) continue;
          if (be + rt - 1 >= j)
            be < j && (j = be, _e = !0);
          else
            break;
        }
    }
    if (G === A && ue === H && j === W && Z === ae)
      return a;
    const { begin: We, end: Ye } = a.index, Ze = We.row < Ye.row || We.row === Ye.row ? G : ue, Ue = We.row < Ye.row || We.row === Ye.row ? ue : G, ut = We.col <= Ye.col ? j : Z, Je = We.col <= Ye.col ? Z : j;
    return ge(Ze, ut, Ue, Je);
  }
  function de(a) {
    let A = 0;
    const H = l();
    for (let W = 0; W < H.length; W++) {
      const ae = it(H[W]);
      if (W === a) return [A, ae];
      A += ae;
    }
    return [A, 0];
  }
  function Ae(a, A) {
    let H = 0, W = 0;
    switch (a) {
      case R:
        H = -1;
        break;
      case L:
        H = 1;
        break;
      case S:
        W = -1;
        break;
      case p:
        W = 1;
        break;
      case "Tab":
        W = A ? -1 : 1;
        break;
    }
    return [H, W];
  }
  function fe(a, A, H) {
    return Math.max(A, Math.min(a, H));
  }
  function je(a, A, H, W, ae) {
    return H >= ae ? [Math.min(a + 1, W - 1), 0] : H < 0 ? [Math.max(a - 1, 0), ae - 1] : [a, A];
  }
  function Ie(a, A, H) {
    const { top: W, bottom: ae, left: se, right: ee } = H;
    let V = 0, te = 0;
    if (A < W + 40) {
      const U = Math.max(0, W + 40 - A);
      te = -Math.ceil(U / 40 * 15);
    } else if (A > ae - 40) {
      const U = Math.max(0, A - (ae - 40));
      te = Math.ceil(U / 40 * 15);
    }
    if (a < se + 40) {
      const U = Math.max(0, se + 40 - a);
      V = -Math.ceil(U / 40 * 15);
    } else if (a > ee - 40) {
      const U = Math.max(0, a - (ee - 40));
      V = Math.ceil(U / 40 * 15);
    }
    return { deltaX: V, deltaY: te };
  }
  function he(a) {
    if (!Se().enabled || a.button !== 0) return;
    const A = _t(a.target), H = Xt(a.target), W = Te(H);
    if (A < 0 || W < 0) return;
    const ae = a.ctrlKey || a.metaKey, se = we(ge(A, W, A, W));
    if (a.shiftKey && K && tt()) {
      const ee = $().slice(), V = we(
        ge(K.rowIndex, K.colIndex, A, W)
      );
      ee.length ? ee[ee.length - 1] = V : ee.push(V), oe(ee);
    } else
      K = { rowIndex: A, colIndex: W }, ae && at() ? oe($().concat([se])) : oe([se]);
    xe(!0), Re = a.clientX, $e = a.clientY, document.addEventListener("mousemove", ye), document.addEventListener("mouseup", Fe);
  }
  function ye(a) {
    N() && (Re = a.clientX, $e = a.clientY, Xe(a), ke());
  }
  function Xe(a) {
    const A = a.target;
    if (!A) return;
    const H = _t(A);
    if (Number.isNaN(H) || H < 0) return;
    const W = Xt(A), ae = Te(W);
    ae < 0 || Be(H, ae);
  }
  function Be(a, A) {
    if (!K) return;
    const H = we(
      ge(K.rowIndex, K.colIndex, a, A)
    ), W = [...$()];
    W.length > 0 ? W[W.length - 1] = H : W.push(H), oe(W);
  }
  function ke() {
    const a = i();
    if (!a) return;
    const A = a.getBoundingClientRect(), { top: H, bottom: W, left: ae, right: se } = A, ee = $e < H + 40 || $e > W - 40 || Re < ae + 40 || Re > se - 40;
    ee && !re ? He() : !ee && re && ot();
  }
  function He() {
    const a = i();
    if (!a || !N()) {
      ot();
      return;
    }
    const A = a.getBoundingClientRect(), { deltaX: H, deltaY: W } = Ie(Re, $e, A);
    (H !== 0 || W !== 0) && (a.scrollTop += W, a.scrollLeft += H, Ne(a, A)), N() && (H !== 0 || W !== 0) ? re = requestAnimationFrame(He) : re = 0;
  }
  function Ne(a, A) {
    const H = a.querySelector("thead"), { top: W, bottom: ae, left: se, right: ee } = A, V = H ? W + H.offsetHeight : W, te = Math.max(se + 2, Math.min(Re, ee - 2)), U = Math.max(V + 2, Math.min($e, ae - 2)), G = document.elementFromPoint(te, U);
    if (!G) return;
    const ue = Ut(G), j = bt(G);
    if (!ue || !j) return;
    const Z = _t(j), _e = Xt(ue), De = Te(_e);
    Number.isNaN(Z) || Z < 0 || De < 0 || Be(Z, De);
  }
  function ot() {
    re && (cancelAnimationFrame(re), re = 0);
  }
  function Fe() {
    if (!N()) return;
    xe(!1), ot(), document.removeEventListener("mousemove", ye), document.removeEventListener("mouseup", Fe);
    const a = $();
    if (a.length) {
      const A = we(a[a.length - 1]);
      if (A !== a[a.length - 1]) {
        const H = [...a];
        H[H.length - 1] = A, oe(H);
      }
    }
    ze();
  }
  function ze() {
    var a;
    (a = e.onAreaSelectionChange) == null || a.call(e, $());
  }
  function Ht() {
    const a = Se();
    return typeof a.formatCellForClipboard == "function" ? a.formatCellForClipboard : null;
  }
  function It() {
    const a = $();
    if (!a.length) return "";
    const A = a[a.length - 1], { minRow: H, maxRow: W, minCol: ae, maxCol: se } = Q(A), ee = r(), V = l(), te = Ht(), U = [];
    for (let ue = H; ue <= W; ue++) {
      const j = ee[ue];
      if (!j) continue;
      const Z = [];
      for (let _e = ae; _e <= se; _e++) {
        const De = V[_e];
        if (!De) {
          Z.push("");
          continue;
        }
        const We = j[De.dataIndex];
        Z.push(te ? te(j, De, We) : We ? String(We) : "");
      }
      U.push(Z.join("	"));
    }
    const G = U.join(`
`);
    return navigator.clipboard.writeText(G).catch(() => {
      console.warn("Failed to copy to clipboard");
    }), G;
  }
  function ft() {
    const a = i(), A = document.activeElement;
    a && A && a.contains(A) && A !== a && a.focus({ preventScroll: !0 });
  }
  function kt(a) {
    if (!Se().enabled) return;
    const A = a.key;
    if (A === x || A === "Esc") {
      ft(), $().length && a.preventDefault();
      return;
    }
    if ((a.ctrlKey || a.metaKey) && A === "c" && $().length) {
      It(), a.preventDefault();
      return;
    }
    if (!Oe()) return;
    const H = [R, L, S, p].includes(A), W = A === "Tab";
    if (!(H || W)) return;
    a.preventDefault();
    const se = r().length, ee = l().length;
    if (se === 0 || ee === 0) return;
    if (!$().length) {
      K = { rowIndex: 0, colIndex: 0 }, oe([ge(0, 0, 0, 0)]), ze(), dt(0, 0);
      return;
    }
    const [V, te] = Ae(A, a.shiftKey);
    if (a.shiftKey && H && tt()) {
      ft();
      const U = [...$()], G = U.length > 0 ? U[U.length - 1] : null;
      if (!G) return;
      const { begin: ue, end: j } = G.index;
      let Z = j.row + V, _e = j.col + te;
      Z = fe(Z, 0, se - 1), _e = fe(_e, 0, ee - 1), U[U.length - 1] = ge(ue.row, ue.col, Z, _e), oe(U), dt(Z, _e);
    } else {
      ft();
      const U = $(), G = U.length > 0 ? U[U.length - 1] : null, ue = G ? Q(G).minRow : 0, j = G ? Q(G).minCol : 0;
      let Z = ue + V, _e = j + te;
      if (Z = fe(Z, 0, se - 1), _e = fe(_e, 0, ee - 1), W) {
        const De = j + te, [We, Ye] = je(ue, _e, De, se, ee);
        Z = We, _e = Ye;
      }
      K = { rowIndex: Z, colIndex: _e }, oe([ge(Z, _e, Z, _e)]), dt(Z, _e);
    }
    ze();
  }
  function dt(a, A) {
    const H = i();
    if (!H) return;
    const W = r()[a], ae = l()[A];
    if (!W || !ae) return;
    const se = H.querySelector("thead"), ee = se ? se.offsetHeight : 0, V = H.querySelector("tfoot"), te = V ? V.offsetHeight : 0, U = _(), G = u(), ue = t.scrollRowByRow, j = U.rowHeight, Z = a * j, _e = Z + j, De = ue ? U.scrollTop : H.scrollTop, We = De + U.containerHeight - ee - te;
    let Ye = null;
    Z < De ? Ye = Z : _e > We && (Ye = _e - (U.containerHeight - ee - te));
    const [Ze, Ue] = de(A), ut = Ze + Ue, Je = H.scrollLeft, vt = Je + G.containerWidth, [Le, be] = Rt()(A);
    let rt = null;
    Ze < Je + Le ? rt = Ze - Le : ut > vt - be && (rt = ut - G.containerWidth + be), (Ye !== null || rt !== null) && I(Ye, rt);
  }
  function jt() {
    const a = $();
    if (!a.length) return { rows: [], cols: [], ranges: [] };
    const A = r(), H = l(), W = /* @__PURE__ */ new Set(), ae = /* @__PURE__ */ new Set();
    for (const V of a) {
      const { minRow: te, maxRow: U, minCol: G, maxCol: ue } = Q(V);
      for (let j = te; j <= U; j++) W.add(j);
      for (let j = G; j <= ue; j++) ae.add(j);
    }
    const se = [...W].sort((V, te) => V - te), ee = [...ae].sort((V, te) => V - te);
    return {
      rows: se.map((V) => A[V]).filter(Boolean),
      cols: ee.map((V) => H[V]).filter(Boolean),
      ranges: a.map((V) => ({ ...V }))
    };
  }
  function Ft() {
    oe([]), xe(!1);
  }
  function Zt(a, A = {}) {
    if (!Se().enabled) return $();
    const { silent: H = !1, scrollToView: W = !1 } = A, ae = r().length, se = l().length;
    if (ae <= 0 || se <= 0)
      return Ft(), H || ze(), $();
    const ee = ae - 1, V = se - 1;
    let te = 0, U = ee, G = 0, ue = V;
    if (a) {
      const j = a.begin, Z = a.end ?? j;
      te = typeof j.row == "number" ? j.row : g(j.row), U = typeof Z.row == "number" ? Z.row : g(Z.row);
      const _e = typeof j.col == "number" ? j.col : j.col ? s(j.col) : void 0, De = typeof Z.col == "number" ? Z.col : Z.col ? s(Z.col) : void 0;
      _e !== void 0 ? (G = _e, ue = De !== void 0 ? De : _e) : De !== void 0 && (G = 0, ue = De);
    }
    return te = fe(te, 0, ee), U = fe(U, 0, ee), G = fe(G, 0, V), ue = fe(ue, 0, V), oe([ge(te, G, U, ue)]), K = { rowIndex: te, colIndex: G }, xe(!1), W && dt(U, ue), H || ze(), $();
  }
  return {
    config: Se,
    isSelecting: N,
    get: jt,
    set: Zt,
    clear: Ft,
    copy: It,
    onMD: he
  };
}
const bn = "useAreaSelection";
dr[to] = bn;
const no = {
  [bn]: ((t) => ("areaSelection" in t && console.warn("useAreaSelection is not registered"), {
    config: q(() => ({ enabled: !1 })),
    isSelecting: pe(!1)[0],
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
function Dl(t) {
  (Array.isArray(t) ? t : [t]).forEach((i) => {
    const r = i[to];
    if (!r) {
      console.warn("invalid feature");
      return;
    }
    no[r] = i;
  });
}
var hr = /* @__PURE__ */ Ce('<span class=drag-row-handle draggable=true><svg viewBox="0 0 1024 1024"width=20 height=20 fill=currentColor><path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z">');
function Pn(t) {
  return (() => {
    var e = hr();
    return e.addEventListener("dragstart", (i) => {
      var r;
      return (r = t.onDragStart) == null ? void 0 : r.call(t, i);
    }), e;
  })();
}
var gr = /* @__PURE__ */ Ce('<svg xmlns=http://www.w3.org/2000/svg width=16px height=16px viewBox="0 0 16 16"><polygon class=arrow-up fill=#757699 points="8 2 4.8 6 11.2 6"></polygon><polygon class=arrow-down transform="translate(8, 12) rotate(-180) translate(-8, -12) "points="8 10 4.8 14 11.2 14">');
function mr() {
  return gr();
}
var _r = /* @__PURE__ */ Ce("<div class=stk-fold-icon>");
function Cn(t) {
  return (() => {
    var e = _r();
    return e.$$click = (i) => {
      var r;
      return (r = t.onClick) == null ? void 0 : r.call(t, i);
    }, e;
  })();
}
At(["click"]);
var wr = /* @__PURE__ */ Ce("<div><span>");
function vr(t) {
  return (() => {
    var e = wr(), i = e.firstChild;
    return ne(e, (() => {
      var r = Ge(() => t.row.children !== void 0);
      return () => r() && Y(Cn, {
        onClick: (l) => {
          var f;
          return (f = t.onClick) == null ? void 0 : f.call(t, l);
        }
      });
    })(), i), ne(i, () => t.row[t.col.dataIndex] ?? ""), Me((r) => {
      var l = t.row[t.col.dataIndex] || "", f = t.row.__T_LV__ ? `padding-left:${t.row.__T_LV__ * 16}px` : "", c = t.row.children ? void 0 : "padding-left: 16px;";
      return l !== r.e && ht(e, "title", r.e = l), r.t = Ke(e, f, r.t), r.a = Ke(i, c, r.a), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), e;
  })();
}
const oo = Uo(void 0);
function Sn() {
  return jo(oo);
}
const Qe = {
  TH: 0,
  TD: 1,
  /** tfoot */
  TF: 2
};
function xr(t, e, i, r) {
  let l = null, f = !1;
  et(() => {
    i.virtual ? c() : I();
  }), et(() => {
    i.virtualX ? c() : I();
  }), Tt(() => {
    (i.virtual || i.virtualX) && c();
  }), yt(() => {
    I();
  });
  function c() {
    if (f && I(), window.ResizeObserver) {
      if (!t()) {
        Zo((g) => {
          et(() => {
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
  function I() {
    f && (l ? (l.disconnect(), l = null) : window.removeEventListener("resize", u), f = !1);
  }
  let _ = 0;
  function u() {
    _ && window.clearTimeout(_), _ = window.setTimeout(() => {
      i.autoResize && (e(), typeof i.autoResize == "function" && i.autoResize()), _ = 0;
    }, r);
  }
}
function Cr(t, e, i, r, l, f, c, I) {
  const [_, u] = pe(!1);
  let g = {
    currentCol: null,
    lastCol: null,
    startX: 0,
    startOffsetTableX: 0,
    revertMoveX: !1
  };
  const s = q(() => Object.prototype.toString.call(t.colResizable) === "[object Object]" ? (p) => !t.colResizable.disabled(p) : (p) => !!t.colResizable);
  Tt(() => {
    E();
  }), yt(() => {
    y();
  });
  function E() {
    window.addEventListener("mousemove", R), window.addEventListener("mouseup", L);
  }
  function y() {
    window.removeEventListener("mousemove", R), window.removeEventListener("mouseup", L);
  }
  function D(p, O, x = !1) {
    if (!i()) return;
    p.stopPropagation(), p.preventDefault();
    const { clientX: C } = p, { scrollLeft: m, scrollTop: b } = i(), { left: k } = i().getBoundingClientRect(), T = r();
    let F = !1;
    const v = f(), w = v(O), $ = T.findIndex((K) => v(K) === w), oe = c().indexOf(O), N = oe !== -1;
    x ? N && O.fixed === "right" ? F = !0 : $ - 1 >= 0 && (O = T[$ - 1]) : N && O.fixed === "right" && (O = c()[oe + 1] || O);
    const xe = C - k + m;
    if (u(!0), Object.assign(g, {
      currentCol: O,
      lastCol: S(O),
      startX: C,
      startOffsetTableX: xe,
      revertMoveX: F
    }), l()) {
      const K = l().style;
      K.display = "block", K.left = xe + "px", K.top = b + "px";
    }
  }
  function R(p) {
    if (!_()) return;
    p.stopPropagation(), p.preventDefault();
    const { lastCol: O, startX: x, startOffsetTableX: C } = g, { clientX: m } = p;
    let b = m - x;
    const k = it(O), T = (O == null ? void 0 : O.minWidth) ?? t.colMinWidth;
    k + b < T && (b = -k);
    const F = C + b;
    l() && (l().style.left = F + "px");
  }
  function L(p) {
    var v, w;
    if (!_()) return;
    const { startX: O, lastCol: x, revertMoveX: C } = g, { clientX: m } = p, b = C ? O - m : m - O;
    let k = it(x) + b;
    k < t.colMinWidth && (k = t.colMinWidth);
    const T = f(), F = r().find(($) => T($) === T(x));
    if (F && (F.width = k + "px", I == null || I(), (v = e["onUpdate:columns"]) == null || v.call(e, t.columns.slice()), (w = e.onColResize) == null || w.call(e, { ...F })), l()) {
      const $ = l().style;
      $.display = "none", $.left = "0", $.top = "0";
    }
    u(!1), g = {
      currentCol: null,
      lastCol: null,
      startX: 0,
      startOffsetTableX: 0,
      revertMoveX: !1
    };
  }
  function S(p) {
    var O;
    if ((O = p == null ? void 0 : p.children) != null && O.length) {
      const x = p.children.slice(-1)[0];
      return S(x);
    }
    return p;
  }
  return [s, _, D];
}
function Sr(t, e, i, r, l, f) {
  const [c, I] = pe([]), [_, u] = pe([]), [g, s] = pe([]), E = q(() => {
    const D = /* @__PURE__ */ new Map(), R = c(), L = _(), S = g(), p = e(), O = t.fixedColShadow, x = r();
    for (let C = 0, m = x.length; C < m; C++) {
      const b = x[C];
      for (let k = 0, T = b.length; k < T; k++) {
        const F = b[k], v = F.fixed, w = v && O && R.includes(F), $ = [];
        L.includes(F) && $.push("fixed-cell--active"), v && ($.push("fixed-cell"), $.push("fixed-cell--" + v)), w && $.push("fixed-cell--shadow"), v === "right" && S.includes(F) && $.push("fixed-cell--border-left"), D.set(p(F), $.join(" "));
      }
    }
    return D;
  });
  function y(D) {
    const R = [], L = i();
    let S, p;
    if (D != null && D()) {
      const { containerWidth: m, scrollLeft: b } = D();
      S = m, p = b;
    } else {
      const { clientWidth: m, scrollLeft: b } = f();
      S = m, p = b;
    }
    const O = [], x = [], C = l().length;
    for (let m = 0; m < C; m++) {
      const b = l()[m];
      let k = b.length;
      for (; k > 0 && b[k - 1].fixed === "right"; )
        k--;
      let T = 0;
      for (let F = 0, v = b.length; F < v; F++) {
        const w = b[F], $ = L(w), oe = w.fixed === "left", N = w.fixed === "right";
        if (oe && $ + p > T && (R.push(w), O[m] = w), T += it(w), N) {
          const xe = p + S - T < $;
          (F >= k || xe) && R.push(w), xe && !x[m] && (x[m] = w);
        }
      }
    }
    t.fixedColShadow && I(O.concat(x).filter(Boolean)), s(x.filter(Boolean)), u(R);
  }
  return [_, E, y];
}
function Er(t, e, i, r, l, f, c) {
  function I(_, u, g = 0) {
    const { fixed: s } = u;
    if ((_ === Qe.TD || _ === Qe.TF) && !s) return "";
    const { headerRowHeight: E, rowHeight: y } = t, D = s === "left", { scrollLeft: R, scrollWidth: L, offsetLeft: S, containerWidth: p } = l(), O = L - p - R;
    let x = "";
    if (_ === Qe.TH ? e() ? x += `top:${r().scrollTop}px;` : g && (x += `top:${g * (E ?? y)}px;`) : _ === Qe.TF && (x += "bottom:0;"), s)
      if (e())
        D ? x += `left:${R - (f() ? S : 0)}px;` : x += `right:${Math.max(O - (f() ? c() : 0), 0)}px;`;
      else {
        const C = i()(u) + "px";
        D ? x += `left:${C};` : x += `right:${C};`;
      }
    return x;
  }
  return I;
}
function br(t, e) {
  return q(() => {
    const r = {}, l = /* @__PURE__ */ new WeakMap(), f = e();
    return t().forEach((c) => {
      let I = 0, _ = 0;
      for (let g = 0; g < c.length; g++) {
        const s = c[g];
        if (s.fixed === "left") {
          const E = f(s);
          E ? r[E] = I : l.set(s, I), I += it(s);
        }
        !_ && s.fixed === "right" && (_ = g);
      }
      let u = 0;
      for (let g = c.length - 1; g >= _; g--) {
        const s = c[g], E = f(s);
        s.fixed === "right" && (E ? r[E] = u : l.set(s, u), u += it(s));
      }
    }), (c) => {
      const I = f(c);
      return I ? r[I] : l.get(c) || 0;
    };
  });
}
function pr(t, e, i) {
  const r = t.highlightConfig, l = {
    light: Hn.light,
    dark: Hn.dark
  }, f = q(() => r.duration ? r.duration * 1e3 : tr), c = q(() => r.fps && r.fps > 0 ? 1e3 / r.fps : null), I = q(() => c() ? Math.round(f() / c()) : null), _ = q(() => l[t.theme].from), u = /* @__PURE__ */ new Map();
  let g = !1;
  const s = /* @__PURE__ */ new Map(), E = /* @__PURE__ */ new Map(), y = q(() => {
    const x = { backgroundColor: [_(), ""] };
    return I() && (x.easing = `steps(${I()})`), { duration: f(), keyframe: x };
  });
  function D() {
    if (g) return;
    g = !0;
    const x = () => {
      window.requestAnimationFrame(
        () => {
          const C = performance.now(), m = [];
          u.forEach((b, k) => {
            const { ts: T, duration: F } = b, v = C - T;
            v < F ? O(k, b, v) && m.push(k) : m.push(k);
          }), m.forEach((b) => u.delete(b)), u.size ? x() : (g = !1, u.clear());
        }
      );
    };
    x();
  }
  function R(x, C, m = {}) {
    var w;
    const b = (w = i()) == null ? void 0 : w.querySelector(`[data-row-key="${x}"] [data-col-key="${C}"]`);
    if (!b) return;
    const { className: k, method: T, duration: F, keyframe: v } = {
      className: or,
      method: "animation",
      ...y(),
      ...m
    };
    T === "animation" ? b.animate(v, F) : p(b, x, C, k, F);
  }
  function L(x, C = {}) {
    if (Array.isArray(x) || (x = [x]), !x.length) return;
    const { className: m, method: b, keyframe: k, duration: T } = {
      className: nr,
      method: "animation",
      ...y(),
      ...C
    }, F = !!C.ignoreInvisible;
    if (b === "animation")
      if (t.virtual) {
        const v = performance.now();
        for (let w = 0; w < x.length; w++) {
          const $ = x[w], oe = { ts: v, visible: !1, keyframe: k, duration: T, ignoreInvisible: F }, N = O($, oe, 0);
          F && N ? u.delete($) : u.set($, oe);
        }
        D();
      } else
        for (let v = 0; v < x.length; v++) {
          const w = document.getElementById(e + "-" + String(x[v]));
          w && w.animate(k, T);
        }
    else
      S(x, m, T);
  }
  function S(x, C, m) {
    var T;
    let b = !1;
    const k = [];
    for (let F = 0; F < x.length; F++) {
      const v = x[F], w = document.getElementById(e + "-" + String(v));
      w && (w.classList.contains(C) && (w.classList.remove(C), b = !0), k.push(w), window.clearTimeout(s.get(v)), s.set(
        v,
        window.setTimeout(() => {
          w.classList.remove(C), s.delete(v);
        }, m)
      ));
    }
    b && ((T = i()) == null || T.offsetWidth), k.forEach((F) => F.classList.add(C));
  }
  function p(x, C, m, b, k) {
    x.classList.contains(b) && (x.classList.remove(b), x.offsetHeight), x.classList.add(b);
    const T = `${C}-${m}`;
    window.clearTimeout(E.get(T)), k && E.set(
      T,
      window.setTimeout(() => {
        x.classList.remove(b), E.delete(T);
      }, k)
    );
  }
  function O(x, C, m) {
    const b = document.getElementById(e + "-" + String(x)), { visible: k, ignoreInvisible: T } = C;
    if (!b)
      return T ? !0 : (k && (C.visible = !1), !1);
    const { keyframe: F, duration: v } = C;
    if (!k) {
      C.visible = !0;
      const w = m / v;
      b.animate(F, {
        duration: v - m,
        /** 从什么时候开始，0-1 */
        iterationStart: w,
        /** 持续多久 0-1 */
        iterations: 1 - w
      });
    }
    return !1;
  }
  return [I, L, R];
}
const gt = {
  ArrowUp: "ArrowUp",
  ArrowRight: "ArrowRight",
  ArrowDown: "ArrowDown",
  ArrowLeft: "ArrowLeft",
  PageUp: "PageUp",
  PageDown: "PageDown",
  Home: "Home",
  End: "End"
}, Tr = Object.values(gt);
function yr(t, e, i, r, l, f, c, I) {
  let _ = !1;
  et(
    mt(c, (R) => {
      g(), R && u();
    })
  ), Tt(u), yt(g);
  function u() {
    var R, L, S;
    window.addEventListener("keydown", s), (R = t()) == null || R.addEventListener("mouseenter", E), (L = t()) == null || L.addEventListener("mouseleave", y), (S = t()) == null || S.addEventListener("mousedown", D);
  }
  function g() {
    var R, L, S;
    window.removeEventListener("keydown", s), (R = t()) == null || R.removeEventListener("mouseenter", E), (L = t()) == null || L.removeEventListener("mouseleave", y), (S = t()) == null || S.removeEventListener("mousedown", D);
  }
  function s(R) {
    if (!c() || I().keyboard) return;
    const L = R.code;
    if (!Tr.includes(L) || !_) return;
    R.preventDefault();
    const { scrollTop: S, rowHeight: p, containerHeight: O, scrollHeight: x } = r(), { scrollLeft: C } = l(), { headless: m, headerRowHeight: b } = e, k = m ? 0 : f().length * (b || p), T = Math.floor((O - k) / p);
    L === gt.ArrowUp ? i(S - p, null) : L === gt.ArrowRight ? i(null, C + 50) : L === gt.ArrowDown ? i(S + p, null) : L === gt.ArrowLeft ? i(null, C - 50) : L === gt.PageUp ? i(S - p * T + k, null) : L === gt.PageDown ? i(S + p * T - k, null) : L === gt.Home ? i(0, null) : L === gt.End && i(x, null);
  }
  function E() {
    _ = !0;
  }
  function y() {
    _ = !1;
  }
  function D() {
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
      const E = c[s], y = i(E);
      let D = l.get(y) || 0;
      for (let R = 0; R < g; R++) {
        const L = _[R], { rowspan: S = 1 } = L.mergeCells({ row: E, col: L, rowIndex: s, colIndex: R }) || {};
        S > 1 && S > D && (D = S, l.set(y, D));
      }
    }
  }
  return [l, f];
}
function Ir(t, e, i, r, l) {
  const [f, c] = pe(/* @__PURE__ */ new Set()), [I, _] = pe(/* @__PURE__ */ new Set()), u = q(() => {
    const R = l(), L = e(), S = r();
    let p = null;
    const O = {}, x = /* @__PURE__ */ new Map();
    for (let C = 0; C < L.length; C++) {
      const m = L[C];
      if (!m.mergeCells) continue;
      const b = S(m);
      for (let k = 0; k < R.length; k++) {
        const T = R[k];
        if (!T) continue;
        let { colspan: F, rowspan: v } = m.mergeCells({ row: T, col: m, rowIndex: k, colIndex: m.__LF_S__ ?? 0 }) || {};
        if (F = F || 1, v = v || 1, F === 1 && v === 1) continue;
        const w = On(i(T), b);
        x.set(w, { rowspan: v, colspan: F }), p || (p = {});
        const $ = Math.min(C + F, L.length), oe = Math.min(k + v, R.length);
        for (let N = k; N < oe; N++) {
          const xe = R[N];
          if (!xe) continue;
          const K = i(xe), re = O[K] || (O[K] = /* @__PURE__ */ new Set()), Re = p[K] || (p[K] = /* @__PURE__ */ new Set());
          for (let $e = C; $e < $; $e++)
            re.add(w), !(N === k && $e === C) && Re.add(S(L[$e]));
        }
      }
    }
    return { hiddenCellMap: p, hoverRowMap: O, spanMap: x };
  }), g = () => u().hiddenCellMap;
  function s(R, L) {
    if (L.mergeCells)
      return u().spanMap.get(On(i(R), r()(L)));
  }
  const E = /* @__PURE__ */ new Set();
  function y(R) {
    c(R === void 0 ? E : u().hoverRowMap[R] || E);
  }
  function D(R, L) {
    if (t().enabled) {
      if (R) {
        _(/* @__PURE__ */ new Set());
        return;
      }
      _(L !== void 0 && u().hoverRowMap[L] || new Set(f()));
    }
  }
  return [g, s, f, y, I, D];
}
function kr(t, e, i, r, l) {
  const f = "__EXP__";
  function c(u, g) {
    return (u == null ? void 0 : u[f]) === g ? !(u != null && u[f]) : !0;
  }
  function I(u, g) {
    const s = c(u, g);
    _(u, s, { col: g });
  }
  function _(u, g, s) {
    var S;
    let E;
    typeof u == "string" || typeof u == "number" ? E = u : E = r(u);
    const y = e().slice(), D = y.findIndex((p) => r(p) === E);
    if (D === -1) {
      console.warn("expandRow failed.rowKey:", E);
      return;
    }
    for (let p = D + 1; p < y.length; p++) {
      const x = y[p].__R_K__;
      if (x != null && x.startsWith(Fn))
        y.splice(p, 1), p--;
      else
        break;
    }
    const R = y[D], L = s == null ? void 0 : s.col;
    if (g == null && (g = c(R, L)), g) {
      const p = {
        __R_K__: Fn + E,
        __EXP_R__: R,
        __EXP_C__: L
      };
      y.splice(D + 1, 0, p);
    }
    R && (R[f] = g ? L : void 0), i(y), l(), s != null && s.silent || (S = t.onToggleRowExpand) == null || S.call(t, { expanded: !!g, row: R, col: L });
  }
  return [I, _];
}
function Dr() {
  return typeof window > "u" ? !1 : window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
function Mr(t, e, i, r, l, f, c) {
  const [I, _] = pe({ x: !1, y: !1 }), [u, g] = pe({ h: 0, w: 0, t: 0, l: 0 });
  let s = !1, E = !1, y = 0, D = 0, R = 0, L = 0, S = null, p, O = !1;
  const x = ar(() => m(), 200), C = eo((N) => l(N));
  Tt(() => {
    O = Dr(), f().enabled && !O && (S = new ResizeObserver(x), S.observe(e())), oe();
  }), yt(() => {
    w(), S == null || S.disconnect(), S = null;
  });
  function m() {
    if (!f().enabled || O) return;
    const { scrollHeight: N, scrollTop: xe, containerHeight: K } = i(), { scrollWidth: re, scrollLeft: Re, containerWidth: $e } = r(), Se = N > K, Oe = re > $e;
    if (_({ x: Oe, y: Se }), Se) {
      const at = K / N;
      g((tt) => {
        const nt = Math.max(f().minHeight, at * K), st = Math.round(xe / (N - K) * (K - nt));
        return { ...tt, h: nt, t: st };
      });
    }
    if (Oe) {
      const at = $e / re;
      g((tt) => {
        const nt = Math.max(f().minWidth, at * $e), st = Math.round(Re / (re - $e) * ($e - nt));
        return { ...tt, w: nt, l: st };
      });
    }
  }
  function b(N) {
    N instanceof MouseEvent && N.preventDefault(), s = !0;
    const { scrollTop: xe } = i();
    R = xe, y = N instanceof MouseEvent ? N.clientY : N.touches[0].clientY, T(F);
  }
  function k(N) {
    N instanceof MouseEvent && N.preventDefault(), E = !0;
    const { scrollLeft: xe } = r();
    L = xe, D = N instanceof MouseEvent ? N.clientX : N.touches[0].clientX, T(v);
  }
  function T(N) {
    $(), p = N, document.addEventListener("mousemove", N), document.addEventListener("mouseup", w), document.addEventListener("touchmove", N, { passive: !1 }), document.addEventListener("touchend", w);
  }
  function F(N) {
    if (!s) return;
    N.preventDefault();
    const K = (N instanceof MouseEvent ? N.clientY : N.touches[0].clientY) - y, { scrollHeight: re, containerHeight: Re } = i(), $e = re - Re, Se = Re - u().h, Oe = K / Se * $e;
    if (c()) {
      const at = Re / re, tt = Math.round((R + Oe) * at), nt = Re - u().h;
      g((st) => ({ ...st, t: tt < 0 ? 0 : tt > nt ? nt : tt })), C(R + Oe);
    } else
      e().scrollTop = R + Oe;
  }
  function v(N) {
    if (!E) return;
    N.preventDefault();
    const K = (N instanceof MouseEvent ? N.clientX : N.touches[0].clientX) - D, { scrollWidth: re, containerWidth: Re } = r(), $e = re - Re, Se = Re - u().w, Oe = K / Se * $e;
    e().scrollLeft = L + Oe;
  }
  function w() {
    s = !1, E = !1, $(), document.removeEventListener("mouseup", w), document.removeEventListener("touchend", w);
  }
  function $() {
    p && (document.removeEventListener("mousemove", p), document.removeEventListener("touchmove", p), p = void 0);
  }
  function oe() {
    queueMicrotask(m);
  }
  return [u, I, b, k, m];
}
function $r(t) {
  const [e, i] = pe(t);
  let r = 0;
  function l(f) {
    e() && !f ? (r && window.clearTimeout(r), r = window.setTimeout(() => {
      i(f), r = 0;
    }, 300)) : (r && (window.clearTimeout(r), r = 0), i(f));
  }
  return [e, l];
}
function Lr(t, e) {
  let i = !1;
  const [r, l] = $r(!1), f = q(() => t.scrollRowByRow === "scrollbar"), c = q(() => f() ? r() : t.scrollRowByRow);
  et(
    mt(f, (s) => {
      s ? I() : _();
    })
  ), Tt(() => {
    I();
  }), yt(() => {
    _();
  });
  function I() {
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
  const [c, I] = pe([]), _ = q(() => t.sortConfig.multiSort ?? !1), u = q(() => t.sortConfig.multiSortLimit ?? 3), g = q(() => {
    var m;
    return (m = c()[0]) == null ? void 0 : m.dataIndex;
  });
  function s(m) {
    return c()[E(m)];
  }
  function E(m) {
    return c().findIndex((b) => b.key === m || b.dataIndex === m);
  }
  function y(m) {
    return r().find((b) => m.key && i()(b) === m.key || b.dataIndex === m.dataIndex);
  }
  function D() {
    return c().map((m) => ({ key: m.key || m.dataIndex, order: m.order }));
  }
  function R(m, b) {
    const k = c().slice(), T = k.findIndex((F) => F.key === (m.key || m.dataIndex) || F.dataIndex === (m.key || m.dataIndex));
    T >= 0 && k.splice(T, 1), b && _() ? (k.length >= u() && k.pop(), k.unshift(m), I(k)) : I([m]);
  }
  function L(m, b) {
    const k = i()(m), T = E(k);
    let F;
    const v = b.defaultSort;
    if (T >= 0) {
      const w = c()[T].order;
      if (w && v && (v.key === k || v.dataIndex === m.dataIndex)) {
        const $ = Kt.filter((N) => N !== null), oe = $.indexOf(w);
        F = $[(oe + 1) % $.length];
      } else {
        const $ = Kt.indexOf(w);
        F = Kt[($ + 1) % 3];
      }
      if (F) {
        const $ = { ...c()[T], order: F };
        R($, 1);
      } else {
        const $ = c().slice();
        if ($.splice(T, 1), I($), v != null && v.order) {
          const oe = y(v), { key: N, sortField: xe, sortType: K } = oe || {};
          R({ key: N, sortField: xe, sortType: K, ...v }, 1);
        }
      }
    } else {
      F = Kt[1];
      const w = {
        key: k,
        dataIndex: m.dataIndex,
        sortField: m.sortField,
        sortType: m.sortType,
        order: F
      };
      R(w, 1);
    }
    return F;
  }
  function S(m) {
    if (!c().length) return m;
    const b = { ...qt, ...t.sortConfig };
    let k = m.slice();
    const T = c();
    for (let F = T.length - 1; F >= 0; F--) {
      const v = T[F], w = y(v);
      if (w && v.order) {
        const $ = { ...b, ...w.sortConfig };
        k = xn(w, v.order, k, $);
      }
    }
    return k;
  }
  function p(m) {
    var T;
    if (!m) {
      console.warn("onColumnSort: not found col:", m);
      return;
    }
    if (!m.sorter)
      return;
    const b = { ...qt, ...t.sortConfig, ...m.sortConfig }, k = L(m, b);
    t.sortRemote || f(), (T = e.onSortChange) == null || T.call(e, m, k, l(), b);
  }
  function O(m, b, k = {}) {
    var w, $;
    const T = { silent: !0, sortOption: null, sort: !0, append: !1, ...k }, F = i();
    let v;
    if (b) {
      if (v = T.sortOption || r().find((oe) => F(oe) === m), v) {
        const oe = {
          key: m,
          dataIndex: v.dataIndex,
          sortField: v.sortField,
          sortType: v.sortType,
          order: b
        }, N = T.append && _() ? 1 : 0;
        R(oe, N);
      }
    } else
      I([]);
    return T.sort && ((w = l()) != null && w.length) && (!t.sortRemote || T.force) && f(t.dataSource, { forceSort: T.force }), T.silent || (v || (v = T.sortOption || r().find((oe) => F(oe) === m)), v ? ($ = e.onSortChange) == null || $.call(e, v, b, l(), t.sortConfig) : console.warn("Can not find column by key:", m)), l();
  }
  function x() {
    I([]), f();
  }
  function C() {
    if (!t.sortConfig.defaultSort) return;
    const { key: m, dataIndex: b, order: k, silent: T } = { silent: !0, ...t.sortConfig.defaultSort };
    O(m || b, k, { force: !1, silent: T });
  }
  return [c, g, p, O, x, D, C, s, S];
}
function Hr(t, e) {
  const [i, r] = pe([]), [l, f] = pe([]);
  function c(I) {
    const _ = [], u = [];
    let g = I;
    if (e()) {
      const D = [], R = [], L = [];
      for (let S = 0, p = g.length; S < p; S++) {
        const O = g[S];
        O.fixed === "left" ? D.push(O) : O.fixed === "right" ? L.push(O) : R.push(O);
      }
      g = D.concat(R).concat(L);
    }
    const s = Jn(g);
    for (let D = 0; D <= s; D++)
      _[D] = [], u[D] = [];
    let E = 0;
    function y(D, R, L = 0) {
      let S = 0, p = 0;
      for (let O = 0, x = D.length; O < x; O++) {
        const C = D[O];
        if (C.hidden) continue;
        C.__P__ = R, C.__LF_S__ = E;
        let m = 1, b = 0;
        if (C.children) {
          const [F, v] = y(C.children, C, L + 1);
          m = F, b = v, u[L].push(C);
        } else {
          b = ur(C), E++;
          for (let F = L; F <= s; F++)
            u[F].push(C);
        }
        C.__LF_E__ = E, C.__W__ = b, _[L].push(C);
        const k = C.children ? 1 : s - L + 1, T = m;
        k > 1 && (C.__R_SP__ = k), T > 1 && (C.__C_SP__ = T), S += m, p += b;
      }
      return [S, p];
    }
    y(g, null), r(_), f(u);
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
    var y;
    const g = cn(u.target);
    if (!g) return;
    const s = g.dataset.colKey || "", E = u.dataTransfer;
    E && (E.effectAllowed = "move", E.setData("text/plain", s)), (y = e.onThDragStart) == null || y.call(e, s);
  }
  function f(u) {
    const g = cn(u.target);
    if (!g || !(g.getAttribute("draggable") === "true")) return;
    const E = u.dataTransfer;
    E && (E.dropEffect = "move"), u.preventDefault();
  }
  function c(u) {
    var E, y;
    const g = cn(u.target);
    if (!g) return;
    const s = (E = u.dataTransfer) == null ? void 0 : E.getData("text");
    s !== g.dataset.colKey && I(s, g.dataset.colKey), (y = e.onThDrop) == null || y.call(e, g.dataset.colKey);
  }
  function I(u, g) {
    var s, E;
    if (!(Gt(u) || Gt(g))) {
      if (r().mode !== "none") {
        const y = t.columns.slice(), D = y.findIndex((S) => i()(S) === u), R = y.findIndex((S) => i()(S) === g);
        if (D === -1 || R === -1) return;
        const L = y[D];
        r().mode === "swap" ? (y[D] = y[R], y[R] = L) : (y.splice(D, 1), y.splice(R, 0, L)), (s = e["onUpdate:columns"]) == null || s.call(e, y);
      }
      (E = e.onColOrderChange) == null || E.call(e, u, g);
    }
  }
  function _(u) {
    return r().draggable && !r().disabled(u);
  }
  return [l, f, c, _];
}
const Xn = "tr-dragging", an = "tr-dragging-over", Wn = "text/plain";
function Or(t, e, i, r) {
  let l = !1;
  const f = q(() => ({ mode: "insert", ...t.dragRowConfig }));
  function c(E, y) {
    var L;
    const D = bt(E.target);
    if (D) {
      const S = D.getBoundingClientRect(), p = E.clientX - (S.left ?? 0);
      (L = E.dataTransfer) == null || L.setDragImage(D, p, S.height / 2), D.classList.add(Xn);
    }
    const R = E.dataTransfer;
    R && (R.effectAllowed = "move", R.setData(Wn, String(y))), l = !0;
  }
  function I(E) {
    if (!l) return;
    E.preventDefault();
    const y = E.dataTransfer;
    y && (y.dropEffect = "move");
  }
  let _ = null;
  function u(E) {
    if (!l) return;
    E.preventDefault();
    const y = bt(E.target);
    _ && _ !== y && _.classList.remove(an), y && (_ = y, y.classList.add(an));
  }
  function g(E) {
    if (!l) return;
    const y = bt(E.target);
    y && y.classList.remove(Xn), _ && (_.classList.remove(an), _ = null), l = !1;
  }
  function s(E, y) {
    var p;
    if (!l) return;
    const D = E.dataTransfer;
    if (!D) return;
    const R = f().mode, L = Number(D.getData(Wn)), S = y;
    if (L !== S) {
      if (R !== "none") {
        const O = i().slice(), x = O[L];
        R === "swap" ? (O[L] = O[S], O[S] = x) : (O.splice(L, 1), O.splice(S, 0, x)), r(O);
      }
      (p = e.onRowOrderChange) == null || p.call(e, L, S);
    }
  }
  return [c, u, I, s, g];
}
function Pr(t, e, i, r, l, f) {
  const { defaultExpandAll: c, defaultExpandKeys: I, defaultExpandLevel: _ } = t.treeConfig;
  let u = !0;
  function g(x, C) {
    const m = x ? !x.__T_EXP__ : !1;
    s(x, { expand: m, col: C, isClick: !0 });
  }
  function s(x, C) {
    var k;
    const m = Array.isArray(x) ? x : [x], b = e().slice();
    for (let T = 0; T < m.length; T++) {
      const F = m[T];
      let v;
      typeof F == "string" || typeof F == "number" ? v = F : v = r(F);
      const w = b.findIndex((K) => r(K) === v);
      if (w === -1) {
        console.warn("treeExpandRow failed.rowKey:", v);
        return;
      }
      const $ = b[w], oe = $.__T_LV__ || 0, N = !!$.__T_EXP__;
      let xe = C == null ? void 0 : C.expand;
      if (xe === void 0 && (xe = !$.__T_EXP__), C.all || C.level !== void 0) {
        const K = C.all ? 1 / 0 : C.level || 0;
        S($, oe + 1, K, xe);
      }
      if (xe)
        if (N) {
          const K = O(w, b, oe), re = p($, oe);
          b.splice(w + 1, K, ...re);
        } else {
          const K = p($, oe);
          b.splice(w + 1, 0, ...K);
        }
      else {
        const K = O(w, b, oe);
        b.splice(w + 1, K);
      }
      D($, xe, oe), C.isClick && ((k = l.onToggleTreeExpand) == null || k.call(l, { expanded: !!xe, row: $, col: C.col }));
    }
    i(b), f();
  }
  function E(x, C) {
    var m;
    if (C != null && C.parents) {
      const b = Array.isArray(x) ? x[0] : x, k = typeof b == "string" || typeof b == "number" ? b : r(b), T = y(t.dataSource || [], k);
      if (!T) {
        console.warn("treeExpandRow failed.rowKey:", k);
        return;
      }
      const F = (C == null ? void 0 : C.expand) !== !1, v = T[T.length - 1], w = T.slice(0, -1).map(($) => r($));
      if (F && ((m = v.children) != null && m.length) && w.push(r(v)), !w.length) return;
      F || w.reverse(), s(w, { expand: F, isClick: !1 });
      return;
    }
    s(x, { ...C, isClick: !1 });
  }
  function y(x, C) {
    const m = [];
    function b(k) {
      for (const T of k) {
        if (r(T) === C)
          return m.push(T), !0;
        if (T.children) {
          if (m.push(T), b(T.children)) return !0;
          m.pop();
        }
      }
      return !1;
    }
    return b(x) ? m : null;
  }
  function D(x, C, m, b) {
    x.__T_EXP__ = C, m !== void 0 && (x.__T_LV__ = m);
  }
  function R(x, C, m) {
    if (!x) return [];
    let b = [];
    for (let k = 0; k < x.length; k++) {
      const T = x[k];
      b.push(T);
      const F = !!T.__T_EXP__;
      if (D(T, F, C), u && !F && (c ? D(T, !0) : (_ && C < _ && D(T, !0), I != null && I.includes(r(T)) && D(T, !0))), T.__T_EXP__) {
        const v = R(T.children, C + 1);
        b = b.concat(v);
      }
    }
    return b;
  }
  function L(x) {
    const C = R(x, 0);
    return u = !1, C;
  }
  function S(x, C, m, b) {
    if (!(!x.children || C > m))
      for (const k of x.children)
        D(k, b, C), S(k, C + 1, m, b);
  }
  function p(x, C) {
    let m = [];
    return x.children && x.children.forEach((b) => {
      m.push(b);
      const k = C + 1;
      if (b.__T_EXP__ && b.children) {
        const T = p(b, k);
        m = m.concat(T);
      } else
        D(b, !1, k);
    }), m;
  }
  function O(x, C, m) {
    let b = 0;
    for (let k = x + 1; k < C.length; k++) {
      const T = C[k];
      if (T.__T_LV__ && T.__T_LV__ > m)
        b++;
      else
        break;
    }
    return b;
  }
  return [g, E, L];
}
function Xr(t) {
  let e = { cols: null, nonFixedCols: [], leftFixedCols: [] };
  function i(f) {
    const c = [], I = [];
    let _ = 0;
    for (let u = 0; u < f.length; u++) {
      const g = f[u], s = t(g);
      if (g.fixed === "left") {
        I.push({ index: u, width: s });
        continue;
      }
      _ += s, c.push({ index: u, cumWidth: _ });
    }
    return e = { cols: f, nonFixedCols: c, leftFixedCols: I }, e;
  }
  function r(f) {
    return e.cols === f ? e : i(f);
  }
  function l() {
    e.cols = null;
  }
  return [r, l];
}
const Nn = 200, Wr = 8;
function Nr(t, e, i, r, l, f, c, I, _, u) {
  const g = q(() => t.headerRowHeight * f().length), [s, E] = pe({
    containerHeight: 0,
    rowHeight: t.rowHeight,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    offsetTop: 0,
    scrollTop: 0,
    scrollHeight: 0,
    translateY: 0
  }), [y, D] = pe({
    containerWidth: 0,
    scrollWidth: 0,
    startIndex: 0,
    endIndex: 0,
    offsetLeft: 0,
    scrollLeft: 0
  }), [R, L] = Xr(it), S = q(() => l().some((X) => X.type === "expand")), p = q(() => t.virtual && r().length > s().pageSize), O = q(() => {
    if (!p()) return r();
    const { startIndex: X, endIndex: z } = s();
    return r().slice(X, z + 1);
  }), x = q(() => {
    if (!p()) return 0;
    const { startIndex: X, endIndex: z } = s(), J = r(), le = K()();
    if (t.autoRowHeight) {
      let ie = 0;
      for (let Q = z + 1; Q < J.length; Q++) {
        const ge = K()(J[Q]);
        ie += ge;
      }
      return ie;
    }
    return (J.length - X - O().length) * le;
  }), C = q(() => t.virtualX && l().reduce((X, z) => X += it(z), 0) > y().containerWidth + 100), m = q(() => f().length > 1), b = q(() => {
    const X = l(), z = X.length;
    let J = z;
    const le = [];
    for (let ie = 0; ie < z; ie++) {
      const Q = X[ie];
      J === z && Q.fixed === "right" && (J = ie), Q.mergeCells && !Q.fixed && le.push({ col: Q, index: ie });
    }
    return !le.length || !J ? null : { headerLength: z, maxColIndex: J, mergeCols: le };
  });
  function k(X, z) {
    const J = b();
    if (!J) return null;
    const { headerLength: le, maxColIndex: ie, mergeCols: Q } = J, ge = new Int32Array(le).fill(-1), Te = new Int32Array(le);
    for (let me = 0; me < X.length; me++) {
      const we = X[me];
      for (let de = 0; de < Q.length; de++) {
        const { col: Ae, index: fe } = Q[de];
        if (fe >= ie) break;
        const { colspan: je = 1 } = Ae.mergeCells({ row: we, col: Ae, rowIndex: z + me, colIndex: fe }) || {};
        if (je > 1) {
          const Ie = Math.min(fe + je, ie);
          for (let he = fe; he < Ie; he++)
            (ge[he] === -1 || fe < ge[he]) && (ge[he] = fe), Ie > Te[he] && (Te[he] = Ie);
        }
      }
    }
    return { leftReach: ge, rightEnd: Te };
  }
  const T = q(() => !C() || p() ? null : k(r(), 0)), F = q(() => C() ? p() ? k(O(), 0) : T() : null), v = q(() => {
    let { startIndex: X, endIndex: z } = y();
    const J = F();
    if (J) {
      const { leftReach: le, rightEnd: ie } = J, Q = le.length;
      for (let ge = 0; ge < Wr; ge++) {
        let Te = X, me = z;
        const we = Math.min(z, Q);
        for (let de = Math.max(0, X); de < we; de++) {
          const Ae = le[de];
          Ae > -1 && Ae < Te && (Te = Ae), ie[de] > me && (me = ie[de]);
        }
        if (Te === X && me === z) break;
        X = Te, z = me;
      }
    }
    return { startIndex: X, endIndex: z };
  }), w = q(() => {
    if (!C()) {
      const { startIndex: we, endIndex: de, offsetLeft: Ae } = y();
      return { startIndex: we, endIndex: de, offsetLeft: Ae };
    }
    const { startIndex: X, endIndex: z } = v();
    if (!m()) {
      const { nonFixedCols: we } = R(l()), de = wn(we, (fe) => we[fe].index < X ? -1 : 1), Ae = de > 0 ? we[de - 1].cumWidth : 0;
      return { startIndex: X, endIndex: z, offsetLeft: Ae };
    }
    const J = f()[0], le = l().length;
    let ie = le, Q = le, ge = 0, Te = 0, me = !1;
    for (let we = 0, de = J.length; we < de; we++) {
      const Ae = J[we];
      if (Ae.fixed === "left" || Ae.fixed === "right") continue;
      const fe = Ae.__LF_S__ ?? 0, je = Ae.__LF_E__ ?? fe + 1, Ie = Ae.__W__ || it(Ae);
      if (!me && je > X && (me = !0, ie = fe, ge = Te), me) {
        if (fe >= z) break;
        Q = je;
      }
      Te += Ie;
    }
    return me || (ge = Te), { startIndex: ie, endIndex: Q, offsetLeft: ge };
  }), $ = q(() => {
    const X = l();
    if (C()) {
      const { startIndex: z, endIndex: J } = v(), le = X.length, ie = Math.min(J, le), Q = Math.min(z, le);
      if (m()) {
        const we = [], de = [], Ae = [];
        for (let ye = 0; ye < X.length; ye++) {
          const Xe = X[ye];
          Xe.fixed === "right" ? de.push(Xe) : Xe.fixed === "left" ? we.push(Xe) : ye >= Q && ye < ie && Ae.push(Xe);
        }
        const fe = [];
        fe.push(...we);
        const je = w().startIndex, Ie = Math.max(0, z - je);
        Ie && fe.push({ __VT_C_SP__: Ie }), fe.push(...Ae);
        const he = Math.max(0, w().endIndex - J);
        return he && fe.push({ __VT_C_SP__: he }), fe.push(...de), fe;
      }
      const ge = [], Te = [];
      for (let we = 0; we < Q; we++) {
        const de = X[we];
        (de == null ? void 0 : de.fixed) === "left" && ge.push(de);
      }
      for (let we = ie; we < X.length; we++) {
        const de = X[we];
        (de == null ? void 0 : de.fixed) === "right" && Te.push(de);
      }
      const me = X.slice(Q, ie);
      return ge.concat(me).concat(Te);
    }
    return X;
  }), oe = q(() => {
    if (!C()) return f();
    if (m()) {
      const { startIndex: z, endIndex: J } = w();
      return f().map((le) => le.filter((ie) => {
        if (ie.fixed === "left" || ie.fixed === "right") return !0;
        const Q = ie.__LF_S__ ?? 0;
        return (ie.__LF_E__ ?? Q + 1) > z && Q < J;
      }));
    }
    const X = f();
    return X.map((z, J) => J === X.length - 1 ? $() : z);
  }), N = q(() => {
    if (!C()) return l().length;
    const X = $().filter((z) => z.__VT_C_SP__);
    return 2 + $().length + X.reduce((z, J) => z + Math.max(0, (J.__VT_C_SP__ ?? 0) - 1), 0);
  }), xe = q(() => {
    if (!C()) return 0;
    const X = m() ? w().endIndex : v().endIndex;
    let z = 0;
    const J = l();
    for (let le = X; le < J.length; le++) {
      const ie = J[le];
      ie.fixed !== "right" && (z += it(ie));
    }
    return z;
  }), K = q(() => {
    var J;
    const X = t.rowHeight || Yt;
    let z = () => X;
    if (t.autoRowHeight) {
      const le = z;
      z = (ie) => nt(ie) || le(ie);
    }
    if (S()) {
      const le = (J = t.expandConfig) == null ? void 0 : J.height, ie = z;
      z = (Q) => Q && Q.__EXP_R__ && le || ie(Q);
    }
    return z;
  });
  function re(X) {
    Re(X), $e();
  }
  function Re(X) {
    var we;
    X !== void 0 && typeof X != "number" && (console.warn("initVirtualScrollY: height must be a number"), X = 0);
    const { clientHeight: z, scrollHeight: J } = e() || {};
    let le = u() ? s().scrollTop : ((we = e()) == null ? void 0 : we.scrollTop) || 0;
    const ie = K()(), Q = X || z || er, { headless: ge } = t;
    let Te = Math.ceil(Q / ie);
    if (!ge) {
      const de = Math.floor(g() / ie);
      Te -= de;
    }
    const me = Math.max(0, r().length * ie + g() - Q);
    le > me && (le = me), E((de) => ({ ...de, containerHeight: Q, pageSize: Te, scrollHeight: J })), st(le);
  }
  function $e() {
    const { clientWidth: X, scrollLeft: z, scrollWidth: J } = e() || {};
    D((le) => ({
      ...le,
      containerWidth: X || An,
      scrollWidth: J || An
    })), Rt(z);
  }
  let Se = null;
  const Oe = /* @__PURE__ */ new Map();
  function at(X, z) {
    const J = String(X);
    z ? Oe.set(J, z) : Oe.delete(J);
  }
  function tt() {
    Oe.clear();
  }
  function nt(X) {
    var ie;
    if (!X) return;
    const z = c(X), J = Oe.get(String(z));
    if (J)
      return J;
    const le = (ie = t.autoRowHeight) == null ? void 0 : ie.expectedHeight;
    if (le)
      return typeof le == "function" ? le(X) : le;
  }
  function st(X = 0) {
    const { pageSize: z, scrollTop: J, startIndex: le, endIndex: ie, containerHeight: Q } = s(), ge = r(), Te = ge.length, me = K()(), we = {}, de = Te * me + g(), { enabled: Ae } = _();
    if (Ae && (we.scrollHeight = de, u())) {
      let ke;
      X = X < 0 ? 0 : X < (ke = de - Q) ? X : ke, we.translateY = t.scrollRowByRow ? 0 : -(X % me);
    }
    if (we.scrollTop = X, E((ke) => ({ ...ke, ...we })), !p()) {
      E((ke) => ({ ...ke, startIndex: 0, endIndex: 0, offsetTop: 0 }));
      return;
    }
    const { autoRowHeight: fe, stripe: je, optimizeVue2Scroll: Ie } = t;
    let he = 0, ye = Te, Xe = 0;
    if (fe || S()) {
      if (fe && i()) {
        const He = i();
        for (let Ne = 0, ot = He.length; Ne < ot; Ne++) {
          const Fe = He[Ne], ze = Fe.dataset.rowKey;
          !ze || Oe.has(ze) || Oe.set(ze, Fe.offsetHeight);
        }
      }
      for (let He = 0; He < Te; He++) {
        const Ne = K()(ge[He]);
        if (Xe += Ne, Xe >= X) {
          he = He, Xe -= Ne;
          break;
        }
      }
      let ke = 0;
      for (let He = he + 1; He < Te; He++)
        if (ke += K()(ge[He]), ke >= Q) {
          ye = He;
          break;
        }
    } else if (he = Math.floor(X / me), ye = he + z, he === le && ye === ie)
      return;
    if (I.size) {
      let ke = he, He = ye;
      for (let Ne = 0; Ne < he; Ne++) {
        const ot = ge[Ne];
        if (!ot) continue;
        const Fe = Ne + (I.get(c(ot)) || 1);
        if (Fe > he) {
          ke = Ne, Fe > ye && (He = Fe);
          break;
        }
      }
      for (let Ne = ke; Ne < ye; Ne++) {
        const ot = ge[Ne];
        if (!ot) continue;
        const Fe = Ne + (I.get(c(ot)) || 1);
        Fe > He && (He = Math.max(Fe, He));
      }
      he = ke, ye = He;
    }
    if (je && !u() && he > 0 && he % 2 && (he -= 1, fe || S())) {
      const ke = K()(ge[he]);
      Xe -= ke;
    }
    he = Math.max(0, he), ye = Math.min(ye, Te), he >= ye && (he = ye - z), Se && window.clearTimeout(Se);
    let Be = 0;
    fe || S() ? Be = Xe : Be = he * me, !Ie || X <= J || Math.abs(le - he) >= z ? E((ke) => ({ ...ke, startIndex: he, endIndex: ye, offsetTop: Be })) : (E((ke) => ({ ...ke, endIndex: ye })), Se = window.setTimeout(() => {
      E((ke) => ({ ...ke, startIndex: he, offsetTop: Be }));
    }, Nn));
  }
  let wt = null;
  function Rt(X = 0) {
    if (!t.virtualX) return;
    const z = l(), J = z == null ? void 0 : z.length;
    if (!J) return;
    const { scrollLeft: le, containerWidth: ie } = y();
    let Q = 0, ge = 0, Te = 0;
    const { nonFixedCols: me, leftFixedCols: we } = R(z);
    if (me.length > 0 && X > 0) {
      const Ie = wn(me, (ye) => me[ye].cumWidth <= X ? -1 : 1), he = Math.min(Ie, me.length - 1);
      Q = me[he].index, ge = he > 0 ? me[he - 1].cumWidth : 0, Te = me[he].cumWidth - X;
    } else me.length > 0 && (Q = me[0].index);
    let de = 0;
    for (const Ie of we) {
      if (Ie.index >= Q) break;
      de += Ie.width;
    }
    const Ae = ie - de;
    let fe = J, je = Te;
    for (let Ie = Te ? Q + 1 : Q; Ie < J; Ie++) {
      const he = z[Ie];
      if (je += it(he), je >= Ae) {
        fe = Ie + 1;
        break;
      }
    }
    fe = Math.min(fe, J), wt && window.clearTimeout(wt), !t.optimizeVue2Scroll || X <= le ? D((Ie) => ({ ...Ie, startIndex: Q, endIndex: fe, offsetLeft: ge, scrollLeft: X })) : (D((Ie) => ({ ...Ie, endIndex: fe, scrollLeft: X })), wt = window.setTimeout(() => {
      D((Ie) => ({ ...Ie, startIndex: Q, offsetLeft: ge }));
    }, Nn));
  }
  return [
    s,
    y,
    p,
    O,
    x,
    C,
    xe,
    g,
    re,
    Re,
    $e,
    st,
    Rt,
    at,
    tt,
    L,
    oe,
    N,
    w,
    $
  ];
}
function Vr(t = 500) {
  let e = !1, i = 0;
  return [() => e, (f) => {
    e = f, f && (i && self.clearTimeout(i), i = self.setTimeout(() => {
      e = !1, i = 0;
    }, t));
  }];
}
var Br = /* @__PURE__ */ Ce("<div class=row-by-row-table-height>"), Kr = /* @__PURE__ */ Ce("<div class=column-resize-indicator>"), zr = /* @__PURE__ */ Ce("<colgroup>"), Yr = /* @__PURE__ */ Ce("<thead>"), un = /* @__PURE__ */ Ce("<td class=vt-x-left>"), fn = /* @__PURE__ */ Ce("<td class=vt-x-right>"), qr = /* @__PURE__ */ Ce("<tr class=padding-top-tr>"), Pt = /* @__PURE__ */ Ce("<tr>"), Gr = /* @__PURE__ */ Ce('<div class="stk-sb-thumb vertical">'), Ur = /* @__PURE__ */ Ce("<div class=stk-table-no-data>"), jr = /* @__PURE__ */ Ce('<div class="stk-sb-thumb horizontal">'), Zr = /* @__PURE__ */ Ce("<div><div class=stk-table-scroll-container><table class=stk-table-main><tbody class=stk-tbody-main>"), Jr = /* @__PURE__ */ Ce("<col>"), Qr = /* @__PURE__ */ Ce("<th class=vt-x-left>"), el = /* @__PURE__ */ Ce("<th class=vt-x-right>"), tl = /* @__PURE__ */ Ce('<div class="table-header-resizer left">'), nl = /* @__PURE__ */ Ce("<span class=table-header-sorter>"), ol = /* @__PURE__ */ Ce('<div class="table-header-resizer right">'), rl = /* @__PURE__ */ Ce("<th><div class=table-header-cell-wrapper>"), ll = /* @__PURE__ */ Ce("<span class=table-header-title>"), Vn = /* @__PURE__ */ Ce("<td>"), dn = /* @__PURE__ */ Ce("<td class=vt-x-spacer>"), Bn = /* @__PURE__ */ Ce("<span>"), Kn = /* @__PURE__ */ Ce("<td><div class=table-cell-wrapper tabindex=-1>"), zt = /* @__PURE__ */ Ce("<div class=table-cell-wrapper tabindex=-1>");
const il = {
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
function sl(t) {
  const e = Jo(il, t), i = fr(), [r, l] = pe(), [f, c] = pe(), I = () => {
    var o;
    const n = (o = r()) == null ? void 0 : o.querySelector("tbody.stk-tbody-main");
    if (n)
      return Array.from(n.querySelectorAll("tr[data-row-key]"));
  }, [_] = pe(lr ? !0 : e.cellFixedMode === "relative"), u = q(() => {
    var n;
    return ((n = e.footerConfig) == null ? void 0 : n.position) === "top";
  }), g = q(() => u() ? "tbody" : "tfoot"), [s, E] = pe(), [y, D] = pe(), [R, L] = pe();
  let S = null;
  const [p, O] = pe(null), [x, C, m] = Hr(() => e.virtualX, _), [b, k] = pe({}), T = q(() => C().slice(-1)[0] || []), F = q(() => e.columns.some((n) => n.type === "tree-node")), v = q(() => {
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
  }), [w, $] = pe([]), [oe, N] = pe(0);
  function xe() {
    N((n) => n + 1);
  }
  const K = q(() => {
    const {
      rowKey: n
    } = e;
    return typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), re = q(() => {
    const {
      colKey: n
    } = e;
    return n === void 0 ? (o) => o.key || o.dataIndex : typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), Re = q(() => {
    const {
      emptyCellText: n
    } = e;
    return typeof n == "string" ? () => n : (o, h) => n({
      row: h,
      col: o
    });
  }), $e = /* @__PURE__ */ new WeakMap();
  function Se(n) {
    if (!n) return n;
    let o = $e.get(n);
    if (o !== void 0) return o;
    const h = n.__R_K__;
    return h !== void 0 ? ($e.set(n, h), h) : (o = K()(n), o === void 0 && (o = Math.random().toString(36).slice(2)), $e.set(n, o), o);
  }
  function Oe(n, o) {
    return Se(n) + Zn + re()(o);
  }
  const [at, tt, nt, st, wt, Rt, X, z, J] = Ar(e, e, re, T, w, Nt), [le] = Lr(e, r), [ie, Q, ge, Te] = Fr(e, e, re), [me, we, de, Ae, fe] = Or(e, e, w, $), [je, Ie] = Rr(e, T, Se, w);
  function he() {
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
  const ye = q(he), Xe = q(() => {
    var n, o;
    return (n = ye()) != null && n.enabled && e.scrollRowByRow ? !0 : (o = e.experimental) == null ? void 0 : o.scrollY;
  }), [Be, ke, He, Ne, ot, Fe, ze, Ht, It, ft, kt, dt, jt, Ft, Zt, a, A, H, W, ae] = Nr(e, r, I, w, T, x, Se, je, ye, Xe), se = eo(dt), [ee, V, te, U, G] = Mr(e, r, Be, ke, dt, ye, Xe), [ue, j, Z, _e, De, We] = Ir(v, T, Se, re, Ne), Ye = br(C, re), Ze = Er(e, _, Ye, Be, ke, Fe, ze), [Ue, ut, Je] = pr(e, i, r);
  function vt(n) {
    const o = Se(n);
    return w().findIndex((h) => Se(h) === o);
  }
  function Le(n) {
    const o = re()(n);
    return T().findIndex((h) => re()(h) === o);
  }
  const {
    config: be,
    isSelecting: rt,
    onMD: Wt,
    get: Jt,
    set: Qt,
    clear: pn,
    copy: lo
  } = no[bn](e, e, r, w, T, re, Oe, ln, Be, ke, vt, Le);
  yr(r, e, ln, Be, ke, x, He, be);
  const [io, en, Dt] = Sr(e, re, Ye, x, C, r);
  e.autoResize && xr(r, () => {
    It(), Dt();
  }, e, 200);
  const [Tn, yn, Rn] = Cr(e, e, r, T, f, re, io, a), [so, co] = kr(e, w, $, Se, Dn), [ao, uo, fo] = Pr(e, w, $, Se, e, Dn), ho = q(() => `height:${Be().offsetTop}px`), go = q(() => `height:${ot()}px`), In = q(() => !le() || !e.virtual ? 0 : w().length * Be().rowHeight + Ht()), kn = q(() => {
    if (!le() || !e.virtual) return 0;
    const {
      containerHeight: n,
      rowHeight: o
    } = Be();
    return (n - Ht()) % o;
  }), mo = q(() => `height:${kn()}px`);
  et(mt(() => e.columns, () => {
    tn(), Ie(), queueMicrotask(() => {
      kt(), Dt(), G();
    });
  })), et(mt(() => e.virtual, () => {
    queueMicrotask(ft);
  })), et(mt(() => e.rowHeight, () => ft())), et(mt(() => e.virtualX, () => {
    tn(), queueMicrotask(() => {
      kt(), Dt();
    });
  })), et(mt(() => e.dataSource, (n) => {
    wo(n);
  })), et(mt(() => e.fixedColShadow, () => Dt())), tn(), Nt(), Ie(), Tt(() => {
    It(), Dt(), X();
  });
  async function Dn() {
    await Promise.resolve(), ft(), G();
  }
  function Nt(n = e.dataSource, o) {
    let h = n.slice();
    (!e.sortRemote || o != null && o.forceSort) && (h = J(h)), F() && (h = fo(h)), h = _o(h), $(h);
  }
  function Mn(n, o) {
    var h;
    n = n || {}, k(n), o != null && o.remote || Nt(), o != null && o.silent || (h = e.onFilterChange) == null || h.call(e, n);
  }
  function _o(n) {
    const o = Object.keys(b());
    if (!(o != null && o.length)) return n;
    let h = n;
    for (const M of o) {
      const {
        value: d,
        filter: P
      } = b()[M];
      d != null && d.length && (h = h.filter((B) => {
        const ve = B[M];
        return P ? P({
          row: B,
          cellValue: ve,
          filterValues: d
        }) : d.some((ce) => ve == ce);
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
    w().length !== n.length && (o = !0), Nt(n), Ie(), n.length || pn(), o && queueMicrotask(() => ft()), queueMicrotask(G);
  }
  const Ot = q(() => {
    const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), {
      virtualX: M
    } = e, d = x(), P = re();
    for (let B = 0, ve = d.length; B < ve; B++) {
      const ce = d[B];
      for (let Pe = 0, lt = ce.length; Pe < lt; Pe++) {
        const Ve = ce[Pe], ct = M ? it(Ve) + "px" : Bt(Ve.width), qe = Bt(Ve.minWidth), Mt = Bt(Ve.maxWidth);
        let $t = "";
        ct && ($t += `--cw:${ct}`), qe && ($t += `;min-width:${qe}`), Mt && ($t += `;max-width:${Mt}`);
        const sn = P(Ve);
        n.set(sn, $t + ";" + Ze(Qe.TH, Ve, B)), o.set(sn, $t + ";" + Ze(Qe.TD, Ve, B)), h.set(sn, "position:sticky;" + $t + ";" + Ze(Qe.TF, Ve, B));
      }
    }
    return {
      [Qe.TH]: n,
      [Qe.TD]: o,
      [Qe.TF]: h
    };
  });
  function vo(n) {
    const o = Bt(n.width);
    return o ? `width:${o}` : void 0;
  }
  function St(n) {
    return n + Be().startIndex;
  }
  function xo(n, o) {
    var h;
    if (!(!ue() || !n))
      return (h = ue()[Se(n)]) == null ? void 0 : h.has(re()(o));
  }
  function Co(n) {
    const o = re()(n);
    return e.hideHeaderTitle === !0 || Array.isArray(e.hideHeaderTitle) && e.hideHeaderTitle.includes(o) ? "" : n.title || "";
  }
  function So(n, o) {
    var d;
    const h = Se(n), M = (n == null ? void 0 : n.__EXP_R__) && e.virtual && ((d = e.expandConfig) == null ? void 0 : d.height);
    return {
      id: i + "-" + h,
      "data-row-key": h,
      // 使用 getter 保持响应式：<For> 复用行 DOM 后 index 会变化（树展开/折叠、虚拟滚动），data-row-i 必须跟随更新，
      // 否则事件委托（onCellClick 等）会按过期索引取行导致取不到行
      get "data-row-i"() {
        return St(o());
      },
      // 使用 getter 保持响应式：SolidJS spread 包裹在 createRenderEffect 中，getter 读取的信号变化时会重新赋值 class/style
      get class() {
        const P = St(o()), B = [e.rowClassName(n, P), n != null && n.__EXP__ ? "expanded" : "", n != null && n.__EXP_R__ ? "expanded-row" : ""];
        return (y() === h || n === s()) && B.push("active"), e.showTrHoverClass && (h === p() || n === S) && B.push("hover"), B.filter(Boolean).join(" ");
      },
      get style() {
        var P;
        return M ? `--row-height: ${(P = e.expandConfig) == null ? void 0 : P.height}px` : null;
      }
    };
  }
  function Eo(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      draggable: !!Te(n),
      rowspan: n.__R_SP__,
      colspan: n.__C_SP__,
      title: Co(n),
      // 使用 getter 保持响应式（排序状态/固定列激活状态/列宽变化时更新）
      get style() {
        return Ot()[Qe.TH].get(o);
      },
      get class() {
        const h = z(o), M = !!h && h.order !== null;
        return [n.sorter ? "sortable" : "", M && "sorter-" + (h == null ? void 0 : h.order), n.headerClassName, en().get(o), n.headerAlign && (n.headerAlign === "left" ? "text-l" : n.headerAlign === "right" ? "text-r" : n.headerAlign === "center" ? "text-c" : null)].filter(Boolean).join(" ");
      }
    };
  }
  function bo(n) {
    const o = re()(n);
    return {
      "data-col-key": o,
      // 使用 getter 保持响应式（固定列激活状态/列宽变化时更新）
      get style() {
        return Ot()[Qe.TF].get(o);
      },
      get class() {
        return [n.className, en().get(o), n.type === "seq" ? "seq-column" : "", n.align === "center" ? "text-c" : n.align === "right" ? "text-r" : ""].filter(Boolean).join(" ");
      }
    };
  }
  function po(n, o, h, M) {
    const d = re()(o);
    if (!n)
      return {
        get style() {
          return Ot()[Qe.TD].get(d);
        }
      };
    const P = Oe(n, o);
    return {
      "data-col-key": d,
      // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
      get style() {
        return Ot()[Qe.TD].get(d);
      },
      get class() {
        const B = [o.className, en().get(d)];
        return o.align === "center" ? B.push("text-c") : o.align === "right" && B.push("text-r"), o.mergeCells && (Z().has(P) && B.push("cell-hover"), De().has(P) && B.push("cell-active")), e.cellActive && R() === P && B.push("active"), o.type === "seq" ? B.push("seq-column") : o.type === "expand" && (n.__EXP__ && re()(n.__EXP__) === d) ? B.push("expanded") : n.__T_EXP__ && o.type === "tree-node" ? B.push("tree-expanded") : o.type === "dragRow" && B.push("drag-row-cell"), B.filter(Boolean).join(" ");
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
    var d, P, B, ve;
    const o = _t(n.target), h = w()[o];
    if (!h || ((d = e.onRowClick) == null || d.call(e, n, h, {
      rowIndex: o
    }), (B = (P = v()).disabled) != null && B.call(P, h))) return;
    const M = e.rowKey ? y() === Se(h) : s() === h;
    if (M) {
      if (!v().revokable)
        return;
      rn(void 0, {
        silent: !0
      });
    } else
      rn(h, {
        silent: !0
      });
    (ve = e.onCurrentChange) == null || ve.call(e, n, h, {
      select: !M
    });
  }
  function yo(n) {
    var M;
    const o = _t(n.target), h = w()[o];
    h && ((M = e.onRowDblclick) == null || M.call(e, n, h, {
      rowIndex: o
    }));
  }
  function Ro(n) {
    var o;
    (o = e.onHeaderRowMenu) == null || o.call(e, n);
  }
  function Io(n) {
    var M;
    const o = _t(n.target), h = w()[o];
    h && ((M = e.onRowMenu) == null || M.call(e, n, h, {
      rowIndex: o
    }));
  }
  function ko(n, o, h) {
    h.type === "expand" ? so(o, h) : h.type === "tree-node" && ao(o, h);
  }
  function Do(n) {
    var P, B, ve;
    const o = _t(n.target), h = w()[o];
    if (!h) return;
    const M = Xt(n.target), d = T().find((ce) => re()(ce) === M);
    if (d) {
      if ((P = n.target) != null && P.closest(".stk-fold-icon")) {
        ko(n, h, d);
        return;
      }
      if (e.cellActive) {
        const ce = Oe(h, d), Pe = {
          row: h,
          col: d,
          select: !1,
          rowIndex: o
        };
        e.selectedCellRevokable && R() === ce ? L(void 0) : (L(ce), Pe.select = !0), (B = e.onCellSelected) == null || B.call(e, n, Pe);
      }
      (ve = e.onCellClick) == null || ve.call(e, n, h, d, {
        rowIndex: o
      });
    }
  }
  function nn(n) {
    const o = _t(n.target) || 0, h = w()[o], M = Xt(n.target), d = T().find((P) => re()(P) === M);
    return {
      row: h,
      col: d,
      rowIndex: o
    };
  }
  function Mo(n, o) {
    var h;
    nt(o), (h = e.onHeaderCellClick) == null || h.call(e, n, o);
  }
  function $o(n) {
    var P, B;
    const o = Ut(n.target);
    if (!o) return;
    const {
      row: h,
      col: M
    } = nn(n);
    (P = e.onCellMouseover) == null || P.call(e, n, h, M);
    const d = n.relatedTarget;
    (!d || !o.contains(d)) && ((B = e.onCellMouseenter) == null || B.call(e, n, h, M));
  }
  function Lo(n) {
    var P;
    const o = n.target, h = n.relatedTarget, M = Ut(o);
    if (M && (!h || !M.contains(h))) {
      const {
        row: B,
        col: ve
      } = nn(n);
      (P = e.onCellMouseleave) == null || P.call(e, n, B, ve);
    }
    const d = bt(o);
    d && (!h || !d.contains(h)) && (S = null, e.showTrHoverClass && O(null), e.rowHover && _e(void 0));
  }
  function Ao(n) {
    const o = _t(n.target);
    o < 0 || Ae(n, St(o));
  }
  function Ho(n) {
    var d;
    const {
      row: o,
      col: h,
      rowIndex: M
    } = nn(n);
    (d = e.onCellMousedown) == null || d.call(e, n, o, h, {
      rowIndex: M
    }), be().enabled && Wt(n);
  }
  const [$n, Ln] = Vr();
  function Fo(n) {
    if (e.smoothScroll) return;
    if (yn()) {
      n.stopPropagation();
      return;
    }
    const o = r(), {
      deltaY: h,
      deltaX: M,
      shiftKey: d
    } = n;
    if (He() && h && !d) {
      const {
        containerHeight: P,
        scrollTop: B,
        scrollHeight: ve
      } = Be(), ce = B < ve - P - 1, Pe = B > 1;
      h > 0 && ce || h < 0 && Pe ? (Ln(!0), n.preventDefault()) : $n() && n.preventDefault(), Xe() ? (se(B + h), G()) : o.scrollTop += h;
    }
    if (Fe()) {
      const {
        containerWidth: P,
        scrollLeft: B,
        scrollWidth: ve
      } = ke();
      let ce = M;
      d && h && (ce = h);
      const Pe = B < ve - P - 1, lt = B > 1;
      ce > 0 && Pe || ce < 0 && lt ? (Ln(!0), n.preventDefault()) : $n() && n.preventDefault(), o.scrollLeft += ce;
    }
  }
  let on = !1;
  function Oo(n) {
    !(n != null && n.target) || on || (on = !0, requestAnimationFrame(() => {
      var ve, ce;
      on = !1;
      const {
        scrollTop: o,
        scrollLeft: h
      } = n.target, {
        scrollTop: M
      } = Be(), {
        scrollLeft: d
      } = ke(), P = Xe() ? !1 : o !== M, B = h !== d;
      if (P && dt(o), B && (Fe() ? jt(h) : ke().scrollLeft = h, Dt(ke)), P) {
        const {
          startIndex: Pe,
          endIndex: lt
        } = Be();
        (ve = e.onScroll) == null || ve.call(e, n, {
          startIndex: Pe,
          endIndex: lt
        });
      }
      B && ((ce = e.onScrollX) == null || ce.call(e, n)), G();
    }));
  }
  function Po(n) {
    const o = bt(n.target);
    if (!o) return;
    const h = Number(o.dataset.rowI), M = w()[h];
    if (S === M) return;
    S = M;
    const d = o.dataset.rowKey;
    e.showTrHoverClass && O(d || null), e.rowHover && _e(d);
  }
  function rn(n, o = {
    silent: !1,
    deep: !1
  }) {
    var d;
    const h = n !== void 0, M = s();
    if (!h)
      E(void 0), D(void 0), We(!0);
    else if (typeof n == "string") {
      const P = (ve, ce) => {
        var Pe;
        for (let lt = 0; lt < ve.length; lt++) {
          const Ve = ve[lt];
          if (Se(Ve) === ce)
            return Ve;
          if (o.deep && ((Pe = Ve.children) != null && Pe.length)) {
            const ct = P(Ve.children, ce);
            if (ct)
              return ct;
          }
        }
        return null;
      };
      D(n), We(!1, y());
      const B = P(w() || [], n);
      if (!B) {
        console.warn("setCurrentRow failed.rowKey:", n);
        return;
      }
      E(B);
    } else
      E(n), D(Se(n)), We(!1, y());
    o.silent || (d = e.onCurrentChange) == null || d.call(
      e,
      /** no Event */
      null,
      h ? s() : M,
      {
        select: h
      }
    );
  }
  function Xo(n, o, h = {
    silent: !1
  }) {
    var d;
    if (!w().length) return;
    const M = n !== void 0 && o !== void 0;
    L(M ? Oe(n, o) : void 0), h.silent || (d = e.onCellSelected) == null || d.call(
      e,
      /** no Event */
      null,
      {
        row: n,
        col: o,
        select: M
      }
    );
  }
  function ln(n = 0, o = 0) {
    r() && (n !== null && (Xe() ? (dt(n), G()) : r().scrollTop = n), o !== null && (r().scrollLeft = o));
  }
  function Wo() {
    return w();
  }
  const No = {
    initVirtualScroll: It,
    initVirtualScrollX: kt,
    initVirtualScrollY: ft,
    setCurrentRow: rn,
    setSelectedCell: Xo,
    setHighlightDimCell: Je,
    setHighlightDimRow: ut,
    sortCol: tt,
    sortStates: at,
    getSortColumns: Rt,
    setSorter: st,
    resetSorter: wt,
    scrollTo: ln,
    getTableData: Wo,
    getRowIndex: vt,
    getColumnIndex: Le,
    setRowExpand: co,
    setAutoHeight: Ft,
    clearAllAutoHeight: Zt,
    setTreeExpand: uo,
    getSelectedArea: Jt,
    setAreaSelection: Qt,
    clearSelectedArea: pn,
    copySelectedArea: lo,
    setFilter: Mn
  };
  typeof e.ref == "function" && e.ref(No);
  const Vo = q(() => {
    const n = {
      "stk-table": !0,
      virtual: e.virtual,
      "virtual-x": e.virtualX,
      "vt-on": He(),
      light: e.theme === "light",
      dark: e.theme === "dark",
      headless: e.headless,
      "is-col-resizing": yn(),
      "col-resizable": !!e.colResizable,
      bordered: !!e.bordered,
      stripe: e.stripe,
      "cell-hover": e.cellHover,
      "cell-active": e.cellActive,
      "row-hover": e.rowHover,
      "row-active": v().enabled,
      "text-overflow": e.showOverflow,
      "header-text-overflow": e.showHeaderOverflow,
      "fixed-relative-mode": _(),
      "auto-row-height": !!e.autoRowHeight,
      "scroll-row-by-row": !!le(),
      "scrollbar-on": ye().enabled,
      "area-selection": be().enabled,
      "is-area-selecting": rt(),
      "exp-scroll-y": !!Xe()
    };
    typeof e.bordered == "string" && (n[`bordered-${e.bordered}`] = !0);
    const o = Object.keys(n).filter((h) => n[h]).join(" ");
    return e.class ? o + " " + e.class : o;
  }), Bo = q(() => {
    const n = {
      "--row-height": e.autoRowHeight ? void 0 : Be().rowHeight + "px",
      "--header-row-height": e.headerRowHeight + "px",
      "--footer-row-height": e.footerRowHeight + "px",
      "--highlight-duration": e.highlightConfig.duration && e.highlightConfig.duration + "s",
      "--highlight-timing-function": Ue() ? `steps(${Ue()})` : void 0,
      "--sb-width": `${ye().width}px`,
      "--sb-height": `${ye().height}px`
    };
    let o = Object.entries(n).filter(([, M]) => M != null && M !== "").map(([M, d]) => `${M}:${d}`).join(";");
    const h = e.style;
    if (h) {
      const M = typeof h == "string" ? h : Object.entries(h).filter(([, d]) => d != null && d !== "").map(([d, P]) => `${d.replace(/[A-Z]/g, (B) => "-" + B.toLowerCase())}:${P}`).join(";");
      M && (o = o ? o + ";" + M : M);
    }
    return o;
  }), Ko = {
    dataSource: w,
    rawDataSource: () => e.dataSource,
    theme: () => e.theme,
    setFilter: Mn,
    rowVersion: oe,
    bumpRowVersion: xe
  };
  return Y(oo.Provider, {
    value: Ko,
    get children() {
      var n = Zr(), o = n.firstChild, h = o.firstChild, M = h.firstChild;
      return n.addEventListener("wheel", Fo), n.addEventListener("scroll", Oo), pt((d) => {
        l(d);
      }, n), ne(n, Y(Ee, {
        get when() {
          return Ge(() => !Xe())() && In();
        },
        get children() {
          var d = Br();
          return Me((P) => Ke(d, `height: ${In()}px`, P)), d;
        }
      }), o), ne(n, Y(Ee, {
        get when() {
          return e.colResizable;
        },
        get children() {
          var d = Kr();
          return pt((P) => c(P), d), d;
        }
      }), o), h.$$mouseover = Po, h.$$contextmenu = Io, h.$$dblclick = yo, h.$$click = To, Et(h, "dragend", fe), Et(h, "dragenter", we), Et(h, "dragover", de), ne(h, Y(Ee, {
        get when() {
          return Ge(() => !!e.fixedMode)() && !Fe();
        },
        get children() {
          var d = zr();
          return ne(d, Y(xt, {
            get each() {
              return T();
            },
            children: (P) => (() => {
              var B = Jr();
              return Me((ve) => Ke(B, vo(P), ve)), B;
            })()
          })), d;
        }
      }), M), ne(h, Y(Ee, {
        get when() {
          return !e.headless;
        },
        get children() {
          var d = Yr();
          return ne(d, Y(xt, {
            get each() {
              return Ge(() => !!Fe())() ? A() : x();
            },
            children: (P, B) => (() => {
              var ve = Pt();
              return ve.$$contextmenu = (ce) => Ro(ce), ne(ve, Y(Ee, {
                get when() {
                  return Fe();
                },
                get children() {
                  var ce = Qr();
                  return Me((Pe) => Ke(ce, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, Pe)), ce;
                }
              }), null), ne(ve, Y(xt, {
                each: P,
                children: (ce, Pe) => {
                  const lt = Eo(ce);
                  return (() => {
                    var Ve = rl(), ct = Ve.firstChild;
                    return Vt(Ve, mn(lt, {
                      onClick: (qe) => Mo(qe, ce),
                      onDragStart: ie,
                      onDrop: ge,
                      onDragOver: Q
                    }), !1, !0), ne(Ve, Y(Ee, {
                      get when() {
                        return Ge(() => !!Tn()(ce))() && Pe() > 0;
                      },
                      get children() {
                        var qe = tl();
                        return qe.$$mousedown = (Mt) => Rn(Mt, ce, !0), qe;
                      }
                    }), ct), ne(ct, Y(Ee, {
                      get when() {
                        return ce.customHeaderCell;
                      },
                      get fallback() {
                        return Ge(() => !!e.tableHeaderSlot)() ? e.tableHeaderSlot(ce) : (() => {
                          var qe = ll();
                          return ne(qe, () => ce.title), qe;
                        })();
                      },
                      get children() {
                        return hn(ce.customHeaderCell, {
                          col: ce,
                          colIndex: Pe(),
                          rowIndex: B()
                        });
                      }
                    }), null), ne(ct, Y(Ee, {
                      get when() {
                        return ce.sorter;
                      },
                      get children() {
                        var qe = nl();
                        return ne(qe, Y(mr, {})), qe;
                      }
                    }), null), ne(Ve, Y(Ee, {
                      get when() {
                        return Tn()(ce);
                      },
                      get children() {
                        var qe = ol();
                        return qe.$$mousedown = (Mt) => Rn(Mt, ce), qe;
                      }
                    }), null), Me((qe) => Ke(ct, ce.__R_SP__ ? `--row-span:${ce.__R_SP__}` : void 0, qe)), Ve;
                  })();
                }
              }), null), ne(ve, Y(Ee, {
                get when() {
                  return Fe();
                },
                get children() {
                  var ce = el();
                  return Me((Pe) => Ke(ce, `min-width:${ze()}px;width:${ze()}px`, Pe)), ce;
                }
              }), null), ve;
            })()
          })), d;
        }
      }), M), ne(h, Y(Ee, {
        get when() {
          return Ge(() => !!e.footerData)() && e.footerData.length > 0;
        },
        get children() {
          return zo();
        }
      }), M), M.addEventListener("drop", Ao), M.$$mouseout = Lo, M.$$mouseover = $o, M.$$mousedown = Ho, M.$$click = Do, ne(M, Y(Ee, {
        get when() {
          return Ge(() => !!(!Xe() && He()))() && !le();
        },
        get children() {
          var d = qr();
          return ne(d, Y(Ee, {
            get when() {
              return Ge(() => !!e.fixedMode)() && e.headless;
            },
            get children() {
              return [Y(Ee, {
                get when() {
                  return Fe();
                },
                get children() {
                  var P = un();
                  return Me((B) => Ke(P, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, B)), P;
                }
              }), Y(xt, {
                get each() {
                  return ae();
                },
                children: (P, B) => Y(Ee, {
                  get when() {
                    return !P.__VT_C_SP__;
                  },
                  get fallback() {
                    return (() => {
                      var ve = dn();
                      return Me(() => ht(ve, "colspan", P.__VT_C_SP__)), ve;
                    })();
                  },
                  get children() {
                    var ve = Vn();
                    return Me((ce) => Ke(ve, Ot()[Qe.TD].get(re()(P)), ce)), ve;
                  }
                })
              }), Y(Ee, {
                get when() {
                  return Fe();
                },
                get children() {
                  var P = fn();
                  return Me((B) => Ke(P, `min-width:${ze()}px;width:${ze()}px`, B)), P;
                }
              })];
            }
          })), Me((P) => Ke(d, ho(), P)), d;
        }
      }), null), ne(M, Y(xt, {
        get each() {
          return Ne();
        },
        children: (d, P) => Yo(d, P)
      }), null), ne(M, Y(Ee, {
        get when() {
          return !Xe();
        },
        get children() {
          return [Y(Ee, {
            get when() {
              return Ge(() => !!He())() && !le();
            },
            get children() {
              var d = Pt();
              return Me((P) => Ke(d, go(), P)), d;
            }
          }), Y(Ee, {
            get when() {
              return kn();
            },
            get children() {
              var d = Pt();
              return Me((P) => Ke(d, mo(), P)), d;
            }
          })];
        }
      }), null), ne(o, Y(Ee, {
        get when() {
          return Ge(() => !!ye().enabled)() && V().y;
        },
        get children() {
          var d = Gr();
          return Et(d, "touchstart", te, !0), Et(d, "mousedown", te, !0), Me((P) => Ke(d, `height:${ee().h}px;transform:translateY(${ee().t}px)`, P)), d;
        }
      }), null), ne(n, Y(Ee, {
        get when() {
          return Ge(() => !w() || !w().length)() && e.showNoData;
        },
        get children() {
          var d = Ur();
          return ne(d, () => e.emptySlot ?? "暂无数据"), Me(() => d.classList.toggle("no-data-full", !!e.noDataFull)), d;
        }
      }), null), ne(n, () => e.customBottomSlot, null), ne(n, Y(Ee, {
        get when() {
          return Ge(() => !!ye().enabled)() && V().x;
        },
        get children() {
          var d = jr();
          return Et(d, "touchstart", U, !0), Et(d, "mousedown", U, !0), Me((P) => Ke(d, `width:${ee().w}px;transform:translateX(${ee().l}px)`, P)), d;
        }
      }), null), Me((d) => {
        var P = Vo(), B = be().enabled ? 0 : void 0, ve = Bo(), ce = !!e.fixedMode, Pe = e.width, lt = e.minWidth, Ve = e.maxWidth, ct = Xe() ? `transform:translateY(${Be().translateY}px)` : "";
        return P !== d.e && En(n, d.e = P), B !== d.t && ht(n, "tabindex", d.t = B), d.a = Ke(n, ve, d.a), ce !== d.o && h.classList.toggle("fixed-mode", d.o = ce), Pe !== d.i && Lt(h, "width", d.i = Pe), lt !== d.n && Lt(h, "min-width", d.n = lt), Ve !== d.s && Lt(h, "max-width", d.s = Ve), d.h = Ke(M, ct, d.h), d;
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
    return Y(Gn, {
      get component() {
        return g();
      },
      class: "stk-footer",
      get style() {
        return Ge(() => !!u())() ? `top:${Ht()}px` : "";
      },
      get children() {
        return Y(xt, {
          get each() {
            return e.footerData;
          },
          children: (n, o) => (() => {
            var h = Pt();
            return ne(h, Y(Ee, {
              get when() {
                return Fe();
              },
              get children() {
                var M = un();
                return Me((d) => Ke(M, `min-width:${W().offsetLeft}px;width:${W().offsetLeft}px`, d)), M;
              }
            }), null), ne(h, Y(xt, {
              get each() {
                return ae();
              },
              children: (M, d) => Y(Ee, {
                get when() {
                  return !M.__VT_C_SP__;
                },
                get fallback() {
                  return (() => {
                    var P = dn();
                    return Me(() => ht(P, "colspan", M.__VT_C_SP__)), P;
                  })();
                },
                get children() {
                  var P = Kn(), B = P.firstChild;
                  return Vt(P, mn(() => bo(M)), !1, !0), ne(P, Y(Ee, {
                    get when() {
                      return M.customFooterCell;
                    },
                    get children() {
                      return hn(M.customFooterCell, {
                        class: "table-cell-wrapper",
                        tabindex: "-1",
                        col: M,
                        row: n,
                        rowIndex: o(),
                        cellValue: n[M.dataIndex]
                      });
                    }
                  }), B), ne(B, Y(Ee, {
                    get when() {
                      return n[M.dataIndex] != null;
                    },
                    get children() {
                      var ve = Bn();
                      return ne(ve, () => n[M.dataIndex]), ve;
                    }
                  })), Me(() => ht(B, "title", n[M.dataIndex] || "")), P;
                }
              })
            }), null), ne(h, Y(Ee, {
              get when() {
                return Fe();
              },
              get children() {
                var M = fn();
                return Me((d) => Ke(M, `min-width:${ze()}px;width:${ze()}px`, d)), M;
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
      var M = Pt();
      return Vt(M, h, !1, !0), ne(M, Y(Ee, {
        get when() {
          return !(n && n.__EXP_R__);
        },
        get fallback() {
          return (() => {
            var d = Kn(), P = d.firstChild;
            return ne(P, (() => {
              var B = Ge(() => !!e.expandSlot);
              return () => B() ? e.expandSlot(n.__EXP_R__, n.__EXP_C__) : Ge(() => !!(n.__EXP_R__ && n.__EXP_C__))() && n.__EXP_R__[n.__EXP_C__.dataIndex] || "";
            })()), Me(() => ht(d, "colspan", H())), d;
          })();
        },
        get children() {
          return [Y(Ee, {
            get when() {
              return Fe();
            },
            get children() {
              return un();
            }
          }), Y(xt, {
            get each() {
              return ae();
            },
            children: (d, P) => qo(n, d, o)
          }), Y(Ee, {
            get when() {
              return Fe();
            },
            get children() {
              return fn();
            }
          })];
        }
      })), M;
    })();
  }
  function qo(n, o, h) {
    if (o.__VT_C_SP__)
      return (() => {
        var d = dn();
        return Me(() => ht(d, "colspan", o.__VT_C_SP__)), d;
      })();
    const M = po(n, o, h(), o.__LF_S__ ?? 0);
    return Y(Ee, {
      get when() {
        return !xo(n, o);
      },
      get children() {
        var d = Vn();
        return Vt(d, M, !1, !0), ne(d, Y(Ee, {
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
                return St(h());
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
              stkFoldIcon: Y(Cn, {}),
              stkDragIcon: Y(Pn, {
                onDragStart: (P) => me(P, St(h()))
              })
            });
          }
        })), d;
      }
    });
  }
  function Go(n, o, h) {
    return o.type ? o.type === "seq" ? (() => {
      var M = zt();
      return ne(M, () => (e.seqConfig.startIndex || 0) + St(h()) + 1), M;
    })() : o.type === "tree-node" ? (() => {
      var M = zt();
      return ne(M, Y(vr, {
        col: o,
        row: n
      })), M;
    })() : (() => {
      var M = zt();
      return ne(M, Y(Ee, {
        get when() {
          return o.type === "dragRow";
        },
        get children() {
          return Y(Pn, {
            onDragStart: (d) => me(d, St(h()))
          });
        }
      }), null), ne(M, Y(Ee, {
        get when() {
          return o.type === "expand";
        },
        get children() {
          return Y(Cn, {});
        }
      }), null), ne(M, Y(Ee, {
        get when() {
          return n[o.dataIndex] != null;
        },
        get children() {
          var d = Bn();
          return ne(d, () => n[o.dataIndex]), d;
        }
      }), null), Me(() => ht(M, "title", n[o.dataIndex] || "")), M;
    })() : (() => {
      var M = zt();
      return ne(M, (() => {
        var d = Ge(() => (n && n[o.dataIndex]) != null);
        return () => d() ? n && n[o.dataIndex] : Re()(o, n);
      })()), Me(() => ht(M, "title", n[o.dataIndex] || "")), M;
    })();
  }
}
function hn(t, e) {
  return typeof t == "string" ? t : typeof t == "function" ? t(e) : null;
}
At(["click", "dblclick", "contextmenu", "mouseover", "mousedown", "mouseout", "touchstart"]);
var cl = /* @__PURE__ */ Ce("<input type=checkbox>"), al = /* @__PURE__ */ Ce("<div><footer><button>↺</button><button>✓");
const zn = 300, Yn = 400, Ct = 6;
function ul() {
  const [t, e] = pe(!1), [i, r] = pe("light"), [l, f] = pe([]), [c, I] = pe({
    x: 0,
    y: 0
  }), [_, u] = pe(/* @__PURE__ */ new Set()), g = [{
    title: "",
    dataIndex: "value",
    width: 30,
    className: "stk-filter-dropdown-checkbox",
    customCell: ({
      row: v
    }) => (() => {
      var w = cl();
      return Me(() => w.checked = _().has(v.value)), w;
    })()
  }, {
    title: "",
    dataIndex: "label"
  }];
  let s, E = null, y = null, D = null;
  function R() {
    if (!s)
      return [zn, Yn];
    const v = s.getBoundingClientRect();
    return [v.width || zn, v.height || Yn];
  }
  function L(v) {
    const w = window.pageYOffset || document.documentElement.scrollTop, $ = window.pageXOffset || document.documentElement.scrollLeft, oe = document.documentElement.clientWidth, N = document.documentElement.clientHeight, [xe, K] = R();
    let re = v.x, Re = v.y;
    v.x - $ + xe > oe - Ct && (re = oe - xe - Ct + $);
    const Se = v.y - w;
    if (Se + K > N - Ct) {
      const Oe = v.height || 30;
      Se - Oe >= K + Ct ? Re = v.y - Oe - K - Ct : Re = Ct + w;
    }
    return re = Math.max(Ct + $, re), Re = Math.max(Ct + w, Re), {
      x: re,
      y: Re
    };
  }
  function S() {
    const v = /* @__PURE__ */ new Set();
    l().forEach((w) => {
      w.selected && v.add(w.value);
    }), u(v);
  }
  function p(v, w) {
    const $ = new Set(_());
    v ? $.add(w.value) : $.delete(w.value), u($);
  }
  function O() {
    const v = _();
    l().forEach((w) => w.selected = v.has(w.value)), y == null || y(Array.from(v)), x();
  }
  function x() {
    e(!1), f([]), u(/* @__PURE__ */ new Set()), E = null;
  }
  function C() {
    u(/* @__PURE__ */ new Set()), l().forEach((v) => v.selected = !1), y == null || y([]), x();
  }
  function m(v) {
    !t() || s != null && s.contains(v.target) || E != null && E.contains(v.target) || x();
  }
  function b(v, w) {
    const $ = _().has(w.value);
    p(!$, w);
  }
  function k(v, w, $, oe) {
    s && (s.style.visibility = "hidden"), f(w || []), E = oe ?? null, y = $, S(), e(!0), queueMicrotask(() => {
      I(L(v)), s && (s.style.visibility = "visible");
    });
  }
  function T(v) {
    r(v);
  }
  const F = document.createElement("div");
  return F.classList.add("stk-filter-dropdown-wrapper"), document.body.appendChild(F), D = Qo(() => (() => {
    var v = al(), w = v.firstChild, $ = w.firstChild, oe = $.nextSibling;
    return v.$$click = (N) => N.stopPropagation(), pt((N) => s = N, v), ne(v, Y(sl, {
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
      onRowClick: b
    }), w), $.$$click = C, oe.$$click = O, Me((N) => {
      var xe = `stk-filter-dropdown stk-filter-dropdown--${i()}`, K = c().y + "px", re = c().x + "px", Re = t() ? void 0 : "none";
      return xe !== N.e && En(v, N.e = xe), K !== N.t && Lt(v, "top", N.t = K), re !== N.a && Lt(v, "left", N.a = re), Re !== N.o && Lt(v, "display", N.o = Re), N;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), v;
  })(), F), document.addEventListener("click", m), yt(() => {
    document.removeEventListener("click", m), D == null || D();
  }), {
    get visible() {
      return t();
    },
    get trigger() {
      return E;
    },
    show: k,
    hide: x,
    setTheme: T
  };
}
let gn = null;
async function fl() {
  return gn || (gn = ul()), gn;
}
At(["click"]);
var dl = /* @__PURE__ */ Ce('<div class=stk-filter><svg class=stk-filter-icon xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"><path fill=currentColor d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z">'), hl = /* @__PURE__ */ Ce("<span>");
function gl(t) {
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
    fl().then((s) => {
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
    var I;
    (I = t.onChange) == null || I.call(t, c);
  }
  return (() => {
    var c = dl(), I = c.firstChild;
    ne(c, () => t.children ?? (() => {
      var u = hl();
      return ne(u, () => t.col.title), u;
    })(), I), I.$$click = l;
    var _ = r;
    return typeof _ == "function" ? pt(_, I) : r = I, Me((u) => {
      var g = !!i(), s = e() === "light", E = e() === "dark";
      return g !== u.e && c.classList.toggle("stk-filter--active", u.e = g), s !== u.t && c.classList.toggle("stk-filter--light", u.t = s), E !== u.a && c.classList.toggle("stk-filter--dark", u.a = E), u;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), c;
  })();
}
At(["click"]);
function ml(t, e) {
  const i = /* @__PURE__ */ new Set();
  return t.forEach((r) => {
    const l = r[e];
    l != null && i.add(l);
  }), Array.from(i).map((r) => ({
    label: String(r),
    value: r
  }));
}
function Ml(t) {
  const [e, i] = pe({});
  function r(l, f) {
    return (c) => {
      const I = c.col.dataIndex, _ = Sn(), u = () => {
        var R;
        return ((R = e()[I]) == null ? void 0 : R.value.length) || 0;
      };
      let g = null, s = null;
      function E() {
        var L;
        if (!(l != null && l.autoOptions)) return [];
        const R = ((L = _ == null ? void 0 : _.rawDataSource) == null ? void 0 : L.call(_)) || (_ == null ? void 0 : _.dataSource()) || [];
        return g && s === R || (s = R, g = ml(R, I)), g;
      }
      function y() {
        return (l == null ? void 0 : l.options) ?? E();
      }
      function D(R) {
        var p, O;
        const L = {
          value: R,
          filter: (l == null ? void 0 : l.filter) ?? ((p = e()[I]) == null ? void 0 : p.filter)
        }, S = {
          ...e(),
          [I]: L
        };
        i(S), (O = t == null ? void 0 : t.onChange) == null || O.call(t, {
          colKey: I,
          status: L
        }), _ == null || _.setFilter(S, t);
      }
      return Y(gl, {
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
        getOptions: y,
        onChange: D,
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
var _l = /* @__PURE__ */ Ce("<input class=stk-editable-cell-input>"), wl = /* @__PURE__ */ Ce("<div class=stk-editable-cell>");
function vl(t) {
  const e = () => t.trigger || "dblclick", [i, r] = pe(t.cellValue), [l, f] = pe(!1);
  let c, I;
  et(mt(() => t.cellValue, (S) => {
    l() || r(S);
  }));
  function _(S) {
    S.type === e() && u();
  }
  function u() {
    r(t.cellValue), f(!0), queueMicrotask(() => {
      c == null || c.focus();
    });
  }
  function g() {
    var p;
    f(!1);
    const S = i();
    R(S), (p = t.onChange) == null || p.call(t, S), L();
  }
  function s() {
    f(!1), r(t.cellValue), L();
  }
  function E() {
    l() && g();
  }
  function y(S) {
    r(S.target.value);
  }
  function D(S) {
    S.key === "Enter" ? (S.preventDefault(), S.stopPropagation(), g()) : S.key === "Escape" || S.key === "Esc" ? (S.preventDefault(), S.stopPropagation(), s()) : S.key === "ArrowLeft" || S.key === "ArrowRight" || S.key === "ArrowUp" || S.key === "ArrowDown" ? S.stopPropagation() : S.key === "Tab" ? g() : S.stopPropagation();
  }
  function R(S) {
    const {
      row: p,
      col: O
    } = t;
    p[O.dataIndex] = S;
  }
  function L() {
    var p;
    const S = (p = I == null ? void 0 : I.closest) == null ? void 0 : p.call(I, ".stk-table");
    S == null || S.focus();
  }
  return (() => {
    var S = wl();
    return S.$$click = _, S.$$dblclick = _, pt((p) => I = p, S), ne(S, Y(Ee, {
      get when() {
        return l();
      },
      get fallback() {
        return Ge(() => i() ?? "");
      },
      get children() {
        var p = _l();
        return p.$$keydown = D, p.$$input = y, p.addEventListener("blur", E), pt((O) => c = O, p), Me(() => p.value = i()), p;
      }
    })), S;
  })();
}
At(["dblclick", "click", "input", "keydown"]);
function $l(t) {
  function e() {
    return (i) => Y(vl, mn(i, {
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
var xl = /* @__PURE__ */ Ce("<div class=stk-checkbox-cell>"), Cl = /* @__PURE__ */ Ce("<input type=checkbox class=stk-checkbox-native>");
function qn(t) {
  let e, i;
  et(() => {
    i && (i.indeterminate = !!t.indeterminate);
  });
  function r(l) {
    var c, I;
    let f;
    typeof l == "boolean" ? f = l : ((c = l == null ? void 0 : l.target) == null ? void 0 : c.checked) !== void 0 ? f = l.target.checked : f = !!l, f !== e && (e = f, (I = t.onChange) == null || I.call(t, f));
  }
  return (() => {
    var l = xl();
    return ne(l, Y(Ee, {
      get when() {
        return t.customComponent;
      },
      get fallback() {
        return (() => {
          var f = Cl();
          f.$$click = (I) => I.stopPropagation(), f.addEventListener("change", r);
          var c = i;
          return typeof c == "function" ? pt(c, f) : i = f, Me(() => f.checked = !!t.checked), f;
        })();
      },
      get children() {
        return Y(Gn, {
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
At(["click"]);
function Ll(t) {
  const e = (t == null ? void 0 : t.field) ?? "_isChecked", i = t == null ? void 0 : t.checkboxComponent;
  function r() {
    return (f) => {
      const c = Sn(), I = () => (c == null || c.rowVersion(), !!f.row[e]);
      function _(u) {
        var g;
        f.row[e] = u, c == null || c.bumpRowVersion(), (g = t == null ? void 0 : t.onChange) == null || g.call(t, u, f.row);
      }
      return Y(qn, {
        get checked() {
          return I();
        },
        customComponent: i,
        onChange: _
      });
    };
  }
  function l() {
    return (f) => {
      const c = Sn(), I = () => (c == null ? void 0 : c.dataSource()) || [], _ = () => {
        c == null || c.rowVersion();
        const s = I();
        return s.length > 0 && s.every((E) => !!E[e]);
      }, u = () => {
        c == null || c.rowVersion();
        const s = I(), E = s.filter((y) => !!y[e]).length;
        return E > 0 && E < s.length;
      };
      function g(s) {
        var E;
        I().forEach((y) => {
          y[e] = s;
        }), c == null || c.bumpRowVersion(), (E = t == null ? void 0 : t.onSelectAll) == null || E.call(t, s);
      }
      return Y(qn, {
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
const Sl = {
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
function El(t) {
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
    percent: I = !1,
    abbr: _,
    abbrDecimals: u,
    placeholder: g = "--"
  } = e;
  if (t == null || t === "")
    return g;
  const s = typeof t == "number" ? t : Number(t);
  if (Number.isNaN(s))
    return g;
  const E = s < 0 ? "-" : c && s > 0 ? "+" : "";
  let y = Math.abs(s);
  I && (y = y * 100);
  let D = "";
  if (_ && !I) {
    const p = Sl[_];
    for (let O = 0; O < p.length; O++) {
      const x = p[O][0];
      if (y >= x) {
        y = y / x, D = p[O][1];
        break;
      }
    }
  }
  let R;
  D ? R = u ?? i ?? 2 : R = i ?? null;
  let L = R == null ? String(y) : y.toFixed(R);
  return r && (L = El(L)), `${l}${E}${L}${D}${I ? "%" : ""}${f}`;
}
var bl = /* @__PURE__ */ Ce("<span class=stk-number-cell>");
function Al(t) {
  function e() {
    return (i) => (() => {
      var r = bl();
      return ne(r, () => ro(i.cellValue, t)), r;
    })();
  }
  return {
    NumberCell: e
  };
}
var pl = /* @__PURE__ */ Ce("<span>"), Tl = /* @__PURE__ */ Ce("<span class=stk-change-cell__arrow>");
function yl(t) {
  const e = t === "" || t == null ? NaN : Number(t);
  return Number.isNaN(e) || e === 0 ? "flat" : e > 0 ? "rise" : "fall";
}
function Hl(t = {}) {
  const {
    colorReverse: e = !1,
    arrow: i = !1,
    riseColor: r,
    fallColor: l,
    flatColor: f
  } = t;
  function c() {
    return (I) => {
      const _ = I.cellValue, u = yl(_);
      let g = "stk-change-cell--flat";
      u === "rise" ? g = e ? "stk-change-cell--green" : "stk-change-cell--red" : u === "fall" && (g = e ? "stk-change-cell--red" : "stk-change-cell--green");
      const s = u === "rise" ? r : u === "fall" ? l : f, E = i && u !== "flat" ? u === "rise" ? "▲" : "▼" : "";
      return (() => {
        var y = pl();
        return En(y, `stk-change-cell ${g}`), ne(y, E ? (() => {
          var D = Tl();
          return ne(D, E), D;
        })() : null, null), ne(y, () => ro(_, t), null), Me((D) => Ke(y, s ? {
          color: s
        } : void 0, D)), y;
      })();
    };
  }
  return {
    ChangeCell: c
  };
}
export {
  sl as StkTable,
  oo as StkTableContext,
  wn as binarySearch,
  Hl as createChangeCell,
  Ll as createCheckboxCell,
  $l as createEditableCell,
  Ml as createFilterCell,
  Al as createNumberCell,
  ro as formatNumber,
  kl as insertToOrderedArray,
  Dl as registerFeature,
  vn as strCompare,
  xn as tableSort,
  dr as useAreaSelection,
  Sn as useStkTableContext
};
