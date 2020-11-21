import React, { useState, useEffect } from 'react'

import styles from './App.module.css'

function App() {
  const [dragOver, setDragOver ] = useState(false)
  const [file, setFile] = useState('')
  const [nOfEnters, setNOfEnters] = useState(0)
  
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
    setFile(e.dataTransfer.files[0])
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
      <form>
        <div className={styles.inputContainer}>
          <input
            onChange={e => setFile(e.target.files[0])}
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
            {file ? <>
            {file.name} ({uiFriendlySizeConverter(file.size)})
            </> : <><strong>Chose a file</strong> or drop it here &#40;:</>}
          </label>
          { file && <button type="submit">Convert</button>}
        </div>
        <div className={styles.uploadState}>Uploading...</div>
      </form>
    </div>
  );
}

export default App;
