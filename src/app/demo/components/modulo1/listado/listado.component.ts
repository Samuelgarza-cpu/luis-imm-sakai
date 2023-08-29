import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import {NodeService} from '../../../service/node.service'
import {ConfirmationService} from 'primeng/api';
import { jsPDF } from "jspdf";
import { stringify } from 'querystring';
import { disconnect } from 'process';





@Component({
  selector: 'app-listado',
  templateUrl: './listado.component.html',
  styleUrls: ['./listado.component.scss']
})
export class ListadoComponent implements OnInit,OnDestroy {
  registrosM1:any

  constructor(public router:Router, public nodeServide:NodeService,private confirmationService: ConfirmationService) { }

  ngOnInit(){
    this.traerRegistros();
  }

  ngOnDestroy():void {
  this.registrosM1 = ""
  console.log('Observable cerrado')

  }

   traerRegistros(){
   this.nodeServide.getModulo1().subscribe((data)=>{
   this.registrosM1 = data
  })
}

  editar(id:any,body:{}){
    this.nodeServide.UpdateM1(id,body).subscribe((dataOut)=>{
        console.log(dataOut)

    })
  }

  setPDF(data:any){
    const fechaIngreso = data.fechaIngreso
    const fechaIngresoOK = new Date(fechaIngreso).toLocaleDateString();
    const fechaNac = data.fechaNacimiento
    const fechaNacOK = new Date(fechaNac).toLocaleDateString();
    const fechaHech = data.fechaHechos
    const fechaHechOK = new Date(fechaHech).toLocaleDateString();
    const fechaNacA = data.fechaNacimientoAgresor
    const fechaNacAOK = new Date(fechaNacA).toLocaleDateString();


  setTimeout(()=>{
    const doc = new jsPDF('p');
    var img = new Image()
    img.src = 'assets/logo2022.png'
    doc.addImage(img, 'png', 155, 5, 45, 25)   //(inner) addImage(imageData, format, x, y, width, height, alias, compression, rotation)
    
    doc.setFontSize(15)
    // doc.setTextColor(0,0,255);
    doc.text('General de Usuaria', 10, 10);
    doc.setFontSize(10)
    doc.text('Expediente: ', 100, 25);
    doc.text(JSON.stringify(data.id_expediente),120,25);
    doc.text('Fecha de Ingreso: ', 100, 30);
    doc.text(fechaIngresoOK,130,30);
    doc.text('Hora de Ingreso:', 100, 35);
    doc.text('Agente: ', 100, 40);
    doc.text(data.agente,115,40);
    doc.text('Correo: ', 100, 45);
    doc.text(data.email,115,45);
    doc.line(10, 50, 200, 50);

    doc.text('Nombre: ', 10, 25);
    doc.text(data.nombre,25,25);
    doc.text('Apellido Paterno: ', 10, 30);
    doc.text(data.app,40,30);
    doc.text('Apellido Materno: ', 10, 35);
    doc.text(data.apm,40,35);
    doc.text('Sexo: ', 10, 40);
    doc.text(data.sexo,20,40);
    doc.text('Genero: ', 10, 45);
    doc.text(data.genero,25,45);
    doc.text('Edad: ', 10, 60);
    doc.text(JSON.stringify(data.edad),20,60);
    doc.text('Fecha Nacimiento: ', 10, 65);
    doc.text(fechaNacOK,43,65);
    doc.text('Estado Civil: ', 10, 70);
    doc.text(data.estadoCivil,33,70);
    doc.text('Numero de Hijos: ', 10, 75);
    doc.text(JSON.stringify(data.numeroHijos),37,75);
    doc.text('¿Esta Embarazada?: ', 10, 80);
    doc.text(data.estaEmbarazada,45,80);
    doc.text('Telefono: ', 130, 85);
    doc.text(data.telefono,148,85);

    doc.line(10, 90, 200, 90);

    doc.setFontSize(15)
    doc.text('Domicilio', 10, 100);
    doc.setFontSize(10)
    doc.text('Calle: ', 10, 110);
    doc.text(data.calle != "" ? data.calle: "" ,20,110);
    doc.text('Colonia: ', 10, 115);
    doc.text(data.colonia,25,115);
    doc.text('Municipio: ', 10, 120);
    doc.text(data.municipio,28,120);
    doc.text('Estado: ', 100, 110);
    doc.text(data.estado,115,110);
    doc.text('Número: ', 100, 115);
    doc.text(JSON.stringify(data.numero),115,115);
    doc.text('Zona Pertenencia: ', 100, 120);
    doc.text(data.zonaPertenencia,130,120);

    doc.line(10, 130, 200, 130);

    doc.setFontSize(15)
    doc.text('Perfil de Usuaria',10,140)
    doc.setFontSize(10)
    doc.setFont("helvetica",'bold')
    doc.text('Actividad que realiza: ',10,150)
    doc.setFont('helvetica','normal')
    doc.text(data.actRealiza,10,155);

    doc.setFont("helvetica",'bold')
    doc.text('Fuente de Ingresos: ',60,150)
    doc.setFont('helvetica','normal')
    doc.text(data.fuenteIngresos,60,155);

    doc.setFont("helvetica",'bold')
    doc.text('Lugar de Trabajo: ',115,150)
    doc.setFont('helvetica','normal')
    doc.text(data.lugarTrabajo,115,155);

    
    doc.setFont("helvetica",'bold')
    doc.text('Horario: ',160,150)
    doc.setFont('helvetica','normal')
    doc.text(data.horario,160,155);

    doc.setFont("helvetica",'bold')
    doc.text('Servicio Medico: ',10,170)
    doc.setFont('helvetica','normal')
    doc.text(data.servicioMedico,10,175);

    
    doc.setFont("helvetica",'bold')
    doc.text('Formación Educativa: ',60,170)
    doc.setFont('helvetica','normal')
    doc.text(data.formacionEducativa,60,175);

    doc.setFont("helvetica",'bold')
    doc.text('Concluida: ',115,170)
    doc.setFont('helvetica','normal')
    doc.text(data.concluida,115,175);

    doc.setFont("helvetica",'bold')
    doc.text('¿Desea encontrar trabajo? ',160,170)
    doc.setFont('helvetica','normal')
    doc.text(data.encontrarTrabajo,160,175);

    doc.setFont("helvetica",'bold')
    doc.text('¿Desea capacitarse? ',10,185)
    doc.setFont('helvetica','normal')
    doc.text(data.capacitarse,10,190);

    doc.setFont("helvetica",'bold')
    doc.text('¿Desea seguir con sus estudios? ',60,185)
    doc.setFont('helvetica','normal')
    doc.text(data.seguirEstudiando,60,190);

    
    doc.setFont("helvetica",'bold')
    doc.text('Enfermedades o dificultades de salud: ',123,185)
    doc.setFont('helvetica','normal')
    doc.text(data.enfermedades,123,190);

    doc.setFont("helvetica",'bold')
    doc.text('Origen enfermedad: ',10,200)
    doc.setFont('helvetica','normal')
    doc.text(data.origenEnfermedad,10,205);

    doc.setFont("helvetica",'bold')
    doc.text('Discapacidad: ',10,215)
    doc.setFont('helvetica','normal')
    doc.text(data.discapacidad,10,220);

    doc.setFont("helvetica",'bold')
    doc.text('Origen discapacidad: ',60,215)
    doc.setFont('helvetica','normal')
    doc.text(data.origenDiscapacidad,60,220);

    doc.setFont("helvetica",'bold')
    doc.text('Vivienda: ',115,215)
    doc.setFont('helvetica','normal')
    doc.text(data.vivienda,115,220);

    doc.setFont("helvetica",'bold')
    doc.text('Adicciones: ',160,215)
    doc.setFont('helvetica','normal')
    doc.text(data.adicciones,160,220);

    doc.line(10, 230, 200, 230);
    doc.setFontSize(15)
    doc.text('Caso de violencia',10,240)
    doc.setFontSize(10)

    doc.setFont("helvetica",'bold')
    doc.text('Tipo de violencia: ',10,250)
    doc.setFont('helvetica','normal')
    doc.text(data.tipoViolencia,10,255);

    doc.setFont("helvetica",'bold')
    doc.text('Ambito de violencia: ',60,250)
    doc.setFont('helvetica','normal')
    doc.text(data.ambitoViolencia,60,255);

    doc.setFont("helvetica",'bold')
    doc.text('Efectos de la violencia: ',115,250)
    doc.setFont('helvetica','normal')
    doc.text(data.efectosViolencia,115,255);

    doc.setFont("helvetica",'bold')
    doc.text('Fecha de los hechos: ',160,250)
    doc.setFont('helvetica','normal')
    doc.text(fechaHechOK,160,255);

    doc.setFont("helvetica",'bold')
    doc.text('Lugar de los hechos: ',10,263)
    doc.setFont('helvetica','normal')
    doc.text(data.lugarHechos,10,267);

    doc.setFont("helvetica",'bold')
    doc.text('¿El agresor estaba bajo los efectos de drogas o alcohol? ',60,263)
    doc.setFont('helvetica','normal')
    doc.text(data.efectosDrogaAlcohol,60,267);

    doc.setFont("helvetica",'bold')
    doc.text('¿Uso armas? ',160,263)
    doc.setFont('helvetica','normal')
    doc.text(data.usoArmas,160,267);

    doc.setFont("helvetica",'bold')
    doc.text('Narración de los hechos ',10,275)
    doc.setFont('helvetica','normal')
    doc.text(data.nararcionHechos,10,280);

    doc.addPage();

    doc.setFontSize(15)
    doc.text('Perfil Agresor',10,20)
    doc.setFontSize(10)
    
    doc.setFont("helvetica",'bold')
    doc.text('Nombre: ',10,30)
    doc.setFont('helvetica','normal')
    doc.text(data.nombreAgresor,10,35);

    doc.setFont("helvetica",'bold')
    doc.text('Apellido Paterno: ',50,30)
    doc.setFont('helvetica','normal')
    doc.text(data.appAgresor,50,35);

    doc.setFont("helvetica",'bold')
    doc.text('Apellido Materno: ',90,30)
    doc.setFont('helvetica','normal')
    doc.text(data.apmAgresor,90,35);

    doc.setFont("helvetica",'bold')
    doc.text('Sexo: ',130,30)
    doc.setFont('helvetica','normal')
    doc.text(data.sexoAgresor,130,35);

    doc.setFont("helvetica",'bold')
    doc.text('Genero: ',150,30)
    doc.setFont('helvetica','normal')
    doc.text(data.generoAgresor,150,35);

    doc.setFont("helvetica",'bold')
    doc.text('Edad: ',175,30)
    doc.setFont('helvetica','normal')
    doc.text(JSON.stringify(data.edadAgresor),175,35);

    doc.setFont("helvetica",'bold')
    doc.text('Fecha nacimiento: ',10,45)
    doc.setFont('helvetica','normal')
    doc.text(fechaNacAOK,10,50);

    doc.setFont("helvetica",'bold')
    doc.text('Fecha nacimiento: ',10,45)
    doc.setFont('helvetica','normal')
    doc.text(fechaNacAOK,10,50);

    doc.line(10,55,200,55)
    
    
    doc.setFontSize(15)
    doc.text('Domicilio',10,65)
    doc.setFontSize(10)
    
    doc.setFont("helvetica",'bold')
    doc.text('Calle: ',10,75)
    doc.setFont('helvetica','normal')
    doc.text(data.calleAgresor,10,80);

    doc.setFont("helvetica",'bold')
    doc.text('Colonia: ',60,75)
    doc.setFont('helvetica','normal')
    doc.text(data.coloniaAgresor,60,80);

    doc.setFont("helvetica",'bold')
    doc.text('Municipio: ',115,75)
    doc.setFont('helvetica','normal')
    doc.text(data.municipioAgresor,115,80);

    doc.setFont("helvetica",'bold')
    doc.text('Estado: ',160,75)
    doc.setFont('helvetica','normal')
    doc.text(data.estadoAgresor,160,80);

    
    doc.setFont("helvetica",'bold')
    doc.text('N°: ',10,90)
    doc.setFont('helvetica','normal')
    doc.text(JSON.stringify(data.numeroAgresor),10,95);

    doc.setFont("helvetica",'bold')
    doc.text('Zona de pertenencia: ',60,90)
    doc.setFont('helvetica','normal')
    doc.text(data.zonaPertenenciaAgresor,60,95);

    doc.setFont("helvetica",'bold')
    doc.text('Telefono: ',115,90)
    doc.setFont('helvetica','normal')
    doc.text(data.telAgresor,115,95);

    doc.line(10,105,200,105)
    
    doc.setFontSize(15)
    doc.text('Datos',10,115)
    doc.setFontSize(10)

    
    doc.setFont("helvetica",'bold')
    doc.text('Actividad que realiza: ',10,125)
    doc.setFont('helvetica','normal')
    doc.text(data.actRealizaAgresor,10,130);

    doc.setFont("helvetica",'bold')
    doc.text('Fuente de ingreso: ',60,125)
    doc.setFont('helvetica','normal')
    doc.text(data.fuenteIngresosAgresor,60,130);

    doc.setFont("helvetica",'bold')
    doc.text('Lugar de trabajo: ',115,125)
    doc.setFont('helvetica','normal')
    doc.text(data.lugarTrabajoAgresor,115,130);

    doc.setFont("helvetica",'bold')
    doc.text('Horario: ',160,125)
    doc.setFont('helvetica','normal')
    doc.text(data.horarioAgresor,160,130);

    doc.setFont("helvetica",'bold')
    doc.text('Servicio medico: ',10,140)
    doc.setFont('helvetica','normal')
    doc.text(data.servicioMedAgresor,10,145);

    
    doc.setFont("helvetica",'bold')
    doc.text('Vivienda: ',60,140)
    doc.setFont('helvetica','normal')
    doc.text(data.viviendaAgresor,60,145);

    doc.setFont("helvetica",'bold')
    doc.text('Enfermedades o dificultades de salud: ',115,140)
    doc.setFont('helvetica','normal')
    doc.text(data.enfermedadesAgresor,115,145);

    doc.setFont("helvetica",'bold')
    doc.text('Origen de la Enfermedad: ',10,155)
    doc.setFont('helvetica','normal')
    doc.text(data.origenEnfermedadAgresor,10,160);

    doc.setFont("helvetica",'bold')
    doc.text('Discapacidad: ',60,155)
    doc.setFont('helvetica','normal')
    doc.text(data.discapacidadAgresor,60,160);

    doc.setFont("helvetica",'bold')
    doc.text('Origen Discapacidad: ',115,155)
    doc.setFont('helvetica','normal')
    doc.text(data.origenDiscapacidadAgresor,115,160);


    doc.setFont("helvetica",'bold')
    doc.text('Adicciones: ',160,155)
    doc.setFont('helvetica','normal')
    doc.text(data.adiccionesAgresor,160,160);

    
    doc.setFont("helvetica",'bold')
    doc.text('Estado de nacimiento: ',10,170)
    doc.setFont('helvetica','normal')
    doc.text(data.estadoNacimientoAgresor,10,175);

    doc.setFont("helvetica",'bold')
    doc.text('Media Filiacion: ',60,170)
    doc.setFont('helvetica','normal')
    doc.text(data.mediaFiliacion,60,175);

    doc.line(10,185,200,185)
    
    doc.setFontSize(15)
    doc.text('Servicios',10,195)
    doc.setFontSize(10)

    doc.setFont("helvetica",'bold')
    doc.text('Servicio de referencia: ',10,220)
    doc.setFont('helvetica','normal')
    doc.text(data.serReferencia,10,225);

    
    doc.setFont("helvetica",'bold')
    doc.text('Estatus del Servicio: ',10,205)
    doc.setFont('helvetica','normal')
    doc.text(data.estatusServicio,10,210);

    doc.setFont("helvetica",'bold')
    doc.text('Eje: ',95,220)
    doc.setFont('helvetica','normal')
    doc.text(data.eje,95,225);

    doc.setFont("helvetica",'bold')
    doc.text('Linea de Acción: ',160,220)
    doc.setFont('helvetica','normal')
    doc.text(data.lineaAccion,160,225);

    doc.setFont("helvetica",'bold')
    doc.text('Observaciones: ',10,240)
    doc.setFont('helvetica','normal')
    doc.text(data.Observaciones,10,245);


    doc.output('dataurlnewwindow')
    
    // doc.save("mipdf.pdf");

  },500)
}

  borrarM1(id:any){
    this.nodeServide.deleteM1(id).subscribe((data)=>{
      console.log(data)
      this.confirmationService.confirm({
        message: '¿Estas seguro de Eliminar el Registro?',
        accept: () => {
          this.traerRegistros()
        }
    });

    })
  }
}

