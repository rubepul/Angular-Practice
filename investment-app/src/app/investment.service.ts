import { Injectable, signal } from "@angular/core";
import { InvestmentInput, InvestmentOutput } from "./investment-results.model";

@Injectable({
    providedIn: 'root'
})
export class InvestmentService {

    // results is stateful data, data that when changes will have an impact on the UI
    resultsData = signal<InvestmentOutput[] | undefined>(undefined);

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
        this.resultsData.set(annualData);
      }

}