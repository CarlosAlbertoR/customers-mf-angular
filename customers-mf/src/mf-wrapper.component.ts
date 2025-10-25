import { Component, Input, OnInit, OnDestroy, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'mf-wrapper',
  standalone: true,
  template: `
    <div #container class="mf-container">
      <ng-content></ng-content>
    </div>
  `,
  styles: [
    `
      .mf-container {
        width: 100%;
        height: 100%;
        min-height: 400px;
      }
    `,
  ],
})
export class MFWrapperComponent implements OnInit, OnDestroy {
  @ViewChild('container', { static: true }) container!: ElementRef<HTMLDivElement>;
  @Input() title = 'Angular Microfrontend';

  ngOnInit() {
    console.log('MF Wrapper initialized');
  }

  ngOnDestroy() {
    console.log('MF Wrapper destroyed');
  }

  getContainer(): HTMLElement {
    return this.container.nativeElement;
  }
}

// Export for Module Federation
export default MFWrapperComponent;
