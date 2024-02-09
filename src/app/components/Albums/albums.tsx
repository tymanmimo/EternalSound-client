import { useState } from 'react';
import styles from './albums.module.css'
import Album from '../Album/album';
import AlbumMenu from '../AlbumMenu/albummenu';
import axios from 'axios';

interface AlbumsInterface {
    albumList: any[];
    albumSuccessfullSearch: boolean;
}

const Albums: React.FC<AlbumsInterface> = ({ albumList, albumSuccessfullSearch }) => {
    const [albumMenu, setAlbumMenu] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState<any>([]);
    const [currentAlbumList, setCurrentAlbumList] = useState<any>([]);

    const openAlbumMenu = async (album: {browseId: string, thumbnails: string, artist: string}) => {
        const albumList: { id: any; videoId: any; preview: string; duration: any; title: any; artist: string; }[] = [];
        const {data} = await axios.get('http://localhost:3001/mapi/getAlbumList', {
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
        setCurrentAlbum(album);
        setCurrentAlbumList(albumList);
        setAlbumMenu(true);
    }

    const closeAlbumMenu = () => {
        setAlbumMenu(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.albums}>
                    {albumSuccessfullSearch ?
                        albumList.map((album: any) => (
                            <Album key={album.id} album={album} handleOpenAlbumMenu={openAlbumMenu} />
                        ))
                        :
                        <p className={styles.notFound}>Not Found</p>
                    }
                </div>
            </div>
            {albumMenu ? <AlbumMenu album={currentAlbum} albumList={currentAlbumList} handleCloseAlbumMenu={closeAlbumMenu} /> : ''}
        </div>
    )
}

export default Albums;