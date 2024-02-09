import Image from 'next/image';
import Track from '../Track/track';
import styles from './albummenu.module.css'
import { useAudioContext } from '@/app/context/AudioContext';
import { IconButton } from '@mui/material';
import { Cancel, Pause, PlayArrow } from '@mui/icons-material';

interface AlbumMenuInterface {
    album: { [x: string]: undefined; title: any; artist: any; thumbnails: any; browseId: any; year: any;};
    albumList: any[];
    handleCloseAlbumMenu: () => void;
}


const AlbumMenu: React.FC<AlbumMenuInterface> = ({ album, albumList, handleCloseAlbumMenu }) => {
    const { title, artist, thumbnails, browseId, year } = album;
    const { setTrackList, handleToggleAudio, isPlaying, playbarToggleAudio, trackListId } = useAudioContext();

    const setPlayList = () => {
        setTrackList(albumList.slice(0));
    }

    const isCurrentAlbum = trackListId === browseId;

    const handlePlayAlbum = () => {
        if (trackListId == browseId) {
            playbarToggleAudio();
        } else {
            setTrackList(albumList);
            handleToggleAudio(albumList[0], browseId);
        }
    }

    return (
        <div className={styles.container}>
            <div className={styles.header}>
                <Image src={thumbnails} alt='' width={200} height={200} />
                <div className={styles.info}>
                    <div>
                        <h2>{album.single != undefined ? 'Single' : 'Album'}</h2>
                        <h1>{title}</h1>
                        <h2>{artist}, {year}</h2>
                    </div>
                    <div className={styles.trackInfo}>
                        <p>{albumList.length} songs</p>
                        <div>
                            <IconButton style={{
                                border: '2px solid white',
                                borderRadius: '50%',
                                padding: '8px',
                            }} onClick={handlePlayAlbum}>
                                {isPlaying && isCurrentAlbum ? <Pause sx={{ color: 'white' }} /> : <PlayArrow sx={{ color: 'white' }} />}
                            </IconButton>
                        </div>
                    </div>
                </div>
                <IconButton className={styles.iconbutton} onClick={handleCloseAlbumMenu}>
                    <Cancel sx={{ color: 'white' }} />
                </IconButton>
            </div>
            <div className={styles.list}>
                {albumList.map((track: any) => (
                    <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId={browseId} />
                ))}
            </div>
        </div>
    )
}

export default AlbumMenu;