import { useEffect, useState } from 'react'
import { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';

import Main from './layout/Main'
import TitleBar from './layout/TitleBar'
import Navbar from './layout/Navbar'
import './styles/globals.css'
import type { Pages } from './types/pages';
import { PlayerProvider } from './context/PlayerContext';

gsap.registerPlugin(useGSAP);

function App() {
  const [isHidden, setIsHidden] = useState(false)

  const toggleHidden = () => {
    setIsHidden(!isHidden)
  } 

  // Animation
  const contentContainer = useRef<HTMLDivElement>(null)

  useEffect(() => {
    gsap.to(contentContainer.current, { 
      x: isHidden ? '-100%': 0, 
      duration: 0.3
    })
  }, [isHidden])

  const [currentPage, setCurrentPage] = useState<Pages>()

  return (
    <div 
      className='h-screen flex flex-col gap-2'
    >
      <div
        className='h-fit'  
        onMouseMove={() => {window.electronAPI.setIgnoreMouseEvents(false)}}
        onMouseLeave={() => {window.electronAPI.setIgnoreMouseEvents(true)}}
      >
        <TitleBar 
          minimize={toggleHidden} 
          close={() => window.electronAPI.close()}
        /> 
      </div>  

      <div 
        className='flex-1 flex flex-col min-h-0 gap-2'
        ref={contentContainer}
        onMouseLeave={() => {
          window.electronAPI.setIgnoreMouseEvents(true)
        }}
        onMouseEnter={() => {
          window.electronAPI.setIgnoreMouseEvents(false)
        }}
      >
        <Navbar 
        onClick={setCurrentPage}
        />
        <PlayerProvider>
          <Main 
          page={currentPage || "home"} 
          />
        </PlayerProvider>
      </div>
    </div>
  )
}

export default App
