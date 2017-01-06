"use strict";

import Mustache from 'mustache';
import $ from 'jquery';

export default class Component {

  constructor(selector, template, api) {
    this.selector = selector;
    this.template = template;
    this.api = api;
  }

  loadData(done) {
    fetch(this.api)
      .then(this.toJsonResponse)
      .then(done);
  }

  toJsonResponse(response) {
    return response.json();
  }

  render() {
    this.loadData((data) => {
      $(this.selector).html(Mustache.render(this.template, data));
    });
  }

}
