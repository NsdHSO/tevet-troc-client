import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { DashboardApiService } from '../../service/dashboard-api.service';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { ViewTransitionDirective } from '@tevet-troc-client/transition';

@Component({
  selector: 'lib-landing-card',
  imports: [
    RouterLink,
    JumbotronComponent,
    TextDirective,
    TextComponent,
    ViewTransitionDirective,
  ],
  templateUrl: './landing-card.component.html',
  styleUrl: './landing-card.component.scss',
})
export class LandingCardComponent {
  readonly dashboardApi = inject(DashboardApiService, { skipSelf: true });
}
