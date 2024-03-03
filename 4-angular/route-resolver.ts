/* Route resolver 

mainly to improve the user experience

Consider an e-commerce application where you have a product detail page. 
When a user navigates to a product detail page, you need to fetch product details from a server. 
Without a route resolver, the component associated with the product detail page would be rendered immediately, 
and the product data would be fetched asynchronously. 
This could lead to a poor user experience, where the page appears empty or incomplete until the data arrives.

route resolver is a service that pre-fetches data before a route is activated. It ensures that the data needed by a component is available before the component is rendered. This is particularly useful when you need to resolve data asynchronously before the component is displayed.

Use resolver when you want to fetch the data even before the user is routed to the URL. Resolver could include service calls which would bring us the data required to load the next page.

Example Scenario: 
==============================
I was working on the project where user would pass the name of file to be loaded in the URL. Based on the name passed we would do the async call in ngOnInit and get the file. But the problem with this is, if user passes the incorrect name in URL, our service would try to fetch the file which does not exists on the server. We have 2 option in such scenario:

Option 1: To get the list of valid filenames in ngOnInit, and then call the actual service to fetch the file (If file name is valid). Both of these calls should be synchronous.

Option 2: Fetch the list of valid filenames in the resolver, check whether filename in URL is valid or not, and then fetch the file data.

Option 2 is a better choice, since resolver handles the synchronicity of calls.

const routes: Routes = [
  {
    path: 'products/:id',
    component: ProductDetailComponent,
    resolve: {
      product: ProductResolverService
    }
  }
];


import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { Observable } from 'rxjs';
import { ProductService } from './product.service';
import { Product } from './product.model';

@Injectable({
  providedIn: 'root'
})
export class ProductResolverService implements Resolve<Product> {

  constructor(private productService: ProductService) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<Product> {
    const productId = route.paramMap.get('id');
    return this.productService.getProduct(productId);
  }
}



import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Product } from './product.model';

@Component({
  selector: 'app-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  product: Product;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.product = this.route.snapshot.data['product'];
  }
}

*/