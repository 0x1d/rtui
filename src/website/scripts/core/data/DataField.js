import DataBinding from './DataBinding';

export default class DataField {

    constructor(node, data) {
        this.node = node;
        this.data = {
            id: this.node.data('bind')
        };
        this.bind();
    }
    bind() {
        this.dataBinding = new DataBinding();
        this.dataBinding.inputChange(this.node, this.data);
        this.proxy = new Proxy(this.data, this.dataBinding.inputHandler());
    }
    get value() {
        return this.proxy.value;
    }
    set value(newValue) {
        this.proxy.value = newValue;
    }
}