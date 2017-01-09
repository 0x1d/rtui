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
    let _this = this;
    this.mediator.on('addTorrent', (data) => { _this.render(); });
    this.node.delegate('button.reload', 'click', (data) => {  _this.render(); });
    setInterval(() => { _this.render(); }, 5000);
  }

  convertBytesToMb(bytes) {
    return (bytes / 1048576).toFixed(3)
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
    let _that = this;
    this.dataStore.load()
      .then((data) => {
        data.helpers = _that.templateHelpers();
        super.render.call(_that, data);
      });
  }

}
