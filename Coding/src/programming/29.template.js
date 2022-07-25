// 实现一个 render/template 函数，可以用以渲染模板

function get(path, source) {
  const paths = path
    .replace(/\[(?:(\w+)|(?:"(\w+)")|(?:'(\w+)'))\]/, (_, $1, $2, $3) => {
      return $1 ? `.${$1}` : $2 ? `.${$2}` : `.${$3}`;
    })
    .split(".");
  let result = source;
  for (let i = 0; i < paths.length; i++) {
    const key = paths[i];
    result = result?.[key];
  }

  return result;
}

function render(template, source) {
  return template.replace(/{{\s+([^\s]+)\s+}}/g, (capture, $1) => {
    console.log(get($1, source));
    return get($1, source);
  });
}

const template = '{{ user["name"] }}，今天你又学习了吗 - 用户ID: {{ user.id }}';

const data = {
  user: {
    id: 10086,
    name: "山月",
  },
};

console.log(render(template, data));
