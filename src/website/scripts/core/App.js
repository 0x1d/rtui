import $ from 'jquery';

import * as Components from '../components/exports';


export default class App {

  constructor(){

  }

  withDataStore(dataStore) {
    this.dataStore = dataStore;
    return this;
  }

  run() {
    this.components = this.loadComponents();
    //this.render();
    return this;
  }

  loadComponents(){
    this.components = [];
    for(let c in Components){
      let nodes = $('.' + c);
      for(let i = 0; i < nodes.length; i++){
        this.components.push(new Components[c](this, $(nodes[i])));
      };
    }
    return this.components;
  }

  render(){
    for(let component in this.components){
      this.components[component].render();
    }
    return this;
  }

}
