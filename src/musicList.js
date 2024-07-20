import { writable } from "svelte/store";
export const musicList = writable ([
    {
        name: "Me And Your Mama",
        artist: "Childish Gambino",
        image: "image2.jpg",
        audio: "audio2.mp3"
    },
    {
        name: "ROSALÍA - BAGDAD (Cap.7: Liturgia)",
        artist: "Rosalia",
        image: "image1.jpg",
        audio: "audio1.mp3"
    },
    {
        name: "Loose",
        artist: "Daniel Caesar",
        image: "image3.jpg",
        audio: "audio3.mp3"
    },
    {
        name: "Waste",
        artist: "Brockhampton",
        image: "image4.jpg",
        audio: "audio4.mp3"
    },
    {
        name: "Revenge and paranoia",
        artist: "Miya Lowe",
        image: "image5.jpg",
        audio: "audio5.mp3"
    },

]);