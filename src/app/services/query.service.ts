import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class BigQueryService {
  constructor(private http: HttpClient) {}

  executeQuery() {
    return this.http
      .get(
        `http://localhost:3000/bigquery?query=SELECT Name FROM sb-charts.SB_totals.sales LIMIT 10`
      )
      .subscribe((data) => {
        console.log(data);
      });
  }

  // executeQuery(query: string) {
  //   const accessToken =
  //     'ya29.a0AVvZVsrtGG4u0qO08voajrZLU696aC516eh_qL6AnZMZ6OnQOM4wasw3hnDCiJvBZMn_KHq9TnD4zklyU_5oJR-X0z1vGLS2cqHJXytn2BozKRDBWWYTj7zJlR4GFU8wKY52atnXJ6SwNqBa0q-RaL5qLvtSHDnq2ncPaCgYKAa8SAQASFQGbdwaIXciFbMLs3N7ul-onS2PVMQ0171';
  //   const headers = new HttpHeaders({
  //     'Content-Type': 'application/json',
  //     Authorization: 'Bearer ' + accessToken,
  //   });

  //   const body = {
  //     query: query,
  //     useLegacySql: false,
  //   };

  //   return this.http.post(this.apiUrl, body, { headers: headers });
  // }
}
