import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Logger } from 'src/app/shared/services/logger.service';
import { Beer } from '../beer.interface';
import { Observable } from 'rxjs';
import { BeerService } from '../beer.service';

const log = new Logger('beerListPage');

@Component({
  selector: 'app-beer-detail',
  template: `
    <div class="container" *ngIf="(beer$ | async) as beer">
      <pre> {{ beer | json }} </pre>
    </div>
  `,
  styles: [``]
})
export class BeerDetailComponent implements OnInit {
  beer$: Observable<Beer>;
  constructor(private route: ActivatedRoute, private beerService: BeerService) {
    this.beer$ = this.beerService.getOne(this.route.snapshot.params['id']);
  }

  ngOnInit(): void {
    log.info('beer detail loaded', this.route.snapshot.params['id']);
  }
}
