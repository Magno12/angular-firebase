import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-card-pokemon',
  templateUrl: './card-pokemon.component.html',
  styleUrls: ['./card-pokemon.component.css']
})
export class CardPokemonComponent {

  @Input()
  __mostrarResult: boolean = false;

  @Input()
  id: number = 0;

  @Input()
  front_default: string = '';

  @Input()
  name: string = '';

  @Input()
  resul: boolean = false;


  @Output() eventEmitterRespostaEscolhida = new EventEmitter<string>;

  @Output() eventeEmitterTeste = new EventEmitter<boolean>


  constructor()  {
    
  }
  
  respostaSelecionada(nomeEscolhido: string) {

    console.log('respiodfdfdfdfkjlkj')
    this.__mostrarResult = true;
    this.eventEmitterRespostaEscolhida.emit(nomeEscolhido);

  }

  teste() {
    this.eventeEmitterTeste.emit(true)
    console.log('teste() visualizar lista pokemons')
  }

}
