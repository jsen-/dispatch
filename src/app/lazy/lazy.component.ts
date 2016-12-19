import { Component } from '@angular/core';

import { StatsComponent } from './stats/stats.component';
import { ServerListComponent } from './server-list/server-list.component';

@Component({
    selector: 'app-lazy',
    template: `
<h1>{{title}}</h1>
<nav>
    <a routerLink="stats" routerLinkActive="active">Statistics</a>
    <a routerLink="servers" routerLinkActive="active">Server list</a>
</nav>
<router-outlet></router-outlet>`,
    styles: []
})
export class LazyComponent {
    title = 'Lazy works!';
}
