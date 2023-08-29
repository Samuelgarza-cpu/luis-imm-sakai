import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormGroup,FormBuilder,Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { PrimeNGConfig } from 'primeng/api';
import { NodeService }from './../../service/node.service'



@Component({
  selector: 'app-modulo1',
  templateUrl: './modulo1.component.html',
  styleUrls: ['./modulo1.component.scss']
})
export class Modulo1Component implements OnInit {

  @ViewChild('myData') myData:ElementRef | undefined

  modulo1:FormGroup;
  fechaActual = new Date().toLocaleDateString();
  fechaEnviar = new Date();
  valorRetorno:any
  horaActual = new Date();
  hora = this.horaActual.getHours() + ':' + this.horaActual.getMinutes();

  año = this.horaActual.getFullYear();
  



  constructor(public fb:FormBuilder,private config: PrimeNGConfig,public nodeServide:NodeService,public route:Router) {
    this.modulo1 = fb.group({
      expediente : [''],
      fechaingreso : [this.fechaActual],
      horaingreso : [this.hora],
      agente : ['Admin'],
      nombre : ['',Validators.required],
      app : ['',Validators.required],
      apm : ['',Validators.required],
      sexo : ['',Validators.required],
      genero:['',Validators.required],
      fechaNacimiento:['',Validators.required],
      edad:[0,Validators.required],
      correo:['',[Validators.required,Validators.email]],
      civil:['',Validators.required],
      numHijos:[0,Validators.required],
      embarazada:['',Validators.required],
      calle:['',Validators.required],
      colonia:['',Validators.required],
      numero:[0,Validators.required],
      municipio:['',Validators.required],
      estado:['',Validators.required],
      zonap:['',Validators.required],
      telefono:['',Validators.required],
      actividadRealiza:[''],
      fuenteIngresos:[''],
      lugarTrabajo:[''],
      horario:[''],
      servicioMedico:[''],
      formacionEducativa:[''],
      Concluida:[''],
      encontrarTrabajo:[''],
      capacitarse:[''],
      seguirEstudiando:[''],
      dificultadesSalud:[''],
      origenEnfermedad:[''],
      otraCausaEnfermedad:[''],
      discapacidad:[''],
      origenDiscapacidad:[''],
      otraCausaDiscapacidad:[''],
      Vivienda:[''],
      Adicciones:[''],
      tipoViolencia:[''],
      ambitoViolencia:[''],
      efectosViolencia:[''],
      narracionHechos:[''],
      fechaHechos:[''],
      LugardelosHechos:[''],
      agresorDrogasAlcohol:[''],
      usoArmas:[''],
      nombreAgresor:[''],
      appAgresor:[''],
      apmAgresor:[''],
      sexoAgresor:[''],
      generoAgresor:[''],
      fechaNacAgresor:[''],
      EdadAgresor:[0],
      calleAgresor:[''],
      coloniaAgresor:[''],
      numeroAgresor:[0],
      MunicipioAgresor:[''],
      EstadoAgresor:[''],
      zonapAgresor:[''],
      telAgresor:[''],
      actividadRealizaAgresor:[''],
      fuenteIngresosAgresor:[''],
      lugarTrabajoAgresor:[''],
      servicioMedicoAgresor:[''],
      horarioAgresor:[''],
      dificultadesSaludAgresor:[''],
      origenEnfermedadAgresor:[''],
      otraCausaEnfermedadAgresor:[''],
      discapacidadAgresor:[''],
      origenDiscapacidadAgresor:[''],
      otraCausaDiscapacidadAgresor:[''],
      ViviendaAgresor:[''],
      AdiccionesAgresor:[''],
      EstadoNacimientoAgresor:[''],
      MediaFiliacionAgresor:[''],
      servicioReferencia:[''],
      EstatusServicio:['',Validators.required],
      ejeServicio:[''],
      lineaAccion:[''],
      Observaciones:[''],
    })
   }

