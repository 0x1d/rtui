"use strict";

import Mustache from 'mustache';
import $ from 'jquery';

export default class Component {

  constructor(component, api) {
    this.component = component;
    this.template = document.querySelector('#' +  component).import.body.textContent;
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
      console.log(data);
      $('.' + this.component).html(Mustache.render(this.template, data));
    });
  }

}
