import $ from 'jquery';
import Component from '../core/Component';

export default class Reload extends Component {

    constructor(ctx, node) {
        super(ctx, node, false);
        this.node.click(() => {
            ctx.getStore('RTorrentApi').loadAll();
        });
    }
}