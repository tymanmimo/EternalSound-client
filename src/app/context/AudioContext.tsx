'use client'
import axios from "axios";
import { ReactNode, createContext, useContext, useState } from "react";

let audio: HTMLAudioElement;
if (typeof window !== 'undefined' && typeof Audio !== 'undefined') {
    audio = new Audio();
}

interface AudioContextType {
    audio: any;
    disable: boolean;
    repeat: boolean;
    setRepeat: (arg: boolean) => void;
    currentTrack: any;
    isPlaying: boolean;
    trackListId: string;
    setTrackListId: (browseId: string) => void;
    handleToggleAudio: (track: any, trackListId: string) => void;
    handleToggleNextAudio: () => void;
    handleTogglePreviousAudio: () => void;
    nextTrack: () => void;
    trackList: [];
    setTrackList: (innerTrackList: any[]) => void;
    currentTrackListMenu: boolean;
    setCurrentTrackListMenu: (arg: boolean) => void;
    playbarToggleAudio: () => void;
    clearAudioContext: () => void;
}

export const AudioContext = createContext<AudioContextType | undefined>(undefined);

const AudioProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [trackList, setTrackList] = useState<any>([]);
    const [currentTrackListMenu, setCurrentTrackListMenu] = useState(false);

    const [currentTrack, setCurrentTrack] = useState<any>({
        id: -1,
        videoId: "",
        preview: "",
        title: "",
        artist: "",
        duration: 0
    });

    const [disable, setDisable] = useState(true);
    const [repeat, setRepeat] = useState(false);
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [trackListId, setTrackListId] = useState<string>('');

    const playbarToggleAudio = () => {
        if (isPlaying) {
            setPlaying(false);
            audio.pause();
        } else {
            setPlaying(true);
            audio.play();
        }
    }

    if (audio) {
        audio.addEventListener('canplaythrough', () => {
            audio.play();
        })
    }

    const handleToggleAudio = async (track: { id: any; videoId: any; preview: any; title: any; artist: any; duration: any; }, innerTrackListId: string) => {
        setDisable(false);
        if (track.videoId == '') {
            return;
        }
        console.log(trackList);
        if (currentTrack.videoId !== track.videoId) {
            try {
                const response = await axios.get('http://localhost:3001/mapi/getSong', {
                    params: { videoId: track.videoId }, withCredentials: true
                });
                audio.pause();
                audio.currentTime = 0;
                audio.src = response.data.url;
                setPlaying(true);
                setTrackListId(innerTrackListId);
                setCurrentTrack(track);
                return;
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }

        if (isPlaying) {
            audio.pause();
            setPlaying(false);
        } else {
            setPlaying(true);
            audio.play();
        }
    }

    const nextTrack = async () => {
        audio.pause();
        if (repeat && (audio.currentTime == audio.duration)) {
            audio.currentTime = 0;
            audio.play();
            return;
        }
        if (currentTrack.id == trackList.length) {
            try {
                const response = await axios.get('http://localhost:3001/mapi/getSong', {
                    params: { videoId: trackList[0].videoId }, withCredentials: true
                });
                audio.src = response.data.url;
                setCurrentTrack(trackList[0]);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        } else {
            try {
                const response = await axios.get('http://localhost:3001/mapi/getSong', {
                    params: { videoId: trackList[currentTrack.id].videoId }, withCredentials: true
                });
                audio.src = response.data.url;
                setCurrentTrack(trackList[currentTrack.id]);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
        setPlaying(true);
    }

    const handleToggleNextAudio = async () => {
        if (currentTrack.id == -1) {
            return;
        }
        nextTrack();
    }

    const handleTogglePreviousAudio = async () => {
        if (currentTrack.id == -1) {
            return;
        }
        audio.pause();
        if (currentTrack.id == 1) {
            try {
                const response = await axios.get('http://localhost:3001/mapi/getSong', {
                    params: { videoId: trackList[trackList.length - 1].videoId }, withCredentials: true
                });
                audio.src = response.data.url;
                setCurrentTrack(trackList[trackList.length - 1]);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        } else {
            try {
                const response = await axios.get('http://localhost:3001/mapi/getSong', {
                    params: { videoId: trackList[currentTrack.id - 2].videoId }, withCredentials: true
                });
                audio.src = response.data.url;
                setCurrentTrack(trackList[currentTrack.id - 2]);
            } catch (error) {
                console.error('Ошибка при выполнении запроса:', error);
            }
        }
        setPlaying(true);
    }

    const clearAudioContext = () => {
        audio.pause();
        audio.currentTime = 0;
        audio.volume = 1;
        audio.src = '';
        setTrackList([]);
        setDisable(true);
        setPlaying(false);
        setTrackListId('');
        setRepeat(false);
        setCurrentTrack(({
            id: -1,
            videoId: "",
            preview: "",
            title: "",
            artist: "",
            duration: 0
        }));
    }

    const value: AudioContextType = {
        audio, currentTrack, isPlaying, handleToggleAudio, handleToggleNextAudio,
        handleTogglePreviousAudio, nextTrack, trackList, setTrackList, repeat, setRepeat,
        playbarToggleAudio, trackListId, setTrackListId, clearAudioContext, disable,
        currentTrackListMenu, setCurrentTrackListMenu
    }

    return <AudioContext.Provider value={value}>{children}</AudioContext.Provider>
}

export const useAudioContext = () => {
    const context = useContext(AudioContext);
    if (!context) {
        throw new Error('useAudioContext must be used within an AudioProvider');
    }
    return context;
};

export default AudioProvider;