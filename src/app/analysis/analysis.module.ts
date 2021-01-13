import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AnalysisComponent } from './analysis.component';
import {RouterModule} from '@angular/router';
import {analyzeRoutes} from './analysis.routing';

@NgModule({
  declarations: [AnalysisComponent],
  imports: [
    RouterModule.forChild(analyzeRoutes),
    CommonModule
  ]
})
export class AnalysisModule { }
