export function set_authors(state, payload) {
  state.authors.push(...payload);
}

export function set_nextPage(state, payload) {
  state.page = payload;
}
