import { describe, expect, it } from "vitest";

import {
  celsiusToFahrenheit,
  computeHeatIndex,
  fahrenheitToCelsius,
} from "@/lib/heat-index";

describe("temperature conversions", () => {
  it("converts Celsius to Fahrenheit", () => {
    expect(celsiusToFahrenheit(0)).toBe(32);
    expect(celsiusToFahrenheit(100)).toBe(212);
    expect(celsiusToFahrenheit(37)).toBeCloseTo(98.6, 1);
  });

  it("round-trips through Fahrenheit", () => {
    expect(fahrenheitToCelsius(celsiusToFahrenheit(42))).toBeCloseTo(42, 5);
  });
});

describe("computeHeatIndex", () => {
  it("matches the NOAA reference: 90°F / 70% RH ≈ 105°F (≈40.6°C)", () => {
    // 90°F = 32.22°C. NOAA table gives a heat index of ~105°F.
    const hi = computeHeatIndex(32.22, 70);
    expect(fahrenheitToCelsius(105)).toBeCloseTo(40.6, 1);
    expect(hi).toBeGreaterThan(39);
    expect(hi).toBeLessThan(42);
  });

  it("returns near the air temperature in cool, dry conditions", () => {
    // Not hot enough for the regression — simple formula applies.
    const hi = computeHeatIndex(20, 40);
    expect(hi).toBeGreaterThan(16);
    expect(hi).toBeLessThan(23);
  });

  it("increases with humidity at a fixed hot temperature", () => {
    const dry = computeHeatIndex(38, 20);
    const humid = computeHeatIndex(38, 70);
    expect(humid).toBeGreaterThan(dry);
  });

  it("increases with temperature at a fixed humidity", () => {
    const cooler = computeHeatIndex(34, 55);
    const hotter = computeHeatIndex(42, 55);
    expect(hotter).toBeGreaterThan(cooler);
  });

  it("reaches the extreme-danger range for very hot, humid conditions", () => {
    const hi = computeHeatIndex(45, 55);
    expect(hi).toBeGreaterThan(48);
  });

  it("clamps out-of-range humidity without throwing", () => {
    expect(Number.isFinite(computeHeatIndex(40, 150))).toBe(true);
    expect(Number.isFinite(computeHeatIndex(40, -20))).toBe(true);
  });
});
