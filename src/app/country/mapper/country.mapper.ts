import { Country } from "../interfaces/country.interface";
import { RESTCountry } from "../interfaces/rest-countries.interface";

export class CountryMapper {
  static mapRestCountryToCountry( country: RESTCountry): Country{
    return {
      cca2: country.cca2,
      flag: country.flag,
      flagSvg: country.flags.svg,
      name: country.translations['spa'].common ?? 'No Spanish Name',
      capital: country.capital?.length ? country.capital.join(', ') : 'No Capital',
      population: country.population,
      fifa: country.fifa ?? 'No fifa code',
      area: country.area,
    }
  }

  static mapRestCountriesToCountriesArray( countries: RESTCountry[]): Country[] {
    return countries.map(this.mapRestCountryToCountry);
  }
}
