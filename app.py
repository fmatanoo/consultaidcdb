from flask import Flask, render_template, request, jsonify, flash
import pandas as pd
import os
from werkzeug.utils import secure_filename

app = Flask(__name__)
app.secret_key = 'sua_chave_secreta_aqui'

# Configurações para upload de arquivos
UPLOAD_FOLDER = 'uploads'
ALLOWED_EXTENSIONS = {'xlsx', 'xls'}

if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS

# Variável global para armazenar o DataFrame
df = None
coluna_identificador = None

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/upload', methods=['POST'])
def upload_file():
    global df, coluna_identificador
    
    if 'file' not in request.files:
        flash('Nenhum arquivo selecionado')
        return jsonify({'error': 'Nenhum arquivo selecionado'})
    
    file = request.files['file']
    if file.filename == '':
        flash('Nenhum arquivo selecionado')
        return jsonify({'error': 'Nenhum arquivo selecionado'})
    
    if file and allowed_file(file.filename):
        filename = secure_filename(file.filename)
        filepath = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(filepath)
        
        try:
            # Ler a planilha Excel
            df = pd.read_excel(filepath)
            
            # Obter nomes das colunas
            colunas = df.columns.tolist()
            
            flash(f'Arquivo {filename} carregado com sucesso!')
            return jsonify({
                'success': True,
                'message': f'Arquivo {filename} carregado com sucesso!',
                'colunas': colunas,
                'total_registros': len(df)
            })
        except Exception as e:
            flash(f'Erro ao ler o arquivo: {str(e)}')
            return jsonify({'error': f'Erro ao ler o arquivo: {str(e)}'})
    
    flash('Tipo de arquivo não permitido')
    return jsonify({'error': 'Tipo de arquivo não permitido'})

@app.route('/configurar_coluna', methods=['POST'])
def configurar_coluna():
    global coluna_identificador
    
    data = request.get_json()
    coluna_identificador = data.get('coluna')
    
    if coluna_identificador and coluna_identificador in df.columns:
        return jsonify({
            'success': True,
            'message': f'Coluna "{coluna_identificador}" configurada como identificador'
        })
    else:
        return jsonify({'error': 'Coluna inválida'})

@app.route('/consultar', methods=['POST'])
def consultar():
    global df, coluna_identificador
    
    if df is None:
        return jsonify({'error': 'Nenhum arquivo carregado'})
    
    if coluna_identificador is None:
        return jsonify({'error': 'Nenhuma coluna configurada'})
    
    data = request.get_json()
    numero_consultar = data.get('numero')
    
    if not numero_consultar:
        return jsonify({'error': 'Número não fornecido'})
    
    try:
        # Converter a coluna para string para comparação
        df[coluna_identificador] = df[coluna_identificador].astype(str)
        
        # Buscar o número na coluna
        resultado = df[df[coluna_identificador] == str(numero_consultar)]
        
        if len(resultado) > 0:
            # Encontrar o número na planilha
            return jsonify({
                'encontrado': True,
                'message': f'Número {numero_consultar} encontrado na planilha!',
                'registros': resultado.to_dict('records')
            })
        else:
            return jsonify({
                'encontrado': False,
                'message': f'Número {numero_consultar} não encontrado na planilha.'
            })
    
    except Exception as e:
        return jsonify({'error': f'Erro na consulta: {str(e)}'})

@app.route('/status')
def status():
    global df, coluna_identificador
    
    status_info = {
        'arquivo_carregado': df is not None,
        'coluna_configurada': coluna_identificador is not None,
        'total_registros': len(df) if df is not None else 0,
        'coluna_atual': coluna_identificador
    }
    
    return jsonify(status_info)

if __name__ == '__main__':
    app.run(debug=True, host='0.0.0.0', port=5000) 