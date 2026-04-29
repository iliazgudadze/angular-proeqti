import { CommonModule } from '@angular/common';
import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectorRef
} from '@angular/core';
import { RouterLink } from '@angular/router';
import { ToolsService } from '../../services/tools-service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule, RouterLink],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Main implements OnInit, OnDestroy {

  images: string[] = [
    'images/1.avif',
    'images/2.avif',
    'images/3.avif'
  ];

  currentImage: number = 0;
  interval: any;
  bestSellers: any[] = [];

  constructor(
    private cdr: ChangeDetectorRef,
    private toolsService: ToolsService
  ) {}

  ngOnInit(): void {
    this.startSlider();
    this.getBestSellers();
  }

  startSlider(): void {
    this.interval = setInterval(() => {
      this.currentImage = (this.currentImage + 1) % this.images.length;
      this.cdr.detectChanges();
    }, 4000);
  }

  getBestSellers(): void {
    this.toolsService.getAllProducts(1, 50).subscribe((res: any) => {
      this.bestSellers = res.products
        .sort((a: any, b: any) => b.rating - a.rating)
        .slice(0, 6)
        .map((item: any) => ({
          ...item,
          rating: Math.round(item.rating)
        }));
    });
  }

  ngOnDestroy(): void {
    clearInterval(this.interval);
  }
}