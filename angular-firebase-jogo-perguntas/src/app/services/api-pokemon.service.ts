import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'

import { apiPokemon } from './../../../environments/environment';
import { Pokemon } from './../model/pokemon';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class ApiPokemonService {


  private urlBase = apiPokemon.key;
  private pokemon: Pokemon | any = { id: 0, name: '', resul: false, sprites: { front_default: '' } }


  constructor(private httpClient: HttpClient) {

  }

  getOnePokemon(id: number): Observable<Pokemon> {

    return this.httpClient.get<Pokemon>(`${this.urlBase}${id}`)

  }

}
