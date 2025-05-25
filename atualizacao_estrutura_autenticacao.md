# Atualização da Estrutura e Lógica para Autenticação

## Visão Geral
Este documento descreve as atualizações necessárias na estrutura e lógica da aplicação para incluir autenticação e controle de acesso.

## Arquitetura Atualizada

### 1. Estrutura de Diretórios
```
/src
  /components
    /auth
      Login.tsx
      Register.tsx
      ProtectedRoute.tsx
    /layout
      Header.tsx
      Footer.tsx
      Sidebar.tsx
    /anamnese
      (componentes existentes)
    /calculadora
      (componentes existentes)
  /contexts
    AuthContext.tsx
  /hooks
    useAuth.tsx
    useLocalStorage.tsx
  /services
    authService.ts
    evaluationService.ts
  /types
    auth.types.ts
    (tipos existentes)
  /utils
    crypto.ts
    validation.ts
  App.tsx
  main.tsx
```

### 2. Contexto de Autenticação
```typescript
// AuthContext.tsx
import React, { createContext, useState, useEffect } from 'react';
import { User, Session } from '../types/auth.types';
import { loginUser, registerUser, logoutUser, checkSession } from '../services/authService';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  register: (userData: Omit<User, 'id' | 'dataCadastro' | 'ultimoAcesso'>) => Promise<boolean>;
  logout: () => void;
  error: string | null;
}

export const AuthContext = createContext<AuthContextType>({} as AuthContextType);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // Verificar sessão ao carregar
    const verifySession = async () => {
      setIsLoading(true);
      try {
        const session = await checkSession();
        if (session) {
          setUser(session.user);
          setIsAuthenticated(true);
        }
      } catch (err) {
        console.error('Erro ao verificar sessão:', err);
      } finally {
        setIsLoading(false);
      }
    };

    verifySession();
  }, []);

  const login = async (email: string, password: string) => {
    setError(null);
    try {
      const result = await loginUser(email, password);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Falha na autenticação');
        return false;
      }
    } catch (err) {
      setError('Erro ao realizar login');
      return false;
    }
  };

  const register = async (userData: Omit<User, 'id' | 'dataCadastro' | 'ultimoAcesso'>) => {
    setError(null);
    try {
      const result = await registerUser(userData);
      if (result.success) {
        setUser(result.user);
        setIsAuthenticated(true);
        return true;
      } else {
        setError(result.message || 'Falha no cadastro');
        return false;
      }
    } catch (err) {
      setError('Erro ao realizar cadastro');
      return false;
    }
  };

  const logout = () => {
    logoutUser();
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
```

### 3. Hook de Autenticação
```typescript
// useAuth.tsx
import { useContext } from 'react';
import { AuthContext } from '../contexts/AuthContext';

export const useAuth = () => {
  const context = useContext(AuthContext);
  
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider');
  }
  
  return context;
};
```

### 4. Serviço de Autenticação
```typescript
// authService.ts
import { v4 as uuidv4 } from 'uuid';
import { User, Session } from '../types/auth.types';
import { hashPassword, comparePasswords } from '../utils/crypto';

// Chaves para localStorage
const USERS_KEY = 'motor_dev_users';
const SESSION_KEY = 'motor_dev_session';
const USER_KEY = 'motor_dev_user';

// Obter usuários do localStorage
const getUsers = (): User[] => {
  const usersJson = localStorage.getItem(USERS_KEY);
  return usersJson ? JSON.parse(usersJson) : [];
};

// Salvar usuários no localStorage
const saveUsers = (users: User[]): void => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

// Registrar novo usuário
export const registerUser = async (userData: Omit<User, 'id' | 'dataCadastro' | 'ultimoAcesso'>): Promise<{ success: boolean; message?: string; user?: User }> => {
  const users = getUsers();
  
  // Verificar se email já existe
  if (users.some(user => user.email === userData.email)) {
    return { success: false, message: 'Email já cadastrado' };
  }
  
  // Criar novo usuário
  const hashedPassword = await hashPassword(userData.senha);
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
  
  // Retornar usuário sem a senha
  const { senha, ...userWithoutPassword } = newUser;
  return { success: true, user: userWithoutPassword as User };
};

// Login de usuário
export const loginUser = async (email: string, password: string): Promise<{ success: boolean; message?: string; user?: User }> => {
  const users = getUsers();
  const user = users.find(u => u.email === email);
  
  if (!user) {
    return { success: false, message: 'Usuário não encontrado' };
  }
  
  const passwordMatch = await comparePasswords(password, user.senha);
  
  if (!passwordMatch) {
    return { success: false, message: 'Senha incorreta' };
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
  
  // Retornar usuário sem a senha
  const { senha, ...userWithoutPassword } = user;
  return { success: true, user: userWithoutPassword as User };
};

// Criar sessão
const createSession = (user: User): void => {
  const now = Date.now();
  const expiresIn = 8 * 60 * 60 * 1000; // 8 horas em milissegundos
  
  const session: Session = {
    token: uuidv4(), // Simulação de token JWT
    userId: user.id,
    criadoEm: now,
    expiraEm: now + expiresIn
  };
  
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
  
  // Salvar dados básicos do usuário (sem senha)
  const { senha, ...userWithoutPassword } = user;
  localStorage.setItem(USER_KEY, JSON.stringify(userWithoutPassword));
};

// Verificar sessão
export const checkSession = async (): Promise<{ user: User; valid: boolean } | null> => {
  const sessionJson = localStorage.getItem(SESSION_KEY);
  const userJson = localStorage.getItem(USER_KEY);
  
  if (!sessionJson || !userJson) {
    return null;
  }
  
  const session: Session = JSON.parse(sessionJson);
  const user: User = JSON.parse(userJson);
  
  // Verificar se a sessão expirou
  if (Date.now() > session.expiraEm) {
    logoutUser();
    return null;
  }
  
  return { user, valid: true };
};

// Logout
export const logoutUser = (): void => {
  localStorage.removeItem(SESSION_KEY);
  localStorage.removeItem(USER_KEY);
};
```

