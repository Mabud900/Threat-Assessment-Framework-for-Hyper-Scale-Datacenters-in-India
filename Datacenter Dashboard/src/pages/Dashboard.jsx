import MapView from "../components/MapView";
import ThreatPanel from "../components/ThreatPanel";
import CityComparison from "../components/CityComparison";
import LocationProfile from "../pages/LocationProfile";
import AboutTeam from "../components.AboutTeam";

function Dashboard() {
  return (
    <div style={{ padding: "20px" }}>
      <h1>Hyperscale Datacenter Threat Assessment Portal</h1>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "3fr 1fr",
          gap: "20px"
        }}
      >
        <MapView />
        <ThreatPanel />
      </div>

      <CityComparison />
      <LocationProfile/>
      <AboutTeam/>
    </div>
  );
}
export default Dashboard;
