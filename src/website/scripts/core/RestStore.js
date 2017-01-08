import $ from 'jquery';
import DataStore from './DataStore';

export default class RestStore extends DataStore {
  constructor(endpoint){
    super();
    this.endpoint = endpoint;
  }
  load(entry){
    return fetch(this.endpoint)
      .then(this.toJsonResponse);
  }
  save(entry){}
  add(entry){
    return $.post(this.endpoint, entry);
  }
  delete(entry){}

  toJsonResponse(response) {
    return response.json();
  }
}
