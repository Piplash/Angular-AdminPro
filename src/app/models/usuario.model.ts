import { environment } from "../environments/environment"

const base_url = environment.url;

export class Usuario {

    constructor( 
        public nombre   : string, 
        public email    : string,
        public password?: string, 
        public img?     : string,
        public google?  : boolean, 
        public role?    : string, 
        public uid?     : string, 
    ) { }

    get usuarioConectado(){
        let usuario = {
            nombre: this.nombre,
            email: this.email,
            img: this.img,
            google: this.google,
            role: this.role,
            uid: this.uid 
        }

        return usuario;
    }

    get imagenUsuario() {
        if( this.img ){
            let ruta
            if ( this.img.includes('https')){
                ruta = this.img
            }else{
                ruta = `${base_url}/uploads/usuarios/${this.img}`
            }
            return ruta;
        } else {
            return '../../assets/images/users/d2.jpg';
        }
    }

}