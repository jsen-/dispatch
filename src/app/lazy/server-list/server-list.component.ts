import { Component, AfterViewInit, ViewChild, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ServerListService, ServerPackage, Server } from '../server-list.service';

@Component({
    selector: 'app-add-form',
    template: `
<form #myForm="ngForm" (ngSubmit)="ngSubmit(value)">
    <input type="text" [(ngModel)]="value" name="field" required />
    <input type="submit" [disabled]="!value" value="add" />
</form>`
})
export class AddFormComponent {
    @Output() onSubmit = new EventEmitter();
    value: string;

    ngSubmit(value) {
        console.log(value);
        this.onSubmit.emit(value);
    }
}

@Component({
    selector: 'app-server-list',
    template: `
<ul>
    <li *ngFor="let server_package of server_list | async">
        {{server_package.name}} <a href="{{server_package.id}}/delete" (click)="delete_server_package(server_package, $event)">delete</a>
        <ul>
            <li *ngFor="let server of server_package.servers">
                {{server.name}}<a href="{{server.id}}/delete" (click)="delete_server(server, $event)">delete</a>
            </li>
            <li>
                <app-add-form (onSubmit)="add_server(server_package, $event)"></app-add-form>
            </li>
        </ul>
    </li>
</ul>`
})
export class ServerListComponent {

    server_list: Promise<Set<ServerPackage>>;

    add_server(server_package: ServerPackage, server_name: string) {
        server_package.add_server(server_name);
    }

    constructor(private serverListService: ServerListService) {
        this.server_list = serverListService.getServerList();
    }
    public async delete_server(server: Server, $event: Event): Promise<boolean> {
        $event.preventDefault();
        return await server.delete();
    }

    public async delete_server_package(server_package: ServerPackage, $event: Event): Promise<boolean> {
        $event.preventDefault();
        return await server_package.delete();
    }

}
