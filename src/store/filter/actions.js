export async function range({commit}, days) {
  commit('set_range', days);
}

export async function search({commit}, search_model) {
  commit('set_search', search_model);
}

export async function sortBy({commit}, sortBy_model) {
  commit('set_sortBy', sortBy_model);
}

export async function showPrivate({commit}, showPrivate_model) {
  commit('set_showPrivate', showPrivate_model);
}

export async function region({commit}, region_model) {
  commit('set_region', region_model);
}

