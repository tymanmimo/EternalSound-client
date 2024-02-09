import Image from 'next/image';
import Track from '../Track/track';
import styles from './playlistmenu.module.css'
import { useAudioContext } from '@/app/context/AudioContext';
import { IconButton } from '@mui/material';
import { Cancel, Pause, PlayArrow } from '@mui/icons-material';

interface PlaylistMenuInterface {
    playlist: { title: any; author: any; thumbnails: any; browseId: any; year: any; };
    playList: any[];
    handleClosePlaylistMenu: () => void;
}


const PlaylistMenu: React.FC<PlaylistMenuInterface> = ({ playlist, playList, handleClosePlaylistMenu }) => {
    const { title, author, thumbnails, browseId } = playlist;
    const { setTrackList, handleToggleAudio, isPlaying, playbarToggleAudio, trackListId} = useAudioContext();

    const setPlayList = () => {
        setTrackList(playList.slice(0));
    }

    const isCurrentPlaylist = trackListId === browseId;

    const handlePlayPlaylist =  () => {
        if(trackListId == browseId){
            playbarToggleAudio();
        }else{
            setTrackList(playList);
            handleToggleAudio(playList[0], browseId);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image src={thumbnails} alt='' width={200} height={200}/>
                <div className={styles.info}>
                    <div>
                        <h2>Playlist</h2>
                        <h1>{title}</h1>
                        <h2>{author}</h2>
                    </div>
                    <div className={styles.trackInfo}>
                        <p>{playList.length} songs</p>
                        <div>
                            <IconButton style={{
                                border: '2px solid white',
                                borderRadius: '50%',
                                padding: '8px',
                            }} onClick={handlePlayPlaylist}>
                                {isPlaying && isCurrentPlaylist ? <Pause sx={{ color: 'white' }} /> : <PlayArrow sx={{ color: 'white' }} />}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <IconButton className={styles.iconbutton} onClick={handleClosePlaylistMenu}>
                    <Cancel sx={{ color: 'white' }} />
                </IconButton>
            </div>
            <div className={styles.list}>
                {playList.map((track: any) => (
                    <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId={browseId} />
                ))}
            </div>
        </div>
    )
}

export default PlaylistMenu;