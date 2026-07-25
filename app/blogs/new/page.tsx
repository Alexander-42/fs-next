import { createBlog } from "../../actions/blogs"

const NewBlogPage = async () => {
  return (
    <>
      <div>
        <h2> Create a new blog</h2>
        <form action={createBlog}>
          <div>
            <label>
              Title
              <input type="text" name="title" required />
            </label>
          </div>
          <div>
            <label>
              Author
              <input type="text" name="author" required />
            </label>
          </div>
          <div>
            <label>
              url
              <input type="text" name="url" required />
            </label>
          </div>
          <button type="submit">Add</button>
        </form>
      </div>
    </>
  )
}

export default NewBlogPage