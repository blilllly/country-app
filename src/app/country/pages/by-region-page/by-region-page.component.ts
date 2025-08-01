import { CountryService } from './../../services/country.service';
import { ChangeDetectionStrategy, Component, inject, signal } from '@angular/core';
import { CountryListComponent } from "../../components/country-list/country-list.component";
import { Region } from '../../interfaces/region.interface';
import { rxResource } from '@angular/core/rxjs-interop';
import { of } from 'rxjs';

@Component({
  selector: 'by-region-page',
  imports: [CountryListComponent],
  templateUrl: './by-region-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ByRegionPageComponent {

  countryService = inject(CountryService);

  public regions: Region[] = [
    'Africa',
    'Americas',
    'Asia',
    'Europe',
    'Oceania',
    'Antarctic',
  ]

  selectedRegion = signal<Region | null>(null);

  countryResource = rxResource({
    params: () => ({region: this.selectedRegion()}),
    stream: ({params}) => {
      if(!params.region) return of([]);
      return this.countryService.searchCountriesByRegion(params.region);
    }
  });
}
