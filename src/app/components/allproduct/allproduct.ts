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

  constructor(private toolsService: ToolsService) {}

  loadProducts(page: number = 1) {
  this.currentPage = page;

  this.toolsService.getAllProducts(page, this.limit).subscribe((res: any) => {
    this.allProducts = res.products;
    this.totalPages = Math.ceil(res.total / this.limit);
  });
}

getPages(): number[] {
  return Array.from(
    { length: this.totalPages },
    (_, i) => i + 1
  );
}

onLimitChange() {
  this.currentPage = 1;
  this.loadProducts(1);
}
}