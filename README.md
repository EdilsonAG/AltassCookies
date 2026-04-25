# 🍪 Altass Cookies Gourmet — Frontend

E-commerce feito com **React + Vite + TypeScript** para a Altass Cookies.

## Tecnologias
- React 18
- React Router v6
- TypeScript
- Lucide React (ícones)
- Vite (bundler)

## Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Rodar em desenvolvimento
npm run dev
```

Acesse: http://localhost:5173

## Proxy da API

O Vite já está configurado para fazer proxy de `/api` → `http://localhost:8080`.
Ou seja, todas as chamadas no código usam `/api/...` e o Vite encaminha para o backend automaticamente — sem precisar mexer em CORS durante o desenvolvimento.

Se quiser mudar o endereço do backend, edite `vite.config.ts`:
```ts
proxy: {
  '/api': {
    target: 'http://localhost:8080', // ← mude aqui
    ...
  }
}
```

## Estrutura do projeto

```
src/
├── components/       # Componentes reutilizáveis (Navbar, Footer, ProdutoCard)
├── context/          # Context API (CartContext)
├── pages/            # Páginas (Home, Produtos, Carrinho, Checkout, Login, Cadastro, Pedidos)
├── services/         # Chamadas à API (api.ts)
├── styles/           # CSS global
└── types/            # Tipos TypeScript (index.ts)
```

## Páginas disponíveis

| Rota          | Página           |
|---------------|------------------|
| `/`           | Home             |
| `/produtos`   | Catálogo         |
| `/carrinho`   | Carrinho         |
| `/checkout`   | Finalizar pedido |
| `/login`      | Login            |
| `/cadastro`   | Cadastro         |
| `/pedidos`    | Meus pedidos     |

## Próximos passos

- [ ] Adicionar autenticação JWT
- [ ] Integrar login ao endpoint de auth quando disponível
- [ ] Página de detalhe do produto
- [ ] Integração com Stripe/Pagar.me via `clientSecret`
- [ ] Admin painel para cadastrar produtos
