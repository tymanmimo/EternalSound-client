import { useState, useEffect } from 'react';
import styles from './artistmenu.module.css';
import Image from 'next/image';
import Track from '../Track/track';
import { useAudioContext } from '@/app/context/AudioContext';
import Album from '../Album/album';
import AlbumMenu from '../AlbumMenu/albummenu';
import { IconButton } from '@mui/material';
import { Cancel } from '@mui/icons-material';
import axios from 'axios';

interface ArtistMenuInterface {
    artistData: {
        name: string,
        subscribers: string,
        thumbnail: string,
        songs: any[],
        albums: any[],
        singles: any[],
    };
    handleCloseArtistMenu: () => void;
}


const ArtistMenu: React.FC<ArtistMenuInterface> = ({ artistData, handleCloseArtistMenu }) => {
    const { setTrackList } = useAudioContext();
    const [albumMenu, setAlbumMenu] = useState(false);
    const [currentAlbum, setCurrentAlbum] = useState<any>([]);
    const [currentAlbumList, setCurrentAlbumList] = useState<any>([]);
    const [trackCount, setTrackCount] = useState(0);
    const [albumCount, setAlbumCount] = useState(0);
    const [singleCount, setSingleCount] = useState(0);

    useEffect(() => {
        if (artistData.songs.length > 5)
            setTrackCount(5);
        else
            setTrackCount(artistData.songs.length);
        if (artistData.albums.length > 6)
            setAlbumCount(6);
        else
            setAlbumCount(artistData.albums.length);
        if (artistData.singles.length)
            setSingleCount(6);
        else
            setSingleCount(artistData.singles.length);
    }, []);

    const setPlayList = () => {
        setTrackList(artistData.songs);
    }

    const openAlbumMenu = async (album: { browseId: string, thumbnails: string, artist: string }) => {
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
        setCurrentAlbum(album);
        setCurrentAlbumList(albumList);
        setAlbumMenu(true);
    }

    const closeAlbumMenu = () => {
        setAlbumMenu(false);
    }

    const moreTracks = () => {
        if (trackCount == 5) {
            setTrackCount(artistData.songs.length);
        } else {
            setTrackCount(5);
        }
    }

    const moreAlbums = () => {
        if (albumCount == 6) {
            setAlbumCount(artistData.songs.length);
        } else {
            setAlbumCount(6);
        }
    }

    const moreSingles = () => {
        if (singleCount == 6) {
            setSingleCount(artistData.songs.length);
        } else {
            setSingleCount(6);
        }
    }

    return (
        <>
            <div className={styles.container}>
                <div className={styles.header}>
                    <Image src={artistData.thumbnail} alt='' width={360} height={160} />
                    <div className={styles.info}>
                        <div>
                            <div className={styles.exite}>
                                <h2>Artist</h2>
                                <IconButton className={styles.iconbutton} onClick={handleCloseArtistMenu}>
                                    <Cancel sx={{ color: 'white' }} />
                                </IconButton>
                            </div>
                            <h1>{artistData.name}</h1>
                            <p>{artistData.subscribers} subscribers</p>
                        </div>
                        <p>{artistData.albums.length} albums</p>
                    </div>
                </div>
                {(artistData.songs.length > 0) ?
                    <div className={styles.chapterBlock}>
                        <p className={styles.chapter}>Tracks</p>
                        <div className={styles.list}>
                            {artistData.songs.slice(0, trackCount).map((track: any) => (
                                <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId='' />
                            ))}
                        </div>
                        {artistData.songs.length > 5 ?
                            <button className={styles.button} onClick={moreTracks}>
                                {trackCount == 5 ? 'MORE' : 'CLOSE'}
                            </button> : ''}
                    </div>
                    : ''}

                {(artistData.albums.length > 0) ?
                    <div className={styles.chapterBlock}>
                        <p className={styles.chapter}>Albums</p>
                        <div className={styles.albumlist}>
                            {artistData.albums.slice(0, albumCount).map((album: any) => (
                                <Album key={album.id} album={album} handleOpenAlbumMenu={openAlbumMenu} />
                            ))}
                        </div>
                        {artistData.albums.length > 6 ?
                            <button className={styles.button} onClick={moreAlbums}>
                                {albumCount == 6 ? 'MORE' : 'CLOSE'}
                            </button> : ''}
                    </div>
                    : ''}

                {(artistData.singles.length > 0) ?
                    <div className={styles.chapterBlock}>
                        <p className={styles.chapter}>Singles</p>
                        <div className={styles.albumlist}>
                            {artistData.singles.slice(0, singleCount).map((album: any) => (
                                <Album key={album.id} album={album} handleOpenAlbumMenu={openAlbumMenu} />
                            ))}
                        </div>
                        {artistData.singles.length > 6 ?
                            <button className={styles.button} onClick={moreSingles}>
                                {singleCount == 6 ? 'MORE' : 'CLOSE'}
                            </button> : ''}
                    </div>
                    : ''}
            </div>
            {albumMenu ? <AlbumMenu album={currentAlbum} albumList={currentAlbumList} handleCloseAlbumMenu={closeAlbumMenu} /> : ''}
        </>
    )
}

export default ArtistMenu;