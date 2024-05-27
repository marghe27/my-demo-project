import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';


export const authGuard: CanActivateFn = (route, state) => {

  
  
  const router = inject(Router);
  const token = localStorage.getItem('token');
  console.log('I am in auth guard');
  console.log('token', token);
  if(token) {
    return true;
  }else{
    router.navigate(['login']);
    return false;
  }

};
