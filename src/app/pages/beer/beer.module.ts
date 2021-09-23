import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { beerRoutes } from './beer.route';
import { BeerListComponent } from './list/beer-list.component';
import { BeerDetailComponent } from './detail/beer-detail.component';
import { MasterDetailComponent } from './master-detail.component';

@NgModule({
  declarations: [MasterDetailComponent, BeerListComponent, BeerDetailComponent],
  imports: [CommonModule, RouterModule.forChild(beerRoutes)],
  providers: [],
  bootstrap: []
})
export class BeerModule {}
