'use client'
import styles from './page.module.css'
import Songs from '../components/Songs/songs'
import Albums from '../components/Albums/albums'
import Playbar from '../components/Playbar/playbar'
import Menu from '../components/Menu/menu'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Playlists from '../components/Playlists/playlists'
import Artists from '../components/Artists/artists'
import Library from '../components/Library/library'
import { useAudioContext } from '../context/AudioContext'
import Loading from '../components/Loading/Loading'
import CurrentTracks from '../components/CurrentTracks/currenttracks'
import ConfirmLogOut from '../components/Confirm/confirmLogout'
import ConfirmDelete from '../components/Confirm/confirmDelete'


const Home = () => {
    const [loading, setLoading] = useState(true);
    const [logOutConfirm, setLogOutConfirm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState(false);

    const router = useRouter();
    const [query, setQuery] = useState('');
    const [menuData, setMenuData] = useState(1);
    const [userName, setUserName] = useState('');
    const { currentTrackListMenu } = useAudioContext();

    const [trackList, setTrackList] = useState<any[]>([]);
    const [songsSuccessfullSearch, setSongsSuccessfullSearch] = useState(true);
    const [albumList, setAlbumList] = useState<any[]>([]);
    const [albumSuccessfullSearch, setAlbumSuccessfullSearch] = useState(true);
    const [artistList, setArtistList] = useState<any[]>([]);
    const [artistSuccessfullSearch, setArtistSuccessfullSearch] = useState(true);
    const [playList, setPlayList] = useState<any[]>([]);
    const [playlistSuccessfullSearch, setPlaylistSuccessfullSearch] = useState(true);

    useEffect(() => {
        (async () => {
            const tempUserName = (await axios.get('http://localhost:3001/api/user', { withCredentials: true })).data.username;
            if (tempUserName == undefined) {
                router.push('/');
            } else {
                setUserName(tempUserName);
            }
        })();
        setLoading(false);
    }, [router]);

    const handleSetMenuData = (data: number) => {
        setMenuData(data);
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSearch();
        }
    };


    const handleSearch = async () => {
        if (query != '') {
            const tracklist = (await axios.get('http://localhost:3001/mapi/searchSongs', {
                params: { query: query }, withCredentials: true
            })).data;
            if (tracklist[0].successfull == false) {
                setTrackList([]);
                setSongsSuccessfullSearch(false);
            } else {
                tracklist.shift();
                setTrackList(tracklist);
                setSongsSuccessfullSearch(true);
            }

            if (menuData == 1) {
                setMenuData(2);
            }

            const albumlist = (await axios.get('http://localhost:3001/mapi/searchAlbums', {
                params: { query: query }, withCredentials: true
            })).data;
            if (albumlist[0].successfull == false) {
                setAlbumList([]);
                setAlbumSuccessfullSearch(false);
            } else {
                albumlist.shift();
                setAlbumList(albumlist);
                setAlbumSuccessfullSearch(true);
            }

            const artistlist = (await axios.get('http://localhost:3001/mapi/searchArtists', {
                params: { query: query }, withCredentials: true
            })).data;
            if (artistlist[0].successfull == false) {
                setArtistList([]);
                setArtistSuccessfullSearch(false);
            } else {
                artistlist.shift();
                setArtistList(artistlist);
                setArtistSuccessfullSearch(true);
            }

            const playlists = (await axios.get('http://localhost:3001/mapi/searchPlaylists', {
                params: { query: query }, withCredentials: true
            })).data;
            if (playlists[0].successfull == false) {
                setPlayList([]);
                setPlaylistSuccessfullSearch(false);
            } else {
                playlists.shift();
                setPlayList(playlists);
                setPlaylistSuccessfullSearch(true);
            }
        }
    }

    return (
        <main className={styles.container}>
            <div className={styles.content}>
                <div className={styles.header}>
                    <p className={styles.logo}>EternalSound</p>
                    <div className={styles.profile}>
                        <button className={styles.profile_button}>{userName}</button>
                        <div className={styles.dropdown_content}>
                            <a onClick={() => setDeleteConfirm(true)}>Delete account</a>
                            <a onClick={() => setLogOutConfirm(true)}>Logout</a>
                        </div>
                    </div>
                </div>
                <div className={styles.search}>
                    <input
                        placeholder='Try to find something'
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                    <button onClick={handleSearch}>SEARCH</button>
                </div>
                <div className={styles.main_content}>
                    <Menu menuData={menuData} handleSetMenuData={handleSetMenuData} />
                    {menuData == 1 ? <Library /> :
                        (menuData == 2 ? <Songs trackList={trackList} songsSuccessfullSearch={songsSuccessfullSearch} /> :
                            (menuData == 3 ? <Albums albumList={albumList} albumSuccessfullSearch={albumSuccessfullSearch} /> :
                                (menuData == 4 ? <Artists artistList={artistList} artistSuccessfullSearch={artistSuccessfullSearch} /> :
                                    (menuData == 5 ? <Playlists playList={playList} playlistSuccessfullSearch={playlistSuccessfullSearch} /> : ''))))}
                    {currentTrackListMenu ? <CurrentTracks /> : ''}
                </div>
                <Playbar />
            </div>
            {logOutConfirm ? <ConfirmLogOut closeConfirm={() => setLogOutConfirm(false)}/> : ''}
            {deleteConfirm ? <ConfirmDelete closeConfirm={() => setDeleteConfirm(false)}/> : ''}
            {loading ? <Loading /> : ''}
        </main>
    )
}

export default Home;