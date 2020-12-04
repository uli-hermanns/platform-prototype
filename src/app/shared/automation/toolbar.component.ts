import { Component, Input } from '@angular/core';

@Component({
  selector: 'flex-toolbar',
  templateUrl: './toolbar.component.html',
  styles: [`h1 { font-family: Lato; }`]
})
export class ToolbarComponent  {
  @Input() name: string;
}
