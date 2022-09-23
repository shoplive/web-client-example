import React from 'react'
import ShoplivePlayer from '../shoplive/ShoplivePlayer';



const ContainerFitExample = ({ak, ck}) => {

  const playerContainerId = 'your-shoplive-player-container-id';

  const onClickFullscreenButton = () => {
    const url = `/?ak=${ak}&ck=${ck}&viewType=fullscreen`;
    window.open(url, "_blank", "width=360,height=700");
  }


  return (
    <div className='ContainerFitWrapper'>
      <header>
        <div className='wrapper'>
          <h3>Shoplive - Container fit example</h3>
          <a href='/?viewType=plugin'>Plugin example</a>
        </div>
      </header>

      <main className='wrapper'>
        <h1>Shoplive Player Example</h1>
        <section className='flexbox'>

          <div className='flexbox-contents'>
            <h2>Shoplive Player Example</h2>
            <p>Your contents...</p>
            <button onClick={onClickFullscreenButton} >View on fullscreen</button>
          </div>
          <div className='wrap-player'>
            <ShoplivePlayer 
              ak={ak} 
              ck={ck} 
              playerContainerId={playerContainerId} 
              shareUrl="YOUR_SHARE_URL"
              />
          </div>
          
        </section>
      </main>
    </div>
  )

}

export default ContainerFitExample;