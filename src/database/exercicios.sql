-- Active: 1698108291354@@127.0.0.1@3306


CREATE TABLE videos (
    id TEXT PRIMARY KEY UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    duracao REAL NOT NULL,
    data_update DATETIME DEFAULT (strftime('%Y-%m-%d %H:%M:%S', 'now', 'localtime'))
)

INSERT INTO videos (id, titulo, duracao)
VALUES
    ('v001', 'bom dia o sol na fazendinha', 120),
    ('v002', 'video de aprendizagem SQL', 350);

SELECT * FROM videos;