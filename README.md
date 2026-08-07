# Urban Solid Waste App ♻️

Um aplicativo móvel desenvolvido como parte de um **Trabalho de Conclusão de Curso (TCC) em Engenharia Eletrônica**, com o objetivo de incentivar o descarte correto de resíduos sólidos, promover a sustentabilidade ambiental por meio do engajamento da população, coleta seletiva e um sistema de recompensas.

O projeto consiste em um **protótipo frontend** desenvolvido com **React Native + Expo**, onde toda a persistência de dados é simulada utilizando **AsyncStorage**, dispensando um backend real, mas demonstrando todo o fluxo de funcionamento da aplicação.

---

# 📖 Sobre o Projeto

O aplicativo tem como objetivo conectar os três principais envolvidos no processo de coleta seletiva municipal:

- 👤 **População**
- ♻️ **Associação de Catadores**
- 🏛️ **Prefeitura**

O sistema permite que os cidadãos cadastrem entregas de resíduos recicláveis, acompanhem sua pontuação, consultem datas de coleta, encontrem pontos de descarte e tenham acesso a informações sobre reciclagem.

As Associações de Catadores confirmam as entregas realizadas e creditam pontos aos usuários, enquanto a Prefeitura gerencia usuários, recompensas, informações do programa e acompanha os indicadores do sistema.

---

# 🎯 Objetivos

- Incentivar o descarte correto de resíduos recicláveis.
- Aumentar a participação da população na coleta seletiva.
- Recompensar cidadãos que contribuem com o meio ambiente.
- Facilitar a comunicação entre população, associações de catadores e prefeitura.
- Demonstrar uma arquitetura escalável preparada para futura integração com um backend real.

---

# 🛠 Tecnologias Utilizadas

| Tecnologia         | Finalidade                    |
| ------------------ | ----------------------------- |
| React Native       | Desenvolvimento Mobile        |
| Expo SDK 54        | Plataforma de Desenvolvimento |
| TypeScript         | Tipagem Estática              |
| React Navigation   | Navegação                     |
| NativeWind         | Estilização                   |
| React Native Paper | Componentes Material Design   |
| React Hook Form    | Formulários                   |
| Zod                | Validação                     |
| AsyncStorage       | Persistência Local            |
| Expo Secure Store  | Persistência Dados Sensíveis  |
| Zustand            | Autenticação e Estado Global  |

---

# 👥 Perfis de Usuário

## 👤 População

Principal usuário do aplicativo.

### Funcionalidades

- Criar conta
- Realizar login
- Cadastrar entregas de resíduos recicláveis
- Consultar histórico de entregas
- Acompanhar pontuação
- Resgatar recompensas
- Consultar materiais aceitos
- Consultar calendário da coleta seletiva
- Consultar pontos de descarte
- Visualizar contatos da Prefeitura e Associação
- Gerenciar perfil

---

## ♻️ Associação de Catadores

Responsável por confirmar as entregas e creditar pontos aos usuários.

### Funcionalidades

- Visualizar entregas pendentes
- Consultar endereços das entregas
- Confirmar recebimento/coleta dos resíduos
- Creditar pontos aos usuários
- Consultar histórico de entregas

---

## 🏛️ Prefeitura

Responsável pela administração do programa.

### Funcionalidades

- Gerenciar usuários
- Gerenciar informações do programa
- Gerenciar calendário de coleta
- Gerenciar recompensas
- Monitorar dados do sistema

---

# 🏗 Arquitetura

O projeto segue uma arquitetura em camadas, separando apresentação, regras de negócio e persistência de dados.

```text
UI
│
├── Telas
├── Componentes
│
Aplicação
│
├── Hooks
├── Provider
├── Serviços
│
Dados
│
├── Repositórios
├── AsyncStorage
│
Domínio
│
├── Modelos
├── Tipos
└── Interfaces
```

## Fluxo de Dados

