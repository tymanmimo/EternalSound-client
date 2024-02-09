import styles from './confirm.module.css'
import axios from 'axios';
import { useAudioContext } from '@/app/context/AudioContext';
import { useRouter } from 'next/navigation';

interface ConfirmInterface{
    closeConfirm: () => void;
}

const ConfirmLogOut:React.FC<ConfirmInterface> = ({closeConfirm}) => {
    const router = useRouter();
    const { clearAudioContext } = useAudioContext();
    const logOutFunc = async () => {
        if ((await axios.get('http://localhost:3001/api/logout', { withCredentials: true })).data.successfully) {
            clearAudioContext();
            router.push('/');
        } else {
            console.log('Logout error!');
        }
    }
    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1>{'Do you really want to log out?'}</h1>
                <div>
                    <button onClick={logOutFunc}>Yes</button>
                    <button onClick={closeConfirm}>No</button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmLogOut;