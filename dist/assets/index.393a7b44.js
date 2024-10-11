import{h as b,r as f,j as k,F as E,a as s,B as p,S as W,A as H,b as D,D as Y,c as _,d as V,U as K,e as O,T as $,C as Q,f as G,g as J,R as X,i as Z}from"./vendor.800c6984.js";const ee=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))i(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&i(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function i(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};ee();const B=e=>{const t=e?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return b(t?.replaceAll(/^(\[\[)|(\]\])$/g,""),te()?.dateFormatter)},v=(e,t)=>{t&&(e=e.replace(`#${t}`,"")),t&&(e=e.replace(`[[${t}]]`,""));const n=e?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return I(n?e.replace(n,"").trim():e)},I=e=>{const t=/id::\s+[\w-]+/ig;e=e.replace(t,"");const n=/(?<!!)\[(.*?)\]\((.*?)\)/ig;return"<p>"+e.replace(n,"<a href=$2>$1</a>")+"</p>"},A=e=>{const t=e?.children?.find(n=>n?.content==="milestones");return(t?t?.children:e?.children)?.map(n=>{const i=n?.content;return{content:v(i),date:B(i)}})},j=async(e,t)=>logseq.Editor.getBlock(e,t),te=()=>logseq.settings;async function L(e){const t=new Map,n=[],i=await logseq.Editor.getPage(e);let o;try{o=(await logseq.DB.datascriptQuery(`[:find (pull ?j [:block/journal-day]) (pull ?b [:block/content])
        :in $ ?uuid
        :where
        [?t :block/uuid ?uuid]
        [?b :block/refs ?t]
        [?b :block/page ?j]
        ]`,`#uuid "${i.uuid}"`)).map(([r,a])=>({...r,...a}))}catch(r){console.error(r);return}for(const r of o)if(r["journal-day"]){const a=new Date(...oe(r["journal-day"])),g=a.getTime();t.has(g)||(t.set(g,{uuid:r.uuid}),n.push({content:v(r.content,e),date:b(a)}))}else n.push({content:v(r.content,e),date:B(r.content)});return n}function oe(e){const t=e/1e4>>0,n=((e-t*1e4)/100>>0)-1,i=e-t*1e4-(n+1)*100;return[t,n,i]}const se=({uuid:e,pageName:t,forceUpdate:n})=>{const[i,o]=f.exports.useState(),[r,a]=f.exports.useState([]),[g,T]=f.exports.useState(!0),[C,x]=f.exports.useState(!1),[m,N]=f.exports.useState(!0),[w,R]=f.exports.useState(!1);f.exports.useEffect(()=>{(async()=>{if(e){const c=await j(e,{includeChildren:!0}),u=A(c)?.sort((h,y)=>h.date.isBefore(y.date)?-1:1);o(u)}if(t){const c=(await L(t))?.sort((l,u)=>l.date.isBefore(u.date)?-1:1);o(c)}if(e&&t){const c=await j(e,{includeChildren:!0}),l=A(c),u=await L(t),h=[...l,...u].sort((y,F)=>y.date.isBefore(F.date)?-1:1);o(h)}})()},[t,e,n]);const z=()=>{T(!g)},q=d=>{x(d)},U=()=>{N(!m)},S=()=>{R(!w)},P=d=>i?.filter(l=>l.date.isSame(d,"day"))?.map((l,u)=>{const h=l.date.isBefore(b(),"day");return s(J,{title:l.content,arrowPointAtCenter:!0,children:s("div",{className:`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${h?"opacity-50":""}`,children:s("div",{"data-ref":l.content,dangerouslySetInnerHTML:{__html:l.content}})},l.date.valueOf()+u)})});return k(E,{children:[s("div",{className:"w-screen h-screen absolute bg-transparent",onClick:()=>logseq.hideMainUI()}),k("div",{className:`${C?"w-2/3":"w-1/3"} h-5/6 bg-white absolute top-12 right-4 shadow-lg p-1 overflow-auto rounded transition-all`,children:[s("div",{className:"absolute left-4 top-4",children:C?s(p,{shape:"circle",icon:s(W,{}),onClick:()=>q(!1)}):s(p,{shape:"circle",icon:s(H,{}),onClick:()=>q(!0)})}),k("div",{className:"p-4",children:[s("div",{className:"absolute left-16 top-4",children:s(p,{shape:"circle",icon:g?s(D,{}):s(D,{}),onClick:z})}),s("div",{className:"absolute left-28 top-4",children:s(p,{shape:"circle",icon:m?s(Y,{}):s(_,{}),onClick:U})}),s("div",{className:"absolute left-40 top-4",children:s(p,{shape:"circle",icon:w?s(V,{}):s(K,{}),onClick:S})}),s("div",{className:"absolute left-52 top-4",children:s(p,{shape:"circle",icon:r.length>0?s(O,{rotate:180,onClick:()=>a([])}):s(O,{}),onClick:S})}),s("br",{}),s("br",{}),g?s(E,{children:s($,{reverse:w,mode:m?"left":"alternate",children:i?.filter((d,c)=>!r?.includes(c)).map((d,c)=>s($.Item,{dot:s(Q,{style:{fontSize:"16px"},onClick:()=>{a(l=>[...l,c])}}),label:d.date.format("YYYY-MM-DD"),children:s("div",{"data-ref":d.content,dangerouslySetInnerHTML:{__html:d.content}})}))})}):s(G,{dateCellRender:P})]})]})]})};let M=new Map;console.log("[faiz:] === logseq-plugin-milestone loaded"),logseq.ready(()=>{logseq.Editor.registerSlashCommand("milestone",async()=>{const e=await logseq.Editor.getCurrentBlock();!e?.uuid||logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${e.uuid}}}`)}),logseq.Editor.registerSlashCommand("milestones-page",async()=>{!(await logseq.Editor.getCurrentBlock())?.uuid||logseq.Editor.insertAtEditingCursor("{{renderer :milestones, *}}")}),logseq.Editor.registerSlashCommand("milestones-all",async()=>{const e=await logseq.Editor.getCurrentBlock();!e?.uuid||logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${e.uuid}, *}}`)}),logseq.setMainUIInlineStyle({position:"fixed",zIndex:11}),logseq.provideModel({show(e){const t=e?.dataset?.faizUuid,n=e?.dataset?.faizPage;ne(M.get(t)||0,t,n),logseq.showMainUI()}}),logseq.App.onMacroRendererSlotted(async({slot:e,payload:{arguments:t,uuid:n}})=>{const i=M.get(n);if(M.set(n,i?i+1:1),/^milestone/.test(t?.[0])){let o=t[1]?.trim();if(o==="*"){o=(await logseq.Editor.getCurrentPage())?.originalName,logseq.provideUI({key:"milestone-v3",slot:e,reset:!0,template:`<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${n}" data-faiz-page="${o}">show calender view</a>`});return}logseq.provideUI({key:"milestone",slot:e,reset:!0,template:`<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${n}">show calender view</a>`})}if(t?.[0].trim()===":milestones"){let o=t[1]?.trim();o==="*"&&(o=(await logseq.Editor.getCurrentPage())?.originalName),o.startsWith("[[")&&(o=o.substring(2,o.length-2)),o.startsWith("#")&&(o=o.substring(1)),logseq.provideUI({key:"milestone-v2",slot:e,reset:!0,template:`<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-page="${o}">show calender view</a>`})}})});function ne(e,t,n){X.render(s(Z.StrictMode,{children:s(se,{uuid:t,pageName:n,forceUpdate:e})}),document.getElementById("root"))}
