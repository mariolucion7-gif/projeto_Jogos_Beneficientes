import { createApi, fetchBaseQuery, type BaseQueryFn, type FetchArgs, type FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import type { Cliente, ClienteDTO, Produto, ProdutoDTO, Orcamento, OrcamentoDTO, LoginDTO, LoginResponse } from '../types';

const baseUrl = import.meta.env.VITE_API_URL || 'https://winnicius.com/tecinfo/labs/api-mr-construcao/api';
const realBaseQuery = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    const token = localStorage.getItem('@MRConstrucao:token');
    if (token && !token.startsWith('demo-')) headers.set('authorization', `Bearer ${token}`);
    headers.set('accept', 'application/json');
    return headers;
  },
});

const STORAGE = {
  produtos: '@MRConstrucao:demo:produtos',
  clientes: '@MRConstrucao:demo:clientes',
  orcamentos: '@MRConstrucao:demo:orcamentos',
};
const initialProdutos: Produto[] = [
  { id:'p-001', codigo:'CIM-001', nome:'Cimento CP II 50kg', marca:'Votoran', preco:36.9, estoque:120, unidade:'SACO', categoria:'Cimento' },
  { id:'p-002', codigo:'TJL-002', nome:'Tijolo cerâmico 8 furos', marca:'Cerâmica União', preco:1.15, estoque:2500, unidade:'UN', categoria:'Alvenaria' },
  { id:'p-003', codigo:'TNT-003', nome:'Tinta acrílica branca 18L', marca:'Coral', preco:289.9, estoque:18, unidade:'LATA', categoria:'Pintura' },
  { id:'p-004', codigo:'ARE-004', nome:'Areia média', marca:'Areial São José', preco:145, estoque:32, unidade:'M³', categoria:'Agregados' },
];
const initialClientes: Cliente[] = [
  { id:'c-001', nomeCliente:'João da Silva', telefone:'(83) 99999-1111', rua:'Rua das Flores', numero:'120', bairro:'Centro', cidade:'Campina Grande', cep:'58400-000', pontoReferencia:'Próximo à praça central' },
  { id:'c-002', nomeCliente:'Maria Oliveira', telefone:'(83) 98888-2222', rua:'Av. Floriano Peixoto', numero:'450', bairro:'São José', cidade:'Campina Grande', cep:'58400-120', pontoReferencia:'Em frente à escola' },
];
function read<T>(key:string, fallback:T):T { try { const raw=localStorage.getItem(key); if(raw) return JSON.parse(raw) as T; } catch {} localStorage.setItem(key,JSON.stringify(fallback)); return fallback; }
function write<T>(key:string,value:T){localStorage.setItem(key,JSON.stringify(value));}
function id(prefix:string){return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2,7)}`;}
const demoBaseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args) => {
  const request = typeof args === 'string' ? { url: args } : args;
  const method = (request.method || 'GET').toUpperCase();
  const path = request.url.split('?')[0].replace(/^\//,'');
  const params = new URLSearchParams(request.url.split('?')[1] || '');
  const body = (request.body || {}) as Record<string, any>;
  if (path === 'auth/login' && method === 'POST') {
    const email = String(body.email || '').trim(); const senha = String(body.senha || '');
    if (!/^\S+@\S+\.\S+$/.test(email) || !senha.trim()) return { error:{status:400,data:{message:'Informe um e-mail válido e uma senha.'}} as FetchBaseQueryError };
    return { data:{ token:`demo-${Date.now()}`, usuario:{nome:email.split('@')[0],email} } as LoginResponse };
  }
  if (path.startsWith('clientes')) {
    let rows=read<Cliente[]>(STORAGE.clientes,initialClientes); const parts=path.split('/'); const itemId=parts[1];
    if(method==='GET' && !itemId){const term=(params.get('busca')||'').toLowerCase();return {data:rows.filter(x=>!term||[x.nomeCliente,x.telefone,x.bairro,x.cidade].some(v=>String(v||'').toLowerCase().includes(term)))}}
    if(method==='GET' && itemId){const found=rows.find(x=>x.id===itemId);return found?{data:found}:{error:{status:404,data:{message:'Cliente não encontrado.'}} as FetchBaseQueryError}}
    if(method==='POST'){const created={...body,id:id('c')} as Cliente;rows=[...rows,created];write(STORAGE.clientes,rows);return {data:created}}
    if(method==='PUT' && itemId){const updated={...body,id:itemId} as Cliente;rows=rows.map(x=>x.id===itemId?updated:x);write(STORAGE.clientes,rows);return {data:updated}}
    if(method==='DELETE' && itemId){rows=rows.filter(x=>x.id!==itemId);write(STORAGE.clientes,rows);return {data:{success:true}}}
  }
  if (path.startsWith('produtos')) {
    let rows=read<Produto[]>(STORAGE.produtos,initialProdutos); const parts=path.split('/'); const itemId=parts[1];
    if(method==='GET' && !itemId)return {data:rows};
    if(method==='GET' && itemId){const found=rows.find(x=>x.id===itemId);return found?{data:found}:{error:{status:404,data:{message:'Produto não encontrado.'}} as FetchBaseQueryError}}
    if(method==='POST'){const created={...body,id:id('p')} as Produto;rows=[...rows,created];write(STORAGE.produtos,rows);return {data:created}}
    if(method==='PUT' && itemId){const updated={...body,id:itemId} as Produto;rows=rows.map(x=>x.id===itemId?updated:x);write(STORAGE.produtos,rows);return {data:updated}}
    if(method==='DELETE' && itemId){rows=rows.filter(x=>x.id!==itemId);write(STORAGE.produtos,rows);return {data:{success:true}}}
  }
  if (path.startsWith('orcamentos')) {
    let rows=read<Orcamento[]>(STORAGE.orcamentos,[]); const itemId=path.split('/')[1];
    if(method==='GET' && !itemId)return {data:rows};
    if(method==='POST'){const clients=read<Cliente[]>(STORAGE.clientes,initialClientes);const products=read<Produto[]>(STORAGE.produtos,initialProdutos);const created:Orcamento={id:id('orc'),cliente:clients.find(c=>c.id===body.clienteId),clienteId:body.clienteId,data:new Date().toISOString(),status:'Registrado',valorTotal:Number(body.valorTotal||0),itens:(body.itens||[]).map((it:any)=>({...it,produto:products.find(p=>p.id===it.produtoId),subtotal:Number(it.quantidade)*Number(it.precoUnitario)}))};rows=[created,...rows];write(STORAGE.orcamentos,rows);return {data:created}}
  }
  return {error:{status:404,data:{message:`Operação de demonstração não reconhecida: ${method} ${path}`}} as FetchBaseQueryError};
};
const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (args,api,extra) => {
  const token=localStorage.getItem('@MRConstrucao:token');
  const request = typeof args === 'string' ? args : args.url;
  if(request.replace(/^\//,'').startsWith('auth/login') || token?.startsWith('demo-')) return demoBaseQuery(args,api,extra);
  return realBaseQuery(args,api,extra);
};
export const api = createApi({
  reducerPath:'api', baseQuery, tagTypes:['Produtos','Clientes','Orcamentos'],
  endpoints:(builder)=>({
    login:builder.mutation<LoginResponse,LoginDTO>({query:(body)=>({url:'/auth/login',method:'POST',body})}),
    listarClientes:builder.query<Cliente[],string|void>({query:(busca)=>busca?`/clientes?busca=${encodeURIComponent(busca)}`:'/clientes',providesTags:(r)=>r?[...r.map(({id})=>({type:'Clientes' as const,id})),{type:'Clientes',id:'LIST'}]:[{type:'Clientes',id:'LIST'}]}),
    obterCliente:builder.query<Cliente,string>({query:(id)=>`/clientes/${id}`,providesTags:(_r,_e,id)=>[{type:'Clientes',id}]}),
    criarCliente:builder.mutation<Cliente,ClienteDTO>({query:(body)=>({url:'/clientes',method:'POST',body}),invalidatesTags:[{type:'Clientes',id:'LIST'}]}),
    atualizarCliente:builder.mutation<Cliente,{id:string;dados:ClienteDTO}>({query:({id,dados})=>({url:`/clientes/${id}`,method:'PUT',body:dados}),invalidatesTags:(_r,_e,{id})=>[{type:'Clientes',id},{type:'Clientes',id:'LIST'}]}),
    excluirCliente:builder.mutation<unknown,string>({query:(id)=>({url:`/clientes/${id}`,method:'DELETE'}),invalidatesTags:(_r,_e,id)=>[{type:'Clientes',id},{type:'Clientes',id:'LIST'}]}),
    listarProdutos:builder.query<Produto[],void>({query:()=>'/produtos',providesTags:(r)=>r?[...r.map(({id})=>({type:'Produtos' as const,id})),{type:'Produtos',id:'LIST'}]:[{type:'Produtos',id:'LIST'}]}),
    obterProduto:builder.query<Produto,string>({query:(id)=>`/produtos/${id}`,providesTags:(_r,_e,id)=>[{type:'Produtos',id}]}),
    criarProduto:builder.mutation<Produto,ProdutoDTO>({query:(body)=>({url:'/produtos',method:'POST',body}),invalidatesTags:[{type:'Produtos',id:'LIST'}]}),
    atualizarProduto:builder.mutation<Produto,{id:string;dados:ProdutoDTO}>({query:({id,dados})=>({url:`/produtos/${id}`,method:'PUT',body:dados}),invalidatesTags:(_r,_e,{id})=>[{type:'Produtos',id},{type:'Produtos',id:'LIST'}]}),
    excluirProduto:builder.mutation<unknown,string>({query:(id)=>({url:`/produtos/${id}`,method:'DELETE'}),invalidatesTags:[{type:'Produtos',id:'LIST'}]}),
    listarOrcamentos:builder.query<Orcamento[],void>({query:()=>'/orcamentos',providesTags:(r)=>r?[...r.map(({id})=>({type:'Orcamentos' as const,id})),{type:'Orcamentos',id:'LIST'}]:[{type:'Orcamentos',id:'LIST'}]}),
    criarOrcamento:builder.mutation<Orcamento,OrcamentoDTO>({query:(body)=>({url:'/orcamentos',method:'POST',body}),invalidatesTags:[{type:'Orcamentos',id:'LIST'}]}),
  })
});
export const {useLoginMutation,useListarClientesQuery,useObterClienteQuery,useCriarClienteMutation,useAtualizarClienteMutation,useExcluirClienteMutation,useListarProdutosQuery,useObterProdutoQuery,useCriarProdutoMutation,useAtualizarProdutoMutation,useExcluirProdutoMutation,useListarOrcamentosQuery,useCriarOrcamentoMutation}=api;
