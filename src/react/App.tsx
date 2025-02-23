import { createRoot } from "react-dom/client";
import { Button } from "./Button";

const domAll = document.querySelectorAll(".custom-button");

[...domAll].forEach((node) => {
  const root = createRoot(node);
  root.render(<Button />);
});
