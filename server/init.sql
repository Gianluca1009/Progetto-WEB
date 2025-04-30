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
('Erling', 'Haaland', 'https://img.a.transfermarkt.technology/portrait/big/173403-1673327842.jpg', '2000-07-21', 'Norvegia', 'Attaccante', 'Manchester City', 9, 200, 100, 300, 50, 1, 15, 50, 25, NULL);
('Harry', 'Kane', 'https://img.a.transfermarkt.technology/portrait/big/132098-1673328677.jpg', '1993-07-28', 'Inghilterra', 'Attaccante', 'Bayern Monaco', 9, 350, 100, 500, 20, 0, 10, 60, 25, NULL),
('Karim', 'Benzema', 'https://img.a.transfermarkt.technology/portrait/big/18922-1673328922.jpg', '1987-12-19', 'Francia', 'Attaccante', 'Al Ittihad', 9, 400, 120, 750, 30, 1, 25, 50, 30, NULL),
('Antoine', 'Griezmann', 'https://img.a.transfermarkt.technology/portrait/big/125781-1673328982.jpg', '1991-03-21', 'Francia', 'Attaccante', 'Atlético Madrid', 7, 300, 140, 600, 35, 1, 18, 45, 22, NULL),
('Pedri', 'González', 'https://img.a.transfermarkt.technology/portrait/big/683840-1673329731.jpg', '2002-11-25', 'Spagna', 'Centrocampista', 'FC Barcelona', 8, 30, 50, 120, 10, 0, 3, 10, 15, NULL),
('Phil', 'Foden', 'https://img.a.transfermarkt.technology/portrait/big/406635-1673329704.jpg', '2000-05-28', 'Inghilterra', 'Centrocampista', 'Manchester City', 47, 60, 70, 200, 12, 0, 6, 20, 18, NULL),
('Joshua', 'Kimmich', 'https://img.a.transfermarkt.technology/portrait/big/223742-1673329130.jpg', '1995-02-08', 'Germania', 'Centrocampista', 'Bayern Monaco', 6, 50, 90, 350, 20, 0, 14, 30, 28, NULL),
('Trent', 'Alexander-Arnold', 'https://img.a.transfermarkt.technology/portrait/big/314353-1673329576.jpg', '1998-10-07', 'Inghilterra', 'Difensore', 'Liverpool', 66, 25, 85, 250, 15, 0, 7, 35, 32, NULL),
('Jude', 'Bellingham', 'https://img.a.transfermarkt.technology/portrait/big/581678-1673329680.jpg', '2003-06-29', 'Inghilterra', 'Centrocampista', 'Real Madrid', 5, 40, 45, 150, 12, 0, 5, 25, 20, NULL),
('Rafael', 'Leão', 'https://img.a.transfermarkt.technology/portrait/big/357164-1673329604.jpg', '1999-06-10', 'Portogallo', 'Attaccante', 'AC Milan', 10, 70, 50, 180, 18, 1, 4, 30, 22, NULL),
('Federico', 'Chiesa', 'https://img.a.transfermarkt.technology/portrait/big/341092-1673329026.jpg', '1997-10-25', 'Italia', 'Attaccante', 'Juventus', 7, 60, 40, 160, 14, 0, 3, 25, 15, NULL);
('Mason', 'Mount', 'https://img.a.transfermarkt.technology/portrait/big/351599-1673329571.jpg', '1999-01-10', 'Inghilterra', 'Centrocampista', 'Manchester United', 7, 45, 50, 180, 10, 0, 3, 20, 18, NULL),
('Declan', 'Rice', 'https://img.a.transfermarkt.technology/portrait/big/357662-1673329744.jpg', '1999-01-14', 'Inghilterra', 'Centrocampista', 'Arsenal', 41, 20, 30, 210, 15, 0, 2, 15, 12, NULL),
('João', 'Cancelo', 'https://img.a.transfermarkt.technology/portrait/big/182712-1673329094.jpg', '1994-05-27', 'Portogallo', 'Difensore', 'FC Barcelona', 2, 25, 45, 300, 25, 1, 8, 22, 20, NULL),
('Alphonso', 'Davies', 'https://img.a.transfermarkt.technology/portrait/big/424204-1673329310.jpg', '2000-11-02', 'Canada', 'Difensore', 'Bayern Monaco', 19, 15, 40, 180, 10, 0, 5, 18, 16, NULL),
('Marquinhos', 'Correa', 'https://img.a.transfermarkt.technology/portrait/big/181767-1673329427.jpg', '1994-05-14', 'Brasile', 'Difensore', 'Paris Saint-Germain', 5, 20, 15, 400, 30, 1, 20, 15, 10, NULL),
('Kai', 'Havertz', 'https://img.a.transfermarkt.technology/portrait/big/309400-1673329643.jpg', '1999-06-11', 'Germania', 'Centrocampista', 'Arsenal', 29, 50, 40, 220, 12, 0, 4, 25, 20, NULL),
('Riyad', 'Mahrez', 'https://img.a.transfermarkt.technology/portrait/big/171424-1673329647.jpg', '1991-02-21', 'Algeria', 'Attaccante', 'Al Ahli', 26, 140, 100, 500, 20, 0, 9, 35, 28, NULL),
('Serge', 'Gnabry', 'https://img.a.transfermarkt.technology/portrait/big/159471-1673329307.jpg', '1995-07-14', 'Germania', 'Attaccante', 'Bayern Monaco', 7, 110, 70, 300, 18, 0, 8, 28, 20, NULL),
('Achraf', 'Hakimi', 'https://img.a.transfermarkt.technology/portrait/big/398073-1673329480.jpg', '1998-11-04', 'Marocco', 'Difensore', 'Paris Saint-Germain', 2, 30, 40, 250, 20, 1, 7, 20, 18, NULL),
('Rodri', 'Hernandez', 'https://img.a.transfermarkt.technology/portrait/big/357565-1673329157.jpg', '1996-06-22', 'Spagna', 'Centrocampista', 'Manchester City', 16, 25, 60, 320, 22, 0, 11, 25, 23, NULL);
('Bukayo', 'Saka', 'https://img.a.transfermarkt.technology/portrait/big/433177-1673329734.jpg', '2001-09-05', 'Inghilterra', 'Attaccante', 'Arsenal', 7, 60, 55, 180, 10, 0, 3, 25, 20, NULL),
('Lautaro', 'Martínez', 'https://img.a.transfermarkt.technology/portrait/big/406625-1673329610.jpg', '1997-08-22', 'Argentina', 'Attaccante', 'Inter', 10, 120, 45, 250, 18, 0, 5, 30, 18, NULL),
('Theo', 'Hernández', 'https://img.a.transfermarkt.technology/portrait/big/282854-1673329617.jpg', '1997-10-06', 'Francia', 'Difensore', 'AC Milan', 19, 30, 35, 220, 20, 1, 4, 18, 14, NULL),
('Milan', 'Škriniar', 'https://img.a.transfermarkt.technology/portrait/big/204857-1673329471.jpg', '1995-02-11', 'Slovacchia', 'Difensore', 'Paris Saint-Germain', 37, 10, 10, 310, 35, 2, 7, 10, 6, NULL),
('Álvaro', 'Morata', 'https://img.a.transfermarkt.technology/portrait/big/128223-1673329009.jpg', '1992-10-23', 'Spagna', 'Attaccante', 'Atlético Madrid', 19, 180, 60, 400, 25, 0, 6, 32, 18, NULL),
('Raphaël', 'Varane', 'https://img.a.transfermarkt.technology/portrait/big/164770-1673329462.jpg', '1993-04-25', 'Francia', 'Difensore', 'Manchester United', 19, 15, 10, 430, 28, 0, 16, 10, 6, NULL),
("N'Golo", 'Kanté', 'https://img.a.transfermarkt.technology/portrait/big/225083-1673329244.jpg', '1991-03-29', 'Francia', 'Centrocampista', 'Al Ittihad', 7, 20, 40, 380, 12, 0, 9, 18, 15, NULL),
('Ilkay', 'Gündoğan', 'https://img.a.transfermarkt.technology/portrait/big/53622-1673329269.jpg', '1990-10-24', 'Germania', 'Centrocampista', 'FC Barcelona', 22, 80, 60, 470, 20, 0, 11, 25, 20, NULL),
('Christian', 'Pulisic', 'https://img.a.transfermarkt.technology/portrait/big/315779-1673329337.jpg', '1998-09-18', 'USA', 'Attaccante', 'AC Milan', 11, 60, 40, 190, 12, 0, 3, 22, 18, NULL),
('Ederson', 'Moraes', 'https://img.a.transfermarkt.technology/portrait/big/238223-1673329161.jpg', '1993-08-17', 'Brasile', 'Portiere', 'Manchester City', 31, 0, 2, 380, 5, 0, 15, 0, 2, NULL),
('Jan', 'Oblak', 'https://img.a.transfermarkt.technology/portrait/big/121483-1673329331.jpg', '1993-01-07', 'Slovenia', 'Portiere', 'Atlético Madrid', 13, 0, 1, 450, 4, 0, 9, 0, 1, NULL),
('Wojciech', 'Szczęsny', 'https://img.a.transfermarkt.technology/portrait/big/44085-1673329413.jpg', '1990-04-18', 'Polonia', 'Portiere', 'Juventus', 1, 0, 0, 420, 6, 0, 11, 0, 0, NULL),
('Mike', 'Maignan', 'https://img.a.transfermarkt.technology/portrait/big/226251-1673329315.jpg', '1995-07-03', 'Francia', 'Portiere', 'AC Milan', 16, 0, 1, 250, 3, 0, 6, 0, 1, NULL),
('Jordi', 'Alba', 'https://img.a.transfermarkt.technology/portrait/big/69751-1673329448.jpg', '1989-03-21', 'Spagna', 'Difensore', 'Inter Miami', 18, 30, 80, 500, 25, 1, 15, 25, 32, NULL),
('Gerard', 'Moreno', 'https://img.a.transfermarkt.technology/portrait/big/122153-1673329636.jpg', '1992-04-07', 'Spagna', 'Attaccante', 'Villarreal', 7, 160, 50, 320, 18, 0, 5, 28, 15, NULL),
('Martin', 'Ødegaard', 'https://img.a.transfermarkt.technology/portrait/big/316264-1673329740.jpg', '1998-12-17', 'Norvegia', 'Centrocampista', 'Arsenal', 8, 50, 70, 240, 8, 0, 4, 25, 22, NULL),
('Nicolò', 'Barella', 'https://img.a.transfermarkt.technology/portrait/big/255942-1673329021.jpg', '1997-02-07', 'Italia', 'Centrocampista', 'Inter', 23, 35, 50, 300, 20, 1, 5, 22, 18, NULL),
('Frenkie', 'de Jong', 'https://img.a.transfermarkt.technology/portrait/big/326330-1673329649.jpg', '1997-05-12', 'Paesi Bassi', 'Centrocampista', 'FC Barcelona', 21, 20, 40, 280, 12, 0, 7, 18, 15, NULL),
('Angel', 'Di María', 'https://img.a.transfermarkt.technology/portrait/big/45320-1673329067.jpg', '1988-02-14', 'Argentina', 'Attaccante', 'Benfica', 11, 200, 140, 600, 30, 1, 20, 40, 35, NULL),
('Ivan', 'Perišić', 'https://img.a.transfermarkt.technology/portrait/big/42403-1673329056.jpg', '1989-02-02', 'Croazia', 'Centrocampista', 'Hajduk Split', 14, 100, 80, 500, 22, 0, 10, 28, 25, NULL),
('Thiago', 'Alcântara', 'https://img.a.transfermarkt.technology/portrait/big/68344-1673329266.jpg', '1991-04-11', 'Spagna', 'Centrocampista', 'Liverpool', 6, 40, 60, 400, 14, 0, 12, 25, 24, NULL),
('Jadon', 'Sancho', 'https://img.a.transfermarkt.technology/portrait/big/401173-1673329556.jpg', '2000-03-25', 'Inghilterra', 'Attaccante', 'Manchester United', 25, 70, 60, 210, 10, 0, 2, 28, 20, NULL),
('Jamie', 'Vardy', 'https://img.a.transfermarkt.technology/portrait/big/197307-1673329644.jpg', '1987-01-11', 'Inghilterra', 'Attaccante', 'Leicester City', 9, 180, 50, 400, 22, 1, 6, 30, 18, NULL),
('Leon', 'Goretzka', 'https://img.a.transfermarkt.technology/portrait/big/153084-1673329262.jpg', '1995-02-06', 'Germania', 'Centrocampista', 'Bayern Monaco', 8, 50, 40, 310, 18, 0, 10, 20, 18, NULL),
('Paulo', 'Dybala', 'https://img.a.transfermarkt.technology/portrait/big/206050-1673329015.jpg', '1993-11-15', 'Argentina', 'Attaccante', 'AS Roma', 21, 140, 90, 370, 20, 1, 7, 35, 22, NULL),
('Giovanni', 'Di Lorenzo', 'https://img.a.transfermarkt.technology/portrait/big/294267-1673329031.jpg', '1993-08-04', 'Italia', 'Difensore', 'Napoli', 22, 25, 35, 290, 15, 0, 5, 18, 15, NULL),
('Victor', 'Osimhen', 'https://img.a.transfermarkt.technology/portrait/big/401923-1673329724.jpg', '1998-12-29', 'Nigeria', 'Attaccante', 'Napoli', 9, 90, 25, 170, 8, 0, 2, 30, 12, NULL),
('Andrew', 'Robertson', 'https://img.a.transfermarkt.technology/portrait/big/234032-1673329542.jpg', '1994-03-11', 'Scozia', 'Difensore', 'Liverpool', 26, 15, 60, 300, 16, 0, 7, 15, 30, NULL),
('Benjamin', 'Pavard', 'https://img.a.transfermarkt.technology/portrait/big/353366-1673329456.jpg', '1996-03-28', 'Francia', 'Difensore', 'Inter', 28, 10, 20, 260, 18, 0, 6, 10, 12, NULL),
('Manuel', 'Neuer', 'https://img.a.transfermarkt.technology/portrait/big/17259-1673329301.jpg', '1986-03-27', 'Germania', 'Portiere', 'Bayern Monaco', 1, 0, 1, 650, 4, 0, 27, 0, 1, NULL);
