import { html, GluonElement } from '../gluonjs/gluon.js';
import { onRouteChange, currentPath, currentQuery, currentHash } from '../gluon-router/gluon-router.js';
import './blag-page-main.js';
import './blag-page-article.js';

class BlagApp extends GluonElement {
  get template() {
    return html`
    <style>
      #pages > *:not(.visible) {
        display: none;
      }
    </style>

    <div class="header"><span>This is a header!</span> <a href="/">Go Home</a></div>
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
