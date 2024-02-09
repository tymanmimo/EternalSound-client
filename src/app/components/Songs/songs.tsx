import styles from './songs.module.css';
import Track from '../Track/track';
import { useAudioContext } from '@/app/context/AudioContext';


interface SongsInterface{
    trackList: any[],
    songsSuccessfullSearch: boolean
}

const Songs:React.FC<SongsInterface> = ({trackList, songsSuccessfullSearch}) => {
    const innerTrackList = trackList;
    const { setTrackList } = useAudioContext();
    const setPlayList = () => {
        setTrackList(trackList.slice(0));
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.list}>
                    {songsSuccessfullSearch ?
                        innerTrackList.map((track: any) => (
                            <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId='' />
                        ))
                        :
                        <p className={styles.notFound}>Not Found</p>
                    }
                </div>
            </div>
        </div>
    )
}

export default Songs;