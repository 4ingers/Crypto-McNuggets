def str_to_bin(str, reverse=True):
  nospaces = str.replace(' ', '')
  size = len(nospaces)
  directed = nospaces[::-1] if reverse else nospaces
  try:
    num = int(directed, 2)
  except ValueError as e:
    raise e
  return num, size

def bin_to_str(num, size, reverse=True):
  formalized = bin(num)
  trimmed = formalized[2:]
  if reverse:
    directed = trimmed[::-1]
    padded = directed#.ljust(size, '0')
  else:
    padded = trimmed#.rjust(size, '0')
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

  if length < 0:
    return None
    
  mask = ((1 << length) - 1) << i
  return (num & mask) >> i


def swap_bytes(num, i, j):
  byte = (1 << 8) - 1
  ith = (num >> i*8) & byte
  jth = (num >> j*8) & byte
  xor = ith ^ jth
  xor = (xor << i*8) | (xor << j*8)
  return num ^ xor


def highest_power_of_2(num):
  return (num & (~(num - 1)))


def next_power_of_2(num): 
  if num == 0:
    return None
  
  count = 0
    
  while num != 0: 
    num >>= 1
    count += 1

  return count - 1


def xor_compression(num, size):
  xor = num & 1
  print('before', bin(num))
  
  for _ in range(1, size):
    num >>= 1
    xor ^= num & 1
    print(_, 'loop', xor, bin(num))
    
  return xor
