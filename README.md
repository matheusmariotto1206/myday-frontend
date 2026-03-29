cd myday-frontend
npm install
ng serve
O frontend estará disponível em http://localhost:4200

📡 Endpoints da API
Método	Rota	Descrição
POST	/auth/register	Registrar usuário
POST	/auth/login	Login (retorna JWT)
GET	/habits	Listar hábitos do usuário
POST	/habits	Criar novo hábito
PUT	/habits/{id}	Editar hábito
DELETE	/habits/{id}	Deletar hábito
POST	/records/{habitId}	Toggle check-in diário
GET	/quotes/random	Citação motivacional aleatória
🗄 Estrutura do Banco
md_user — Usuários
md_habit — Hábitos (vinculados ao usuário)
md_habit_record — Registros diários de conclusão
👤 Autor 
Matheus Mariotto - rm560276
João Vinícius - rm559369
