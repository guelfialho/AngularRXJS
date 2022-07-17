import { Veiculos, VeiculosAPI } from './IVeiculos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  public pegaVeiculos() {
    return this.httpClient
      .get<VeiculosAPI>('http://localhost:3000/vehicle')
      .toPromise()
      .then((response) => console.log(response.vehicles))
      .catch((error) => console.error(error));
  }

  public getVeiculos() {
    return this.httpClient.get<any>('http://localhost:3000/vehicle');
  }

  public getVeiculosData() {
    return this.httpClient.get<any>('http://localhost:3000/vehicleData');
  }
}
