#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Script para converter o arquivo de identificadores para CSV formatado
"""

import pandas as pd
import os

def converter_identificadores():
    """Converte o arquivo de identificadores para CSV formatado"""
    
    # Caminho do arquivo original (usando o CSV anexado)
    arquivo_original = r"c:\Users\felipe.matano\Downloads\interface_consulta_identificadores\identificadores.csv"
    
    # Verificar se o arquivo existe
    if not os.path.exists(arquivo_original):
        print(f"❌ Arquivo não encontrado: {arquivo_original}")
        print("💡 Verifique se o arquivo está no caminho correto")
        return
    
    try:
        # Ler o arquivo original (uma coluna com números)
        df = pd.read_csv(arquivo_original, header=None, names=['Identificador'])
        
        # Criar arquivo CSV formatado
        arquivo_formatado = 'identificadores_formatado.csv'
        df.to_csv(arquivo_formatado, index=False)
        
        print(f"✅ Arquivo convertido com sucesso!")
        print(f"📁 Arquivo original: {arquivo_original}")
        print(f"📁 Arquivo formatado: {arquivo_formatado}")
        print(f"📊 Total de registros: {len(df)}")
        print(f"📋 Coluna criada: 'Identificador'")
        
        # Mostrar primeiros registros
        print(f"\n📋 Primeiros 5 registros:")
        print(df.head())
        
        print(f"\n💡 Como usar:")
        print(f"python consulta_simples.py {arquivo_formatado}")
        
        return arquivo_formatado
        
    except Exception as e:
        print(f"❌ Erro ao converter arquivo: {e}")
        return None

if __name__ == "__main__":
    converter_identificadores() 