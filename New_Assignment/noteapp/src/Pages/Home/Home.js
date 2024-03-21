import React from 'react';
import { Navigation } from '../../Component/Navigation';
import Sidebar from '../../Component/Sidebar';

const Home = () => {
  return (
    <div className=''>
      <Navigation />
      <div className='flex flex-col sm:flex-row'> {/* Flex direction changed for small screens */}
        <Sidebar />
        <div className='flex flex-col  items-center justify-center md:h-screen md:w-full'>
          {/* <p className='text-3xl font-semibold'>digitalflake </p> */}
          <img src={"image289.svg"} alt="logo" className="h-28 mx-auto"  />
          <p className='mt-4 font-semibold text-2xl'>Welcome to Digitalflake Admin</p>
        </div>
      </div>
    </div>
  );
}

export default Home;
