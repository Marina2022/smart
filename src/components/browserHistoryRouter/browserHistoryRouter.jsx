import { useEffect, useState} from 'react'
import {Router} from 'react-router-dom'

function BrowserHistoryRouter({history, children}) {
  const [historyState, setHistoryState] = useState({location: history.location, action: history.action})
  useEffect(()=>{
    history.listen((obj)=> {
      setHistoryState(obj);
    })
  },[])
  return <Router navigator={history} location={history.location} navigationType={history.action} >
    {children}
  </Router>
}

export default BrowserHistoryRouter
