export async function fetchAuthors({commit}) {
  try {
    const currentPage = this.getters['authors/get_currentPage'];
    const p = await fetch(`https://6172d1dd110a740017222e38.mockapi.io/api/v1/users?page=${currentPage}&limit=10`);
    const authorsData = await p.json();

    console.log(authorsData.map(author => author.id));

    if (authorsData && authorsData.length) {
      commit('set_authors', authorsData);
    }

    // await this.dispatch('authors/nextPage');

    commit('set_nextPage', this.getters['authors/get_currentPage'] + 1)

  } catch (e) {
    console.warn(e);
  }
}

export async function nextPage({commit}) {
  commit('set_nextPage', this.state.page + 1);
}
