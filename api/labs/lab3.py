from .tools import binaries, conversions

def Task3(data):
  try:
    i = int(data['i'])
    j = int(data['j'])
  except KeyError:
    return { 'Error': "No 'i' or 'j' property"}
  except ValueError:
    return { 'Error': "'i' or 'j' is not a number"}
  
  try:
    binary, size = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  if i < 1 or i > 4 or j < 1 or j > 4:
    return { 'Error': "'i' or 'j' is out of range"}

  swapped = binaries.swap_bytes(binary, i - 1, j - 1)

  result = conversions.bin_to_str(swapped, size)

  return { 'result': result }
