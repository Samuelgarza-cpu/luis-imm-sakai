import { Component } from '@angular/core';
import { LayoutService } from 'src/app/layout/service/app.layout.service';
import { FormGroup,FormBuilder,Validators } from '@angular/forms';
import { Router } from '@angular/router';


@Component({
    selector: 'app-login',
    templateUrl: './login.component.html',
    styles: [`
        :host ::ng-deep .pi-eye,
        :host ::ng-deep .pi-eye-slash {
            transform:scale(1.6);
            margin-right: 1rem;
            color: var(--primary-color) !important;
        }
    `]
})
export class LoginComponent {

    valCheck: string[] = ['remember'];

    password!: string;

    login:FormGroup;

    constructor(public layoutService: LayoutService, public fb:FormBuilder, public router:Router) {
     this.login = this.fb.group({
        email1:['',[Validators.required,Validators.email]],
        contraseña:['',[Validators.required]]
     })   
    }


    loginSave(){
        if(this.login.valid){
            if(this.login.get('email1')?.value == 'prueba@hotmail.com' && this.login.get('contraseña')?.value == '123' ){
                localStorage.setItem('email',this.login.get('email1')?.value);
          
                this.router.navigate(['dashboard']);
            }else{
                alert('Datos incorrectos')
            }


        }
      
    }
}
