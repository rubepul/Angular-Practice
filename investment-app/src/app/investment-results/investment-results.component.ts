import { Component, computed, inject } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { InvestmentService } from '../investment.service';

@Component({
  selector: 'app-investment-results',
  standalone: true,
  imports: [CurrencyPipe],
  templateUrl: './investment-results.component.html',
  styleUrl: './investment-results.component.css'
})
export class InvestmentResultsComponent {
  // Using inject instead of private constructor
  private investmentService = inject(InvestmentService)

  /* 
    Create a computed value from a function that returns a computed read-only signal.
    This ensures that you don't accidentally change the data managed by the service from 
    outside the service
    Alt: Can also do this.investmentService.resultData.asReadonly() to get a read only
    version of the signal.
  */
  results = computed(() => this.investmentService.resultsData());

  // Returns the writable signal
  // get results() {
  //   return this.investmentService.results;
  // }
}
