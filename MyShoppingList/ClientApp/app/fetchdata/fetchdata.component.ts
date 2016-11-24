import { Component } from '@angular/core';


import { WeatherForecast } from '../_models/weatherforecast';
import { WeatherForecastService, AuthenticationService } from '../_services/index';

@Component({
    selector: 'fetchdata',
    template: require('./fetchdata.component.html')
})
export class FetchDataComponent {
    forecasts: WeatherForecast[] = [];

    constructor(private weatherForecastService: WeatherForecastService,
        private authenticationService: AuthenticationService) { }

    ngOnInit() {
        this.weatherForecastService.getWeatherForecasts()
            .subscribe(
            fcs => this.forecasts = fcs,
            error => {
                this.handleError(<any>error);
            }
        );
    }

    handleError(errMsg) {
        console.debug(errMsg);
        if (errMsg == 401) {
            this.authenticationService.logout(true);
        }
    }
}
