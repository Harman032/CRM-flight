-- ============================================================
-- CRM-Flight Demo Data — MySQL Seed Script
-- Run this in Railway MySQL console or any MySQL client
-- ============================================================

-- Clear existing data (in correct relational order)
DELETE FROM Comment;
DELETE FROM Traveler;
DELETE FROM Booking;
DELETE FROM User;

-- ============================================================
-- USERS
-- Password: admin123 → bcrypt hash
-- Password: agent123 → bcrypt hash
-- ============================================================

INSERT INTO User (id, name, email, passwordHash, role, createdAt) VALUES
('u-admin-001', 'Super Admin', 'admin@travel.com', '$2a$10$RcBpHKx9lZb9HKgOZ8LJqeRIzNfXjGh3mQv9QkJb9aGOHY7CvJyDe', 'ADMIN', NOW()),
('u-agent-001', 'Sarah Agent', 'sarah@travel.com', '$2a$10$RcBpHKx9lZb9HKgOZ8LJqeRIzNfXjGh3mQv9QkJb9aGOHY7CvJyDe', 'AGENT', NOW()),
('u-agent-002', 'Mike Agent',  'mike@travel.com',  '$2a$10$RcBpHKx9lZb9HKgOZ8LJqeRIzNfXjGh3mQv9QkJb9aGOHY7CvJyDe', 'AGENT', NOW());

-- ============================================================
-- BOOKINGS (20 records, mixed statuses)
-- ============================================================

