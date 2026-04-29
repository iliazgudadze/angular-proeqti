import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ToolsService } from '../../services/tools-service';
import { RouterLink } from "@angular/router";

@Component({
  selector: 'app-allproduct',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './allproduct.html',
  styleUrl: './allproduct.css',
})
export class Allproduct implements OnInit {

  public allProducts: any[] = [];
  public currentPage: number = 1;
  public totalPages: number = 0;
  public limit: number = 9;
  public openSections: { [key: string]: boolean } = {};
  public categories: any[] = [];
  public selectedCategoryId: string | null = null;
  public brands: string[] = [];
  public selectedBrand: string | null = null;
  public selectedRating: number | null = null;
  public maxPrice: number = 2000;

  private rawProducts: any[] = [];

  constructor(
    private toolsService: ToolsService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.loadCategories();
    this.loadBrands();
    this.loadProducts(1);
  }

  loadCategories(): void {
    this.toolsService.getCategories().subscribe((res: any) => {
      this.categories = res;
      this.cdr.detectChanges();
    });
  }

  loadBrands(): void {
    this.toolsService.getBrands().subscribe((res: any) => {
      this.brands = res;
      this.cdr.detectChanges();
    });
  }

  loadProducts(page: number = 1): void {
    this.currentPage = page;

    let request$;

    if (this.selectedCategoryId) {
      request$ = this.toolsService.getProductsByCategory(this.selectedCategoryId, page, this.limit);
    } else if (this.selectedBrand) {
      request$ = this.toolsService.getProductsByBrand(this.selectedBrand, page, this.limit);
    } else {
      request$ = this.toolsService.getAllProducts(page, this.limit);
    }

    request$.subscribe((res: any) => {
      this.rawProducts = res.products;
      this.totalPages = Math.ceil(res.total / this.limit);
      this.applyClientFilters();
    });
  }

  applyClientFilters(): void {
    let filtered = [...this.rawProducts];

    if (this.selectedRating) {
      filtered = filtered.filter(p => p.rating >= this.selectedRating!);
    }

    filtered = filtered.filter(p => p.price?.current <= this.maxPrice);

    this.allProducts = filtered;
    this.cdr.detectChanges();
  }

  selectCategory(categoryId: string): void {
    this.selectedCategoryId = this.selectedCategoryId === categoryId ? null : categoryId;
    this.selectedBrand = null;
    this.currentPage = 1;
    this.loadProducts(1);
  }

  selectBrand(brand: string): void {
    this.selectedBrand = this.selectedBrand === brand ? null : brand;
    this.selectedCategoryId = null;
    this.currentPage = 1;
    this.loadProducts(1);
  }

  resetFilters(): void {
    this.selectedCategoryId = null;
    this.selectedBrand = null;
    this.selectedRating = null;
    this.maxPrice = 2000;
    this.currentPage = 1;
    this.loadProducts(1);
  }

  toggleSection(section: string): void {
    this.openSections[section] = !this.openSections[section];
  }

  getPages(): number[] {
    return Array.from({ length: this.totalPages }, (_, i) => i + 1);
  }

  onLimitChange(value: number): void {
    this.limit = Number(value);
    this.currentPage = 1;
    this.loadProducts(1);
  }
}