import { useReducer, useEffect } from 'react';
import { buildCarCascadeTree } from '../lib/tree/carCascadeTree';
import { getAllCarsByGroup } from '../api/carApi';

const initialState = {
    carForm: {
        carBrand: "",
        model: "",
        carType: "",
        year: "",
        color: "",
        licensePlate: ""
    },
    treeNode: {
        rootNode: null,
        carBrandNode: null,
        modelNode: null,
        carTypeNode: null,
        yearNode: null,
        colorNode: null,
        licensePlateNode: null
    }
}

const reducer = (state, action) => {
    switch (action.type) {
        case 'SET_TREE':
            return { ...state, treeNode: { ...state.treeNode, rootNode: action.payload } };
        case 'UPDATE_FIELD':
            {
                const { name, value } = action.payload;
                let newState = { ...state, carForm: { ...state.carForm, [name]: value } };
                return updateCascade(newState, name);
            }
        default:
            return state;
    }
}

function updateCascade(state, fieldName) {
    let { treeNode, carForm } = state;

    function resetFields(fromField) {
        const fieldOrder = Object.keys(carForm);
        const startReset = fieldOrder.indexOf(fromField) + 1;

        for (let i = startReset; i < fieldOrder.length; i++) {
            carForm[fieldOrder[i]] = "";
        }

        for (let i = startReset; i < fieldOrder.length; i++) {
            const treeNodeKey = fieldOrder[i] + "Node";
            treeNode[treeNodeKey] = null;
        }
    }

    switch (fieldName) {
        case 'carBrand':
            // carForm.model = "";
            treeNode.carBrandNode = treeNode.rootNode.children[carForm.carBrand];
            resetFields(fieldName);
            break;
        case 'model':
            // carForm.carType = "";
            treeNode.modelNode = treeNode.carBrandNode.children[carForm.model];
            resetFields(fieldName);
            break;
        case 'carType':
            // carForm.year = "";
            treeNode.carTypeNode = treeNode.modelNode.children[carForm.carType];
            resetFields(fieldName);
            break;
        case 'year':
            // carForm.color = "";
            treeNode.yearNode = treeNode.carTypeNode.children[carForm.year];
            resetFields(fieldName);
            break;
        case 'color':
            // carForm.licensePlate = "";
            treeNode.colorNode = treeNode.yearNode.children[carForm.color];
            resetFields(fieldName);
            break;
    }

    return { ...state, treeNode, carForm };
}

export const useCarCascadeForm = () => {
    const [state, dispatch] = useReducer(reducer, initialState);

    useEffect(() => {
        const fetchAllCars = async () => {
            try {
                const result = await getAllCarsByGroup();
                console.log("fetch all cars: ", result);

                if (result) {
                    const rootNode = buildCarCascadeTree(result.map(item => ({
                        id: item.id,
                        carBrand: item.carBrand,
                        model: item.model,
                        carType: item.carType,
                        year: item.year,
                        color: item.color,
                        licensePlate: item.licensePlate
                    })))
                    dispatch({ type: "SET_TREE", payload: rootNode });
                }
            } catch (error) {
                console.error('Failed to fetch cars:', error);
            }
        }
        fetchAllCars();
    }, []);

    const dispatchUpdateField = (name, value) => {
        dispatch({ type: "UPDATE_FIELD", payload: { name, value } });
    };

    return {
        state,
        dispatchUpdateField
    };
}