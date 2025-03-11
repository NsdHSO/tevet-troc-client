import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, JumbotronComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  pressMe(dasboard = false) {
    if (!dasboard) {
      console.log('Press me out side dashboard');
    } else {
      console.log('Press me out side Button');
    }
  }
}
