# Atualização da Estrutura e Lógica da Aplicação

## Visão Geral
Este documento descreve as atualizações necessárias na estrutura e lógica da aplicação para integrar a ficha de anamnese detalhada à calculadora de desenvolvimento motor infantil.

## Modelo de Dados Atualizado

### 1. Estrutura de Dados da Anamnese
```typescript
interface DadosIdentificacao {
  nome: string;
  dataNascimento: string;
  sexo: 'masculino' | 'feminino';
  nomePais: string;
  contato: string;
  dataAvaliacao: string;
}

interface HistoricoGestacional {
  duracaoGestacao: number;
  tipoParto: 'normal' | 'cesarea' | 'forceps';
  pesoNascer: number;
  intercorrencias?: string;
  comprimentoNascer?: number;
  perimetroCefalico?: number;
  apgar1?: number;
  apgar5?: number;
  necessidadeUTI?: boolean;
  tempoInternacao?: number;
}

interface HistoricoDesenvolvimento {
  idadeSustentouCabeca: number;
  idadeSentouSemApoio: number;
  idadeEngatinhou: number;
  idadeAndouSemApoio: number;
  idadePrimeirasPalavras?: number;
  outrasHabilidades?: string;
}

interface CondicoesSaude {
  doencasDiagnosticadas: boolean;
  quaisDoencas?: string;
  medicamentosEmUso: boolean;
  quaisMedicamentos?: string;
  alergias?: string;
  cirurgiasRealizadas?: string;
  internacoesPrevias?: string;
  historicoFamiliar?: string;
}

interface AvaliacaoAtual {
  queixaPrincipal: string;
  motivoAvaliacao: string;
  profissionaisAcompanhamento?: string;
  terapiasAndamento?: string;
  observacoesClinicas?: string;
}

interface FichaAnamnese {
  dadosIdentificacao: DadosIdentificacao;
  historicoGestacional: HistoricoGestacional;
  historicoDesenvolvimento: HistoricoDesenvolvimento;
  condicoesSaude: CondicoesSaude;
  avaliacaoAtual: AvaliacaoAtual;
}
```

### 2. Integração com a Estrutura Existente
```typescript
interface AppState {
  etapa: 'inicio' | 'anamnese-1' | 'anamnese-2' | 'anamnese-3' | 'anamnese-4' | 'calculadora' | 'marcos' | 'resultado';
  fichaAnamnese: FichaAnamnese;
  formData: FormData; // Estrutura existente da calculadora
  marcosAlcancados: string[];
  marcosDisponiveis: string[];
  resultado: ResultadoAvaliacao | null;
}
```

## Fluxo de Navegação Atualizado

1. **Tela Inicial** (`etapa: 'inicio'`)
   - Apresentação da calculadora integrada
   - Botões: "Nova Avaliação" ou "Carregar Avaliação Anterior"

2. **Anamnese - Dados de Identificação** (`etapa: 'anamnese-1'`)
   - Formulário para dados pessoais
   - Botões: "Voltar" e "Continuar"

3. **Anamnese - Histórico Gestacional** (`etapa: 'anamnese-2'`)
   - Formulário para histórico gestacional e de nascimento
   - Botões: "Voltar" e "Continuar"

4. **Anamnese - Desenvolvimento e Saúde** (`etapa: 'anamnese-3'`)
   - Formulário para histórico de desenvolvimento e condições de saúde
   - Botões: "Voltar" e "Continuar"

5. **Anamnese - Avaliação Atual** (`etapa: 'anamnese-4'`)
   - Formulário para avaliação atual e observações
   - Botões: "Voltar" e "Continuar para Avaliação Motora"

6. **Calculadora - Informações da Criança** (`etapa: 'calculadora'`)
   - Formulário para idade atual (pré-preenchido com dados da anamnese)
   - Ajuste para prematuridade (pré-preenchido com dados da anamnese)
   - Botões: "Voltar" e "Continuar"

7. **Calculadora - Marcos Motores** (`etapa: 'marcos'`)
   - Seleção dos marcos motores alcançados
   - Botões: "Voltar" e "Ver Resultado"

8. **Resultado da Avaliação** (`etapa: 'resultado'`)
   - Exibição dos resultados da calculadora
   - Opção para visualizar relatório completo
   - Botões: "Voltar", "Nova Avaliação", "Salvar/Imprimir"

## Funções Principais Atualizadas

### 1. Gerenciamento de Estado
```typescript
// Estado inicial
const [state, setState] = useState<AppState>({
  etapa: 'inicio',
  fichaAnamnese: {
    dadosIdentificacao: { /* valores iniciais */ },
    historicoGestacional: { /* valores iniciais */ },
    historicoDesenvolvimento: { /* valores iniciais */ },
    condicoesSaude: { /* valores iniciais */ },
    avaliacaoAtual: { /* valores iniciais */ }
  },
  formData: { /* valores iniciais da calculadora */ },
  marcosAlcancados: [],
  marcosDisponiveis: [],
  resultado: null
});
```

