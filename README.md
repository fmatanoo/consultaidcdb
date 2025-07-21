# Sistema de Consulta de Identificadores

Uma interface web simples e intuitiva para consultar identificadores através do Google Sheets como banco de dados.

## 🚀 Funcionalidades

- **Interface moderna e responsiva** - Design agradável que funciona em desktop e mobile
- **Integração com Google Sheets** - Conecta diretamente com sua planilha como banco de dados
- **Consulta rápida** - Busca identificadores em todas as abas da planilha
- **Feedback visual** - Resultados claros: encontrado ou não encontrado
- **Visualização das abas** - Mostra todas as abas disponíveis na planilha
- **Somente leitura** - Usuários não podem alterar os dados

## 📋 Pré-requisitos

1. **Google Sheets configurado** - Sua planilha deve estar configurada corretamente
2. **Navegador moderno** - Chrome, Firefox, Safari, Edge
3. **Conexão com internet** - Para acessar o Google Sheets

## 🛠️ Configuração

### 1. Estrutura da Planilha

Sua planilha do Google Sheets deve ter a seguinte estrutura:

```
| Identificador | Outros_Dados |
|---------------|--------------|
| 25499984      | ...          |
| 26069015      | ...          |
| 25582047      | ...          |
```

### 2. Configuração da Planilha

1. Abra sua planilha: https://docs.google.com/spreadsheets/d/1NV0uPbo7mppwdaVLpadnisr5EXBo6-F_3koAb-Dl9d0/edit?usp=sharing
2. Configure as permissões para "Qualquer pessoa com o link pode visualizar"
3. Organize os identificadores por abas conforme necessário

### 3. Executar a Aplicação

1. Abra o arquivo `index.html` em seu navegador
2. A interface carregará automaticamente os dados da planilha
3. Digite um identificador no campo de busca
4. Clique em buscar ou pressione Enter

## 📁 Estrutura dos Arquivos

```
consulta_excel/
├── index.html          # Interface principal
├── styles.css          # Estilos da interface
├── script.js           # Lógica JavaScript
├── README.md           # Este arquivo
└── identificadores_formatado.csv  # Seus dados locais
```

## 🎯 Como Usar

### Consulta de Identificadores

1. **Digite o identificador** no campo de busca
2. **Clique no botão de busca** ou pressione Enter
3. **Aguarde o resultado**:
   - ✅ **Verde**: Identificador encontrado
   - ❌ **Vermelho**: Identificador não encontrado

### Visualização das Abas

- A seção "Abas Disponíveis" mostra todas as abas da planilha
- Cada aba exibe o número de identificadores cadastrados
- Os dados são atualizados automaticamente a cada 5 minutos

## 🔧 Personalização

### Alterar a Planilha

Para usar uma planilha diferente, edite o arquivo `script.js`:

```javascript
const SHEET_ID = 'SEU_NOVO_ID_DA_PLANILHA';
```

### Modificar Estilos

Edite o arquivo `styles.css` para personalizar cores, fontes e layout.

### Adicionar Funcionalidades

O arquivo `script.js` contém todas as funções principais que podem ser estendidas.

## 🔒 Segurança

- A interface é somente leitura
- Usuários não podem modificar os dados
- Apenas você tem controle total da planilha
- Dados são carregados via API pública do Google Sheets

## 📱 Responsividade

A interface é totalmente responsiva e funciona em:
- Desktop (Windows, Mac, Linux)
- Tablet (iPad, Android)
- Smartphone (iPhone, Android)

## 🚨 Solução de Problemas

### Erro ao carregar dados

**1. Teste primeiro com o arquivo de diagnóstico:**
- Abra o arquivo `teste_planilha.html` no navegador
- Clique em "🧪 Testar Acesso" para verificar se a planilha está acessível
- Clique em "📊 Testar Dados" para verificar se os dados estão corretos

**2. Verifique as configurações da planilha:**
- A planilha deve estar configurada como "Qualquer pessoa com o link pode visualizar"
- Vá em: Compartilhar → Configurações → Qualquer pessoa com o link pode visualizar
- Certifique-se de que não há restrições de acesso

**3. Verifique a estrutura da planilha:**
- A primeira coluna deve conter os identificadores
- O cabeçalho pode ser "Identificador" ou "customer_id"
- Os dados devem estar na primeira aba (Sheet1)

**4. Problemas de CORS:**
- Se aparecer erro de CORS, abra o console do navegador (F12)
- Verifique se há mensagens de erro relacionadas a "CORS" ou "Access-Control-Allow-Origin"

### Identificadores não encontrados
- Verifique se o formato está correto
- Confirme se os dados estão na planilha
- Aguarde a atualização automática (5 minutos)
- Use o arquivo `teste_planilha.html` para verificar os dados

### Interface não carrega
- Verifique se todos os arquivos estão na mesma pasta
- Abra o console do navegador (F12) para ver erros
- Teste em outro navegador
- Certifique-se de que está abrindo o arquivo `index.html` e não `teste_planilha.html`

### Debug avançado
1. Abra o console do navegador (F12)
2. Vá na aba "Console"
3. Recarregue a página
4. Verifique se há mensagens de erro ou logs informativos
5. Os logs começam com "Iniciando carregamento da aplicação..."

## 📞 Suporte

Para dúvidas ou problemas:
1. Verifique este README
2. Teste em diferentes navegadores
3. Confirme a configuração da planilha

## 🔄 Atualizações

O sistema atualiza automaticamente:
- Dados da planilha: a cada 5 minutos
- Interface: em tempo real
- Resultados: imediatamente após a busca

---

**Desenvolvido para consulta rápida e eficiente de identificadores via Google Sheets** 