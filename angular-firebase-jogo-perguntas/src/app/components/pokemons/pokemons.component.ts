import { Pokemon } from './../../model/pokemon';
import { Component } from '@angular/core';
import { ApiPokemonService } from './../../services/api-pokemon.service'

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent {

  pokemon: Pokemon | any = { id: 0, name: '', resul: false, sprites: { front_default: '' } }
  listPokemon: Pokemon[] = [];

  //  listSelecao: string[] = ['squart', 'criptonita', 'pikachu'];

  listOpcoes = [
    {
      name: 'kakuna'
    },
    {
      name: 'weedle'
    },
    {
      name: 'wartortle'
    },
    {
      name: 'squirtle'
    },
    {
      name: 'charmeleon'
    },
    {
      name: 'bulbasaur'
    },
    {
      name: 'ivysaur'
    },
    {
      name: 'gulpin'
    },
    {
      name: 'croconaw'
    }
  ]

  listSelecao: any[] = [];

  constructor(private servicePokemon: ApiPokemonService) {

    this.buscarPokemon();

  }

  //numro aleatorios Inteiro
  getRandomInt(min: number, max: number): number {
    min = Math.ceil(min);
    max = Math.floor(max);

    return Math.floor(Math.random() * (max - min) + min);
  }

  async buscarPokemon() {
    this.servicePokemon.getOnePokemon(this.getRandomInt(1, 1010)).subscribe(
      {
        next: (res) => {
          this.pokemon = res;
        },
        error: (err) => {
          console.log('erro', err);
        },
        complete: () => {
          this.opcoesDinamica();

          this.inserindoNomeCoreto(this.pokemon.name);

        }
      }
    );


  }

  opcoesDinamica() {

    this.listSelecao = [];//limpando opcoes
    let nomeAleatorio = '';

    for (let i = 0; i < 4; i++) {


      let posicaoSelect = this.getRandomInt(0, this.listOpcoes.length - 1);
      nomeAleatorio = this.listOpcoes[posicaoSelect].name;

      console.log('nome aleatorio', nomeAleatorio);

      if (this.listSelecao.length == 0) {
        this.listSelecao.push(this.listOpcoes[posicaoSelect]);
      }
      else if (this.verificarNome(posicaoSelect)) {
        this.listSelecao.push(this.listOpcoes[posicaoSelect]);
      }
      else if (this.listSelecao.length == 1 && i == 3) {
        i = i - 1;
      }

    }

  }

  verificarNome(posicao?: number, nome?: string): boolean {

    for (const key in this.listSelecao) {
      if (posicao != undefined)
        if (this.listSelecao[key] === this.listOpcoes[posicao])
          return false;

      if (nome != null && nome != "")
        if (this.listSelecao[key] == nome)
          return false;

    }

    return true;

  }

  inserindoNomeCoreto(nome: string) {
    let posicaoAleatoria = this.getRandomInt(0, this.listSelecao.length - 1);
    if (this.verificarNome(undefined, nome)) {
      this.listSelecao[posicaoAleatoria].name = nome;
    }
  }

  respostaEscolha(value: any) {
    console.log("repostaEscolha", value);
    //pegar resposta escolhinha e verificar se esta coreta
    this.buscarPokemon();
  }

}
