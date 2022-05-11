import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';
import { SaveDataService } from '../services/save-data.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulary',
  templateUrl: './formulary.component.html',
  styleUrls: ['./formulary.component.css']
})
export class FormularyComponent implements OnInit {

  constructor( private service : SaveDataService ) { }

  ngOnInit(): void {
  }

  dataPersonal = new FormGroup ({
    id: new FormControl(1000),
    document: new FormControl(''),
    names: new FormControl(''),
    lastName: new FormControl(''),
    phone: new FormControl(''),
    email: new FormControl(''),
    adress: new FormControl('')
  })

  personGet : any = {};
  statePetision : string = "";
  dataPersonJson : any = {
    "IdPersona" : 0,
    "Documento" : "",
    "Nombres" : "",
    "Apellidos": "",
    "Telefono": "",
    "Correo": "",
    "Direccion": "" 
  }

  getPerson( id : number ) {
    this.service.getPersonById(1).subscribe ( res => {
      this.statePetision = res.Message;
      this.personGet = res;
    } )
  }

  /**
   * this method send 
   * @param data is the object json to send data by post
   */

  saveDataPerson ( data : any) {
    this.service.savePersonData( data ).subscribe( res => {
      this.statePetision = res;
      console.log(this.statePetision);
    })
  }

  onSubmit() {

    let allData = this.dataPersonal.value;
    this.dataPersonJson = {
      "IdPersona" : allData.id,
      "Documento" : allData.document,
      "Nombres" : allData.names,
      "Apellidos": allData.lastName,
      "Telefono": allData.phone,
      "Correo": allData.email,
      "Direccion": allData.adress
    }
    Swal.fire({
      icon: 'question',
      title: '¿Estás seguro de guardar estos cambios?',
      showDenyButton: true,
      confirmButtonText: 'Guardar',
      confirmButtonColor: '#198553',
      denyButtonText: `No guardar`,
    }).then((result) => {
      if (result.isConfirmed) {
        this.saveDataPerson(this.dataPersonJson);
        setTimeout(() => {
          if (this.statePetision == "") {
            Swal.fire('Los datos no han sido guardados', '', 'error')
          }else {
            setTimeout(() => {
              Swal.fire('Guardado!', '', 'success');
            }, 1000);
          }
        }, 1000);
      } else if (result.isDenied) {
        Swal.fire('Los datos no han sido guardados', '', 'error')
      }
    })
  

  }

}
