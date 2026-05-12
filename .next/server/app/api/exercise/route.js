"use strict";(()=>{var e={};e.id=189,e.ids=[189],e.modules={399:e=>{e.exports=require("next/dist/compiled/next-server/app-page.runtime.prod.js")},517:e=>{e.exports=require("next/dist/compiled/next-server/app-route.runtime.prod.js")},5506:(e,r,t)=>{t.r(r),t.d(r,{originalPathname:()=>d,patchFetch:()=>m,requestAsyncStorage:()=>c,routeModule:()=>p,serverHooks:()=>x,staticGenerationAsyncStorage:()=>l});var o={};t.r(o),t.d(o,{POST:()=>u});var s=t(9303),i=t(8716),n=t(670);let a=new(t(15)).ZP({apiKey:process.env.OPENAI_API_KEY});async function u(e){try{let{profil:r,level:t,difficulty:o,history:s}=await e.json(),i=(await a.chat.completions.create({model:"gpt-4o-mini",response_format:{type:"json_object"},messages:[{role:"system",content:`
Tu es un neuropsychologue sp\xe9cialis\xe9.

Tu dois cr\xe9er un exercice th\xe9rapeutique.

R\xe8gles :

- Jamais r\xe9p\xe9ter une question d\xe9j\xe0 pos\xe9e
- Adapter au profil
- Difficult\xe9 progressive
- R\xe9ponse courte
- Toujours cr\xe9er une nouvelle phrase
- Utiliser un contexte r\xe9aliste
- Ne jamais reprendre une question de l'historique

Historique interdit :
${s.join(", ")}

Retourne uniquement du JSON.

Format :

{
  "instruction": "Compl\xe8te la phrase",
  "question": "Le gar\xe7on joue avec un ____ dans le parc",
  "answer": "ballon",
  "image": "https://..."
}
`},{role:"user",content:`
Profil: ${r}
Niveau: ${t}
Difficult\xe9: ${o}
`}]})).choices[0].message.content;return Response.json(JSON.parse(i))}catch(e){return console.error(e),Response.json({error:"Erreur g\xe9n\xe9ration IA"},{status:500})}}let p=new s.AppRouteRouteModule({definition:{kind:i.x.APP_ROUTE,page:"/api/exercise/route",pathname:"/api/exercise",filename:"route",bundlePath:"app/api/exercise/route"},resolvedPagePath:"/workspaces/lirefacile/app/api/exercise/route.js",nextConfigOutput:"",userland:o}),{requestAsyncStorage:c,staticGenerationAsyncStorage:l,serverHooks:x}=p,d="/api/exercise/route";function m(){return(0,n.patchFetch)({serverHooks:x,staticGenerationAsyncStorage:l})}},9303:(e,r,t)=>{e.exports=t(517)}};var r=require("../../../webpack-runtime.js");r.C(e);var t=e=>r(r.s=e),o=r.X(0,[948,15],()=>t(5506));module.exports=o})();