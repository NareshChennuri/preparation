// bulk-upload.component.ts
import { Component, Input } from '@angular/core';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-bulk-upload',
  templateUrl: './bulk-upload.component.html',
  styleUrls: ['./bulk-upload.component.css']
})
export class BulkUploadComponent {
  @Input() availableSeats: number = 0;

  uploadType: 'email' | 'standardId' = 'email';
  uploadMethod: 'manual' | 'excel' = 'manual';
  inputData: string = '';
  excelFile: File | null = null;

  showUploadPopup = false;
  showValidationResults = false;

  validEntries: string[] = [];
  invalidEntries: string[] = [];

  uploadResults = {
    success: [] as string[],
    failure: [] as string[]
  };

  openPopup() {
    this.showUploadPopup = true;
    this.inputData = '';
    this.excelFile = null;
    this.showValidationResults = false;
    this.validEntries = [];
    this.invalidEntries = [];
    this.uploadResults = { success: [], failure: [] };
  }

  handleFileInput(event: any) {
    const file = event.target.files[0];
    if (file) this.excelFile = file;
  }

  processUpload() {
    let entries: string[] = [];

    if (this.uploadMethod === 'manual') {
      entries = this.inputData.split(/[\n,;]+/).map(x => x.trim()).filter(Boolean);
      this.validateEntries(entries);
    } else if (this.uploadMethod === 'excel' && this.excelFile) {
      this.readExcel(this.excelFile).then(data => {
        this.validateEntries(data);
      });
    }
  }

  readExcel(file: File): Promise<string[]> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const workbook = XLSX.read(e.target.result, { type: 'binary' });
        const sheet = workbook.Sheets[workbook.SheetNames[0]];
        const data = XLSX.utils.sheet_to_json(sheet, { header: 1 });
        const columnIndex = (data[0] as string[]).findIndex((col: string) =>
          col.toLowerCase().includes(this.uploadType === 'email' ? 'email' : 'standard')
        );
        const result = data.slice(1).map((row: any[]) => row[columnIndex]).filter(Boolean);
        resolve(result);
      };
      reader.readAsBinaryString(file);
    });
  }

  validateEntries(entries: string[]) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const standardIdRegex = /^[A-Za-z0-9]{7}$/;

    this.validEntries = [];
    this.invalidEntries = [];

    for (const entry of entries) {
      if (this.uploadType === 'email' && emailRegex.test(entry)) {
        this.validEntries.push(entry);
      } else if (this.uploadType === 'standardId' && standardIdRegex.test(entry)) {
        this.validEntries.push(entry);
      } else {
        this.invalidEntries.push(entry);
      }
    }

    this.showValidationResults = true;
  }

  proceedToUpload() {
    if (this.validEntries.length > this.availableSeats) {
      alert(`We cannot process your request. Your list exceeds registration cap.\nCurrent available seats: ${this.availableSeats}`);
      return;
    }

    const success = this.validEntries.slice(0, this.availableSeats);
    const failure = this.validEntries.slice(this.availableSeats);

    this.uploadResults.success = success;
    this.uploadResults.failure = failure;
    this.showUploadPopup = false;
    this.showValidationResults = false;
  }

  goToManagementPage() {
    window.location.href = '/management';
  }

  goBackToEdit() {
    this.showValidationResults = false;
  }
}



<!-- Trigger Button -->
<button [disabled]="availableSeats <= 0" (click)="openPopup()">Bulk Upload</button>

<!-- Bulk Upload Modal -->
<div *ngIf="showUploadPopup && !showValidationResults" class="modal">
  <div class="modal-content">
    <h3>Bulk Upload</h3>
    <p>Remaining seats: {{ availableSeats }}</p>

    <!-- Upload Type -->
    <div>
      <label>
        <input type="radio" [(ngModel)]="uploadType" value="email" /> Email IDs
      </label>
      <label>
        <input type="radio" [(ngModel)]="uploadType" value="standardId" /> Standard IDs
      </label>
    </div>

    <!-- Upload Method -->
    <div>
      <label>Upload Method:</label>
      <select [(ngModel)]="uploadMethod">
        <option value="manual">Manually enter a list</option>
        <option value="excel">Upload Excel</option>
      </select>
    </div>

    <!-- Manual Entry -->
    <div *ngIf="uploadMethod === 'manual'">
      <label>Enter list (separated by commas, semicolons or new lines):</label>
      <textarea [(ngModel)]="inputData" rows="6" cols="50"></textarea>
    </div>

    <!-- Excel Upload -->
    <div *ngIf="uploadMethod === 'excel'">
      <label>Upload Excel file (must include 'Email ID' or 'Standard ID' as column header):</label>
      <input type="file" (change)="handleFileInput($event)" />
    </div>

    <!-- Action Buttons -->
    <div class="button-group">
      <button (click)="showUploadPopup = false">Back</button>
      <button (click)="processUpload()">Next</button>
    </div>
  </div>
</div>

<!-- Validation Results -->
<div *ngIf="showValidationResults && showUploadPopup" class="modal">
  <div class="modal-content">
    <h4>Validation Summary</h4>

    <div class="results-success">
      <h5 style="color: green;">Valid Entries ({{ validEntries.length }})</h5>
      <ul>
        <li *ngFor="let item of validEntries">{{ item }}</li>
      </ul>
    </div>

    <div class="results-failure" *ngIf="invalidEntries.length > 0">
      <h5 style="color: red;">Invalid Entries ({{ invalidEntries.length }})</h5>
      <ul>
        <li *ngFor="let item of invalidEntries">{{ item }}</li>
      </ul>
    </div>

    <div class="button-group">
      <button (click)="goBackToEdit()">Back to Edit</button>
      <button [disabled]="validEntries.length === 0" (click)="proceedToUpload()">Proceed to Upload</button>
    </div>
  </div>
</div>

<!-- Upload Results -->
<div *ngIf="uploadResults.success.length || uploadResults.failure.length" class="results">
  <h4>Bulk Upload Results</h4>

  <div class="results-success">
    <h5 style="color: green;">Successfully Uploaded</h5>
    <ul>
      <li *ngFor="let item of uploadResults.success">{{ item }}</li>
    </ul>
  </div>

  <div class="results-failure" *ngIf="uploadResults.failure.length">
    <h5 style="color: red;">Not Uploaded (Exceeded Seats)</h5>
    <ul>
      <li *ngFor="let item of uploadResults.failure">{{ item }}</li>
    </ul>
  </div>

  <button (click)="goToManagementPage()">Land user on E Management page</button>
  <button (click)="uploadResults = { success: [], failure: [] }">Close</button>
</div>
