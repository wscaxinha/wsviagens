# 🎲 Estrutura do Projeto Banco de Dados Agência de Viagens - WSVIAGENS

O banco de dados **WSVIAGENS** foi projetado para armazenar todas as informações essenciais para o funcionamento da plataforma. Ele contém tabelas para usuários, reservas, pacotes de viagem, destinos e pagamentos.

### 📌 Estrutura do Banco de Dados
- **Usuários**: Cadastro de clientes e administradores.

- **Pacotes de Viagem**: Informações sobre os pacotes disponíveis.

- **Reservas**: Registro das reservas efetuadas pelos clientes.

- **Pagamentos**: Gerenciamento de transações financeiras.

- **Destinos**: Lista de locais disponíveis para viagem.

## 📈 Script SQL - Físico

```sql
-- Tabela de Clientes
CREATE TABLE Cliente(
    id_cliente INT AUTO_INCREMENT PRIMARY KEY,
    nome_cli VARCHAR(100) NOT NULL,
    cpf_cli VARCHAR(14) UNIQUE NOT NULL,
    email_cli VARCHAR(100) UNIQUE NOT NULL,
    contato_cli VARCHAR(20) NOT NULL,
    data_cadastro_cli TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    
);

-- Tabela de Pacotes de Viagem
CREATE TABLE Pacote(
    id_pacote INT AUTO_INCREMENT PRIMARY KEY,
    destino_pac VARCHAR(100) NOT NULL,
    descricao_pac TEXT,
    preco_pac DECIMAL(10,2) NOT NULL CHECK (preco_pac > 0)
    
);

-- Tabela de Empresas
CREATE TABLE Empresa(
    id_empresa INT AUTO_INCREMENT PRIMARY KEY,
    fantasia_emp VARCHAR(150) NOT NULL,
    cnpj_emp VARCHAR(18) UNIQUE NOT NULL,
    endereco_emp TEXT,
    contato_emp VARCHAR(20)
   
);

-- Tabela de Funcionários (Relacionada a Empresa)
CREATE TABLE Funcionario(
    id_funcionario INT AUTO_INCREMENT PRIMARY KEY,
    id_empresa INT NOT NULL,
    nome_func VARCHAR(100) NOT NULL,
    cpf_func VARCHAR(14) UNIQUE NOT NULL,
    cargo_func VARCHAR(50) NOT NULL,    
    FOREIGN KEY (id_empresa) REFERENCES Empresa(id_empresa) ON DELETE CASCADE ON UPDATE CASCADE
    
);

-- Tabela de Usuários do Sistema (Relacionada a Cliente e Funcionário)
CREATE TABLE Usuario(
    id_usuario INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT,  
    id_funcionario INT,  
    nome_usu VARCHAR(100) NOT NULL,    
    senha_usu VARCHAR(255) NOT NULL,
    tipo_usu ENUM('Admin', 'Funcionário', 'Cliente') NOT NULL,    
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE SET NULL ON UPDATE CASCADE,
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario) ON DELETE SET NULL ON UPDATE CASCADE
  
);

-- Tabela de Reservas (Associativa entre Cliente e Pacote)
CREATE TABLE Reserva(
    id_reserva INT AUTO_INCREMENT PRIMARY KEY,
    id_cliente INT NOT NULL,
    id_pacote INT NOT NULL,
    data_ida_res DATE NOT NULL,
    data_volta_res DATE NOT NULL,
    passageiro_res INT NOT NULL CHECK (passageiro_res > 0),
    acomodacao_res ENUM('Hotel', 'Pousada', 'Resort', 'Apartamento'),
    transporte_res ENUM('Aéreo', 'Terrestre', 'Marítimo'),
    status ENUM('Confirmada', 'Cancelada', 'Pendente') DEFAULT 'Pendente',
    data_reserva_res TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (id_cliente) REFERENCES Cliente(id_cliente) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_pacote) REFERENCES Pacote(id_pacote) ON DELETE CASCADE ON UPDATE CASCADE
  
);

-- Tabela de Pagamentos (Associativa com Reserva)
CREATE TABLE Pagamento (
    id_pagamento INT AUTO_INCREMENT PRIMARY KEY,
    id_reserva INT,    
    valor_pag DECIMAL(10,2) NOT NULL CHECK (valor_pag > 0),
    forma_pag ENUM('Cartão de Crédito', 'Boleto', 'PIX', 'Transferência Bancária') NOT NULL,
    status ENUM('Pendente', 'Pago', 'Cancelado') DEFAULT 'Pendente',
    FOREIGN KEY (id_reserva) REFERENCES Reserva(id_reserva) ON DELETE CASCADE ON UPDATE CASCADE
   
);

-- Tabela Associativa para Funcionários e Pacotes (Muitos-para-Muitos)
CREATE TABLE Funcionario_Pacote (
    id_funcionario INT NOT NULL,
    id_pacote INT NOT NULL,
    PRIMARY KEY (id_funcionario, id_pacote),
    FOREIGN KEY (id_funcionario) REFERENCES Funcionario(id_funcionario) ON DELETE CASCADE ON UPDATE CASCADE,
    FOREIGN KEY (id_pacote) REFERENCES Pacote(id_pacote) ON DELETE CASCADE ON UPDATE CASCADE
);
```

## 📈 Diagrama SQL - Lógico

![Modelo Lógico](/IMG/model_logico_wsviagens.png)

## 📈 Diagrama SQL - Conceitual
![Modelo Conceitual](/IMG/wsviagens_Conceitual.png)


