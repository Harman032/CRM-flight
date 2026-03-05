import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import api from '../api/client';
import dayjs from 'dayjs';
import { ArrowLeft, User, Phone, Mail, Calendar, MapPin, MessageSquare, Clock } from 'lucide-react';

export const BookingDetails: React.FC = () => {
    const { id } = useParams<{ id: string }>();

    const { data: booking, isLoading } = useQuery({
        queryKey: ['booking', id],
        queryFn: async () => {
            const { data } = await api.get(`/bookings/${id}`);
            return data;
        },
        enabled: !!id,
    });

    if (isLoading) {
        return <div className="p-8 text-center text-slate-500">Loading booking details...</div>;
    }

    if (!booking) {
        return (
            <div className="p-8 text-center text-slate-500">
                <p>Booking not found.</p>
                <Link to="/bookings" className="mt-4 inline-block text-indigo-600 hover:text-indigo-800">
                    &larr; Back to Bookings
                </Link>
            </div>
        );
    }

    return (
        <div className="max-w-5xl mx-auto space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Link to="/bookings" className="p-2 hover:bg-slate-200 rounded-full transition-colors">
                        <ArrowLeft size={20} className="text-slate-600" />
                    </Link>
                    <div>
                        <h1 className="text-2xl font-bold text-slate-900">
                            Booking for {booking.contactPerson}
                        </h1>
                        <p className="text-slate-500 text-sm mt-1">
                            Created on {dayjs(booking.createdOn).format('MMM DD, YYYY h:mm A')} by {booking.createdByUser?.name}
                        </p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <span className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${booking.status === 'Booked' ? 'bg-green-100 text-green-800' :
                            booking.status === 'Working' ? 'bg-purple-100 text-purple-800' :
                                booking.status === 'Sent' ? 'bg-yellow-100 text-yellow-800' :
                                    'bg-blue-100 text-blue-800'
                        }`}>
                        {booking.status}
                    </span>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* Main Content Area */}
                <div className="lg:col-span-2 space-y-6">

                    {/* Requirements Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4">Detailed Requirements</h2>
                        <div className="prose prose-slate max-w-none">
                            {booking.requirements ? (
                                <p className="text-slate-700 whitespace-pre-wrap">{booking.requirements}</p>
                            ) : (
                                <p className="text-slate-400 italic">No specific requirements provided.</p>
                            )}
                        </div>
                    </div>

                    {/* Travelers Section */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-lg font-semibold text-slate-900 mb-4 flex justify-between items-center">
                            <span>Travelers ({booking.travelers?.length || 0})</span>
                        </h2>

                        {booking.travelers && booking.travelers.length > 0 ? (
                            <div className="grid gap-4 sm:grid-cols-2">
                                {booking.travelers.map((traveler: any, idx: number) => (
                                    <div key={traveler.id || idx} className="p-4 rounded-lg bg-slate-50 border border-slate-200">
                                        <div className="flex items-center space-x-2 text-indigo-700 font-medium mb-3">
                                            <User size={16} />
                                            <span>{traveler.name}</span>
                                        </div>
                                        <div className="space-y-2 text-sm text-slate-600">
                                            {traveler.email && (
                                                <div className="flex items-center space-x-2">
                                                    <Mail size={14} className="text-slate-400" />
                                                    <span>{traveler.email}</span>
                                                </div>
                                            )}
                                            {traveler.phoneNumber && (
                                                <div className="flex items-center space-x-2">
                                                    <Phone size={14} className="text-slate-400" />
                                                    <span>{traveler.phoneNumber}</span>
                                                </div>
                                            )}
                                            {traveler.country && (
                                                <div className="flex items-center space-x-2">
                                                    <MapPin size={14} className="text-slate-400" />
                                                    <span>{traveler.country}</span>
                                                </div>
                                            )}
                                            {traveler.travelDate && (
                                                <div className="flex items-center space-x-2">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    <span>Travel: {dayjs(traveler.travelDate).format('MMM DD, YYYY')}</span>
                                                </div>
                                            )}
                                            {traveler.dob && (
                                                <div className="flex items-center space-x-2">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    <span>DOB: {dayjs(traveler.dob).format('MMM DD, YYYY')}</span>
                                                </div>
                                            )}
                                            {traveler.anniversary && (
                                                <div className="flex items-center space-x-2">
                                                    <Calendar size={14} className="text-slate-400" />
                                                    <span>Anniversary: {dayjs(traveler.anniversary).format('MMM DD, YYYY')}</span>
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-6 text-slate-500 bg-slate-50 rounded-lg border border-slate-200 border-dashed">
                                No travelers added yet.
                            </div>
                        )}
                    </div>
                </div>

                {/* Sidebar Area */}
                <div className="space-y-6">
                    {/* Contact Info */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Contact Person</h2>
                        <div className="space-y-3">
                            <div className="flex items-center space-x-3 text-slate-700">
                                <User size={18} className="text-slate-400" />
                                <span className="font-medium">{booking.contactPerson}</span>
                            </div>
                            <div className="flex items-center space-x-3 text-slate-700">
                                <Phone size={18} className="text-slate-400" />
                                <span>{booking.contactNumber}</span>
                            </div>
                        </div>

                        <div className="mt-6 pt-6 border-t border-slate-200">
                            <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4">Assignment</h2>
                            <div className="flex items-center space-x-3 text-slate-700">
                                <User size={18} className="text-indigo-500" />
                                <span>{booking.assignedToUser?.name || <span className="italic text-slate-400">Unassigned</span>}</span>
                            </div>
                        </div>
                    </div>

                    {/* Comments / Activity */}
                    <div className="bg-white rounded-xl shadow-sm border border-slate-200 p-6">
                        <h2 className="text-sm font-semibold text-slate-900 uppercase tracking-wider mb-4 flex items-center">
                            <MessageSquare size={16} className="mr-2" />
                            Comments & Remarks
                        </h2>

                        <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2">
                            {booking.comments && booking.comments.length > 0 ? (
                                booking.comments.map((comment: any) => (
                                    <div key={comment.id} className="relative pl-4 border-l-2 border-indigo-100">
                                        <div className="absolute -left-[5px] top-1.5 w-2 h-2 rounded-full bg-indigo-400"></div>
                                        <div className="flex justify-between items-start mb-1">
                                            <span className="text-xs font-semibold text-slate-900">{comment.createdBy?.name}</span>
                                            <span className="text-[10px] text-slate-400 flex items-center">
                                                <Clock size={10} className="mr-1" />
                                                {dayjs(comment.createdAt).format('MMM DD, h:mm A')}
                                            </span>
                                        </div>
                                        <p className="text-sm text-slate-600 bg-slate-50 p-2 rounded-md">
                                            {comment.text}
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-sm text-slate-400 italic">No comments yet.</p>
                            )}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
};