### 5. Serviço de Avaliações
```typescript
// evaluationService.ts
import { v4 as uuidv4 } from 'uuid';
import { FichaAnamnese, ResultadoAvaliacao } from '../types/anamnese.types';

interface Avaliacao {
  id: string;
  usuarioId: string;
  fichaAnamnese: FichaAnamnese;
  resultado: ResultadoAvaliacao | null;
  dataCriacao: string;
  dataAtualizacao: string;
}

// Chave para localStorage
const getEvaluationsKey = (userId: string) => `motor_dev_evaluations_${userId}`;

// Obter avaliações do usuário
export const getUserEvaluations = (userId: string): Avaliacao[] => {
  const key = getEvaluationsKey(userId);
  const evaluationsJson = localStorage.getItem(key);
  return evaluationsJson ? JSON.parse(evaluationsJson) : [];
};

// Salvar avaliações do usuário
const saveUserEvaluations = (userId: string, evaluations: Avaliacao[]): void => {
  const key = getEvaluationsKey(userId);
  localStorage.setItem(key, JSON.stringify(evaluations));
};

// Criar nova avaliação
export const createEvaluation = (userId: string, fichaAnamnese: FichaAnamnese, resultado: ResultadoAvaliacao | null = null): Avaliacao => {
  const evaluations = getUserEvaluations(userId);
  
  const now = new Date().toISOString();
  
  const newEvaluation: Avaliacao = {
    id: uuidv4(),
    usuarioId: userId,
    fichaAnamnese,
    resultado,
    dataCriacao: now,
    dataAtualizacao: now
  };
  
  evaluations.push(newEvaluation);
  saveUserEvaluations(userId, evaluations);
  
  return newEvaluation;
};

// Obter avaliação por ID
export const getEvaluationById = (userId: string, evaluationId: string): Avaliacao | undefined => {
  const evaluations = getUserEvaluations(userId);
  return evaluations.find(e => e.id === evaluationId);
};

// Atualizar avaliação
export const updateEvaluation = (userId: string, evaluationId: string, updates: Partial<Avaliacao>): Avaliacao | null => {
  const evaluations = getUserEvaluations(userId);
  const index = evaluations.findIndex(e => e.id === evaluationId);
  
  if (index === -1) {
    return null;
  }
  
  const updatedEvaluation = {
    ...evaluations[index],
    ...updates,
    dataAtualizacao: new Date().toISOString()
  };
  
  evaluations[index] = updatedEvaluation;
  saveUserEvaluations(userId, evaluations);
  
  return updatedEvaluation;
};

// Excluir avaliação
export const deleteEvaluation = (userId: string, evaluationId: string): boolean => {
  const evaluations = getUserEvaluations(userId);
  const filteredEvaluations = evaluations.filter(e => e.id !== evaluationId);
  
  if (filteredEvaluations.length === evaluations.length) {
    return false;
  }
  
  saveUserEvaluations(userId, filteredEvaluations);
  return true;
};
```

### 6. Utilitários de Criptografia
```typescript
// crypto.ts
import bcrypt from 'bcryptjs';

// Hash de senha
export const hashPassword = async (password: string): Promise<string> => {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
};

// Comparar senha com hash
export const comparePasswords = async (password: string, hash: string): Promise<boolean> => {
  return bcrypt.compare(password, hash);
};
```

### 7. Componente de Rota Protegida
```typescript
// ProtectedRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ children }) => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) {
    return <div className="loading">Carregando...</div>;
  }
  
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  
  return <>{children}</>;
};
```

### 8. Tipos para Autenticação
```typescript
// auth.types.ts
export interface User {
  id: string;
  nome: string;
  email: string;
  senha: string;
  profissao: string;
  registro: string;
  dataCadastro: string;
  ultimoAcesso: string;
}

export interface Session {
  token: string;
  userId: string;
  criadoEm: number;
  expiraEm: number;
}
```

## Integração com App.tsx

```typescript
// App.tsx
import { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { ProtectedRoute } from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import Dashboard from './components/Dashboard';
import AnamneseForm from './components/anamnese/AnamneseForm';
import CalculadoraForm from './components/calculadora/CalculadoraForm';
import ResultadoView from './components/calculadora/ResultadoView';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          
          <main className="App-main">
            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              <Route path="/nova-avaliacao" element={
                <ProtectedRoute>
                  <AnamneseForm />
                </ProtectedRoute>
              } />
              
              <Route path="/avaliacao/:id" element={
                <ProtectedRoute>
                  <AnamneseForm />
                </ProtectedRoute>
              } />
              
              <Route path="/calculadora/:id" element={
                <ProtectedRoute>
                  <CalculadoraForm />
                </ProtectedRoute>
              } />
              
              <Route path="/resultado/:id" element={
                <ProtectedRoute>
                  <ResultadoView />
                </ProtectedRoute>
              } />
              
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
            </Routes>
          </main>
          
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
```

## Considerações de Implementação

1. **Dependências Adicionais**
   - Instalar bcryptjs para hash de senhas
   - Instalar uuid para geração de IDs
   - Instalar react-router-dom para roteamento

2. **Migração de Dados**
   - Implementar função para migrar avaliações existentes
   - Associar avaliações ao usuário após login

3. **Testes**
   - Testar fluxo completo de autenticação
   - Verificar persistência de sessão
   - Validar proteção de rotas

4. **Próximos Passos**
   - Implementar componentes de interface
   - Integrar serviços com componentes
   - Validar segurança e usabilidade
