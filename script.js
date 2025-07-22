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
let sheetsInfo = [];

// Inicialização
document.addEventListener('DOMContentLoaded', function() {
    console.log('Iniciando carregamento da aplicação...');
    loadAllSheets();
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

// Carregar todas as abas disponíveis
async function loadAllSheets() {
    console.log('Tentando carregar todas as abas do Google Sheets...');
    
    try {
        // Mostrar loading
        sheetsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-spinner fa-spin"></i>
                <p>Carregando todas as abas da planilha...</p>
            </div>
        `;

        // Primeiro, vamos tentar carregar a aba principal (gid=0)
        // que contém os dados de "Usuários Chave Pix CDB"
        const mainSheetData = await loadSheetData('0');
        
        if (mainSheetData && Object.keys(mainSheetData).length > 0) {
            sheetsData['Usuários Chave Pix CDB'] = mainSheetData;
            sheetsInfo.push({
                name: 'Usuários Chave Pix CDB',
                count: Object.keys(mainSheetData).length,
                lastUpdate: new Date().toLocaleDateString('pt-BR')
            });
        }

        // Tentar carregar outras abas comuns (se existirem)
        const commonGids = ['1', '2', '3', '4', '5'];
        const sheetNames = ['Aba 2', 'Aba 3', 'Aba 4', 'Aba 5', 'Aba 6'];
        
        for (let i = 0; i < commonGids.length; i++) {
            try {
                const sheetData = await loadSheetData(commonGids[i]);
                if (sheetData && Object.keys(sheetData).length > 0) {
                    const sheetName = sheetNames[i];
                    sheetsData[sheetName] = sheetData;
                    sheetsInfo.push({
                        name: sheetName,
                        count: Object.keys(sheetData).length,
                        lastUpdate: new Date().toLocaleDateString('pt-BR')
                    });
                }
            } catch (error) {
                console.log(`Aba ${commonGids[i]} não encontrada ou vazia:`, error.message);
            }
        }
        
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
                <button onclick="loadAllSheets()" class="search-button">
                    <i class="fas fa-refresh"></i> Tentar Novamente
                </button>
            </div>
        `;
        
        showError(`Erro ao carregar dados: ${error.message}`);
    }
}

// Carregar dados de uma aba específica
async function loadSheetData(gid) {
    const sheetUrl = isLocalhost 
        ? `http://localhost:8000/api/sheets?gid=${gid}`
        : `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq?tqx=out:json&gid=${gid}`;

    const response = await fetch(sheetUrl, {
        method: 'GET',
        headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        }
    });

    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }

    const text = await response.text();
    
    // Verificar se a resposta contém dados válidos
    if (!text.includes('google.visualization.Query.setResponse')) {
        throw new Error('Resposta inválida do Google Sheets');
    }

    // Extrair JSON da resposta
    const jsonStart = text.indexOf('(') + 1;
    const jsonEnd = text.lastIndexOf(')');
    const jsonString = text.substring(jsonStart, jsonEnd);
    
    const jsonData = JSON.parse(jsonString);
    
    // Processar dados da aba
    return processSheetData(jsonData);
}

// Processar dados de uma aba
function processSheetData(data) {
    console.log('Processando dados da aba...');
    
    if (!data.table || !data.table.rows) {
        console.log('Estrutura de dados inválida:', data);
        return {};
    }

    const rows = data.table.rows;
    console.log(`Processando ${rows.length} linhas...`);

    const identifiers = {};

    // Processar cada linha
    rows.forEach((row, index) => {
        if (row.c && row.c.length > 0) {
            // Assumindo que a primeira coluna é o identificador (customer_id)
            const identifier = row.c[0]?.v || '';
            
            if (identifier && identifier !== 'customer_id' && identifier !== 'Identificador') {
                identifiers[identifier.toString()] = {
                    value: identifier.toString(),
                    row: index + 1,
                    found: true
                };
            }
        }
    });

    console.log(`Identificadores processados: ${Object.keys(identifiers).length}`);
    return identifiers;
}

// Exibir abas disponíveis
function displaySheets() {
    console.log('Exibindo abas:', sheetsInfo);
    
    if (sheetsInfo.length === 0) {
        sheetsContainer.innerHTML = `
            <div class="loading">
                <i class="fas fa-exclamation-triangle"></i>
                <p>Nenhuma aba encontrada na planilha</p>
                <small>Verifique se a planilha está configurada corretamente</small>
            </div>
        `;
        return;
    }
    
    const sheetsHTML = sheetsInfo.map(sheet => {
        return `
            <div class="sheet-card">
                <h3>
                    <i class="fas fa-table"></i>
                    ${sheet.name}
                </h3>
                <p>${sheet.count} identificadores cadastrados</p>
                <div class="sheet-info">
                    <span>Última atualização: ${sheet.lastUpdate}</span>
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
            showSuccess(identifier, result.sheetName, result.details);
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
        
        if (identifiers[identifier.toString()]) {
            console.log(`Identificador encontrado na aba: ${sheetName}`);
            return {
                found: true,
                sheetName: sheetName,
                details: identifiers[identifier.toString()]
            };
        }
    }
    
    console.log('Identificador não encontrado');
    return {
        found: false,
        sheetName: null,
        details: null
    };
}

// Mostrar resultado de sucesso
function showSuccess(identifier, sheetName, details) {
    resultCard.className = 'result-card success';
    resultIcon.innerHTML = '<i class="fas fa-check-circle"></i>';
    resultTitle.textContent = 'Identificador Encontrado!';
    resultMessage.textContent = `O identificador "${identifier}" foi encontrado na base de dados.`;
    resultDetails.innerHTML = `
        <strong>Aba:</strong> ${sheetName}<br>
        <strong>Linha na planilha:</strong> ${details.row}<br>
        <strong>Data da consulta:</strong> ${new Date().toLocaleString('pt-BR')}<br>
        <strong>Total de abas verificadas:</strong> ${Object.keys(sheetsData).length}
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
        <strong>Total de abas verificadas:</strong> ${Object.keys(sheetsData).length}<br>
        <strong>Abas disponíveis:</strong> ${Object.keys(sheetsData).join(', ')}
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
    resultMessage.textContent = 'Verificando em todas as abas da planilha...';
    resultDetails.innerHTML = '';
    
    resultSection.style.display = 'block';
    resultSection.scrollIntoView({ behavior: 'smooth' });
}

// Função para atualizar dados (pode ser chamada periodicamente)
function refreshData() {
    console.log('Atualizando dados...');
    loadAllSheets();
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