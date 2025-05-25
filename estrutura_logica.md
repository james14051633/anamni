# Estrutura e Lógica da Calculadora de Desenvolvimento Motor

## Visão Geral
Este documento descreve a estrutura e lógica da calculadora de desenvolvimento motor infantil, que avaliará a evolução psicomotora da criança em relação à sua idade cronológica, baseada no desenvolvimento motor global.

## Parâmetros de Entrada
1. **Idade da criança**: em meses ou anos (convertida internamente para meses)
2. **Marcos motores alcançados**: lista de habilidades motoras que a criança já consegue realizar
3. **Informações adicionais**: prematuridade, condições especiais de saúde (opcional)

## Algoritmo de Cálculo
A calculadora utilizará o seguinte algoritmo para avaliar o desenvolvimento motor:

1. **Identificação da faixa etária**: Com base na idade informada, o sistema identificará a faixa etária correspondente nos dados de referência.

2. **Comparação com marcos esperados**: O sistema comparará os marcos motores alcançados pela criança com os marcos esperados para sua faixa etária.

3. **Cálculo do percentual de desenvolvimento**:
   ```
   Percentual = (Número de marcos alcançados / Número total de marcos esperados para a idade) * 100
   ```

4. **Ajuste para prematuridade** (quando aplicável):
   Para crianças nascidas prematuras (antes de 37 semanas), a idade será ajustada subtraindo o número de semanas de prematuridade até os 24 meses de idade corrigida.
   ```
   Idade corrigida = Idade cronológica - (40 - Idade gestacional em semanas) / 4
   ```

5. **Classificação do desenvolvimento**:
   - **Desenvolvimento adequado**: ≥ 90% dos marcos esperados para a idade
   - **Desenvolvimento em alerta**: Entre 75% e 89% dos marcos esperados
   - **Possível atraso no desenvolvimento**: < 75% dos marcos esperados

6. **Cálculo da idade equivalente de desenvolvimento**:
   Com base nos marcos alcançados, o sistema estimará a idade equivalente de desenvolvimento motor.
   ```
   Idade equivalente = Idade da faixa etária cujos marcos mais se aproximam dos alcançados pela criança
   ```

## Fluxo da Aplicação

1. **Tela inicial**:
   - Apresentação da calculadora
   - Botão para iniciar avaliação

2. **Formulário de entrada**:
   - Campo para idade da criança (meses/anos)
   - Opção para indicar prematuridade (sim/não)
   - Se sim, campo para idade gestacional ao nascimento

3. **Seleção de marcos motores**:
   - Lista de marcos motores relevantes para a faixa etária
   - Opção de marcar os que a criança já alcançou

4. **Processamento**:
   - Aplicação do algoritmo de cálculo
   - Geração dos resultados

5. **Exibição de resultados**:
   - Percentual de desenvolvimento
   - Classificação (adequado, alerta, possível atraso)
   - Idade equivalente de desenvolvimento motor
   - Gráfico comparativo entre desenvolvimento esperado e atual
   - Recomendações gerais baseadas no resultado

6. **Opções pós-resultado**:
   - Imprimir/salvar resultado
   - Reiniciar avaliação
   - Acessar informações adicionais sobre desenvolvimento infantil

## Visualização dos Resultados

1. **Gráfico de barras**: Comparando o desenvolvimento esperado vs. alcançado
2. **Indicador visual**: Mostrando a classificação do desenvolvimento (verde, amarelo, vermelho)
3. **Tabela de marcos**: Destacando os marcos alcançados e os próximos esperados

## Considerações Técnicas

1. **Armazenamento de dados**:
   - Todos os cálculos serão realizados no frontend
   - Nenhum dado pessoal será armazenado em servidor
   - Opção de salvar resultados localmente (PDF/impressão)

2. **Responsividade**:
   - Interface adaptável a diferentes dispositivos (desktop, tablet, smartphone)
   - Layout otimizado para uso em consultórios e por pais/responsáveis

3. **Acessibilidade**:
   - Contraste adequado
   - Textos claros e objetivos
   - Compatibilidade com leitores de tela

## Limitações e Avisos

A calculadora incluirá avisos claros sobre:
- Não substituir avaliação profissional
- Servir como ferramenta de triagem e acompanhamento
- Necessidade de consultar profissionais de saúde em caso de preocupações
- Variabilidade normal do desenvolvimento infantil
