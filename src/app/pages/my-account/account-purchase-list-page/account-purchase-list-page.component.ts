import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { IResponseSaleByUser } from 'src/app/commons/services/api/sale/sale-api-model.interface';
import { SaleApiService } from 'src/app/commons/services/api/sale/sale-api.service';
import { PurchaseListPageService } from './account-purchase-list-page.service';

@Component({
  selector: 'app-account-purchase-list-page',
  templateUrl: './account-purchase-list-page.component.html',
  styleUrls: ['./account-purchase-list-page.component.scss'],
  providers: [PurchaseListPageService]
})
export class AccountPurchaseListPageComponent implements OnInit,AfterViewInit {
  @ViewChild('paginator') paginator: MatPaginator | undefined;
  formGroup!: FormGroup;
  //variable para el Tab
	indexTabSaveEvent = 0;

	// variables para la tabla
	displayedColumns: string[] = [
		'operationNumber',
		'title',
		'quantity',
		'totalSale',
		'saleDate',
		'dateEvent',
    'ticket'
		
	];

  dataSource = new MatTableDataSource<IResponseSaleByUser>();
	pageSizeOptions: number[] = [2, 4, 6];
	rowsPageBack = 4;
	numberPageBack = 1;
  
  

  constructor (
    private _myAccountPurchaseListPageService: PurchaseListPageService
  ) {this.formGroup = this._myAccountPurchaseListPageService.formGroup; }

  ngOnInit(): void {
    this._loadSalesByUser();
  }

  ngAfterViewInit(): void {
		this.dataSource.paginator = this.paginator!;
	}

  applyFilter(event: Event): void {
		const filterValue = (event.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

  getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this.numberPageBack++;
			//this._loadSalesByUser();
		}
	}

  private _loadSalesByUser(): void {
		this._myAccountPurchaseListPageService
			.loadSalesByUser(this.dataSource.data)
			.subscribe((response) => {
				this.dataSource.data = response;
			});
	}

}
