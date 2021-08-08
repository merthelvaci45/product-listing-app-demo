import { useState } from "react";

const useRadioButton = (initialState = {}) => {
  const [radioButtonStates, setRadioButtonStates] = useState(initialState);

  const selectRadioButtonHandler = (radioButtonId) => {
    setRadioButtonStates(() => ({
      ...initialState, // reset all radio button states to false
      [radioButtonId]: true, // set only currently selected radio button state to true
    }));
  };

  return [radioButtonStates, selectRadioButtonHandler];
};

export default useRadioButton;
