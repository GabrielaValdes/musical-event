import { Injectable } from '@angular/core';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { ConfirmBoxEvokeService, ToastEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { concatMap,EMPTY, Observable } from 'rxjs';
import { IRequestChangePassword } from 'src/app/commons/services/api/user/user-api-model.interface';
import { DataUserService } from 'src/app/commons/services/local/data-user.service';
import { customPasswordValidator } from 'src/app/commons/validators/forms.validators';
@Injectable()
export class AccountChangePasswordPageService {
    formGroup!: FormGroup;
	
    constructor(
        private _confirmBoxEvokeService: ConfirmBoxEvokeService,
		private _toastEvokeService: ToastEvokeService,
		private _userApiService: UserApiService,
		private _formBuilder: FormBuilder,
		private _dataUserService: DataUserService
	
    ) { this._loadFormGroup();
		}
    
    saveNewPassword(method: CRUD_METHOD): Observable<boolean> {
		
		const request: IRequestChangePassword = {
            email: this._dataUserService.getEmail() as string,
            oldPassword: this.oldPasswordField.value as string,
            newPassword: this.newPasswordField.value as string
		};

		return this._confirmBoxEvokeService
			.warning('Evento', '¿Esta seguro de guardar la información?', 'Si', 'Cancelar')
			.pipe(
				concatMap((responseQuestion) => (responseQuestion.success ? this._userApiService.changePassword(request): EMPTY)),
				concatMap((response) => {
					if (response.success) {
						this._toastEvokeService.success('Exito', 'La contraseñá ha sido cambiada.');
						return this._succes(true);
					}
					this._toastEvokeService.danger('Error', 'La contraseñá anterior no coincide.');
					return this._succes(false);
				})
			);
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
			oldPassword: [null, Validators.required],
			newPassword: [null, [customPasswordValidator,Validators.required]]
			
		});
	}

	

    get idField(): AbstractControl {
		return this.formGroup.get('id')!;
	}

    get emailField(): AbstractControl {
		return this.formGroup.get('email')!;
	}

	get oldPasswordField(): AbstractControl {
		return this.formGroup.get('oldPassword')!;
	}

	get newPasswordField(): AbstractControl {
		return this.formGroup.get('newPassword')!;
	}
}