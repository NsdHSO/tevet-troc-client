import { Component } from '@angular/core';

import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-landing',
  imports: [TextComponent, TextDirective],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.css',
})
export class LandingComponent {}
