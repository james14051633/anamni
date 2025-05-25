import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import ProtectedRoute from './components/auth/ProtectedRoute';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Header from './components/layout/Header';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="App">
          <Header />
          
          <main className="App-main">
            <Routes>
              {/* Rotas de autenticação */}
              <Route path="/login" element={<Login />} />
              <Route path="/cadastro" element={<Register />} />
              
              {/* Rotas protegidas */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />
              
              {/* Redirecionar raiz para dashboard ou login */}
              <Route path="/" element={<Navigate to="/dashboard" replace />} />
              
              {/* Manter rotas existentes da calculadora, agora protegidas */}
              <Route path="/nova-avaliacao" element={
                <ProtectedRoute>
                  {/* Componente existente da anamnese */}
                  <div>Formulário de Anamnese</div>
                </ProtectedRoute>
              } />
              
              <Route path="/avaliacao/:id" element={
                <ProtectedRoute>
                  {/* Componente existente de visualização */}
                  <div>Visualização de Avaliação</div>
                </ProtectedRoute>
              } />
              
              <Route path="/calculadora/:id" element={
                <ProtectedRoute>
                  {/* Componente existente da calculadora */}
                  <div>Calculadora de Desenvolvimento</div>
                </ProtectedRoute>
              } />
              
              <Route path="/resultado/:id" element={
                <ProtectedRoute>
                  {/* Componente existente de resultado */}
                  <div>Resultado da Avaliação</div>
                </ProtectedRoute>
              } />
            </Routes>
          </main>
          
          <footer className="App-footer">
            <p>Baseado em escalas e marcos de desenvolvimento reconhecidos cientificamente.</p>
            <p>© 2025 Calculadora de Desenvolvimento Motor</p>
          </footer>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
