# Guia do Sistema de Consulta de Usuários Chave Pix CDB

## 📋 Visão Geral

O sistema de consulta foi desenvolvido especificamente para trabalhar com a planilha de **Usuários Chave Pix CDB**, permitindo:

- **Visualização das abas** disponíveis na planilha específica
- **Busca por customer_id** na planilha de Usuários Chave Pix CDB
- **Identificação da aba específica** onde o usuário foi encontrado
- **Informações detalhadas** sobre cada consulta

## 🚀 Como Executar

### 1. Iniciar o Servidor Local

```bash
python server.py
```

O servidor será iniciado em `http://localhost:8000`

### 2. Acessar a Aplicação

Abra seu navegador e acesse:
```
http://localhost:8000/index.html
```

## 📊 Funcionalidades

### Visualização de Abas

O sistema detecta automaticamente as abas disponíveis na planilha de Usuários Chave Pix CDB:

- **Nome da aba** (ex: "Usuários Chave Pix CDB")
- **Quantidade de registros** cadastrados
- **Data da última atualização**
- **Indicador visual** de status

### Busca por Customer ID

Ao realizar uma consulta, o sistema:

1. **Verifica todas as abas** da planilha automaticamente
2. **Identifica a aba específica** onde o customer_id foi encontrado
3. **Mostra informações detalhadas** como:
   - Nome da aba
   - Linha na planilha
   - Data e hora da consulta
   - Total de abas verificadas

### Resultados Detalhados

#### ✅ Usuário Encontrado
- **Aba:** Nome da aba onde foi encontrado
- **Linha na planilha:** Posição exata do registro
- **Data da consulta:** Timestamp da busca
- **Total de abas verificadas:** Quantidade de abas processadas

#### ❌ Usuário Não Encontrado
- **Data da consulta:** Timestamp da busca
- **Total de abas verificadas:** Quantidade de abas processadas
- **Abas disponíveis:** Lista de todas as abas verificadas

## 🔧 Estrutura da Planilha

### Planilha Principal
- **URL:** https://docs.google.com/spreadsheets/d/1NV0uPbo7mppwdaVLpadnisr5EXBo6-F_3koAb-Dl9d0/edit?gid=0#gid=0
- **Aba Principal:** Usuários Chave Pix CDB (GID: 0)
- **Coluna de Identificação:** customer_id (coluna A)

### Dados Processados
O sistema processa automaticamente:
- **customer_id:** Identificador único do usuário
- **Outras colunas:** Dados adicionais do usuário (nome, email, etc.)
- **Múltiplas abas:** Se existirem outras abas na planilha

## 📱 Interface Responsiva

A aplicação é totalmente responsiva e funciona em:

- **Desktop:** Layout completo com grid de abas
- **Tablet:** Layout adaptado com cards menores
- **Mobile:** Layout otimizado para telas pequenas

## 🔄 Atualizações Automáticas

O sistema atualiza automaticamente os dados:

- **A cada 5 minutos** em segundo plano
- **Ao clicar em "Tentar Novamente"** em caso de erro
- **Ao recarregar a página**

## 🛠️ Solução de Problemas

### Erro ao Carregar Abas

Se as abas não carregarem:

1. **Verifique se a planilha está acessível** (pública ou compartilhada)
2. **Confirme se o SHEET_ID está correto** no código
3. **Verifique se há dados na aba principal**

### Erro de CORS

Se houver problemas de CORS:

1. **Use o servidor local** (`python server.py`)
2. **Verifique se o servidor está rodando** na porta 8000
3. **Acesse via localhost** e não via IP

### Dados Não Atualizados

Se os dados parecem desatualizados:

1. **Recarregue a página** (F5)
2. **Aguarde 5 minutos** para atualização automática
3. **Verifique se a planilha** foi modificada recentemente

## 📈 Melhorias Implementadas

### Interface
- ✅ Design moderno e responsivo
- ✅ Cards informativos para cada aba
- ✅ Indicadores visuais de status
- ✅ Animações suaves e feedback visual

### Funcionalidade
- ✅ Busca específica por customer_id
- ✅ Detecção automática de abas
- ✅ Informações detalhadas dos resultados
- ✅ Atualizações automáticas

### Performance
- ✅ Carregamento assíncrono de abas
- ✅ Tratamento de erros robusto
- ✅ Cache de dados otimizado
- ✅ Interface responsiva

## 🎯 Como Usar

### 1. Buscar um Usuário
1. Digite o **customer_id** no campo de busca
2. Clique em "Buscar" ou pressione Enter
3. Aguarde o resultado da consulta

### 2. Interpretar os Resultados
- **Verde:** Usuário encontrado com detalhes da aba
- **Vermelho:** Usuário não encontrado
- **Amarelo:** Erro na consulta

### 3. Visualizar Abas
- As abas disponíveis são exibidas automaticamente
- Cada card mostra a quantidade de registros
- Clique em uma aba para ver mais detalhes (futuro)

## 🔧 Configuração Avançada

### Modificar SHEET_ID
Para usar com outra planilha, edite o arquivo `script.js`:

```javascript
const SHEET_ID = 'SEU_NOVO_SHEET_ID';
```

### Adicionar Novas Abas
O sistema detecta automaticamente abas com GIDs de 0 a 5. Para mais abas, edite o array `commonGids` no arquivo `script.js`.

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique este guia
2. Consulte os logs do console do navegador
3. Verifique os logs do servidor Python
4. Entre em contato com o desenvolvedor

---

**Versão:** 2.0 - Sistema Específico para Usuários Chave Pix CDB  
**Data:** Dezembro 2024  
**Planilha:** https://docs.google.com/spreadsheets/d/1NV0uPbo7mppwdaVLpadnisr5EXBo6-F_3koAb-Dl9d0/edit?gid=0#gid=0  
**Compatibilidade:** Google Sheets, Navegadores Modernos 