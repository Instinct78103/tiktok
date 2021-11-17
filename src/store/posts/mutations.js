export function set_posts(state, payload) {
  state.posts.push(...payload);
}

export function set_nextPage(state, payload) {
  state.page = payload;
}

export function set_postDetails(state, payload) {
  state.details = payload;
}
