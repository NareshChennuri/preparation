table {
  table-layout: fixed;
  width: 100%;

  th.mat-header-cell,
  td.mat-cell {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  th.mat-header-cell:nth-child(1),
  td.mat-cell:nth-child(1) {
    width: 10%;
  }

  th.mat-header-cell:nth-child(2),
  td.mat-cell:nth-child(2) {
    width: 20%;
  }

  th.mat-header-cell:nth-child(3),
  td.mat-cell:nth-child(3) {
    width: 15%;
  }

  th.mat-header-cell:nth-child(4),
  td.mat-cell:nth-child(4) {
    width: 15%;
  }

  th.mat-header-cell:nth-child(5),
  td.mat-cell:nth-child(5) {
    width: 25%;
  }

  th.mat-header-cell:nth-child(6),
  td.mat-cell:nth-child(6) {
    width: 15%;
  }
}
