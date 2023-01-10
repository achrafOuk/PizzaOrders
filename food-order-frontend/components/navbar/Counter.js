import Link from "next/link";
import styles from "../../styles/Navbar.module.css";
import { useSelector } from "react-redux";
import Image from "next/image";
export default function Counter() {
  const items_counter = useSelector(
    (state) => state?.reducers.order?.order.items_counter
  );

  return (
    <Link href="/cart" passHref>
      <div className={styles.item}>
        <div className={styles.cart}>
          <img src="/img/cart.png" alt="" width="30px" height="30px" />
          <div className={`text-blue-700 ${styles.counter}`}>
            <a href="">{items_counter}</a>
          </div>
        </div>
      </div>
    </Link>
  );
}
