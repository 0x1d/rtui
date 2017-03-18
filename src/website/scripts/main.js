"use strict";

import $ from 'jquery';
import App from './core/App';
import RTorrentApi from './stores/RTorrentApi';

$(() => {
    new App()
        .withDataStore(new RTorrentApi())
        .run($('body'));
});