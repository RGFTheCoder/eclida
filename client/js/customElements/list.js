export class HTMLInvList extends HTMLDivElement {
    constructor() {
        super();
        const shadow = this.attachShadow({ mode: 'open' });
        const div = document.createElement('div');
        this.#parent = div;
        shadow.appendChild(div);
        {
            const list = document.createElement('ul');
            this.#listElm = list;
        }
        const style = document.createElement('style');
        this.#sheet = style.sheet;
        shadow.appendChild(style);
    }
    #parent;
    #listElm;
    #sheet;
    #inv;
    get inv() {
        return this.#inv;
    }
    set inv(val) {
        this.#inv = val;
        this.redrawList();
    }
    static get observedAttributes() {
        return ['inv'];
    }
    redrawList() {
        while (this.#listElm.children.length > 0)
            this.#listElm.removeChild(this.#listElm.firstChild);
        const listItems = this.#inv;
        const liList = listItems.map((x) => {
            const ret = document.createElement('li');
            const icon = document.createElement('canvas');
            icon.width = 32;
            icon.height = 32;
            icon.getContext('2d').drawImage(x.image, 0, 0, 32, 32);
            ret.appendChild(icon);
            const text = document.createElement('span');
            text.textContent = x.name;
            ret.appendChild(text);
            const count = document.createElement('span');
            count.textContent = `x${x.count}`;
            ret.appendChild(count);
            return ret;
        });
        for (const li of liList) {
            this.#listElm.appendChild(li);
        }
    }
}
customElements.define('eclida-invlist', HTMLInvList, { extends: 'div' });
//# sourceMappingURL=list.js.map