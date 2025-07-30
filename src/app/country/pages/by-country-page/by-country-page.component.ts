import { CountryService } from './../../services/country.service';
import { ChangeDetectionStrategy, Component, signal, inject, resource } from '@angular/core';
import { SearchInputComponent } from "../../components/search-input/search-input.component";
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { firstValueFrom, of } from 'rxjs';
import { rxResource } from '@angular/core/rxjs-interop';

@Component({
  selector: 'by-country-page',
  imports: [SearchInputComponent, CountryListComponent],
  templateUrl: './by-country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByCountryPageComponent {
  countryService = inject(CountryService);
  query = signal('');

  countryResource = rxResource({
    params: () => ({query: this.query()}),
    stream: ({params}) => {
      if(!params.query) return of([]);
      return this.countryService.searchByCountry(params.query);
    }
  });
  // countryResource = resource({
  //   params: () => ({query: this.query()}),
  //   loader: async({params}) => {
  //     if(!params.query) return;
  //     return await firstValueFrom(
  //       this.countryService.searchCountry(params.query)
  //     )
  //   }
  // });
 }
