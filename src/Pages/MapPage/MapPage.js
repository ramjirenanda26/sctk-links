import Navigation from '../../Components/Navigation/Navigation';
import MapComponent from '../../Components/MapComp/Map';

const MapPage = () => {
  return (
    <>
      <Navigation />
      <div className="map-comp" style={{ width: '100vw', height: '100vh' }}>
        <MapComponent />
      </div>
    </>
  );
};

export default MapPage;
