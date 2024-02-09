import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { useAudioContext } from '@/app/context/AudioContext';
import { IconButton } from "@mui/material";
import { PlayArrow, Pause, Favorite, FavoriteBorder } from "@mui/icons-material"
import styles from './track.module.css';
import secondsToMMSS from '@/app/utils/secondsToMMSS';
import cn from "classnames";
import { useFavoriteContext } from '@/app/context/FavoriteContext';


interface TrackInterface {
    track: { id: any; videoId: any; preview: any; title: any; artist: any; duration: any};
    setPlayList: () => void;
    innerTrackListId: string;
}

const Track: React.FC<TrackInterface> = ({ track, setPlayList, innerTrackListId }) => {
    const { title, artist, preview, duration, videoId} = track;
    const { currentTrack, handleToggleAudio, isPlaying } = useAudioContext();
    const {checkFavorite, addFavorite, removeFavorite} = useFavoriteContext();
    const [isFavorite, setIsFavorite] = useState(false);
    const isCurrentTrack = currentTrack.videoId === videoId;
    const formatedDuration = secondsToMMSS(duration);


    useEffect(() => {
      (async() => {
        const result = await checkFavorite(videoId, 'song');
        setIsFavorite(result.exist);
      })()
    }, [checkFavorite, videoId]);

    const handleToggleFavorite = async () => {
        try {
          setIsFavorite(!isFavorite);
          if (isFavorite) {
            await removeFavorite(videoId, 'song');
          } else {
            await addFavorite(videoId, 'song');
          }
        } catch (error) {
          console.error('Error:', error);
        }
      };
            

    return (
        <div className={cn(styles.track, isCurrentTrack && styles.playing)} 
            onClick={() => { setPlayList(), handleToggleAudio(track, innerTrackListId) }}>
            <IconButton>
                {isCurrentTrack && isPlaying ? <Pause /> : <PlayArrow />}
            </IconButton>
            <Image src={preview} alt='' width={50} height={50}/>
            <div className={styles.track_name}>
                <b>{title}</b>
                <p>{artist}</p>
            </div>
            <IconButton onClick={(event) => {event.stopPropagation(), handleToggleFavorite()}}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
            <p>{formatedDuration}</p>
        </div>
    );
};

export default Track;