def str_to_bin(str, reversed=True):
  nospaces = str.replace(' ', '')
  directed = nospaces[::-1] if reversed else nospaces
  try:
    num = int(directed, 2)
  except ValueError as e:
    raise e
  size = len(nospaces)
  return num, size

def bin_to_str(num, size, reversed=True):
  formalized = bin(num)
  trimmed = formalized[2:]
  if reversed:
    directed = trimmed[::-1]
    padded = directed.ljust(size, '0')
  else:
    padded = trimmed.rjust(size, '0')
  return padded


def set_kth_bit(n, k): 
  return (1 << k) ^ n

def get_kth_bit(n, k):
  return ((1 << k) & n) >> k

def swap_bits(num, i, j):
  ith = (num >> i) & 1
  jth = (num >> j) & 1
  xor = ith ^ jth
  xor = (xor << i) | (xor << j)
  return num ^ xor

def nullify_child_bits(num, n):
  return (num >> n) << n


def outer_bits(num, size, i):
  rMask = (1 << i) - 1
  rVal = num & rMask
  result = ((num >> (size - i)) << i) | rVal
  return result
  
def inner_bits(num, size, i):
  length = size - i*2
  mask = ((1 << length) - 1) << i
  return (num & mask) >> i


def swap_bytes_32(num, i, j):
  byte = (1 << 8) - 1
  ith = (num >> i*8) & byte
  jth = (num >> j*8) & byte
  xor = ith ^ jth
  xor = (xor << i*8) | (xor << j*8)
  return num ^ xor


def highest_power_of_2(num):
  return (num & (~(num - 1)))
