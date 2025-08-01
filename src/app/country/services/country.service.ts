import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { RESTCountry } from '../interfaces/rest-countries.interface';
import { map, Observable, catchError, throwError, delay, of, tap } from 'rxjs';
import { CountryMapper } from '../mapper/country.mapper';
import type { Country } from '../interfaces/country.interface';
import { Region } from '../interfaces/region.interface';

const API_URL = 'https://restcountries.com/v3.1';

@Injectable({
  providedIn: 'root',
})
export class CountryService {

  private http = inject(HttpClient);
  private queryCacheByCapital = new Map<string, Country[]>();
  private queryCacheByCountry = new Map<string, Country[]>();
  private queryCacheByRegion = new Map<Region, Country[]>();

  searchByCapital(query: string): Observable<Country[]> {
    query = query.toLowerCase();

    if(this.queryCacheByCapital.has(query)){
      return of(this.queryCacheByCapital.get(query) ?? []);
    }

    return this.http.get<RESTCountry[]>(`${API_URL}/capital/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountriesArray(resp)),
      tap((countries) => this.queryCacheByCapital.set(query, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se pudo obtener países con ese query: ${query}`)
        );
      })
    );
  }

  searchByCountry(query: string): Observable<Country[]>{
    query.toLowerCase();

    if(this.queryCacheByCountry.has(query))
      return of(this.queryCacheByCountry.get(query) ?? []);

    return this.http.get<RESTCountry[]>(`${API_URL}/name/${query}`).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountriesArray(resp)),
      // delay(3000),
      tap( (countries) => this.queryCacheByCountry.set(query, countries) ),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se encontraron países con ese query: ${query}`)
        );
      })
    )
  }

  searchCountryByAlphaCode(code: string){

    return this.http.get<RESTCountry[]>(`${API_URL}/alpha/${code}`).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountriesArray(resp)),
      map( (countries) => countries.at(0)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se encontraron países con ese código: ${code}`)
        );
      })
    )
  }

  searchCountriesByRegion(region: Region){
    region.toLowerCase();

    if(this.queryCacheByRegion.has(region))
      return of(this.queryCacheByRegion.get(region) ?? []);

    return this.http.get<RESTCountry[]>(`${API_URL}/region/${region}`).pipe(
      map((resp) => CountryMapper.mapRestCountriesToCountriesArray(resp)),
      tap((countries) => this.queryCacheByRegion.set(region, countries)),
      catchError((error) => {
        console.log('Error fetching', error);
        return throwError(
          () => new Error(`No se encontraron países con esa región: ${region}`)
        );
      })
    )
  }
}
