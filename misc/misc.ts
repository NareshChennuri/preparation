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
  uploadResults = {
    success: [] as string[],
    failure: [] as string[]
  };

  openPopup() {
    this.showUploadPopup = true;
    this.inputData = '';
    this.excelFile = null;
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
      this.validateAndUpload(entries);
    } else if (this.uploadMethod === 'excel' && this.excelFile) {
      this.readExcel(this.excelFile).then(data => {
        entries = data;
        this.validateAndUpload(entries);
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

  validateAndUpload(entries: string[]) {
    if (entries.length > this.availableSeats) {
      alert(`We cannot process your request. Your list exceeds registration cap.\nCurrent available seats: ${this.availableSeats}`);
      return;
    }

    const success = entries.slice(0, this.availableSeats);
    const failure = entries.slice(this.availableSeats);

    this.uploadResults.success = success;
    this.uploadResults.failure = failure;
    this.showUploadPopup = false;
  }

  goToManagementPage() {
    window.location.href = '/management';
  }
}


<!-- Trigger Button -->
<button [disabled]="availableSeats <= 0" (click)="openPopup()">Bulk Upload</button>

<!-- Bulk Upload Modal -->
<div *ngIf="showUploadPopup" class="modal">
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
      <button (click)="processUpload()">Upload</button>
    </div>
  </div>
</div>

<!-- Upload Results -->
<div *ngIf="uploadResults.success.length || uploadResults.failure.length" class="results">
  <h4>Bulk Upload Results</h4>

  <div class="results-success">
    <h5 style="color: green;">Email IDs or Standard IDs successfully uploaded:</h5>
    <ul>
      <li *ngFor="let item of uploadResults.success">{{ item }}</li>
    </ul>
  </div>

  <div class="results-failure" *ngIf="uploadResults.failure.length">
    <h5 style="color: red;">Email IDs or Standard IDs NOT uploaded:</h5>
    <ul>
      <li *ngFor="let item of uploadResults.failure">{{ item }}</li>
    </ul>
  </div>

  <button (click)="goToManagementPage()">Land user on E Management page</button>
  <button (click)="uploadResults = { success: [], failure: [] }">Close</button>
</div>
