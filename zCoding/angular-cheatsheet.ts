import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
platformBrowserDynamic().bootstrapModule(AppModule);
import { NgModule } from '@angular/core';
@NgModule({ 
    declarations: …, 
    imports: …, 
    exports: …, 
    providers: …, 
    bootstrap: … 
  }) 
  class MyModule {}

  <input [value]="firstName">
  <input [(ngModel)]="userName">

  <div [attr.role]="myAriaRole">
  <div [class.extra-sparkle]="isDelightful">
  <div [style.width.px]="mySize">
  <button (click)="readRainbow($event)">
  <div title="Hello {{ponyName}}">
  <div [title]="'Hello ' + ponyName">
  <p>Hello {{ponyName}}</p>
  <my-cmp [(title)]="name">
  <my-cmp [title]="name" (titleChange)="name=$event">

  <video #movieplayer …></video> 
<button (click)="movieplayer.play()"> 
  Play 
</button>

<p>Card No.: {{cardNumber | myCardNumberFormatter}} </p>

<section *ngIf="showSection">
<li *ngFor="let item of list">

<div [ngSwitch]="conditionExpression">
  <ng-template [ngSwitchCase]="case1Exp"> 
    … 
  </ng-template>
  <ng-template ngSwitchCase="case2LiteralString"> 
    … 
  </ng-template>
  <ng-template ngSwitchDefault> 
    … 
  </ng-template> 
</div>

<div [ngClass]="{'active': isActive, disabled': isDisabled}">

<div [ngStyle]="{'property': 'value'}"> 
<div [ngStyle]="dynamicStyles()">

@Component({
    selector: 'app-root',
    imports: [CommonModule, FormsModule],
    standalone: true,
    styles: [
      '.check1d { text-decoration: line-through}',
      'ul {list-style: none}',
    ],
    template: 'Hello {{name}}',
    templateUrl: 'my-component.html',
    styles: ['.primary {color: red}'] ,
    styleUrls: ['my-component.css']
  });

import { Input, … } from '@angular/core';
@Input() myProperty;
@Output() myEvent = new EventEmitter();


<app-child [message]="parentMessage" (messageEvent)="receiveMessage($event)"></app-child>


@HostBinding('class.valid') isValid;
@HostListener('click', ['$event']) onClick(e) {…}

@ContentChild(myPredicate) myChildComponent;
@ContentChildren(myPredicate) myChildComponents;

@ViewChild(myPredicate) myChildComponent;
@ViewChildren(myPredicate) myChildComponents;

ngOnChanges(changeRecord) { … }

//dependency injection
{ provide: MyService, useClass: MyMockService }
{ provide: MyService, useFactory: myFactory }
{ provide: MyValue, useValue: 41 }


import { Routes, RouterModule, … } from '@angular/router';

const routes: Routes = [ 
    { path: '', component: HomeComponent }, 
    { path: 'path/:routeParam', component: MyComponent }, 
    { path: 'staticPath', component: … }, 
    { path: '**', component: … }, 
    { path: 'oldPath', redirectTo: '/staticPath' }, 
    { path: …, component: …, data: { message: 'Custom' } } 
  ]); 
   
  const routing = RouterModule.forRoot(routes);

  <router-outlet></router-outlet> 
  <router-outlet name="aux"></router-outlet>

  <a routerLink="/path"> 
<a [routerLink]="[ '/path', routeParam ]"> 
<a [routerLink]="[ '/path', { matrixParam: 'value' } ]"> 
<a [routerLink]="[ '/path' ]" [queryParams]="{ page: 1 }"> 
<a [routerLink]="[ '/path' ]" fragment="anchor">

<a [routerLink]="[ '/path' ]" routerLinkActive="active" ariaCurrentWhenActive="page">

function canActivateGuard: CanActivateFn = 
  ( 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ) => { … } 
 
{ path: …, canActivate: [canActivateGuard] }

function canDeactivateGuard: CanDeactivateFn<T> = 
  ( 
    component: T, 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ) => { … } 
 
{ path: …, canDeactivate: [canDeactivateGuard] }


function canActivateChildGuard: CanActivateChildFn = 
  ( 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ) => { … } 
 
{ path: …, canActivateChild: [canActivateGuard], children: … }


function resolveGuard implements ResolveFn<T> = 
  ( 
    route: ActivatedRouteSnapshot, 
    state: RouterStateSnapshot 
  ) => { … }  
 
{ path: …, resolve: [resolveGuard] }


function canLoadGuard: CanLoadFn = 
  ( 
    route: Route 
  ) => { … } 
 
{ path: …, canLoad: [canLoadGuard], loadChildren: … }