CREATE TABLE MQ5 (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    H2 VARCHAR(10),
    LPG VARCHAR(10),
    CH4 VARCHAR(10),
    CO VARCHAR(10),
    Alcohol VARCHAR(10),
    Air VARCHAR(10),
    Avg1 VARCHAR(10),
    sdCPM VARCHAR(10),
    Arrayval VARCHAR(10),
    SpaceData100 VARCHAR(10),
    SpaceData200 VARCHAR(10),
    lat VARCHAR(12),
    lng VARCHAR(12),
    reading_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)
