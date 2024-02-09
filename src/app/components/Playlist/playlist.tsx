import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, Favorite, FavoriteBorder } from "@mui/icons-material"
import styles from './playlist.module.css';
import axios from 'axios';
import { useAudioContext } from '@/app/context/AudioContext';
import { useFavoriteContext } from '@/app/context/FavoriteContext';


interface PlaylistInterface {
    playlist: { title: any; author: any; thumbnails: any; browseId: any; };
    handleOpenPlaylistMenu: (playlist: any) => void;
}

const Playlist: React.FC<PlaylistInterface> = ({ playlist, handleOpenPlaylistMenu }) => {
    const { title, author, thumbnails, browseId } = playlist;
    const { setTrackList, handleToggleAudio, isPlaying, playbarToggleAudio, trackListId } = useAudioContext();
    const { checkFavorite, addFavorite, removeFavorite } = useFavoriteContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        (async () => {
            const { exist } = await checkFavorite(browseId, 'playlist');
            setIsFavorite(exist);
        })();
    }, [browseId, checkFavorite]);

    const isCurrentPlaylist = trackListId === browseId;

    const handlePlayAlbum = async () => {
        if (trackListId == browseId) {
            playbarToggleAudio();
        } else {
            const playList: { id: any; videoId: any; duration: any; title: any; artist: any; preview: any; }[] = [];
            const { data } = await axios.get('http://localhost:3001/mapi/getPlaylist', {
                params: { browseId: playlist.browseId }, withCredentials: true
            });
            data.forEach((element: any) => {
                playList.push({
                    id: element.id,
                    videoId: element.videoId,
                    duration: element.duration,
                    title: element.title,
                    artist: element.artists,
                    preview: element.thumbnails,
                })
            });
            setTrackList(playList);
            handleToggleAudio(playList[0], browseId);
        }
    }

    const handleToggleFavorite = async () => {
        try {
            setIsFavorite(!isFavorite);
            if (isFavorite) {
                await removeFavorite(browseId, 'playlist');
            } else {
                await addFavorite(browseId, 'playlist');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <>
            <div className={styles.playlist} onClick={() => handleOpenPlaylistMenu(playlist)}>
                <IconButton onClick={(event) => { event.stopPropagation(), handleToggleFavorite() }}
                    className={styles.favorite}
                    style={{
                        color: 'white',
                        borderRadius: '30px',
                        padding: '8px',
                        margin: '5px'
                    }}>
                    {isFavorite ? <Favorite /> : <FavoriteBorder />}
                </IconButton>
                <Image src={thumbnails} alt='' width={200} height={200} className={styles.image} />
                <div className={styles.data}>
                    <div className={styles.playlist_name}>
                        <b>{title}</b>
                        <p>{author}</p>
                    </div>
                    <IconButton onClick={(event) => { event.stopPropagation(), handlePlayAlbum() }} className={styles.iconbutton}>
                        {isPlaying && isCurrentPlaylist ? <Pause /> : <PlayArrow />}
                    </IconButton>
                </div>
            </div>
        </>
    );
};

export default Playlist;