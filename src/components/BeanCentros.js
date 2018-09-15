import template from './BeanCentros.html'
import styles from './BeanCentros.scss'
import {getCentros, getNiveles} from 'servicios'
import Form from './Form'
const DIGITS_LENGTH = 5
function fillLeftZeros(value, size) {
    while (value.length < size) {
        value = '0' + value;
    }
    return value;
}
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
function fillModel(data, cuspide, niveles){
    cuspide = fillLeftZeros(cuspide, DIGITS_LENGTH)
    const index = {}
    const ret = data.map(it=>{
        const tmp = {id: it['IDCENTRO'],
            text: `${niveles[it.IDNIVEL]['ABREVIATURA']} - ${it['IDCENTRO']} ${it['NOMBRECENTRO']}`,
            padre: it['IDCENTRO'] == cuspide? null: it["I DCENTROPADRE"],
            payload: it
            }
        index[it['IDCENTRO']] = tmp
        return tmp
    })
    return [ret, index]
}
function capitalize(s){
    return s.replace(/\b\w/g, l=>l.toUpperCase())
}
export default class BeanCentros extends HTMLElement {
    static get observedAttributes() {
        return ['disabled', 'centro', 'cuspide'];
    }
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._input = shadowRoot.querySelector('input')
      this._button = shadowRoot.querySelector('button')
      this._keypress = this._keypress.bind(this)
      this._keydown = this._keydown.bind(this)
      this._blur = this._blur.bind(this)
      this._clickInput = this._clickInput.bind(this)
      this._animationend = this._animationend.bind(this)
      this._updateCenter = this._updateCenter.bind(this)
      this._blurButton = this._blurButton.bind(this)
      this._returnModal = this._returnModal.bind(this)
      this._ready = false
      this._model = []
      this._modelIndex = {}
      this._niveles = []
      this._nivelesIndex = {}
    }
    _getModel(cuspide){
        this._ready = false
        this.disabled = true
        Promise.all([getCentros(cuspide),getNiveles()]).then(([data,niveles])=>{
            this._ready = true
            this.disabled = false
            this._niveles = [{CODIGO: 'ALL', ABREVIATURA: 'ALL', DESCRIPCION: 'Todos'}, ...niveles]
            this._nivelesIndex = this._niveles.reduce((a, it)=>{a[it.CODIGO]=it;return a;},{})
            const p = fillModel(data, cuspide, this._nivelesIndex)
            this._model = p[0]
            this._modelIndex = p[1]
            this._updateCenter()
        })
    }
    _upgradeProperty(prop) {
        if (this.hasOwnProperty(prop)) {
          let value = this[prop];
          delete this[prop];
          this[prop] = value;
        }
    }
    connectedCallback(){
        this._upgradeProperty('disabled')
        this._upgradeProperty('centro')
        this._upgradeProperty('cuspide')
        this._input.addEventListener('keypress', this._keypress)
        this._input.addEventListener('keydown', this._keydown)
        this._input.addEventListener('blur', this._blur)
        this._input.addEventListener('click', this._clickInput)
        this._input.addEventListener('animationend', this._animationend)
        this._button.addEventListener('click', this._updateCenter)
        this._button.addEventListener('blur', this._blurButton)
    }
    disconnectedCallback(){
        this._input.removeEventListener('keypress', this._keypress)
        this._input.removeEventListener('keydown', this._keydown)
        this._input.removeEventListener('blur', this._blur)
        this._input.removeEventListener('click', this._clickInput)
        this._input.removeEventListener('animationend', this._animationend)
        this._button.removeEventListener('click', this._updateCenter)
        this._button.removeEventListener('blur', this._blurButton)
    }
    _keypress(e){
        if (e.which==13){
            this._updateCenter()
        }
    }
    _keydown(e){
        this._input.classList.remove('error')
        if (e.keyCode == 27){
            this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH)
        }
    }
    _blur(e){
        if (!e.relatedTarget || !(is(e.relatedTarget, 'button'))){
            this._input.classList.remove('error')
            this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH)
        }
    }
    _clickInput(e){
        this._input.select()
        e.stopPropagation()
    }
    _animationend(e){
        this._input.classList.remove('animation-ok')
        this._input.classList.remove('animation-err')
    }
    _blurButton(e){
        if (!e.relatedTarget || !(is(e.relatedTarget, 'input'))){
            this._input.classList.remove('error')
            this._input.value = fillLeftZeros(this.centro, DIGITS_LENGTH)
        }
    }
    get disabled() {
        return this.hasAttribute('disabled');
    }
    set disabled(val) {
        if (val) {
          this.setAttribute('disabled', '');
        } else {
          this.removeAttribute('disabled');
        }
    }
    get centro() {
        return this.getAttribute('centro');
    }
    set centro(val) {
         this.setAttribute('centro', fillLeftZeros(val, DIGITS_LENGTH));
    }
    get cuspide() {
        return this.getAttribute('cuspide');
    }
    set cuspide(val) {
        this.setAttribute('cuspide', val);
    }
    attributeChangedCallback(name, oldValue, newValue) {
        if (oldValue===newValue){
            return
        }
        if (name=='disabled'){
            if (this.disabled){
                this._button.setAttribute('disabled', "")
                this._input.setAttribute('disabled', "")
            }
            else{
                this._button.removeAttribute('disabled')
                this._input.removeAttribute('disabled')
            }
        }
        else if(name=='centro'){
            this._input.value = newValue
            this._updateCenter()
        }
        else if (name=='cuspide'){
            this._getModel(newValue)
        }
        //console.log(name, oldValue, newValue, this.disabled, this.centro, this.cuspide)
    }
    _updateCenter(){
        if (!this._ready){
            return
        }
        if (this._input.value.trim()==""){
            this._abrirModal()
            return
        }
        this._input.value = fillLeftZeros(this._input.value, DIGITS_LENGTH)
        if (this._modelIndex[this._input.value]){
            this._input.classList.remove('error')
            this._input.classList.add('animation-ok')
            if (this._input.value!=this.centro){
                this.centro = this._input.value
            }
            this.dispatchEvent(new CustomEvent('bk-change',{
                detail: this._modelIndex[this.centro], bubbles: true
            }))
        }
        else{
            this._input.classList.add('error')
            this._input.classList.add('animation-err')
        }
    }
    _abrirModal(){
        this._modal = new Form(this._model, this._niveles, this._returnModal,this._modelIndex[this.cuspide], this._nivelesIndex)
        this._modal.view()
    }
    _returnModal(info){
        this.centro = info.IDCENTRO
    }
}
