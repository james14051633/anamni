# Estrutura da Ficha de Anamnese Integrada à Calculadora de Desenvolvimento Motor

## Campos Obrigatórios e Fluxo Integrado

Com base na análise dos modelos de ficha de anamnese pediátrica e formulários de avaliação do desenvolvimento infantil, defini a seguinte estrutura para integração com a calculadora:

### 1. Dados de Identificação (Obrigatórios)
- Nome completo do paciente
- Data de nascimento
- Sexo
- Nome dos pais/responsáveis
- Contato (telefone/email)
- Data da avaliação

### 2. Histórico Gestacional e de Nascimento
**Obrigatórios:**
- Duração da gestação (semanas)
- Tipo de parto (normal, cesárea, fórceps)
- Peso ao nascer

**Opcionais:**
- Intercorrências durante a gestação (lista de opções + campo livre)
- Comprimento ao nascer
- Perímetro cefálico
- Apgar (1º e 5º minuto)
- Necessidade de UTI neonatal
- Tempo de internação após nascimento

### 3. Histórico de Desenvolvimento
**Obrigatórios:**
- Idade em que sustentou a cabeça
- Idade em que sentou sem apoio
- Idade em que engatinhou
- Idade em que andou sem apoio

**Opcionais:**
- Idade das primeiras palavras
- Outras habilidades relevantes já adquiridas

### 4. Condições de Saúde
**Obrigatórios:**
- Doenças diagnosticadas (sim/não + campo para especificar)
- Medicamentos em uso (sim/não + campo para especificar)

**Opcionais:**
- Alergias
- Cirurgias realizadas
- Internações prévias
- Histórico familiar relevante

### 5. Avaliação Atual
**Obrigatórios:**
- Queixa principal
- Motivo da avaliação

**Opcionais:**
- Profissionais que acompanham a criança
- Terapias em andamento

### 6. Observações Clínicas
- Campo para registro de observações adicionais (opcional)

## Fluxo de Integração com a Calculadora

1. **Tela Inicial**
   - Apresentação da calculadora integrada
   - Opções: "Nova Avaliação" ou "Carregar Avaliação Anterior"

2. **Ficha de Anamnese (Etapa 1)**
   - Preenchimento dos dados de identificação
   - Navegação para próxima etapa

3. **Ficha de Anamnese (Etapa 2)**
   - Preenchimento do histórico gestacional e de nascimento
   - Navegação para próxima etapa

4. **Ficha de Anamnese (Etapa 3)**
   - Preenchimento do histórico de desenvolvimento e condições de saúde
   - Navegação para próxima etapa

5. **Ficha de Anamnese (Etapa 4)**
   - Preenchimento da avaliação atual e observações clínicas
   - Navegação para a calculadora de desenvolvimento motor

6. **Calculadora de Desenvolvimento Motor**
   - Preenchimento da idade atual
   - Ajuste para prematuridade (já preenchido com dados da anamnese)
   - Seleção dos marcos motores alcançados

7. **Resultados da Avaliação**
   - Exibição dos resultados da calculadora
   - Opção para visualizar relatório completo (anamnese + avaliação)
   - Opções para salvar/imprimir/compartilhar

## Considerações Técnicas

1. **Armazenamento de Dados**
   - Utilizar armazenamento local (localStorage) para dados temporários
   - Opção para exportar dados em formato PDF
   - Nenhum dado pessoal enviado a servidores

2. **Validação de Campos**
   - Validação em tempo real para campos obrigatórios
   - Alertas visuais para campos incompletos
   - Prevenção de avanço sem preenchimento dos campos obrigatórios

3. **Acessibilidade e Responsividade**
   - Interface adaptável a diferentes dispositivos
   - Contraste adequado para leitura
   - Suporte a navegação por teclado

4. **Privacidade e Segurança**
   - Aviso claro sobre armazenamento local de dados
   - Opção para limpar todos os dados armazenados
   - Sem compartilhamento de informações com terceiros
