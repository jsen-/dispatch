import { Component } from '@angular/core';

import { StatsComponent } from './stats/stats.component';
import { DispatchEditorComponent } from './dispatch_editor/dispatch_editor.component';

@Component({
    selector: 'app-root',
    template: `
<h1>{{title}}</h1>
<nav>
    <a routerLink="/stats" routerLinkActive="active">Statistics</a>
    <a routerLink="/dispatch-editor" routerLinkActive="active">Dispatch Editor</a>
    <a routerLink="/lazy" routerLinkActive="active">Lazy</a>
</nav>
<router-outlet></router-outlet>`,
    styles: []
})
export class AppComponent {
    title = 'app works!';
}
