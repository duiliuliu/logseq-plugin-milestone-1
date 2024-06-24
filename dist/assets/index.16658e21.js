import{h as M,r as d,j as f,F as v,a as e,B as u,S as L,A as R,b,D as T,c as B,d as E,U as F,T as y,C as U,e as $,f as z,R as j,g as P}from"./vendor.6266460b.js";const Y=function(){const s=document.createElement("link").relList;if(s&&s.supports&&s.supports("modulepreload"))return;for(const o of document.querySelectorAll('link[rel="modulepreload"]'))l(o);new MutationObserver(o=>{for(const r of o)if(r.type==="childList")for(const a of r.addedNodes)a.tagName==="LINK"&&a.rel==="modulepreload"&&l(a)}).observe(document,{childList:!0,subtree:!0});function n(o){const r={};return o.integrity&&(r.integrity=o.integrity),o.referrerpolicy&&(r.referrerPolicy=o.referrerpolicy),o.crossorigin==="use-credentials"?r.credentials="include":o.crossorigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function l(o){if(o.ep)return;o.ep=!0;const r=n(o);fetch(o.href,r)}};Y();const V=t=>{const s=t?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return M(s?.replaceAll(/^(\[\[)|(\]\])$/g,""),K()?.dateFormatter)},W=t=>{const s=t?.match(/\[\[(.+?)\]\]/g)?.slice(-1)[0];return C(s?t.replace(s,"").trim():t)},C=t=>{const s=/id::\s+[\w-]+/ig;t=t.replace(s,"");const n=/(?<!!)\[(.*?)\]\((.*?)\)/ig;return"<p>"+t.replace(n,"<a href=$2>$1</a>")+"</p>"},H=t=>t?.children?.find(n=>n?.content==="milestones")?.children?.map(n=>{const l=n?.content;return{content:W(l),date:V(l)}}),_=async(t,s)=>logseq.Editor.getBlock(t,s),K=()=>logseq.settings,G=({uuid:t,forceUpdate:s})=>{const[n,l]=d.exports.useState(),[o,r]=d.exports.useState(!0),[a,k]=d.exports.useState(!1),[p,S]=d.exports.useState(!0),[g,q]=d.exports.useState(!1);d.exports.useEffect(()=>{(async()=>{const m=await _(t,{includeChildren:!0}),i=H(m);l(i)})()},[t,s]);const O=()=>{r(!o)},w=c=>{k(c)},x=()=>{S(!p)},D=()=>{q(!g)},A=c=>n?.filter(i=>i.date.isSame(c,"day"))?.map((i,I)=>{const N=i.date.isBefore(M(),"day");return e(z,{title:i.content,arrowPointAtCenter:!0,children:e("div",{className:`whitespace-nowrap bg-blue-200 rounded-sm mb-1 ${N?"opacity-50":""}`,children:i.content},i.date.valueOf()+I)})});return f(v,{children:[e("div",{className:"w-screen h-screen absolute bg-transparent",onClick:()=>logseq.hideMainUI()}),f("div",{className:`${a?"w-2/3":"w-1/3"} h-5/6 bg-white absolute top-12 right-4 shadow-lg p-1 overflow-auto rounded transition-all`,children:[e("div",{className:"absolute left-4 top-4",children:a?e(u,{shape:"circle",icon:e(L,{}),onClick:()=>w(!1)}):e(u,{shape:"circle",icon:e(R,{}),onClick:()=>w(!0)})}),f("div",{className:"p-4",children:[e("div",{className:"absolute left-16 top-4",children:e(u,{shape:"circle",icon:o?e(b,{}):e(b,{}),onClick:O})}),e("div",{className:"absolute left-28 top-4",children:e(u,{shape:"circle",icon:p?e(T,{}):e(B,{}),onClick:x})}),e("div",{className:"absolute left-40 top-4",children:e(u,{shape:"circle",icon:g?e(E,{}):e(F,{}),onClick:D})}),e("br",{}),e("br",{}),o?e(v,{children:e(y,{reverse:g,mode:p?"left":"alternate",children:n?.map((c,m)=>f(y.Item,{dot:e(U,{style:{fontSize:"16px"}}),label:c.date.format("YYYY-MM-DD"),children:[" ",e("div",{dangerouslySetInnerHTML:{__html:c.content}})]}))})}):e($,{dateCellRender:A})]})]})]})};let h=new Map;console.log("[faiz:] === logseq-plugin-milestone loaded"),logseq.ready(()=>{logseq.Editor.registerSlashCommand("milestone",async()=>{const t=await logseq.Editor.getCurrentBlock();!t?.uuid||logseq.Editor.insertAtEditingCursor(`{{renderer milestone-${t.uuid}}}`)}),logseq.setMainUIInlineStyle({position:"fixed",zIndex:11}),logseq.provideModel({show(t){const s=t?.dataset?.faizUuid;J(s,h.get(s)||0),logseq.showMainUI()}}),logseq.App.onMacroRendererSlotted(async({slot:t,payload:s})=>{const n=h.get(s.uuid);if(h.set(s.uuid,n?n+1:1),!/^milestone/.test(s?.arguments?.[0]))return"milestone parse error";logseq.provideUI({key:"milestone",slot:t,reset:!0,template:`<a style="color: var(--ls-link-ref-text-color);" data-on-click="show" data-faiz-uuid="${s?.uuid}">show calender view</a>`})})});function J(t,s){j.render(e(P.StrictMode,{children:e(G,{uuid:t,forceUpdate:s})}),document.getElementById("root"))}