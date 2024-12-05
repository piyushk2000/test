import { getColorMapCalendar } from "../../organisms/project-calendar/helper";
import styles from "./style.module.scss";

export default function ColorInfo() {
  return (
    <div className={styles.infoContainer} style={{marginTop:'1.1em'}}>
      {Object.entries(getColorMapCalendar()).map((item) => {
        return (
          <div key={item[0]} className={styles.singleInfo}>
            <div
              className={styles.circle}
              style={{ background: item[1] }}
            ></div>

            <p>{item[0]}</p>
          </div>
        );
      })}
    </div>
  );
}
