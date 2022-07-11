import { NgModule } from '@angular/core';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';
import { ContainerComponent } from './container.component';
import { MatButtonModule } from '@angular/material/button';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';


@NgModule({
    declarations: [ContainerComponent,HeaderComponent,FooterComponent],
    imports: [CommonModule,MatButtonModule,RouterModule],
    exports: [ContainerComponent],
   
})

export class ContainerModule { }
