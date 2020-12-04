import { Component, Input } from '@angular/core';

@Component({
  selector: 'toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class ToolbarComponent  {
  @Input() name: string;
}
