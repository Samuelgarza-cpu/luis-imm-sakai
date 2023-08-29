import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { AppLayoutComponent } from "./layout/app.layout.component";
import { LoginComponent } from './demo/components/auth/login/login.component';
import { RegistroUsuariosComponent } from './demo/components/registro-usuarios/registro-usuarios.component';
import { Modulo1Component } from './demo/components/modulo1/modulo1.component'
import { GuardsGuard } from '../app/demo/guards.guard'
import{ListadoComponent} from '../app/demo/components/modulo1/listado/listado.component'
import { ModificarComponent } from './demo/components/modulo1/modificar/modificar.component';


@NgModule({
    imports: [
        RouterModule.forRoot([
            {
                path: '', component: LoginComponent
          
            },
        
            {path: 'dashboard',component:AppLayoutComponent,
                children:[ {path:'',loadChildren: () => import('./demo/components/dashboard/dashboard.module').then(m => m.DashboardModule) },

                {path:'registrarusuario', component:RegistroUsuariosComponent},
                {path:'modulo1' , component:Modulo1Component},
                {path:'listadom1' , component:ListadoComponent},
                {path:'modificar/:id' , component:ModificarComponent}

                 ],canActivate:[GuardsGuard]
            },
            { path: 'auth', loadChildren: () => import('./demo/components/auth/auth.module').then(m => m.AuthModule) },
            { path: 'pages/notfound', component: NotfoundComponent },
            { path: '**', redirectTo: 'pages/notfound' },
        ], { scrollPositionRestoration: 'enabled', anchorScrolling: 'enabled', onSameUrlNavigation: 'reload' })
    ],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
