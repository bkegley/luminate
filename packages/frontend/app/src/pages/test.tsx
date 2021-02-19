import React from 'react'
import {Button, Card, Grid, Input, Label} from '@luminate/components'
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
                  <Card.Title title="Create Coffee" subtitle="Create a tasty coffee" />
                  <div className="space-y-4 px-4">
                    <div className="space-y-2">
                      <Label htmlFor="other">Other</Label>
                      <input
                        type="text"
                        className="shadow-sm focus:ring-secondary-300 focus:border-secondary-300 block w-full sm:text-sm border-gray-300 dark:border-gray-700 dark:bg-gray-800 rounded-md"
                        id="other"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="name">Name</Label>
                      <Input id="name" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="country">Country</Label>
                      <Input id="country" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="region">Region</Label>
                      <Input id="region" />
                    </div>
                  </div>
                  <Card.Footer>
                    <div className="flex justify-end">
                      <div>
                        <Button variant="primary">Save</Button>
                      </div>
                    </div>
                  </Card.Footer>
                </Card>
              </Grid.Left>
              <Grid.Right>
                <Card>
                  <h1>Card</h1>
                  <Button onClick={toggleDarkMode}>{darkMode ? 'Dark' : 'Light'}</Button>
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
