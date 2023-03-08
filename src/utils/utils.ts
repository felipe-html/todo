module utils {
    export function recoveryFromLocalStorage(key: string): any | null {
        let data = localStorage.getItem(key)

        let dataParsed = data !== null ? JSON.parse(data) : null

        return dataParsed
    }

    export function saveIntoLocalStorage(key: string, value: any | any[]) {
        localStorage.setItem(key, JSON.stringify(value));
    }

    export function deleteFromLocalStorage(key: string){
        localStorage.removeItem(key);
    }
}

export default utils