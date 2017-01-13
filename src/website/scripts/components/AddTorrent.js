import $ from 'jquery';
import RestStore from '../core/RestStore';
import Component from '../core/Component';

export default class AddTorrent extends Component {

  constructor(node, mediator){
    super(node, mediator);
    this.dataStore = new RestStore('/rtorrent/api');
    this.subscribe();
  }

  subscribe() {
    this.node.delegate('button', 'click', () => { this.addTorrent(); });
    this.node.delegate('input', 'keypress', (event) => {  if (event.which == 13) this.addTorrent(); });
  }

  getTorrentLinkField(){
    return this.node.find('input');
  }

  addTorrent(torrentLink = this.getTorrentLinkField().val()){
    this.dataStore.add({torrentLink : torrentLink})
      .then((response) => {
          this.mediator.trigger('addTorrent', response);
          this.getTorrentLinkField().val('');
      });
  }

}
