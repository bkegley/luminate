import React from 'react'
import {useDarkMode} from '../../hooks/useDarkMode'
import {Card, Toggle, Label, IconTypesEnum, Page, Heading, Button} from '@luminate/components'

const AccountPage = () => {
  const {darkMode, toggleDarkMode} = useDarkMode()

  return (
    <Page title="Account">
      <div>
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <div className="px-4 sm:px-0">
              <Heading as="h3">Preferences</Heading>
              <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">Customize the look and feel.</p>
            </div>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <Card>
              <div className="px-4 py-5 space-y-6 sm:p-6">
                <div>
                  <Label htmlFor="about">Theme</Label>
                  <div className="mt-1">
                    <Toggle
                      id="darkMode"
                      description="Use dark mode"
                      initialValue={darkMode}
                      onIcon={IconTypesEnum.MOON}
                      offIcon={IconTypesEnum.SUN}
                      onChange={on => {
                        if (on !== darkMode) {
                          toggleDarkMode()
                        }
                      }}
                    />
                  </div>
                </div>
              </div>
              <Card.Footer>
                <div className="flex justify-end">
                  <div>
                    <Button type="submit">Save</Button>
                  </div>
                </div>
              </Card.Footer>
            </Card>
          </div>
        </div>
      </div>
    </Page>
  )
}

export default AccountPage
