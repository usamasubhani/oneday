import React from "react"
import { useQuery,useMutation } from "@apollo/client";
import gql from "graphql-tag";

const BookMarksQuery = gql`{
  bookmarks{
    url
    pageTitle
    description
  }
}`

export default function Home() {
  const {loading,error,data} = useQuery(BookMarksQuery)
  console.log(data)
  
    if (data) {
      return <p>{JSON.stringify(data)}</p>
    }
    else {
      return <p>Not Found</p>
    }
}
