import type {
  Produto,
  CarrinhoResponse,
  PedidoResponse,
  PagamentoRequest,
  PagamentoResponse,
  Cliente,
  ClienteResponse,
} from '../types'

// Troca '/api' por 'http://localhost:8080' se não estiver usando o proxy do vite
const BASE_URL = '/api'

async function request<T>(path: string, options?: RequestInit): Promise<T> {
  const token = localStorage.getItem('access_token')
  const res = await fetch(`${BASE_URL}${path}`, {
    credentials: 'include',  
    ...(token ? { Authorization: `Bearer ${token}` } : {}),
    headers: { 'Content-Type': 'application/json', ...options?.headers },
    ...options,
  })
  if (!res.ok) throw new Error(`Erro ${res.status}`)
  if (res.status === 204) return undefined as T
  return res.json()
}

//  Produtos
export const produtoService = {
  listar: () => request<Produto[]>('/produto'),

  criar: (formData: FormData) =>
    fetch(`${BASE_URL}/produto`, { method: 'POST', body: formData }).then(r => r.json()),

  atualizarImagem: (produtoId: number, formData: FormData) =>
    fetch(`${BASE_URL}/produto/${produtoId}`, { method: 'PATCH', body: formData }).then(r => r.json()),
}

//  Carrinho 
export const carrinhoService = {
  buscar: () => request<CarrinhoResponse>('/carrinho'),

  adicionar: (id: number, quantidade: number) =>
    request<void>(`/carrinho?id=${id}&quantidade=${quantidade}`, { method: 'POST' }),

  remover: (idProduto: number) =>
    request<void>(`/carrinho?idProduto=${idProduto}`, { method: 'DELETE' }),

  editarItem: (idItemCarrinho: number, quantidade: number) =>
    request<void>('/carrinho', {
      method: 'PATCH',
      body: JSON.stringify({ idItemCarrinho, quantidade }),
    }),
}

//  Pedidos
export const pedidoService = {
  listar: () => request<PedidoResponse[]>('/pedido'),

  criar: () => request<PedidoResponse>('/pedido', { method: 'POST' }),

  cancelar: (ids: number[]) =>
    request<PedidoResponse[]>(`/pedido?${ids.map(id => `idPedido=${id}`).join('&')}`, {
      method: 'DELETE',
    }),
}

//  Pagamento 
export const pagamentoService = {
  pagar: (body: PagamentoRequest) =>
    request<PagamentoResponse>('/pagamento', {
      method: 'POST',
      body: JSON.stringify(body),
    }),
}

//  Cliente 
export const clienteService = {
  cadastrar: (body: Cliente) =>
    request<ClienteResponse>('/cliente', { method: 'POST', body: JSON.stringify(body) }),

  deletar: () => request<void>('/cliente', { method: 'DELETE' }),

  alterar: (senha: string, campos: Record<string, unknown>) =>
    request<ClienteResponse>(`/cliente/alterar/${senha}`, {
      method: 'PATCH',
      body: JSON.stringify(campos),
    }),

    
}


