import bodyParser from 'body-parser'
import express, { Request, Response } from 'express'
import {
  addBlog,
  getBlogs,
  getBlog,
  deleteBlog,
  updateBlog,
  getUpcomingId
} from '../controllers/blogController'
import { blogCreateRules, blogCreateValidator } from '../middlewares/blogCreateValidator'
import { blogFetchRules, blogFetchValidator } from '../middlewares/blogFetchValidator'
import { Blog } from '../models/blog'


const blogRoutes = express.Router()
blogRoutes.use(bodyParser.json())

// get all blogs
blogRoutes.get('/', async (_req: Request, res: Response): Promise<void> => {
    // debugger;
  const blogs = await getBlogs()
  if (blogs) res.json(blogs)
})

// get blog by id
blogRoutes.get(
  '/:id',
  // blogFetchRules(),
  // blogFetchValidator,
  async (_req: Request, res: Response): Promise<void> => {
    console.log("id",_req.params.id);
    
    const blog = await getBlog(_req.params.id as unknown as number)
    if (blog) {
      res.status(200).json({ success: true, blog })
    }
  }
)

// delete blog by id
blogRoutes.delete(
  '/:id',
  // blogFetchRules(),
  // blogFetchValidator,
  async (_req: Request, res: Response): Promise<void> => {
    console.log("id",_req.params.id);
    
    await deleteBlog(_req.params.id as unknown as number)
    res.status(200).json({ success: true, message: 'Blog deleted successfully' })
  }
)

// update blog by id
blogRoutes.patch(
  '/:id',
  // blogFetchRules(),
  // blogFetchValidator,
  async (_req: Request, res: Response): Promise<void> => {
    const updatedBlog: Blog = {
      id: _req.params.id as unknown as number,
      title: _req.body.title,
      body: _req.body.body,
      publishDate: _req.body.publishDate
    }
    await updateBlog(updatedBlog)
    res.status(200).json({ success: true, message: 'Blog updated successfully' })
  }
)

// add blog
blogRoutes.post(
  '/',
  blogCreateRules(),
  blogCreateValidator,
  async (_req: Request, res: Response): Promise<void> => {
    const newBlog: Blog = {
      id: await getUpcomingId() as unknown as number,
      title: _req.body.title,
      body: _req.body.body,
      publishDate: new Date()
    }
    res.status(200).json({ success: true, message: 'Blog created successfully' })
    addBlog(newBlog);
  }
)

export default blogRoutes
