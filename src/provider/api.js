import axios from 'axios'

let URL = 'http://lead_api.leadexchangedev.com/api/'
if (window.location.hostname === 'localhost') {
    let trickCORS = 'https://cors-anywhere.herokuapp.com/'
    URL = trickCORS + URL
}

let headers = {
    'Content-Type': 'application/json',
    "Accept": "application/json"
}

// CREATE
export async function post(path, data, h) {
    const pointer = URL + path

    const ui = await getUI()
    headers['Authorization'] = `Bearer ${ui && ui.token}`
    console.log('data', data)
    console.log('path', path)
    console.log('h', h)
    console.log('headers', headers)

    let d = data
    if (!d) d = {}

    try {
        const res = await axios.post(pointer, JSON.stringify(d),
            {headers: {...headers, ...h}}
        )
        console.log(`res to path ${path}`, res)
        return res && res.data.data
    } catch (e) {
        console.log('post failed', e)
        throw e
    }
}



// UPDATE
export async function patch(path, data, h) {
    const pointer = URL + path

    const ui = await getUI()
    headers['Authorization'] = `Bearer ${ui && ui.token}`
    console.log('data', data)
    console.log('path', path)
    console.log('h', h)
    console.log('headers', headers)

    let d = data
    if (!d) d = {}

    try {
        const res = await axios.patch(pointer, JSON.stringify(d),
            {headers: {...headers, ...h}}
        )
        console.log(`res to path ${path}`, res)
        return res && res.data.data
    } catch (e) {
        console.log('post failed', e)
        throw e
    }
}



//  DELETE
export async function del(path,data,h){
    const ui = await getUI()
    headers['Authorization'] = `Bearer ${ui&&ui.token}`
    const pointer = URL+path

    console.log('data',data)
    console.log('path',path)
    console.log('h',h)

    try{
        const res = await axios.delete(pointer,{
            headers: {...headers, ...h},
            data:  JSON.stringify(data),
        }
        ) 
        console.log(`res to path ${path}`, res)
        return res&&res.data.data
    } catch(e){
        console.log('post failed',e)
        throw e
    }
}


// READ
export async function get(path,h){
    const ui = await getUI()
    headers['Authorization'] = `Bearer ${ui&&ui.token}`
    const pointer = URL+path

    console.log('path',path)
    console.log('h',h)

    try{
        const res = await axios.get(pointer,
        {headers: {...headers, ...h}}
        ) 

        console.log(`res to path ${path}`, res)
        return res&&res.data.data
    } catch(e){
        console.log('get failed',e)
        throw e
    }
}

export async function getUI(){
    const theUI = await localStorage.getItem('ui')
    let parsedUI
    if (theUI) {
        try {
            parsedUI = JSON.parse(theUI)
        } catch(e){}
        if(parsedUI) return parsedUI
    }
    return null
}

