export const delayForDemo = (promise, timeout) => {
  return new Promise((resolve) => {
    setTimeout(resolve, timeout);
  }).then(() => promise);
};

export const getLocalStoragePromise = (key) => {
  return new Promise((resolve) => {
    const value = JSON.parse(localStorage.getItem(key));
    resolve(value);
  });
};

export const initializeLocalStorageItem = (key, value) => {
  if (!localStorage.getItem(`${key}`)) {
    localStorage.setItem(`${key}`, JSON.stringify(value));
  }
};
