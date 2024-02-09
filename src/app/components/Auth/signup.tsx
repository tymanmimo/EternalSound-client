import styles from './auth.module.css'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

interface SignUpInterface {
    setLoginPage: () => void;
    setLoading: (bool: boolean) => void;
}

const SignUp: React.FC<SignUpInterface> = ({ setLoginPage, setLoading }) => {
    const router = useRouter();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [attention, setAttantion] = useState('');

    const handleSignUp = async () => {
        if (username.length > 12 || username.length < 5) {
            setAttantion('The login length must be greater than 5 and less than 12.');
        } else {
            if (password.length < 8 || password.length > 18) {
                setAttantion('The password length must be greater than 8 and less than 18.');
            } else {
                setLoading(true);
                try {
                    const response = await axios.post('http://localhost:3001/api/register', {
                        username,
                        password
                    }, { withCredentials: true });
                    if (response.data.successfully) {
                        const response = await axios.post('http://localhost:3001/api/login', {
                            username,
                            password,
                        }, { withCredentials: true });
                        if (response.data.successfully) {
                            router.push('/eternalsound');
                        }
                    } else {
                        setAttantion('A user with this login already exists');
                    }
                } catch (error) {
                    console.log(error);
                }
                setLoading(false);
            }
        }
    }

    const handleKeyPress = (e: { key: string; }) => {
        if (e.key === 'Enter') {
            handleSignUp();
        }
    };

    return (
        <div className={styles.container}>
            <div className={styles.content}>
                <h1 className={styles.text}>Sign up to<br />EternalSound</h1>
                <div>
                    <p className={styles.label}>Create login</p>
                    <input
                        className={styles.input}
                        placeholder='Create login'
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <p className={styles.label}>Create password</p>
                    <input
                        className={styles.input}
                        type='password'
                        placeholder='Create password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onKeyPress={handleKeyPress}
                    />
                </div>
                <p className={styles.attantion}>{attention}</p>
                <button className={styles.button} onClick={handleSignUp}>Sign Up</button>
                <p className={styles.changer} onClick={setLoginPage}>Log in here</p>
            </div>
        </div>
    );
};

export default SignUp;
