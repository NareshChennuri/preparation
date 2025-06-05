import { debounceTime, switchMap } from 'rxjs/operators';
import { FormControl } from '@angular/forms';


searchControl = new FormControl('');
filteredMembers: Member[] = [];

ngOnInit(): void {
  this.searchControl.valueChanges.pipe(
    debounceTime(300),
    switchMap(value => this.http.get<Member[]>(`/api/members/search?q=${value}`))
  ).subscribe(users => this.filteredMembers = users);
}


<mat-form-field>
  <input matInput placeholder="Search members" [formControl]="searchControl" [matAutocomplete]="auto">
</mat-form-field>

<mat-autocomplete #auto="matAutocomplete">
  <mat-option *ngFor="let user of filteredMembers" (onSelectionChange)="addMember(user)">
    {{ user.fullName }} ({{ user.standardId }})
  </mat-option>
</mat-autocomplete>
