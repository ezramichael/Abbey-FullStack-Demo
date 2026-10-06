const API = import.meta.env.VITE_API_URL || 'http://localhost:4000/api';
async function request<T>(path:string, options:RequestInit = {}):Promise<T>{ const response=await fetch(`${API}${path}`,{...options,credentials:'include',headers:{'Content-Type':'application/json',...(options.headers||{})}}); const data=await response.json().catch(()=>({})); if(!response.ok) throw new Error(data.message||'Request failed'); return data; }
export const api={
 login:(email:string,password:string)=>request<{user:User}>('/auth/login',{method:'POST',body:JSON.stringify({email,password})}),
 register:(email:string,password:string,displayName:string)=>request<{user:User}>('/auth/register',{method:'POST',body:JSON.stringify({email,password,displayName})}),
 logout:()=>request('/auth/logout',{method:'POST'}), me:()=>request<{user:User}>('/me'),
 updateMe:(data:Partial<Pick<User,'displayName'|'bio'>>)=>request<{user:User}>('/me',{method:'PATCH',body:JSON.stringify(data)}),
 search:(q:string)=>request<{users:User[]}>(`/users?search=${encodeURIComponent(q)}`),
 relationships:()=>request<{relationships:RelationshipView[]}>('/relationships'),
 sendRequest:(id:string)=>request(`/relationships/requests/${id}`,{method:'POST'}),
 respond:(id:string,action:'accept'|'reject')=>request(`/relationships/requests/${id}`,{method:'PATCH',body:JSON.stringify({action})}),
 remove:(id:string)=>request(`/relationships/${id}`,{method:'DELETE'})
};
export type User={id:string;email:string;displayName:string;bio:string;createdAt:string};
export type RelationshipView={id:string;status:string;direction:'incoming'|'outgoing';user:User;createdAt:string};