INSERT INTO Booking (id, createdOn, createdByUserId, contactPerson, contactNumber, requirements, assignedToUserId, status, isConvertedToEDT, createdAt, updatedAt) VALUES
('b-001', NOW() - INTERVAL 25 DAY, 'u-admin-001', 'John Smith',       '+15551234567', 'Luxury 7-day trip to Paris, France for 2 people. 5-star hotel, direct flights, airport transfers, private tour guide for 2 days.', 'u-agent-001', 'Booked',  1, NOW() - INTERVAL 25 DAY, NOW() - INTERVAL 25 DAY),
('b-002', NOW() - INTERVAL 22 DAY, 'u-admin-001', 'Sarah Connor',     '+15552345678', 'Family vacation to Bali, Indonesia for 4 people. Beach resort, snorkeling package, kids club access needed.',                    'u-agent-002', 'Booked',  1, NOW() - INTERVAL 22 DAY, NOW() - INTERVAL 22 DAY),
('b-003', NOW() - INTERVAL 20 DAY, 'u-admin-001', 'Michael Jordan',   '+15553456789', 'Business trip to Tokyo, Japan for 1 person. Central hotel near Shinjuku, pocket Wi-Fi, meeting room access.',                     NULL,           'Pending', 0, NOW() - INTERVAL 20 DAY, NOW() - INTERVAL 20 DAY),
('b-004', NOW() - INTERVAL 18 DAY, 'u-admin-001', 'Emma Watson',      '+15554567890', 'Honeymoon package to Maldives for 2 people. Overwater villa, candlelight dinner, spa package, sunset cruise.',                   'u-agent-001', 'Booked',  1, NOW() - INTERVAL 18 DAY, NOW() - INTERVAL 18 DAY),
('b-005', NOW() - INTERVAL 16 DAY, 'u-admin-001', 'James Bond',       '+15555678901', 'Adventure trip to Swiss Alps for 3 people. Ski resort, mountain hiking, fondue dinner experience.',                                'u-agent-002', 'Working', 0, NOW() - INTERVAL 16 DAY, NOW() - INTERVAL 16 DAY),
('b-006', NOW() - INTERVAL 15 DAY, 'u-admin-001', 'Alice Wonderland', '+15556789012', 'Cultural tour of Rome, Italy for 2 people. Colosseum visit, Vatican tour, cooking class, wine tasting.',                          NULL,           'Sent',    0, NOW() - INTERVAL 15 DAY, NOW() - INTERVAL 15 DAY),
('b-007', NOW() - INTERVAL 14 DAY, 'u-admin-001', 'Bruce Wayne',      '+15557890123', 'Luxury Dubai trip for 4 people. Burj Al Arab stay, desert safari, yacht cruise, gold souk shopping.',                               'u-agent-001', 'Booked',  1, NOW() - INTERVAL 14 DAY, NOW() - INTERVAL 14 DAY),
('b-008', NOW() - INTERVAL 12 DAY, 'u-admin-001', 'Clark Kent',       '+15558901234', 'Beach vacation to Cancun, Mexico for 3 people. All-inclusive resort, snorkeling at cenotes, Chichen Itza day trip.',                'u-agent-002', 'Working', 0, NOW() - INTERVAL 12 DAY, NOW() - INTERVAL 12 DAY),
('b-009', NOW() - INTERVAL 10 DAY, 'u-admin-001', 'Diana Prince',     '+15559012345', 'Greek island hopping for 2 people. Santorini, Mykonos, Crete. Boutique hotels, ferry passes, sunset dinner.',                      'u-agent-001', 'Booked',  1, NOW() - INTERVAL 10 DAY, NOW() - INTERVAL 10 DAY),
('b-010', NOW() - INTERVAL 9 DAY,  'u-admin-001', 'Tony Stark',       '+15550123456', 'Tech conference in San Francisco for 1 person. Downtown hotel, Uber credits, co-working space access.',                             NULL,           'Pending', 0, NOW() - INTERVAL 9 DAY,  NOW() - INTERVAL 9 DAY),
('b-011', NOW() - INTERVAL 8 DAY,  'u-admin-001', 'Natasha Romanoff', '+15551112222', 'Winter trip to Iceland for 2 people. Northern lights tour, Blue Lagoon, glacier hiking, whale watching.',                            'u-agent-002', 'Sent',    0, NOW() - INTERVAL 8 DAY,  NOW() - INTERVAL 8 DAY),
('b-012', NOW() - INTERVAL 7 DAY,  'u-admin-001', 'Peter Parker',     '+15552223333', 'Backpacking trip through Thailand for 3 people. Bangkok, Chiang Mai, Phuket. Budget hostels, street food tour.',                    'u-agent-001', 'Booked',  1, NOW() - INTERVAL 7 DAY,  NOW() - INTERVAL 7 DAY),
('b-013', NOW() - INTERVAL 6 DAY,  'u-admin-001', 'Wanda Maximoff',   '+15553334444', 'Safari adventure in Kenya for 4 people. Masai Mara, hot air balloon ride, luxury tented camp, Big Five game drive.',                NULL,           'Working', 0, NOW() - INTERVAL 6 DAY,  NOW() - INTERVAL 6 DAY),
('b-014', NOW() - INTERVAL 5 DAY,  'u-admin-001', 'Steve Rogers',     '+15554445555', 'Road trip across New Zealand for 2 people. Campervan rental, Milford Sound, Hobbiton, Queenstown bungee.',                           'u-agent-002', 'Booked',  1, NOW() - INTERVAL 5 DAY,  NOW() - INTERVAL 5 DAY),
('b-015', NOW() - INTERVAL 4 DAY,  'u-admin-001', 'Carol Danvers',    '+15555556666', 'Wellness retreat in Bali for 1 person. Yoga sessions, meditation, healthy cuisine, rice terrace walk.',                               'u-agent-001', 'Pending', 0, NOW() - INTERVAL 4 DAY,  NOW() - INTERVAL 4 DAY),
('b-016', NOW() - INTERVAL 3 DAY,  'u-admin-001', 'Thor Odinson',     '+15556667777', 'Nordic cruise from Norway for 3 people. Fjord excursions, onboard spa, northern lights viewing deck.',                                'u-agent-002', 'Booked',  1, NOW() - INTERVAL 3 DAY,  NOW() - INTERVAL 3 DAY),
('b-017', NOW() - INTERVAL 2 DAY,  'u-admin-001', 'Loki Laufeyson',   '+15557778888', 'City break in London for 2 people. West End show tickets, Thames river cruise, Tower of London, afternoon tea.',                    NULL,           'Sent',    0, NOW() - INTERVAL 2 DAY,  NOW() - INTERVAL 2 DAY),
('b-018', NOW() - INTERVAL 1 DAY,  'u-admin-001', 'Gamora Zen',       '+15558889999', 'Tropical getaway to Seychelles for 2 people. Private island, scuba diving, sunset sailing, beach BBQ.',                              'u-agent-001', 'Booked',  1, NOW() - INTERVAL 1 DAY,  NOW() - INTERVAL 1 DAY),
('b-019', NOW(),                    'u-admin-001', 'Rocket Raccoon',   '+15559990000', 'Adventure trip to Costa Rica for 3 people. Zip-lining, rainforest hike, volcanic hot springs, surfing lessons.',                    'u-agent-002', 'Working', 0, NOW(),                    NOW()),
('b-020', NOW(),                    'u-admin-001', 'Groot Treeman',    '+15550001111', 'Eco-tourism in Amazon, Brazil for 2 people. Jungle lodge, piranha fishing, dolphin spotting, indigenous village visit.',             NULL,           'Pending', 0, NOW(),                    NOW());

