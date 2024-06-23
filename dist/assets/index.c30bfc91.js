import{h as M,r as d,j as u,F as w,a as o,B as f,S as D,A as I,b,D as L,c as N,T as y,C as T,d as B,e as E,R,f as F}from"./vendor.87498e14.js";const $=function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const s of document.querySelectorAll('link[rel="modulepreload"]'))l(s);new MutationObserver(s=>{for(const r of s)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(s){const r={};return s.integrity&&(r.integrity=s.integrity),s.referrerpolicy&&(r.referrerPolicy=s.referrerpolicy),s.crossorigin==="use-credentials"?r.credentials="include":s.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(s){if(s.ep)return;s.ep=!0;const r=n(s);fetch(s.href,r)}};$();const z=e=>{const t=e?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return M(t?.replaceAll(/^(\[\[)|(\]\])$/g,""),Y()?.dateFormatter)},U=e=>{const t=e?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return v(t?e.replace(t,"").trim():e)},v=e=>{const t=/id::\s+[\w-]+/ig;e=e.replace(t,"");const n=/(?<!!)\[(.*?)\]\((.*?)\)/ig;return"<p>"+e.replace(n,"<a href=$2>$1</a>")+"</p>"},j=e=>e?.children?.find(n=>n?.content==="milestones")?.children?.map(n=>{const l=n?.content;return{content:U(l),date:z(l)}}),P=async(e,t)=>logseq.Editor.getBlock(e,t),Y=()=>logseq.settings,V=({uuid:e,forceUpdate:t})=>{const[n,l]=d.exports.useState(),[s,r]=d.exports.useState(!0),[a,C]=d.exports.useState(!1),[p,k]=d.exports.useState(!0);d.exports.useEffect(()=>{(async()=>{const g=await P(e,{includeChildren:!0}),i=j(g);l(i)})()},[e,t]);const q=()=>{r(!s)},h=c=>{C(c)},S=()=>{k(!p)},O=c=>n?.filter(i=>i.date.isSame(c,"day"))?.map((i,x)=>{const A=i.date.isBefore(M(),"day");return o(E,{title:i.content,arrowPointAtCenter:!0,children:o("div",{className:`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${A?"opacity-50":""}`,children:i.content},i.date.valueOf()+x)})});return u(w,{children:[o("div",{className:"w-screen h-screen absolute bg-transparent",onClick:()=>logseq.hideMainUI()}),u("div",{className:`${a?"w-2/3":"w-1/3"} h-5/6 bg-white absolute top-12 right-4 shadow-lg p-1 overflow-auto rounded transition-all`,children:[o("div",{className:"absolute left-4 top-4",children:a?o(f,{shape:"circle",icon:o(D,{}),onClick:()=>h(!1)}):o(f,{shape:"circle",icon:o(I,{}),onClick:()=>h(!0)})}),u("div",{className:"p-4",children:[o("div",{className:"absolute left-14 top-4",children:o(f,{shape:"circle",icon:s?o(b,{}):o(b,{}),onClick:q})}),o("br",{}),o("div",{className:"absolute left-24 top-4",children:o(f,{shape:"circle",icon:p?o(L,{}):o(N,{}),onClick:S})}),o("br",{}),s?o(w,{children:o(y,{mode:p?"left":"alternate",children:n?.map((c,g)=>u(y.Item,{dot:o(T,{style:{fontSize:"16px"}}),label:c.date.format("YYYY-MM-DD"),children:[" ",o("div",{dangerouslySetInnerHTML:{__html:c.content}})]}))})}):o(B,{dateCellRender:O})]})]})]})};let m=new Map;console.log("[faiz:] === logseq-plugin-milestone loaded"),logseq.ready(()=>{logseq.Editor.registerSlashCommand("milestone",async()=>{const e=await logseq.Editor.getCurrentBlock();!e?.uuid||logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${e.uuid}}}`)}),logseq.setMainUIInlineStyle({position:"fixed",zIndex:11}),logseq.provideModel({show(e){const t=e?.dataset?.faizUuid;W(t,m.get(t)||0),logseq.showMainUI()}}),logseq.App.onMacroRendererSlotted(async({slot:e,payload:t})=>{const n=m.get(t.uuid);if(m.set(t.uuid,n?n+1:1),!/^milestone/.test(t?.arguments?.[0]))return"milestone parse error";logseq.provideUI({key:"milestone",slot:e,reset:!0,template:`<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${t?.uuid}">show calender view</a>`})})});function W(e,t){R.render(o(F.StrictMode,{children:o(V,{uuid:e,forceUpdate:t})}),document.getElementById("root"))}
