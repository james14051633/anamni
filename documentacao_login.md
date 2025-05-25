# Documentação da Calculadora de Desenvolvimento Motor com Anamnese e Login

## Visão Geral
A Calculadora de Desenvolvimento Motor com Anamnese e Login é uma aplicação web completa que permite avaliar o desenvolvimento psicomotor da criança com base em marcos científicos, registrar dados detalhados do paciente através de uma ficha de anamnese estruturada, e proteger essas informações através de um sistema de autenticação.

## Funcionalidades Principais

### Sistema de Autenticação
- Login com email e senha
- Cadastro de novos usuários
- Persistência de sessão
- Proteção de rotas
- Logout seguro

### Ficha de Anamnese
- Registro completo de dados de identificação do paciente
- Histórico gestacional e de nascimento
- Histórico de desenvolvimento motor
- Condições de saúde e medicamentos
- Queixas e motivos da avaliação

### Calculadora de Desenvolvimento Motor
- Avaliação do desenvolvimento motor por idade (de 0 a 5 anos)
- Ajuste automático para prematuridade
- Comparação com marcos motores esperados por faixa etária
- Cálculo de percentual de desenvolvimento
- Classificação (adequado, alerta, possível atraso)
- Recomendações personalizadas

### Dashboard e Gerenciamento
- Visualização de avaliações associadas ao usuário logado
- Filtros e ordenação de pacientes
- Acesso rápido a avaliações recentes
- Indicação visual de status das avaliações

## Como Utilizar

### 1. Autenticação
- Acesse a aplicação através do link fornecido
- Na tela de login, insira suas credenciais ou clique em "Cadastre-se"
- Para cadastro, preencha todos os campos obrigatórios:
  - Nome completo
  - Email (será seu usuário)
  - Senha (mínimo 6 caracteres)
  - Profissão/Especialidade
  - Número de registro profissional

### 2. Dashboard
- Após autenticação, você será redirecionado ao dashboard
- Visualize todas as suas avaliações anteriores
- Clique em "Nova Avaliação" para iniciar uma nova ficha

### 3. Preencher Ficha de Anamnese
A ficha de anamnese está dividida em 4 etapas:

**Etapa 1: Dados de Identificação**
- Nome completo do paciente
- Data de nascimento
- Sexo
- Nome dos pais/responsáveis
- Contato (telefone/email)
- Data da avaliação

**Etapa 2: Histórico Gestacional e de Nascimento**
- Duração da gestação (semanas)
- Tipo de parto
- Peso ao nascer
- Intercorrências durante a gestação (opcional)
- Outros dados perinatais (opcional)

**Etapa 3: Histórico de Desenvolvimento e Condições de Saúde**
- Idade em que alcançou marcos motores importantes
- Doenças diagnosticadas
- Medicamentos em uso
- Outras informações de saúde (opcional)

**Etapa 4: Avaliação Atual**
- Queixa principal
- Motivo da avaliação
- Profissionais que acompanham a criança (opcional)
- Observações clínicas (opcional)

### 4. Realizar Avaliação Motora
- Após preencher a anamnese, a aplicação pré-carrega os dados relevantes para a calculadora
- Confirme a idade atual e ajuste para prematuridade (se aplicável)
- Selecione os marcos motores que a criança já alcançou

### 5. Visualizar Resultados
- Percentual de desenvolvimento
- Classificação
- Idade equivalente de desenvolvimento
- Recomendações personalizadas

### 6. Gerenciar Avaliações
- Retorne ao dashboard para visualizar todas as suas avaliações
- Filtre por nome, data ou status
- Acesse avaliações anteriores para consulta ou continuação

### 7. Segurança e Logout
- Suas sessões permanecem ativas por 8 horas
- Clique em "Sair" no cabeçalho para fazer logout
- Por segurança, faça logout ao usar dispositivos compartilhados

## Segurança e Privacidade

### Armazenamento de Dados
- Todos os dados são processados localmente no navegador
- Senhas são armazenadas com hash seguro (bcrypt)
- Avaliações são associadas apenas ao usuário que as criou
- Sessões expiram automaticamente após período de inatividade

### Limitações da Versão Atual
- Autenticação client-side (sem backend dedicado)
- Dados armazenados localmente no dispositivo
- Não há sincronização entre dispositivos diferentes

## Base Científica
A calculadora foi desenvolvida com base em escalas e referências científicas reconhecidas:
- Escala Motora Infantil de Alberta (AIMS) - 0 a 18 meses
- Escala de Desenvolvimento Motor (EDM) - 2 a 11 anos
- Teste de Triagem do Desenvolvimento Denver II - 0 a 6 anos
- Escala de Desenvolvimento Infantil Bayley II - 2 meses a 3 anos
- Escala de Desenvolvimento Motor de Peabody (PDMS) - 0 a 5 anos
- Test of Gross Motor Development (TGMD) - 3 a 10 anos
- Movement Assessment Battery for Children (MABC) - 3 a 16 anos
- Referências da Sociedade Brasileira de Pediatria
- Referências do CDC (Centers for Disease Control and Prevention)

## Considerações Técnicas

### Tecnologias Utilizadas
- Frontend: React, TypeScript
- Autenticação: JWT simulado, bcrypt para hash de senhas
- Armazenamento: localStorage do navegador
- Estilização: CSS personalizado
- Dados: Estruturados em formato JSON

### Requisitos do Sistema
- Navegador web moderno (Chrome, Firefox, Safari, Edge)
- JavaScript habilitado
- Conexão com internet para acesso inicial

## Avisos Importantes
- Esta calculadora é uma ferramenta de triagem e não substitui a avaliação de um profissional de saúde.
- Consulte sempre um pediatra, fisioterapeuta ou terapeuta ocupacional para avaliações detalhadas.
- O desenvolvimento infantil apresenta variabilidade normal, e alguns atrasos podem ser temporários.
- Os resultados devem ser interpretados considerando o contexto individual de cada criança.
- Por limitações técnicas, os dados são armazenados apenas no dispositivo atual.

## Suporte e Contato
Para sugestões, dúvidas ou problemas técnicos, entre em contato através do formulário disponível na aplicação ou pelo email de suporte fornecido.
