import $ from 'jquery';

import * as Components from '../components/exports';


export default class App {

    constructor() {
        this.dataStores = [];
    }

    withDataStore(dataStore) {
        this.dataStores[dataStore.constructor.name] = dataStore;
        return this;
    }

    getStore(dataStore) {
        return this.dataStores[dataStore];
    }

    run(ctx) {
        this._loadComponents(ctx);
        this._beforeInitComponents();
        this._initComponents();
        return this;
    }

    _loadComponents(ctx) {
        this.components = this.components || [];
        for (let c in Components) {
            let nodes = ctx ? ctx.find('.' + c) : [];
            for (let i = 0; i < nodes.length; i++) {
                let component = new Components[c](this, $(nodes[i]));
                this.components.push(component);
            };
        }
    }

    _initComponents() {
        this.components.forEach(this._initComponent);
    }

    _beforeInitComponents() {
        this.components.forEach(this._beforeInitComponent);
    }

    _initComponent(component) {
        component.init();
    }

    _beforeInitComponent(component) {
        component.beforeInit();
    }

    render() {
        for (let component in this.components) {
            this.components[component].render();
        }
        return this;
    }

}