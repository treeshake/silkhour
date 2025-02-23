import React from "react";

export function Button() {
  const [toggle, setToggle] = React.useState(false);

  console.log("Button toggle:", toggle);
  return (
    <button type="button" onClick={() => setToggle(!toggle)}>
      Button works! Hooray!
    </button>
  );
}
