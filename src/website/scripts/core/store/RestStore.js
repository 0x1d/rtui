import $ from 'jquery';
import Mediator from '../Mediator';
import DataStore from './DataStore';
import StoreAction from './StoreAction';

export default class RestStore extends DataStore {
  constructor(endpoint, mediator = new Mediator()){
    super(mediator);
    this.endpoint = endpoint;
  }
  load(entry){
    return this.request(StoreAction.LOAD, 'GET', entry);
  }
  save(entry){
    return this.request(StoreAction.SAVE, 'POST', entry);
  }
  add(entry){
    return this.request(StoreAction.ADD, 'PUT', entry);
  }
  delete(entry){
    return this.request(StoreAction.DELETE, 'POST', entry);
  }
  request(event, type, payload){
    return $.ajax({
      url: this.endpoint,
      type: type,
      data: payload
    })
    .then(JSON.parse)
    .then((response) => {
      this.mediator.trigger(event, response);
    });
  }
  on(event, subscriber, context){
    this.mediator.on(event, subscriber, context);
  }
}
