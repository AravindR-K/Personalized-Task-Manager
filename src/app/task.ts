import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TaskService {

  baseUrl = 'http://localhost:3000/tasks';

  constructor(private http: HttpClient) {}

  getTasks() {
    return this.http.get(this.baseUrl);
  }

  addTask(task: any) {
    return this.http.post(`${this.baseUrl}/add`, task);
  }

  updateTask(id: string, task: any) {
    return this.http.put(`${this.baseUrl}/${id}`, task);
  }

  deleteTask(id: string) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
}