import { CountryService } from './../../services/country.service';
import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { rxResource } from '@angular/core/rxjs-interop';
import { ActivatedRoute } from '@angular/router';
import { of } from 'rxjs';
import { NotFoundComponent } from "../../../shared/components/notFound/notFound.component";
import { CountryInformationComponent } from "./country-information/country-information.component";

@Component({
  selector: 'app-country-page',
  imports: [NotFoundComponent, CountryInformationComponent],
  templateUrl: './country-page.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CountryPageComponent {

  countryCode = inject(ActivatedRoute).snapshot.params['code'];
  CountryService = inject(CountryService)

  countryResource = rxResource({
    params: () => ({code: this.countryCode}),
    stream: ({params}) => {
      return this.CountryService.searchCountryByAlphaCode(params.code);
    },
  })

}
