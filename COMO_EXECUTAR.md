# 🚀 Como Executar o Sistema

## **Problema Resolvido: CORS**

O erro "Failed to fetch" acontece porque navegadores bloqueiam requisições para APIs externas quando você abre arquivos HTML localmente. A solução é usar um servidor local.

## **📋 Opções de Execução:**

### **Opção 1: Servidor Python Local (Recomendado)**

**1. Verifique se tem Python instalado:**
```bash
python --version
# ou
python3 --version
```

**2. Execute o servidor:**
```bash
# No Windows (PowerShell ou CMD):
python server.py

# No Mac/Linux:
python3 server.py
```

**3. Acesse no navegador:**
```
http://localhost:8000/index.html
```

### **Opção 2: Servidor Node.js (Alternativa)**

Se você tem Node.js instalado:

**1. Instale o http-server:**
```bash
npm install -g http-server
```

**2. Execute:**
```bash
http-server -p 8000 --cors
```

**3. Acesse:**
```
http://localhost:8000/index.html
```

### **Opção 3: Extensão do VS Code**

Se você usa VS Code:

**1. Instale a extensão "Live Server"**
**2. Clique com botão direito no `index.html`**
**3. Selecione "Open with Live Server"**

### **Opção 4: Hospedagem Online (Para produção)**

Para usar online sem problemas de CORS:

**1. GitHub Pages (Gratuito):**
- Crie um repositório no GitHub
- Faça upload dos arquivos
- Ative GitHub Pages nas configurações

**2. Netlify (Gratuito):**
- Acesse netlify.com
- Arraste a pasta do projeto
- Pronto!

**3. Vercel (Gratuito):**
- Acesse vercel.com
- Conecte com GitHub
- Deploy automático

## **🔧 Solução de Problemas:**

### **Erro: "python não é reconhecido"**
- Instale Python: https://python.org/downloads/
- Marque "Add Python to PATH" durante a instalação

### **Erro: "Porta 8000 já está em uso"**
- Mude a porta no arquivo `server.py`:
```python
PORT = 8001  # ou qualquer outra porta
```

### **Erro: "Acesso negado"**
- Execute o PowerShell como administrador
- Ou use uma porta diferente

### **Erro: "Módulo não encontrado"**
- O servidor usa apenas módulos padrão do Python
- Não precisa instalar nada adicional

## **📊 Como Funciona:**

1. **Servidor Python** faz a requisição para o Google Sheets
2. **Adiciona headers CORS** para permitir acesso do navegador
3. **Retorna os dados** para sua aplicação
4. **Sua interface** recebe os dados sem problemas de CORS

## **🎯 Vantagens do Servidor Local:**

✅ **Resolve problemas de CORS**
✅ **Funciona offline** (depois de carregar os dados)
✅ **Mais rápido** que requisições diretas
✅ **Melhor controle** de erros
✅ **Logs detalhados** no console

## **🚀 Comandos Rápidos:**

```bash
# Iniciar servidor
python server.py

# Parar servidor
Ctrl + C

# Verificar se está rodando
http://localhost:8000
```

---

**Agora você pode usar a interface sem problemas de CORS! 🎉** 