-- ============================================================
-- CRM-Flight — MySQL Schema
-- Run this BEFORE seed.sql to create all tables
-- ============================================================

DROP TABLE IF EXISTS Comment;
DROP TABLE IF EXISTS Traveler;
DROP TABLE IF EXISTS Booking;
DROP TABLE IF EXISTS User;

-- ============================================================
-- USERS TABLE
-- ============================================================
CREATE TABLE User (
    id               VARCHAR(191) NOT NULL PRIMARY KEY,
    name             VARCHAR(191) NOT NULL,
    email            VARCHAR(191) NOT NULL UNIQUE,
    passwordHash     VARCHAR(191) NOT NULL,
    role             VARCHAR(191) NOT NULL DEFAULT 'AGENT',
    createdAt        DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3)
);

-- ============================================================
-- BOOKINGS TABLE
-- ============================================================
CREATE TABLE Booking (
    id                 VARCHAR(191) NOT NULL PRIMARY KEY,
    createdOn          DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    createdByUserId    VARCHAR(191),
    contactPerson      VARCHAR(191) NOT NULL,
    contactNumber      VARCHAR(191) NOT NULL,
    requirements       TEXT,
    assignedToUserId   VARCHAR(191),
    status             VARCHAR(191) NOT NULL DEFAULT 'Pending',
    isConvertedToEDT   BOOLEAN      NOT NULL DEFAULT false,
    createdAt          DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    updatedAt          DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3) ON UPDATE CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_booking_createdBy  FOREIGN KEY (createdByUserId)  REFERENCES User(id) ON DELETE SET NULL,
    CONSTRAINT fk_booking_assignedTo FOREIGN KEY (assignedToUserId) REFERENCES User(id) ON DELETE SET NULL
);

CREATE INDEX idx_booking_createdBy  ON Booking(createdByUserId);
CREATE INDEX idx_booking_assignedTo ON Booking(assignedToUserId);

-- ============================================================
-- COMMENTS TABLE
-- ============================================================
CREATE TABLE Comment (
    id          VARCHAR(191) NOT NULL PRIMARY KEY,
    bookingId   VARCHAR(191) NOT NULL,
    createdById VARCHAR(191) NOT NULL,
    text        TEXT         NOT NULL,
    createdAt   DATETIME(3)  NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    CONSTRAINT fk_comment_booking   FOREIGN KEY (bookingId)   REFERENCES Booking(id) ON DELETE CASCADE,
    CONSTRAINT fk_comment_createdBy FOREIGN KEY (createdById) REFERENCES User(id)    ON DELETE CASCADE
);

CREATE INDEX idx_comment_booking   ON Comment(bookingId);
CREATE INDEX idx_comment_createdBy ON Comment(createdById);

-- ============================================================
-- TRAVELERS TABLE
-- ============================================================
CREATE TABLE Traveler (
    id            VARCHAR(191) NOT NULL PRIMARY KEY,
    bookingId     VARCHAR(191) NOT NULL,
    name          VARCHAR(191) NOT NULL,
    phoneNumber   VARCHAR(191),
    email         VARCHAR(191),
    country       VARCHAR(191),
    flightFrom    VARCHAR(191),
    flightTo      VARCHAR(191),
    departureTime VARCHAR(191),
    arrivalTime   VARCHAR(191),
    travelDate    VARCHAR(191),
    dob           VARCHAR(191),
    anniversary   VARCHAR(191),
    isPrimary     BOOLEAN      NOT NULL DEFAULT false,

    CONSTRAINT fk_traveler_booking FOREIGN KEY (bookingId) REFERENCES Booking(id) ON DELETE CASCADE
);

CREATE INDEX idx_traveler_booking ON Traveler(bookingId);

-- ============================================================
-- Schema created! Now run seed.sql to populate demo data.
-- ============================================================
