import { Injectable } from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, throwError} from 'rxjs';
import {Analysis} from '../shared/types/analysis.types';
import {catchError, map} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AnalysisService {

  private apiUrl: string = environment.apiUrl;
  private analysis: BehaviorSubject<Analysis  | null>;
  public analysisUrl = 'http://www.molobusola.eu/';

  constructor(private http: HttpClient) {
    this.analysis = new BehaviorSubject(null);
  }
  // TODO Handle API errors,

  get analysis$(): Observable<any> {
    return this.analysis.asObservable();
  }

  getAnalysis(siteUrl): Observable<Analysis> {
    return this.http.post<Analysis>(`${this.apiUrl}/analysis`, {siteUrl}).pipe(map((analysis) => {
        this.analysis.next(analysis);
        return analysis;

    }), catchError(err => {
        return throwError(err);
    }));
  }
}
