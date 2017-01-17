import $ from 'jquery';
import DataStore from './DataStore';

export default class RestStore extends DataStore {
  constructor(endpoint){
    super();
    this.endpoint = endpoint;
  }
  load(entry){
    return this.request('GET', entry);
  }
  save(entry){
    return this.request('POST', entry);
  }
  add(entry){
    return this.request('PUT', entry);
  }
  delete(entry){
    return this.request('POST', entry);
  }
  request(type, payload){
    return $.ajax({
      url: this.endpoint,
      type: type,
      data: payload
    }).then(JSON.parse);
  }
}
