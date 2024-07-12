import React from 'react'

import MainHeader from '../layout/MainHeader'
import Parallax from './parallax/Parallax'
import Parallax2 from "./parallax/Parallax2"
import CarSearch from '../search/CarSearch'

function Home() {
    return (
        <section>
            <MainHeader />
            <CarSearch />

            <div className='container'>
                <Parallax />
            </div>
            <div className='container'>
                <Parallax2 />
            </div>

        </section>
    )
}

export default Home