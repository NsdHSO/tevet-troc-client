import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-not-found',
  imports: [CommonModule, MatIconModule, TextDirective],
  templateUrl: './not-found.component.html',
  styleUrl: './not-found.component.scss',
})
export class NotFoundComponent {}
