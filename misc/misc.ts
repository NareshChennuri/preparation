/* bulk-upload.component.css */

/* Modal Styles */
.modal {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
}

.modal-content {
  background-color: #fff;
  padding: 24px;
  border-radius: 8px;
  width: 90%;
  max-width: 600px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

/* Form Elements */
label {
  display: block;
  margin: 12px 0 6px;
  font-weight: bold;
}

textarea {
  width: 100%;
  padding: 10px;
  font-size: 14px;
  resize: vertical;
}

select, input[type="file"] {
  width: 100%;
  padding: 8px;
  font-size: 14px;
  margin-bottom: 12px;
}

/* Button Group */
.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 8px 16px;
  font-size: 14px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

button:hover {
  opacity: 0.9;
}

button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

/* Result Styling */
.results {
  margin-top: 30px;
  padding: 16px;
  border: 1px solid #ddd;
  border-radius: 6px;
  background-color: #fafafa;
}

.results-success ul,
.results-failure ul {
  padding-left: 20px;
}

.results-success li,
.results-failure li {
  margin-bottom: 6px;
}
