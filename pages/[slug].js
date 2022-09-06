import { getFiles, getFileBySlug } from '../lib/mdx'
import { MDXRemote } from 'next-mdx-remote'
import { MDXComponents } from '../components/MDXComponents'

export default function Post({ source, frontmatter }) {
  return <MDXRemote {...source} />
}

export async function getStaticProps({ params }) {
  const { source, frontmatter } = await getFileBySlug(params.slug)
  return {
    props: {
      source,
      frontmatter
    }
  }
}

export async function getStaticPaths() {
  const posts = getFiles()
  const paths = posts.map((post) => ({
    params: {
      slug: post.replace(/\.mdx/, '')
    }
  })) //Return an array with every file, but without extension

  return {
    paths,
    fallback: false //If there is not the file, return to the 404 page
  }
}
