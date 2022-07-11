import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { PATHS_AUTH_PAGES } from 'src/app/commons/config/path-pages';
import { ICardEvent } from 'src/app/commons/models/components.interface';
import { IRequestCreateSale, IResponseSaleById } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';
import { DataUserService } from 'src/app/commons/services/local/data-user.service';
import { mergeMap } from 'rxjs';

@Component({
  selector: 'app-buy-page',
  templateUrl: './buy-page.component.html',
  styleUrls: ['./buy-page.component.scss']
})
export class BuyPageComponent {
	statusBuy: StatusBuy = 'INFO';
	dateDemo = new Date();

	cardEvent: ICardEvent | undefined;
	voucher: IResponseSaleById | undefined;

	numberEntries = 0;
	total = 0;

	constructor(
		private _router: Router,
		private _saleApiService: SaleApiService,
		private _toastEvokeService: ToastEvokeService,
		private _dataUserService: DataUserService
	) {
		this._captureData();
	}

	clickBuy(statusBuy: StatusBuy): void {
		if (this._dataUserService.isExpiredToken()) {
			void this._router.navigateByUrl(PATHS_AUTH_PAGES.loginPage.withSlash);
			return;
		}

		if (statusBuy === 'VOUCHER') {
			this._saveBuy();
			return;
		}

		this.statusBuy = statusBuy;
	}

	private _saveBuy(): void {
		const sendBuy: IRequestCreateSale = {
			concertId: this.cardEvent!.idEvent,
			quantity: this.numberEntries,
			unitPrice: this.cardEvent!.price
		};

		this._saleApiService
			.createSale(sendBuy)
			.pipe(
				mergeMap((response) => {
					return this._saleApiService.getSaleById(response.result);
				})
			)
			.subscribe((voucher) => {
				if (voucher && voucher.success) {
					this.voucher = voucher.result[0];
					this.statusBuy = 'VOUCHER';
					this._toastEvokeService.success('Compra', 'Su compra se ha realizado con exito, gracias.');
				}
			});
	}

	inputCalculate(): void {
		this.total = this.numberEntries * this.cardEvent!.price;
	}

	private _captureData(): void {
		const navigation = this._router.getCurrentNavigation();

		if (navigation?.extras && navigation.extras.state) {
			this.cardEvent = navigation.extras.state['event'];
		}

		if (!this.cardEvent) {
			this._router.navigateByUrl('/');
		}
	}
}

type StatusBuy = 'INFO' | 'BUY' | 'VOUCHER';