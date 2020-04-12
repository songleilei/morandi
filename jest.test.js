test("test common matcher", () => {
  expect(2 + 2).toBe(4);
});

test("test to be true or false", () => {
  expect(1).toBeTruthy();
  expect(0).toBeFalsy();
});

test("test number", () => {
  expect(4).toBeGreaterThan(3);
  expect(2).toBeLessThan(3);
});

test("test object", () => {
  // expect({ name: "ship" }).toBe({ name: "ship" });
  expect({ name: "ship" }).toEqual({ name: "ship" });
});
