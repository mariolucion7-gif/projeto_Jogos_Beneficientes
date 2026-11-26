import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { LayoutDashboard, Users, Package, FileText, LogOut, Menu, Bell, Search, Settings, HeartHandshake } from 'lucide-react';
import { useState } from 'react';
const nav = [
  {to:'/',label:'Visão geral',icon:LayoutDashboard},
  {to:'/produtos',label:'Produtos',icon:Package},
  {to:'/clientes',label:'Clientes',icon:Users},
  {to:'/orcamentos',label:'Orçamentos',icon:FileText},
];
export function MainLayout(){
 const [mobile,setMobile]=useState(false); const navigate=useNavigate();
 const user=localStorage.getItem('@MRConstrucao:user') || 'Operador';
 function logout(){localStorage.removeItem('@MRConstrucao:token');localStorage.removeItem('@MRConstrucao:user');localStorage.removeItem('@MRConstrucao:demo-mode');navigate('/login');}
 return <div className="shell">
  <aside className={`sidebar ${mobile?'open':''}`}>
   <div className="brand"><img className="brand-logo" src="/images/mr-construcao-logo.png" alt="Mr. Construção — Gestão Comercial"/></div>
   <div className="side-caption">MENU PRINCIPAL</div>
   <nav>{nav.map(({to,label,icon:Icon})=><NavLink key={to} to={to} end={to==='/'} onClick={()=>setMobile(false)} className={({isActive})=>isActive?'nav-item active':'nav-item'}><Icon size={18}/><span>{label}</span>{label==='Orçamentos'&&<span className="nav-dot"/>}</NavLink>)}</nav>
   <div className="sidebar-bottom"><div className="institution-card"><img src="/images/casa-sao-domingos-savio.png" alt="Imagem da Casa São Domingos Sávio"/><div className="institution-copy"><span>INSTITUIÇÃO</span><b>Casa São Domingos Sávio</b><small>Projeto institucional</small></div><HeartHandshake className="institution-heart" size={17}/></div><button className="nav-item" onClick={()=>navigate('/configuracoes')}><Settings size={18}/>Configurações</button><button className="nav-item logout" onClick={logout}><LogOut size={18}/>Sair do sistema</button></div>
  </aside>
  <section className="main-area">
   <header className="topbar"><button className="icon-button mobile-menu" onClick={()=>setMobile(!mobile)}><Menu size={20}/></button><div className="breadcrumb">Painel <span>/</span> <b>{nav.find(n=>n.to===location.pathname)?.label || 'Gestão comercial'}</b></div><div className="top-actions"><button className="icon-button"><Search size={18}/></button><button className="icon-button notification"><Bell size={18}/><i/></button><div className="user-chip"><div className="avatar">{user.slice(0,1).toUpperCase()}</div><div><b>{user}</b><small>Atendimento</small></div></div></div></header>
   <main className="page-content"><div className="demo-mode-banner"><span className="demo-pulse"/> MODO DEMONSTRAÇÃO <small>Dados de exemplo salvos somente neste navegador; não são enviados ao servidor oficial.</small></div><Outlet/></main>
   <footer className="footer">© {new Date().getFullYear()} Mr. Construção <span>•</span> Casa São Domingos Sávio <span>•</span> Gestão Comercial</footer>
  </section>
 </div>
}
