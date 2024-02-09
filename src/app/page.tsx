'use client'
import styles from '@/app/page.module.css'
import LogIn from './components/Auth/login'
import SignUp from './components/Auth/signup'
import { useEffect, useState } from 'react'
import axios from 'axios'
import { useRouter } from 'next/navigation'
import Loading from './components/Loading/Loading'


export default function Home() {
  const [loading, setLoading] = useState(true);

  const router = useRouter();

  useEffect(() => {
    (
      async () => {
        const response = await axios.get('http://localhost:3001/api/user', { withCredentials: true })
        if (response.data.authentification) {
          router.push('/eternalsound');
        }
      }
    )();
    setLoading(false);
  }, [])

  const [loginPage, setLoginPage] = useState(true);

  const changer = () => {
    setLoginPage(!loginPage);
  }

  return (
      <main className={styles.container}>
        <div className={styles.content}>
          {loginPage ? (
            <LogIn
              closeLoginPage={changer}
              setLoading={setLoading}
            />
          ) : (
            <SignUp
              setLoginPage={changer}
              setLoading={setLoading}
            />
          )
          }
        </div>
        {loading ? <Loading/> : ''}
      </main>
  )
}
