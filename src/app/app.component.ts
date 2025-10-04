import { Component } from '@angular/core';
import { FrameComponent } from 'ngx-liburg-frame-side';
import { LoadingSpinnerComponent } from '@tevet-troc-client/loading-spinner';

@Component({
  imports: [FrameComponent, LoadingSpinnerComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tevet-troc-client';
}
