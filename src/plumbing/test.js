import test from "ava";
import { augmentDef, implement } from ".."

const snap = t => x => t.snapshot(x);

const mdefs = (() => {
  const fooFromBar = ({ bar }) => () => "foo from " + bar();
  const fooFromBaz = ({ baz }) => () => "foo from " + baz();
  const barFromFoo = ({ foo }) => () => "bar from " + foo();
  const barFromBaz = ({ baz }) => () => "bar from " + baz();
  const bazFromFoo = ({ foo }) => () => "baz from " + foo();
  const bazFromBar = ({ bar }) => () => "baz from " + bar();

  return [
    { impl: { foo: fooFromBar }, deps: ["bar"] },
    { impl: { foo: fooFromBaz }, deps: ["baz"] },
    { impl: { bar: barFromFoo }, deps: ["foo"] },
    { impl: { bar: barFromBaz }, deps: ["baz"] },
    { impl: { baz: bazFromFoo }, deps: ["foo"] },
    { impl: { baz: bazFromBar }, deps: ["bar"] }
  ];
})();

const methods = ({foo, bar, baz}) => {
  return { foo, bar, baz };
};

const OnlyFoo = (() => {
  return { foo: () => "OnlyFoo" };
})();

const OnlyBar = (() => {
  return { bar: () => "OnlyBar" };
})();

const OnlyBaz = (() => {
  return { baz: () => "OnlyBaz" };
})();

test("OnlyFoo", t => {
  const a = implement({ mdefs, methods })(OnlyFoo);
  snap(t)(a);
  snap(t)(a.foo());
  snap(t)(a.bar());
  snap(t)(a.baz());
});

test("OnlyBar", t => {
  const a = implement({ mdefs, methods })(OnlyBar);
  snap(t)(a);
  snap(t)(a.foo());
  snap(t)(a.bar());
  snap(t)(a.baz());
});

test("OnlyBaz", t => {
  const a = implement({ mdefs, methods })(OnlyBaz);
  snap(t)(a);
  snap(t)(a.foo());
  snap(t)(a.bar());
  snap(t)(a.baz());
});