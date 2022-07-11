import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomePageComponent } from './pages/home-page/home-page.component';
import { ContainerModule } from './commons/components/container/container.module';
import { SharedComponentsModule } from './commons/shared/shared-components.module';
import { AppRoutingModule } from './app-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { SharedFormCompleteModule } from './commons/shared/shared-form-complete.module';
import { CommonModule, registerLocaleData } from '@angular/common';
import LocaleEsBo from '@angular/common/locales/es-BO';
import { ApiInterceptor } from './commons/interceptors/api-interceptor';
import { ErrorApiInterceptor } from './commons/interceptors/error-api-interceptor';
import { ConfirmBoxConfigModule, DialogConfigModule, NgxAwesomePopupModule, ToastNotificationConfigModule } from '@costlydeveloper/ngx-awesome-popup';
import { NgxUiLoaderModule } from 'ngx-ui-loader';

registerLocaleData(LocaleEsBo)

@NgModule({
	declarations: [AppComponent, HomePageComponent],

	imports: [
		CommonModule,
		BrowserModule,
		BrowserAnimationsModule,
		HttpClientModule,
		AppRoutingModule,
		ContainerModule,
		SharedFormCompleteModule,
		SharedComponentsModule,
		NgxUiLoaderModule,
		NgxAwesomePopupModule.forRoot(), // Essential, mandatory main module.
		DialogConfigModule.forRoot(), // Needed for instantiating dynamic components.
		ConfirmBoxConfigModule.forRoot(), // Needed for instantiating confirm boxes.
		ToastNotificationConfigModule.forRoot() // Needed for instantiating toast notifications.
        ],

	providers: [{provide: LOCALE_ID, useValue:'es-BO'},
				{
					provide: HTTP_INTERCEPTORS,
				   useClass: ApiInterceptor,
				    multi: true
				},
				 {
					provide: HTTP_INTERCEPTORS,
					useClass: ErrorApiInterceptor,
				    multi: true
				}
				],
	bootstrap: [AppComponent]
	})
export class AppModule {}