-- ============================================================
-- COMMENTS (2-3 per booking)
-- ============================================================

INSERT INTO Comment (id, bookingId, createdById, text, createdAt) VALUES
('c-001', 'b-001', 'u-admin-001', 'Initial consultation completed. Client wants luxury Paris experience.', NOW() - INTERVAL 24 DAY),
('c-002', 'b-001', 'u-agent-001', 'Sent 3 hotel options. Client prefers Le Meurice. Awaiting confirmation.', NOW() - INTERVAL 23 DAY),
('c-003', 'b-002', 'u-admin-001', 'Family of 4 including 2 kids (ages 8 and 12). Need kid-friendly resort.', NOW() - INTERVAL 21 DAY),
('c-004', 'b-002', 'u-agent-002', 'Booked Ayana Resort Bali. Kids club confirmed. Snorkeling trip arranged.', NOW() - INTERVAL 20 DAY),
('c-005', 'b-003', 'u-admin-001', 'Client needs hotel near Shinjuku station for easy transit to meetings.', NOW() - INTERVAL 19 DAY),
('c-006', 'b-004', 'u-agent-001', 'Honeymoon couple. Surprise candlelight dinner on the beach arranged.', NOW() - INTERVAL 17 DAY),
('c-007', 'b-004', 'u-admin-001', 'Overwater villa at Soneva Fushi confirmed. Spa package included.', NOW() - INTERVAL 16 DAY),
('c-008', 'b-005', 'u-agent-002', 'Client is an experienced skier. Looking for advanced slopes in Zermatt.', NOW() - INTERVAL 15 DAY),
('c-009', 'b-006', 'u-admin-001', 'Sent Vatican tour and Colosseum skip-the-line options.', NOW() - INTERVAL 14 DAY),
('c-010', 'b-007', 'u-agent-001', 'VIP desert safari booked. Gold souk shopping guide arranged.', NOW() - INTERVAL 13 DAY),
('c-011', 'b-007', 'u-admin-001', 'Burj Al Arab Royal Suite confirmed for 3 nights.', NOW() - INTERVAL 12 DAY),
('c-012', 'b-008', 'u-agent-002', 'Looking into all-inclusive options at Cancun. Chichen Itza day trip on Day 4.', NOW() - INTERVAL 11 DAY),
('c-013', 'b-009', 'u-agent-001', 'Ferry passes booked for Santorini → Mykonos → Crete. Boutique hotels locked in.', NOW() - INTERVAL 9 DAY),
('c-014', 'b-010', 'u-admin-001', 'Client attending TechCrunch Disrupt. Needs hotel within walking distance.', NOW() - INTERVAL 8 DAY),
('c-015', 'b-011', 'u-agent-002', 'Northern lights best viewing period is mid-March. Blue Lagoon pre-booked.', NOW() - INTERVAL 7 DAY),
('c-016', 'b-012', 'u-agent-001', 'Budget backpacking itinerary finalized. Street food tour in Bangkok confirmed.', NOW() - INTERVAL 6 DAY),
('c-017', 'b-013', 'u-admin-001', 'Masai Mara migration season starts soon. Hot air balloon at sunrise booked.', NOW() - INTERVAL 5 DAY),
('c-018', 'b-014', 'u-agent-002', 'Campervan booked. Milford Sound cruise on Day 3. Hobbiton guided tour Day 5.', NOW() - INTERVAL 4 DAY),
('c-019', 'b-016', 'u-agent-002', 'Norwegian cruise line confirmed. Fjord excursion and onboard spa included.', NOW() - INTERVAL 2 DAY),
('c-020', 'b-018', 'u-agent-001', 'Private island villa at Four Seasons Seychelles. Scuba diving for Day 2-3.', NOW() - INTERVAL 1 DAY);

