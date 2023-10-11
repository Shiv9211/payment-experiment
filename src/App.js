import { useState, useEffect } from 'react';

import axios from 'axios'
import './App.css';

import UserCard from './components/UserCard'

function App() {
  const [userData, setUserData] = useState([])

  useEffect(() => {
    async function getData() {
      const {data: {results}} = await axios.get('https://randomuser.me/api/?results=50')
    setUserData(results)
    }
    getData()
    
  }, [])

  return (
    <div className="bg-slate-600 w-full h-full flex flex-col justify-center items-center">
      <p className="text-3xl font-extrabold text-gray-100 my-3">User List</p>
      <div className='w-4/5 bg-slate-400 rounded-md p-4 m-6 flex flex-wrap gap-6 justify-center'>
        {
          userData && userData?.map((user) => (
            <UserCard userData={user} key={user.email} />
          ))
        }
      </div>
    </div>
  );
}

export default App;
