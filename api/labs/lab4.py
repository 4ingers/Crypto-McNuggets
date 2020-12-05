from . import tools

def Task4(data):
  try:
    binary, size = tools.str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  power = tools.highest_power_of_2(binary)
  result = tools.bin_to_str(power, size)

  return { 'result': result }
