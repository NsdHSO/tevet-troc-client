import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { SelectorComponent } from '@tevet-troc-client/selector';
import { InfoLineComponent } from '@tevet-troc-client/info-line';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { BadgeComponent } from '@tevet-troc-client/badge';
import { Observable } from 'rxjs';
import { AmbulanceIdUi } from '@tevet-troc-client/models';
import { AmbulanceService } from '../../../service/ambulance/ambulance.service';

@Component({
  selector: 'lib-ambulance',
  imports: [
    CommonModule,
    TextComponent,
    TextDirective,
    SelectorComponent,
    InfoLineComponent,
    JumbotronComponent,
    BadgeComponent,
  ],
  templateUrl: './ambulance-id.component.html',
  styleUrl: './ambulance-id.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AmbulanceIdComponent {
  @Input()
  ambulance!:AmbulanceIdUi;

  @Input()
  service!: AmbulanceService;
}
