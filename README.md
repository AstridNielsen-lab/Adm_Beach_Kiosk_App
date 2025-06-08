# 🏖️ AdmBeachApp - Sistema Completo de Gestão para Quiosques

<div align="center">

![AdmBeachApp Logo](https://img.shields.io/badge/AdmBeachApp-v2.0-blue?style=for-the-badge&logo=beach&logoColor=white)
![.NET MAUI](https://img.shields.io/badge/.NET%20MAUI-9.0-purple?style=for-the-badge&logo=dotnet)
![Blazor](https://img.shields.io/badge/Blazor-WebView-orange?style=for-the-badge&logo=blazor)
![License](https://img.shields.io/badge/License-Proprietary-red?style=for-the-badge)

**Sistema profissional de gestão completa para quiosques de praia**

[🚀 Demo ao Vivo](#-demonstração) • [📱 Funcionalidades](#-funcionalidades-principais) • [🛠️ Instalação](#️-instalação) • [📖 Documentação](#-documentação)

</div>

---

## 📋 Sobre o Projeto

O **AdmBeachApp** é uma solução completa e proprietária desenvolvida especificamente para a gestão de quiosques de praia. O sistema oferece controle total sobre vendas, estoque, atendimento e operações do dia a dia, com uma interface moderna e intuitiva.

### 🎯 **Desenvolvido por:**
- **💻 Desenvolvedor:** Julio Campos Machado - [Like Look Solutions](https://likelook.wixsite.com/solutions)
- **👨‍💼 Gerente do Projeto:** Marcelo Oliveira Arrebola
- **📧 Contato:** juliocamposmachado@gmail.com

---

## 🚀 Demonstração

### 🌐 **Acesso Rápido aos Demos:**

| Versão | Descrição | Link |
|--------|-----------|------|
| 🖥️ **Sistema Completo** | Versão com todas as funcionalidades | [sistema-completo.html](./sistema-completo.html) |
| 💰 **Frente de Caixa** | Demo da frente de caixa standalone | [frente-caixa-demo.html](./frente-caixa-demo.html) |
| 📱 **App .NET MAUI** | Aplicação multiplataforma | [AdmBeachApp/](./AdmBeachApp/) |

> **⚡ Para testar rapidamente:** Baixe e abra qualquer arquivo `.html` no seu navegador!

---

## 📱 Funcionalidades Principais

### 💰 **1. Frente de Caixa Inteligente**
- ✅ **Sistema de vendas** com carrinho interativo
- ✅ **Múltiplas formas de pagamento** (Dinheiro, Cartão, PIX)
- ✅ **Seleção de mesas** para pedidos
- ✅ **Cálculo automático** de totais e subtotais
- ✅ **Interface responsiva** para tablets e desktops
- ✅ **Produtos com ícones** para fácil identificação

### 🗺️ **2. Mapa das Mesas com Monitoramento Inteligente**
- 🟢 **Verde:** Mesa livre
- 🔴 **Vermelho:** Mesa ocupada (< 15 min)
- 🟡 **Amarelo pulsando:** Atenção necessária (15-30 min)
- 🔴 **Vermelho piscando:** Urgente (> 30 min)
- ⏱️ **Contador de tempo** em cada mesa
- 📊 **Estatísticas em tempo real**
- 🔔 **Sistema de chamada** para garçons

### 📦 **3. Controle de Estoque Avançado**
- 📊 **Status automático** dos produtos
- ⚠️ **Alertas de estoque baixo**
- ➕ **Adição rápida** de produtos
- 🗑️ **Remoção** de itens descontinuados
- 🔄 **Sincronização** com vendas

### 👨‍🍳 **4. Gestão de Garçons**
- 👥 **Cadastro completo** de funcionários
- 🟢🔴 **Status online/offline** em tempo real
- 📱 **Atribuição automática** via QR Code
- 📊 **Controle de performance**

### ➕ **5. Cadastro de Produtos**
- 📝 **Formulário completo** (Nome, Preço, Estoque, Ícone)
- 🏷️ **Categorização** automática
- 🎯 **Estoque mínimo** configurável
- 🖼️ **Ícones personalizados** com emojis

### 📱 **6. Sistema de QR Codes para Clientes**
- 📲 **Geração automática** de QR por mesa
- 🔗 **Link direto** para app do cliente
- 👨‍🍳 **Associação** com garçon responsável
- 🖨️ **Impressão** formatada
- 📱 **Pedidos diretos** via celular do cliente

### 📊 **7. Relatórios e Dashboards**
- 💰 **Vendas do dia** em tempo real
- 📈 **Produtos mais vendidos**
- ⏱️ **Tempo médio de atendimento**
- 📊 **Estatísticas** de ocupação das mesas

---

## 🛠️ Instalação

### 📋 **Pré-requisitos:**
- **Windows 10/11** (versão 19041 ou superior)
- **.NET 9.0 SDK** ou superior
- **Visual Studio 2022** ou **Visual Studio Code**
- **Git** para controle de versão

### 🔧 **Instalação do Projeto .NET MAUI:**

```bash
# 1. Clonar o repositório
git clone https://github.com/AstridNielsen-lab/Beach-Kiosk.git
cd Beach-Kiosk

# 2. Navegar para o projeto
cd AdmBeachApp

# 3. Restaurar dependências
dotnet restore

# 4. Compilar o projeto
dotnet build

# 5. Executar (Windows)
dotnet run --framework net9.0-windows10.0.19041.0
```

### 🌐 **Teste Rápido (HTML Standalone):**

```bash
# 1. Baixar arquivos HTML
wget https://raw.githubusercontent.com/AstridNielsen-lab/Beach-Kiosk/main/sistema-completo.html

# 2. Abrir no navegador
start sistema-completo.html  # Windows
open sistema-completo.html   # macOS
xdg-open sistema-completo.html  # Linux
```

---

## 📖 Documentação

### 🏗️ **Arquitetura do Sistema:**

```
AdmBeachApp/
├── 📱 Sistema Principal (.NET MAUI + Blazor)
│   ├── Components/
│   │   ├── Pages/
│   │   │   ├── FrenteCaixa.razor    # 💰 Frente de Caixa
│   │   │   ├── Login.razor          # 🔐 Autenticação
│   │   │   └── Main.razor           # 🏠 Dashboard
│   │   └── Layout/
│   │       ├── MainLayout.razor     # 🎨 Layout Principal
│   │       └── NavMenu.razor        # 🧭 Navegação
│   ├── Services/
│   │   └── ApiService.cs            # 🔌 Comunicação com API
│   └── wwwroot/                     # 🌐 Recursos Web
├── 🌐 Sistema Completo HTML
│   └── sistema-completo.html        # 🚀 Versão Standalone
└── 🏖️ API Backend
    └── API_Backend/                 # ⚙️ Servidor de Dados
```

### 🎨 **Tecnologias Utilizadas:**

| Tecnologia | Versão | Uso |
|------------|--------|-----|
| **.NET MAUI** | 9.0 | Framework multiplataforma |
| **Blazor** | 9.0 | Interface web moderna |
| **SQLite** | 3.x | Banco de dados local |
| **Bootstrap** | 5.3 | Framework CSS |
| **FontAwesome** | 6.4 | Ícones profissionais |
| **QRCode.js** | 1.5 | Geração de QR Codes |
| **C#** | 12.0 | Linguagem principal |

---

## 🚀 Uso do Sistema

### 💰 **1. Frente de Caixa:**
1. **Selecionar produtos** clicando nos cards
2. **Escolher mesa** no carrinho (opcional)
3. **Definir forma de pagamento**
4. **Finalizar venda** e ver confirmação

### 🗺️ **2. Mapa das Mesas:**
1. **Visualizar status** das mesas por cores
2. **Clicar em uma mesa** para ver detalhes
3. **Abrir/Fechar** mesas conforme necessário
4. **Chamar garçon** quando necessário

### 📦 **3. Gestão de Estoque:**
1. **Acompanhar níveis** de estoque
2. **Adicionar produtos** quando necessário
3. **Monitorar alertas** de estoque baixo

### 📱 **4. QR Codes:**
1. **Selecionar mesa** e garçon
2. **Gerar QR Code**
3. **Imprimir** e colar na mesa
4. **Clientes escaneiam** para fazer pedidos

---

## 🔧 Configuração

### ⚙️ **Variáveis de Ambiente:**

```bash
# API Configuration
API_BASE_URL=http://localhost:5209
DATABASE_PATH=./database.db

# Google OAuth (Opcional)
GOOGLE_CLIENT_ID=your_client_id
GOOGLE_CLIENT_SECRET=your_client_secret

# App Settings
APP_NAME=AdmBeachApp
APP_VERSION=2.0.0
```

### 🎯 **Configurações do Sistema:**

```json
{
  "AppSettings": {
    "CompanyName": "Seu Quiosque",
    "Address": "Praia de Copacabana",
    "Phone": "+55 21 99999-9999",
    "Email": "contato@seuquiosque.com"
  },
  "SystemSettings": {
    "AutoBackup": true,
    "BackupInterval": "24h",
    "MaxTables": 50,
    "SessionTimeout": "8h"
  }
}
```

---

## 🔐 Segurança e Licença

### ⚖️ **Licença Proprietária:**

> **⚠️ IMPORTANTE:** Este software é **proprietário** e protegido por leis de direitos autorais. O uso é permitido **somente mediante autorização expressa** da Like Look Solutions.

### 🚫 **Proibições:**
- ❌ Cópia ou distribuição não autorizada
- ❌ Modificação do código sem permissão
- ❌ Uso comercial sem licenciamento
- ❌ Engenharia reversa
- ❌ Remoção de marcas de copyright

### 🛡️ **Proteção Legal:**
- 📜 Protegido pela **Lei de Direitos Autorais** (Lei nº 9.610/1998)
- 💻 Protegido pela **Lei de Software** (Lei nº 9.609/1998)
- ⚖️ **Violações resultarão em ações legais**

---

## 📞 Suporte e Contato

### 🤝 **Suporte Técnico:**
- 📧 **Email:** juliocamposmachado@gmail.com
- 🌐 **Website:** [Like Look Solutions](https://likelook.wixsite.com/solutions)
- 💼 **LinkedIn:** [Julio Campos Machado](https://linkedin.com/in/julio-campos-machado)

### 💰 **Licenciamento Comercial:**
- 📋 **Licenças personalizadas** disponíveis
- 🔧 **Customizações** sob demanda
- 🎓 **Treinamento** para equipes
- 🛠️ **Suporte técnico** especializado

### 🐛 **Reportar Problemas:**
- 📝 **Issues:** Apenas para **clientes licenciados**
- 📧 **Email:** Para suporte direto
- 📞 **Telefone:** Disponível para clientes Premium

---

## 📊 Status do Projeto

### ✅ **Funcionalidades Implementadas:**
- [x] 💰 Frente de Caixa Completa
- [x] 🗺️ Mapa das Mesas com Monitoramento
- [x] 📦 Controle de Estoque
- [x] 👨‍🍳 Gestão de Garçons
- [x] ➕ Cadastro de Produtos
- [x] 📱 Sistema de QR Codes
- [x] 📊 Relatórios Básicos

### 🚧 **Em Desenvolvimento:**
- [ ] 📈 Relatórios Avançados
- [ ] 🔄 Sincronização em Nuvem
- [ ] 📱 App Mobile para Garçons
- [ ] 🧾 Impressão de Comandas
- [ ] 💳 Integração com TEF
- [ ] 📊 Business Intelligence

### 🔮 **Roadmap Futuro:**
- [ ] 🤖 Inteligência Artificial para Previsões
- [ ] 🌐 Sistema Multi-Filial
- [ ] 📲 App para Clientes
- [ ] 💬 Chat Integrado
- [ ] 🔔 Notificações Push

---

## 📈 Estatísticas

<div align="center">

![GitHub repo size](https://img.shields.io/github/repo-size/AstridNielsen-lab/Beach-Kiosk?style=flat-square)
![GitHub last commit](https://img.shields.io/github/last-commit/AstridNielsen-lab/Beach-Kiosk?style=flat-square)
![GitHub issues](https://img.shields.io/github/issues/AstridNielsen-lab/Beach-Kiosk?style=flat-square)
![GitHub stars](https://img.shields.io/github/stars/AstridNielsen-lab/Beach-Kiosk?style=flat-square)

</div>

---

## 🏆 Reconhecimentos

### 🎯 **Agradecimentos Especiais:**
- **Marcelo Oliveira Arrebola** - Idealização e gestão do projeto
- **Like Look Solutions** - Desenvolvimento e suporte técnico
- **Comunidade .NET** - Ferramentas e recursos
- **Bootstrap Team** - Framework CSS

### 🛠️ **Ferramentas Utilizadas:**
- **Visual Studio 2022** - IDE principal
- **Git & GitHub** - Controle de versão
- **Figma** - Design de interface
- **Postman** - Testes de API

---

<div align="center">

**© 2024 Like Look Solutions - Todos os direitos reservados.**

**AdmBeachApp v2.0** | Desenvolvido com ❤️ para quiosques de praia

[⬆️ Voltar ao topo](#️-admbeachapp---sistema-completo-de-gestão-para-quiosques)

</div>

# **AdmBeachApp**  

## 📌 **Visão Geral**  
O **AdmBeachApp** é um **software proprietário** desenvolvido para a **gestão de quiosques de praia**, facilitando o controle de **vendas, estoque e operações** do dia a dia. O aplicativo oferece **autenticação segura via Google OAuth**, armazenamento local com **SQLite**, interface responsiva com **.NET MAUI** e **Blazor**, e uma gestão eficiente de produtos e transações.  

💡 **Gerente do Projeto:** **Marcelo Oliveira Arrebola**  
💻 **Desenvolvedor:** **Julio Campos Machado** – [Like Look Solutions](https://likelook.wixsite.com/solutions)  

## 🎯 **Principais Funcionalidades**  
✔️ **Login Seguro e Rápido** – Autenticação via Google OAuth.  
✔️ **Gestão de Vendas** – Registro de transações em tempo real.  
✔️ **Controle de Estoque** – Monitoramento de produtos e níveis de reposição.  
✔️ **Banco de Dados Integrado** – Armazenamento local com SQLite.  
✔️ **Interface Responsiva** – Experiência fluida com **.NET MAUI** e **Blazor**.  

## 🚀 **Benefícios do AdmBeachApp**  
📊 **Maior controle** sobre as operações do quiosque.  
🔒 **Segurança** no acesso e armazenamento de dados.  
📱 **Acesso fácil** de qualquer dispositivo compatível.  
📈 **Eficiência** na gestão de estoque e vendas.  

## 🛠️ **Tecnologias Utilizadas**  
🔹 **.NET MAUI** – Desenvolvimento multiplataforma.  
🔹 **Blazor** – Interface web moderna e dinâmica.  
🔹 **SQLite** – Banco de dados local e eficiente.  
🔹 **Google OAuth** – Autenticação segura.  
🔹 **C#** – Linguagem principal do projeto.  

---

# ⚖️ **Termos de Uso e Proteção Legal**  

## 📜 **Licença e Propriedade Intelectual**  
O **AdmBeachApp** é um software **proprietário**, protegido por **leis de direitos autorais, propriedade intelectual e proteção de software**. Seu uso é permitido **somente mediante autorização expressa da Like Look Solutions**.  

**🔒 Direitos Reservados:**  
- **Todo o código-fonte, design, arquitetura e funcionalidades são de propriedade exclusiva da Like Look Solutions.**  
- **O uso, cópia, modificação, distribuição ou comercialização sem autorização são terminantemente proibidos.**  
- **Este software não pode ser incorporado a outros produtos sem licenciamento oficial.**  

## 🚫 **Proibições e Penalidades Legais**  
É expressamente **proibido**:  
❌ Copiar, distribuir, revender ou sublicenciar o software sem autorização.  
❌ Modificar ou criar versões derivadas do software.  
❌ Usar engenharia reversa, descompilação ou desmontagem para obter o código-fonte.  
❌ Utilizar qualquer parte do software para fins concorrenciais ou comerciais não autorizados.  
❌ Remover avisos de copyright, marcas registradas ou qualquer identificação da Like Look Solutions.  

🔴 **Infração à licença resultará em ações legais, podendo incluir sanções civis e criminais com base na Lei de Direitos Autorais (Lei nº 9.610/1998), Lei de Software (Lei nº 9.609/1998) e Código Penal Brasileiro.**  

## 📑 **Registro e Proteção Jurídica**  
Este software está registrado e protegido por legislação nacional e internacional de propriedade intelectual.  
A empresa **Like Look Solutions** detém todos os direitos sobre o **AdmBeachApp**, incluindo código, design, interface e documentação.  

Caso ocorra qualquer infração aos termos estabelecidos, **medidas legais serão aplicadas**, incluindo **notificação extrajudicial, processo civil e criminal, e solicitação de indenização por danos materiais e morais.**  

## 🔍 **Fiscalização e Denúncia de Uso Indevido**  
Caso identifique **uso não autorizado** ou **cópia indevida** do software, entre em contato imediatamente pelo e-mail **juliocamposmachado@gmail.com** para que **ações legais sejam tomadas**.  

---

# 📬 **Aquisição de Licença e Suporte**  
Para adquirir uma **licença comercial**, suporte técnico ou parceria, entre em contato:  

📌 **Gerente do Projeto:** Marcelo Oliveira Arrebola  
📌 **Desenvolvimento:** Julio Campos Machado – [Like Look Solutions](https://likelook.wixsite.com/solutions)  
📧 **E-mail:** juliocamposmachado@gmail.com  

📅 **Ano de Registro:** 2024  
📍 **Empresa:** Like Look Solutions  
© **2024 Like Look Solutions – Todos os direitos reservados.**  
