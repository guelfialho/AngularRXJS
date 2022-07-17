import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WelcomeRoutingModule } from './welcome-routing.module';
import { WelcomeComponent } from './component/welcome/welcome.component';
import { SharedModule } from '../shared/shared.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [WelcomeComponent],
  imports: [CommonModule, SharedModule, FormsModule, WelcomeRoutingModule],
})
export class WelcomeModule {}
