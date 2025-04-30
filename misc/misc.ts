<div class="popup-container" *ngIf="showPopup">
  <div class="popup">
    <button class="close-btn" (click)="closePopup()">X</button>
    <h3>Confirm cancel<br>event <strong>{{ eventName }}</strong></h3>

    <div *ngIf="isRecurring">
      <label>
        <input type="radio" [(ngModel)]="cancelType" value="series" />
        Cancel entire series
      </label>
      <label>
        <input type="radio" [(ngModel)]="cancelType" value="next" />
        Cancel next occurrence
        <span *ngIf="cancelType === 'next' && nextOccurrence">
          <br>{{ nextOccurrence | date:'MM/dd/yyyy h:mm a' }} EST
        </span>
      </label>
    </div>

    <div>
      <label for="reason">Cancellation reason?*</label>
      <textarea
        id="reason"
        [(ngModel)]="reason"
        rows="3"
        placeholder="Enter minimum 20 characters"
      ></textarea>
      <div class="error" *ngIf="reasonTouched && reason.length < 20">
        20 characters required
      </div>
    </div>

    <div class="actions">
      <button (click)="submit()" [disabled]="reason.length < 20">Submit</button>
      <button (click)="closePopup()">Cancel</button>
    </div>
  </div>
</div>





import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-event-cancel',
  templateUrl: './event-cancel.component.html',
  styleUrls: ['./event-cancel.component.css']
})
export class EventCancelComponent {
  @Input() eventName: string = '[event_name]';
  @Input() isRecurring: boolean = false;
  @Input() nextOccurrence: Date | null = null;

  showPopup: boolean = true;
  cancelType: 'series' | 'next' = 'series';
  reason: string = '';
  reasonTouched: boolean = false;

  closePopup() {
    this.showPopup = false;
  }

  submit() {
    this.reasonTouched = true;
    if (this.reason.length < 20) return;

    const payload = {
      eventName: this.eventName,
      cancelType: this.isRecurring ? this.cancelType : 'single',
      reason: this.reason
    };

    console.log('Submitting cancellation:', payload);
    this.closePopup();
  }
}




.popup-container {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0,0,0,0.6);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  
  .popup {
    background: white;
    padding: 20px;
    border-radius: 10px;
    width: 400px;
    position: relative;
  }
  
  .close-btn {
    position: absolute;
    top: 10px;
    right: 15px;
    background: none;
    border: none;
    font-size: 16px;
  }
  
  .error {
    color: red;
    font-size: 12px;
    margin-top: 5px;
  }
  
  .actions {
    margin-top: 15px;
    display: flex;
    justify-content: space-between;
  }
  