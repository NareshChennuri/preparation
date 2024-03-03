/*

#### Decorators 

are a design pattern or functions that define how Angular features works. They are used to make prior modifications to a class, service, or filter. Angular supports four types of decorators, they are:

Class Decorators
Property Decorators
Method Decorators
Parameter Decorators


@Component({
  selector: 'app-example',
  template: '<p>Example Component</p>'
})

@Injectable({
  providedIn: 'root'
})

@Directive({
  selector: '[appExampleDirective]'
})

@Input() inputValue: string = '';
@Output() outputEvent = new EventEmitter<string>();
@ViewChild('childElement', { static: true }) childElement!: ElementRef;

@HostListener('click')
onClick() {
    console.log('Button clicked');
}


*/