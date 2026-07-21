/**
 * HeatGuard heat & risk domain utilities.
 *
 * All heat-index and risk logic lives here as pure, unit-tested functions.
 */
export {
  celsiusToFahrenheit,
  computeHeatIndex,
  fahrenheitToCelsius,
} from "./heat-index";
export { ALERT_LEVEL_THRESHOLDS_C, classifyAlertLevel } from "./alert-level";
export {
  computeVulnerabilityScore,
  type VulnerabilityRegionInput,
  type VulnerablePopulationInput,
} from "./vulnerability";
export { computeHealthRiskScore } from "./health-risk";
