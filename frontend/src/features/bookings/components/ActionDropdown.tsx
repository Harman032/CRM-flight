import React from 'react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
    DropdownMenuSeparator,
} from '../../../components/ui/dropdown-menu';
import { MoreHorizontal, Edit, UserPlus, MessageSquare } from 'lucide-react';
import type { Booking } from '../../../types';
import { useAuth } from '../../../context/AuthContext';

interface ActionDropdownProps {
    booking: Booking;
    onUpdateStatusClick: (booking: Booking) => void;
    onChangeAgentClick: (booking: Booking) => void;
    onAddCommentClick: (booking: Booking) => void;
}

export const ActionDropdown: React.FC<ActionDropdownProps> = ({
    booking,
    onUpdateStatusClick,
    onChangeAgentClick,
    onAddCommentClick,
}) => {
    const { user } = useAuth();

    // Admins can change agents. Agents cannot change their own assignment.
    const canChangeAgent = user?.role === 'ADMIN';

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <button className="p-2 text-slate-500 hover:text-indigo-600 bg-slate-50 hover:bg-indigo-50 rounded-md transition-colors border border-transparent hover:border-indigo-200">
                    <MoreHorizontal size={18} />
                </button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-48">
                <DropdownMenuItem onClick={() => onUpdateStatusClick(booking)} className="cursor-pointer flex items-center">
                    <Edit className="mr-2 h-4 w-4 text-slate-500" />
                    <span>Update Status</span>
                </DropdownMenuItem>

                {canChangeAgent && (
                    <DropdownMenuItem onClick={() => onChangeAgentClick(booking)} className="cursor-pointer flex items-center">
                        <UserPlus className="mr-2 h-4 w-4 text-slate-500" />
                        <span>Change Assigned Agent</span>
                    </DropdownMenuItem>
                )}

                <DropdownMenuSeparator />

                <DropdownMenuItem onClick={() => onAddCommentClick(booking)} className="cursor-pointer flex items-center">
                    <MessageSquare className="mr-2 h-4 w-4 text-slate-500" />
                    <span>Add Comments / Remarks</span>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
};
