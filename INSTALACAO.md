# Guia de Instalação - Windows

## Pré-requisitos

### 1. Instalar Python

Se você não tem Python instalado, siga estes passos:

1. **Baixe o Python**:
   - Acesse: https://www.python.org/downloads/
   - Clique em "Download Python" (versão mais recente)
   - Ou acesse diretamente: https://www.python.org/downloads/windows/

2. **Instale o Python**:
   - Execute o arquivo baixado (.exe)
   - **IMPORTANTE**: Marque a opção "Add Python to PATH"
   - Clique em "Install Now"
   - Aguarde a instalação

3. **Verifique a instalação**:
   - Abra o PowerShell ou Prompt de Comando
   - Digite: `python --version`
   - Deve aparecer a versão do Python

### 2. Verificar pip

O pip geralmente vem com o Python. Para verificar:
```bash
python -m pip --version
```

## Instalação do Projeto

### 1. Navegar até o diretório
```bash
cd C:\Users\felipe.matano\consulta_excel
```

### 2. Instalar dependências
```bash
python -m pip install -r requirements.txt
```

### 3. Executar a aplicação
```bash
python app.py
```

### 4. Acessar no navegador
Abra seu navegador e acesse:
```
http://localhost:5000
```

## Solução de Problemas

### Python não encontrado
Se aparecer "Python não foi encontrado":
1. Reinstale o Python marcando "Add Python to PATH"
2. Ou adicione manualmente ao PATH:
   - Vá em Configurações > Sistema > Sobre > Configurações avançadas do sistema
   - Clique em "Variáveis de ambiente"
   - Em "Variáveis do sistema", encontre "Path" e clique em "Editar"
   - Adicione o caminho do Python (geralmente `C:\Users\[usuario]\AppData\Local\Programs\Python\Python3x\`)

### Erro de permissão
Se aparecer erro de permissão:
1. Execute o PowerShell como Administrador
2. Ou use o comando:
```bash
python -m pip install --user -r requirements.txt
```

### Porta em uso
Se a porta 5000 estiver em uso:
1. Encontre o processo usando a porta:
```bash
netstat -ano | findstr :5000
```
2. Encerre o processo ou mude a porta no arquivo `app.py`

## Alternativa: Usar Anaconda

Se preferir usar Anaconda:

1. **Instale Anaconda**: https://www.anaconda.com/products/distribution
2. **Abra o Anaconda Prompt**
3. **Navegue até o diretório**:
```bash
cd C:\Users\felipe.matano\consulta_excel
```
4. **Instale as dependências**:
```bash
conda install flask pandas openpyxl
```
5. **Execute a aplicação**:
```bash
python app.py
```

## Teste Rápido

Para testar se tudo está funcionando:

1. Crie uma planilha Excel simples com:
   - Coluna A: "ID"
   - Coluna B: "Nome"
   - Adicione alguns números na coluna ID (ex: 1, 2, 3, 4, 5)
   - Adicione nomes na coluna Nome

2. Execute a aplicação e teste:
   - Upload da planilha
   - Configurar coluna "ID"
   - Consultar um número (ex: 3)

## Suporte

Se encontrar problemas:
1. Verifique se o Python está instalado: `python --version`
2. Verifique se o pip está funcionando: `python -m pip --version`
3. Tente reinstalar as dependências: `python -m pip install --upgrade -r requirements.txt` 