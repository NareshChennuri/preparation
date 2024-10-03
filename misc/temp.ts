import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css'],
})
export class CalendarComponent {
  calendarOptions: any = {
    initialView: 'dayGridMonth',
    events: [
      {
        id: '1',
        title: 'Event 1',
        start: '2024-10-10',
        url: 'https://example.com/event/1',
      },
      {
        id: '2',
        title: 'Event 2',
        start: '2024-10-15',
        url: 'https://example.com/event/2',
      },
    ],
    eventContent: this.renderEventContent.bind(this), // Custom event rendering
  };

  renderEventContent(arg: any) {
    // Create two separate divs, one for the title and one for the link icon

    // Create the event title div
    const titleDiv = document.createElement('div');
    titleDiv.innerText = arg.event.title;
    titleDiv.style.cursor = 'pointer';
    titleDiv.onclick = () => {
      alert(`Event Title Clicked: ${arg.event.title}`);
    };

    // Create the link icon div
    const iconDiv = document.createElement('div');
    const icon = document.createElement('i');
    icon.classList.add('fa', 'fa-link'); // FontAwesome link icon
    iconDiv.appendChild(icon);
    iconDiv.style.cursor = 'pointer';
    iconDiv.style.marginLeft = '10px'; // Add some spacing
    iconDiv.onclick = () => {
      this.copyToClipboard(arg.event.url);
    };

    // Create a container div to hold both elements
    const container = document.createElement('div');
    container.style.display = 'flex'; // To display title and icon in a row
    container.appendChild(titleDiv);
    container.appendChild(iconDiv);

    // Return the custom HTML
    return { domNodes: [container] };
  }

  // Method to copy link to clipboard
  copyToClipboard(link: string) {
    // Create a temporary textarea element to copy the text
    const textarea = document.createElement('textarea');
    textarea.value = link;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);

    // Show an alert that the link has been copied
    alert('Link copied to clipboard: ' + link);
  }
}
