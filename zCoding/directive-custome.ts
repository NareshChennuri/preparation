//[appBorderColor]
//[allowOnlyNumber]
//[passwordMask]
//[stickyElement]
//[formatInput]

import { Directive, ElementRef, Input } from '@angular/core';

@Directive({
  selector: '[appBorderColor]'
})
export class BorderColorDirective {
  @Input() appBorderColor: string;

  constructor(el: ElementRef) {}

  ngOnChanges() {
    this.el.nativeElement.style.border = `1px solid ${this.appBorderColor}`;
  }
}



import { Component } from '@angular/core';

@Component({
  selector: 'app-my-component',
  template: `<div appBorderColor="green">Hello, World!</div>`
})
export class MyComponent {}

// ==========================================================================
// allow only numbers
import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[allowOnlyNumber]'
})
export class AllowOnlyNumberDirective {

  constructor() { }

  @HostListener('keydown', ['$event']) onKeyDown(event: KeyboardEvent) {
    // Allow: Backspace, Tab, Enter, Escape, Delete, and arrow keys
    if ([46, 8, 9, 27, 13, 110, 190, 37, 39].indexOf(event.keyCode) !== -1 ||
      // Allow: Ctrl+A
      (event.keyCode === 65 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+C
      (event.keyCode === 67 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+V
      (event.keyCode === 86 && (event.ctrlKey || event.metaKey)) ||
      // Allow: Ctrl+X
      (event.keyCode === 88 && (event.ctrlKey || event.metaKey)) ||
      // Allow: home, end, left, right
      (event.keyCode >= 35 && event.keyCode <= 39)) {
      // let it happen, don't do anything
      return;
    }
    // Ensure that it is a number and stop the keypress if not
    if ((event.shiftKey || (event.keyCode < 48 || event.keyCode > 57)) && (event.keyCode < 96 || event.keyCode > 105)) {
      event.preventDefault();
    }
  }

}


///[passwordMask]

import { Directive, HostListener } from '@angular/core';

@Directive({
  selector: '[passwordMask]'
})
export class PasswordMaskDirective {

  private visible = false;

  constructor() { }

  @HostListener('input', ['$event.target'])
  onInput(target: HTMLInputElement): void {
    const inputType = this.visible ? 'text' : 'password';
    target.setAttribute('type', inputType);
  }

  @HostListener('document:keydown.control.m', ['$event'])
  toggleMask(event: KeyboardEvent): void {
    event.preventDefault();
    this.visible = !this.visible;
  }
}