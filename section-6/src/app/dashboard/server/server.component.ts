import { Component, OnDestroy, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit, OnDestroy{
  // Example of Literal Types
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';
  // The type of interval should be the type of value returned by setInterval
  private interval?: ReturnType<typeof setInterval>;

  constructor(){
  }

  ngOnInit() {
    console.log("init")
    this.interval = setInterval(() => {
      const rnd = Math.random();
      console.log(rnd)
      if (rnd < 0.5){
        this.currentStatus = 'online';
      } else if (rnd < 0.9) {
        this.currentStatus = 'offline';
      } else {
        this.currentStatus = 'unknown';
      }
    }, 5000);
  }

  ngAfterViewInit() {
    console.log("After view init")
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }
}
