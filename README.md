# 🌅 MyDay - Frontend

Interface web para o MyDay Habit Tracker, desenvolvida em Angular 18 com componentes standalone.

---

## 🛠 Tecnologias

- Angular 18 (Standalone Components)
- TypeScript
- Angular HttpClient
- JWT Authentication (Interceptor)
- CSS customizado

---

## 📋 Funcionalidades

- ✅ Tela de registro de novo usuário
- ✅ Tela de login com autenticação JWT
- ✅ Dashboard com listagem de hábitos
- ✅ Criar novo hábito
- ✅ Editar hábito existente
- ✅ Deletar hábito
- ✅ Marcar/desmarcar hábito como concluído no dia
- ✅ Citação motivacional aleatória
- ✅ Logout com limpeza do token

---

## 🚀 Como executar

### Pré-requisitos

- Node.js 18+
- Angular CLI

```bash
npm install -g @angular/cli
Instalação

git clone https://github.com/matheusmariotto1206/myday-frontend.git
cd myday-frontend
npm install
Executar

ng serve
Acesse: http://localhost:4200

⚠️ O backend deve estar rodando em http://localhost:8081 antes de usar o frontend.

📁 Estrutura do Projeto
src/
├── app/
│   ├── components/
│   │   ├── login/          # Tela de login
│   │   ├── register/       # Tela de registro
│   │   └── habits/         # Dashboard de hábitos
│   ├── services/
│   │   ├── auth.service.ts       # Autenticação (login/registro)
│   │   ├── habit.service.ts      # CRUD de hábitos + check-in
│   │   └── auth.interceptor.ts   # Interceptor JWT
│   └── app.routes.ts       # Rotas da aplicação
└── assets/
🔗 Rotas
Rota	Componente	Descrição
/login	Login	Tela de login
/register	Register	Tela de registro
/habits	Habits	Dashboard de hábitos
🔑 Autenticação
O token JWT é armazenado no localStorage após o login e enviado automaticamente em todas as requisições via AuthInterceptor.

👤 Integrantes
Matheus Barbosa Mariotto	560276
João Vinícius	559369

