import React from 'react'
import Header from '../components/Header'
import {Button, Input} from '@luminate/gatsby-theme-luminate/src'

const formSignupUrl = 'https://coffee.us19.list-manage.com/subscribe/post'
const emailMergeId = 'MERGE0'

const IndexPage = () => {
  const [email, setEmail] = React.useState('')
  const handleSubmit = () => {
    console.log({email})
  }
  return (
    <div className="min-h-screen bg-gray-100">
      <div className="bg-secondary-700 pb-32">
        <Header />
        <div className="container mx-auto mt-32 text-center">
          <h1 className="text-5xl text-white">Know Your Coffee</h1>
          <p className="text-white mt-4">Luminate helps you know coffee - from finca to drinka</p>
        </div>
      </div>
      <div className="container mx-auto text-center mt-32">
        <p className="text-5xl mb-4">Subscribe for updates</p>
        <form action={formSignupUrl} method="POST">
          <input type="hidden" name="u" value="824a2371cc68f1f213b148918" />
          <input type="hidden" name="id" value="a1b159c517" />
          <div className="flex items-center w-1/2 mx-auto border border-gray-300 rounded">
            <Input className="rounded-r-none border-none" type="email" name={emailMergeId} />
            <div className="w-1/3 -mr-1">
              <Button className="" type="submit">
                Submit
              </Button>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default IndexPage
