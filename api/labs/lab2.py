from .tools import binaries, conversions

def Task2(data):
  try:
    i = int(data['i'])
  except KeyError:
    return { 'Error': "No 'i' property"}
  except ValueError:
    return { 'Error': "'i' is not a number"}

  try:
    binary, size = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if i < 1 or i >= size:
    return { 'Error': "'i' is out of range"}

  inner = binaries.inner_bits(binary, size, i)

  if inner is None:
    return { 'Error': 'No inner bits'}
    
  outer = binaries.outer_bits(binary, size, i)

  outerString = conversions.bin_to_str(outer, i*2)
  innerString = conversions.bin_to_str(inner, size - (i * 2))

  return { 
    'result': {
      'inner': innerString,
      'outer': outerString,
    } 
  }
