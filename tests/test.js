/* eslint-env jest */
import constants from '../src/constants'
import quib from '../dist/quib'

describe('quib', () => {
  it('Throws an error if no props are provided', () => {
    expect(() => {
      quib()
    }).toThrowError(constants.PROJECT_NAMESPACE + 'No prop argument passed')
  })

  it('Throws the right error if no name is provided', () => {
    expect(() => {
      quib({

      })
    }).toThrowError(constants.PROJECT_NAMESPACE + 'The query name is required')
  })

  it('Throws the right error if no schema is provided', () => {
    expect(() => {
      quib({
        name: 'myQuery'
      })
    }).toThrowError(constants.PROJECT_NAMESPACE + 'The query schema is required')
  })

  it('Returns the expected formatted GraphQL query when a simple schema is passed', () => {
    const expectedFormat = `{
    getName {
      id,name
    }
  }`

    const quibFormat = quib({
      name: 'getName',
      schema: {
        id: '',
        name: ''
      }
    })

    expect(quibFormat).toBe(expectedFormat)
  })

  it('Returns the expected formatted GraphQL query when a nested object is passed as the schema', () => {
    const expectedFormat = `{
    getName {
      details {levelTwo,moreDetails {andAnotherDetailLevel,levelThree}},id,levelOne,name
    }
  }`

    const quibFormat = quib({
      name: 'getName',
      schema: {
        details: {
          levelTwo: '',
          moreDetails: {
            andAnotherDetailLevel: '',
            levelThree: ''
          }
        },
        id: '',
        levelOne: '',
        name: ''
      }
    })

    expect(quibFormat).toBe(expectedFormat)
  })

  it('Returns the expected formatted GraphQL query with variables when arguments are passed', () => {
    const expectedFormat = `{
    getName (color:"red",id:451) {
      id,name
    }
  }`

    const quibFormat = quib({
      args: {
        color: 'red',
        id: 451
      },
      name: 'getName',
      schema: {
        id: '',
        name: ''
      }
    })

    expect(quibFormat).toBe(expectedFormat)
  })
})
