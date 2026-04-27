import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
  export class ToolsService {
  constructor(public http: HttpClient) {}

  getAllProducts(page: number, limit: number) {
    return this.http.get(
      `https://api.everrest.educata.dev/shop/products/all?page=${page}&page_size=${limit}`
    );
  }
}
 