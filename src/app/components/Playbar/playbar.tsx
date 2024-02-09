import { SyntheticEvent, useEffect, useState } from 'react';
import Image from 'next/image';
import { useAudioContext } from '@/app/context/AudioContext';
import styles from './playbar.module.css';
import { IconButton, Slider } from '@mui/material';
import {
    KeyboardArrowLeft, KeyboardArrowRight, MenuOpenRounded, Pause,
    PlayArrow, Repeat, RepeatOne, VolumeDown, VolumeMute, VolumeUp, Menu
} from '@mui/icons-material';
import secondsToMMSS from '@/app/utils/secondsToMMSS';


const TrackControlls = () => {
    const [currentVolume, setCurrentVolume] = useState(100);
    const [previousVolume, setPreviousVolume] = useState(0);
    const { audio, repeat, setRepeat, disable,
            currentTrackListMenu, setCurrentTrackListMenu } = useAudioContext();

    const handleChangeCurrentVolume = (event: Event, value: number | number[], activeThumb: number) => {
        setPreviousVolume(0);
        setCurrentVolume(value as number);
        audio.volume = value as number / 100;
    }

    const handleToggleVolumeOut = () => {
        if (previousVolume == 0) {
            setPreviousVolume(currentVolume);
            setCurrentVolume(0);
            audio.volume = 0;
        } else {
            audio.volume = previousVolume as number / 100;
            setCurrentVolume(previousVolume);
            setPreviousVolume(0);
        }
    }

    const setIsRepeat = () => {
        setRepeat(!repeat);
    }

    const setIsCurrentTrackListMenu = () => {
        setCurrentTrackListMenu(!currentTrackListMenu);
    }


    return (
        <div className={styles.trackControll}>
            <div className={styles.triggers}>
                <IconButton onClick={setIsRepeat} disabled={disable}>
                    {repeat ? <RepeatOne /> : <Repeat />}
                </IconButton>
                <IconButton onClick={setIsCurrentTrackListMenu} disabled={disable}>
                    {currentTrackListMenu ? <MenuOpenRounded/> : <Menu/>}
                </IconButton>
            </div>
            <div className={styles.volume}>
                <IconButton onClick={handleToggleVolumeOut} disabled={disable}>
                    {currentVolume == 0 ? <VolumeMute /> : (currentVolume == 100 ? <VolumeUp /> : <VolumeDown />)}
                </IconButton>
                <Slider
                    step={1}
                    min={0}
                    max={100}
                    size="small"
                    sx={{ color: 'gray' }}
                    value={currentVolume}
                    onChange={handleChangeCurrentVolume}
                    aria-labelledby="input-slider"
                    disabled={disable}
                />
                <p>{currentVolume}</p>
            </div>

        </div>
    )
}

const TimeControlls = () => {
    const { audio, currentTrack, handleToggleNextAudio, disable } = useAudioContext();
    const { duration } = currentTrack;
    const [currentTime, setCurrentTime] = useState(0);
    const [isDragging, setIsDragging] = useState(false);
    const formatedCurrentTime = secondsToMMSS(currentTime);
    const formatedDuration = secondsToMMSS(duration);

    useEffect(() => {
        const timeInterval = setInterval(() => {
            if (!isDragging) {
                setCurrentTime(audio.currentTime);
            }
            audio.addEventListener('ended', handleToggleNextAudio);
        }, 100);
        return () => {
            clearInterval(timeInterval);
            audio.removeEventListener('ended', handleToggleNextAudio);
        };
    }, [audio, handleToggleNextAudio, isDragging])

    const handleChangeCurrentTime = (event: Event, value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        setCurrentTime(newValue);
    }

    const handleSliderChange = (event: Event, value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        setCurrentTime(newValue);
    }

    const handleSliderChangeCommitted = (event: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
        const newValue = Array.isArray(value) ? value[0] : value;
        audio.currentTime = newValue;
        setIsDragging(false);
    }

    return (
        <div className={styles.slider}>
            <p>{formatedCurrentTime}</p>
            <Slider
                step={1}
                min={0}
                max={duration}
                size="small"
                sx={{ color: 'gray' }}
                value={currentTime}
                onChange={handleSliderChange}
                onChangeCommitted={handleSliderChangeCommitted}
                onMouseDown={() => setIsDragging(true)}
                onMouseUp={() => setIsDragging(false)} 
                onTouchStart={() => setIsDragging(true)}
                onTouchEnd={() => setIsDragging(false)} 
                disabled={disable}
            />
            <p>{formatedDuration}</p>
        </div>
    )
}


const Playbar = () => {
    const { currentTrack, playbarToggleAudio, isPlaying, handleToggleNextAudio, handleTogglePreviousAudio, disable } = useAudioContext();
    const { title, artist, preview } = currentTrack;

    return (
        <div className={styles.content}>
            <div className={styles.credits}>
                {preview !== '' ? <Image src={preview} alt='' width={60} height={60} /> : <></>}
                <div className={styles.info}>
                    <h4>{title}</h4>
                    <p>{artist}</p>
                    <div />
                </div>
            </div>
            <div className={styles.timeControll}>
                <div className={styles.controlls}>
                    <IconButton onClick={handleTogglePreviousAudio} disabled={disable}>
                        <KeyboardArrowLeft />
                    </IconButton>
                    <IconButton onClick={playbarToggleAudio} disabled={disable}>
                        {isPlaying ? <Pause /> : <PlayArrow />}
                    </IconButton>
                    <IconButton onClick={handleToggleNextAudio} disabled={disable}>
                        <KeyboardArrowRight />
                    </IconButton>
                </div>
                <TimeControlls />
            </div>
            <TrackControlls />
        </div>
    )
}

export default Playbar;