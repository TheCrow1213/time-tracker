import axios from 'axios'

var a = axios.create({
    baseURL: `${process.env.API_URL}/api/v1/time`
})

export function create(date, time, distance, token) {
    return a.post('/', { date, time, distance }, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function remove(id, token) {
    return a.delete(`/${id}`, {
      headers: {'Authorization': `Bearer ${token}`}
    })
}

export function update(id, token) {
    // return a.delete(`/${id}`, {
    //   headers: {'Authorization': `Bearer ${token}`}
    // })
}

export default {
    create,
    update,
    remove
}