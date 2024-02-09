import { useAudioContext } from '@/app/context/AudioContext';
import Track from '../Track/track';
import styles from './currenttracks.module.css';

const CurrentTracks = () => {
    const { disable, trackList, setTrackList } = useAudioContext();
    const setPlayList = () => {
        setTrackList(trackList.slice(0));
    }
    return (
        <div className={styles.container}>
            <h1>Current tracklist</h1>
            <div className={styles.list}>
                {!disable ?
                    trackList.map((track: any) => (
                        <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId='' />
                    ))
                    :
                    <p className={styles.notFound}>Current tracklist is clear</p>
                }
            </div>
        </div>
    )
}

export default CurrentTracks;