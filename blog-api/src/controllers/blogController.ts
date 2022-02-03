import { Blog } from '../models/blog'
import { readData, saveData, writeData } from '../modules/dbHandler'

const addBlog = async (blog: Blog): Promise<void> => {
  await writeData(blog)
}

const getBlogs = async (): Promise<Blog[]> => {
  const blogs = await readData()
  return blogs
} 

const getBlog = async (id: number): Promise<any> => {
  const blogs = await readData()
  let blogData:any;
  blogs.forEach((blog: Blog) => {
    
    if (id == blog.id){
      blogData = {...blog}
      return blog
    } 
  })
  return blogData;
  // throw new Error('getBlog : Blog with this id is not available')
}

const deleteBlog = async (id: number): Promise<void> => {
  const blogs = await readData()
  let found = false
  blogs.forEach((blog: Blog, index: number) => {
    if (blog.id == id) {
      blogs.splice(index, 1)
      found = true
    }
  })
  if (!found) throw new Error('deleteBlog : Blog with this id is not available')
  await saveData(blogs)
}

const updateBlog = async (updatedBlog: Blog): Promise<void> => {
  const blogs = await readData()
  let found = false
  blogs.forEach((blog: Blog, index: number) => {
    if (blog.id == updatedBlog.id) {
      found = true;
      blogs[index] = updatedBlog
    }
  })
  if (!found) throw new Error('updateBlog : Blog with this id is not available')
  await saveData(blogs)
}

const getUpcomingId = async (): Promise<number> => {
  const blogsArr = await readData()  
  let upComingId ;
  if(blogsArr[blogsArr.length-1]){
    upComingId = blogsArr[blogsArr.length-1].id + 1  

  }else{
    upComingId = 0;
  }
  return upComingId
}

export { addBlog, getBlogs, getBlog, deleteBlog, updateBlog, getUpcomingId }
