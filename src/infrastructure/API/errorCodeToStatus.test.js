import { describe, it, expect } from "vitest"
import { ErrorCode } from "../../domain/errors/ErrorCode.js"
import { errorCodeToStatus } from "./errorCodeToStatus.js"

describe("errorCodeToStatus", () => {
  const codes = Object.values(ErrorCode)
    .filter((code) => code !== ErrorCode.UNKNOWN)
    .map((code) => [code])

  it.each(codes)("%s does not throw a 500 error", (code) => {
    expect(errorCodeToStatus(code)).not.toBe(500)
  })
})
