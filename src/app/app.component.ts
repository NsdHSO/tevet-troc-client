import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FrameWholeModule } from 'ngx-liburg-frame-side';

@Component({
  imports: [RouterModule, FrameWholeModule],
  selector: 'app-root',
  standalone:true,
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'tevet-troc-client';
}
