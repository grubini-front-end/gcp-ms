export const returnObject = (previousState, changedProperty) => {
  return {
    ...previousState,
    ...changedProperty,
  };
};
export const addToArray = (previousState, object, name) => {
  return {
    ...previousState,
    name: previousState[name].concat(object),
  };
};
export const remmoveFromArray = (previousState, criteria, value, name) => {
  return {
    ...previousState,
    name: previousState[name].filter(item => item[criteria] !== value),
  };
};
