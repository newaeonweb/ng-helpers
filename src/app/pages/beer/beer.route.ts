import { Routes } from '@angular/router';
import { BeerListComponent } from './list/beer-list.component';
import { MasterDetailComponent } from './master-detail.component';
import { BeerDetailComponent } from './detail/beer-detail.component';

export const beerRoutes: Routes = [
  {
    path: '',
    component: MasterDetailComponent,
    children: [
      { path: '', component: BeerListComponent, data: { preload: true } },
      {
        path: ':id',
        component: BeerDetailComponent,
        data: { preload: false },
      },
    ],
  },
];
