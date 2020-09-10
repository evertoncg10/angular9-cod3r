import { ActivatedRoute, Router } from '@angular/router';
import { ProductService } from './../product.service';
import { Component, OnInit } from '@angular/core';
import { Product } from '../product.model';

@Component({
  selector: 'app-product-delete',
  templateUrl: './product-delete.component.html',
  styleUrls: ['./product-delete.component.css']
})
export class ProductDeleteComponent implements OnInit {

  idProduct: string;

  product: Product = {
    name: '',
    price: null
  };

  constructor(private productService: ProductService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.idProduct = this.route.snapshot.paramMap.get('id');
    this.productService.readById(this.idProduct).subscribe(product => {
      this.product = product;
    });

  }

  deleteProduct(): void {
    this.productService.delete(this.idProduct).subscribe(() => {
      this.productService.showMessage('Produto excluido com sucesso.');
      this.goToProductListPage();
    });
  }

  cancel(): void {
    this.goToProductListPage();
  }

  goToProductListPage(): void {
    this.router.navigate(['/products']);
  }

}
