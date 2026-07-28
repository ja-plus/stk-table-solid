import E from "node:fs";
import b from "node:path";
const m = {
  title: /title="(.*?)"/,
  vuePath: /vue="(.*?)"/,
  htmlPath: /html="(.*?)"/,
  reactPath: /react="(.*?)"/,
  sveltePath: /svelte="(.*?)"/,
  solidPath: /solid="(.*?)"/,
  description: /description="(.*?)"/,
  order: /order="(.*?)"/,
  select: /select="(.*?)"/,
  github: /github="(.*?)"/,
  gitlab: /gitlab="(.*?)"/,
  stackblitz: /stackblitz="(.*?)"/,
  codesandbox: /codesandbox="(.*?)"/,
  scope: /scope="(.*?)"/,
  vueFiles: /vueFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  reactFiles: /reactFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  svelteFiles: /svelteFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  solidFiles: /solidFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  htmlFiles: /htmlFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,
  ssg: /ssg="(.*?)"/,
  htmlWriteWay: /htmlWriteWay="(.*?)"/,
  background: /background="(.*?)"/,
  playground: /playground="(.*?)"/
}, h = (e, s) => {
  var t;
  return (t = e.match(s)) == null ? void 0 : t[1];
}, he = (e) => ({
  title: h(e, m.title) || "",
  vuePath: h(e, m.vuePath),
  htmlPath: h(e, m.htmlPath),
  reactPath: h(e, m.reactPath),
  sveltePath: h(e, m.sveltePath),
  solidPath: h(e, m.solidPath),
  description: h(e, m.description) || "",
  order: h(e, m.order),
  select: h(e, m.select),
  github: h(e, m.github) || "",
  gitlab: h(e, m.gitlab) || "",
  stackblitz: h(e, m.stackblitz),
  codesandbox: h(e, m.codesandbox),
  scope: h(e, m.scope) || "",
  vueFiles: h(e, m.vueFiles),
  reactFiles: h(e, m.reactFiles),
  svelteFiles: h(e, m.svelteFiles),
  solidFiles: h(e, m.solidFiles),
  htmlFiles: h(e, m.htmlFiles),
  ssg: !!h(e, m.ssg),
  htmlWriteWay: h(e, m.htmlWriteWay) || "write",
  background: h(e, m.background),
  playground: h(e, m.playground)
}), ve = /<!--[\s\S]*?-->/g, re = /<\s*script\b(?=[^>]*\ssetup(?:[\s=>/]|>))[^>]*>/i, A = "__vitepress_demo_plugin_script_setup_token__", fe = (e, s) => Object.prototype.hasOwnProperty.call(e, s), be = (e) => e.replace(ve, ""), F = (e) => !!e && re.test(be(e)), ne = (e) => {
  for (const s of e) {
    if ((s == null ? void 0 : s.type) === "html_block" && F(s.content))
      return s;
    const t = s == null ? void 0 : s.children;
    if (Array.isArray(t)) {
      const l = ne(t);
      if (l)
        return l;
    }
  }
  return null;
}, te = (e, s, t) => e.includes(s) && (!t || e.includes(t)), se = (e, s) => e.replace(
  re,
  (t) => `${t}
${s}`
), ge = (e, s) => {
  !e || fe(e, A) || (e[A] = ne(s));
}, f = (e, s, t, l) => {
  var d, $;
  const n = e.sfcBlocks.scripts, c = F(
    (d = e.sfcBlocks.scriptSetup) == null ? void 0 : d.tagOpen
  ) ? e.sfcBlocks.scriptSetup : n.find((y) => F(y.tagOpen)), p = F(
    ($ = e[A]) == null ? void 0 : $.content
  ) ? e[A] : null, i = t || "";
  let u = "";
  if (l === "dynamicImport" ? u = t ? `
      const ${i} = shallowRef();
      onMounted(async () => {
        ${i}.value = (await import('${s}')).default;
      });
      `.trim() : `
      onMounted(async () => {
        await import('${s}');
      });
      `.trim() : l === "inject" ? u = `
      ${t}
    `.trim() : u = t ? `import ${i} from '${s}'` : `import '${s}'`, c) {
    if (te(c.content, s, i))
      return;
    c.content = se(
      c.content,
      u
    ), c.contentStripped = `${u}
${c.contentStripped || ""}`;
    return;
  }
  if (p) {
    if (te(p.content, s, i))
      return;
    p.content = se(
      p.content,
      u
    );
    return;
  }
  if (!c) {
    const y = {
      type: "script",
      tagClose: "<\/script>",
      tagOpen: "<script setup lang='ts'>",
      content: `<script setup lang='ts'>
        ${u}
        <\/script>`,
      contentStripped: u
    };
    n.push(y), e.sfcBlocks.scriptSetup = y;
  }
}, $e = (e) => {
  let s = !0;
  const t = [];
  for (; s; ) {
    const l = e.lastIndexOf("/");
    if (l === -1)
      s = !1;
    else {
      const n = e.substring(l + 1);
      t.unshift(n), e = e.substring(0, l);
    }
  }
  return "Temp" + btoa(
    encodeURIComponent(
      t.join("-").split(".").slice(0, -1).join(".")
    )
  ).replace(/=/g, "Equal");
}, oe = [
  /<demo(\s|\n)((.|\n)*)><\/demo>/,
  /<demo(\s|\n)((.|\n)*)\/>/
], B = (e, s) => b.relative(e, s).replace(/\\/g, "/"), V = (e, s) => b.resolve(e, s || ".").replace(/\\/g, "/"), ye = (e) => e.replace(/'/g, '"').replace(/\\n/g, "").trim().replace(/^"/, "").replace(/"$/, "").replace(/,(\s|\n)*\}$/, "}").replace(/,(\s|\n)*\]$/, "]"), Pe = (e, s, t) => {
  const l = {
    vue: {},
    react: {},
    svelte: {},
    solid: {},
    html: {}
  };
  for (const n of Object.keys(e)) {
    const c = ye(e[n] || "");
    if (!!c)
      try {
        const p = JSON.parse(c);
        if (Array.isArray(p))
          p.forEach((i) => {
            const u = V(t, i), d = B(
              b.dirname(s[n]),
              u
            );
            l[n][d] = { filename: i, code: "" };
          });
        else if (typeof p == "object" && p)
          for (const i in p)
            l[n][i] = { filename: p[i], code: "" };
        for (const i in l[n]) {
          const u = l[n][i].filename, d = V(t, u);
          u && E.existsSync(d) ? (l[n][i].code = E.readFileSync(d, "utf-8"), l[n][i].entry = d === s[n], l[n][i].path = B(
            b.dirname(s[n]),
            d
          )) : delete l[n][i];
        }
      } catch {
      }
  }
  return l;
}, Ce = () => ({
  html: "",
  vue: "",
  react: "",
  svelte: "",
  solid: ""
}), Se = (e) => btoa(unescape(encodeURIComponent(JSON.stringify(e)))), ke = (e, s, t, l) => {
  Object.values(s).forEach((n) => {
    const c = V(l, n.filename);
    if (c === t)
      return;
    const p = B(b.dirname(t), c);
    e[p] = n.code;
  });
}, we = ({
  playground: e,
  playgroundName: s,
  scope: t,
  files: l,
  inputFiles: n,
  componentPaths: c,
  baseDir: p
}) => {
  var u, d, $, y, r, j, T, k, C, N, _, w;
  const i = Ce();
  if (!e.show)
    return i;
  try {
    const v = e.templates || [], W = (u = v.find((a) => a.scope === "global")) == null ? void 0 : u.files, U = (d = v.find((a) => a.scope === t)) == null ? void 0 : d.files, P = {
      html: { ...($ = v.find((a) => a.scope === "html")) == null ? void 0 : $.files },
      vue: { ...(y = v.find((a) => a.scope === "vue")) == null ? void 0 : y.files },
      react: { ...(r = v.find((a) => a.scope === "react")) == null ? void 0 : r.files },
      svelte: { ...(j = v.find((a) => a.scope === "svelte")) == null ? void 0 : j.files },
      solid: { ...(T = v.find((a) => a.scope === "solid")) == null ? void 0 : T.files }
    };
    Object.keys(P).forEach((a) => {
      n[a] && ke(
        P[a],
        l[a],
        c[a],
        p
      );
    });
    const o = Array.isArray(e.config) ? e.config.find((a) => a.name === s) : e.config;
    if (!(o != null && o.url))
      return i;
    const S = {
      html: ((k = o.entryName) == null ? void 0 : k.html) || "index.html",
      vue: ((C = o.entryName) == null ? void 0 : C.vue) || "App.vue",
      react: ((N = o.entryName) == null ? void 0 : N.react) || "App.tsx",
      svelte: ((_ = o.entryName) == null ? void 0 : _.svelte) || "App.svelte",
      solid: ((w = o.entryName) == null ? void 0 : w.solid) || "App.tsx"
    };
    Object.keys(c).forEach((a) => {
      c[a] && (P[a][S[a]] = E.readFileSync(
        c[a],
        "utf-8"
      ));
    });
    const R = typeof o.url == "function" ? o.url : (a) => `${o.url}#${a}`, x = o.fn || Se;
    Object.keys(P).forEach((a) => {
      const O = {
        ...W,
        ...P[a],
        ...U
      };
      i[a] = R(x(O));
    });
  } catch (v) {
    console.warn("[vitepress-demo-plugin] Get playground url error:", v);
  }
  return i;
}, le = (e, s, t, l) => {
  var ee;
  const {
    demoDir: n,
    tab: c = {},
    stackblitz: p = { show: !1 },
    codesandbox: i = { show: !1 },
    playground: u = { show: !1 }
  } = l || {};
  let {
    order: d = "vue,react,svelte,solid,html",
    visible: $ = !0,
    select: y = (c.order || "vue,react,svelte,solid,html").split(",")[0] || "vue"
  } = c;
  const r = he(s.content), {
    github: j,
    gitlab: T,
    scope: k,
    ssg: C,
    htmlWriteWay: N,
    background: _
  } = r, w = (ee = t.realPath) != null ? ee : t.path, v = n || b.dirname(w);
  r.order && (d = r.order), r.select && (y = r.select);
  const W = {
    ...p,
    show: r.stackblitz ? r.stackblitz === "true" : p.show
  }, U = {
    ...i,
    show: r.codesandbox ? r.codesandbox === "true" : i.show
  }, P = {
    ...u,
    show: r.playground ? r.playground !== "false" : u.show
  }, o = {
    title: r.title,
    description: r.description,
    vue: r.vuePath ? b.join(v, r.vuePath).replace(/\\/g, "/") : "",
    html: r.htmlPath ? b.join(v, r.htmlPath).replace(/\\/g, "/") : "",
    react: r.reactPath ? b.join(v, r.reactPath).replace(/\\/g, "/") : "",
    svelte: r.sveltePath ? b.join(v, r.sveltePath).replace(/\\/g, "/") : "",
    solid: r.solidPath ? b.join(v, r.solidPath).replace(/\\/g, "/") : ""
  }, S = (me) => V(n || b.dirname(w), me), R = o.vue ? S(r.vuePath) : "", x = o.html ? S(r.htmlPath) : "", a = o.react ? S(r.reactPath) : "", O = o.svelte ? S(r.sveltePath) : "", z = o.solid ? S(r.solidPath) : "", ae = b.resolve(
    v,
    o.vue || o.react || o.svelte || o.solid || o.html || "."
  ).replace(/\\/g, "/"), g = $e(ae), J = `react${g}`, M = `svelte${g}`, H = `solid${g}`;
  f(
    t,
    "vitepress-demo-plugin/client",
    "{ VitepressDemoBox, VitepressDemoPlaceholder }"
  ), f(t, "vitepress-demo-plugin/style.css"), f(t, "vue", "{ ref, shallowRef, onMounted }"), o.vue && f(
    t,
    R,
    g,
    C ? void 0 : "dynamicImport"
  ), o.react && (f(
    t,
    "react",
    "{ createElement as reactCreateElement }"
  ), f(
    t,
    "react-dom/client",
    "{ createRoot as reactCreateRoot }"
  ), f(
    t,
    a,
    J,
    "dynamicImport"
  )), o.svelte && (f(
    t,
    "svelte",
    "{ mount as svelteMount, unmount as svelteUnmount }"
  ), f(
    t,
    O,
    M,
    "dynamicImport"
  )), o.solid && (f(
    t,
    "solid-js/web",
    "{ render as solidRender }"
  ), f(
    t,
    "solid-js",
    "{ createComponent as solidCreateComponent }"
  ), f(
    t,
    z,
    H,
    "dynamicImport"
  ));
  const I = "__placeholder_visible_key__";
  f(
    t,
    I,
    `const ${I} = ref(true);`,
    "inject"
  );
  const D = o.html ? `TempCodeHtml${g}` : "''", K = o.react ? `TempCodeReact${g}` : "''", q = o.svelte ? `TempCodeSvelte${g}` : "''", G = o.solid ? `TempCodeSolid${g}` : "''", L = o.vue ? `TempCodeVue${g}` : "''";
  o.html && f(
    t,
    `${x}?raw`,
    D
  ), o.react && f(
    t,
    `${a}?raw`,
    K
  ), o.svelte && f(
    t,
    `${O}?raw`,
    q
  ), o.solid && f(
    t,
    `${z}?raw`,
    G
  ), o.vue && f(
    t,
    `${R}?raw`,
    L
  );
  const Q = {
    vue: r.vueFiles,
    react: r.reactFiles,
    svelte: r.svelteFiles,
    solid: r.solidFiles,
    html: r.htmlFiles
  }, X = {
    vue: R,
    react: a,
    svelte: O,
    solid: z,
    html: x
  }, Y = Pe(Q, X, v);
  let Z = "";
  (l == null ? void 0 : l.locale) && typeof l.locale == "object" && (Z = encodeURIComponent(JSON.stringify(l.locale)));
  const {
    html: ie,
    vue: ce,
    react: de,
    svelte: pe,
    solid: ue
  } = we({
    playground: P,
    playgroundName: r.playground,
    scope: k,
    files: Y,
    inputFiles: Q,
    componentPaths: X,
    baseDir: v
  });
  return `
  ${C ? "" : `<vitepress-demo-placeholder v-show="${I}" />`}
  ${C ? "" : "<ClientOnly>"}
    <vitepress-demo-box 
      title="${o.title}"
      description="${o.description}"
      locale="${Z}"
      select="${y}"
      order="${d}"
      github="${j}"
      gitlab="${T}"
      theme="${(l == null ? void 0 : l.theme) || ""}"
      lightTheme="${(l == null ? void 0 : l.lightTheme) || ""}"
      darkTheme="${(l == null ? void 0 : l.darkTheme) || ""}"
      stackblitz="${encodeURIComponent(JSON.stringify(W))}"
      codesandbox="${encodeURIComponent(JSON.stringify(U))}"
      playground="${encodeURIComponent(JSON.stringify(P))}"
      files="${encodeURIComponent(JSON.stringify(Y))}"
      scope="${k || ""}"
      htmlWriteWay="${N}"
      background="${_}"
      htmlPlayground="${ie}"
      vuePlayground="${ce}"
      reactPlayground="${de}"
      sveltePlayground="${pe}"
      solidPlayground="${ue}"
      :visible="!!${$}"
      @mount="() => { ${I} = false; }"
      ${o.html ? `
            :htmlCode="${D}"
            ` : ""}
      ${o.vue ? `
            :vueCode="${L}"
            ` : ""}
      ${o.react ? `
            :reactCode="${K}"
            :reactComponent="${J}"
            :reactCreateRoot="reactCreateRoot"
            :reactCreateElement="reactCreateElement"
            ` : ""}
      ${o.svelte ? `
            :svelteCode="${q}"
            :svelteComponent="${M}"
            :svelteMount="svelteMount"
            :svelteUnmount="svelteUnmount"
            ` : ""}
      ${o.solid ? `
            :solidCode="${G}"
            :solidComponent="${H}"
            :solidRender="solidRender"
            :solidCreateComponent="solidCreateComponent"
            ` : ""}
      >
      ${o.vue ? `
            <template v-if="${g}" #vue>
              <${g}></${g}>
            </template>
            ` : ""}
    </vitepress-demo-box>
  ${C ? "" : "</ClientOnly>"}`.trim();
}, Te = (e, s) => {
  e.core.ruler.push("vitepress-demo-prepare-script-setup", (n) => {
    ge(n.env, n.tokens);
  });
  const t = e.renderer.rules.html_inline, l = e.renderer.rules.html_block;
  e.renderer.rules.html_inline = (n, c, p, i, u) => {
    const d = n[c];
    return d.content = d.content.replace(/<!--[\s\S]*?-->/g, ""), oe.some(($) => $.test(d.content)) ? le(e, d, i, s) : t(n, c, p, i, u);
  }, e.renderer.rules.html_block = (n, c, p, i, u) => {
    const d = n[c];
    return d.content = d.content.replace(/<!--[\s\S]*?-->/g, ""), oe.some(($) => $.test(d.content)) ? le(e, d, i, s) : l(n, c, p, i, u);
  };
};
export {
  Te as vitepressDemoPlugin
};
