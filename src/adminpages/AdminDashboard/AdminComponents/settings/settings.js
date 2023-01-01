import React, {useEffect} from 'react'



const Settings = ({setSelectedLink, link}) => {

  useEffect(() => {
    setSelectedLink(link)
  }, []);
  

  return (
    <div>settings</div>
  )
}

export default Settings;