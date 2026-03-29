import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class HabitService {

  private apiUrl = 'http://localhost:8081/habits';

  constructor(private http: HttpClient) {}

  private getHeaders() {
    const token = localStorage.getItem('jwt_token');
    return { headers: new HttpHeaders({ Authorization: `Bearer ${token}` }) };
  }

  getHabits() {
    return this.http.get<any[]>(this.apiUrl, this.getHeaders());
  }

  addHabit(habit: { name: string; description: string }) {
    return this.http.post(this.apiUrl, habit, this.getHeaders());
  }

  updateHabit(id: number, habit: { name: string; description: string }) {
    return this.http.put(`${this.apiUrl}/${id}`, habit, this.getHeaders());
  }

  deleteHabit(id: number) {
    return this.http.delete(`${this.apiUrl}/${id}`, this.getHeaders());
  }

  checkIn(habitId: number) {
    const token = localStorage.getItem('jwt_token');
    return this.http.post(`http://localhost:8081/records/${habitId}`, {}, {
      headers: new HttpHeaders({ Authorization: `Bearer ${token}` }),
      responseType: 'text'
    });
  }
}
