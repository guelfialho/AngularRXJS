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

const ESPERA_DIGITACAO = 300;

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  veiculos: Veiculos = [];
  selecionado: Veiculo;
  idSelecionado = 0;
  testeInput = new FormControl();

  testes$ = this.testeInput.valueChanges.pipe(
    debounceTime(ESPERA_DIGITACAO),
    tap(() => {
      console.log('Fluxo do Filtro');
    }),
    tap(console.log),
    filter(
      (valorDigitado) => valorDigitado.length >= 19 || !valorDigitado.length
    ),
    distinctUntilChanged(),
    switchMap((valorDigitado) =>
      this.vehicleDataService.getVehicleData(valorDigitado)
    ),
    tap(console.log)
  );

  constructor(
    private dashboardService: DashboardService,
    private vehicleDataService: VehicledataService
  ) {}

  ngOnInit(): void {
    this.dashboardService.getVeiculos().subscribe((retornoAPI) => {
      this.veiculos = retornoAPI.vehicles;
      console.log(this.veiculos);
      this.selecionado = this.veiculos[0];
      console.log(this.selecionado);

      this.dashboardService.getVeiculosData().subscribe((retornoAPI) => {
        console.log(retornoAPI.vehicleData);
      });

      this.vehicleDataService.getVehicleData().subscribe((retornoAPI) => {
        console.log(`Retorno vehicle data service`);
        console.log(retornoAPI);
      });
    });
  }

  obterTodosVeiculos() {
    this.dashboardService
      .pegaVeiculos()
      .then((veiculos) => console.log(veiculos))
      .catch((error) => console.error(error));
  }
  teste(e) {
    this.selecionado = this.veiculos[e];
  }

  mudanca(valor: any) {
    console.log(valor);
  }
}
