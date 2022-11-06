# Based on https://gist.github.com/rednafi/3334a9cce2d7f24226f6fe1231b5ac5f
import time
import json
import requests
import random

MAX_WORKERS = 1000
NITROGEN_BASES = ['A', 'C', 'G', 'T']
NUM_ATTACKS = 100000
URL = 'http://192.168.0.32:3000/mutant'
DNA_MAX_SIZE = 8;
TIMEOUT = 120

from concurrent.futures import ThreadPoolExecutor
from functools import wraps
from tqdm import tqdm

def timeit(method):
    @wraps(method)
    def wrapper(*args, **kwargs):
        return method(*args, **kwargs)
    return wrapper


def attack_one(url):
    n = random.randint(1, DNA_MAX_SIZE);
    dna = []
    for i in range(n):
        row = ''
        for j in range(n):
            row += random.choice(NITROGEN_BASES)
        dna.append(row)

    payload = json.dumps({ 'dna': dna })
    headers = { 'Content-Type': 'application/json' }
    response = requests.request('POST', url, headers=headers, data=payload)
    return response.text.encode('utf8')


@timeit
def attack_all(urls):
    with ThreadPoolExecutor(max_workers=MAX_WORKERS) as executor:
        return list(
            tqdm(executor.map(attack_one, urls, timeout=TIMEOUT), total=len(urls))
        )

results = attack_all([URL] * NUM_ATTACKS)
