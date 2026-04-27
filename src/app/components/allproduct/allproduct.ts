import { Component } from '@angular/core';
import { ToolsService } from '../../services/tools-service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './allproduct.html',
  styleUrl: './allproduct.css',
})
export class Allproduct {
  public allProducts: any[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;
  public limit: number = 9;

  constructor(public tools: ToolsService) {
    this.loadProducts(1);
  }

  onLimitChange() {
    this.currentPage = 1;
    this.loadProducts(this.currentPage);
  }

loadProducts(page: number) {
  this.currentPage = page;

  this.tools.getAllProducts(this.currentPage, this.limit)
    .subscribe((Data: any) => {
      console.log(Data);

      this.allProducts = Data.products;
      this.totalPages = Math.ceil(Data.total / this.limit);
    });
}

  getPages(): number[] {
    return Array.from(
      { length: this.totalPages },
      (_, i) => i + 1
    );
  }
}