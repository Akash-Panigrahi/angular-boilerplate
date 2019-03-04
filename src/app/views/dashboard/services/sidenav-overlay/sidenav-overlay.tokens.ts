import { InjectionToken } from '@angular/core';
import { SidenavData } from '../../interfaces/sidenav.interface';

export const SIDENAV_OVERLAY_DATA = new InjectionToken<SidenavData>('SIDENAV_OVERLAY_DATA');
