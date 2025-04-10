import { Component } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";


@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  imports: [CalculatorButtonComponent],
})
export class CalculatorComponent {

}
