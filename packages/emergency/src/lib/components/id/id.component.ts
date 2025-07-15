import { Component, inject, ViewContainerRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AmbulanceService } from '../../service/ambulance/ambulance.service';
import { ActivatedRoute } from '@angular/router';
import { EMPTY, finalize, switchMap, tap } from 'rxjs';
import { AmbulanceIdComponent } from './ambulance-id/ambulance-id.component';
import { EmergencyIdComponent } from './emergency-id/emergency-id.component';
import { EmergencyService } from '../../service/emergency/emergency.service';
import { EmergencyUi } from '@tevet-troc-client/models';

@Component({
  selector: 'lib-emergency',
  imports: [CommonModule],
  templateUrl: './id.component.html',
  styleUrl: './id.component.scss',
  providers: [AmbulanceService, EmergencyService],
})
export default class IdComponent {
  private viewContainer = inject(ViewContainerRef);
  private route = inject(ActivatedRoute);
  ambulanceService = inject(AmbulanceService);
  emergencyService = inject(EmergencyService);

  element = this.route.queryParams.pipe(
    tap(() => {
      this.viewContainer.clear();
    }),
    switchMap((data) => {
      if (data['ambulance_ic'] !== undefined) {
        this.ambulanceService.ambulanceApiService.ic = (
          data as { ambulance_ic: string }
        ).ambulance_ic;

        return this.ambulanceService.ambulanceApiService.ambulanceResource.pipe(
          tap((ambulance) => {
            if (ambulance) {
              const componentRef =
                this.viewContainer.createComponent(AmbulanceIdComponent);
              componentRef.instance.ambulance = ambulance;
              componentRef.instance.service = this.ambulanceService;
              // Trigger change detection for the newly created component if needed
              componentRef.changeDetectorRef.detectChanges();
            }
          })
        );
      }
      if (data['emergency_ic'] !== undefined) {
        this.emergencyService.emergencyIc = data['emergency_ic'];
        return this.emergencyService.emergencyIdResponse.pipe(
          tap((emergency) => {
            if (emergency) {
              // Clear previous components if any
              const componentRef =
                this.viewContainer.createComponent(EmergencyIdComponent);
              componentRef.instance.emergencyData = emergency as EmergencyUi;
              // Trigger change detection for the newly created component if needed
              componentRef.changeDetectorRef.detectChanges();
            }
          })
        );
      }
      return EMPTY;
    }),
    finalize(() => {
      this.viewContainer.clear(); // Clear any dynamically created component
    })
  );
}
