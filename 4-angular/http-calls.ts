/**
 * Import “HttpClientModule” at Module level.
• Import “HttpClient” from “@angular/common/http” at component level.
• Create object of “HttpClient” using Dependency injection.
• You can then make “post” , “get” calls using “HttpClient”.
• Using subscribe function to catch success and error response.

import { HttpClient } from '@angular/common/http';

export class HttpPostApiService {
  constructor(private http: HttpClient) {}

  postData(url: string, data: any) {
    return this.http.post(url, data);
  }
}


this.httpPostApiService.postData(url, data).subscribe(
  (response) => {
    console.log('Response:', response);
  },
  (error) => {
    console.error('Error:', error);
  }
);

*/

