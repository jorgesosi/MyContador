
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';
import { Observable } from 'rxjs/Observable';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Usuario } from '../clases/usuario';
@Injectable()
export class AutenticarUsuario {
  public usuarioEstaConectado: boolean = false;
  usuario: Usuario[];
  idUsuario: number;
  idHogar: number;
  tipoCuenta = [];
  tipoMovimiento = [];
  cuenta = [];
  private baseURI: string = "http://localhost/Contador/";
  constructor(public http: Http) {
    console.log('Hello AutenticarUsuario Provider');
    this.usuarioEstaConectado = false;
  }
  iniciarSesion(email, contrasenia): Promise<Usuario[]> {
    let body: string = "key=iniciar&email=" + email + "&contrasenia=" + contrasenia,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "iniciar.php";

    return this.http.post(url, body, options).toPromise()
      .then(res => {
        let body = res.json();
        //console.log("post",body)
        return body;
      })
  }

  obtenerTipoCuenta() {
    this.http.get('http://localhost/Contador//tipoCuenta.php')
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        this.cargarCuentaTipo(items);
        console.log("tipo cuanta", items);
        /*if(data!==''){
         console.log("data cuentas",data);
         this.items = data; 
       }else{
         this.items=[];
       }*/
      });
  }
  cargarCuentaTipo(Array: any[]) {
    return this.tipoCuenta = Array;
  }
  getTipoCuenta() {
    return this.tipoCuenta;
  }
  obtenerTipoMovimiento() {
    this.http.get('http://localhost/Contador//tipoMovimiento.php')
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        this.cargarMovimientoTipo(items);
        //console.log("tipo movimiento",items);
        /*if(data!==''){
         //console.log("data cuentas",data);
         this.items = data; 
       }else{
         this.items=[];
       }*/
      });
  }
  cargarMovimientoTipo(Array: any[]) {
    return this.tipoMovimiento = Array;
  }
  getTipoMovimiento() {
    return this.tipoMovimiento;
  }
  private extractData(res: Response) {
    let body = res.json();
    console.log(body)
    return body;
  }
  cargarUsuario(id: number) {
    this.idUsuario = id;
  }
  getUsuario() {
    return this.idUsuario;
  }
  cargarHogar(id: number) {
    this.idHogar = id;
  }
  getHogar() {
    return this.idHogar;
  }
  cargarClaseUsuario(Array: any[]) {
    this.usuario = Array;
    //console.log("claseUsuario: ", this.usuario)
  }
  getClaseUsuario() {
    return this.usuario;
  }
  cambiarEstado(estado: boolean) {
    this.usuarioEstaConectado = estado;
  }
  estaConectado() {
    return this.usuarioEstaConectado;
  }
  obtenerCuenta(id: number) {
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "cuentas.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        this.cargarCuenta(items);
      });
  }
  cargarCuenta(Array: any[]) {
    this.cuenta = Array;
    //console.log("clasecuenta: ", this.cuenta)
  }
  getCuenta() {
    return this.cuenta;
  }
}