```text
Tela

↓

Hook

↓

Serviço

↓

Repositório

↓

AsyncStorage
```

A interface nunca acessa diretamente o AsyncStorage.

---

# 📂 Estrutura do Projeto

```text
navigation/
│
├── (auth)/
│   ├── login.tsx
│   ├── register.tsx
│   └── _layout.tsx
│
├── (citizen)/
│   ├── _layout.tsx
│   ├── home/
│   ├── deliveries/
│   ├── rewards/
│   ├── information/
│   └── profile/
│
├── (association)/
│   ├── _layout.tsx
│   ├── dashboard/
│   ├── deliveries/
│   └── profile/
│
├── (cityhall)/
│   ├── _layout.tsx
│   ├── dashboard/
│   ├── users/
│   ├── information/
│   └── profile/
│
└── _layout.tsx

src/
│
├── assets/
├── components/
│   ├── ui/
│   ├── cards/
│   ├── forms/
│   ├── layout/
│   └── feedback/
│
├── services/
├── repositories/
├── storage/
├── hooks/
├── provider/
├── store/
├── models/
├── types/
├── utils/
├── i18n/
├── constants/
├── theme/
└── mocks/
└── App.tsx
```

---

# 🧩 Módulos

- Autenticação
- População
- Associação de Catadores
- Prefeitura
- Componentes Compartilhados
- Camada de Persistência

---

# 🧭 Navegação

```text
Splash

↓

Autenticação

├── Login
└── Cadastro

↓

Seleção de Perfil

├── População
├── Associação de Catadores
└── Prefeitura
```

Cada perfil possui seu próprio fluxo de navegação utilizando **React Navigation**.

---

# 👤 Navegação da População

```text
Início

├── Entregas
│   ├── Minhas Entregas
│   ├── Cadastrar Entrega
│   └── Detalhes da Entrega
│
├── Recompensas
│   ├── Lista de Recompensas
│   └── Detalhes da Recompensa
│
├── Informações
│   ├── Materiais Aceitos
│   ├── Formas de Entrega
│   ├── Calendário da Coleta
│   ├── Pontos de Descarte
│   └── Contatos
│
└── Perfil
```

---

# ♻️ Navegação da Associação de Catadores

```text
Dashboard

├── Entregas Pendentes
├── Detalhes da Entrega
├── Confirmar Entrega
├── Creditar Pontos
└── Perfil
```

---

# 🏛️ Navegação da Prefeitura

```text
Dashboard

├── Usuários
├── Recompensas
├── Informações da Coleta
├── Calendário da Coleta
└── Perfil
```

---

# 🗃 Modelos de Domínio

## Usuário

```ts
interface User {
  id: string;
  role: "citizen" | "association" | "cityHall";
  name: string;
  cpf_or_cnpj: string;
  address: string;
  email: string;
  password: string;
  points: number;
}
```

## Entrega

```ts
interface Delivery {
  id: string;
  userId: string;
  material: string;
  quantity: number;
  unit: "kg" | "unit";
  delivery_method: "association" | "home";
  status: "Pending" | "Collected" | "Confirmed";
  created_at: string;
}
```

## Recompensa

```ts
interface Reward {
  id: string;
  title: string;
  description: string;
  required_points: number;
  available: boolean;
}
```

## Ponto de Coleta

```ts
interface CollectionPoint {
  id: string;
  name: string;
  address: string;
  phone: string;
  opening_hours: string;
}
```

## Material

```ts
interface Material {
  id: string;
  name: string;
  category: "paper" | "plastic" | "glass" | "metal" | "organic" | "electronic";
  description: string;
  preparation_instructions: string;
  accepted: boolean;
  icon: string;
}
```

## Calendário de Coleta

```ts
interface CollectionSchedule {
  neighborhood: string;
  week_day: number; // 0 = Sunday, 1 = Monday, ..., 6 = Saturday
  start_time: string; // Format: "HH:mm"
  end_time: string; // Format: "HH:mm"
}
```

