import { Pokemon } from './../../model/pokemon';
import { Component } from '@angular/core';
import { ApiPokemonService } from './../../services/api-pokemon.service'

@Component({
  selector: 'app-pokemons',
  templateUrl: './pokemons.component.html',
  styleUrls: ['./pokemons.component.css']
})
export class PokemonsComponent {

  /*  sprites: { front_default: string, other: { dream_world: { front_default: string } } }, */
  pokemon: Pokemon | any = { id: 0, name: '', resul: false, sprites: { front_default: '', other: { home: { front_default: '' } } } }
  listPokemon: any[] = [];
  resulPokemon: Pokemon | any = { id: 0, name: '', resul: false, sprites: { front_default: '', other: { home: { front_default: '' } } } }
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
    },
    {
      name: 'vanillite'
    },
    {
      name: 'dewott'
    },
    {
      name: 'duskull'
    },
    {
      name: 'tangrowth'
    }
  ]

  listSelecao: any[] = [];

  mostrarResult: boolean = false;
  resulBoll: boolean = false;
  cont = 0;
  resl = true;

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
          this.pokemon = {
            id: res.id,
            name: res.name,
            sprites: res.sprites
          }

        },
        error: (err) => {
          console.log('erro', err);
        },
        complete: () => {
          console.log('this', this.pokemon)
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
    const posicaoAleatoria = this.getRandomInt(0, this.listSelecao.length - 1);

    if (this.verificarNome(undefined, nome)) {
      this.listSelecao[posicaoAleatoria].name = nome;
    }
  }

  respostaEscolha(value: any) {
    this.mostrarResult = true;
    //console.log("repostaEscolha", value);
    //pegar resposta escolhinha e verificar se esta coreta
    this.pokemon.resul = this.resultResposta(value);

    this.resulPokemon = this.pokemon;

    //console.log('pokemon', this.pokemon)

    this.listPokemon.push(this.pokemon);

    this.cont = this.cont + 1;


    this.resl = !this.resl;
    this.exibirResultadoTemporario();
    this.buscarPokemon();

  }

  resultResposta(value: string): boolean {

    if (value == this.pokemon.name)
      return true;

    if (value != this.pokemon.name)
      return false;

    return false;
  }

  exibirResultadoTemporario(boo?: any) {
    /* this.resl = !boo; */
    setTimeout(() => {
      this.resl = !this.resl;
    }, 1000)

    // console.log('teste bool', this.resl)
  }

}
