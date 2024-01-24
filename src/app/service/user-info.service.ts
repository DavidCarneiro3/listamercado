import { Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})

export class UserInfoService {
  iduser: string;
  name: string;
  email: string;
  //client: string;
  constructor(private storage: Storage, public event: Events) {
    this.storage.get('iduser').then((iduser) => {
      if(iduser != null && iduser != ''){
        this.iduser = iduser
        this.event.publish("user:loaded");
      }
    });

    this.storage.get('name').then(name => {
      if(name != null && name != ""){
        this.name = name;
        
      }
    });
    this.storage.get('email').then(email => {
      if(email != null && email != ""){
        this.email = email;
       
      }
    });
   
  }
}
