import { Component, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { HabitService } from '../services/habit.service';

@Component({
  selector: 'app-habits',
  standalone: true,
  imports: [CommonModule, FormsModule],
  styles: [`
    .habits-container {
      max-width: 420px;
      margin: 0 auto;
      padding: 24px 16px;
      font-family: 'Segoe UI', sans-serif;
    }
    .habits-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 20px;
    }
    .habits-header h1 { font-size: 24px; margin: 0; }
    .btn {
      border: none;
      padding: 10px 20px;
      border-radius: 10px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
    }
    .btn-logout { background: #ef4444; color: white; border-radius: 20px; }
    .btn-primary { background: #6366f1; color: white; }
    .btn-success { background: #22c55e; color: white; }
    .btn-danger { background: #ef4444; color: white; }
    .btn-secondary { background: #9ca3af; color: white; }
    .btn-warning { background: #f59e0b; color: white; }
    .quote-box {
      background: linear-gradient(135deg, #6366f1, #8b5cf6);
      color: white;
      border-radius: 16px;
      padding: 20px;
      margin-bottom: 16px;
      text-align: center;
    }
    .quote-title { font-size: 14px; margin: 0 0 8px; }
    .quote-text { font-style: italic; margin: 0; font-size: 15px; }
    .error-message { color: #ef4444; font-size: 14px; margin-bottom: 12px; }
    .form-box {
      background: #f3f4f6;
      border-radius: 12px;
      padding: 16px;
      margin-bottom: 16px;
    }
    .form-box h3 { margin: 0 0 12px; }
    .form-box input {
      width: 100%;
      padding: 10px;
      border: 1px solid #d1d5db;
      border-radius: 8px;
      margin-bottom: 10px;
      font-size: 14px;
      box-sizing: border-box;
    }
    .form-actions { display: flex; gap: 8px; }
    .empty-state {
      text-align: center;
      color: #9ca3af;
      padding: 40px 0;
    }
    .habit-card {
      background: white;
      border-radius: 14px;
      padding: 16px;
      margin-bottom: 12px;
      display: flex;
      justify-content: space-between;
      align-items: center;
      box-shadow: 0 2px 8px rgba(0,0,0,0.08);
    }
    .habit-info { flex: 1; }
    .habit-info h3 { margin: 0 0 4px; font-size: 16px; }
    .habit-info p { margin: 0; color: #6b7280; font-size: 13px; }
    .habit-actions { display: flex; gap: 8px; }
    .habit-actions .btn {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      padding: 0;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    }
  `],
  template: `
    <div class="habits-container">

      <div class="habits-header">
        <h1>🌅 Meus Hábitos</h1>
        <button class="btn btn-logout" (click)="logout()">Sair</button>
      </div>

      <div class="quote-box">
        <p class="quote-title">💡 Citação do dia</p>
        <p class="quote-text">{{ quote() }}</p>
      </div>

      @if (errorMessage()) {
        <p class="error-message">{{ errorMessage() }}</p>
      }

      @if (!showForm && editingId === null) {
        <button type="button" class="btn btn-primary" (click)="showForm = true" style="width:100%; margin-bottom:16px;">
          + Novo Hábito
        </button>
      }

      @if (showForm) {
        <div class="form-box">
          <h3>Novo Hábito</h3>
          <input [(ngModel)]="newHabitName" placeholder="Nome do hábito" />
          <input [(ngModel)]="newHabitDescription" placeholder="Descrição (opcional)" />
          <div class="form-actions">
            <button class="btn btn-primary" (click)="addHabit()">Salvar</button>
            <button class="btn btn-secondary" (click)="showForm = false">Cancelar</button>
          </div>
        </div>
      }

      @if (editingId !== null) {
        <div class="form-box">
          <h3>Editar Hábito</h3>
          <input [(ngModel)]="editName" placeholder="Nome do hábito" />
          <input [(ngModel)]="editDescription" placeholder="Descrição (opcional)" />
          <div class="form-actions">
            <button class="btn btn-warning" (click)="saveEdit()">Atualizar</button>
            <button class="btn btn-secondary" (click)="cancelEdit()">Cancelar</button>
          </div>
        </div>
      }

      @if (habits().length === 0) {
        <div class="empty-state">
          <p>Nenhum hábito cadastrado ainda.</p>
          <p>Clique em "+ Novo Hábito" para começar!</p>
        </div>
      }

      @for (habit of habits(); track habit.id) {
        <div class="habit-card">
          <div class="habit-info">
            <h3>{{ habit.name }}</h3>
            @if (habit.description) {
              <p>{{ habit.description }}</p>
            }
          </div>
          <div class="habit-actions">
            <button class="btn" [class.btn-success]="habit.completedToday" [class.btn-secondary]="!habit.completedToday" (click)="checkIn(habit.id)">
              {{ habit.completedToday ? '✅' : '✓' }}
            </button>
            <button class="btn btn-warning" (click)="startEdit(habit)" style="font-size:14px;">✏️</button>
            <button class="btn btn-danger" (click)="deleteHabit(habit.id)">🗑</button>
          </div>
        </div>
      }
    </div>
  `
})
export class HabitsComponent implements OnInit {

  habits = signal<any[]>([]);
  quote = signal('Carregando citação...');
  errorMessage = signal('');

  showForm = false;
  newHabitName = '';
  newHabitDescription = '';

  editingId: number | null = null;
  editName = '';
  editDescription = '';

  private quotes = [
    'Cada dia é uma nova chance de ser melhor. 💪',
    'Disciplina é a ponte entre metas e conquistas. 🌉',
    'Pequenos hábitos, grandes resultados. 🚀',
    'A consistência supera o talento. 🏆',
    'Comece de onde você está. Use o que você tem. Faça o que você pode. ⭐'
  ];

  constructor(
    private habitService: HabitService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadHabits();
    this.loadQuote();
  }

  loadHabits() {
    this.habitService.getHabits().subscribe({
      next: (data) => {
        this.habits.set(data);
        this.errorMessage.set('');
      },
      error: (err) => {
        console.error('Erro ao carregar hábitos:', err);
        this.errorMessage.set('Erro ao carregar hábitos.');
      }
    });
  }

  addHabit() {
    if (!this.newHabitName.trim()) return;
    const habit = {
      name: this.newHabitName.trim(),
      description: this.newHabitDescription.trim()
    };
    this.habitService.addHabit(habit).subscribe({
      next: () => {
        this.newHabitName = '';
        this.newHabitDescription = '';
        this.showForm = false;
        this.loadHabits();
      },
      error: (err) => {
        console.error('Erro ao criar hábito:', err);
        this.errorMessage.set('Erro ao criar hábito.');
      }
    });
  }

  startEdit(habit: any) {
    this.editingId = habit.id;
    this.editName = habit.name;
    this.editDescription = habit.description || '';
    this.showForm = false;
  }

  saveEdit() {
    if (!this.editingId || !this.editName.trim()) return;
    this.habitService.updateHabit(this.editingId, {
      name: this.editName.trim(),
      description: this.editDescription.trim()
    }).subscribe({
      next: () => {
        this.cancelEdit();
        this.loadHabits();
      },
      error: (err) => {
        console.error('Erro ao editar hábito:', err);
        this.errorMessage.set('Erro ao editar hábito.');
      }
    });
  }

  cancelEdit() {
    this.editingId = null;
    this.editName = '';
    this.editDescription = '';
  }

  checkIn(id: number) {
    this.habitService.checkIn(id).subscribe({
      next: () => {
        this.loadHabits();
      },
      error: (err) => {
        console.error('Erro no check-in:', err);
        this.errorMessage.set('Erro ao registrar check-in.');
      }
    });
  }

  deleteHabit(id: number) {
    this.habitService.deleteHabit(id).subscribe({
      next: () => {
        this.loadHabits();
      },
      error: (err) => {
        console.error('Erro ao deletar:', err);
        this.errorMessage.set('Erro ao deletar hábito.');
      }
    });
  }

  loadQuote() {
    const random = this.quotes[Math.floor(Math.random() * this.quotes.length)];
    this.quote.set(random);
  }

  logout() {
    localStorage.removeItem('jwt_token');
    this.router.navigate(['/login']);
  }
}
