import Link from "next/link";

export default function AdminLink({ text, link }) {
  return (
    <li className="relative px-6 py-3">
      <Link href={link}>
        <div
          className="inline-flex items-center w-full text-sm font-semibold text-gray-800 transition-colors duration-150 hover:text-gray-800 "
          href="index.html"
        >
          <a href="">
            <span className="ml-4">{text}</span>
          </a>
        </div>
      </Link>
    </li>
  );
}
