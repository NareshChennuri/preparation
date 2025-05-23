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

  private allowedEmailDomains = ['abc.com', 'bbc.com', 'xyz.com'];

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
    const allowedExtensions = ['xls', 'xlsx', 'csv'];
    const fileExtension = file?.name.split('.').pop()?.toLowerCase();
    if (file && fileExtension && allowedExtensions.includes(fileExtension)) {
      this.excelFile = file;
    } else {
      alert('Invalid file type. Please upload only .xls, .xlsx, or .csv files.');
      this.excelFile = null;
      event.target.value = '';
    }
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

    const seen = new Set<string>();

    for (const entry of entries) {
      const normalized = entry.trim();
      if (seen.has(normalized)) continue;
      seen.add(normalized);

      if (this.uploadType === 'email') {
        const domain = normalized.split('@')[1];
        if (emailRegex.test(normalized) && this.allowedEmailDomains.includes(domain)) {
          this.validEntries.push(normalized);
        } else {
          this.invalidEntries.push(normalized);
        }
      } else if (this.uploadType === 'standardId' && standardIdRegex.test(normalized)) {
        this.validEntries.push(normalized);
      } else {
        this.invalidEntries.push(normalized);
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
