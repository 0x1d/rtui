import $ from 'jquery';
import Component from '../core/Component';
import StoreAction from '../core/store/StoreAction';

export default class AddTorrent extends Component {

  constructor(ctx, node){
    super(ctx, node);
    this.rTorrentApi = ctx.getStore('RTorrentApi');
  }

  init() {
    this.render();
  }

  subscribe() {
    this.rTorrentApi.on(StoreAction.ADD, this.torrentAdded.bind(this));
    this.node.delegate('button', 'click', this.addTorrent.bind(this));
    this.node.delegate('input', 'keypress', this.enterEvent.bind(this));
  }

  enterEvent(){
    if (event.which == 13){
      this.addTorrent();
    }
  }

  getTorrentLinkField(){
    return this.node.find('input');
  }

  addTorrent(){
    this.rTorrentApi.add({torrentLink : this.getTorrentLinkField().val()});
  }

  torrentAdded(response){
    this.getTorrentLinkField().val('');
  }

}
