import { describe, it, expect } from "vitest"
import {IdGeneratorNode} from "./IdGeneratorNode.js";

describe("IdGeneratorNode", () => {
  it("generates a different identifier each time", () => {
    const idGenerator = new IdGeneratorNode()

    const id1 = idGenerator.generate()
    const id2 = idGenerator.generate()

    expect(id1).not.toBe(id2)
  })
})
