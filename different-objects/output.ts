  const baseObject =
  {"a":1,"b":2,"nested":{"a":8}}; const stringValues =
  {"c":3,"d":4}

  const variablesObject =
  {"a": someVar, "nested": {"b": someVar2, "c": ccc}}

  const result =
  {
  "a": someVar,
  "b": 2,
  "nested": {
    "a": 8,
    "b": someVar2,
    "c": ccc
  },
  "c": 3,
  "d": 4
}
