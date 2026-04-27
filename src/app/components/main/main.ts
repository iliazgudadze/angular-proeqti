import { CommonModule } from '@angular/common';
import { Component, OnInit, OnDestroy } from '@angular/core';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './main.html',
  styleUrls: ['./main.css']
})
export class Main implements OnInit, OnDestroy {
  images: string[] = [
    'images/1.avif',
    'images/2.avif'
  ];
  currentIndex:number = 0;
  intervalId:any;

  ngOnInit(): void{
    this.intervalId=setInterval(()=>{
      this.nextImage();
    },4000);
  }
  nextImage():void{
    this.currentIndex = (this.currentIndex + 1)% this.images.length;
  }
  ngOnDestroy(): void {
    if(this.intervalId){
      clearInterval(this.intervalId)
    }
  }
}
