const testVars = {
  run() {
    console.log("run打印this--");
    console.log(this);
  },
};

export function eat() {
  console.log("eat打印this--");
  console.log(this);
}
export default testVars;
