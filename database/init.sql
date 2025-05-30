CREATE DATABASE ChessDB;

CREATE TABLE player (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(50) NOT NULL,
    reset_token VARCHAR(255),
    token_expiration TIMESTAMP,
    punti INT DEFAULT 100,
    partite INT DEFAULT 0,
    vittorie INT DEFAULT 0,
    rosa_ids INTEGER[] DEFAULT ARRAY[]::INTEGER[],
    UNIQUE (username, email)
);

CREATE TABLE calciatore (
    id SERIAL PRIMARY KEY,
    nome VARCHAR(50),
    cognome VARCHAR(50) NOT NULL,
    url_foto VARCHAR(255) NOT NULL,
    data_nascita VARCHAR(25) NOT NULL,
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
    altezza INT NOT NULL,
    prezzo INT NOT NULL DEFAULT 20
);

CREATE USER admin WITH PASSWORD 'adminpwd';
-- Permessi sulle SEQUENZE
GRANT USAGE, SELECT, UPDATE ON SEQUENCE player_id_seq TO admin;
GRANT USAGE, SELECT, UPDATE ON SEQUENCE calciatore_id_seq TO admin;

-- Permessi sulle TABELLE
GRANT INSERT, SELECT, UPDATE, DELETE ON player TO admin;
GRANT INSERT, SELECT, UPDATE, DELETE ON calciatore TO admin;


