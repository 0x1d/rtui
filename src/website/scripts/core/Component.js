import Mustache from 'mustache';
import $ from 'jquery';
import DataField from './data/DataField';

export default class Component {

    constructor(ctx, node) {
        this.ctx = ctx;
        this.node = node;
        this.component = this.constructor.name;
        this.template = $.get(this.component + '.html'); //document.querySelector('#' +  this.component).import.body.textContent;
        this.data = {};
    }

    beforeInit() {
        this.subscribe();
    }

    init() {

    }

    subscribe() {

    }

    templateHelpers() {
        return {};
    }

    bindData() {
        let _this = this;
        $('[data-bind]').each(function() {
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
                    fulfill();
                });
            });
    }

}