import Mustache from 'mustache';
import $ from 'jquery';

export default class Component {

  constructor(node, mediator) {
    this.node = node;
    this.mediator = mediator;
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
