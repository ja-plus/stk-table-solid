"use strict";Object.defineProperties(exports,{__esModule:{value:!0},[Symbol.toStringTag]:{value:"Module"}});const fe=require("node:fs"),ve=require("node:path"),re=e=>e&&typeof e=="object"&&"default"in e?e:{default:e},E=re(fe),b=re(ve),m={title:/title="(.*?)"/,vuePath:/vue="(.*?)"/,htmlPath:/html="(.*?)"/,reactPath:/react="(.*?)"/,sveltePath:/svelte="(.*?)"/,solidPath:/solid="(.*?)"/,description:/description="(.*?)"/,order:/order="(.*?)"/,select:/select="(.*?)"/,github:/github="(.*?)"/,gitlab:/gitlab="(.*?)"/,stackblitz:/stackblitz="(.*?)"/,codesandbox:/codesandbox="(.*?)"/,scope:/scope="(.*?)"/,vueFiles:/vueFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,reactFiles:/reactFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,svelteFiles:/svelteFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,solidFiles:/solidFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,htmlFiles:/htmlFiles=("\{((.|\n)*?)\}"|"\[((.|\n)*?)\]")/,ssg:/ssg="(.*?)"/,htmlWriteWay:/htmlWriteWay="(.*?)"/,background:/background="(.*?)"/,playground:/playground="(.*?)"/},h=(e,s)=>{var t;return(t=e.match(s))==null?void 0:t[1]},be=e=>({title:h(e,m.title)||"",vuePath:h(e,m.vuePath),htmlPath:h(e,m.htmlPath),reactPath:h(e,m.reactPath),sveltePath:h(e,m.sveltePath),solidPath:h(e,m.solidPath),description:h(e,m.description)||"",order:h(e,m.order),select:h(e,m.select),github:h(e,m.github)||"",gitlab:h(e,m.gitlab)||"",stackblitz:h(e,m.stackblitz),codesandbox:h(e,m.codesandbox),scope:h(e,m.scope)||"",vueFiles:h(e,m.vueFiles),reactFiles:h(e,m.reactFiles),svelteFiles:h(e,m.svelteFiles),solidFiles:h(e,m.solidFiles),htmlFiles:h(e,m.htmlFiles),ssg:!!h(e,m.ssg),htmlWriteWay:h(e,m.htmlWriteWay)||"write",background:h(e,m.background),playground:h(e,m.playground)}),ge=/<!--[\s\S]*?-->/g,ne=/<\s*script\b(?=[^>]*\ssetup(?:[\s=>/]|>))[^>]*>/i,A="__vitepress_demo_plugin_script_setup_token__",$e=(e,s)=>Object.prototype.hasOwnProperty.call(e,s),ye=e=>e.replace(ge,""),F=e=>!!e&&ne.test(ye(e)),ae=e=>{for(const s of e){if((s==null?void 0:s.type)==="html_block"&&F(s.content))return s;const t=s==null?void 0:s.children;if(Array.isArray(t)){const l=ae(t);if(l)return l}}return null},te=(e,s,t)=>e.includes(s)&&(!t||e.includes(t)),se=(e,s)=>e.replace(ne,t=>`${t}
${s}`),Pe=(e,s)=>{!e||$e(e,A)||(e[A]=ae(s))},v=(e,s,t,l)=>{var d,$;const n=e.sfcBlocks.scripts,c=F((d=e.sfcBlocks.scriptSetup)==null?void 0:d.tagOpen)?e.sfcBlocks.scriptSetup:n.find(y=>F(y.tagOpen)),u=F(($=e[A])==null?void 0:$.content)?e[A]:null,i=t||"";let p="";if(l==="dynamicImport"?p=t?`
      const ${i} = shallowRef();
      onMounted(async () => {
        ${i}.value = (await import('${s}')).default;
      });
      `.trim():`
      onMounted(async () => {
        await import('${s}');
      });
      `.trim():l==="inject"?p=`
      ${t}
    `.trim():p=t?`import ${i} from '${s}'`:`import '${s}'`,c){if(te(c.content,s,i))return;c.content=se(c.content,p),c.contentStripped=`${p}
${c.contentStripped||""}`;return}if(u){if(te(u.content,s,i))return;u.content=se(u.content,p);return}if(!c){const y={type:"script",tagClose:"<\/script>",tagOpen:"<script setup lang='ts'>",content:`<script setup lang='ts'>
        ${p}
        <\/script>`,contentStripped:p};n.push(y),e.sfcBlocks.scriptSetup=y}},Ce=e=>{let s=!0;const t=[];for(;s;){const l=e.lastIndexOf("/");if(l===-1)s=!1;else{const n=e.substring(l+1);t.unshift(n),e=e.substring(0,l)}}return"Temp"+btoa(encodeURIComponent(t.join("-").split(".").slice(0,-1).join("."))).replace(/=/g,"Equal")},oe=[/<demo(\s|\n)((.|\n)*)><\/demo>/,/<demo(\s|\n)((.|\n)*)\/>/],B=(e,s)=>b.default.relative(e,s).replace(/\\/g,"/"),V=(e,s)=>b.default.resolve(e,s||".").replace(/\\/g,"/"),Se=e=>e.replace(/'/g,'"').replace(/\\n/g,"").trim().replace(/^"/,"").replace(/"$/,"").replace(/,(\s|\n)*\}$/,"}").replace(/,(\s|\n)*\]$/,"]"),ke=(e,s,t)=>{const l={vue:{},react:{},svelte:{},solid:{},html:{}};for(const n of Object.keys(e)){const c=Se(e[n]||"");if(!!c)try{const u=JSON.parse(c);if(Array.isArray(u))u.forEach(i=>{const p=V(t,i),d=B(b.default.dirname(s[n]),p);l[n][d]={filename:i,code:""}});else if(typeof u=="object"&&u)for(const i in u)l[n][i]={filename:u[i],code:""};for(const i in l[n]){const p=l[n][i].filename,d=V(t,p);p&&E.default.existsSync(d)?(l[n][i].code=E.default.readFileSync(d,"utf-8"),l[n][i].entry=d===s[n],l[n][i].path=B(b.default.dirname(s[n]),d)):delete l[n][i]}}catch{}}return l},we=()=>({html:"",vue:"",react:"",svelte:"",solid:""}),_e=e=>btoa(unescape(encodeURIComponent(JSON.stringify(e)))),je=(e,s,t,l)=>{Object.values(s).forEach(n=>{const c=V(l,n.filename);if(c===t)return;const u=B(b.default.dirname(t),c);e[u]=n.code})},Oe=({playground:e,playgroundName:s,scope:t,files:l,inputFiles:n,componentPaths:c,baseDir:u})=>{var p,d,$,y,r,O,R,k,C,T,N,w;const i=we();if(!e.show)return i;try{const f=e.templates||[],W=(p=f.find(a=>a.scope==="global"))==null?void 0:p.files,U=(d=f.find(a=>a.scope===t))==null?void 0:d.files,P={html:{...($=f.find(a=>a.scope==="html"))==null?void 0:$.files},vue:{...(y=f.find(a=>a.scope==="vue"))==null?void 0:y.files},react:{...(r=f.find(a=>a.scope==="react"))==null?void 0:r.files},svelte:{...(O=f.find(a=>a.scope==="svelte"))==null?void 0:O.files},solid:{...(R=f.find(a=>a.scope==="solid"))==null?void 0:R.files}};Object.keys(P).forEach(a=>{n[a]&&je(P[a],l[a],c[a],u)});const o=Array.isArray(e.config)?e.config.find(a=>a.name===s):e.config;if(!(o!=null&&o.url))return i;const S={html:((k=o.entryName)==null?void 0:k.html)||"index.html",vue:((C=o.entryName)==null?void 0:C.vue)||"App.vue",react:((T=o.entryName)==null?void 0:T.react)||"App.tsx",svelte:((N=o.entryName)==null?void 0:N.svelte)||"App.svelte",solid:((w=o.entryName)==null?void 0:w.solid)||"App.tsx"};Object.keys(c).forEach(a=>{c[a]&&(P[a][S[a]]=E.default.readFileSync(c[a],"utf-8"))});const _=typeof o.url=="function"?o.url:a=>`${o.url}#${a}`,x=o.fn||_e;Object.keys(P).forEach(a=>{const j={...W,...P[a],...U};i[a]=_(x(j))})}catch(f){console.warn("[vitepress-demo-plugin] Get playground url error:",f)}return i},le=(e,s,t,l)=>{var ee;const{demoDir:n,tab:c={},stackblitz:u={show:!1},codesandbox:i={show:!1},playground:p={show:!1}}=l||{};let{order:d="vue,react,svelte,solid,html",visible:$=!0,select:y=(c.order||"vue,react,svelte,solid,html").split(",")[0]||"vue"}=c;const r=be(s.content),{github:O,gitlab:R,scope:k,ssg:C,htmlWriteWay:T,background:N}=r,w=(ee=t.realPath)!=null?ee:t.path,f=n||b.default.dirname(w);r.order&&(d=r.order),r.select&&(y=r.select);const W={...u,show:r.stackblitz?r.stackblitz==="true":u.show},U={...i,show:r.codesandbox?r.codesandbox==="true":i.show},P={...p,show:r.playground?r.playground!=="false":p.show},o={title:r.title,description:r.description,vue:r.vuePath?b.default.join(f,r.vuePath).replace(/\\/g,"/"):"",html:r.htmlPath?b.default.join(f,r.htmlPath).replace(/\\/g,"/"):"",react:r.reactPath?b.default.join(f,r.reactPath).replace(/\\/g,"/"):"",svelte:r.sveltePath?b.default.join(f,r.sveltePath).replace(/\\/g,"/"):"",solid:r.solidPath?b.default.join(f,r.solidPath).replace(/\\/g,"/"):""},S=he=>V(n||b.default.dirname(w),he),_=o.vue?S(r.vuePath):"",x=o.html?S(r.htmlPath):"",a=o.react?S(r.reactPath):"",j=o.svelte?S(r.sveltePath):"",z=o.solid?S(r.solidPath):"",ie=b.default.resolve(f,o.vue||o.react||o.svelte||o.solid||o.html||".").replace(/\\/g,"/"),g=Ce(ie),M=`react${g}`,J=`svelte${g}`,D=`solid${g}`;v(t,"vitepress-demo-plugin/client","{ VitepressDemoBox, VitepressDemoPlaceholder }"),v(t,"vitepress-demo-plugin/style.css"),v(t,"vue","{ ref, shallowRef, onMounted }"),o.vue&&v(t,_,g,C?void 0:"dynamicImport"),o.react&&(v(t,"react","{ createElement as reactCreateElement }"),v(t,"react-dom/client","{ createRoot as reactCreateRoot }"),v(t,a,M,"dynamicImport")),o.svelte&&(v(t,"svelte","{ mount as svelteMount, unmount as svelteUnmount }"),v(t,j,J,"dynamicImport")),o.solid&&(v(t,"solid-js/web","{ render as solidRender }"),v(t,"solid-js","{ createComponent as solidCreateComponent }"),v(t,z,D,"dynamicImport"));const I="__placeholder_visible_key__";v(t,I,`const ${I} = ref(true);`,"inject");const H=o.html?`TempCodeHtml${g}`:"''",q=o.react?`TempCodeReact${g}`:"''",K=o.svelte?`TempCodeSvelte${g}`:"''",L=o.solid?`TempCodeSolid${g}`:"''",G=o.vue?`TempCodeVue${g}`:"''";o.html&&v(t,`${x}?raw`,H),o.react&&v(t,`${a}?raw`,q),o.svelte&&v(t,`${j}?raw`,K),o.solid&&v(t,`${z}?raw`,L),o.vue&&v(t,`${_}?raw`,G);const Q={vue:r.vueFiles,react:r.reactFiles,svelte:r.svelteFiles,solid:r.solidFiles,html:r.htmlFiles},X={vue:_,react:a,svelte:j,solid:z,html:x},Y=ke(Q,X,f);let Z="";(l==null?void 0:l.locale)&&typeof l.locale=="object"&&(Z=encodeURIComponent(JSON.stringify(l.locale)));const{html:ce,vue:de,react:ue,svelte:pe,solid:me}=Oe({playground:P,playgroundName:r.playground,scope:k,files:Y,inputFiles:Q,componentPaths:X,baseDir:f});return`
  ${C?"":`<vitepress-demo-placeholder v-show="${I}" />`}
  ${C?"":"<ClientOnly>"}
    <vitepress-demo-box 
      title="${o.title}"
      description="${o.description}"
      locale="${Z}"
      select="${y}"
      order="${d}"
      github="${O}"
      gitlab="${R}"
      theme="${(l==null?void 0:l.theme)||""}"
      lightTheme="${(l==null?void 0:l.lightTheme)||""}"
      darkTheme="${(l==null?void 0:l.darkTheme)||""}"
      stackblitz="${encodeURIComponent(JSON.stringify(W))}"
      codesandbox="${encodeURIComponent(JSON.stringify(U))}"
      playground="${encodeURIComponent(JSON.stringify(P))}"
      files="${encodeURIComponent(JSON.stringify(Y))}"
      scope="${k||""}"
      htmlWriteWay="${T}"
      background="${N}"
      htmlPlayground="${ce}"
      vuePlayground="${de}"
      reactPlayground="${ue}"
      sveltePlayground="${pe}"
      solidPlayground="${me}"
      :visible="!!${$}"
      @mount="() => { ${I} = false; }"
      ${o.html?`
            :htmlCode="${H}"
            `:""}
      ${o.vue?`
            :vueCode="${G}"
            `:""}
      ${o.react?`
            :reactCode="${q}"
            :reactComponent="${M}"
            :reactCreateRoot="reactCreateRoot"
            :reactCreateElement="reactCreateElement"
            `:""}
      ${o.svelte?`
            :svelteCode="${K}"
            :svelteComponent="${J}"
            :svelteMount="svelteMount"
            :svelteUnmount="svelteUnmount"
            `:""}
      ${o.solid?`
            :solidCode="${L}"
            :solidComponent="${D}"
            :solidRender="solidRender"
            :solidCreateComponent="solidCreateComponent"
            `:""}
      >
      ${o.vue?`
            <template v-if="${g}" #vue>
              <${g}></${g}>
            </template>
            `:""}
    </vitepress-demo-box>
  ${C?"":"</ClientOnly>"}`.trim()},Re=(e,s)=>{e.core.ruler.push("vitepress-demo-prepare-script-setup",n=>{Pe(n.env,n.tokens)});const t=e.renderer.rules.html_inline,l=e.renderer.rules.html_block;e.renderer.rules.html_inline=(n,c,u,i,p)=>{const d=n[c];return d.content=d.content.replace(/<!--[\s\S]*?-->/g,""),oe.some($=>$.test(d.content))?le(e,d,i,s):t(n,c,u,i,p)},e.renderer.rules.html_block=(n,c,u,i,p)=>{const d=n[c];return d.content=d.content.replace(/<!--[\s\S]*?-->/g,""),oe.some($=>$.test(d.content))?le(e,d,i,s):l(n,c,u,i,p)}};exports.vitepressDemoPlugin=Re;
