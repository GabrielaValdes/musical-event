import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormGroupDirective } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatTableDataSource } from '@angular/material/table';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
import { CanComponentDeactivate } from 'src/app/commons/guards/form-event.guard';
import { IResponseGenre } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { MaintenanceGenrePageService } from './maintenance-genre-page.service';

@Component({
  selector: 'app-maintenance-genre-page',
  templateUrl: './maintenance-genre-page.component.html',
  styleUrls: ['./maintenance-genre-page.component.scss'],
  providers: [MaintenanceGenrePageService]
})
export class MaintenanceGenrePageComponent implements OnInit,AfterViewInit,CanComponentDeactivate {
@ViewChild('paginator') paginator: MatPaginator | undefined;
@ViewChild(FormGroupDirective) formRef!: FormGroupDirective;

formGroup!: FormGroup;

//variable para el Tab
indexTabSaveGenre = 0;


	// variables para la tabla
	displayedColumns: string[] = [
		'description',
		'status',
		'action'
	];

dataSource = new MatTableDataSource<IResponseGenre>();
pageSizeOptions: number[] = [2, 4, 6];
//rowsPageBack = 4;
numberPageBack = 1;
//#region getters Form
idField = this._maintenanceGenrePageService.idField;
descriptionField = this._maintenanceGenrePageService.descriptionField;
statusField = this._maintenanceGenrePageService.statusField;
//#region

private _crudMethod = CRUD_METHOD.SAVE;

  constructor(	
    private _confirmBoxEvokeService: ConfirmBoxEvokeService,
    private _maintenanceGenrePageService: MaintenanceGenrePageService ) 
	{ 
   	 this.formGroup = this._maintenanceGenrePageService.formGroup;
  	}

  	canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.value as IGenreForm;
		const isThereDataEntered = Object.values(values).find((item) => item !== null) as unknown;

		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

  ngOnInit(): void {
    this._loadGenres();
	
  }

  ngAfterViewInit(): void {
	
	this.dataSource.paginator = this.paginator!;
 }

  applyFilter(genre: Event): void {
		const filterValue = (genre.target as HTMLInputElement).value;
		this.dataSource.filter = filterValue.trim().toLowerCase();
	}

  clickSave(): void {
		if (this.formGroup.valid) {
			this._maintenanceGenrePageService.saveGenre(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
				    this.dataSource= new MatTableDataSource<IResponseGenre>();
					this.dataSource.paginator = this.paginator!;
					this._loadGenres();
					this._crudMethod = CRUD_METHOD.SAVE;
				}
			});
		}
	}


  clickClear(): void {
		this._crudMethod = CRUD_METHOD.SAVE;
		this.formRef.resetForm();
	}

  clickUpdate(idGenre: number): void {
		this._maintenanceGenrePageService.updateForm(idGenre).subscribe((response) => {
			if (response.success) {
				this.indexTabSaveGenre = 0;
				this._crudMethod = CRUD_METHOD.UPDATE;
			}
		});
	}

  getPaginatorData(): void {
		if (!this.paginator?.hasNextPage()) {
			this.numberPageBack++;
			//this._loadGenres();
		}
	}

	clickDelete(idGenre: number): void {
		this._maintenanceGenrePageService.deleteGenre(idGenre).subscribe((response) => {
			if (response) {
				this.dataSource.data = this.dataSource.data.filter((item) => item.id !== idGenre);
			}
		});
	}

    private _loadGenres(): void {
	//	 console.log(this.paginator?.pageSize)
        this._maintenanceGenrePageService
          .loadGenres(this.dataSource.data)
          .subscribe((response) => {
            this.dataSource.data = response;
          });
      }
}

export interface IGenreForm {
  id?: number;
  description: string;
  status: number;
  image: string;
}


