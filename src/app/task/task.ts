import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { TaskService } from '../task';

@Component({
  selector: 'app-task',
  imports: [CommonModule, FormsModule],
  templateUrl: './task.html',
  styleUrl: './task.css',
})
export class Task implements OnInit {

  tasks: any[] = [];
  newTask = "";

  constructor(private taskService: TaskService, private cdr: ChangeDetectorRef) { }

  ngOnInit() {
    this.loadTasks();
  }

  loadTasks() {
    this.taskService.getTasks().subscribe((data: any) => {
      this.tasks = data;
      this.cdr.detectChanges();
    });
  }

  addTask() {
    if (!this.newTask.trim()) return;

    this.taskService.addTask({ title: this.newTask, completed: false })
      .subscribe(() => {
        this.newTask = "";
        this.loadTasks();
        this.cdr.detectChanges(); // Trigger immediately to clear input
      });
  }

  deleteTask(id: string) {
    // 1. Optimistic Update: instantly remove from the UI array
    this.tasks = this.tasks.filter(t => t._id !== id);
    this.cdr.detectChanges(); // Immediately update the UI

    // 2. Call backend in the background
    this.taskService.deleteTask(id).subscribe(() => {
      // Backend deleted it.
    });
  }

  toggleTaskCompletion(task: any) {
    const updatedTask = { ...task, completed: !task.completed };
    this.taskService.updateTask(task._id, updatedTask).subscribe(() => {
      // Optimitic update
      task.completed = updatedTask.completed;
      this.cdr.detectChanges();
    });
  }
}