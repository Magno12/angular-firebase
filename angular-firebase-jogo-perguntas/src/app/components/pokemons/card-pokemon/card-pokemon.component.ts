import { Pokemon } from './../../../model/pokemon';
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {


  @Input()
  id: number = 0;

  @Input()
  front_default: string = '';

  @Input()
  name: string = '';

  @Input()
  resul: boolean = false;


  @Input()
  opcoesDeEscolha: any = {};

  @Output() eventEmitterRespostaEscolhida = new EventEmitter<string>;

  constructor() {
   
  }

  respostaSelecionada(nomeEscolhido: string) {
    console.log('nomeEscolhido i', nomeEscolhido);
    this.eventEmitterRespostaEscolhida.emit(nomeEscolhido + ' ' + this.name);
  }

}
