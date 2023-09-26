CREATE TABLE profiles (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    total_work_ex TEXT,
    recent_title TEXT,
    recent_company TEXT,
    resume TEXT,
    skills TEXT []
);

CREATE TABLE users (
    id uuid PRIMARY KEY default uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL,
    age INT,
    gender TEXT,
    profile_id INT REFERENCES profiles
);

CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    title TEXT NOT NULL,
    company TEXT NOT NULL,
    about TEXT,
    applicants INTEGER DEFAULT 0,
    location TEXT,
    date DATE,
    experience TEXT,
    salary NUMERIC,
    type TEXT DEFAULT 'fulltime' CHECK (type IN ('contract', 'internship', 'fulltime')),
    requirements TEXT [],
    skills TEXT [],
    perks TEXT [],
    recruiter UUID default uuid_generate_v4()
);

create table user_applications (
    user_id uuid references users (id),
    application_id uuid references applications (id),
    primary key (user_id, application_id)
);