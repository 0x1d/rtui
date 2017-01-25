import RestStore from '../core/store/RestStore';

export default class RTorrentApi extends RestStore {
  constructor(){
    super('/rtorrent/api');
  }
  delete(hash){
    super.delete({
      action : 'multicall',
      call: 'd.erase',
      hash: hash
    });
  }
  loadAll(){
    super.load({
      action : 'getAll' 
    });
  }
}
