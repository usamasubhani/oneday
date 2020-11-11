import React from "react"
import { useQuery, useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BookMarksQuery = gql`{
  bookmarks{
    url
    pageTitle
    description
  }
}`

const AddBookMarkMutation = gql`
  mutation addBookmark($url: String!, $pageTitle: String!, $description: String){
    addBookmark(url: $url, pageTitle: $pageTitle, description: $description){
     url 
    }
}`

export default function Home() {
  const { loading, error, data } = useQuery(BookMarksQuery)
  const [addBookmark] = useMutation(AddBookMarkMutation)
  console.log(data);
  let url, title, desc;

  const addBookmarkSubmit = () => {
    addBookmark({
      variables: {
        url: url.value,
        pageTitle: title.value,
        description: desc.value
      },
      refetchQueries: [{ query: BookMarksQuery }],
    })
  }

  if (loading) {
    return <p>Loading..</p>
  } else if (error) {
    return <p>{error}</p>
  }
  else {
    return (
      <>

        <div className="jumbotron">
          <h1 className="display-3">One Day!</h1>
          <p className="lead">I will read/watch everything I saved here.</p>
          <hr className="my-4" />
          <p>This app is developed using Gatsby, Netlify and FaunaDB</p>
          <p>View the source code on <a href="https://github.com/usamasubhani/oneday">Github</a>. Connect with me on <a href="https://twitter.com/basedusama">Twitter</a>.</p>
        </div>
        <div className="container">
          <div className="container">
            <form>
              <label>URL</label>
              <input type="text" className="form-control" id="url" ref={node => url = node} />
              <label>Title</label>
              <input type="text" className="form-control" id="title" ref={node => title = node} />
              <label>Description</label>
              <input type="text" className="form-control" id="description" ref={node => desc = node} />
              <button className="btn btn-primary mt-2" onClick={addBookmarkSubmit}>Add</button>
            </form>
          </div>

          {data.bookmarks.map((bookmark) => {
            return (<>
              <div className="col-sm-12">
                <div className="card border-secondary min-vh-500 m-3 p-3">
                  <h5 className="card-title">{bookmark.pageTitle}</h5>
                  <h6 className="card-subtitle mb-2 text-muted">{bookmark.description}</h6>
                  <a href={bookmark.url} className="card-text">{bookmark.url}</a>
                </div>
              </div>
            </>)
          })}

        </div>
      </>
    )
  }
}
