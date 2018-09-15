
import template from './Form.html'
import styles from './Form.scss'
import {popup} from './Modal'
const templateNode = document.createElement('template')
templateNode.innerHTML = `<div class='ni'>
                            <input type='checkbox' checked/>
                            <div></div>
                          </div>`
const templateResult = document.createElement('template')
templateResult.innerHTML = `<div class='result'>
                            <div></div>
                            <div></div>
                            <div></div>
                        </div>`
function is(nodo, selector){
    return nodo.closest(selector)==nodo
}
function getTargetNivel(e){
    const target = e.composedPath()[0].closest('div.ni')
    if (target && target.querySelector('input')){
        return [target.querySelector('input'),
         e.composedPath()[0]==target.querySelector('input')]//true si es el mismo input
    }
    return undefined
}
function getTargetResult(e){
    return e.composedPath()[0].closest('div.result')
}
export default class Form{
    constructor(modelo, niveles, cb, cuspide, nivelesIndex) {
        this.modelo = modelo
        this.niveles = niveles
        this.cb = cb
        this.cuspide = cuspide
        this.nivelesIndex = nivelesIndex
        this.div = undefined
        this.tabJerarquia = undefined
        this.tabBusqueda = undefined
        this.clientJ = undefined
        this.clientB = undefined
        this.tree = undefined
        this._cerrar = undefined
        this.panelNiveles = undefined
        this.toggle = undefined
        this.selectNiveles = undefined
        this.clickJerarquia = this.clickJerarquia.bind(this)
        this.clickBusqueda = this.clickBusqueda.bind(this)
        this.handleToggle = this.handleToggle.bind(this)
        this.clickNiveles = this.clickNiveles.bind(this)
        this.querykeyup = this.querykeyup.bind(this)
        this.clean = this.clean.bind(this)
        this.query = undefined
        this.filter = this.filter.bind(this)
        this.clickResult = this.clickResult.bind(this)
        this.result = undefined
        this.selected = undefined
        this.treeChanged = this.treeChanged.bind(this)
        this.aceptar = undefined
        this.clickAceptar = this.clickAceptar.bind(this)
    }
    clickAceptar(){
        let index = this.selected
        if (!(typeof this.selected == 'string')){
            index = this.selected.centro
        }
        this.cb({...this.modelo.find(it=>it.id==index).payload})
        this._cerrar()
    }
    treeChanged(e){
        this.asignSelected(e.detail.id)
        this.result.querySelectorAll('.result.selected').forEach(it=>it.classList.remove('selected'))
    }
    asignSelected(v){
        this.selected = v//puede ser un string(desde tree) o un nodo(desde resultados)
        this.aceptar.disabled = !this.selected
    }
    clickResult(e){
        const target= getTargetResult(e)
        if (!target){
            return
        }
        if (this.selected){
            this.selected.classList.remove('selected')
        }
        this.asignSelected(target)
        this.selected.classList.add('selected')
    }
    filter(){
        this.asignSelected(undefined)
        const checks = []
        this.panelNiveles.querySelectorAll('input:checked').forEach(input=>{
            if (input.codigo!=='ALL'){checks.push(input.codigo.trim())}
        })
        const qCentro = this.query.querySelector('#filterCentro').value
        const qDesc = this.query.querySelector('#filterDesc').value
        const data = this.modelo.filter(({payload})=>{
            if ((checks.includes(payload.IDNIVEL.trim())) &&
                ((qCentro.trim() && payload.IDCENTRO.includes(qCentro.trim())) ||
                (qDesc.trim() && payload.NOMBRECENTRO.toLowerCase().includes(qDesc.trim().toLowerCase())) )){
                return true
            }
        })
        this.result.innerHTML=''//clean
        const fragment = document.createDocumentFragment()
        data.forEach(({payload})=>{
            const tmp = templateResult.content.cloneNode(true)
            tmp.querySelector('.result').centro = payload.IDCENTRO
            tmp.querySelector("div div:nth-child(1)").innerText = this.nivelesIndex[payload.IDNIVEL].ABREVIATURA
            tmp.querySelector("div div:nth-child(2)").innerText = payload.IDCENTRO
            tmp.querySelector("div div:nth-child(3)").innerText = payload.NOMBRECENTRO
            fragment.appendChild(tmp)
        })
        this.result.appendChild(fragment)
    }
    querykeyup(e){
        this.setStateFilters()
    }
    handleToggle(e){
        this.selectNiveles.classList.toggle('oculto')
    }
    clickNiveles(e){
        const [target, directo] = getTargetNivel(e)
        if (!target){
            return
        }
        target.checked = directo?target.checked:!target.checked
        if (target.codigo.trim()=='ALL'){
            this.panelNiveles.querySelectorAll('input').forEach(input=>{
                input.checked = target.checked
            })
        }
        this.setStateFilters()
    }
    setStateFilters(){
        const seleccionados = this.panelNiveles.querySelectorAll('input:checked')
        const fcentro = this.query.querySelector('#filterCentro')
        const fdesc = this.query.querySelector('#filterDesc')
        const filtrar = this.query.querySelector('#filtrar')
        if (seleccionados.length > 1 ||(seleccionados.length==1 && seleccionados[0].codigo!='ALL')){
            fcentro.disabled = false
            fdesc.disabled = false
            filtrar.disabled = 
                (fcentro.value.length > 1 || fdesc.value.length > 3)? false: true
        }
        else{
            fcentro.disabled = true
            fdesc.disabled = true
            filtrar.disabled = true
        }
    }
    view(){
        this.div = document.createElement("div")
        const shadowRoot = this.div.attachShadow({mode: 'open'})
        shadowRoot.innerHTML = '<style>'+styles+'</style>'+template
        shadowRoot.querySelector('.empresa').innerText = this.cuspide.payload['DESCRIPCIONEMPRESA']
        shadowRoot.querySelector('.centro').innerText = this.cuspide.payload['IDCENTRO']
        shadowRoot.querySelector('.desc').innerText = this.cuspide.payload['NOMBRECENTRO']
        //eventos
        this.tabJerarquia = shadowRoot.querySelector('.tab.jerarquia')
        this.tabJerarquia.addEventListener('click', this.clickJerarquia)
        this.tabBusqueda = shadowRoot.querySelector('.tab.busqueda')
        this.tabBusqueda.addEventListener('click', this.clickBusqueda)
        this.clientJ = shadowRoot.querySelector('#clientJ')
        this.clientB = shadowRoot.querySelector('#clientB')
        this.tree = shadowRoot.querySelector('bk-wc-ui-tree')
        this.tree.data = this.modelo
        this.tree.addEventListener('bk-change', this.treeChanged)
        this._cerrar = popup(this.div)
        shadowRoot.querySelector('.aspa').addEventListener('click', this._cerrar)
        shadowRoot.querySelector('button.abandonar').addEventListener('click', this._cerrar)
        this.panelNiveles = shadowRoot.querySelector('.niveles')
        this.toggle = shadowRoot.querySelector(".capNiveles")
        this.toggle.addEventListener('click', this.handleToggle)
        this.selectNiveles = shadowRoot.querySelector(".selectNiveles")
        this.panelNiveles.addEventListener('click', this.clickNiveles)
        this.rellenarNiveles()
        this.query = shadowRoot.querySelector('.query')
        this.query.addEventListener('keyup', this.querykeyup)
        this.query.querySelector('#filtrar').addEventListener('click', this.filter)
        this.result = shadowRoot.querySelector('#clientB #resultados')
        this.result.addEventListener('click', this.clickResult)
        this.div.addEventListener('bk-clean', this.clean)
        this.aceptar = shadowRoot.querySelector('button.aceptar')
        this.aceptar.addEventListener('click', this.clickAceptar)
    }
    clean(){
        this.tabJerarquia.removeEventListener('click', this.clickJerarquia)
        this.tabBusqueda.removeEventListener('click', this.clickBusqueda)
        this.div.shadowRoot.querySelector('.aspa').removeEventListener('click', this._cerrar)
        this.div.shadowRoot.querySelector('button.abandonar').removeEventListener('click', this._cerrar)
        this.tree.removeEventListener('bk-change', this.treeChanged)
        this.toggle.removeEventListener('click', this.handleToggle)
        this.panelNiveles.removeEventListener('click', this.clickNiveles)
        this.query.removeEventListener('keyup', this.querykeypress)
        this.query.querySelector('#filtrar').removeEventListener('click', this.filter)
        this.result.removeEventListener('click', this.clickResult)
        this.div.removeEventListener('bk-clean', this.clean)
        this.aceptar.removeEventListener('click', this.clickAceptar)
    }
    clickJerarquia(){
        if (this.tabJerarquia.classList.contains('disabled')){
            this.tabJerarquia.classList.remove('disabled')
            this.tabBusqueda.classList.add('disabled')
            this.clientJ.classList.remove('disabled')
            this.clientB.classList.add('disabled')
            this.tree.selectedId = this.selected? this.selected.centro: undefined
        }
    }
    clickBusqueda(){
        if (this.tabBusqueda.classList.contains('disabled')){
            this.tabBusqueda.classList.remove('disabled')
            this.tabJerarquia.classList.add('disabled')
            this.clientB.classList.remove('disabled')
            this.clientJ.classList.add('disabled')
            this.tree.selectedId = undefined
            if (typeof this.selected == 'string'){
                this.asignSelected(undefined)
            }
        }
    }
    rellenarNiveles(){
        const t = this.panelNiveles
        this.niveles.forEach(n=>{
            const tmp = templateNode.content.cloneNode(true)
            const input = tmp.querySelector('input')
            input.codigo = n.CODIGO
            input.abreviatura = n.ABREVIATURA            
            tmp.querySelector('.ni div').innerHTML=
                `<span><b>${n.ABREVIATURA}</b>-${n.DESCRIPCION}</span>`
            t.appendChild(tmp)
        })
    }
}