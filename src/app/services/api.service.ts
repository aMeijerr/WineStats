import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private apiUrl = 'http://localhost:3000/data';

  constructor(private http: HttpClient) {}

  getData(filter: string) {
    const params = { filter };
    return this.http.get<any[]>(this.apiUrl, { params }).subscribe((data) => {
      console.log(data);
    });
  }
}
