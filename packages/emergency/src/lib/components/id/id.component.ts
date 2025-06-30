import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergencyService } from '../../service/emergency.service';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule, TextComponent, TextDirective],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
  providers: [EmergencyService],
})
export default class IdComponent {}
