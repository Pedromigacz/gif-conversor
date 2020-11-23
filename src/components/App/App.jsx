import React, { useState, useEffect } from 'react'
import styles from './App.module.css'
import { createFFmpeg, fetchFile } from '@ffmpeg/ffmpeg'
const ffmpeg = createFFmpeg({ log: true })

function App() {
  // load state
  const [ready, setReady] = useState(false)
  // files state
  const [video, setVideo] = useState('')
  const [gif, setGif]   = useState()
  // UI state
  const [dragOver, setDragOver ] = useState(false)
  const [nOfEnters, setNOfEnters] = useState(0)
  
  useEffect(() => {console.log('GIF:', gif)}, [gif])

  const load = async () => {
    try {
      await ffmpeg.load()
      setReady(true)
    } catch(error) {
      console.log(error)
    }
  }

  useEffect(() => {
    load()
  }, [])

  const handleSubmit = async e => {
    e.preventDefault()
    await convertToGif()
    console.log(gif)
  }

  const convertToGif = async () => {
    // Write the file to memory 
    ffmpeg.FS('writeFile', 'test.mp4', await fetchFile(video))

    await ffmpeg.run('-i', 'test.mp4', '-t', '2.5', '-ss', '2.0', '-f', 'gif', 'out.gif')

    // Read the result
    const data = ffmpeg.FS('readFile', 'out.gif')

    // Create a URL
    const url = URL.createObjectURL(new Blob([data.buffer], { type: 'image/gif' }))
    setGif(url)
  }

  const uiFriendlySizeConverter = bytes => {
    let num = parseInt(bytes)
    if(isNaN(num)) return '????'
    if(num < 0) num = -num
    
    const units = ['bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB']
    const exponent = Math.min(Math.floor(Math.log(num) / Math.log(1000)), units.length - 1);

    num = Number((num / Math.pow(1000, exponent)).toFixed(2));
    
    return `${num} ${units[exponent]}`
  }

  const handleDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    setVideo(e.dataTransfer.files[0])
    setDragOver(false)
  }

  const handleDragEvent = action => {
    switch(action) {
      case 'enter':
        setNOfEnters(nOfEnters + 1)
        break
      case 'leave':
        setNOfEnters(nOfEnters - 1)
        break
      default:
        setNOfEnters(nOfEnters)
    }
  }

  useEffect(() => {
    if(nOfEnters !== 0) setDragOver(true)
    else setDragOver(false)
  }, [nOfEnters])

  return (
    <div className={styles.innerDiv}>
      {ready ? (
        <>
          <form onSubmit={handleSubmit}>
            <div className={styles.inputContainer}>
              <input
                onChange={e => setVideo(e.target.files[0])}
                type="file"
                id="file"
                className={styles.fileInput}
              />
              <label
                onDrop={handleDrop}
                onDragOver={e => e.preventDefault()}
                onDragEnter={e => handleDragEvent('enter')}
                onDragLeave={e => handleDragEvent('leave')}
                className={styles.fileLabel + ' ' + (dragOver && styles.onDragOverClass)}
                htmlFor="file"
              >
                {video ? <>
                {video.name} ({uiFriendlySizeConverter(video.size)})
                </> : <><strong>Chose a file</strong> or drop it here &#40;:</>}
              </label>
              { video && <button type="submit">Convert</button>}
            </div>
            <div className={styles.uploadState}>Uploading...</div>
          </form>
          {gif && <span className={styles.downloadContainer}>
            <img src={gif} className={styles.convertedGif}/>
            <a href={gif} download><button>Download</button></a>
          </span>}
        </>
      ) : 'Loading...'}
    </div>
  );
}

export default App;
