// Configuração do Google Sheets
const SHEET_ID = '1NV0uPbo7mppwdaVLpadnisr5EXBo6-F_3koAb-Dl9d0';

// URLs para diferentes ambientes
const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
const SHEET_URL = isLocalhost 
    ? `http://localhost:8000/api/sheets`  // Servidor local
    : `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=0`; // Direto

// Elementos da interface
const searchInput = document.getElementById('searchInput');
const searchButton = document.getElementById('searchButton');
const resultSection = document.getElementById('resultSection');
const resultCard = document.getElementById('resultCard');
const resultIcon = document.getElementById('resultIcon');
const resultTitle = document.getElementById('resultTitle');
const resultMessage = document.getElementById('resultMessage');
const resultDetails = document.getElementById('resultDetails');
const sheetsContainer = document.getElementById('sheetsContainer');

// Dados das abas
let sheetsData = {};

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carregamento da aplicação...');
    loadSheets();
    setupEventListeners();
});

// Configurar event listeners
function setupEventListeners() {
    searchButton.addEventListener('click', performSearch);
    searchInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            performSearch();
        }
    });
}

// Carregar dados das abas
async function loadSheets() {
    console.log('Tentando carregar dados do Google Sheets...');
    
    try {
        // Mostrar loading
        sheetsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando dados da planilha...</p>
            </div>
        `;

        const response = await fetch(SHEET_URL, {
            method: 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        });

        console.log('Resposta do Google Sheets:', response.status);

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const text = await response.text();
        console.log('Dados recebidos:', text.substring(0, 200) + '...');

        // Verificar se a resposta contém dados válidos
        if (!text.includes('google.visualization.Query.setResponse')) {
            throw new Error('Resposta inválida do Google Sheets');
        }

        // Extrair JSON da resposta
        const jsonStart = text.indexOf('(') + 1;
        const jsonEnd = text.lastIndexOf(')');
        const jsonString = text.substring(jsonStart, jsonEnd);
        
        const jsonData = JSON.parse(jsonString);
        console.log('Dados processados:', jsonData);

        // Processar dados das abas
        processSheetsData(jsonData);
        
        // Exibir abas disponíveis
        displaySheets();
        
    } catch (error) {
        console.error('Erro detalhado ao carregar dados:', error);
        
        // Mostrar erro específico
        sheetsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Erro ao carregar dados</p>
                <small>${error.message}</small>
                <br><br>
                <button onclick="loadSheets()" class="search-button">
                    <i class="fas fa-refresh"></i> Tentar Novamente
                </button>
            </div>
        `;
        
        showError(`Erro ao carregar dados: ${error.message}`);
    }
}

// Processar dados das abas
function processSheetsData(data) {
    console.log('Processando dados das abas...');
    
    if (!data.table || !data.table.rows) {
        console.log('Estrutura de dados inválida:', data);
        return;
    }

    const rows = data.table.rows;
    console.log(`Processando ${rows.length} linhas...`);

    // Limpar dados anteriores
    sheetsData = {};

    // Processar cada linha
    rows.forEach((row, index) => {
        if (row.c && row.c.length > 0) {
            // Assumindo que a primeira coluna é o identificador
            const identifier = row.c[0]?.v || '';
            
            if (identifier && identifier !== 'Identificador' && identifier !== 'customer_id') {
                // Usar uma aba padrão para todos os identificadores
                const sheetName = 'Identificadores';
                
                if (!sheetsData[sheetName]) {
                    sheetsData[sheetName] = [];
                }
                
                sheetsData[sheetName].push(identifier.toString());
            }
        }
    });

    console.log('Dados processados:', sheetsData);
}

