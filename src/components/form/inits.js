import * as Yup from 'yup';
import * as schema from './schema'

const stringTypes = ['text','password','address','search','npi','textarea','radio','dropdown','audio','video','color']

function validator(config){
    const shape = {}
    config.forEach((field)=>{
        if(typeof field === 'object') {
            shape[field.name] = field.validator
        }
    })
    return Yup.object().shape(shape)
}

function initialize(config) {
    const values = {}
    config.forEach((field)=>{
        if(typeof field === 'object') {
            if(stringTypes.includes(field.type)){
                values[field.name] = ''
            } else if(field.type==='time'||field.type==='datetime'){
                //values[field.name] = Math.round(Date.now().valueOf())
            } else if(field.type==='boolean'){
                values[field.name] = false
            } else if(field.type==='number'){
                values[field.name] = 0
            } else if(field.type==='checkbox'){
                values[field.name] = []
            } else if(field.type==='phone'||field.type==='date'){
                values[field.name] = {'0':'','1':'','2':''}
            } else if(field.type==='image'){
                values[field.name] = {}
            } else {
                values[field.name] = null
            }
            // if(field.type==='select'){
            //     const firstOption = field.options[0]
            //     values[field.name] = firstOption
                // const type = typeof firstOption.name
                // if(type==='string'){
                //     values[field.name] = ''
                // } else {
                //     values[field.name] = null
                // }
            // }
        }
    })
    return values
}


export {
    // makeConfig,
    validator,
    initialize,
}
