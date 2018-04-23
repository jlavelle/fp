import * as Fn from "../fn";
import * as Arr from "../arr";
import { typeid } from "../../plumbing/typeid";

// Misc
export const keys = o => Object.keys(o);
export const values = o => keys(o) |> Arr.map(k => o[k]);
export const pairs = o => keys(o) |> Arr.map(k => [k, o[k]]);
export const fromPairs = pairs =>
  pairs |> Arr.map(([k, v]) => embed(k)(v)) |> Arr.foldl(append)(empty);
export const embed = k => v => ({ [k]: v });
export const hasKey = k => o => o.hasOwnProperty(k);
export const get = k => o => o[k];
export const over = k => f => v => ({ ...v, [k]: f(v[k]) });
export const zipWith = f => o1 => o2 =>
  keys(o1)
  |> Arr.foldl(o => k => {
    const isKeyShared = hasKey(k)(o2);
    if (!isKeyShared) return o;

    const v1 = o1[k];
    const v2 = o2[k];
    return f(v1)(v2) |> embed(k) |> append(o);
  })(empty);

// Identity
export const is = x => typeid(x) === "Object";

// Functor
export const map = f => o =>
  pairs(o) |> Arr.foldl(b => ([k, v]) => embed(k)(f(v)) |> append(b))(empty);

// Apply
export const lift2 = zipWith;

// Monoid
export const empty = {};
export const append = o1 => o2 => ({ ...o1, ...o2 });

// Traversable
export const sequence = A => o =>
  pairs(o)
  |> Arr.map(([k, v]) => v |> A.map(embed(k)))
  |> (A.of(empty) |> Arr.foldl(A.lift2(append)));

// Foldable
export const foldl = f => z => o => keys(o) |> Arr.foldl(f)(z);