import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';
import './Auth.css';

const Register: React.FC = () => {
  const [formData, setFormData] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmSenha: '',
    profissao: '',
    registro: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  
  const { register, error } = useAuth();
  const navigate = useNavigate();
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const validateForm = () => {
    if (!formData.nome || !formData.email || !formData.senha || !formData.profissao || !formData.registro) {
      setErrorMessage('Por favor, preencha todos os campos obrigatórios');
      return false;
    }
    
    if (formData.senha !== formData.confirmSenha) {
      setErrorMessage('As senhas não coincidem');
      return false;
    }
    
    if (formData.senha.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres');
      return false;
    }
    
    return true;
  };
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }
    
    setIsSubmitting(true);
    setErrorMessage('');
    
    try {
      const { confirmSenha, ...userData } = formData;
      const success = await register(userData);
      
      if (success) {
        navigate('/dashboard');
      } else {
        setErrorMessage(error || 'Falha no cadastro');
      }
    } catch (err) {
      setErrorMessage('Ocorreu um erro durante o cadastro');
    } finally {
      setIsSubmitting(false);
    }
  };
  
  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Cadastro</h2>
        <p className="auth-subtitle">Crie sua conta para começar</p>
        
        {errorMessage && (
          <div className="auth-error">
            {errorMessage}
          </div>
        )}
        
        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nome">Nome completo *</label>
            <input
              type="text"
              id="nome"
              name="nome"
              value={formData.nome}
              onChange={handleChange}
              placeholder="Seu nome completo"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="email">Email *</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Seu email"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="senha">Senha *</label>
            <input
              type="password"
              id="senha"
              name="senha"
              value={formData.senha}
              onChange={handleChange}
              placeholder="Sua senha"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="confirmSenha">Confirmar senha *</label>
            <input
              type="password"
              id="confirmSenha"
              name="confirmSenha"
              value={formData.confirmSenha}
              onChange={handleChange}
              placeholder="Confirme sua senha"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="profissao">Profissão/Especialidade *</label>
            <input
              type="text"
              id="profissao"
              name="profissao"
              value={formData.profissao}
              onChange={handleChange}
              placeholder="Sua profissão ou especialidade"
              disabled={isSubmitting}
              required
            />
          </div>
          
          <div className="form-group">
            <label htmlFor="registro">Número de registro profissional *</label>
            <input
              type="text"
              id="registro"
              name="registro"
              value={formData.registro}
              onChange={handleChange}
              placeholder="CRM, CREFITO, etc."
              disabled={isSubmitting}
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="btn-primary auth-button"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Cadastrando...' : 'Cadastrar'}
          </button>
        </form>
        
        <div className="auth-links">
          <p>
            Já tem uma conta? <Link to="/login">Faça login</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
