import { useEffect, useState } from 'react'
import { useRef } from 'react';
import gsap from 'gsap';

import Main from './layout/Main'
import TitleBar from './layout/TitleBar'
import Navbar from './layout/Navbar'
import './styles/globals.css'
import type { Pages } from './types/pages';
import { PlayerProvider } from './context/PlayerContext';
import { LoadingProvider } from './context/LoadingContext';
import HiddenButton from './components/HiddenButton';

function App() {
  const [isHidden, setIsHidden] = useState(false)

  const toggleHidden = () => {
    console.log("hey")
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

  const [currentPage, setCurrentPage] = useState<Pages>("home")

  return (
      <LoadingProvider
      onMouseEnter={() => {window.electronAPI.setIgnoreMouseEvents(false)}}
      onMouseLeave={() => {window.electronAPI.setIgnoreMouseEvents(false)}}
      isHidden={isHidden}
      > 
        <div
        className='h-screen flex flex-col'
        >
          <div
            className='h-fit'  
            onMouseMove={() => {window.electronAPI.setIgnoreMouseEvents(false)}}
            onMouseLeave={() => {window.electronAPI.setIgnoreMouseEvents(true)}}
          >
            <HiddenButton 
            setIsHidden={toggleHidden}
            isHidden={isHidden}
            />
          </div>  

          <div 
            className='flex-1 flex flex-col min-h-0 gap-1'
            ref={contentContainer}
            onMouseLeave={() => {
              window.electronAPI.setIgnoreMouseEvents(true)
            }}
            onMouseEnter={() => {
              window.electronAPI.setIgnoreMouseEvents(false)
            }}
          >
            <TitleBar 
              minimize={toggleHidden} 
              close={() => window.electronAPI.close()}
            /> 
            <Navbar 
            onClick={setCurrentPage}
            />
            <PlayerProvider>
              <Main 
              page={currentPage} 
              />
            </PlayerProvider>
          </div>
        </div>
      </LoadingProvider>
  )
}

export default App