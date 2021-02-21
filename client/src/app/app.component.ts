import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Fake Umbrella';
  refreshForecastToggle=false;
  refreshForecast(){
    this.refreshForecastToggle = !this.refreshForecastToggle
  }
}
