const ChangeBodyAttribute = (attribute, value) => {
  if (document.body) document.body.setAttribute(attribute, value);
};

export { ChangeBodyAttribute };
