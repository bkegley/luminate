import React from 'react'
import {Button, Card, Grid, Input, Checkbox} from '@luminate/components'
import {Layout} from '../components/Layout'
import {BrowserRouter} from 'react-router-dom'
import {useDarkMode} from '../hooks/useDarkMode'

const TestPage = () => {
  const {darkMode, toggleDarkMode} = useDarkMode()
  return (
    <div className={darkMode ? 'dark' : ''}>
      <BrowserRouter>
        <Layout>
          <div className="my-20">
            <Grid>
              <Grid.Left>
                <Card>
                  <Card.Title title="Hey there" subtitle="This is a subtitle" />
                  <div className="flex flex-col space-y-4 px-10">
                    <Checkbox />
                    <Button onClick={toggleDarkMode}>{darkMode ? 'Dark' : 'Light'}</Button>
                    <button className="bg-secondary-300 hover:bg-secondary-400 w-full h-full flex items-center justify-center tracking-wide uppercase rounded shadow-sm border border-transparent cursor-pointer focus:outline-none focus:ring-2 focus:ring-offset-2">
                      Secondary
                    </button>
                    <Input />
                    <Button variant="secondary" onClick={toggleDarkMode}>
                      {darkMode ? 'Dark' : 'Light'}
                    </Button>
                    <Button variant="danger" onClick={toggleDarkMode}>
                      {darkMode ? 'Dark' : 'Light'}
                    </Button>
                    <Button variant="outline" onClick={toggleDarkMode}>
                      {darkMode ? 'Dark' : 'Light'}
                    </Button>
                    <Button onClick={toggleDarkMode}>{darkMode ? 'Dark' : 'Light'}</Button>
                    <Button onClick={toggleDarkMode}>{darkMode ? 'Dark' : 'Light'}</Button>
                  </div>
                  <Card.Footer>this is the footer</Card.Footer>
                </Card>
              </Grid.Left>
              <Grid.Right>
                <Card>
                  <h1>Card</h1>
                  <Button>Click me</Button>
                </Card>
              </Grid.Right>
            </Grid>
          </div>
        </Layout>
      </BrowserRouter>
    </div>
  )
}

export default TestPage
