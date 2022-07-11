import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PATH_MY_ACCOUNT_PAGES } from 'src/app/commons/config/path-pages';
import { SharedComponentsModule } from 'src/app/commons/shared/shared-components.module';
import { MyAccountRoutingModule } from './my-account-routing.module';

import { MyAccountComponent } from './my-account.component';


@NgModule({
	declarations: [MyAccountComponent],
	imports: [MyAccountRoutingModule, SharedComponentsModule]
})
export class MyAccountModule {}
