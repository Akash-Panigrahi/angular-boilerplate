import { Component } from '@angular/core';
import { appRouterTransition } from './core/core-router.animations';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    animations: [appRouterTransition]
})
export class AppComponent {
    title = 'basic';

    getState(outlet) {
        return outlet.activatedRouteData.state;
    }
}
