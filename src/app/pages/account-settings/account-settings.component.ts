import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../../services/settings.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styles: ``
})
export class AccountSettingsComponent implements OnInit{
  public linkTheme  = document.querySelector('#theme');
  public links: any[] | NodeListOf<Element> = [];

  constructor( private settingService: SettingsService){ }

  ngOnInit(): void {
    this.links = document.querySelectorAll('.selector');
    this.checkCurrentTheme();
  }

  public changeTheme(theme: string): void{
    this.settingService.changeTheme(theme);
    this.checkCurrentTheme();
  }

  public checkCurrentTheme(): void{
    this.links.forEach(element =>{
      element.classList.remove('working');
      const btnTheme = element.getAttribute('data-theme');
      
      if( btnTheme === localStorage.getItem('currentTheme') ){
        element.classList.add('working');
      }

    });
  }

}
