import { html, GluonElement } from '../gluonjs/gluon.js';
import { unsafeHTML } from '../lit-html/lib/unsafe-html.js';

class BlagArticle extends GluonElement {
  constructor() {
    super();
    this.article = new Promise((load, fail) => {
      this.loadArticle = load;
      this.failArticle = fail;
    });
  }
  get template() {
    return html`
      <style>
        :host(:not([loaded])) #article {
          display: none;
        }
        :host([loaded]) #loading {
          display: none;
        }
      </style>
      <div id="article">
        ${unsafeHTML(this.articleSource)}
      </div>
      <div id="loading">loading article...</div>
    `;
  }

  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'src') {
      this.fetchArticle();
    }
  }

  get src() {
    return this.getAttribute('src');
  }
  set src(src) {
    this.setAttribute('src', src);
  }

  fetchArticle() {
    fetch(this.src)
      .then(response => response.text())
      .then(body => {
        this.articleSource = body;
        this.setAttribute('loaded', '');
        this.render();
      });
  }
}

customElements.define(BlagArticle.is, BlagArticle);
