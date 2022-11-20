export const getLatest = async () => {
  const resp = await fetch("http://localhost:8080/latest");

  const data = await resp.json();

  return data.latest;
};
