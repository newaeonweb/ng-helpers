import { BehaviorSubject, Observable } from 'rxjs';
import { distinctUntilChanged, map } from 'rxjs/operators';
import { Logger } from './logger.service';

const log = new Logger('state Service');

export class StateService<T> {
  private state$: BehaviorSubject<T>;
  protected get state(): T {
    log.info('Get state');
    return this.state$.getValue();
  }

  constructor(initialState: T) {
    this.state$ = new BehaviorSubject<T>(initialState);
  }

  protected select<K>(mapFn: (state: T) => K): Observable<K> {
    log.info('Select state');
    return this.state$.asObservable().pipe(
      map((state: T) => mapFn(state)),
      distinctUntilChanged()
    );
  }

  protected setState(newState: Partial<T>) {
    log.debug('Set state', newState);
    this.state$.next({
      ...this.state,
      ...newState
    });
  }
}
