"use strict";

import $ from 'jquery';
import App from './core/App';
import Mediator from './core/Mediator';
import RestStore from './core/RestStore';

$(() => {
  var mediator = new Mediator();
  var rTorrentApi = new RestStore('/rtorrent/api', mediator);
  new App()
    .withDataStore(rTorrentApi)
    .run();
});
