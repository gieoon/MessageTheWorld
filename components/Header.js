import styles from '../styles/Header.module.scss';
import Image from 'next/image';
import Link from 'next/link';
import { useContext, useState } from 'react';
import BasicModal from './Dialog';
import { GlobalContext } from '../context';
import { ANALYTICS_logEvent } from '../firebase/analytics';
import { APP_TITLE } from '../constants';
import { Speaker, SpeakerGroup } from '@mui/icons-material';

export default function Header() {

    const [isDialogOpen, setIsDialogOpen] = useState(false);

    const {websiteContent, isHamburgerActive, setIsHamburgerActive} = useContext(GlobalContext);

    return (
        <div className={styles.Header}>
            
            <Link href="/" className={styles.home_link}>
                <div className={styles.logo_container}>
                    {/* <img src="/logo_transparent.png" style={{
                        width: '135px',
                        marginLeft: '-10px'
                    }} /> */}
                    {/* <Speaker /> */}
                    
                    <div>
                        <p>🔥</p>
                    </div>
                </div>
            </Link>

            <div className={styles.links_container}>

            </div>

        </div>
    )
}
