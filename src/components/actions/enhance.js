export function enhance(node, options = {}) {
  const { classname } = { classname: "js", ...options };

  node.classList.add(classname);
}
