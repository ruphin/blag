import { html, GluonElement } from '../gluonjs/gluon.js';
import './blag-article.js';

class BlagPageArticle extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <blag-article src="${this.articleUri || ''}"></blag-article>
    `;
  }

  set article(article) {
    this.setAttribute('article', article);
    this.articleUri = `/articles/${article}.html`;
    this.render();
  }
  get article() {
    return this.getAttribute('article');
  }
}

customElements.define(BlagPageArticle.is, BlagPageArticle);
