const modules = import.meta.glob("./*.js", { eager: true });

let merged = {};
for (const path in modules) {
  if (path.endsWith("/index.js")) continue;
  merged = { ...merged, ...modules[path].default };
}

export default merged;
