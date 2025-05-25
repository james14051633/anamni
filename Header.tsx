import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import { Link } from 'react-router-dom';
import '../../components/auth/Auth.css';

const Header: React.FC = () => {
  const { isAuthenticated, user, logout } = useAuth();
  
  const handleLogout = () => {
    logout();
  };
  
  const getInitials = (name: string) => {
    return name
      .split(' ')
      .map(part => part[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };
  
  return (
    <header className="App-header">
      <div className="header-content">
        <h1>
          <Link to="/" className="header-logo">
            Calculadora de Desenvolvimento Motor
          </Link>
        </h1>
        
        {isAuthenticated && user && (
          <div className="header-user">
            <div className="user-avatar">
              {getInitials(user.nome)}
            </div>
            <div className="user-info">
              <span className="user-name">{user.nome}</span>
              <span className="user-role">{user.profissao}</span>
            </div>
            <button onClick={handleLogout} className="logout-button">
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;
