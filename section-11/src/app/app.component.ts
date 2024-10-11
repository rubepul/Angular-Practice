import { Component, computed, DestroyRef, effect, inject, OnInit, signal } from '@angular/core';
import { toObservable } from '@angular/core/rxjs-interop';
import { interval, map } from 'rxjs';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit{
  clickCount = signal(0);
  clickCount$ = toObservable(this.clickCount);
  // interval = signal(0);
  // doubleInterval = computed(() => this.interval() * 2);

  private destroyRef = inject(DestroyRef);

  constructor(){
    // effect(() => {
    //   console.log(`Clicked button ${this.clickCount()} times.`)
    // });
  }

  ngOnInit(): void {
      // const subscription = interval(2000).pipe(
      //   map((val) => val * 2)
      // ).subscribe({
      //   next: (val) => console.log(val)
      // });
      // this.destroyRef.onDestroy(() => {
      //   subscription.unsubscribe();
      // });
      const subscription = this.clickCount$.subscribe({
        next: (val) => console.log(`Clicked button ${this.clickCount()} times.`)
      });
      this.destroyRef.onDestroy(() => {
        subscription.unsubscribe();
      });
  }

  onClick() {
    this.clickCount.update(prevCount => prevCount + 1);
  }

}
