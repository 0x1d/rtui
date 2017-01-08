import $ from 'jquery';
import Component from '../core/Component';

export default class AddTorrent extends Component {
  
  constructor(node, dataStore, mediator){
    super(node, mediator);
    this.dataStore = dataStore;
    this.subscribe();
  }

  subscribe() {
    let _this = this;
    this.node.delegate('button', 'click', () => { _this.addTorrent(); });
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
