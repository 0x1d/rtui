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
    let _this = this;
    this.node.delegate('button', 'click', () => { _this.addTorrent(); });
    this.node.delegate('input', 'keypress', (event) => {  if (event.which == 13) _this.addTorrent(); });
  }

  getTorrentLinkField(){
    return this.node.find('input');
  }

  addTorrent(torrentLink = this.getTorrentLinkField().val()){
    let _this = this;
    this.dataStore.add({torrentLink : torrentLink})
      .then((response) => {
          _this.mediator.trigger('addTorrent', response);
          _this.getTorrentLinkField().val('');
      });
  }

}
