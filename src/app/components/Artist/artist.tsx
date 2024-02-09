import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import styles from './artist.module.css';
import { IconButton } from '@mui/material';
import { Favorite, FavoriteBorder } from '@mui/icons-material';
import { useFavoriteContext } from '@/app/context/FavoriteContext';


interface ArtistInterface {
    artist: { name: any, subscribers: any, thumbnails: any, browseId: any }
    handleOpenArtistMenu: (browseId: string) => void;
};


const Artist: React.FC<ArtistInterface> = ({ artist, handleOpenArtistMenu }) => {
    const { name, subscribers, thumbnails, browseId } = artist;
    const { checkFavorite, addFavorite, removeFavorite } = useFavoriteContext();
    const [isFavorite, setIsFavorite] = useState(false);

    useEffect(() => {
        (async () => {
            const result = await checkFavorite(browseId, 'artist');
            setIsFavorite(result.exist);
        })()
    }, [checkFavorite, browseId])

    const handleToggleFavorite = async () => {
        try {
            setIsFavorite(!isFavorite);
            if (isFavorite) {
                await removeFavorite(browseId, 'artist');
            } else {
                await addFavorite(browseId, 'artist');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };

    return (
        <div className={styles.artist} onClick={() => {handleOpenArtistMenu(browseId)}}>
            <Image src={thumbnails} alt='' width={500} height={500} style={{objectFit: 'cover'}}/>
            <div className={styles.info}>
                <h1>{name}</h1>
                <h2>{subscribers}</h2>
            </div>
            <IconButton onClick={(event) => { event.stopPropagation(), handleToggleFavorite() }}
                className={styles.favorite}
                style={{
                    borderRadius: '30px',
                    padding: '8px',
                    margin: '5px'
                }}>
                {isFavorite ? <Favorite /> : <FavoriteBorder />}
            </IconButton>
        </div>
    );
};

export default Artist;