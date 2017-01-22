import $ from 'jquery';
import RestStore from '../core/RestStore';
import Component from '../core/Component';

export default class AddTorrent extends Component {

  constructor(ctx, node){
    super(ctx, node);
    this.dataStore = ctx.dataStore;
    this.subscribe();
  }

  subscribe() {
    this.node.delegate('button', 'click', () => { this.addTorrent(); });
    this.node.delegate('input', 'keypress', (event) => {  if (event.which == 13) this.addTorrent(); });
    this.dataStore.subscribe('add', (response) => { this.torrentAdded(response); });
  }

  getTorrentLinkField(){
    return this.node.find('input');
  }

  addTorrent(torrentLink = this.getTorrentLinkField().val()){
    this.dataStore.add({torrentLink : torrentLink});
  }

  torrentAdded(response){
    //this.mediator.trigger('addTorrent', response);
    this.getTorrentLinkField().val('');
  }

}
