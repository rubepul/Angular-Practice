import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-server',
  standalone: true,
  imports: [],
  templateUrl: './server.component.html',
  styleUrl: './server.component.css'
})
export class ServerComponent implements OnInit{
  // Example of Literal Types
  currentStatus: 'online' | 'offline' | 'unknown' = 'online';

  constructor(){
  }

  ngOnInit() {
    setInterval(() => {
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
}
