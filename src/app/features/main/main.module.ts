import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { MainComponent } from "./main.component";
import { MatButtonModule } from "@angular/material/button";
import { MatGridListModule } from "@angular/material/grid-list";
import { MatIconModule } from "@angular/material/icon";
import { MatInputModule } from "@angular/material/input";
import { SharedModule } from "../../shared/shared.module";
import { FormComponent } from "./form/form.component";
import { ReactiveFormsModule } from "@angular/forms";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatDatepickerModule } from "@angular/material/datepicker";

@NgModule({
  imports: [
    CommonModule,
    MatDatepickerModule,
    MatGridListModule,
    MatFormFieldModule,
    MatIconModule,
    MatButtonModule,
    MatInputModule,
    SharedModule,
    ReactiveFormsModule
  ],
  declarations: [MainComponent, FormComponent],
  exports: [MainComponent, FormComponent]
})
export class MainModule {}
