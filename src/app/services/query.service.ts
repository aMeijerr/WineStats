import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BigQueryService {
  private readonly apiUrl: string =
    'https://www.googleapis.com/bigquery/v2/projects/sb-charts/queries';

  constructor(private http: HttpClient) {}

  executeQuery(query: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Authorization: 'Bearer' + process.env['ACCESS_TOKEN'],
    });

    const body = {
      query: query,
      useLegacySql: false,
    };

    return this.http.post(this.apiUrl, body, { headers: headers });
  }
}
