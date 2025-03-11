import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {}
