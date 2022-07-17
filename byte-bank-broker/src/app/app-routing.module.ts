import { DashboardModule } from './dashboard/dashboard.module';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthorizationGuard } from './authorization/authorization.guard';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  {
    path: 'home',
    loadChildren: () =>
      import('../app/home/home.module').then((m) => m.HomeModule),
    canLoad: [AuthorizationGuard],
  },
  {
    path: 'login',
    loadChildren: () =>
      import('../app/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'dashboard',
    loadChildren: () =>
      import('../app/dashboard/dashboard.module').then(
        (m) => m.DashboardModule
      ),
  },
  { path: '**', redirectTo: '', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
