# Guia do Sistema de Consulta Multi-Abas

## 📋 Visão Geral

O sistema de consulta de identificadores foi atualizado para suportar múltiplas abas do Google Sheets, permitindo:

- **Visualização de todas as abas** disponíveis na planilha
- **Busca em múltiplas abas** simultaneamente
- **Identificação da aba específica** onde o identificador foi encontrado
- **Informações detalhadas** sobre cada aba (quantidade de registros, última atualização)

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

O sistema agora exibe todas as abas disponíveis na planilha com:

- **Nome da aba**
- **Quantidade de identificadores** cadastrados
- **Data da última atualização**
- **Indicador visual** de status

### Busca Inteligente

Ao realizar uma consulta, o sistema:

1. **Verifica todas as abas** automaticamente
2. **Identifica a aba específica** onde o identificador foi encontrado
3. **Mostra informações detalhadas** como:
   - Nome da aba
   - Linha na planilha
   - Data e hora da consulta
   - Total de abas verificadas

### Resultados Detalhados

#### ✅ Identificador Encontrado
- **Aba:** Nome da aba onde foi encontrado
- **Linha na planilha:** Posição exata do registro
- **Data da consulta:** Timestamp da busca
- **Total de abas verificadas:** Quantidade de abas processadas

#### ❌ Identificador Não Encontrado
- **Data da consulta:** Timestamp da busca
- **Total de abas verificadas:** Quantidade de abas processadas
- **Abas disponíveis:** Lista de todas as abas verificadas

## 🔧 Configuração das Abas

### Estrutura da Planilha

O sistema está configurado para trabalhar com as seguintes abas:

| GID | Nome da Aba | Descrição |
|-----|-------------|-----------|
| 0 | Identificadores | Aba principal de identificadores |
| 1 | Clientes | Dados de clientes |
| 2 | Produtos | Catálogo de produtos |
| 3 | Vendas | Registro de vendas |
| 4 | Fornecedores | Dados de fornecedores |

### Adicionando Novas Abas

Para adicionar novas abas, edite o arquivo `script.js` na seção `knownSheets`:

```javascript
const knownSheets = [
    { name: 'Identificadores', gid: '0' },
    { name: 'Clientes', gid: '1' },
    { name: 'Produtos', gid: '2' },
    { name: 'Vendas', gid: '3' },
    { name: 'Fornecedores', gid: '4' },
    { name: 'Nova Aba', gid: '5' } // Adicione aqui
];
```

### Encontrando o GID de uma Aba

1. Abra sua planilha no Google Sheets
2. Clique na aba desejada
3. Observe a URL: `https://docs.google.com/spreadsheets/d/SHEET_ID/edit#gid=GID`
4. O número após `gid=` é o GID da aba

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

Se algumas abas não carregarem:

1. **Verifique se a aba existe** na planilha
2. **Confirme o GID** está correto
3. **Verifique as permissões** da planilha (deve estar pública ou compartilhada)

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
- ✅ Busca em múltiplas abas
- ✅ Identificação da aba específica
- ✅ Informações detalhadas dos resultados
- ✅ Atualizações automáticas

### Performance
- ✅ Carregamento assíncrono de abas
- ✅ Tratamento de erros robusto
- ✅ Cache de dados otimizado
- ✅ Interface responsiva

## 🎯 Próximas Melhorias

- [ ] Filtros por aba
- [ ] Exportação de resultados
- [ ] Histórico de consultas
- [ ] Notificações em tempo real
- [ ] Dashboard com estatísticas

## 📞 Suporte

Para dúvidas ou problemas:

1. Verifique este guia
2. Consulte os logs do console do navegador
3. Verifique os logs do servidor Python
4. Entre em contato com o desenvolvedor

---

**Versão:** 2.0 - Sistema Multi-Abas  
**Data:** Dezembro 2024  
**Compatibilidade:** Google Sheets, Navegadores Modernos 