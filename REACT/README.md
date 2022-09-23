# Shoplive example - React


In the project directory, you can run:

#### `yarn install`
#### `yarn start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Use ShoplivePlayer Component

```
const YourComponent = () => {
  const ak = "ACCESS_KEY";
  const ck = "CAMPAIGN_KEY";
  const playerContainerId = "your-shoplive-player-container-id";
  const shareUrl = "YOUR_SHARE_URL";

  return (
    <ShoplivePlayer 
      ak={ak} 
      ck={ck} 
      playerContainerId={playerContainerId} 
      shareUrl={shareUrl}
    />
  )
}
  
```

## Use Shoplive Plugin

#### 1. Import 'shoplive.js' in the <head></head> of ​​your landing page like 'index.html'
```
<head>
  ...
  <script type="text/javascript" src="https://static.shoplive.cloud/shoplive.js"></script>
  ...
</head>

```

#### 2. Call init() once in your top-level component
```
useEffect(() => {    
  window.cloud.shoplive.init({ accessKey: 'YOUR_ACCESS_KEY' });
}, [])
```

#### 3. Set overall

```
const OVERALL_CONTAINER_ID = "your-plugin-overall-container-id"

const YourOverallComponent = () => {
  
  useEffect(() => {
    window.cloud.shoplive.setOverall(OVERALL_CONTAINER_ID)
  }, [])

  return (
    <div id={OVERALL_CONTAINER_ID}></div>  
  )
}




```