import Mustache from 'mustache';
import $ from 'jquery';
import DataField from './data/DataField';

export default class Component {

    constructor(ctx, node, withTemplate = true) {
        this.ctx = ctx;
        this.node = node;
        this.component = this.constructor.name;
        this.template = withTemplate ? $.get(this.component + '.html') : undefined; //document.querySelector('#' +  this.component).import.body.textContent;
        this.data = {};
        //console.log('init ' + this.component);
    }

    beforeInit() {
        this.subscribe();
    }

    init() {}
    subscribe() {}
    templateHelpers() { return {}; }

    bindData() {
        let _this = this;
        this.node.find('[data-bind]').each(function() {
            var field = $(this);
            _this.data[field.data('bind')] = new DataField(field);
        });
    }

    render(data) {
        if (data) data.helpers = this.templateHelpers();
        return this.template
            .then((template) => {
                return new Promise((fulfill, reject) => {
                    this.node.html(Mustache.render(template, data));
                    this.bindData();
                    //this.ctx._loadComponents(this.node);
                    fulfill();
                });
            });
    }

}