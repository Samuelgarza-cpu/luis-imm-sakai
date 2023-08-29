
import { Component, OnInit } from '@angular/core';

import {FormBuilder, FormGroup, Validators} from '@angular/forms' 
import { Router } from '@angular/router';
import { NodeService }from './../../service/node.service'


import {MessageService} from 'primeng/api';
import {PrimeNGConfig } from 'primeng/api';  
import {ConfirmationService} from 'primeng/api';



interface Sexo {
  name: string,
  code: string
}
@Component({
  selector: 'app-registro-usuarios',
  templateUrl: './registro-usuarios.component.html',
  styleUrls: ['./registro-usuarios.component.scss']

})
export class RegistroUsuariosComponent implements OnInit {
  public formGrupo : FormGroup;
  products: any[]
  selectUserID:{} = {}
  inputEmail:{} = {}
  inputPass:{} = {}
  inputSex:{} = {}
  sexo: Sexo[];
  display: boolean = false;

  data:{} ={};

  constructor(private confirmationService: ConfirmationService,public nodeServide:NodeService , public fb:FormBuilder, public router:Router,private messageService: MessageService,private primengConfig: PrimeNGConfig) {
    this.sexo = [
      {name: 'HOMBRE', code: 'H'},
      {name: 'MUJER', code: 'M'},
      {name: 'NO BINARIO', code: 'NB'},

  ];
 this.products = []

         this.formGrupo = this.fb.group({
          email : ['',[Validators.required,Validators.email]],
          pass : ['',Validators.required],
          sexo:['',Validators.required]
         })
   }

  ngOnInit(): void {
      this.usuariosTabla();

  }
onRowSelect(event:any) {
 
  this.selectUserID = event.data.id
  this.inputEmail= event.data.email
  this.inputPass= event.data.pass
  this.inputSex= 'NB'

}

showDialog() {
  if(JSON.stringify(this.selectUserID)=='{}'){
    this.messageService.add({severity:'info', summary:'Alerta', detail:'Selecciona un usuario para Modificar'});
  }else{
    this.display = true;
  }
 
}
deleteUser(){

  if(JSON.stringify(this.selectUserID)=='{}'){
    this.messageService.add({severity:'info', summary:'Alerta', detail:'Selecciona un usuario para eliminar'});
  }else{
    this.confirmationService.confirm({
      message: '¿Estas seguro que quieres eliminar el usuario?',
      header: 'Confirmación',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {

        this.nodeServide.deleteUsuario(this.selectUserID).subscribe((res) =>{
          if(res == 1){
            this.usuariosTabla();
          }
     })
      },
      reject: () => {
      }
  });
  }
}
  crearUser(){
    this.nodeServide.insertarUsuario(this.formGrupo.value).subscribe((res: any) => {

      if(res == '0'){
          console.log('NO SE ENCONTRO USUARIO')
      }else{

        this.formGrupo.reset();
        this.usuariosTabla();
        //  this.router.navigate(['/dashboard'])
      }
        },
        (error) =>{
         
          console.error(error);
        })
  }
  usuariosTabla(){
    this.nodeServide.getUser().subscribe((res)=>{
      this.products = Object.values(res)
    })
  }

  updateUser(){

    this.data = {
      id: this.selectUserID,
      email: this.inputEmail,
      pass: this.inputPass,
      sexo: this.inputSex
    }

    this.nodeServide.updateUser(this.data).subscribe((res) =>{
      if(res == 1){
        this.inputEmail = {};
        this.inputPass = {};
        this.inputSex= {};

        this.display = false;
        this.usuariosTabla();
        console.log('SI RETORNA 1 DESDE SERVER')
      }else{
         console.log('NO SE MODIFICO NADA')
      }
 })
  
  }
}

