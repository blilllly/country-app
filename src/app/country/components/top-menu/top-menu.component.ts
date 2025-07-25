import { TitleCasePipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';

interface MenuOption {
  id: number;
  label: string;
  route: string;
  d: string;
}

@Component({
  selector: 'country-top-menu',
  imports: [RouterLink, RouterLinkActive, TitleCasePipe],
  templateUrl: './top-menu.component.html',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TopMenuComponent {

  menuOptions = signal<MenuOption[]>([
    {
      id: 0,
      label: 'por capital',
      route: '/country/by-capital',
      d: 'M.5 15.5v-2.25S6 10.5 9.75 9.5V4.211c0-.79.23-1.565.707-2.194c.364-.48.828-1.052 1.293-1.517h.5c.465.465.93 1.037 1.293 1.517c.478.629.707 1.404.707 2.194V9.5c3.75 1 9.25 3.75 9.25 3.75v2.25s-5.5-1-9.25-1c0 0-.5 2.28-.5 6.5c0 0 1.25.75 2.25 1.75v.5S13.75 23 12 23s-4 .25-4 .25v-.5c1-1 2.25-1.75 2.25-1.75c0-4.22-.5-6.5-.5-6.5c-3.75 0-9.25 1-9.25 1Z',
    },
    {
      id: 1,
      label: 'por país',
      route: '/country/by-country',
      d: 'M23 12c0-6.075-4.925-11-11-11m11 11c0 6.075-4.925 11-11 11m11-11c0 2.21-4.925 4-11 4S1 14.21 1 12M12 1C5.925 1 1 5.925 1 12M12 1c2.761 0 5 4.925 5 11s-2.239 11-5 11m0-22C9.239 1 7 5.925 7 12s2.239 11 5 11M1 12c0 6.075 4.925 11 11 11',
    },
    {
      id: 2,
      label: 'por región',
      route: '/country/by-region',
      d: 'M15.5 21.5v-17m0 17h-.333l-.358-.22A12 12 0 0 0 8.52 19.5H8.5m7 2h.177a12 12 0 0 0 6.173-1.71l.65-.39V2.5h-.25l-.357.22a12 12 0 0 1-6.29 1.78h-.353l-.483-.29A12 12 0 0 0 8.593 2.5H8.5m0 0h-.176A12 12 0 0 0 2.15 4.21l-.65.39v16.9h.25l.357-.22a12 12 0 0 1 6.29-1.78m.103-17v17m0 0h-.104m0 0H8.25',
    },
  ]);

}
