import { NgModule }      from '@angular/core';
import { UniversalModule } from 'angular2-universal';
import { FormsModule }   from '@angular/forms';

import { AppComponent } from './app.component'
import { routing }        from './app.routing';

import { AuthGuard } from './_guards/index';
import { AuthenticationService, WeatherForecastService } from './_services/index';
import { LoginComponent } from './login/index';
import { HomeComponent } from './home/index';
import { NavMenuComponent } from './navmenu/navmenu.component';
import { FetchDataComponent } from './fetchdata/fetchdata.component';

@NgModule({
    bootstrap: [AppComponent],
    declarations: [
        AppComponent,
        LoginComponent,
        HomeComponent,
        NavMenuComponent,
        FetchDataComponent
    ],
    imports: [
        UniversalModule, // Must be first import. This automatically imports BrowserModule, HttpModule, and JsonpModule too.
        FormsModule,
        routing
    ],
    providers: [
        AuthGuard,
        AuthenticationService,
        WeatherForecastService
    ]
})
export class AppModule {
}
