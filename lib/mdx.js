import matter from 'gray-matter' //Extract meta data from mdx files (metadata is inside of ---)
import { serialize } from 'next-mdx-remote/serialize' //Parse the markdown, but only in next.js
import fs from 'fs'
import path from 'path'

const root = process.cwd() //root is the root file of the proyect
const getFiles = () => fs.readdirSync(path.join(root, 'data')) //readdir can be sync or async, but we don't have nothing async, cause we are not consulting a DB, only creating a md file
//The first param is a path
//This function is to get all files on data directory

const getFileBySlug = async (slug) => {
  const mdxSource = fs.readFileSync(
    path.join(root, 'data', `${slug}.mdx`),
    'utf-8'
  )
  const { data, content } = matter(mdxSource) //data is what is inside of ---, content is out of these ---
  const source = await serialize(content, {})

  return {
    source,
    frontmatter: {
      slug,
      ...data
    }
  }
}
//here we get the content of a file, based on the slug (id)

const getAllFilesMetadata = () => {
  const files = getFiles()

  return files.reduce((allPosts, postSlug) => {
    const mdxSource = fs.readFileSync(
      path.join(root, 'data', postSlug),
      'utf-8'
    )
    const { data } = matter(mdxSource)

    return [
      {
        ...data,
        slug: postSlug.replace('.mdx', '')
      },
      ...allPosts
    ]
  }, [])
}
// Here we get the metadata of all files

export { getAllFilesMetadata, getFiles, getFileBySlug }
