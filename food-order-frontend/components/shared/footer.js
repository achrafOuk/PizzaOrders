import { useSelector } from "react-redux";

function Footer() {
  const username = useSelector(
    (state) => state?.reducers.order?.login.username
  );
  /*if (username !== "") {
    return <></>;
  }*/
  return (
    <footer className="mt-[5%] text-white bg-blue-600 py-4 flex justify-center font-primary items-center">
      Created by
      <a
        href="https://twitter.com/deepwhitman"
        target="_blank"
        rel="noreferrer"
        className="text-palette-primary font-bold px-1"
      >
        Achraf Oukouhou
      </a>
    </footer>
  );
}

export default Footer;
