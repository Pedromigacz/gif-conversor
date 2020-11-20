import React, { useState } from 'react'

import styles from './App.module.css'

function App() {
  const [dragOver, setDragOver ] = useState(false)

  const handleDragOver = e => {
    e.preventDefault()
    e.stopPropagation()
  }

  return (
    <div className={styles.innerDiv}>
      <form>
        <div>
          <input type="file" id="file" className={styles.fileInput}/>
          <label
            onDragOver={handleDragOver}
            onDragEnter={e => setDragOver(!dragOver)}
            onDragLeave={e => setDragOver(!dragOver)}
            className={styles.fileLabel + ' ' + (dragOver && styles.onDragOverClass)}
            htmlFor="file"
          ><strong>Choose a file</strong> or drop it here &#40;:</label>
          <button type="submit">Convert</button>
        </div>
        <div className={styles.uploadState}>Uploading...</div>
      </form>
    </div>
  );
}

export default App;
