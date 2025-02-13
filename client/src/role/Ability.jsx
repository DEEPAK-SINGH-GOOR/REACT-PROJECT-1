import React from 'react'
import { getUserDetails } from '../userDetails'

const Ability = (roles = []) => {
    const userRole = getUserDetails()?.role;
    return roles.includes(userRole)
}

export default Ability