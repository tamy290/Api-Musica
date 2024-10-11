import express from 'express';
import { faker } from '@faker-js/faker';

const app = express();
const PORT = 3000;

function generateSong() {
    return {
        id: faker.string.uuid(),
        titulo: faker.music.songName(),
        artista: faker.person.fullName(),
        album: faker.lorem.words(2),
        duracion: faker.number.int({ min: 120, max: 400 }),
        genero: faker.music.genre(),
        fechaLanzamiento: faker.date.past(10).toDateString(),
    };
}

function generatePlaylist() {
    const canciones = Array.from({ length: faker.number.int({ min: 5, max: 15 }) }, () => generateSong());

    return {
        idPlaylist: faker.string.uuid(),
        nombre: faker.lorem.words(3),
        descripcion: faker.lorem.sentence(),
        canciones: canciones,
        creador: faker.person.fullName(),
        fechaCreacion: faker.date.past(2).toDateString(),
    };
}

app.get('/cancion', (res) => {
    const song = generateSong();
    res.json(song);
});

app.get('/playlist', (res) => {
    const playlist = generatePlaylist();
    res.json(playlist);
});

app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
