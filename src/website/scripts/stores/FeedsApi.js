import RestStore from '../core/store/RestStore';

export default class RTorrentApi extends RestStore {
    constructor() {
        super('/feeds/api');
    }
}