import { useEffect } from "react"

/**
 * To use "Shoplive Plugin", "shoplive.js" must be imported inside <head></head> of ​​your landing page.
 * Please refer to the "index.html" file.
 */

const OVERALL_CONTAINER_ID = "your-plugin-overall-container-id"

const PluginExample = ({ak}) => {
  
  /**
   * init() only needs to be called once.
   * So, it is recommended to be included in the highest level component.
   */
  useEffect(() => {    

    const messageCallback = {
      DOWNLOAD_COUPON: function(payload) {
        alert(payload.coupon);
      },
    };
    window.cloud.shoplive.init({ accessKey: ak, messageCallback: messageCallback  });
    // This is an example for linking user accounts.
    // window.cloud.shoplive.setUserObject({userId: "PLUG_DEMO_USER_ID", userName: "PLUGIN_DEMO_USER_NAME"})
  }, [])
  
  useEffect(() => {
    window.cloud.shoplive.setOverall(OVERALL_CONTAINER_ID)
  }, [])


  return (<>
    <header>
      <div className="wrapper">
        <h3>Shoplive - Plugin example</h3>
        <a href='/'>Container fit example</a>
      </div>
    </header>
    <main className="wrapper">
      <h1>
        Shoplive Plugin Example
      </h1>

      <div id={OVERALL_CONTAINER_ID}></div>

    </main>
  </>)
}


export default PluginExample
