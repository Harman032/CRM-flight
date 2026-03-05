import React from 'react';
import { useAuth } from '../../context/AuthContext';
import { LogOut, Bell } from 'lucide-react';

export const Topbar: React.FC = () => {
    const { logout } = useAuth();

    return (
        <header className="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-6">
            <div className="flex-1">
                {/* Placeholder for global search if needed */}
                <h1 className="text-xl font-semibold text-slate-800">Dashboard</h1>
            </div>
            <div className="flex items-center space-x-4">
                <button className="text-slate-500 hover:text-slate-700 transition-colors">
                    <Bell size={20} />
                </button>
                <button
                    onClick={logout}
                    className="flex items-center space-x-2 text-sm font-medium text-slate-600 hover:text-red-600 transition-colors"
                >
                    <LogOut size={18} />
                    <span>Logout</span>
                </button>
            </div>
        </header>
    );
};
