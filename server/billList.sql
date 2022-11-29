-- TODO Do I need a user table?

CREATE TABLE commitments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100),
    date DATE,
    amount INT,
    -- TODO does this need to be a decimal? And would Date be better as a INT?
    isPaid BIT,
    notes VARCHAR(1000)
);

INSERT INTO commitments (name, date, amount, isPaid, notes)
VALUES ("Gas", 2023-01-15, 50.00, 1, "Fill up wife's car."),
("Rent", 2022-12-30, 100, 1, "Pay rent by going to apartment website.");

CREATE TABLE paidCommitments (
    id SERIAL PRIMARY KEY,
    date DATE,
    amount INT,
    -- TODO Would Date be better as a INT?
);