import { ComponentFixture, TestBed } from '@angular/core/testing';
import { AppComponent } from './app.component';

describe('AppComponent', () => {

  let fixture: ComponentFixture<AppComponent>;

  let compiled: HTMLElement;

  beforeEach(async () => {

    await TestBed.configureTestingModule({
      imports: [AppComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AppComponent);
    compiled = fixture.nativeElement as HTMLElement;

  });

  it('should create the app', () => {
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });

  it(`should have the 'angular-zoneless-calculator' title`, () => {
    const app = fixture.componentInstance;
    expect(app.title).toEqual('zoneless-calculator');
  });

  it('should render router-outlet', () => {
    expect(compiled.querySelector('router-outlet')).not.toBeNull();
  });


  it('should render router-outlet with css classes', () => {
    const divElement = compiled.querySelector('div');

    const divClasses = divElement?.classList.value.split(' ');
    expect(divElement).not.toBeNull();

    const musHavaThisClasses = "min-w-screen min-h-screen bg-slate-600 flex items-center justify-center px-5 py-5".split(' ');
    musHavaThisClasses.forEach( className => {
      expect(divClasses).toContain(className);
    })

  });

  it("should contain the 'Buy me a beer' link", () => {

    const anchoElement = compiled.querySelector('a');
    expect(anchoElement).not.toBeNull();

    expect(anchoElement?.title).toBe('Buy me a beer');

    const hrefValue = 'https://www.buymeacoffee.com/scottwindon';

    expect(anchoElement?.href).toBe(hrefValue);
    expect(anchoElement?.getAttribute('href')).toBe(hrefValue);

  });



});
