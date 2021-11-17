export async function fetchPosts({commit}) {
  try {
    const currentPage = this.getters['posts/get_currentPage'];
    const p = await fetch(`https://6172d1dd110a740017222e38.mockapi.io/api/v1/users?page=${currentPage}&limit=10`);
    const postsData = await p.json();

    console.log(postsData.map(post => post.id));

    if (postsData && postsData.length) {
      commit('set_posts', postsData);
    }

    commit('set_nextPage', this.getters['posts/get_currentPage'] + 1);

  } catch (e) {
    console.warn(e);
  }
}

export async function nextPage({commit}) {
  commit('set_nextPage', this.state.page + 1);
}

export async function fetchDetails({commit}) {
  try {
    const postID = this.$router.currentRoute._value.params.id
    if (postID) {
      const index = this.getters['posts/get_posts'].findIndex(post => post.id === postID);
      const isPostInTheStore = index > -1;

      if (!isPostInTheStore) {
        const p = await fetch(
          `https://6172d1dd110a740017222e38.mockapi.io/api/v1/users/${postID}`,
        );
        const postDetails = await p.json();
        commit('set_postDetails', postDetails);
      }
    }
  } catch (e) {
    console.warn(e);
  }
}