INSERT INTO calciatore (
    nome, cognome, url_foto, data_nascita, nazionalita, ruolo,
    squadra, numero_maglia, goal, assist, presenze, cartellini_gialli,
    cartellini_rossi, trofei, record_goal, record_assist, altezza, prezzo
) VALUES
('Lionel', 'Messi', 'images/santini/lionel_messi.webp', '1987-06-24', 'Argentina', 'Attaccante', 'Inter Miami', 10, 845, 390, 1082, 85, 3, 44, 98, 40, 170, 99),
('Cristiano', 'Ronaldo', 'images/santini/cristiano_ronaldo.webp', '1985-02-05', 'Portogallo', 'Attaccante', 'Al Nassr', 7, 960, 310, 1285, 85, 5, 36, 98, 48, 187, 85),
('Kylian', 'Mbappé', 'images/santini/kylian_mbappe.webp', '1998-12-20', 'Francia', 'Attaccante', 'Real Madrid', 9, 345, 185, 420, 55, 2, 17, 63, 39, 178,  95),
(NULL, 'Neymar Jr', 'images/santini/neymar.webp', '1992-02-05', 'Brasile', 'Attaccante', 'Santos', 10, 482, 260, 740, 68, 5, 32, 85, 40, 175, 70),
('Robert', 'Lewandowski', 'images/santini/robert_lewandowski.webp', '1988-08-21', 'Polonia', 'Attaccante', 'FC Barcelona', 9, 730, 205, 910, 62, 1, 35, 76, 34, 185, 70),
('Sergio', 'Ramos', 'images/santini/sergio_ramos.webp', '1986-03-30', 'Spagna', 'Difensore', 'Monterrey', 4, 120, 55, 770, 280, 29, 28, 28, 13, 184, 40),
('Virgil', 'Van Dijk', 'images/santini/virgil_vandijk.webp', '1991-07-08', 'Paesi Bassi', 'Difensore', 'Liverpool', 4, 38, 16, 220, 15, 1, 6, 8, 7, 193, 55),
('Kevin', 'De Bruyne', 'images/santini/kevin_debruyne.webp', '1991-06-28', 'Belgio', 'Centrocampista', 'Manchester City', 17, 148, 290, 520, 45, 2, 30, 65, 55, 181, 65),
('Luka', 'Modrić', 'images/santini/luka_modric.webp', '1985-09-09', 'Croazia', 'Centrocampista', 'Real Madrid', 10, 110, 165, 540, 33, 3, 28, 42, 55, 172, 40),
('Mohamed', 'Salah', 'images/santini/mohamed_salah.webp', '1992-06-15', 'Egitto', 'Attaccante', 'Liverpool', 11, 245, 125, 355, 56, 1, 17, 60, 30, 175, 65),
('Erling', 'Haaland', 'images/santini/erling_haaland.webp', '2000-07-21', 'Norvegia', 'Attaccante', 'Manchester City', 9, 350, 105, 405, 42, 2, 18, 90, 30, 194, 99),
('Harry', 'Kane', 'images/santini/harry_kane.webp', '1993-07-28', 'Inghilterra', 'Attaccante', 'Bayern Monaco', 9, 405, 130, 580, 25, 0, 12, 68, 32, 188, 85),
('Karim', 'Benzema', 'images/santini/karim_benzema.webp', '1987-12-19', 'Francia', 'Attaccante', 'Al Ittihad', 9, 425, 130, 790, 32, 1, 25, 52, 31, 185, 30),
('Antoine', 'Griezmann', 'images/santini/antoine_griezmann.webp', '1991-03-21', 'Francia', 'Attaccante', 'Atlético Madrid', 7, 345, 170, 690, 40, 1, 21, 48, 26, 176, 60),
('Phil', 'Foden', 'images/santini/phil_foden.webp', '2000-05-28', 'Inghilterra', 'Centrocampista', 'Manchester City', 47, 105, 110, 270, 18, 0, 12, 38, 28, 171, 90),
('Joshua', 'Kimmich', 'images/santini/joshua_kimmich.webp', '1995-02-08', 'Germania', 'Centrocampista', 'Bayern Monaco', 6, 50, 90, 350, 20, 0, 14, 30, 28, 177, 42),
('Trent Alexander', 'Arnold', 'images/santini/trentalexander_arnold.webp', '1998-10-07', 'Inghilterra', 'Difensore', 'Liverpool', 66, 35, 110, 310, 18, 0, 9, 5, 12, 180, 80),
('Jude', 'Bellingham', 'images/santini/jude_bellingham.webp', '2003-06-29', 'Inghilterra', 'Centrocampista', 'Real Madrid', 5, 75, 70, 235, 20, 1, 10, 35, 28, 186, 95),
('Rafael', 'Leão', 'images/santini/rafael_leao.webp', '1999-06-10', 'Portogallo', 'Attaccante', 'AC Milan', 10, 95, 70, 220, 22, 1, 6, 38, 28, 188, 80),
('Federico', 'Chiesa', 'images/santini/federico_chiesa.webp', '1997-10-25', 'Italia', 'Attaccante', 'Liverpool', 14, 90, 60, 235, 22, 0, 5, 35, 24, 175, 55),
('Mason', 'Mount', 'images/santini/mason_mount.webp', '1999-01-10', 'Inghilterra', 'Centrocampista', 'Manchester United', 7, 45, 50, 180, 10, 0, 3, 20, 18, 181, 22),
('Declan', 'Rice', 'images/santini/declan_rice.webp', '1999-01-14', 'Inghilterra', 'Centrocampista', 'Arsenal', 41, 30, 45, 260, 18, 0, 5, 22, 18, 185, 75),
('João', 'Cancelo', 'images/santini/joao_cancelo.webp', '1994-05-27', 'Portogallo', 'Difensore', 'Al Hilal', 7, 30, 55, 335, 28, 1, 9, 24, 25, 182, 50),
('Alphonso', 'Davies', 'images/santini/alphonso_davies.webp', '2000-11-02', 'Canada', 'Difensore', 'Bayern Monaco', 19, 22, 52, 230, 14, 0, 8, 22, 22, 183, 85),
(NULL, 'Marquinhos', 'images/santini/marquinhos.webp', '1994-05-14', 'Brasile', 'Difensore', 'Paris Saint-Germain', 5, 25, 18, 450, 35, 1, 23, 18, 12, 183, 65),
('Kai', 'Havertz', 'images/santini/kai_havertz.webp', '1999-06-11', 'Germania', 'Centrocampista', 'Arsenal', 29, 70, 55, 270, 16, 0, 6, 32, 24, 193, 75),
('Riyad', 'Mahrez', 'images/santini/riyad_mahrez.webp', '1991-02-21', 'Algeria', 'Attaccante', 'Al Ahli', 26, 148, 105, 520, 22, 0, 10, 36, 29, 179, 25),
('Serge', 'Gnabry', 'images/santini/serge_gnabry.webp', '1995-07-14', 'Germania', 'Attaccante', 'Bayern Monaco', 7, 110, 70, 300, 18, 0, 8, 28, 20, 176, 90),
('Achraf', 'Hakimi', 'images/santini/achraf_hakimi.webp', '1998-11-04', 'Marocco', 'Difensore', 'Paris Saint-Germain', 2, 38, 55, 300, 24, 1, 9, 24, 22, 181, 70),
(NULL, 'Rodri', 'images/santini/rodri.webp', '1996-06-22', 'Spagna', 'Centrocampista', 'Manchester City', 16, 35, 75, 380, 26, 0, 15, 30, 28, 191, 85),
('Bukayo', 'Saka', 'images/santini/bukayo_saka.webp', '2001-09-05', 'Inghilterra', 'Attaccante', 'Arsenal', 7, 85, 75, 240, 14, 0, 5, 32, 26, 178, 80),
('Lautaro', 'Martínez', 'images/santini/lautaro_martinez.webp', '1997-08-22', 'Argentina', 'Attaccante', 'Inter', 10, 185, 75, 320, 26, 0, 12, 42, 25, 174, 95),
('Martin', 'Ødegaard', 'images/santini/martin_odegaard.webp', '1998-12-17', 'Norvegia', 'Centrocampista', 'Arsenal', 8, 70, 95, 300, 12, 0, 6, 32, 30, 178, 85),
('Frenkie', 'De Jong', 'images/santini/frenkie_dejong.webp', '1997-05-12', 'Paesi Bassi', 'Centrocampista', 'FC Barcelona', 21, 28, 55, 330, 16, 0, 9, 22, 20, 180, 70),
('Angel', 'Di María', 'images/santini/angel_dimaria.webp', '1988-02-14', 'Argentina', 'Attaccante', 'Benfica', 11, 210, 145, 620, 31, 1, 20, 40, 35, 180, 30),
('Jadon', 'Sancho', 'images/santini/jadon_sancho.webp', '2000-03-25', 'Inghilterra', 'Attaccante', 'Chelsea', 10, 85, 80, 265, 14, 0, 4, 32, 26, 180, 65),
('Paulo', 'Dybala', 'images/santini/paulo_dybala.webp', '1993-11-15', 'Argentina', 'Attaccante', 'AS Roma', 10, 160, 105, 410, 22, 1, 9, 38, 25, 177, 55),
('Heung-min', 'Son', 'images/santini/heungmin_son.webp', '1992-07-08', 'Corea del Sud', 'Attaccante', 'Tottenham Hotspur', 7, 210, 95, 450, 16, 0, 8, 32, 22, 183, 70),
(NULL, 'Casemiro', 'images/santini/casemiro.webp', '1992-02-23', 'Brasile', 'Centrocampista', 'Manchester United', 5, 60, 45, 450, 24, 1, 16, 20, 14, 185, 55),
(NULL, 'Rodrygo', 'images/santini/rodrygo.webp', '2001-01-09', 'Brasile', 'Attaccante', 'Real Madrid', 11, 75, 45, 180, 10, 0, 6, 28, 18, 174, 85),
('Dusan', 'Vlahovic', 'images/santini/dusan_vlahovic.webp', '2000-01-28', 'Serbia', 'Attaccante', 'Juventus', 9, 95, 25, 180, 12, 0, 4, 32, 14, 190, 75),
('Rasmus', 'Højlund', 'images/santini/rasmus_hoijlund.webp', '2003-02-04', 'Danimarca', 'Attaccante', 'Manchester United', 11, 45, 18, 110, 6, 0, 3, 20, 8, 191, 75),
('Victor', 'Boniface', 'images/santini/victor_boniface.webp', '1999-12-23', 'Nigeria', 'Attaccante', 'Bayer Leverkusen', 7, 40, 18, 105, 8, 0, 3, 20, 8, 190, 65),
('Victor', 'Osimhen', 'images/santini/victor_osimhen.webp', '1998-12-29', 'Nigeria', 'Attaccante', 'Galatasaray', 9, 125, 36, 230, 14, 1, 5, 42, 16, 186, 80),
('Gabriel', 'Jesus', 'images/santini/gabriel_jesus.webp', '1997-04-03', 'Brasile', 'Attaccante', 'Arsenal', 9, 85, 40, 240, 12, 0, 5, 22, 14, 175, 60),
('Dani', 'Olmo', 'images/santini/dani_olmo.webp', '1998-05-07', 'Spagna', 'Centrocampista', 'FC Barcelona', 10, 45, 35, 195, 9, 0, 4, 16, 12, 178, 70),
('Félix', 'Nmecha', 'images/santini/felix_nmecha.webp', '1999-01-16', 'Germania', 'Centrocampista', 'Wolfsburg', 8, 18, 15, 165, 8, 0, 3, 8, 6, 191, 40),
('Lorenzo', 'Pellegrini', 'images/santini/lorenzo_pellegrini.webp', '1996-06-19', 'Italia', 'Centrocampista', 'AS Roma', 7, 50, 42, 245, 14, 0, 4, 16, 12, 181, 50),
('Nicolo', 'Barella', 'images/santini/nicolo_barella.webp', '1997-02-07', 'Italia', 'Centrocampista', 'Inter', 23, 45, 65, 350, 24, 1, 8, 25, 22, 172, 70),
('Khvicha', 'Kvaratskhelia', 'images/santini/khvicha_kvaratskhelia.webp', '2001-02-12', 'Georgia', 'Attaccante', 'Paris Saint-Germain', 77, 72, 55, 185, 14, 1, 3, 25, 18, 183, 85),
('Florian', 'Wirtz', 'images/santini/florian_wirtz.webp', '2003-05-03', 'Germania', 'Centrocampista', 'Bayern Monaco', 10, 55, 65, 160, 8, 0, 4, 18, 22, 176, 90),
(NULL, 'Pedri', 'images/santini/pedri.webp', '2002-11-25', 'Spagna', 'Centrocampista', 'FC Barcelona', 8, 35, 45, 165, 10, 0, 5, 14, 18, 174, 75),
('Eduardo', 'Camavinga', 'images/santini/eduardo_camavinga.webp', '2002-11-10', 'Francia', 'Centrocampista', 'Real Madrid', 12, 25, 35, 160, 14, 1, 5, 12, 16, 182, 80),
(NULL, 'Gavi', 'images/santini/gavi.webp', '2004-08-05', 'Spagna', 'Centrocampista', 'FC Barcelona', 6, 16, 24, 120, 14, 1, 4, 8, 12, 173, 65),
('Aurélien', 'Tchouaméni', 'images/santini/aurelien_tchouameni.webp', '2000-01-27', 'Francia', 'Centrocampista', 'Real Madrid', 18, 18, 25, 170, 16, 0, 6, 10, 12, 187, 75),
('Nico', 'Williams', 'images/santini/nico_williams.webp', '2002-07-12', 'Spagna', 'Attaccante', 'Athletic Club', 11, 40, 35, 160, 8, 0, 3, 18, 15, 179, 70),
('Jamal', 'Musiala', 'images/santini/jamal_musiala.webp', '2003-02-26', 'Germania', 'Centrocampista', 'Bayern Monaco', 10, 65, 45, 180, 8, 0, 5, 24, 18, 184, 90),
('Cole', 'Palmer', 'images/santini/cole_palmer.webp', '2002-05-06', 'Inghilterra', 'Attaccante', 'Chelsea', 20, 58, 45, 130, 5, 0, 2, 28, 22, 189, 85),
('Micky', 'Van De Ven', 'images/santini/micky_vandeven.webp', '2001-04-19', 'Paesi Bassi', 'Difensore', 'Tottenham Hotspur', 37, 10, 8, 135, 10, 0, 2, 6, 5, 193, 65),
('Arda', 'Güler', 'images/santini/arda_guler.webp', '2005-02-25', 'Turchia', 'Centrocampista', 'Real Madrid', 24, 24, 16, 90, 4, 0, 2, 14, 8, 176, 75),
('Lamine', 'Yamal', 'images/santini/lamine_yamal.webp', '2007-07-13', 'Spagna', 'Attaccante', 'FC Barcelona', 19, 45, 42, 102, 7, 0, 3, 18, 22, 180, 99),
(NULL, 'Endrick', 'images/santini/endrick.webp', '2006-07-21', 'Brasile', 'Attaccante', 'Real Madrid', 16, 25, 12, 55, 3, 0, 2, 14, 6, 173, 80),
('Warren', 'Zaïre-Emery', 'images/santini/warren_zaireemery.webp', '2006-03-08', 'Francia', 'Centrocampista', 'Paris Saint-Germain', 33, 15, 20, 85, 6, 0, 3, 8, 10, 178, 60),
('Alejandro', 'Garnacho', 'images/santini/alejandro_garnacho.webp', '2004-07-01', 'Argentina', 'Attaccante', 'Manchester United', 17, 35, 25, 110, 8, 1, 2, 18, 12, 180, 70),
('Kobbie', 'Mainoo', 'images/santini/kobbie_mainoo.webp', '2005-04-19', 'Inghilterra', 'Centrocampista', 'Manchester United', 8, 18, 15, 80, 6, 0, 2, 10, 8, 178, 65),
('Mathys', 'Tel', 'images/santini/mathys_tel.webp', '2005-04-27', 'Francia', 'Attaccante', 'Bayern Monaco', 11, 28, 18, 95, 4, 0, 3, 16, 8, 183, 60),
('Youssoufa', 'Moukoko', 'images/santini/youssoufa_moukoko.webp', '2004-11-20', 'Germania', 'Attaccante', 'Nizza', 9, 35, 20, 110, 6, 0, 2, 16, 8, 179, 65),
('Kenan', 'Yildiz', 'images/santini/kenan_yildiz.webp', '2005-05-04', 'Turchia', 'Attaccante', 'Juventus', 10, 20, 14, 85, 5, 0, 2, 12, 8, 184, 65),
('Joao', 'Neves', 'images/santini/joao_neves.webp', '2004-09-27', 'Portogallo', 'Centrocampista', 'Paris Saint-Germain', 26, 15, 20, 90, 6, 0, 3, 8, 10, 174, 75),
('Valentin', 'Carboni', 'images/santini/valentin_carboni.webp', '2005-03-05', 'Argentina', 'Centrocampista', 'Inter', 29, 14, 18, 80, 4, 0, 2, 8, 7, 175, 50),
('Matias', 'Soulé', 'images/santini/matias_soule.webp', '2003-04-15', 'Argentina', 'Attaccante', 'AS Roma', 18, 28, 22, 95, 8, 1, 2, 14, 10, 176, 60),
('Destiny', 'Udogie', 'images/santini/destiny_udogie.webp', '2002-11-28', 'Italia', 'Difensore', 'Tottenham Hotspur', 38, 12, 22, 120, 8, 0, 2, 6, 12, 183, 55),
('Giorgio', 'Scalvini', 'images/santini/giorgio_scalvini.webp', '2003-12-11', 'Italia', 'Difensore', 'Atalanta', 42, 8, 6, 110, 8, 0, 3, 4, 3, 194, 45),
('Riccardo', 'Calafiori', 'images/santini/riccardo_calafiori.webp', '2002-05-19', 'Italia', 'Difensore', 'Arsenal', 4, 10, 12, 135, 10, 1, 3, 5, 6, 190, 60),
('Yann', 'Bisseck', 'images/santini/yann_bisseck.webp', '2000-11-29', 'Germania', 'Difensore', 'Inter', 31, 8, 6, 90, 6, 0, 3, 3, 3, 196, 45),
('Castello', 'Lukeba', 'images/santini/castello_lukeba.webp', '2002-12-17', 'Francia', 'Difensore', 'RB Lipsia', 4, 6, 8, 110, 8, 0, 2, 3, 3, 184, 50),
('Yan', 'Couto', 'images/santini/yan_couto.webp', '2002-06-03', 'Brasile', 'Difensore', 'Borussia Dortmund', 2, 8, 20, 115, 6, 0, 3, 5, 8, 168, 45),
('Gianluca','Nanni', 'images/santini/gianluca_nanni.webp', '2003-09-10', 'Italia', 'Attaccante', 'Sapienza', 7, 1000, 1000, 1000, 0, 0, 100, 100, 100, 180, 30),
('Matteo','Malara', 'images/santini/matteo_malara.webp', '2003-05-05', 'Italia', 'Attaccante', 'Sapienza', 999, 1000, 1000, 1000, 0, 0, 100, 100, 100, 185, 30),
('Marco','Marcovecchio', 'images/santini/marco_marcovecchio.webp', '2003-11-08', 'Italia', 'Attaccante', 'Sapienza', 10, 1000, 1000, 1000, 0, 0, 100, 100, 100, 185, 30);



