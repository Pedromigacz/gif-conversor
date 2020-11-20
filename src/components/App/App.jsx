import styles from './App.module.css'

function App() {
  return (
    <div className={styles.innerDiv}>
      <form>
        <div>
          <input type="file" id="file" className={styles.fileInput}/>
          <label className={styles.fileLabel} htmlFor="file"><strong>Choose a file</strong> or drag it here &#40;:</label>
          <button type="submit">Convert</button>
        </div>
        <div className={styles.uploadState}>Uploading...</div>
      </form>
    </div>
  );
}

export default App;
