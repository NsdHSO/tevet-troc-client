import { Component } from '@angular/core';

import { MatIconModule } from '@angular/material/icon';
import { TextDirective } from '@tevet-troc-client/text';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'lib-not-found',
  imports: [MatIconModule, TextDirective, RouterLink],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
