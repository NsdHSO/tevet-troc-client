import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { DashboardApiService } from '../service/dashboard-api.service';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers:[DashboardApiService]
})
export default class DashboardComponent {
  readonly dashboardApi = inject(DashboardApiService);
}
