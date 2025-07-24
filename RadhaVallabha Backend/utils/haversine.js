// find user distance and check whether it is under 50 metre or not
function haversineDistance(loc1, loc2) {
  const toRad = angle => (angle * Math.PI) / 180;
  const R = 6371e3; // radius of Earth in meters

  const φ1 = toRad(loc1.latitude);
  const φ2 = toRad(loc2.latitude);
  const Δφ = toRad(loc2.latitude - loc1.latitude);
  const Δλ = toRad(loc2.longitude - loc1.longitude);

  const a =
    Math.sin(Δφ / 2) ** 2 +
    Math.cos(φ1) * Math.cos(φ2) * Math.sin(Δλ / 2) ** 2;

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return R * c; // distance in meters
}

module.exports = { haversineDistance };