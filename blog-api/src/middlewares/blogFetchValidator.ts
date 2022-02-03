import { query, ValidationError, validationResult } from 'express-validator'
import express, { NextFunction } from 'express'

const blogFetchRules = () => [
  query('id')
    .exists()
    .withMessage('Blog id must be provided')
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Blog id must be greater than or equal to 1')
]

const blogFetchValidator = (req: express.Request, res: express.Response, next: NextFunction) => {
  const errorFormatter = ({ msg }: ValidationError) => `${msg}`
  const errors = validationResult(req).formatWith(errorFormatter)
  if (errors.isEmpty()) {
    return next()
  }
  return res.status(400).json({ success: false, error: errors.array({ onlyFirstError: true }) })
}

export { blogFetchValidator, blogFetchRules }
