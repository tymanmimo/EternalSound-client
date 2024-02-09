import styles from './artists.module.css'
import Artist from '../Artist/artist';
import { useState } from 'react';
import axios from 'axios';
import ArtistMenu from '../ArtistMenu/artistmenu';


interface ArtistsInterface{
    artistList: any[];
    artistSuccessfullSearch: boolean;
}

const Artists:React.FC<ArtistsInterface> = ({artistList, artistSuccessfullSearch}) => {
    const [artistMenu, setArtistMenu] = useState(false);
    const [artistData, setArtistData] = useState<any>([]);

    const handleOpenArtistMenu = async (browseId: string) => {
        const {data} = await axios.get('http://localhost:3001/mapi/getArtist', {
                params: { browseId }, withCredentials: true
            });
        setArtistData(data);
        setArtistMenu(true);
        console.log(data);
    }

    const handleCloseArtistMenu = () => {
        setArtistData([]);
        setArtistMenu(false);
    }

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <div className={styles.artists}>
                    {artistSuccessfullSearch ?
                        artistList.map((artist: any) => (
                            <Artist key={artist.id} artist={artist} handleOpenArtistMenu={handleOpenArtistMenu}/>
                        ))
                        :
                        <p className={styles.notFound}>Not Found</p>
                    }
                </div>
            </div>
            {artistMenu ? <ArtistMenu artistData={artistData} handleCloseArtistMenu={handleCloseArtistMenu}/> : ''}
        </div>
    )
};

export default Artists;