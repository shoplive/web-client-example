# Shoplive example for React


In the project directory, please run the following commands:

#### `yarn install`
#### `yarn start`

Run the app in development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.


## Set configuration values

```
const YourComponent = () => {
  const ak = "ACCESS_KEY";
  const ck = "CAMPAIGN_KEY";
  const SHOPLIVE_CONTAINER_ID = "your-plugin-container-id";
  const shareUrl = "YOUR_SHARE_URL";

  return (
    <ShoplivePlayer 
      ak={ak} 
      ck={ck} 
      SHOPLIVE_CONTAINER_ID={playerContainerId} 
      shareUrl={shareUrl}
    />
  )
}
  
```

## How to run Shoplive Plugin

#### 1. Import 'shoplive.js' in the &lt;head&gt;&lt;/head&gt; of your landing page like 'index.html'
```
<head>
  ...
  <script type="text/javascript" src="https://static.shoplive.cloud/shoplive.js"></script>
  ...
</head>

```

#### 2. Call init() at the beginning of the code before using other Shoplive funtions 
```
useEffect(() => {    
  window.cloud.shoplive.init({ accessKey: 'YOUR_ACCESS_KEY' });
}, [])
```

#### 3. Set CONTAINER_ID to embed Shoplive plugin UI and call setOverall(SHOPLIVE_CONTAINER_ID)

```
const SHOPLIVE_CONTAINER_ID = "your-plugin-container-id"

const YourOverallComponent = () => {
  
  useEffect(() => {
    window.cloud.shoplive.setOverall(SHOPLIVE_CONTAINER_ID)
  }, [])

  return (
    <div id={SHOPLIVE_CONTAINER_ID}></div>  
  )
}




```
