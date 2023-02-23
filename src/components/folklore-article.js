import { registerFunctionComponent } from 'webact';
import './folklore-article.css';

async function FolkloreArticle (props) {
  const { $, useCSS, postRender, html } = this;

  await useCSS();

  html`
    <header>
      <button id="close-button">Stäng ruta</button>
    </header>
    <main>
      <h1>Informationsruta</h1>
      <p>
        Välj en punkt i kartan för att få en utförlig beskrivning i denna ruta.
      </p>
    </main>
  `;

  function closePage() {
    $().removeAttribute('open');
    $('main').innerHTML = `
    <h1>Informationsruta</h1>
    <p>
      Välj en punkt i kartan för att få en utförlig beskrivning i denna ruta.
    </p>
    `;
  }

  postRender(() => {
    $('#close-button').addEventListener('click', () => closePage());

    document.addEventListener('folklore:display', async e => {
      $('main').innerHTML = 'Laddar...';

      $().setAttribute('open', 'open');

      const htmlPromise = fetch(e.detail.url).then(r => r.text());
      const animationTimeout = new Promise(r => setTimeout(() => r(), 500));

      const [html] = await Promise.all([
        htmlPromise,
        animationTimeout
      ]);

      const fragment = document.createRange().createContextualFragment(html);

      requestAnimationFrame(() => {
        $('main').innerHTML = '';
        $('main').appendChild(fragment);
      });
    });
  });
}

export default registerFunctionComponent(FolkloreArticle, {
  metaUrl: import.meta.url,
  name: 'folklore-article'
});
