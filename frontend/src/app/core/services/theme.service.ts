import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ThemeService {

  private _themeMode: string = 'light';
  private _themeColor: string = 'blue';

  get themeMode(): string {
    return this._themeMode
  }
  get themeColor(): string {
    return this._themeColor
  }

  private _themeColors = [
    {
      name: 'blue',
      color: '#3B82F6'
    },
    {
      name: 'green',
      color: '#10b981'
    },
    {
      name: 'purple',
      color: '#8B5CF6'
    },
    {
      name: 'cyan',
      color: '#06b6d4'
    },
    {
      name: 'indigo',
      color: '#6366F1'
    },
    {
      name: 'amber',
      color: '#f59e0b'
    },
    {
      name: 'teal',
      color: '#14b8a6'
    },
    {
      name: 'pink',
      color: '#ec4899'
    },
    {
      name: 'noir',
      color: '#020617'
    },
    {
      name: 'lime',
      color: '#84cc16'
    }
  ];

  get themeColors(): any {
    return this._themeColors;
  }

  get currentTheme(): string {
    return `aura-${this.themeMode}-${this.themeColor}.css`;
  }

  constructor() {
    this._themeMode = localStorage.getItem('theme.mode') ?? 'light';
    this._themeColor = localStorage.getItem('theme.color') ?? 'blue';
    this.applyTheme();
  }

  

  getGetThemeColorObject(name: string) {
    return this.themeColors.find((t: any) => t.name === name);
  }



  switchMode(mode: string) {
    this._themeMode = mode;
    localStorage.setItem('theme.mode', mode);
    this.applyTheme();
  }



  switchColor(color: string) {
    this._themeColor = color;
    localStorage.setItem('theme.color', color);
    this.applyTheme();
  }



  applyTheme() {
    const themeLink = document.getElementById('app-theme') as HTMLLinkElement;
    if(themeLink) {
      themeLink.href = this.currentTheme;
    }
  }

}
