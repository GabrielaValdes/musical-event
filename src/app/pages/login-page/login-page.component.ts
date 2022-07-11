import { Component, ComponentFactoryResolver, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { PATHS_AUTH_PAGES, PATH_MAINTENANCE_PAGES, PATH_MY_ACCOUNT_PAGES } from 'src/app/commons/config/path-pages';
import { IDataUser } from 'src/app/commons/models/data-user';
import { IResponseLogin } from 'src/app/commons/services/api/user/user-api-model.interface';
import { UserApiService } from 'src/app/commons/services/api/user/user-api.service';
import { ChannelHeaderService } from 'src/app/commons/services/local/channel-header.service';
import { SessionStorageService } from 'src/app/commons/services/local/storage/storage.service';
import { KEYS_WEB_STORAGE } from 'src/app/commons/util/enums';
import { DemoService } from 'src/app/demo.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent  {
  
  readonly pathRecovery = PATHS_AUTH_PAGES.recoverPasswordPage.withSlash;
  readonly pathRegister = PATHS_AUTH_PAGES.registerPage.withSlash;
  disableButton = false;
  formGroup!: FormGroup;

  constructor(
    private _demoService: DemoService,
    private _router: Router,
    private _channelHeaderService: ChannelHeaderService,
    private _formBuilder: FormBuilder,
    private _useApiService: UserApiService,
    private _sessionsStorageService: SessionStorageService) {
      this._loadFormGroup();
     }

    clickLogin() : void{
    //  this._channelHeaderService.showUser(true);
      //console.log(this.formGroup.value);// para obtener el valor
      //console.log(this.formGroup.errors);// para obtener los errores de todo el formGroup
      //console.log(this.formGroup.get('email')?.errors); // para obtener errores solo del campo email
     // this._router.navigateByUrl(PATH_MAINTENANCE_PAGES.withSlash);
     if(this.formGroup.valid){
      this.disableButton=true;
        var email = this.formGroup.get('email')?.value;
        var password = this.formGroup.get('password')?.value;

        this._useApiService.login({email,password}).subscribe(
          {
            
            next:(response)=>{
              this._channelHeaderService.showUser(true);
              this._saveDatauserAndRedirect(response,email);

             // localStorage.setItem('key1',JSON.stringify(response));//no se pierda el valor si cerramos la pestañá
              //sessionStorage.setItem('key1','Saludo');//solo dura la sesión que estas haciendo, si cierrra la pestaña se pierde
              //console.log(JSON.parse(localStorage.getItem('key1')!));
            },
            error:(error)=>{
              console.log('ERROR HTTP ', error);
              this.disableButton=false;
            },
            complete: ()=>{
              console.log('complete');
            }
          }
        );
        
     }
    }

    private _saveDatauserAndRedirect(response: IResponseLogin, email: string):void{
      const dataUser: IDataUser={
        token: response.token,
        fullName: response.fullName,
        isAdmin: response.roles[0] === "Administrator",
        email: email
      };
      this._sessionsStorageService.setItem(KEYS_WEB_STORAGE.DATA_USER,dataUser);
      this._redirectUser(dataUser.isAdmin);
    }

    private _redirectUser(isAdmin:boolean){
      const url= isAdmin ? PATH_MAINTENANCE_PAGES.withSlash : PATH_MY_ACCOUNT_PAGES.withSlash;
      this._router.navigateByUrl(url);
      console.log(url); 
    }

    private _loadFormGroup():void{
      this.formGroup = this._formBuilder.group(
        {
          email:[null,[Validators.email, Validators.required]],
          password: [null, Validators.required]
        }
      )
    }

  }
