import { Component, ElementRef, HostBinding, input, output, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'calculator-button',
  templateUrl: './calculator-button.component.html',
  styleUrl: './calculator-button.component.css',
  imports: [],
  host: {
    class: 'w-1/4 border-r border-b border-indigo-400',
    '[class.is-double-size]' : 'isDoubleSize()'
  },
  encapsulation: ViewEncapsulation.None
})
export class CalculatorButtonComponent {

  public isPressed = signal(false);

  public onClick = output<string>();

  public contentValue = viewChild<ElementRef<HTMLButtonElement>>('button');

  public isCommand = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  public isDoubleSize = input(false, {
    transform: (value: boolean | string) =>
      typeof value === 'string' ? value === '' : value,
  });

  /*
  @HostBinding('class.is-command') get commandStyle() {
    return this.isCommand();
  }
  */

  /*
  // VEJA ACIMA, COM host, A NOVA FORMA DE APLICAR UM CSS DINAMICAMENTE
  @HostBinding('class.w-2/4') get commandStyle() {
    return this.isDoubleSize();
  }
  */

  handleButtonClick() {
    if (!this.contentValue()?.nativeElement) {
      return;
    }
    const value = this.contentValue()!.nativeElement.innerText;
    this.onClick.emit(value.trim());
  }

  public keyboardPressedStyle(key: string) {

    if (!this.contentValue()) return;

    const value = this.contentValue()!.nativeElement.innerText;

    // cada botao tem como "identificador", uma tecla
    // se a tecla pressionada nao corresponde, ele retorna e nao faz nada
    if (value != key) return;

    // key faz match com a identificacao do botao
    this.isPressed.set(true);
    setTimeout( () => {
      this.isPressed.set(false);
    },100)
  }

}
