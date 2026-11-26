export interface Cliente {
  id: string; nomeCliente: string; telefone: string; rua: string; numero: string;
  complemento?: string; bairro: string; cidade: string; cep: string; pontoReferencia?: string;
}
export type ClienteDTO = Omit<Cliente, 'id'>;
export interface Produto {
  id: string; codigo?: string; nome: string; marca?: string; preco: number;
  estoque: number; unidade: string; categoria?: string; descricao?: string;
}
export type ProdutoDTO = Omit<Produto, 'id'>;
export interface Orcamento { id: string; cliente?: Cliente | string; clienteId?: string; data?: string; status?: string; valorTotal?: number; total?: number; itens?: ItemOrcamento[] }
export interface ItemOrcamento { produtoId: string; produto?: Produto; quantidade: number; precoUnitario: number; subtotal?: number }
export interface OrcamentoDTO { clienteId: string; itens: { produtoId: string; quantidade: number; precoUnitario: number }[]; valorTotal: number }
export interface LoginDTO { email: string; senha: string }
export interface LoginResponse { token?: string; access_token?: string; usuario?: { nome?: string; email?: string } }
