import type { Booking, Comment, Traveler } from '../types';

// ============================================================
// DEMO DATA — pre-loaded into localStorage on first visit
// ============================================================

const DEMO_USERS = [
    { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', password: 'admin123', role: 'ADMIN' as const, createdAt: new Date(Date.now() - 30 * 86400000).toISOString() },
    { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', password: 'agent123', role: 'AGENT' as const, createdAt: new Date(Date.now() - 28 * 86400000).toISOString() },
    { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', password: 'agent123', role: 'AGENT' as const, createdAt: new Date(Date.now() - 26 * 86400000).toISOString() },
];

const d = (daysAgo: number) => new Date(Date.now() - daysAgo * 86400000).toISOString();

const DEMO_BOOKINGS: Booking[] = [
    { id: 'b-001', createdOn: d(25), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'John Smith', contactNumber: '+15551234567', requirements: 'Luxury 7-day trip to Paris for 2 people. 5-star hotel, direct flights, airport transfers.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-002', createdOn: d(22), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Sarah Connor', contactNumber: '+15552345678', requirements: 'Family vacation to Bali for 4 people. Beach resort, snorkeling, kids club.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-003', createdOn: d(20), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Michael Jordan', contactNumber: '+15553456789', requirements: 'Business trip to Tokyo for 1 person. Central hotel near Shinjuku.', status: 'Pending', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-004', createdOn: d(18), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Emma Watson', contactNumber: '+15554567890', requirements: 'Honeymoon to Maldives for 2. Overwater villa, spa, sunset cruise.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-005', createdOn: d(16), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'James Bond', contactNumber: '+15555678901', requirements: 'Swiss Alps skiing trip for 3. Ski resort, hiking, fondue dinner.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Working', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-006', createdOn: d(15), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Alice Wonderland', contactNumber: '+15556789012', requirements: 'Cultural tour of Rome for 2. Colosseum, Vatican, cooking class.', status: 'Sent', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-007', createdOn: d(14), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Bruce Wayne', contactNumber: '+15557890123', requirements: 'Luxury Dubai trip for 4. Burj Al Arab, desert safari, yacht cruise.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-008', createdOn: d(12), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Clark Kent', contactNumber: '+15558901234', requirements: 'Beach vacation to Cancun for 3. All-inclusive resort, Chichen Itza.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Working', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-009', createdOn: d(10), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Diana Prince', contactNumber: '+15559012345', requirements: 'Greek island hopping for 2. Santorini, Mykonos, Crete.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-010', createdOn: d(9), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Tony Stark', contactNumber: '+15550123456', requirements: 'Tech conference in San Francisco. Downtown hotel, co-working space.', status: 'Pending', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-011', createdOn: d(8), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Natasha Romanoff', contactNumber: '+15551112222', requirements: 'Iceland trip for 2. Northern lights, Blue Lagoon, glacier hiking.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Sent', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-012', createdOn: d(7), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Peter Parker', contactNumber: '+15552223333', requirements: 'Backpacking through Thailand for 3. Bangkok, Chiang Mai, Phuket.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-013', createdOn: d(6), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Wanda Maximoff', contactNumber: '+15553334444', requirements: 'Kenya safari for 4. Masai Mara, hot air balloon, Big Five.', status: 'Working', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-014', createdOn: d(5), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Steve Rogers', contactNumber: '+15554445555', requirements: 'New Zealand road trip for 2. Campervan, Milford Sound, Hobbiton.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-015', createdOn: d(4), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Carol Danvers', contactNumber: '+15555556666', requirements: 'Bali wellness retreat. Yoga, meditation, rice terrace walk.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Pending', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-016', createdOn: d(3), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Thor Odinson', contactNumber: '+15556667777', requirements: 'Nordic cruise from Norway for 3. Fjord excursions, onboard spa.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-017', createdOn: d(2), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Loki Laufeyson', contactNumber: '+15557778888', requirements: 'London city break for 2. West End show, Thames cruise, Tower of London.', status: 'Sent', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-018', createdOn: d(1), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Gamora Zen', contactNumber: '+15558889999', requirements: 'Seychelles tropical getaway for 2. Private island, scuba diving.', assignedToUserId: 'u-agent-001', assignedToUser: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, status: 'Booked', isConvertedToEDT: true, travelers: [], comments: [] },
    { id: 'b-019', createdOn: d(0), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Rocket Raccoon', contactNumber: '+15559990000', requirements: 'Costa Rica adventure for 3. Zip-lining, rainforest, hot springs.', assignedToUserId: 'u-agent-002', assignedToUser: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, status: 'Working', isConvertedToEDT: false, travelers: [], comments: [] },
    { id: 'b-020', createdOn: d(0), createdByUserId: 'u-admin-001', createdByUser: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, contactPerson: 'Groot Treeman', contactNumber: '+15550001111', requirements: 'Amazon eco-tourism for 2. Jungle lodge, piranha fishing, dolphins.', status: 'Pending', isConvertedToEDT: false, travelers: [], comments: [] },
];

const DEMO_TRAVELERS: Traveler[] = [
    { id: 't-001', bookingId: 'b-001', name: 'John Smith', phoneNumber: '+15551234567', email: 'john@example.com', country: 'France', flightFrom: 'JFK', flightTo: 'CDG', departureTime: '2026-04-10T10:00:00', arrivalTime: '2026-04-10T23:30:00', travelDate: '2026-04-10', dob: '1985-03-15', anniversary: '2012-06-20' },
    { id: 't-002', bookingId: 'b-001', name: 'Jane Smith', phoneNumber: '+15551234568', email: 'jane@example.com', country: 'France', flightFrom: 'JFK', flightTo: 'CDG', departureTime: '2026-04-10T10:00:00', arrivalTime: '2026-04-10T23:30:00', travelDate: '2026-04-10', dob: '1987-07-22', anniversary: '2012-06-20' },
    { id: 't-003', bookingId: 'b-002', name: 'Sarah Connor', phoneNumber: '+15552345678', email: 'sarah.c@example.com', country: 'Indonesia', flightFrom: 'LAX', flightTo: 'DPS', departureTime: '2026-04-15T13:00:00', arrivalTime: '2026-04-16T20:30:00', travelDate: '2026-04-15', dob: '1980-11-05' },
    { id: 't-004', bookingId: 'b-002', name: 'Kyle Connor', phoneNumber: '+15552345679', country: 'Indonesia', flightFrom: 'LAX', flightTo: 'DPS', departureTime: '2026-04-15T13:00:00', arrivalTime: '2026-04-16T20:30:00', travelDate: '2026-04-15', dob: '1978-02-28' },
    { id: 't-005', bookingId: 'b-004', name: 'Emma Watson', phoneNumber: '+15554567890', email: 'emma@example.com', country: 'Maldives', flightFrom: 'LHR', flightTo: 'MLE', departureTime: '2026-05-01T09:00:00', arrivalTime: '2026-05-01T21:30:00', travelDate: '2026-05-01', dob: '1990-04-15', anniversary: '2024-12-25' },
    { id: 't-006', bookingId: 'b-004', name: 'Daniel Watson', phoneNumber: '+15554567891', country: 'Maldives', flightFrom: 'LHR', flightTo: 'MLE', departureTime: '2026-05-01T09:00:00', arrivalTime: '2026-05-01T21:30:00', travelDate: '2026-05-01', dob: '1988-08-20', anniversary: '2024-12-25' },
    { id: 't-007', bookingId: 'b-007', name: 'Bruce Wayne', phoneNumber: '+15557890123', email: 'bruce@example.com', country: 'UAE', flightFrom: 'JFK', flightTo: 'DXB', departureTime: '2026-04-20T23:00:00', arrivalTime: '2026-04-21T19:00:00', travelDate: '2026-04-20', dob: '1982-02-19' },
    { id: 't-008', bookingId: 'b-007', name: 'Selina Wayne', phoneNumber: '+15557890124', country: 'UAE', flightFrom: 'JFK', flightTo: 'DXB', departureTime: '2026-04-20T23:00:00', arrivalTime: '2026-04-21T19:00:00', travelDate: '2026-04-20', dob: '1986-03-14' },
    { id: 't-009', bookingId: 'b-009', name: 'Diana Prince', phoneNumber: '+15559012345', email: 'diana@example.com', country: 'Greece', flightFrom: 'IAD', flightTo: 'ATH', departureTime: '2026-05-10T18:00:00', arrivalTime: '2026-05-11T10:00:00', travelDate: '2026-05-10', dob: '1984-06-01' },
    { id: 't-010', bookingId: 'b-009', name: 'Steve Trevor', phoneNumber: '+15559012346', country: 'Greece', flightFrom: 'IAD', flightTo: 'ATH', departureTime: '2026-05-10T18:00:00', arrivalTime: '2026-05-11T10:00:00', travelDate: '2026-05-10', dob: '1983-11-11' },
    { id: 't-011', bookingId: 'b-012', name: 'Peter Parker', phoneNumber: '+15552223333', email: 'peter@example.com', country: 'Thailand', flightFrom: 'JFK', flightTo: 'BKK', departureTime: '2026-05-20T02:00:00', arrivalTime: '2026-05-20T22:00:00', travelDate: '2026-05-20', dob: '1996-08-10' },
    { id: 't-012', bookingId: 'b-014', name: 'Steve Rogers', phoneNumber: '+15554445555', email: 'steve@example.com', country: 'New Zealand', flightFrom: 'LAX', flightTo: 'AKL', departureTime: '2026-06-01T23:00:00', arrivalTime: '2026-06-03T06:00:00', travelDate: '2026-06-01', dob: '1983-07-04', anniversary: '2020-05-15' },
    { id: 't-013', bookingId: 'b-016', name: 'Thor Odinson', phoneNumber: '+15556667777', email: 'thor@example.com', country: 'Norway', flightFrom: 'ORD', flightTo: 'OSL', departureTime: '2026-06-10T16:00:00', arrivalTime: '2026-06-11T08:00:00', travelDate: '2026-06-10', dob: '1985-12-25' },
    { id: 't-014', bookingId: 'b-018', name: 'Gamora Zen', phoneNumber: '+15558889999', email: 'gamora@example.com', country: 'Seychelles', flightFrom: 'DXB', flightTo: 'SEZ', departureTime: '2026-06-20T08:00:00', arrivalTime: '2026-06-20T13:00:00', travelDate: '2026-06-20', dob: '1992-05-18', anniversary: '2023-09-10' },
];

const DEMO_COMMENTS: Comment[] = [
    { id: 'c-001', bookingId: 'b-001', text: 'Client wants luxury Paris experience. Sent 3 hotel options.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(24) },
    { id: 'c-002', bookingId: 'b-002', text: 'Family of 4 incl. 2 kids. Booked Ayana Resort Bali. Kids club confirmed.', createdBy: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, createdById: 'u-agent-002', createdAt: d(21) },
    { id: 'c-003', bookingId: 'b-003', text: 'Client needs hotel near Shinjuku station. Awaiting budget approval.', createdBy: { id: 'u-admin-001', name: 'Super Admin', email: 'admin@travel.com', role: 'ADMIN' }, createdById: 'u-admin-001', createdAt: d(19) },
    { id: 'c-004', bookingId: 'b-004', text: 'Honeymoon couple. Surprise candlelight dinner on beach arranged.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(17) },
    { id: 'c-005', bookingId: 'b-005', text: 'Experienced skier. Looking for advanced slopes in Zermatt area.', createdBy: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, createdById: 'u-agent-002', createdAt: d(15) },
    { id: 'c-006', bookingId: 'b-007', text: 'VIP desert safari booked. Burj Al Arab Royal Suite confirmed 3 nights.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(13) },
    { id: 'c-007', bookingId: 'b-009', text: 'Ferry passes booked Santorini → Mykonos → Crete. Hotels locked in.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(9) },
    { id: 'c-008', bookingId: 'b-012', text: 'Budget backpacking itinerary finalized. Street food tour in Bangkok.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(6) },
    { id: 'c-009', bookingId: 'b-014', text: 'Campervan booked. Milford Sound cruise Day 3, Hobbiton tour Day 5.', createdBy: { id: 'u-agent-002', name: 'Mike Agent', email: 'mike@travel.com', role: 'AGENT' }, createdById: 'u-agent-002', createdAt: d(4) },
    { id: 'c-010', bookingId: 'b-018', text: 'Private island villa at Four Seasons. Scuba diving Day 2-3.', createdBy: { id: 'u-agent-001', name: 'Sarah Agent', email: 'sarah@travel.com', role: 'AGENT' }, createdById: 'u-agent-001', createdAt: d(1) },
];

// ============================================================
// localStorage helpers
// ============================================================

const LS_KEYS = {
    users: 'crm_users',
    bookings: 'crm_bookings',
    travelers: 'crm_travelers',
    comments: 'crm_comments',
    initialized: 'crm_initialized',
};

function initDemoData() {
    if (localStorage.getItem(LS_KEYS.initialized)) return;
    localStorage.setItem(LS_KEYS.users, JSON.stringify(DEMO_USERS));
    localStorage.setItem(LS_KEYS.bookings, JSON.stringify(DEMO_BOOKINGS));
    localStorage.setItem(LS_KEYS.travelers, JSON.stringify(DEMO_TRAVELERS));
    localStorage.setItem(LS_KEYS.comments, JSON.stringify(DEMO_COMMENTS));
    localStorage.setItem(LS_KEYS.initialized, 'true');
}

function getLS<T>(key: string): T[] {
    try { return JSON.parse(localStorage.getItem(key) || '[]'); } catch { return []; }
}
function setLS<T>(key: string, data: T[]) {
    localStorage.setItem(key, JSON.stringify(data));
}
function uuid() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
        const r = Math.random() * 16 | 0;
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

// Initialize on import
initDemoData();

// ============================================================
// Mock API — mimics Axios response shape { data: ... }
// ============================================================

function enrichBooking(b: Booking): Booking {
    const travelers = getLS<Traveler>(LS_KEYS.travelers).filter(t => t.bookingId === b.id);
    const comments = getLS<Comment>(LS_KEYS.comments).filter(c => c.bookingId === b.id);
    return { ...b, travelers, comments };
}

const mockApi = {
    get: async (url: string): Promise<any> => {
        await new Promise(r => setTimeout(r, 100)); // simulate network
        const params = new URLSearchParams(url.split('?')[1] || '');
        const path = url.split('?')[0];

        // GET /bookings/:id
        const bookingMatch = path.match(/^\/bookings\/([^/]+)$/);
        if (bookingMatch && !path.includes('/comments')) {
            const bookings = getLS<Booking>(LS_KEYS.bookings);
            const found = bookings.find(b => b.id === bookingMatch[1]);
            if (!found) throw { response: { status: 404, data: { message: 'Not found' } } };
            return { data: enrichBooking(found) };
        }

        // GET /bookings/:id/comments
        const commentsMatch = path.match(/^\/bookings\/([^/]+)\/comments$/);
        if (commentsMatch) {
            const comments = getLS<Comment>(LS_KEYS.comments).filter(c => c.bookingId === commentsMatch[1]);
            return { data: comments.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()) };
        }

        // GET /bookings
        if (path === '/bookings') {
            let bookings = getLS<Booking>(LS_KEYS.bookings);
            const status = params.get('status');
            if (status) bookings = bookings.filter(b => b.status === status);
            bookings = bookings.map(enrichBooking);
            bookings.sort((a, b) => new Date(b.createdOn).getTime() - new Date(a.createdOn).getTime());
            const limit = parseInt(params.get('limit') || '100');
            const page = parseInt(params.get('page') || '1');
            const total = bookings.length;
            const sliced = bookings.slice((page - 1) * limit, page * limit);
            return { data: { data: sliced, meta: { total, page, limit, totalPages: Math.ceil(total / limit) } } };
        }

        // GET /users
        if (path === '/users') {
            return { data: getLS<any>(LS_KEYS.users).map(({ password, ...u }: any) => u) };
        }

        // GET /users/agents
        if (path === '/users/agents') {
            return { data: getLS<any>(LS_KEYS.users).filter((u: any) => u.role === 'AGENT').map(({ password, ...u }: any) => u) };
        }

        throw { response: { status: 404, data: { message: `Unknown GET ${url}` } } };
    },

    post: async (url: string, body?: any): Promise<any> => {
        await new Promise(r => setTimeout(r, 100));
        const path = url.split('?')[0];

        // POST /auth/login
        if (path === '/auth/login') {
            const users = getLS<any>(LS_KEYS.users);
            const found = users.find((u: any) => u.email === body.email && u.password === body.password);
            if (!found) throw { response: { status: 401, data: { message: 'Invalid credentials. Try admin@travel.com / admin123' } } };
            // Create a fake JWT-like token (base64 encoded payload)
            const payload = { id: found.id, name: found.name, email: found.email, role: found.role, iat: Date.now(), exp: Date.now() + 86400000 };
            const token = `eyJhbGciOiJub25lIn0.${btoa(JSON.stringify(payload))}.mock-signature`;
            return { data: { token } };
        }

        // POST /bookings
        if (path === '/bookings') {
            const bookings = getLS<Booking>(LS_KEYS.bookings);
            const currentUser = getCurrentUser();
            const newBooking: Booking = {
                id: uuid(),
                createdOn: new Date().toISOString(),
                createdByUserId: currentUser.id,
                createdByUser: currentUser,
                contactPerson: body.contactPerson,
                contactNumber: body.contactNumber,
                requirements: body.requirements || '',
                status: 'Pending',
                isConvertedToEDT: false,
                travelers: [],
                comments: [],
            };
            bookings.unshift(newBooking);
            setLS(LS_KEYS.bookings, bookings);
            return { data: newBooking };
        }

        // POST /bookings/:id/travelers
        const travelerMatch = path.match(/^\/bookings\/([^/]+)\/travelers$/);
        if (travelerMatch) {
            const travelers = getLS<Traveler>(LS_KEYS.travelers);
            const newTravelers = (Array.isArray(body) ? body : [body]).map((t: any) => ({
                ...t,
                id: uuid(),
                bookingId: travelerMatch[1],
            }));
            travelers.push(...newTravelers);
            setLS(LS_KEYS.travelers, travelers);
            return { data: newTravelers };
        }

        // POST /bookings/:id/comments
        const commentMatch = path.match(/^\/bookings\/([^/]+)\/comments$/);
        if (commentMatch) {
            const comments = getLS<Comment>(LS_KEYS.comments);
            const currentUser = getCurrentUser();
            const newComment: Comment = {
                id: uuid(),
                bookingId: commentMatch[1],
                text: body.text,
                createdBy: currentUser,
                createdById: currentUser.id,
                createdAt: new Date().toISOString(),
            };
            comments.unshift(newComment);
            setLS(LS_KEYS.comments, comments);
            return { data: newComment };
        }

        throw { response: { status: 404, data: { message: `Unknown POST ${url}` } } };
    },

    patch: async (url: string, body?: any): Promise<any> => {
        await new Promise(r => setTimeout(r, 100));
        const path = url.split('?')[0];

        // PATCH /bookings/:id/status
        const statusMatch = path.match(/^\/bookings\/([^/]+)\/status$/);
        if (statusMatch) {
            const bookings = getLS<Booking>(LS_KEYS.bookings);
            const idx = bookings.findIndex(b => b.id === statusMatch[1]);
            if (idx === -1) throw { response: { status: 404, data: { message: 'Not found' } } };
            bookings[idx].status = body.status;
            bookings[idx].isConvertedToEDT = body.status === 'Booked';
            setLS(LS_KEYS.bookings, bookings);
            return { data: bookings[idx] };
        }

        // PATCH /bookings/:id/assign
        const assignMatch = path.match(/^\/bookings\/([^/]+)\/assign$/);
        if (assignMatch) {
            const bookings = getLS<Booking>(LS_KEYS.bookings);
            const users = getLS<any>(LS_KEYS.users);
            const idx = bookings.findIndex(b => b.id === assignMatch[1]);
            if (idx === -1) throw { response: { status: 404, data: { message: 'Not found' } } };
            const agent = users.find((u: any) => u.id === body.assignedToUserId);
            bookings[idx].assignedToUserId = body.assignedToUserId;
            if (agent) bookings[idx].assignedToUser = { id: agent.id, name: agent.name, email: agent.email, role: agent.role };
            setLS(LS_KEYS.bookings, bookings);
            return { data: bookings[idx] };
        }

        throw { response: { status: 404, data: { message: `Unknown PATCH ${url}` } } };
    },
};

function getCurrentUser() {
    try {
        const token = localStorage.getItem('token');
        if (!token) return DEMO_USERS[0];
        const payload = JSON.parse(atob(token.split('.')[1]));
        return { id: payload.id, name: payload.name, email: payload.email, role: payload.role as 'ADMIN' | 'AGENT' };
    } catch {
        return { id: DEMO_USERS[0].id, name: DEMO_USERS[0].name, email: DEMO_USERS[0].email, role: DEMO_USERS[0].role };
    }
}

export default mockApi;
