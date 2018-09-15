import template from './Tree.html'
import styles from './Tree.scss'
const templateNode = document.createElement('template')
templateNode.innerHTML = `<div class='node'>
                            <div class='caption'><span class='icon'></span><div class='text'></div></div>
                            <div class='hijos'></div>
                          </div>`
function is(nodo, selector){
  return nodo.closest(selector)==nodo
}
function getTop(nodo, padre){//!!padre debe ser posicionado!!!
  let tmpnodo = nodo
  let ret = tmpnodo.offsetTop
  while (tmpnodo.offsetParent && tmpnodo.offsetParent != padre){
    tmpnodo = tmpnodo.offsetParent
    ret +=  tmpnodo.offsetTop
  }
  return ret
}
export default class Tree extends HTMLElement {
    constructor() {
      super()
      const shadowRoot = this.attachShadow({mode: 'open'})
      shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
      this._client = shadowRoot.querySelector('#client')
      this._click = this._click.bind(this)
      this._selected = undefined
    }
    connectedCallback(){
      this._client.addEventListener('click', this._click)
    }
    disconnectedCallback(){
      this._client.removeEventListener('click', this._click)
      this._selected = undefined
    }
    _select(node){
      if (this._selected){
        this._selected.classList.remove('sel')
      }
      node.classList.add('sel')
      this._selected = node
    }
    _unselect(){
      if (this._selected){
        this._selected.classList.remove('sel')
      }
      this._selected = undefined
    }
    _click(e){
      const target = e.composedPath()[0]
      const node = target.closest('.node')
      if (is(target,'.text')){
        this._select(target)
        this.dispatchEvent(new CustomEvent('bk-change',{
          detail: this.selected, bubbles: true
        }))
      }
      else if (is(target, '.icon')){
        this._expandOrCollapse(node)
      }
    }
    _expandOrCollapse(node){
      if (is(node, '.terminal')){
        return
      }
      if (is(node,'.collapsed')){
        if (node.querySelector('.hijos').childElementCount==0){
          const hijosId = this._bd[node.id].hijos
          this._append(node.querySelector('.hijos'), hijosId)
        }
        node.classList.remove('collapsed')
      }
      else{
        node.classList.add('collapsed')
      }
    }
    _expand(id){
      const node = this._client.querySelector(`[id='${id}']`)
      if (node.querySelector('.hijos').childElementCount==0){
        const hijosId = this._bd[node.id].hijos
        this._append(node.querySelector('.hijos'), hijosId)
      }
      node.classList.remove('collapsed')
    }
    get selected(){
      if (this._selected){
        const id = this._selected.closest('.node').id
        return {...this._bd[id]}
      }
      return undefined
    }
    set selectedId(id){
      if (!id){
        this._unselect()
        return
      }
      if (!this._bd[id]){
        throw new Error("nodo no existe, " + id)
      }
      const ruta = this._getRutaNodo(id)
      ruta.forEach(it =>{
        this._expand(it.id)
      })
      const node = this._client.querySelector(`[id='${id}']`)
      this._select(node.querySelector('.text'))
      this._client.scrollTop = getTop(node, this._client)
    }
    get data(){
      return this._data
    }
    set data(val){
      if (this._data===val){
        return
      }
      this._data = val
      this._bd = {}
      this._data.forEach(it=>this._bd[it.id]={...it, hijos:[]})
      Object.entries(this._bd).forEach(([k, v])=> v.padre && this._bd[v.padre].hijos.push(k))
      this._paintInicial()
    }
    _getRutaNodo(id){
      const ret = [/*this._bd[id]*/]
      let padre =this._bd[id].padre
      while (padre){
        ret.unshift(this._bd[padre])
        padre = this._bd[padre].padre
      }
      return ret
    }
    _paintInicial(){
      this._client.innerHTML = ""
      const nodosRaiz = this._data.filter(it=>it.padre==null).map(it=>it.id)
      this._append(this._client, nodosRaiz, true)
    }
    _append(t, ids, root){
      ids.forEach((it, index)=>{
        const item = this._bd[it]
        const tmp = templateNode.content.cloneNode(true)
        tmp.querySelector('.text').innerText = item.text
        const node = tmp.querySelector('.node')
        node.id = it
        if (root){
          node.classList.add('raiz')
        }
        if (item.hijos.length == 0){
          node.classList.add('terminal')
          node.setAttribute('nivel', root?'0':(Number(t.closest('.node').getAttribute('nivel'))+1).toString())
        }
        else{
          node.classList.add('collapsed')
          node.setAttribute('nivel', root?'0':(Number(t.closest('.node').getAttribute('nivel'))+1).toString())
        }
        if (index==0){
          node.classList.add('ph')
        }
        t.appendChild(tmp)
        this._fixLines(node)
      })
    }
    _ancestro_nivel_i_es_ultimo(i, node){
      let tmp = node
      while(Number(tmp.getAttribute('nivel'))>i){
        tmp = tmp.parentElement.closest('.node')
      }
      if (tmp===node){
        return false
      }
      const id = tmp.parentElement.closest('.node').id
      if (this._bd[id].hijos.indexOf(tmp.id)==this._bd[id].hijos.length-1){
        return true
      }
      return false
    }
    _fixLines(node){
      const nivel = Number(node.getAttribute('nivel'))
      for (let i=nivel; i>0; i--){
        if (!this._ancestro_nivel_i_es_ultimo(i, node)){
          this._fix(i, node)
        }
      }
    }
    _fix(i, node){
      const nivel = Number(node.getAttribute('nivel'))
      const span = document.createElement('span')
      span.style.left = `-${(nivel - i)*1.4 + .9}em`
      if (nivel == i && is(node,'.ph')){
        span.classList.add('ph')
      }
      node.appendChild(span)
     }
}