import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-landing',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
