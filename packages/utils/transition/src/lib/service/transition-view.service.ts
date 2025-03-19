import { Injectable, signal } from '@angular/core';
import { ViewTransitionInfo } from '@angular/router';

@Injectable()
export class TransitionViewService {
  currentTransition = signal<ViewTransitionInfo | null>(null);
}
