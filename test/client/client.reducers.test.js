import { reducer } from "../../src/client/store/reducer";
import { isString } from "util";

// reducer tests
// tests to make sure mutation reducers work properly
// (needed if additional processing is done while creating mutations)

describe("reducers", () => {
  it("should return a default state with auth set as WAITING (for the session ping)", () => {
    expect(reducer(null, {})).toEqual({});
  });
});
