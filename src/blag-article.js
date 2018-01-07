import { html, GluonElement } from '../gluonjs/gluon.js';
import { unsafeHTML } from '../lit-html/lib/unsafe-html.js';
import { until } from '../lit-html/lib/until.js';

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
        :host {
          display: block;
          font-family: Georgia, Cambria, "Times New Roman", Times, serif;
          color: rgba(0,0,0,.84);
          line-height: 1.4;
          font-size: 21px;
          letter-spacing: 0;
          font-weight: 400;
          font-style: normal;
          text-rendering: optimizeLegibility;
          -webkit-font-smoothing: antialiased;
          max-width: 740px;
          padding-left: 20px;
          padding-right: 20px;
          width: 100%;
          margin: 0 auto;
          box-sizing: border-box;
        }
        :host(:not([loaded])) #article {
          display: none;
        }
        :host([loaded]) #loading {
          display: none;
        }
        h1 {
          font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva,Arial, sans-serif;
          font-weight: 600;
          font-size: 42px;
          margin-left: -2.63px;
          line-height: 1.04;
          letter-spacing: -.015em;
        }
      </style>
      <div id="article">
        ${unsafeHTML(this.articleSource)}
      </div>
      <div id="loading"></div>
    `;
  }

  static get observedAttributes() {
    return ['src'];
  }

  attributeChangedCallback(attr, oldVal, newVal) {
    if (attr === 'src' && newVal) {
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
    this.removeAttribute('loaded');
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
