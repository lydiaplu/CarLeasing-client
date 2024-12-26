import React, { useEffect, useState } from 'react'
import TabSelector from '../../common/tabSelector/TabSelector'

import { getAllCarBrands } from '../../../../api/carBrandsApi'
import { getAllCarTypes } from '../../../../api/carTypesApi'

export default function CarPopularForm({ queryCarData }) {
    // the data is the selected ids array from TabSelector, then pass the data to queryCarData from parent commponent
    // 这个数据是存储品牌和类型选中的id数组，然后将这个数据传递给父组件的queryCarData
    const searchInputObj = {
        carBrand: [],
        carType: []
    }
    const [searchInput, setSearchInput] = useState(searchInputObj)

    // the data list for the TabSelecor, and from java api
    // 品牌和类型的数据
    const [carBrandList, setCarBrandList] = useState([]);
    const [carTypeList, setCarTypeList] = useState([]);

    // get brand and type data
    // 获取品牌和类型的数据
    useEffect(() => {
        const fetchBrandData = async () => {
            try {
                const carBrandData = await getAllCarBrands();
                console.log("fetchBrandData: ", carBrandData);

                setCarBrandList(
                    carBrandData.map(carBrandObj => ({
                        id: carBrandObj.id,
                        name: carBrandObj.name
                    }))
                );

            } catch (error) {
                console.log(error.message);
            }
        }

        const fetchTypeData = async () => {
            try {
                const carTypeData = await getAllCarTypes();
                console.log("carTypeData: ", carTypeData);

                setCarTypeList(
                    carTypeData.map(carTypeObj => ({
                        id: carTypeObj.id,
                        name: carTypeObj.typeName
                    }))
                );

            } catch (error) {
                console.log(error.message);
            }
        }

        fetchBrandData();
        fetchTypeData();
    }, []);

    // when TabSeletor change the checkbox, will pass the data to queryCarData
    // 当TabSeletor的多选框选择的数据变化时，就将变化的数据传递给queryCarData
    useEffect(() => {
        queryCarData(searchInput)
    }, [searchInput])

    return (
        <div className='container'>
            <TabSelector labelName={"Car Brand"} tabObjs={carBrandList} searchInput={searchInput} setSearchInput={setSearchInput} searchInputType={"carBrand"} />
            <TabSelector labelName={"Car Type"} tabObjs={carTypeList} searchInput={searchInput} setSearchInput={setSearchInput} searchInputType={"carType"} />
        </div>
    )
}
