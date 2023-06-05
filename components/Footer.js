import Link from 'next/link';
import styles from '../styles/Footer.module.scss';
import Image from 'next/image';
import { APP_TITLE, imgLoader } from '../constants';
import { useContext } from 'react';
import { GlobalContext } from '../context';
import PhoneIcon from '@mui/icons-material/Phone';
import EmailIcon from '@mui/icons-material/Email';
import { Help } from '@mui/icons-material';
import ContactForm from './ContactForm';

export default function Footer () {

    const {websiteContent} = useContext(GlobalContext);

    return (
        <div className={styles.Footer}>

            <div className={styles.background} />

            <div className={styles.inner}>

                <Link href="/new">
                    <a><span className="">New</span></a>
                </Link>

                <Link href="/">
                    <a><span className="">Now</span></a>
                </Link>
                <Link href="/history">
                    <a><span className="">History</span></a>
                </Link>
                
                <p><a href="https://www.webbi.co.nz" target="_blank" rel="noreferer noopener" className={styles.login_a}>Webbi</a></p>
                <p><a href="https://github.com/gieoon/MessageTheWorld" target="_blank" rel="noreferer noopener">Code</a></p>

            </div>
        </div>
    )
}
