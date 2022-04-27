/**
 * @jest-environment jsdom
 */

import user from '../src/store/modules/user'

describe('user getters ', () => {
  test('is Login', async () => {
    // mock state
    const state = {
      isLogin: false
    }
    const res = user.getters.isLogin(state)

    expect(res).toBe(false)
  })
})
