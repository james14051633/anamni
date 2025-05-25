# Documentação da Calculadora de Desenvolvimento Motor Infantil

## Visão Geral
A Calculadora de Desenvolvimento Motor Infantil é uma aplicação web interativa que permite avaliar o desenvolvimento psicomotor da criança com base em marcos científicos por faixa etária, comparando a evolução motora em relação à idade cronológica.

## Funcionalidades Principais
- Avaliação do desenvolvimento motor por idade (de 0 a 5 anos)
- Ajuste para prematuridade
- Comparação com marcos motores esperados por faixa etária
- Cálculo de percentual de desenvolvimento
- Classificação (adequado, alerta, possível atraso)
- Recomendações personalizadas

## Como Utilizar
1. Acesse a aplicação através do link fornecido
2. Na tela inicial, clique em "Iniciar Avaliação"
3. Preencha as informações da criança:
   - Idade (em meses ou anos)
   - Indique se houve nascimento prematuro
   - Se prematuro, informe a idade gestacional ao nascimento
4. Selecione os marcos motores que a criança já alcançou
5. Visualize o resultado da avaliação, incluindo:
   - Percentual de desenvolvimento
   - Classificação
   - Idade equivalente de desenvolvimento
   - Recomendações

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

## Limitações e Avisos
- Esta calculadora é uma ferramenta de triagem e não substitui a avaliação de um profissional de saúde.
- Consulte sempre um pediatra, fisioterapeuta ou terapeuta ocupacional para avaliações detalhadas.
- O desenvolvimento infantil apresenta variabilidade normal, e alguns atrasos podem ser temporários.
- Os resultados devem ser interpretados considerando o contexto individual de cada criança.

## Tecnologias Utilizadas
- Frontend: React, TypeScript
- Estilização: CSS personalizado
- Dados: Estruturados em formato JSON

## Estrutura do Projeto
- `/app`: Código-fonte da aplicação React
- `/dados`: Arquivos JSON com marcos motores e critérios
- `/docs`: Documentação técnica e fluxogramas
- `/referencias`: Referências científicas utilizadas
