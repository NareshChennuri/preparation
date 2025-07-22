import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html'
})
export class AutocompleteComponent implements OnInit {
  searchControl = new FormControl('');
  suggestions$: Observable<string[]> = of([]);

  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.suggestions$ = this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => this.fetchSuggestions(query))
    );
  }

  fetchSuggestions(query: string): Observable<string[]> {
    if (!query || query.length < 2) {
      return of([]);
    }

    // Replace with your real API URL
    return this.http.get<string[]>(`https://api.example.com/suggestions?q=${query}`);
  }
/*
  fetchSuggestions(query: string): Observable<string[]> {
  const all = ['apple', 'banana', 'grape', 'orange', 'mango'];
  return of(all.filter(fruit => fruit.toLowerCase().includes(query.toLowerCase()))).pipe(delay(500));
}*/

}


<input type="text" [formControl]="searchControl" placeholder="Search..." />

<ul *ngIf="(suggestions$ | async)?.length">
  <li *ngFor="let suggestion of suggestions$ | async">
    {{ suggestion }}
  </li>
</ul>
