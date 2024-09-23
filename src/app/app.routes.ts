import { Routes } from '@angular/router';

import { EventComponent } from './views/event/event.component';
import { HomeComponent } from './views/home/home.component';

export const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'event/:id', component: EventComponent },
];
