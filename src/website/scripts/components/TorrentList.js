import $ from 'jquery';

import Component from '../core/Component';
import StoreAction from '../core/store/StoreAction';

export default class TorrentList extends Component {

  constructor(ctx, node){
    super(ctx, node);
    this.rTorrentApi = ctx.getStore('RTorrentApi');
  }

  init() {
    this.loadData();
  }

  subscribe() {
    this.rTorrentApi.on(StoreAction.ADD, this.loadData.bind(this));
    this.rTorrentApi.on(StoreAction.DELETE, this.loadData.bind(this));
    this.rTorrentApi.on(StoreAction.LOAD, this.render.bind(this));
    this.node.delegate('button.reload', 'click', this.loadData.bind(this));
    this.node.delegate('button.delete', 'click', this.delete.bind(this));
    setInterval(() => { this.loadData(); }, 5000);
  }

  convertBytesToMb(bytes) {
    return (bytes / 1048576).toFixed(3);
  }

  templateHelpers() {
    let _this = this;
    return {
      toMb: function() {
        return (text, render) => {
          return _this.convertBytesToMb(render(text));
        };
      }
    }
  }

  delete(event) {
    let hash = $(event.target).parents('.entry').data('hash');
    this.rTorrentApi.delete(hash);
  }

  loadData(){
    this.rTorrentApi.loadAll();
  }

}
