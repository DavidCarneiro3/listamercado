import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../environments/environment.prod';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  constructor(private http: HttpClient) { }

  //PEGAR LISTAS
  getLists(usuario: any){
    //let body: any = {'action':8};
    
    let acao: any = 8;
    let usu: any = usuario;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('usuario',usu);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  getListaMercUsu(idlista: any,usuario: any){
    let acao: any = 29;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('id',idlista);
    postData.append('usuario',usuario);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  getListsProds(idlista: any,merc: any){
    let acao: any = 30;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('id',idlista);
    postData.append('mercantil',merc);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  getListsProdsCart(idlista: any,merc: any){
    let acao: any = 31;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('id',idlista);
    postData.append('mercantil',merc);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  getListsProdsID(id: any){
    let acao: any = 32;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('id',id);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  upProdCart(id: any,carro: any,usuario: any){
    let acao: any = 33;
    let postData = new FormData();
    postData.append('action',acao);
    postData.append('id',id);
    postData.append('usuario',usuario);
    postData.append('carro',carro);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }

  getUser(email: any,senha: any){
    let acao: any = 2;
    let postData = new FormData();
    postData.append('action',acao);
    // postData.append('id',id);
    postData.append('email',email);
    postData.append('senha',senha);
    let data:Observable<any> = this.http.post(environment.api,postData)
    return data;
  }
}
