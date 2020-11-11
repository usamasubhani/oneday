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
    // console.log('textfield', textfield.value)
    console.log('Desc', desc.value)
  }

  return (
    <div>
      <p>{JSON.stringify(data)}</p>
      <div>
        <input type="text" placeholder="URL" ref={node => url = node} />
        <input type="text" placeholder="Page Title" ref={node => title = node} />
        <input type="text" placeholder="Description" ref={node => desc = node} />
        <button onClick={addBookmarkSubmit}>Add BookMark</button>
      </div>
    </div>
  )
  // if (data) {
  //   return <p>{JSON.stringify(data)}</p>
  // }
  // else {
  //   return <p>Not Found</p>
  // }
}
