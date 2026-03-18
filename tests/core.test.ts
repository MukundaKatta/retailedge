import { describe, it, expect } from "vitest";
import { Retailedge } from "../src/core.js";
describe("Retailedge", () => {
  it("init", () => { expect(new Retailedge().getStats().ops).toBe(0); });
  it("op", async () => { const c = new Retailedge(); await c.process(); expect(c.getStats().ops).toBe(1); });
  it("reset", async () => { const c = new Retailedge(); await c.process(); c.reset(); expect(c.getStats().ops).toBe(0); });
});
