!function(){"use strict";const e=new Map;function t(t,...n){let s=e.get(t);return void 0===s&&(s=new a(t),e.set(t,s)),new i(s,n)}class i{constructor(e,t){this.template=e,this.values=t}}const n=`{{lit-${Math.random()}}}`;class s{constructor(e,t,i,n,s){this.type=e,this.index=t,this.name=i,this.rawName=n,this.strings=s}}class a{constructor(e){this.parts=[],this.element=document.createElement("template"),this.element.innerHTML=e.join(n);const t=document.createTreeWalker(this.element.content,5);let i=-1,a=0;const o=[];for(;t.nextNode();){i++;const r=t.currentNode;if(1===r.nodeType){if(!r.hasAttributes())continue;const t=r.attributes;for(let o=0;o<t.length;o++){const l=t.item(o),c=l.value.split(n);if(c.length>1){const t=e[a],n=t.substring(0,t.length-c[0].length).match(/((?:\w|[.\-_$])+)=["']?$/)[1];this.parts.push(new s("attribute",i,l.name,n,c)),r.removeAttribute(l.name),a+=c.length-1,o--}}}else if(3===r.nodeType){const e=r.nodeValue.split(n);if(e.length>1){const t=r.parentNode,n=e.length-1;a+=n,r.textContent=e[n];for(let a=0;a<n;a++)t.insertBefore(new Text(e[a]),r),this.parts.push(new s("node",i++))}else r.nodeValue.trim()||(o.push(r),i--)}}for(const e of o)e.parentNode.removeChild(e)}}const o=(e,t)=>(null!=t&&!0===t.__litDirective&&(t=t(e)),null===t?void 0:t);class r{constructor(e,t,i){this.instance=e,this.startNode=t,this.endNode=i}setValue(e){if(null===(e=o(this,e))||"object"!=typeof e&&"function"!=typeof e){if(e===this._previousValue)return;this._setText(e)}else e instanceof i?this._setTemplateResult(e):Array.isArray(e)||e[Symbol.iterator]?this._setIterable(e):e instanceof Node?this._setNode(e):void 0!==e.then?this._setPromise(e):this._setText(e)}_insert(e){this.endNode.parentNode.insertBefore(e,this.endNode)}_setNode(e){this.clear(),this._insert(e),this._previousValue=e}_setText(e){const t=this.startNode.nextSibling;t===this.endNode.previousSibling&&t.nodeType===Node.TEXT_NODE?t.textContent=e:this._setNode(new Text(e)),this._previousValue=e}_setTemplateResult(e){let t;this._previousValue&&this._previousValue.template===e.template?t=this._previousValue:(t=new c(e.template,this.instance._partCallback),this._setNode(t._clone()),this._previousValue=t),t.update(e.values)}_setIterable(e){Array.isArray(this._previousValue)||(this.clear(),this._previousValue=[]);const t=this._previousValue;let i=0;for(const n of e){let e=t[i];if(void 0===e){let n=this.startNode;i>0&&(n=t[i-1].endNode=new Text,this._insert(n)),e=new r(this.instance,n,this.endNode),t.push(e)}e.setValue(n),i++}if(0===i)this.clear(),this._previousValue=void 0;else if(i<t.length){const e=t[i-1];this.clear(e.endNode.previousSibling),e.endNode=this.endNode}}_setPromise(e){e.then(t=>{this._previousValue===e&&this.setValue(t)}),this._previousValue=e}clear(e=this.startNode){let t;for(;(t=e.nextSibling)!==this.endNode;)t.parentNode.removeChild(t)}}const l=(e,t,i)=>{if("attribute"===t.type)return new class{constructor(e,t,i,n){this.instance=e,this.element=t,this.name=i,this.strings=n,this.size=n.length-1}setValue(e,t){const i=this.strings;let n="";for(let s=0;s<i.length;s++)if(n+=i[s],s<i.length-1){const i=o(this,e[t+s]);if(i&&(Array.isArray(i)||"string"!=typeof i&&i[Symbol.iterator]))for(const e of i)n+=e;else n+=i}this.element.setAttribute(this.name,n)}}(e,i,t.name,t.strings);if("node"===t.type)return new r(e,i,i.nextSibling);throw new Error(`Unknown part type ${t.type}`)};class c{constructor(e,t=l){this._parts=[],this.template=e,this._partCallback=t}update(e){let t=0;for(const i of this._parts)void 0===i.size?(i.setValue(e[t]),t++):(i.setValue(e,t),t+=i.size)}_clone(){const e=document.importNode(this.template.element.content,!0);if(this.template.parts.length>0){const t=document.createTreeWalker(e,5),i=this.template.parts;let n=0,s=0,a=i[0],o=t.nextNode();for(;null!=o&&s<i.length;)n===a.index?(this._parts.push(this._partCallback(this,a,o)),a=i[++s]):(n++,o=t.nextNode())}return e}}const h=Symbol("tag"),d=Symbol("needsRender"),p=Symbol("shadyTemplate"),u=e=>{window.ShadyCSS&&(void 0===e[p]&&(e[p]=document.createElement("template"),e[p].innerHTML=e.shadowRoot.innerHTML,ShadyCSS.prepareTemplate(e[p],e.localName)),ShadyCSS.styleElement(e))},m=function(e){return e.replace(/([a-z])([A-Z])|(.)([A-Z][a-z])/g,"$1$3-$2$4").toLowerCase()},f=function(e){e.$={},e.shadowRoot.querySelectorAll("[id]").forEach(t=>{e.$[t.id]=t})};class g extends HTMLElement{static get is(){return this.hasOwnProperty(h)&&this[h]||(this[h]=m(this.name))}connectedCallback(){"template"in this&&(this.attachShadow({mode:"open"}),this.render({sync:!0}),f(this))}async render({sync:e=!1}={}){this[d]=!0,e||await 0,this[d]&&(this[d]=!1,function(e,t,i=l){let n=t.__templateInstance;if(void 0!==n&&n.template===e.template&&n._partCallback===i)return void n.update(e.values);n=new c(e.template,i),t.__templateInstance=n;const s=n._clone();n.update(e.values);let a;for(;a=t.lastChild;)t.removeChild(a);t.appendChild(s)}(this.template,this.shadowRoot),u(this))}}let w=!1;const b=[],y=e=>{w||(window.addEventListener("hashchange",x),window.addEventListener("location-changed",x),window.addEventListener("popstate",x),document.body.addEventListener("click",v),w=!0),b.push(e)},v=e=>{if(!e.defaultPrevented){const t=_(e);t&&(e.preventDefault(),t===window.location.href||(window.history.pushState({},"",t),window.dispatchEvent(new Event("location-changed"))))}},_=e=>{if(0!==e.button)return null;if(e.metaKey||e.ctrlKey)return null;const t=e.path||e.composedPath&&e.composedPath();let i=null;for(var n,s=0;s<t.length;s++)if(n=t[s],"A"===n.tagName&&n.href){i=n;break}if(!i)return null;if("_blank"===i.target)return null;if(("_top"===i.target||"_parent"===i.target)&&window.top!==window)return null;const a=i.href,o=k(a,document.baseURI);let r;if((r=o.origin?o.origin:o.protocol+"//"+o.host)!==window.location.origin)return null;let l=o.pathname+o.search+o.hash;return"/"!==l[0]&&(l="/"+l),k(l,window.location.href).href},x=()=>{b.forEach(e=>e(C(),N(),A()))},C=()=>window.decodeURIComponent(window.location.pathname),N=()=>window.location.search.slice(1),A=()=>window.decodeURIComponent(window.location.hash.slice(1));let T,S;const k=(e,t)=>{if(null===t&&(t=void 0),void 0==T){T=!1;try{const t=new URL("b","http://a");t.pathname="c%20d",T=(T="http://a/c%20d"===t.href)&&"http://a/?b%20c"===new URL("http://a/?b c").href}catch(e){}}return T?new URL(e,t):(S||(S=document.implementation.createHTMLDocument("temp"),S.base=S.createElement("base"),S.head.appendChild(S.base),S.anchor=S.createElement("a")),S.base.href=t,S.anchor.href=e,S.anchor)};class E extends g{get template(){return t`
      <style>
        :host {
          display: block;
        }
      </style>
      <p>Welcome to my blag!</p>
      <p>Check out this <a href="/article/article1">article!</a>
    `}}customElements.define(E.is,E);const U=e=>(V=(t=>{const i=document.createElement("template");return i.innerHTML=e,document.importNode(i.content,!0)}),V.__litDirective=!0,V);var V;class L extends g{constructor(){super(),this.article=new Promise((e,t)=>{this.loadArticle=e,this.failArticle=t})}get template(){return t`
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
          font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
          font-weight: 600;
          font-size: 42px;
          margin-left: -2.63px;
          line-height: 1.04;
          letter-spacing: -0.63px;
        }
        figure {
          margin: 0;
        }
        figcaption {
          text-align: center;
          font-family: "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Geneva, Arial, sans-serif;
          font-size: 16px;
          line-height: 22.4px;
          margin-top: 10px;
          color: rgba(0, 0, 0, 0.68);
        }
        img {
          width: 100%;
        }

        p, strong {
          line-height: 33.18px;
          margin: 29px 0 0 0;
          letter-spacing: -.003em;
        }

        h3 {
          margin-top: 56px;
        }

        @media (max-width: 767px) {
          p, strong {
            margin: 21px 0 0 0;
            font-size: 18px;
            line-height: 1.58;
            letter-spacing: -.004em;
          }
        }
      </style>
      <div id="article">
        ${U(this.articleSource)}
      </div>
      <div id="loading"></div>
    `}static get observedAttributes(){return["src"]}attributeChangedCallback(e,t,i){"src"===e&&i&&this.fetchArticle()}get src(){return this.getAttribute("src")}set src(e){this.setAttribute("src",e)}fetchArticle(){this.removeAttribute("loaded"),fetch(this.src).then(e=>e.text()).then(e=>{this.articleSource=e,this.setAttribute("loaded",""),this.render()})}}customElements.define(L.is,L);class z extends g{get template(){return t`
      <style>
        :host {
          display: block;
        }
      </style>
      <blag-article src="${this.articleUri||""}"></blag-article>
    `}set article(e){this.setAttribute("article",e),this.articleUri=`/articles/${e}.html`,this.render()}get article(){return this.getAttribute("article")}}customElements.define(z.is,z);const R=document.createTextNode("\n  @font-face {\n    font-family: 'Cinzel';\n    font-style: normal;\n    font-weight: 900;\n    src: local('Cinzel Black'), local('Cinzel-Black'), url(https://fonts.gstatic.com/s/cinzel/v7/u8CPqNcpTcF_eDy_SWp9tVtXRa8TVwTICgirnJhmVJw.woff2) format('woff2');\n    unicode-range: U+0000-00FF, U+0131, U+0152-0153, U+02BB-02BC, U+02C6, U+02DA, U+02DC, U+2000-206F, U+2074, U+20AC, U+2122, U+2212, U+2215;\n  }\n"),$=document.createElement("style");$.appendChild(R),document.head.appendChild($);class P extends g{get template(){return t`
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
    `}constructor(){super(),this._routes={}}connectedCallback(){super.connectedCallback(),y((e,t,i)=>{if(0===Object.keys(this._routes).length)return void setTimeout(()=>{this._routeChanged(newRoute,oldRoute)},0);const n=this._oldPath;let s,a=e;(s=a.match(/^\/article\/([^\/]*)/))&&(a="/article",this.$.articlePage.article=s[1]),this._oldPath=a,this._routes[n]&&this._routes[n].classList.remove("visible"),this._routes[a]?this._routes[a].classList.add("visible"):this._routes[n]&&(console.warn("Requested page does not exist"),window.history.back())}),Array.prototype.map.call(this.$.pages.children,e=>{this._routes[e.getAttribute("route")]=e}),this._oldPath="/",window.dispatchEvent(new Event("location-changed"))}}customElements.define(P.is,P)}();