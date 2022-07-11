import { NgModule } from '@angular/core';
import { MatMenuModule } from '@angular/material/menu';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule, Routes } from '@angular/router';
import { SharedFormBasicModule } from 'src/app/commons/shared/shared-form-basic-module';
import { SharedFormCompleteModule } from 'src/app/commons/shared/shared-form-complete.module';
import { AccountPurchaseListPageComponent } from './account-purchase-list-page.component';

export const routes: Routes = [
	{ path: '', component: AccountPurchaseListPageComponent }
];

@NgModule({
    declarations: [AccountPurchaseListPageComponent],
	imports: [RouterModule.forChild(routes),
        MatTableModule,
        MatTabsModule,
        MatMenuModule,
        MatPaginatorModule,
        SharedFormCompleteModule]
})

export class AccounPurchaseListPageModule { }
