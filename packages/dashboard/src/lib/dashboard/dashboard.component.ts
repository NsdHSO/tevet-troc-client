import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../../../ui/button/src/lib/button/button.component';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, ButtonComponent],
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
