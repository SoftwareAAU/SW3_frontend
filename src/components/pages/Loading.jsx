import phub from '../../assets/phub.png';
import AnimatedPage from '../AnimatedPage';
import sound from '../../assets/intro.mp3';

//import framer motion
import { motion } from "framer-motion";

//import {ReactComponent as AnimatedLogo} from '../../assets/logo_animated.svg';

import "./loading.css";


import useSound from 'use-sound'
import { useEffect } from 'react';

const Loading = () => {

    

    const playIntro = () => {
        const audio = new Audio(sound);
        audio.play();
    }

    useEffect(() => {
        playIntro();
    },[])


    return ( 
    <AnimatedPage>
    <div className='loading-page-container d-flex flex-column justify-content-center align-items-center'>

        <motion.div
                    initial={{ opacity: .5, scale: 1 }}
                    animate={{ opacity: 1, scale: 3 }}
                    transition={{
                        duration: 2,
                    }}
                    ease="easeOut"
                >
                    <div className=' d-flex loading-page-image-container'>
                        <img src={phub} width={400} alt="loading" className="loading-image" />
                    </div>
        </motion.div>
                
       

    </div> 
    </AnimatedPage>
    );
}
 
export default Loading;