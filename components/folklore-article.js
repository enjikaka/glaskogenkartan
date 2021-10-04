import { registerFunctionComponent } from '../web_modules/webact.js';

async function FolkloreArticle (props) {
  const { $, useCSS, postRender, html } = this;

  await useCSS();

  html`
    <header>
      <button id="close-button">Stäng ruta</button>
    </header>
    <main></main>
  `;

  function closePage() {
    $().removeAttribute('open');
    $('main').innerHTML = '';
  }

  postRender(() => {
    $('#close-button').addEventListener('click', () => closePage());

    document.addEventListener('folklore:display', e => {
      $().setAttribute('open', 'open');

      const htmlPromise = fetch(e.detail.url).then(r => r.text());

      setTimeout(async () => {
        const html = await htmlPromise;
        const fragment = document.createRange().createContextualFragment(html);

        requestAnimationFrame(() => {
          $('main').appendChild(fragment);
        });
      }, 500);
    });
  });
}

export default registerFunctionComponent(FolkloreArticle, {
  metaUrl: import.meta.url
});