---

# 💾 Persistência Local

O aplicativo simula um backend utilizando **AsyncStorage**.

```text
@currentUser

@users

@deliveries

@materials

@collectionPoints

@collectionSchedule

@contacts

@rewards
```

A camada de repositórios abstrai o acesso ao AsyncStorage, facilitando uma futura substituição por uma API REST sem alterar as telas da aplicação.

---

# 🎨 Design da Interface

A interface seguirá os princípios do **Material Design 3**, utilizando **React Native Paper**.

## Paleta de Cores

| Cor       | Finalidade |
| --------- | ---------- |
| `#2E7D32` | Primária   |
| `#66BB6A` | Secundária |
| `#81C784` | Destaque   |
| `#F7F9F8` | Fundo      |
| `#FFFFFF` | Superfície |
| `#43A047` | Sucesso    |
| `#FFB300` | Aviso      |
| `#D32F2F` | Erro       |

---

# 🧱 Componentes Reutilizáveis

- AppButton
- AppInput
- AppCard
- AppHeader
- SectionTitle
- MaterialCard
- RewardCard
- DeliveryCard
- PointsBadge
- EmptyState
- LoadingOverlay

---

# 📋 Requisitos Funcionais

Com base no TCC, o aplicativo contempla:

- Cadastro de usuários
- Login
- Armazenamento de dados dos usuários
- Cadastro de entregas
- Histórico de entregas
- Consulta de pontos de descarte
- Informações sobre reciclagem
- Sistema de pontuação
- Sistema de recompensas
- Persistência local dos dados

---

# ⚙️ Requisitos Não Funcionais

- Compatibilidade com Android
- Interface intuitiva e amigável
- Exibição de imagens com qualidade
- Respostas rápidas às ações do usuário
- Validação e mensagens de erro
- Persistência local utilizando AsyncStorage

---

# 🚀 Como Executar

## Clonar o repositório

```bash
git clone https://github.com/seu-usuario/urban-solid-waste.git

cd urban-solid-waste
```

## Instalar dependências

```bash
npm install
```

## Iniciar o projeto

```bash
npx expo start
```

## Executar no Android

```bash
npx expo start --android
```

---

# 🗺 Roadmap de Desenvolvimento

## Fase 1

- Configuração do projeto
- Tema visual
- Navegação
- Autenticação

## Fase 2

- Módulo da População
- Informações
- Recompensas
- Entregas

## Fase 3

- Módulo da Associação
- Confirmação de entregas
- Crédito de pontos

## Fase 4

- Módulo da Prefeitura
- Gerenciamento de usuários
- Gerenciamento das informações

## Fase 5

- Dados simulados (Seed)
- AsyncStorage
- Refinamento da interface
- Preparação para apresentação

---

# 🔮 Melhorias Futuras

Embora esta versão utilize AsyncStorage para simular um backend, a arquitetura foi planejada para permitir futuras evoluções, como:

- Integração com API REST
- Banco de dados em nuvem
- Notificações Push
- Validação por QR Code
- Integração com GPS
- Sincronização em tempo real
- Dashboard administrativo
- Relatórios municipais
- Parcerias com empresas
- Gamificação (medalhas, conquistas e sequências de participação)

---

# 📄 Contexto Acadêmico

Este projeto corresponde ao desenvolvimento do aplicativo proposto no **Trabalho de Conclusão de Curso (TCC) de Engenharia Eletrônica**.

A implementação tem como foco demonstrar boas práticas de arquitetura de software, experiência do usuário, navegação e o fluxo completo de um sistema de incentivo à coleta seletiva, utilizando persistência local para simular o comportamento de um ambiente de produção.

A arquitetura modular permite que o **AsyncStorage** seja substituído futuramente por um backend real com o mínimo de alterações na aplicação.
