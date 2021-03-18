import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Contact } from './contact';
import { catchError, map } from 'rxjs/operators';
import { throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {
  
  constructor(private http: HttpClient) { }

  getContacts() {
    return this.http.get('http://localhost:3000/api/contacts')
    .pipe(map(res => res));
  }

  addContact(newContact){
    var headers = new HttpHeaders();
    headers.append('Content-Type','application/json');
    return this.http.post('http://localhost:3000/api/contact', newContact,{headers:headers})
    .pipe(map(res => res));
  }

  deleteContact(id){
    return this.http.delete('http://localhost:3000/api/contact/'+id)
    .pipe(map(res => res));
  }
}
