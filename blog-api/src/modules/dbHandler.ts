import path from 'path'
import fs from 'fs'
import { Blog } from '../models/blog'
import { response } from 'express'


const dbPath = path.join(__dirname, '../public/blog.txt')

const readData = async (): Promise<Blog[]> => {

  // const blogObj: Blog = {
  //   id: 1,
  //   title: "blog.title",
  //   body: "blog.body",
  //   publishDate: new Date()
  // }

  const blogArr: Blog[] = []

  const data = fs.readFileSync(dbPath,
              {encoding:'utf8'});
  // parse JSON string to JSON object
      const blogs = JSON.parse(data)
      // print all databases
      blogs.forEach((blog: Blog) => {
        const blogObj: Blog = {
          id: blog.id,
          title: blog.title,
          body: blog.body,
          publishDate: blog.publishDate
        }
        blogArr.push(blogObj)
      })
    

  // await fs.readFile(dbPath, 'utf8', (err, data) => {
  //   console.log("h");
    
  //   if (err) {
  //     throw new Error(`Error reading file from disk: ${err}`)
  //   } else {
  //     // parse JSON string to JSON object
  //     const blogs = JSON.parse(data)
  //     // print all databases
  //     blogs.forEach((blog: Blog) => {
  //       const blogObj: Blog = {
  //         id: blog.id,
  //         title: blog.title,
  //         body: blog.body,
  //         publishDate: blog.publishDate
  //       }
  //       blogArr.push(blogObj)
  //     })
  //     // throw new Error(`Error reading file from disk: ${blogs}`)
  //   }
    
  // })

  return blogArr
}

const writeData = async (blogObj: Blog): Promise<void> => {  
  const blogsArr = await readData()
  blogsArr.push(blogObj)

  const blogs = JSON.stringify(blogsArr)

  // write file to disk
  fs.writeFile(dbPath, blogs, 'utf8', (err) => {
    if (err) throw new Error(`Error writing file: ${err}`)
  })
}

const saveData = async (blogsArr: Blog[]): Promise<void> => {
  const blogs = JSON.stringify(blogsArr)

  // write file to disk
  fs.writeFile(dbPath, blogs, 'utf8', (err) => {
    if (err) throw new Error(`Error writing file: ${err}`)
  })
}

export { readData, writeData, saveData }
