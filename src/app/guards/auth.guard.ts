import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UsuarioService } from '../services/usuario.service';
import { tap } from 'rxjs';

export const authGuard: CanActivateFn = (route, state) => {

  const usuarioService =  inject(UsuarioService);
  const router = inject(Router);
  let validado = false;

  return usuarioService.validarToken().pipe(
    tap( response => {
      if ( !response ){
        router.navigateByUrl('/login');
      }
    })
  );
};
