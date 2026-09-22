

export const index = 0;
let component_cache;
export const component = async () => component_cache ??= (await import('../entries/fallbacks/layout.svelte.js')).default;
export const imports = ["_app/immutable/nodes/0.DMIZGTUC.js","_app/immutable/chunks/D0SsQWSv.js","_app/immutable/chunks/CP97kCR3.js"];
export const stylesheets = [];
export const fonts = [];
