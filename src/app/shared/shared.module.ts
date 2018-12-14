import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { environment } from 'src/environments/environment';

@NgModule({
  imports: [
    CommonModule
  ]
})
export class SharedModule {
  constructor() {
    if (!environment.production) {
      console.log('SharedModule loaded');
    }
  }
}
