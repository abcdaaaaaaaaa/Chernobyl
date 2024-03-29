CREATE TABLE MQ137 (
    id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    CO VARCHAR(10),
    Ethanol VARCHAR(10),
    NH3 VARCHAR(10),
    Air VARCHAR(10),
    usvhr VARCHAR(10),
    Avg1 VARCHAR(10),
    sdCPM VARCHAR(10),
    CPMCount VARCHAR(10),
    SpaceData100 VARCHAR(10),
    SpaceData200 VARCHAR(10),
    lat VARCHAR(10),
    lng VARCHAR(10),
    reading_time TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
)