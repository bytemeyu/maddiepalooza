export interface User {
  user_id: number;
  email: string;
  username: string;
  password: string;
  //aqui é 'password', porque ele só vai ser transformado em 'password_hash' (para ser passado em hash para o banco de dados) no backend
  role: string;
}
