# 1
def get_kth_bit(num, k):
  return (num >> k) & 1

def set_kth_bit(num, k, bit):
  return (num & ~(1 << k)) | (bit << k)

def change_kth_bit(num, k): 
  return (1 << k) ^ num

def swap_bits(num, i, j):
  ith = (num >> i) & 1
  jth = (num >> j) & 1
  xor = ith ^ jth
  return num ^ ((xor << i) | (xor << j))

def nullify_child_bits(num, n):
  return (num >> n) << n


# 2
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


# 3
def swap_bytes(num, i, j):
  byte = (1 << 8) - 1
  ith = (num >> i*8) & byte
  jth = (num >> j*8) & byte
  xor = ith ^ jth
  xor = (xor << i*8) | (xor << j*8)
  return num ^ xor


# 4
def highest_power_of_2(num):
  if num < 1:
    return None

  powered = (num & (~(num - 1)))
  count = 0
  while powered != 0:
    powered >>= 1
    count += 1

  return count - 1


# 5
def next_power_of_2(num): 
  if num < 1:
    return None
  
  count = 0
    
  while num != 0: 
    num >>= 1
    count += 1

  return count - 1


# 6
def xor_compression(num, size):
  xor = num & 1
  print('before', bin(num))
  
  for _ in range(1, size):
    num >>= 1
    xor ^= num & 1
    print(_, 'loop', xor, bin(num))

  return xor


# 7
def rotate_right(num, count, size):
  rmask = (1 << count) - 1
  rhalf = num & rmask
  return (rhalf << (size - count)) | (num >> count)

def rotate_left(num, count, size):
  return rotate_right(num, size - count, size)


# 8
def permute(num, seq):
  permutation = 0

  for i in seq:
    permutation <<= 1
    permutation |= (num >> i) & 1

  return permutation
