import { Component, Input } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './header/header.component';
import { UserInputComponent } from './user-input/user-input.component';
import { InvestmentResultsComponent } from "./investment-results/investment-results.component";
import { InvestmentInput, InvestmentOutput } from './investment-results.model';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.css',
    imports: [RouterOutlet, HeaderComponent, UserInputComponent, InvestmentResultsComponent]
})
export class AppComponent {
  results?: InvestmentOutput[];
  title = 'investment-app';


  calculateInvestmentResults(data: InvestmentInput) {
    const { initialInvestment, annualInvestment, expectedReturn, duration } = data; 
    const annualData = [];
    let investmentValue = initialInvestment;
    for (let index = 0; index < duration; index++) {
      const year = index + 1;
      const interestEarnedInAYear = investmentValue * (expectedReturn / 100);
      investmentValue += interestEarnedInAYear + annualInvestment;
      const totalInterest = investmentValue - annualInvestment * year - initialInvestment;
      annualData.push({
        year: year,
        interest: interestEarnedInAYear,
        valueEndOfYear: investmentValue,
        annualInvestment: annualInvestment,
        totalInterest: totalInterest,
        totalAmountInvested: initialInvestment + annualInvestment * year
      });
    }
    this.results = annualData;
  }
}
