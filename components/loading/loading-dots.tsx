import styles from "./loading-dots.module.css";

export type LoadingDotsOptions = {
  color?: string,
  size?: "small" | "big",
};

const LoadingDots = ({ color = "#000", size = "small" }: LoadingDotsOptions) => {
  return (
    <span className={styles.loading}>
      <span className={styles[size]} style={{ backgroundColor: color }} />
      <span className={styles[size]} style={{ backgroundColor: color }} />
      <span className={styles[size]} style={{ backgroundColor: color }} />
    </span>
  );
};

export default LoadingDots;
