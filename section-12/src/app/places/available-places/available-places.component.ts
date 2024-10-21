import { Component, DestroyRef, inject, OnInit, signal } from '@angular/core';

import { Place } from '../place.model';
import { PlacesComponent } from '../places.component';
import { PlacesContainerComponent } from '../places-container/places-container.component';
import { HttpClient } from '@angular/common/http';
import { catchError, map, throwError } from 'rxjs';

@Component({
  selector: 'app-available-places',
  standalone: true,
  templateUrl: './available-places.component.html',
  styleUrl: './available-places.component.css',
  imports: [PlacesComponent, PlacesContainerComponent],
})
export class AvailablePlacesComponent implements OnInit {
  places = signal<Place[] | undefined>(undefined);
  isFetching = signal(false);
  error = signal('');

  private httpClient = inject(HttpClient);
  private destroyRef = inject(DestroyRef);

  ngOnInit() {
    this.isFetching.set(true);
    // Sending a GET request to fetch data
    const subscription = this.httpClient
      .get<{places: Place[]}>('http://localhost:3000/places')
      // Transforming the data before it reaches the next function
      .pipe(
        map((resData) => resData.places),
        // Handling HTTP Errors
        catchError((error) => {
          console.log(error);
          return throwError(() => 
            new Error('Something went wrong fetching the available places. Please try again later.')
          )
        }) 
      )
      .subscribe({
        next: (places) => {
          this.places.set(places);
        },
        error: (error: Error) => {
          this.error.set(error.message);
        },
        complete: () => {
          this.isFetching.set(false);
        }

      });

      // Configuring Http Request to read response object, not just the body date

      // const subscription2 = this.httpClient
      // .get<{places: Place[]}>('http://localhost:3000/places', {
      //   observe: 'response'
      // })
      // .subscribe({
      //   next: (response) => {
      //     console.log(response)
      //     console.log(response.body?.places);
      //   }
      // });

    this.destroyRef.onDestroy(() => {
      subscription.unsubscribe();
    })
  }

  onSelectPlace(selectedPlace: Place) {
    this.httpClient.put('http://localhost:3000/user-places', {
      placeId: selectedPlace.id
    }).subscribe({
      next:(resData) => console.log(resData)
    })  ;
  }
}
