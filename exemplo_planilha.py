#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para criar uma planilha Excel de exemplo para testar o sistema de consulta.
"""

import pandas as pd
import random

def criar_planilha_exemplo():
    """Cria uma planilha Excel de exemplo com dados de teste."""
    
    # Dados de exemplo
    dados = {
        'ID': [1001, 1002, 1003, 1004, 1005, 1006, 1007, 1008, 1009, 1010],
        'Nome': ['João Silva', 'Maria Santos', 'Pedro Oliveira', 'Ana Costa', 'Carlos Ferreira',
                'Lucia Pereira', 'Roberto Almeida', 'Fernanda Lima', 'Marcos Souza', 'Patricia Rocha'],
        'Email': ['joao.silva@email.com', 'maria.santos@email.com', 'pedro.oliveira@email.com',
                 'ana.costa@email.com', 'carlos.ferreira@email.com', 'lucia.pereira@email.com',
                 'roberto.almeida@email.com', 'fernanda.lima@email.com', 'marcos.souza@email.com',
                 'patricia.rocha@email.com'],
        'Telefone': ['(11) 99999-0001', '(11) 99999-0002', '(11) 99999-0003', '(11) 99999-0004',
                     '(11) 99999-0005', '(11) 99999-0006', '(11) 99999-0007', '(11) 99999-0008',
                     '(11) 99999-0009', '(11) 99999-0010'],
        'Cidade': ['São Paulo', 'Rio de Janeiro', 'Belo Horizonte', 'Salvador', 'Brasília',
                  'Fortaleza', 'Curitiba', 'Recife', 'Porto Alegre', 'Manaus']
    }
    
    # Criar DataFrame
    df = pd.DataFrame(dados)
    
    # Salvar como Excel
    nome_arquivo = 'exemplo_dados.xlsx'
    df.to_excel(nome_arquivo, index=False)
    
    print(f"✅ Planilha de exemplo criada: {nome_arquivo}")
    print(f"📊 Total de registros: {len(df)}")
    print(f"📋 Colunas disponíveis: {list(df.columns)}")
    print("\n📝 Como usar:")
    print("1. Execute a aplicação: python app.py")
    print("2. Acesse: http://localhost:5000")
    print("3. Faça upload da planilha 'exemplo_dados.xlsx'")
    print("4. Configure a coluna 'ID' como identificadora")
    print("5. Teste consultando um dos IDs: 1001, 1002, 1003, etc.")
    
    return nome_arquivo

if __name__ == "__main__":
    criar_planilha_exemplo() 