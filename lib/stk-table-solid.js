import { createSignal as we, createMemo as G, createEffect as Ze, onMount as bt, onCleanup as Et, createContext as Yo, useContext as qo, createRoot as Go, on as ht, mergeProps as Uo, Show as _e, For as xt } from "solid-js";
import { template as fe, delegateEvents as Lt, insert as ne, memo as Ue, createComponent as Y, effect as Te, setAttribute as ft, style as ze, use as $t, addEventListener as Ct, spread as Vt, mergeProps as mn, className as Sn, setStyleProperty as It, render as jo, Dynamic as Zo } from "solid-js/web";
const Yn = 100, Jo = 100, Mn = 200, zt = 28, An = {
  light: { from: "#71a2fd", to: "#fff" },
  dark: { from: "#1e4c99", to: "#181c21" }
}, Qo = 2e3, er = "highlight-row", tr = "highlight-cell", qn = Zn("chrome"), nr = Zn("firefox"), or = qn < 56 || nr < 59, rr = qn < 85, lr = "stk", Hn = "expanded-", Gn = "--", Yt = {
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
  const { dataIndex: l, sortField: s, order: f } = t;
  let { sortType: S } = t;
  const w = s || l;
  S || (S = typeof e[w]);
  const g = S === "number", a = i.slice();
  if (!f || !a.length)
    return a.unshift(e), a;
  const { emptyToBottom: d, customCompare: x, stringLocaleCompare: _ } = { emptyToBottom: !1, ...r }, H = e[w];
  if (d && qt(H, g))
    a.push(e);
  else {
    const k = f === "asc", I = x || ((m, E) => {
      const C = m[w], R = wn(C, H, g, _);
      return k ? R : -R;
    }), b = Un(a, (m) => I(a[m], e));
    a.splice(b, 0, e);
  }
  return a;
}
function Un(t, e) {
  let i = 0, r = t.length - 1;
  for (; i <= r; ) {
    const l = Math.floor((i + r) / 2), s = e(l);
    if (s === 0) {
      i = l;
      break;
    } else s < 0 ? i = l + 1 : r = l - 1;
  }
  return i;
}
function wn(t, e, i, r = !1) {
  let l = t, s = e;
  if (i)
    l = +t, s = +e;
  else if (r)
    return String(t).localeCompare(e);
  return l > s ? 1 : l === s ? 0 : -1;
}
function ir(t, e, i) {
  const r = [], l = [], s = t.sortField || t.dataIndex;
  for (let f = 0, S = e.length; f < S; f++) {
    const w = e[f];
    qt(w == null ? void 0 : w[s], i) ? r.push(w) : l.push(w);
  }
  return [l, r];
}
function vn(t, e, i, r = {}) {
  if (!(i != null && i.length) || !t) return i || [];
  r = { ...Yt, ...r };
  let l = i.slice(), s = t.sortField || t.dataIndex;
  const { defaultSort: f, stringLocaleCompare: S, emptyToBottom: w, sortChildren: g } = r;
  if (!e && f && (e = f.order, s = f.dataIndex), typeof t.sorter == "function") {
    const a = t.sorter(l, { order: e, column: t });
    a && (l = a), g && l.forEach((d) => {
      var x;
      (x = d.children) != null && x.length && (d.children = vn(t, e, d.children, r));
    });
  } else if (e) {
    let { sortType: a } = t;
    a || (a = typeof i[0][s]);
    const d = a === "number", [x, _] = ir(t, l, d);
    e === "asc" ? x.sort((H, k) => wn(H[s], k[s], d, S)) : x.sort((H, k) => wn(k[s], H[s], d, S)), l = e === "desc" || w ? x.concat(_) : _.concat(x), g && l.forEach((H) => {
      var k;
      (k = H.children) != null && k.length && (H.children = vn(t, e, H.children, r));
    });
  }
  return l;
}
function jn(t, e = 0) {
  const i = [e];
  return t.forEach((r) => {
    var l;
    (l = r.children) != null && l.length && i.push(jn(r.children, e + 1));
  }), Math.max(...i);
}
function sn(t) {
  if (t === void 0) return;
  const e = Number(t);
  return t + (Number.isNaN(e) ? "" : "px");
}
function Zn(t) {
  try {
    const e = new RegExp(`${t}/\\d+`, "i"), i = navigator.userAgent.match(e);
    if (i)
      return +i[0].split("/")[1];
  } catch (e) {
    console.error("Cannot get version", e);
  }
  return 100;
}
function sr(t, e) {
  return t + Gn + e;
}
function St(t) {
  return t == null ? void 0 : t.closest("tr");
}
function cn(t) {
  return t == null ? void 0 : t.closest("th");
}
function Gt(t) {
  return t == null ? void 0 : t.closest("td");
}
function gt(t) {
  const e = St(t);
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
  return function(...s) {
    r = s, i || (l(), i = self.setTimeout(() => {
      l(), i = 0;
    }, e));
  };
}
function Jn(t) {
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
  const e = t.minWidth ?? t.width ?? Yn;
  return typeof e == "number" ? Math.floor(e) : parseInt(e);
}
function lt(t) {
  return (t == null ? void 0 : t.__W__) || Yn;
}
function ur() {
  let t = window.__STK_TB_ID_COUNT__;
  return t || (t = 0), t += 1, window.__STK_TB_ID_COUNT__ = t, lr + t.toString(36);
}
const Qn = "stkName";
function fr(t, e, i, r, l, s, f, S, w, g, a, d) {
  const k = "ArrowUp", I = "ArrowDown", b = "ArrowLeft", m = "ArrowRight", C = "Escape", p = "data-cs-s", v = "data-cs-t", T = "data-cs-b", $ = "data-cs-l", O = "data-cs-r", L = "data-rs-s", [D, Z] = we([]), [B, ge] = we(!1);
  let z = null, se = 0, Le = 0, We = 0;
  const ve = G(() => {
    if (typeof t.areaSelection == "boolean") {
      const F = t.areaSelection;
      return { enabled: F, keyboard: F, ctrl: F, shift: F, highlight: { cell: F, row: !1 } };
    }
    const { highlight: u, ...M } = t.areaSelection || {};
    return {
      enabled: !0,
      ctrl: !0,
      shift: !0,
      highlight: {
        cell: !0,
        row: !1,
        ...u
      },
      ...M
    };
  }), Be = G(() => ve().keyboard), it = G(() => ve().ctrl), N = G(() => ve().shift), K = G(() => {
    var u;
    return (u = ve().highlight) == null ? void 0 : u.cell;
  }), ie = G(() => {
    var u;
    return (u = ve().highlight) == null ? void 0 : u.row;
  }), ue = G(() => {
    const u = l(), M = /* @__PURE__ */ new Map();
    for (let F = 0; F < u.length; F++)
      M.set(s()(u[F]), F);
    return M;
  }), de = G(() => {
    var oe, J;
    const u = l(), M = new Array(u.length + 1).fill(0), F = new Array(u.length + 1).fill(0);
    let P = 0;
    for (let X = 0; X < u.length; X++)
      M[X] = P, ((oe = u[X]) == null ? void 0 : oe.fixed) === "left" && (P += lt(u[X]));
    M[u.length] = P;
    let re = 0;
    for (let X = u.length - 1; X >= 0; X--)
      F[X] = re, ((J = u[X]) == null ? void 0 : J.fixed) === "right" && (re += lt(u[X]));
    return (X) => [M[X] ?? 0, F[X + 1] ?? 0];
  });
  let he = /* @__PURE__ */ new Set();
  function Ie() {
    const u = D();
    if (!u.length) {
      he = /* @__PURE__ */ new Set();
      return;
    }
    const M = /* @__PURE__ */ new Set(), F = l(), P = r();
    for (const re of u) {
      const {
        begin: { row: oe, col: J },
        end: { row: X, col: Q }
      } = re.index, [U, q] = oe < X ? [oe, X] : [X, oe], [le, ee] = J < Q ? [J, Q] : [Q, J];
      for (let j = U; j <= q; j++) {
        const ce = P[j];
        if (ce)
          for (let be = le; be <= ee; be++) {
            const Pe = F[be];
            Pe && M.add(f(ce, Pe));
          }
      }
    }
    he = M;
  }
  function Oe() {
    const u = i();
    if (!u) return;
    const M = K(), F = ie(), P = u.querySelectorAll(`[${p}]`);
    for (let X = 0; X < P.length; X++) {
      const Q = P[X];
      Q.removeAttribute(p), Q.removeAttribute(v), Q.removeAttribute(T), Q.removeAttribute($), Q.removeAttribute(O);
    }
    const re = u.querySelectorAll(`[${L}]`);
    for (let X = 0; X < re.length; X++)
      re[X].removeAttribute(L);
    Ie();
    const oe = D();
    if (!oe.length) return;
    const J = u.querySelector(".stk-tbody-main");
    if (J) {
      if (F)
        for (const X of oe) {
          const { minRow: Q, maxRow: U } = xe(X);
          for (let q = Q; q <= U; q++) {
            const le = J.querySelector(`tr[data-row-i="${q}"]`);
            le && le.setAttribute(L, "");
          }
        }
      if (M) {
        const X = oe[oe.length - 1], { minRow: Q, maxRow: U, minCol: q, maxCol: le } = xe(X), ee = J.querySelectorAll("tr[data-row-i]");
        for (let j = 0; j < ee.length; j++) {
          const ce = ee[j], be = parseInt(ce.getAttribute("data-row-i"), 10);
          let Pe = !1;
          for (const Qe of oe) {
            const { minRow: Ge, maxRow: ct } = xe(Qe);
            if (be >= Ge && be <= ct) {
              Pe = !0;
              break;
            }
          }
          if (!Pe) continue;
          const Ke = ce.querySelectorAll("td[data-col-key]");
          for (let Qe = 0; Qe < Ke.length; Qe++) {
            const Ge = Ke[Qe], ct = Ge.getAttribute("data-col-key"), et = ue().get(ct);
            if (et === void 0 || et < 0) continue;
            const ye = r()[be], me = l();
            if (!ye || !me[et]) continue;
            const ot = f(ye, me[et]);
            if (!he.has(ot)) continue;
            if (Ge.setAttribute(p, ""), be >= Q && be <= U && et >= q && et <= le) {
              const Zt = be + (parseInt(Ge.getAttribute("rowspan") || "1", 10) || 1) - 1, Jt = et + (parseInt(Ge.getAttribute("colspan") || "1", 10) || 1) - 1;
              be === Q && Ge.setAttribute(v, ""), Zt === U && Ge.setAttribute(T, ""), et === q && Ge.setAttribute($, ""), Jt === le && Ge.setAttribute(O, "");
            }
          }
        }
      }
    }
  }
  Ze(() => {
    const u = D(), M = w(), F = g();
    u.length, u.length > 0 && JSON.stringify(u.map((P) => P.index)), F.scrollLeft, M.startIndex, M.endIndex, F.startIndex, F.endIndex, r().length, l().length, queueMicrotask(Oe);
  }), bt(() => {
    Se();
  }), Et(() => {
    pe();
  }), Ze(() => {
    const u = r().length, M = l().length;
    if (!ve().enabled || (z && (u === 0 || M === 0 ? z = null : (z.rowIndex = Re(z.rowIndex, 0, u - 1), z.colIndex = Re(z.colIndex, 0, M - 1))), !D().length)) return;
    if (u === 0 || M === 0) {
      At(), Je();
      return;
    }
    const F = u - 1, P = M - 1;
    let re = !1;
    const oe = [];
    for (const J of D()) {
      const { begin: X, end: Q } = J.index, U = Re(X.row, 0, F), q = Re(X.col, 0, P), le = Re(Q.row, 0, F), ee = Re(Q.col, 0, P);
      U !== X.row || q !== X.col || le !== Q.row || ee !== Q.col ? (re = !0, oe.push(Me(U, q, le, ee))) : oe.push(J);
    }
    re && (Z(oe), Je());
  });
  function Se() {
    var u;
    pe(), (u = i()) == null || u.addEventListener("keydown", yt);
  }
  function pe() {
    var u;
    (u = i()) == null || u.removeEventListener("keydown", yt), document.removeEventListener("mousemove", Ee), document.removeEventListener("mouseup", je), Tt();
  }
  function xe(u) {
    const { begin: M, end: F } = u.index;
    return {
      minRow: Math.min(M.row, F.row),
      maxRow: Math.max(M.row, F.row),
      minCol: Math.min(M.col, F.col),
      maxCol: Math.max(M.col, F.col)
    };
  }
  function Me(u, M, F, P) {
    return {
      index: {
        x: [M, P],
        y: [u, F],
        begin: { row: u, col: M },
        end: { row: F, col: P }
      }
    };
  }
  function Ae(u) {
    return u ? ue().get(u) ?? -1 : -1;
  }
  function Ye(u, M) {
    const F = r(), P = l(), re = F[u], oe = P[M];
    if (!re || !oe || !oe.mergeCells) return [1, 1];
    const { rowspan: J = 1, colspan: X = 1 } = oe.mergeCells({ row: re, col: oe, rowIndex: u, colIndex: M }) || {};
    return [J || 1, X || 1];
  }
  function ke(u) {
    var wt;
    const { minRow: M, maxRow: F, minCol: P, maxCol: re } = xe(u), oe = r(), J = l(), X = oe.length, Q = J.length, U = [];
    for (let ye = 0; ye < Q; ye++)
      (wt = J[ye]) != null && wt.mergeCells && U.push(ye);
    if (!U.length) return u;
    let [q, le, ee, j] = [M, F, P, re], ce = !0, be = 0;
    for (; ce && be++ < 100; ) {
      ce = !1;
      for (const ye of U) {
        if (ye < ee || ye > j) continue;
        const [me] = Ye(le, ye);
        me > 1 && le + me - 1 < X && le + me - 1 > le && (le = le + me - 1, ce = !0);
      }
      for (let ye = q; ye <= le; ye++) {
        const [, me] = Ye(ye, j);
        me > 1 && j + me - 1 < Q && j + me - 1 > j && (j = j + me - 1, ce = !0);
      }
      for (const ye of U)
        if (!(ye < ee || ye > j))
          for (let me = q - 1; me >= 0 && me > q - 500; me--) {
            const [ot] = Ye(me, ye);
            if (ot <= 1) continue;
            if (me + ot - 1 >= q)
              me < q && (q = me, ce = !0);
            else
              break;
          }
      for (let ye = q; ye <= le; ye++)
        for (let me = ee - 1; me >= 0 && me > ee - 500; me--) {
          const [, ot] = Ye(ye, me);
          if (ot <= 1) continue;
          if (me + ot - 1 >= ee)
            me < ee && (ee = me, ce = !0);
          else
            break;
        }
    }
    if (q === M && le === F && ee === P && j === re)
      return u;
    const { begin: Pe, end: Ke } = u.index, Qe = Pe.row < Ke.row || Pe.row === Ke.row ? q : le, Ge = Pe.row < Ke.row || Pe.row === Ke.row ? le : q, ct = Pe.col <= Ke.col ? ee : j, et = Pe.col <= Ke.col ? j : ee;
    return Me(Qe, ct, Ge, et);
  }
  function Ce(u) {
    let M = 0;
    const F = l();
    for (let P = 0; P < F.length; P++) {
      const re = lt(F[P]);
      if (P === u) return [M, re];
      M += re;
    }
    return [M, 0];
  }
  function He(u, M) {
    let F = 0, P = 0;
    switch (u) {
      case k:
        F = -1;
        break;
      case I:
        F = 1;
        break;
      case b:
        P = -1;
        break;
      case m:
        P = 1;
        break;
      case "Tab":
        P = M ? -1 : 1;
        break;
    }
    return [F, P];
  }
  function Re(u, M, F) {
    return Math.max(M, Math.min(u, F));
  }
  function mt(u, M, F, P, re) {
    return F >= re ? [Math.min(u + 1, P - 1), 0] : F < 0 ? [Math.max(u - 1, 0), re - 1] : [u, M];
  }
  function De(u, M, F) {
    const { top: P, bottom: re, left: oe, right: J } = F;
    let X = 0, Q = 0;
    if (M < P + 40) {
      const U = Math.max(0, P + 40 - M);
      Q = -Math.ceil(U / 40 * 15);
    } else if (M > re - 40) {
      const U = Math.max(0, M - (re - 40));
      Q = Math.ceil(U / 40 * 15);
    }
    if (u < oe + 40) {
      const U = Math.max(0, oe + 40 - u);
      X = -Math.ceil(U / 40 * 15);
    } else if (u > J - 40) {
      const U = Math.max(0, u - (J - 40));
      X = Math.ceil(U / 40 * 15);
    }
    return { deltaX: X, deltaY: Q };
  }
  function Xe(u) {
    if (!ve().enabled || u.button !== 0) return;
    const M = gt(u.target), F = Pt(u.target), P = Ae(F);
    if (M < 0 || P < 0) return;
    const re = u.ctrlKey || u.metaKey, oe = ke(Me(M, P, M, P));
    if (u.shiftKey && z && N()) {
      const J = D().slice(), X = ke(
        Me(z.rowIndex, z.colIndex, M, P)
      );
      J.length ? J[J.length - 1] = X : J.push(X), Z(J);
    } else
      z = { rowIndex: M, colIndex: P }, re && it() ? Z(D().concat([oe])) : Z([oe]);
    ge(!0), Le = u.clientX, We = u.clientY, document.addEventListener("mousemove", Ee), document.addEventListener("mouseup", je);
  }
  function Ee(u) {
    B() && (Le = u.clientX, We = u.clientY, Ve(u), nt());
  }
  function Ve(u) {
    const M = u.target;
    if (!M) return;
    const F = gt(M);
    if (Number.isNaN(F) || F < 0) return;
    const P = Pt(M), re = Ae(P);
    re < 0 || $e(F, re);
  }
  function $e(u, M) {
    if (!z) return;
    const F = ke(
      Me(z.rowIndex, z.colIndex, u, M)
    ), P = [...D()];
    P.length > 0 ? P[P.length - 1] = F : P.push(F), Z(P);
  }
  function nt() {
    const u = i();
    if (!u) return;
    const M = u.getBoundingClientRect(), { top: F, bottom: P, left: re, right: oe } = M, J = We < F + 40 || We > P - 40 || Le < re + 40 || Le > oe - 40;
    J && !se ? _t() : !J && se && Tt();
  }
  function _t() {
    const u = i();
    if (!u || !B()) {
      Tt();
      return;
    }
    const M = u.getBoundingClientRect(), { deltaX: F, deltaY: P } = De(Le, We, M);
    (F !== 0 || P !== 0) && (u.scrollTop += P, u.scrollLeft += F, Wt(u, M)), B() && (F !== 0 || P !== 0) ? se = requestAnimationFrame(_t) : se = 0;
  }
  function Wt(u, M) {
    const F = u.querySelector("thead"), { top: P, bottom: re, left: oe, right: J } = M, X = F ? P + F.offsetHeight : P, Q = Math.max(oe + 2, Math.min(Le, J - 2)), U = Math.max(X + 2, Math.min(We, re - 2)), q = document.elementFromPoint(Q, U);
    if (!q) return;
    const le = Gt(q), ee = St(q);
    if (!le || !ee) return;
    const j = gt(ee), ce = Pt(le), be = Ae(ce);
    Number.isNaN(j) || j < 0 || be < 0 || $e(j, be);
  }
  function Tt() {
    se && (cancelAnimationFrame(se), se = 0);
  }
  function je() {
    if (!B()) return;
    ge(!1), Tt(), document.removeEventListener("mousemove", Ee), document.removeEventListener("mouseup", je);
    const u = D();
    if (u.length) {
      const M = ke(u[u.length - 1]);
      if (M !== u[u.length - 1]) {
        const F = [...u];
        F[F.length - 1] = M, Z(F);
      }
    }
    Je();
  }
  function Je() {
    var u;
    (u = e.onAreaSelectionChange) == null || u.call(e, D());
  }
  function Mt() {
    const u = ve();
    return typeof u.formatCellForClipboard == "function" ? u.formatCellForClipboard : null;
  }
  function pt() {
    const u = D();
    if (!u.length) return "";
    const M = u[u.length - 1], { minRow: F, maxRow: P, minCol: re, maxCol: oe } = xe(M), J = r(), X = l(), Q = Mt(), U = [];
    for (let le = F; le <= P; le++) {
      const ee = J[le];
      if (!ee) continue;
      const j = [];
      for (let ce = re; ce <= oe; ce++) {
        const be = X[ce];
        if (!be) {
          j.push("");
          continue;
        }
        const Pe = ee[be.dataIndex];
        j.push(Q ? Q(ee, be, Pe) : Pe ? String(Pe) : "");
      }
      U.push(j.join("	"));
    }
    const q = U.join(`
`);
    return navigator.clipboard.writeText(q).catch(() => {
      console.warn("Failed to copy to clipboard");
    }), q;
  }
  function at() {
    const u = i(), M = document.activeElement;
    u && M && u.contains(M) && M !== u && u.focus({ preventScroll: !0 });
  }
  function yt(u) {
    if (!ve().enabled) return;
    const M = u.key;
    if (M === C || M === "Esc") {
      at(), D().length && u.preventDefault();
      return;
    }
    if ((u.ctrlKey || u.metaKey) && M === "c" && D().length) {
      pt(), u.preventDefault();
      return;
    }
    if (!Be()) return;
    const F = [k, I, b, m].includes(M), P = M === "Tab";
    if (!(F || P)) return;
    u.preventDefault();
    const oe = r().length, J = l().length;
    if (oe === 0 || J === 0) return;
    if (!D().length) {
      z = { rowIndex: 0, colIndex: 0 }, Z([Me(0, 0, 0, 0)]), Je(), ut(0, 0);
      return;
    }
    const [X, Q] = He(M, u.shiftKey);
    if (u.shiftKey && F && N()) {
      at();
      const U = [...D()], q = U.length > 0 ? U[U.length - 1] : null;
      if (!q) return;
      const { begin: le, end: ee } = q.index;
      let j = ee.row + X, ce = ee.col + Q;
      j = Re(j, 0, oe - 1), ce = Re(ce, 0, J - 1), U[U.length - 1] = Me(le.row, le.col, j, ce), Z(U), ut(j, ce);
    } else {
      at();
      const U = D(), q = U.length > 0 ? U[U.length - 1] : null, le = q ? xe(q).minRow : 0, ee = q ? xe(q).minCol : 0;
      let j = le + X, ce = ee + Q;
      if (j = Re(j, 0, oe - 1), ce = Re(ce, 0, J - 1), P) {
        const be = ee + Q, [Pe, Ke] = mt(le, ce, be, oe, J);
        j = Pe, ce = Ke;
      }
      z = { rowIndex: j, colIndex: ce }, Z([Me(j, ce, j, ce)]), ut(j, ce);
    }
    Je();
  }
  function ut(u, M) {
    const F = i();
    if (!F) return;
    const P = r()[u], re = l()[M];
    if (!P || !re) return;
    const oe = F.querySelector("thead"), J = oe ? oe.offsetHeight : 0, X = F.querySelector("tfoot"), Q = X ? X.offsetHeight : 0, U = w(), q = g(), le = t.scrollRowByRow, ee = U.rowHeight, j = u * ee, ce = j + ee, be = le ? U.scrollTop : F.scrollTop, Pe = be + U.containerHeight - J - Q;
    let Ke = null;
    j < be ? Ke = j : ce > Pe && (Ke = ce - (U.containerHeight - J - Q));
    const [Qe, Ge] = Ce(M), ct = Qe + Ge, et = F.scrollLeft, wt = et + q.containerWidth, [ye, me] = de()(M);
    let ot = null;
    Qe < et + ye ? ot = Qe - ye : ct > wt - me && (ot = ct - q.containerWidth + me), (Ke !== null || ot !== null) && S(Ke, ot);
  }
  function Ut() {
    const u = D();
    if (!u.length) return { rows: [], cols: [], ranges: [] };
    const M = r(), F = l(), P = /* @__PURE__ */ new Set(), re = /* @__PURE__ */ new Set();
    for (const X of u) {
      const { minRow: Q, maxRow: U, minCol: q, maxCol: le } = xe(X);
      for (let ee = Q; ee <= U; ee++) P.add(ee);
      for (let ee = q; ee <= le; ee++) re.add(ee);
    }
    const oe = [...P].sort((X, Q) => X - Q), J = [...re].sort((X, Q) => X - Q);
    return {
      rows: oe.map((X) => M[X]).filter(Boolean),
      cols: J.map((X) => F[X]).filter(Boolean),
      ranges: u.map((X) => ({ ...X }))
    };
  }
  function At() {
    Z([]), ge(!1);
  }
  function jt(u, M = {}) {
    if (!ve().enabled) return D();
    const { silent: F = !1, scrollToView: P = !1 } = M, re = r().length, oe = l().length;
    if (re <= 0 || oe <= 0)
      return At(), F || Je(), D();
    const J = re - 1, X = oe - 1;
    let Q = 0, U = J, q = 0, le = X;
    if (u) {
      const ee = u.begin, j = u.end ?? ee;
      Q = typeof ee.row == "number" ? ee.row : a(ee.row), U = typeof j.row == "number" ? j.row : a(j.row);
      const ce = typeof ee.col == "number" ? ee.col : ee.col ? d(ee.col) : void 0, be = typeof j.col == "number" ? j.col : j.col ? d(j.col) : void 0;
      ce !== void 0 ? (q = ce, le = be !== void 0 ? be : ce) : be !== void 0 && (q = 0, le = be);
    }
    return Q = Re(Q, 0, J), U = Re(U, 0, J), q = Re(q, 0, X), le = Re(le, 0, X), Z([Me(Q, q, U, le)]), z = { rowIndex: Q, colIndex: q }, ge(!1), P && ut(U, le), F || Je(), D();
  }
  return {
    config: ve,
    isSelecting: B,
    get: Ut,
    set: jt,
    clear: At,
    copy: pt,
    onMD: Xe
  };
}
const bn = "useAreaSelection";
fr[Qn] = bn;
const eo = {
  [bn]: ((t) => ("areaSelection" in t && console.warn("useAreaSelection is not registered"), {
    config: G(() => ({ enabled: !1 })),
    isSelecting: we(!1)[0],
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
    const r = i[Qn];
    if (!r) {
      console.warn("invalid feature");
      return;
    }
    eo[r] = i;
  });
}
var dr = /* @__PURE__ */ fe('<span class=drag-row-handle draggable=true><svg viewBox="0 0 1024 1024"width=20 height=20 fill=currentColor><path d="M640 853.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m-256 0a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z m256-256a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3zM384 341.3a85.3 85.3 0 1 1 85.3-85.3 85.3 85.3 0 0 1-85.3 85.3z">');
function Fn(t) {
  return (() => {
    var e = dr();
    return e.addEventListener("dragstart", (i) => {
      var r;
      return (r = t.onDragStart) == null ? void 0 : r.call(t, i);
    }), e;
  })();
}
var hr = /* @__PURE__ */ fe('<svg xmlns=http://www.w3.org/2000/svg width=16px height=16px viewBox="0 0 16 16"><polygon class=arrow-up fill=#757699 points="8 2 4.8 6 11.2 6"></polygon><polygon class=arrow-down transform="translate(8, 12) rotate(-180) translate(-8, -12) "points="8 10 4.8 14 11.2 14">');
function gr() {
  return hr();
}
var mr = /* @__PURE__ */ fe("<div class=stk-fold-icon>");
function xn(t) {
  return (() => {
    var e = mr();
    return e.$$click = (i) => {
      var r;
      return (r = t.onClick) == null ? void 0 : r.call(t, i);
    }, e;
  })();
}
Lt(["click"]);
var _r = /* @__PURE__ */ fe("<div><span>");
function wr(t) {
  return (() => {
    var e = _r(), i = e.firstChild;
    return ne(e, (() => {
      var r = Ue(() => t.row.children !== void 0);
      return () => r() && Y(xn, {
        onClick: (l) => {
          var s;
          return (s = t.onClick) == null ? void 0 : s.call(t, l);
        }
      });
    })(), i), ne(i, () => t.row[t.col.dataIndex] ?? ""), Te((r) => {
      var l = t.row[t.col.dataIndex] || "", s = t.row.__T_LV__ ? `padding-left:${t.row.__T_LV__ * 16}px` : "", f = t.row.children ? void 0 : "padding-left: 16px;";
      return l !== r.e && ft(e, "title", r.e = l), r.t = ze(e, s, r.t), r.a = ze(i, f, r.a), r;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), e;
  })();
}
const to = Yo(void 0);
function Cn() {
  return qo(to);
}
const tt = {
  TH: 0,
  TD: 1,
  /** tfoot */
  TF: 2
};
function vr(t, e, i, r) {
  let l = null, s = !1;
  Ze(() => {
    i.virtual ? f() : S();
  }), Ze(() => {
    i.virtualX ? f() : S();
  }), bt(() => {
    (i.virtual || i.virtualX) && f();
  }), Et(() => {
    S();
  });
  function f() {
    if (s && S(), window.ResizeObserver) {
      if (!t()) {
        Go((a) => {
          Ze(() => {
            t() && (a(), f());
          });
        });
        return;
      }
      l = new ResizeObserver(g), l.observe(t());
    } else
      window.addEventListener("resize", g);
    s = !0;
  }
  function S() {
    s && (l ? (l.disconnect(), l = null) : window.removeEventListener("resize", g), s = !1);
  }
  let w = 0;
  function g() {
    w && window.clearTimeout(w), w = window.setTimeout(() => {
      i.autoResize && (e(), typeof i.autoResize == "function" && i.autoResize()), w = 0;
    }, r);
  }
}
function xr(t, e, i, r, l, s, f, S) {
  const [w, g] = we(!1);
  let a = {
    currentCol: null,
    lastCol: null,
    startX: 0,
    startOffsetTableX: 0,
    revertMoveX: !1
  };
  const d = G(() => Object.prototype.toString.call(t.colResizable) === "[object Object]" ? (m) => !t.colResizable.disabled(m) : (m) => !!t.colResizable);
  bt(() => {
    x();
  }), Et(() => {
    _();
  });
  function x() {
    window.addEventListener("mousemove", k), window.addEventListener("mouseup", I);
  }
  function _() {
    window.removeEventListener("mousemove", k), window.removeEventListener("mouseup", I);
  }
  function H(m, E, C = !1) {
    if (!i()) return;
    m.stopPropagation(), m.preventDefault();
    const { clientX: R } = m, { scrollLeft: y, scrollTop: p } = i(), { left: v } = i().getBoundingClientRect(), T = r();
    let $ = !1;
    const O = s(), L = O(E), D = T.findIndex((z) => O(z) === L), Z = f().indexOf(E), B = Z !== -1;
    C ? B && E.fixed === "right" ? $ = !0 : D - 1 >= 0 && (E = T[D - 1]) : B && E.fixed === "right" && (E = f()[Z + 1] || E);
    const ge = R - v + y;
    if (g(!0), Object.assign(a, {
      currentCol: E,
      lastCol: b(E),
      startX: R,
      startOffsetTableX: ge,
      revertMoveX: $
    }), l()) {
      const z = l().style;
      z.display = "block", z.left = ge + "px", z.top = p + "px";
    }
  }
  function k(m) {
    if (!w()) return;
    m.stopPropagation(), m.preventDefault();
    const { lastCol: E, startX: C, startOffsetTableX: R } = a, { clientX: y } = m;
    let p = y - C;
    const v = lt(E), T = (E == null ? void 0 : E.minWidth) ?? t.colMinWidth;
    v + p < T && (p = -v);
    const $ = R + p;
    l() && (l().style.left = $ + "px");
  }
  function I(m) {
    var O, L;
    if (!w()) return;
    const { startX: E, lastCol: C, revertMoveX: R } = a, { clientX: y } = m, p = R ? E - y : y - E;
    let v = lt(C) + p;
    v < t.colMinWidth && (v = t.colMinWidth);
    const T = s(), $ = r().find((D) => T(D) === T(C));
    if ($ && ($.width = v + "px", S == null || S(), (O = e["onUpdate:columns"]) == null || O.call(e, t.columns.slice()), (L = e.onColResize) == null || L.call(e, { ...$ })), l()) {
      const D = l().style;
      D.display = "none", D.left = "0", D.top = "0";
    }
    g(!1), a = {
      currentCol: null,
      lastCol: null,
      startX: 0,
      startOffsetTableX: 0,
      revertMoveX: !1
    };
  }
  function b(m) {
    var E;
    if ((E = m == null ? void 0 : m.children) != null && E.length) {
      const C = m.children.slice(-1)[0];
      return b(C);
    }
    return m;
  }
  return [d, w, H];
}
function Cr(t, e, i, r, l, s) {
  const [f, S] = we([]), [w, g] = we([]), a = G(() => {
    const x = /* @__PURE__ */ new Map(), _ = f(), H = w(), k = e(), I = t.fixedColShadow, b = r();
    for (let m = 0, E = b.length; m < E; m++) {
      const C = b[m];
      for (let R = 0, y = C.length; R < y; R++) {
        const p = C[R], v = p.fixed, T = v && I && _.includes(p), $ = [];
        H.includes(p) && $.push("fixed-cell--active"), v && ($.push("fixed-cell"), $.push("fixed-cell--" + v)), T && $.push("fixed-cell--shadow"), x.set(k(p), $.join(" "));
      }
    }
    return x;
  });
  function d(x) {
    const _ = [], H = i();
    let k, I;
    if (x != null && x()) {
      const { containerWidth: C, scrollLeft: R } = x();
      k = C, I = R;
    } else {
      const { clientWidth: C, scrollLeft: R } = s();
      k = C, I = R;
    }
    const b = [], m = [], E = l().length;
    for (let C = 0; C < E; C++) {
      const R = l()[C];
      let y = 0;
      for (let p = 0, v = R.length; p < v; p++) {
        const T = R[p], $ = H(T), O = T.fixed === "left", L = T.fixed === "right";
        O && $ + I > y && (_.push(T), b[C] = T), y += lt(T), L && I + k - y < $ && (_.push(T), m[C] || (m[C] = T));
      }
    }
    t.fixedColShadow && S(b.concat(m).filter(Boolean)), g(_);
  }
  return [w, a, d];
}
function Sr(t, e, i, r, l, s, f) {
  function S(w, g, a = 0) {
    const { fixed: d } = g;
    if ((w === tt.TD || w === tt.TF) && !d) return "";
    const { headerRowHeight: x, rowHeight: _ } = t, H = d === "left", { scrollLeft: k, scrollWidth: I, offsetLeft: b, containerWidth: m } = l(), E = I - m - k;
    let C = "";
    if (w === tt.TH ? e() ? C += `top:${r().scrollTop}px;` : a && (C += `top:${a * (x ?? _)}px;`) : w === tt.TF && (C += "bottom:0;"), d)
      if (e())
        H ? C += `left:${k - (s() ? b : 0)}px;` : C += `right:${Math.max(E - (s() ? f() : 0), 0)}px;`;
      else {
        const R = i()(g) + "px";
        H ? C += `left:${R};` : C += `right:${R};`;
      }
    return C;
  }
  return S;
}
function br(t, e) {
  return G(() => {
    const r = {}, l = /* @__PURE__ */ new WeakMap(), s = e();
    return t().forEach((f) => {
      let S = 0, w = 0;
      for (let a = 0; a < f.length; a++) {
        const d = f[a];
        if (d.fixed === "left") {
          const x = s(d);
          x ? r[x] = S : l.set(d, S), S += lt(d);
        }
        !w && d.fixed === "right" && (w = a);
      }
      let g = 0;
      for (let a = f.length - 1; a >= w; a--) {
        const d = f[a], x = s(d);
        d.fixed === "right" && (x ? r[x] = g : l.set(d, g), g += lt(d));
      }
    }), (f) => {
      const S = s(f);
      return S ? r[S] : l.get(f) || 0;
    };
  });
}
function Er(t, e, i) {
  const r = t.highlightConfig, l = {
    light: An.light,
    dark: An.dark
  }, s = G(() => r.duration ? r.duration * 1e3 : Qo), f = G(() => r.fps && r.fps > 0 ? 1e3 / r.fps : null), S = G(() => f() ? Math.round(s() / f()) : null), w = G(() => l[t.theme].from), g = /* @__PURE__ */ new Map();
  let a = !1;
  const d = /* @__PURE__ */ new Map(), x = /* @__PURE__ */ new Map(), _ = G(() => {
    const C = { backgroundColor: [w(), ""] };
    return S() && (C.easing = `steps(${S()})`), { duration: s(), keyframe: C };
  });
  function H() {
    if (a) return;
    a = !0;
    const C = () => {
      window.requestAnimationFrame(
        () => {
          const R = performance.now(), y = [];
          g.forEach((p, v) => {
            const { ts: T, duration: $ } = p, O = R - T;
            O < $ ? E(v, p, O) && y.push(v) : y.push(v);
          }), y.forEach((p) => g.delete(p)), g.size ? C() : (a = !1, g.clear());
        }
      );
    };
    C();
  }
  function k(C, R, y = {}) {
    var L;
    const p = (L = i()) == null ? void 0 : L.querySelector(`[data-row-key="${C}"] [data-col-key="${R}"]`);
    if (!p) return;
    const { className: v, method: T, duration: $, keyframe: O } = {
      className: tr,
      method: "animation",
      ..._(),
      ...y
    };
    T === "animation" ? p.animate(O, $) : m(p, C, R, v, $);
  }
  function I(C, R = {}) {
    if (Array.isArray(C) || (C = [C]), !C.length) return;
    const { className: y, method: p, keyframe: v, duration: T } = {
      className: er,
      method: "animation",
      ..._(),
      ...R
    }, $ = !!R.ignoreInvisible;
    if (p === "animation")
      if (t.virtual) {
        const O = performance.now();
        for (let L = 0; L < C.length; L++) {
          const D = C[L], Z = { ts: O, visible: !1, keyframe: v, duration: T, ignoreInvisible: $ }, B = E(D, Z, 0);
          $ && B ? g.delete(D) : g.set(D, Z);
        }
        H();
      } else
        for (let O = 0; O < C.length; O++) {
          const L = document.getElementById(e + "-" + String(C[O]));
          L && L.animate(v, T);
        }
    else
      b(C, y, T);
  }
  function b(C, R, y) {
    var T;
    let p = !1;
    const v = [];
    for (let $ = 0; $ < C.length; $++) {
      const O = C[$], L = document.getElementById(e + "-" + String(O));
      L && (L.classList.contains(R) && (L.classList.remove(R), p = !0), v.push(L), window.clearTimeout(d.get(O)), d.set(
        O,
        window.setTimeout(() => {
          L.classList.remove(R), d.delete(O);
        }, y)
      ));
    }
    p && ((T = i()) == null || T.offsetWidth), v.forEach(($) => $.classList.add(R));
  }
  function m(C, R, y, p, v) {
    C.classList.contains(p) && (C.classList.remove(p), C.offsetHeight), C.classList.add(p);
    const T = `${R}-${y}`;
    window.clearTimeout(x.get(T)), v && x.set(
      T,
      window.setTimeout(() => {
        C.classList.remove(p), x.delete(T);
      }, v)
    );
  }
  function E(C, R, y) {
    const p = document.getElementById(e + "-" + String(C)), { visible: v, ignoreInvisible: T } = R;
    if (!p)
      return T ? !0 : (v && (R.visible = !1), !1);
    const { keyframe: $, duration: O } = R;
    if (!v) {
      R.visible = !0;
      const L = y / O;
      p.animate($, {
        duration: O - y,
        /** 从什么时候开始，0-1 */
        iterationStart: L,
        /** 持续多久 0-1 */
        iterations: 1 - L
      });
    }
    return !1;
  }
  return [S, I, k];
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
function pr(t, e, i, r, l, s, f, S) {
  let w = !1;
  Ze(
    ht(f, (k) => {
      a(), k && g();
    })
  ), bt(g), Et(a);
  function g() {
    var k, I, b;
    window.addEventListener("keydown", d), (k = t()) == null || k.addEventListener("mouseenter", x), (I = t()) == null || I.addEventListener("mouseleave", _), (b = t()) == null || b.addEventListener("mousedown", H);
  }
  function a() {
    var k, I, b;
    window.removeEventListener("keydown", d), (k = t()) == null || k.removeEventListener("mouseenter", x), (I = t()) == null || I.removeEventListener("mouseleave", _), (b = t()) == null || b.removeEventListener("mousedown", H);
  }
  function d(k) {
    if (!f() || S().keyboard) return;
    const I = k.code;
    if (!Tr.includes(I) || !w) return;
    k.preventDefault();
    const { scrollTop: b, rowHeight: m, containerHeight: E, scrollHeight: C } = r(), { scrollLeft: R } = l(), { headless: y, headerRowHeight: p } = e, v = y ? 0 : s().length * (p || m), T = Math.floor((E - v) / m);
    I === dt.ArrowUp ? i(b - m, null) : I === dt.ArrowRight ? i(null, R + 50) : I === dt.ArrowDown ? i(b + m, null) : I === dt.ArrowLeft ? i(null, R - 50) : I === dt.PageUp ? i(b - m * T + v, null) : I === dt.PageDown ? i(b + m * T - v, null) : I === dt.Home ? i(0, null) : I === dt.End && i(C, null);
  }
  function x() {
    w = !0;
  }
  function _() {
    w = !1;
  }
  function H() {
    w || (w = !0);
  }
}
function yr(t, e, i, r) {
  const l = /* @__PURE__ */ new Map();
  function s() {
    if (!t.virtual) {
      l.size && l.clear();
      return;
    }
    l.clear();
    const f = r(), w = e().filter((d) => d.mergeCells);
    if (!w.length) return;
    const g = f.length, a = w.length;
    for (let d = 0; d < g; d++) {
      const x = f[d], _ = i(x);
      let H = l.get(_) || 0;
      for (let k = 0; k < a; k++) {
        const I = w[k], { rowspan: b = 1 } = I.mergeCells({ row: x, col: I, rowIndex: d, colIndex: k }) || {};
        b > 1 && b > H && (H = b, l.set(_, H));
      }
    }
  }
  return [l, s];
}
function Rr(t, e, i, r, l) {
  const [s, f] = we(null), [S, w] = we({}), [g, a] = we(/* @__PURE__ */ new Set()), [d, x] = we(/* @__PURE__ */ new Set());
  let _ = null;
  Ze(() => {
    l(), e(), f(null), w({}), _ = null;
  });
  function H(E, C, R, y = !1, p) {
    const v = e(), T = r();
    let $ = _ == null ? void 0 : _.get(C);
    if ($ === void 0) {
      if ($ = v.findIndex((z) => T(z) === C), $ < 0) return;
      _ || (_ = /* @__PURE__ */ new Map()), _.set(C, $);
    }
    const O = S(), L = s();
    O[E] || (O[E] = /* @__PURE__ */ new Set());
    let D = L;
    D || (D = {}, f(D)), D[E] || (D[E] = /* @__PURE__ */ new Set());
    const Z = O[E], B = D[E], ge = Math.min($ + R, v.length);
    for (let z = $; z < ge; z++) {
      if (Z.add(p), y && z === $)
        continue;
      const se = v[z];
      if (!se) break;
      const Le = T(se);
      B.add(Le);
    }
  }
  function k(E, C, R, y) {
    if (!C.mergeCells) return;
    let { colspan: p, rowspan: v } = C.mergeCells({ row: E, col: C, rowIndex: R, colIndex: y }) || {};
    if (p = p || 1, v = v || 1, p === 1 && v === 1) return;
    const T = i(E), $ = r()(C), O = sr(T, $);
    for (let L = R; L < R + v; L++) {
      const D = l()[L];
      if (!D) break;
      H(i(D), $, p, L === R, O);
    }
    return { colspan: p, rowspan: v };
  }
  const I = /* @__PURE__ */ new Set();
  function b(E) {
    a(E === void 0 ? I : S()[E] || I);
  }
  function m(E, C) {
    if (t().enabled) {
      if (E) {
        x(/* @__PURE__ */ new Set());
        return;
      }
      x(C !== void 0 && S()[C] || new Set(g()));
    }
  }
  return [s, k, g, b, d, m];
}
function kr(t, e, i, r, l) {
  const s = "__EXP__";
  function f(g, a) {
    return (g == null ? void 0 : g[s]) === a ? !(g != null && g[s]) : !0;
  }
  function S(g, a) {
    const d = f(g, a);
    w(g, d, { col: a });
  }
  function w(g, a, d) {
    var b;
    let x;
    typeof g == "string" ? x = g : x = r(g);
    const _ = e().slice(), H = _.findIndex((m) => r(m) === x);
    if (H === -1) {
      console.warn("expandRow failed.rowKey:", x);
      return;
    }
    for (let m = H + 1; m < _.length; m++) {
      const C = _[m].__R_K__;
      if (C != null && C.startsWith(Hn))
        _.splice(m, 1), m--;
      else
        break;
    }
    const k = _[H], I = d == null ? void 0 : d.col;
    if (a == null && (a = f(k, I)), a) {
      const m = {
        __R_K__: Hn + x,
        __EXP_R__: k,
        __EXP_C__: I
      };
      _.splice(H + 1, 0, m);
    }
    k && (k[s] = a ? I : void 0), i(_), l(), d != null && d.silent || (b = t.onToggleRowExpand) == null || b.call(t, { expanded: !!a, row: k, col: I });
  }
  return [S, w];
}
function Dr() {
  return typeof window > "u" ? !1 : window.matchMedia("(hover: none) and (pointer: coarse)").matches;
}
function Ir(t, e, i, r, l, s, f) {
  const [S, w] = we({ x: !1, y: !1 }), [g, a] = we({ h: 0, w: 0, t: 0, l: 0 });
  let d = !1, x = !1, _ = 0, H = 0, k = 0, I = 0, b = null, m, E = !1;
  const C = cr(() => y(), 200), R = Jn((B) => l(B));
  bt(() => {
    E = Dr(), s().enabled && !E && (b = new ResizeObserver(C), b.observe(e())), Z();
  }), Et(() => {
    L(), b == null || b.disconnect(), b = null;
  });
  function y() {
    if (!s().enabled || E) return;
    const { scrollHeight: B, scrollTop: ge, containerHeight: z } = i(), { scrollWidth: se, scrollLeft: Le, containerWidth: We } = r(), ve = B > z, Be = se > We;
    if (w({ x: Be, y: ve }), ve) {
      const it = z / B;
      a((N) => {
        const K = Math.max(s().minHeight, it * z), ie = Math.round(ge / (B - z) * (z - K));
        return { ...N, h: K, t: ie };
      });
    }
    if (Be) {
      const it = We / se;
      a((N) => {
        const K = Math.max(s().minWidth, it * We), ie = Math.round(Le / (se - We) * (We - K));
        return { ...N, w: K, l: ie };
      });
    }
  }
  function p(B) {
    B instanceof MouseEvent && B.preventDefault(), d = !0;
    const { scrollTop: ge } = i();
    k = ge, _ = B instanceof MouseEvent ? B.clientY : B.touches[0].clientY, T($);
  }
  function v(B) {
    B instanceof MouseEvent && B.preventDefault(), x = !0;
    const { scrollLeft: ge } = r();
    I = ge, H = B instanceof MouseEvent ? B.clientX : B.touches[0].clientX, T(O);
  }
  function T(B) {
    D(), m = B, document.addEventListener("mousemove", B), document.addEventListener("mouseup", L), document.addEventListener("touchmove", B, { passive: !1 }), document.addEventListener("touchend", L);
  }
  function $(B) {
    if (!d) return;
    B.preventDefault();
    const z = (B instanceof MouseEvent ? B.clientY : B.touches[0].clientY) - _, { scrollHeight: se, containerHeight: Le } = i(), We = se - Le, ve = Le - g().h, Be = z / ve * We;
    if (f()) {
      const it = Le / se, N = Math.round((k + Be) * it), K = Le - g().h;
      a((ie) => ({ ...ie, t: N < 0 ? 0 : N > K ? K : N })), R(k + Be);
    } else
      e().scrollTop = k + Be;
  }
  function O(B) {
    if (!x) return;
    B.preventDefault();
    const z = (B instanceof MouseEvent ? B.clientX : B.touches[0].clientX) - H, { scrollWidth: se, containerWidth: Le } = r(), We = se - Le, ve = Le - g().w, Be = z / ve * We;
    e().scrollLeft = I + Be;
  }
  function L() {
    d = !1, x = !1, D(), document.removeEventListener("mouseup", L), document.removeEventListener("touchend", L);
  }
  function D() {
    m && (document.removeEventListener("mousemove", m), document.removeEventListener("touchmove", m), m = void 0);
  }
  function Z() {
    queueMicrotask(y);
  }
  return [g, S, p, v, y];
}
function $r(t) {
  const [e, i] = we(t);
  let r = 0;
  function l(s) {
    e() && !s ? (r && window.clearTimeout(r), r = window.setTimeout(() => {
      i(s), r = 0;
    }, 300)) : (r && (window.clearTimeout(r), r = 0), i(s));
  }
  return [e, l];
}
function Lr(t, e) {
  let i = !1;
  const [r, l] = $r(!1), s = G(() => t.scrollRowByRow === "scrollbar"), f = G(() => s() ? r() : t.scrollRowByRow);
  Ze(
    ht(s, (d) => {
      d ? S() : w();
    })
  ), bt(() => {
    S();
  }), Et(() => {
    w();
  });
  function S() {
    if (i || !s()) return;
    const d = e();
    d && (d.addEventListener("mousedown", g), d.addEventListener("mouseup", a), i = !0);
  }
  function w() {
    const d = e();
    d && (d.removeEventListener("mousedown", g), d.removeEventListener("mouseup", a), i = !1);
  }
  function g(d) {
    d.target.classList.contains("stk-table") && l(!0);
  }
  function a() {
    l(!1);
  }
  return [f];
}
const Bt = [null, "desc", "asc"];
function Mr(t, e, i, r, l, s) {
  const [f, S] = we([]), w = G(() => t.sortConfig.multiSort ?? !1), g = G(() => t.sortConfig.multiSortLimit ?? 3), a = G(() => {
    var y;
    return (y = f()[0]) == null ? void 0 : y.dataIndex;
  });
  function d(y) {
    return f()[x(y)];
  }
  function x(y) {
    return f().findIndex((p) => p.key === y || p.dataIndex === y);
  }
  function _(y) {
    return r().find((p) => y.key && i()(p) === y.key || p.dataIndex === y.dataIndex);
  }
  function H() {
    return f().map((y) => ({ key: y.key || y.dataIndex, order: y.order }));
  }
  function k(y, p) {
    const v = f().slice(), T = v.findIndex(($) => $.key === (y.key || y.dataIndex) || $.dataIndex === (y.key || y.dataIndex));
    T >= 0 && v.splice(T, 1), p && w() ? (v.length >= g() && v.pop(), v.unshift(y), S(v)) : S([y]);
  }
  function I(y, p) {
    const v = i()(y), T = x(v);
    let $;
    const O = p.defaultSort;
    if (T >= 0) {
      const L = f()[T].order;
      if (L && O && (O.key === v || O.dataIndex === y.dataIndex)) {
        const D = Bt.filter((B) => B !== null), Z = D.indexOf(L);
        $ = D[(Z + 1) % D.length];
      } else {
        const D = Bt.indexOf(L);
        $ = Bt[(D + 1) % 3];
      }
      if ($) {
        const D = { ...f()[T], order: $ };
        k(D, 1);
      } else {
        const D = f().slice();
        if (D.splice(T, 1), S(D), O != null && O.order) {
          const Z = _(O), { key: B, sortField: ge, sortType: z } = Z || {};
          k({ key: B, sortField: ge, sortType: z, ...O }, 1);
        }
      }
    } else {
      $ = Bt[1];
      const L = {
        key: v,
        dataIndex: y.dataIndex,
        sortField: y.sortField,
        sortType: y.sortType,
        order: $
      };
      k(L, 1);
    }
    return $;
  }
  function b(y) {
    if (!f().length) return y;
    const p = { ...Yt, ...t.sortConfig };
    let v = y.slice();
    const T = f();
    for (let $ = T.length - 1; $ >= 0; $--) {
      const O = T[$], L = _(O);
      if (L && O.order) {
        const D = { ...p, ...L.sortConfig };
        v = vn(L, O.order, v, D);
      }
    }
    return v;
  }
  function m(y) {
    var T;
    if (!y) {
      console.warn("onColumnSort: not found col:", y);
      return;
    }
    if (!y.sorter)
      return;
    const p = { ...Yt, ...t.sortConfig, ...y.sortConfig }, v = I(y, p);
    t.sortRemote || s(), (T = e.onSortChange) == null || T.call(e, y, v, l(), p);
  }
  function E(y, p, v = {}) {
    var L, D;
    const T = { silent: !0, sortOption: null, sort: !0, append: !1, ...v }, $ = i();
    let O;
    if (p) {
      if (O = T.sortOption || r().find((Z) => $(Z) === y), O) {
        const Z = {
          key: y,
          dataIndex: O.dataIndex,
          sortField: O.sortField,
          sortType: O.sortType,
          order: p
        }, B = T.append && w() ? 1 : 0;
        k(Z, B);
      }
    } else
      S([]);
    return T.sort && ((L = l()) != null && L.length) && (!t.sortRemote || T.force) && s(t.dataSource, { forceSort: T.force }), T.silent || (O || (O = T.sortOption || r().find((Z) => $(Z) === y)), O ? (D = e.onSortChange) == null || D.call(e, O, p, l(), t.sortConfig) : console.warn("Can not find column by key:", y)), l();
  }
  function C() {
    S([]), s();
  }
  function R() {
    if (!t.sortConfig.defaultSort) return;
    const { key: y, dataIndex: p, order: v, silent: T } = { silent: !0, ...t.sortConfig.defaultSort };
    E(y || p, v, { force: !1, silent: T });
  }
  return [f, a, m, E, C, H, R, d, b];
}
function Ar(t, e) {
  const [i, r] = we([]), [l, s] = we([]);
  function f(S) {
    const w = [], g = [];
    let a = S;
    if (e()) {
      const H = [], k = [], I = [];
      for (let b = 0, m = a.length; b < m; b++) {
        const E = a[b];
        E.fixed === "left" ? H.push(E) : E.fixed === "right" ? I.push(E) : k.push(E);
      }
      a = H.concat(k).concat(I);
    }
    const d = jn(a);
    for (let H = 0; H <= d; H++)
      w[H] = [], g[H] = [];
    let x = 0;
    function _(H, k, I = 0) {
      let b = 0, m = 0;
      for (let E = 0, C = H.length; E < C; E++) {
        const R = H[E];
        if (R.hidden) continue;
        R.__P__ = k, R.__LF_S__ = x;
        let y = 1, p = 0;
        if (R.children) {
          const [$, O] = _(R.children, R, I + 1);
          y = $, p = O, g[I].push(R);
        } else {
          p = ar(R), x++;
          for (let $ = I; $ <= d; $++)
            g[$].push(R);
        }
        R.__LF_E__ = x, R.__W__ = p, w[I].push(R);
        const v = R.children ? 1 : d - I + 1, T = y;
        v > 1 && (R.__R_SP__ = v), T > 1 && (R.__C_SP__ = T), b += y, m += p;
      }
      return [b, m];
    }
    _(a, null), r(w), s(g);
  }
  return [i, l, f];
}
function Hr(t, e, i) {
  const r = G(() => {
    const g = t.headerDrag;
    return {
      draggable: g !== !1,
      mode: "insert",
      disabled: () => !1,
      ...g
    };
  });
  function l(g) {
    var _;
    const a = cn(g.target);
    if (!a) return;
    const d = a.dataset.colKey || "", x = g.dataTransfer;
    x && (x.effectAllowed = "move", x.setData("text/plain", d)), (_ = e.onThDragStart) == null || _.call(e, d);
  }
  function s(g) {
    const a = cn(g.target);
    if (!a || !(a.getAttribute("draggable") === "true")) return;
    const x = g.dataTransfer;
    x && (x.dropEffect = "move"), g.preventDefault();
  }
  function f(g) {
    var x, _;
    const a = cn(g.target);
    if (!a) return;
    const d = (x = g.dataTransfer) == null ? void 0 : x.getData("text");
    d !== a.dataset.colKey && S(d, a.dataset.colKey), (_ = e.onThDrop) == null || _.call(e, a.dataset.colKey);
  }
  function S(g, a) {
    var d, x;
    if (!(qt(g) || qt(a))) {
      if (r().mode !== "none") {
        const _ = t.columns.slice(), H = _.findIndex((b) => i()(b) === g), k = _.findIndex((b) => i()(b) === a);
        if (H === -1 || k === -1) return;
        const I = _[H];
        r().mode === "swap" ? (_[H] = _[k], _[k] = I) : (_.splice(H, 1), _.splice(k, 0, I)), (d = e["onUpdate:columns"]) == null || d.call(e, _);
      }
      (x = e.onColOrderChange) == null || x.call(e, g, a);
    }
  }
  function w(g) {
    return r().draggable && !r().disabled(g);
  }
  return [l, s, f, w];
}
const On = "tr-dragging", an = "tr-dragging-over", Pn = "text/plain";
function Fr(t, e, i, r) {
  let l = !1;
  const s = G(() => ({ mode: "insert", ...t.dragRowConfig }));
  function f(x, _) {
    var I;
    const H = St(x.target);
    if (H) {
      const b = H.getBoundingClientRect(), m = x.clientX - (b.left ?? 0);
      (I = x.dataTransfer) == null || I.setDragImage(H, m, b.height / 2), H.classList.add(On);
    }
    const k = x.dataTransfer;
    k && (k.effectAllowed = "move", k.setData(Pn, String(_))), l = !0;
  }
  function S(x) {
    if (!l) return;
    x.preventDefault();
    const _ = x.dataTransfer;
    _ && (_.dropEffect = "move");
  }
  let w = null;
  function g(x) {
    if (!l) return;
    x.preventDefault();
    const _ = St(x.target);
    w && w !== _ && w.classList.remove(an), _ && (w = _, _.classList.add(an));
  }
  function a(x) {
    if (!l) return;
    const _ = St(x.target);
    _ && _.classList.remove(On), w && (w.classList.remove(an), w = null), l = !1;
  }
  function d(x, _) {
    var m;
    if (!l) return;
    const H = x.dataTransfer;
    if (!H) return;
    const k = s().mode, I = Number(H.getData(Pn)), b = _;
    if (I !== b) {
      if (k !== "none") {
        const E = i().slice(), C = E[I];
        k === "swap" ? (E[I] = E[b], E[b] = C) : (E.splice(I, 1), E.splice(b, 0, C)), r(E);
      }
      (m = e.onRowOrderChange) == null || m.call(e, I, b);
    }
  }
  return [f, g, S, d, a];
}
function Or(t, e, i, r, l, s) {
  const { defaultExpandAll: f, defaultExpandKeys: S, defaultExpandLevel: w } = t.treeConfig;
  let g = !0;
  function a(m, E) {
    const C = m ? !m.__T_EXP__ : !1;
    d(m, { expand: C, col: E, isClick: !0 });
  }
  function d(m, E) {
    var y;
    const C = Array.isArray(m) ? m : [m], R = e().slice();
    for (let p = 0; p < C.length; p++) {
      const v = C[p];
      let T;
      typeof v == "string" ? T = v : T = r(v);
      const $ = R.findIndex((Z) => r(Z) === T);
      if ($ === -1) {
        console.warn("treeExpandRow failed.rowKey:", T);
        return;
      }
      const O = R[$], L = O.__T_LV__ || 0;
      let D = E == null ? void 0 : E.expand;
      if (D === void 0 && (D = !O.__T_EXP__), D) {
        const Z = I(O, L);
        R.splice($ + 1, 0, ...Z);
      } else {
        const Z = b($, R, L);
        R.splice($ + 1, Z);
      }
      _(O, D, L), E.isClick && ((y = l.onToggleTreeExpand) == null || y.call(l, { expanded: !!D, row: O, col: E.col }));
    }
    i(R), s();
  }
  function x(m, E) {
    d(m, { ...E, isClick: !1 });
  }
  function _(m, E, C, R) {
    m.__T_EXP__ = E, C !== void 0 && (m.__T_LV__ = C);
  }
  function H(m, E, C) {
    if (!m) return [];
    let R = [];
    for (let y = 0; y < m.length; y++) {
      const p = m[y];
      R.push(p);
      const v = !!p.__T_EXP__;
      if (_(p, v, E), g && !v && (f ? _(p, !0) : (w && E < w && _(p, !0), S != null && S.includes(r(p)) && _(p, !0))), p.__T_EXP__) {
        const T = H(p.children, E + 1);
        R = R.concat(T);
      }
    }
    return R;
  }
  function k(m) {
    const E = H(m, 0);
    return g = !1, E;
  }
  function I(m, E) {
    let C = [];
    return m.children && m.children.forEach((R) => {
      C.push(R);
      const y = E + 1;
      if (R.__T_EXP__ && R.children) {
        const p = I(R, y);
        C = C.concat(p);
      } else
        _(R, !1, y);
    }), C;
  }
  function b(m, E, C) {
    let R = 0;
    for (let y = m + 1; y < E.length; y++) {
      const p = E[y];
      if (p.__T_LV__ && p.__T_LV__ > C)
        R++;
      else
        break;
    }
    return R;
  }
  return [a, x, k];
}
function Pr(t) {
  let e = { cols: null, nonFixedCols: [], leftFixedCols: [] };
  function i(s) {
    const f = [], S = [];
    let w = 0;
    for (let g = 0; g < s.length; g++) {
      const a = s[g], d = t(a);
      if (a.fixed === "left") {
        S.push({ index: g, width: d });
        continue;
      }
      w += d, f.push({ index: g, cumWidth: w });
    }
    return e = { cols: s, nonFixedCols: f, leftFixedCols: S }, e;
  }
  function r(s) {
    return e.cols === s ? e : i(s);
  }
  function l() {
    e.cols = null;
  }
  return [r, l];
}
const Wn = 200;
function Wr(t, e, i, r, l, s, f, S, w, g) {
  const a = G(() => t.headerRowHeight * s().length), [d, x] = we({
    containerHeight: 0,
    rowHeight: t.rowHeight,
    pageSize: 0,
    startIndex: 0,
    endIndex: 0,
    offsetTop: 0,
    scrollTop: 0,
    scrollHeight: 0,
    translateY: 0
  }), [_, H] = we({
    containerWidth: 0,
    scrollWidth: 0,
    startIndex: 0,
    endIndex: 0,
    offsetLeft: 0,
    scrollLeft: 0
  }), [k, I] = Pr(lt), b = G(() => l().some((N) => N.type === "expand")), m = G(() => t.virtual && r().length > d().pageSize), E = G(() => {
    if (!m()) return r();
    const { startIndex: N, endIndex: K } = d();
    return r().slice(N, K + 1);
  }), C = G(() => {
    if (!m()) return 0;
    const { startIndex: N, endIndex: K } = d(), ie = r(), ue = L()();
    if (t.autoRowHeight) {
      let de = 0;
      for (let he = K + 1; he < ie.length; he++) {
        const Ie = L()(ie[he]);
        de += Ie;
      }
      return de;
    }
    return (ie.length - N - E().length) * ue;
  }), R = G(() => t.virtualX && l().reduce((N, K) => N += lt(K), 0) > _().containerWidth + 100), y = G(() => s().length > 1), p = G(() => {
    if (!R() || !y())
      return {
        startIndex: _().startIndex,
        endIndex: _().endIndex,
        offsetLeft: _().offsetLeft
      };
    const { scrollLeft: N, containerWidth: K } = _(), ie = s()[0], ue = l().length;
    let de = 0, he = ue, Ie = 0, Oe = 0, Se = !1;
    for (let pe = 0, xe = ie.length; pe < xe; pe++) {
      const Me = ie[pe];
      if (Me.fixed === "left" || Me.fixed === "right") continue;
      const Ae = Me.__W__ || lt(Me), Ye = Oe + Ae;
      if (!Se && Ye > N && (Se = !0, de = Me.__LF_S__ ?? 0, Ie = Oe), Oe = Ye, he = Me.__LF_E__ ?? ue, Se && Ye >= N + K)
        break;
    }
    return Se || (de = ue, Ie = Oe), { startIndex: de, endIndex: he, offsetLeft: Ie };
  }), v = G(() => {
    const N = l();
    if (R()) {
      const { startIndex: K, endIndex: ie } = _(), ue = N.length, de = Math.min(ie, ue), he = Math.min(K, ue);
      if (y()) {
        const pe = [], xe = [], Me = [];
        for (let He = 0; He < N.length; He++) {
          const Re = N[He];
          Re.fixed === "right" ? xe.push(Re) : Re.fixed === "left" ? pe.push(Re) : He >= he && He < de && Me.push(Re);
        }
        const Ae = [];
        Ae.push(...pe);
        const Ye = p().startIndex, ke = Math.max(0, K - Ye);
        ke && Ae.push({ __VT_C_SP__: ke }), Ae.push(...Me);
        const Ce = Math.max(0, p().endIndex - ie);
        return Ce && Ae.push({ __VT_C_SP__: Ce }), Ae.push(...xe), Ae;
      }
      const Ie = [], Oe = [];
      for (let pe = 0; pe < he; pe++) {
        const xe = N[pe];
        (xe == null ? void 0 : xe.fixed) === "left" && Ie.push(xe);
      }
      for (let pe = de; pe < N.length; pe++) {
        const xe = N[pe];
        (xe == null ? void 0 : xe.fixed) === "right" && Oe.push(xe);
      }
      const Se = N.slice(he, de);
      return Ie.concat(Se).concat(Oe);
    }
    return N;
  }), T = G(() => {
    if (!R()) return s();
    if (y()) {
      const { startIndex: K, endIndex: ie } = p();
      return s().map((ue) => ue.filter((de) => {
        if (de.fixed === "left" || de.fixed === "right") return !0;
        const he = de.__LF_S__ ?? 0;
        return (de.__LF_E__ ?? he + 1) > K && he < ie;
      }));
    }
    const N = s();
    return N.map((K, ie) => ie === N.length - 1 ? v() : K);
  }), $ = G(() => {
    if (!R()) return l().length;
    const N = v().filter((K) => K.__VT_C_SP__);
    return 2 + v().length + N.reduce((K, ie) => K + Math.max(0, (ie.__VT_C_SP__ ?? 0) - 1), 0);
  }), O = G(() => {
    if (!R()) return 0;
    const N = y() ? p().endIndex : _().endIndex;
    let K = 0;
    const ie = l();
    for (let ue = N; ue < ie.length; ue++) {
      const de = ie[ue];
      de.fixed !== "right" && (K += lt(de));
    }
    return K;
  }), L = G(() => {
    var ie;
    const N = t.rowHeight || zt;
    let K = () => N;
    if (t.autoRowHeight) {
      const ue = K;
      K = (de) => We(de) || ue(de);
    }
    if (b()) {
      const ue = (ie = t.expandConfig) == null ? void 0 : ie.height, de = K;
      K = (he) => he && he.__EXP_R__ && ue || de(he);
    }
    return K;
  });
  function D(N) {
    Z(N), B();
  }
  function Z(N) {
    var pe;
    N !== void 0 && typeof N != "number" && (console.warn("initVirtualScrollY: height must be a number"), N = 0);
    const { clientHeight: K, scrollHeight: ie } = e() || {};
    let ue = g() ? d().scrollTop : ((pe = e()) == null ? void 0 : pe.scrollTop) || 0;
    const de = L()(), he = N || K || Jo, { headless: Ie } = t;
    let Oe = Math.ceil(he / de);
    if (!Ie) {
      const xe = Math.floor(a() / de);
      Oe -= xe;
    }
    const Se = Math.max(0, r().length * de + a() - he);
    ue > Se && (ue = Se), x((xe) => ({ ...xe, containerHeight: he, pageSize: Oe, scrollHeight: ie })), ve(ue);
  }
  function B() {
    const { clientWidth: N, scrollLeft: K, scrollWidth: ie } = e() || {};
    H((ue) => ({
      ...ue,
      containerWidth: N || Mn,
      scrollWidth: ie || Mn
    })), it(K);
  }
  let ge = null;
  const z = /* @__PURE__ */ new Map();
  function se(N, K) {
    const ie = String(N);
    K ? z.set(ie, K) : z.delete(ie);
  }
  function Le() {
    z.clear();
  }
  function We(N) {
    var de;
    if (!N) return;
    const K = f(N), ie = z.get(String(K));
    if (ie)
      return ie;
    const ue = (de = t.autoRowHeight) == null ? void 0 : de.expectedHeight;
    if (ue)
      return typeof ue == "function" ? ue(N) : ue;
  }
  function ve(N = 0) {
    const { pageSize: K, scrollTop: ie, startIndex: ue, endIndex: de, containerHeight: he } = d(), Ie = r(), Oe = Ie.length, Se = L()(), pe = {}, xe = Oe * Se + a(), { enabled: Me } = w();
    if (Me && (pe.scrollHeight = xe, g())) {
      let De;
      N = N < 0 ? 0 : N < (De = xe - he) ? N : De, pe.translateY = t.scrollRowByRow ? 0 : -(N % Se);
    }
    if (pe.scrollTop = N, x((De) => ({ ...De, ...pe })), !m()) {
      x((De) => ({ ...De, startIndex: 0, endIndex: 0, offsetTop: 0 }));
      return;
    }
    const { autoRowHeight: Ae, stripe: Ye, optimizeVue2Scroll: ke } = t;
    let Ce = 0, He = Oe, Re = 0;
    if (Ae || b()) {
      if (Ae && i()) {
        const Xe = i();
        for (let Ee = 0, Ve = Xe.length; Ee < Ve; Ee++) {
          const $e = Xe[Ee], nt = $e.dataset.rowKey;
          !nt || z.has(nt) || z.set(nt, $e.offsetHeight);
        }
      }
      for (let Xe = 0; Xe < Oe; Xe++) {
        const Ee = L()(Ie[Xe]);
        if (Re += Ee, Re >= N) {
          Ce = Xe, Re -= Ee;
          break;
        }
      }
      let De = 0;
      for (let Xe = Ce + 1; Xe < Oe; Xe++)
        if (De += L()(Ie[Xe]), De >= he) {
          He = Xe;
          break;
        }
    } else if (Ce = Math.floor(N / Se), He = Ce + K, Ce === ue && He === de)
      return;
    if (S.size) {
      let De = Ce, Xe = He;
      for (let Ee = 0; Ee < Ce; Ee++) {
        const Ve = Ie[Ee];
        if (!Ve) continue;
        const $e = Ee + (S.get(f(Ve)) || 1);
        if ($e > Ce) {
          De = Ee, $e > He && (Xe = $e);
          break;
        }
      }
      for (let Ee = De; Ee < He; Ee++) {
        const Ve = Ie[Ee];
        if (!Ve) continue;
        const $e = Ee + (S.get(f(Ve)) || 1);
        $e > Xe && (Xe = Math.max($e, Xe));
      }
      Ce = De, He = Xe;
    }
    if (Ye && !g() && Ce > 0 && Ce % 2 && (Ce -= 1, Ae || b())) {
      const De = L()(Ie[Ce]);
      Re -= De;
    }
    Ce = Math.max(0, Ce), He = Math.min(He, Oe), Ce >= He && (Ce = He - K), ge && window.clearTimeout(ge);
    let mt = 0;
    Ae || b() ? mt = Re : mt = Ce * Se, !ke || N <= ie || Math.abs(ue - Ce) >= K ? x((De) => ({ ...De, startIndex: Ce, endIndex: He, offsetTop: mt })) : (x((De) => ({ ...De, endIndex: He })), ge = window.setTimeout(() => {
      x((De) => ({ ...De, startIndex: Ce, offsetTop: mt }));
    }, Wn));
  }
  let Be = null;
  function it(N = 0) {
    if (!t.virtualX) return;
    const K = l(), ie = K == null ? void 0 : K.length;
    if (!ie) return;
    const { scrollLeft: ue, containerWidth: de } = _();
    let he = 0, Ie = 0, Oe = 0;
    const { nonFixedCols: Se, leftFixedCols: pe } = k(K);
    if (Se.length > 0 && N > 0) {
      const ke = Un(Se, (He) => Se[He].cumWidth <= N ? -1 : 1), Ce = Math.min(ke, Se.length - 1);
      he = Se[Ce].index, Ie = Ce > 0 ? Se[Ce - 1].cumWidth : 0, Oe = Se[Ce].cumWidth - N;
    } else Se.length > 0 && (he = Se[0].index);
    let xe = 0;
    for (const ke of pe) {
      if (ke.index >= he) break;
      xe += ke.width;
    }
    const Me = de - xe;
    let Ae = ie, Ye = Oe;
    for (let ke = Oe ? he + 1 : he; ke < ie; ke++) {
      const Ce = K[ke];
      if (Ye += lt(Ce), Ye >= Me) {
        Ae = ke + 1;
        break;
      }
    }
    Ae = Math.min(Ae, ie), Be && window.clearTimeout(Be), !t.optimizeVue2Scroll || N <= ue ? H((ke) => ({ ...ke, startIndex: he, endIndex: Ae, offsetLeft: Ie, scrollLeft: N })) : (H((ke) => ({ ...ke, endIndex: Ae, scrollLeft: N })), Be = window.setTimeout(() => {
      H((ke) => ({ ...ke, startIndex: he, offsetLeft: Ie }));
    }, Wn));
  }
  return [
    d,
    _,
    m,
    E,
    C,
    R,
    O,
    a,
    D,
    Z,
    B,
    ve,
    it,
    se,
    Le,
    I,
    T,
    $,
    p,
    v
  ];
}
function Xr(t = 500) {
  let e = !1, i = 0;
  return [() => e, (s) => {
    e = s, s && (i && self.clearTimeout(i), i = self.setTimeout(() => {
      e = !1, i = 0;
    }, t));
  }];
}
var Nr = /* @__PURE__ */ fe("<div class=row-by-row-table-height>"), Vr = /* @__PURE__ */ fe("<div class=column-resize-indicator>"), Br = /* @__PURE__ */ fe("<thead>"), un = /* @__PURE__ */ fe("<td class=vt-x-left>"), fn = /* @__PURE__ */ fe("<td class=vt-x-right>"), Kr = /* @__PURE__ */ fe("<tr class=padding-top-tr>"), Ot = /* @__PURE__ */ fe("<tr>"), zr = /* @__PURE__ */ fe('<div class="stk-sb-thumb vertical">'), Yr = /* @__PURE__ */ fe("<div class=stk-table-no-data>"), qr = /* @__PURE__ */ fe('<div class="stk-sb-thumb horizontal">'), Gr = /* @__PURE__ */ fe("<div><div class=stk-table-scroll-container><table class=stk-table-main><tbody class=stk-tbody-main>"), Ur = /* @__PURE__ */ fe("<th class=vt-x-left>"), jr = /* @__PURE__ */ fe("<th class=vt-x-right>"), Zr = /* @__PURE__ */ fe('<div class="table-header-resizer left">'), Jr = /* @__PURE__ */ fe("<span class=table-header-sorter>"), Qr = /* @__PURE__ */ fe('<div class="table-header-resizer right">'), el = /* @__PURE__ */ fe("<th><div class=table-header-cell-wrapper>"), tl = /* @__PURE__ */ fe("<span class=table-header-title>"), Xn = /* @__PURE__ */ fe("<td>"), dn = /* @__PURE__ */ fe("<td class=vt-x-spacer>"), Nn = /* @__PURE__ */ fe("<span>"), Vn = /* @__PURE__ */ fe("<td><div class=table-cell-wrapper tabindex=-1>"), Kt = /* @__PURE__ */ fe("<div class=table-cell-wrapper tabindex=-1>");
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
  smoothScroll: rr,
  scrollRowByRow: !1,
  scrollbar: !1,
  experimental: {},
  footerConfig: {
    position: "bottom"
  }
};
function Rl(t) {
  const e = Uo(nl, t), i = ur(), [r, l] = we(), [s, f] = we(), S = () => {
    var o;
    const n = (o = r()) == null ? void 0 : o.querySelector("tbody.stk-tbody-main");
    if (n)
      return Array.from(n.querySelectorAll("tr[data-row-key]"));
  }, [w] = we(or ? !0 : e.cellFixedMode === "relative"), g = G(() => {
    var n;
    return ((n = e.footerConfig) == null ? void 0 : n.position) === "top";
  }), a = G(() => g() ? "tbody" : "tfoot"), [d, x] = we(), [_, H] = we(), [k, I] = we();
  let b = null;
  const [m, E] = we(null), [C, R, y] = Ar(() => e.virtualX, w), [p, v] = we({}), T = G(() => R().slice(-1)[0] || []), $ = G(() => e.columns.some((n) => n.type === "tree-node")), O = G(() => {
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
  }), [L, D] = we([]), [Z, B] = we(0);
  function ge() {
    B((n) => n + 1);
  }
  const z = G(() => {
    const {
      rowKey: n
    } = e;
    return typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), se = G(() => {
    const {
      colKey: n
    } = e;
    return n === void 0 ? (o) => o.key || o.dataIndex : typeof n == "function" ? (o) => n(o) : (o) => o[n];
  }), Le = G(() => {
    const {
      emptyCellText: n
    } = e;
    return typeof n == "string" ? () => n : (o, h) => n({
      row: h,
      col: o
    });
  }), We = /* @__PURE__ */ new WeakMap();
  function ve(n) {
    if (!n) return n;
    let o = We.get(n);
    if (o !== void 0) return o;
    const h = n.__R_K__;
    return h !== void 0 ? (We.set(n, h), h) : (o = z()(n), o === void 0 && (o = Math.random().toString(36).slice(2)), We.set(n, o), o);
  }
  function Be(n, o) {
    return ve(n) + Gn + se()(o);
  }
  const [it, N, K, ie, ue, de, he, Ie, Oe] = Mr(e, e, se, T, L, Nt), [Se] = Lr(e, r), [pe, xe, Me, Ae] = Hr(e, e, se), [Ye, ke, Ce, He, Re] = Fr(e, e, L, D), [mt, De] = yr(e, T, ve, L);
  function Xe() {
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
  const Ee = G(Xe), Ve = G(() => {
    var n, o;
    return (n = Ee()) != null && n.enabled && e.scrollRowByRow ? !0 : (o = e.experimental) == null ? void 0 : o.scrollY;
  }), [$e, nt, _t, Wt, Tt, je, Je, Mt, pt, at, yt, ut, Ut, At, jt, u, M, F, P, re] = Wr(e, r, S, L, T, C, ve, mt, Ee, Ve), oe = Jn(ut), [J, X, Q, U, q] = Ir(e, r, $e, nt, ut, Ee, Ve), [le, ee, j, ce, be, Pe] = Rr(O, T, ve, se, Wt), Ke = br(R, se), Qe = Sr(e, w, Ke, $e, nt, je, Je), [Ge, ct, et] = Er(e, i, r);
  e.autoResize && vr(r, pt, e, 200);
  function wt(n) {
    const o = ve(n);
    return L().findIndex((h) => ve(h) === o);
  }
  function ye(n) {
    const o = se()(n);
    return T().findIndex((h) => se()(h) === o);
  }
  const {
    config: me,
    isSelecting: ot,
    onMD: Xt,
    get: Zt,
    set: Jt,
    clear: En,
    copy: oo
  } = eo[bn](e, e, r, L, T, se, Be, rn, $e, nt, wt, ye);
  pr(r, e, rn, $e, nt, C, _t, me);
  const [ro, Qt, Ht] = Cr(e, se, Ke, C, R, r), [Tn, pn, yn] = xr(e, e, r, T, s, se, ro, u), [lo, io] = kr(e, L, D, ve, Dn), [so, co, ao] = Or(e, L, D, ve, e, Dn), uo = G(() => `height:${$e().offsetTop}px`), fo = G(() => `height:${Tt()}px`), Rn = G(() => !Se() || !e.virtual ? 0 : L().length * $e().rowHeight + Mt()), kn = G(() => {
    if (!Se() || !e.virtual) return 0;
    const {
      containerHeight: n,
      rowHeight: o
    } = $e();
    return (n - Mt()) % o;
  }), ho = G(() => `height:${kn()}px`);
  Ze(ht(() => e.columns, () => {
    en(), De(), queueMicrotask(() => {
      yt(), Ht(), q();
    });
  })), Ze(ht(() => e.virtual, () => {
    queueMicrotask(at);
  })), Ze(ht(() => e.rowHeight, () => at())), Ze(ht(() => e.virtualX, () => {
    en(), queueMicrotask(() => {
      yt(), Ht();
    });
  })), Ze(ht(() => e.dataSource, (n) => {
    mo(n);
  })), Ze(ht(() => e.fixedColShadow, () => Ht())), en(), Nt(), De(), bt(() => {
    pt(), Ht(), he();
  });
  async function Dn() {
    await Promise.resolve(), at(), q();
  }
  function Nt(n = e.dataSource, o) {
    let h = n.slice();
    (!e.sortRemote || o != null && o.forceSort) && (h = Oe(h)), $() && (h = ao(h)), h = go(h), D(h);
  }
  function In(n, o) {
    var h;
    n = n || {}, v(n), o != null && o.remote || Nt(), o != null && o.silent || (h = e.onFilterChange) == null || h.call(e, n);
  }
  function go(n) {
    const o = Object.keys(p());
    if (!(o != null && o.length)) return n;
    let h = n;
    for (const A of o) {
      const {
        value: c,
        filter: W
      } = p()[A];
      c != null && c.length && (h = h.filter((V) => {
        const ae = V[A];
        return W ? W({
          row: V,
          cellValue: ae,
          filterValues: c
        }) : c.some((te) => ae == te);
      }));
    }
    return h;
  }
  function en() {
    y(e.columns);
  }
  function mo(n) {
    if (!Array.isArray(n)) {
      console.warn("invalid dataSource");
      return;
    }
    let o = !1;
    L().length !== n.length && (o = !0), Nt(n), De(), n.length || En(), o && queueMicrotask(() => at()), queueMicrotask(q);
  }
  const Ft = G(() => {
    const n = /* @__PURE__ */ new Map(), o = /* @__PURE__ */ new Map(), h = /* @__PURE__ */ new Map(), {
      virtualX: A
    } = e, c = C(), W = se();
    for (let V = 0, ae = c.length; V < ae; V++) {
      const te = c[V];
      for (let Fe = 0, rt = te.length; Fe < rt; Fe++) {
        const Ne = te[Fe], st = A ? lt(Ne) + "px" : sn(Ne.width), qe = sn(Ne.minWidth), kt = sn(Ne.maxWidth);
        let Dt = "";
        st && (Dt += `--cw:${st}`), qe && (Dt += `;min-width:${qe}`), kt && (Dt += `;max-width:${kt}`);
        const ln = W(Ne);
        n.set(ln, Dt + ";" + Qe(tt.TH, Ne, V)), o.set(ln, Dt + ";" + Qe(tt.TD, Ne, V)), h.set(ln, "position:sticky;" + Dt + ";" + Qe(tt.TF, Ne, V));
      }
    }
    return {
      [tt.TH]: n,
      [tt.TD]: o,
      [tt.TF]: h
    };
  });
  function Rt(n) {
    return n + $e().startIndex;
  }
  function _o(n, o) {
    var h;
    if (!(!le() || !n))
      return (h = le()[ve(n)]) == null ? void 0 : h.has(se()(o));
  }
  function wo(n) {
    const o = se()(n);
    return e.hideHeaderTitle === !0 || Array.isArray(e.hideHeaderTitle) && e.hideHeaderTitle.includes(o) ? "" : n.title || "";
  }
  function vo(n, o) {
    var W;
    const h = Rt(o), A = ve(n), c = (n == null ? void 0 : n.__EXP_R__) && e.virtual && ((W = e.expandConfig) == null ? void 0 : W.height);
    return {
      id: i + "-" + A,
      "data-row-key": A,
      "data-row-i": h,
      // 使用 getter 保持响应式：SolidJS spread 包裹在 createRenderEffect 中，getter 读取的信号变化时会重新赋值 class/style
      get class() {
        const V = [e.rowClassName(n, h), n != null && n.__EXP__ ? "expanded" : "", n != null && n.__EXP_R__ ? "expanded-row" : ""];
        return (_() === A || n === d()) && V.push("active"), e.showTrHoverClass && (A === m() || n === b) && V.push("hover"), V.filter(Boolean).join(" ");
      },
      get style() {
        var V;
        return c ? `--row-height: ${(V = e.expandConfig) == null ? void 0 : V.height}px` : null;
      }
    };
  }
  function xo(n) {
    const o = se()(n);
    return {
      "data-col-key": o,
      draggable: !!Ae(n),
      rowspan: n.__R_SP__,
      colspan: n.__C_SP__,
      title: wo(n),
      // 使用 getter 保持响应式（排序状态/固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[tt.TH].get(o);
      },
      get class() {
        const h = Ie(o), A = !!h && h.order !== null;
        return [n.sorter ? "sortable" : "", A && "sorter-" + (h == null ? void 0 : h.order), n.headerClassName, Qt().get(o), n.headerAlign && (n.headerAlign === "left" ? "text-l" : n.headerAlign === "right" ? "text-r" : n.headerAlign === "center" ? "text-c" : null)].filter(Boolean).join(" ");
      }
    };
  }
  function Co(n) {
    const o = se()(n);
    return {
      "data-col-key": o,
      // 使用 getter 保持响应式（固定列激活状态/列宽变化时更新）
      get style() {
        return Ft()[tt.TF].get(o);
      },
      get class() {
        return [n.className, Qt().get(o), n.type === "seq" ? "seq-column" : "", n.align === "center" ? "text-c" : n.align === "right" ? "text-r" : ""].filter(Boolean).join(" ");
      }
    };
  }
  function So(n, o, h, A) {
    const c = se()(o);
    if (!n)
      return {
        get style() {
          return Ft()[tt.TD].get(c);
        }
      };
    const W = Be(n, o);
    return {
      "data-col-key": c,
      // 使用 getter 保持响应式（固定列激活状态/选中单元格/合并单元格 hover/列宽变化时更新）
      get style() {
        return Ft()[tt.TD].get(c);
      },
      get class() {
        const V = [o.className, Qt().get(c)];
        return o.align === "center" ? V.push("text-c") : o.align === "right" && V.push("text-r"), o.mergeCells && (j().has(W) && V.push("cell-hover"), be().has(W) && V.push("cell-active")), e.cellActive && k() === W && V.push("active"), o.type === "seq" ? V.push("seq-column") : o.type === "expand" && (n.__EXP__ && se()(n.__EXP__) === c) ? V.push("expanded") : n.__T_EXP__ && o.type === "tree-node" ? V.push("tree-expanded") : o.type === "dragRow" && V.push("drag-row-cell"), V.filter(Boolean).join(" ");
      },
      ...ee(n, o, h, o.__LF_S__ ?? 0)
    };
  }
  function bo(n) {
    var c, W, V, ae;
    const o = gt(n.target), h = L()[o];
    if (!h || ((c = e.onRowClick) == null || c.call(e, n, h, {
      rowIndex: o
    }), (V = (W = O()).disabled) != null && V.call(W, h))) return;
    const A = e.rowKey ? _() === ve(h) : d() === h;
    if (A) {
      if (!O().revokable)
        return;
      on(void 0, {
        silent: !0
      });
    } else
      on(h, {
        silent: !0
      });
    (ae = e.onCurrentChange) == null || ae.call(e, n, h, {
      select: !A
    });
  }
  function Eo(n) {
    var A;
    const o = gt(n.target), h = L()[o];
    h && ((A = e.onRowDblclick) == null || A.call(e, n, h, {
      rowIndex: o
    }));
  }
  function To(n) {
    var o;
    (o = e.onHeaderRowMenu) == null || o.call(e, n);
  }
  function po(n) {
    var A;
    const o = gt(n.target), h = L()[o];
    h && ((A = e.onRowMenu) == null || A.call(e, n, h, {
      rowIndex: o
    }));
  }
  function yo(n, o, h) {
    h.type === "expand" ? lo(o, h) : h.type === "tree-node" && so(o, h);
  }
  function Ro(n) {
    var W, V, ae;
    const o = gt(n.target), h = L()[o];
    if (!h) return;
    const A = Pt(n.target), c = T().find((te) => se()(te) === A);
    if (c) {
      if ((W = n.target) != null && W.closest(".stk-fold-icon")) {
        yo(n, h, c);
        return;
      }
      if (e.cellActive) {
        const te = Be(h, c), Fe = {
          row: h,
          col: c,
          select: !1,
          rowIndex: o
        };
        e.selectedCellRevokable && k() === te ? I(void 0) : (I(te), Fe.select = !0), (V = e.onCellSelected) == null || V.call(e, n, Fe);
      }
      (ae = e.onCellClick) == null || ae.call(e, n, h, c, {
        rowIndex: o
      });
    }
  }
  function tn(n) {
    const o = gt(n.target) || 0, h = L()[o], A = Pt(n.target), c = T().find((W) => se()(W) === A);
    return {
      row: h,
      col: c,
      rowIndex: o
    };
  }
  function ko(n, o) {
    var h;
    K(o), (h = e.onHeaderCellClick) == null || h.call(e, n, o);
  }
  function Do(n) {
    var W, V;
    const o = Gt(n.target);
    if (!o) return;
    const {
      row: h,
      col: A
    } = tn(n);
    (W = e.onCellMouseover) == null || W.call(e, n, h, A);
    const c = n.relatedTarget;
    (!c || !o.contains(c)) && ((V = e.onCellMouseenter) == null || V.call(e, n, h, A));
  }
  function Io(n) {
    var W;
    const o = n.target, h = n.relatedTarget, A = Gt(o);
    if (A && (!h || !A.contains(h))) {
      const {
        row: V,
        col: ae
      } = tn(n);
      (W = e.onCellMouseleave) == null || W.call(e, n, V, ae);
    }
    const c = St(o);
    c && (!h || !c.contains(h)) && (b = null, e.showTrHoverClass && E(null), e.rowHover && ce(void 0));
  }
  function $o(n) {
    const o = gt(n.target);
    o < 0 || He(n, Rt(o));
  }
  function Lo(n) {
    var c;
    const {
      row: o,
      col: h,
      rowIndex: A
    } = tn(n);
    (c = e.onCellMousedown) == null || c.call(e, n, o, h, {
      rowIndex: A
    }), me().enabled && Xt(n);
  }
  const [$n, Ln] = Xr();
  function Mo(n) {
    if (e.smoothScroll) return;
    if (pn()) {
      n.stopPropagation();
      return;
    }
    const o = r(), {
      deltaY: h,
      deltaX: A,
      shiftKey: c
    } = n;
    if (_t() && h && !c) {
      const {
        containerHeight: W,
        scrollTop: V,
        scrollHeight: ae
      } = $e(), te = V < ae - W - 1, Fe = V > 1;
      h > 0 && te || h < 0 && Fe ? (Ln(!0), n.preventDefault()) : $n() && n.preventDefault(), Ve() ? (oe(V + h), q()) : o.scrollTop += h;
    }
    if (je()) {
      const {
        containerWidth: W,
        scrollLeft: V,
        scrollWidth: ae
      } = nt();
      let te = A;
      c && h && (te = h);
      const Fe = V < ae - W - 1, rt = V > 1;
      te > 0 && Fe || te < 0 && rt ? (Ln(!0), n.preventDefault()) : $n() && n.preventDefault(), o.scrollLeft += te;
    }
  }
  let nn = !1;
  function Ao(n) {
    !(n != null && n.target) || nn || (nn = !0, requestAnimationFrame(() => {
      var ae, te;
      nn = !1;
      const {
        scrollTop: o,
        scrollLeft: h
      } = n.target, {
        scrollTop: A
      } = $e(), {
        scrollLeft: c
      } = nt(), W = Ve() ? !1 : o !== A, V = h !== c;
      if (W && ut(o), V && (je() ? Ut(h) : nt().scrollLeft = h, Ht(nt)), W) {
        const {
          startIndex: Fe,
          endIndex: rt
        } = $e();
        (ae = e.onScroll) == null || ae.call(e, n, {
          startIndex: Fe,
          endIndex: rt
        });
      }
      V && ((te = e.onScrollX) == null || te.call(e, n)), q();
    }));
  }
  function Ho(n) {
    const o = St(n.target);
    if (!o) return;
    const h = Number(o.dataset.rowI), A = L()[h];
    if (b === A) return;
    b = A;
    const c = o.dataset.rowKey;
    e.showTrHoverClass && E(c || null), e.rowHover && ce(c);
  }
  function on(n, o = {
    silent: !1,
    deep: !1
  }) {
    var c;
    const h = n !== void 0, A = d();
    if (!h)
      x(void 0), H(void 0), Pe(!0);
    else if (typeof n == "string") {
      const W = (ae, te) => {
        var Fe;
        for (let rt = 0; rt < ae.length; rt++) {
          const Ne = ae[rt];
          if (ve(Ne) === te)
            return Ne;
          if (o.deep && ((Fe = Ne.children) != null && Fe.length)) {
            const st = W(Ne.children, te);
            if (st)
              return st;
          }
        }
        return null;
      };
      H(n), Pe(!1, _());
      const V = W(L() || [], n);
      if (!V) {
        console.warn("setCurrentRow failed.rowKey:", n);
        return;
      }
      x(V);
    } else
      x(n), H(ve(n)), Pe(!1, _());
    o.silent || (c = e.onCurrentChange) == null || c.call(
      e,
      /** no Event */
      null,
      h ? d() : A,
      {
        select: h
      }
    );
  }
  function Fo(n, o, h = {
    silent: !1
  }) {
    var c;
    if (!L().length) return;
    const A = n !== void 0 && o !== void 0;
    I(A ? Be(n, o) : void 0), h.silent || (c = e.onCellSelected) == null || c.call(
      e,
      /** no Event */
      null,
      {
        row: n,
        col: o,
        select: A
      }
    );
  }
  function rn(n = 0, o = 0) {
    r() && (n !== null && (Ve() ? (ut(n), q()) : r().scrollTop = n), o !== null && (r().scrollLeft = o));
  }
  function Oo() {
    return L();
  }
  const Po = {
    initVirtualScroll: pt,
    initVirtualScrollX: yt,
    initVirtualScrollY: at,
    setCurrentRow: on,
    setSelectedCell: Fo,
    setHighlightDimCell: et,
    setHighlightDimRow: ct,
    sortCol: N,
    sortStates: it,
    getSortColumns: de,
    setSorter: ie,
    resetSorter: ue,
    scrollTo: rn,
    getTableData: Oo,
    getRowIndex: wt,
    getColumnIndex: ye,
    setRowExpand: io,
    setAutoHeight: At,
    clearAllAutoHeight: jt,
    setTreeExpand: co,
    getSelectedArea: Zt,
    setAreaSelection: Jt,
    clearSelectedArea: En,
    copySelectedArea: oo,
    setFilter: In
  };
  typeof e.ref == "function" && e.ref(Po);
  const Wo = G(() => {
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
      "row-active": O().enabled,
      "text-overflow": e.showOverflow,
      "header-text-overflow": e.showHeaderOverflow,
      "fixed-relative-mode": w(),
      "auto-row-height": !!e.autoRowHeight,
      "scroll-row-by-row": !!Se(),
      "scrollbar-on": Ee().enabled,
      "area-selection": me().enabled,
      "is-area-selecting": ot(),
      "exp-scroll-y": !!Ve()
    };
    typeof e.bordered == "string" && (n[`bordered-${e.bordered}`] = !0);
    const o = Object.keys(n).filter((h) => n[h]).join(" ");
    return e.class ? o + " " + e.class : o;
  }), Xo = G(() => {
    const n = {
      "--row-height": e.autoRowHeight ? void 0 : $e().rowHeight + "px",
      "--header-row-height": e.headerRowHeight + "px",
      "--footer-row-height": e.footerRowHeight + "px",
      "--highlight-duration": e.highlightConfig.duration && e.highlightConfig.duration + "s",
      "--highlight-timing-function": Ge() ? `steps(${Ge()})` : void 0,
      "--sb-width": `${Ee().width}px`,
      "--sb-height": `${Ee().height}px`
    };
    let o = Object.entries(n).filter(([, A]) => A != null && A !== "").map(([A, c]) => `${A}:${c}`).join(";");
    const h = e.style;
    if (h) {
      const A = typeof h == "string" ? h : Object.entries(h).filter(([, c]) => c != null && c !== "").map(([c, W]) => `${c.replace(/[A-Z]/g, (V) => "-" + V.toLowerCase())}:${W}`).join(";");
      A && (o = o ? o + ";" + A : A);
    }
    return o;
  }), No = {
    dataSource: L,
    rawDataSource: () => e.dataSource,
    theme: () => e.theme,
    setFilter: In,
    rowVersion: Z,
    bumpRowVersion: ge
  };
  return Y(to.Provider, {
    value: No,
    get children() {
      var n = Gr(), o = n.firstChild, h = o.firstChild, A = h.firstChild;
      return n.addEventListener("wheel", Mo), n.addEventListener("scroll", Ao), $t((c) => {
        l(c);
      }, n), ne(n, Y(_e, {
        get when() {
          return Ue(() => !Ve())() && Rn();
        },
        get children() {
          var c = Nr();
          return Te((W) => ze(c, `height: ${Rn()}px`, W)), c;
        }
      }), o), ne(n, Y(_e, {
        get when() {
          return e.colResizable;
        },
        get children() {
          var c = Vr();
          return $t((W) => f(W), c), c;
        }
      }), o), h.$$mouseover = Ho, h.$$contextmenu = po, h.$$dblclick = Eo, h.$$click = bo, Ct(h, "dragend", Re), Ct(h, "dragenter", ke), Ct(h, "dragover", Ce), ne(h, Y(_e, {
        get when() {
          return !e.headless;
        },
        get children() {
          var c = Br();
          return ne(c, Y(xt, {
            get each() {
              return Ue(() => !!je())() ? M() : C();
            },
            children: (W, V) => (() => {
              var ae = Ot();
              return ae.$$contextmenu = (te) => To(te), ne(ae, Y(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var te = Ur();
                  return Te((Fe) => ze(te, `min-width:${P().offsetLeft}px;width:${P().offsetLeft}px`, Fe)), te;
                }
              }), null), ne(ae, Y(xt, {
                each: W,
                children: (te, Fe) => {
                  const rt = xo(te);
                  return (() => {
                    var Ne = el(), st = Ne.firstChild;
                    return Vt(Ne, mn(rt, {
                      onClick: (qe) => ko(qe, te),
                      onDragStart: pe,
                      onDrop: Me,
                      onDragOver: xe
                    }), !1, !0), ne(Ne, Y(_e, {
                      get when() {
                        return Ue(() => !!Tn()(te))() && Fe() > 0;
                      },
                      get children() {
                        var qe = Zr();
                        return qe.$$mousedown = (kt) => yn(kt, te, !0), qe;
                      }
                    }), st), ne(st, Y(_e, {
                      get when() {
                        return te.customHeaderCell;
                      },
                      get fallback() {
                        return Ue(() => !!e.tableHeaderSlot)() ? e.tableHeaderSlot(te) : (() => {
                          var qe = tl();
                          return ne(qe, () => te.title), qe;
                        })();
                      },
                      get children() {
                        return hn(te.customHeaderCell, {
                          col: te,
                          colIndex: Fe(),
                          rowIndex: V()
                        });
                      }
                    }), null), ne(st, Y(_e, {
                      get when() {
                        return te.sorter;
                      },
                      get children() {
                        var qe = Jr();
                        return ne(qe, Y(gr, {})), qe;
                      }
                    }), null), ne(Ne, Y(_e, {
                      get when() {
                        return Tn()(te);
                      },
                      get children() {
                        var qe = Qr();
                        return qe.$$mousedown = (kt) => yn(kt, te), qe;
                      }
                    }), null), Te((qe) => ze(st, te.__R_SP__ ? `--row-span:${te.__R_SP__}` : void 0, qe)), Ne;
                  })();
                }
              }), null), ne(ae, Y(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var te = jr();
                  return Te((Fe) => ze(te, `min-width:${Je()}px;width:${Je()}px`, Fe)), te;
                }
              }), null), ae;
            })()
          })), c;
        }
      }), A), ne(h, Y(_e, {
        get when() {
          return Ue(() => !!e.footerData)() && e.footerData.length > 0;
        },
        get children() {
          return Vo();
        }
      }), A), A.addEventListener("drop", $o), A.$$mouseout = Io, A.$$mouseover = Do, A.$$mousedown = Lo, A.$$click = Ro, ne(A, Y(_e, {
        get when() {
          return Ue(() => !!(!Ve() && _t()))() && !Se();
        },
        get children() {
          var c = Kr();
          return ne(c, Y(_e, {
            get when() {
              return Ue(() => !!e.fixedMode)() && e.headless;
            },
            get children() {
              return [Y(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var W = un();
                  return Te((V) => ze(W, `min-width:${P().offsetLeft}px;width:${P().offsetLeft}px`, V)), W;
                }
              }), Y(xt, {
                get each() {
                  return re();
                },
                children: (W, V) => Y(_e, {
                  get when() {
                    return !W.__VT_C_SP__;
                  },
                  get fallback() {
                    return (() => {
                      var ae = dn();
                      return Te(() => ft(ae, "colspan", W.__VT_C_SP__)), ae;
                    })();
                  },
                  get children() {
                    var ae = Xn();
                    return Te((te) => ze(ae, Ft()[tt.TD].get(se()(W)), te)), ae;
                  }
                })
              }), Y(_e, {
                get when() {
                  return je();
                },
                get children() {
                  var W = fn();
                  return Te((V) => ze(W, `min-width:${Je()}px;width:${Je()}px`, V)), W;
                }
              })];
            }
          })), Te((W) => ze(c, uo(), W)), c;
        }
      }), null), ne(A, Y(xt, {
        get each() {
          return Wt();
        },
        children: (c, W) => Bo(c, W())
      }), null), ne(A, Y(_e, {
        get when() {
          return !Ve();
        },
        get children() {
          return [Y(_e, {
            get when() {
              return Ue(() => !!_t())() && !Se();
            },
            get children() {
              var c = Ot();
              return Te((W) => ze(c, fo(), W)), c;
            }
          }), Y(_e, {
            get when() {
              return kn();
            },
            get children() {
              var c = Ot();
              return Te((W) => ze(c, ho(), W)), c;
            }
          })];
        }
      }), null), ne(o, Y(_e, {
        get when() {
          return Ue(() => !!Ee().enabled)() && X().y;
        },
        get children() {
          var c = zr();
          return Ct(c, "touchstart", Q, !0), Ct(c, "mousedown", Q, !0), Te((W) => ze(c, `height:${J().h}px;transform:translateY(${J().t}px)`, W)), c;
        }
      }), null), ne(n, Y(_e, {
        get when() {
          return Ue(() => !L() || !L().length)() && e.showNoData;
        },
        get children() {
          var c = Yr();
          return ne(c, () => e.emptySlot ?? "暂无数据"), Te(() => c.classList.toggle("no-data-full", !!e.noDataFull)), c;
        }
      }), null), ne(n, () => e.customBottomSlot, null), ne(n, Y(_e, {
        get when() {
          return Ue(() => !!Ee().enabled)() && X().x;
        },
        get children() {
          var c = qr();
          return Ct(c, "touchstart", U, !0), Ct(c, "mousedown", U, !0), Te((W) => ze(c, `width:${J().w}px;transform:translateX(${J().l}px)`, W)), c;
        }
      }), null), Te((c) => {
        var W = Wo(), V = me().enabled ? 0 : void 0, ae = Xo(), te = !!e.fixedMode, Fe = e.width, rt = e.minWidth, Ne = e.maxWidth, st = Ve() ? `transform:translateY(${$e().translateY}px)` : "";
        return W !== c.e && Sn(n, c.e = W), V !== c.t && ft(n, "tabindex", c.t = V), c.a = ze(n, ae, c.a), te !== c.o && h.classList.toggle("fixed-mode", c.o = te), Fe !== c.i && It(h, "width", c.i = Fe), rt !== c.n && It(h, "min-width", c.n = rt), Ne !== c.s && It(h, "max-width", c.s = Ne), c.h = ze(A, st, c.h), c;
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
  function Vo() {
    const n = a();
    return Y(n, {
      class: "stk-footer",
      get style() {
        return Ue(() => !!g())() ? `top:${Mt()}px` : "";
      },
      get children() {
        return Y(xt, {
          get each() {
            return e.footerData;
          },
          children: (o, h) => (() => {
            var A = Ot();
            return ne(A, Y(_e, {
              get when() {
                return je();
              },
              get children() {
                var c = un();
                return Te((W) => ze(c, `min-width:${P().offsetLeft}px;width:${P().offsetLeft}px`, W)), c;
              }
            }), null), ne(A, Y(xt, {
              get each() {
                return re();
              },
              children: (c, W) => Y(_e, {
                get when() {
                  return !c.__VT_C_SP__;
                },
                get fallback() {
                  return (() => {
                    var V = dn();
                    return Te(() => ft(V, "colspan", c.__VT_C_SP__)), V;
                  })();
                },
                get children() {
                  var V = Vn(), ae = V.firstChild;
                  return Vt(V, mn(() => Co(c)), !1, !0), ne(V, Y(_e, {
                    get when() {
                      return c.customFooterCell;
                    },
                    get children() {
                      return hn(c.customFooterCell, {
                        class: "table-cell-wrapper",
                        tabindex: "-1",
                        col: c,
                        row: o,
                        rowIndex: h(),
                        cellValue: o[c.dataIndex]
                      });
                    }
                  }), ae), ne(ae, Y(_e, {
                    get when() {
                      return o[c.dataIndex] != null;
                    },
                    get children() {
                      var te = Nn();
                      return ne(te, () => o[c.dataIndex]), te;
                    }
                  })), Te(() => ft(ae, "title", o[c.dataIndex] || "")), V;
                }
              })
            }), null), ne(A, Y(_e, {
              get when() {
                return je();
              },
              get children() {
                var c = fn();
                return Te((W) => ze(c, `min-width:${Je()}px;width:${Je()}px`, W)), c;
              }
            }), null), A;
          })()
        });
      }
    });
  }
  function Bo(n, o) {
    const h = vo(n, o);
    return (() => {
      var A = Ot();
      return Vt(A, h, !1, !0), ne(A, Y(_e, {
        get when() {
          return !(n && n.__EXP_R__);
        },
        get fallback() {
          return (() => {
            var c = Vn(), W = c.firstChild;
            return ne(W, (() => {
              var V = Ue(() => !!e.expandSlot);
              return () => V() ? e.expandSlot(n.__EXP_R__, n.__EXP_C__) : Ue(() => !!(n.__EXP_R__ && n.__EXP_C__))() && n.__EXP_R__[n.__EXP_C__.dataIndex] || "";
            })()), Te(() => ft(c, "colspan", F())), c;
          })();
        },
        get children() {
          return [Y(_e, {
            get when() {
              return je();
            },
            get children() {
              return un();
            }
          }), Y(xt, {
            get each() {
              return re();
            },
            children: (c, W) => Ko(n, c, o)
          }), Y(_e, {
            get when() {
              return je();
            },
            get children() {
              return fn();
            }
          })];
        }
      })), A;
    })();
  }
  function Ko(n, o, h) {
    if (o.__VT_C_SP__)
      return (() => {
        var c = dn();
        return Te(() => ft(c, "colspan", o.__VT_C_SP__)), c;
      })();
    if (_o(n, o))
      return null;
    const A = So(n, o, h, o.__LF_S__ ?? 0);
    return (() => {
      var c = Xn();
      return Vt(c, A, !1, !0), ne(c, Y(_e, {
        get when() {
          return o.customCell;
        },
        get fallback() {
          return zo(n, o, h);
        },
        get children() {
          return hn(o.customCell, {
            class: "table-cell-wrapper",
            tabindex: "-1",
            col: o,
            row: n,
            rowIndex: Rt(h),
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
            stkFoldIcon: Y(xn, {}),
            stkDragIcon: Y(Fn, {
              onDragStart: (W) => Ye(W, Rt(h))
            })
          });
        }
      })), c;
    })();
  }
  function zo(n, o, h) {
    return o.type ? o.type === "seq" ? (() => {
      var A = Kt();
      return ne(A, () => (e.seqConfig.startIndex || 0) + Rt(h) + 1), A;
    })() : o.type === "tree-node" ? (() => {
      var A = Kt();
      return ne(A, Y(wr, {
        col: o,
        row: n
      })), A;
    })() : (() => {
      var A = Kt();
      return ne(A, Y(_e, {
        get when() {
          return o.type === "dragRow";
        },
        get children() {
          return Y(Fn, {
            onDragStart: (c) => Ye(c, Rt(h))
          });
        }
      }), null), ne(A, Y(_e, {
        get when() {
          return o.type === "expand";
        },
        get children() {
          return Y(xn, {});
        }
      }), null), ne(A, Y(_e, {
        get when() {
          return n[o.dataIndex] != null;
        },
        get children() {
          var c = Nn();
          return ne(c, () => n[o.dataIndex]), c;
        }
      }), null), Te(() => ft(A, "title", n[o.dataIndex] || "")), A;
    })() : (() => {
      var A = Kt();
      return ne(A, (() => {
        var c = Ue(() => (n && n[o.dataIndex]) != null);
        return () => c() ? n && n[o.dataIndex] : Le()(o, n);
      })()), Te(() => ft(A, "title", n[o.dataIndex] || "")), A;
    })();
  }
}
function hn(t, e) {
  return typeof t == "string" ? t : typeof t == "function" ? t(e) : null;
}
Lt(["click", "dblclick", "contextmenu", "mouseover", "mousedown", "mouseout", "touchstart"]);
var ol = /* @__PURE__ */ fe("<div class=stk-filter-dropdown-empty>暂无数据"), rl = /* @__PURE__ */ fe("<div><div class=stk-filter-dropdown-list></div><footer><button>↺</button><button>✓"), ll = /* @__PURE__ */ fe("<label class=stk-filter-dropdown-item><input type=checkbox><span class=stk-filter-dropdown-label>");
const Bn = 300, Kn = 400, vt = 6;
function il() {
  const [t, e] = we(!1), [i, r] = we("light"), [l, s] = we([]), [f, S] = we({
    x: 0,
    y: 0
  }), [w, g] = we(/* @__PURE__ */ new Set());
  let a, d = null, x = null;
  function _() {
    if (!a)
      return [Bn, Kn];
    const v = a.getBoundingClientRect();
    return [v.width || Bn, v.height || Kn];
  }
  function H(v) {
    const T = window.pageYOffset || document.documentElement.scrollTop, $ = window.pageXOffset || document.documentElement.scrollLeft, O = document.documentElement.clientWidth, L = document.documentElement.clientHeight, [D, Z] = _();
    let B = v.x, ge = v.y;
    v.x - $ + D > O - vt && (B = O - D - vt + $);
    const se = v.y - T;
    if (se + Z > L - vt) {
      const Le = v.height || 30;
      se - Le >= Z + vt ? ge = v.y - Le - Z - vt : ge = vt + T;
    }
    return B = Math.max(vt + $, B), ge = Math.max(vt + T, ge), {
      x: B,
      y: ge
    };
  }
  function k() {
    const v = /* @__PURE__ */ new Set();
    l().forEach((T) => {
      T.selected && v.add(T.value);
    }), g(v);
  }
  function I(v, T) {
    const $ = new Set(w());
    v ? $.add(T.value) : $.delete(T.value), g($);
  }
  function b() {
    const v = w();
    l().forEach((T) => T.selected = v.has(T.value)), d == null || d(Array.from(v)), m();
  }
  function m() {
    e(!1), s([]), g(/* @__PURE__ */ new Set());
  }
  function E() {
    g(/* @__PURE__ */ new Set()), l().forEach((v) => v.selected = !1), d == null || d([]), m();
  }
  function C(v) {
    !t() || a != null && a.contains(v.target) || m();
  }
  function R(v, T, $) {
    a && (a.style.visibility = "hidden"), s(T || []), d = $, k(), e(!0), queueMicrotask(() => {
      S(H(v)), a && (a.style.visibility = "visible");
    });
  }
  function y(v) {
    r(v);
  }
  const p = document.createElement("div");
  return p.classList.add("stk-filter-dropdown-wrapper"), document.body.appendChild(p), x = jo(() => (() => {
    var v = rl(), T = v.firstChild, $ = T.nextSibling, O = $.firstChild, L = O.nextSibling;
    return v.$$click = (D) => D.stopPropagation(), $t((D) => a = D, v), ne(T, Y(xt, {
      get each() {
        return l();
      },
      children: (D) => (() => {
        var Z = ll(), B = Z.firstChild, ge = B.nextSibling;
        return Z.$$click = () => I(!w().has(D.value), D), B.$$click = (z) => z.stopPropagation(), B.addEventListener("change", (z) => I(z.currentTarget.checked, D)), ne(ge, () => D.label), Te(() => B.checked = w().has(D.value)), Z;
      })()
    }), null), ne(T, Y(_e, {
      get when() {
        return !l().length;
      },
      get children() {
        return ol();
      }
    }), null), O.$$click = E, L.$$click = b, Te((D) => {
      var Z = `stk-filter-dropdown stk-filter-dropdown--${i()}`, B = f().y + "px", ge = f().x + "px", z = t() ? void 0 : "none";
      return Z !== D.e && Sn(v, D.e = Z), B !== D.t && It(v, "top", D.t = B), ge !== D.a && It(v, "left", D.a = ge), z !== D.o && It(v, "display", D.o = z), D;
    }, {
      e: void 0,
      t: void 0,
      a: void 0,
      o: void 0
    }), v;
  })(), p), document.addEventListener("click", C), Et(() => {
    document.removeEventListener("click", C), x == null || x();
  }), {
    get visible() {
      return t();
    },
    show: R,
    hide: m,
    setTheme: y
  };
}
let gn = null;
async function sl() {
  return gn || (gn = il()), gn;
}
Lt(["click"]);
var cl = /* @__PURE__ */ fe('<div class=stk-filter><svg class=stk-filter-icon xmlns=http://www.w3.org/2000/svg viewBox="0 0 1024 1024"><path fill=currentColor d="M950.58 0 l-894.06 0 q-91.93 17.17 -34.34 119.21 l293.97 251.54 l6.06 9.1 q16.17 20.2 16.17 47.48 l0 468.74 l1.01 8.08 q3.03 10.11 9.09 19.2 q2.02 2.02 5.05 7.07 q36.37 33.34 84.86 4.04 l216.19 -124.26 q21.21 -22.22 18.18 -50.51 l0 -332.36 l1.01 -11.12 q4.04 -26.26 22.23 -45.46 l292.96 -251.54 l9.1 -10.11 q43.44 -54.55 14.14 -81.82 q-28.29 -27.28 -61.62 -27.28 ZM832.38 119.21 l-277.81 235.38 l0 377.82 l-96.98 55.57 l0 -433.39 l-275.8 -235.38 l650.59 0 Z">'), al = /* @__PURE__ */ fe("<span>");
function ul(t) {
  const e = () => {
    var s;
    return ((s = t.theme) == null ? void 0 : s.call(t)) || "light";
  }, i = () => {
    var s;
    return !!((s = t.active) != null && s.call(t));
  };
  function r(s) {
    s.stopPropagation();
    const S = s.target.getBoundingClientRect(), w = window.pageYOffset || document.documentElement.scrollTop, g = window.pageXOffset || document.documentElement.scrollLeft;
    sl().then((a) => {
      if (a.visible) {
        a.hide();
        return;
      }
      a.setTheme(e()), a.show({
        x: S.left + g,
        y: S.bottom + w,
        height: S.height
      }, t.getOptions(), l);
    });
  }
  function l(s) {
    var f;
    (f = t.onChange) == null || f.call(t, s);
  }
  return (() => {
    var s = cl(), f = s.firstChild;
    return ne(s, () => t.children ?? (() => {
      var S = al();
      return ne(S, () => t.col.title), S;
    })(), f), f.$$click = r, Te((S) => {
      var w = !!i(), g = e() === "light", a = e() === "dark";
      return w !== S.e && s.classList.toggle("stk-filter--active", S.e = w), g !== S.t && s.classList.toggle("stk-filter--light", S.t = g), a !== S.a && s.classList.toggle("stk-filter--dark", S.a = a), S;
    }, {
      e: void 0,
      t: void 0,
      a: void 0
    }), s;
  })();
}
Lt(["click"]);
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
function kl(t) {
  const [e, i] = we({});
  function r(l, s) {
    return (f) => {
      const S = f.col.dataIndex, w = Cn(), g = () => {
        var k;
        return ((k = e()[S]) == null ? void 0 : k.value.length) || 0;
      };
      let a = null, d = null;
      function x() {
        var I;
        if (!(l != null && l.autoOptions)) return [];
        const k = ((I = w == null ? void 0 : w.rawDataSource) == null ? void 0 : I.call(w)) || (w == null ? void 0 : w.dataSource()) || [];
        return a && d === k || (d = k, a = fl(k, S)), a;
      }
      function _() {
        return (l == null ? void 0 : l.options) ?? x();
      }
      function H(k) {
        var m, E;
        const I = {
          value: k,
          filter: (l == null ? void 0 : l.filter) ?? ((m = e()[S]) == null ? void 0 : m.filter)
        }, b = {
          ...e(),
          [S]: I
        };
        i(b), (E = t == null ? void 0 : t.onChange) == null || E.call(t, {
          colKey: S,
          status: I
        }), w == null || w.setFilter(b, t);
      }
      return Y(ul, {
        get col() {
          return f.col;
        },
        get colIndex() {
          return f.colIndex;
        },
        get rowIndex() {
          return f.rowIndex;
        },
        theme: () => (w == null ? void 0 : w.theme()) || "light",
        active: () => g() > 0,
        getOptions: _,
        onChange: H,
        get children() {
          return s ? s(f) : void 0;
        }
      });
    };
  }
  return {
    Filter: r,
    filterStatus: e
  };
}
var dl = /* @__PURE__ */ fe("<input class=stk-editable-cell-input>"), hl = /* @__PURE__ */ fe("<div class=stk-editable-cell>");
function gl(t) {
  const e = () => t.trigger || "dblclick", [i, r] = we(t.cellValue), [l, s] = we(!1);
  let f, S;
  Ze(ht(() => t.cellValue, (b) => {
    l() || r(b);
  }));
  function w(b) {
    b.type === e() && g();
  }
  function g() {
    r(t.cellValue), s(!0), queueMicrotask(() => {
      f == null || f.focus();
    });
  }
  function a() {
    var m;
    s(!1);
    const b = i();
    k(b), (m = t.onChange) == null || m.call(t, b), I();
  }
  function d() {
    s(!1), r(t.cellValue), I();
  }
  function x() {
    l() && a();
  }
  function _(b) {
    r(b.target.value);
  }
  function H(b) {
    b.key === "Enter" ? (b.preventDefault(), b.stopPropagation(), a()) : b.key === "Escape" || b.key === "Esc" ? (b.preventDefault(), b.stopPropagation(), d()) : b.key === "ArrowLeft" || b.key === "ArrowRight" || b.key === "ArrowUp" || b.key === "ArrowDown" ? b.stopPropagation() : b.key === "Tab" ? a() : b.stopPropagation();
  }
  function k(b) {
    const {
      row: m,
      col: E
    } = t;
    m[E.dataIndex] = b;
  }
  function I() {
    var m;
    const b = (m = S == null ? void 0 : S.closest) == null ? void 0 : m.call(S, ".stk-table");
    b == null || b.focus();
  }
  return (() => {
    var b = hl();
    return b.$$click = w, b.$$dblclick = w, $t((m) => S = m, b), ne(b, Y(_e, {
      get when() {
        return l();
      },
      get fallback() {
        return Ue(() => i() ?? "");
      },
      get children() {
        var m = dl();
        return m.$$keydown = H, m.$$input = _, m.addEventListener("blur", x), $t((E) => f = E, m), Te(() => m.value = i()), m;
      }
    })), b;
  })();
}
Lt(["dblclick", "click", "input", "keydown"]);
function Dl(t) {
  function e() {
    return (i) => Y(gl, mn(i, {
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
var ml = /* @__PURE__ */ fe("<div class=stk-checkbox-cell>"), _l = /* @__PURE__ */ fe("<input type=checkbox class=stk-checkbox-native>");
function zn(t) {
  let e, i;
  Ze(() => {
    i && (i.indeterminate = !!t.indeterminate);
  });
  function r(l) {
    var f, S;
    let s;
    typeof l == "boolean" ? s = l : ((f = l == null ? void 0 : l.target) == null ? void 0 : f.checked) !== void 0 ? s = l.target.checked : s = !!l, s !== e && (e = s, (S = t.onChange) == null || S.call(t, s));
  }
  return (() => {
    var l = ml();
    return ne(l, Y(_e, {
      get when() {
        return t.customComponent;
      },
      get fallback() {
        return (() => {
          var s = _l();
          s.$$click = (S) => S.stopPropagation(), s.addEventListener("change", r);
          var f = i;
          return typeof f == "function" ? $t(f, s) : i = s, Te(() => s.checked = !!t.checked), s;
        })();
      },
      get children() {
        return Y(Zo, {
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
          onClick: (s) => s.stopPropagation()
        });
      }
    })), l;
  })();
}
Lt(["click"]);
function Il(t) {
  const e = (t == null ? void 0 : t.field) ?? "_isChecked", i = t == null ? void 0 : t.checkboxComponent;
  function r() {
    return (s) => {
      const f = Cn(), S = () => (f == null || f.rowVersion(), !!s.row[e]);
      function w(g) {
        var a;
        s.row[e] = g, f == null || f.bumpRowVersion(), (a = t == null ? void 0 : t.onChange) == null || a.call(t, g, s.row);
      }
      return Y(zn, {
        get checked() {
          return S();
        },
        customComponent: i,
        onChange: w
      });
    };
  }
  function l() {
    return (s) => {
      const f = Cn(), S = () => (f == null ? void 0 : f.dataSource()) || [], w = () => {
        f == null || f.rowVersion();
        const d = S();
        return d.length > 0 && d.every((x) => !!x[e]);
      }, g = () => {
        f == null || f.rowVersion();
        const d = S(), x = d.filter((_) => !!_[e]).length;
        return x > 0 && x < d.length;
      };
      function a(d) {
        var x;
        S().forEach((_) => {
          _[e] = d;
        }), f == null || f.bumpRowVersion(), (x = t == null ? void 0 : t.onSelectAll) == null || x.call(t, d);
      }
      return Y(zn, {
        get checked() {
          return w();
        },
        get indeterminate() {
          return g();
        },
        customComponent: i,
        onChange: a
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
  let s = i.slice(0, l);
  for (let f = l; f < r; f += 3)
    s += "," + i.slice(f, f + 3);
  return e === -1 ? s : s + t.slice(e);
}
function no(t, e = {}) {
  const {
    decimals: i,
    thousands: r = !0,
    prefix: l = "",
    suffix: s = "",
    showSign: f = !1,
    percent: S = !1,
    abbr: w,
    abbrDecimals: g,
    placeholder: a = "--"
  } = e;
  if (t == null || t === "")
    return a;
  const d = typeof t == "number" ? t : Number(t);
  if (Number.isNaN(d))
    return a;
  const x = d < 0 ? "-" : f && d > 0 ? "+" : "";
  let _ = Math.abs(d);
  S && (_ = _ * 100);
  let H = "";
  if (w && !S) {
    const m = wl[w];
    for (let E = 0; E < m.length; E++) {
      const C = m[E][0];
      if (_ >= C) {
        _ = _ / C, H = m[E][1];
        break;
      }
    }
  }
  let k;
  H ? k = g ?? i ?? 2 : k = i ?? null;
  let I = k == null ? String(_) : _.toFixed(k);
  return r && (I = vl(I)), `${l}${x}${I}${H}${S ? "%" : ""}${s}`;
}
var xl = /* @__PURE__ */ fe("<span class=stk-number-cell>");
function $l(t) {
  function e() {
    return (i) => (() => {
      var r = xl();
      return ne(r, () => no(i.cellValue, t)), r;
    })();
  }
  return {
    NumberCell: e
  };
}
var Cl = /* @__PURE__ */ fe("<span>"), Sl = /* @__PURE__ */ fe("<span class=stk-change-cell__arrow>");
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
    flatColor: s
  } = t;
  function f() {
    return (S) => {
      const w = S.cellValue, g = bl(w);
      let a = "stk-change-cell--flat";
      g === "rise" ? a = e ? "stk-change-cell--green" : "stk-change-cell--red" : g === "fall" && (a = e ? "stk-change-cell--red" : "stk-change-cell--green");
      const d = g === "rise" ? r : g === "fall" ? l : s, x = i && g !== "flat" ? g === "rise" ? "▲" : "▼" : "";
      return (() => {
        var _ = Cl();
        return Sn(_, `stk-change-cell ${a}`), ne(_, x ? (() => {
          var H = Sl();
          return ne(H, x), H;
        })() : null, null), ne(_, () => no(w, t), null), Te((H) => ze(_, d ? {
          color: d
        } : void 0, H)), _;
      })();
    };
  }
  return {
    ChangeCell: f
  };
}
export {
  Rl as StkTable,
  to as StkTableContext,
  Un as binarySearch,
  Ll as createChangeCell,
  Il as createCheckboxCell,
  Dl as createEditableCell,
  kl as createFilterCell,
  $l as createNumberCell,
  no as formatNumber,
  pl as insertToOrderedArray,
  yl as registerFeature,
  wn as strCompare,
  vn as tableSort,
  fr as useAreaSelection,
  Cn as useStkTableContext
};
