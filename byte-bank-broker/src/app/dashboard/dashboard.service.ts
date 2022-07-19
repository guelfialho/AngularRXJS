import { VeiculosAPI } from './IVeiculos';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private httpClient: HttpClient) {}

  public getVeiculos() {
    return this.httpClient.get<VeiculosAPI>('http://localhost:3000/vehicle');
  }
}
