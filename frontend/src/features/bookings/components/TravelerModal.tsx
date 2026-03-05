import React from 'react';
import { useForm, useFieldArray } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import api from '../../../api/client';
import type { Booking } from '../../../types';
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
} from '../../../components/ui/dialog';
import { toast } from 'sonner';
import { Plus, Trash2 } from 'lucide-react';

const travelerSchema = z.object({
    name: z.string().min(1, 'Name is required'),
    phoneNumber: z.string().optional(),
    email: z.string().email('Invalid email').optional().or(z.literal('')),
    country: z.string().optional(),
    flightFrom: z.string().optional(),
    flightTo: z.string().optional(),
    departureTime: z.string().optional(),
    arrivalTime: z.string().optional(),
    travelDate: z.string().optional(),
    dob: z.string().optional(),
    anniversary: z.string().optional(),
});

const formSchema = z.object({
    travelers: z.array(travelerSchema).min(1, 'At least one traveler is required'),
});

type FormValues = z.infer<typeof formSchema>;

interface TravelerModalProps {
    booking: Booking | null;
    isOpen: boolean;
    onClose: () => void;
}

export const TravelerModal: React.FC<TravelerModalProps> = ({ booking, isOpen, onClose }) => {
    const queryClient = useQueryClient();

    const {
        register,
        control,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm<FormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            travelers: [{ name: '', phoneNumber: '', email: '', country: '', flightFrom: '', flightTo: '', departureTime: '', arrivalTime: '', travelDate: '', dob: '', anniversary: '' }],
        },
    });

    const { fields, append, remove } = useFieldArray({
        control,
        name: 'travelers',
    });

    // Reset form when booking changes or modal opens
    React.useEffect(() => {
        if (isOpen) {
            reset({
                travelers: [{ name: '', phoneNumber: '', email: '', country: '', flightFrom: '', flightTo: '', departureTime: '', arrivalTime: '', travelDate: '', dob: '', anniversary: '' }],
            });
        }
    }, [isOpen, reset]);

    const mutation = useMutation({
        mutationFn: async (data: FormValues) => {
            // Send array directly
            await api.post(`/bookings/${booking?.id}/travelers`, data.travelers);
        },
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['bookings'] });
            toast.success('Travelers added successfully');
            onClose();
        },
        onError: (error: any) => {
            toast.error(error.response?.data?.message || 'Failed to add travelers');
        },
    });

    const onSubmit = (data: FormValues) => {
        mutation.mutate(data);
    };

    return (
        <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
            <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>Add Traveler Details</DialogTitle>
                </DialogHeader>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 mt-4">
                    {fields.map((field, index) => (
                        <div key={field.id} className="p-4 bg-slate-50 border border-slate-200 rounded-lg relative">
                            <div className="flex justify-between items-center mb-4">
                                <h4 className="font-medium text-slate-800">Traveler {index + 1}</h4>
                                {fields.length > 1 && (
                                    <button
                                        type="button"
                                        onClick={() => remove(index)}
                                        className="text-red-500 hover:text-red-700 p-1"
                                    >
                                        <Trash2 size={16} />
                                    </button>
                                )}
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Full Name *</label>
                                    <input
                                        {...register(`travelers.${index}.name` as const)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        placeholder="John Doe"
                                    />
                                    {errors.travelers?.[index]?.name && (
                                        <p className="text-red-500 text-xs mt-1">{errors.travelers[index]?.name?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Phone Number</label>
                                    <input
                                        {...register(`travelers.${index}.phoneNumber` as const)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        placeholder="+1 234 567 890"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Email</label>
                                    <input
                                        {...register(`travelers.${index}.email` as const)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        placeholder="john@example.com"
                                    />
                                    {errors.travelers?.[index]?.email && (
                                        <p className="text-red-500 text-xs mt-1">{errors.travelers[index]?.email?.message}</p>
                                    )}
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Country</label>
                                    <input
                                        {...register(`travelers.${index}.country` as const)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        placeholder="Search country..."
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Flight From</label>
                                        <input
                                            {...register(`travelers.${index}.flightFrom` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            placeholder="JFK"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Flight To</label>
                                        <input
                                            {...register(`travelers.${index}.flightTo` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                            placeholder="LHR"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Departure</label>
                                        <input
                                            type="datetime-local"
                                            {...register(`travelers.${index}.departureTime` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Arrival</label>
                                        <input
                                            type="datetime-local"
                                            {...register(`travelers.${index}.arrivalTime` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-medium text-slate-700 mb-1">Travel Date</label>
                                    <input
                                        type="date"
                                        {...register(`travelers.${index}.travelDate` as const)}
                                        className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                    />
                                </div>

                                <div className="grid grid-cols-2 gap-2">
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">DOB</label>
                                        <input
                                            type="date"
                                            {...register(`travelers.${index}.dob` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-xs font-medium text-slate-700 mb-1">Anniversary</label>
                                        <input
                                            type="date"
                                            {...register(`travelers.${index}.anniversary` as const)}
                                            className="w-full px-3 py-2 border border-slate-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    <button
                        type="button"
                        onClick={() => append({ name: '', phoneNumber: '', email: '', country: '', flightFrom: '', flightTo: '', departureTime: '', arrivalTime: '', travelDate: '', dob: '', anniversary: '' })}
                        className="flex items-center space-x-1 text-indigo-600 hover:text-indigo-700 font-medium text-sm transition-colors w-full justify-center p-3 border border-dashed border-indigo-300 bg-indigo-50 rounded-lg hover:bg-indigo-100"
                    >
                        <Plus size={16} />
                        <span>+ Add Another Member</span>
                    </button>

                    <div className="flex justify-end space-x-3 pt-4 border-t border-slate-200">
                        <button
                            type="button"
                            onClick={onClose}
                            className="px-4 py-2 text-sm font-medium text-slate-700 bg-white border border-slate-300 rounded-md shadow-sm hover:bg-slate-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            disabled={mutation.isPending}
                            className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:opacity-50 transition-colors"
                        >
                            Save Travelers
                        </button>
                    </div>
                </form>
            </DialogContent>
        </Dialog>
    );
};
