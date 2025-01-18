import React from 'react'

import MainHeader from './mainHeader/MainHeader'
import Parallax from './parallax/Parallax'
import Parallax2 from "./parallax/Parallax2"
import CarSearch from './search/CarSearch'
import CarPopular from './search/CarPopular'
import RentService from './service/RentService'
import MainFooter from './footer/MainFooter'
import CopyrightInfo from './footer/CopyrightInfo'
import NewestCar from './newestCar/NewestCar'

function Home() {
    return (
        <section>
            <MainHeader />
            <CarSearch />

            <div className='container'>
                <Parallax />
            </div>

            <CarPopular />

            <div className='container'>
                <Parallax2 />
            </div>

            <NewestCar />

            <div className='container'>
                <RentService />
            </div>

            <MainFooter />
            <CopyrightInfo />
        </section>
    )
}

export default Home