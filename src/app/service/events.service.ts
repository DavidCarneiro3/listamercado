import { Injectable } from '@angular/core';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventsService {

  constructor() { }

  private subject = new Subject<any>();

    publishSomeData(data: any) {
        this.subject.next(data);
    }

    getObservable(): Subject<any> {
        return this.subject;
    }
}
