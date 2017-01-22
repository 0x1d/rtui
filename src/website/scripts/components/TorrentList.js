import $ from 'jquery';

import RestStore from '../core/RestStore';
import Component from '../core/Component';

export default class TorrentList extends Component {

  constructor(ctx, node){
    super(ctx, node);
    this.dataStore = ctx.dataStore;
    this.subscribe();
    this.loadData();
  }

  subscribe() {
    this.dataStore.subscribe('add', (data) => { this.loadData(); });
    this.dataStore.subscribe('delete', (data) => { this.loadData(); });
    this.dataStore.subscribe('load', (data) => { this.render(data); });
    this.node.delegate('button.reload', 'click', (event) => {  this.loadData(); });
    this.node.delegate('button.delete', 'click', (event) => {  this.delete(event); });
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
    let request = {
      action : 'multicall',
      call: 'd.erase',
      hash: hash
    };
    this.dataStore.delete(request);
  }

  loadData(){
    let request = { action : 'getAll' };
    this.dataStore.load(request);
  }

  render(data) {
    debugger;
    super.render.call(this, data);

  }
}
