import { mainEndpoint, proxyEndpoind } from "./components/app/app"

export async function investmentDataRequest(endpoint) {
    try {
        // console.log('request sending', endpoint)
        // const res = await fetch(`/asset/profit?${endpoint}`)
        const res = await fetch(`${proxyEndpoind + mainEndpoint}/asset/profit?${endpoint}`)
        const data = await res.json()

        if (data.statusCode === 500) {
            return []
        }

        if (data && data?.length) {
            return data
        }
    }
    catch (error) {
        console.log(error)
    }
    return []
}

export async function allCoinsLIstRequest(endpoint) {
    try {
        const res = await fetch(endpoint)
        const data = await res.json()

        if (data && data?.length) {
            return data
        }
        return null
    }
    catch (error) {
        console.log(error)
        return null
    }
}