  ngOnInit(): void {
    this.config.setTranslation({
      accept: 'Aceptar',
      reject: 'Cancelar',
      dayNamesShort: ["Dom", "Lun", "Mar", "Mie", "Jue", "Vie", "Sab"],
      dayNamesMin: ["Do","Lu","Ma","Mi","Ju","Vi","Sa"],
      monthNames: ["Enero","Febrero","Marzo","Abril","Mayo","Junio","Julio","Agosto","Septiembre","Octubre","Noviembre","Diciembre"],

  });

  this.modulo1.patchValue({expediente:this.año});
  }

  guardarModulo1(data:any){
  data.fechaingreso = this.fechaEnviar
  this.nodeServide.postM1(data).subscribe(data =>{
    this.valorRetorno = data
    if(this.valorRetorno.STATUS = 'correcto'){
      console.log(this.valorRetorno.STATUS)
      alert(`Registro almacenado con ID: ${this.valorRetorno.id}`);
       this.route.navigate(['/dashboard/listadom1'])
    }else{
      alert('ERROR, FALTAN DATOS');
      console.log('error')
    }


  })
 
  }
  setPDF(){
      // const fechaIngre = 
    setTimeout(()=>{
      const doc = new jsPDF('landscape');
      var img = new Image()
      img.src = 'assets/logo2022.png'
      doc.addImage(img, 'png', 250, 5, 35, 25)   //(inner) addImage(imageData, format, x, y, width, height, alias, compression, rotation)
      
      // doc.line(5, 5, 290, 5); //Linea horizontal
      // doc.line(5, 5, 5, 110);  // Linea Vertical
      // doc.line(5, 110, 290, 110);
      // doc.line(290, 5, 290, 110); 
      doc.setFontSize(15)

      // doc.setTextColor(0,0,255);
      // doc.setFont("courier");
      doc.text('General de Usuaria', 10, 10);
      doc.setFontSize(10)
      doc.text('Expediente: ', 10, 25);
      doc.text(this.modulo1.get('expediente')?.value,30,25);
      doc.text('Fecha de Ingreso: ', 10, 30);
      doc.text(this.modulo1.get('fechaingreso')?.value,40,30);
      doc.text('Hora de Ingreso:', 10, 35);
      doc.text(this.modulo1.get('horaingreso')?.value,40,35);
      doc.text('Agente: ', 10, 40);
      doc.text(this.modulo1.get('agente')?.value,25,40);
      doc.line(10, 50, 280, 50);

      doc.setFontSize(12)
      doc.text('Nombre: ', 10, 60);
      doc.text(this.modulo1.get('nombre')?.value,30,60);
      doc.text('Apellido Paterno: ', 10, 65);
      doc.text(this.modulo1.get('app')?.value,45,65);
      doc.text('Apellido Materno: ', 10, 70);
      doc.text(this.modulo1.get('apm')?.value,45,70);
      // doc.text('Sexo: ', 10, 60);
      // doc.text(this.modulo1.get('sexo')?.value,33,60);
      // doc.text('Genero: ', 10, 60);
      // doc.text(this.modulo1.get('genero')?.value,33,60);
      // doc.text('Fecha Nacimiento: ', 10, 60);
      // doc.text(this.modulo1.get('fechaNacimiento')?.value,33,60);
      // doc.text('Edad: ', 10, 60);
      // doc.text(this.modulo1.get('edad')?.value,33,60);
      // doc.text('Correo: ', 10, 60);
      // doc.text(this.modulo1.get('correo')?.value,33,60);
      // doc.text('Estado Civil: ', 10, 60);
      // doc.text(this.modulo1.get('civil')?.value,33,60);
      // doc.text('Numero de Hijos: ', 10, 60);
      // doc.text(this.modulo1.get('numHijos')?.value,33,60);
      // doc.text('¿Esta Embarazada?: ', 10, 60);
      // doc.text(this.modulo1.get('embarazada')?.value,33,60);
      // doc.setFontSize(18)
      // doc.text('Domicilio: ', 10, 60);
      // doc.setFontSize(15)
      // doc.text('Calle: ', 10, 60);
      // doc.text(this.modulo1.get('calle')?.value,33,60);
      // doc.text('Colonia: ', 10, 60);
      // doc.text(this.modulo1.get('colonia')?.value,33,60);
      // doc.text('Número: ', 10, 60);
      // doc.text(this.modulo1.get('numero')?.value,33,60);
      // doc.text('Municipio: ', 10, 60);
      // doc.text(this.modulo1.get('municipio')?.value,33,60);
      // doc.text('Estado: ', 10, 60);
      // doc.text(this.modulo1.get('estado')?.value,33,60);
      // doc.text('Zona Pertenencia: ', 10, 60);
      // doc.text(this.modulo1.get('zonap')?.value,33,60);
      // doc.text('Telefono: ', 10, 60);
      // doc.text(this.modulo1.get('telefono')?.value,33,60);
      doc.addPage()

      // doc.text(this.modulo1.get('actividadRealiza')?.value,33,60);
      // doc.text(this.modulo1.get('fuenteIngresos')?.value,33,60);
      // doc.text(this.modulo1.get('lugarTrabajo')?.value,33,60);
      // doc.text(this.modulo1.get('horario')?.value,33,60);
      // doc.text(this.modulo1.get('servicioMedico')?.value,33,60);
      // doc.text(this.modulo1.get('formacionEducativa')?.value,33,60);
      // doc.text(this.modulo1.get('Concluida')?.value,33,60);
      // doc.text(this.modulo1.get('encontrarTrabajo')?.value,33,60);
      // doc.text(this.modulo1.get('capacitarse')?.value,33,60);
      // doc.text(this.modulo1.get('seguirEstudiando')?.value,33,60);
      // doc.text(this.modulo1.get('dificultadesSalud')?.value,33,60);
      // doc.text(this.modulo1.get('origenEnfermedad')?.value,33,60);
      // doc.text(this.modulo1.get('otraCausaEnfermedad')?.value,33,60);
      // doc.text(this.modulo1.get('discapacidad')?.value,33,60);
      // doc.text(this.modulo1.get('origenDiscapacidad')?.value,33,60);
      // doc.text(this.modulo1.get('otraCausaDiscapacidad')?.value,33,60);
      // doc.text(this.modulo1.get('Vivienda')?.value,33,60);
      // doc.text(this.modulo1.get('Adicciones')?.value,33,60);
      // doc.text(this.modulo1.get('tipoViolencia')?.value,33,60);
      // doc.text(this.modulo1.get('ambitoViolencia')?.value,33,60);
      // doc.text(this.modulo1.get('efectosViolencia')?.value,33,60);
      // doc.text(this.modulo1.get('narracionHechos')?.value,33,60);
      // doc.text(this.modulo1.get('fechaHechos')?.value,33,60);
      // doc.text(this.modulo1.get('LugardelosHechos')?.value,33,60);
      // doc.text(this.modulo1.get('agresorDrogasAlcohol')?.value,33,60);
      // doc.text(this.modulo1.get('usoArmas')?.value,33,60);
      // doc.text(this.modulo1.get('nombreAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('appAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('apmAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('sexoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('generoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('fechaNacAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('EdadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('calleAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('coloniaAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('numeroAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('MunicipioAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('EstadoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('zonapAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('telAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('actividadRealizaAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('fuenteIngresosAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('lugarTrabajoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('servicioMedicoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('horarioAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('dificultadesSaludAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('origenEnfermedadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('otraCausaEnfermedadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('discapacidadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('origenDiscapacidadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('otraCausaDiscapacidadAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('ViviendaAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('AdiccionesAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('EstadoNacimientoAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('MediaFiliacionAgresor')?.value,33,60);
      // doc.text(this.modulo1.get('servicioReferencia')?.value,33,60);
      // doc.text(this.modulo1.get('EstatusServicio')?.value,33,60);
      // doc.text(this.modulo1.get('ejeServicio')?.value,33,60);
      // doc.text(this.modulo1.get('lineaAccion')?.value,33,60);
      // doc.text(this.modulo1.get('Observaciones')?.value,33,60);
      
      doc.output('dataurlnewwindow')
      
      // doc.save("mipdf.pdf");

    },500)
  }

}
