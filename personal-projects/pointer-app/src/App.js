import styles from './App.module.css'
import { useState } from 'react'

function App() {

  const [pointsArr, setPointsArr] = useState([])

  return (
    <div className={styles.container} onClick={(e) => setPointsArr([...pointsArr, {axisX: e.clientX, axisY: e.clientY}])}>
      {
        pointsArr.length > 0 ?


        pointsArr.map((elem, i) => (
          <div key={"point" + i} className={styles.point} style={{top: `${elem.axisY}px`, left: `${elem.axisX}px`}}>

          </div>
        ))

        : 

        <h1 className={styles.clickText}>
          Click for point...
        </h1>
      }
    </div>
  );
}

export default App;
