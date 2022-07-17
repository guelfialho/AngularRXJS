import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { HomeComponent } from './home.component';

export const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: 'dashboard',
        loadChildren: () =>
          import('../dashboard/dashboard.module').then(
            (m) => m.DashboardModule
          ),
      },
      {
        path: 'welcome',
        loadChildren: () =>
          import('../welcome/welcome.module').then((m) => m.WelcomeModule),
      },
      //   {
      //     path: '',
      //     redirectTo: 'acoes',
      //     pathMatch: 'full',
      //   },
      //   {
      //     path: '**',
      //     redirectTo: 'acoes',
      //   },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HomeRoutingModule {}
