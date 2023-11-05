export async function getBlock(block) {
  const response = await fetch(
    `http://localhost:2525/block/${block.queryKey[1]}`
  );
  const data = await response.json();
  return data;
}

export async function getTransaction(tx) {
  const response = await fetch(`http://localhost:2525/tx/${tx.queryKey[1]}`);
  const data = await response.json();
  return data;
}

export async function getBalance(address) {
  const response = await fetch(
    `http://localhost:2525/balance/${address.queryKey[1]}`
  );
  const data = await response.json();
  return data;
}

export async function getLastBlockNumber() {
  const response = await fetch(`http://localhost:2525/`);
  const data = await response.json();
  return data;
}
