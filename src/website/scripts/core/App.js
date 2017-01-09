import $ from 'jquery';
import RestStore from './RestStore';
import Mediator from './Mediator'
import * as Components from '../components/exports';


export default class App {

  constructor(){
    this.mediator = new Mediator();
    this.restStore = new RestStore('/rtorrent/api');
    this.components = this.loadComponents();
    this.render();
  }

  loadComponents(){
    this.components = [];
    for(let c in Components){
      let nodes = $('.' + c);
      for(let i = 0; i < nodes.length; i++){
        this.components.push(new Components[c]($(nodes[i]), this.restStore, this.mediator));
      };
    }
    return this.components;
  }

  render(){
    for(let component in this.components){
      this.components[component].render();
    }
  }
  
}
