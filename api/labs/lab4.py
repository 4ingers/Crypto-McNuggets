from .tools import *

def Task4(data):
  try:
    binary, size = str_to_bin(data['binary'])
  except ValueError:
    return { 'Error': "'binary' is not a number"}

  power = highest_power_of_2(binary)
  result = bin_to_str(power, size)

  return { 'result': result }
