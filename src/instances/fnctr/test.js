import test from "ava";
import { Fnctr, Fn, Arr, Obj, Prm, IntProduct } from "..";

const input = {
  foo: [{ bar: [10] }, [42]]
};
const T = Fnctr.Recurse([Obj, Arr]);

test("traversable", async t => {
  const result = await T.traverse(Prm)(Prm.of)(input);
  t.snapshot(result);
});

test("functor", t => {
  const result = T.map(x => x * 2)(input);
  t.snapshot(result);
});

test("foldable", t => {
  const result = T.foldMap(IntProduct)(Fn.id)(input);
  t.snapshot(result);
});