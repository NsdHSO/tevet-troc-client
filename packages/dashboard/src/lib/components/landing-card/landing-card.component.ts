import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { AsyncPipe } from '@angular/common';
import { DashboardApiService } from '../../service/dashboard-api.service';

@Component({
  selector: 'app-landing-card',
  imports: [RouterLink, JumbotronComponent, AsyncPipe],
  templateUrl: './landing-card.component.html',
  styleUrl: './landing-card.component.scss',
})
export class LandingCardComponent {
  readonly dashboardApi = inject(DashboardApiService, { skipSelf: true });
}
