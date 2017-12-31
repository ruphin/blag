import { html, GluonElement } from '../gluonjs/gluon.js';

class BlagPageMain extends GluonElement {
  get template() {
    return html`
      <style>
        :host {
          display: block;
        }
      </style>
      <p>Welcome to my blag!</p>
      <p>Check out this <a href="/article/article1">article!</a>
    `;
  }
}

customElements.define(BlagPageMain.is, BlagPageMain);
