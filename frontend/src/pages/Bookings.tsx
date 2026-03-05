import React, { useState } from 'react';
import { BookingsTable } from '../features/bookings/components/BookingsTable';
import { Plus } from 'lucide-react';
import { NewBookingModal } from '../features/bookings/components/NewBookingModal';

export const Bookings: React.FC = () => {
    const [isNewBookingModalOpen, setIsNewBookingModalOpen] = useState(false);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">All Bookings</h1>
                    <p className="text-slate-500 text-sm mt-1">Manage and track all customer travel bookings.</p>
                </div>
                <button
                    onClick={() => setIsNewBookingModalOpen(true)}
                    className="flex items-center space-x-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-md shadow-sm transition-colors font-medium"
                >
                    <Plus size={18} />
                    <span>New Booking</span>
                </button>
            </div>

            <BookingsTable />

            <NewBookingModal
                isOpen={isNewBookingModalOpen}
                onClose={() => setIsNewBookingModalOpen(false)}
            />
        </div>
    );
};
