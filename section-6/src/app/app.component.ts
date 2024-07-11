import { Component } from '@angular/core';
import { ServerComponent } from './dashboard/server/server.component';
import { HeaderComponent } from './dashboard/header/header.component';
import { TrafficComponent } from './dashboard/traffic/traffic.component';
import { SupportComponent } from './dashboard/support/support.component';
import { DashboardItemComponent } from './dashboard/dashboard-item/dashboard-item.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [HeaderComponent, ServerComponent, TrafficComponent, SupportComponent, DashboardItemComponent],
  templateUrl: './app.component.html',
})

export class AppComponent {
  trafficTitle = "Traffic"
}
