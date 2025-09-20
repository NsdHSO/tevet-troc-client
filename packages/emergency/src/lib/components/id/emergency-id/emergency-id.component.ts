import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { EmergencyUi } from '@tevet-troc-client/models';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { BadgeComponent } from '@tevet-troc-client/badge';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { InfoLineComponent } from '@tevet-troc-client/info-line';

@Component({
  selector: 'lib-emergency-id',
  imports: [
    CommonModule,
    TextDirective,
    TextComponent,
    BadgeComponent,
    JumbotronComponent,
    InfoLineComponent,
  ],
  templateUrl: './emergency-id.component.html',
  styleUrl: './emergency-id.component.scss',
})
export class EmergencyIdComponent {
  @Input()
  emergencyData!: EmergencyUi;
}
