import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { ButtonComponent } from '@tevet-troc-client/button';

@Component({
  selector: 'lib-appointment',
  imports: [CommonModule, TextDirective, TextComponent, ButtonComponent],
  templateUrl: './appointment.component.html',
  styleUrl: './appointment.component.css',
})
export default class AppointmentComponent {}
