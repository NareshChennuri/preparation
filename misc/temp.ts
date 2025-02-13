.duration-field {
  position: relative;

  .duration-input {
    display: flex;
    align-items: center;
    cursor: pointer;
    border-bottom: 1px solid rgba(0, 0, 0, 0.42);
    padding: 8px;
    width: 100%;

    mat-icon {
      margin-left: auto;
    }
  }

  .duration-dropdown {
    position: absolute;
    background: white;
    border: 1px solid #ccc;
    width: 100%;
    max-height: 200px;
    overflow-y: auto;
    z-index: 1000;

    mat-option {
      padding: 10px;
      cursor: pointer;
      &:hover {
        background: #f1f1f1;
      }
    }
  }
}