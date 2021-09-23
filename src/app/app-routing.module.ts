import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home-component';
import { OptInPreloadStrategy } from './shared/strategies/opt-in-preload-strategy';

const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
  },
  {
    path: 'beers',
    loadChildren: () =>
      import('./pages/beer/beer.module').then((m) => m.BeerModule),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: OptInPreloadStrategy,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
