import { Component, effect, OnDestroy, OnInit, signal } from '@angular/core';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit, OnDestroy{
  // Example of Literal Types
  currentStatus = signal<'online' | 'offline' | 'unknown'>('offline');
  // The type of interval should be the type of value returned by setInterval
  private interval?: ReturnType<typeof setInterval>;

  /* 
    An effect is an operation that runs whenever one or more signal values change, 
    angular sets up a subscription
  */
  constructor(){
    effect(() => {
      console.log(this.currentStatus());
    })
  }

  ngOnInit() {
    console.log("init")
    this.interval = setInterval(() => {
      const rnd = Math.random();
      console.log(rnd)
      if (rnd < 0.5){
        this.currentStatus.set('online');
      } else if (rnd < 0.9) {
        this.currentStatus.set('offline');
      } else {
        this.currentStatus.set('unknown');
      }
    }, 10000);
  }

  ngAfterViewInit() {
    console.log("After view init")
  }

  ngOnDestroy() {
    clearTimeout(this.interval);
  }
}
