import React, { useEffect, useState } from 'react'
import { adminConfig } from '../../../../config/adminConfig';

import { useMessage } from '../../providers/MessageProvider';

function FilterSelect({ label, getOptions, selectedValue, onChange }) {
    const { showMessage } = useMessage();
    const [options, setOptions] = useState([]);

    useEffect(() => {
        const getOptionsFunc = async () => {
            try {
                const result = await getOptions();
                console.log(`get filterSelect options for ${label}`, result);
                setOptions(result);
            } catch (error) {
                showMessage(error.message, adminConfig.colorEnum.danger);
            }
        }

        getOptionsFunc();
    }, [])

    return (
        <>
            {/* <label htmlFor="carBrand" className="form-label">
                {label}
            </label> */}

            <select
                className="form-select"
                value={selectedValue}
                onChange={onChange}
            >
                <option value="">{`All ${label}`}</option>
                {options.map(option => (
                    <option key={option.id} value={option.id}>
                        {option.value}
                    </option>
                ))}
            </select>
        </>
    )
}

export default FilterSelect