-- ============================================================
-- TRAVELERS (for Booked bookings only, with flight data)
-- ============================================================

-- b-001: John Smith → Paris
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-001', 'b-001', 'John Smith',         '+15551234567', 'john.smith@example.com', 'France',      'JFK', 'CDG', '2026-04-10 10:00 AM', '2026-04-10 11:30 PM', '2026-04-10', '1985-03-15', '2012-06-20', 1),
('t-002', 'b-001', 'Jane Smith',         '+15551234568', 'jane.smith@example.com', 'France',      'JFK', 'CDG', '2026-04-10 10:00 AM', '2026-04-10 11:30 PM', '2026-04-10', '1987-07-22', '2012-06-20', 0);

-- b-002: Sarah Connor → Bali
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-003', 'b-002', 'Sarah Connor',       '+15552345678', 'sarah.connor@example.com', 'Indonesia', 'LAX', 'DPS', '2026-04-15 01:00 PM', '2026-04-16 08:30 PM', '2026-04-15', '1980-11-05', NULL,         1),
('t-004', 'b-002', 'Kyle Connor',        '+15552345679', '',                         'Indonesia', 'LAX', 'DPS', '2026-04-15 01:00 PM', '2026-04-16 08:30 PM', '2026-04-15', '1978-02-28', NULL,         0),
('t-005', 'b-002', 'Sarah Jr Connor',    '',             '',                         'Indonesia', 'LAX', 'DPS', '2026-04-15 01:00 PM', '2026-04-16 08:30 PM', '2026-04-15', '2014-09-10', NULL,         0),
('t-006', 'b-002', 'Tim Connor',         '',             '',                         'Indonesia', 'LAX', 'DPS', '2026-04-15 01:00 PM', '2026-04-16 08:30 PM', '2026-04-15', '2018-01-03', NULL,         0);

-- b-004: Emma Watson → Maldives
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-007', 'b-004', 'Emma Watson',        '+15554567890', 'emma.watson@example.com',  'Maldives',  'LHR', 'MLE', '2026-05-01 09:00 AM', '2026-05-01 09:30 PM', '2026-05-01', '1990-04-15', '2024-12-25', 1),
('t-008', 'b-004', 'Daniel Watson',      '+15554567891', 'daniel.watson@example.com','Maldives',  'LHR', 'MLE', '2026-05-01 09:00 AM', '2026-05-01 09:30 PM', '2026-05-01', '1988-08-20', '2024-12-25', 0);

-- b-007: Bruce Wayne → Dubai
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-009', 'b-007', 'Bruce Wayne',        '+15557890123', 'bruce.wayne@example.com',  'UAE',       'JFK', 'DXB', '2026-04-20 11:00 PM', '2026-04-21 07:00 PM', '2026-04-20', '1982-02-19', NULL,         1),
('t-010', 'b-007', 'Selina Wayne',       '+15557890124', 'selina.wayne@example.com', 'UAE',       'JFK', 'DXB', '2026-04-20 11:00 PM', '2026-04-21 07:00 PM', '2026-04-20', '1986-03-14', NULL,         0),
('t-011', 'b-007', 'Alfred Wayne',       '',             '',                         'UAE',       'JFK', 'DXB', '2026-04-20 11:00 PM', '2026-04-21 07:00 PM', '2026-04-20', '1955-09-01', NULL,         0),
('t-012', 'b-007', 'Robin Wayne',        '',             '',                         'UAE',       'JFK', 'DXB', '2026-04-20 11:00 PM', '2026-04-21 07:00 PM', '2026-04-20', '2010-06-15', NULL,         0);