INSERT INTO calciatore (
    nome, cognome, url_foto, data_nascita, nazionalita, ruolo,
    squadra, numero_maglia, goal, assist, presenze, cartellini_gialli,
    cartellini_rossi, trofei, record_goal, record_assist, altezza
) VALUES
('Milan', 'Škriniar', 'images/santini/milan_skriniar.webp', '1995-02-11', 'Slovacchia', 'Difensore', 'Paris Saint-Germain', 37, 10, 10, 310, 35, 2, 7, 10, 6, 188),
('Álvaro', 'Morata', 'images/santini/alvaro_morata.webp', '1992-10-23', 'Spagna', 'Attaccante', 'Galatasaray', 7, 195, 68, 430, 28, 0, 8, 35, 20, 189),
('Raphaël', 'Varane', 'images/santini/raphael_varane.webp', '1993-04-25', 'Francia', 'Difensore', 'Ritirato', 19, 16, 10, 440, 30, 0, 16, 10, 6, 191),
('N''Golo', 'Kanté', 'images/santini/ngolo_kante.webp', '1991-03-29', 'Francia', 'Centrocampista', 'Al Ittihad', 7, 22, 45, 395, 14, 0, 10, 18, 16, 168),
('Ilkay', 'Gündoğan', 'images/santini/ilkay_gundogan.webp', '1990-10-24', 'Germania', 'Centrocampista', 'Manchester City', 22, 80, 60, 470, 20, 0, 11, 25, 20, 180),
('Christian', 'Pulisic', 'images/santini/christian_pulisic.webp', '1998-09-18', 'USA', 'Attaccante', 'AC Milan', 11, 80, 55, 240, 16, 0, 5, 30, 22, 177),
('Jordi', 'Alba', 'images/santini/jordi_alba.webp', '1989-03-21', 'Spagna', 'Difensore', 'Inter Miami', 18, 30, 80, 500, 25, 1, 15, 25, 32, 170),
('Gerard', 'Moreno', 'images/santini/gerard_moreno.webp', '1992-04-07', 'Spagna', 'Attaccante', 'Villarreal', 7, 160, 50, 320, 18, 0, 5, 28, 15, 180),
('Ivan', 'Perišić', 'images/santini/ivan_perisic.webp', '1989-02-02', 'Croazia', 'Centrocampista', 'PSV', 14, 100, 80, 500, 22, 0, 10, 28, 25, 186),
('Thiago', 'Alcântara', 'images/santini/thiago_alcantara.webp', '1991-04-11', 'Spagna', 'Centrocampista', 'Ritirato', 6, 44, 65, 487, 14, 0, 22, 25, 24, 174),
('Jamie', 'Vardy', 'images/santini/jamie_vardy.webp', '1987-01-11', 'Inghilterra', 'Attaccante', 'Leicester City', 9, 180, 50, 400, 22, 1, 6, 30, 18, 179),
('Leon', 'Goretzka', 'images/santini/leon_goretzka.webp', '1995-02-06', 'Germania', 'Centrocampista', 'Bayern Monaco', 8, 50, 40, 310, 18, 0, 10, 20, 18, 189),
('Giovanni', 'Di Lorenzo', 'images/santini/giovanni_dilorenzo.webp', '1993-08-04', 'Italia', 'Difensore', 'Napoli', 22, 25, 35, 290, 15, 0, 5, 18, 15, 183),
('Andrew', 'Robertson', 'images/santini/andrew_robertson.webp', '1994-03-11', 'Scozia', 'Difensore', 'Liverpool', 26, 15, 60, 300, 16, 0, 7, 15, 30, 178),
('Benjamin', 'Pavard', 'images/santini/benjamin_pavard.webp', '1996-03-28', 'Francia', 'Difensore', 'Inter', 28, 10, 20, 260, 18, 0, 6, 10, 12, 186),
('Matthijs', 'De Ligt', 'images/santini/matthijs_deligt.webp', '1999-08-12', 'Paesi Bassi', 'Difensore', 'Bayern Monaco', 4, 20, 5, 200, 12, 0, 5, 10, 8, 189),
('Aymeric', 'Laporte', 'images/santini/aymeric_laporte.webp', '1994-05-27', 'Spagna', 'Difensore', 'Al Nassr', 27, 15, 3, 250, 10, 0, 6, 8, 7, 191),
('Marco', 'Verratti', 'images/santini/marco_verratti.webp', '1992-11-05', 'Italia', 'Centrocampista', 'Al-Arabi', 6, 15, 60, 400, 20, 1, 9, 18, 15, 165),
('Bernardo', 'Silva', 'images/santini/bernardo_silva.webp', '1994-08-10', 'Portogallo', 'Centrocampista', 'Manchester City', 20, 60, 80, 350, 10, 0, 10, 25, 18, 173),
('Romelu', 'Lukaku', 'images/santini/romelu_lukaku.webp', '1993-05-13', 'Belgio', 'Attaccante', 'Napoli', 90, 300, 70, 600, 20, 1, 8, 30, 15, 191),
('Ciro', 'Immobile', 'images/santini/ciro_immobile.webp', '1990-02-20', 'Italia', 'Attaccante', 'Besiktas', 17, 250, 50, 450, 15, 0, 6, 28, 20, 185),
('Edin', 'Džeko', 'images/santini/edin_dzeko.webp', '1986-03-17', 'Bosnia', 'Attaccante', 'Fenerbahçe', 9, 320, 80, 700, 30, 1, 8, 35, 18, 193),
('Marek', 'Hamšík', 'images/santini/marek_hamsik.webp', '1987-07-27', 'Slovacchia', 'Centrocampista', 'Ritirato', 17, 150, 120, 600, 25, 1, 10, 30, 25, 183),
('Gerard', 'Piqué', 'images/santini/gerard_pique.webp', '1987-02-02', 'Spagna', 'Difensore', 'Ritirato', 3, 60, 30, 550, 50, 3, 25, 10, 8, 194),
('Sadio', 'Mané', 'images/santini/sadio_mane.webp', '1992-04-10', 'Senegal', 'Attaccante', 'Al Nassr', 10, 180, 80, 400, 18, 0, 8, 30, 20, 174),
('Edinson', 'Cavani', 'images/santini/edinson_cavani.webp', '1987-02-14', 'Uruguay', 'Attaccante', 'Boca Juniors', 7, 350, 60, 650, 25, 1, 12, 40, 18, 184),
(NULL, 'Thiago Silva', 'images/santini/thiagosilva.webp', '1984-09-22', 'Brasile', 'Difensore', 'Fluminense', 3, 30, 10, 715, 41, 2, 26, 8, 5, 183),
('Raphaël', 'Guerreiro', 'images/santini/raphael_guerreiro.webp', '1993-12-22', 'Portogallo', 'Difensore', 'Bayern Monaco', 22, 25, 50, 300, 12, 0, 7, 15, 18, 170),
('Lucas', 'Hernández', 'images/santini/lucas_hernandez.webp', '1996-02-14', 'Francia', 'Difensore', 'Paris Saint-Germain', 21, 10, 15, 220, 10, 0, 5, 8, 7, 184),
('Nicolo', 'Zaniolo', 'images/santini/nicolo_zaniolo.webp', '1999-07-02', 'Italia', 'Centrocampista', 'Fiorentina', 22, 25, 20, 100, 8, 0, 2, 10, 8, 190),
('Toni', 'Kroos', 'images/santini/toni_kroos.webp', '1990-01-04', 'Germania', 'Centrocampista', 'Ritirato', 8, 80, 120, 600, 18, 0, 25, 30, 25, 183),
('Jules', 'Koundé', 'images/santini/jules_kounde.webp', '1998-11-12', 'Francia', 'Difensore', 'FC Barcelona', 23, 5, 10, 110, 5, 0, 1, 5, 4, 180),
('Mikel', 'Oyarzabal', 'images/santini/mikel_oyarzabal.webp', '1997-04-21', 'Spagna', 'Attaccante', 'Real Sociedad', 10, 70, 40, 200, 10, 0, 3, 18, 12, 181),
('Jordan', 'Henderson', 'images/santini/jordan_henderson.webp', '1990-06-17', 'Inghilterra', 'Centrocampista', 'Ajax', 14, 40, 60, 500, 20, 0, 10, 18, 15, 182),
('Mario', 'Rui', 'images/santini/mario_rui.webp', '1991-05-27', 'Portogallo', 'Difensore', 'Napoli', 6, 5, 20, 200, 8, 0, 2, 5, 6, 168),
('Samuel', 'Umtiti', 'images/santini/samuel_umtiti.webp', '1993-11-14', 'Francia', 'Difensore', 'Lille', 23, 8, 5, 200, 10, 0, 3, 5, 4, 182),
('Alexis', 'Sánchez', 'images/santini/alexis_sanchez.webp', '1988-12-19', 'Cile', 'Attaccante', 'Udinese', 70, 200, 100, 600, 20, 1, 10, 40, 18, 169),
('Lucas', 'Paquetá', 'images/santini/lucas_paqueta.webp', '1997-08-27', 'Brasile', 'Centrocampista', 'West Ham', 10, 30, 25, 120, 6, 0, 2, 10, 8, 180),
('Matteo', 'Politano', 'images/santini/matteo_politano.webp', '1993-08-03', 'Italia', 'Attaccante', 'Napoli', 21, 50, 30, 200, 8, 0, 3, 15, 10, 171),
('Ruben', 'Dias', 'images/santini/ruben_dias.webp', '1997-05-14', 'Portogallo', 'Difensore', 'Manchester City', 3, 10, 5, 150, 7, 0, 2, 5, 4, 187),
('Federico', 'Dimarco', 'images/santini/federico_dimarco.webp', '1997-11-10', 'Italia', 'Difensore', 'Inter', 32, 8, 20, 100, 5, 0, 2, 8, 6, 175),
('Leandro', 'Paredes', 'images/santini/leandro_paredes.webp', '1994-06-29', 'Argentina', 'Centrocampista', 'AS Roma', 16, 15, 20, 180, 7, 0, 3, 10, 8, 180),
('Giovanni', 'Simeone', 'images/santini/giovanni_simeone.webp', '1995-07-05', 'Argentina', 'Attaccante', 'Napoli', 18, 60, 15, 150, 6, 0, 2, 15, 8, 181),
('Pau', 'Torres', 'images/santini/pau_torres.webp', '1997-01-16', 'Spagna', 'Difensore', 'Aston Villa', 14, 7, 5, 120, 5, 0, 2, 4, 3, 191),
('Weston', 'McKennie', 'images/santini/weston_mckennie.webp', '1998-08-28', 'USA', 'Centrocampista', 'Juventus', 8, 15, 10, 100, 4, 0, 2, 6, 5, 185),
('Alejandro', 'Balde', 'images/santini/alejandro_balde.webp', '2003-10-18', 'Spagna', 'Difensore', 'FC Barcelona', 28, 2, 8, 60, 2, 0, 1, 2, 2, 175),
('Hirving', 'Lozano', 'images/santini/hirving_lozano.webp', '1995-07-30', 'Messico', 'Attaccante', 'San Diego FC', 11, 60, 30, 200, 8, 0, 3, 15, 10, 175),
('Josip', 'Juranović', 'images/santini/josip_juranovic.webp', '1995-08-16', 'Croazia', 'Difensore', 'Union Berlin', 18, 3, 10, 80, 3, 0, 1, 3, 2, 173),
('Arkadiusz', 'Milik', 'images/santini/arkadiusz_milik.webp', '1994-02-28', 'Polonia', 'Attaccante', 'Juventus', 14, 80, 20, 180, 7, 0, 2, 18, 8, 186),
('Davide', 'Frattesi', 'images/santini/davide_frattesi.webp', '1999-09-22', 'Italia', 'Centrocampista', 'Inter', 16, 10, 8, 60, 2, 0, 1, 5, 4, 178);
