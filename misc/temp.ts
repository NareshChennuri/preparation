import * as XLSX from 'xlsx';
import { saveAs } from 'file-saver';

exportToExcel(): void {
  // Define data (first row as headers)
  const data = [
    ['ID', 'Name', 'Age'], // Headers
    [1, 'John Doe', 30],
    [2, 'Jane Smith', 28],
  ];

  // Create a worksheet
  const ws: XLSX.WorkSheet = XLSX.utils.aoa_to_sheet(data);

  // Define bold style
  const boldStyle = { font: { bold: true } };

  // Get first row dynamically
  const range = XLSX.utils.decode_range(ws['!ref'] || ''); // Get range of sheet
  const firstRow = range.s.r; // First row index (always 0)

  // Apply bold style to the first row
  for (let col = range.s.c; col <= range.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: firstRow, c: col });
    if (!ws[cellAddress]) ws[cellAddress] = {}; // Ensure the cell exists
    ws[cellAddress].s = boldStyle; // Apply style
  }

  // Set column width
  ws['!cols'] = [{ wch: 10 }, { wch: 20 }, { wch: 10 }];

  // Create workbook
  const wb: XLSX.WorkBook = { Sheets: { 'Sheet1': ws }, SheetNames: ['Sheet1'] };

  // Write file
  const excelBuffer: any = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });

  // Save file
  this.saveAsExcelFile(excelBuffer, 'SampleReport');
}

saveAsExcelFile(buffer: any, fileName: string): void {
  const data: Blob = new Blob([buffer], { type: 'application/octet-stream' });
  saveAs(data, `${fileName}.xlsx`);
}
