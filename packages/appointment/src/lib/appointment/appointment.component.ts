import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-appointment',
  imports: [CommonModule, TextDirective, TextComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export default class AppointmentComponent {}
