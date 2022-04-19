-- Test data

-- passwords for the members are passwordn, where n =1 and increments by 1 for each member
DELETE FROM member;
insert into member (id, email, username, password_hash, is_activated) values ('523a986c-5a92-4004-9a8d-2d05b609dc81',  'bgallanders0@youtube.com', 'bman123', '$2a$11$GgKSp1RaWsthwmpYhoKmQeGqRyVUstwB.gkhyBN2.qIqRFDYC2nFG', 'true');
