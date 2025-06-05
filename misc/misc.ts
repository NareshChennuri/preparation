:host {
  display: block;
  padding: 1rem;
  background: #fff;
  max-height: 90vh;
  overflow-y: auto;
}

mat-form-field {
  width: 100%;
  margin-bottom: 1rem;
}

mat-slide-toggle {
  margin-bottom: 1rem;
  display: block;
}

.filtered-list {
  max-height: 150px;
  overflow-y: auto;
  margin-bottom: 1rem;

  div {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 4px 0;
    border-bottom: 1px dashed #ccc;

    button {
      font-size: 0.75rem;
    }
  }
}

mat-chip-list {
  margin: 1rem 0;
  display: flex;
  flex-wrap: wrap;

  mat-chip {
    margin: 4px;
    background: #e0f7fa;
  }
}

button[type='submit'],
button[mat-raised-button] {
  margin-top: 1rem;
  float: right;
}
