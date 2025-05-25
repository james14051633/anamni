import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../components/auth/Auth.css';

const Dashboard: React.FC = () => {
  const navigate = useNavigate();
  
  // Simulação de avaliações para demonstração
  const evaluations = [
    {
      id: '1',
      paciente: 'Maria Silva',
      idade: '3 anos',
      dataAvaliacao: '20/05/2025',
      status: 'completo',
      resultado: 'Desenvolvimento adequado'
    },
    {
      id: '2',
      paciente: 'João Santos',
      idade: '18 meses',
      dataAvaliacao: '22/05/2025',
      status: 'completo',
      resultado: 'Desenvolvimento em alerta'
    },
    {
      id: '3',
      paciente: 'Ana Oliveira',
      idade: '8 meses',
      dataAvaliacao: '24/05/2025',
      status: 'incompleto',
      resultado: null
    }
  ];
  
  const handleNewEvaluation = () => {
    navigate('/nova-avaliacao');
  };
  
  const handleViewEvaluation = (id: string) => {
    navigate(`/avaliacao/${id}`);
  };
  
  const handleContinueEvaluation = (id: string) => {
    navigate(`/calculadora/${id}`);
  };
  
  return (
    <div className="dashboard-container">
      <div className="dashboard-header">
        <h2 className="dashboard-title">Meus Pacientes</h2>
        <div className="dashboard-actions">
          <button onClick={handleNewEvaluation} className="btn-primary">
            Nova Avaliação
          </button>
        </div>
      </div>
      
      {evaluations.length === 0 ? (
        <div className="dashboard-empty">
          <h3>Nenhuma avaliação encontrada</h3>
          <p>Comece criando uma nova avaliação para seu paciente.</p>
          <button onClick={handleNewEvaluation} className="btn-primary">
            Nova Avaliação
          </button>
        </div>
      ) : (
        <div className="evaluations-list">
          {evaluations.map((evaluation) => (
            <div key={evaluation.id} className="evaluation-card">
              <span className={`evaluation-status ${evaluation.status === 'completo' ? 'status-complete' : 'status-incomplete'}`}>
                {evaluation.status === 'completo' ? 'Completo' : 'Em andamento'}
              </span>
              
              <h3>{evaluation.paciente}</h3>
              
              <div className="evaluation-info">
                <p><strong>Idade:</strong> {evaluation.idade}</p>
                <p><strong>Data:</strong> {evaluation.dataAvaliacao}</p>
                {evaluation.resultado && (
                  <p><strong>Resultado:</strong> {evaluation.resultado}</p>
                )}
              </div>
              
              <div className="evaluation-actions">
                {evaluation.status === 'completo' ? (
                  <button 
                    onClick={() => handleViewEvaluation(evaluation.id)}
                    className="btn-secondary"
                  >
                    Ver Detalhes
                  </button>
                ) : (
                  <button 
                    onClick={() => handleContinueEvaluation(evaluation.id)}
                    className="btn-primary"
                  >
                    Continuar
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
