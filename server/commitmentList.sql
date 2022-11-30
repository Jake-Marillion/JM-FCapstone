CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL,
    password VARCHAR(100) NOT NULL,
    email VARCHAR(200) NOT NULL
)

-- User Seed
INSERT INTO users (username, password, email)
VALUES ("adminAccount", "adminPassword1*", "fakeemail@gmail.com")

CREATE TABLE commitments (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    date DATE NOT NULL,
    amount INT NOT NULL,
    -- TODO does this need to be a decimal?
    isPaid BIT NOT NULL,
    notes VARCHAR(1000),
    FOREIGN KEY (UserID) REFERENCES users(UserID)
);

CREATE TABLE paidCommitments (
    id SERIAL PRIMARY KEY,
    date DATE NOT NULL,
    amount INT NOT NULL,
    isPaid BIT NOT NULL,
    -- TODO does amount need to be a decimal?
    FOREIGN KEY (UserID) REFERENCES users(UserID)
);

-- TODO seed with test user for GitHub README.