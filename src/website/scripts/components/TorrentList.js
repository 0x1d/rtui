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
    this.node.delegate('button.reload', 'click', (data) => {  this.render(); });
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

  render() {
    this.dataStore.load()
      .then((data) => {
        super.render.call(this, data);
      });
  }

}
