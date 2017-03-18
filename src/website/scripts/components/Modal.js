import $ from 'jquery';
import Mustache from 'mustache';
import Component from '../core/Component';

export default class Modal extends Component {

    constructor(ctx, node) {
        super(ctx, node);
        console.log('init');
        let fragmentId = this.node.attr('href');
        this.node.click((event) => {
            /*event.preventDefault();
            let dialog = window.$(fragmentId);
            console.log(dialog);
            dialog.modal('open');*/

        });
        this.render({
            id: fragmentId,
            content: 'hallo'
        }).then(() => {

            //$.get(this.node.attr('href') + '.html').done((content) => {
            //this.dialog = window.$(fragmentId).html(content);
            //window.$(fragmentId).modal();
            //this.ctx.run(this.dialog);
            //});
        });
    }

    render(data) {
        return this.template
            .then((template) => {
                return new Promise((fulfill, reject) => {
                    $('body').append(Mustache.render(template, data));
                    fulfill();
                });
            });
    }

}