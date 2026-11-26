import { Link } from 'react-router-dom';
import { ArrowUpRight, Package, Users, FileText, Plus, Boxes, TrendingUp, ClipboardList } from 'lucide-react';
import { useListarClientesQuery,useListarProdutosQuery,useListarOrcamentosQuery } from '../services/api';
import { ApiError,Loading,PageTitle } from '../components/ui/Common';
export function Dashboard(){
 const c=useListarClientesQuery(),p=useListarProdutosQuery(),o=useListarOrcamentosQuery();
 const loading=c.isLoading||p.isLoading||o.isLoading; const failed=c.isError||p.isError||o.isError;
 return <><PageTitle eyebrow="RESUMO DA OPERAÇÃO" title="Visão geral" description="Acompanhe os principais dados da sua loja e acesse rapidamente as operações." action={<Link className="btn primary" to="/orcamentos/novo"><Plus size={17}/> Novo orçamento</Link>}/>
 {failed&&<ApiError message="Verifique a URL da API, o servidor e a autenticação. Os indicadores serão exibidos quando a conexão estiver disponível." retry={()=>{c.refetch();p.refetch();o.refetch();}}/>}
 {loading?<Loading label="Buscando informações da loja..."/>:<div className="stats-grid">
  <div className="stat-card"><div className="stat-top"><span>Produtos cadastrados</span><div className="stat-icon blue"><Package size={19}/></div></div><strong>{p.data?.length??'—'}</strong><small>Itens no catálogo</small></div>
  <div className="stat-card"><div className="stat-top"><span>Clientes</span><div className="stat-icon green"><Users size={19}/></div></div><strong>{c.data?.length??'—'}</strong><small>Compradores cadastrados</small></div>
  <div className="stat-card"><div className="stat-top"><span>Orçamentos</span><div className="stat-icon orange"><FileText size={19}/></div></div><strong>{o.data?.length??'—'}</strong><small>Propostas registradas</small></div>
  <div className="stat-card"><div className="stat-top"><span>Estoque total</span><div className="stat-icon purple"><Boxes size={19}/></div></div><strong>{p.data?.reduce((s,x)=>s+Number(x.estoque||0),0)??'—'}</strong><small>Unidades informadas</small></div>
 </div>}
 <div className="dashboard-grid"><section className="panel welcome-panel"><div className="welcome-copy"><span className="welcome-kicker">MR. CONSTRUÇÃO • CASA SÃO DOMINGOS SÁVIO</span><h2>Gestão organizada para apoiar a instituição.</h2><p>Organize produtos, acompanhe clientes e prepare orçamentos em um só lugar, com a identidade da Casa São Domingos Sávio.</p><Link to="/produtos" className="btn light">Acessar produtos <ArrowUpRight size={16}/></Link></div><div className="welcome-art"><div className="institution-art"><img src="/images/casa-sao-domingos-savio.png" alt="Casa São Domingos Sávio"/></div><div className="art-mini"><TrendingUp size={17}/><span>Gestão integrada</span></div></div></section>
 <section className="panel shortcuts"><div className="panel-heading"><div><h3>Acesso rápido</h3><p>Comece uma nova operação</p></div><ClipboardList size={20}/></div><Link to="/clientes/novo" className="shortcut"><div className="shortcut-icon green"><Users size={18}/></div><div><b>Cadastrar cliente</b><small>Adicionar comprador e endereço</small></div><ArrowUpRight size={17}/></Link><Link to="/produtos/novo" className="shortcut"><div className="shortcut-icon blue"><Package size={18}/></div><div><b>Cadastrar produto</b><small>Adicionar item ao catálogo</small></div><ArrowUpRight size={17}/></Link><Link to="/orcamentos/novo" className="shortcut"><div className="shortcut-icon orange"><FileText size={18}/></div><div><b>Criar orçamento</b><small>Montar uma proposta comercial</small></div><ArrowUpRight size={17}/></Link></section></div>
 <div className="note-strip"><div className="note-icon"><ClipboardList size={18}/></div><div><b>Ambiente de demonstração ativo</b><p>Cadastros, alterações e orçamentos são salvos localmente neste navegador para permitir a apresentação do sistema sem credenciais do servidor.</p></div></div>
 </>;
}
