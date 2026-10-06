import { ReactNode } from 'react';
export function Layout({user,onLogout,children}:{user:User;onLogout:()=>void;children:ReactNode}){return <div className="shell"><header><div><span className="eyebrow">ABBEY CHALLENGE</span><h1>Connect</h1></div><div className="header-user"><span>{user.displayName}</span><button className="ghost" onClick={onLogout}>Logout</button></div></header>{children}<footer>Simple architecture. Clear responsibilities. End-to-end functionality.</footer></div>}
import type { User } from '../lib/api';
