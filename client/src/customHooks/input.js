import { useState } from "react";

export const useField = (type, data = "") => {
  const [value, setValue] = useState(data);

  const onChange = ({ target }) => {
    // setValue(event.target.value);
    setValue(target.value);
  };

  const reset = () => {
    setValue("");
  };

  return {
    reset,
    fields: {
      type,
      value,
      onChange,
    },
  };
};
