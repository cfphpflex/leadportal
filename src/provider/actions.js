import { post } from './api'

// "rom" is injected as the last argument in every function
// so you can get current state (like rom.user or rom.token)
// use "rom.setUI" to set state that is persisted in browser localStorage
// use "rom.setState" to set state that is just in-memory

// any component can access "rom" with the useLeadExchange hook

export async function login(username, password, rom) {
  try {
    const res = await post('login', {username, password})
    rom.setUI({
      token: res.access_token,
      user: res.user
    })
    return res
  } catch(e){
    return null
  }
}

export async function somethingElse(rom) {

}



