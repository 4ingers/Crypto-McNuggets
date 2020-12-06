const Objects = {
  containsFalseValue: (obj) => !Object.values(obj).some(x => x)
}

export default Objects;
