import { query, ValidationError, validationResult } from 'express-validator'
import express, { NextFunction } from 'express'

const maximumBodyLength = 1000

const blogCreateRules = () => [
  query('title')
    .exists()
    .withMessage('Blog Title is Required')
    .isString()
    .withMessage('Blog Title Must be a string'),
  query('body')
    .exists()
    .withMessage('Blog Body is Required')
    .isString()
    .withMessage('Only letters and digits allowed in Body.')
    .isLength({ max: maximumBodyLength })
    .withMessage('Blog Body Must not exceed maximum body length 1000 characters')
]

const blogCreateValidator = (req: express.Request, res: express.Response, next: NextFunction) => {
  
  // const errorFormatter = ({ msg }: ValidationError) => `${msg}`
  // const errors = validationResult(req).formatWith(errorFormatter)
  
  // if (errors.isEmpty()) {
    return next()
  // }
  // return res.status(400).json({ success: false, error: errors.array({ onlyFirstError: true }) })
}

export { blogCreateValidator, blogCreateRules }
