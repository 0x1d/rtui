"use strict";

import Mustache from 'mustache';
import $ from 'jquery';

export default class Component {

  constructor(node, mediator) {
    this.node = node;
    this.mediator = mediator;
    this.component = this.constructor.name;
    this.template = $.get(this.component + '.html'); //document.querySelector('#' +  this.component).import.body.textContent;
  }

  render(data) {
    let _this = this;
    this.template
      .then((template) => {
        _this.node.html(
          Mustache.render(template, data));
      });
  }

}
