import type { ReactNode } from 'react';
import { AlertCircle, LoaderCircle, RefreshCw } from 'lucide-react';
export function PageTitle({eyebrow,title,description,action}:{eyebrow:string;title:string;description:string;action?:ReactNode}){return <div className="page-title"><div><div className="eyebrow">{eyebrow}</div><h1>{title}</h1><p>{description}</p></div>{action&&<div className="title-action">{action}</div>}</div>}
export function Loading({label='Carregando dados...'}:{label?:string}){return <div className="state-box"><LoaderCircle className="spin" size={22}/>{label}</div>}
export function ApiError({message='Não foi possível comunicar com a API.',retry}:{message?:string;retry?:()=>void}){return <div className="error-box"><AlertCircle size={20}/><div><b>Não foi possível carregar os dados</b><p>{message}</p>{retry&&<button className="text-button" onClick={retry}><RefreshCw size={14}/> Tentar novamente</button>}</div></div>}
export function Empty({title,description}:{title:string;description:string}){return <div className="empty-state"><div className="empty-icon"><AlertCircle size={22}/></div><b>{title}</b><p>{description}</p></div>}
