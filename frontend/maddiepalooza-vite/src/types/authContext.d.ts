export interface AuthContextProps {
  isAuthenticated: boolean;
  currentUser: {
    username: string;
    role: "webadmin" | "producer" | "assistant";
    user_id: number;
  } | null;
  //o currentUser pode ser null se o usuário não estiver autenticado
  login: (username: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
}
