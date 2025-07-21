#!/usr/bin/env python3
"""
Servidor local simples para resolver problemas de CORS
Execute este arquivo e acesse http://localhost:8000
"""

import http.server
import socketserver
import os
import urllib.request
import json
from urllib.parse import urlparse, parse_qs

# Configuração
PORT = 8000
SHEET_ID = '1NV0uPbo7mppwdaVLpadnisr5EXBo6-F_3koAb-Dl9d0'

class CORSHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        super().end_headers()
    
    def do_OPTIONS(self):
        self.send_response(200)
        self.end_headers()
    
    def do_GET(self):
        # Rota para buscar dados do Google Sheets
        if self.path.startswith('/api/sheets'):
            try:
                # URL do Google Sheets
                sheet_url = f"https://docs.google.com/spreadsheets/d/{SHEET_ID}/gviz/tq?tqx=out:json&gid=0"
                
                # Fazer requisição para o Google Sheets
                with urllib.request.urlopen(sheet_url) as response:
                    data = response.read().decode('utf-8')
                
                # Enviar resposta
                self.send_response(200)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                self.wfile.write(data.encode())
                
            except Exception as e:
                self.send_response(500)
                self.send_header('Content-type', 'application/json')
                self.end_headers()
                error_data = {'error': str(e)}
                self.wfile.write(json.dumps(error_data).encode())
        else:
            # Servir arquivos estáticos normalmente
            super().do_GET()

def main():
    # Mudar para o diretório do script
    os.chdir(os.path.dirname(os.path.abspath(__file__)))
    
    # Criar servidor
    with socketserver.TCPServer(("", PORT), CORSHTTPRequestHandler) as httpd:
        print(f"🚀 Servidor rodando em http://localhost:{PORT}")
        print(f"📁 Abra http://localhost:{PORT}/index.html no navegador")
        print(f"🔧 Para parar o servidor, pressione Ctrl+C")
        print(f"📊 API disponível em http://localhost:{PORT}/api/sheets")
        
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Servidor parado")

if __name__ == "__main__":
    main() 