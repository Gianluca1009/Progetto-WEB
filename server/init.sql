USE ChessDB;

CREATE TABLE Player (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) NOT NULL,
    email VARCHAR(50) NOT NULL,
    password VARCHAR(50) NOT NULL,
    UNIQUE (username, email)
);

CREATE TABLE Calciatore (
    id INT PRIMARY KEY AUTO_INCREMENT,
    nome VARCHAR(50) NOT NULL,
    cognome VARCHAR(50) NOT NULL,
    url_foto VARCHAR(255) NOT NULL,
    data_nascita DATE NOT NULL,
    nazionalita VARCHAR(50) NOT NULL,
    ruolo VARCHAR(50) NOT NULL,
    squadra VARCHAR(50) NOT NULL,
    numero_maglia INT NOT NULL,
    goal INT NOT NULL,
    assist INT NOT NULL,
    presenze INT NOT NULL,
    cartellini_gialli INT NOT NULL,
    cartellini_rossi INT NOT NULL,
    trofei INT NOT NULL,
    record_goal INT NOT NULL,
    record_assist INT NOT NULL,
    idPlayer INT,

    FOREIGN KEY (idPlayer) REFERENCES Player(id)
);

INSERT INTO Calciatore (
    nome, cognome, url_foto, data_nascita, nazionalita, ruolo,
    squadra, numero_maglia, goal, assist, presenze, cartellini_gialli,
    cartellini_rossi, trofei, record_goal, record_assist, idPlayer
) VALUES
('Lionel', 'Messi', 'https://img.a.transfermarkt.technology/portrait/big/28003-1695139880.jpg', '1987-06-24', 'Argentina', 'Attaccante', 'Paris Saint-Germain', 30, 672, 300, 810, 75, 3, 38, 91, 35, NULL),
('Cristiano', 'Ronaldo', 'https://img.a.transfermarkt.technology/portrait/big/8198-1683853777.jpg', '1985-02-05', 'Portogallo', 'Attaccante', 'Al Nassr', 7, 800, 250, 1100, 70, 4, 39, 89, 40, NULL),
('Kylian', 'Mbappé', 'https://img.a.transfermarkt.technology/portrait/big/351282-1673328999.jpg', '1998-12-20', 'Francia', 'Attaccante', 'Paris Saint-Germain', 7, 250, 150, 200, 40, 1, 12, 40, 30, NULL),
('Neymar', 'Jr', 'https://img.a.transfermarkt.technology/portrait/big/8199-1675401213.jpg', '1992-02-05', 'Brasile', 'Attaccante', 'Al Hilal', 11, 410, 220, 650, 50, 2, 25, 75, 30, NULL),
('Robert', 'Lewandowski', 'https://img.a.transfermarkt.technology/portrait/big/4921-1674089477.jpg', '1988-08-21', 'Polonia', 'Attaccante', 'FC Barcelona', 9, 700, 150, 800, 45, 3, 40, 60, 30, NULL),
('Sergio', 'Ramos', 'https://img.a.transfermarkt.technology/portrait/big/2833-1675158397.jpg', '1986-03-30', 'Spagna', 'Difensore', 'Al Hilal', 4, 100, 50, 650, 100, 5, 20, 25, 10, NULL),
('Virgil', 'van Dijk', 'https://img.a.transfermarkt.technology/portrait/big/170154-1675242562.jpg', '1991-07-08', 'Paesi Bassi', 'Difensore', 'Liverpool', 4, 30, 10, 160, 10, 1, 3, 5, 5, NULL),
('Kevin', 'De Bruyne', 'https://img.a.transfermarkt.technology/portrait/big/59840-1673328247.jpg', '1991-06-28', 'Belgio', 'Centrocampista', 'Manchester City', 17, 130, 250, 450, 40, 2, 25, 60, 45, NULL),
('Luka', 'Modrić', 'https://img.a.transfermarkt.technology/portrait/big/30081-1673329241.jpg', '1985-09-09', 'Croazia', 'Centrocampista', 'Real Madrid', 10, 100, 150, 500, 30, 3, 20, 40, 50, NULL),
('Mohamed', 'Salah', 'https://img.a.transfermarkt.technology/portrait/big/173403-1673327842.jpg', '1992-06-15', 'Egitto', 'Attaccante', 'Liverpool', 11, 200, 100, 300, 50, 1, 15, 50, 25, NULL);



    

