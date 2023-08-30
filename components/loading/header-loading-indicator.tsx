import styles from "./header-loading-indicator.module.css";
import LoadingDots, { LoadingDotsOptions } from "./loading-dots";

const HeaderLoadingIndicator = ({
  color = "#808080",
  size = "big",
}: LoadingDotsOptions) => {
  return (
    <div className={styles.wrapper}>
      <LoadingDots color={color} size={size} />
    </div>
  );
};

export default HeaderLoadingIndicator;
