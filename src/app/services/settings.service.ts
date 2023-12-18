import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  private linkTheme = document.querySelector('#theme');

  constructor() { 
    this.initTheme();
  }

  public initTheme(): void{
    let url: string;

    if(localStorage.getItem('theme')){
      url = localStorage.getItem('theme')!;

      this.linkTheme?.setAttribute('href', url);
    }

    if(!localStorage.getItem('currentTheme')){
      localStorage.setItem('currentTheme', 'default');
    }
  }

  public changeTheme(theme: string): void{
    const url = `./assets/css/colors/${theme}.css`
    
    this.linkTheme?.setAttribute('href', url);
    localStorage.setItem('theme', url);
    localStorage.setItem('currentTheme', theme);
  }
}
