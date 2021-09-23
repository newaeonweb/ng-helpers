import { Component, OnInit } from '@angular/core';
import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';
import { Logger } from 'src/app/shared/services/logger.service';
import { Beer } from '../beer.interface';
import { BeerService } from '../beer.service';

const log = new Logger('beerListPage');

@Component({
  selector: 'app-beer-list',
  template: `
    <div class="container" *ngIf="(beers$ | async) as beers">
      <h1 class="is-size-5 has-text-centered pt-4 pb-4">Punk IPA Beers</h1>
      <div class="columns is-multiline is-mobile">
        <div class="column is-half" *ngFor="let item of beers">
          <div class="box" style="min-height: 150px">
            <article class="media">
              <div class="media-left">
                <figure class="image is-24x24">
                  <img [src]="item.imageUrl" alt="Image" height="30px" />
                </figure>
              </div>
              <div class="media-content">
                <div class="content">
                  <p>
                    <strong>{{ item.name }}</strong>
                    <br />
                    <small>First brewed: {{ item.firstBrewed }}</small>
                  </p>
                  <p class="mt-3 has-text-weight-medium is-family-secondary">
                    "{{ item.tagline }}"
                  </p>
                </div>
                <nav class="level is-mobile">
                  <div class="level-left">
                    <a class="level-item" aria-label="reply" routerLink="{{item.id}}">
                      detail
                    </a>
                  </div>
                </nav>
              </div>
            </article>
          </div>
        </div>
      </div>
      <button class="button" (click)="addBeer()">Add beer</button>
    </div>
  `,
  styles: [``]
})
export class BeerListComponent implements OnInit {
  beers$: Observable<Beer[]>;

  constructor(private beerService: BeerService) {
    this.beers$ = this.beerService.getAll();
  }

  ngOnInit(): void {
    log.info('beer list loaded');
  }

  addBeer() {
    const newBeer: Beer = {
      id: 1,
      name: 'Buzz',
      tagline: 'A Real Bitter Experience.',
      firstBrewed: '09/2007',
      description:
        'A light, crisp and bitter IPA brewed with English and American hops. A small batch brewed only once.',
      imageUrl: 'https://images.punkapi.com/v2/keg.png',
      abv: 4.5,
      ibu: 60,
      targetFg: 1010,
      targetOg: 1044,
      ebc: 20,
      srm: 10,
      ph: 4.4,
      attenuationLevel: 75,
      volume: {
        value: 20,
        unit: 'litres'
      },
      boilVolume: {
        value: 25,
        unit: 'litres'
      },
      method: {
        mashTemp: [
          {
            temp: {
              value: 64,
              unit: 'celsius'
            },
            duration: 75
          }
        ],
        fermentation: {
          temp: {
            value: 19,
            unit: 'celsius'
          }
        },
        twist: null
      },
      ingredients: {
        malt: [
          {
            name: 'Maris Otter Extra Pale',
            amount: {
              value: 3.3,
              unit: 'kilograms'
            }
          },
          {
            name: 'Caramalt',
            amount: {
              value: 0.2,
              unit: 'kilograms'
            }
          },
          {
            name: 'Munich',
            amount: {
              value: 0.4,
              unit: 'kilograms'
            }
          }
        ],
        hops: [
          {
            name: 'Fuggles',
            amount: {
              value: 25,
              unit: 'grams'
            },
            add: 'start',
            attribute: 'bitter'
          },
          {
            name: 'First Gold',
            amount: {
              value: 25,
              unit: 'grams'
            },
            add: 'start',
            attribute: 'bitter'
          },
          {
            name: 'Fuggles',
            amount: {
              value: 37.5,
              unit: 'grams'
            },
            add: 'middle',
            attribute: 'flavour'
          },
          {
            name: 'First Gold',
            amount: {
              value: 37.5,
              unit: 'grams'
            },
            add: 'middle',
            attribute: 'flavour'
          },
          {
            name: 'Cascade',
            amount: {
              value: 37.5,
              unit: 'grams'
            },
            add: 'end',
            attribute: 'flavour'
          }
        ],
        yeast: 'Wyeast 1056 - American Ale™'
      },
      foodPairing: [
        'Spicy chicken tikka masala',
        'Grilled chicken quesadilla',
        'Caramel toffee cake'
      ],
      brewersTips:
        'The earthy and floral aromas from the hops can be overpowering. Drop a little Cascade in at the end of the boil to lift the profile with a bit of citrus.',
      contributedBy: 'Sam Mason <samjbmason>'
    };

    // Mock to update observable
    this.beers$ = this.beers$.pipe(
      map(data => {
        return [...data, newBeer];
      })
    );
    this.beerService.post(newBeer).subscribe(res => console.log(res));
  }

  removeItemFromObservable(id: number) {
    this.beers$ = this.beers$.pipe(
      map(data => {
        return data.filter(item => item.id !== id);
      })
    );
  }
}
