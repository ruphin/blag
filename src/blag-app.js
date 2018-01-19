import { html, GluonElement } from '../gluonjs/gluon.js';
import { onRouteChange, currentPath, currentQuery, currentHash } from '../gluon-router/gluon-router.js';
import './blag-page-main.js';
import './blag-page-article.js';

const fontStyle = document.createTextNode(`
  @font-face {
    font-family: 'Cinzel';
    font-style: normal;
    font-weight: 900;
    src: local('Cinzel Black'), local('Cinzel-Black'), url(https://fonts.gstatic.com/s/cinzel/v7/u8CPqNcpTcF_eDy_SWp9tVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');
    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;
  }
`);

const styleNode = document.createElement('style');
styleNode.appendChild(fontStyle);
document.head.appendChild(styleNode);

class BlagApp extends GluonElement {
  get template() {
    return html`
    <style>
      :host {
        display: block;
      }
      .header {
        position: fixed;
        top: 0;
        width: 100%;
        padding: 0 20px;
        background: rgba(255,255,255,0.97);
        height: 65px;
        display: flex;
        justify-content: center;
        align-items: center;
      }
      .header-title {
        font-family: 'Cinzel', sans-serif;
        text-decoration: none;
        color: black;
        font-size: 36px;
      }
      @media (max-width: 767px) {
        .header {
          height: 56px;
          justify-content: space-between;
        }

        .header-title {
          font-size: 30px;
        }
      }
      #pages {
        padding-top: 65px;
      }
      #pages > *:not(.visible) {
        display: none;
      }
    </style>

    <div class="header"><a class="header-title" href="/">Blag</a></div>
    <div id="pages">
      <blag-page-main route="/"></blag-page-main>
      <blag-page-article id="articlePage" route="/article"></blag-page-article>
    </div>
    `;
  }

  constructor() {
    super();
    this._routes = {};
  }

  connectedCallback() {
    super.connectedCallback();
    onRouteChange((path, query, hash) => {
      // Some browsers call `onRouteChange` before `ready`.
      // If this happens, `this._routes` is still empty.
      // In that case, simply defer the call to `_routeChanged`.
      if (Object.keys(this._routes).length === 0) {
        setTimeout(() => {
          this._routeChanged(newRoute, oldRoute);
        }, 0);
        return;
      }

      const oldPath = this._oldPath;
      let newPath = path;

      let article;
      if ((article = newPath.match(/^\/article\/([^\/]*)/))) {
        newPath = '/article';
        this.$.articlePage.article = article[1];
      }

      this._oldPath = newPath;

      // Hide the old page
      if (this._routes[oldPath]) {
        this._routes[oldPath].classList.remove('visible');
      }

      // Show the new page
      if (this._routes[newPath]) {
        this._routes[newPath].classList.add('visible');
      } else {
        // Go back if the new page does not exist (and the old page does)
        if (this._routes[oldPath]) {
          console.warn('Requested page does not exist');
          window.history.back();
        }
      }
    });

    // Make a map of all pages
    Array.prototype.map.call(this.$.pages.children, page => {
      this._routes[page.getAttribute('route')] = page;
    });

    // Redirect to main page if the initial path does not exist
    this._oldPath = '/';

    // Trigger initial load
    window.dispatchEvent(new Event('location-changed'));
  }
}

customElements.define(BlagApp.is, BlagApp);
