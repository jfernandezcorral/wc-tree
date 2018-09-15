import template from './Modal.html'
import styles from './Modal.scss'
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
export default class Modal extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._popup = shadowRoot.querySelector('#popup')
      this._client = shadowRoot.querySelector('#client')
      this._click = this._click.bind(this)
      this.close = this.close.bind(this)
      this._closing = false
    }
    connectedCallback(){
      this._popup.addEventListener('click', this._click)
    }
    disconnectedCallback(){
      this._popup.removeEventListener('click', this._click)
    }
    _click(e){
        const target = e.composedPath()[0]
        if (target==this._popup){
        //if (is(target, '#popup')/* || is(target, '.aspa')*/){
            this.close()
        }
    }
    close(){
        if (this._closing){
            return
        }
        this._closing = true
        this.dispatchEvent(new CustomEvent('bk-close',{bubbles: true}))
        this._client.style.transform = "scale(0.1)"
        this._popup.style.opacity = '0.1'
        this._client.addEventListener("transitionend", ()=>{
            this.parentNode && this.parentNode.removeChild(this)
        })
    }
}
function popup(markup){
    const el = document.createElement('bk-wc-ui-modal')
    el.addEventListener('bk-close', ()=> markup.dispatchEvent(new CustomEvent('bk-clean',{bubbles: true})))
    el.appendChild(markup)
    document.body.appendChild(el)
    return el.close
}
export {popup}