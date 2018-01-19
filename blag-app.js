import{html as e,GluonElement as t}from"../gluonjs/gluon.js";import{onRouteChange as a,currentPath as i,currentQuery as o,currentHash as s}from"../gluon-router/gluon-router.js";import"./blag-page-main.js";import"./blag-page-article.js";const n=document.createTextNode("\n  @font-face {\n    font-family: 'Cinzel';\n    font-style: normal;\n    font-weight: 900;\n    src: local('Cinzel Black'), local('Cinzel-Black'), url(https://fonts.gstatic.com/s/cinzel/v7/u8CPqNcpTcF_eDy_SWp9tVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;\n  }\n"),l=document.createElement("style");l.appendChild(n),document.head.appendChild(l);class r extends t{get template(){return e`
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
    `}constructor(){super(),this._routes={}}connectedCallback(){super.connectedCallback(),a((e,t,a)=>{if(0===Object.keys(this._routes).length)return void setTimeout(()=>{this._routeChanged(newRoute,oldRoute)},0);const i=this._oldPath;let o,s=e;(o=s.match(/^\/article\/([^\/]*)/))&&(s="/article",this.$.articlePage.article=o[1]),this._oldPath=s,this._routes[i]&&this._routes[i].classList.remove("visible"),this._routes[s]?this._routes[s].classList.add("visible"):this._routes[i]&&(console.warn("Requested page does not exist"),window.history.back())}),Array.prototype.map.call(this.$.pages.children,e=>{this._routes[e.getAttribute("route")]=e}),this._oldPath="/",window.dispatchEvent(new Event("location-changed"))}}customElements.define(r.is,r);
//# sourceMappingURL=blag-app.js.map
