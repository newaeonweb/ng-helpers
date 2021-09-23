import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NgxSnakeToCamelModule } from 'ngx-snake-to-camel';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BeerModule } from './pages/beer/beer.module';
import { AlertComponent } from './shared/components/alert.component';
import { LoaderComponent } from './shared/components/loader.component';
import { ApiPrefixInterceptor } from './shared/interceptors/api.interceptor';
import { CacheInterceptor } from './shared/interceptors/cache.interceptor';
import { ErrorHandlerInterceptor } from './shared/interceptors/error-handler.interceptor';

@NgModule({
  declarations: [AppComponent, LoaderComponent, AlertComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    BeerModule,
    NgxSnakeToCamelModule.forRoot(),
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ApiPrefixInterceptor,
      multi: true,
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorHandlerInterceptor,
      multi: true,
    },
  ],
})
export class AppModule {}
