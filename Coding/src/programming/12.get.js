let a = { a: [1, 2, 3, { b: 44 }] };

function get(source, path, defaultValue) {
  const paths = path
    .replace(/\[(?:(?:"(\w+)")|(?:'(\w+)')|(\w+))\]/g, (_, $1, $2, $3) => {
      return $1 ? `.${$1}` : $2 ? `.${$2}` : `.${$3}`;
    })
    .split(".");
  let result = source;
  for (let key of paths) {
    result = result?.[key];
  }
  return result ? result : defaultValue;
}

console.log(get(a, "a[3].b"));
