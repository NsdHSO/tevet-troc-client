import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanceService } from '../../service/ambulance/ambulance.service';
import { ActivatedRoute } from '@angular/router';
import { switchMap } from 'rxjs';
import { TextComponent, TextDirective } from '@tevet-troc-client/text';
import { JumbotronComponent } from '@tevet-troc-client/jumbotron';
import { InfoLineComponent } from '@tevet-troc-client/info-line';
import { BadgeComponent } from '@tevet-troc-client/badge';

@Component({
  selector: 'lib-emergency',
  imports: [
    CommonModule,
    TextDirective,
    TextComponent,
    JumbotronComponent,
    InfoLineComponent,
    BadgeComponent,
  ],
  templateUrl: './id-ambulance.component.html',
  styleUrl: './id-ambulance.component.scss',
  providers: [AmbulanceService],
})
export default class IdAmbulanceComponent {
  /**
   *
   */
  private route = inject(ActivatedRoute);
  /**
   *
   */
  ambulanceService = inject(AmbulanceService);
  /**
   *
   */
  ambulance = this.route.queryParams.pipe(
    switchMap((data) => {
      this.ambulanceService.ambulanceApiService.ic = (
        data as { ambulance_ic: string }
      ).ambulance_ic;
      return this.ambulanceService.ambulanceApiService.ambulanceResource;
    })
  );
}
