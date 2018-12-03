import * as Fn from "../instances/fn";

// Equivalent minimal definitions
export const mdefs = (() => {
  const traverse = ({ sequence, map }) => A => f => x =>
    x |> map(f) |> sequence(A);
  const sequence = ({ traverse }) => A => traverse(A)(Fn.id);

  return [
    { impl: { traverse }, deps: ["sequence", "map"] },
    { impl: { sequence }, deps: ["traverse"] }
  ];
})();

// Class methods
export const methods = ({ sequence, traverse }) => {
  const _ = {};

  // :: Applicative f -> (a -> f b) -> t a -> f Unit
  const traverse_ = A => f => t => traverse(A)(f)(t) |> A["<$"](undefined);

  // :: Applicative f -> t (f a) -> f Unit
  const sequence_ = A => t => sequence(A)(t) |> A["<$"](undefined);

  return { traverse_, sequence_ };
};
