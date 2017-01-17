import $ from 'jquery';

import RestStore from '../core/RestStore';
import Component from '../core/Component';

export default class TorrentList extends Component {

  constructor(node, mediator){
    super(node, mediator);
    this.dataStore = new RestStore('/rtorrent/api');
    this.subscribe();
  }

  subscribe() {
    this.mediator.on('addTorrent', (data) => { this.render(); });
    this.node.delegate('button.reload', 'click', (event) => {  this.render(); });
    this.node.delegate('button.delete', 'click', (event) => {  this.delete(event); });
    setInterval(() => { this.render(); }, 5000);
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
    this.dataStore.delete(request)
      .then(()=>{
        this.render();
      });
  }

  render() {
    let request = { action : 'getAll' };
    this.dataStore.load(request)
      .then((data) => {
        super.render.call(this, data);
      });
  }

}
