import { registerFunctionComponent } from 'webact';

import './swish-button.js';

async function GlaskogencardBuy () {
  const { $, postRender, html, useCSS } = this;

  await useCSS();

  function closePage() {
    $().removeAttribute('open');
  }

  postRender(() => {
    $('#close-button').addEventListener('click', () => closePage());
  });

  html`
    <button id="close-button">Stäng</button>
    <h2>Glaskogenkort</h2>
    <p>För att nyttja vandringsleder, vindskydd, ved, övernattningsstugor och dylikt i Glaskogens naturreservat krävs att du har ett Glaskogenkort. Du kan köpa Glaskogenkort på turistbyrån i Arvika eller på bensinstationer i närheten av Glaskogen.</p>
    <p>Det går också bra att Swisha till Stiftelsen Glaskogen på nr <a href="tel:1236824262">1236824262</a>. Referera då till nedanstående priser.</p>
    <p>Pengarna går till underhåll av stugor, vindskydd, leder, ved och så vidare.</p>

    <a href="https://www.glaskogen.se/glaskogskortet/">Köp Glaskogenkort</a>.

    <h3>Dagskort</h3>
    <p>Passar dig som över dagen vandrar eller grillar i Glaskogen, <em>utan övernattning</em>. Tillåter dig att <em>över dagen</em> nyttja ved, vindskydd och stugor. För övernattning, se nedan.</p>
    <span>50 kr per person</span>

    <h3>Dygnskort</h3>
    <p>För dig som skall övernatta i Glaskogen. Tillåter dig även nyttja vindskydd, kojor och stugor.</p>
    <span>80 kr per person</span>

    <h3>3-dygnskort</h3>
    <span>200 kr per person</span>

    <h3>Veckokort</h3>
    <span>480 kr per person</span>

    <h3>Årskort, 1 person</h3>
    <p>Samma befogenheter som dygnskort men gäller för ett helt år.</p>
    <span>980 kr</span>

    <h3>Årskort, familj</h3>
    <p>Samma befogenheter som dygnskort men gäller för ett helt år, och hela din familj.</p>
    <span>1600 kr per person</span>

    <h3>Fiskekort</h3>
    <p>Tillåter dig att fiska i de flesta sjöar i Glaskogens naturreservat.</p>
    <a href="https://www.ifiske.se/fiskekort-glaskogen.htm">Köp fiskekort</a>
  `;
}

export default registerFunctionComponent(GlaskogencardBuy, {
  metaUrl: import.meta.url,
  name: 'glaskogencard-buy'
});
