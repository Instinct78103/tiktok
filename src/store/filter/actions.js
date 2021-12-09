export async function range({commit}, val) {
  commit('set_range', val);
}

export async function search({commit}, val) {
  commit('set_search', val);
}

export async function sortBy({commit}, val) {
  commit('set_sortBy', val);
}

export async function showPrivate({commit}, val) {
  commit('set_showPrivate', val);
}

export async function region({commit}, val) {
  commit('set_region', val);
}

export async function orderDirection({commit}, val) {
  commit('set_orderDirection', val);
}