### 2. Navegação Entre Etapas
```typescript
const avancarEtapa = () => {
  switch (state.etapa) {
    case 'inicio':
      setState({ ...state, etapa: 'anamnese-1' });
      break;
    case 'anamnese-1':
      setState({ ...state, etapa: 'anamnese-2' });
      break;
    case 'anamnese-2':
      setState({ ...state, etapa: 'anamnese-3' });
      break;
    case 'anamnese-3':
      setState({ ...state, etapa: 'anamnese-4' });
      break;
    case 'anamnese-4':
      // Pré-preencher dados da calculadora com informações da anamnese
      const idadeAtual = calcularIdadeAtual(state.fichaAnamnese.dadosIdentificacao.dataNascimento);
      const formDataAtualizado = {
        ...state.formData,
        idade: idadeAtual.meses,
        unidadeIdade: 'meses',
        prematuro: state.fichaAnamnese.historicoGestacional.duracaoGestacao < 37,
        idadeGestacional: state.fichaAnamnese.historicoGestacional.duracaoGestacao
      };
      setState({ ...state, etapa: 'calculadora', formData: formDataAtualizado });
      break;
    case 'calculadora':
      carregarMarcos();
      setState({ ...state, etapa: 'marcos' });
      break;
    case 'marcos':
      calcularResultado();
      setState({ ...state, etapa: 'resultado' });
      break;
  }
};

const voltarEtapa = () => {
  switch (state.etapa) {
    case 'anamnese-1':
      setState({ ...state, etapa: 'inicio' });
      break;
    case 'anamnese-2':
      setState({ ...state, etapa: 'anamnese-1' });
      break;
    case 'anamnese-3':
      setState({ ...state, etapa: 'anamnese-2' });
      break;
    case 'anamnese-4':
      setState({ ...state, etapa: 'anamnese-3' });
      break;
    case 'calculadora':
      setState({ ...state, etapa: 'anamnese-4' });
      break;
    case 'marcos':
      setState({ ...state, etapa: 'calculadora' });
      break;
    case 'resultado':
      setState({ ...state, etapa: 'marcos' });
      break;
  }
};
```

### 3. Atualização de Dados da Anamnese
```typescript
const atualizarDadosIdentificacao = (dados: Partial<DadosIdentificacao>) => {
  setState({
    ...state,
    fichaAnamnese: {
      ...state.fichaAnamnese,
      dadosIdentificacao: {
        ...state.fichaAnamnese.dadosIdentificacao,
        ...dados
      }
    }
  });
};

// Funções similares para outros componentes da anamnese
```

### 4. Integração com Cálculos Existentes
```typescript
const calcularIdadeAtual = (dataNascimento: string): { anos: number, meses: number } => {
  const hoje = new Date();
  const nascimento = new Date(dataNascimento);
  
  let anos = hoje.getFullYear() - nascimento.getFullYear();
  let meses = hoje.getMonth() - nascimento.getMonth();
  
  if (meses < 0) {
    anos--;
    meses += 12;
  }
  
  return { anos, meses: anos * 12 + meses };
};

// Ajuste na função de carregar marcos para usar dados da anamnese
const carregarMarcos = () => {
  const idadeMeses = state.formData.unidadeIdade === 'anos' ? state.formData.idade * 12 : state.formData.idade;
  const faixaEtaria = determinarFaixaEtaria(idadeMeses);
  
  // Ajuste para prematuridade se aplicável
  if (state.formData.prematuro && state.formData.idadeGestacional && idadeMeses <= 24) {
    const semanasPrematuridade = 40 - state.formData.idadeGestacional;
    console.log(`Ajuste de prematuridade: ${semanasPrematuridade/4} meses`);
  }
  
  // @ts-ignore - Ignorando erro de tipagem para acessar propriedades dinâmicas
  const marcosMotoresFaixa = marcosMotores.marcos_motores[faixaEtaria]?.motor_global || [];
  
  setState({
    ...state,
    marcosDisponiveis: marcosMotoresFaixa,
    etapa: 'marcos'
  });
};
```

