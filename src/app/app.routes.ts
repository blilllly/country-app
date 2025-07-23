import { Routes } from '@angular/router';
import { HomePageComponent } from './shared/pages/homePage/homePage.component';

export const routes: Routes = [
  {
    path: '',
    component: HomePageComponent,
  },
  {
    path: 'country',
    loadChildren: () => import('./country/country.routes'),
  },
  {
    path: '**',
    redirectTo: '',
  }
];
