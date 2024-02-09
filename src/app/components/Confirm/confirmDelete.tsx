import styles from './confirm.module.css'
import axios from 'axios';
import { useAudioContext } from '@/app/context/AudioContext';
import { useRouter } from 'next/navigation';

interface ConfirmInterface{
    closeConfirm: () => void;
}

const ConfirmDelete:React.FC<ConfirmInterface> = ({closeConfirm}) => {
    const router = useRouter();
    const { clearAudioContext } = useAudioContext();
    const deleteFunc = async () => {
        await axios.delete('http://localhost:3001/api/delete', { withCredentials: true });
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
                <h1>{'Are you sure you want to delete your account?'}</h1>
                <div>
                    <button onClick={deleteFunc}>Yes</button>
                    <button onClick={closeConfirm}>No</button>
                </div>
            </div>
        </div>
    )
};

export default ConfirmDelete;