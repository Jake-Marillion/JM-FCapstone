CREATE TABLE bills (
    name VARCHAR(100),
    date DATE,
    amount INT,
    -- TODO does this need to be a decimal? And would Date be better as a INT?
    isPaid BIT,
    notes VARCHAR(1000)
);
-- TODO do I need to have 2 tables?  One for paid and one for unpaid.
INSERT INTO bills (name, date, amount, isPaid, notes)
VALUES ("Gas", 2023-01-15, 50.00, 1, "Fill up wife's car."),
("Rent", 2022-12-30, 100, 1, "Pay rent by going to apartment website.");