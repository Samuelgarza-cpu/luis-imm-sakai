import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { TreeNode } from 'primeng/api';


@Injectable()
export class NodeService {
    

    //  Baseurl = "http://localhost:5050/api"
    Baseurl= "https://api-imm-production.up.railway.app/api"
    constructor(private http: HttpClient) { }

        getFiles() {
        return this.http.get<any>('assets/demo/data/files.json')
            .toPromise()
            .then(res => res.data as TreeNode[]);
    }

    getLazyFiles() {
        return this.http.get<any>('assets/demo/data/files-lazy.json')
            .toPromise()
            .then(res => res.data as TreeNode[]);
    }

    getFilesystem() {
        return this.http.get<any>('assets/demo/data/filesystem.json')
            .toPromise()
            .then(res => res.data as TreeNode[]);
    }

    getLazyFilesystem() {
        return this.http.get<any>('assets/demo/data/filesystem-lazy.json')
            .toPromise()
            .then(res => res.data as TreeNode[]);
    }

    getUser() {
        return this.http.get('https://registroimm.gomezpalacio.gob.mx/')
    }

    postUser(parametros:{}) {
        return this.http.post('http://localhost:3000/api/usuarios',parametros)
    }

    insertarUsuario(parametros:{}){
         return this.http.post('http://localhost:3000/api/usuarios/registro',parametros)
    }

    deleteUsuario(id:any){
        return this.http.delete( `http://localhost:3000/api/usuarios/registro/${id}`)
    }

    updateUser(parametros:{}){

    return this.http.put('http://localhost:3000/api/usuarios/registro',parametros);

    }
    getModulo1(){
    return this.http.get(`${this.Baseurl}/modulo1`)
   
    }
    getModulo1ID(id:any){
        return this.http.get(`${this.Baseurl}/modulo1/` + id)
       
        }
    postM1(parametros:{}) {
        return this.http.post(`${this.Baseurl}/guardarM1`,parametros)
    }

    deleteM1(id:any){
        return this.http.delete(`${this.Baseurl}/modulo1/`+id)
    }
    UpdateM1(id:any,body:{}){
        return this.http.patch(`${this.Baseurl}/modulo1/`+ id,body)
    }
}
