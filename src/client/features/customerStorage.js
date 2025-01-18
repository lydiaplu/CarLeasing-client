export function saveCustomerToLocal(data) {
    localStorage.setItem('currentCustomer', JSON.stringify(data));
}

export function getCustomerFromLocal() {
    const currentCustomer = localStorage.getItem('currentCustomer');

    if (currentCustomer) {
        return JSON.parse(currentCustomer);
    } else {
        return;
    }
}

export function removeCustomerFromLocal() {
    localStorage.removeItem("currentCustomer");
}