import $ from 'jquery';
import Component from './Component';

$(() => {
  var c = new Component('torrentlist', '/rtorrent/api');
  c.render();
});
