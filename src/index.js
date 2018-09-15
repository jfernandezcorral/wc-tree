import Tree from './components/Tree';
import Modal, {popup} from './components/Modal';
import BeanCentros from './components/BeanCentros';
window.customElements.define('bk-wc-ui-tree', Tree);
window.customElements.define('bk-wc-ui-modal', Modal);
window.customElements.define('bk-wc-ui-bean-centros', BeanCentros);
export {Tree, Modal, popup, BeanCentros};