### 5. Geração de Relatório Completo
```typescript
const gerarRelatorioCompleto = (): string => {
  // Combinar dados da anamnese e resultados da avaliação em um formato estruturado
  const { fichaAnamnese, resultado } = state;
  
  let relatorio = `# Relatório de Avaliação do Desenvolvimento Motor\n\n`;
  
  // Dados de identificação
  relatorio += `## Dados de Identificação\n`;
  relatorio += `Nome: ${fichaAnamnese.dadosIdentificacao.nome}\n`;
  relatorio += `Data de Nascimento: ${fichaAnamnese.dadosIdentificacao.dataNascimento}\n`;
  relatorio += `Sexo: ${fichaAnamnese.dadosIdentificacao.sexo}\n`;
  relatorio += `Data da Avaliação: ${fichaAnamnese.dadosIdentificacao.dataAvaliacao}\n\n`;
  
  // Adicionar outras seções da anamnese...
  
  // Resultados da avaliação
  if (resultado) {
    relatorio += `## Resultados da Avaliação de Desenvolvimento Motor\n`;
    relatorio += `Percentual de Desenvolvimento: ${Math.round(resultado.percentual)}%\n`;
    relatorio += `Classificação: ${resultado.classificacao}\n`;
    relatorio += `Idade Equivalente: ${resultado.idadeEquivalente}\n`;
    relatorio += `Recomendações: ${resultado.recomendacoes}\n\n`;
  }
  
  return relatorio;
};
```

## Armazenamento e Recuperação de Dados

### 1. Salvar Avaliação
```typescript
const salvarAvaliacao = () => {
  const dadosParaSalvar = {
    fichaAnamnese: state.fichaAnamnese,
    resultado: state.resultado,
    dataAvaliacao: new Date().toISOString()
  };
  
  // Gerar ID único para a avaliação
  const avaliacaoId = `avaliacao_${Date.now()}`;
  
  // Salvar no localStorage
  localStorage.setItem(avaliacaoId, JSON.stringify(dadosParaSalvar));
  
  return avaliacaoId;
};
```

### 2. Carregar Avaliação Anterior
```typescript
const carregarAvaliacaoAnterior = (avaliacaoId: string) => {
  const dadosSalvos = localStorage.getItem(avaliacaoId);
  
  if (dadosSalvos) {
    const { fichaAnamnese, resultado } = JSON.parse(dadosSalvos);
    
    setState({
      ...state,
      fichaAnamnese,
      resultado,
      etapa: 'resultado' // Ir direto para os resultados
    });
    
    return true;
  }
  
  return false;
};
```

### 3. Listar Avaliações Salvas
```typescript
const listarAvaliacoesSalvas = (): Array<{ id: string, nome: string, data: string }> => {
  const avaliacoes = [];
  
  for (let i = 0; i < localStorage.length; i++) {
    const chave = localStorage.key(i);
    
    if (chave && chave.startsWith('avaliacao_')) {
      const dados = JSON.parse(localStorage.getItem(chave) || '{}');
      
      if (dados.fichaAnamnese && dados.dataAvaliacao) {
        avaliacoes.push({
          id: chave,
          nome: dados.fichaAnamnese.dadosIdentificacao.nome,
          data: new Date(dados.dataAvaliacao).toLocaleDateString()
        });
      }
    }
  }
  
  return avaliacoes;
};
```

## Validação de Dados

### 1. Validação de Campos Obrigatórios
```typescript
const validarDadosIdentificacao = (dados: DadosIdentificacao): boolean => {
  return !!(
    dados.nome &&
    dados.dataNascimento &&
    dados.sexo &&
    dados.nomePais &&
    dados.contato &&
    dados.dataAvaliacao
  );
};

// Funções similares para outras seções da anamnese
```

### 2. Validação Completa Antes de Avançar
```typescript
const validarEtapaAtual = (): boolean => {
  switch (state.etapa) {
    case 'anamnese-1':
      return validarDadosIdentificacao(state.fichaAnamnese.dadosIdentificacao);
    case 'anamnese-2':
      return validarHistoricoGestacional(state.fichaAnamnese.historicoGestacional);
    case 'anamnese-3':
      return validarHistoricoDesenvolvimento(state.fichaAnamnese.historicoDesenvolvimento) && 
             validarCondicoesSaude(state.fichaAnamnese.condicoesSaude);
    case 'anamnese-4':
      return validarAvaliacaoAtual(state.fichaAnamnese.avaliacaoAtual);
    default:
      return true;
  }
};
```

## Considerações de Implementação

1. **Componentização**
   - Criar componentes separados para cada etapa da anamnese
   - Manter componentes existentes da calculadora
   - Implementar componente de relatório completo

2. **Gerenciamento de Estado**
   - Considerar uso de Context API para estado global
   - Ou manter estado no componente principal com prop drilling

3. **Persistência de Dados**
   - Implementar salvamento automático em localStorage
   - Adicionar opção para exportar dados em PDF

4. **Acessibilidade**
   - Garantir navegação por teclado
   - Implementar labels adequados para todos os campos
   - Manter contraste adequado para leitura

5. **Responsividade**
   - Adaptar layout para diferentes tamanhos de tela
   - Considerar visualização em dispositivos móveis
