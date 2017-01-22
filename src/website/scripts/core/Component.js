import Mustache from 'mustache';
import $ from 'jquery';

export default class Component {

  constructor(ctx, node) {
    this.ctx = ctx;
    this.node = node;
    this.component = this.constructor.name;
    this.template = $.get(this.component + '.html'); //document.querySelector('#' +  this.component).import.body.textContent;
  }

  templateHelpers() {
    return {};
  }

  render(data) {
    if(data) data.helpers = this.templateHelpers();
    this.template
      .then((template) => {
        this.node.html(Mustache.render(template, data));
      });
  }

}
