import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { map, tap, pluck } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class VehicledataService {
  constructor(private httpClient: HttpClient) {}

  getVehicleData(valor?: string) {
    const params = valor ? new HttpParams().append('valor', valor) : undefined;
    return this.httpClient
      .get<any>('http://localhost:3000/vehicledata', { params })
      .pipe(
        tap((valor) => console.log(valor)),
        pluck('vehicleData'),
        tap((valor) => console.log(valor))
      );
  }
}
