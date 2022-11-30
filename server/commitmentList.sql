CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL
)

CREATE TABLE commitments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    amount DOUBLE NOT NULL,
    isPaid BIT NOT NULL,
    notes VARCHAR(1000),
    FOREIGN KEY () REFERENCES users(userID)
);

CREATE TABLE paidCommitments (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    amount DOUBLE NOT NULL,
    isPaid BIT NOT NULL,
    FOREIGN KEY (userID) REFERENCES users(userID) NOT NULL
);

-- Admin User
INSERT INTO users (username, password, email)
VALUES ("adminaccount1", "adminpassword1*", "fakeemail@gmail.com");

INSERT INTO commitments (name, date, amount, isPaid, notes, userID)
VALUES ("Gas", "2022-01-10", 85.00, 1, "Gas up both cars.", 1),
("Sports", "2022-02-15", 105.50, 1, "Uniforms + Team Fees", 1),
("Rent", "2022-03-01", 1100.08, 1, "Pay at apartments.com.  Late on the 5th!", 1),
("Birthday", "2022-04-20", 6.70, 1, "She wanted a Lego Set this year.", 1),
("Groceries", "2022-05-05", 299.99, 1, NULL, 1),
("Bike", "2022-06-11", 490.02, 1, "Cannondale Viking", 1),
("Phone", "2022-07-28", 669.66, 1, "On autopay.", 1),
("Vacation", "2022-08-19", 885.00, 1, "Need to make more specific plans this year.", 1),
("School", "2022-12-22", 505.00, 1, "Call 867-5309 to pay.", 1),
("Misc", "2022-12-12", 50.60, 1, NULL, 1),
("Eating Out", "2022-12-17", 45.86, 1, NULL, 1),
("Christmas", "2022-12-09", 300.80, 1, NULL, 1);

INSERT INTO paidCommitments (date, amount, isPaid, userID)
VALUES ("2022-01-15", 385.17, 0, 1),
("2022-02-01", 180.29, 0, 1),
("2022-03-20", 4.09, 0, 1),
("2022-04-05", 700.00, 0, 1),
("2022-05-11", 100.00, 0, 1),
("2022-11-12", 475.75, 0, 1),
("2022-10-28", 701.99, 0, 1),
("2022-09-17", 277.99, 0, 1),
("2022-07-09", 2.71, 0, 1),
("2022-12-27", 85.00, 0, 1);