import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { FormEventGuard } from 'src/app/commons/guards/form-event.guard';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { MaintenanceGenrePageComponent } from './maintenance-genre-page.component';

export const routes: Routes = [
	{ path: '', canDeactivate: [FormEventGuard] ,component: MaintenanceGenrePageComponent }
];

@NgModule({
    declarations: [MaintenanceGenrePageComponent],
    imports: [RouterModule.forChild(routes),
            MatTableModule,
            MatTabsModule,
            MatMenuModule,
            MatPaginatorModule,
            SharedFormCompleteModule],
    exports: [],
    providers: [],
})
export class MaintenanceGenrePageModule { 
    constructor(){}
}
