import { bootstrapApplication } from '@angular/platform-browser';

import { AppComponent } from './app/app.component';
import { appConfig } from './app/app.config';

// Alternate approach, less clean:

// bootstrapApplication(AppComponent, {
//   providers: [provideRouter(routes)]
// }).catch((err) => console.error(err));

bootstrapApplication(AppComponent, appConfig).catch((err) => console.error(err));
