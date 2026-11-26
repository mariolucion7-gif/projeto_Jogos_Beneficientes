import { Navigate } from 'react-router-dom';
export function RequireAuth(){
  return localStorage.getItem('@MRConstrucao:token') ? <Navigate to="/campanha.html" replace/> : <Navigate to="/login" replace/>;
}
