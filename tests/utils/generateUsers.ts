const generateKycId = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, c => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

export const generateTestUser = () => {
  const timestamp = Date.now()

  return {
    firstName: 'Juan',
    lastName: 'TestUser',
    userName: `juan${timestamp}`,
    email: `juan${timestamp}@gmail.com`,
    mobile: '09123456789',
    type: 'player',
    password: 'password123',
    ekycTransactionId: typeof crypto !== 'undefined' && crypto.randomUUID
      ? crypto.randomUUID() 
      : generateKycId(),   
  }
}

export const generateTestUserLogin = (type: 'player' | 'admin' | 'moderator') => {
  const randomId = Math.floor(Math.random() * 100000)
  return {
    userNameOrEmail: `${type}${randomId}@gmail.com`,
    password: 'password123',
    user: {
      userNameOrEmail: `${type}${randomId}`,
      type,
    },
    token: `mocked-token-${randomId}`,
  }
}
