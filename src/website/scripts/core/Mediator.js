export default class Mediator {

  constructor() {
    this.events = [];
  }

  on(event, callback, context){
    this.events[event] = this.events[event] || [];
    this.events[event].push(context ? callback.bind(context) : callback);
  };

  trigger(event, args){
    if(this.events[event]){
      for (var i = this.events[event].length - 1; i >= 0; i--) {
        this.events[event][i](args || {});
      };
    }
  };

}
