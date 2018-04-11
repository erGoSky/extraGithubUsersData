import { Users } from '.'

let users

beforeEach(async () => {
  users = await Users.create({ UID: 'test', description: 'test' })
})

describe('view', () => {
  it('returns simple view', () => {
    const view = users.view()
    expect(typeof view).toBe('object')
    expect(view.id).toBe(users.id)
    expect(view.UID).toBe(users.UID)
    expect(view.description).toBe(users.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })

  it('returns full view', () => {
    const view = users.view(true)
    expect(typeof view).toBe('object')
    expect(view.id).toBe(users.id)
    expect(view.UID).toBe(users.UID)
    expect(view.description).toBe(users.description)
    expect(view.createdAt).toBeTruthy()
    expect(view.updatedAt).toBeTruthy()
  })
})
