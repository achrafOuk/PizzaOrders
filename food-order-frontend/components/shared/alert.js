export default function Alert({ classElement, message }) {
  return (
    <div className={classElement} role="alert">
      <div>
        <span className="font-medium"> {message} </span>
      </div>
    </div>
  );
}
