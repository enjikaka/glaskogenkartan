import{registerFunctionComponent as a}from"webact";import"./swish-button.js";async function o(){const{$:t,postRender:e,html:n,useCSS:s}=this;await s();function r(){t().removeAttribute("open")}e(()=>{t("#close-button").addEventListener("click",()=>r())}),n`
    <button id="close-button">Stäng</button>
    <h2>Glaskogenkort</h2>
    <p>För att nyttja vandringsleder, vindskydd, ved, övernattningsstugor och dylikt i Glaskogens naturreservat krävs att du har ett Glaskogenkort. Du kan köpa Glaskogenkort på turistbyrån i Arvika eller på bensinstationer i närheten av Glaskogen.</p>
    <p>Det går också bra att Swisha till Stiftelsen Glaskogen. Referera då till nedanstående priser.</p>
    <p>Du kan skanna QR-koden med din Swish-app på datorn, eller klicka på knappen för att öppna Swish på mobilen! Alternativt swisha manuellt till <tt>123 682 42 62</tt></p>
    <p>Pengarna går till underhåll av stugor, vindskydd, leder, ved och så vidare.</p>

    <h3>Dagskort</h3>
    <p>Passar dig som över dagen vandrar eller grillar i Glaskogen, utan övernattning. Tillåter dig att <em>över dagen</em> nyttja ved, vindskydd och stugor. För övernattning, se dygnskort.</p>
    <span>40 kr per person</span>
    <swish-button amount="40" message="Glaskogenkort. Dag." payee="1236824262" qr-code="img/dagskort.svg"></swish-button>

    <h3>Dygnskort</h3>
    <p>För dig som skall övernatta i Glaskogen. Tillåter dig att nyttja ved, vindskydd och stugor.</p>
    <span>60 kr per person</span>
    <a id="night"></a>
    <swish-button amount="60" message="Glaskogenkort. Dygn." payee="1236824262" qr-code="img/dygnskort.svg"></swish-button>

    <h3>Årskort</h3>
    <p>Samma befogenheter som dygnskort men gäller för ett helt år.</p>
    <span>800 kr per person</span>
    <swish-button amount="800" message="Glaskogenkort. År." payee="1236824262" qr-code="img/årskort.svg"></swish-button>

    <h3>Årskort, familj</h3>
    <p>Samma befogenheter som dygnskort men gäller för ett helt år, och hela din familj.</p>
    <span>1200 kr per person</span>
    <swish-button amount="1200" message="Glaskogenkort. År, familj." payee="1236824262" qr-code="img/årskort-familj.svg"></swish-button>

    <h3>Fiskekort</h3>
    <p>Tillåter dig att fiska i de flesta sjöar i Glaskogens naturreservat. Giltigt från köpetillfälle till klockan 24:00.</p>
    <span>80 kr per person</span>
    <swish-button amount="80" message="Fiskekort." payee="1236824262" qr-code="img/fiskekort.svg"></swish-button>
  `}var g=a(o,{metaUrl:import.meta.url,name:"glaskogencard-buy"});export{g as default};
