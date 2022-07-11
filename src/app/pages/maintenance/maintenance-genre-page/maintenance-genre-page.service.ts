import { Injectable } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { concatMap, EMPTY, map, Observable, tap } from 'rxjs';
import { IResponse, IResponsePaginator } from 'src/app/commons/services/api/api-models-base.interface';
import { IRequestCreateGenre, IResponseGenre, IResponseGenreById } from 'src/app/commons/services/api/genre/genre-api-model.interface';
import { GenreApiService } from 'src/app/commons/services/api/genre/genre-api.service';
import { CRUD_METHOD, STATUS_CRUD } from 'src/app/commons/util/enums';

@Injectable({providedIn: 'root'})
export class MaintenanceGenrePageService {
    formGroup!: FormGroup;
    constructor(
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _genreApiService: GenreApiService,
		private _formBuilder: FormBuilder) {
        this._loadFormGroup();
     }
    
	 
	private _getMethod(method: CRUD_METHOD, request: IRequestCreateGenre): Observable<IResponse<number>> {
		const idGenre = this.idField.value as number;

		return method === CRUD_METHOD.SAVE
			? this._genreApiService.createGenre(request.description)
			: this._genreApiService.updateGenre(idGenre, request.description);
	}

	private _succes(isSucces: boolean): Observable<boolean> {
		return new Observable<boolean>((subscriber) => {
			subscriber.next(isSucces);
			subscriber.complete();
		});
	}


    private _loadFormGroup(): void {
		this.formGroup = this._formBuilder.group({
			id: [null],
			description: [null, Validators.required],
			status: [null, Validators.required],
		});
	}

	saveGenre(method: CRUD_METHOD): Observable<boolean> {
		const request: IRequestCreateGenre = {
			description: this.descriptionField.value as string
		};

		return this._confirmBoxEvokeService
			.warning('Género', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) => (responseQuestion.success ? this._getMethod(method, request) : EMPTY)),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La información ha sido guardada.');
						return this._succes(true);
					}

					return this._succes(false);
				})
			);
	}

	
	deleteGenre(idGenre: number): Observable<boolean> {
		return this._confirmBoxEvokeService.warning('Evento', '¿Esta seguro de eliminar el Género?', 'Si', 'Cancelar').pipe(
			concatMap((responseQuestion) => (responseQuestion.success ? this._genreApiService.deleteGenre(idGenre) : EMPTY)),
			concatMap((response) => {
				if (response.success) {
					this._toastEvokeService.success('Exito', 'El género ha sido eliminado');
					return this._succes(true);
				}
				return this._succes(false);
			})
		);
	}

	updateForm(idGenre: number): Observable<IResponse<IResponseGenreById>> {
		return this._genreApiService.getGenre(idGenre).pipe(
			tap((response) => {
				if (response.success) {
					const genreResponse = response.result;
					this.idField.setValue(genreResponse.id);
					this.descriptionField.setValue(genreResponse.description);
					this.statusField.setValue(genreResponse.status ? STATUS_CRUD.ACTIVO : STATUS_CRUD.INACTIVO);
				}
			})
		);
	}

	loadGenres(existingData: IResponseGenre[]): Observable<IResponseGenre[]> {
		return this._genreApiService
			.getGenres()
			.pipe(map((response) => this._getDataGenres(existingData, response)));
	}

	private _getDataGenres(existingData: IResponseGenre[], response: IResponse<IResponseGenre[]>) {
		if (response.success) {
			if (existingData && existingData.length > 0) {
				const currentData = existingData.concat(response.result);
				const orderGenres = currentData.sort((a, b) => b.id - a.id);
				currentData.sort()
				return orderGenres;
			}
			return response.result;
		}

		return [];
	}

	
	get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

	get descriptionField(): AbstractControl {
		return this.formGroup.get('description')!;
	}


	get statusField(): AbstractControl {
		return this.formGroup.get('status')!;
	}


}