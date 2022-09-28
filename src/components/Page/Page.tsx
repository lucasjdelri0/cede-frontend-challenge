import { PageProps } from './Page.props'
import './Page.css'

export const Page = (props: PageProps): JSX.Element => (
  <div
    className='site-layout-background'
    style={{ padding: 24, display: 'flex', flexDirection: 'column', flex: 1 }}
  >
    {props.children}
  </div>
)