-- b-009: Diana Prince → Greece
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-013', 'b-009', 'Diana Prince',       '+15559012345', 'diana.prince@example.com', 'Greece',    'IAD', 'ATH', '2026-05-10 06:00 PM', '2026-05-11 10:00 AM', '2026-05-10', '1984-06-01', NULL,         1),
('t-014', 'b-009', 'Steve Trevor',       '+15559012346', 'steve.trevor@example.com', 'Greece',    'IAD', 'ATH', '2026-05-10 06:00 PM', '2026-05-11 10:00 AM', '2026-05-10', '1983-11-11', NULL,         0);

-- b-012: Peter Parker → Thailand
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-015', 'b-012', 'Peter Parker',       '+15552223333', 'peter.parker@example.com', 'Thailand',  'JFK', 'BKK', '2026-05-20 02:00 AM', '2026-05-20 10:00 PM', '2026-05-20', '1996-08-10', NULL,         1),
('t-016', 'b-012', 'MJ Parker',          '+15552223334', 'mj.parker@example.com',    'Thailand',  'JFK', 'BKK', '2026-05-20 02:00 AM', '2026-05-20 10:00 PM', '2026-05-20', '1997-12-05', NULL,         0),
('t-017', 'b-012', 'Ned Leeds',          '+15552223335', 'ned.leeds@example.com',    'Thailand',  'JFK', 'BKK', '2026-05-20 02:00 AM', '2026-05-20 10:00 PM', '2026-05-20', '1996-04-22', NULL,         0);

-- b-014: Steve Rogers → New Zealand
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-018', 'b-014', 'Steve Rogers',       '+15554445555', 'steve.rogers@example.com', 'New Zealand','LAX', 'AKL', '2026-06-01 11:00 PM', '2026-06-03 06:00 AM', '2026-06-01', '1983-07-04', '2020-05-15', 1),
('t-019', 'b-014', 'Peggy Rogers',       '+15554445556', 'peggy.rogers@example.com', 'New Zealand','LAX', 'AKL', '2026-06-01 11:00 PM', '2026-06-03 06:00 AM', '2026-06-01', '1985-01-20', '2020-05-15', 0);

-- b-016: Thor Odinson → Norway
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-020', 'b-016', 'Thor Odinson',       '+15556667777', 'thor.odinson@example.com', 'Norway',    'ORD', 'OSL', '2026-06-10 04:00 PM', '2026-06-11 08:00 AM', '2026-06-10', '1985-12-25', NULL,         1),
('t-021', 'b-016', 'Jane Foster',        '+15556667778', 'jane.foster@example.com',  'Norway',    'ORD', 'OSL', '2026-06-10 04:00 PM', '2026-06-11 08:00 AM', '2026-06-10', '1988-03-30', NULL,         0),
('t-022', 'b-016', 'Valkyrie Brunnhilde','',             '',                         'Norway',    'ORD', 'OSL', '2026-06-10 04:00 PM', '2026-06-11 08:00 AM', '2026-06-10', '1990-08-14', NULL,         0);

-- b-018: Gamora Zen → Seychelles
INSERT INTO Traveler (id, bookingId, name, phoneNumber, email, country, flightFrom, flightTo, departureTime, arrivalTime, travelDate, dob, anniversary, isPrimary) VALUES
('t-023', 'b-018', 'Gamora Zen',         '+15558889999', 'gamora.zen@example.com',   'Seychelles', 'DXB', 'SEZ', '2026-06-20 08:00 AM', '2026-06-20 01:00 PM', '2026-06-20', '1992-05-18', '2023-09-10', 1),
('t-024', 'b-018', 'Peter Quill',        '+15558889998', 'peter.quill@example.com',  'Seychelles', 'DXB', 'SEZ', '2026-06-20 08:00 AM', '2026-06-20 01:00 PM', '2026-06-20', '1990-01-30', '2023-09-10', 0);

-- ============================================================
-- Done! You should now see 3 users, 20 bookings, 20 comments,
-- and 24 travelers with complete flight data.
-- ============================================================
