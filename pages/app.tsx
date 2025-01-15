
import type { AppProps } from 'next/app'
import '@/styles/globals.css'
import styles from '../styles/Home.module.css';


export default function App({ Component, pageProps }: AppProps) {
  return <Component {...pageProps} />
}
