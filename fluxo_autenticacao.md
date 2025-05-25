# Fluxo de Autenticação e Níveis de Acesso

## Visão Geral
Este documento define o fluxo de autenticação e os níveis de acesso para a Calculadora de Desenvolvimento Motor com Anamnese Integrada.

## Fluxo de Autenticação

### 1. Acesso Inicial
- Ao acessar a aplicação, o usuário é redirecionado para a tela de login
- Verificação de sessão ativa no localStorage
- Se sessão válida, redirecionar para dashboard
- Se sessão inválida ou inexistente, exibir tela de login

### 2. Tela de Login
- Campos para email/usuário e senha
- Botão de login
- Link para cadastro de novo usuário
- Link para recuperação de senha (opcional na primeira versão)

### 3. Cadastro de Novo Usuário
- Formulário com campos:
  - Nome completo
  - Email (será o usuário)
  - Senha (com confirmação)
  - Profissão/Especialidade
  - Número de registro profissional (CRM, CREFITO, etc.)
- Validação de todos os campos
- Armazenamento seguro no localStorage

### 4. Processo de Autenticação
- Validação de credenciais contra dados armazenados
- Em caso de sucesso:
  - Criar token de sessão (JWT simulado)
  - Armazenar token no localStorage
  - Registrar timestamp de login
  - Redirecionar para dashboard
- Em caso de falha:
  - Exibir mensagem de erro
  - Permitir nova tentativa
  - Após 3 tentativas, sugerir recuperação de senha

### 5. Sessão e Logout
- Timeout de sessão após 8 horas ou inatividade de 30 minutos
- Botão de logout no cabeçalho da aplicação
- Ao fazer logout:
  - Remover token de sessão
  - Redirecionar para tela de login

## Níveis de Acesso

### 1. Usuário Padrão (Profissional)
- Acesso a todas as funcionalidades da calculadora
- Gerenciamento de seus próprios pacientes
- Visualização e edição apenas de avaliações criadas pelo próprio usuário
- Edição do próprio perfil

### 2. Administrador (Opcional para Versão Futura)
- Todas as permissões do Usuário Padrão
- Gerenciamento de usuários
- Visualização de estatísticas de uso
- Configurações do sistema

## Estrutura de Dados de Usuário

```typescript
interface Usuario {
  id: string;           // UUID gerado na criação
  nome: string;         // Nome completo
  email: string;        // Email/login
  senha: string;        // Hash da senha
  profissao: string;    // Profissão/especialidade
  registro: string;     // Número de registro profissional
  dataCadastro: string; // Data de criação da conta
  ultimoAcesso: string; // Data do último acesso
}

interface Sessao {
  token: string;        // Token JWT simulado
  userId: string;       // ID do usuário
  criadoEm: number;     // Timestamp de criação
  expiraEm: number;     // Timestamp de expiração
}
```

## Integração com Avaliações Existentes

### 1. Estrutura de Dados Atualizada
```typescript
interface Avaliacao {
  id: string;                 // UUID da avaliação
  usuarioId: string;          // ID do usuário que criou
  fichaAnamnese: FichaAnamnese;
  resultado: ResultadoAvaliacao;
  dataCriacao: string;        // Data de criação
  dataAtualizacao: string;    // Data da última atualização
}
```

### 2. Listagem de Avaliações
- Dashboard exibe apenas avaliações do usuário logado
- Ordenação por data (mais recentes primeiro)
- Filtros por nome do paciente, idade, classificação

### 3. Compartilhamento (Versão Futura)
- Opção para compartilhar avaliação com outro usuário
- Envio por email com link temporário
- Permissões de visualização ou edição

## Proteção de Rotas

### 1. Componente de Autenticação
- HOC (Higher Order Component) para proteger rotas
- Verificação de token válido antes de renderizar componentes
- Redirecionamento para login se não autenticado

### 2. Estrutura de Rotas
```
/login                 - Tela de login
/cadastro              - Cadastro de novo usuário
/recuperar-senha       - Recuperação de senha (futuro)
/dashboard             - Listagem de avaliações do usuário
/perfil                - Edição de perfil do usuário
/nova-avaliacao        - Iniciar nova avaliação
/avaliacao/:id         - Visualizar/editar avaliação específica
/admin/*               - Rotas de administração (futuro)
```

## Considerações de Segurança

### 1. Armazenamento de Senhas
- Utilizar bcryptjs para hash de senhas no cliente
- Armazenar apenas o hash, nunca a senha em texto plano
- Adicionar salt único para cada usuário

### 2. Proteção de Dados
- Criptografar dados sensíveis no localStorage
- Limitar tentativas de login
- Validar força da senha no cadastro

### 3. Limitações
- Segurança client-side tem limitações inerentes
- Alertar usuários sobre essas limitações
- Recomendar não armazenar dados altamente sensíveis

## Implementação Técnica

### 1. Gerenciamento de Estado
- Contexto de autenticação (AuthContext)
- Provedor de autenticação envolvendo a aplicação
- Hook personalizado (useAuth) para acesso ao contexto

### 2. Serviços de Autenticação
- Funções para login, logout, verificação de sessão
- Funções para cadastro e atualização de usuário
- Funções para gerenciamento de avaliações por usuário

### 3. Persistência
- Utilizar localStorage com chaves específicas:
  - `auth_token`: Token de sessão
  - `auth_user`: Dados básicos do usuário logado
  - `users`: Lista de usuários cadastrados
  - `evaluations_[userId]`: Avaliações do usuário
