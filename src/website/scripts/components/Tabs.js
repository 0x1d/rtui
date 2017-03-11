import $ from 'jquery';
import Component from '../core/Component';

export default class Tabs extends Component {

    constructor(ctx, node) {
        super(ctx, node);
        this.render().then(() => {
            window.$('ul.tabs').tabs();
            ctx.run(this.node);
        });
    }
}