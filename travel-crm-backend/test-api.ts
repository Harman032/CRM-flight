import fetch from 'node-fetch';

const API_URL = 'http://localhost:5000/api';

async function testAPI() {
    console.log('--- TRAVEL CRM BACKEND API TEST ---');

    // 1. Health check
    console.log('\n[TEST 1] Testing root health check endpoint');
    let res = await fetch('http://localhost:5000/');
    let text = await res.text();
    console.log(`Status: ${res.status}`);
    console.log(`Response: ${text}`);

    // 2. Login as Admin
    console.log('\n[TEST 2] Logging in as Admin (admin@travel.com / admin123)');
    res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'admin@travel.com', password: 'admin123' })
    });
    let data: any = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Admin Token Received: ${!!data.token}`);
    const adminToken = data.token;

    // 3. Login as Agent
    console.log('\n[TEST 3] Logging in as Agent (agent@travel.com / agent123)');
    res = await fetch(`${API_URL}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: 'agent@travel.com', password: 'agent123' })
    });
    data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Agent Token Received: ${!!data.token}`);
    const agentToken = data.token;
    const agentId = data.id;

    // 4. Admin fetching all bookings
    console.log('\n[TEST 4] Admin fetching all bookings');
    res = await fetch(`${API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Total Bookings Visible to Admin: ${data.pagination?.total || 0}`);

    // Save one booking ID for later tests
    const firstBookingId = data.data && data.data.length > 0 ? data.data[0].id : null;

    // 5. Agent fetching their bookings
    console.log('\n[TEST 5] Agent fetching only assigned bookings');
    res = await fetch(`${API_URL}/bookings`, {
        headers: { 'Authorization': `Bearer ${agentToken}` }
    });
    data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Total Bookings Visible to Agent: ${data.pagination?.total || 0}`);

    // 6. Admin updating a booking to Booked
    if (firstBookingId) {
        console.log(`\n[TEST 6] Admin updating booking ${firstBookingId} status to 'Booked'`);
        res = await fetch(`${API_URL}/bookings/${firstBookingId}/status`, {
            method: 'PATCH',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ status: 'Booked' })
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Updated Booking Status: ${data.status}`);
        console.log(`Converted to EDT auto-flagged: ${data.isConvertedToEDT}`);

        // 7. Admin adding travelers to the booked booking
        console.log(`\n[TEST 7] Admin adding travelers to booking ${firstBookingId}`);
        res = await fetch(`${API_URL}/bookings/${firstBookingId}/travelers`, {
            method: 'POST',
            headers: {
                'Authorization': `Bearer ${adminToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify([
                { name: 'John Doe', phone: '1234567890', email: 'john@example.com', isPrimary: true },
                { name: 'Jane Doe', phone: '0987654321', isPrimary: false }
            ])
        });
        data = await res.json();
        console.log(`Status: ${res.status}`);
        console.log(`Travelers added: ${data.length}`);
    }

    // 8. Fetch Agents List
    console.log('\n[TEST 8] Fetching List of Agents');
    res = await fetch(`${API_URL}/users/agents`, {
        headers: { 'Authorization': `Bearer ${adminToken}` }
    });
    data = await res.json();
    console.log(`Status: ${res.status}`);
    console.log(`Agents found: ${data.length || 0}`);
    if (data.length > 0) {
        console.log(`First Agent: ${data[0].name} (${data[0].email})`);
    }

    console.log('\n--- TESTS COMPLETED ---');
}

testAPI().catch(console.error);
