import 'zone.js';
import {Component, OnInit, EventEmitter, Input, Output, Pipe, PipeTransform} from '@angular/core';
import {bootstrapApplication} from '@angular/platform-browser';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClient, HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'pagination-controls',
  standalone: true,
  template: `
    <button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>
    <button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
  `,
})
export class PaginationControlsComponent {
  @Input() currentPage = 1;
  @Input() totalPages = 1;
  @Output() pageChange = new EventEmitter<number>();

  previousPage() {
    if (this.currentPage > 1) {
      this.pageChange.emit(this.currentPage - 1);
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.pageChange.emit(this.currentPage + 1);
    }
  }
}

@Pipe({
  name: 'paginate',
  pure: false,
  standalone: true,
})
export class PaginatePipe implements PipeTransform {

  transform(array: any[], itemsPerPage: number, currentPage: number): any[] {
    if (!array || !itemsPerPage || !currentPage) {
      return [];
    }

    // calculate start and end indices of the current page
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = Math.min(startIndex + itemsPerPage, array.length);

    // slice the array to get the current page
    return array.slice(startIndex, endIndex);
  }

}

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, HttpClientModule, PaginatePipe, PaginationControlsComponent],
  standalone: true,
  template: `
    <table *ngIf="data">
      <tr>
      <th>Id</th><th>Name</th><th>Email</th>
</tr>
<tr *ngFor="let i of data | paginate : itemsPerPage : currentPage">
  <td>{{i.id}}</td>
  <td>{{i.name}}</td>
  <td>{{i.email}}</td>
</tr>
</table>
<button (click)="previousPage()" [disabled]="currentPage === 1">Previous</button>
<button (click)="nextPage()" [disabled]="currentPage === totalPages">Next</button>
  `,
})
export class App implements OnInit{
  data: any[] =  [];
  currentPage = 1;
  totalPages = 1;
  itemsPerPage = 2;
  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('https://jsonplaceholder.typicode.com/users').subscribe((d: any)=>{
      this.data = d;
      this.totalPages = Math.ceil(this.data.length / 2);
    });
  }

  previousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
    }
  }

  nextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
    }
  }
}

bootstrapApplication(App);
