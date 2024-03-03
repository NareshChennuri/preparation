/** we can read the Query params from Activated Route 
import { ActivatedRoute } from '@angular/router';

@Component({ ... })
export class BookComponent implements OnInit {

  orderby: string;

  constructor(private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.queryParams
      .subscribe(params => {
        console.log(params); // { orderby: "price" }
        this.orderby = params.orderby;
        console.log(this.orderby); // price
      }
      );
  }
}

*/
