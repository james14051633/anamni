# Documentação da Calculadora de Desenvolvimento Motor com Anamnese Integrada

## Visão Geral
A Calculadora de Desenvolvimento Motor com Anamnese Integrada é uma aplicação web completa que permite avaliar o desenvolvimento psicomotor da criança com base em marcos científicos, além de registrar dados detalhados do paciente através de uma ficha de anamnese estruturada.

## Funcionalidades Principais

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

### Recursos Adicionais
- Salvamento local das avaliações
- Exportação de relatórios completos
- Interface responsiva para uso em qualquer dispositivo

## Como Utilizar

### 1. Iniciar Nova Avaliação
- Acesse a aplicação através do link fornecido
- Na tela inicial, clique em "Nova Avaliação"

### 2. Preencher Ficha de Anamnese
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

### 3. Realizar Avaliação Motora
- Após preencher a anamnese, a aplicação pré-carrega os dados relevantes para a calculadora
- Confirme a idade atual e ajuste para prematuridade (se aplicável)
- Selecione os marcos motores que a criança já alcançou

### 4. Visualizar Resultados
- Percentual de desenvolvimento
- Classificação
- Idade equivalente de desenvolvimento
- Recomendações personalizadas

### 5. Salvar e Exportar
- Salve a avaliação localmente para consultas futuras
- Exporte o relatório completo (anamnese + avaliação) em formato texto

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

## Algoritmo de Cálculo
A calculadora utiliza o seguinte algoritmo para avaliar o desenvolvimento motor:

1. **Identificação da faixa etária**: Com base na idade informada, o sistema identifica a faixa etária correspondente nos dados de referência.

2. **Comparação com marcos esperados**: O sistema compara os marcos motores alcançados pela criança com os marcos esperados para sua faixa etária.

3. **Cálculo do percentual de desenvolvimento**:
   ```
   Percentual = (Número de marcos alcançados / Número total de marcos esperados para a idade) * 100
   ```

4. **Ajuste para prematuridade** (quando aplicável):
   Para crianças nascidas prematuras (antes de 37 semanas), a idade é ajustada subtraindo o número de semanas de prematuridade até os 24 meses de idade corrigida.

5. **Classificação do desenvolvimento**:
   - **Desenvolvimento adequado**: ≥ 90% dos marcos esperados para a idade
   - **Desenvolvimento em alerta**: Entre 75% e 89% dos marcos esperados
   - **Possível atraso no desenvolvimento**: < 75% dos marcos esperados

## Privacidade e Segurança
- Todos os dados são processados localmente no navegador
- Nenhuma informação é enviada a servidores externos
- As avaliações salvas ficam armazenadas apenas no dispositivo do usuário
- Opção para limpar todos os dados armazenados

## Limitações e Avisos
- Esta calculadora é uma ferramenta de triagem e não substitui a avaliação de um profissional de saúde.
- Consulte sempre um pediatra, fisioterapeuta ou terapeuta ocupacional para avaliações detalhadas.
- O desenvolvimento infantil apresenta variabilidade normal, e alguns atrasos podem ser temporários.
- Os resultados devem ser interpretados considerando o contexto individual de cada criança.

## Tecnologias Utilizadas
- Frontend: React, TypeScript
- Estilização: CSS personalizado
- Armazenamento: localStorage do navegador
- Dados: Estruturados em formato JSON

## Suporte e Contato
Para sugestões, dúvidas ou problemas técnicos, entre em contato através do formulário disponível na aplicação ou pelo email de suporte fornecido.
