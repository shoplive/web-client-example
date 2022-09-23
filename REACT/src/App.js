import './App.css';
import ContainerFitExample from './example/ContainerFitExample';
import FullscreenExample from './example/FullscreenExample';
import PluginExample from './example/PluginExample';

function App() {

  const sp = new URLSearchParams(window.location.search);

  const ak = sp.get('ak') || 'Lm9LJaufCztZXJ5gpNg2';
  const ck = sp.get('ck') || '1c042f398773';
  const viewType = sp.get('viewType');

  return (
    <div className="App">

      {!viewType && <ContainerFitExample ak={ak} ck={ck} />}
      
      {viewType === 'fullscreen' && <FullscreenExample ak={ak} ck={ck} />}
      {viewType === 'plugin' && <PluginExample ak={ak} />}
      
      
    </div>
  );
}

export default App;
