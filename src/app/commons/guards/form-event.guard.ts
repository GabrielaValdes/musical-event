import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, CanDeactivate, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';


export interface CanComponentDeactivate {
	canDeactivate(): Observable<boolean> | boolean;
}

@Injectable({
	providedIn: 'root'
})
export class FormEventGuard implements CanDeactivate<CanComponentDeactivate> {
	canDeactivate(
		component: CanComponentDeactivate,
		currentRoute: ActivatedRouteSnapshot,
		currentState: RouterStateSnapshot,
		nextState?: RouterStateSnapshot
	): boolean | Observable<boolean> {
		return component.canDeactivate ? component.canDeactivate() : true;
	}
}
// este guard es para validar si el usuario deja o no un componente