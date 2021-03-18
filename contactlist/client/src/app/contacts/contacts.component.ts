import { Component, OnInit } from '@angular/core';
import { ContactsService } from '../contacts.service';
import { Contact } from '../contact';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.sass'],
  providers: [ContactsService]
})
export class ContactsComponent implements OnInit {
  contacts: any;
  contact: Contact;
  first_name: string;
  last_name: string;
  phone: string;


  constructor(private contactsService: ContactsService) { }

  addContact(){
    const newContact = {
      first_name: this.first_name,
      last_name: this.last_name,
      phone: this.phone
    }
    this.contactsService.addContact(newContact)
      .subscribe(contact => {
        this.contacts.push(contact);
        this.contactsService.getContacts()
        .subscribe( contacts => 
        this.contacts = contacts);
      });
  }

  deleteContact(id:any){
    var contacts = this.contacts;
    this.contactsService.deleteContact(id)
      .subscribe(data => {
        if(data){
          for(var i = 0; i < contacts.length; i++){
            if(contacts[i]._id == id){
              contacts.splice(i,1);
            }
          }
        }
      })
  }

  ngOnInit(): void {
    this.contactsService.getContacts()
      .subscribe( contacts => 
        this.contacts = contacts);
  }

}
