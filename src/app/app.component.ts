import { Component } from '@angular/core';
import { FrameComponent } from 'ngx-liburg-frame-side';

@Component({
  imports: [FrameComponent],
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tevet-troc-client';
}
