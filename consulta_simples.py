#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Sistema simples de consulta de números em arquivo CSV
"""

import pandas as pd
import os
import sys

def carregar_csv(caminho_arquivo):
    """Carrega o arquivo CSV e retorna o DataFrame"""
    try:
        df = pd.read_csv(caminho_arquivo)
        print(f"✅ Arquivo carregado com sucesso!")
        print(f"📊 Total de registros: {len(df)}")
        print(f"📋 Colunas disponíveis: {list(df.columns)}")
        return df
    except Exception as e:
        print(f"❌ Erro ao carregar arquivo: {e}")
        return None

def configurar_coluna(df):
    """Permite ao usuário escolher a coluna identificadora"""
    print("\n📋 Colunas disponíveis:")
    for i, coluna in enumerate(df.columns, 1):
        print(f"  {i}. {coluna}")
    
    while True:
        try:
            escolha = input(f"\nEscolha o número da coluna (1-{len(df.columns)}): ")
            indice = int(escolha) - 1
            
            if 0 <= indice < len(df.columns):
                coluna_escolhida = df.columns[indice]
                print(f"✅ Coluna '{coluna_escolhida}' configurada!")
                return coluna_escolhida
            else:
                print("❌ Número inválido. Tente novamente.")
        except ValueError:
            print("❌ Digite um número válido.")

def consultar_numero(df, coluna):
    """Consulta um número na coluna especificada"""
    while True:
        numero = input(f"\n🔍 Digite o número para consultar (ou 'sair' para encerrar): ")
        
        if numero.lower() == 'sair':
            return False
        
        if not numero.strip():
            print("❌ Digite um número válido.")
            continue
        
        try:
            # Converter a coluna para string para comparação
            df[coluna] = df[coluna].astype(str)
            
            # Buscar o número
            resultado = df[df[coluna] == str(numero)]
            
            if len(resultado) > 0:
                print(f"\n✅ Número {numero} ENCONTRADO!")
                print(f"📊 Encontrado {len(resultado)} registro(s):")
                print("\n" + "="*50)
                for idx, row in resultado.iterrows():
                    print(f"Registro {idx + 1}:")
                    for col in resultado.columns:
                        print(f"  {col}: {row[col]}")
                    print("-" * 30)
            else:
                print(f"\n❌ Número {numero} NÃO encontrado na planilha.")
                
        except Exception as e:
            print(f"❌ Erro na consulta: {e}")
        
        print("\n" + "="*50)

def main():
    """Função principal"""
    print("="*60)
    print("🔍 SISTEMA SIMPLES DE CONSULTA CSV")
    print("="*60)
    
    # Verificar se o arquivo CSV foi fornecido como argumento
    if len(sys.argv) > 1:
        arquivo_csv = sys.argv[1]
    else:
        # Solicitar caminho do arquivo
        arquivo_csv = input("📁 Digite o caminho do arquivo CSV: ").strip()
    
    # Verificar se o arquivo existe
    if not os.path.exists(arquivo_csv):
        print(f"❌ Arquivo não encontrado: {arquivo_csv}")
        print("\n💡 Dica: Você pode:")
        print("1. Arrastar o arquivo CSV para esta janela")
        print("2. Ou executar: python consulta_simples.py caminho/do/arquivo.csv")
        return
    
    # Carregar o arquivo CSV
    df = carregar_csv(arquivo_csv)
    if df is None:
        return
    
    # Configurar coluna identificadora
    coluna = configurar_coluna(df)
    
    # Loop de consultas
    print(f"\n🎯 Sistema configurado!")
    print(f"📁 Arquivo: {arquivo_csv}")
    print(f"📋 Coluna: {coluna}")
    print(f"📊 Registros: {len(df)}")
    
    consultar_numero(df, coluna)
    
    print("\n👋 Obrigado por usar o sistema de consulta!")

if __name__ == "__main__":
    main() 