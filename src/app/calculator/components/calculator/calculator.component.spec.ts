import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CalculatorComponent } from './calculator.component';
import { CalculatorService } from '@/calculator/services/calculator.service';

class MockCalculatorService {

  public resultText = jasmine.createSpy('resultText').and.returnValue('100.00');
  public subResultText = jasmine.createSpy('subResultText').and.returnValue('1');
  public lastOperator = jasmine.createSpy('lastOperator').and.returnValue('+');

  public constructNumber = jasmine.createSpy()

}

describe('CalculatorComponent', () => {

  let fixture: ComponentFixture<CalculatorComponent>;

  let compiled: HTMLElement;

  let component: CalculatorComponent;

  let mockCalculatorService: MockCalculatorService;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [CalculatorComponent],
      providers: [
        {
          provide: CalculatorService,
          useClass: MockCalculatorService,
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(CalculatorComponent);
    compiled = fixture.nativeElement as HTMLElement;
    component = fixture.componentInstance;

    // Que coisa horrivel!? Kkkkkkkkkkk
    mockCalculatorService = TestBed.inject(CalculatorService) as unknown as MockCalculatorService;

    // Foi movido para o teste 'should display proper calculation values' pq nao detectava a mudança no metodo
    //fixture.detectChanges();
  });

  it('should create the app', () => {
    expect(component).toBeTruthy();
  });

  it('should have the current getters', () => {

    expect(component.resultText()).toBe('100.00');
    expect(component.subResultText()).toBe('1');
    expect(component.lastOperator()).toBe('+');

  });

  it('should display proper calculation values', () => {

    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('456');
    mockCalculatorService.lastOperator.and.returnValue('*');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');
    expect(component.subResultText()).toBe('456');
    expect(component.lastOperator()).toBe('*');

    expect(compiled.querySelector('span')?.innerText).toBe('456 *');

  });


  it('should have 19 calculator-button components', () => {

    expect(component.calculatorButtons()).toBeTruthy();
    expect(component.calculatorButtons().length).toBe(19);

  });

  it('should have 19 calculator-button with content projection', () => {

    const buttons = compiled.querySelectorAll('calculator-button');
    expect(buttons.length).toBe(19);

    expect(buttons[0].textContent?.trim()).toBe('C');
    expect(buttons[1].textContent?.trim()).toBe('+/-');
    expect(buttons[2].textContent?.trim()).toBe('%');
    expect(buttons[3].textContent?.trim()).toBe('÷');

  });

  it('should handle keyboard events correctly', () => {

    const eventEnter = new KeyboardEvent('keyup', {key: 'Enter'});
    document.dispatchEvent(eventEnter);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('=');

    const eventEsc = new KeyboardEvent('keyup', {key: 'Escape'});
    document.dispatchEvent(eventEsc);

    expect(mockCalculatorService.constructNumber).toHaveBeenCalledWith('C');

  });

  it('should display result text correctly', () => {

    mockCalculatorService.resultText.and.returnValue('123');
    mockCalculatorService.subResultText.and.returnValue('10');
    mockCalculatorService.lastOperator.and.returnValue('-');
    fixture.detectChanges();

    expect(component.resultText()).toBe('123');

    //o id="sub-result", mas pra localizar ele tem que ser: #sub-result
    expect(compiled.querySelector('#sub-result')?.textContent).toContain('10 -');
  });


});
