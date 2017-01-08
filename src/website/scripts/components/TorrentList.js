import $ from 'jquery';

import Component from '../core/Component';

export default class TorrentList extends Component {

  constructor(node, dataStore, mediator){
    super(node, mediator);
    this.dataStore = dataStore;
    this.subscribe();
  }

  subscribe() {
    let _this = this;
    this.mediator.on('addTorrent', (data) => { _this.render(); });
    this.node.delegate('button.reload', 'click', (data) => {  _this.render(); });
    setInterval(() => { _this.render(); }, 5000);
  }

  render() {
    let _that = this;
    this.dataStore.load()
      .then((data) => {
        super.render.call(_that, data);
      });
  }

}
