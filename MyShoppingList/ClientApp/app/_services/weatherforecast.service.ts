import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';
import 'rxjs/add/operator/map'
import { AuthenticationService } from '../_services/authentication.service';

import { WeatherForecast } from '../_models/index';

@Injectable()
export class WeatherForecastService {
    constructor(
        private http: Http,
        private authenticationService: AuthenticationService) {
    }

    getWeatherForecasts(): Observable<WeatherForecast[]> {
        // add authorization header with jwt token
        let headers = new Headers({ "Content-Type": 'application/json',  "Authorization": "Bearer " + this.authenticationService.token });
        let options = new RequestOptions({ headers: headers });

        // get users from api
        return this.http.get("/api/SampleData/WeatherForecasts", options).map((response: Response) => response.json() ).catch(this.handleError);
    }

    private handleError(error: Response) {
        if (error.status == 401) {
            return Observable.throw(error.status);
        } else {
            return Observable.throw(error.json().error || 'Server error');
        }
    }
}