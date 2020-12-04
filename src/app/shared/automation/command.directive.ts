import { Directive, Host, Inject, Input, OnInit, Optional } from "@angular/core";
import { Pipeline, PipelineDirective } from "./pipeline.directive";

@Directive({
  selector: "[command]"
})
export class CommandDirective implements OnInit {
  @Input('command') name: string;
  @Input() pipline: PipelineDirective;

  constructor(@Optional() private pipeline: Pipeline) {
  }

  ngOnInit() {
    console.info(`Command '${this.name ?? '≪none≫'}' Pipeline '${this.pipeline?.name ?? '≪none≫'}'`);
  }
}
