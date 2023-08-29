import { OnInit } from '@angular/core';
import { Component } from '@angular/core';
import { LayoutService } from './service/app.layout.service';


@Component({
    selector: 'app-menu',
    templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {

    model: any[] = [];

    constructor(public layoutService: LayoutService) { }

    ngOnInit() {
        this.model = [
            {
                label: 'Home',
                items: [
                    { label: 'Dashboard', icon: 'pi pi-fw pi-home', routerLink: ['/dashboard'] }
                ]
            },
            {
                label: 'Modulos',
                items: [
                    { label: 'Registro M1', icon: 'pi pi-fw pi-id-card',
                    items:[
                        {label:'Alta',routerLink:['/dashboard/modulo1'] },
                        {label:'Listado', routerLink:['/dashboard/listadom1']}
                    ]
                    },
                    { label: 'Registro M2', icon: 'pi pi-fw pi-id-card'},
                    { label: 'Registro M3', icon: 'pi pi-fw pi-id-card'},
                    { label: 'Registro M4', icon: 'pi pi-fw pi-id-card'}
                   
                  
                ]
            },
            {
                label: 'Sistema',
                items: [
                    { label: 'Usuarios', icon: 'pi pi-fw pi-prime', routerLink: ['registrarusuario'] },
          
                ]
            },
           
        ];
    }
}
