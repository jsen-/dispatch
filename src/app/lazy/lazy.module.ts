import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { StatsComponent } from './stats/stats.component';

import { ServerListComponent, AddFormComponent } from './server-list/server-list.component';
import { ServerListService } from './server-list.service';

import { LazyComponent } from './lazy.component';

const routes: Routes = [{
    path: '', component: LazyComponent,
    children: [
        { path: '', redirectTo: 'stats' },
        { path: 'stats', component: StatsComponent },
        { path: 'servers', component: ServerListComponent }
    ]
}];

@NgModule({
    imports: [RouterModule.forChild(routes), CommonModule, FormsModule],
    providers: [ServerListService],
    declarations: [
        LazyComponent,
        StatsComponent,
        ServerListComponent,
        AddFormComponent
    ]
})
export class LazyModule {
}
