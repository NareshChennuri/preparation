:host {
  display: block;
  padding: 1rem;
  background: #fafafa;
}

.actions {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 1rem;

  button {
    margin-right: 0.5rem;
  }
}

.team-title {
  font-weight: 600;
  font-size: 1.2rem;
  margin: 1rem 0 0.5rem;
  cursor: pointer;
  color: #1976d2;

  &:hover {
    text-decoration: underline;
  }
}

table {
  width: 100%;
  margin-bottom: 2rem;
}

mat-paginator {
  margin: 1rem 0;
}

button[mat-button][color="warn"] {
  margin-bottom: 0.5rem;
}
