import { Component, computed, inject, viewChildren } from '@angular/core';
import { CalculatorButtonComponent } from "../calculator-button/calculator-button.component";
import { CalculatorService } from '@/calculator/services/calculator.service';

const keyEquivalents: Record<string, string> = {
  Escape: 'C',
  Enter: '=',
  Clear: 'C',
  '*': 'x',
  '/': '÷',
};

@Component({
  selector: 'calculator',
  templateUrl: './calculator.component.html',
  imports: [CalculatorButtonComponent],
  host: {
    '(document:keyup)': 'handleKeyboardEvent($event)'
  }
})
export class CalculatorComponent {

  // recupera todos os botoes que foram inseridos
  // viewChildren eh um signal
  public calculatorButtons = viewChildren(CalculatorButtonComponent);

  private calculatorService = inject(CalculatorService);

  public resultText     = computed( () => this.calculatorService.resultText());
  public subResultText  = computed( () => this.calculatorService.subResultText());
  public lastOperator   = computed( () => this.calculatorService.lastOperator());

  public handleClick(key: string) {
    this.calculatorService.constructNumber(key);
  }

  //eh recomendado usar host, veja acima
  //@HostListener("document:keyup", ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {

    const key = event.key;

    const keyValue = keyEquivalents[key] ?? key;

    this.handleClick(keyValue);

    // varre todos os botoes
    this.calculatorButtons().forEach( button => {
      button.keyboardPressedStyle(keyValue);
    });

  }

}
