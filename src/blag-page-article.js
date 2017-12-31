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
      <blag-article src="${this.articleSource}"></blag-article>
    `;
  }

  set article(article) {
    this.articleSource = `/articles/${article}.html`;
    this.render();
  }
}

customElements.define(BlagPageArticle.is, BlagPageArticle);
