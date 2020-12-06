const Conversions = {
  binToInt: (bin, reverse = true) => {
    const nospaces = bin.replaceAll(' ', '');
    const prepared = reverse ? nospaces.split('').reverse().join('') : nospaces;
    const parsed = parseInt(prepared, 2);
    return parsed.toString();
  },

  intToBin: (int, reverse = true) => {
    const parsed = parseInt(int, 10);
    const str = parsed.toString(2);
    if (!reverse) return str;
    const reversed = str.split('').reverse().join('');
    return reversed;
  },
};

export default Conversions;
