import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats';
import { DispatchEditorComponent } from './dispatch_editor';

const routes: Routes = [{
    path: '',
    children: [
        { path: '', redirectTo: 'stats' },
        { path: 'stats', component: StatsComponent },
        { path: 'dispatch-editor', component: DispatchEditorComponent },
        { path: 'lazy', loadChildren: './lazy/lazy.module#LazyModule' }
    ]
}];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule],
    declarations: [
        StatsComponent,
        DispatchEditorComponent
    ]
})
export class AppRoutingModule {
}
