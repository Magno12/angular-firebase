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
          this.inserindoNomeCoreto(this.pokemon.name);
        }
      }
    );

    this.listSelecao = [];//limpando opcoes

    this.opcoesDinamica();
  }

  opcoesDinamica() {

    for (let i = 0; i < 4; i++) {
      console.log(i)
      let posicaoSelect = this.getRandomInt(0, this.listOpcoes.length);

      this.listSelecao.push(this.listOpcoes[posicaoSelect]);

    }
  }

  inserindoNomeCoreto(nome: string) {
    let posicaoResposta = this.getRandomInt(0, this.listSelecao.length);
    this.listSelecao.length == 4 ? this.listSelecao[posicaoResposta].name = nome : console.log('ERRO AO INSERIR NOME CORRETONA LISTA DE OPÇOES DE ESCOLHA');
  }

  respostaEscolha(value: any) {
    console.log("repostaEscolha", value);
    this.buscarPokemon();
  }

}
