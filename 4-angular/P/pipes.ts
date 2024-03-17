/* 

Pipes help you transform data on a Angular UI expression from one format to some other
format. 

### example pipes

AsyncPipe :-Used to read the object from an asynchronous source
CurrencyPipe:-Used to format the currencies
DatePipe:-Used to format the dates
DecimalPipe:- Used to transform the decimal numbers
I18nPluralPipe:- Converts value to string that pluralizes value according to locale.
I18nSelectPipe:- Used to display values according to the selection criteria
JsonPipe:- Converts an object into a JSON string
KeyValuePipe:- Converts an Object or Map into an array of key value pairs.
LowerCasePipe:- Converts a string or text to lowercase
PercentPipe:-Used to display percentage numbers
SlicePipe:-Used to slice an array
TitleCasePipe:-Converts a string or text to title case
UpperCasePipe:-Converts a string or text to uppercase

Pure Pipes
 - Pure pipes are only executed when the input value changes
 - By default, all pipes are pure.
 - For optimization should use pure pipes
 - A single instance of the pure pipe is used throughout all components.

Impure Pipes
 - impure pipes are executed on every change detection cycle
 - ex: async pipe (It will always check for new input data)

pure : true/false 

Pure pipes uses pure functions that doesn't have any internal state, and the output remains the same as long as the parameters passed or not changed. 
Angular calls the pipe only when it detects a change in the parameters being passed. 
A single instance of the pure pipe is used throughout all components. 

### Impure Pipes?

For every change detection cycle in Angular, an impure pipe is called regardless of the change in the input fields. 
Multiple pipe instances are created for these pipes. 

By default, all pipes are pure. However, you can specify impure pipes using the pure property.

@Pipe({
  name: 'demopipe',
  pure : true/false 
})

-----------------------

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
 name: 'square'
})
export class SquarePipe implements PipeTransform {
    transform(value: number): number {
        return value * value;
    }
}

*/