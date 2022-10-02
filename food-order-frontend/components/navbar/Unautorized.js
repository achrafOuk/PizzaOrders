import Link from "next/link";
import Counter from "./Counter";
export default function Unautorized() {
  return (
    <>
      <Counter></Counter>
      <Link href="/login">
        <div className="text-white ml-[20%]">Login</div>
      </Link>
    </>
  );
}
