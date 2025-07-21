# Sistema Simples de Consulta CSV

## 🎯 O que é?
Um programa simples em Python que permite consultar se um número está presente em um arquivo CSV.

## 📋 Pré-requisitos
- Python instalado (https://www.python.org/downloads/)
- Biblioteca pandas

## 🚀 Como usar

### 1. Instalar dependência
```bash
pip install pandas
```

### 2. Converter seu arquivo (se necessário)
Se você tem o arquivo de identificadores, execute:
```bash
python converter_csv.py
```

### 3. Executar a consulta
```bash
python consulta_simples.py
```

Ou especificar o arquivo diretamente:
```bash
python consulta_simples.py identificadores_formatado.csv
```

## 📝 Exemplo de uso

1. **Execute o programa:**
   ```
   python consulta_simples.py
   ```

2. **Digite o caminho do arquivo CSV** (ou arraste o arquivo)

3. **Escolha a coluna** que contém os números identificadores

4. **Digite números para consultar** e veja os resultados

5. **Digite 'sair'** para encerrar

## 📁 Estrutura de arquivos

```
consulta_excel/
├── consulta_simples.py      # Programa principal
├── converter_csv.py         # Converte arquivo de identificadores
├── identificadores_formatado.csv  # Arquivo CSV formatado (gerado)
└── INSTRUCOES_SIMPLES.md   # Este arquivo
```

## 💡 Dicas

- O arquivo CSV deve ter cabeçalhos (nomes das colunas)
- Você pode usar qualquer arquivo CSV com números
- Para trocar a fonte de dados, basta substituir o arquivo CSV
- O programa funciona com qualquer coluna que contenha números

## 🔧 Personalização

Para usar com outro arquivo CSV:
1. Substitua o arquivo `identificadores_formatado.csv`
2. Ou execute: `python consulta_simples.py seu_arquivo.csv`

## ❓ Solução de problemas

**Erro "pandas não encontrado":**
```bash
pip install pandas
```

**Arquivo não encontrado:**
- Verifique se o caminho está correto
- Arraste o arquivo para a janela do terminal

**Erro ao carregar CSV:**
- Verifique se o arquivo é um CSV válido
- Certifique-se de que o arquivo não está aberto em outro programa 