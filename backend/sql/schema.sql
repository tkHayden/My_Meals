

DROP TABLE IF EXISTS member;


CREATE TYPE accountType AS ENUM ('native', 'google');
CREATE TABLE member ( 
      id UUID UNIQUE PRIMARY KEY DEFAULT gen_random_uuid(), 
      email VARCHAR (60) UNIQUE NOT NULL, 
      username VARCHAR (60) UNIQUE, 
      password_hash TEXT, 
      is_activated BOOLEAN NOT NULL DEFAULT false,
      account_type accountType DEFAULT 'native'
);

