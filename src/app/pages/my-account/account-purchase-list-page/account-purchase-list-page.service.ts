import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { map } from 'rxjs';
import { Observable } from 'rxjs/internal/Observable';
import { IResponse } from 'src/app/commons/services/api/api-models-base.interface';
import { IResponseSaleByUser } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';

@Injectable()
export class PurchaseListPageService {
    constructor(private _eventApiService: SaleApiService) { }
    formGroup!: FormGroup;
    loadSalesByUser(existingData: IResponseSaleByUser[]): Observable<IResponseSaleByUser[]> {
		return this._eventApiService
			.getSaleByUser()
			.pipe(map((response) => this._getDataSaleByUser(existingData, response)));
	}

    private _getDataSaleByUser(existingData: IResponseSaleByUser[], response: IResponse<IResponseSaleByUser[]>) {
		if (response.success) {
			if (existingData && existingData.length > 0) {
				const currentData = existingData.concat(response.result);
				const orderSalesByUser= currentData.sort((a, b) => b.id - a.id);
				return orderSalesByUser;
			}
			return response.result;
		}

		return [];
	}

}

