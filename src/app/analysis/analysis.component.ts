import { Component, OnInit } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {LoginModel} from '../auth/models/login.model';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.scss']
})
export class AnalysisComponent implements OnInit {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.getAnalysis();
  }

  getAnalysis(): void {
    // TODO put every request to dedicated service
    this.http.post<LoginModel>(`${this.apiUrl}/analysis`, {siteUrl: 'https://poscielereczniki.pl/'}).subscribe(res => {
      console.log(res);
    }, err => console.log(err));
  }
}
