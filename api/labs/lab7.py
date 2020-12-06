from .tools import binaries, conversions

def Task7(data):
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

  shift_right = binaries.rotate_right(binary, i, size)
  shift_left = binaries.rotate_left(binary, i, size)

  result_right = conversions.bin_to_str(shift_right, size)
  result_left = conversions.bin_to_str(shift_left, size)

  return { 
    'result': {
      'right': result_right,
      'left': result_left
    }
  }
