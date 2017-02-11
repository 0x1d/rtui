import $ from 'jquery';
import Component from '../core/Component';

export default class Navigation extends Component {

    constructor(ctx, node) {
        super(ctx, node);
    }

    init() {
        this.render();
    }

    subscribe() {
        var _this = this;
        this.node.delegate('a', 'click', function(event) {
            event.preventDefault();
            $.get($(this).attr('href'))
                .then((content) => {
                    var content = $('.content').html(content);
                    _this.ctx.run(content);
                });
        });
    }
}