import constants from './constants'

/**
 * @typedef {Object} QueryProps
 * @property {Object} args [Optional] Query arguments
 * @property {String} name [Required] The name of the query
 * @property {Object} options [Optional] Query options
 * @property {Object} response [Optional] Subset of schema to return
 * @property {Object} schema [Required] Query schema
 */

/**
 * @typedef {Object} ValidationResponse
 * @property {String} message Validation message
 * @property {Boolean} valid Validation status
 */

/**
 * Response for a validation construct
 * @param {String} msg Validation message
 * @returns {ValidationResponse} ValidationResponse
 */
const validationResponse = (msg) => ({
  message: constants.PROJECT_NAMESPACE + msg,
  valid: !msg
})

/**
 * Validate the passed props to ensure that all properties are as expected
 * @param {...QueryProps} props Query parameters
 * @returns {ValidationResponse} ValidationResponse
 */
const validateProps = (props) => {
  // Ensure props are passed
  if (!props) return validationResponse('No prop argument passed')

  // Validate required props
  if (!props.name) return validationResponse('The query name is required')
  if (!props.schema) return validationResponse('The query schema is required')

  // TODO: Validate optional params

  return validationResponse()
}

/**
 * Composes the arguments for a given query
 * @param {Object} args Query arguments
 * @returns {String} Composed arguments
 */
const composeArgs = (args) => {
  if (!args) return ''

  const composedArgs = []

  Object.keys(args).forEach(arg => {
    composedArgs.push(`${arg}:${JSON.stringify(args[arg])}`)
  })

  return composedArgs.length > 0
    // ? `(${composedArgs.join(', ')})`
    ? ` (${composedArgs.toString()})`
    : ''
}

/**
 * Convert a JavaScript object to the equivalent GraphQL query
 * @param {Object} fields Query fields
 * @returns {String} Stringified fields
 */
const stringifyField = (fields) => {
  const composedFields = []

  Object.keys(fields).forEach(field => {
    // If field is an object, recursively call the stringifyField function with the object to get the nested items
    if (typeof fields[field] === 'object' && fields[field] !== null) {
      composedFields.push(`${field} {${stringifyField(fields[field])}}`)
    } else {
      composedFields.push(field)
    }
  })

  return composedFields.toString()
}

/**
 * Compose the fields in a GraphQL query
 * @param {Object} fields Query fields
 * @returns {String} Composed string
 */
const composeFields = (fields) => stringifyField(fields)

/**
 * Compose a GraphQL using the passed parameters
 * @param {...QueryProps} props props
 * @returns {String} Compiled query
 */
const composeQuery = (props) => {
  const {
    args,
    name,
    response,
    schema
  } = props

  // Compose the query using the specified response or the entire schema
  const queryFields = response || schema

  return `{
    ${name}${composeArgs(args)} {
      ${composeFields(queryFields)}
    }
  }`
}

/**
 * Validate and create a GraphQL query using the passed parameters
 * @param {...QueryProps} props Query parameters
 * @returns {String} Compiled query
 */
const quib = (props) => {
  const validProps = validateProps(props)

  if (!validProps.valid) {
    throw new Error(validProps.message)
  }

  return composeQuery(props)
}

export default quib
