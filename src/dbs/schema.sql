create table users(
    id serial,
    last_name varchar(50) not null,
    first_name varchar(50) not null,
    other_name varchar(50),
    phone varchar(20) not null,
    email varchar(50) not null,
    role varchar(50),
    lga varchar(50) not null,
    active varchar(50) not null
);

create table reports(
    id serial,
    uid varchar(50) not null,
    summary varchar(200),
    summaryfrom varchar(50),
    summaryto varchar(50),
    followup varchar(200),
    conclusion varchar(150),
    date timestamp,
    compliance varchar(50),
    pid varchar(50),
    gps varchar(100),
    complete varchar(50),
    pstatus varchar(100),
    sitestatus varchar(100),
    sitegps varchar(100)
);

create table projects(
    id serial,
    state_id varchar(50),
    local_id varchar(20),
    location varchar(100),
    lga varchar(50),
    status varchar(50),
    started varchar(50),
    finish varchar(50),
    wardheadphone varchar(50),
    title varchar(100),
    gps varchar(100),
    contractor_id varchar(50),
    lot varchar(50),
    type varchar(50),
    ward varchar(100),
    facility varchar(100),
    community varchar(100),
    compartment varchar(100),
    phase varchar(100),
    pstatus varchar(500)
    );

     
create table reportactivities(
    id serial,
    pid varchar(50),
    rid varchar(20),
    date varchar(100),
    activity varchar(200),
    outcome varchar(200),
    imgurl varchar(250));

     create table contractors(
         id serial,
         comapany varchar(200),
         address varchar(200),
         email varchar(200),
         phone varchar(50),
         active varchar(50)
     );

     create table cloudimage(
         id serial,
         rid varchar(200),
         pid varchar(200),
         imgurl varchar(250)
     );