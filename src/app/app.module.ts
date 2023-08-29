import { NgModule } from '@angular/core';
import { HashLocationStrategy, LocationStrategy } from '@angular/common';
import { AppComponent } from './app.component';
import { AppRoutingModule } from './app-routing.module';
import { AppLayoutModule } from './layout/app.layout.module';
import { NotfoundComponent } from './demo/components/notfound/notfound.component';
import { ProductService } from './demo/service/product.service';
import { CountryService } from './demo/service/country.service';
import { CustomerService } from './demo/service/customer.service';
import { EventService } from './demo/service/event.service';
import { IconService } from './demo/service/icon.service';
import { NodeService } from './demo/service/node.service';
import { PhotoService } from './demo/service/photo.service';
import { RegistroUsuariosComponent } from './demo/components/registro-usuarios/registro-usuarios.component';
import {InputTextModule} from 'primeng/inputtext';
import {ButtonModule} from 'primeng/button';
import {CheckboxModule} from 'primeng/checkbox';
import {RadioButtonModule} from 'primeng/radiobutton';
import {RippleModule} from 'primeng/ripple';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {FormsModule,ReactiveFormsModule} from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import {RouterModule} from '@angular/router';
import {TableModule} from 'primeng/table';
import {ToastModule} from 'primeng/toast';
import {CalendarModule} from 'primeng/calendar';
import {SliderModule} from 'primeng/slider';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {DialogModule} from 'primeng/dialog';
import {DropdownModule} from 'primeng/dropdown';
import {ProgressBarModule} from 'primeng/progressbar';
import {FileUploadModule} from 'primeng/fileupload';
import {ToolbarModule} from 'primeng/toolbar';
import {RatingModule} from 'primeng/rating';
import {InputNumberModule} from 'primeng/inputnumber';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';
import { Modulo1Component } from './demo/components/modulo1/modulo1.component';
import {TabViewModule} from 'primeng/tabview';
import {InputMaskModule} from 'primeng/inputmask';
import { ListadoComponent } from './demo/components/modulo1/listado/listado.component';
import { ModificarComponent } from './demo/components/modulo1/modificar/modificar.component';
import { NgxMaskModule, IConfig } from 'ngx-mask'

const maskConfig: Partial<IConfig> = {
    validation: false,
  };





@NgModule({
    declarations: [
        AppComponent, NotfoundComponent, RegistroUsuariosComponent, Modulo1Component, ListadoComponent, ModificarComponent
    ],
    imports: [
        AppRoutingModule,
        AppLayoutModule,
        InputTextModule,
        ButtonModule,
        RadioButtonModule,
        RippleModule,
        CheckboxModule,
        BrowserAnimationsModule,
        FormsModule,
        BrowserModule,
        HttpClientModule,
        RouterModule,
        TableModule,
        ToastModule,
        CalendarModule,
        SliderModule,
        MultiSelectModule,
        ContextMenuModule,
        DialogModule,
        DropdownModule,
        ProgressBarModule,
        FileUploadModule,
        ToolbarModule,
        RatingModule,
        InputNumberModule,
        ConfirmDialogModule,
        InputTextareaModule,
        TabViewModule,
        ReactiveFormsModule,
        InputMaskModule,
        NgxMaskModule.forRoot(maskConfig)
    ],
    providers: [
        { provide: LocationStrategy, useClass: HashLocationStrategy },
        CountryService, CustomerService, EventService, IconService, NodeService,
        PhotoService, ProductService, MessageService,ConfirmationService
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
