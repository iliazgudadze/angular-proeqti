import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ToolsService {
  constructor(public http: HttpClient) {}

  getAllProducts(page: number = 1, limit: number = 9) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page_index=${page}&page_size=${limit}`
    );
  }

  getCategories(){
    return this.http.get(`https://api.everrest.educata.dev/shop/products/categories`
    );
  }

  getProductsByCategory(categoryId: string,page:number = 1, limit:number = 9){
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/category/${categoryId}?page_index=${page}&page_size=${limit}`
    );
  }

  getBrands(){
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brands`
    );
  }

  getProductsByBrand(brandName: string, page: number = 1, limit: number = 9){
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/brand/${brandName}?page_index=${page}&page_size=${limit}`
    );
  }
}