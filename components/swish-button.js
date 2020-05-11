import { registerFunctionComponent } from '../web_modules/webact.js';

function generateSwishURL ({
  amount,
  message,
  payee
}) {
  const paymentRequest = {
    amount: {
      value: amount,
      editable: false
    },
    message: {
      value: message,
      editable: false
    },
    payee: {
      value: payee,
      editable: false
    },
    version: 1
  };

  return `swish://payment?data=${decodeURIComponent(JSON.stringify(paymentRequest))}&source=glaskogenkartan`;
}

async function hasSwishSupport () {
  try {
    await fetch('swish://', { mode: 'no-cors' });
    return true;
  } catch (e) {
    return false;
  }
}

async function SwishButton (props) {
  const { $, css, postRender, html } = this;

  const swishSupport = await hasSwishSupport();

  postRender(() => {
    const paymentData = {
      amount: $().getAttribute('amount'),
      message: $().getAttribute('message'),
      payee: $().getAttribute('payee')
    };

    if (swishSupport) {

      $('img').remove();
      $('button').addEventListener('click', () => {
        const swishUrl = generateSwishURL(paymentData);

        window.open(swishUrl);
      });
    } else {
      $('button').remove();
      $('img').setAttribute('src', $().getAttribute('qr-code'));
    }
  });


  css`
    :host {
      display: block;
      margin: 1rem 0;
    }

    button {
      background-image: linear-gradient(180deg,#1dafec,#129bd4 98.72%);
      padding: 0.5em 1em;
      border-radius: 4px;
    }

    img {
      max-width: 300px;
      width: 50vw;
    }
  `;

  html`
    <details>
      <summary>Visa QR-kod</summary>
      <img src="">
    </details>
    <button>Swisha</button>
  `;
}

export default registerFunctionComponent(SwishButton);
