import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { NodeService } from 'src/app/demo/service/node.service';
import { FormGroup,FormBuilder,Validators, Form } from '@angular/forms';
import { Router } from '@angular/router';
import { jsPDF } from "jspdf";
import { PrimeNGConfig } from 'primeng/api';

@Component({
  selector: 'app-modificar',
  templateUrl: './modificar.component.html',
  styleUrls: ['./modificar.component.scss']
})
export class ModificarComponent implements OnInit {
  idExpediente:any
  dataExpediente : any
  modulo1:FormGroup;
  fechaActual = new Date().toLocaleDateString();
  fechaEnviar = new Date();
  valorRetorno:any
  horaActual = new Date();
  hora = this.horaActual.getHours() + ':' + this.horaActual.getMinutes();
  constructor(private rutaActiva: ActivatedRoute , public nodeService:NodeService,public fb:FormBuilder,private config: PrimeNGConfig,public route:Router) {
    
    this.modulo1 = fb.group({
      expediente : ['2022'],
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
    const {id} = this.rutaActiva.snapshot.params
    this.idExpediente = id
   this.nodeService.getModulo1ID(id).subscribe((data)=>{
    this.dataExpediente = data;
    this.modulo1.controls['expediente'].setValue(this.dataExpediente.id_expediente)
    this.modulo1.controls['fechaingreso'].setValue(this.dataExpediente.fechaIngreso.substring(0, 10))
    this.modulo1.controls['nombre'].setValue(this.dataExpediente.nombre)
    this.modulo1.controls['app'].setValue(this.dataExpediente.app)
    this.modulo1.controls['apm'].setValue(this.dataExpediente.apm)
    this.modulo1.controls['sexo'].setValue(this.dataExpediente.sexo)
    this.modulo1.controls['genero'].setValue(this.dataExpediente.genero)
    this.modulo1.controls['fechaNacimiento'].setValue(this.dataExpediente.fechaNacimiento)
    this.modulo1.controls['edad'].setValue(this.dataExpediente.edad)
    this.modulo1.controls['correo'].setValue(this.dataExpediente.email)
    this.modulo1.controls['civil'].setValue(this.dataExpediente.estadoCivil)
    this.modulo1.controls['numHijos'].setValue(this.dataExpediente.numeroHijos)
    this.modulo1.controls['embarazada'].setValue(this.dataExpediente.estaEmbarazada)
    this.modulo1.controls['calle'].setValue(this.dataExpediente.calle)
    this.modulo1.controls['colonia'].setValue(this.dataExpediente.colonia)
    this.modulo1.controls['numero'].setValue(this.dataExpediente.numero)
    this.modulo1.controls['municipio'].setValue(this.dataExpediente.municipio)
    this.modulo1.controls['estado'].setValue(this.dataExpediente.estado)
    this.modulo1.controls['zonap'].setValue(this.dataExpediente.zonaPertenencia)
    this.modulo1.controls['telefono'].setValue(this.dataExpediente.telefono)
    this.modulo1.controls['actividadRealiza'].setValue(this.dataExpediente.actRealiza)
    this.modulo1.controls['fuenteIngresos'].setValue(this.dataExpediente.fuenteIngresos)
    this.modulo1.controls['lugarTrabajo'].setValue(this.dataExpediente.lugarTrabajo)
    this.modulo1.controls['horario'].setValue(this.dataExpediente.horario)
    this.modulo1.controls['servicioMedico'].setValue(this.dataExpediente.servicioMedico)
    this.modulo1.controls['formacionEducativa'].setValue(this.dataExpediente.formacionEducativa)
    this.modulo1.controls['Concluida'].setValue(this.dataExpediente.concluida)
    this.modulo1.controls['encontrarTrabajo'].setValue(this.dataExpediente.encontrarTrabajo)
    this.modulo1.controls['capacitarse'].setValue(this.dataExpediente.capacitarse)
    this.modulo1.controls['seguirEstudiando'].setValue(this.dataExpediente.seguirEstudiando)
    this.modulo1.controls['dificultadesSalud'].setValue(this.dataExpediente.enfermedades)
    this.modulo1.controls['origenEnfermedad'].setValue(this.dataExpediente.origenEnfermedad)
    this.modulo1.controls['discapacidad'].setValue(this.dataExpediente.discapacidad)
    this.modulo1.controls['origenDiscapacidad'].setValue(this.dataExpediente.origenDiscapacidad)
    this.modulo1.controls['Vivienda'].setValue(this.dataExpediente.vivienda)
    this.modulo1.controls['Adicciones'].setValue(this.dataExpediente.adicciones)
    this.modulo1.controls['tipoViolencia'].setValue(this.dataExpediente.tipoViolencia)
    this.modulo1.controls['ambitoViolencia'].setValue(this.dataExpediente.ambitoViolencia)

    this.modulo1.controls['efectosViolencia'].setValue(this.dataExpediente.efectosViolencia)
    this.modulo1.controls['narracionHechos'].setValue(this.dataExpediente.nararcionHechos)
    this.modulo1.controls['fechaHechos'].setValue(this.dataExpediente.fechaHechos)
    this.modulo1.controls['LugardelosHechos'].setValue(this.dataExpediente.lugarHechos)
    this.modulo1.controls['agresorDrogasAlcohol'].setValue(this.dataExpediente.efectosDrogaAlcohol)
    this.modulo1.controls['usoArmas'].setValue(this.dataExpediente.usoArmas)
    this.modulo1.controls['nombreAgresor'].setValue(this.dataExpediente.nombreAgresor)
    this.modulo1.controls['appAgresor'].setValue(this.dataExpediente.appAgresor)
    this.modulo1.controls['apmAgresor'].setValue(this.dataExpediente.apmAgresor)
    this.modulo1.controls['sexoAgresor'].setValue(this.dataExpediente.sexoAgresor)

    this.modulo1.controls['generoAgresor'].setValue(this.dataExpediente.generoAgresor)
    this.modulo1.controls['fechaNacAgresor'].setValue(this.dataExpediente.fechaNacimientoAgresor)
    this.modulo1.controls['EdadAgresor'].setValue(this.dataExpediente.edadAgresor)
    this.modulo1.controls['calleAgresor'].setValue(this.dataExpediente.calleAgresor)
    this.modulo1.controls['coloniaAgresor'].setValue(this.dataExpediente.coloniaAgresor)
    this.modulo1.controls['numeroAgresor'].setValue(this.dataExpediente.numeroAgresor)
    this.modulo1.controls['MunicipioAgresor'].setValue(this.dataExpediente.municipioAgresor)
    this.modulo1.controls['EstadoAgresor'].setValue(this.dataExpediente.estadoAgresor)
    this.modulo1.controls['zonapAgresor'].setValue(this.dataExpediente.zonaPertenenciaAgresor)
    this.modulo1.controls['telAgresor'].setValue(this.dataExpediente.telAgresor)

    
    this.modulo1.controls['actividadRealizaAgresor'].setValue(this.dataExpediente.actRealizaAgresor)
    this.modulo1.controls['fuenteIngresosAgresor'].setValue(this.dataExpediente.fuenteIngresosAgresor)
    this.modulo1.controls['lugarTrabajoAgresor'].setValue(this.dataExpediente.lugarTrabajoAgresor)
    this.modulo1.controls['servicioMedicoAgresor'].setValue(this.dataExpediente.servicioMedAgresor)
    this.modulo1.controls['horarioAgresor'].setValue(this.dataExpediente.horarioAgresor)
    this.modulo1.controls['dificultadesSaludAgresor'].setValue(this.dataExpediente.enfermedadesAgresor)
    this.modulo1.controls['origenEnfermedadAgresor'].setValue(this.dataExpediente.origenEnfermedadAgresor)
    this.modulo1.controls['discapacidadAgresor'].setValue(this.dataExpediente.discapacidadAgresor)
    this.modulo1.controls['origenDiscapacidadAgresor'].setValue(this.dataExpediente.origenDiscapacidadAgresor)

        
    this.modulo1.controls['otraCausaDiscapacidadAgresor'].setValue(this.dataExpediente.otroOrigenDisAgresor)
    this.modulo1.controls['ViviendaAgresor'].setValue(this.dataExpediente.viviendaAgresor)
    this.modulo1.controls['AdiccionesAgresor'].setValue(this.dataExpediente.adiccionesAgresor)
    this.modulo1.controls['EstadoNacimientoAgresor'].setValue(this.dataExpediente.estadoNacimientoAgresor)
    this.modulo1.controls['MediaFiliacionAgresor'].setValue(this.dataExpediente.mediaFiliacion)
    this.modulo1.controls['servicioReferencia'].setValue(this.dataExpediente.serReferencia)
    this.modulo1.controls['EstatusServicio'].setValue(this.dataExpediente.estatusServicio)
    this.modulo1.controls['ejeServicio'].setValue(this.dataExpediente.eje)
    this.modulo1.controls['lineaAccion'].setValue(this.dataExpediente.lineaAccion)
    this.modulo1.controls['Observaciones'].setValue(this.dataExpediente.Observaciones)
    
  });
}


  update(data:any){
 this.nodeService.UpdateM1(this.idExpediente,data).subscribe((data)=>{
  if(data == 1){
      alert('Expediente actualizado')
      this.route.navigate(['/dashboard/listadom1'])
  }else{
    console.log('error en update')
  }
 
 })
  }

}
