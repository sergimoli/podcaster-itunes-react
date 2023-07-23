import styles from "./childComponent.module.css";

function ChildComponent({ name, description, duration }) {
  return (
    <div className={styles.row}>
      <div className={styles.name}>{name}</div>
      <div className={styles.description}>{description}</div>
      <div className={styles.duration}>{duration}</div>
    </div>
  );
}

export default ChildComponent;
