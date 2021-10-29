export async function fetchAuthors ({commit}) {
  try {
    const p = await fetch('https://6172d1dd110a740017222e38.mockapi.io/api/v1/users')
    const authorsData = await p.json();

    console.log(authorsData)

    commit('set_authors', authorsData);

  }
  catch (e) {
    console.warn(e)
  }
}
