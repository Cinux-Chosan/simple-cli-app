/*
 * Author: zhangjianjun (179817004@qq.com)
 * Create Time: Wednesday, 10th July 2019 5:28:37 pm
 * Last Modified: Saturday, 13th July 2019 5:29:59 pm
 * 
 * Describe: Loadabe for React class component，React function component and babel dynamic import component
 */

import React from 'react'
import Loadable from 'react-loadable'
import { Spin } from 'antd'

const loading = () => (
    <Spin size="large" style={{
        display: 'block',
        position: 'absolute',
        left: 0,
        right: 0,
        top: '50%',
        bottom: 0,
    }} />
)

// suport for React class component，React function component and babel dynamic import component
export default class extends React.Component {
    componentWillMount() {
        const { props: { component: renderComponent, ...rest } } = this
        const a = React
        if (renderComponent.prototype.isReactComponent) {
            // React class component
            this.setState({ renderComponent })
        } else {
            const promise = renderComponent(rest)
            if (promise.then) {
                // dynamic import
                const LoadableComponent = Loadable({
                    loader: () => promise,
                    loading,
                })
                this.setState({ renderComponent: LoadableComponent })
            } else {
                // React function component
                this.setState({ renderComponent })
            }
        }
    }
    render() {
        const { renderComponent: C } = this.state
        const { component, ...rest } = this.props
        return C ? <C {...rest} /> : null
    }
}