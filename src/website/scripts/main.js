import $ from 'jquery';
import RestStore from './core/RestStore';
import Mediator from './core/Mediator'
import AddTorrent from './components/AddTorrent';
import TorrentList from './components/TorrentList';

$(() => {
  var mediator = new Mediator();
  var restStore = new RestStore('/rtorrent/api');

  new AddTorrent($('.AddTorrent'), restStore, mediator).render();
  new TorrentList($('.TorrentList'), restStore, mediator).render();
});
