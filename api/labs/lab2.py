from .tools import *

def Task2(data):
  try:
    i = int(data['i'])
  except KeyError:
    return { 'Error': "No 'i' property"}
  except ValueError:
    return { 'Error': "'i' is not a number"}

  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if i < 1 or i >= size:
    return { 'Error': "'k' is out of range"}

  outer = outer_bits(binary, size, i)
  inner = inner_bits(binary, size, i)
  outerString = bin_to_str(outer, i*2)
  innerString = bin_to_str(inner, size - (i * 2))

  return { 
    'result': {
      'inner': innerString,
      'outer': outerString,
    } 
  }