// Exibir abas disponíveis
function displaySheets() {
    const sheets = Object.keys(sheetsData);
    console.log('Exibindo abas:', sheets);
    
    if (sheets.length === 0) {
        sheetsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Nenhum identificador encontrado na planilha</p>
                <small>Verifique se a planilha está configurada corretamente</small>
            </div>
        `;
        return;
    }
    
    const sheetsHTML = sheets.map(sheetName => {
        const identifiers = sheetsData[sheetName];
        return `
            <div class="sheet-card">
                <h3>
                    <i class="fas fa-table"></i>
                    ${sheetName}
                </h3>
                <p>${identifiers.length} identificadores cadastrados</p>
                <div class="sheet-info">
                    <span>Última atualização: ${new Date().toLocaleDateString('pt-BR')}</span>
                    <span><i class="fas fa-eye"></i></span>
                </div>
            </div>
        `;
    }).join('');
    
    sheetsContainer.innerHTML = sheetsHTML;
}

// Realizar busca
async function performSearch() {
    const identifier = searchInput.value.trim();
    
    if (!identifier) {
        showError('Por favor, digite um identificador');
        return;
    }
    
    // Mostrar loading
    showLoading();
    
    try {
        // Buscar em todas as abas
        const result = searchInAllSheets(identifier);
        
        if (result.found) {
            showSuccess(identifier, result.sheetName);
        } else {
            showNotFound(identifier);
        }
        
    } catch (error) {
        console.error('Erro na busca:', error);
        showError('Erro ao realizar a busca');
    }
}

// Buscar em todas as abas
function searchInAllSheets(identifier) {
    console.log(`Buscando identificador: ${identifier}`);
    console.log('Dados disponíveis:', sheetsData);
    
    for (const [sheetName, identifiers] of Object.entries(sheetsData)) {
        console.log(`Verificando aba: ${sheetName}`);
        console.log(`Identificadores na aba:`, identifiers);
        
        if (identifiers.includes(identifier.toString())) {
            console.log(`Identificador encontrado na aba: ${sheetName}`);
            return {
                found: true,
                sheetName: sheetName
            };
        }
    }
    
    console.log('Identificador não encontrado');
    return {
        found: false,
        sheetName: null
    };
}

// Mostrar resultado de sucesso
function showSuccess(identifier, sheetName) {
    resultCard.className = 'result-card success';
    resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    resultTitle.textContent = 'Identificador Encontrado!';
    resultMessage.textContent = `O identificador "${identifier}" foi encontrado na base de dados.`;
    resultDetails.innerHTML = `
        <strong>Aba:</strong> ${sheetName}<br>
        <strong>Data da consulta:</strong> ${new Date().toLocaleString('pt-BR')}
    `;
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Mostrar resultado de não encontrado
function showNotFound(identifier) {
    resultCard.className = 'result-card error';
    resultIcon.innerHTML = '<i class="fas fa-times-circle"></i>';
    resultTitle.textContent = 'Identificador Não Encontrado';
    resultMessage.textContent = `O identificador "${identifier}" não foi encontrado na base de dados.`;
    resultDetails.innerHTML = `
        <strong>Data da consulta:</strong> ${new Date().toLocaleString('pt-BR')}<br>
        <strong>Total de abas verificadas:</strong> ${Object.keys(sheetsData).length}
    `;
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Mostrar erro
function showError(message) {
    resultCard.className = 'result-card error';
    resultIcon.innerHTML = '<i class="fas fa-exclamation-triangle"></i>';
    resultTitle.textContent = 'Erro';
    resultMessage.textContent = message;
    resultDetails.innerHTML = `
        <strong>Data do erro:</strong> ${new Date().toLocaleString('pt-BR')}
    `;
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Mostrar loading
function showLoading() {
    resultCard.className = 'result-card';
    resultIcon.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    resultTitle.textContent = 'Buscando...';
    resultMessage.textContent = 'Verificando na base de dados...';
    resultDetails.innerHTML = '';
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Função para atualizar dados (pode ser chamada periodicamente)
function refreshData() {
    console.log('Atualizando dados...');
    loadSheets();
}

// Atualizar dados a cada 5 minutos
setInterval(refreshData, 5 * 60 * 1000);

// Função para limpar resultado
function clearResult() {
    resultSection.style.display = 'none';
    searchInput.value = '';
    searchInput.focus();
}

// Adicionar botão de limpar (opcional)
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        clearResult();
    }
}); 