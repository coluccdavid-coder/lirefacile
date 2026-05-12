"use strict";(()=>{var e={};e.id=791,e.ids=[791],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},1807:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>d,patchFetch:()=>g,requestAsyncStorage:()=>l,routeModule:()=>c,serverHooks:()=>x,staticGenerationAsyncStorage:()=>m});var s={};t.r(s),t.d(s,{POST:()=>u});var o=t(9303),i=t(8716),a=t(670),n=t(7070);let p=new(t(15)).ZP({apiKey:process.env.OPENAI_API_KEY});async function u(e){try{let r=await e.json(),t=r.profile,s=r.history||[],o=(await p.chat.completions.create({model:"gpt-4o-mini",messages:[{role:"system",content:`
Tu es une IA th\xe9rapeutique.

Tu dois cr\xe9er des exercices cognitifs uniques.

IMPORTANT :
- Ne jamais r\xe9p\xe9ter les m\xeames questions
- Adapter \xe0 la difficult\xe9
- Compatible AVC
- Compatible Dys
- R\xe9ponse courte
- Retourner uniquement JSON

Format :
{
  "question": "La femme lit un ____",
  "answer": "livre",
  "image": "https://images.unsplash.com/photo-example"
}
          `},{role:"user",content:`
Profil : ${JSON.stringify(t)}
Historique : ${JSON.stringify(s)}
          `}],response_format:{type:"json_object"}})).choices[0].message.content;return n.NextResponse.json(JSON.parse(o))}catch(e){return console.error(e),n.NextResponse.json({error:"Erreur g\xe9n\xe9ration exercice"},{status:500})}}let c=new o.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/exercice/route",pathname:"/api/exercice",filename:"route",bundlePath:"app/api/exercice/route"},resolvedPagePath:"/workspaces/lirefacile/app/api/exercice/route.js",nextConfigOutput:"",userland:s}),{requestAsyncStorage:l,staticGenerationAsyncStorage:m,serverHooks:x}=c,d="/api/exercice/route";function g(){return(0,a.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:m})}}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),s=r.X(0,[948,972,15],()=>t(1807));module.exports=s})();