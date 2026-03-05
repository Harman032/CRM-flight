import React from 'react';
import { BookingsTable } from '../features/bookings/components/BookingsTable';
import { CheckCircle } from 'lucide-react';

export const BookedEDT: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center px-2">
                <div className="flex items-center space-x-3">
                    <div className="bg-green-100 p-2 rounded-full">
                        <CheckCircle className="text-green-600" size={24} />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">Booked & EDT</h1>
                        <p className="text-slate-500 text-sm mt-1">Customers who have confirmed bookings and expected dates of travel.</p>
                    </div>
                </div>
            </div>

            <BookingsTable statusFilter="Booked" isEDTView={true} />
        </div>
    );
};
