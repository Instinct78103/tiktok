export async function fetchAuthors({commit}) {
  try {
    const currentPage = this.getters['authors/get_currentPage'];
    const p = await fetch(`https://6172d1dd110a740017222e38.mockapi.io/api/v1/users?page=${currentPage}&limit=10`);
    const authorsData = await p.json();

    console.log(authorsData.map(author => author.id));

    if (authorsData && authorsData.length) {
      commit('set_authors', authorsData);
    }

    commit('set_nextPage', this.getters['authors/get_currentPage'] + 1);

  } catch (e) {
    console.warn(e);
  }
}

export async function nextPage({commit}) {
  commit('set_nextPage', this.state.page + 1);
}

export async function fetchDetails({commit}) {
  try {
    const authorID = this.$router.currentRoute._value.params.id
    if (authorID) {
      const index = this.getters['authors/get_authors'].findIndex(author => author.id === authorID);
      const isAuthorInTheStore = index > -1;

      if (!isAuthorInTheStore) {
        const p = await fetch(
          `https://6172d1dd110a740017222e38.mockapi.io/api/v1/users/${authorID}`,
        );
        const authorDetails = await p.json();
        commit('set_authorDetails', authorDetails);
      }
    }
  } catch (e) {
    console.warn(e);
  }
}
