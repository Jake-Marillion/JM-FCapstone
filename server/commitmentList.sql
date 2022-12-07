CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
)

CREATE TABLE commitments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    amount DOUBLE NOT NULL,
    isPaid BOOLEAN NOT NULL,
    notes VARCHAR(1000),
    userid FOREIGN KEY REFERENCES users(userID)
);

-- Admin User
INSERT INTO users (username, password)
VALUES ("adminaccount1", "adminpassword1*");

INSERT INTO commitments (name, date, amount, isPaid, notes, userID)
VALUES ("Gas", "2022-01-10", 85.00, true, "Gas up both cars.", 1),
("Sports", "2022-02-15", 105.50, true, "Uniforms + Team Fees", 1),
("Rent", "2022-03-01", 1100.08, true, "Pay at apartments.com.  Late on the 5th!", 1),
("Birthday", "2022-04-20", 6.70, true, "She wanted a Lego Set this year.", 1),
("Groceries", "2022-05-05", 299.99, true, NULL, 1),
("Bike", "2022-06-11", 490.02, true, "Cannondale Viking", 1),
("Phone", "2022-07-28", 669.66, true, "On autopay.", 1),
("Vacation", "2022-08-19", 885.00, true, "Need to make more specific plans this year.", 1),
("School", "2022-12-22", 505.00, true, "Call 867-5309 to pay.", 1),
("Misc", "2022-12-12", 50.60, true, NULL, 1),
("Eating Out", "2022-12-17", 45.86, true, NULL, 1),
("Christmas", "2022-12-09", 300.80, true, NULL, 1);