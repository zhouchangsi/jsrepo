import React, { useState } from 'react'

import { Layout, Menu, Breadcrumb, Tree } from 'antd'
import styled from 'styled-components'

import 'normalize.css'
import 'antd/dist/reset.css'
import { DataNode } from 'antd/es/tree'

const Wrapper = styled(Layout)`
  height: 100vh;
`

const SideBar = styled(Layout.Sider)`
  width: 200px;
  overflow: 'auto';
  height: 100%;
  position: 'fixed';
  left: 0;
  top: 0;
  bottom: 0;
`
const Content = styled(Layout.Content)`
  padding: 2rem;
  margin: 0;
  min-height: 20rem;
  background: white;
`

const FolderTitle = styled.div`
  color: red;
`

const Folder: React.FC<{ node: DataNode }> = (props) => {
  return <FolderTitle>{props.node.title?.toString()}</FolderTitle>
}

const Main = styled(Layout)`
  padding: 0 2rem 2rem;
`

function App() {
  return (
    <Wrapper>
      <Layout.Header>
        <Menu theme="dark" mode="horizontal" defaultSelectedKeys={['2']} />
      </Layout.Header>

      <Layout>
        <SideBar collapsible>
          <Menu
            mode="inline"
            defaultSelectedKeys={['1']}
            defaultOpenKeys={['sub1']}
            style={{ height: '100%', borderRight: 0 }}
          >
            <Menu.Item>create</Menu.Item>
            <Menu.Item>review</Menu.Item>
            <Menu.Item>usage</Menu.Item>
          </Menu>
        </SideBar>

        <Main>
          <Breadcrumb style={{ margin: '16px 0' }}>
            <Breadcrumb.Item>Home</Breadcrumb.Item>
            <Breadcrumb.Item>List</Breadcrumb.Item>
            <Breadcrumb.Item>App</Breadcrumb.Item>
          </Breadcrumb>

          <Content>
            <Tree
              titleRender={(node) => (
                <div style={{ color: 'red' }}>{node.title?.toString()}</div>
              )}
            >
              <Tree.TreeNode>
                <Tree.TreeNode title="alksdjf">
                  <div>this a</div>
                </Tree.TreeNode>
              </Tree.TreeNode>
              <Tree.TreeNode>b</Tree.TreeNode>
              <Tree.TreeNode>c</Tree.TreeNode>
              <Tree.TreeNode>d</Tree.TreeNode>
            </Tree>
          </Content>
        </Main>
      </Layout>
    </Wrapper>
  )
}

export default App
