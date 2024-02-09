import { useState } from 'react';
import styles from './playlists.module.css';
import Playlist from '../Playlist/playlist';
import PlaylistMenu from '../PlaylistMenu/playlistmenu';
import axios from 'axios';


interface PlaylistInterface {
    playList: any[];
    playlistSuccessfullSearch: boolean;
}

const Playlists: React.FC<PlaylistInterface> = ({ playList, playlistSuccessfullSearch }) => {
    const [playlistMenu, setPlaylistMenu] = useState(false);
    const [currentPlaylist, setCurrentPlaylist] = useState<any>([]);
    const [currentPlayList, setCurrentPlayList] = useState<any>([]);

    const openPlaylistMenu = async (playlist: {browseId: string}) => {
        const playList: { id: any; videoId: any; duration: any; title: any; artist: any; preview: any; }[] = [];
        const {data}= await axios.get('http://localhost:3001/mapi/getPlaylist', {
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
        setCurrentPlaylist(playlist);
        setCurrentPlayList(playList);
        setPlaylistMenu(true);
    }

    const closePlaylistMenu = () => {
        setPlaylistMenu(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.playlists}>
                    {playlistSuccessfullSearch ?
                        playList.map((playlist: any) => (
                            <Playlist key={playlist.id} playlist={playlist} handleOpenPlaylistMenu={openPlaylistMenu} />
                        ))
                        :
                        <p className={styles.notFound}>Not Found</p>
                    }
                </div>
            </div>
            {playlistMenu ? <PlaylistMenu playlist={currentPlaylist} playList={currentPlayList} handleClosePlaylistMenu={closePlaylistMenu} /> : ''}
        </div>
    )
}

export default Playlists;