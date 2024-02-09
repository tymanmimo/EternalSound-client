import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, Favorite, FavoriteBorder } from "@mui/icons-material"
import styles from './album.module.css';
import axios from 'axios';
import { useAudioContext } from '@/app/context/AudioContext';
import { useFavoriteContext } from '@/app/context/FavoriteContext';


interface AlbumInterface {
    album: { title: any; artist: any; thumbnails: any; browseId: any; year: any; singles: boolean};
    handleOpenAlbumMenu: (album: any) => void;
}

const Album: React.FC<AlbumInterface> = ({ album, handleOpenAlbumMenu }) => {
    const { title, artist, thumbnails, year, browseId, singles } = album;
    const { setTrackList, handleToggleAudio, isPlaying, playbarToggleAudio, trackListId } = useAudioContext();
    const { checkFavorite, addFavorite, removeFavorite } = useFavoriteContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        (async () => {
            const { exist } = await checkFavorite(browseId, 'album');
            setIsFavorite(exist);
        })();
    }, [browseId, artist, checkFavorite, thumbnails])

    const isCurrentAlbum = trackListId === browseId;

    const handlePlayAlbum = async () => {
        if (trackListId == browseId) {
            playbarToggleAudio();
        } else {
            const albumList: { id: any; videoId: any; preview: string; duration: any; title: any; artist: string; }[] = [];
            const { data } = await axios.get('http://localhost:3001/mapi/getAlbumList', {
                params: { browseId: album.browseId }, withCredentials: true
            });
            data.forEach((element: any) => {
                albumList.push({
                    id: element.id,
                    videoId: element.videoId,
                    preview: album.thumbnails,
                    duration: element.duration,
                    title: element.title,
                    artist: album.artist
                })
            });
            setTrackList(albumList);
            handleToggleAudio(albumList[0], browseId);
        }
    }

    const handleToggleFavorite = async () => {
        try {
            setIsFavorite(!isFavorite);
            if (isFavorite) {
                await removeFavorite(browseId, 'album');
            } else {
                await addFavorite(browseId, 'album');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className={styles.album} onClick={() => handleOpenAlbumMenu(album)}>
                <IconButton onClick={(event) => { event.stopPropagation(), handleToggleFavorite() }}
                    className={styles.favorite}
                    style={{
                        color: 'white',
                        borderRadius: '30px',
                        padding: '8px',
                        margin: '5px'
                    }}>
                    {singles != undefined ? '' : (isFavorite ? <Favorite /> : <FavoriteBorder />)}
                </IconButton>
                <Image src={thumbnails} alt={''} width={200} height={200} className={styles.image} />
                <div className={styles.data}>
                    <div className={styles.album_name}>
                        <b>{title}</b>
                        <p>{artist}</p>
                        <p>{year}</p>
                    </div>
                    <IconButton onClick={(event) => { event.stopPropagation(), handlePlayAlbum() }} className={styles.iconbutton}>
                        {isPlaying && isCurrentAlbum ? <Pause /> : <PlayArrow />}
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default Album;