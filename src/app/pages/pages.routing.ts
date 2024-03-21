import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AccountSettingsComponent } from './account-settings/account-settings.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { Grafica1Component } from './grafica1/grafica1.component';
import { PagesComponent } from './pages.component';
import { ProgressComponent } from './progress/progress.component';
import { PromesasComponent } from './promesas/promesas.component';
import { RxjsComponent } from './rxjs/rxjs.component';
import { authGuard } from '../guards/auth.guard';
import { PerfilComponent } from './perfil/perfil.component';
import { UsuariosComponent } from './mantenimientos/usuarios/usuarios.component';
import { MedicosComponent } from './mantenimientos/medicos/medicos.component';
import { HospitalesComponent } from './mantenimientos/hospitales/hospitales.component';

export const routes: Routes = [
    { 
        path: 'dashboard', 
        component: PagesComponent,
        canActivate: [ authGuard ],
        children: [
            { path: '', component: DashboardComponent, data: { title: 'Dashboard'} },
            { path: 'account-settings', component: AccountSettingsComponent, data: { title: 'Account Settings'} },
            { path: 'grafica1', component: Grafica1Component, data: { title: 'Gráficas'} },
            { path: 'perfil', component: PerfilComponent, data: { title: 'Perfil'} },
            { path: 'progress', component: ProgressComponent, data: { title: 'Progress Bar'} },
            { path: 'promesas', component: PromesasComponent, data: { title: 'Promesas'} },
            { path: 'rxjs', component: RxjsComponent, data: { title: 'RXJS'} },

            //Mantenimientos
            { path: 'usuarios', component: UsuariosComponent, data: { title: 'Usuarios'} },
            { path: 'medicos', component: MedicosComponent, data: { title: 'Médicos'} },
            { path: 'hospitales', component: HospitalesComponent, data: { title: 'Hospitales'} },
        ]
    },
]

@NgModule({
    imports: [ RouterModule.forChild(routes)],
    exports: [ RouterModule]
})

export class PagesRoutingModule {}