import './base.scss'
import {popup} from '../../lib/index'
const data = [
    {id: '1', text: "nodo raiz 1", padre: null, payload: {}},
    {id: '2', text: "nodo raiz 2", padre: null, payload: {}},
    {id: '3', text: "nodo 1", padre: '1', payload: {}},
    {id: '4', text: "nodo 2", padre: '1', payload: {}},
    {id: '5', text: "nodo 1fgd", padre: '2', payload: {}},
    //{id: '6', text: "nodo 2fgd", padre: '2', payload: {}},
    {id: '7', text: "nodo ggh1", padre: '5', payload: {}},
    {id: '8', text: "nodo gfh2", padre: '5', payload: {}},

]
const it = document.querySelector('bk-wc-ui-tree')
it.data = data
it.addEventListener('bk-change', e => console.log(e))
//it.selectedId = '8'

/*const it2 = document.querySelector('bk-wc-ui-modal')
const b = document.querySelector('#b')
b.addEventListener('click', e => console.log(e))
it2.addEventListener('bk-close', e => console.log(e))*/

/*const templateNode = document.createElement('template')
templateNode.innerHTML = `<div>
                            wdwojdiqwdpqwiqwi<br/>
                            twertwertweoptweirtweot
                            <button id='b'>hola</button>
                        </div>`
const tmp = templateNode.content.cloneNode(true)
const b = tmp.querySelector('#b')
b.addEventListener('click', e => console.log(e))
const close = popup(tmp)
setTimeout(()=>close(), 5000)*/
const centro = document.querySelector('#centro')
const bean = document.querySelector('bk-wc-ui-bean-centros')
bean.addEventListener('bk-change',(e)=>centro.innerText=e.detail.id)
centro.innerText = bean.centro

