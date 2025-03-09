export function Spinner() {
  return (
    <div className="loading__spinner hidden">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="spinner"
        viewBox="0 0 66 66"
      >
        <circle
          stroke-width="6"
          cx="33"
          cy="33"
          r="30"
          fill="none"
          className="path"
        ></circle>
      </svg>
    </div>
  );
}
