import styles from './auth.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface LogInInterface {
    closeLoginPage: () => void;
    setLoading: (bool: boolean) => void;
}

const LogIn: React.FC<LogInInterface> = ({ closeLoginPage, setLoading }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attention, setAttantion] = useState('');

    const handleLogin = async () => {
        setLoading(true);
        const response = await axios.post('http://localhost:3001/api/login', {
            username,
            password,
        },{withCredentials: true});
        if(response.data.successfully){
            router.push('/eternalsound');
        }else{
            setAttantion('Incorrect login or password');
        }
        setLoading(false);
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.text}>Log in to<br />EternalSound</h1>
                <div>
                    <p className={styles.label}>Login</p>
                    <input
                        className={styles.input}
                        placeholder='Login'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className={styles.label}>Password</p>
                    <input
                        className={styles.input}
                        type='password'
                        placeholder='Password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <p className={styles.attantion}>{attention}</p>
                <button className={styles.button} onClick={handleLogin}>Log In</button>
                <p className={styles.changer} onClick={closeLoginPage}>Sign up for<br />EternalSound</p>
            </div>
        </div>
    );
};

export default LogIn;
