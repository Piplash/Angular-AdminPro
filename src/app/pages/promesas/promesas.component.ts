import { Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-promesas',
  templateUrl: './promesas.component.html',
  styles: ``
})
export class PromesasComponent implements OnInit{
  
  ngOnInit(): void {

    this.getUsuarios().then( usuarios =>{
      console.log(usuarios);
    });

    //Promesa básica. Cuando necesito si o si que algo se ejecute a destiempo o cuando otra cosa termine.
    const promesa = new Promise( ( resolve, reject ) =>{
      if( true ){
        resolve('Hola Mundo');
      } else {
        reject('Algo salió mal');
      }
    });

    promesa.then( ( mensaje ) =>{
      console.log("Respuesta promesa: ", mensaje)
      console.log("Promesa terminada");
    }).catch( error => console.log('Error en promesa ', error));

    console.log('Fin del Init');
  }

  public getUsuarios(){

    const promesa = new Promise( resolve =>{
      fetch('https://reqres.in/api/users')
      .then( resp => resp.json() )
      .then( body => resolve(body.data));
    });

    return promesa;
  }
}
