import { useEffect, useState } from 'react';
import styles from './library.module.css'
import { useAudioContext } from '@/app/context/AudioContext';
import Track from '../Track/track';
import Playlist from '../Playlist/playlist';
import Album from '../Album/album';
import Artist from '../Artist/artist';
import AlbumMenu from '../AlbumMenu/albummenu';
import PlaylistMenu from '../PlaylistMenu/playlistmenu';
import { useFavoriteContext } from '@/app/context/FavoriteContext';
import axios from 'axios';
import ArtistMenu from '../ArtistMenu/artistmenu';



const Library = () => {
    const [chapterIndex, setChapterIndex] = useState(1);
    const { getFavoriteSongs, getFavoriteAlbums, getFavoriteArtists, getFavoritePlaylists } = useFavoriteContext();
    const [trackList, setInnerTrackList] = useState<any>([]);
    const [albumList, setAlbumList] = useState<any>([]);
    const [artistList, setArtistList] = useState<any>([]);
    const [playLists, setPlayLists] = useState<any>([]);


    useEffect(() => {
        (async () => {
            if ((await axios.get('http://localhost:3001/api/user', { withCredentials: true })).data) {
                switch (chapterIndex) {
                    case 1:
                        setInnerTrackList(await getFavoriteSongs());
                        break;
                    case 2:
                        setAlbumList(await getFavoriteAlbums());
                        break;
                    case 3:
                        setArtistList(await getFavoriteArtists());
                        break;
                    case 4:
                        setPlayLists(await getFavoritePlaylists());
                        break;
                    default:
                        break;
                }
            }
        })()
    }, [chapterIndex, getFavoriteAlbums, getFavoriteArtists, getFavoritePlaylists, getFavoriteSongs]);


    const { setTrackList } = useAudioContext();
    const setPlayList = () => {
        setTrackList(trackList);
    }

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

    const [artistMenu, setArtistMenu] = useState(false);
    const [artistData, setArtistData] = useState<any>([]);

    const handleOpenArtistMenu = async (browseId: string) => {
        const {data} = await axios.get('http://localhost:3001/mapi/getArtist', {
                params: { browseId: browseId }, withCredentials: true
            });
        setArtistData(data);
        setArtistMenu(true);
    }

    const handleCloseArtistMenu = () => {
        setArtistData([]);
        setArtistMenu(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.chapter}>
                    <button onClick={() => setChapterIndex(1)} className={chapterIndex == 1 ? styles.active : ''}>SONGS</button>
                    <button onClick={() => setChapterIndex(2)} className={chapterIndex == 2 ? styles.active : ''}>ALBUMS</button>
                    <button onClick={() => setChapterIndex(3)} className={chapterIndex == 3 ? styles.active : ''}>ARTISTS</button>
                    <button onClick={() => setChapterIndex(4)} className={chapterIndex == 4 ? styles.active : ''}>PLAYLISTS</button>
                </div>
                {(chapterIndex == 1) ?
                    <div className={styles.list}>
                        {(trackList.length > 0) ?
                            trackList.map((track: any) => (
                                <Track key={track.id} track={track} setPlayList={setPlayList} innerTrackListId='' />
                            ))
                            :
                            <p className={styles.notFound}>You don&#39;t have any favorites songs</p>
                        }
                    </div> : (chapterIndex == 2) ?
                        <div className={styles.albumlist}>
                            {(albumList.length > 0) ?
                                albumList.map((album: any) => (
                                    <Album key={album.id} album={album} handleOpenAlbumMenu={openAlbumMenu} />
                                ))
                                :
                                <p className={styles.notFound}>You don&#39;t have any favorites albums</p>
                            }
                        </div> : (chapterIndex == 3) ?
                            <div className={styles.list}>
                                {(artistList.length > 0) ?
                                    artistList.map((artist: any) => (
                                        <Artist key={artist.id} artist={artist} handleOpenArtistMenu={handleOpenArtistMenu}/>
                                    ))
                                    :
                                    <p className={styles.notFound}>You don&#39;t have any favorites artists</p>
                                }
                            </div> :
                            <div className={styles.albumlist}>
                                {(playLists.length > 0) ?
                                    playLists.map((playlist: any) => (
                                        <Playlist key={playlist.id} playlist={playlist} handleOpenPlaylistMenu={openPlaylistMenu} />
                                    ))
                                    :
                                    <p className={styles.notFound}>You don&#39;t have any favorites playlists</p>
                                }
                            </div>
                }
            </div>
            {artistMenu ? <ArtistMenu artistData={artistData} handleCloseArtistMenu={handleCloseArtistMenu}/> : ''}
            {albumMenu ? <AlbumMenu album={currentAlbum} albumList={currentAlbumList} handleCloseAlbumMenu={closeAlbumMenu} /> : ''}
            {playlistMenu ? <PlaylistMenu playlist={currentPlaylist} playList={currentPlayList} handleClosePlaylistMenu={closePlaylistMenu} /> : ''}
        </div>
    );
};

export default Library;