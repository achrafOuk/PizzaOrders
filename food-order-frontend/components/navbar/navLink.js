import Link from "next/link";
export default function NavLink({ text, url, className }) {
  return (
    <>
      <li>
        <Link href={url} className={className}>
          {text}
        </Link>
      </li>
    </>
  );
}
