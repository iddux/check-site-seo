import { Component, OnInit } from '@angular/core';
import {AnalysisService} from './analysis.service';
import {Analysis} from '../shared/types/analysis.types';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  analysisData: Analysis;

  constructor(private analysisService: AnalysisService) { }

  ngOnInit(): void {
    this.analysisService.getAnalysis(this.analysisService.analysisUrl).subscribe();

    this.analysisService.analysis$.subscribe(analysisData => {
      this.analysisData = analysisData;
    }, err => {
      console.log(err);
    });
  }
}
