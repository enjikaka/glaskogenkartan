import{registerFunctionComponent as c}from"webact";import"./folklore-article.css";async function p(d){const{$:t,useCSS:n,postRender:a,html:r}=this;await n(),r`
    <header>
      <button id="close-button">Stäng ruta</button>
    </header>
    <main>
      <h1>Informationsruta</h1>
      <p>
        Välj en punkt i kartan för att få en utförlig beskrivning i denna ruta.
      </p>
    </main>
  `;function i(){t().removeAttribute("open"),t("main").innerHTML=`
    <h1>Informationsruta</h1>
    <p>
      V\xE4lj en punkt i kartan f\xF6r att f\xE5 en utf\xF6rlig beskrivning i denna ruta.
    </p>
    `}a(()=>{t("#close-button").addEventListener("click",()=>i()),document.addEventListener("folklore:display",async o=>{t("main").innerHTML="Laddar...",t().setAttribute("open","open");const m=fetch(o.detail.url).then(e=>e.text()),l=new Promise(e=>setTimeout(()=>e(),500)),[s]=await Promise.all([m,l]),u=document.createRange().createContextualFragment(s);requestAnimationFrame(()=>{t("main").innerHTML="",t("main").appendChild(u)})})})}var g=c(p,{metaUrl:import.meta.url,name:"folklore-article"});export{g as default};
