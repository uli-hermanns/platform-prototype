import { Directive, Input, OnInit } from "@angular/core";

export abstract class Pipeline {
  name: string;
}

@Directive({
  selector: "[pipeline]",
  providers: [
    {
        provide: Pipeline,
        useExisting: PipelineDirective
    }
  ]
})
export class PipelineDirective extends Pipeline implements OnInit {
  @Input('pipeline') name: string;
  constructor() {
    super()
  }

  ngOnInit() {
    console.info(`Pipeline ${this.name ?? '≪none≫'} initialized.`);
  }
}
