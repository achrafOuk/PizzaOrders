export default function Button({ buttonText, buttonClass, buttonType, onClick, disabled, }) {
  if (disabled) {
    return (
      <>
        <button
          type={buttonType}
          className={buttonClass}
          onClick={onClick}
          disabled
        >
          {buttonText}
        </button>
      </>
    );
  }
  return (
    <>
      <button type={buttonType} className={buttonClass} onClick={onClick}>
        {buttonText}
      </button>
    </>
  );
}
