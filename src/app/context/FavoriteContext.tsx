'use client'
import axios from "axios";
import { ReactNode, createContext, useContext } from "react";

interface FavoriteContextType {
    checkFavorite: (browseId: string, type: string) => any
    addFavorite: (browseId: string, type: string) => any
    removeFavorite: (browseId: string, type: string) => any
    getFavoriteSongs: () => any
    getFavoriteAlbums: () => any
    getFavoriteArtists: () => any
    getFavoritePlaylists: () => any
}

export const FavoriteContext = createContext<FavoriteContextType | undefined>(undefined);

const FavoriteProvider: React.FC<{ children: ReactNode }> = ({ children }) => {

    const checkFavorite = async (browseId: string, type: string) => {
        try {
            const {data} = await axios.get('http://localhost:3001/api/checkFavorite', {
                params: {
                    browseId: browseId,
                    type: type,
                }, withCredentials: true,
            })
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const removeFavorite = async (browseId: string, type: string) => {
        try {
            const {data} = await axios.delete('http://localhost:3001/api/removeFavorite',
                { data: { browseId, type }, withCredentials: true })
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const addFavorite = async (browseId: string, type: string) => {
        try {
            const {data} = await axios.put('http://localhost:3001/api/addFavorite',
                { browseId, type }, { withCredentials: true });
            return data;
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const getFavoriteSongs = async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/mapi/getFavoriteSongs', { withCredentials: true });
            if(data.length > 1){
                data.shift();
                return data;
            }
            else
                return [];
        }catch(error){
            console.log(error);
        }
    }

    const getFavoriteAlbums = async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/mapi/getFavoriteAlbums', { withCredentials: true });
            if(data.length > 1){
                data.shift();
                return data;
            }
            else
                return [];
        }catch(error){
            console.log(error);
        }
    }

    const getFavoriteArtists = async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/mapi/getFavoriteArtists', { withCredentials: true });
            if(data.length > 1){
                data.shift();
                return data;
            }
            else
                return [];
        }catch(error){
            console.log(error);
        }
    }

    const getFavoritePlaylists = async () => {
        try{
            const {data} = await axios.get('http://localhost:3001/mapi/getFavoritePlaylists', { withCredentials: true });                                      
            if(data.length > 1){
                data.shift();
                return data;
            }
            else
                return [];
        }catch(error){
            console.log(error);
        }
    }

    const value: FavoriteContextType = {
        checkFavorite, addFavorite, removeFavorite, getFavoriteSongs,
        getFavoriteAlbums, getFavoriteArtists, getFavoritePlaylists
    }

    return <FavoriteContext.Provider value={value}>{children}</FavoriteContext.Provider>
}

export const useFavoriteContext = () => {
    const context = useContext(FavoriteContext);
    if (!context) {
        throw new Error('useAudioContext must be used within an AudioProvider');
    }
    return context;
};

export default FavoriteProvider;