/*

import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  constructor(private http: HttpClient) {}

  fetchData() {
    this.firstApiCall()
      .pipe(
        switchMap(dataFromFirstApi => {
          // Process dataFromFirstApi if needed
          return this.secondApiCall();
        })
      )
      .subscribe(dataFromSecondApi => {
        // Handle data from second API call
      });
  }

  firstApiCall() {
    return this.http.get('first-api-url');
  }

  secondApiCall() {
    return this.http.get('second-api-url');
  }
}

*/