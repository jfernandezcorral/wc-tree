const get = (url)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('x-j_gid_cod_app','e2')
    return fetch(url,{credentials: 'same-origin', headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json()
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else{
            throw new Error(`Error haciendo get de ${url}, ${resp.status}`)
        }
    })
}
const post = (url, data)=>{
    let headers = new Headers();
    headers.append('Accept', 'application/json')
    headers.append('Content-Type', 'application/json;charset=UTF-8')
    headers.append('x-j_gid_cod_app','e2')
    return fetch(url,{credentials: 'same-origin', method: 'post', body: JSON.stringify(data), headers}).then(resp=>{
        if (resp.ok){
            const ct = resp.headers.get('content-type')
            if (ct && ct.indexOf('application/json')>=0){
                return resp.json()
            }
            console.warn(`${url} devolvió content-type: ${ct}`)
            return resp.text()
        }
        else{
            throw new Error(`Error haciendo post de ${url}, ${resp.status}`)
        }
    })
}
const URL = '/tabit/ObtenerDatosJerarquiaCentrosAnalitica'
const URLNIVELES = '/tabit/ObtenerTipoNivelJerarquiaAnalitica'
const cache = {}
let cacheNiveles = undefined
const getCentros = (cuspide)=>{
    return new Promise((resolve, reject)=>{
        if (cache[cuspide]){
            cache[cuspide].then(
                (data=>resolve(data)),
                (error=>{console.log(error);reject(error);cache[cuspide]=undefined})
            )
        }
        else{
            cache[cuspide] = post(URL,{codigo: cuspide})
            cache[cuspide].then(
                (data=>resolve(data)),
                (error=>{console.log(error);resolve([]);cache[cuspide]=undefined})
            )
        }
    })
}
const getNiveles = ()=>{
    return new Promise((resolve, reject)=>{
        if (cacheNiveles){
            resolve(cacheNiveles)
        }
        else{
            post(URLNIVELES,{}).then(
                data=>{cacheNiveles=data;resolve(data)},
                error=>{console.log(error);cacheNiveles=undefined;resolve([]);}
            )
        }
    })
}
export {get, post, getCentros, getNiveles}