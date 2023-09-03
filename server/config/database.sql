CREATE TABLE profiles (
    id SERIAL PRIMARY KEY,
    total_work_ex TEXT, 
    recent_title TEXT,
    recent_company TEXT,
    resume TEXT 
);

CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT,
    gender TEXT,
    profile_id INT REFERENCES profiles
);