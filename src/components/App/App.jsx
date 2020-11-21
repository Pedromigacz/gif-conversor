import React, { useState } from 'react'

import styles from './App.module.css'

function App() {
  const [dragOver, setDragOver ] = useState(false)
  const [file, setFile] = useState([])

  const handleDrop = e => {
    e.stopPropagation()
    e.preventDefault()
    setFile(e.dataTransfer.files[0])
  }

  return (
    <div className={styles.innerDiv}>
      <form>
        <div>
          <input
            onChange={e => setFile(e.target.files[0])}
            type="file"
            id="file"
            className={styles.fileInput}
          />
          <label
            onDrop={handleDrop}
            onDragOver={e => e.preventDefault()}
            onDragEnter={e => setDragOver(!dragOver)}
            onDragLeave={e => setDragOver(!dragOver)}
            className={styles.fileLabel + ' ' + (dragOver && styles.onDragOverClass)}
            htmlFor="file"
          ><strong>Chose a file</strong> or drop it here &#40;:</label>
          <button type="submit">Convert</button>
        </div>
        <div className={styles.uploadState}>Uploading...</div>
      </form>
    </div>
  );
}

export default App;
