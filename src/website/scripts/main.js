import * as lib from './lib';
import $ from 'jquery';
import Component from './Component';

$(() => {
  var c = new Component('.foo', '{{up_rate}}', '/rtorrent/api');
  c.render();
});
