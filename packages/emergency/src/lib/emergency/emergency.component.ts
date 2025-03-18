import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './emergency.component.html',
  styleUrl: './emergency.component.scss',
})
export default class EmergencyComponent {}
