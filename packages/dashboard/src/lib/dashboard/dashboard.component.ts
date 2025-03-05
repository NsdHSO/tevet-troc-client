import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  Button3Component,
  Butto3Component,
} from '../../../../ui/button/src/lib/button/button.component';

@Component({
  selector: 'lib-dashboard',
  imports: [CommonModule, Butto3Component, Button3Component],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css',
})
export default class DashboardComponent {
  pressMe(dasboard=false) {
    if (!dasboard) {
      console.log('Press me out side dashboard')
    }else{
      console.log('Press me out side Button')
    }
  }
}
