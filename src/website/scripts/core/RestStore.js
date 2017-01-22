import $ from 'jquery';
import DataStore from './DataStore';

export default class RestStore extends DataStore {
  constructor(endpoint, mediator){
    super();
    this.endpoint = endpoint;
    this.mediator = mediator;
  }
  load(entry){
    return this.request('load', 'GET', entry);
  }
  save(entry){
    return this.request('save', 'POST', entry);
  }
  add(entry){
    return this.request('add', 'PUT', entry);
  }
  delete(entry){
    return this.request('delete', 'POST', entry);
  }
  request(event, type, payload){
    return $.ajax({
      url: this.endpoint,
      type: type,
      data: payload
    })
    .then(JSON.parse)
    .then((response) => {
      debugger;
      this.mediator.trigger(event, response)
    });
  }
  subscribe(subscriber, event){
    this.mediator.on(event, subscriber);
  }
}
