import { api, getHeader } from './apiConfig';

export async function addCarMaintenance(carMaintenance) {
    const response = await api.post("/maintenances/add/new-maintenance", carMaintenance);
    console.log("/maintenances/add/new-maintenance", response);
    return response;
}

export async function editCarMaintenance(carMaintenanceId, carMaintenance) {
    const response = await api.put(`/maintenances/update/${carMaintenanceId}`, carMaintenance);
    console.log(`/maintenances/update/${carMaintenanceId}`, response);
    return response;
}

export async function getCarMaintenanceById(carMaintenanceId) {
    try {
        const result = await api.get(`/maintenances/maintenance/${carMaintenanceId}`);
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car maintenance ${error.message}`)
    }
}

export async function getAllCarMaintenances() {
    try {
        const result = await api.get("/maintenances/all");
        return result.data;
    } catch (error) {
        throw new Error(`Error fetching car maintenance ${error.message}`)
    }
}

export async function deleteCarMaintenance(carMaintenanceId) {
    try {
        const result = await api.delete(`/maintenances/delete/${carMaintenanceId}`)
        return result.data;
    } catch (error) {
        throw new Error(`Error deleting car maintenance ${error.message}`);
    }
}