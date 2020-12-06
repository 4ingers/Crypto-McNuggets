from .tools import binaries, conversions

def Task4(data):
  try:
    binary, _ = conversions.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  result = binaries.highest_power_of_2(binary)

  # result = conversions.bin_to_str(power, size)

  return { 'result': result }
