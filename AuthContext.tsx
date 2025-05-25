import { createContext, useState, useEffect, ReactNode } from 'react';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcryptjs';

// Tipos
interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  profissao: string;
  registro: string;
  dataCadastro: string;
  ultimoAcesso: string;
}

interface Session {
  token: string;
  userId: string;
  criadoEm: number;
  expiraEm: number;
}

interface AuthContextType {
  user: Omit<User, 'senha'> | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'dataCadastro' | 'ultimoAcesso' | 'senha'> & { senha: string }) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

// Chaves para localStorage
const USERS_KEY = 'motor_dev_users';
const SESSION_KEY = 'motor_dev_session';
const USER_KEY = 'motor_dev_user';

// Contexto de autenticação
export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

// Provedor de autenticação
export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<Omit<User, 'senha'> | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Funções auxiliares
  const getUsers = (): User[] => {
    const usersJson = localStorage.getItem(USERS_KEY);
    return usersJson ? JSON.parse(usersJson) : [];
  };

  const saveUsers = (users: User[]): void => {
    localStorage.setItem(USERS_KEY, JSON.stringify(users));
  };

  const createSession = (user: User): void => {
    const now = Date.now();
    const expiresIn = 8 * 60 * 60 * 1000; // 8 horas em milissegundos
    
    const session: Session = {
      token: uuidv4(),
      userId: user.id,
      criadoEm: now,
      expiraEm: now + expiresIn
    };
    
    localStorage.setItem(SESSION_KEY, JSON.stringify(session));
    
    // Salvar dados básicos do usuário (sem senha)
    const { senha, ...userWithoutPassword } = user;
    localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
  };

  // Verificar sessão ao carregar
  useEffect(() => {
    const checkSession = () => {
      setIsLoading(true);
      
      const sessionJson = localStorage.getItem(SESSION_KEY);
      const userJson = localStorage.getItem(USER_KEY);
      
      if (!sessionJson || !userJson) {
        setIsLoading(false);
        return;
      }
      
      const session: Session = JSON.parse(sessionJson);
      const userData = JSON.parse(userJson);
      
      // Verificar se a sessão expirou
      if (Date.now() > session.expiraEm) {
        logout();
        setIsLoading(false);
        return;
      }
      
      setUser(userData);
      setIsAuthenticated(true);
      setIsLoading(false);
    };

    checkSession();
  }, []);

  // Login
  const login = async (email: string, password: string): Promise<boolean> => {
    setError(null);
    
    try {
      const users = getUsers();
      const user = users.find(u => u.email === email);
      
      if (!user) {
        setError('Usuário não encontrado');
        return false;
      }
      
      const passwordMatch = await bcrypt.compare(password, user.senha);
      
      if (!passwordMatch) {
        setError('Senha incorreta');
        return false;
      }
      
      // Atualizar último acesso
      const updatedUsers = users.map(u => {
        if (u.id === user.id) {
          return { ...u, ultimoAcesso: new Date().toISOString() };
        }
        return u;
      });
      
      saveUsers(updatedUsers);
      
      // Criar sessão
      createSession(user);
      
      // Atualizar estado
      const { senha, ...userWithoutPassword } = user;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      console.error('Erro ao realizar login:', err);
      setError('Erro ao realizar login');
      return false;
    }
  };

  // Registro
  const register = async (userData: Omit<User, 'id' | 'dataCadastro' | 'ultimoAcesso'>): Promise<boolean> => {
    setError(null);
    
    try {
      const users = getUsers();
      
      // Verificar se email já existe
      if (users.some(user => user.email === userData.email)) {
        setError('Email já cadastrado');
        return false;
      }
      
      // Hash da senha
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.senha, salt);
      
      // Criar novo usuário
      const now = new Date().toISOString();
      const newUser: User = {
        id: uuidv4(),
        ...userData,
        senha: hashedPassword,
        dataCadastro: now,
        ultimoAcesso: now
      };
      
      // Salvar usuário
      users.push(newUser);
      saveUsers(users);
      
      // Criar sessão
      createSession(newUser);
      
      // Atualizar estado
      const { senha, ...userWithoutPassword } = newUser;
      setUser(userWithoutPassword);
      setIsAuthenticated(true);
      
      return true;
    } catch (err) {
      console.error('Erro ao realizar cadastro:', err);
      setError('Erro ao realizar cadastro');
      return false;
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem(SESSION_KEY);
    localStorage.removeItem(USER_KEY);
    setUser(null);
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        isLoading,
        login,
        register,
        logout,
        error
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
