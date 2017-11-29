
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
  nombreHogar: string;
  tipoCuenta = [];
  tipoMovimiento = [];
  cuenta = [];
  saldo: number;
  ingreso: number;
  egreso: number;
  private baseURI: string = "http://localhost/Contador/";
  constructor(public http: Http) {
    //console.log('Hello AutenticarUsuario Provider');
    this.usuarioEstaConectado = false;
  }/** */
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
  /**obtiene los tipos de cuentas cargados en la base de datos */
  obtenerTipoCuenta() {
    this.http.get('http://localhost/Contador//tipoCuenta.php')
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        this.cargarCuentaTipo(items);
        //console.log("tipo cuenta", items);
        /*if(data!==''){
         //console.log("data cuentas",data);
         this.items = data; 
       }else{
         this.items=[];
       }*/
      });
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarCuentaTipo(Array: any[]) {
    return this.tipoCuenta = Array;
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getTipoCuenta() {
    return this.tipoCuenta;
  }
  /**obtiene los tipos de movimientos cargados en la base de datos */
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
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarMovimientoTipo(Array: any[]) {
    return this.tipoMovimiento = Array;
  }
  getTipoMovimiento() {
    return this.tipoMovimiento;
  }
  private extractData(res: Response) {
    let body = res.json();
    //console.log(body)
    return body;
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarUsuario(id: number) {
    this.idUsuario = id;
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getUsuario() {
    return this.idUsuario;
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarHogar(id: number) {
    this.idHogar = id;
  }
  getHogar() {
    return this.idHogar;
  }
  cargarNombreHogar(nombre: string) {
    //console.log("nombreHogar", nombre);
    this.nombreHogar = nombre;
  }
  getNombreHogar() {
    return this.nombreHogar;
  }

  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarClaseUsuario(Array: any[]) {
    this.usuario = Array;
    //console.log("claseUsuario: ", this.usuario)
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getClaseUsuario() {
    return this.usuario;
  }
  cambiarEstado(estado: boolean) {
    this.usuarioEstaConectado = estado;
  }
  estaConectado() {
    return this.usuarioEstaConectado;
  }
  /**obtiene las cuentas cargados en la base de datos  asociada a un Hogar*/
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
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarCuenta(Array: any[]) {
    this.cuenta = Array;
    //console.log("clasecuenta: ", this.cuenta)
  }
  getCuenta() {
    return this.cuenta;
  }
  /**obtiene los tipos de saldo cargados en la base de datos asociado a un hogar */
  obtenerSaldo(id: number) {
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "saldo.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        this.cargarSaldo(items[0].saldo);
      });
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global 
   */
  cargarSaldo(saldo: number) {
    this.saldo = saldo
    //console.log("saldo", saldo);
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getSaldo() {
    return this.saldo
  }
  /**obtiene los ingresos cargados en la base de datos asociado a un hogar */
  obtenerIngresos(id: number) {
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "ingreso.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        //console.log("ingreso", items);
        this.cargarIngresos(items[0].ingresos);
      });
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarIngresos(ingreso: number) {
    this.ingreso = ingreso;
    //console.log("ingreso", ingreso);
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getIngresos() {
    return this.ingreso;
  }
  /**obtiene los egresos cargados en la base de datos asociado a un hogar */
  obtenerEgresos(id: number) {
    let body: string = "key=ver&id=" + id,
      type: string = "application/x-www-form-urlencoded; charset=UTF-8",
      headers: any = new Headers({ 'Content-Type': type }),
      options: any = new RequestOptions({ headers: headers }),
      url: any = this.baseURI + "egreso.php";
    //console.log("load cuentas",id)
    this.http.post(url, body, options)
      .map(res => res.json())
      .subscribe(data => {
        let items = data;
        //console.log("egresos", items);
        this.cargarEgresos(items[0].egresos);
      });
  }
  /**carga en una variable los datos de la funcion
   * obtener datos, la variavle podra ser llamada en cualquier momento,
   * lo que la convierte en una varible de uso global
   */
  cargarEgresos(egreso: number) {
    this.egreso = egreso;
    //console.log("egreso", egreso);
  }
  /**permite llamar a la variable en cualquer momento, si no se realiza un obtener
   * o cargar dato retorna el ultimo dato guardado
   */
  getEgresos() {
    return this.egreso;
  }
}
