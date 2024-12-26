import React, { useState } from 'react'

export default function TabSelector({ labelName, tabObjs, searchInput, setSearchInput, searchInputType }) {
    { console.log(labelName, tabObjs) }

    // the selected tabs is an array includes all ids
    // 选中的tabs选项，存储为一个id的数组
    const [selectedTabs, setSelectedTabs] = useState([]);

    const tabSelectClick = (id) => {
        console.log("tabSelectClick id: ", id);

        const selectedTabsArr = selectedTabs.includes(id)
            ? selectedTabs.filter(tabId => tabId !== id)
            : [...selectedTabs, id];

        setSelectedTabs(selectedTabsArr);
        // pass the selected ids to the parent commponent
        // 将选中的id数组传递给父组件
        setSearchInput({ ...searchInput, [searchInputType]: selectedTabsArr })
    }

    return (
        <div className='tabContainer'>
            <label className='tabLabel'>{labelName}</label>

            <div className='tabSelector'>
                <ul>
                    {tabObjs.map(tabObj => (
                        <li
                            key={tabObj.id}
                            onClick={() => tabSelectClick(tabObj.id)}
                            className={selectedTabs.includes(tabObj.id) ? "selected" : ""}
                        >
                            {tabObj.name}
                        </li>
                    ))}
                </ul>
            </div>
        </div >
    )
}
