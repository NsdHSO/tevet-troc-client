import { Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class TransitionViewService {
  currentTransition = signal<ViewTransitionInfo | null>(null);
}
