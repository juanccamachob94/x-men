# Based on https://gist.github.com/rednafi/3334a9cce2d7f24226f6fe1231b5ac5f
import time
import json
import requests
import random

MAX_WORKERS = 2
NITROGEN_BASES = ['A', 'C', 'G', 'T']
NUM_ATTACKS = 10
URL = 'http://localhost:3000/mutant'
DNA_MAX_SIZE = 24;

from concurrent.futures import ThreadPoolExecutor
from functools import wraps
from tqdm import tqdm

def timeit(method):
    @wraps(method)
    def wrapper(*args, **kwargs):
        start_time = time.time()
        result = method(*args, **kwargs)
        end_time = time.time()
        print(f"{method.__name__} => {(end_time-start_time)*1000} ms")

        return result

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
        results = list(
            tqdm(executor.map(attack_one, urls, timeout=60), total=len(urls))
        )
        return results

results = attack_all([URL] * NUM_ATTACKS)
for result in results:
     print(result)
