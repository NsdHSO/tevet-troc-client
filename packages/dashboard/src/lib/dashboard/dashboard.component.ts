import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardApiService } from '../service/dashboard-api.service';
import { LandingCardComponent } from '../components/landing-card/landing-card.component';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { TextComponent } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-dashboard',
  imports: [
    CommonModule,
    LandingCardComponent,
    JumbotronComponent,
    TextComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
  providers: [DashboardApiService],
})
export default class DashboardComponent {
  should = false;
}
