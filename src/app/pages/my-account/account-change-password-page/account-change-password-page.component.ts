import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, FormGroupDirective, Validators } from '@angular/forms';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { CRUD_METHOD } from 'src/app/commons/util/enums';
import { PurchaseListPageService } from '../account-purchase-list-page/account-purchase-list-page.service';
import { AccountChangePasswordPageService } from './account-change-password-page.service';
import { ConfirmBoxEvokeService } from '@costlydeveloper/ngx-awesome-popup';
import { map, Observable } from 'rxjs';
import { IDataUser } from 'src/app/commons/models/data-user';
import { CanComponentDeactivate } from 'src/app/commons/guards/form-event.guard';
import { customPasswordValidator } from 'src/app/commons/validators/forms.validators';
import { crossPasswordMatchingValidatior } from '../../register-page/register-custom-validators';

@Component({
  selector: 'app-account-change-password-page',
  templateUrl: './account-change-password-page.component.html',
  styleUrls: ['./account-change-password-page.component.scss'],
  providers: [AccountChangePasswordPageService]
})
export class AccountChangePasswordPageComponent implements CanComponentDeactivate {
  @ViewChild(FormGroupDirective) formRef!: FormGroupDirective;
  disableButton = false;
  formGroup!: FormGroup;
  private _crudMethod = CRUD_METHOD.UPDATE;

  //#region getters Form

  oldPasswordField = this._accountChantePasswordPageService.oldPasswordField;
  newPasswordField = this._accountChantePasswordPageService.newPasswordField;

	//#region

  constructor(
 
    private _accountChantePasswordPageService: AccountChangePasswordPageService,
		private _confirmBoxEvokeService: ConfirmBoxEvokeService,private _formBuilder: FormBuilder)
  {this.formGroup = this._accountChantePasswordPageService.formGroup;}

  canDeactivate(): Observable<boolean> | boolean {
		const values = this.formGroup.value as IUserForm;
		const isThereDataEntered = Object.values(values).find((item) => item !== null) as unknown;

		if (!isThereDataEntered) {
			return true;
		}

		return this._confirmBoxEvokeService
			.warning('Advertencia', 'Los datos ingresados se perderán, ¿Esta seguro que desea salir?', 'Si', 'Cancelar')
			.pipe(map((response) => response.success));
	}

  clickSave(): void {
		if (this.formGroup.valid) {
			this._accountChantePasswordPageService.saveNewPassword(this._crudMethod).subscribe((response) => {
				if (response) {
					this.formRef.resetForm();
				}
			});
		}
	}

	
}



export interface IUserForm {
	id?: number;
	oldPassword: string;
	newPassword: string;
}