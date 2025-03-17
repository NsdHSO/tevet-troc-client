import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApiService } from '../service/dashboard-api.service';
import { LandingCardComponent } from '../components/landing-card/landing-card.component';
import { ButtonComponent } from '@tevet-troc-client/button';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, LandingCardComponent, ButtonComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardApiService],
})
export default class DashboardComponent {
  should = false;
}
