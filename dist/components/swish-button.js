import{registerFunctionComponent as d}from"webact";function m({amount:e,message:t,payee:n}){return`swish://payment?data=${decodeURIComponent(JSON.stringify({amount:{value:e,editable:!1},message:{value:t,editable:!1},payee:{value:n,editable:!1},version:1}))}&source=glaskogenkartan`}function u(e=navigator.userAgent){const t=e.match(/iPad/i),n=e.match(/iPhone/i),o=e.match(/Android/i);return Boolean(t||n||o)}async function c(e){const{$:t,css:n,postRender:o,html:i}=this,s=u();o(()=>{const a={amount:t().getAttribute("amount"),message:t().getAttribute("message"),payee:t().getAttribute("payee")};s?(t("details").remove(),t("button").textContent+=` ${a.amount} kr`,t("button").addEventListener("click",()=>{const r=m(a);window.open(r)})):(t("button").remove(),t("img").setAttribute("src",t().getAttribute("qr-code")))}),n`
    :host {
      display: block;
      margin: 1rem 0;
    }

    button {
      background-image: linear-gradient(180deg,#1dafec,#129bd4 98.72%);
      padding: 1em 0;
      border-radius: 4px;
      border: 0;
      color: white;
      width: 100%;
      font-size: 1rem;
    }

    img {
      max-width: 300px;
      width: 50vw;
    }
  `,i`
    <details>
      <summary>Visa QR-kod</summary>
      <img src="">
    </details>
    <button>Swisha</button>
  `}var b=d(c,{name:"swish-button"});export{b as default};
