import { VehicledataService } from './services/vehicledata.service';
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { DashboardService } from './dashboard.service';
import { Veiculo, Veiculos } from './IVeiculos';
import {
  tap,
  switchMap,
  filter,
  debounceTime,
  distinctUntilChanged,
} from 'rxjs/operators';

const ESPERA_DIGITACAO = 400;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent {
  veiculos: Veiculos = [];
  selecionado: Veiculo;
  idSelecionado = 0;
  testeInput = new FormControl();

  testes$ = this.testeInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    // tap(() => {
    //   console.log('Fluxo do Filtro');
    // }),
    // tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 5 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.vehicleDataService.getVehicleData(valorDigitado)
    )
    // tap(console.log)
  );

  constructor(
    private dashboardService: DashboardService,
    private vehicleDataService: VehicledataService
  ) {
    this.dashboardService.getVeiculos().subscribe((retornoAPI) => {
      this.veiculos = retornoAPI.vehicles;
      this.selecionado = this.veiculos[0];
    });
  }

  teste(e) {
    this.selecionado = this.veiculos[e];
  }

  mudanca(valor: any) {
    console.log(valor);
  }
}
