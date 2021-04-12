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
  }

  postRender(() => {
    $('#close-button').addEventListener('click', () => closePage());

    document.addEventListener('folklore:display', async e => {
      console.log('folklore:display', e);

      $().setAttribute('open', 'open');

      const response = await fetch(e.detail.url);
      const html = await response.text();

      requestAnimationFrame(() => {
        $('main').innerHTML = html;
      });
    });
  });
}

export default registerFunctionComponent(FolkloreArticle, {
  metaUrl: import.meta.url
});
