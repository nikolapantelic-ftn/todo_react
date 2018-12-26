import react from 'react';

export default class AuthService {
    constructor() {
      this.setAuthHeader()
    }

    setAuthHeader() {
        this.setHeader('Authorization', `Bearer ${localStorage.getItem('JWTToken')}`)
    }

    async handleAuthChange(token) {
        try {
          this.setLocalStorageAuthData(token)
          this.setAuthHeader()
          const response = await this.getLoggedInUser()
          this.setLocalStorageUserData(response)
        } catch (error) {
          throw error
        }
    }
}